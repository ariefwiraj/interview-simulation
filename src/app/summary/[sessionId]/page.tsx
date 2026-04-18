"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { RotateCcw, Home, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { ProgressRing } from "@/components/ui/ProgressRing"
import { STARAnalysis } from "@/components/summary/STARAnalysis"

export default function SummaryPage() {
  const [setupData, setSetupData] = React.useState<any>(null)

  React.useEffect(() => {
    const data = localStorage.getItem("interview_setup")
    if (data) {
      setSetupData(JSON.parse(data))
    }
  }, [])

  if (!setupData) return <div className="min-h-screen flex items-center justify-center text-text-muted">Loading summary...</div>

  return (
    <main className="min-h-screen flex flex-col bg-bg py-12">
      <div className="flex-1 max-w-5xl w-full mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-6">
            <Sparkles size={16} />
            <span>Interview Selesai</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Laporan Evaluasi</h1>
          <div className="flex items-center justify-center gap-3">
            <span className="font-semibold capitalize text-text-muted">{setupData.role?.replace("-", " ")}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-border" />
            <Badge variant="outline">{setupData.type} Mode</Badge>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-8">
          {/* Left Column: Score & Overall */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <Card className="flex flex-col items-center text-center p-8 glow-primary border-primary/20 bg-primary/5">
              <h3 className="font-semibold text-text-muted mb-6">Overall Score</h3>
              <ProgressRing score={75} />
              <p className="mt-8 text-sm text-text-muted leading-relaxed">Jawaban kamu secara keseluruhan sudah cukup baik dan runut, namun perlu ada sedikit penekanan di bagian pembuktian (result).</p>
            </Card>

            <div className="flex flex-col gap-3">
              <Link href="/setup" className="w-full">
                <Button className="w-full h-14" size="lg">
                  <RotateCcw className="mr-2 w-5 h-5" /> Try Again
                </Button>
              </Link>
              <Link href="/" className="w-full">
                <Button variant="secondary" className="w-full h-14" size="lg">
                  <Home className="mr-2 w-5 h-5" /> Back to Home
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Feedback */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-10"
          >
            {setupData.type === 'hr' ? (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    STAR Analysis
                  </h2>
                </div>
                <STARAnalysis />
              </section>
            ) : (
              <section>
                <h2 className="text-2xl font-bold mb-6">Technical Feedback</h2>
                <div className="bg-surface-elevated border border-border p-6 rounded-2xl">
                  <p className="text-text-muted leading-relaxed">
                    Pemahaman konseptual kamu terkait framework ini sangat kuat. Namun saat ditanya masalah integrasi nyata dan debugging state kompleks, jawaban kamu sedikit terlalu abstrak. Latih untuk memberikan satu contoh nyata perbandingan sebelum/sesudah saat menjelaskan optimization.
                  </p>
                </div>
              </section>
            )}

            <section>
              <h2 className="text-2xl font-bold mb-6">Improvement Suggestions</h2>
              <div className="flex flex-col gap-4">
                {[
                  "Fokuskan pada kata ganti 'Saya' bukan 'Kami' saat bercerita. Recruiter ingin tahu kontribusi spesifik Anda.",
                  "Jangan ragu untuk mengambil jeda 3-5 detik saat ditanya pertanyaan sulit sebelum mulai menjawab.",
                  "Biasakan menutup setiap jawaban dengan hasil konkrit atau metrik (contoh: hemat cost 20%, mengurangi loading time 2 detik)."
                ].map((suggestion, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.15 }}
                    className="flex gap-5 p-5 rounded-xl bg-surface border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="w-8 h-8 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                      {i + 1}
                    </div>
                    <p className="text-text-muted pt-1 leading-relaxed">{suggestion}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
