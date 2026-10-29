import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, buttonInk, seo } from "@/components/site/Layout";
import { site } from "@/data/site";
import { resume } from "@/data/resume";
import piHole from "@/assets/projects/pi-hole.jpg";
import pfsense from "@/assets/projects/pfsense.png";
import tailscale from "@/assets/projects/tailscale.png";
import homeServer from "@/assets/projects/home-server.png";

export const Route = createFileRoute("/about")({
  head: () =>
    seo(
      "About",
      "How Matthews Martinez got into networking, what he works with, and where he's headed: NJIT IT student, homelabber, CCNA candidate.",
    ),
  component: About,
});

// Skills sourced from the resume and the project write-ups.
const skills: Record<string, string[]> = {
  Networking: [
    "TCP/IP",
    "IPv4 and IPv6",
    "Subnetting and CIDR",
    "VLANs and 802.1Q",
    "STP",
    "EtherChannel",
    "Inter-VLAN routing",
    "OSPF",
    "BGP",
    "RIPv2",
    "DHCP",
    "DNS",
    "NAT",
  ],
  "Security and access": [
    "pfSense firewall rules",
    "VLAN segmentation",
    "Tailscale VPN",
    "ACLs",
    "RADIUS/AAA",
    "Pi-hole DNS filtering",
    "SSH-only management",
  ],
  "Servers and virtualisation": [
    "Proxmox VE",
    "LXC containers",
    "Ubuntu Server",
    "Linux administration",
    "Apache",
    "systemd",
  ],
  "Monitoring and scripting": [
    "Nagios",
    "SNMP",
    "NRPE",
    "Webmin",
    "Bash",
    "Python",
    "Git and GitHub",
  ],
  "Tools and hardware": [
    "Cisco IOS",
    "Cisco Packet Tracer",
    "Wireshark",
    "Netgate",
    "Ubiquiti",
    "Structured cabling",
  ],
};

const facts = [
  ["Studying", "B.A. Information Technology, NJIT"],
  ["Graduating", "May 2027"],
  ["Based in", site.location],
];

function About() {
  return (
    <Page>
      <h1 data-reveal className="text-head">
        <span className="block">About Matt</span>
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

      <section aria-labelledby="pics-h" className="mt-28 md:mt-40">
        <h2 id="pics-h" className="sr-only">
          From the homelab
        </h2>
        <div data-reveal className="grid gap-6 md:grid-cols-12">
          <figure className="md:col-span-7">
            <img
              src={piHole}
              alt="The Raspberry Pi Zero W that runs Pi-hole, with its microSD card, adaptor and power cable"
              loading="lazy"
              className="aspect-[4/3] h-auto w-full object-cover"
            />
            <figcaption className="mt-3 font-sans text-small text-muted-foreground">
              The Pi Zero that answers DNS for the whole house.
            </figcaption>
          </figure>
          <figure className="md:col-span-5 md:self-end">
            <div className="bg-white">
              <img
                src={pfsense}
                alt="Packet Tracer diagram of the home network: pfSense feeding a PoE switch with the Proxmox server, a PC, a printer, the Pi-hole and a UniFi access point"
                loading="lazy"
                className="aspect-[4/3] h-auto w-full object-contain"
              />
            </div>
            <figcaption className="mt-3 font-sans text-small text-muted-foreground">
              The home network, drawn before it was cabled.
            </figcaption>
          </figure>
          <figure className="md:col-span-5">
            <img
              src={tailscale}
              alt="Tailscale client connected, listing a MacBook Air, an iPhone and the pfSense firewall"
              loading="lazy"
              className="aspect-[4/3] h-auto w-full object-cover object-left-top"
            />
            <figcaption className="mt-3 font-sans text-small text-muted-foreground">
              Tailscale: the way back in from anywhere.
            </figcaption>
          </figure>
          <figure className="md:col-span-7">
            <img
              src={homeServer}
              alt="Proxmox console listing the plex, portfolio, minecraft and Nagios guests"
              loading="lazy"
              className="aspect-[4/3] h-auto w-full object-cover object-left-top"
            />
            <figcaption className="mt-3 font-sans text-small text-muted-foreground">
              The Proxmox node that hosts this site.
            </figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="skills-h" className="mt-28 md:mt-40">
        <h2 id="skills-h" data-reveal className="text-head">
          What I work with
        </h2>
        <div className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(skills).map(([cat, list]) => (
            <div key={cat} data-reveal>
              <h3 className="font-sans text-lead">{cat}</h3>
              <ul className="mt-4 grid gap-1.5 text-muted-foreground">
                {list.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
          <div data-reveal className="bg-field p-6 text-field-ink">
            <h3 className="font-sans text-lead">Certification: CCNA</h3>
            <p className="mt-4">
              In progress. Working through the whole blueprint, from subnetting drills to automation
              basics.
            </p>
          </div>
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
