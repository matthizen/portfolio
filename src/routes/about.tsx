import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, buttonInk, seo } from "@/components/site/Layout";
import { site } from "@/data/site";
import { resume } from "@/data/resume";

export const Route = createFileRoute("/about")({
  head: () =>
    seo(
      "About",
      "How Matthews Martinez got into networking, what he works with, and where he's headed: NJIT IT student, homelabber, CCNA candidate.",
    ),
  component: About,
});

const facts = [
  ["Studying", "B.A. Information Technology, NJIT"],
  ["Graduating", "May 2027"],
  ["Based in", site.location],
];

function About() {
  return (
    <Page>
      <h1 data-reveal className="text-head">
        <span className="block">About Me</span>
      </h1>

      <section
        aria-label="Background"
        data-reveal
        className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12"
      >
        <dl className="grid grid-cols-2 gap-6 font-sans text-small sm:grid-cols-3 md:col-span-3 md:grid-cols-1 md:content-start">
          {facts.map(([k, v]) => (
            <div key={k}>
              <dt className="text-muted-foreground">{k}</dt>
              <dd className="mt-1 font-bold">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="grid gap-6 md:col-span-9 md:col-start-4">
          <p className="font-sans text-sub font-medium leading-[1.3] tracking-[-0.01em]">
            My home network is my lab. It started when I swapped the ISP router for pfSense.
          </p>
          <p className="max-w-[66ch]">
            That grew into a Proxmox server, a Pi-hole, remote access over Tailscale and a Nagios
            monitor, next to a steady run of enterprise designs in Packet Tracer. At NJIT I'm
            finishing a degree in Information Technology, and I'm studying for the CCNA alongside
            it.
          </p>
          <p className="max-w-[66ch]">
            Alongside school I spent two years as an automotive technician trainee, diagnosing
            mechanical faults by following established procedures. The habit carries over: work the
            problem in order, one fault at a time.
          </p>
        </div>
      </section>

      <section aria-labelledby="path-h" className="mt-28 md:mt-40">
        <h2 id="path-h" data-reveal className="text-head">
          The path so far
        </h2>
        <ol className="mt-14 grid gap-4">
          {[
            ...resume.education.map((e) => ({
              when: e.dates,
              what: e.degree,
              where: `${e.school}, ${e.location}`,
              points: [] as string[],
            })),
            ...resume.experience.map((e) => ({
              when: e.dates,
              what: e.role,
              where: `${e.org}, ${e.location}`,
              points: e.points,
            })),
          ].map((e) => (
            <li
              key={e.what}
              data-reveal
              className="grid gap-3 bg-card p-6 md:grid-cols-12 md:gap-8"
            >
              <p className="font-sans text-small text-muted-foreground md:col-span-3">{e.when}</p>
              <div className="md:col-span-9">
                <h3 className="font-sans text-lead">{e.what}</h3>
                <p className="mt-1 font-sans text-small">{e.where}</p>
                {e.points.length > 0 && (
                  <p className="mt-3 max-w-[70ch] text-muted-foreground">{e.points.join(" ")}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
        <div data-reveal className="mt-12 flex flex-wrap gap-3">
          <Link to="/resume" className={buttonInk}>
            See the full resume
          </Link>
          <Link
            to="/projects"
            className="inline-flex min-h-12 items-center px-2 font-sans text-small font-bold underline underline-offset-4"
          >
            Or go straight to the projects
          </Link>
        </div>
      </section>
    </Page>
  );
}
