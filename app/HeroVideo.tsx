const playbackScript = `(() => {
  const video = document.getElementById("hero-video");
  if (!(video instanceof HTMLVideoElement)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    video.pause();
    return;
  }
  const setBreezeSpeed = () => {
    video.defaultPlaybackRate = 1.35;
    video.playbackRate = 1.35;
  };
  setBreezeSpeed();
  video.addEventListener("loadedmetadata", setBreezeSpeed, { once: true });
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
