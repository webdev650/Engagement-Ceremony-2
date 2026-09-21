"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Environment } from "@react-three/drei";
import { useScrollStore } from "@/store/useScrollStore";

export function EnvironmentLights() {
  const scrollProgress = useScrollStore((state) => state.scrollProgress);
  const dirLightRef = useRef<THREE.DirectionalLight>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Subtle candle flicker effect
    const flicker = Math.sin(time * 12) * 0.15 + Math.cos(time * 23) * 0.08 + 1.0;

    if (dirLightRef.current) {
      // Light dims slightly in footer dark night scene (scroll > 0.95)
      const footerDim = scrollProgress > 0.9 ? 1 - (scrollProgress - 0.9) * 8 : 1;
      dirLightRef.current.intensity = Math.max(0.2, 2.2 * flicker * Math.max(0.2, footerDim));
    }

    if (pointLightRef.current) {
      pointLightRef.current.intensity = 3.5 * flicker;
    }
  });

  return (
    <>
      {/* Warm ambient base */}
      <ambientLight intensity={0.6} color="#3D1A25" />

      {/* Main warm directional golden sunlight/candlelight */}
      <directionalLight
        ref={dirLightRef}
        position={[8, 12, 6]}
        color="#F1D49B"
        intensity={2.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0005}
      />

      {/* Warm flame point light near origin Diya */}
      <pointLight
        ref={pointLightRef}
        position={[0, 0.4, 0]}
        color="#F2A33C"
        intensity={3.5}
        distance={8}
        decay={2}
      />

      {/* Cool subtle rim/fill light */}
      <directionalLight position={[-6, 4, -8]} color="#8A9A86" intensity={0.5} />

      {/* R3F Drei Environment Preset for realistic gold/brass reflections */}
      <Environment preset="sunset" environmentIntensity={0.5} />
    </>
  );
}
