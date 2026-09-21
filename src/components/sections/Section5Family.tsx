"use client";

import Image from "next/image";
import { weddingData } from "@/config/weddingData";

export function Section5Family() {
  const familyPortraits = [
    {
      imgSrc: "/images/bride.png",
      name: "Ananya Vance",
      relation: "The Bride",
      blessing: "With hearts full of love, we welcome you to bless our beloved daughter Ananya.",
    },
    {
      imgSrc: "/images/couple.png",
      name: "Ananya & Kabir",
      relation: "The Royal Couple",
      blessing: "Together with their families, inviting your presence to grace their sacred union.",
    },
    {
      imgSrc: "/images/groom.png",
      name: "Kabir Sterling",
      relation: "The Groom",
      blessing: "We rejoice in Kabir finding his soulmate and invite your sacred presence.",
    },
  ];

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 py-24 pointer-events-none">
      <div className="max-w-5xl w-full mx-auto pointer-events-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.35em] text-gold-400 font-sans block mb-2">
            Chapter V • Family &amp; Guardians
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl font-light text-ivory-100">
            With Gratitude &amp; Blessings
          </h2>
          <p className="font-serif italic text-blush text-lg sm:text-xl mt-2">
            &ldquo;Family is the golden thread that binds heart to heart.&rdquo;
          </p>
        </div>

        {/* Family Cards Grid with Photographs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {familyPortraits.map((item, idx) => (
            <div
              key={idx}
              className="bg-maroon-800/80 backdrop-blur-xl border border-gold-500/30 rounded-3xl p-6 text-center shadow-2xl hover:border-gold-400/60 transition-all duration-300 transform hover:-translate-y-2 group overflow-hidden"
            >
              {/* Image Frame */}
              <div className="relative w-full h-64 mb-6 rounded-2xl overflow-hidden border border-gold-500/40 shadow-inner">
                <Image
                  src={item.imgSrc}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/80 via-transparent to-transparent" />
              </div>

              <h3 className="font-serif text-2xl text-ivory-100 font-light mb-1">
                {item.name}
              </h3>
              <p className="text-xs uppercase tracking-widest text-gold-400 font-sans mb-3 font-semibold">
                {item.relation}
              </p>
              <p className="text-xs text-blush/85 font-sans leading-relaxed italic">
                &ldquo;{item.blessing}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
