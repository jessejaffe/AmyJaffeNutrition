"use client";

import { useEffect, useRef } from "react";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }

    video.defaultPlaybackRate = 1.35;
    video.playbackRate = 1.35;
  }, []);

  return (
    <video ref={videoRef} className="hero-video" autoPlay muted loop playsInline preload="metadata" poster="images/meadow.avif" aria-hidden="true">
      <source src="video/dandelion-breeze.mp4" type="video/mp4" />
    </video>
  );
}
