---
title: "Local LLM Inference & Agent Orchestration Stack"
description: "A hybrid self-hosted AI orchestration stack that separates management planes from GPU-accelerated execution environments. Features dynamic VRAM model swapping, intelligent LiteLLM API routing with cloud fallbacks, and a custom Node.js MCP server providing private, web-grounded RAG."
status: "BLUEPRINT" # Options: PRODUCTION, ONLINE, BLUEPRINT, STABLE
category: "AI Infrastructure & Agentic Systems" # e.g., "Docker Routing", "Go Router & Queue", "Web Application"
tags: ["Proxmox VE", "LiteLLM", "llama.cpp", "Redis", "Node.js", "SearXNG", "Open WebUI"]
icon: "fa-brain" # FontAwesome icon name (e.g., fa-cube, fa-server, fa-globe, fa-shield-halved)
architecture: ["Open WebUI & Telegram Ingress", "LiteLLM Routing Gateway", "llama-swap VRAM Orchestrator", "GPU-Passthrough VM (Local Inference)"] # Optional: flows for the system path schematic

# Links (Both are optional, omit if not applicable)
githubUrl: "https://github.com/Arukast/ai-stack"
liveUrl: ""

# Ordering & Homepage Pinning (Optional)
order: 5 # Integer: lower numbers are displayed first (e.g., 1 before 2)
featured: true # Boolean: set to true to feature this project on the homepage

# Media Showcase, Recommended Limit between 6 to 12 images per project (Optional, omit if not applicable)
image: 
gallery:
---

### Project Overview

This project showcases a production-grade, hybrid AI orchestration stack deployed entirely on a self-hosted Proxmox homelab. The primary objective was to overcome the strict hardware constraints of consumer-grade GPUs by cleanly decoupling the management plane from the heavy computational execution layers. 

By designing an on-demand VRAM orchestration mechanism and pairing it with local-to-cloud fallback gateways, this stack delivers enterprise-level agentic performance, absolute data privacy, and web-grounded Retrieval-Augmented Generation (RAG) without breaking the bank on infrastructure costs.

### System Architecture & Flow

The framework divides responsibilities between highly isolated, low-overhead container environments and a dedicated hardware-accelerated execution node.

1. **Management & Frontend Layer (LXC)**: Requests enter the stack via Open WebUI or a custom Telegram client interface. The core management ecosystem—encompassing Redis for session caching, LiteLLM for routing, and SearXNG for privacy-focused metasearch—is containerized within lightweight Proxmox LXCs to minimize idle memory overhead.
2. **Intelligent API Routing (LiteLLM)**: LiteLLM functions as a centralized gateway for all incoming prompt traffic. It evaluates local model availability and dynamically routes requests, executing seamless fallback chains to high-capacity remote APIs (such as Gemini or OpenRouter) if local compute queues are saturated.
3. **Dynamic VRAM & Inference Engine (Hardware-Passthrough VM)**: Heavy compute workloads are delegated to a dedicated VM with direct PCIe passthrough of an AMD RX 580 GPU utilizing a Vulkan backend. To maximize the GPU's 8GB VRAM limit, `llama-swap` dynamically loads local GGUF models (like Qwen3.5) on-demand with a 5-minute Time-To-Live (TTL), while lightweight `BGE-M3` embedding models remain permanently anchored in CPU RAM for instant vector retrieval.
4. **Agentic RAG Pipeline (Custom MCP Server)**: Autonomous execution is handled by a Nous Hermes agent. A custom Model Context Protocol (MCP) server written in Node.js bridges the agent with the internal SearXNG instance, enabling the model to safely query the web, synthesize live data, and return private answers directly to the user.

### Key Technical Specifications

- **VRAM Optimization**: Automated model hot-swapping utilizing `llama-swap` with a 5-minute TTL, allowing multiple large GGUF models to share a single 8GB physical GPU frame buffer.
- **Failover Resilience**: Zero-downtime routing policy driven by LiteLLM fallback matrices, guaranteeing high availability even during heavy local processing spikes.
- **Retrieval Latency**: Near-zero execution overhead for vector embeddings by pinning `BGE-M3` directly to system CPU memory, leaving the GPU entirely open for text generation tokens.
- **Data Privacy**: Complete network-level isolation of local inference endpoints, ensuring confidential agentic tasks and local documents never traverse the public cloud.

### Deployment & Usage

The management plane and the inference nodes are initialized separately to maintain the architectural boundary between control and execution.