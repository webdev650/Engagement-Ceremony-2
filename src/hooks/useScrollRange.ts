import { useMemo } from "react";
import { useScrollStore } from "@/store/useScrollStore";

export interface ScrollRangeResult {
  inRange: boolean;
  progress: number; // 0 to 1 within range
  fadeInOpacity: number; // 0 to 1 as it enters
  fadeOutOpacity: number; // 1 to 0 as it exits
  crossFadeOpacity: number; // Smooth combined opacity
  scale: number; // Subtle scale 0.9 -> 1.0 -> 0.95
}

export function useScrollRange(start: number, end: number, fadeThreshold = 0.1): ScrollRangeResult {
  const scrollProgress = useScrollStore((state) => state.scrollProgress);

  return useMemo(() => {
    if (scrollProgress < start - fadeThreshold || scrollProgress > end + fadeThreshold) {
      return {
        inRange: false,
        progress: scrollProgress < start ? 0 : 1,
        fadeInOpacity: 0,
        fadeOutOpacity: 0,
        crossFadeOpacity: 0,
        scale: 0.8,
      };
    }

    const rangeLength = end - start;
    const rawProgress = (scrollProgress - start) / Math.max(0.0001, rangeLength);
    const clampedProgress = Math.max(0, Math.min(1, rawProgress));

    // Smooth fade in during first fraction
    const fadeIn = Math.min(1, Math.max(0, (scrollProgress - (start - fadeThreshold)) / fadeThreshold));
    
    // Smooth fade out during last fraction (0.85 - 1.0 of range)
    const fadeOutStart = end - fadeThreshold;
    const fadeOut = Math.min(1, Math.max(0, (end + fadeThreshold - scrollProgress) / fadeThreshold));

    const combinedOpacity = Math.min(fadeIn, fadeOut);

    // Scale calculation (subtle zoom as camera approaches)
    const scale = 0.9 + 0.1 * Math.sin(clampedProgress * Math.PI);

    return {
      inRange: true,
      progress: clampedProgress,
      fadeInOpacity: fadeIn,
      fadeOutOpacity: fadeOut,
      crossFadeOpacity: combinedOpacity,
      scale,
    };
  }, [scrollProgress, start, end, fadeThreshold]);
}
