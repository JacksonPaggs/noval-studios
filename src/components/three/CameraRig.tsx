"use client";

import { useFrame, useThree } from "@react-three/fiber";

export default function CameraRig({
  progressRef,
}: {
  progressRef: React.MutableRefObject<{ value: number }>;
}) {
  const { camera, pointer } = useThree();

  useFrame(() => {
    const p = progressRef.current.value;

    const targetX = pointer.x * 0.3 + p * 0.4;
    const targetY = pointer.y * 0.2;
    const targetZ = 13 - p * 1.2;

    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.position.z += (targetZ - camera.position.z) * 0.04;
    camera.lookAt(0, 0, 0);
  });

  return null;
}
