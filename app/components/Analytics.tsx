"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

type AnalyticsVideo = HTMLVideoElement & {
  dataset: DOMStringMap & {
    analyticsVideoId?: string;
    analyticsVideoTitle?: string;
  };
};

type VideoState = {
  viewed: boolean;
  started: boolean;
  completed: boolean;
  milestones: Set<number>;
  segmentStartedAt: number | null;
  segmentStartPosition: number;
  playbackRate: number;
};

const VIDEO_MILESTONES = [25, 50, 75];
const WATCH_TIME_HEARTBEAT_MS = 15_000;

function isAnalyticsVideo(target: EventTarget | null): target is AnalyticsVideo {
  return target instanceof HTMLVideoElement && Boolean(target.dataset.analyticsVideoId);
}

function videoProperties(video: AnalyticsVideo) {
  return {
    video_id: video.dataset.analyticsVideoId,
    video_title: video.dataset.analyticsVideoTitle,
    video_duration_seconds: Number.isFinite(video.duration)
      ? Math.round(video.duration * 10) / 10
      : undefined,
  };
}

export default function Analytics() {
  useEffect(() => {
    const startedForms = new WeakSet<HTMLFormElement>();
    const videoStates = new WeakMap<AnalyticsVideo, VideoState>();
    const activeVideos = new Set<AnalyticsVideo>();

    const getVideoState = (video: AnalyticsVideo) => {
      const existingState = videoStates.get(video);
      if (existingState) return existingState;

      const state: VideoState = {
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
    };

    const flushWatchTime = (video: AnalyticsVideo, reason: string) => {
      const state = getVideoState(video);
      if (state.segmentStartedAt === null) return;

      const watchedSeconds = Math.min(
        (performance.now() - state.segmentStartedAt) / 1000,
        WATCH_TIME_HEARTBEAT_MS / 1000 + 1,
      );

      if (watchedSeconds >= 0.5) {
        posthog.capture("video_watch_time", {
          ...videoProperties(video),
          watched_seconds: Math.round(watchedSeconds * 10) / 10,
          from_position_seconds: Math.round(state.segmentStartPosition * 10) / 10,
          to_position_seconds: Math.round(video.currentTime * 10) / 10,
          playback_rate: state.playbackRate,
          flush_reason: reason,
        });
      }

      state.segmentStartedAt = null;
      state.segmentStartPosition = video.currentTime;
    };

    const startWatchTime = (video: AnalyticsVideo) => {
      const state = getVideoState(video);
      if (state.segmentStartedAt !== null) return;
      state.segmentStartedAt = performance.now();
      state.segmentStartPosition = video.currentTime;
      state.playbackRate = video.playbackRate;
      activeVideos.add(video);
    };

    const handleFocusIn = (event: FocusEvent) => {
      const field = event.target;
      if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement)) return;

      const form = field.form;
      const formId = form?.dataset.analyticsFormId;
      if (!form || !formId || startedForms.has(form)) return;

      startedForms.add(form);
      posthog.capture("form_started", { form_id: formId });
    };

    const handleSubmit = (event: SubmitEvent) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;

      const formId = form.dataset.analyticsFormId;
      if (!formId) return;

      // Intentionally send only the form identifier. Never send field names,
      // values, or the free-text message from a prospective client.
      posthog.capture("form_submitted", { form_id: formId });
    };

    const handlePlay = (event: Event) => {
      if (!isAnalyticsVideo(event.target)) return;
      const video = event.target;
      const state = getVideoState(video);

      if (!state.viewed) {
        state.viewed = true;
        posthog.capture("video_viewed", videoProperties(video));
      }

      if (!state.started) {
        state.started = true;
        posthog.capture("video_started", videoProperties(video));
      } else {
        posthog.capture("video_resumed", {
          ...videoProperties(video),
          position_seconds: Math.round(video.currentTime * 10) / 10,
        });
      }

      startWatchTime(video);
    };

    const handleTimeUpdate = (event: Event) => {
      if (!isAnalyticsVideo(event.target)) return;
      const video = event.target;
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;

      const state = getVideoState(video);
      const percent = (video.currentTime / video.duration) * 100;

      for (const milestone of VIDEO_MILESTONES) {
        if (percent < milestone || state.milestones.has(milestone)) continue;
        state.milestones.add(milestone);
        posthog.capture("video_progress", {
          ...videoProperties(video),
          milestone_percent: milestone,
          position_seconds: Math.round(video.currentTime * 10) / 10,
        });
      }
    };

    const handlePause = (event: Event) => {
      if (!isAnalyticsVideo(event.target)) return;
      flushWatchTime(event.target, "pause");
      activeVideos.delete(event.target);
    };

    const handleEnded = (event: Event) => {
      if (!isAnalyticsVideo(event.target)) return;
      const video = event.target;
      const state = getVideoState(video);
      flushWatchTime(video, "ended");
      activeVideos.delete(video);

      if (!state.completed) {
        state.completed = true;
        posthog.capture("video_completed", {
          ...videoProperties(video),
          milestone_percent: 100,
        });
      }
    };

    const handleSeeking = (event: Event) => {
      if (!isAnalyticsVideo(event.target)) return;
      flushWatchTime(event.target, "seek");
    };

    const handleSeeked = (event: Event) => {
      if (!isAnalyticsVideo(event.target) || event.target.paused) return;
      startWatchTime(event.target);
    };

    const handleRateChange = (event: Event) => {
      if (!isAnalyticsVideo(event.target)) return;
      const video = event.target;
      flushWatchTime(video, "rate_change");
      if (!video.paused) startWatchTime(video);
    };

    const flushActiveVideos = (reason: string) => {
      for (const video of activeVideos) flushWatchTime(video, reason);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        flushActiveVideos("page_hidden");
      } else {
        for (const video of activeVideos) {
          if (!video.paused) startWatchTime(video);
        }
      }
    };

    const handlePageHide = () => flushActiveVideos("page_exit");

    const heartbeat = window.setInterval(() => {
      flushActiveVideos("heartbeat");
      for (const video of activeVideos) {
        if (!video.paused) startWatchTime(video);
      }
    }, WATCH_TIME_HEARTBEAT_MS);

    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("submit", handleSubmit);
    document.addEventListener("play", handlePlay, true);
    document.addEventListener("timeupdate", handleTimeUpdate, true);
    document.addEventListener("pause", handlePause, true);
    document.addEventListener("ended", handleEnded, true);
    document.addEventListener("seeking", handleSeeking, true);
    document.addEventListener("seeked", handleSeeked, true);
    document.addEventListener("ratechange", handleRateChange, true);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      window.clearInterval(heartbeat);
      flushActiveVideos("analytics_unmounted");
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("submit", handleSubmit);
      document.removeEventListener("play", handlePlay, true);
      document.removeEventListener("timeupdate", handleTimeUpdate, true);
      document.removeEventListener("pause", handlePause, true);
      document.removeEventListener("ended", handleEnded, true);
      document.removeEventListener("seeking", handleSeeking, true);
      document.removeEventListener("seeked", handleSeeked, true);
      document.removeEventListener("ratechange", handleRateChange, true);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, []);

  return null;
}
