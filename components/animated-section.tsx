"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "fade" | "scale" | "rotate"
  stagger?: boolean
  duration?: number
  distance?: number
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  stagger = false,
  duration = 0.8,
  distance = 60,
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const directionOffset = {
    up: { y: distance, x: 0, scale: 1, rotate: 0 },
    down: { y: -distance, x: 0, scale: 1, rotate: 0 },
    left: { y: 0, x: distance, scale: 1, rotate: 0 },
    right: { y: 0, x: -distance, scale: 1, rotate: 0 },
    fade: { y: 0, x: 0, scale: 1, rotate: 0 },
    scale: { y: 0, x: 0, scale: 0.8, rotate: 0 },
    rotate: { y: 0, x: 0, scale: 1, rotate: -10 },
  }

  const variants = {
    hidden: {
      opacity: 0,
      ...directionOffset[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        ...(stagger && {
          staggerChildren: 0.15,
          delayChildren: 0.3,
        }),
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedItem({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "scale"
}) {
  const directionOffset = {
    up: { y: 30, x: 0, scale: 1 },
    down: { y: -30, x: 0, scale: 1 },
    left: { y: 0, x: 30, scale: 1 },
    right: { y: 0, x: -30, scale: 1 },
    scale: { y: 0, x: 0, scale: 0.9 },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      ...directionOffset[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  )
}

export function ParallaxSection({
  children,
  className = "",
  speed = 0.5,
}: {
  children: React.ReactNode
  className?: string
  speed?: number
}) {
  const ref = useRef(null)

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y: motion.useTransform(motion.useScroll().scrollY, [0, 1000], [0, -1000 * speed]),
      }}
    >
      {children}
    </motion.div>
  )
}
