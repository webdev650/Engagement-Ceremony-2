import { useState, useEffect } from "react";

export interface DeviceCapabilities {
  isMobile: boolean;
  isLowTierGPU: boolean;
  prefersReducedMotion: boolean;
  maxDpr: number;
  particleMultiplier: number;
  enablePostProcessing: boolean;
  enableDOF: boolean;
}

export function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isMobile: false,
    isLowTierGPU: false,
    prefersReducedMotion: false,
    maxDpr: 1.75,
    particleMultiplier: 1.0,
    enablePostProcessing: true,
    enableDOF: true,
  });

  useEffect(() => {
    const isTouch = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    const isMobileWidth = typeof window !== "undefined" && window.innerWidth < 768;
    const isMobileDevice = isTouch || isMobileWidth;

    const motionQuery = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)");
    const reducedMotion = motionQuery ? motionQuery.matches : false;

    // Check basic hardware concurrency / device memory if available
    const nav = typeof navigator !== "undefined" ? (navigator as any) : {};
    const hardwareConcurrency = nav.hardwareConcurrency || 4;
    const deviceMemory = nav.deviceMemory || 4;

    const isLowTier = isMobileDevice || hardwareConcurrency <= 2 || deviceMemory <= 2;

    setCapabilities({
      isMobile: isMobileDevice,
      isLowTierGPU: isLowTier,
      prefersReducedMotion: reducedMotion,
      maxDpr: isLowTier ? 1.0 : 1.75,
      particleMultiplier: isLowTier ? 0.4 : 1.0,
      enablePostProcessing: !isLowTier && !reducedMotion,
      enableDOF: !isLowTier && !reducedMotion,
    });

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setCapabilities((prev) => ({
        ...prev,
        prefersReducedMotion: e.matches,
      }));
    };

    if (motionQuery && motionQuery.addEventListener) {
      motionQuery.addEventListener("change", handleMotionChange);
      return () => motionQuery.removeEventListener("change", handleMotionChange);
    }
  }, []);

  return capabilities;
}
