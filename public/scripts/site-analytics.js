(function () {
  "use strict";

  var PROJECT_TOKEN = "phc_o9oPEFsMNotCLqMo7PQLp83DyfEbLqBi2iTzonzpBGVp";
  var INGEST_URL = "https://us.i.posthog.com/i/v0/e/";
  var ALLOWED_HOSTS = ["amyjaffenutrition.com", "www.amyjaffenutrition.com"];
  var WATCH_HEARTBEAT_MS = 15000;
  var VIDEO_MILESTONES = [25, 50, 75];

  if (ALLOWED_HOSTS.indexOf(window.location.hostname) === -1) return;
  if (window.location.pathname.indexOf("/analytics") === 0) return;
  if (navigator.doNotTrack === "1" || window.doNotTrack === "1") return;

  function createId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (character) {
      var random = Math.random() * 16 | 0;
      var value = character === "x" ? random : (random & 3 | 8);
      return value.toString(16);
    });
  }

  function storedId(storage, key) {
    try {
      var existing = storage.getItem(key);
      if (existing) return existing;
      var value = createId();
      storage.setItem(key, value);
      return value;
    } catch {
      return createId();
    }
  }

  var distinctId = storedId(window.localStorage, "amy_analytics_distinct_id");
  var sessionId = storedId(window.sessionStorage, "amy_analytics_session_id");

  function commonProperties() {
    var parameters = new URLSearchParams(window.location.search);
    var referrerDomain = "";
    try {
      referrerDomain = document.referrer ? new URL(document.referrer).hostname : "";
    } catch {
      referrerDomain = "";
    }

    return {
      token: PROJECT_TOKEN,
      distinct_id: distinctId,
      $session_id: sessionId,
      $current_url: window.location.href,
      $pathname: window.location.pathname,
      $host: window.location.host,
      $referrer: document.referrer || "",
      $referring_domain: referrerDomain,
      utm_source: parameters.get("utm_source") || undefined,
      utm_medium: parameters.get("utm_medium") || undefined,
      utm_campaign: parameters.get("utm_campaign") || undefined,
    };
  }

  function capture(eventName, properties, immediate) {
    var payload = JSON.stringify({
      api_key: PROJECT_TOKEN,
      event: eventName,
      properties: Object.assign(commonProperties(), properties || {}),
      timestamp: new Date().toISOString(),
    });

    if (immediate && navigator.sendBeacon) {
      var sent = navigator.sendBeacon(INGEST_URL, new Blob([payload], { type: "application/json" }));
      if (sent) return;
    }

    fetch(INGEST_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: Boolean(immediate),
      credentials: "omit",
    }).catch(function () {});
  }

  capture("$pageview");

  document.addEventListener("click", function (event) {
    var element = event.target instanceof Element ? event.target.closest("a, button") : null;
    if (!element || element.closest("form")) return;

    var href = element instanceof HTMLAnchorElement ? element.href : "";
    var linkUrl;
    try {
      linkUrl = href ? new URL(href, window.location.href) : null;
    } catch {
      linkUrl = null;
    }

    capture("site_click", {
      element_type: element.tagName.toLowerCase(),
      element_label: (element.getAttribute("aria-label") || element.textContent || "").trim().replace(/\s+/g, " ").slice(0, 100),
      link_path: linkUrl ? linkUrl.pathname + linkUrl.hash : undefined,
      link_domain: linkUrl ? linkUrl.hostname : undefined,
    });
  });

  var startedForms = new WeakSet();
  document.addEventListener("focusin", function (event) {
    var field = event.target;
    if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement)) return;

    var form = field.form;
    var formId = form && form.dataset.analyticsFormId;
    if (!form || !formId || startedForms.has(form)) return;

    startedForms.add(form);
    capture("form_started", { form_id: formId });
  });

  document.addEventListener("submit", function (event) {
    var form = event.target;
    if (!(form instanceof HTMLFormElement) || !form.dataset.analyticsFormId) return;

    // Never include names, contact details, field names, or message text.
    capture("form_submitted", { form_id: form.dataset.analyticsFormId }, true);
  });

  var videoStates = new WeakMap();
  var activeVideos = new Set();

  function isTrackedVideo(target) {
    return target instanceof HTMLVideoElement && Boolean(target.dataset.analyticsVideoId);
  }

  function stateFor(video) {
    var existing = videoStates.get(video);
    if (existing) return existing;
    var state = {
      viewed: false,
      started: false,
      completed: false,
      milestones: new Set(),
      segmentStartedAt: null,
      segmentStartPosition: video.currentTime,
      playbackRate: video.playbackRate,
    };
    videoStates.set(video, state);
    return state;
  }

  function videoProperties(video) {
    return {
      video_id: video.dataset.analyticsVideoId,
      video_title: video.dataset.analyticsVideoTitle,
      video_duration_seconds: Number.isFinite(video.duration) ? Math.round(video.duration * 10) / 10 : undefined,
    };
  }

  function startWatchTime(video) {
    var state = stateFor(video);
    if (state.segmentStartedAt !== null) return;
    state.segmentStartedAt = performance.now();
    state.segmentStartPosition = video.currentTime;
    state.playbackRate = video.playbackRate;
    activeVideos.add(video);
  }

  function flushWatchTime(video, reason, immediate) {
    var state = stateFor(video);
    if (state.segmentStartedAt === null) return;

    var watchedSeconds = Math.min((performance.now() - state.segmentStartedAt) / 1000, WATCH_HEARTBEAT_MS / 1000 + 1);
    if (watchedSeconds >= 0.5) {
      capture("video_watch_time", Object.assign(videoProperties(video), {
        watched_seconds: Math.round(watchedSeconds * 10) / 10,
        from_position_seconds: Math.round(state.segmentStartPosition * 10) / 10,
        to_position_seconds: Math.round(video.currentTime * 10) / 10,
        playback_rate: state.playbackRate,
        flush_reason: reason,
      }), immediate);
    }

    state.segmentStartedAt = null;
    state.segmentStartPosition = video.currentTime;
  }

  document.addEventListener("play", function (event) {
    if (!isTrackedVideo(event.target)) return;
    var video = event.target;
    var state = stateFor(video);

    if (!state.viewed) {
      state.viewed = true;
      capture("video_viewed", videoProperties(video));
    }

    if (!state.started) {
      state.started = true;
      capture("video_started", videoProperties(video));
    } else {
      capture("video_resumed", Object.assign(videoProperties(video), {
        position_seconds: Math.round(video.currentTime * 10) / 10,
      }));
    }
    startWatchTime(video);
  }, true);

  document.addEventListener("timeupdate", function (event) {
    if (!isTrackedVideo(event.target)) return;
    var video = event.target;
    if (!Number.isFinite(video.duration) || video.duration <= 0) return;
    var state = stateFor(video);
    var percent = video.currentTime / video.duration * 100;

    VIDEO_MILESTONES.forEach(function (milestone) {
      if (percent < milestone || state.milestones.has(milestone)) return;
      state.milestones.add(milestone);
      capture("video_progress", Object.assign(videoProperties(video), {
        milestone_percent: milestone,
        position_seconds: Math.round(video.currentTime * 10) / 10,
      }));
    });
  }, true);

  document.addEventListener("pause", function (event) {
    if (!isTrackedVideo(event.target)) return;
    flushWatchTime(event.target, "pause");
    activeVideos.delete(event.target);
  }, true);

  document.addEventListener("ended", function (event) {
    if (!isTrackedVideo(event.target)) return;
    var video = event.target;
    var state = stateFor(video);
    flushWatchTime(video, "ended");
    activeVideos.delete(video);
    if (state.completed) return;
    state.completed = true;
    capture("video_completed", Object.assign(videoProperties(video), { milestone_percent: 100 }));
  }, true);

  document.addEventListener("seeking", function (event) {
    if (isTrackedVideo(event.target)) flushWatchTime(event.target, "seek");
  }, true);

  document.addEventListener("seeked", function (event) {
    if (isTrackedVideo(event.target) && !event.target.paused) startWatchTime(event.target);
  }, true);

  document.addEventListener("ratechange", function (event) {
    if (!isTrackedVideo(event.target)) return;
    flushWatchTime(event.target, "rate_change");
    if (!event.target.paused) startWatchTime(event.target);
  }, true);

  function flushActiveVideos(reason, immediate) {
    activeVideos.forEach(function (video) { flushWatchTime(video, reason, immediate); });
  }

  window.setInterval(function () {
    flushActiveVideos("heartbeat");
    activeVideos.forEach(function (video) {
      if (!video.paused) startWatchTime(video);
    });
  }, WATCH_HEARTBEAT_MS);

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
      flushActiveVideos("page_hidden", true);
    } else {
      activeVideos.forEach(function (video) {
        if (!video.paused) startWatchTime(video);
      });
    }
  });

  window.addEventListener("pagehide", function () {
    flushActiveVideos("page_exit", true);
    capture("$pageleave", {}, true);
  });
})();
