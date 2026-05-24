const navItems = [
  { label: "Work", href: "#work" },
  { label: "Travel", href: "#travel" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-ink/[0.78] px-4 py-3 text-sm text-white shadow-2xl shadow-black/[0.15] backdrop-blur-md sm:px-5"
      >
        <a
          href="#top"
          className="text-sm font-extrabold tracking-[0.16em] outline-none transition hover:text-white/80 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          WRR
        </a>
        <div className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-xs font-medium text-white/[0.72] transition hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:text-sm"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
