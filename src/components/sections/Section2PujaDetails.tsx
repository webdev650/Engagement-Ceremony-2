"use client";

import { weddingData } from "@/config/weddingData";
import { Sparkles, Sun, Flame, Heart } from "lucide-react";

export function Section2PujaDetails() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 py-24 pointer-events-none">
      <div className="max-w-4xl w-full mx-auto pointer-events-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.35em] text-gold-400 font-sans block mb-2">
            Chapter II • Sacred Ceremonies
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl font-light text-ivory-100">
            Auspicious Rituals &amp; Puja
          </h2>
          <p className="font-serif italic text-blush text-lg sm:text-xl mt-3 max-w-lg mx-auto">
            &ldquo;As the sacred fire blazes, two souls unite under divine grace.&rdquo;
          </p>
        </div>

        {/* Ritual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {weddingData.events.slice(0, 2).map((ev, idx) => (
            <div
              key={ev.id}
              className="bg-maroon-800/70 backdrop-blur-xl border border-gold-500/25 rounded-3xl p-8 shadow-2xl hover:border-gold-400/50 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-gold-500/15 border border-gold-400/40 flex items-center justify-center text-gold-400">
                  {idx === 0 ? <Flame className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                </div>
                <span className="font-devanagari text-gold-300 text-lg">
                  {ev.sanskritTitle}
                </span>
              </div>

              <h3 className="font-serif text-2xl text-ivory-100 font-light mb-2">
                {ev.title}
              </h3>
              <p className="text-sm text-blush/90 leading-relaxed font-sans mb-4">
                {ev.description}
              </p>

              <div className="flex items-center justify-between text-xs text-gold-300 tracking-wider font-sans border-t border-gold-500/15 pt-4">
                <span>{ev.date} • {ev.time}</span>
                <span className="uppercase text-gold-400 font-medium">{ev.venue}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
