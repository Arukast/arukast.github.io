---
title: "Portless Ingress Cloud Tunnel Node"
description: "Security architecture built to connect internal homelab servers and Proxmox VMs to external subdomains securely. Traditionally, developers open ports (80/443) on dynamic residential routers. This setup deploys lightweight cloudflared agents in Docker containers that build persistent outbound TLS connections to the Edge, securing the raw home IP from malicious sweeps."
status: "ONLINE" # Options: PRODUCTION, ONLINE, BLUEPRINT, STABLE
category: "Docker Routing" # e.g., "Docker Routing", "Go Router & Queue", "Web Application"
tags: ["Docker", "Cloudflare", "Caddy Proxy", "Proxmox"]
icon: "fa-shield-halved" # FontAwesome icon name (e.g., fa-cube, fa-server, fa-globe, fa-shield-halved)
architecture: ["Public Ingress", "Cloudflare Edge", "Docker Agent", "Proxmox PVE"] # Optional: flows for the system path schematic

# Links (Both are optional, omit if not applicable)
githubUrl: "https://github.com/Arukast/arukast.github.io/tree/main/homelab"
liveUrl: ""

# Ordering & Homepage Pinning (Optional)
order:  # Integer: lower numbers are displayed first (e.g., 1 before 2)
featured:  # Boolean: set to true to feature this project on the homepage


# Media Showcase, Recommended Limit between 6 to 12 images per project (Optional, omit if not applicable)
image: ""
gallery:
  - ""
---

### Project Overview

Opening direct inbound firewall rules on residential IP ranges exposes domestic networks to automated port scanners, DDoS attempts, and firmware vulnerability sweeps. This infrastructure design bypasses inbound port configurations entirely. 

By running an outbound-only connection agent (`cloudflared`) inside an isolated Docker network, we expose homelab applications to public subdomains safely while hiding the backend WAN IP.

### Network Topology

The request routing works as follows:

1. **User Request**: A client requests `demo.yourname.dev`.
2. **Cloudflare Edge**: DNS resolves to Cloudflare Edge. Security policies (WAF, Geo-blocking, Bot-fight mode) are processed here.
3. **Outbound Tunnel**: The local `cloudflared` Docker container maintains persistent outbound TCP/QUIC tunnels to nearby Cloudflare edge servers.
4. **Proxmox PVE / Caddy**: The agent passes the request to a local Caddy reverse proxy, which directs traffic to target virtual machines.

### Key Deployment Steps

- **Container Isolation**: The tunnel agent lives in a dedicated Docker network namespace with zero access to the host LAN.
- **TLS Offloading**: Certificate renewal is managed on Cloudflare's Edge and validated locally using wildcard certificates.
- **Access Policies**: Integrates with Cloudflare Zero Trust Access for multi-factor client authorization prior to routing payloads to the internal hypervisor.

### Repository Infrastructure Templates

Production-grade templates for deploying this configuration are available in the [homelab/](https://github.com/Arukast/arukast.github.io/tree/main/homelab) directory of this repository:

- **[Docker Compose Template](https://github.com/Arukast/arukast.github.io/blob/main/homelab/docker-compose.yml)**: Hardened Docker container configuration for launching the `cloudflared` agent.
- **[Configuration Template](https://github.com/Arukast/arukast.github.io/blob/main/homelab/config.yml.example)**: Example mapping ingress rules to internal Proxmox VE hosts and Docker services.
- **[Systemd Service File](https://github.com/Arukast/arukast.github.io/blob/main/homelab/cloudflared.service)**: Service configuration for direct VM/LXC deployments on Proxmox.

