---
title: "Portless Ingress Cloud Tunnel Node"
description: "Security architecture built to connect internal homelab servers and Proxmox VMs to external subdomains securely. Traditionally, developers open ports (80/443) on dynamic residential routers. This setup deploys lightweight cloudflared agents in Docker containers that build persistent outbound TLS connections to the Edge, securing the raw home IP from malicious sweeps."
status: "ONLINE"
category: "Docker Routing"
tags: ["Docker", "Cloudflare", "Caddy Proxy", "Proxmox"]
githubUrl: "https://github.com"
architecture: ["Public Ingress", "Cloudflare Edge", "Docker Agent", "Proxmox PVE"]
icon: "fa-shield-halved"
---

### Project Overview

Opening direct inbound firewall rules on residential IP ranges exposes domestic networks to automated port scanners, DDoS attempts, and firmware vulnerability sweeps. This infrastructure design bypasses inbound port configurations entirely. 

By running an outbound-only connection agent (`cloudflared`) inside a isolated Docker network, we expose homelab applications to public subdomains safely while hiding the backend WAN IP.

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
