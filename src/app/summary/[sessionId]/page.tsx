"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "motion/react"
import { RotateCcw, Home, Sparkles, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { ProgressRing } from "@/components/ui/ProgressRing"
import { STARAnalysis } from "@/components/summary/STARAnalysis"
import type { Session, Summary } from "@/lib/supabase/types"

export default function SummaryPage() {
  const params = useParams()
  const sessionId = params.sessionId as string

  const [session, setSession] = React.useState<Session | null>(null)
  const [summary, setSummary] = React.useState<Summary | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    async function loadSummary() {
      try {
        // Fetch session details
        const sessionRes = await fetch(`/api/sessions/${sessionId}`)
        if (sessionRes.ok) {
          const { session: sessionData } = await sessionRes.json()
          setSession(sessionData)
        }

        // Try to get existing summary first
        let summaryRes = await fetch(`/api/sessions/${sessionId}/summary`)
        
        if (!summaryRes.ok) {
          // If not found, generate one
          summaryRes = await fetch(`/api/sessions/${sessionId}/summary`, {
            method: "POST",
          })
        }

        if (summaryRes.ok) {
          const { summary: summaryData } = await summaryRes.json()
          setSummary(summaryData)
        } else {
          throw new Error("Failed to load or generate summary")
        }
      } catch {
        setError("Failed to load summary. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    loadSummary()
  }, [sessionId])

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-text-muted">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <div className="text-center">
          <p className="font-semibold text-text mb-1">Menganalisis jawaban kamu...</p>
          <p className="text-sm">AI sedang membuat evaluasi mendalam.</p>
        </div>
      </div>
    )
  }

  if (error || !summary) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-text-muted">
        <AlertCircle className="w-10 h-10 text-danger" />
        <p>{error || "Summary not available"}</p>
        <Link href="/setup">
          <Button>Try Again</Button>
        </Link>
      </div>
    )
  }

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
            <span className="font-semibold capitalize text-text-muted">{session?.role?.replace("-", " ")}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-border" />
            <Badge variant="outline">{session?.interviewer_type} Mode</Badge>
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
              <ProgressRing score={summary.score ?? 0} />
              <p className="mt-8 text-sm text-text-muted leading-relaxed">{summary.overall_feedback}</p>
            </Card>

            {/* Strengths */}
            {summary.strengths && summary.strengths.length > 0 && (
              <Card className="border-accent/20 bg-accent/5">
                <h3 className="font-semibold text-accent mb-3">💪 Strengths</h3>
                <ul className="space-y-2">
                  {summary.strengths.map((s, i) => (
                    <li key={i} className="text-sm text-text-muted flex gap-2">
                      <span className="text-accent shrink-0">✓</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Weaknesses */}
            {summary.weaknesses && summary.weaknesses.length > 0 && (
              <Card className="border-warning/20 bg-warning/5">
                <h3 className="font-semibold text-warning mb-3">⚠️ Areas to Improve</h3>
                <ul className="space-y-2">
                  {summary.weaknesses.map((w, i) => (
                    <li key={i} className="text-sm text-text-muted flex gap-2">
                      <span className="text-warning shrink-0">•</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

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
            {session?.interviewer_type === 'hr' && summary.star_analysis ? (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    STAR Analysis
                  </h2>
                </div>
                <STARAnalysis data={summary.star_analysis} />
              </section>
            ) : (
              <section>
                <h2 className="text-2xl font-bold mb-6">Technical Feedback</h2>
                <div className="bg-surface-elevated border border-border p-6 rounded-2xl">
                  <p className="text-text-muted leading-relaxed">
                    {summary.overall_feedback}
                  </p>
                </div>
              </section>
            )}

            <section>
              <h2 className="text-2xl font-bold mb-6">Improvement Suggestions</h2>
              <div className="flex flex-col gap-4">
                {summary.suggestions.map((suggestion, i) => (
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
