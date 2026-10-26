import { createFileRoute } from "@tanstack/react-router";
import { Page, SectionTitle, TagPill, seo } from "@/components/site/Layout";
import { site } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => seo("About", "Background, career goals and technical skills of Matthews Martinez, NJIT IT student."),
  component: About,
});

// Skills sourced from resume + project notes.
const skills: Record<string, string[]> = {
  Networking: ["TCP/IP", "IPv4/IPv6", "Subnetting/CIDR", "VLANs", "802.1Q", "STP", "EtherChannel", "Inter-VLAN routing", "OSPF", "BGP", "RIPv2", "DHCP", "DNS", "NAT", "Cisco IOS", "Ubiquiti", "Troubleshooting"],
  Virtualization: ["Proxmox VE", "Ubuntu Server VMs", "Linux"],
  Security: ["pfSense", "Firewall rules", "VLAN segmentation", "Tailscale VPN", "ACLs", "RADIUS/AAA", "Pi-hole DNS filtering"],
  "Automation/Scripting": ["Python", "Bash", "Git/GitHub"],
  Cloud: ["Cloud Networking\n", "Identity and access management (IAM)", "Infrastructure as Code (Terraform or CloudFormation)"],
  Tools: ["Cisco Packet Tracer", "Wireshark", "Nagios", "Webmin", "SSH", "Structured cabling"],
};

function About() {
  return (
    <Page>
      <SectionTitle kicker="About">Hi, I'm {site.name}.</SectionTitle>
      <div className="grid gap-8 md:grid-cols-2">
        <section className="rounded-lg border bg-card p-5">
          <h2 className="font-mono text-sm text-primary">// background</h2>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li><span className="text-foreground">NJIT</span> — B.A. Information Technology, expected May 2027</li>
            <li><span className="text-foreground">Hudson County CC</span> — A.S. Computer Science, Aug 2023 – Dec 2024</li>
            <li>Hands-on homelab: pfSense, Ubiquiti, Proxmox, Linux, Nagios</li>
          </ul>
        </section>
        <section className="rounded-lg border bg-card p-5">
          <h2 className="font-mono text-sm text-primary">// career goals</h2>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li>Earn the CCNA (in progress)</li>
            <li>Grow into a network engineering / IT infrastructure role</li>
            <li>{"\n"}</li>
          </ul>
        </section>
      </div>
      <h2 className="mt-12 mb-4 text-2xl font-semibold">Technical skills</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(skills).map(([cat, list]) => (
          <section key={cat} className="rounded-lg border bg-card p-5">
            <h3 className="font-mono text-sm text-primary">{cat}</h3>
            <div className="mt-3 flex flex-wrap gap-1.5">{list.map((s) => <TagPill key={s}>{s}</TagPill>)}</div>
          </section>
        ))}
      </div>
    </Page>
  );
}
