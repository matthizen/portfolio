import { createFileRoute } from "@tanstack/react-router";
import { Github, Linkedin, Mail } from "lucide-react";
import { Page, SectionTitle, seo } from "@/components/site/Layout";
import { site } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => seo("Contact", "Get in touch with Matthews Martinez by email, LinkedIn or GitHub."),
  component: Contact,
});

const links = [
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: Linkedin, label: "LinkedIn", value: "in/matthews-martinez", href: site.linkedin },
  { icon: Github, label: "GitHub", value: "matthizen", href: site.github },
];

function Contact() {
  return (
    <Page>
      <SectionTitle kicker="Contact">Let's connect</SectionTitle>
      <p className="mb-8 max-w-xl text-muted-foreground">Open to internships and entry-level network / IT infrastructure roles.</p>
      <div className="grid gap-4 sm:grid-cols-3">
        {links.map(({ icon: Icon, label, value, href }) => (
          <a key={label} href={href} target={href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer" className="group rounded-lg border bg-card p-5 transition-colors hover:border-primary">
            <Icon className="h-6 w-6 text-primary" aria-hidden />
            <p className="mt-3 font-semibold">{label}</p>
            <p className="break-all font-mono text-sm text-muted-foreground group-hover:text-primary">{value}</p>
          </a>
        ))}
      </div>
    </Page>
  );
}
