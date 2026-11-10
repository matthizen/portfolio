// Personal info pulled from the resume. Edit here to update across the site.
import { channel } from "./youtube";

export const site = {
  name: "Matthews Martinez",
  short: "Matt",
  pitch: "Network and infrastructure builder, studying IT at NJIT",
  intro:
    "Most of what I know, I learned by building it: enterprise network designs in Cisco Packet Tracer for class, and a home network I run end to end, from the pfSense firewall to the servers behind it.",
  location: "Newark, New Jersey",
  school: "NJIT, B.A. Information Technology, class of 2027",
  email: "martinezmatthews01@gmail.com",
  linkedin: "https://www.linkedin.com/in/matthews-martinez/",
  github: "https://github.com/matthizen",
  notion:
    "https://app.notion.com/p/28ce2a0b1e0180929950f0ead6080e1f?v=28ce2a0b1e018041b9d9000c7879bcd6&source=copy_link",
  resume: "/resume.pdf",
};

/** Every way to reach me, in order of how fast I answer. The resume page lists these; the hero, footer and contact page use `links`, which adds YouTube. */
export const contacts = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "LinkedIn", value: "in/matthews-martinez", href: site.linkedin },
  { label: "GitHub", value: "matthizen", href: site.github },
  { label: "Notion", value: "Project notebook", href: site.notion },
];

/** The contacts plus the YouTube channel. Used by the hero, footer and contact page; the resume keeps to `contacts`. */
export const links = [...contacts, { label: "YouTube", value: channel.handle, href: channel.url }];

/** Opens off-site links in a new tab; mail links open the visitor's own app. */
export const external = (href: string) =>
  /^https?:/.test(href) ? { target: "_blank", rel: "noreferrer" } : {};
