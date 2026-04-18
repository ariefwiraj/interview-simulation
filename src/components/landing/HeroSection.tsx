"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute inset-0 grid-bg -z-20 opacity-30" />

      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-elevated border border-border text-sm text-primary mb-8"
        >
          <Sparkles size={16} />
          <span>Smarter way to land your dream job</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
        >
          Master the Interview.<br />
          <span className="text-gradient">Secure the Offer.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-text-muted mb-10 max-w-2xl mx-auto"
        >
          Simulasikan technical dan HR interview dengan AI terkemuka. Dapatkan feedback instan berbasis STAR method untuk mengasah jawabanmu.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/setup">
            <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg group">
              Start Practice Session
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
