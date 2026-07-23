import Link from "next/link";
import HeroPipeline from "@/components/HeroPipeline";
import Reveal from "@/components/Reveal";

const services = [
  {
    title: "Systems Architecture",
    body: "Design the technical foundation your product runs on — built to scale instead of firefight.",
  },
  {
    title: "Infrastructure & Operations",
    body: "Cloud infra, CI/CD, monitoring, and on-call systems that don't depend on one person's memory.",
  },
  {
    title: "Technical Strategy",
    body: "Roadmap technical decisions against business goals, not just what's interesting to build.",
  },
  {
    title: "Hands-on Development",
    body: "I write the code myself when it matters, not just review someone else's.",
  },
];

const steps = [
  {
    n: "01",
    title: "Audit",
    body: "Full technical review — architecture, infra, code quality, team workflow. Where the risk actually is.",
  },
  {
    n: "02",
    title: "Architect",
    body: "A concrete plan: what to fix, what to rebuild, what to leave alone, in priority order.",
  },
  {
    n: "03",
    title: "Build",
    body: "Ship the plan — either hands-on, or directing your existing team.",
  },
  {
    n: "04",
    title: "Operate",
    body: "Ongoing technical leadership so decisions don't drift once the initial work is done.",
  },
];

const examples = [
  {
    before: "A 12-person SaaS team shipping on a single unmonitored server.",
    after:
      "Consolidated infra, added CI/CD and alerting, cut deploy time from hours to minutes.",
  },
  {
    before:
      "A founder-led startup with three different contractors touching the same codebase.",
    after:
      "One architecture, one roadmap, features shipping on a predictable cadence.",
  },
  {
    before: "A business scaling revenue faster than its systems could handle.",
    after: "Rebuilt the data layer before it broke, ahead of the next funding round.",
  },
];

export default function Home() {
  return (
    <>
      <HeroPipeline />

      <section className="relative flex flex-col gap-6 border-t border-foreground/10 bg-background px-6 py-24 sm:px-10">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            The problem
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
            Most companies scale the business before they scale the systems.
          </h2>
          <p className="mt-6 max-w-2xl text-foreground/60">
            Tech debt piles up quietly. Contractors rotate through the
            codebase without owning anything. Infrastructure gets patched,
            not designed. Nobody is making the system-level calls — until
            something breaks at the worst possible time. That's the gap
            outsourced CTO work fills: technical leadership without the
            full-time executive hire.
          </p>
        </Reveal>
      </section>

      <section className="relative flex flex-col gap-10 border-t border-foreground/10 bg-background px-6 py-24 sm:px-10">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            What you get
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
            A CTO, without the executive hire.
          </h2>
        </Reveal>
        <div className="grid gap-10 sm:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.08}>
              <h3 className="text-lg font-medium">{service.title}</h3>
              <p className="mt-2 text-sm text-foreground/60">{service.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative flex flex-col gap-10 border-t border-foreground/10 bg-background px-6 py-24 sm:px-10">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            How it works
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
            Four steps, not a sales funnel.
          </h2>
        </Reveal>
        <div className="grid gap-10 sm:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.08}>
              <p className="font-mono text-xs text-foreground/40">{step.n}</p>
              <h3 className="mt-2 text-lg font-medium">{step.title}</h3>
              <p className="mt-2 text-sm text-foreground/60">{step.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative flex flex-col gap-10 border-t border-foreground/10 bg-background px-6 py-24 sm:px-10">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Illustrative examples
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
            The kind of impact this looks like.
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-foreground/50">
            Representative scenarios based on the kind of engagements this
            offer is built for — not claims about actual past clients.
          </p>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-3">
          {examples.map((example, i) => (
            <Reveal key={example.before} delay={i * 0.1}>
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-foreground/10 p-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/40">
                    Before
                  </p>
                  <p className="mt-2 text-sm text-foreground/70">
                    {example.before}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                    After
                  </p>
                  <p className="mt-2 text-sm text-foreground/70">
                    {example.after}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative flex flex-col items-start gap-6 border-t border-foreground/10 bg-background px-6 py-32 sm:px-10">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Get started
          </p>
          <h2 className="mt-4 max-w-xl text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
            Let's find out where the risk actually is.
          </h2>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-sm transition-colors hover:border-foreground/40"
          >
            Book a call
          </Link>
        </Reveal>
      </section>
    </>
  );
}
