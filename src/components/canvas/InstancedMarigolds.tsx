"use client";

import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { useDeviceCapabilities } from "@/hooks/useDeviceCapabilities";

export function InstancedMarigolds() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { particleMultiplier } = useDeviceCapabilities();
  const count = Math.floor(800 * particleMultiplier);

  // Create procedural marigold flower geometry
  const flowerGeometry = useMemo(() => {
    // Multi-layered petal puff shape
    const geo = new THREE.DodecahedronGeometry(0.12, 2);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vy = pos.getY(i);
      const vz = pos.getZ(i);
      const dist = Math.sqrt(vx * vx + vy * vy + vz * vz);
      const noise = 1 + (Math.sin(vx * 30) * Math.cos(vy * 30)) * 0.25;
      pos.setXYZ(i, vx * noise, vy * noise, vz * noise);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Material with marigold orange-yellow gradient tint
  const flowerMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#F2A33C",
      roughness: 0.6,
      metalness: 0.1,
    });
  }, []);

  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    const colors = [
      new THREE.Color("#F2A33C"), // Marigold Orange
      new THREE.Color("#F5B85D"), // Marigold Yellow
      new THREE.Color("#E58A2B"), // Deep Orange
      new THREE.Color("#C9A227"), // Golden Yellow
    ];

    for (let i = 0; i < count; i++) {
      // Concentric circles & carpet under diya and mandap
      const radius = 0.8 + Math.pow(Math.random(), 0.7) * 7.5;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = -0.05 + Math.random() * 0.08;

      const scale = 0.6 + Math.random() * 0.8;
      const rotX = Math.random() * 0.4;
      const rotY = Math.random() * Math.PI * 2;
      const rotZ = Math.random() * 0.4;

      dummy.position.set(x, y, z);
      dummy.rotation.set(rotX, rotY, rotZ);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, colors[i % colors.length]);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [count]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[flowerGeometry, flowerMaterial, count]}
      castShadow
      receiveShadow
    />
  );
}
