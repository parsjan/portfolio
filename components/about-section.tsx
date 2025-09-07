"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Server, Cloud, Brain } from "lucide-react"

export default function AboutSection() {
  const expertise = [
    {
      icon: <Server className="h-6 w-6" />,
      title: "Backend Development",
      description: "Building robust APIs and scalable server architectures with Node.js, Python, and FastAPI",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Frontend Development",
      description: "Creating responsive, interactive user interfaces with React, Next.js, and modern CSS",
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "DevOps & Cloud",
      description: "Deploying and managing applications with Docker, Kubernetes, AWS, and CI/CD pipelines",
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI Integration",
      description: "Implementing AI-driven solutions and machine learning models in production systems",
    },
  ]

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            About <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Passionate software engineer with expertise in full-stack development, cloud technologies, and AI
            integration
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image and Bio */}
          <div className="space-y-8">
            <div className="relative">
              <div className="w-80 h-80 mx-auto rounded-2xl overflow-hidden glass dark:glass-dark p-4">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                  <img
                    src="/software-engineer-portrait.png"
                    alt="Paras Jain - Software Engineer"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 glass dark:glass-dark rounded-full p-4">
                <Badge variant="secondary" className="text-sm font-semibold">
                  SDE-1
                </Badge>
              </div>
            </div>

            <div className="text-center lg:text-left space-y-4">
              <h3 className="text-2xl font-bold text-foreground">Paras Jain</h3>
              <p className="text-lg text-accent font-semibold">Software Development Engineer</p>
              <p className="text-muted-foreground leading-relaxed">
                Currently working as SDE-1 at Medecro Technologies, where I architect scalable systems and develop
                AI-driven applications. With a strong foundation in both backend and frontend technologies, I specialize
                in creating end-to-end solutions that bridge the gap between complex technical requirements and
                user-friendly experiences.
              </p>
            </div>
          </div>

          {/* Expertise Cards */}
          <div className="grid gap-6">
            {expertise.map((item, index) => (
              <Card
                key={index}
                className="glass dark:glass-dark border-0 hover:bg-accent/5 transition-all duration-300 hover:scale-105 group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 text-primary group-hover:text-accent transition-colors duration-300">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-foreground mb-2">{item.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "5+", label: "Projects" },
            { number: "1.5+", label: "Years Experience" },
            { number: "400+", label: "API Endpoints" },
            { number: "100%", label: "Project Success" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
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
