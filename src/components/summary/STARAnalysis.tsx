"use client"
import { motion } from "motion/react"
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react"
import type { STARAnalysisData } from "@/lib/supabase/types"

interface STARAnalysisProps {
  data: STARAnalysisData
}

export function STARAnalysis({ data }: STARAnalysisProps) {
  const pillars = [
    { name: "Situation", ...data.situation },
    { name: "Task", ...data.task },
    { name: "Action", ...data.action },
    { name: "Result", ...data.result },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle2 size={20} className="text-accent" />
      case "warning":
        return <AlertTriangle size={20} className="text-warning" />
      case "poor":
        return <XCircle size={20} className="text-danger" />
      default:
        return <AlertTriangle size={20} className="text-warning" />
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {pillars.map((pillar, i) => (
        <motion.div
          key={pillar.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 + i * 0.1 }}
          className="bg-surface-elevated border border-border hover:border-primary/50 transition-colors p-5 rounded-2xl flex flex-col gap-3"
        >
          <div className="flex justify-between items-center pb-2 border-b border-border/50">
            <span className="font-bold">{pillar.name}</span>
            {getStatusIcon(pillar.status)}
          </div>
          <p className="text-sm text-text-muted leading-relaxed">{pillar.feedback}</p>
        </motion.div>
      ))}
    </div>
  )
}
