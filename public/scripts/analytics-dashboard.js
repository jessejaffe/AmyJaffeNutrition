(function () {
  "use strict";

  var currentDays = 30;
  var numberFormat = new Intl.NumberFormat("en-US");

  function byId(id) { return document.getElementById(id); }
  function formatNumber(value) { return numberFormat.format(Number(value) || 0); }
  function formatPercent(value) { return (Number(value) || 0).toFixed(1).replace(/\.0$/, "") + "%"; }
  function formatDuration(seconds) {
    var amount = Math.round(Number(seconds) || 0);
    if (amount < 60) return amount + " sec";
    var minutes = Math.floor(amount / 60);
    var remainder = amount % 60;
    return minutes + "m " + remainder + "s";
  }

  function emptyMessage(text) {
    var paragraph = document.createElement("p");
    paragraph.className = "dashboard-empty";
    paragraph.textContent = text;
    return paragraph;
  }

  function renderRankedList(element, items, emptyText) {
    element.replaceChildren();
    if (!items.length) {
      element.appendChild(emptyMessage(emptyText));
      return;
    }

    var maximum = Math.max.apply(null, items.map(function (item) { return item.value; })) || 1;
    items.forEach(function (item) {
      var row = document.createElement("div");
      row.className = "ranked-item";
      var label = document.createElement("span");
      label.className = "ranked-label";
      label.textContent = item.label;
      label.title = item.label;
      var value = document.createElement("span");
      value.className = "ranked-value";
      value.textContent = formatNumber(item.value);
      var track = document.createElement("div");
      track.className = "ranked-track";
      var fill = document.createElement("div");
      fill.className = "ranked-fill";
      fill.style.width = Math.max(2, item.value / maximum * 100) + "%";
      track.appendChild(fill);
      row.append(label, value, track);
      element.appendChild(row);
    });
  }

  function renderTrend(items) {
    var chart = byId("traffic-chart");
    chart.replaceChildren();
    if (!items.length) {
      chart.appendChild(emptyMessage("Daily traffic will appear after the first visits are recorded."));
      return;
    }
    var maximum = Math.max.apply(null, items.map(function (item) { return Math.max(item.visitors, item.pageviews); })) || 1;
    items.forEach(function (item) {
      var day = document.createElement("div");
      day.className = "trend-day";
      day.title = item.label + ": " + item.visitors + " visitors, " + item.pageviews + " page views";
      var visitors = document.createElement("i");
      visitors.className = "trend-bar trend-visitors";
      visitors.style.height = Math.max(1, item.visitors / maximum * 100) + "%";
      var views = document.createElement("i");
      views.className = "trend-bar trend-views";
      views.style.height = Math.max(1, item.pageviews / maximum * 100) + "%";
      var label = document.createElement("span");
      label.className = "trend-label";
      label.textContent = item.short_label;
      day.append(visitors, views, label);
      chart.appendChild(day);
    });
  }

  function statCell(value, label) {
    var cell = document.createElement("div");
    var strong = document.createElement("strong");
    strong.textContent = value;
    var span = document.createElement("span");
    span.textContent = label;
    cell.append(strong, span);
    return cell;
  }

  function renderForms(forms) {
    var grid = byId("forms-grid");
    grid.replaceChildren();
    forms.forEach(function (form) {
      var card = document.createElement("article");
      card.className = "form-analytics-card";
      var title = document.createElement("h3");
      title.textContent = form.title;
      var stats = document.createElement("div");
      stats.className = "form-stat-row";
      stats.append(
        statCell(formatNumber(form.started), "Started"),
        statCell(formatNumber(form.submitted), "Submitted"),
        statCell(formatPercent(form.completion_rate), "Completion")
      );
      card.append(title, stats);
      grid.appendChild(card);
    });
  }

  function renderVideos(videos) {
    var grid = byId("videos-grid");
    grid.replaceChildren();
    videos.forEach(function (video) {
      var card = document.createElement("article");
      card.className = "video-analytics-card";
      var title = document.createElement("h3");
      title.textContent = video.title;
      var summary = document.createElement("div");
      summary.className = "video-summary";
      summary.append(
        statCell(formatNumber(video.unique_viewers), "Unique viewers"),
        statCell(formatDuration(video.average_watch_seconds), "Avg. watched"),
        statCell(formatPercent(video.completion_rate), "Completed")
      );

      var funnel = document.createElement("div");
      funnel.className = "video-funnel";
      var steps = [
        [video.unique_viewers, "Viewed"],
        [video.reached_25, "25%"],
        [video.reached_50, "50%"],
        [video.reached_75, "75%"],
        [video.completions, "100%"],
      ];
      var maximum = Math.max(1, video.unique_viewers);
      steps.forEach(function (step) {
        var wrapper = document.createElement("div");
        wrapper.className = "video-funnel-step";
        wrapper.title = step[1] + ": " + formatNumber(step[0]);
        var bar = document.createElement("i");
        bar.style.height = Math.max(2, Number(step[0]) / maximum * 100) + "%";
        var label = document.createElement("span");
        label.textContent = step[1];
        wrapper.append(bar, label);
        funnel.appendChild(wrapper);
      });
      card.append(title, summary, funnel);
      grid.appendChild(card);
    });
  }

  function render(data) {
    byId("metric-visitors").textContent = formatNumber(data.summary.visitors);
    byId("metric-pageviews").textContent = formatNumber(data.summary.pageviews);
    byId("metric-submissions").textContent = formatNumber(data.summary.form_submissions);
    byId("metric-conversion").textContent = formatPercent(data.summary.inquiry_rate);
    byId("dashboard-period-label").textContent = "Last " + data.range_days + " days";
    renderTrend(data.trend);
    renderRankedList(byId("pages-list"), data.pages, "Visited pages will appear here.");
    renderRankedList(byId("sources-list"), data.sources, "Traffic sources will appear here.");
    renderForms(data.forms);
    renderVideos(data.videos);
    byId("dashboard-updated").textContent = "Updated " + new Date(data.generated_at).toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
  }

  async function loadDashboard(forceRefresh) {
    var status = byId("dashboard-status");
    var refresh = byId("dashboard-refresh");
    status.className = "dashboard-status";
    status.textContent = "Loading your latest numbers…";
    refresh.disabled = true;

    try {
      var response = await fetch("/analytics/api?days=" + currentDays + (forceRefresh ? "&refresh=1" : ""), {
        headers: { Accept: "application/json" },
        credentials: "same-origin",
      });
      if (!response.ok) throw new Error("Dashboard request failed");
      var data = await response.json();
      render(data);
      status.className = "dashboard-status is-ready";
      status.textContent = "Dashboard ready";
    } catch {
      status.className = "dashboard-status is-error";
      status.textContent = "The dashboard could not load right now. Please try Refresh in a moment.";
    } finally {
      refresh.disabled = false;
    }
  }

  document.querySelectorAll("[data-days]").forEach(function (button) {
    button.addEventListener("click", function () {
      currentDays = Number(button.dataset.days);
      document.querySelectorAll("[data-days]").forEach(function (candidate) {
        var active = candidate === button;
        candidate.classList.toggle("is-active", active);
        candidate.setAttribute("aria-pressed", String(active));
      });
      loadDashboard(false);
    });
  });

  byId("dashboard-refresh").addEventListener("click", function () { loadDashboard(true); });
  loadDashboard(false);
})();
