"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X, Terminal, BookOpen, CuboidIcon as Cube } from "lucide-react"
import { useTheme } from "next-themes"
import TerminalOverlay from "./terminal-overlay"
import StorylineOverlay from "./storyline-overlay"
import Skills3DShowroom from "./skills-3d-showroom"
import SkillsSolarSystem from "./skills-solar-system"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [isStorylineOpen, setIsStorylineOpen] = useState(false)
  const [is3DSkillsOpen, setIs3DSkillsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-card border-b border-border shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={() => scrollToSection("#hero")}
                className="text-2xl font-bold transition-transform duration-200 hover:scale-105 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              >
                Paras Jain
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-foreground hover:text-accent hover:bg-accent/10"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Toggle, Terminal, Storyline, 3D Skills & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsTerminalOpen(true)}
                className="hidden md:flex items-center space-x-2 hover:bg-accent/20 transition-colors duration-200 text-green-400 hover:text-green-300 border border-green-500/30 hover:border-green-400/50"
              >
                <Terminal className="h-4 w-4" />
                <span className="font-mono text-sm">My Terminal</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsStorylineOpen(true)}
                className="hidden md:flex items-center space-x-2 hover:bg-accent/20 transition-colors duration-200 text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 hover:border-cyan-400/50"
              >
                <BookOpen className="h-4 w-4" />
                <span className="font-mono text-sm">My Storyline</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIs3DSkillsOpen(true)}
                className="hidden md:flex items-center space-x-2 hover:bg-accent/20 transition-colors duration-200 text-purple-400 hover:text-purple-300 border border-purple-500/30 hover:border-purple-400/50"
              >
                <Cube className="h-4 w-4" />
                <span className="font-mono text-sm">My Skills in 3D</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="hover:bg-accent/20 transition-colors duration-200"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="hover:bg-accent/20 transition-colors duration-200"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-card border border-border rounded-lg mt-2 shadow-lg">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors duration-200 text-foreground hover:text-accent hover:bg-accent/10"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
      <TerminalOverlay
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
      <StorylineOverlay
        isOpen={isStorylineOpen}
        onClose={() => setIsStorylineOpen(false)}
      />
      <Skills3DShowroom
        isOpen={is3DSkillsOpen}
        onClose={() => setIs3DSkillsOpen(false)}
      />
      {/* <SkillsSolarSystem/> */}
    </>
  );
}
