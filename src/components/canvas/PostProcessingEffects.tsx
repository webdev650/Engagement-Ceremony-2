"use client";

import { useRef } from "react";
import { EffectComposer, Bloom, Vignette, DepthOfField, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useScrollStore } from "@/store/useScrollStore";
import { useDeviceCapabilities } from "@/hooks/useDeviceCapabilities";

export function PostProcessingEffects() {
  const scrollProgress = useScrollStore((state) => state.scrollProgress);
  const { enablePostProcessing, enableDOF } = useDeviceCapabilities();
  const dofRef = useRef<any>(null);

  if (!enablePostProcessing) {
    return null;
  }

  // Calculate focus distance dynamically based on scroll ranges
  const targetFocus = 0.02 + scrollProgress * 0.03;

  return (
    <EffectComposer enableNormalPass={false} multisampling={4}>
      {/* Warm cinematic flame & gold bloom */}
      <Bloom
        intensity={1.6}
        luminanceThreshold={0.5}
        luminanceSmoothing={0.85}
        mipmapBlur
      />

      {/* Shallow rack-focus Depth of Field */}
      {enableDOF && (
        <DepthOfField
          ref={dofRef}
          focusDistance={targetFocus}
          focalLength={0.05}
          bokehScale={4}
        />
      )}

      {/* Subtle organic film grain */}
      <Noise opacity={0.025} blendFunction={BlendFunction.OVERLAY} />

      {/* Dark maroon vignette framing */}
      <Vignette eskil={false} offset={0.25} darkness={0.85} />
    </EffectComposer>
  );
}
