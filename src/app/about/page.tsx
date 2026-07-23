export default function About() {
  return (
    <section className="flex flex-col gap-8 px-6 py-32 sm:px-10">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
        About
      </p>
      <h1 className="max-w-2xl text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
        19, self-taught, building.
      </h1>
      <div className="max-w-xl space-y-5 text-foreground/70">
        <p>
          I&apos;m Jackson — founder of Sovereign, a digital agency I run
          solo. Noval Studios is where I keep the parts of my work that live
          outside client projects: experiments, writing, and the occasional
          side build.
        </p>
        <p>
          I picked up design and development fast, without a technical
          background, by shipping real things and learning what breaks. Most
          of what I know now came from building products end to end rather
          than studying them.
        </p>
      </div>
    </section>
  );
}
