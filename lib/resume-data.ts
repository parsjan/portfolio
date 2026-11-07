// Single source of truth for portfolio content.
// Everything here comes from the current resume (public/resume.pdf).
// Update this file when the resume changes instead of editing individual sections.

export const profile = {
  name: "Paras Jain",
  title: "DevOps & Platform Engineer",
  tagline: "Kubernetes | Multi-Cloud",
  currentRole: "DevOps Engineer at Medecro Technologies",
  email: "parasjain230620@gmail.com",
  phone: "+91 93405 05933",
  phoneHref: "tel:+919340505933",
  location: "Sector 137, Noida, U.P.",
  github: "https://github.com/parsjan",
  linkedin: "https://www.linkedin.com/in/parasjai879a01247/",
  resume: "/resume.pdf",
  photo: "/profile.png",
  summary:
    "DevOps engineer with ~2.5 years building and operating the infrastructure behind a live, AI-powered healthcare platform. Owns multi-cloud Kubernetes, CI/CD automation, and production incident response, with strong Linux, Bash, and Python fundamentals and a focus on security, scalability, and cost efficiency.",
}

export const stats = [
  { number: "~2.5", label: "Years Experience" },
  { number: "160+", label: "Releases Shipped" },
  { number: "~60%", label: "Less Manual Deploy Effort" },
  { number: "50+", label: "Production Issues Resolved" },
]

export const focusAreas = [
  {
    key: "k8s",
    title: "Kubernetes & Multi-Cloud",
    description:
      "Operating clusters across dev, staging, and production on AWS (EKS) and Azure (AKS), with ingress, TLS, VPN, and bastion access.",
  },
  {
    key: "cicd",
    title: "CI/CD & Infrastructure as Code",
    description:
      "GitHub Actions, Helm, ArgoCD, and Terraform pipelines with image versioning, quality gates, and vulnerability scanning.",
  },
  {
    key: "obs",
    title: "Observability & Incident Response",
    description:
      "Prometheus, Grafana, Loki, and Alertmanager for metrics, logs, and alerting; hands-on production incident resolution.",
  },
  {
    key: "ai",
    title: "AI / LLM Platform Delivery",
    description:
      "Containerizing and deploying AI, LLM, and radiology services into Kubernetes and exposing them behind REST APIs.",
  },
]

export type Experience = {
  company: string
  role: string
  period: string
  location: string
  type: string
  achievements: string[]
  technologies: string[]
}

export const experiences: Experience[] = [
  {
    company: "Medecro Technologies Pvt. Ltd.",
    role: "Software Engineer Intern (SDE Intern) → DevOps Engineer",
    period: "Jul 2024 – Present",
    location: "Noida (Onsite)",
    type: "Full-time",
    achievements: [
      "Provisioned and operate Kubernetes clusters across dev, staging, and production — production on AWS, development on Azure (AKS) — with VPCs, bastion hosts, VPN, Nginx ingress, load balancers, and automated TLS via cert-manager.",
      "Designed and maintain CI/CD with GitHub Actions and Helm — automated Docker builds, image versioning (ECR), and multi-environment rollouts with config via Secrets and ConfigMaps; reusable Helm charts cut manual deployment effort ~60% across 100+ backend and 60+ frontend releases.",
      "Stood up the observability stack (Prometheus, Grafana, Loki, Alertmanager) for cluster metrics, logs, and alerting — catching OOM, latency, and resource issues before downtime.",
      "Led production incident response: resolved OOM evictions, ephemeral-storage pressure, node resource limits, CoreDNS / DNS failures, and ingress latency — cutting MTTR.",
      "Executed a multi-cloud migration that consolidated workloads onto AWS with DNS / domain transfers (GoDaddy, Cloudflare), low-downtime cutover, and cost optimization via right-sizing and decommissioning idle infrastructure.",
      "Containerized and deployed AI / LLM and radiology services into the cluster, cutting inference payloads from 10 MB to 100 KB and exposing 30+ REST APIs behind the platform.",
      "Managed cloud networking and security (IAM, DNS, VPN, TLS) across environments; authored Postman collections (200+ endpoints) and resolved 50+ production issues.",
    ],
    technologies: [
      "Kubernetes",
      "AWS (EKS, ECR)",
      "Azure (AKS)",
      "Helm",
      "GitHub Actions",
      "Docker",
      "Prometheus",
      "Grafana",
      "Loki",
      "Nginx Ingress",
      "cert-manager",
      "Cloudflare",
    ],
  },
  {
    company: "Legabyte Innovations Pvt. Ltd.",
    role: "Backend Developer Intern",
    period: "Apr 2024 – Jul 2024",
    location: "Remote",
    type: "Internship",
    achievements: [
      "Built and deployed backend services for a legal-services platform (FastAPI, MongoDB) with JWT authentication and REST APIs.",
    ],
    technologies: ["FastAPI", "MongoDB", "JWT", "REST APIs"],
  },
]

export const projects = [
  {
    title: "Talos",
    subtitle: "Self-Hosted DevOps Control Plane",
    type: "Personal Project",
    status: "Live",
    description:
      "A self-hosted control plane replacing manual SSH workflows — one UI for servers, containers, Kubernetes, DNS/TLS, and public clouds (AWS, Azure, OCI). ~440K LOC with a 176-table PostgreSQL schema.",
    technologies: [
      "TypeScript",
      "NestJS",
      "Next.js",
      "PostgreSQL / Prisma",
      "Redis / BullMQ",
      "Docker",
      "Ansible",
      "Terraform",
    ],
    features: [
      "Queue-driven execution model (BullMQ / Redis): every infrastructure action — SSH, Ansible, Terraform — runs as a tracked, retryable job with streamed logs, removing direct execution from API endpoints.",
      "Visual infrastructure canvases that generate Terraform HCL and Docker Compose, with plan/apply diffing, drift detection, and pre-apply cost estimation.",
      "Delivery pipeline with ArgoCD (GitOps CD), SonarQube quality gates, and Trivy image / vulnerability scanning.",
      "AI DevOps engine — multi-provider LLM + pgvector RAG over infrastructure telemetry with proposal-gated remediation (model proposes, human approves, queue executes).",
    ],
    stats: [
      { label: "Lines of Code", value: "~440K" },
      { label: "DB Tables", value: "176" },
      { label: "Clouds", value: "AWS · Azure · OCI" },
    ],
  },
]

export const skillCategories = [
  {
    title: "Containers & Orchestration",
    skills: ["Kubernetes", "Docker", "Helm", "Container registries (ECR)"],
  },
  {
    title: "CI/CD & IaC",
    skills: ["GitHub Actions", "ArgoCD", "Terraform", "Ansible", "Helm", "SonarQube", "Trivy", "Bash"],
  },
  {
    title: "Cloud",
    skills: [
      "AWS EC2",
      "S3",
      "EKS",
      "ECR",
      "VPC",
      "IAM",
      "ELB",
      "EBS",
      "Amplify",
      "Beanstalk",
      "Azure AKS",
      "ACR",
      "VNet",
      "Blob Storage",
      "Key Vault",
      "Cloudflare",
    ],
  },
  {
    title: "Networking & Security",
    skills: ["IAM", "DNS / CoreDNS", "VPN", "VPC", "Bastion hosts", "Nginx ingress", "Load balancers", "cert-manager / TLS"],
  },
  {
    title: "Observability",
    skills: ["Prometheus", "Grafana", "Loki / ELK", "Alertmanager"],
  },
  {
    title: "Languages & OS",
    skills: ["Linux", "Bash", "Python", "JavaScript / TypeScript", "Node.js"],
  },
  {
    title: "Databases & APIs",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "REST APIs", "Postman"],
  },
  {
    title: "AI / LLM",
    skills: ["OpenAI / GPT integration", "Containerized model deployment"],
  },
]

export const education = {
  institution: "Madhav Institute of Technology, Gwalior",
  degree: "B.Tech, Computer Engineering",
  period: "Sep 2021 – Jul 2025",
  gpa: "8.01",
  maxGpa: "10",
}
