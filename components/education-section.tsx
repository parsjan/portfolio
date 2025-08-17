"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Users } from "lucide-react"

export default function EducationSection() {
  const education = {
    institution: "Madhav Institute of Technology",
    location: "Gwalior, Madhya Pradesh, India",
    degree: "Bachelor of Technology (B.Tech)",
    major: "Computer Engineering",
    duration: "2021 - 2025",
    gpa: "8.01",
    maxGpa: "10.0",
    status: "Final Year",
    achievements: [
      "Consistent academic performance with 8.01 CGPA",
      "Active participation in coding competitions and hackathons",
      "Member of Computer Science Society and Technical Club",
      "Completed multiple industry-relevant projects during coursework",
      "Recognized for excellence in Data Structures and Algorithms",
      "Participated in inter-college technical symposiums",
    ],
    relevantCoursework: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Computer Networks",
      "Software Engineering",
      "Operating Systems",
      "Web Technologies",
      "Machine Learning",
      "Cloud Computing",
      "Cybersecurity",
      "Mobile App Development",
    ],
    projects: [
      {
        title: "Final Year Project: AI-Powered Healthcare System",
        description: "Developing an intelligent healthcare management system with predictive analytics",
        technologies: ["Python", "TensorFlow", "React", "Node.js"],
      },
      {
        title: "Database Project: E-Commerce Platform",
        description: "Designed and implemented a scalable e-commerce database with advanced querying",
        technologies: ["MySQL", "PHP", "JavaScript"],
      },
    ],
  }

  return (
    <section id="education" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            Academic{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Background</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Strong foundation in computer engineering with focus on practical application and innovation
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Education Card */}
          <div className="lg:col-span-2">
            <Card className="glass dark:glass-dark border-0 hover:bg-accent/5 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="space-y-8">
                  {/* Header */}
                  <div className="flex items-start gap-6">
                    <div className="p-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white group-hover:scale-110 transition-transform duration-300">
                      <GraduationCap className="h-8 w-8" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-3">
                        <h3 className="text-2xl font-bold text-foreground">{education.institution}</h3>
                        <Badge className="bg-accent text-accent-foreground">{education.status}</Badge>
                      </div>
                      <div className="space-y-2">
                        <p className="text-lg font-semibold text-primary">
                          {education.degree} in {education.major}
                        </p>
                        <div className="flex flex-wrap gap-4 text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{education.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{education.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* GPA */}
                  <div className="flex items-center justify-center p-6 glass dark:glass-dark rounded-xl">
                    <div className="text-center">
                      <div className="text-4xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {education.gpa}
                      </div>
                      <div className="text-muted-foreground">CGPA (out of {education.maxGpa})</div>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <Award className="h-5 w-5 text-accent" />
                      Academic Achievements
                    </h4>
                    <ul className="space-y-3">
                      {education.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-3 text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                          <span className="leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Relevant Coursework */}
            <Card className="glass dark:glass-dark border-0 hover:bg-accent/5 transition-all duration-300">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-accent" />
                  Relevant Coursework
                </h4>
                <div className="flex flex-wrap gap-2">
                  {education.relevantCoursework.map((course, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="bg-primary/10 text-primary hover:bg-primary/20 text-xs"
                    >
                      {course}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Academic Projects */}
            <Card className="glass dark:glass-dark border-0 hover:bg-accent/5 transition-all duration-300">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-accent" />
                  Academic Projects
                </h4>
                <div className="space-y-4">
                  {education.projects.map((project, i) => (
                    <div key={i} className="space-y-2">
                      <h5 className="font-medium text-foreground text-sm">{project.title}</h5>
                      <p className="text-muted-foreground text-xs leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, j) => (
                          <Badge key={j} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Education Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "4", label: "Years of Study", icon: <Calendar className="h-6 w-6" /> },
            { number: "8.01", label: "CGPA", icon: <Award className="h-6 w-6" /> },
            { number: "10+", label: "Core Subjects", icon: <BookOpen className="h-6 w-6" /> },
            { number: "2025", label: "Expected Graduation", icon: <GraduationCap className="h-6 w-6" /> },
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
              <div className="text-muted-foreground font-medium mt-2 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
