import { Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"

export function MessageBubble({ message, isAI }: { message: string, isAI: boolean }) {
  // Simple regex to strip basic markdown formatting (bold, italic)
  const plainText = message.replace(/\*\*?|__?/g, "")

  return (
    <div className={cn("flex gap-4 max-w-[85%]", isAI ? "self-start" : "self-end flex-row-reverse")}>
      <div className={cn(
        "w-10 h-10 rounded-full flex shrink-0 items-center justify-center border shadow-sm",
        isAI ? "bg-surface-elevated text-primary border-primary/20" : "bg-primary text-white border-primary-dark glow-primary"
      )}>
        {isAI ? <Bot size={20} /> : <User size={20} />}
      </div>
      <div className={cn(
        "px-5 py-3.5 rounded-2xl border text-[15px] leading-relaxed shadow-sm",
        isAI 
          ? "bg-surface-elevated border-border rounded-tl-sm text-text" 
          : "bg-surface text-text border-primary/30 rounded-tr-sm"
      )}>
        {plainText}
      </div>
    </div>
  )
}
