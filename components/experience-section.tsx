"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Building2, Server, Code } from "lucide-react"
import { motion } from "framer-motion"
import { experiences } from "@/lib/resume-data"

const styles = [
  { color: "from-blue-500 to-cyan-500", icon: <Server className="h-6 w-6" /> },
  { color: "from-green-500 to-emerald-500", icon: <Code className="h-6 w-6" /> },
]

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            Professional{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Experience</span>
          </h2>
        </div>

        <div className="space-y-10">
          {experiences.map((exp, index) => {
            const style = styles[index % styles.length]
            return (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="card-normal border-0 shadow-2xl overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${style.color}`}></div>
                  <CardContent className="p-6 md:p-8 space-y-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                      <div className={`inline-flex self-start p-3 rounded-full bg-gradient-to-r ${style.color} text-white`}>
                        {style.icon}
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="text-2xl font-bold text-foreground">{exp.role}</h3>
                        <div className="flex items-center gap-2 text-primary font-semibold text-lg">
                          <Building2 className="h-5 w-5" />
                          <span>{exp.company}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{exp.location}</span>
                          </div>
                          <Badge variant="outline" className="border-primary/20">
                            {exp.type}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-3 text-muted-foreground">
                          <div
                            className={`w-2 h-2 rounded-full bg-gradient-to-r ${style.color} mt-2 flex-shrink-0`}
                          ></div>
                          <span className="leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
                      {exp.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors mt-3"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
