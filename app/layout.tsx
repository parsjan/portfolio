import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Open_Sans } from "next/font/google"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"], // Including Black weight for headings
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Paras Jain - DevOps & Platform Engineer | Kubernetes | Multi-Cloud",
  description:
    "Portfolio of Paras Jain, DevOps Engineer at Medecro Technologies. Multi-cloud Kubernetes (AWS, Azure), CI/CD with GitHub Actions, Helm and ArgoCD, Terraform, and observability with Prometheus and Grafana.",
  keywords:
    "Paras Jain, DevOps Engineer, Platform Engineer, Kubernetes, AWS, Azure, Terraform, Helm, ArgoCD, GitHub Actions, Prometheus, Grafana",
  authors: [{ name: "Paras Jain" }],
  creator: "Paras Jain",
  openGraph: {
    title: "Paras Jain - DevOps & Platform Engineer",
    description: "Multi-cloud Kubernetes, CI/CD automation, and production reliability",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paras Jain - DevOps & Platform Engineer",
    description: "Multi-cloud Kubernetes, CI/CD automation, and production reliability",
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${openSans.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <style>{`
html {
  font-family: ${openSans.style.fontFamily};
  --font-sans: ${openSans.variable};
  --font-heading: ${montserrat.variable};
}
        `}</style>
      </head>
      <body
        className="min-h-screen gradient-bg dark:gradient-bg-dark transition-colors duration-300"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
