import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="flex min-h-screen flex-col items-start justify-center px-6 sm:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Jackson Paggs
        </p>
        <h1 className="mt-6 max-w-3xl text-5xl font-medium leading-tight tracking-tight sm:text-7xl">
          I build digital
          <br />
          products that ship.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-foreground/60">
          Founder of Sovereign. This is Noval Studios — my personal home for
          projects, writing, and work outside the agency.
        </p>
        <Link
          href="/work"
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-sm transition-colors hover:border-foreground/40"
        >
          See the work
        </Link>
      </section>

      <section className="flex flex-col gap-6 border-t border-foreground/10 px-6 py-24 sm:px-10">
        <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/40">
          What I do
        </h2>
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <h3 className="text-lg font-medium">Design</h3>
            <p className="mt-2 text-sm text-foreground/60">
              Interfaces and brand systems built with intent, not templates.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Development</h3>
            <p className="mt-2 text-sm text-foreground/60">
              Full-stack builds, from marketing sites to production apps.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Motion</h3>
            <p className="mt-2 text-sm text-foreground/60">
              Scroll-driven storytelling and 3D built with GSAP and Three.js.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
