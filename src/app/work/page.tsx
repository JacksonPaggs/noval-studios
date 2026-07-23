const projects = [
  {
    title: "Sovereign",
    description:
      "Full-service digital agency — brand, marketing site, and internal ops platform.",
    href: "https://sovereign-site-ebon.vercel.app",
  },
];

export default function Work() {
  return (
    <section className="flex flex-col gap-12 px-6 py-32 sm:px-10">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Work
        </p>
        <h1 className="mt-6 max-w-2xl text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
          Selected projects.
        </h1>
      </div>
      <div className="flex flex-col divide-y divide-foreground/10 border-y border-foreground/10">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-2 py-8 transition-colors sm:flex-row sm:items-baseline sm:justify-between"
          >
            <h2 className="text-2xl font-medium group-hover:text-accent">
              {project.title}
            </h2>
            <p className="max-w-md text-sm text-foreground/60 sm:text-right">
              {project.description}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
