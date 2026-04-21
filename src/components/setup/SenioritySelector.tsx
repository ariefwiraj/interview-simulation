import { motion } from "motion/react"
import { GraduationCap, Briefcase, Award } from "lucide-react"
import { cn } from "@/lib/utils"

export function SenioritySelector({ selected, onSelect }: { selected?: string, onSelect: (val: string) => void }) {
  const options = [
    {
      id: "fresh",
      title: "Fresh Graduate",
      description: "< 1 Tahun Pengalaman",
      icon: GraduationCap,
    },
    {
      id: "mid",
      title: "Junior / Mid",
      description: "1 - 3 Tahun Pengalaman",
      icon: Briefcase,
    },
    {
      id: "senior",
      title: "Senior",
      description: "> 3 Tahun Pengalaman",
      icon: Award,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-4xl mx-auto">
      {options.map((option, idx) => {
        const Icon = option.icon
        const isSelected = selected === option.id

        return (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(option.id)}
            className={cn(
              "relative flex flex-col items-center p-6 rounded-2xl text-left transition-all border-2 w-full",
              isSelected
                ? "bg-primary/5 text-primary border-primary glow-primary"
                : "bg-surface text-text border-border hover:border-primary/30"
            )}
          >
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors",
              isSelected ? "bg-primary text-bg" : "bg-surface-elevated text-text-muted"
            )}>
              <Icon size={24} />
            </div>
            <h3 className="font-bold text-lg text-center">{option.title}</h3>
            <p className={cn(
              "text-sm text-center mt-2",
              isSelected ? "text-primary/80" : "text-text-muted"
            )}>
              {option.description}
            </p>
          </motion.button>
        )
      })}
    </div>
  )
}
