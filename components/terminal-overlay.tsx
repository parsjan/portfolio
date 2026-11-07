"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TerminalOverlayProps {
  isOpen: boolean
  onClose: () => void
}

interface Command {
  command: string
  output: string[]
  delay?: number
}

const commands: Command[] = [
  {
    command: "whoami",
    output: ["Paras Jain - DevOps & Platform Engineer (Medecro Technologies)"],
    delay: 800,
  },
  {
    command: "cat /etc/profile",
    output: [
      "NAME: Paras Jain",
      "ROLE: DevOps Engineer",
      "COMPANY: Medecro Technologies Pvt. Ltd.",
      "LOCATION: Noida, India",
      "EXPERIENCE: ~2.5 years",
      "FOCUS: Kubernetes, Multi-Cloud (AWS / Azure), CI/CD, Observability",
    ],
    delay: 1200,
  },
  {
    command: "experience --list",
    output: [
      "DevOps Engineer (from SDE Intern) | Medecro Technologies | Jul 2024 - Present",
      "  - Kubernetes across dev/staging/prod: prod on AWS, dev on Azure AKS",
      "  - CI/CD with GitHub Actions + Helm; ~60% less manual deploy effort",
      "  - 100+ backend and 60+ frontend releases",
      "  - Observability: Prometheus, Grafana, Loki, Alertmanager",
      "  - Led production incident response (OOM, DNS, ingress latency)",
      "  - Multi-cloud migration consolidating workloads onto AWS",
      "  - AI/LLM + radiology services: inference payloads 10 MB -> 100 KB",
      "",
      "Backend Developer Intern | Legabyte Innovations | Apr 2024 - Jul 2024",
      "  - FastAPI + MongoDB services with JWT auth and REST APIs",
    ],
    delay: 2000,
  },
  {
    command: "skills --tree",
    output: [
      "skills/",
      "|-- containers: Kubernetes, Docker, Helm, ECR",
      "|-- ci-cd-iac: GitHub Actions, ArgoCD, Terraform, Ansible, SonarQube, Trivy",
      "|-- cloud: AWS (EC2, S3, EKS, VPC, IAM, ELB), Azure (AKS, ACR, Key Vault), Cloudflare",
      "|-- networking: IAM, DNS/CoreDNS, VPN, bastion hosts, Nginx ingress, cert-manager/TLS",
      "|-- observability: Prometheus, Grafana, Loki/ELK, Alertmanager",
      "|-- languages: Linux, Bash, Python, JavaScript/TypeScript, Node.js",
      "|-- data: MySQL, PostgreSQL, MongoDB, REST APIs, Postman",
      "`-- ai: OpenAI/GPT integration, containerized model deployment",
    ],
    delay: 1800,
  },
  {
    command: "projects --featured",
    output: [
      "Talos - Self-Hosted DevOps Control Plane (Live, personal project)",
      "  - One UI for servers, containers, Kubernetes, DNS/TLS and clouds (AWS, Azure, OCI)",
      "  - Queue-driven execution (BullMQ/Redis): SSH, Ansible, Terraform as tracked jobs",
      "  - Visual canvases generating Terraform HCL + Docker Compose, drift detection",
      "  - ArgoCD GitOps, SonarQube quality gates, Trivy scanning",
      "  - AI DevOps engine: LLM + pgvector RAG, proposal-gated remediation",
    ],
    delay: 1800,
  },
  {
    command: "education",
    output: ["B.Tech, Computer Engineering | Madhav Institute of Technology, Gwalior | 2021 - 2025 | GPA 8.01/10"],
    delay: 1000,
  },
  {
    command: "contact --all",
    output: [
      "Email:    parasjain230620@gmail.com",
      "Phone:    +91 93405 05933",
      "GitHub:   github.com/parsjan",
      "Location: Sector 137, Noida, U.P.",
    ],
    delay: 1000,
  },
]

export default function TerminalOverlay({ isOpen, onClose }: TerminalOverlayProps) {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0)
  const [currentOutput, setCurrentOutput] = useState<string[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const [typedCommand, setTypedCommand] = useState("")
  const [hasMounted, setHasMounted] = useState(false);
  
    //  useEffect(() => {
    //    setHasMounted(true);
    //  }, []);
  
    //  if (!hasMounted) return null;

  // Reset state when terminal opens
  useEffect(() => {
    if (isOpen) {
      const terminalOpenAudio = new Audio(
        "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
      )
      terminalOpenAudio.volume = 0.25
      terminalOpenAudio.play().catch(() => {})

      setCurrentCommandIndex(0)
      setCurrentOutput([])
      setIsTyping(false)
      setTypedCommand("")
      setShowCursor(true)
    }
  }, [isOpen])

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  // Auto-execute commands
  useEffect(() => {
    if (!isOpen || currentCommandIndex >= commands.length) return

    const currentCmd = commands[currentCommandIndex]

    const timer = setTimeout(() => {
      setIsTyping(true)

      // Type command character by character
      let charIndex = 0
      const typeCommand = () => {
        if (charIndex <= currentCmd.command.length) {
          setTypedCommand(currentCmd.command.slice(0, charIndex))
          charIndex++
          setTimeout(typeCommand, 50 + Math.random() * 50) // Variable typing speed
        } else {
          // Command fully typed, show output
          setTimeout(() => {
            setCurrentOutput((prev) => [...prev, `> ${currentCmd.command}`, ...currentCmd.output, ""])
            setTypedCommand("")
            setIsTyping(false)

            // Move to next command
            setCurrentCommandIndex((prev) => prev + 1)
          }, 500)
        }
      }
      typeCommand()
    }, currentCmd.delay || 1000)

    return () => clearTimeout(timer)
  }, [currentCommandIndex, isOpen])

  // Handle ESC key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    },
    [onClose],
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, handleKeyDown])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="absolute inset-4 md:inset-8 bg-black border border-green-500/30 rounded-lg overflow-hidden shadow-2xl shadow-green-500/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-green-500/30">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-mono text-sm">paras@portfolio:~$</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-green-400 hover:text-green-300 hover:bg-green-500/10 h-6 w-6"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Terminal Content */}
            <div className="p-4 h-full overflow-y-auto font-mono text-green-400 bg-black relative">
              {/* Scanline effect */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-pulse" />
                <div className="absolute inset-0 bg-[linear-gradient(transparent_98%,rgba(34,197,94,0.03)_100%)] bg-[length:100%_4px]" />
              </div>

              {/* Welcome message */}
              <div className="mb-4">
                <div className="text-green-300 mb-2">
                  ╔══════════════════════════════════════════════════════════════╗
                </div>
                <div className="text-green-300 mb-2">║ Welcome to Paras Jain's Interactive Terminal Portfolio ║</div>
                <div className="text-green-300 mb-2">║ Type 'help' for commands or sit back and enjoy the show! ║</div>
                <div className="text-green-300 mb-4">
                  ╚══════════════════════════════════════════════════════════════╝
                </div>
              </div>

              {/* Command output */}
              <div className="space-y-1">
                {currentOutput.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`${
                      line.startsWith(">")
                        ? "text-green-300 font-bold"
                        : line.startsWith("•") || line.includes("📧") || line.includes("🔗") || line.includes("📱")
                          ? "text-green-200 ml-2"
                          : "text-green-400 ml-2"
                    }`}
                  >
                    {line}
                  </motion.div>
                ))}
              </div>

              {/* Current typing command */}
              {isTyping && (
                <div className="flex items-center mt-2">
                  <span className="text-green-300 font-bold mr-2">&gt;</span>
                  <span className="text-green-400">{typedCommand}</span>
                  <span className={`ml-1 ${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}>█</span>
                </div>
              )}

              {/* Idle cursor when not typing and all commands completed */}
              {!isTyping && currentCommandIndex >= commands.length && (
                <div className="flex items-center mt-4">
                  <span className="text-green-300 font-bold mr-2">&gt;</span>
                  <span className="text-green-400 mr-2">Terminal ready for exploration...</span>
                  <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}>█</span>
                </div>
              )}

              {/* Glitch effect overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <motion.div
                  animate={{
                    opacity: [0, 0.1, 0],
                    x: [0, 2, -2, 0],
                  }}
                  transition={{
                    duration: 0.2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: Math.random() * 10 + 5,
                  }}
                  className="absolute inset-0 bg-green-500/5"
                />
              </div>
            </div>

            {/* Bottom hint */}
            <div className="absolute bottom-2 right-4 text-green-500/60 text-xs font-mono">Press ESC to exit</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
