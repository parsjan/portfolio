"use client"

import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Calendar } from "lucide-react"
import { education } from "@/lib/resume-data"

export default function EducationSection() {
  return (
    <section id="education" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Education</span>
          </h2>
        </div>

        <Card className="glass dark:glass-dark border-0 hover:bg-accent/5 transition-all duration-300 group">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="self-start md:self-center p-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="h-8 w-8" />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-2xl font-bold text-foreground">{education.institution}</h3>
                <p className="text-lg font-semibold text-primary">{education.degree}</p>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{education.period}</span>
                </div>
              </div>
              <div className="text-center glass dark:glass-dark rounded-xl px-6 py-4">
                <div className="text-3xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {education.gpa}
                </div>
                <div className="text-sm text-muted-foreground">GPA (out of {education.maxGpa})</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
