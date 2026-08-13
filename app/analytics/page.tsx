import type { Metadata } from "next";
import Link from "next/link";
import "./dashboard.css";

export const metadata: Metadata = {
  title: "Site Analytics | Amy Jaffe Nutrition",
  description: "Private website analytics for Amy Jaffe Nutrition.",
  robots: { index: false, follow: false, noarchive: true, nocache: true },
};

function MetricCard({ id, label, detail }: { id: string; label: string; detail: string }) {
  return (
    <article className="dashboard-metric-card">
      <p>{label}</p>
      <strong id={id}>-</strong>
      <span>{detail}</span>
    </article>
  );
}

export default function AnalyticsDashboard() {
  return (
    <main className="analytics-dashboard">
      <header className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">Amy Jaffe Nutrition · Private</p>
          <h1>Site <em>pulse.</em></h1>
          <p className="dashboard-intro">A clear view of visits, inquiries, and video engagement.</p>
        </div>
        <div className="dashboard-controls" aria-label="Dashboard controls">
          <div className="dashboard-range" role="group" aria-label="Date range">
            <button type="button" data-days="7">7 days</button>
            <button type="button" data-days="30" className="is-active" aria-pressed="true">30 days</button>
            <button type="button" data-days="90">90 days</button>
          </div>
          <button className="dashboard-refresh" id="dashboard-refresh" type="button">Refresh</button>
        </div>
      </header>

      <div className="dashboard-status" id="dashboard-status" role="status" aria-live="polite">Loading your latest numbers…</div>

      <section className="dashboard-metrics" aria-label="At a glance">
        <MetricCard id="metric-visitors" label="Visitors" detail="Unique browsers" />
        <MetricCard id="metric-pageviews" label="Page views" detail="Pages opened" />
        <MetricCard id="metric-submissions" label="Inquiries" detail="Forms submitted" />
        <MetricCard id="metric-conversion" label="Inquiry rate" detail="Submissions per visitor" />
      </section>

      <section className="dashboard-panel dashboard-traffic-panel" aria-labelledby="traffic-title">
        <div className="dashboard-panel-heading">
          <div><p className="dashboard-kicker">Traffic</p><h2 id="traffic-title">Visitors over time</h2></div>
          <p id="dashboard-period-label">Last 30 days</p>
        </div>
        <div className="dashboard-chart-legend" aria-hidden="true"><span><i className="legend-visitors" /> Visitors</span><span><i className="legend-views" /> Page views</span></div>
        <div className="dashboard-trend-chart" id="traffic-chart" aria-label="Daily visitors and page views chart" />
      </section>

      <div className="dashboard-two-column">
        <section className="dashboard-panel" aria-labelledby="pages-title">
          <div className="dashboard-panel-heading"><div><p className="dashboard-kicker">Content</p><h2 id="pages-title">Most visited pages</h2></div></div>
          <div className="dashboard-ranked-list" id="pages-list" />
        </section>
        <section className="dashboard-panel" aria-labelledby="sources-title">
          <div className="dashboard-panel-heading"><div><p className="dashboard-kicker">Discovery</p><h2 id="sources-title">How people arrived</h2></div></div>
          <div className="dashboard-ranked-list" id="sources-list" />
        </section>
      </div>

      <section className="dashboard-panel" aria-labelledby="forms-title">
        <div className="dashboard-panel-heading">
          <div><p className="dashboard-kicker">Inquiries</p><h2 id="forms-title">Form activity</h2></div>
          <p>Only activity counts are collected. Form contents are never included.</p>
        </div>
        <div className="dashboard-form-grid" id="forms-grid" />
      </section>

      <section className="dashboard-panel" aria-labelledby="videos-title">
        <div className="dashboard-panel-heading">
          <div><p className="dashboard-kicker">Engagement</p><h2 id="videos-title">Video performance</h2></div>
          <p>Unique viewers, watch time, and completion.</p>
        </div>
        <div className="dashboard-video-grid" id="videos-grid" />
      </section>

      <footer className="dashboard-footer">
        <p id="dashboard-updated">Waiting for data</p>
        <Link href="/">Return to the website</Link>
      </footer>
      <script src="/scripts/analytics-dashboard.js" defer data-static-script="true" />
    </main>
  );
}
