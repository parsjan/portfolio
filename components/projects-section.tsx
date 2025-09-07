"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"

export default function ProjectsSection() {
  const projects = [
    {
      title: "Yatra Yojna",
      subtitle: "AI-Powered Trip Planning Platform",
      description:
        "A comprehensive trip planning system that leverages Google Maps API and AI to create personalized travel itineraries. Features real-time location tracking, budget optimization, and social sharing capabilities.",
      image: "/travel-app-maps.png",
      technologies: [
        "React",
        "Node.js",
        "Google Maps API",
        "MongoDB",
        "Express",
        "JWT",
        "AI/ML",
      ],
      features: [
        "115+ REST API endpoints for comprehensive functionality",
        "Real-time Google Maps integration with route optimization",
        "AI-powered itinerary suggestions based on preferences",
        "Multi-user collaboration and trip sharing",
        "Budget tracking and expense management",
        "Weather integration and travel alerts",
      ],
      stats: {
        endpoints: "115+",
        Testing_users: "1K+",
      },
      links: {
        github: "https://github.com/parsjan/Trip-planner-test",
        demo: "https://drive.google.com/file/d/1Yy0NZEQ39fIPBF1VpP9muOUp2UyTExRi/view",
      },
      status: "Testing",
    },
    {
      title: "Healthcare Management System",
      subtitle: "Patient & Billing Management Platform",
      description:
        "Enterprise-grade healthcare management system built for Medecro Technologies. Handles patient records, appointment scheduling, billing, and medical history with advanced security features.",
      image: "/healthcare-dashboard.png",
      technologies: [
        "React",
        "MobX",
        "FastAPI",
        "PostgreSQL",
        "Docker",
        "Kubernetes",
        "AWS",
      ],
      features: [
        "Secure patient data management with HIPAA compliance",
        "Real-time appointment scheduling and notifications",
        "Automated billing and insurance claim processing",
        "Medical history tracking and analytics",
        "Multi-role access control for healthcare staff",
        "Integration with medical devices and lab systems",
      ],
      stats: {
        patients: "10K+",
        uptime: "99.99%",
        security: "HIPAA",
      },
      links: {
        blog:"", //redirection link to blog for making medecro clinic management system 
        demo: "https://medecro.com",
      },
      status: "Enterprise",
    },
    {
      title: "AI Prediction API Suite",
      subtitle: "Machine Learning Microservices",
      description:
        "Scalable microservices architecture for AI/ML predictions with 30+ optimized REST APIs. Features real-time model inference, batch processing, and comprehensive monitoring.",
      image: "/ai-dashboard.png",
      technologies: [
        "Python",
        "FastAPI",
        "TensorFlow",
        "Redis",
        "Docker",
        "Kubernetes",
        "Prometheus",
      ],
      features: [
        "30+ REST APIs for various ML model predictions",
        "Real-time inference with sub-100ms response times",
        "Batch processing for large-scale data analysis",
        "Model versioning and A/B testing capabilities",
        "Comprehensive monitoring and alerting",
        "Auto-scaling based on demand",
      ],
      stats: {
        apis: "30+",
        latency: "<100ms",
        accuracy: "95%+",
      },
      links: {
        blog: "", // enginnering blog for ai radiography analyzer link
      },
      status: "Production",
    },
  ];

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            Featured{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Innovative solutions that showcase technical expertise and real-world impact
          </p>
        </div>

        <div className="space-y-20">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
            >
              {/* Project Image */}
              <div className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                <div className="relative group">
                  <div className="glass dark:glass-dark rounded-2xl p-4 hover:bg-accent/5 transition-all duration-300">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-80 object-cover rounded-xl"
                    />
                    <div className="absolute inset-4 bg-gradient-to-t from-black/50 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-6 text-white">
                        <Badge className="mb-2 bg-accent text-accent-foreground">{project.status}</Badge>
                        <h4 className="text-lg font-semibold">{project.subtitle}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-3xl font-bold text-foreground">{project.title}</h3>
                    <Badge variant="outline" className="text-accent border-accent">
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-lg text-accent font-semibold">{project.subtitle}</p>
                  <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(project.stats).map(([key, value]) => (
                    <div key={key} className="text-center glass dark:glass-dark rounded-lg p-4">
                      <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {value}
                      </div>
                      <div className="text-sm text-muted-foreground capitalize">{key}</div>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Key Features:</h4>
                  <ul className="space-y-2">
                    {project.features.slice(0, 4).map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <Badge key={i} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground group">
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                      View Code
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="border-accent text-accent hover:bg-accent hover:text-accent-foreground group bg-transparent"
                  >
                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                      Live Demo
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
