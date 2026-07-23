export default function Contact() {
  return (
    <section className="flex flex-col gap-8 px-6 py-32 sm:px-10">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
        Contact
      </p>
      <h1 className="max-w-2xl text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
        Let&apos;s talk.
      </h1>
      <div className="flex flex-col gap-3 text-lg">
        <a
          href="mailto:jackson@novalstudios.com"
          className="w-fit text-foreground/80 transition-colors hover:text-accent"
        >
          jackson@novalstudios.com
        </a>
        <a
          href="tel:+13856958044"
          className="w-fit text-foreground/80 transition-colors hover:text-accent"
        >
          385-695-8044
        </a>
        <a
          href="https://calendly.com/jackson-sovereign"
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit text-foreground/80 transition-colors hover:text-accent"
        >
          Book a call
        </a>
      </div>
    </section>
  );
}
