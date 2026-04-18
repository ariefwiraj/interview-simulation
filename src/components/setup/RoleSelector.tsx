"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { Code, MonitorSmartphone, Database, Server, PenTool, LayoutDashboard, ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const roles = [
  { id: "frontend", label: "Frontend", icon: <MonitorSmartphone size={20} /> },
  { id: "backend", label: "Backend", icon: <Server size={20} /> },
  { id: "fullstack", label: "Fullstack", icon: <Code size={20} /> },
  { id: "data", label: "Data Science", icon: <Database size={20} /> },
  { id: "ui-ux", label: "UI/UX Design", icon: <PenTool size={20} /> },
  { id: "pm", label: "Product Mng", icon: <LayoutDashboard size={20} /> },
]

export function RoleSelector({ selected, onSelect }: { selected?: string, onSelect: (id: string) => void }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const selectedRole = roles.find(r => r.id === selected)

  return (
    <div className="relative max-w-sm mx-auto w-full z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between px-5 py-4 rounded-xl border transition-all cursor-pointer",
          isOpen ? "border-primary bg-primary/5 glow-primary" : "border-border bg-surface hover:border-primary/50"
        )}
      >
        <div className="flex items-center gap-3">
          {selectedRole ? (
            <>
              <div className="text-primary">{selectedRole.icon}</div>
              <span className="font-semibold text-text">{selectedRole.label}</span>
            </>
          ) : (
            <span className="text-text-muted font-medium">Pilih Role...</span>
          )}
        </div>
        <ChevronDown className={cn("w-5 h-5 text-text-muted transition-transform duration-300", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 left-0 right-0 bg-surface border border-border rounded-xl shadow-xl overflow-hidden py-2 max-h-64 overflow-y-auto z-50"
          >
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => {
                  onSelect(role.id)
                  setIsOpen(false)
                }}
                className={cn(
                  "w-full flex items-center justify-between px-5 py-3 hover:bg-surface-elevated transition-colors cursor-pointer",
                  selected === role.id && "bg-primary/10"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(selected === role.id ? "text-primary" : "text-text-muted")}>
                    {role.icon}
                  </div>
                  <span className={cn("font-medium", selected === role.id ? "text-primary" : "text-text")}>
                    {role.label}
                  </span>
                </div>
                {selected === role.id && <Check className="w-5 h-5 text-primary" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
