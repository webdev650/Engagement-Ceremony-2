"use client";

import { weddingData } from "@/config/weddingData";

export function Section3Schedule() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 py-24 pointer-events-none">
      <div className="max-w-4xl w-full mx-auto pointer-events-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.35em] text-gold-400 font-sans block mb-2">
            Chapter III • Wedding Itinerary
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl font-light text-ivory-100">
            Celebration Schedule
          </h2>
          <p className="font-sans text-blush text-sm sm:text-base mt-2">
            Follow the illuminated rangoli path through each joyful ceremony.
          </p>
        </div>

        {/* Timeline Event Cards */}
        <div className="relative border-l-2 border-gold-500/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
          {weddingData.events.map((ev, i) => (
            <div key={ev.id} className="relative group">
              {/* Glowing Diya Marker Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1 w-5 h-5 rounded-full bg-maroon-900 border-2 border-gold-400 group-hover:bg-gold-400 transition-colors duration-300 shadow-[0_0_12px_rgba(201,166,103,0.6)]" />

              {/* Event Card */}
              <div className="bg-maroon-800/80 backdrop-blur-xl border border-gold-500/20 rounded-2xl p-6 shadow-xl group-hover:border-gold-400/50 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <span className="font-serif text-2xl text-ivory-100 font-light">
                    {ev.title}
                  </span>
                  <span className="font-devanagari text-gold-400 text-lg">
                    {ev.sanskritTitle}
                  </span>
                </div>

                <p className="text-sm text-blush/90 font-sans mb-4">
                  {ev.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-gold-300 tracking-wider uppercase font-medium">
                  <span className="bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20">
                    {ev.date}
                  </span>
                  <span className="bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20">
                    {ev.time}
                  </span>
                  <span className="text-gold-400">
                    📍 {ev.venue}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
