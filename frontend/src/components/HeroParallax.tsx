import React, { useEffect, useRef, useState } from "react";

export function HeroParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 1024;
    }
    return false;
  });
  const [videoSrc, setVideoSrc] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 1024
        ? "https://images.langmodaquangtri.com/hero%20banner%20mobile.mov"
        : "https://images.langmodaquangtri.com/hero%20banner.mov";
    }
    return "https://images.langmodaquangtri.com/hero%20banner.mov";
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
      setIsMobile(isMobileTablet);
      const targetSrc = isMobileTablet
        ? "https://images.langmodaquangtri.com/hero%20banner%20mobile.mov"
        : "https://images.langmodaquangtri.com/hero%20banner.mov";
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

    if (isMobile) {
      // On mobile devices, we disable programmatic currentTime scrubbing to prevent hardware decoder lag/freezing.
      return;
    }

    let animationFrameId: number;

    const updateVideoTime = () => {
      const video = videoRef.current;
      if (video) {
        if (video.duration && !isNaN(video.duration) && video.duration > 0) {
          videoDurationRef.current = video.duration;
        }

        const diff = targetTimeRef.current - currentTimeRef.current;

        // CRITICAL MOBILE SEEK GUARD:
        // Android Chrome and iOS Safari throttle video seeking if multiple requests are queued.
        // We MUST verify !video.seeking before applying the next frame seek.
        if (Math.abs(diff) > 0.01) {
          if (!video.seeking) {
            // Apply step with a smooth interpolation factor (0.12 is responsive yet smooth)
            currentTimeRef.current += diff * 0.12;
            
            // Clamp boundary values
            if (currentTimeRef.current < 0) currentTimeRef.current = 0;
            if (currentTimeRef.current > videoDurationRef.current) {
              currentTimeRef.current = videoDurationRef.current;
            }
            
            try {
              video.currentTime = currentTimeRef.current;
            } catch (err) {
              console.log("Seek error on scroll:", err);
            }
          }
        }
      }
      animationFrameId = requestAnimationFrame(updateVideoTime);
    };

    animationFrameId = requestAnimationFrame(updateVideoTime);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion, isMobile]);

  // Handle video meta load to capture exact duration
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      // Force DOM properties to satisfy iOS Safari guidelines
      video.muted = true;
      video.playsInline = true;
      if (video.duration && !isNaN(video.duration) && video.duration > 0) {
        videoDurationRef.current = video.duration;
      }
      // Force rendering of the first frame on iOS/Android
      try {
        video.currentTime = 0.001;
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Dedicated useEffect to unlock/warm-up and configure video playback on real mobile devices (iOS/Android)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Enforce DOM properties for Safari & Chrome mobile engines
    video.muted = true;
    video.playsInline = true;

    if (isMobile) {
      video.loop = true;
      const startPlayback = async () => {
        try {
          video.muted = true;
          video.playsInline = true;
          const playPromise = video.play();
          if (playPromise !== undefined) {
            await playPromise;
          }
        } catch (err) {
          console.log("Mobile video autoplay was prevented, retrying on interaction:", err);
        }
      };
      
      startPlayback();

      // Fallback: play on user interaction to bypass aggressive power-saving or autoplay restrictions
      const handleUserInteraction = () => {
        if (video.paused) {
          video.play().catch(e => console.log("Play failed on interaction:", e));
        }
        window.removeEventListener("touchstart", handleUserInteraction);
        window.removeEventListener("click", handleUserInteraction);
        window.removeEventListener("scroll", handleUserInteraction);
      };

      window.addEventListener("touchstart", handleUserInteraction, { passive: true });
      window.addEventListener("click", handleUserInteraction, { passive: true });
      window.addEventListener("scroll", handleUserInteraction, { passive: true });

      return () => {
        window.removeEventListener("touchstart", handleUserInteraction);
        window.removeEventListener("click", handleUserInteraction);
        window.removeEventListener("scroll", handleUserInteraction);
      };
    } else {
      // Desktop behavior: pause video so scrolling can scrub frames
      video.loop = false;
      video.pause();
      try {
        video.currentTime = 0.001;
      } catch (e) {
        console.error(e);
      }
    }
  }, [videoSrc, isMobile]);

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
  } else if (isMobile) {
    // Mobile behavior: text is visible from the beginning, then pulls up and fades out as user scrolls down
    const fadeEnd = 0.35; // Fades out completely by 35% scroll progress
    if (scrollProgress <= fadeEnd) {
      const t = scrollProgress / fadeEnd; // t goes from 0 to 1
      textOpacity = 1 - t; // goes from 1 to 0
      textTranslateY = -60 * t; // pulls up (moves upwards by 60px)
      textScale = 1 - 0.04 * t; // slightly scales down
      overlayOpacity = 1 - t; // overlay fades out as text fades out
    } else {
      textOpacity = 0;
      textTranslateY = -60;
      textScale = 0.96;
      overlayOpacity = 0;
    }

    // Bottom gradient to blend with next section on mobile
    if (scrollProgress >= 0.80) {
      bottomGradientOpacity = Math.min(1, (scrollProgress - 0.80) / 0.20);
    }
  } else {
    // Desktop behavior: text fades in at the end of the scroll
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

  // Next section's background color is white so we use that for transition
  const bottomGradientStyle = {
    background: `linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.25) 60%, #ffffff 100%)`,
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
          autoPlay={isMobile}
          loop={isMobile}
          onLoadedMetadata={handleLoadedMetadata}
          className="w-full h-full object-cover object-center absolute inset-0 z-0 bg-stone-gray transition-transform duration-75 ease-out"
          style={{
            transform: isMobile
              ? `translate3d(0, ${scrollProgress * -80}px, 0) scale(1.1)`
              : `scale(${1 + scrollProgress * 0.03})`,
            willChange: "transform",
          }}
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
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pb-[25vh] lg:pb-0 px-4 pointer-events-none">
          <div
            className="text-center transition-all duration-100 ease-out flex flex-col items-center max-w-4xl"
            style={{
              opacity: textOpacity,
              transform: `translateY(${textTranslateY}px) scale(${textScale})`,
            }}
          >
            {/* Elegant Heading */}
            <h1 
              className="font-serif font-extrabold text-deep-navy text-center tracking-tight leading-[1.05]"
              style={{
                fontSize: "clamp(38px, 6.5vw, 88px)",
                textShadow: "0 2px 12px rgba(255, 255, 255, 0.6)",
              }}
            >
              LĂNG MỘ ĐÁ QUẢNG TRỊ
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
