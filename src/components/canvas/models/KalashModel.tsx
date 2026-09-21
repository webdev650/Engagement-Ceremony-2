"use client";

// TODO: Replace with .glb asset (/public/models/kalash.glb)
import { useRef } from "react";
import * as THREE from "three";
import { useScrollRange } from "@/hooks/useScrollRange";

export function KalashModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { crossFadeOpacity, scale } = useScrollRange(0.18, 0.38);

  const brassMat = new THREE.MeshStandardMaterial({
    color: "#C9A227",
    metalness: 0.8,
    roughness: 0.2,
  });

  const leafMat = new THREE.MeshStandardMaterial({
    color: "#2D5A27",
    roughness: 0.4,
  });

  const coconutMat = new THREE.MeshStandardMaterial({
    color: "#5C3A21",
    roughness: 0.9,
  });

  return (
    <group
      ref={groupRef}
      position={[1.5, 0.4, -1.8]}
      scale={[scale * 0.7, scale * 0.7, scale * 0.7]}
      visible={crossFadeOpacity > 0.01}
    >
      {/* Brass Kalash Vessel */}
      <mesh material={brassMat} castShadow position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.35, 24, 24]} />
      </mesh>
      <mesh material={brassMat} position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.22, 0.18, 0.2, 24]} />
      </mesh>

      {/* Mango Leaves Fan */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <mesh
          key={i}
          material={leafMat}
          position={[0, 0.72, 0]}
          rotation={[0.4, (deg * Math.PI) / 180, 0.3]}
        >
          <coneGeometry args={[0.08, 0.4, 8]} />
        </mesh>
      ))}

      {/* Sacred Coconut */}
      <mesh material={coconutMat} position={[0, 0.85, 0]} castShadow>
        <sphereGeometry args={[0.18, 16, 16]} />
      </mesh>
    </group>
  );
}
