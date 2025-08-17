"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Server, Globe, Database, Cloud, Layers } from "lucide-react"

export default function SkillsSection() {
  const skillCategories = [
    {
      title: "Languages",
      icon: <Code className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-500",
      skills: [
        { name: "JavaScript", level: 95, icon: "🟨" },
        { name: "TypeScript", level: 90, icon: "🔷" },
        { name: "Python", level: 88, icon: "🐍" },
        { name: "SQL", level: 85, icon: "🗃️" },
      ],
    },
    {
      title: "Backend",
      icon: <Server className="h-6 w-6" />,
      color: "from-green-500 to-emerald-500",
      skills: [
        { name: "Node.js", level: 92, icon: "🟢" },
        { name: "Express.js", level: 90, icon: "⚡" },
        { name: "FastAPI", level: 88, icon: "🚀" },
        { name: "REST APIs", level: 95, icon: "🔗" },
      ],
    },
    {
      title: "Frontend",
      icon: <Globe className="h-6 w-6" />,
      color: "from-purple-500 to-pink-500",
      skills: [
        { name: "React", level: 93, icon: "⚛️" },
        { name: "Next.js", level: 90, icon: "▲" },
        { name: "TailwindCSS", level: 92, icon: "🎨" },
        { name: "HTML/CSS", level: 95, icon: "🌐" },
      ],
    },
    {
      title: "State Management",
      icon: <Layers className="h-6 w-6" />,
      color: "from-orange-500 to-red-500",
      skills: [
        { name: "Redux", level: 85, icon: "🔄" },
        { name: "Zustand", level: 88, icon: "🐻" },
        { name: "MobX", level: 90, icon: "📦" },
        { name: "Context API", level: 92, icon: "🎯" },
      ],
    },
    {
      title: "Databases",
      icon: <Database className="h-6 w-6" />,
      color: "from-indigo-500 to-blue-500",
      skills: [
        { name: "MongoDB", level: 90, icon: "🍃" },
        { name: "PostgreSQL", level: 88, icon: "🐘" },
        { name: "MySQL", level: 85, icon: "🐬" },
        { name: "Redis", level: 82, icon: "🔴" },
      ],
    },
    {
      title: "DevOps & Cloud",
      icon: <Cloud className="h-6 w-6" />,
      color: "from-teal-500 to-cyan-500",
      skills: [
        { name: "Docker", level: 88, icon: "🐳" },
        { name: "Kubernetes", level: 85, icon: "☸️" },
        { name: "AWS", level: 82, icon: "☁️" },
        { name: "CI/CD", level: 87, icon: "🔄" },
      ],
    },
  ]

  const additionalSkills = [
    "Git & GitHub",
    "Agile/Scrum",
    "API Design",
    "Microservices",
    "Testing (Jest, Pytest)",
    "Performance Optimization",
    "Security Best Practices",
    "Code Review",
    "Technical Documentation",
    "Problem Solving",
  ]

  return (
    <section id="skills" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            Technical{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Skills</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive expertise across the full technology stack
          </p>
        </div>

        {/* Main Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className="glass dark:glass-dark border-0 hover:bg-accent/5 transition-all duration-300 hover:scale-105 group"
            >
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Category Header */}
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-3 rounded-lg bg-gradient-to-r ${category.color} text-white group-hover:scale-110 transition-transform duration-300`}
                    >
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{category.title}</h3>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{skill.icon}</span>
                            <span className="font-medium text-foreground">{skill.name}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className={`h-2 rounded-full bg-gradient-to-r ${category.color} transition-all duration-1000 ease-out`}
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="text-center space-y-8">
          <h3 className="text-2xl font-bold text-foreground">Additional Expertise</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {additionalSkills.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Skills Summary Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: <Code className="h-8 w-8" />, number: "6+", label: "Programming Languages" },
            { icon: <Server className="h-8 w-8" />, number: "10+", label: "Backend Technologies" },
            { icon: <Globe className="h-8 w-8" />, number: "8+", label: "Frontend Frameworks" },
            { icon: <Cloud className="h-8 w-8" />, number: "15+", label: "DevOps Tools" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center glass dark:glass-dark rounded-xl p-6 hover:bg-accent/5 transition-all duration-300 group"
            >
              <div className="text-accent mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-3xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-muted-foreground font-medium mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
