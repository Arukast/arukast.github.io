---
title: "OpenWrt Automated Infrastructure"
description: "An automated, version-controlled OpenWrt configuration suite and deployment framework for high-performance edge gateways. Eliminates bufferbloat using SQM CAKE, enforces network-wide DNS-over-HTTPS privacy, and integrates a zero-trust mesh network with real-time Telegram telemetry."
status: "PRODUCTION" # Options: PRODUCTION, ONLINE, BLUEPRINT, STABLE
category: "Network Engineering & Automation" # e.g., "Docker Routing", "Go Router & Queue", "Web Application"
tags: ["OpenWrt", "WireGuard", "Tailscale", "SQM CAKE", "Shell Scripting", "DNS over HTTPS", "Automation"]
icon: "fa-network-wired" # FontAwesome icon name (e.g., fa-cube, fa-server, fa-globe, fa-shield-halved)
architecture: ["Automated Script Provisioning", "SQM CAKE & DoH Edge Security", "Tailscale & WireGuard Mesh", "Asynchronous Telegram Telemetry"] # Optional: flows for the system path schematic

# Links (Both are optional, omit if not applicable)
githubUrl: "https://github.com/Arukast/OpenWrt-Config"
liveUrl: ""

# Ordering & Homepage Pinning (Optional)
order: 4 # Integer: lower numbers are displayed first (e.g., 1 before 2)
featured: true # Boolean: set to true to feature this project on the homepage

# Media Showcase, Recommended Limit between 6 to 12 images per project (Optional, omit if not applicable)
image: ""
gallery:
  - ""
  - ""
---

### Project Overview

This project delivers a fully automated, version-controlled infrastructure deployment framework designed to transform consumer routers into enterprise-grade edge gateways. The primary motivation was to overcome standard vendor firmware limitations, eliminate severe multi-site bufferbloat, and enforce zero-trust security and absolute DNS privacy across disparate local networks. 

By avoiding manual GUI configurations, this suite ensures that entire network environments can be programmatically provisioned, optimized, and monitored using lightweight, reproducible scripts.

### System Architecture & Flow

The framework automates the network lifecycle from initial bare-metal flash to continuous cloud-backed monitoring.

1. **Edge Gateway Provisioning**: High-performance JCG Q20 and ZTE E8820S routers are flashed with custom OpenWrt images. Upon first boot, a GitHub-hosted automation script environment optimizes the physical layer, configuring ZRAM memory expansions to handle high connection states alongside automated WISP/LAN client routing.
2. **Traffic Optimization & Privacy**: The gateway applies dynamic Smart Queue Management (SQM CAKE) to automatically adjust to fluctuating bandwidth limits and eliminate bufferbloat. Simultaneously, network traffic is subjected to strict DNS over HTTPS (DoH) privacy protocols paired with ultra-lightweight, host-level ad and tracker blocking via `adblock-lean`.
3. **Zero-Trust Mesh Networking**: To bridge independent locations securely, Tailscale and WireGuard daemons are compiled and configured directly into the automated deployment cycle, establishing a secure, encrypted overlay network without exposing external open ports.
4. **Asynchronous Telemetry & Alerting**: System events trigger low-overhead OpenWrt hotplug scripts. These scripts communicate asynchronously with a Google Apps Script webhook, routing critical infrastructure telemetry, security notifications, and brute-force detection logs straight to a dedicated Telegram channel.

### Key Technical Specifications

- **Latency Optimization**: Complete mitigation of network bufferbloat under heavy upload/download loads utilizing dynamic SQM CAKE queue disciplines.
- **Resource Management**: Minimal memory overhead achieved by leveraging `adblock-lean` for DNS-layer filtering and configuring ZRAM swapping for low-RAM hardware constraints.
- **Security & Privacy**: Total encryption of upstream DNS requests via DNS over HTTPS (DoH), coupled with an automated WireGuard deployment pipeline.
- **Incident Response**: Sub-second security telemetry delivery via asynchronous edge-triggered hotplug webhooks.

### Deployment & Usage

The infrastructure suite can be deployed to a freshly flashed OpenWrt router via a simple bootstrap execution over SSH.
