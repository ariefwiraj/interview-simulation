"use client"
import { motion } from "motion/react"
import { CheckCircle2, AlertTriangle } from "lucide-react"

export function STARAnalysis() {
  const pillars = [
    { name: "Situation", status: "good", feedback: "Konteks masalah dijelaskan dengan cukup jelas, memberikan gambaran yang tepat tentang peran dan tanggung jawab Anda." },
    { name: "Task", status: "good", feedback: "Tugas dan tujuan berhasil diutarakan secara spesifik. Anda tahu persis apa yang seharusnya dicapai dalam project." },
    { name: "Action", status: "warning", feedback: "Langkah-langkah yang diambil sudah disebutkan, tapi perlu lebih difokuskan pada peran 'saya', bukan 'kami'." },
    { name: "Result", status: "warning", feedback: "Hasil akhirnya disebutkan, namun belum terukur. Sangat direkomendasikan menggunakan angka atau metrik." },
  ]

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
            {pillar.status === "good" ? (
              <CheckCircle2 size={20} className="text-accent" />
            ) : (
              <AlertTriangle size={20} className="text-warning" />
            )}
          </div>
          <p className="text-sm text-text-muted leading-relaxed">{pillar.feedback}</p>
        </motion.div>
      ))}
    </div>
  )
}
