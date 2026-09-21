"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useDeviceCapabilities } from "@/hooks/useDeviceCapabilities";
import { CameraRig } from "./CameraRig";
import { EnvironmentLights } from "./EnvironmentLights";
import { PostProcessingEffects } from "./PostProcessingEffects";
import { FloatingEmbers } from "./FloatingEmbers";
import { InstancedMarigolds } from "./InstancedMarigolds";
import { InstancedPetals } from "./InstancedPetals";

import { DiyaModel } from "./models/DiyaModel";
import { MandapModel } from "./models/MandapModel";
import { KalashModel } from "./models/KalashModel";
import { ToranModel } from "./models/ToranModel";
import { RangoliPathModel } from "./models/RangoliPathModel";
import { TempleVenueModel } from "./models/TempleVenueModel";
import { PhotoFramesModel } from "./models/PhotoFramesModel";
import { ShankhEnvelopeModel } from "./models/ShankhEnvelopeModel";

export function CanvasContainer() {
  const { maxDpr, prefersReducedMotion } = useDeviceCapabilities();

  if (prefersReducedMotion) {
    return null; // Accessible static fallback when user prefers reduced motion
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-screen h-screen overflow-hidden bg-maroon-950">
      <Canvas
        dpr={[1, maxDpr]}
        shadows
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: false,
        }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 50,
          position: [0, 0.4, 1.2],
        }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <CameraRig />
          <EnvironmentLights />

          {/* Instanced Particle Systems */}
          <FloatingEmbers />
          <InstancedMarigolds />
          <InstancedPetals />

          {/* Storyboard 3D Scene Models */}
          <DiyaModel />
          <MandapModel />
          <KalashModel />
          <ToranModel />
          <RangoliPathModel />
          <TempleVenueModel />
          <PhotoFramesModel />
          <ShankhEnvelopeModel />

          {/* Post-Processing Effects Pipeline */}
          <PostProcessingEffects />
        </Suspense>
      </Canvas>
    </div>
  );
}
