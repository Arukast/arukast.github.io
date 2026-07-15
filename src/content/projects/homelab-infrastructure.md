---
title: "Homelab Infrastructure"
description: "A high-performance Proxmox VE virtualization environment powering local development services, dedicated game servers, and a Vulkan-accelerated local LLM inference stack. Built with zero-trust remote access and comprehensive Grafana observability."
status: "PRODUCTION" # Options: PRODUCTION, ONLINE, BLUEPRINT, STABLE
category: "Infrastructure & Virtualization" # e.g., "Docker Routing", "Go Router & Queue", "Web Application"
tags: ["Proxmox VE", "LXC", "Tailscale", "Prometheus", "Grafana", "Nginx", "Nextcloud"]
icon: "fa-server" # FontAwesome icon name (e.g., fa-cube, fa-server, fa-globe, fa-shield-halved)
architecture: ["Tailscale Mesh Network", "Nginx Reverse Proxy", "LXC Container Ecosystem", "GPU Passthrough VM (LLM Inference)"] # Optional: flows for the system path schematic

# Links (Both are optional, omit if not applicable)
githubUrl: "https://github.com/Arukast/homelab"
liveUrl: ""

# Ordering & Homepage Pinning (Optional)
order: 3 # Integer: lower numbers are displayed first (e.g., 1 before 2)
featured: true # Boolean: set to true to feature this project on the homepage

# Media Showcase, Recommended Limit between 6 to 12 images per project (Optional, omit if not applicable)
image: ""
gallery:
  - ""
  - ""
---

### Project Overview

This project focuses on the architecture and deployment of a self-hosted enterprise-grade homelab designed to consolidate local development, media, gaming, and AI exploration into a single, power-efficient hardware footprint. 

The core motivation was to break away from restrictive cloud subscription models and public hosting limitations while solving two major engineering challenges: maximizing hardware utilization through bare-metal virtualization and securely accessing internal resources from anywhere without relying on a public IP address.

### System Architecture & Flow

The infrastructure leverages a layered approach to separate edge networking, containerized core applications, and heavy compute workloads.

1. **Edge Networking & Ingress (Tailscale & Nginx)**: Inbound traffic bypasses strict ISP CGNAT limitations via an encrypted Tailscale mesh network. Remote administration requests are routed securely to an Nginx reverse proxy LXC container, which handles internal DNS mapping and SSL termination.
2. **Service Ecosystem (LXC Containers)**: Resource-efficient Linux Containers (LXCs) host isolated microservices. This includes a centralized MariaDB database, a Nextcloud/Samba network-attached storage pool, and dedicated game servers for *Minecraft* and *Unturned*.
3. **AI Inference Engine (VM & Hardware Passthrough)**: Heavy compute workloads are completely isolated inside a dedicated Virtual Machine. An AMD RX 580 GPU is directly mapped to this VM using PCIe hardware passthrough, bypassing hypervisor overhead to provide raw Vulkan-accelerated compute for local LLM inference.
4. **Observability Stack (Prometheus & Grafana)**: A continuous polling loop driven by Prometheus scrapes system-level metrics directly from the Proxmox hypervisor, container runtimes, and host hardware sensors, outputting real-time health data to Grafana dashboards.

### Key Technical Specifications

- **Hypervisor Overhead**: Minimized by prioritizing LXC containers over heavy VMs for standard services.
- **Hardware Acceleration**: Bare-metal efficiency via direct PCIe passthrough of an AMD RX 580 GPU for Vulkan/ROCm workloads.
- **Network Security**: Zero-trust architecture. No open ports on the physical router; all remote management is handled over a private, encrypted WireGuard-based mesh.
- **Observability**: Real-time hardware telemetry and synthetic uptime tracking for all internal nodes.

### Deployment & Usage

While the entire cluster is managed via the Proxmox VE web interface and automated via custom shell scripts, individual services or infrastructure components can be replicated or provisioned via CLI.
