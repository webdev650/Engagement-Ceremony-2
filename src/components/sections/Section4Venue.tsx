"use client";

import Image from "next/image";
import { weddingData } from "@/config/weddingData";
import { MapPin, Navigation, Car, Shirt } from "lucide-react";

export function Section4Venue() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 py-24 pointer-events-none">
      <div className="max-w-4xl w-full mx-auto pointer-events-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.35em] text-gold-400 font-sans block mb-2">
            Chapter IV • The Destination
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl font-light text-ivory-100">
            Heritage Venue
          </h2>
          <p className="font-serif italic text-blush text-lg sm:text-xl mt-2">
            Taj Lake Palace • Lake Pichola, Udaipur
          </p>
        </div>

        {/* Venue Glass Card */}
        <div className="bg-maroon-800/80 backdrop-blur-xl border border-gold-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Info Column */}
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-3xl text-gold-200 font-light mb-2">
                  {weddingData.venue.name}
                </h3>
                <p className="text-ivory-200 text-sm flex items-start gap-2 font-sans">
                  <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  {weddingData.venue.address}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs text-blush font-sans">
                  <Car className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>{weddingData.venue.valetNote}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-blush font-sans">
                  <Shirt className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Dress Code: <strong className="text-gold-300">{weddingData.venue.dressCode}</strong></span>
                </div>
              </div>

              {/* Maps CTA Button */}
              <a
                href={weddingData.venue.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gold-gradient text-maroon-950 font-sans font-semibold text-xs tracking-[0.15em] uppercase rounded-full shadow-lg hover:shadow-gold-500/40 transform hover:-translate-y-0.5 transition-all"
              >
                <Navigation className="w-4 h-4" />
                Open In Google Maps
              </a>
            </div>

            {/* Venue Photo Preview Box */}
            <div className="relative h-72 rounded-2xl border border-gold-500/40 overflow-hidden shadow-2xl group">
              <Image
                src="/images/venue.png"
                alt="Taj Lake Palace Udaipur"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/90 via-maroon-950/20 to-transparent flex flex-col justify-end p-6 text-left">
                <p className="font-serif text-xl text-ivory-100">
                  Taj Lake Palace, Udaipur
                </p>
                <p className="text-xs text-gold-300/90 font-sans mt-1">
                  Lake Pichola • Rajasthan 313001
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
