"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Settings, PlayCircle, BarChart3 } from "lucide-react"

const steps = [
  {
    icon: <Settings className="w-8 h-8 text-primary" />,
    title: "1. Setup Interview",
    description: "Pilih role pekerjaan (Frontend, Backend, dll) dan fokus interview (HR/Technical)."
  },
  {
    icon: <PlayCircle className="w-8 h-8 text-accent" />,
    title: "2. Real-time Simulation",
    description: "Lakukan interview via pesan interaktif berbasis waktu dengan AI interviewer kami."
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-warning" />,
    title: "3. Evaluasi & Feedback",
    description: "Dapatkan analisis jawabanmu berdasarkan framework STAR beserta tips perbaikannya."
  }
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-surface/50 border-t border-b border-border relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Cara Kerja Tiga Langkah</h2>
          <p className="text-text-muted max-w-2xl mx-auto">InterviewSim didesain khusus agar semirip mungkin dengan proses persiapan interview profesional.</p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-[44px] left-[15%] right-[15%] h-0.5 bg-border -z-10" />

          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="flex flex-col items-center text-center relative"
              >
                <div className="w-24 h-24 rounded-full bg-surface-elevated border-4 border-surface flex items-center justify-center mb-6 shadow-xl relative z-10 transition-transform hover:scale-110">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-text-muted">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
