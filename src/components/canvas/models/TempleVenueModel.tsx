"use client";

// TODO: Replace with .glb asset (/public/models/temple_venue.glb - low-poly with baked AO)
import { useRef } from "react";
import * as THREE from "three";
import { useScrollRange } from "@/hooks/useScrollRange";

export function TempleVenueModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { crossFadeOpacity, scale } = useScrollRange(0.55, 0.72);

  const stoneMat = new THREE.MeshStandardMaterial({
    color: "#EEDECA",
    roughness: 0.7,
  });

  const domeMat = new THREE.MeshStandardMaterial({
    color: "#C9A227",
    metalness: 0.8,
    roughness: 0.25,
  });

  const accentMat = new THREE.MeshStandardMaterial({
    color: "#4A0E1A",
    roughness: 0.6,
  });

  return (
    <group
      ref={groupRef}
      position={[0, 0, -3.0]}
      scale={[scale * 0.9, scale * 0.9, scale * 0.9]}
      visible={crossFadeOpacity > 0.01}
    >
      {/* Heritage Palace Base Platform */}
      <mesh material={stoneMat} position={[0, 0.2, 0]} receiveShadow castShadow>
        <boxGeometry args={[6.0, 0.4, 4.5]} />
      </mesh>

      {/* Main Palace Arch Entrance Wall */}
      <mesh material={stoneMat} position={[0, 1.6, 0]} castShadow>
        <boxGeometry args={[4.2, 2.4, 2.2]} />
      </mesh>

      {/* Central Golden Dome (Shikhara/Chhatri) */}
      <mesh material={domeMat} position={[0, 3.4, 0]} castShadow>
        <sphereGeometry args={[0.9, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.65]} />
      </mesh>
      <mesh material={domeMat} position={[0, 4.1, 0]}>
        <coneGeometry args={[0.15, 0.6, 12]} />
      </mesh>

      {/* Flanking Side Turrets / Chhatris */}
      {[-2.2, 2.2].map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          <mesh material={stoneMat} position={[0, 1.4, 0]} castShadow>
            <cylinderGeometry args={[0.6, 0.7, 2.0, 16]} />
          </mesh>
          <mesh material={domeMat} position={[0, 2.7, 0]} castShadow>
            <sphereGeometry args={[0.5, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
          </mesh>
        </group>
      ))}

      {/* Jharokha Decorative Arches */}
      <mesh material={accentMat} position={[0, 1.8, 1.15]}>
        <boxGeometry args={[1.4, 1.2, 0.08]} />
      </mesh>

      {/* Warm Uplight Spotlights illuminating palace façade */}
      <spotLight
        position={[0, 0.5, 2.5]}
        target-position={[0, 2.5, 0]}
        color="#F1D49B"
        intensity={4.5}
        angle={0.6}
        penumbra={0.5}
        castShadow
      />
    </group>
  );
}
