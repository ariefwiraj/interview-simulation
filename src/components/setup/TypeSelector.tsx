import { motion } from "motion/react"
import { Users, TerminalSquare } from "lucide-react"
import { Card } from "@/components/ui/Card"
import { cn } from "@/lib/utils"

export function TypeSelector({ selected, onSelect }: { selected?: string, onSelect: (id: string) => void }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Card
          className={cn(
            "h-full p-8 flex flex-col items-center text-center gap-4 cursor-pointer transition-all",
            selected === "hr" ? "border-accent bg-accent/10 glow-accent" : "hover:border-accent/50"
          )}
          onClick={() => onSelect("hr")}
        >
          <div className={cn("p-4 rounded-2xl", selected === "hr" ? "bg-accent text-white" : "bg-surface-elevated text-text-muted")}>
            <Users size={32} />
          </div>
          <h3 className="text-2xl font-bold">HR Interview</h3>
          <p className="text-text-muted text-sm leading-relaxed">Fokus pada pertanyaan behavioral, problem solving, dan culture fit menggunakan framework STAR.</p>
        </Card>
      </motion.div>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Card
          className={cn(
            "h-full p-8 flex flex-col items-center text-center gap-4 cursor-pointer transition-all",
            selected === "technical" ? "border-primary bg-primary/10 glow-primary" : "hover:border-primary/50"
          )}
          onClick={() => onSelect("technical")}
        >
          <div className={cn("p-4 rounded-2xl", selected === "technical" ? "bg-primary text-white" : "bg-surface-elevated text-text-muted")}>
            <TerminalSquare size={32} />
          </div>
          <h3 className="text-2xl font-bold">Technical Interview</h3>
          <p className="text-text-muted text-sm leading-relaxed">Fokus pada uji konsep technical, coding problem, dan pemahaman arsitektur spesifik role.</p>
        </Card>
      </motion.div>
    </div>
  )
}
