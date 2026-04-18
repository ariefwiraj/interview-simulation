"use client"
import * as React from "react"
import { motion } from "motion/react"

interface ProgressRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export function ProgressRing({ score, size = 160, strokeWidth = 12 }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (score / 100) * circumference

  const [counter, setCounter] = React.useState(0)

  React.useEffect(() => {
    let start = 0
    const end = score
    if (start === end) return

    const totalDuration = 1500
    const incrementTime = (totalDuration / end)

    const timer = setInterval(() => {
      start += 1
      setCounter(start)
      if (start === end) clearInterval(timer)
    }, incrementTime)

    return () => clearInterval(timer)
  }, [score])

  const getColor = () => {
    if (score >= 80) return "text-accent"
    if (score >= 60) return "text-warning"
    return "text-danger"
  }

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="stroke-surface-elevated fill-none"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={`fill-none ${getColor()} transition-colors duration-300`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          stroke="currentColor"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ strokeDasharray: circumference }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-4xl font-extrabold">{counter}</span>
        <span className="text-xs text-text-muted mt-1 uppercase tracking-wider font-semibold">Score</span>
      </div>
    </div>
  )
}
