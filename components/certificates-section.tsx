"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Award, Calendar, CheckCircle } from "lucide-react"

export default function CertificatesSection() {
  const certificates = [
    {
      title: "CCNA - Cisco Certified Network Associate",
      issuer: "Cisco Systems",
      date: "2023",
      credentialId: "CCNA-2023-PJ-001",
      description:
        "Comprehensive networking certification covering routing, switching, network security, and troubleshooting. Demonstrates expertise in network fundamentals and Cisco technologies.",
      skills: ["Network Configuration", "Routing & Switching", "Network Security", "Troubleshooting", "Cisco IOS"],
      verificationUrl: "https://cisco.com/verify/ccna-parasjain",
      image: "/cisco-ccna-badge.png",
      color: "from-blue-600 to-blue-800",
      status: "Verified",
    },
    {
      title: "DevOps Foundation Certification",
      issuer: "DevOps Institute",
      date: "2023",
      credentialId: "DOI-2023-DEV-789",
      description:
        "Foundational certification in DevOps practices, covering CI/CD pipelines, automation, containerization, and cloud deployment strategies for modern software development.",
      skills: ["CI/CD Pipelines", "Docker", "Kubernetes", "Automation", "Cloud Deployment", "Monitoring"],
      verificationUrl: "https://devopsinstitute.com/verify/parasjain-devops",
      image: "/devops-certification-badge.png",
      color: "from-green-600 to-emerald-700",
      status: "Verified",
    },
    {
      title: "CKAD - Certified Kubernetes Application Developer",
      issuer: "Cloud Native Computing Foundation",
      date: "2024",
      credentialId: "CKAD-2024-456-PJ",
      description:
        "Advanced Kubernetes certification focusing on application development, deployment, and management in Kubernetes environments. Validates hands-on experience with container orchestration.",
      skills: ["Kubernetes", "Container Orchestration", "Pod Management", "Services & Networking", "Helm", "YAML"],
      verificationUrl: "https://cncf.io/verify/ckad-parasjain",
      image: "/kubernetes-ckad-badge.png",
      color: "from-purple-600 to-indigo-700",
      status: "Verified",
    },
  ]

  return (
    <section id="certificates" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            Professional{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Certificates</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Industry-recognized certifications validating expertise in networking, DevOps, and cloud technologies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <Card
              key={index}
              className="glass dark:glass-dark border-0 hover:bg-accent/5 transition-all duration-300 hover:scale-105 group overflow-hidden"
            >
              <CardContent className="p-0">
                {/* Certificate Header with Badge */}
                <div className={`relative p-6 bg-gradient-to-r ${cert.color} text-white`}>
                  <div className="flex items-start justify-between mb-4">
                    <Award className="h-8 w-8 text-white/90" />
                    <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {cert.status}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2 leading-tight">{cert.title}</h3>
                  <p className="text-white/90 font-medium">{cert.issuer}</p>
                </div>

                {/* Certificate Content */}
                <div className="p-6 space-y-6">
                  {/* Date and Credential */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Issued: {cert.date}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Credential ID:</span> {cert.credentialId}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed text-sm">{cert.description}</p>

                  {/* Skills */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground text-sm">Key Skills Validated:</h4>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="bg-primary/10 text-primary hover:bg-primary/20 text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Verification Button */}
                  <Button
                    asChild
                    className={`w-full bg-gradient-to-r ${cert.color} hover:opacity-90 text-white border-0 group-hover:scale-105 transition-all duration-300`}
                  >
                    <a href={cert.verificationUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Verify Certificate
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certification Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "3", label: "Active Certifications", icon: <Award className="h-6 w-6" /> },
            { number: "100%", label: "Verification Rate", icon: <CheckCircle className="h-6 w-6" /> },
            { number: "2024", label: "Latest Certification", icon: <Calendar className="h-6 w-6" /> },
            { number: "3+", label: "Technology Domains", icon: <ExternalLink className="h-6 w-6" /> },
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
