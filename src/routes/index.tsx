import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { buttonAccent, buttonInk, seo } from "@/components/site/Layout";
import { projects } from "@/data/projects";
import { contacts, external, site } from "@/data/site";
import homeServer from "@/assets/projects/home-server.png";

export const Route = createFileRoute("/")({
  head: () =>
    seo(
      "Networks and infrastructure",
      "Matthews Martinez designs networks in Packet Tracer and runs real ones at home: pfSense, Proxmox, Nagios, Tailscale. IT student at NJIT, working toward the CCNA.",
    ),
  component: Home,
});

const featured = projects.filter((p) => p.featured).slice(0, 3);
const homelab = projects.filter((p) => p.where === "Homelab").length;
const designs = projects.filter((p) => p.where === "Packet Tracer").length;

function Hero() {
  return (
    <section className="bg-field text-field-ink">
      <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-[1440px] flex-col px-4 pb-6 pt-6 sm:px-6 lg:px-8">
        <div className="my-auto py-12">
          <div className="[container-type:inline-size]">
            <h1 className="hero-name whitespace-nowrap font-sans text-[7.4cqi] uppercase leading-[0.85] tracking-[-0.045em]">
              {site.name}
            </h1>
          </div>
          <div data-reveal className="mt-8 grid gap-6 md:mt-10 md:grid-cols-12 md:items-end">
            <p className="max-w-[46ch] font-sans text-lead leading-snug md:col-span-7">
              IT student at NJIT focused on network engineering and infrastructure, working toward
              the CCNA.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row md:col-span-5 md:justify-end">
              <Link
                to="/projects"
                className={buttonInk
                  .replace("bg-foreground", "bg-field-ink")
                  .replace("text-background", "text-field")}
              >
                See the ten builds <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                to="/resume"
                className="inline-flex min-h-12 items-center justify-center px-2 font-sans text-small font-bold underline underline-offset-4 hover:no-underline"
              >
                Read the resume
              </Link>
            </div>
          </div>
        </div>

        {/* On a phone the lower half shows the work straight away. */}
        <figure className="mb-8 aspect-[4/5] overflow-hidden bg-field-ink sm:hidden">
          <img
            src={homeServer}
            alt="The Proxmox console of my home server, listing its plex, portfolio, minecraft and Nagios guests"
            className="h-full w-full object-cover object-left-top"
          />
        </figure>

        <div className="flex flex-col gap-3 font-sans text-small sm:flex-row sm:items-end sm:justify-between">
          <p>
            {site.location} · {site.school}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {contacts.map((c) => (
              <li key={c.label}>
                <a href={c.href} {...external(c.href)} className="font-medium hover:underline">
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  const cols = [
    [
      "Who I am.",
      "An IT student at NJIT, graduating in May 2027, after an A.S. in Computer Science at Hudson County Community College. Alongside school I trained as an automotive technician, diagnosing faults by procedure.",
    ],
    [
      "What I build.",
      "Segmented enterprise designs with VLANs, DHCP and dynamic routing in Packet Tracer, and a working homelab: pfSense at the edge, Proxmox for compute, Nagios watching all of it.",
    ],
    [
      "What's next.",
      "The CCNA, which I'm studying for now, and an internship where I can put the same habits to work on a production network: document it, monitor it, change it carefully.",
    ],
    [
      "How to reach me.",
      `Email ${site.email} or call ${site.phone}. I'm also on LinkedIn and GitHub, and every project starts life in my Notion notebook.`,
    ],
  ];
  return (
    <section
      aria-labelledby="intro-h"
      className="mx-auto max-w-[1440px] px-4 py-28 sm:px-6 md:py-40 lg:px-8"
    >
      <h2 id="intro-h" className="sr-only">
        About me in brief
      </h2>
      <div data-reveal>
        <p className="max-w-[56ch] font-sans text-sub font-medium leading-[1.2] tracking-[-0.015em]">
          {site.intro}
        </p>
      </div>
      <div data-reveal className="mt-16 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {cols.map(([k, v]) => (
          <p key={k} className="text-[1.0625rem] leading-[1.5]">
            <strong className="font-sans font-bold">{k}</strong>{" "}
            <span className="text-muted-foreground">{v}</span>
          </p>
        ))}
      </div>
    </section>
  );
}

function WorkParagraph() {
  return (
    <section
      aria-labelledby="work-h"
      className="mx-auto max-w-[1440px] px-4 pb-28 sm:px-6 md:pb-40 lg:px-8"
    >
      <div data-reveal>
        <p className="font-sans text-sub font-bold leading-[1.35] tracking-[-0.025em]">
          <span id="work-h">Everything so far:</span>{" "}
          {projects.map((p, i) => (
            <span key={p.slug}>
              <Link
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="text-muted-foreground underline-offset-[0.15em] transition-colors hover:underline hover:text-foreground focus-visible:text-foreground"
              >
                {p.title}
              </Link>
              {i < projects.length - 1 ? ", " : "."}
            </span>
          ))}
        </p>
        <p className="mt-8 font-sans text-small text-muted-foreground">
          {projects.length} projects: {designs} network designs in Packet Tracer, {homelab} running
          on real hardware at home, and a ticket-based troubleshooting series.
        </p>
      </div>
    </section>
  );
}

function BigPicture() {
  return (
    <section aria-labelledby="lab-h" className="bg-invert text-invert-ink">
      <div className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div data-reveal className="grid gap-6 md:grid-cols-12 md:items-end">
          <h2 id="lab-h" className="text-head md:col-span-7">
            One old PC, four servers
          </h2>
          <p className="max-w-[44ch] md:col-span-5">
            The homelab runs on a desktop I upgraded instead of replacing. Proxmox splits it into
            this website, a Minecraft server, the Nagios box that watches the rest, and a container
            waiting for Plex.
          </p>
        </div>
        <figure data-reveal className="mt-12">
          <div className="overflow-hidden">
            <img
              src={homeServer}
              alt="Proxmox VE 9.2.2 on node pve: the shell lists the plex, portfolio, minecraft and Nagios guests and the storage pools"
              className="drift h-auto w-full"
              width={1920}
              height={1100}
            />
          </div>
          <figcaption className="mt-4 flex flex-col gap-2 font-sans text-small opacity-80 sm:flex-row sm:justify-between">
            <span>
              Node pve, Proxmox VE 9.2.2: guests 100 to 103 and the storage pools behind them.
            </span>
            <Link
              to="/projects/$slug"
              params={{ slug: "home-server" }}
              className="font-bold underline underline-offset-4"
            >
              How the server was built
            </Link>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Featured() {
  return (
    <section
      aria-labelledby="feat-h"
      className="mx-auto max-w-[1440px] px-4 py-28 sm:px-6 md:py-40 lg:px-8"
    >
      <div
        data-reveal
        className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
      >
        <h2 id="feat-h" className="text-head">
          Three to start with
        </h2>
        <Link
          to="/projects"
          className="font-sans text-small font-bold underline underline-offset-4"
        >
          All ten projects
        </Link>
      </div>
      <div className="grid gap-24 md:gap-32">
        {featured.map((p, i) => (
          <article key={p.slug} data-reveal className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <Link
              to="/projects/$slug"
              params={{ slug: p.slug }}
              tabIndex={-1}
              aria-hidden
              className={`block overflow-hidden bg-card lg:col-span-8 ${i % 2 ? "lg:order-2 lg:col-start-5" : ""}`}
            >
              <img
                src={p.thumbnail}
                alt=""
                loading="lazy"
                className="aspect-[16/9] h-auto w-full object-cover object-left-top transition-transform duration-700 hover:scale-[1.03]"
              />
            </Link>
            <div
              className={`max-w-[52ch] lg:col-span-4 ${i % 2 ? "lg:order-1 lg:col-start-1 lg:row-start-1" : ""}`}
            >
              <h3 className="font-sans text-sub">{p.title}</h3>
              <p className="mt-4">{p.summary}</p>
              <p className="mt-3 font-sans text-small text-muted-foreground">
                {p.where}
                {p.status === "In progress" ? ", still in progress" : ""}
              </p>
              <Link
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="group mt-6 inline-flex items-center gap-2 font-sans text-small font-bold"
              >
                Read the build{" "}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Numbers() {
  const facts = [
    [
      String(projects.length),
      "projects written up, from the first Packet Tracer lab to the monitoring that now runs at home.",
    ],
    ["4", "guests on one Proxmox node: this portfolio, Minecraft, Nagios and a Plex container."],
  ];
  return (
    <section
      aria-labelledby="num-h"
      className="mx-auto max-w-[1440px] px-4 py-28 sm:px-6 md:py-40 lg:px-8"
    >
      <h2 id="num-h" className="sr-only">
        In numbers
      </h2>
      <div data-reveal className="grid gap-14 md:grid-cols-2 md:gap-8">
        {facts.map(([n, t]) => (
          <div key={n}>
            <p className="font-sans text-[clamp(7rem,18vw,16rem)] font-bold leading-[0.8] tracking-[-0.06em] tabular-nums">
              {n}
            </p>
            <p className="mt-6 max-w-[34ch] text-lead leading-snug">{t}</p>
          </div>
        ))}
      </div>
      <div
        data-reveal
        className="mt-24 grid gap-6 bg-card p-6 sm:p-10 md:grid-cols-12 md:items-center"
      >
        <h3 className="font-sans text-sub md:col-span-7">Next on the list: the CCNA</h3>
        <div className="flex flex-col gap-3 sm:flex-row md:col-span-5 md:justify-end">
          <Link to="/resume" className={buttonAccent}>
            Read the resume
          </Link>
          <Link to="/contact" className={buttonInk}>
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Intro />
      <WorkParagraph />
      <BigPicture />
      <Featured />
      <Numbers />
    </main>
  );
}
