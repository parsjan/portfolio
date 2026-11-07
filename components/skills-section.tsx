"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Boxes, GitBranch, Cloud, Shield, Activity, Terminal, Database, Brain } from "lucide-react"
import { skillCategories } from "@/lib/resume-data"

const styles = [
  { icon: <Boxes className="h-6 w-6" />, color: "from-blue-500 to-cyan-500" },
  { icon: <GitBranch className="h-6 w-6" />, color: "from-green-500 to-emerald-500" },
  { icon: <Cloud className="h-6 w-6" />, color: "from-orange-500 to-amber-500" },
  { icon: <Shield className="h-6 w-6" />, color: "from-red-500 to-rose-500" },
  { icon: <Activity className="h-6 w-6" />, color: "from-purple-500 to-pink-500" },
  { icon: <Terminal className="h-6 w-6" />, color: "from-teal-500 to-cyan-500" },
  { icon: <Database className="h-6 w-6" />, color: "from-indigo-500 to-blue-500" },
  { icon: <Brain className="h-6 w-6" />, color: "from-fuchsia-500 to-purple-500" },
]

export default function SkillsSection() {
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
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => {
            const style = styles[index % styles.length]
            return (
              <Card
                key={category.title}
                className="glass dark:glass-dark border-0 hover:bg-accent/5 transition-all duration-300 group"
              >
                <CardContent className="p-6 space-y-5">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-3 rounded-lg bg-gradient-to-r ${style.color} text-white group-hover:scale-110 transition-transform duration-300`}
                    >
                      {style.icon}
                    </div>
                    <h3 className="text-lg font-bold text-foreground leading-tight">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-primary/10 text-primary hover:bg-primary/20 text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
