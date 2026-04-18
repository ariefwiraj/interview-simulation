"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function CTASection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Siap Menghadapi Interview Aslinya?</h2>
          <p className="text-xl text-text-muted mb-10 max-w-2xl mx-auto">Tingkatkan rasa percaya diri dan persiapkan jawaban STAR terbaikmu sekarang juga. 100% gratis untuk sesi percobaan.</p>
          <Link href="/setup">
            <Button size="lg" className="h-14 px-10 text-lg shadow-xl shadow-primary/20 group">
              Start Your Free Interview
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] -z-10" />
    </section>
  )
}
