"use client";

import { weddingData } from "@/config/weddingData";
import { ChevronDown } from "lucide-react";

export function Section1Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between items-center px-4 py-16 text-center pointer-events-none">
      {/* Top Header Blessing */}
      <div className="pt-8 pointer-events-auto">
        <p className="font-devanagari text-gold-400 text-xl md:text-2xl tracking-[0.2em] mb-2 drop-shadow-md">
          {weddingData.sanskritVerses.blessingHeader}
        </p>
        <p className="text-xs uppercase tracking-[0.35em] text-blush/80 font-sans">
          Save The Date • Royal Celebration
        </p>
      </div>

      {/* Main Couple Titles */}
      <div className="my-auto max-w-4xl px-4 pointer-events-auto">
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-ivory-100 tracking-tight leading-none drop-shadow-2xl">
          {weddingData.couple.bride.split(" ")[0]}
          <span className="font-serif italic font-normal text-gold-400 mx-3 md:mx-6 inline-block">
            &amp;
          </span>
          {weddingData.couple.groom.split(" ")[0]}
        </h1>

        <p className="font-sans font-light text-base sm:text-lg md:text-xl text-blush max-w-xl mx-auto mt-6 leading-relaxed">
          {weddingData.couple.tagline}
        </p>

        {/* Date Pill Badge */}
        <div className="inline-flex items-center gap-3 px-6 py-3 mt-8 bg-maroon-800/60 backdrop-blur-md border border-gold-500/30 rounded-full shadow-2xl">
          <span className="font-serif text-gold-300 text-sm sm:text-base tracking-widest uppercase">
            {weddingData.eventDate.fullDate}
          </span>
          <span className="text-gold-500">•</span>
          <span className="font-devanagari text-gold-200 text-sm sm:text-base">
            {weddingData.eventDate.devanagariDate}
          </span>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="pb-6 flex flex-col items-center gap-2 text-gold-400 text-xs tracking-[0.3em] uppercase opacity-80 animate-float-gentle pointer-events-auto">
        <span>Scroll To Explore</span>
        <ChevronDown className="w-5 h-5 stroke-gold-400" />
      </div>
    </section>
  );
}
