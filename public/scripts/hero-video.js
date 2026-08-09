(() => {
  const video = document.querySelector(".hero-video");
  const playButton = document.querySelector(".hero-video-play");

  if (!(video instanceof HTMLVideoElement) || !(playButton instanceof HTMLButtonElement)) return;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let userEnabledMotion = false;
  let lastKnownTime = video.currentTime;

  const showPlayButton = () => {
    playButton.hidden = false;
  };

  const startVideo = (userInitiated = false) => {
    if (userInitiated) {
      userEnabledMotion = true;
      video.classList.add("hero-video-user-enabled");
    }

    if (reducedMotion.matches && !userEnabledMotion) {
      showPlayButton();
      return;
    }

    video.muted = true;
    video.defaultMuted = true;
    const playAttempt = video.play();

    if (playAttempt) {
      playAttempt.then(() => {
        playButton.hidden = true;
      }).catch(() => {
        showPlayButton();
      });
    }
  };

  playButton.addEventListener("click", () => startVideo(true));
  video.addEventListener("playing", () => {
    playButton.hidden = true;
  });
  video.addEventListener("error", showPlayButton);
  video.addEventListener("canplay", startVideo, { once: true });
  window.addEventListener("pageshow", startVideo);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) startVideo();
  });

  startVideo();

  window.setInterval(() => {
    const loopedToStart = Number.isFinite(video.duration) && lastKnownTime > video.duration - 3 && video.currentTime < 3;
    const hasAdvanced = video.currentTime > lastKnownTime + 0.05 || loopedToStart;
    if (!hasAdvanced || video.paused) showPlayButton();
    lastKnownTime = video.currentTime;
  }, 2500);
})();
