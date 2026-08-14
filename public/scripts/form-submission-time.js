(function () {
  "use strict";

  var FIELD_NAME = "Submitted at (Eastern Time)";
  var FORM_IDS = ["homepage-general-inquiry", "free-introductory-call"];
  var easternTimeFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  });

  document.addEventListener("submit", function (event) {
    var form = event.target;
    if (!(form instanceof HTMLFormElement) || FORM_IDS.indexOf(form.dataset.analyticsFormId || "") === -1) return;

    var submissionTime = form.elements.namedItem(FIELD_NAME);
    if (!(submissionTime instanceof HTMLInputElement)) return;

    submissionTime.value = easternTimeFormatter.format(new Date());
  }, true);
}());
