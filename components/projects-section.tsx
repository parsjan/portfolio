"use client"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Server } from "lucide-react"
import { projects } from "@/lib/resume-data"

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            Featured{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Project</span>
          </h2>
        </div>

        <div className="space-y-12">
          {projects.map((project) => (
            <Card key={project.title} className="glass dark:glass-dark border-0">
              <CardContent className="p-6 md:p-10 space-y-8">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="inline-flex self-start p-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white">
                    <Server className="h-8 w-8" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-3xl font-bold text-foreground">{project.title}</h3>
                      <Badge variant="outline" className="text-accent border-accent">
                        {project.status}
                      </Badge>
                      <Badge variant="secondary">{project.type}</Badge>
                    </div>
                    <p className="text-lg text-accent font-semibold">{project.subtitle}</p>
                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.stats.map((stat) => (
                    <div key={stat.label} className="text-center glass dark:glass-dark rounded-lg p-4">
                      <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Highlights</h4>
                  <ul className="space-y-3">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
