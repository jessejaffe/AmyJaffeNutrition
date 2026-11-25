(function () {
  "use strict";

  var attempts = new WeakMap();
  var retryMessage = "We couldn't send your request. Please try again.";
  if (!window.fetch || !window.crypto || !window.crypto.randomUUID || !window.AbortController) return;

  document.addEventListener("submit", async function (event) {
    var form = event.target;
    if (!(form instanceof HTMLFormElement) || !form.getAttribute("action")?.startsWith("/api/inquiries/")) return;
    var status = form.querySelector(".inquiry-status");
    var button = form.querySelector('button[type="submit"]');
    if (!status || !button) return;

    event.preventDefault();
    if (button.disabled) return;

    var body = new URLSearchParams(new FormData(form));
    var values = body.toString();
    var attempt = attempts.get(form);
    if (!attempt || attempt.values !== values) {
      attempt = { values: values, id: Date.now() + "-" + window.crypto.randomUUID() };
      attempts.set(form, attempt);
    }
    body.set("_submission", attempt.id);

    button.disabled = true;
    status.textContent = "Sending your request…";
    var controller = new AbortController();
    var timer = window.setTimeout(function () { controller.abort(); }, 13000);

    try {
      var response = await fetch(form.action, {
        method: "POST",
        mode: "same-origin",
        headers: { Accept: "application/json" },
        body: body,
        signal: controller.signal,
      });
      var type = response.headers.get("Content-Type") || "";
      var result = type.includes("application/json") ? await response.json() : null;
      status.textContent = result?.message || retryMessage;
      if (response.ok && result?.message) {
        attempts.delete(form);
        if (new URLSearchParams(new FormData(form)).toString() === values) form.reset();
      }
    } catch {
      status.textContent = retryMessage;
    } finally {
      window.clearTimeout(timer);
      button.disabled = false;
    }
  });
}());
