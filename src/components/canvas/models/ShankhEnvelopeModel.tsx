"use client";

// TODO: Replace with .glb asset (/public/models/shankh.glb & envelope.glb)
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollRange } from "@/hooks/useScrollRange";
import { useScrollStore } from "@/store/useScrollStore";

export function ShankhEnvelopeModel() {
  const groupRef = useRef<THREE.Group>(null);
  const flapRef = useRef<THREE.Mesh>(null);
  const isRsvpSubmitted = useScrollStore((state) => state.isRsvpSubmitted);
  const { crossFadeOpacity, scale } = useScrollRange(0.84, 0.96);

  const goldMat = new THREE.MeshStandardMaterial({
    color: "#C9A227",
    metalness: 0.8,
    roughness: 0.2,
  });

  const ivoryEnvelopeMat = new THREE.MeshStandardMaterial({
    color: "#F6EFE3",
    roughness: 0.4,
  });

  const pearlShankhMat = new THREE.MeshStandardMaterial({
    color: "#FAF7F2",
    roughness: 0.2,
    metalness: 0.1,
  });

  useFrame((state, delta) => {
    // Open envelope flap on form submission
    if (flapRef.current) {
      const targetRot = isRsvpSubmitted ? Math.PI * 0.85 : 0;
      flapRef.current.rotation.x += (targetRot - flapRef.current.rotation.x) * delta * 4;
    }

    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(time * 0.6) * 0.08;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[-1.2, 0.5, 0]}
      scale={[scale * 0.9, scale * 0.9, scale * 0.9]}
      visible={crossFadeOpacity > 0.01}
    >
      {/* Royal Ivory Invitation Envelope Base */}
      <mesh material={ivoryEnvelopeMat} castShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.6, 1.1, 0.06]} />
      </mesh>

      {/* Gold Seal Monogram */}
      <mesh material={goldMat} position={[0, 0, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.02, 24]} />
      </mesh>

      {/* Opening Envelope Triangular Top Flap */}
      <mesh
        ref={flapRef}
        material={ivoryEnvelopeMat}
        position={[0, 0.55, 0.03]}
        rotation={[0, 0, Math.PI]}
      >
        <coneGeometry args={[0.8, 0.55, 3]} />
      </mesh>

      {/* Sacred Shankh (Conch Shell) beside Envelope */}
      <group position={[1.4, -0.2, 0.2]} rotation={[0.4, -0.6, 0.2]}>
        <mesh material={pearlShankhMat} castShadow>
          <coneGeometry args={[0.25, 0.7, 16]} />
        </mesh>
        <mesh material={goldMat} position={[0, 0.2, 0]}>
          <torusGeometry args={[0.18, 0.03, 12, 24]} />
        </mesh>
      </group>
    </group>
  );
}
