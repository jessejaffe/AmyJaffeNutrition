import posthog from "posthog-js";

posthog.init("phc_o9oPEFsMNotCLqMo7PQLp83DyfEbLqBi2iTzonzpBGVp", {
  api_host: "https://us.i.posthog.com",
  ui_host: "https://us.posthog.com",
  defaults: "2026-05-30",
  person_profiles: "identified_only",
  respect_dnt: true,
  disable_session_recording: true,
  capture_heatmaps: false,
  autocapture: {
    dom_event_allowlist: ["click"],
    element_allowlist: ["a", "button"],
    css_selector_ignorelist: [
      ".ph-no-autocapture",
      "[data-ph-no-autocapture]",
      "form *",
    ],
  },
});
