# Homelab Secure Bridging: Portless Cloudflare Ingress

This directory contains template configurations and architecture guidelines for deploying a Cloudflare Tunnel (`cloudflared`) to bridge internal homelab resources (Proxmox VMs, LXC containers, Docker microservices) safely to the public internet without exposing your residential WAN IP or opening ports on your home router.

---

## Architecture Overview

In a traditional self-hosted ingress setup, you must configure port forwarding (ports 80 and 443) on your router, exposing your raw residential WAN IP to the internet. This exposes your network to DDoS attacks, port sweeps, and zero-day exploits targeting your reverse proxy.

Cloudflare Tunnels solve this by running a lightweight agent (`cloudflared`) inside your home network. This agent establishes multiple secure, persistent outbound TCP/QUIC connections to the nearest Cloudflare Edge data centers.

```text
                        ┌────────────────────────────────────────────────────────┐
                        │                 Cloudflare Edge Network                │
                        │  - DNS Resolution (demo.yourname.dev)                  │
                        │  - WAF & Geo-Blocking Policies                         │
                        │  - Zero Trust Access Policies                          │
                        └───────────────────────────┬────────────────────────────┘
                                                    │
                                  Outbound TLS/QUIC │ (No Inbound Ports Opened!)
                                  Tunnel Connection │
                                                    ▼
┌────────────────────────────────────────────────────────────────────────────────┐
│                              Home LAN / Hypervisor                             │
│                                                                                │
│   ┌─────────────────────┐                   ┌──────────────────────────────┐   │
│   │  cloudflared Agent  │  Local Request    │     Local Microservices      │   │
│   │  (Docker or Systemd)├──────────────────►│  - Proxmox PVE (Port 8006)   │   │
│   └─────────────────────┘                   │  - Caddy Proxy (Port 80/443) │   │
│                                             │  - App Containers            │   │
│                                             └──────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────────────┘
```

---

## Configuration Templates

- **[docker-compose.yml](file:///home/arukast/Projects/portfolioWebAlta/homelab/docker-compose.yml)**: Hardened Docker Compose setup to run `cloudflared` in a container.
- **[config.yml.example](file:///home/arukast/Projects/portfolioWebAlta/homelab/config.yml.example)**: Ingress routing definitions mapping subdomains to local resources.
- **[cloudflared.service](file:///home/arukast/Projects/portfolioWebAlta/homelab/cloudflared.service)**: Systemd service unit descriptor for running `cloudflared` on raw VMs or LXC containers.

---

## Deployment & Setup Guide

### Step 1: Initial Tunnel Authorization
First, authenticate the Cloudflare CLI on your admin machine to link your account:
```bash
cloudflared tunnel login
```
This opens a browser window where you select your domain (e.g., `yourname.dev`). After selecting, a certificate (`cert.pem`) is downloaded to your machine.

### Step 2: Create a Named Tunnel
Create a tunnel representing your homelab environment:
```bash
cloudflared tunnel create homelab-tunnel
```
This generates:
1. A **Tunnel UUID** (e.g., `00000000-0000-0000-0000-000000000000`).
2. A **Credentials File** in JSON format (`<UUID>.json`).

### Step 3: Configure Ingress Rules
1. Copy the example configuration:
   ```bash
   cp config.yml.example config.yml
   ```
2. Replace `tunnel` with your Tunnel UUID.
3. Update `credentials-file` to point to the path of your JSON credential.
4. Modify the `ingress` block to map your specific subdomains to your home services' internal IP addresses.

### Step 4: Run the Agent

#### Option A: Run inside Docker (Recommended for Isolation)
Move `config.yml` and your credential file (renamed to `creds.json`) to the same directory as `docker-compose.yml`. Then run:
```bash
docker compose up -d
```

#### Option B: Run as a systemd Service (Recommended for Proxmox VM/LXC)
1. Install `cloudflared` on your target VM or LXC:
   ```bash
   # Add Cloudflare package repository
   curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null
   echo "deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared-ascii.repo main" | sudo tee /etc/apt/sources.list.d/cloudflared.list
   sudo apt update && sudo apt install cloudflared
   ```
2. Place your `config.yml` and credential JSON file under `/etc/cloudflared/`.
3. Create a dedicated user for security:
   ```bash
   sudo useradd -r -s /bin/false cloudflared
   sudo chown -R cloudflared:cloudflared /etc/cloudflared
   ```
4. Copy `cloudflared.service` to `/etc/systemd/system/cloudflared.service`.
5. Enable and start the service:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable --now cloudflared
   ```

### Step 5: Configure Cloudflare DNS Routes
Finally, route your domain's DNS to the tunnel so requests resolve through the Cloudflare Edge:
```bash
cloudflared tunnel route dns homelab-tunnel demo.yourname.dev
cloudflared tunnel route dns homelab-tunnel proxmox.yourname.dev
```

---

## Security Hardening Best Practices

### 1. Enable Cloudflare Zero Trust Access
Tunnels expose local services to the internet, but you can restrict access using **Cloudflare Access** (under Zero Trust):
- Create policies requiring Multi-Factor Authentication (MFA), specific email domains, or Github organization authorization before any requests are routed to your internal systems.

### 2. Network Segmentation
- Run `cloudflared` inside a segregated VLAN or isolated Docker network that only has access to the specific hosts and ports it needs to route. 
- Restrict the agent container/LXC from communicating with other parts of your home network.

### 3. Hardened Docker Contexts
- Our **[docker-compose.yml](file:///home/arukast/Projects/portfolioWebAlta/homelab/docker-compose.yml)** is configured with `read_only: true`, drops all kernel capabilities (`cap_drop: [ALL]`), and runs as unprivileged user `65534` (nobody) to restrict container breakout capabilities.
