"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Building2, ChevronLeft, ChevronRight, Trophy, Code, Users } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  function timeFromAugust2025(): string {
  const currentDate = new Date();
  const august2025 = new Date("2025-08-01");

  // Difference in months
  let diffMonths =
    (currentDate.getFullYear() - august2025.getFullYear()) * 12 +
    (currentDate.getMonth() - august2025.getMonth());

  if (diffMonths < 0) {
    return "Already passed";
  }

  if (diffMonths >= 12) {
    const years = Math.floor(diffMonths / 12);
    const months = diffMonths % 12;
    return months > 0
      ? `${years} years ${months} months`
      : `${years} years`;
  } else {
    return `${diffMonths} months`;
  }
}

  const experiences = [
    {
      company: "Medecro Technologies Pvt Ltd",
      role: "Software Development Engineer (SDE-1)",
      period: "August 2025 - Present",
      location: "India",
      type: "Full-time",
      duration: timeFromAugust2025(),
      icon: <Trophy className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-500",
      achievements: [
        "Architected MobX state management system for complex healthcare applications",
        "Built and optimized 30+ REST APIs for AI prediction models with 99.9% uptime",
        "Implemented reusable UI component library reducing development time by 40%",
        "Led UAT-driven enhancements for patient management and billing systems",
        "Collaborated with cross-functional teams to deliver scalable healthcare solutions",
      ],
      technologies: [
        "React",
        "MobX",
        "Node.js",
        "REST APIs",
        "AI/ML",
        "Healthcare Systems",
      ],
      stats: { deployments: "20+", apis: "30+", uptime: "99.9%" },
    },
    {
      company: "Medecro Technologies Pvt Ltd",
      role: "Software Development Intern",
      period: "August 2024 - July 2025",
      location: "India",
      type: "Internship",
      duration: "1 year",
      icon: <Code className="h-6 w-6" />,
      color: "from-purple-500 to-pink-500",
      achievements: [
        "Deployed Kubernetes/Docker stacks with GitHub Actions CI/CD pipelines",
        "Gained hands-on experience with FastAPI and MongoDB for backend development",
        "Implemented JWT authentication and authorization systems",
        "Contributed to cloud deployment strategies using AWS services",
        "Participated in code reviews and agile development processes",
      ],
      technologies: [
        "FastAPI",
        "MongoDB",
        "Docker",
        "Kubernetes",
        "GitHub Actions",
        "JWT",
        "AWS",
      ],
      stats: { projects: "4+", services: "5", performance: "+35%" },
    },
    {
      company: "Legabyte Innovations",
      role: "Backend Development Intern",
      period: "April 2024 - July 2024",
      location: "India",
      type: "Internship",
      duration: "4 Months",
      icon: <Users className="h-6 w-6" />,
      color: "from-green-500 to-emerald-500",
      achievements: [
        "Developed robust backend APIs using modern Python frameworks",
        "Integrated third-party services and payment gateways",
        "Optimized database queries improving application performance by 35%",
        "Implemented automated testing suites for API endpoints",
        "Collaborated with frontend teams for seamless API integration",
      ],
      technologies: [
        "Python",
        "FastAPI",
        "PostgreSQL",
        "API Development",
        "Testing",
        "Integration",
      ],
      stats: { apis: "12+", integrations: "8", tests: "100+" },
    },
  ];

  const nextExperience = () => {
    setActiveIndex((prev) => (prev + 1) % experiences.length)
  }

  const prevExperience = () => {
    setActiveIndex((prev) => (prev - 1 + experiences.length) % experiences.length)
  }

  const currentExp = experiences[activeIndex]

  return (
    <section id="experience" className="py-20 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            Professional{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Interactive showcase of my career progression and achievements
          </p>
        </div>

        {/* Experience Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4 bg-card/50 backdrop-blur-sm rounded-full p-2 border">
            {experiences.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-gradient-to-r from-primary to-accent scale-125"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Main Experience Card */}
        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 100, rotateY: 15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -100, rotateY: -15 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="perspective-1000"
            >
              <Card className="card-normal border-0 shadow-2xl overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${currentExp.color}`}></div>
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Left Side - Company Info */}
                    <div className="p-8 bg-gradient-to-br from-card to-card/50">
                      <div className="space-y-6">
                        <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${currentExp.color} text-white`}>
                          {currentExp.icon}
                        </div>

                        <div className="space-y-3">
                          <h3 className="text-3xl font-bold text-foreground">{currentExp.role}</h3>
                          <div className="flex items-center gap-2 text-primary font-semibold text-lg">
                            <Building2 className="h-5 w-5" />
                            <span>{currentExp.company}</span>
                          </div>
                          <div className="flex items-center gap-4 text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>{currentExp.period}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>{currentExp.location}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="border-primary/20">
                              {currentExp.type}
                            </Badge>
                            <Badge variant="outline" className="border-accent/20">
                              {currentExp.duration}
                            </Badge>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
                          {Object.entries(currentExp.stats).map(([key, value]) => (
                            <div key={key} className="text-center">
                              <div className="text-2xl font-bold text-primary">{value}</div>
                              <div className="text-xs text-muted-foreground capitalize">{key}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Details */}
                    <div className="p-8 space-y-6">
                      {/* Achievements */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground text-lg">Key Achievements</h4>
                        <ul className="space-y-3">
                          {currentExp.achievements.map((achievement, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-start gap-3 text-muted-foreground"
                            >
                              <div
                                className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentExp.color} mt-2 flex-shrink-0`}
                              ></div>
                              <span className="leading-relaxed text-sm">{achievement}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground text-lg">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {currentExp.technologies.map((tech, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.05 }}
                            >
                              <Badge
                                variant="secondary"
                                className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                              >
                                {tech}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevExperience}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextExperience}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Experience Timeline Dots */}
        <div className="flex justify-center mt-12 gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className={`text-center cursor-pointer transition-all duration-300 ${
                index === activeIndex ? "scale-110" : "opacity-60 hover:opacity-80"
              }`}
              onClick={() => setActiveIndex(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={`w-12 h-12 rounded-full bg-gradient-to-r ${exp.color} flex items-center justify-center text-white mb-2 mx-auto`}
              >
                {exp.icon}
              </div>
              <div className="text-xs text-muted-foreground font-medium">{exp.period.split(" - ")[0]}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
