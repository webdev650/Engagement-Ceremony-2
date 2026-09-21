"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { easing } from "maath";
import { useScrollStore } from "@/store/useScrollStore";

export function CameraRig() {
  const scrollProgress = useScrollStore((state) => state.scrollProgress);
  const targetPos = useRef(new THREE.Vector3(0, 0.4, 1.2));
  const targetLookAt = useRef(new THREE.Vector3(0, 0.3, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0.3, 0));

  // Define CatmullRomCurve3 camera spline control points
  const cameraSpline = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0, 0.4, 1.2),   // Sec 0: Loader close-up
        new THREE.Vector3(0, 2.5, 6.0),   // Sec 1: Hero invitation orbit
        new THREE.Vector3(0, 2.0, 3.5),   // Sec 2: Puja dolly through toran
        new THREE.Vector3(-3.5, 2.2, 3.0), // Sec 3: Schedule rangoli path
        new THREE.Vector3(0, 6.0, 7.5),   // Sec 4: Venue temple crane up
        new THREE.Vector3(-2.0, 1.8, 4.0), // Sec 5: Family photo push-in
        new THREE.Vector3(1.8, 1.6, 3.8),  // Sec 6: RSVP 3/4 framing
        new THREE.Vector3(0, 14.0, 22.0),  // Sec 7: Footer wide retreat
      ],
      false,
      "catmullrom",
      0.5
    );
  }, []);

  // Look-at targets spline / keyframes
  const lookAtTargets = useMemo(() => {
    return [
      new THREE.Vector3(0, 0.3, 0),     // Sec 0: Diya wick
      new THREE.Vector3(0, 0.5, 0),     // Sec 1: Full Diya
      new THREE.Vector3(0, 1.2, -2.0),  // Sec 2: Mandap
      new THREE.Vector3(0, 0.5, 0),     // Sec 3: Rangoli
      new THREE.Vector3(0, 0.5, -3.0),  // Sec 4: Temple Model
      new THREE.Vector3(0, 1.2, 0.5),   // Sec 5: Photo Frames
      new THREE.Vector3(0, 0.8, 0),     // Sec 6: Envelope / Shankh
      new THREE.Vector3(0, 0, 0),       // Sec 7: Starlight horizon
    ];
  }, []);

  useFrame((state, delta) => {
    const clampedProgress = Math.max(0, Math.min(0.9999, scrollProgress));

    // Calculate spline point for camera position
    cameraSpline.getPointAt(clampedProgress, targetPos.current);

    // Calculate interpolated lookAt target based on section index
    const totalWaypoints = lookAtTargets.length - 1;
    const exactIndex = clampedProgress * totalWaypoints;
    const baseIdx = Math.floor(exactIndex);
    const nextIdx = Math.min(totalWaypoints, baseIdx + 1);
    const lerpFactor = exactIndex - baseIdx;

    const lookFrom = lookAtTargets[baseIdx];
    const lookTo = lookAtTargets[nextIdx];

    targetLookAt.current.lerpVectors(lookFrom, lookTo, lerpFactor);

    // Add subtle camera "breathing" sine wobble during static/idle moments
    const time = state.clock.getElapsedTime();
    const breathingX = Math.sin(time * 0.8) * 0.05;
    const breathingY = Math.cos(time * 0.6) * 0.03;

    targetPos.current.x += breathingX;
    targetPos.current.y += breathingY;

    // Apply maath/easing damp3 on camera position (0.28s operator lag)
    easing.damp3(state.camera.position, targetPos.current, 0.28, delta);

    // Apply maath/easing damp3 on lookAt target (0.35s lag)
    easing.damp3(currentLookAt.current, targetLookAt.current, 0.35, delta);

    state.camera.lookAt(currentLookAt.current);
  });

  return null;
}
