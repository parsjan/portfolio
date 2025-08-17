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
  title: "Paras Jain - Software Development Engineer | Backend & DevOps Expert",
  description:
    "Portfolio of Paras Jain, SDE-1 at Medecro Technologies. Specializing in scalable systems, AI-driven applications, and cloud-native solutions with expertise in Node.js, Python, Kubernetes, and modern web technologies.",
  keywords:
    "Paras Jain, Software Engineer, Backend Developer, DevOps, Kubernetes, Node.js, Python, AI, Cloud Computing, Full Stack Developer",
  authors: [{ name: "Paras Jain" }],
  creator: "Paras Jain",
  openGraph: {
    title: "Paras Jain - Software Development Engineer",
    description: "Building scalable systems, AI-driven apps, and cloud-native solutions",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paras Jain - Software Development Engineer",
    description: "Building scalable systems, AI-driven apps, and cloud-native solutions",
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
