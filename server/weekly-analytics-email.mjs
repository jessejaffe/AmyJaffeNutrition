import { pathToFileURL } from "node:url";
import { buildDashboard } from "./analytics-server.mjs";

const REPORT_RECIPIENT = process.env.WEEKLY_REPORT_RECIPIENT || "amysjaffe@gmail.com";
const REPORT_TIME_ZONE = process.env.WEEKLY_REPORT_TIME_ZONE || "America/New_York";
const DASHBOARD_URL = process.env.WEEKLY_REPORT_DASHBOARD_URL || "https://www.amyjaffenutrition.com/analytics/";
const FORM_SUBMIT_ENDPOINT = process.env.WEEKLY_REPORT_FORM_SUBMIT_ENDPOINT
  || `https://formsubmit.co/ajax/${encodeURIComponent(REPORT_RECIPIENT)}`;

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(Number(value) || 0);
}

function formatSeconds(value) {
  const seconds = Math.max(0, Math.round(Number(value) || 0));
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return minutes > 0 ? `${minutes}m ${remainder}s` : `${remainder}s`;
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: REPORT_TIME_ZONE,
  }).format(date);
}

export function reportPeriod(now = new Date()) {
  const start = new Date(now);
  start.setDate(start.getDate() - 7);
  return `${formatDate(start)} – ${formatDate(now)}`;
}

function listRows(rows, emptyLabel, valueLabel) {
  if (!rows.length) return emptyLabel;
  return rows.slice(0, 5).map((row) => `${row.label}: ${formatNumber(row[valueLabel])}`).join("\n");
}

export function formatWeeklyReport(data, now = new Date()) {
  const period = reportPeriod(now);
  const forms = data.forms.map((form) => (
    `${form.title}: ${formatNumber(form.submitted)} submitted, ${formatNumber(form.started)} started (${form.completion_rate}%)`
  )).join("\n");
  const videos = data.videos.map((video) => (
    `${video.title}: ${formatNumber(video.unique_viewers)} unique viewers, ${formatSeconds(video.average_watch_seconds)} average watch, ${video.completion_rate}% completed`
  )).join("\n");

  return {
    _subject: `Amy Jaffe Nutrition weekly analytics · ${period}`,
    _template: "table",
    _url: DASHBOARD_URL,
    "Reporting period": period,
    Visitors: formatNumber(data.summary.visitors),
    "Page views": formatNumber(data.summary.pageviews),
    Inquiries: formatNumber(data.summary.form_submissions),
    "Inquiry rate": `${data.summary.inquiry_rate}%`,
    "Form activity": forms,
    "Video performance": videos,
    "Top pages": listRows(data.pages, "No page views yet", "value"),
    "Traffic sources": listRows(data.sources, "No traffic sources yet", "value"),
    "Private dashboard": DASHBOARD_URL,
  };
}

export async function sendWeeklyReport({
  now = new Date(),
  getDashboard = () => buildDashboard(7),
  send = fetch,
} = {}) {
  const data = await getDashboard();
  const report = formatWeeklyReport(data, now);
  const response = await send(FORM_SUBMIT_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Origin: "https://www.amyjaffenutrition.com",
      Referer: "https://www.amyjaffenutrition.com/analytics/",
    },
    body: JSON.stringify(report),
    signal: AbortSignal.timeout(30_000),
  });

  const responseText = await response.text();
  if (!response.ok) {
    throw new Error(`Weekly analytics email failed (${response.status}): ${responseText.slice(0, 300)}`);
  }

  let result = {};
  try {
    result = JSON.parse(responseText);
  } catch {
    result = { message: responseText };
  }

  if (result.success === false || result.success === "false") {
    throw new Error(`Weekly analytics email was rejected: ${String(result.message || "Unknown error")}`);
  }

  return { recipient: REPORT_RECIPIENT, period: report["Reporting period"] };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  sendWeeklyReport()
    .then(({ recipient, period }) => console.log(`Weekly analytics email sent to ${recipient} for ${period}`))
    .catch((error) => {
      console.error(error instanceof Error ? error.message : error);
      process.exitCode = 1;
    });
}
