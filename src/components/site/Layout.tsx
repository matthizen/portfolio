import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Moon, Sun } from "lucide-react";
import { contacts, external, site } from "@/data/site";

const nav = [
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/resume", label: "Resume" },
  { to: "/contact", label: "Contact" },
] as const;

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* storage blocked: the choice lasts for this visit only */
    }
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="grid h-10 w-10 place-items-center transition-transform hover:-rotate-12 active:scale-90"
    >
      {dark ? <Sun className="h-5 w-5" aria-hidden /> : <Moon className="h-5 w-5" aria-hidden />}
    </button>
  );
}

const navLink =
  "relative py-2 font-sans text-small font-medium after:absolute after:inset-x-0 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-current after:transition-transform hover:after:scale-x-100";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const onField = path === "/";
  useEffect(() => setOpen(false), [path]);

  return (
    <header className={onField ? "bg-field text-field-ink" : "bg-background text-foreground"}>
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="font-sans text-small font-bold tracking-tight">
          Matthews Martinez
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={navLink}
              activeProps={{ className: "after:scale-x-100" }}
            >
              {n.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="h-10 px-2 font-sans text-small font-bold active:scale-95"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="animate-in fade-in slide-in-from-top-2 duration-300 md:hidden"
        >
          <ul className="px-4 pb-6 sm:px-6">
            {nav.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className="block py-2.5 font-sans text-[1.75rem] font-bold tracking-tight"
                  activeProps={{ className: "underline underline-offset-8" }}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-card">
      <nav aria-label="Contact" className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
        <ul className="flex flex-wrap gap-x-8 gap-y-3 font-sans text-small font-bold">
          {contacts.map((c) => (
            <li key={c.label}>
              <a href={c.href} {...external(c.href)} className="hover:underline underline-offset-4">
                {c.label}
              </a>
            </li>
          ))}
          <li>
            <Link to="/resume" className="hover:underline underline-offset-4">
              Resume
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

/**
 * Lets every [data-reveal] block rise in once as it scrolls into view. A MutationObserver picks up
 * blocks added by client-side navigation, which mount after the URL has already changed.
 */
export function useReveal() {
  useEffect(() => {
    // Tells the inline fallback in __root that the app is running, so it won't unhide everything.
    (window as unknown as { __reveal?: boolean }).__reveal = true;
    const pending = () =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));

    if (!("IntersectionObserver" in window) || !("MutationObserver" in window)) {
      document.documentElement.classList.remove("js");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    const watched = new WeakSet<Element>();
    const watch = () => {
      for (const el of pending()) {
        if (watched.has(el)) continue;
        watched.add(el);
        io.observe(el);
      }
    };
    watch();
    const mo = new MutationObserver(watch);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);
}

export function Page({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 pb-32 pt-10 sm:px-6 md:pt-16 lg:px-8">
      {children}
    </main>
  );
}

/** Page title block: one h1 and the sentence that explains it. */
export function PageTitle({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div data-reveal className="mb-16 grid gap-6 md:mb-24 lg:grid-cols-12">
      <h1 className="text-head lg:col-span-8">{title}</h1>
      {children && (
        <div className="max-w-[46ch] text-lead leading-snug lg:col-span-4 lg:self-end">
          {children}
        </div>
      )}
    </div>
  );
}

export function TagPill({ children }: { children: ReactNode }) {
  return <span className="inline-block bg-card px-2.5 py-1 font-sans text-small">{children}</span>;
}

export const buttonInk =
  "inline-flex min-h-12 items-center justify-center gap-2 bg-foreground px-6 font-sans text-small font-bold text-background transition-transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]";
export const buttonAccent =
  "inline-flex min-h-12 items-center justify-center gap-2 bg-primary px-6 font-sans text-small font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]";

export function seo(title: string, description: string) {
  const t = `${title} | Matthews Martinez`;
  return {
    meta: [
      { title: t },
      { name: "description", content: description },
      { property: "og:title", content: t },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  };
}
