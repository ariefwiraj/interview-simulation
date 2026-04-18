import * as React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-6 mt-4">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <React.Fragment key={i}>
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300",
              i + 1 === currentStep
                ? "bg-primary text-white glow-primary border border-primary"
                : i + 1 < currentStep
                ? "bg-primary-dark/80 text-white border border-primary-dark"
                : "bg-surface-elevated text-text-muted border border-border"
            )}
          >
            {i + 1}
          </div>
          {i < totalSteps - 1 && (
            <div className="w-12 h-1 bg-surface-elevated rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: i + 1 < currentStep ? "100%" : "0%" }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
