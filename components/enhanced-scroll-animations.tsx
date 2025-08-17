"use client"

import type React from "react"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"

export function TextReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.3"],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [50, 0])

  return (
    <motion.div ref={ref} style={{ opacity, y }} transition={{ delay }} className={className}>
      {children}
    </motion.div>
  )
}

export function StaggeredCards({
  children,
  className = "",
  staggerDelay = 0.1,
}: {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9,
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={itemVariants}>{children}</motion.div>
      )}
    </motion.div>
  )
}

export function EnhancedScrollProgress() {
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
