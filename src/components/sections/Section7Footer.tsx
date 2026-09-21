"use client";

import { weddingData } from "@/config/weddingData";
import { ArrowUp, Heart } from "lucide-react";

export function Section7Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative min-h-[70vh] w-full flex flex-col justify-between items-center px-4 py-20 text-center pointer-events-none border-t border-gold-500/15 bg-gradient-to-b from-transparent to-maroon-950">
      <div className="max-w-3xl w-full mx-auto my-auto space-y-6 pointer-events-auto">
        {/* Sanskrit Thank You */}
        <p className="font-devanagari text-gold-400 text-2xl md:text-3xl tracking-widest">
          {weddingData.sanskritVerses.gratitudeFooter}
        </p>

        <p className="font-serif italic text-blush text-base md:text-lg max-w-lg mx-auto">
          &ldquo;{weddingData.sanskritVerses.gratitudeTranslation}&rdquo;
        </p>

        {/* Monogram */}
        <div className="font-serif text-4xl text-ivory-100 font-light tracking-widest pt-4">
          Ananya <span className="italic text-gold-400">&amp;</span> Kabir
        </div>

        <p className="text-xs text-gold-300/70 tracking-[0.25em] uppercase font-sans">
          Taj Lake Palace, Udaipur • October 24, 2026
        </p>

        {/* Back to Top Button */}
        <div className="pt-8">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-6 py-3 bg-maroon-800/80 border border-gold-500/40 rounded-full text-gold-300 hover:text-maroon-950 hover:bg-gold-400 text-xs tracking-widest uppercase font-sans transition-all shadow-lg"
          >
            <ArrowUp className="w-4 h-4" />
            Back To Top
          </button>
        </div>
      </div>

      <div className="text-[11px] text-blush/60 font-sans tracking-wider pt-8 pointer-events-auto">
        Crafted with <Heart className="w-3 h-3 text-gold-400 inline mx-1 fill-gold-400" /> for Ananya &amp; Kabir
      </div>
    </footer>
  );
}
