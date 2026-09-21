"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useScrollRange } from "@/hooks/useScrollRange";

export function PhotoFramesModel() {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const { crossFadeOpacity, scale } = useScrollRange(0.68, 0.86);

  // Load generated public textures
  const brideTexture = useTexture("/images/bride.png");
  const coupleTexture = useTexture("/images/couple.png");
  const groomTexture = useTexture("/images/groom.png");

  const frameMaterial = new THREE.MeshStandardMaterial({
    color: "#C9A227",
    metalness: 0.85,
    roughness: 0.2,
  });

  const frames = [
    {
      pos: [-1.8, 1.2, 0.5] as [number, number, number],
      rot: [0, 0.25, 0] as [number, number, number],
      texture: brideTexture,
      label: "Bride Ananya",
    },
    {
      pos: [0, 1.4, 0.8] as [number, number, number],
      rot: [0, 0, 0] as [number, number, number],
      texture: coupleTexture,
      label: "Ananya & Kabir",
    },
    {
      pos: [1.8, 1.2, 0.5] as [number, number, number],
      rot: [0, -0.25, 0] as [number, number, number],
      texture: groomTexture,
      label: "Groom Kabir",
    },
  ];

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Gentle 3D floating animation
    groupRef.current.children.forEach((child, i) => {
      const isHovered = hoveredIdx === i;
      const targetY = frames[i].pos[1] + Math.sin(time * 1.5 + i) * 0.05 + (isHovered ? 0.12 : 0);
      child.position.y += (targetY - child.position.y) * 0.1;
    });
  });

  return (
    <group
      ref={groupRef}
      position={[0, 0, 0]}
      scale={[scale, scale, scale]}
      visible={crossFadeOpacity > 0.01}
    >
      {frames.map((fr, idx) => (
        <group
          key={idx}
          position={fr.pos}
          rotation={fr.rot}
          onPointerOver={() => setHoveredIdx(idx)}
          onPointerOut={() => setHoveredIdx(null)}
        >
          {/* Outer Carved Gold Frame */}
          <mesh material={frameMaterial} castShadow>
            <boxGeometry args={[1.2, 1.5, 0.08]} />
          </mesh>

          {/* Inner Textured Photo Canvas */}
          <mesh position={[0, 0, 0.045]}>
            <planeGeometry args={[1.08, 1.38]} />
            <meshStandardMaterial map={fr.texture} roughness={0.3} />
          </mesh>

          {/* Frame Title Plaque */}
          <mesh material={frameMaterial} position={[0, -0.85, 0.04]}>
            <boxGeometry args={[0.9, 0.18, 0.04]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
