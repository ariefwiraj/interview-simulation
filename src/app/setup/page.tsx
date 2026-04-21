"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"
import { StepIndicator } from "@/components/ui/StepIndicator"
import { RoleSelector } from "@/components/setup/RoleSelector"
import { SenioritySelector } from "@/components/setup/SenioritySelector"
import { TypeSelector } from "@/components/setup/TypeSelector"
import { DurationPicker } from "@/components/setup/DurationPicker"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { CheckCircle2, ArrowRight, ArrowLeft, Home } from "lucide-react"

export default function SetupPage() {
  const router = useRouter()
  const [step, setStep] = React.useState(1)
  const [role, setRole] = React.useState<string>()
  const [seniority, setSeniority] = React.useState<string>()
  const [type, setType] = React.useState<string>()
  const [duration, setDuration] = React.useState<number>()
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const handleNext = () => {
    if (step < 5) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleStart = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          seniority,
          interviewer_type: type,
          duration,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to create session")
      }

      const { session } = await res.json()
      router.push(`/interview/${session.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
      setIsLoading(false)
    }
  }

  const canProceed = () => {
    if (step === 1 && !role) return false
    if (step === 2 && !seniority) return false
    if (step === 3 && !type) return false
    if (step === 4 && !duration) return false
    return true
  }

  return (
    <main className="min-h-screen flex flex-col bg-bg">
      <div className="flex-1 max-w-3xl w-full mx-auto px-6 pt-16 pb-12 flex flex-col">
        <div className="relative mb-6">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => router.push('/')} 
            className="absolute left-0 top-0 h-10 w-10 p-0 rounded-full md:h-auto md:w-auto md:px-4 md:py-2 md:rounded-xl"
            disabled={isLoading}
          >
            <Home className="md:mr-2 w-5 h-5" />
            <span className="hidden md:inline">Back to Home</span>
          </Button>
          
          <div className="text-center pt-2 md:pt-0">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Setup Your Interview</h1>
            <p className="text-text-muted">Konfigurasi sesi sesuai kebutuhanmu.</p>
          </div>
        </div>
        
        <StepIndicator currentStep={step} totalSteps={5} />

        <div className="flex-1 relative flex flex-col min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-center mb-4">Pilih Job Role</h2>
                  <RoleSelector selected={role} onSelect={setRole} />
                </div>
              )}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-center mb-8">Pilih Pengalaman</h2>
                  <SenioritySelector selected={seniority} onSelect={setSeniority} />
                </div>
              )}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-center mb-8">Pilih Tipe Interview</h2>
                  <TypeSelector selected={type} onSelect={setType} />
                </div>
              )}
              {step === 4 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-center mb-8">Pilih Durasi Waktu</h2>
                  <DurationPicker selected={duration} onSelect={setDuration} />
                </div>
              )}
              {step === 5 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-center mb-8">Review Konfigurasi</h2>
                  <Card className="max-w-md mx-auto border-primary bg-primary/5">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-4 border-b border-border">
                        <span className="text-text-muted">Job Role</span>
                        <span className="font-semibold capitalize">{role?.replace('-', ' ')}</span>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b border-border">
                        <span className="text-text-muted">Experience</span>
                        <span className="font-semibold capitalize">{seniority === 'fresh' ? 'Fresh Graduate' : seniority === 'mid' ? '1-3 Years' : '> 3 Years'}</span>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b border-border">
                        <span className="text-text-muted">Interview Type</span>
                        <span className="font-semibold uppercase">{type}</span>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b border-border">
                        <span className="text-text-muted">Duration</span>
                        <span className="font-semibold">{duration} Minutes</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 pt-2 text-accent">
                        <CheckCircle2 size={20} />
                        <span className="text-sm font-medium">Ready to start</span>
                      </div>
                    </div>
                  </Card>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-sm text-danger"
                    >
                      {error}
                    </motion.p>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Actions */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-border">
          {step > 1 ? (
            <Button variant="ghost" onClick={handleBack} disabled={isLoading}>
              <ArrowLeft className="mr-2 w-4 h-4" /> Back
            </Button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <Button onClick={handleNext} disabled={!canProceed()}>
              Next Step <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          ) : (
            <Button size="lg" onClick={handleStart} isLoading={isLoading}>
              {isLoading ? "Preparing Room..." : "Start Interview Now"} {!isLoading && <ArrowRight className="ml-2 w-5 h-5" />}
            </Button>
          )}
        </div>
      </div>
    </main>
  )
}
