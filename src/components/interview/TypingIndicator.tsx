import { motion } from "motion/react"

export function TypingIndicator() {
  return (
    <div className="flex gap-1.5 items-center bg-surface-elevated px-5 py-4 rounded-2xl w-fit border border-border shadow-sm">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-primary/60"
          animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  )
}
