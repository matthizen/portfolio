import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { Page, seo } from "@/components/site/Layout";
import { contacts, external, site } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo(
      "Contact",
      "Write to Matthews Martinez about internships and entry-level network or infrastructure roles, by email, LinkedIn, GitHub or Notion.",
    ),
  component: Contact,
});

const links = contacts;

function Contact() {
  const [msg, setMsg] = useState("");
  const id = useId();
  const send = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Hello from your portfolio");
    const body = encodeURIComponent(msg.trim());
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  return (
    <Page>
      <div data-reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <h1 className="text-head lg:col-span-7">Let's talk networks</h1>
        <p className="max-w-[44ch] text-lead leading-snug lg:col-span-5">
          I'm looking for internships and entry-level roles in network engineering and IT
          infrastructure.
        </p>
      </div>

      <section aria-labelledby="write-h" className="mt-24 grid gap-16 md:mt-32 lg:grid-cols-12">
        <form data-reveal onSubmit={send} className="lg:col-span-6">
          <h2 id="write-h" className="font-sans text-sub font-medium leading-tight tracking-tight">
            <span className="block text-muted-foreground">A role or a question?</span>
            <span className="block">Start the email here.</span>
          </h2>
          <label htmlFor={id} className="sr-only">
            Your message
          </label>
          <div className="relative mt-7">
            <input
              id={id}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Hi Matt, I'm hiring for…"
              className="h-16 w-full bg-card pl-5 pr-16 font-sans text-[1.0625rem] outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary"
            />
            <button
              type="submit"
              aria-label="Open this message in your email app"
              className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 active:scale-95"
            >
              <ArrowRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </form>

        <ul data-reveal className="grid content-start gap-4 lg:col-span-5 lg:col-start-8">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                {...external(l.href)}
                className="group block bg-card p-6 transition-colors hover:bg-field hover:text-field-ink"
              >
                <span className="block text-muted-foreground group-hover:text-field-soft">
                  {l.label}
                </span>
                <span className="mt-1 block break-all font-sans text-lead font-bold tracking-tight">
                  {l.value}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </Page>
  );
}
