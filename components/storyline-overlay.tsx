"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { X, ChevronLeft, ChevronRight, GraduationCap, Laptop, Rocket, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Milestone {
  id: string
  title: string
  subtitle: string
  period: string
  description: string[]
  icon: React.ReactNode
  color: string
  achievements?: string[]
}

const milestones: Milestone[] = [
  {
    id: "college",
    title: "College Journey",
    subtitle: "Madhav Institute of Technology, Gwalior",
    period: "2021 – 2025",
    description: [
      "B.Tech Computer Engineering | GPA 8.01",
      "Built strong foundation in computer science fundamentals",
      "Participated in coding competitions and hackathons",
      "Developed passion for backend development and DevOps",
    ],
    icon: <GraduationCap className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-500",
    achievements: ["8.01 CGPA", "Active in Tech Communities", "Strong CS Foundation"],
  },
  {
    id: "first-internship",
    title: "First Internship",
    subtitle: "Backend Developer Intern @ Legabyte Innovations",
    period: "2024",
    description: [
      "Built robust backend APIs using FastAPI + MongoDB",
      "Implemented JWT authentication and authorization",
      "Developed Content Management System features",
      "Gained hands-on experience with cloud deployments",
    ],
    icon: <Laptop className="w-8 h-8" />,
    color: "from-purple-500 to-pink-500",
    achievements: ["FastAPI Expertise", "MongoDB Integration", "JWT Implementation", "Cloud Deployment"],
  },
  {
    id: "medecro-internship",
    title: "Medecro Internship",
    subtitle: "SDE Intern @ Medecro Technologies",
    period: "2024 – 2025",
    description: [
      "Architected MobX state management solutions",
      "Built reusable UI components for healthcare platform",
      "Deployed Kubernetes/Docker stacks via GitHub Actions CI/CD",
      "Integrated AI models achieving 96% precision accuracy",
    ],
    icon: <Briefcase className="w-8 h-8" />,
    color: "from-green-500 to-emerald-500",
    achievements: ["MobX Architecture", "96% AI Precision", "K8s Deployment", "CI/CD Pipeline"],
  },
  {
    id: "full-time",
    title: "Full-time Role",
    subtitle: "SDE-1 @ Medecro Technologies",
    period: "2025 – Present",
    description: [
      "Leading full-stack + DevOps initiatives",
      "Delivered UAT-driven enhancements for patient management",
      "Implemented billing and scheduling system optimizations",
      "Managing Kubernetes Helm deployments & GitHub Actions automation",
    ],
    icon: <Rocket className="w-8 h-8" />,
    color: "from-orange-500 to-red-500",
    achievements: ["Full-Stack Leadership", "Healthcare Systems", "DevOps Automation", "Team Collaboration"],
  },
]

interface StorylineOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export default function StorylineOverlay({ isOpen, onClose }: StorylineOverlayProps) {
  const [currentMilestone, setCurrentMilestone] = useState(0)
  const [hoveredMilestone, setHoveredMilestone] = useState<number | null>(null)
  // const containerRef = useRef<HTMLDivElement>(null)
  // const { scrollXProgress } = useScroll({ container: containerRef })
  // const progressWidth = useTransform(scrollXProgress, [0, 1], ["0%", "100%"])
  //  const [hasMounted, setHasMounted] = useState(false);




  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") setCurrentMilestone((prev) => Math.max(0, prev - 1))
      if (e.key === "ArrowRight") setCurrentMilestone((prev) => Math.min(milestones.length - 1, prev + 1))
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  const nextMilestone = () => {
    setCurrentMilestone((prev) => Math.min(milestones.length - 1, prev + 1))
  }

  const prevMilestone = () => {
    setCurrentMilestone((prev) => Math.max(0, prev - 1))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm"
        >
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 p-6 flex items-center justify-between">
            <motion.h1
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent"
            >
              My Professional Storyline
            </motion.h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/10 transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Enhanced Creative Progress Bar */}
          <div className="absolute top-20 left-6 right-6 z-10">
            <div className="relative">
              {/* Animated Background Path */}
              <svg className="w-full h-16" viewBox="0 0 800 64" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Background path */}
                <path
                  d="M 50 32 Q 200 16 350 32 T 650 32 L 750 32"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="2"
                  fill="none"
                />

                {/* Animated progress path */}
                <motion.path
                  d="M 50 32 Q 200 16 350 32 T 650 32 L 750 32"
                  stroke="url(#pathGradient)"
                  strokeWidth="3"
                  fill="none"
                  filter="url(#glow)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: (currentMilestone + 1) / milestones.length }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />

                {/* Animated particles along path */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.circle
                    key={i}
                    r="2"
                    fill="#06b6d4"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      cx: [50, 200, 350, 500, 650, 750],
                      cy: [32, 16, 32, 48, 32, 32],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.6,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </svg>

              {/* Interactive Milestone Nodes */}
              <div className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-12">
                {milestones.map((milestone, index) => {
                  const isActive = index <= currentMilestone
                  const isCurrent = index === currentMilestone
                  const isHovered = hoveredMilestone === index

                  return (
                    <motion.button
                      key={milestone.id}
                      onClick={() => setCurrentMilestone(index)}
                      onMouseEnter={() => setHoveredMilestone(index)}
                      onMouseLeave={() => setHoveredMilestone(null)}
                      className="relative group"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {/* Milestone Node */}
                      <motion.div
                        className={`relative w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? `bg-gradient-to-br ${milestone.color} border-white shadow-lg`
                            : "bg-white/10 border-white/30"
                        }`}
                        animate={{
                          boxShadow: isCurrent
                            ? "0 0 20px rgba(6, 182, 212, 0.6), 0 0 40px rgba(6, 182, 212, 0.3)"
                            : isActive
                              ? "0 0 10px rgba(6, 182, 212, 0.3)"
                              : "none",
                        }}
                      >
                        <div className={`text-white transition-all duration-300 ${isCurrent ? "scale-110" : ""}`}>
                          {milestone.icon}
                        </div>

                        {/* Pulsing ring for current milestone */}
                        {isCurrent && (
                          <motion.div
                            className="absolute inset-0 rounded-full border-2 border-cyan-400"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [1, 0, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeInOut",
                            }}
                          />
                        )}
                      </motion.div>

                      {/* Milestone Label */}
                      <motion.div
                        className="absolute top-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: isHovered || isCurrent ? 1 : 0,
                          y: isHovered || isCurrent ? 0 : 10,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 text-xs text-white">
                          <div className="font-semibold">{milestone.title}</div>
                          <div className="text-white/60">{milestone.period}</div>
                        </div>
                      </motion.div>

                      {/* Connection Lines */}
                      {index < milestones.length - 1 && (
                        <motion.div
                          className="absolute top-6 left-12 w-20 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: index < currentMilestone ? 1 : 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        />
                      )}
                    </motion.button>
                  )
                })}
              </div>

              {/* Progress Percentage */}
              <motion.div
                className="absolute -bottom-8 left-0 text-sm font-mono text-cyan-400"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                Progress: {Math.round(((currentMilestone + 1) / milestones.length) * 100)}%
              </motion.div>

              {/* Journey Status */}
              <div className="absolute -bottom-8 right-0 text-sm text-white/60">
                {currentMilestone + 1} of {milestones.length} milestones
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex items-center justify-center min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-6xl w-full">
              {/* Navigation Arrows */}
              <Button
                variant="ghost"
                size="icon"
                onClick={prevMilestone}
                disabled={currentMilestone === 0}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed z-10"
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={nextMilestone}
                disabled={currentMilestone === milestones.length - 1}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed z-10"
              >
                <ChevronRight className="h-8 w-8" />
              </Button>

              {/* Milestone Cards */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMilestone}
                  initial={{ opacity: 0, x: 100, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -100, scale: 0.9 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="relative"
                >
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                    {/* Icon and Title */}
                    <div className="flex items-center space-x-6 mb-8">
                      <div
                        className={`p-4 rounded-2xl bg-gradient-to-br ${milestones[currentMilestone].color} shadow-lg`}
                      >
                        <div className="text-white">{milestones[currentMilestone].icon}</div>
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-2">{milestones[currentMilestone].title}</h2>
                        <h3 className="text-xl text-cyan-400 mb-1">{milestones[currentMilestone].subtitle}</h3>
                        <p className="text-white/60 font-mono">{milestones[currentMilestone].period}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Journey Highlights</h4>
                        <ul className="space-y-3">
                          {milestones[currentMilestone].description.map((item, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 + 0.3 }}
                              className="flex items-start space-x-3 text-white/80"
                            >
                              <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                              <span>{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Achievements */}
                      {milestones[currentMilestone].achievements && (
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-4">Key Achievements</h4>
                          <div className="grid grid-cols-2 gap-3">
                            {milestones[currentMilestone].achievements!.map((achievement, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 + 0.5 }}
                                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-center"
                              >
                                <span className="text-sm text-white/90 font-medium">{achievement}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Timeline Dots */}
                    <div className="flex justify-center space-x-4 mt-8">
                      {milestones.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentMilestone(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentMilestone
                              ? "bg-cyan-400 scale-125"
                              : index < currentMilestone
                                ? "bg-cyan-400/60"
                                : "bg-white/30"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Footer Instructions */}
          <div className="absolute bottom-6 left-6 right-6 text-center">
            <p className="text-white/60 text-sm">Use arrow keys or buttons to navigate • Press ESC to close</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
