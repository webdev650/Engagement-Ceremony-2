"use client";

// TODO: Replace with .glb asset (/public/models/diya.glb - ≤ 8k tris, brass PBR material)
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollRange } from "@/hooks/useScrollRange";
import { useScrollStore } from "@/store/useScrollStore";

export function DiyaModel() {
  const meshRef = useRef<THREE.Group>(null);
  const flameRef = useRef<THREE.Mesh>(null);
  const flameLightRef = useRef<THREE.PointLight>(null);
  
  // Active in Hero section (scroll range 0.0 to 0.25)
  const { crossFadeOpacity, scale } = useScrollRange(0.0, 0.25);
  const scrollProgress = useScrollStore((state) => state.scrollProgress);

  // Brass material setup
  const brassMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#C9A227",
      metalness: 0.85,
      roughness: 0.25,
    });
  }, []);

  // Flame material with warm emissive glow
  const flameMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#FFD700",
      emissive: "#FF4500",
      emissiveIntensity: 3.5,
      roughness: 0.1,
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Flame flicker animation
    if (flameRef.current) {
      const flickerScale = 1.0 + Math.sin(time * 15) * 0.12 + Math.sin(time * 28) * 0.08;
      flameRef.current.scale.set(flickerScale, flickerScale * 1.2, flickerScale);
    }

    if (flameLightRef.current) {
      flameLightRef.current.intensity = 4.0 + Math.sin(time * 18) * 0.8;
    }

    if (meshRef.current) {
      // Gentle floating rotation
      meshRef.current.rotation.y = time * 0.15;
    }
  });

  return (
    <group
      ref={meshRef}
      position={[0, 0, 0]}
      scale={[scale, scale, scale]}
      visible={crossFadeOpacity > 0.01}
    >
      {/* Brass Lamp Base Bowl */}
      <mesh material={brassMaterial} castShadow receiveShadow position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.6, 0.25, 0.3, 32]} />
      </mesh>

      {/* Flared Rim */}
      <mesh material={brassMaterial} castShadow position={[0, 0.3, 0]}>
        <torusGeometry args={[0.58, 0.05, 16, 32]} />
      </mesh>

      {/* Center Pedestal Stem */}
      <mesh material={brassMaterial} castShadow position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.2, 0.45, 0.2, 32]} />
      </mesh>

      {/* Unlit Wick turning into flame */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.02, 0.03, 0.12, 12]} />
        <meshStandardMaterial color="#2B1620" roughness={0.9} />
      </mesh>

      {/* Ignited Flame Teardrop Mesh */}
      <mesh ref={flameRef} material={flameMaterial} position={[0, 0.45, 0]}>
        <coneGeometry args={[0.08, 0.25, 16]} />
      </mesh>

      {/* Flame Point Light */}
      <pointLight
        ref={flameLightRef}
        position={[0, 0.48, 0]}
        color="#F2A33C"
        intensity={4}
        distance={6}
        decay={2}
      />
    </group>
  );
}
