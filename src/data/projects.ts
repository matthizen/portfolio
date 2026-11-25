// All project content lives here. Add or edit a project by editing this array —
// no component changes needed. Images are imported from src/assets/projects.
// Optional lists (snippets, challenges, learned) can be left empty; their sections hide.
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
import it490Dmz from "@/assets/projects/it490-dmz.png";

export type Tag =
  | "Networking"
  | "Troubleshooting"
  | "Security"
  | "Homelab"
  | "Automation"
  | "Cloud"
  | "Monitoring";

export interface Snippet {
  title: string;
  language: string;
  code: string;
}

export interface Project {
  slug: string;
  title: string;
  /** Where it was built: "Packet Tracer" for simulated designs, "Homelab" for real hardware. */
  where: "Packet Tracer" | "Homelab" | "Lab platform" | "Team project";
  summary: string;
  status: "Done" | "In progress";
  featured?: boolean;
  tags: Tag[];
  tech: string[];
  thumbnail: string;
  images: { src: string; alt: string; wide?: boolean }[];
  overview: string;
  built: string[];
  /** Heading for the built list; defaults to "What I built". */
  builtTitle?: string;
  snippets: Snippet[];
  challenges: string[];
  learned: string[];
  /** Work still planned, shown under "Still to come". */
  next?: string[];
  /** An addressing plan shown as a table. */
  addressing?: { caption: string; columns: string[]; rows: string[][] };
  /** An outside link shown under its own heading; label is the button text. */
  source?: { title: string; text: string; url: string; label: string };
}

/** Projects in the Notion notebook that haven't started yet. */
export const roadmap: { title: string; text: string }[] = [
  {
    title: "Plex server",
    text: "A media server on the Proxmox node; its container is already in place.",
  },
  {
    title: "Active Directory",
    text: "A Windows domain lab: users, groups and policy, managed centrally.",
  },
  { title: "Cloud", text: "Taking the same networking basics into a cloud provider." },
];

export const projects: Project[] = [
  {
    slug: "enterprise-network-capstone",
    title: "IT491 Capstone Enterprise Network Project",
    where: "Team project",
    summary:
      "A four-person team project: a financial-services office rebuilt in Packet Tracer with six VLANs, OSPF, central DHCP, DNS, RADIUS, Syslog and NTP, and ACLs tested in both directions.",
    status: "In progress",
    featured: true,
    tags: ["Networking", "Security"],
    tech: [
      "Cisco Packet Tracer",
      "Cisco ISR 4331",
      "Catalyst 3560 and 2960",
      "WLC 2504 and 3702i AP",
      "VLANs and 802.1Q",
      "OSPF",
      "DHCP relay",
      "DNS",
      "RADIUS/AAA",
      "SSH",
      "Syslog and NTP",
      "Extended ACLs",
      "NAT/PAT",
      "Port security, PortFast, BPDU Guard",
      "Trello",
      "Git and GitHub",
    ],
    thumbnail: capstone,
    images: [
      {
        src: capstone,
        wide: true,
        alt: "Packet Tracer topology: an external network at 203.0.113.0/24, the KFP-R1 edge router doing NAT/PAT over a serial link to KFP-R2, two multilayer switches, four access switches, and VLANs for management (99), IT and admin (10), finance (20), general staff (30), servers (40) and wireless (50) with a WLC and lightweight AP",
      },
    ],
    overview:
      "This is a team project: four of us, eight weeks (29 September to 24 November 2026), one network. The client is Kestrel Financial Partners, a fictional finance firm that has outgrown a flat, loosely managed office network: no separation between departments, no central login for admins, no control over who can reach the finance systems and no visibility into what's happening. Each of us owned one area (architecture, switching and routing, network services, security and testing) and built it to a single shared build standard. We ran the work as four Agile sprints and tracked it on a shared Trello board: every user story was a card with an owner and a due date, so at the weekly meeting it was clear who was doing what and what was blocked, and the evidence for each card went into the team's GitHub repository. The hard part isn't any single technology; it's proving they all work together.",
    builtTitle: "What we build",
    built: [
      "Routing: KFP-R1 is the edge router, doing NAT/PAT to a simulated internet (203.0.113.0/24) over a serial link to KFP-R2, the routed core. R2 connects to two Catalyst 3560 multilayer switches over /30 links, and OSPF ties all four together.",
      "Switching: the 3560s route between VLANs through SVIs and feed four Catalyst 2960 access switches over redundant 802.1Q trunks, with an unused VLAN 999 as the native VLAN.",
      "Central services in Server VLAN 40: one server for DHCP and DNS (10.20.40.10), one for RADIUS (10.20.40.11) and one for Syslog and NTP. DHCP reaches each user VLAN through relay on its gateway SVI; the Management VLAN stays static.",
      "Admin access: SSH only, with 2048-bit RSA keys and Telnet refused, and admin logins checked against RADIUS with a local account as the fallback.",
      "Segmentation: extended ACLs on the gateway SVIs (FINANCE-ACL, GENERAL-STAFF-ACL, WIRELESS-ACL) keep General Staff and Wireless out of Finance and Management while DHCP, DNS and RADIUS keep working.",
      "Access layer: port security with sticky MACs, PortFast, BPDU Guard, DHCP snooping, storm control and shut-down unused ports on every access switch.",
      "Wireless: a WLC 2504 and a lightweight AP authenticate users against RADIUS and switch their traffic locally into VLAN 50.",
      "My part: OSPF and the routed links, NTP across the managed devices, RADIUS on the network devices with its local fallback, NAT/PAT on the edge router, Syslog and wireless verification, and acceptance tests T-01 (ACL segmentation), T-02 (DHCP), T-03 (DNS) and T-05 (NAT/PAT), all passed.",
    ],
    snippets: [],
    addressing: {
      caption: "Addressing and segmentation plan",
      columns: ["VLAN", "Segment", "Subnet", "Policy"],
      rows: [
        [
          "10",
          "IT and Admin",
          "10.20.10.0/24",
          "Network administration; management reach as the build standard allows",
        ],
        ["20", "Finance", "10.20.20.0/24", "Protected; denied from General Staff and Wireless"],
        [
          "30",
          "General Staff",
          "10.20.30.0/24",
          "Internet through NAT; denied to Finance and Management",
        ],
        [
          "40",
          "Servers",
          "10.20.40.0/24",
          "DHCP, DNS, RADIUS, Syslog, NTP; reachable only for the services each segment needs",
        ],
        [
          "50",
          "Wireless",
          "10.20.50.0/24",
          "Same DHCP and ACL policy as wired users in the same role",
        ],
        [
          "99",
          "Management",
          "10.20.99.0/24",
          "Device management, SSH only, reachable from IT and Admin",
        ],
        [
          "999",
          "Native VLAN",
          "—",
          "Unused; set as the trunk native VLAN so it carries no traffic",
        ],
        [
          "—",
          "Router links",
          "10.20.255.0/24",
          "/30 point-to-point links between R1, R2 and the multilayer switches",
        ],
        [
          "—",
          "Simulated internet",
          "203.0.113.0/24",
          "Documentation range used to test outbound NAT/PAT",
        ],
      ],
    },
    challenges: [
      "The scope ruled out a wireless controller, but none of Packet Tracer's standalone access points can authenticate users against RADIUS. We wrote up the conflict and got a scope amendment approved for a basic WLC and lightweight AP, limited to RADIUS and VLAN separation.",
      "BPDU Guard, applied to SW4 as part of the access-port baseline, err-disabled the port facing the WLC. Infrastructure ports needed their own exception in the build standard.",
      "Testing found that the edge router's inbound ACL still let the outside network reach internal subnets. The fix blocks direct external access while keeping outbound NAT/PAT working.",
      "Packet Tracer files can't be merged, so only one person edits the master file at a time. Everyone else builds in a copy and hands the change over, and a clean checkpoint is committed before every test.",
      "Some hardening commands, like login blocking on the 2960s and ACL logging, aren't supported in Packet Tracer. We logged them as platform limits rather than skipping them silently.",
    ],
    learned: [
      "A Trello card with one owner and a due date keeps four people from building the same thing twice, or nobody building it at all.",
      "An ACL has to be tested from both sides: the traffic it should allow, and the traffic it should block.",
      "Breaking something on purpose, like an ACL rule that blocks DHCP, is the quickest way to prove you can find and fix it.",
      "Having someone who didn't build a part audit it catches what the builder stopped seeing.",
    ],
    next: [
      "T-10: one end-to-end test, a wireless client that joins, gets an address, resolves a name, reaches its own segment, is blocked from Finance, gets to the internet and shows up in Syslog.",
      "T-14 and T-15: the non-author audit and the build-standard audit, with any discrepancies fixed.",
      "The final report, exported configurations and presentation, due 24 November.",
    ],
    source: {
      title: "The team repository",
      text: "Packet Tracer checkpoints, the build standard, meeting notes and test evidence for every sprint.",
      url: "https://github.com/benpopso/IT491-Team-3-Cisco-Team",
      label: "View the repository on GitHub",
    },
  },
  {
    slug: "it490-dmz-api",
    title: "IT490 Capstone Project",
    where: "Team project",
    summary:
      "A team-built music app split across separate VMs that talk only through RabbitMQ. I built the DMZ: the one server allowed to reach the internet, pulling Last.fm data for the rest of the system.",
    status: "Done",
    tags: ["Networking", "Security", "Automation"],
    tech: [
      "PHP (CLI)",
      "RabbitMQ",
      "AMQP request/reply",
      "Last.fm REST API",
      "JSON",
      "Ubuntu VMs",
      "Git and GitHub",
    ],
    thumbnail: it490Dmz,
    images: [
      {
        src: it490Dmz,
        wide: true,
        alt: "Architecture diagram: the front end and MySQL database sit in an internal zone and talk only to a RabbitMQ broker; the broker passes requests on queue dmz_jobs with routing key us.api to the DMZ processor, which alone makes HTTP calls out to the Last.fm API",
      },
    ],
    overview:
      "IT490 (Systems Integration at NJIT, spring 2026) is a team capstone: one web app split across separate VMs, each owned by a different teammate. Ours is a music site where users register, log in, browse top artists and tracks, search for an artist and leave reviews. The front end, the database, the RabbitMQ broker, the DMZ and the deployment tooling each live on their own machine or branch, and they only talk to each other through RabbitMQ messages. The rule is that nothing inside talks to the internet directly. I owned the DMZ: the one machine that calls the outside world, so if an outside API misbehaves, or someone tries to abuse it, the damage stops there.",
    built: [
      "The team: a PHP and Bootstrap front end (login and registration, artist cards, an explore page with fuzzy search, and reviews), a database listener that handles logins, sessions, artists and reviews in MySQL, the RabbitMQ link between VMs, and bundler and installer scripts that package each tier for deployment.",
      "A long-running PHP worker (dmz-processor/processor.php) that listens on its own RabbitMQ queue, dmz_jobs, with routing key us.api, and replies to each request on the same connection.",
      "One small helper that builds every Last.fm call, so the API key, base URL and JSON format live in one place.",
      "Three request types the other tiers can ask for: many_artists (the top artists chart, each enriched with listeners, play count, bio and link), many_tracks (the top tracks chart) and single_artist (one artist by name).",
      "Clean, flat replies: each one says what it is, when it was fetched and carries a payload whose field names match the database's artist_info table, so the database tier can store it without reshaping it.",
      "Error checks for a missing request type and for empty or failed API answers, so a bad request returns an error instead of hanging the queue.",
      "The broker settings for the DMZ (host, vhost, exchange, queue, routing key) in the shared testRabbitMQ.ini, so every VM agreed on where DMZ jobs go.",
    ],
    snippets: [
      {
        title: "Every outside call goes through one helper",
        language: "php",
        code: `function lastfm($url, $api_key, $method, $extras = []) {
  $query = array_merge([
    "method"  => $method,
    "api_key" => $api_key,
    "format"  => "json",
  ], $extras);

  $endpoint = $url . "?" . http_build_query($query);
  return json_decode(file_get_contents($endpoint), true);
}`,
      },
      {
        title: "The worker: route each request, then listen on the DMZ queue",
        language: "php",
        code: `function requests($request) {
  global $API, $URL;
  if (!isset($request["type"])) {
    return ["status" => "error", "message" => "unsupported type"];
  }
  switch ($request["type"]) {
    case "many_artists": return ["status" => "success", "data" => many_artists($URL, $API)];
    case "many_tracks":  return ["status" => "success", "data" => many_tracks($URL, $API)];
    // ...
  }
}

$server = new rabbitMQServer(__DIR__ . "/../testRabbitMQ.ini", "testServer3");
$server->process_requests("requests");`,
      },
    ],
    challenges: [
      "My first version pulled charts on a timer with a cron job and pushed them at the broker. Nobody was asking for them, so I dropped the cron script and made the DMZ answer requests instead: data moves only when another tier asks for it.",
      "The first processor did too much, with separate weekly-chart, top-artist and artist-info paths. I cut it from about 180 lines to a few small functions with one way in and one reply shape.",
      "The database needed more than the chart gives (bios, listener counts), so many_artists makes one artist.getInfo call per artist. Going from 50 to 300 to 1,000 artists made a single request slow, a trade-off between richer data and response time.",
    ],
    learned: [
      "Why a DMZ exists: one exposed box with one job, and everything inside reaches the internet only through it.",
      "RabbitMQ request/reply: queues and routing keys decide which VM gets which job, and the caller waits for the answer.",
      "Agreeing on the shape of a message is most of the integration work. Once the field names matched the database table, the hand-off just worked.",
      "Working on a shared repo with a branch per tier (front end, database, DMZ, deployment) so each of us could ship without stepping on each other.",
    ],
    next: [
      "Move the API key out of the code into a config file kept off GitHub.",
      "Pass the artist name through to single_artist, and send an error back for unknown request types instead of no reply.",
      "Cache chart results on the DMZ so repeated requests don't hit Last.fm every time.",
    ],
    source: {
      title: "The code",
      text: "The team repository has a branch per tier: front end, database, RabbitMQ, deployment and my DMZ work on dmz/api-service.",
      url: "https://github.com/matthizen/IT490-004",
      label: "View the repository on GitHub",
    },
  },
  {
    slug: "campus-network",
    title: "Campus and branch network",
    where: "Packet Tracer",
    summary:
      "Three campus buildings, a remote branch and a cloud edge, joined by serial WAN links and RIPv2.",
    status: "Done",
    featured: true,
    tags: ["Networking"],
    tech: [
      "Cisco Packet Tracer",
      "Cisco IOS",
      "VLANs",
      "802.1Q",
      "Router-on-a-stick",
      "DHCP",
      "RIPv2",
      "DCE/DTE serial",
      "Subnetting",
    ],
    thumbnail: campus,
    images: [
      {
        src: campus,
        wide: true,
        alt: "Packet Tracer topology: a multilayer switch feeding eight department VLANs across buildings A, B and C, linked by serial WAN to a branch router with staff and student VLANs and to a cloud server",
      },
    ],
    overview:
      "The brief was an organisation spread over several buildings with a branch office across town. Every department needed its own broadcast domain, its own addresses handed out automatically, and a path to every other site without anyone typing static routes.",
    built: [
      "Ten department VLANs (Admin, HR, Finance, Business, E&C, A&D, the student lab, IT and the branch's staff and student networks), each on its own /24.",
      "Access ports for end hosts and 802.1Q trunks up to the multilayer switch.",
      "Router subinterfaces as the default gateway for every VLAN, so traffic between departments is routed rather than flooded.",
      "A DHCP pool per network on the routers, handing out gateway and DNS along with the address.",
      "Serial DCE/DTE links between campus, branch and cloud, clocked at 64,000 bps on the DCE side.",
      "RIPv2 on every router so each site learns the others' networks on its own.",
    ],
    snippets: [
      {
        title: "Campus router: a DHCP pool and its matching subinterface",
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
        title: "Campus router: RIPv2 advertising every local network",
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
        title: "Branch router: staff and student VLANs",
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
    addressing: {
      caption: "Addressing plan, read off the topology",
      columns: ["VLAN", "Department", "Subnet"],
      rows: [
        ["10", "Admin (Building A)", "192.168.1.0/24"],
        ["20", "HR (Building A)", "192.168.2.0/24"],
        ["30", "Finance (Building A)", "192.168.3.0/24"],
        ["40", "Business (Building A)", "192.168.4.0/24"],
        ["50", "E&C (Building B)", "192.168.5.0/24"],
        ["60", "A&D (Building B)", "192.168.6.0/24"],
        ["70", "Student lab (Building C)", "192.168.7.0/24"],
        ["80", "IT department (Building C)", "192.168.8.0/24"],
        ["90", "Branch staff", "192.168.9.0/24"],
        ["100", "Branch student lab", "192.168.10.0/24"],
        ["—", "Campus to branch serial link", "10.10.10.0/30"],
        ["—", "Campus core link", "10.10.10.4/30"],
        ["—", "Cloud edge", "20.0.0.0/30"],
      ],
    },
    challenges: [],
    learned: [],
  },
  {
    slug: "nagios-monitoring",
    title: "Nagios monitoring",
    where: "Homelab",
    summary: "One dashboard for every device and service at home, running on its own Proxmox VM.",
    status: "In progress",
    featured: true,
    tags: ["Homelab", "Monitoring", "Automation"],
    tech: [
      "Nagios Core",
      "Proxmox VE",
      "Ubuntu Server",
      "Apache",
      "SNMP",
      "NRPE",
      "systemd",
      "Bash",
    ],
    thumbnail: nagios,
    images: [
      {
        src: nagios,
        wide: true,
        alt: "Terminal on the nagios VM: systemctl status shows nagios4.service active and running, with its worker processes and a journal of successful worker registrations",
      },
    ],
    overview:
      "Before this, I found out something was down when someone told me. The goal was to flip that around: see a host or service fail on a screen first, and usually see why.",
    built: [
      'Downloaded the Ubuntu Server LTS ISO straight into Proxmox\'s local storage with "Download from URL".',
      "Created the VM: 2 vCPUs, 2 GB of RAM, a 20 GB disk on local-lvm, a VirtIO NIC on bridge vmbr0 and the QEMU guest agent enabled.",
      "Gave the guest a static IP so the dashboard address never moves, plus OpenSSH and qemu-guest-agent.",
      "Installed Nagios 4 from Ubuntu's nagios4 package, so updates come through apt, with Apache serving the dashboard.",
      "Locked the web UI behind a login: an admin account made with htdigest and Require valid-user in place of the package's IP-only rule.",
      "Defined hosts and services in /etc/nagios4/conf.d/homelab.cfg, validated with nagios4 -v, reloaded, and confirmed the checks were reporting.",
    ],
    snippets: [
      {
        title: "Install Nagios and the Apache modules it needs",
        language: "bash",
        code: `sudo apt install -y nagios4 nagios-plugins-contrib nagios-nrpe-plugin apache2
sudo a2enmod cgi auth_digest authz_groupfile rewrite`,
      },
      {
        title: "Check the config, then check Proxmox storage",
        language: "bash",
        code: `nagios4 -v /etc/nagios4/nagios.cfg
pvesm status
cat /etc/pve/storage.cfg`,
      },
    ],
    next: [
      "SNMP polling for interface and uptime data from the network gear.",
      "NRPE agents on the Linux hosts for disk, load and memory checks.",
      "Alerts when a host or service changes state.",
    ],
    challenges: [
      "Creating the VM failed with \"storage 'Media' is not online\": the wizard defaulted to a CIFS share that wasn't mounted. I moved the ISO and disk to local storage and confirmed what was healthy with pvesm status and /etc/pve/storage.cfg.",
      "The packaged Apache config only restricted access by IP. I replaced it with real authentication so the dashboard asks for a password.",
    ],
    learned: [
      "Ping and port checks need nothing installed on the target; SNMP reads interface counters; NRPE runs disk, load and memory checks on the host itself.",
      "Disk and load warnings show a problem coming before it becomes an outage.",
      'State history answers "when did this start?" and "how often does it drop?"',
      "After a VLAN or firewall change, a green board is proof the change didn't break anything.",
    ],
  },
  {
    slug: "tailscale-vpn",
    title: "Tailscale on pfSense",
    where: "Homelab",
    summary:
      "Reach the home LAN from anywhere through the firewall itself, with no ports opened to the internet.",
    status: "Done",
    tags: ["Security", "Homelab", "Networking"],
    tech: ["pfSense", "Tailscale", "Subnet routing", "Exit node", "VPN"],
    thumbnail: tailscale,
    images: [
      {
        src: tailscale,
        alt: "Tailscale desktop client, connected, listing three devices on the tailnet: a MacBook Air, an iPhone and the pfSense firewall, with addresses redacted",
      },
    ],
    overview:
      "I wanted to manage the lab from school without punching holes in the firewall. Running Tailscale on pfSense makes the firewall the single, authenticated way in.",
    built: [
      "Installed the Tailscale package from System → Package Manager → Available Packages.",
      "Enabled the service under Services → Tailscale and logged in with my Tailscale account.",
      "Confirmed pfSense appeared under Machines in the Tailscale admin console.",
      "Approved the LAN subnet routes pfSense advertises, so any device on the tailnet can reach home hosts.",
      "Turned on Advertise Exit Node and approved it, so traffic can leave through home when I'm on untrusted Wi-Fi.",
      "Tested from a tailnet client: ping to a LAN host, then the application ports (SSH, RDP, HTTP) I actually use.",
    ],
    snippets: [
      {
        title: "From a tailnet device, reach a host on the home LAN",
        language: "bash",
        code: `ping 192.168.10.50`,
      },
    ],
    challenges: [],
    learned: [],
  },
  {
    slug: "home-server",
    title: "Proxmox home server",
    where: "Homelab",
    summary:
      "An old desktop with new RAM and an SSD, now the hypervisor every other homelab project runs on.",
    status: "Done",
    tags: ["Homelab"],
    tech: ["Proxmox VE", "Virtualization", "LXC", "RAM and SSD upgrade"],
    thumbnail: homeServer,
    images: [
      {
        src: homeServer,
        alt: "Proxmox VE 9.2.2 web console on node pve, with the Shell view open showing pveversion, the cluster resource table for the plex, portfolio, minecraft and Nagios guests, and pvesm storage status",
      },
    ],
    overview:
      "Rather than buy a server, I upgraded a PC that was sitting unused. It now hosts Plex, this portfolio, a Minecraft server and the Nagios box, each in its own VM or container.",
    built: [
      "Upgraded the RAM and swapped in an SSD.",
      "Installed Proxmox VE, managed from its web UI on port 8006 (address kept private: 203.0.113.x).",
      "Set up storage and networking so new VMs and containers can be created in minutes.",
    ],
    snippets: [],
    next: ["A Plex media server, with storage shared as a small NAS."],
    challenges: [],
    learned: [],
  },
  {
    slug: "pfsense-home-network",
    title: "pfSense home edge",
    where: "Homelab",
    summary:
      "The ISP router demoted to bridge mode, with a Netgate 1100 running pfSense+ in charge of the house.",
    status: "Done",
    tags: ["Networking", "Homelab", "Security"],
    tech: ["pfSense+", "Netgate 1100", "Ubiquiti AP", "Bridge mode", "Cat6", "Cisco Packet Tracer"],
    thumbnail: pfsense,
    images: [
      {
        src: pfsense,
        alt: "Packet Tracer diagram of the home network: pfSense at the top feeding a PoE switch, which connects the Proxmox server, a PC, a printer, the Pi-hole and a UniFi access point serving a phone, laptop and tablet",
      },
    ],
    overview:
      "An ISP router decides everything for you. Replacing it with an open-source firewall put routing, DHCP, DNS and the firewall rules where I can see and change them.",
    built: [
      "pfSense+ on a Netgate 1100, its WAN facing the ISP router in bridge mode.",
      "LAN into a 6-port unmanaged switch, later replaced with a different switch.",
      "The PC, TV and printer wired to the switch over Cat6.",
      "A Ubiquiti access point placed to cover the whole house, managed from a phone or PC.",
    ],
    snippets: [],
    challenges: [],
    learned: [],
  },
  {
    slug: "hotel-management-network",
    title: "Hotel network",
    where: "Packet Tracer",
    summary:
      "Three floors, three routers in a triangle and eight departments, each on its own VLAN.",
    status: "Done",
    tags: ["Networking"],
    tech: [
      "Cisco Packet Tracer",
      "Cisco 2911",
      "Catalyst 2960",
      "VLANs",
      "Point-to-point /30 links",
      "Wireless access points",
    ],
    thumbnail: hotel,
    images: [
      {
        src: hotel,
        wide: true,
        alt: "Packet Tracer topology of a three-floor hotel: routers F1, F2 and F3 linked in a triangle over 10.10.10.0/30, .4/30 and .8/30, each floor switch serving department VLANs from IT and Admin to Reception, Store and Logistics, with access points for laptops and phones",
      },
    ],
    overview:
      "A hotel has very different people sharing one building: reception, sales, finance, HR, logistics, the shop. The design keeps each group on its own segment and gives every floor its own router, so one floor's problem stays on that floor.",
    built: [
      "One Cisco 2911 router and one 2960 switch per floor, the three routers joined in a triangle over /30 links (10.10.10.0, .4 and .8).",
      "Eight department VLANs: IT (10), Admin (20), Sales (30), HR (40), Finance (50), Logistics (60), Store (70) and Reception (80).",
      "PCs and printers in every department, plus wireless access points on the first and second floors for laptops and phones.",
    ],
    snippets: [],
    addressing: {
      caption: "Departments by floor, read off the topology",
      columns: ["VLAN", "Department", "Floor", "Subnet"],
      rows: [
        ["10", "IT", "3rd", "192.168.1.0/24"],
        ["20", "Admin", "3rd", "192.168.2.0/24"],
        ["30", "Sales", "2nd", "192.168.3.0/24"],
        ["40", "HR", "2nd", "192.168.4.0/24"],
        ["50", "Finance", "2nd", "192.168.5.0/24"],
        ["60", "Logistics", "1st", "192.168.6.0/24"],
        ["70", "Store", "1st", "192.168.7.0/24"],
        ["80", "Reception", "1st", "192.168.8.0/24"],
        ["—", "F2 to F3 router link", "—", "10.10.10.0/30"],
        ["—", "F3 to F1 router link", "—", "10.10.10.4/30"],
        ["—", "F2 to F1 router link", "—", "10.10.10.8/30"],
      ],
    },
    challenges: [],
    learned: [],
  },
  {
    slug: "packet-tracer-troubleshooting-labs",
    title: "Troubleshooting labs",
    where: "Lab platform",
    summary:
      "Trouble tickets worked like a help desk would: no internet, a dead website, a department offline, phones that won't register.",
    status: "In progress",
    tags: ["Networking", "Troubleshooting"],
    tech: ["Cisco Packet Tracer", "Cisco IOS", "Troubleshooting"],
    thumbnail: labs,
    images: [
      {
        src: labs,
        alt: "BridgeOpsOne Academy dashboard showing the Operations Labs catalog of 25 Packet Tracer troubleshooting labs, with a Lab 1 preview panel",
      },
    ],
    source: {
      title: "Where the labs come from",
      text: "The tickets come from the Operations Labs catalog at BridgeOpsOne Academy, which I'm working through to practise a repeatable, layer-by-layer method.",
      url: "https://bridgeopsone-academy.web.app/dashboard",
      label: "Open BridgeOpsOne Academy",
    },
    overview:
      "Building a network is half the job. These labs hand me one that's already broken, with a vague ticket, and the work is finding the fault in the order a real engineer would.",
    built: [
      "Lab 1: no internet connectivity",
      "Lab 2: a website that won't load",
      "Lab 3: one department cut off",
      "Lab 4: users can't reach external resources",
      "Lab 5: a new workstation that won't come up",
      "Lab 6: several departments offline at once",
      "Lab 8: a degraded data-centre link",
      "Lab 10: new IP phones that won't register",
    ],
    snippets: [],
    challenges: [],
    learned: [],
  },
  {
    slug: "minecraft-server",
    title: "Minecraft server",
    where: "Homelab",
    summary:
      "A game server my friends can reach any time: an Ubuntu VM, AMP to run it, a port forward and dynamic DNS.",
    status: "Done",
    tags: ["Homelab", "Networking"],
    tech: [
      "Proxmox VE",
      "Ubuntu Server",
      "Webmin",
      "AMP",
      "pfSense",
      "Port forwarding",
      "Dynamic DNS (FreeDNS)",
    ],
    thumbnail: minecraft,
    images: [
      {
        src: minecraft,
        alt: "Proxmox console of the minecraft-server virtual machine showing systemctl status ampinstmgr reporting the AMP Instance Manager active and the ADS01 instance running",
      },
    ],
    overview:
      "Friends wanted somewhere to play that didn't depend on my PC being on. It turned into a lesson in exposing exactly one service to the internet and nothing else.",
    built: [
      "An Ubuntu Server VM on Proxmox (address kept private: 203.0.113.x).",
      "Webmin on port 10000 to watch storage use and latency in real time.",
      "AMP on port 8080 to run the game. The licence (about $20) covers 10+ instances of any supported game.",
      "A port forward on pfSense so friends outside the house can join.",
      "Dynamic DNS through FreeDNS, so the address survives the ISP changing my public IP.",
    ],
    snippets: [],
    next: ["More game servers on the same AMP licence."],
    challenges: [],
    learned: [],
  },
  {
    slug: "pi-hole",
    title: "Pi-hole DNS filter",
    where: "Homelab",
    summary:
      "A Raspberry Pi Zero answering DNS for the whole house and dropping requests to ad and tracking domains.",
    status: "Done",
    tags: ["Homelab", "Security"],
    tech: ["Pi-hole", "Raspberry Pi", "DNS", "SSH", "Linux"],
    thumbnail: piHole,
    images: [
      {
        src: piHole,
        alt: "Raspberry Pi Zero W with a microSD card in its slot, next to an SD adaptor and a micro-USB power cable, annotated with labels for the SD card, the board, the adaptor and the power supply",
      },
    ],
    overview:
      "Pi-hole sits between the ISP and the network as its DNS server. Every device asks it before loading anything, so requests to ad domains are dropped for the TV and phones as well as the laptop, with nothing installed on them.",
    built: [
      "Flashed the OS onto a microSD card.",
      "Set the whole thing up headless over SSH from another computer, with no monitor or keyboard on the Pi.",
    ],
    snippets: [],
    challenges: [
      "A corrupted SD card once took Pi-hole, and with it DNS for the house, offline. Not noticing for a while is a big part of why I built the Nagios monitor.",
    ],
    learned: [],
  },
];

/** Tags that at least one project uses, in a fixed order. */
export const allTags: Tag[] = (
  [
    "Networking",
    "Troubleshooting",
    "Security",
    "Homelab",
    "Monitoring",
    "Automation",
    "Cloud",
  ] as Tag[]
).filter((t) => projects.some((p) => p.tags.includes(t)));

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
