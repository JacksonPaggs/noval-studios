"use client";

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import SystemsCore from "./three/SystemsCore";
import CameraRig from "./three/CameraRig";

gsap.registerPlugin(ScrollTrigger);

export default function HeroPipeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef({ value: 0 });

  useEffect(() => {
    if (!sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        progressRef.current.value = self.progress;
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 14], fov: 45 }} dpr={[1, 1.5]}>
          <CameraRig progressRef={progressRef} />
          <SystemsCore progressRef={progressRef} />
          <EffectComposer>
            <Bloom
              intensity={0.4}
              luminanceThreshold={0.35}
              luminanceSmoothing={0.25}
              mipmapBlur
            />
          </EffectComposer>
        </Canvas>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
      </div>

      <section
        ref={sectionRef}
        className="relative flex min-h-screen w-full flex-col items-start justify-center px-6 sm:px-10"
      >
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Jackson Paggs
        </p>
        <h1 className="mt-6 max-w-3xl text-5xl font-medium leading-tight tracking-tight sm:text-7xl">
          Your tech,
          <br />
          run like a system.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-foreground/60">
          Noval Studios is outsourced CTO work — I build and run the
          engineering behind your business, so it scales instead of
          breaking.
        </p>
        <Link
          href="/contact"
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-sm transition-colors hover:border-foreground/40"
        >
          Book a call
        </Link>
      </section>
    </>
  );
}
