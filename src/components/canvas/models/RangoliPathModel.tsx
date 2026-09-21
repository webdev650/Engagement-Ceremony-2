"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollRange } from "@/hooks/useScrollRange";
import { useScrollStore } from "@/store/useScrollStore";

export function RangoliPathModel() {
  const groupRef = useRef<THREE.Group>(null);
  const scrollProgress = useScrollStore((state) => state.scrollProgress);
  const { crossFadeOpacity, scale } = useScrollRange(0.35, 0.58);

  const goldMat = new THREE.MeshStandardMaterial({
    color: "#C9A227",
    metalness: 0.8,
    roughness: 0.2,
    emissive: "#C9A227",
    emissiveIntensity: 0.3,
  });

  const maroonMat = new THREE.MeshStandardMaterial({
    color: "#4A0E1A",
    roughness: 0.6,
  });

  // 4 Event Stations along Rangoli Path
  const stations = [
    { x: -3.0, z: 0.5, label: "Ganesh Puja" },
    { x: -1.0, z: -0.5, label: "Haldi & Mehendi" },
    { x: 1.0, z: 0.5, label: "Sangeet" },
    { x: 3.0, z: -0.5, label: "Shubh Vivah" },
  ];

  return (
    <group
      ref={groupRef}
      position={[0, 0, 0]}
      scale={[scale, scale, scale]}
      visible={crossFadeOpacity > 0.01}
    >
      {/* Curved Luminous Rangoli Path Base Disc */}
      <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 3]} />
        <meshStandardMaterial color="#1F1315" roughness={0.9} />
      </mesh>

      {/* Decorative Rangoli Concentric Rings */}
      {[0.5, 1.2, 2.0, 2.8].map((r, idx) => (
        <mesh key={idx} position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[r, r + 0.04, 64]} />
          <meshBasicMaterial color="#F2A33C" transparent opacity={0.6} />
        </mesh>
      ))}

      {/* 4 Floating Diyas along timeline path */}
      {stations.map((st, i) => {
        // Light up diya sequentially based on scroll progress in schedule range
        const targetProgress = 0.38 + i * 0.045;
        const isLit = scrollProgress >= targetProgress;

        return (
          <group key={i} position={[st.x, 0.2, st.z]}>
            {/* Pedestal Star */}
            <mesh material={goldMat} position={[0, -0.1, 0]}>
              <cylinderGeometry args={[0.3, 0.3, 0.05, 8]} />
            </mesh>

            {/* Diya Bowl */}
            <mesh material={goldMat} castShadow>
              <coneGeometry args={[0.22, 0.15, 16]} />
            </mesh>

            {/* Flame */}
            <mesh position={[0, 0.15, 0]}>
              <coneGeometry args={[0.06, 0.18, 12]} />
              <meshStandardMaterial
                color={isLit ? "#FFD700" : "#2B1620"}
                emissive={isLit ? "#FF4500" : "#000000"}
                emissiveIntensity={isLit ? 3.5 : 0}
              />
            </mesh>

            {/* Diya Light when active */}
            {isLit && (
              <pointLight color="#F2A33C" intensity={3} distance={2.5} />
            )}
          </group>
        );
      })}
    </group>
  );
}
