// Resume content (from resume.pdf). Phone number intentionally omitted for privacy.
export const resume = {
  education: [
    { school: "New Jersey Institute of Technology", location: "Newark, NJ", degree: "B.A. in Information Technology", dates: "Expected May 2027" },
    { school: "Hudson County Community College", location: "Jersey City, NJ", degree: "A.S. in Computer Science", dates: "Aug 2023 – Dec 2024" },
  ],
  projects: [
    {
      title: "Network Infrastructure & Monitoring",
      points: [
        "Designed and deployed a network infrastructure environment using pfSense, managed switching, Ubiquiti wireless infrastructure, and Linux.",
        "Configured DHCP, DNS, NAT, firewall rules, IP addressing, and VLAN-based network segmentation.",
        "Diagnosed wireless connectivity issues using RF interference, signal strength, and retransmission metrics.",
        "Created network topology diagrams, IP address documentation, and troubleshooting documentation.",
        "Developed Bash and Python automation scripts for network health checks using Nagios.",
      ],
    },
    {
      title: "Cisco Routing & Switching Labs",
      points: [
        "Built Cisco routing and switching topologies using VLANs, 802.1Q trunking, STP, EtherChannel, and inter-VLAN routing.",
        "Implemented OSPF and BGP routing in simulated network environments; analyzed routing tables and route advertisements in Cisco Packet Tracer.",
        "Troubleshot connectivity issues involving VLANs, routing, addressing, and interface failures.",
      ],
    },
    {
      title: "Linux & Infrastructure Automation",
      points: [
        "Deployed and managed a Proxmox VE hypervisor running multiple services.",
        "Administered Linux-based services using SSH, system monitoring, network utilization, logs, and CLI tools.",
      ],
    },
  ],
  experience: [
    {
      role: "Automotive Technician Trainee", org: "Sunoco", location: "Hoboken, NJ", dates: "Jun 2024 – Jun 2026",
      points: [
        "Performed hands-on diagnostic and maintenance tasks following established procedures and troubleshooting mechanical issues.",
        "Managed customer vehicle intake and valet parking operations.",
      ],
    },
    {
      role: "Science Lab Assistant", org: "Hudson County Community College", location: "Union City, NJ", dates: "Sep 2023 – Dec 2024",
      points: [
        "Set up, maintained, and sanitized lab equipment for chemistry and biology courses.",
        "Assisted students with experiments and ensured adherence to lab safety protocols.",
      ],
    },
  ],
  skills: {
    Networking: ["TCP/IP", "IPv4/IPv6", "Subnetting/CIDR", "VLANs", "DHCP", "DNS", "NAT", "Routing", "Switching", "STP", "EtherChannel", "OSPF", "BGP", "Network troubleshooting"],
    Infrastructure: ["Cisco IOS", "Ubiquiti", "Linux", "Proxmox VE", "Network hardware", "Wireshark", "Cisco Packet Tracer", "pfSense"],
    "Scripting & Automation": ["Python", "Bash", "Git/GitHub"],
    "IT Support": ["Structured cabling"],
  } as Record<string, string[]>,
  certifications: [{ name: "CCNA", status: "In Progress" }],
};
