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
    output: ["Paras Jain - Software Development Engineer (SDE-1 @ Medecro Technologies)"],
    delay: 1000,
  },
  {
    command: "cat /etc/profile",
    output: [
      "# Professional Profile",
      "NAME: Paras Jain",
      "ROLE: Software Development Engineer (SDE-1)",
      "COMPANY: Medecro Technologies",
      "LOCATION: India",
      "EXPERIENCE: 2+ years in software development",
      "SPECIALIZATION: Backend Development, DevOps, System Architecture",
    ],
    delay: 1500,
  },
  {
    command: "experience --detailed",
    output: [
      "╭─ PROFESSIONAL EXPERIENCE ─────────────────────────────────╮",
      "│ SDE-1 | Medecro Technologies (2025 – Present)            │",
      "│ • Leading backend development for healthcare solutions    │",
      "│ • Architecting scalable microservices                    │",
      "│ • Implementing CI/CD pipelines and DevOps practices      │",
      "│                                                           │",
      "│ SDE Intern | Medecro Technologies (2024 – 2025)         │",
      "│ • Developed 115+ REST API endpoints                      │",
      "│ • Optimized database queries improving performance 40%   │",
      "│ • Collaborated with cross-functional teams               │",
      "│                                                           │",
      "│ Backend Intern | Legabyte Innovations (2024)            │",
      "│ • Built robust backend systems using Node.js & FastAPI  │",
      "│ • Implemented authentication and authorization systems   │",
      "│ • Worked with MongoDB and PostgreSQL databases          │",
      "╰───────────────────────────────────────────────────────────╯",
    ],
    delay: 2000,
  },
  {
    command: "skills --tree",
    output: [
      "📂 Technical Skills",
      "├── 💻 Programming Languages",
      "│   ├── JavaScript (ES6+, Node.js)",
      "│   ├── TypeScript (Advanced)",
      "│   └── Python (FastAPI, Django)",
      "├── 🔧 Backend Technologies",
      "│   ├── Node.js & Express.js",
      "│   ├── FastAPI & REST APIs",
      "│   ├── GraphQL & Apollo Server",
      "│   └── Microservices Architecture",
      "├── 🎨 Frontend Technologies",
      "│   ├── React.js & Next.js",
      "│   ├── Tailwind CSS & Styled Components",
      "│   └── State Management (Redux, Zustand, MobX)",
      "├── 🗄️ Databases",
      "│   ├── MongoDB (Aggregation, Indexing)",
      "│   ├── PostgreSQL (Advanced Queries)",
      "│   └── MySQL & Redis",
      "└── ☁️ DevOps & Cloud",
      "    ├── Docker & Kubernetes",
      "    ├── AWS (EC2, S3, Lambda)",
      "    ├── CI/CD (GitHub Actions, Jenkins)",
      "    └── Helm Charts & Infrastructure as Code",
    ],
    delay: 2200,
  },
  {
    command: "projects --showcase",
    output: [
      "🚀 FEATURED PROJECTS",
      "",
      "┌─ Yatra Yojna (Trip Planning Platform) ─────────────────────┐",
      "│ • 115+ backend endpoints with comprehensive API docs       │",
      "│ • Google Maps API integration for real-time navigation     │",
      "│ • Advanced route optimization algorithms                   │",
      "│ • User authentication & role-based access control         │",
      "│ • Tech Stack: Node.js, Express, MongoDB, React            │",
      "└─────────────────────────────────────────────────────────────┘",
      "",
      "┌─ Healthcare Management System ─────────────────────────────┐",
      "│ • Patient data management with HIPAA compliance           │",
      "│ • Appointment scheduling & notification system            │",
      "│ • Integration with medical devices and IoT sensors        │",
      "│ • Tech Stack: FastAPI, PostgreSQL, Docker, Kubernetes     │",
      "└─────────────────────────────────────────────────────────────┘",
      "",
      "┌─ E-commerce Microservices ─────────────────────────────────┐",
      "│ • Scalable microservices architecture                     │",
      "│ • Payment gateway integration (Stripe, Razorpay)          │",
      "│ • Real-time inventory management                          │",
      "│ • Tech Stack: Node.js, Redis, MongoDB, Docker            │",
      "└─────────────────────────────────────────────────────────────┘",
    ],
    delay: 2500,
  },
  {
    command: "certifications --list",
    output: [
      "🏆 PROFESSIONAL CERTIFICATIONS",
      "",
      "✓ Cisco Certified Network Associate (CCNA)",
      "  └── Network fundamentals, routing & switching",
      "",
      "✓ DevOps Engineering Certification",
      "  └── CI/CD, containerization, cloud deployment",
      "",
      "✓ Certified Kubernetes Application Developer (CKAD)",
      "  └── Container orchestration, pod management, services",
      "",
      "📚 Currently pursuing: AWS Solutions Architect",
    ],
    delay: 1800,
  },
  {
    command: "education --details",
    output: [
      "🎓 EDUCATIONAL BACKGROUND",
      "",
      "┌─ Madhav Institute of Technology, Gwalior ─────────────────┐",
      "│ Degree: Bachelor of Technology (B.Tech)                  │",
      "│ Branch: Computer Science & Engineering                   │",
      "│ Duration: 2021 – 2025                                    │",
      "│ CGPA: 8.01/10.0                                         │",
      "│                                                          │",
      "│ Key Coursework:                                          │",
      "│ • Data Structures & Algorithms                          │",
      "│ • Database Management Systems                           │",
      "│ • Computer Networks & Security                          │",
      "│ • Software Engineering & Design Patterns               │",
      "│ • Operating Systems & System Programming                │",
      "└──────────────────────────────────────────────────────────┘",
    ],
    delay: 1500,
  },
  {
    command: "achievements --highlight",
    output: [
      "🌟 KEY ACHIEVEMENTS & METRICS",
      "",
      "📈 Performance Improvements:",
      "  • Reduced API response time by 40% through query optimization",
      "  • Improved system uptime to 99.9% with robust error handling",
      "  • Decreased deployment time by 60% using CI/CD automation",
      "",
      "🔧 Technical Contributions:",
      "  • Built 115+ production-ready API endpoints",
      "  • Architected 3 major microservices from scratch",
      "  • Mentored 2 junior developers in backend technologies",
      "",
      "🏅 Recognition:",
      "  • Employee of the Month (Q3 2024) at Medecro Technologies",
      "  • Best Intern Project Award at Legabyte Innovations",
      "  • Dean's List for academic excellence (2022-2024)",
    ],
    delay: 2000,
  },
  {
    command: "contact --all",
    output: [
      "📞 CONTACT INFORMATION",
      "",
      "📧 Email: parasjain230620@gmail.com",
      "📱 Phone: +91 9340505933",
      "🔗 LinkedIn: linkedin.com/in/paras-jain",
      "🐙 GitHub: github.com/parasjain",
      "🌐 Portfolio: parasjain.dev",
      "",
      "💼 Available for:",
      "  • Full-time opportunities",
      "  • Freelance projects",
      "  • Technical consultations",
      "  • Open source collaborations",
      "",
      "⏰ Response time: Usually within 24 hours",
    ],
    delay: 1200,
  },
  {
    command: "help",
    output: [
      "📋 AVAILABLE COMMANDS",
      "",
      "whoami           - Display current user information",
      "cat /etc/profile - Show detailed professional profile",
      "experience       - List professional experience",
      "skills --tree    - Display technical skills in tree format",
      "projects         - Showcase featured projects",
      "certifications   - List professional certifications",
      "education        - Show educational background",
      "achievements     - Highlight key achievements",
      "contact          - Display contact information",
      "clear            - Clear terminal screen",
      "help             - Show this help message",
      "",
      "💡 Tip: All commands executed automatically on terminal open!",
      "🔄 Terminal stays open for your exploration",
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
