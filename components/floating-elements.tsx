"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function FloatingElements() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const elements = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    initialX: Math.random() * window.innerWidth,
    initialY: Math.random() * window.innerHeight,
    duration: Math.random() * 20 + 20,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full bg-gradient-to-r from-primary/5 to-accent/5 blur-xl"
          style={{
            width: element.size,
            height: element.size,
          }}
          initial={{
            x: element.initialX,
            y: element.initialY,
          }}
          animate={{
            x: [element.initialX, element.initialX + 200, element.initialX - 200, element.initialX],
            y: [element.initialY, element.initialY - 300, element.initialY + 100, element.initialY],
          }}
          transition={{
            duration: element.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}
