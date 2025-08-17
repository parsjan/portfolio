"use client"

import { motion, useScroll, useSpring, useTransform } from "framer-motion"

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [
      "rgb(59, 130, 246)", // blue
      "rgb(16, 185, 129)", // emerald
      "rgb(245, 101, 101)", // red
      "rgb(168, 85, 247)", // purple
      "rgb(249, 115, 22)", // orange
      "rgb(236, 72, 153)", // pink
    ],
  )

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-50 origin-left shadow-lg"
      style={{
        scaleX,
        backgroundColor,
        boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
      }}
    />
  )
}
