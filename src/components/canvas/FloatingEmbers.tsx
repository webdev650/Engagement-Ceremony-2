"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useDeviceCapabilities } from "@/hooks/useDeviceCapabilities";

export function FloatingEmbers() {
  const pointsRef = useRef<THREE.Points>(null);
  const { particleMultiplier } = useDeviceCapabilities();
  const count = Math.floor(400 * particleMultiplier);

  const [positions, speeds, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const phs = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;     // x
      pos[i * 3 + 1] = Math.random() * 8 - 1;      // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;   // z

      spd[i] = 0.2 + Math.random() * 0.5;
      phs[i] = Math.random() * Math.PI * 2;
    }

    return [pos, spd, phs];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const positionAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = positionAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      // Y rising movement
      array[i * 3 + 1] += speeds[i] * delta;
      if (array[i * 3 + 1] > 9) {
        array[i * 3 + 1] = -1;
      }

      // Sine sway X & Z
      array[i * 3] += Math.sin(time + phases[i]) * 0.003;
      array[i * 3 + 2] += Math.cos(time + phases[i] * 1.5) * 0.003;
    }

    positionAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#F2A33C"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
