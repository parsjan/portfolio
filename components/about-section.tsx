"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Boxes, GitBranch, Activity, Brain } from "lucide-react"
import { profile, stats, focusAreas } from "@/lib/resume-data"

const icons: Record<string, React.ReactNode> = {
  k8s: <Boxes className="h-6 w-6" />,
  cicd: <GitBranch className="h-6 w-6" />,
  obs: <Activity className="h-6 w-6" />,
  ai: <Brain className="h-6 w-6" />,
}

export default function AboutSection() {
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
            {profile.title} — {profile.tagline}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image and Bio */}
          <div className="space-y-8">
            <div className="relative">
              <div className="w-80 h-80 mx-auto rounded-2xl overflow-hidden glass dark:glass-dark p-4">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                  <img
                    src={profile.photo}
                    alt={`${profile.name} - ${profile.title}`}
                    className="w-full h-full object-cover object-top rounded-xl"
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 right-4 sm:right-12 glass dark:glass-dark rounded-full p-4">
                <Badge variant="secondary" className="text-sm font-semibold">
                  DevOps Engineer
                </Badge>
              </div>
            </div>

            <div className="text-center lg:text-left space-y-4">
              <h3 className="text-2xl font-bold text-foreground">{profile.name}</h3>
              <p className="text-lg text-accent font-semibold">{profile.currentRole}</p>
              <p className="text-muted-foreground leading-relaxed">{profile.summary}</p>
            </div>
          </div>

          {/* Focus Area Cards */}
          <div className="grid gap-6">
            {focusAreas.map((item) => (
              <Card
                key={item.key}
                className="glass dark:glass-dark border-0 hover:bg-accent/5 transition-all duration-300 hover:scale-105 group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 text-primary group-hover:text-accent transition-colors duration-300">
                      {icons[item.key]}
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
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
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
