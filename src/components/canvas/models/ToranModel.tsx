"use client";

// TODO: Replace with .glb asset (/public/models/toran.glb)
import { useRef } from "react";
import * as THREE from "three";
import { useScrollRange } from "@/hooks/useScrollRange";

export function ToranModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { crossFadeOpacity } = useScrollRange(0.12, 0.32);

  const marigoldMat = new THREE.MeshStandardMaterial({
    color: "#F2A33C",
    roughness: 0.6,
  });

  const leafMat = new THREE.MeshStandardMaterial({
    color: "#8A9A86",
    roughness: 0.5,
  });

  return (
    <group
      ref={groupRef}
      position={[0, 2.2, 2.2]}
      visible={crossFadeOpacity > 0.01}
    >
      {/* Hanging Garland Arch Line */}
      {Array.from({ length: 18 }).map((_, i) => {
        const x = (i - 8.5) * 0.35;
        const sagY = -Math.pow(x / 3, 2) * 0.4;
        return (
          <group key={i} position={[x, sagY, 0]}>
            {/* Alternate Marigold flower and Mango leaf */}
            {i % 2 === 0 ? (
              <mesh material={marigoldMat} castShadow>
                <dodecahedronGeometry args={[0.12, 1]} />
              </mesh>
            ) : (
              <mesh material={leafMat} rotation={[0.2, 0, 0.5]}>
                <coneGeometry args={[0.06, 0.3, 6]} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}
