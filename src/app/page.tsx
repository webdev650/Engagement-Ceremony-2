"use client";

import { CanvasContainer } from "@/components/canvas/CanvasContainer";
import { LoaderOverlay } from "@/components/sections/LoaderOverlay";
import { Section1Hero } from "@/components/sections/Section1Hero";
import { Section2PujaDetails } from "@/components/sections/Section2PujaDetails";
import { Section3Schedule } from "@/components/sections/Section3Schedule";
import { Section4Venue } from "@/components/sections/Section4Venue";
import { Section5Family } from "@/components/sections/Section5Family";
import { Section6RSVP } from "@/components/sections/Section6RSVP";
import { Section7Footer } from "@/components/sections/Section7Footer";

export default function Home() {
  return (
    <main className="relative w-full bg-maroon-950">
      {/* Devanagari Loading Overlay */}
      <LoaderOverlay />

      {/* Persistent WebGL 3D Canvas Scene */}
      <CanvasContainer />

      {/* DOM Content Sections scrolling on top */}
      <div className="relative z-10 w-full">
        <Section1Hero />
        <Section2PujaDetails />
        <Section3Schedule />
        <Section4Venue />
        <Section5Family />
        <Section6RSVP />
        <Section7Footer />
      </div>
    </main>
  );
}
