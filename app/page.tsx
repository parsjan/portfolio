"use client"

import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ExperienceSection from "@/components/experience-section"
import ProjectsSection from "@/components/projects-section"
import SkillsSection from "@/components/skills-section"
import CertificatesSection from "@/components/certificates-section"
import EducationSection from "@/components/education-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import AnimatedSection from "@/components/animated-section"
import FloatingElements from "@/components/floating-elements"
import ScrollProgress from "@/components/scroll-progress"
import AnimatedStatusBar from "@/components/animated-status-bar"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <div className="min-h-screen relative">
        <ScrollProgress />
        <FloatingElements />
        <AnimatedStatusBar />
        <Navigation />
        <main>
          <HeroSection />
          <AnimatedSection direction="scale" delay={0.2} duration={1.0} distance={80}>
            <AboutSection />
          </AnimatedSection>
          <AnimatedSection direction="left" delay={0.1} duration={0.9} distance={100}>
            <ExperienceSection />
          </AnimatedSection>
          <AnimatedSection direction="right" delay={0.1} stagger duration={1.1} distance={120}>
            <ProjectsSection />
          </AnimatedSection>
          <AnimatedSection direction="fade" delay={0.2} stagger duration={1.0}>
            <SkillsSection />
          </AnimatedSection>
          <AnimatedSection direction="rotate" delay={0.1} duration={0.8} distance={80}>
            <CertificatesSection />
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.1} duration={1.0} distance={100}>
            <EducationSection />
          </AnimatedSection>
          <AnimatedSection direction="scale" delay={0.2} duration={0.9}>
            <ContactSection />
          </AnimatedSection>
          <Footer />
        </main>
      </div>
    </ThemeProvider>
  )
}
