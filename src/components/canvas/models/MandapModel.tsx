"use client";

// TODO: Replace with .glb asset (/public/models/mandap.glb - ≤ 40k tris, baked AO texture)
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollRange } from "@/hooks/useScrollRange";

export function MandapModel() {
  const groupRef = useRef<THREE.Group>(null);
  const fireRef = useRef<THREE.Mesh>(null);
  const { crossFadeOpacity, scale } = useScrollRange(0.15, 0.38);

  const pillarMaterial = new THREE.MeshStandardMaterial({
    color: "#C9A227",
    metalness: 0.7,
    roughness: 0.3,
  });

  const canopyMaterial = new THREE.MeshStandardMaterial({
    color: "#4A0E1A",
    roughness: 0.8,
  });

  const fireMaterial = new THREE.MeshStandardMaterial({
    color: "#FF4500",
    emissive: "#FF8C00",
    emissiveIntensity: 3.0,
  });

  useFrame((state) => {
    if (fireRef.current) {
      const time = state.clock.getElapsedTime();
      const s = 1.0 + Math.sin(time * 12) * 0.15;
      fireRef.current.scale.set(s, s * 1.3, s);
    }
  });

  return (
    <group
      ref={groupRef}
      position={[0, 0, -2.5]}
      scale={[scale * 0.85, scale * 0.85, scale * 0.85]}
      visible={crossFadeOpacity > 0.01}
    >
      {/* 4 Sacred Mandap Golden Pillars */}
      {[
        [-1.8, -1.8],
        [1.8, -1.8],
        [-1.8, 1.8],
        [1.8, 1.8],
      ].map(([x, z], i) => (
        <group key={i} position={[x, 1.5, z]}>
          <mesh material={pillarMaterial} castShadow>
            <cylinderGeometry args={[0.15, 0.2, 3, 16]} />
          </mesh>
          {/* Pillar Capital Ornament */}
          <mesh material={pillarMaterial} position={[0, 1.5, 0]}>
            <boxGeometry args={[0.4, 0.15, 0.4]} />
          </mesh>
        </group>
      ))}

      {/* Maroon & Gold Roof Canopy */}
      <mesh material={canopyMaterial} position={[0, 3.1, 0]} castShadow>
        <boxGeometry args={[4.2, 0.25, 4.2]} />
      </mesh>

      {/* Agni Kund (Sacred Fire Pit) at Center */}
      <group position={[0, 0.2, 0]}>
        {/* Tiered Brass Base */}
        <mesh material={pillarMaterial} castShadow>
          <boxGeometry args={[1.2, 0.2, 1.2]} />
        </mesh>
        <mesh material={pillarMaterial} position={[0, 0.15, 0]}>
          <boxGeometry args={[0.9, 0.15, 0.9]} />
        </mesh>

        {/* Sacred Flame */}
        <mesh ref={fireRef} material={fireMaterial} position={[0, 0.35, 0]}>
          <coneGeometry args={[0.25, 0.5, 12]} />
        </mesh>

        <pointLight position={[0, 0.5, 0]} color="#FF8C00" intensity={3} distance={5} />
      </group>
    </group>
  );
}
