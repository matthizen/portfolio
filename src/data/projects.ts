// All project content lives here. Add or edit a project by editing this array —
// no component changes needed. Images are imported from src/assets/projects.
import campus from "@/assets/projects/campus.png";
import hotel from "@/assets/projects/hotel.png";
import pfsense from "@/assets/projects/pfsense.png";
import tailscale from "@/assets/projects/tailscale.png";
import nagios from "@/assets/projects/nagios.png";
import capstone from "@/assets/projects/capstone.png";
import labs from "@/assets/projects/troubleshooting-labs.png";
import minecraft from "@/assets/projects/minecraft.png";
import homeServer from "@/assets/projects/home-server.png";
import piHole from "@/assets/projects/pi-hole.jpg";

export type Tag = "Networking" | "Security" | "Homelab" | "Automation" | "Cloud" | "Monitoring";

export interface Snippet {
  title: string;
  language: string;
  code: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  status: "Done" | "In progress";
  featured?: boolean;
  tags: Tag[];
  tech: string[];
  thumbnail?: string;
  images: { src: string; alt: string }[];
  overview: string;
  built: string[];
  snippets: Snippet[];
  challenges: string[];
  learned: string[];
  source?: { title: string; text: string; url: string };
}

const PH_CHALLENGES = "\n";
const PH_LEARNED = "\n";

export const projects: Project[] = [
  {
    slug: "campus-network",
    title: "Campus Branch Network",
    summary: "Multi-building campus plus remote branch with VLANs, inter-VLAN routing, DHCP and RIPv2 over serial WAN.",
    status: "Done",
    featured: true,
    tags: ["Networking"],
    tech: ["Cisco Packet Tracer", "Cisco IOS", "VLANs", "802.1Q", "Router-on-a-Stick", "DHCP", "RIPv2", "DCE/DTE Serial", "Subnetting"],
    thumbnail: campus,
    images: [{ src: campus, alt: "Packet Tracer topology of the campus and branch network" }],
    overview:
      "Design a segmented, routable enterprise-style network spanning multiple campus buildings, a remote branch and a simulated cloud network.",
    built: [
      "Department-based VLANs, each with its own subnet; access and 802.1Q trunk ports as required.",
      "Router subinterfaces for inter-VLAN routing, each acting as the VLAN's default gateway.",
      "Individual DHCP pools per network with default-router and DNS settings.",
      "Serial DCE/DTE WAN links between campus, branch and cloud, 64,000 bps clock rate on DCE.",
      "RIPv2 dynamic routing so routes are advertised and learned automatically.",
    ],
    snippets: [
      {
        title: "Campus router — DHCP pool & subinterface (excerpt)",
        language: "cisco",
        code: `ip dhcp pool Admin-Pool
 network 192.168.1.0 255.255.255.0
 default-router 192.168.1.1
 dns-server 192.168.1.1
!
interface GigabitEthernet0/0.10
 encapsulation dot1Q 10
 ip address 192.168.1.1 255.255.255.0
!
interface Serial0/3/0
 ip address 10.10.10.5 255.255.255.252
 clock rate 64000`,
      },
      {
        title: "Campus router — RIPv2",
        language: "cisco",
        code: `router rip
 version 2
 network 10.0.0.0
 network 192.168.1.0
 network 192.168.2.0
 network 192.168.3.0
 network 192.168.4.0
 network 192.168.5.0
 network 192.168.6.0
 network 192.168.7.0
 network 192.168.8.0`,
      },
      {
        title: "Branch router — Staff/Student VLANs",
        language: "cisco",
        code: `ip dhcp pool Staff-pool
 network 192.168.9.0 255.255.255.0
 default-router 192.168.9.1
 dns-server 192.168.9.1
ip dhcp pool Student-pool
 network 192.168.10.0 255.255.255.0
 default-router 192.168.10.1
 dns-server 192.168.10.1
!
interface GigabitEthernet0/0.90
 encapsulation dot1Q 90
 ip address 192.168.9.1 255.255.255.0
!
interface GigabitEthernet0/0.100
 encapsulation dot1Q 100
 ip address 192.168.10.1 255.255.255.0`,
      },
    ],
    challenges: [PH_CHALLENGES],
    learned: [PH_LEARNED],
  },
  {
    slug: "enterprise-network-capstone",
    title: "Integrated Enterprise Network Capstone",
    summary: "Six-VLAN financial-services enterprise design with centralized servers, ACLs, NAT/PAT and secure wireless.",
    status: "In progress",
    featured: true,
    tags: ["Networking", "Security"],
    tech: ["Cisco Packet Tracer", "VLANs", "802.1Q", "Inter-VLAN Routing", "DHCP", "DNS", "RADIUS/AAA", "SSH", "Syslog", "NTP", "ACLs", "NAT/PAT"],
    thumbnail: capstone,
    images: [{ src: capstone, alt: "Packet Tracer topology of the enterprise network: an external ISP uplink, two border routers, two multilayer switches, four access switches and six VLAN segments for management, IT/admin, finance, general staff, servers and wireless" }],
    overview:
      "Turn a written set of enterprise requirements into a structured network architecture with clear segmentation, addressing, services and security boundaries.",
    built: [
      "Six VLANs: IT/Admin, Finance, General Staff, Servers, Management and Wireless.",
      "Topology with Cisco routers, multilayer switches and access switches.",
      "Server VLAN 40 (10.20.40.0/24) hosting DHCP/DNS, RADIUS/AAA and Syslog/NTP.",
      "Planned trunks and inter-VLAN routing through Layer 3 switches.",
      "Identified where ACLs, NAT/PAT, SSH management and wireless security apply.",
    ],
    snippets: [],
    challenges: [PH_CHALLENGES],
    learned: [PH_LEARNED],
  },
  {
    slug: "nagios-monitoring",
    title: "Network Monitoring with Nagios",
    summary: "Nagios Core on a Proxmox VM giving one dashboard for every device and service on the network.",
    status: "In progress",
    featured: true,
    tags: ["Homelab", "Monitoring", "Automation"],
    tech: ["Nagios Core", "Proxmox VE", "Ubuntu Server", "Apache", "SNMP", "NRPE", "systemd", "Bash"],
    thumbnail: nagios,
    images: [{ src: nagios, alt: "Nagios dashboard showing host and service status" }],
    overview:
      "Go from \"I find out when something breaks\" to \"I see it break, and usually why\" with a single place to check whether every device and service is healthy.",
    built: [
      "Ubuntu Server LTS VM in Proxmox: 2 vCPUs, 2 GB RAM, 20 GB disk on local-lvm, VirtIO NIC on vmbr0.",
      "Static IP, OpenSSH and qemu-guest-agent on the guest.",
      "Nagios 4 from Ubuntu packages with Apache serving the dashboard.",
      "Password-protected web UI (htdigest + Require valid-user).",
      "Host and service definitions in /etc/nagios4/conf.d/homelab.cfg — ping, port, SNMP and NRPE checks.",
    ],
    snippets: [
      {
        title: "Install Nagios & Apache",
        language: "bash",
        code: `sudo apt install -y nagios4 nagios-plugins-contrib nagios-nrpe-plugin apache2
sudo a2enmod cgi auth_digest authz_groupfile rewrite`,
      },
      {
        title: "Validate config & check Proxmox storage",
        language: "bash",
        code: `nagios4 -v /etc/nagios4/nagios.cfg
pvesm status
cat /etc/pve/storage.cfg`,
      },
    ],
    challenges: [
      "VM creation failed with `storage 'Media' is not online` — the wizard pointed at unreachable storage. Moved the ISO and disk to local storage and checked health with `pvesm status` and /etc/pve/storage.cfg.",
      "Default package access was IP-only; replaced it with authenticated access so the dashboard requires a password.",
    ],
    learned: [
      "Ping/port checks need nothing on the target; SNMP reads interface data; NRPE runs local disk/load/memory checks.",
      "Disk and load warnings catch issues early",
      "State history shows when outages started and how often devices drop.",
      "Post-change verification gives confidence after VLAN or firewall changes.",
    ],
  },
  {
    slug: "tailscale-vpn",
    title: "Tailscale VPN on pfSense",
    summary: "Remote access to the home LAN via Tailscale subnet routes and an exit node on pfSense.",
    status: "Done",
    tags: ["Security", "Homelab", "Networking"],
    tech: ["pfSense", "Tailscale", "Subnet Routing", "Exit Node", "VPN"],
    thumbnail: tailscale,
    images: [{ src: tailscale, alt: "Tailscale admin console showing the pfSense node" }],
    overview: "Securely reach LAN hosts from anywhere without exposing ports, using Tailscale running directly on the pfSense firewall.",
    built: [
      "Installed the Tailscale package from System → Package Manager.",
      "Enabled and authenticated the service; confirmed the node in the admin console.",
      "Approved advertised subnet routes in the Tailscale admin console.",
      "Enabled and approved pfSense as an exit node.",
    ],
    snippets: [
      {
        title: "Test routing from a tailnet client",
        language: "bash",
        code: `ping 192.168.10.50`,
      },
    ],
    challenges: [PH_CHALLENGES],
    learned: [PH_LEARNED],
  },
  {
    slug: "pfsense-home-network",
    title: "pfSense → Switch → AP Home Network",
    summary: "Replaced the ISP router with pfSense on a Netgate 1100, wired through a switch to a Ubiquiti AP.",
    status: "Done",
    tags: ["Networking", "Homelab", "Security"],
    tech: ["pfSense+", "Netgate 1100", "Ubiquiti AP", "Bridge Mode", "Cat6", "Cisco Packet Tracer"],
    thumbnail: pfsense,
    images: [{ src: pfsense, alt: "Home network topology: ISP router, pfSense, switch and access point" }],
    overview: "Take control of the home network by replacing the ISP router with an open-source firewall/router.",
    built: [
      "pfSense+ on a Netgate 1100; WAN to the ISP router in bridge mode.",
      "LAN to a 6-port unmanaged switch (later swapped for a different switch).",
      "PC, TV and printer wired to the switch over Cat6.",
      "Ubiquiti AP placed to cover the whole house, managed from phone or PC.",
    ],
    snippets: [],
    challenges: [PH_CHALLENGES],
    learned: [PH_LEARNED],
  },
  {
    slug: "hotel-management-network",
    title: "Hotel Management Network",
    summary: "Hotel network topology designed and built in Cisco Packet Tracer.",
    status: "Done",
    tags: ["Networking"],
    tech: ["Cisco Packet Tracer"],
    thumbnail: hotel,
    images: [{ src: hotel, alt: "Packet Tracer topology for the hotel management network" }],
    overview: "[Add project overview]",
    built: ["Built the hotel network topology in Cisco Packet Tracer.", "[Add details]"],
    snippets: [],
    challenges: [PH_CHALLENGES],
    learned: [PH_LEARNED],
  },
  {
    slug: "packet-tracer-troubleshooting-labs",
    title: "Packet Tracer Troubleshooting Labs",
    summary: "Ticket-style troubleshooting scenarios: connectivity, DNS/web, departments offline, link degradation, VoIP.",
    status: "In progress",
    tags: ["Networking"],
    tech: ["Cisco Packet Tracer", "Cisco IOS", "Troubleshooting"],
    thumbnail: labs,
    images: [{ src: labs, alt: "BridgeOpsOne Academy dashboard showing the Operations Labs catalog of 25 Packet Tracer troubleshooting labs, with a Lab 1 preview panel" }],
    source: {
      title: "Where the labs come from",
      text: "These labs come from BridgeOpsOne Academy — the Operations Labs catalog I work through to practice structured troubleshooting.",
      url: "https://bridgeopsone-academy.web.app/dashboard",
    },
    overview: "Practice structured troubleshooting across realistic enterprise trouble tickets.",
    built: [
      "Lab 1 — Internet connectivity",
      "Lab 2 — Website unreachable investigation",
      "Lab 3 — Department connectivity issue",
      "Lab 4 — Users unable to reach external resources",
      "Lab 5 — New workstation deployment issue",
      "Lab 6 — Multiple departments offline",
      "Lab 8 — Data center link degradation",
      "Lab 10 — New phones unable to register",
    ],
    snippets: [],
    challenges: [PH_CHALLENGES],
    learned: [PH_LEARNED],
  },
  {
    slug: "home-server",
    title: "Proxmox Home Server",
    summary: "Old PC upgraded and turned into a Proxmox VE hypervisor for self-hosted services.",
    status: "Done",
    tags: ["Homelab"],
    tech: ["Proxmox VE", "Virtualization", "RAM/SSD upgrade"],
    thumbnail: homeServer,
    images: [{ src: homeServer, alt: "Proxmox VE 9.2.2 web console on node pve, with the Shell view open showing pveversion, the cluster resource table for the plex, portfolio, minecraft and Nagios guests, and pvesm storage status" }],
    overview: "Repurpose an old PC as a home server to host Plex, media/NAS, Minecraft and other experiments.",
    built: [
      "Upgraded RAM and SSD.",
      "Installed Proxmox VE (web UI at 203.0.113.x:8006).",
      "Completed base setup for hosting VMs.",
    ],
    snippets: [],
    challenges: [PH_CHALLENGES],
    learned: [PH_LEARNED],
  },
  {
    slug: "minecraft-server",
    title: "Minecraft Server",
    summary: "24/7 game server on an Ubuntu VM in Proxmox, monitored with Webmin, hosted with AMP.",
    status: "Done",
    tags: ["Homelab", "Networking"],
    tech: ["Proxmox VE", "Ubuntu Server", "Webmin", "AMP", "pfSense", "Port Forwarding", "Dynamic DNS (FreeDNS)"],
    thumbnail: minecraft,
    images: [{ src: minecraft, alt: "Proxmox console of the minecraft-server virtual machine showing systemctl status ampinstmgr reporting the AMP Instance Manager active and the ADS01 instance running" }],
    overview: "Host a Minecraft server for friends that stays online 24/7.",
    built: [
      "Ubuntu Server VM on Proxmox (203.0.113.x).",
      "Webmin on :10000 to monitor storage usage and latency in real time.",
      "AMP on :8080 to host the game, with room for more game instances.",
      "Port forwarding on pfSense and dynamic DNS via FreeDNS for outside access.",
    ],
    snippets: [],
    challenges: [PH_CHALLENGES],
    learned: [PH_LEARNED],
  },
  {
    slug: "pi-hole",
    title: "Pi-hole Ad Blocker",
    summary: "Network-wide DNS ad blocking on a Raspberry Pi, configured headless over SSH.",
    status: "Done",
    tags: ["Homelab", "Security"],
    tech: ["Pi-hole", "Raspberry Pi", "DNS", "SSH", "Linux"],
    thumbnail: piHole,
    images: [{ src: piHole, alt: "Raspberry Pi Zero W with a microSD card in its slot, next to an SD adaptor and a micro-USB power cable, annotated with labels for the SD card, the board, the adaptor and the power supply" }],
    overview: "Block unwanted ads for every device on the network by filtering DNS between the ISP and the LAN.",
    built: [
      "Flashed the software to a microSD card.",
      "Configured entirely from a terminal on another computer — no monitor or mouse needed.",
    ],
    snippets: [],
    challenges: ["SD card corruption once took Pi-hole down (later a motivation for Nagios monitoring)."],
    learned: [PH_LEARNED],
  },
];

export const allTags: Tag[] = ["Networking", "Security", "Homelab", "Monitoring", "Automation", "Cloud"];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
