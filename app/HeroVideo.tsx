const playbackScript = `(() => {
  const setBreezeSpeed = () => {
    const video = document.getElementById("hero-video");
    if (!(video instanceof HTMLVideoElement)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }
    video.defaultPlaybackRate = 1.35;
    video.playbackRate = 1.35;
  };
  setBreezeSpeed();
  document.addEventListener("DOMContentLoaded", setBreezeSpeed, { once: true });
  window.addEventListener("load", setBreezeSpeed, { once: true });
  window.setTimeout(setBreezeSpeed, 1000);
})();`;

export default function HeroVideo() {
  return (
    <>
      <video id="hero-video" className="hero-video" autoPlay muted loop playsInline preload="metadata" poster="images/meadow.avif" aria-hidden="true">
        <source src="video/dandelion-breeze.mp4" type="video/mp4" />
      </video>
      <script dangerouslySetInnerHTML={{ __html: playbackScript }} />
    </>
  );
}
