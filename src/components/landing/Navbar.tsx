"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useScroll, useMotionValueEvent } from "motion/react"
import { BrainCircuit } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function Navbar() {
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = React.useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-4 glass" : "py-6 bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
            <BrainCircuit size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight">InterviewSim<span className="text-primary">.ai</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-muted">
          <Link href="#features" className="hover:text-text transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-text transition-colors">How it Works</Link>
        </nav>
        <Link href="/setup">
          <Button variant={isScrolled ? "primary" : "secondary"} size="sm">
            Start Free Interview
          </Button>
        </Link>
      </div>
    </motion.header>
  )
}
