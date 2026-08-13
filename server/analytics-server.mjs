import http from "node:http";
import { pathToFileURL } from "node:url";

const PORT = Number(process.env.ANALYTICS_PORT || 43127);
const POSTHOG_HOST = process.env.POSTHOG_HOST || "https://us.posthog.com";
const POSTHOG_PERSONAL_API_KEY = process.env.POSTHOG_PERSONAL_API_KEY;
const POSTHOG_PROJECT_TOKEN = process.env.POSTHOG_PROJECT_TOKEN;
const CACHE_TTL_MS = 5 * 60 * 1000;
const VALID_RANGES = new Set([7, 30, 90]);

const cache = new Map();

function number(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function percentage(numerator, denominator) {
  return denominator > 0 ? Math.round(numerator / denominator * 1000) / 10 : 0;
}

export function normalizeRange(value) {
  const days = Number(value);
  return VALID_RANGES.has(days) ? days : 30;
}

function shortDate(date) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).format(date);
}

function fillDailyTrend(rows, days) {
  const values = new Map(rows.map((row) => [String(row[0]).slice(0, 10), { visitors: number(row[1]), pageviews: number(row[2]) }]));
  const trend = [];
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  for (let offset = days - 1; offset >= 0; offset -= 1) {
    const date = new Date(today);
    date.setUTCDate(today.getUTCDate() - offset);
    const key = date.toISOString().slice(0, 10);
    const item = values.get(key) || { visitors: 0, pageviews: 0 };
    trend.push({ date: key, label: shortDate(date), short_label: shortDate(date), ...item });
  }
  return trend;
}

async function posthogQuery(name, query) {
  if (!POSTHOG_PERSONAL_API_KEY || !POSTHOG_PROJECT_TOKEN) {
    throw new Error("PostHog dashboard credentials are not configured");
  }

  const url = new URL("/api/projects/@current/query/", POSTHOG_HOST);
  url.searchParams.set("token", POSTHOG_PROJECT_TOKEN);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${POSTHOG_PERSONAL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: { kind: "HogQLQuery", query },
      name,
      refresh: "blocking",
    }),
    signal: AbortSignal.timeout(30_000),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`PostHog query failed (${response.status}): ${message.slice(0, 300)}`);
  }

  const payload = await response.json();
  if (!Array.isArray(payload.results)) throw new Error("PostHog returned an unexpected response");
  return payload.results;
}

export async function buildDashboard(days, query = posthogQuery) {
  const interval = `INTERVAL ${days} DAY`;
  const [summaryRows, trendRows, pageRows] = await Promise.all([
    query("amy_dashboard_summary", `
      SELECT
        countIf(event = '$pageview') AS pageviews,
        uniqIf(distinct_id, event = '$pageview') AS visitors,
        countIf(event = 'form_started') AS form_starts,
        countIf(event = 'form_submitted') AS form_submissions,
        uniqIf(distinct_id, event = 'video_viewed') AS video_viewers
      FROM events
      WHERE timestamp >= now() - ${interval}
    `),
    query("amy_dashboard_daily_traffic", `
      SELECT
        toDate(timestamp) AS day,
        uniqIf(distinct_id, event = '$pageview') AS visitors,
        countIf(event = '$pageview') AS pageviews
      FROM events
      WHERE timestamp >= now() - ${interval} AND event = '$pageview'
      GROUP BY day
      ORDER BY day
    `),
    query("amy_dashboard_top_pages", `
      SELECT
        coalesce(nullIf(toString(properties.$pathname), ''), '/') AS path,
        count() AS pageviews
      FROM events
      WHERE timestamp >= now() - ${interval} AND event = '$pageview'
      GROUP BY path
      ORDER BY pageviews DESC
      LIMIT 8
    `),
  ]);

  const [formRows, videoRows, sourceRows] = await Promise.all([
    query("amy_dashboard_forms", `
      SELECT
        properties.form_id AS form_id,
        countIf(event = 'form_started') AS started,
        countIf(event = 'form_submitted') AS submitted
      FROM events
      WHERE timestamp >= now() - ${interval} AND event IN ('form_started', 'form_submitted')
      GROUP BY form_id
    `),
    query("amy_dashboard_videos", `
      SELECT
        properties.video_id AS video_id,
        any(properties.video_title) AS video_title,
        uniqIf(distinct_id, event = 'video_viewed') AS unique_viewers,
        countIf(event = 'video_started') AS starts,
        countIf(event = 'video_completed') AS completions,
        sumIf(toFloatOrZero(toString(properties.watched_seconds)), event = 'video_watch_time') AS watched_seconds,
        countIf(event = 'video_progress' AND toInt(properties.milestone_percent) = 25) AS reached_25,
        countIf(event = 'video_progress' AND toInt(properties.milestone_percent) = 50) AS reached_50,
        countIf(event = 'video_progress' AND toInt(properties.milestone_percent) = 75) AS reached_75
      FROM events
      WHERE timestamp >= now() - ${interval}
        AND event IN ('video_viewed', 'video_started', 'video_completed', 'video_watch_time', 'video_progress')
      GROUP BY video_id
      ORDER BY unique_viewers DESC
    `),
    query("amy_dashboard_sources", `
      SELECT
        coalesce(
          nullIf(toString(properties.utm_source), ''),
          nullIf(toString(properties.$referring_domain), ''),
          'Direct'
        ) AS source,
        uniq(distinct_id) AS visitors
      FROM events
      WHERE timestamp >= now() - ${interval} AND event = '$pageview'
      GROUP BY source
      ORDER BY visitors DESC
      LIMIT 8
    `),
  ]);

  const summaryRow = summaryRows[0] || [];
  const summary = {
    pageviews: number(summaryRow[0]),
    visitors: number(summaryRow[1]),
    form_starts: number(summaryRow[2]),
    form_submissions: number(summaryRow[3]),
    video_viewers: number(summaryRow[4]),
  };
  summary.inquiry_rate = percentage(summary.form_submissions, summary.visitors);

  const formMap = new Map(formRows.map((row) => [String(row[0]), { started: number(row[1]), submitted: number(row[2]) }]));
  const formDefinitions = [
    ["homepage-general-inquiry", "General inquiry"],
    ["free-introductory-call", "Free introductory call"],
  ];
  const forms = formDefinitions.map(([id, title]) => {
    const values = formMap.get(id) || { started: 0, submitted: 0 };
    return { id, title, ...values, completion_rate: percentage(values.submitted, values.started) };
  });

  const videoMap = new Map(videoRows.map((row) => [String(row[0]), row]));
  const videoDefinitions = [
    ["meet-amy", "Meet Amy Jaffe"],
    ["client-testimonial", "Client testimonial"],
  ];
  const videos = videoDefinitions.map(([id, fallbackTitle]) => {
    const row = videoMap.get(id) || [];
    const uniqueViewers = number(row[2]);
    const completions = number(row[4]);
    const watchedSeconds = Math.round(number(row[5]) * 10) / 10;
    return {
      id,
      title: String(row[1] || fallbackTitle),
      unique_viewers: uniqueViewers,
      starts: number(row[3]),
      completions,
      watched_seconds: watchedSeconds,
      average_watch_seconds: uniqueViewers > 0 ? Math.round(watchedSeconds / uniqueViewers * 10) / 10 : 0,
      completion_rate: percentage(completions, uniqueViewers),
      reached_25: number(row[6]),
      reached_50: number(row[7]),
      reached_75: number(row[8]),
    };
  });

  return {
    generated_at: new Date().toISOString(),
    range_days: days,
    summary,
    trend: fillDailyTrend(trendRows, days),
    pages: pageRows.map((row) => ({ label: String(row[0] || "/"), value: number(row[1]) })),
    sources: sourceRows.map((row) => ({ label: String(row[0] || "Direct"), value: number(row[1]) })),
    forms,
    videos,
  };
}

async function dashboardResponse(days, forceRefresh) {
  const cached = cache.get(days);
  if (!forceRefresh && cached && Date.now() - cached.createdAt < CACHE_TTL_MS) return cached.data;
  const data = await buildDashboard(days);
  cache.set(days, { createdAt: Date.now(), data });
  return data;
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);
  response.setHeader("X-Content-Type-Options", "nosniff");

  if (request.method === "GET" && url.pathname === "/health") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ status: "ok", service: "amy-jaffe-analytics" }));
    return;
  }

  if (request.method !== "GET" || url.pathname !== "/analytics/api") {
    response.writeHead(404, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ error: "Not found" }));
    return;
  }

  try {
    const days = normalizeRange(url.searchParams.get("days"));
    const data = await dashboardResponse(days, url.searchParams.get("refresh") === "1");
    response.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "private, no-store",
    });
    response.end(JSON.stringify(data));
  } catch (error) {
    console.error("Dashboard data error:", error instanceof Error ? error.message : error);
    response.writeHead(502, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "private, no-store",
    });
    response.end(JSON.stringify({ error: "Analytics data is temporarily unavailable" }));
  }
});

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  server.listen(PORT, "127.0.0.1", () => {
    console.log(`Analytics service listening on 127.0.0.1:${PORT}`);
  });
}

export { server };
