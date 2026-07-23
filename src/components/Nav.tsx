import Link from "next/link";

const links = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 sm:px-10">
      <Link
        href="/"
        className="font-mono text-sm tracking-[0.2em] uppercase text-foreground"
      >
        Noval
      </Link>
      <nav className="flex items-center gap-6 sm:gap-8">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-foreground/70 transition-colors hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
