"use client";

import { useState, useEffect } from "react";
import { useScrollStore } from "@/store/useScrollStore";

function toDevanagariNumerals(num: number): string {
  const devanagariDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
  return String(num)
    .split("")
    .map((digit) => devanagariDigits[parseInt(digit, 10)] || digit)
    .join("");
}

export function LoaderOverlay() {
  const [progress, setProgress] = useState(0);
  const setIsLoaded = useScrollStore((state) => state.setIsLoaded);
  const setIsLoading = useScrollStore((state) => state.setIsLoading);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            setIsLoaded(true);
            setIsLoading(false);
          }, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [setIsLoaded, setIsLoading]);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-maroon-950 transition-all duration-1000 ease-in-out ${
        progress >= 100 ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-6 text-center px-4">
        {/* Sanskrit Blessing Tag */}
        <span className="font-devanagari text-gold-500 text-lg md:text-xl tracking-widest animate-pulse">
          ॐ श्री गणेशाय नमः
        </span>

        {/* Monogram */}
        <div className="font-serif text-5xl md:text-7xl font-light text-ivory-200 tracking-widest my-2">
          A <span className="italic text-gold-400">&amp;</span> K
        </div>

        {/* Devanagari Counter */}
        <div className="font-devanagari text-4xl md:text-6xl text-marigold-500 font-bold min-w-[120px]">
          {toDevanagariNumerals(progress)}%
        </div>

        {/* Progress Bar */}
        <div className="w-48 h-1 bg-maroon-800 rounded-full overflow-hidden border border-gold-500/30">
          <div
            className="h-full bg-gold-gradient transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-xs uppercase tracking-[0.3em] text-blush/70 font-sans">
          Igniting Sacred Flame...
        </p>
      </div>
    </div>
  );
}
