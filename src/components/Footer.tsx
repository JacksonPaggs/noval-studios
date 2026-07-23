export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between gap-4 border-t border-foreground/10 px-6 py-8 text-xs text-foreground/50 sm:flex-row sm:px-10">
      <span>© {new Date().getFullYear()} Noval Studios</span>
      <a
        href="mailto:jackson@novalstudios.com"
        className="transition-colors hover:text-foreground"
      >
        jackson@novalstudios.com
      </a>
    </footer>
  );
}
