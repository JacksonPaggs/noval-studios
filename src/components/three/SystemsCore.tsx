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

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = mix(7.0, 3.5, eased) * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShaderLine = `
  varying float vProgress;

  void main() {
    vec3 color = vec3(0.431, 0.420, 1.0) * 1.4;
    float alpha = mix(0.35, 0.8, vProgress);
    gl_FragColor = vec4(color, alpha);
  }
`;

const fragmentShaderPoint = `
  varying float vProgress;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;
    float circle = smoothstep(0.5, 0.0, dist);
    vec3 color = vec3(0.431, 0.420, 1.0) * 1.7;
    float alpha = circle * mix(0.55, 1.0, vProgress);
    gl_FragColor = vec4(color, alpha);
  }
`;

export default function SystemsCore({
  progressRef,
}: {
  progressRef: React.MutableRefObject<{ value: number }>;
}) {
  const lineMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const pointMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);

  const geometry = useMemo(() => {
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

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(starts.slice(), 3));
    geo.setAttribute("aStart", new THREE.BufferAttribute(starts, 3));
    geo.setAttribute("aEnd", new THREE.BufferAttribute(endArray, 3));
    geo.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));
    return geo;
  }, []);

  useFrame((state, delta) => {
    const p = progressRef.current.value;
    const t = state.clock.elapsedTime;

    if (lineMaterialRef.current) {
      lineMaterialRef.current.uniforms.uProgress.value = p;
      lineMaterialRef.current.uniforms.uTime.value = t;
    }
    if (pointMaterialRef.current) {
      pointMaterialRef.current.uniforms.uProgress.value = p;
      pointMaterialRef.current.uniforms.uTime.value = t;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.06;
      groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[1.6, 0, 0]}>
      <lineSegments geometry={geometry}>
        <shaderMaterial
          ref={lineMaterialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShaderLine}
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
      <points geometry={geometry}>
        <shaderMaterial
          ref={pointMaterialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShaderPoint}
          uniforms={{
            uProgress: { value: 0 },
            uTime: { value: 0 },
          }}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </points>
    </group>
  );
}
