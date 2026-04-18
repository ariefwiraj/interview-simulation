"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { LogOut, Send, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { MessageBubble } from "@/components/interview/MessageBubble"
import { TypingIndicator } from "@/components/interview/TypingIndicator"
import { useTimer } from "@/hooks/useTimer"
import { motion, AnimatePresence } from "motion/react"

interface Message {
  id: string
  text: string
  isAI: boolean
}

const mockQuestions = [
  "Bisa ceritakan tentang diri Anda dan pengalaman relevan Anda?",
  "Ceritakan pengalaman Anda saat harus memimpin sebuah project atau inisiatif. Apa situasinya?",
  "Menurut Anda apa tantangan teknis paling sulit yang pernah Anda hadapi?",
  "Bagaimana cara Anda menyelesaikan masalah yang membutuhkan riset mendalam?"
]

export default function InterviewSession() {
  const params = useParams()
  const router = useRouter()
  const [setupData, setSetupData] = React.useState<any>(null)
  
  const [messages, setMessages] = React.useState<Message[]>([
    { id: "1", text: "Halo! Saya AI interviewer Anda hari ini. Mari kita mulai simulasi persiapannya. Bisa ceritakan tentang diri Anda terlebih dahulu?", isAI: true }
  ])
  const [input, setInput] = React.useState("")
  const [isTyping, setIsTyping] = React.useState(false)
  const chatContainerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const data = localStorage.getItem("interview_setup")
    if (data) {
      setSetupData(JSON.parse(data))
    }
  }, [])

  const handleEnd = React.useCallback(() => {
    router.push(`/summary/${params.sessionId}`)
  }, [params.sessionId, router])

  const { formattedTime, isLastFiveMinutes, isLastMinute } = useTimer(setupData?.duration || 15, handleEnd)

  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isTyping) return

    const userMessage = { id: Date.now().toString(), text: input, isAI: false }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Mock AI response
    setTimeout(() => {
      const aiMessage = { 
        id: (Date.now() + 1).toString(), 
        text: mockQuestions[Math.floor(Math.random() * mockQuestions.length)], 
        isAI: true 
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  if (!setupData) return <div className="min-h-screen flex items-center justify-center text-text-muted">Loading session...</div>

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      {/* Header */}
      <header className="h-20 glass border-b border-border flex items-center justify-between px-6 sticky top-0 z-40">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <span className="font-bold text-lg capitalize">{setupData.role?.replace('-', ' ')}</span>
            <Badge variant="outline">{setupData.type} Mode</Badge>
          </div>
          <span className="text-xs text-text-muted mt-1">Interviewer: AI Assistant</span>
        </div>

        <div className="flex items-center gap-6">
          <div className={`flex flex-col items-center px-4 py-1.5 rounded-xl border transition-colors ${isLastMinute ? 'bg-danger/10 border-danger/50 text-danger animate-pulse' : isLastFiveMinutes ? 'bg-warning/10 border-warning/50 text-warning' : 'bg-surface-elevated border-border text-text'}`}>
            <span className="text-xs font-semibold mb-0.5">Time Remaining</span>
            <span className="font-mono text-xl font-bold">{formattedTime}</span>
          </div>
          <Button variant="danger" size="sm" onClick={handleEnd} className="hidden md:flex">
            End Session <LogOut className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Warning Toast */}
      <AnimatePresence>
        {isLastFiveMinutes && !isLastMinute && (
          <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} className="fixed top-24 left-1/2 -translate-x-1/2 z-20">
            <div className="bg-warning/20 border border-warning/50 text-warning px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium backdrop-blur-md">
              <AlertCircle size={16} /> 5 Minutes Remaining
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Area */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-6 py-8 scroll-smooth"
      >
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <MessageBubble message={msg.text} isAI={msg.isAI} />
              </motion.div>
            ))}
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <TypingIndicator />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Input Area */}
      <div className="glass border-t border-border p-4 sticky bottom-0 z-40">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSend} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik jawabanmu di sini..."
              className="w-full bg-surface-elevated border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/50 rounded-2xl pl-5 pr-14 py-4 outline-none transition-all placeholder:text-text-muted/50"
              disabled={isTyping}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isTyping || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary hover:bg-primary-light disabled:bg-surface-elevated disabled:text-text-muted flex items-center justify-center rounded-xl text-white transition-colors cursor-pointer"
            >
              <Send size={18} className={input.trim() ? "translate-x-0.5 -translate-y-0.5" : ""} />
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  )
}
