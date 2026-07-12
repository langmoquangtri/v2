import React, { useEffect, useRef, useState } from "react";

export function HeroParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [videoSrc, setVideoSrc] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 1024
        ? "https://pub-74197d4c4a464d7791ddee7a56de9461.r2.dev/hero%20banner%20mobile.mov"
        : "https://pub-74197d4c4a464d7791ddee7a56de9461.r2.dev/hero%20banner.mov";
    }
    return "https://pub-74197d4c4a464d7791ddee7a56de9461.r2.dev/hero%20banner.mov";
  });

  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const videoDurationRef = useRef(4.93); // Duration is approximately 4.93s

  useEffect(() => {
    // Check prefers-reduced-motion for accessibility
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const isMobileTablet = window.innerWidth < 1024;
      const targetSrc = isMobileTablet
        ? "https://pub-74197d4c4a464d7791ddee7a56de9461.r2.dev/hero%20banner%20mobile.mov"
        : "https://pub-74197d4c4a464d7791ddee7a56de9461.r2.dev/hero%20banner.mov";
      setVideoSrc(targetSrc);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = rect.height;
      const windowHeight = window.innerHeight;

      // When the top of container is at top of viewport, we start tracking progress
      const totalScrollable = containerHeight - windowHeight;
      const scrolled = -rect.top;

      let progress = scrolled / totalScrollable;
      progress = Math.max(0, Math.min(1, progress));

      setScrollProgress(progress);
      targetTimeRef.current = progress * videoDurationRef.current;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    // Initial run
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      if (videoRef.current) {
        // Display last frame for prefers-reduced-motion
        videoRef.current.currentTime = videoDurationRef.current;
      }
      return;
    }

    let animationFrameId: number;

    const updateVideoTime = () => {
      const video = videoRef.current;
      if (video) {
        if (video.duration && !isNaN(video.duration) && video.duration > 0) {
          videoDurationRef.current = video.duration;
        }

        // Smooth lerp: currentTime = current + (target - current) * lerpFactor
        const diff = targetTimeRef.current - currentTimeRef.current;

        // Use a standard smooth factor (0.08) for a luxurious, responsive drift
        if (Math.abs(diff) > 0.001) {
          currentTimeRef.current += diff * 0.08;
          // Clamp boundary values
          if (currentTimeRef.current < 0) currentTimeRef.current = 0;
          if (currentTimeRef.current > videoDurationRef.current) {
            currentTimeRef.current = videoDurationRef.current;
          }
          video.currentTime = currentTimeRef.current;
        }
      }
      animationFrameId = requestAnimationFrame(updateVideoTime);
    };

    animationFrameId = requestAnimationFrame(updateVideoTime);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  // Handle video meta load to capture exact duration
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video && video.duration && !isNaN(video.duration) && video.duration > 0) {
      videoDurationRef.current = video.duration;
    }
  };

  // Text Animation & Style Calculations
  let textOpacity = 0;
  let textTranslateY = 28;
  let textScale = 0.97;
  let overlayOpacity = 0;
  let bottomGradientOpacity = 0;

  if (prefersReducedMotion) {
    textOpacity = 1;
    textTranslateY = 0;
    textScale = 1;
    overlayOpacity = 1;
    bottomGradientOpacity = 1;
  } else {
    // Text fades in between 82% and 95% scroll progress
    if (scrollProgress >= 0.82) {
      const t = Math.min(1, (scrollProgress - 0.82) / 0.13); // 0.13 is range length (0.95 - 0.82)
      textOpacity = t;
      textTranslateY = 28 * (1 - t);
      textScale = 0.97 + 0.03 * t;
      overlayOpacity = t;
    }

    // Bottom gradient to blend with the next section fades in strongly in the last 10% scroll progress (90% to 100%)
    if (scrollProgress >= 0.90) {
      bottomGradientOpacity = (scrollProgress - 0.90) / 0.10;
    }
  }

  // Next section's background color is light cream (#F3F0E3) so we use that for transition
  const bottomGradientStyle = {
    background: `linear-gradient(to bottom, transparent 0%, rgba(243, 240, 227, 0.25) 60%, #F3F0E3 100%)`,
    opacity: bottomGradientOpacity,
  };

  return (
    <div
      ref={containerRef}
      id="hero-scroll-container"
      className={`relative w-full overflow-visible ${
        prefersReducedMotion
          ? "h-screen"
          : "h-[300vh] sm:h-[400vh] lg:h-[500vh]"
      }`}
    >
      {/* Sticky Viewport Frame */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0 bg-stone-gray">
        {/* Video Background */}
        <video
          ref={videoRef}
          aria-hidden="true"
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={handleLoadedMetadata}
          className="w-full h-full object-cover object-center absolute inset-0 z-0"
          src={videoSrc}
        />

        {/* Text-Readability Radial Overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(
              circle at center,
              rgba(255, 255, 255, 0.40) 0%,
              rgba(255, 255, 255, 0.15) 55%,
              rgba(255, 255, 255, 0) 80%
            )`,
            opacity: overlayOpacity,
          }}
        />

        {/* Brand Text Content Container */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 pointer-events-none">
          <div
            className="text-center transition-all duration-100 ease-out flex flex-col items-center max-w-4xl"
            style={{
              opacity: textOpacity,
              transform: `translateY(${textTranslateY}px) scale(${textScale})`,
            }}
          >
            {/* Elegant Heading */}
            <h1 
              className="font-serif font-extrabold text-stone-charcoal text-center tracking-tight leading-[1.05]"
              style={{
                fontSize: "clamp(38px, 6.5vw, 88px)",
                textShadow: "0 2px 12px rgba(255, 255, 255, 0.6)",
              }}
            >
              Lăng mộ đá Quảng Trị
            </h1>

            {/* Accent Line */}
            <div className="w-20 h-[2px] bg-red-clay/80 my-5 rounded-full" />

            {/* Elegant Subheading */}
            <p
              className="font-sans font-semibold tracking-[0.16em] text-red-clay uppercase text-center"
              style={{
                fontSize: "clamp(13px, 1.8vw, 22px)",
                textShadow: "0 1px 4px rgba(255, 255, 255, 0.8)",
              }}
            >
              Kiến tạo giá trị vĩnh hằng
            </p>
          </div>
        </div>

        {/* Bottom Seamless Transition Gradient Overlay */}
        <div
          className="absolute bottom-0 left-0 w-full h-[30vh] z-10 pointer-events-none transition-opacity duration-300"
          style={bottomGradientStyle}
        />

        {/* Tiny scroll-down indicator (visible only when at the top) */}
        {!prefersReducedMotion && scrollProgress < 0.15 && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 animate-bounce opacity-80">
            <span className="text-[9px] font-mono tracking-[0.25em] text-deep-navy uppercase font-bold">cuộn xuống</span>
            <svg
              className="w-4 h-4 text-deep-navy"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
