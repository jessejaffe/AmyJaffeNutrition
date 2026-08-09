(() => {
  const video = document.querySelector(".hero-video");
  const playButton = document.querySelector(".hero-video-play");

  if (!(video instanceof HTMLVideoElement) || !(playButton instanceof HTMLButtonElement)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const startVideo = () => {
    video.muted = true;
    video.defaultMuted = true;
    const playAttempt = video.play();

    if (playAttempt) {
      playAttempt.then(() => {
        playButton.hidden = true;
      }).catch(() => {
        playButton.hidden = false;
      });
    }
  };

  playButton.addEventListener("click", startVideo);
  video.addEventListener("canplay", startVideo, { once: true });
  window.addEventListener("pageshow", startVideo);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) startVideo();
  });

  startVideo();
})();
