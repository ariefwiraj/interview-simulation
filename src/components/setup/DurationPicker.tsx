import { motion } from "motion/react"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export function DurationPicker({ selected, onSelect }: { selected?: number, onSelect: (min: number) => void }) {
  const options = [15, 20, 30]

  return (
    <div className="flex flex-col items-center gap-6 mt-8">
      <Clock size={48} className="text-text-muted opacity-30 mb-2" />
      <div className="flex flex-wrap justify-center gap-4">
        {options.map((time) => (
          <motion.button
            key={time}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(time)}
            className={cn(
              "px-8 py-4 rounded-2xl font-bold text-xl transition-all cursor-pointer border-2",
              selected === time
                ? "bg-primary/20 text-primary border-primary glow-primary"
                : "bg-surface-elevated text-text border-transparent hover:border-primary/50"
            )}
          >
            {time} <span className="text-sm font-normal ml-1">Mins</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
