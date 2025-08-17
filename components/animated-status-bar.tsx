"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { ChevronUp, Home, User, Briefcase, Code, Zap, Award, GraduationCap, Mail } from "lucide-react"

export default function AnimatedStatusBar() {
  const [activeSection, setActiveSection] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const sections = [
    { id: "hero", name: "Home", color: "from-blue-500 to-cyan-500", icon: Home },
    { id: "about", name: "About", color: "from-purple-500 to-pink-500", icon: User },
    { id: "experience", name: "Experience", color: "from-green-500 to-emerald-500", icon: Briefcase },
    { id: "projects", name: "Projects", color: "from-orange-500 to-red-500", icon: Code },
    { id: "skills", name: "Skills", color: "from-indigo-500 to-purple-500", icon: Zap },
    { id: "certificates", name: "Certificates", color: "from-teal-500 to-cyan-500", icon: Award },
    { id: "education", name: "Education", color: "from-pink-500 to-rose-500", icon: GraduationCap },
    { id: "contact", name: "Contact", color: "from-yellow-500 to-orange-500", icon: Mail },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100
      setIsVisible(window.scrollY > 300)

      // Find active section
      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const currentSection = sections.find((s) => s.id === activeSection)
  const currentIndex = sections.findIndex((s) => s.id === activeSection)
  const progress = currentIndex >= 0 ? ((currentIndex + 1) / sections.length) * 100 : 0

  return (
    <>
      {/* Main Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-1 bg-background/20 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className={`h-full bg-gradient-to-r ${currentSection?.color || "from-primary to-accent"}`}
          style={{ scaleX, transformOrigin: "0%" }}
        />
      </motion.div>

      {/* Floating Status Panel */}
      <motion.div
        className="fixed top-4 right-4 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : -20,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-card/90 backdrop-blur-md rounded-2xl border border-border/50 shadow-2xl p-4 min-w-[200px]">
          {/* Current Section */}
          <div className="flex items-center gap-3 mb-3">
            {currentSection && (
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full bg-gradient-to-r ${currentSection?.color || "from-primary to-accent"} animate-pulse`}
                />
                {currentSection.icon && <currentSection.icon className="h-4 w-4 text-foreground" />}
              </div>
            )}
            <span className="text-sm font-medium text-foreground">{currentSection?.name || "Loading..."}</span>
          </div>

          {/* Progress Indicator */}
          <div className="space-y-2 mb-3">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-muted/30 rounded-full h-2">
              <motion.div
                className={`h-2 rounded-full bg-gradient-to-r ${currentSection?.color || "from-primary to-accent"}`}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Section Navigation */}
          <div className="grid grid-cols-4 gap-1 relative">
            {sections.map((section, index) => {
              const IconComponent = section.icon
              return (
                <div key={section.id} className="relative">
                  <button
                    onClick={() => scrollToSection(section.id)}
                    onMouseEnter={() => setHoveredSection(section.id)}
                    onMouseLeave={() => setHoveredSection(null)}
                    className={`w-8 h-8 rounded-full transition-all duration-200 flex items-center justify-center relative ${
                      section.id === activeSection
                        ? `bg-gradient-to-r ${section.color} scale-110 text-white shadow-lg`
                        : index <= currentIndex
                          ? "bg-primary/30 text-foreground hover:bg-primary/40 hover:scale-105"
                          : "bg-muted/30 hover:bg-muted/50 text-muted-foreground hover:scale-105"
                    }`}
                  >
                    <IconComponent className="h-3 w-3" />
                  </button>

                  {hoveredSection === section.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 z-60"
                    >
                      <div
                        className={`px-3 py-2 rounded-lg text-xs font-medium text-white shadow-xl border backdrop-blur-sm
                        bg-gradient-to-r ${section.color} 
                        shadow-[0_0_20px_rgba(59,130,246,0.5)] 
                        border-white/20`}
                      >
                        {section.name}
                        <div
                          className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 
                          border-l-4 border-r-4 border-t-4 border-transparent 
                          border-t-white/80`}
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <ChevronUp className="h-5 w-5" />
      </motion.button>
    </>
  )
}
