"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  uniform float uProgress;
  uniform float uTime;
  attribute vec3 aStart;
  attribute vec3 aEnd;
  attribute float aRandom;
  varying float vProgress;

  void main() {
    float raw = clamp((uProgress - aRandom * 0.6) / (1.0 - aRandom * 0.6), 0.0, 1.0);
    float eased = raw * raw * (3.0 - 2.0 * raw);
    vProgress = eased;

    vec3 pos = mix(aStart, aEnd, eased);
    float jitter = (1.0 - eased) * 0.25;
    pos.x += sin(uTime * 0.8 + aRandom * 6.2831) * jitter;
    pos.y += cos(uTime * 0.7 + aRandom * 6.2831) * jitter;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying float vProgress;

  void main() {
    vec3 color = vec3(0.431, 0.420, 1.0) * 1.4;
    float alpha = mix(0.4, 0.9, vProgress);
    gl_FragColor = vec4(color, alpha);
  }
`;

export default function SystemsCore({
  progressRef,
}: {
  progressRef: React.MutableRefObject<{ value: number }>;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);

  const { positions, starts, ends, randoms } = useMemo(() => {
    const solid = new THREE.IcosahedronGeometry(3.2, 1);
    const edges = new THREE.EdgesGeometry(solid);
    const endArray = edges.attributes.position.array as Float32Array;
    const vertexCount = endArray.length / 3;

    const starts = new Float32Array(vertexCount * 3);
    const randoms = new Float32Array(vertexCount);

    for (let edge = 0; edge < vertexCount / 2; edge++) {
      const r = Math.random();

      for (let end = 0; end < 2; end++) {
        const v = edge * 2 + end;
        const ex = endArray[v * 3];
        const ey = endArray[v * 3 + 1];
        const ez = endArray[v * 3 + 2];

        const dir = new THREE.Vector3(ex, ey, ez).normalize();
        const blastRadius = 6 + Math.random() * 9;

        starts[v * 3] = dir.x * blastRadius + (Math.random() - 0.5) * 2;
        starts[v * 3 + 1] = dir.y * blastRadius + (Math.random() - 0.5) * 2;
        starts[v * 3 + 2] = dir.z * blastRadius + (Math.random() - 0.5) * 2;

        randoms[v] = r;
      }
    }

    return {
      positions: starts.slice(),
      starts,
      ends: endArray,
      randoms,
    };
  }, []);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uProgress.value = progressRef.current.value;
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.06;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[1.6, 0, 0]}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aStart" args={[starts, 3]} />
          <bufferAttribute attach="attributes-aEnd" args={[ends, 3]} />
          <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            uProgress: { value: 0 },
            uTime: { value: 0 },
          }}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </lineSegments>
    </group>
  );
}
