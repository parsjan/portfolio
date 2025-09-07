"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Phone, ArrowUp, Heart } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Certificates", href: "#certificates" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ]

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/parsjan",
      icon: <Github className="h-5 w-5" />,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/parasjai879a01247/",
      icon: <Linkedin className="h-5 w-5" />,
    },
    {
      name: "Email",
      href: "mailto:parasjain230603@email.com",
      icon: <Mail className="h-5 w-5" />,
    },
    {
      name: "Phone",
      href: "tel:+91934050933",
      icon: <Phone className="h-5 w-5" />,
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="relative bg-muted/50 border-t border-border/50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <h3 className="text-3xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Paras Jain
                </h3>
                <p className="text-lg text-accent font-semibold">Software Development Engineer</p>
                <p className="text-muted-foreground leading-relaxed max-w-md">
                  Building scalable systems, AI-driven applications, and cloud-native solutions. Always excited to
                  collaborate on innovative projects that make a difference.
                </p>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Connect with me</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target={social.href.startsWith("http") ? "_blank" : undefined}
                      rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="p-3 rounded-full glass dark:glass-dark hover:bg-accent/20 transition-all duration-300 hover:scale-110 group"
                    >
                      <div className="text-foreground group-hover:text-accent transition-colors duration-200">
                        {social.icon}
                      </div>
                      <span className="sr-only">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="font-semibold text-foreground">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-muted-foreground hover:text-accent transition-colors duration-200 hover:translate-x-1 transform transition-transform"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="font-semibold text-foreground">Get in Touch</h4>
              <div className="space-y-3 text-muted-foreground">
                <p className="hover:text-accent transition-colors duration-200">
                  <a href="mailto:paras.jain@email.com">paras.jain@email.com</a>
                </p>
                <p className="hover:text-accent transition-colors duration-200">
                  <a href="tel:+919876543210">+91 98765 43210</a>
                </p>
                <p>Gwalior, India</p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Available for opportunities
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <span>&copy; {currentYear} Paras Jain. Made with</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span>and lots of coffee.</span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Built with Next.js & TailwindCSS</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={scrollToTop}
                className="hover:bg-accent/20 transition-all duration-300 hover:scale-110 group"
              >
                <ArrowUp className="h-5 w-5 text-foreground group-hover:text-accent transition-colors duration-200" />
                <span className="sr-only">Scroll to top</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
