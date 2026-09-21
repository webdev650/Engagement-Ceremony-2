"use client";

import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollStore } from "@/store/useScrollStore";
import { useDeviceCapabilities } from "@/hooks/useDeviceCapabilities";

export function InstancedPetals() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const isRsvpSubmitted = useScrollStore((state) => state.isRsvpSubmitted);
  const { particleMultiplier } = useDeviceCapabilities();
  const count = Math.floor(300 * particleMultiplier);

  // Curved petal geometry
  const petalGeometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(0.12, 0.18, 4, 4);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      pos.setZ(i, Math.sin(y * 10) * 0.04);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  const petalMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#E7C9C2",
      roughness: 0.5,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.88,
    });
  }, []);

  // Per-instance initial positions, velocities, and rotation speeds
  const instanceData = useMemo(() => {
    const data = [];
    for (let i = 0; i < 500; i++) {
      data.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 12,
          Math.random() * 8 + 0.5,
          (Math.random() - 0.5) * 12
        ),
        rot: new THREE.Vector3(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        ),
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2
        ),
        fallSpeed: 0.3 + Math.random() * 0.6,
        swayPhase: Math.random() * Math.PI * 2,
      });
    }
    return data;
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const d = instanceData[i];

      // Fall down
      d.pos.y -= d.fallSpeed * delta * (isRsvpSubmitted ? 2.5 : 1.0);
      if (d.pos.y < -1) {
        d.pos.y = 8 + Math.random() * 2;
      }

      // Sway laterally
      d.pos.x += Math.sin(time * 1.5 + d.swayPhase) * 0.005;
      d.pos.z += Math.cos(time * 1.2 + d.swayPhase) * 0.005;

      // Rotate
      d.rot.x += d.rotSpeed.x * delta;
      d.rot.y += d.rotSpeed.y * delta;
      d.rot.z += d.rotSpeed.z * delta;

      dummy.position.copy(d.pos);
      dummy.rotation.set(d.rot.x, d.rot.y, d.rot.z);
      dummy.scale.setScalar(1.0 + (isRsvpSubmitted ? 0.3 : 0));
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[petalGeometry, petalMaterial, count]}
      castShadow
    />
  );
}
