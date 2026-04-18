"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Bot, Target, MessagesSquare } from "lucide-react"
import { Card } from "@/components/ui/Card"

const features = [
  {
    title: "AI Interviewer Persona",
    description: "Berlatih dengan AI yang bisa berperan sebagai HR recruiter atau Technical lead.",
    icon: <Bot className="w-6 h-6 text-primary" />,
  },
  {
    title: "STAR-Based Coaching",
    description: "Panduan menjawab pertanyaan behavioral menggunakan framework Situation, Task, Action, Result.",
    icon: <Target className="w-6 h-6 text-accent" />,
  },
  {
    title: "Real-time Feedback",
    description: "Dapatkan analisis mendalam setelah sesi selesai, lengkap dengan area improvement.",
    icon: <MessagesSquare className="w-6 h-6 text-warning" />,
  }
]

export function FeatureHighlights() {
  return (
    <section id="features" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Kenapa InterviewSim?</h2>
          <p className="text-text-muted max-w-2xl mx-auto">Kami merancang platform ini dengan tools yang nyata dipakai oleh recruiter profesional untuk mengukur kompetensi kandidat.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full bg-surface-elevated border-border hover:border-primary/50 transition-colors group cursor-default">
                <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-text-muted leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
