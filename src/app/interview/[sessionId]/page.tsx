"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { LogOut, Send, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { MessageBubble } from "@/components/interview/MessageBubble"
import { TypingIndicator } from "@/components/interview/TypingIndicator"
import { useTimer } from "@/hooks/useTimer"
import { motion, AnimatePresence } from "motion/react"
import type { Session, Message } from "@/lib/supabase/types"

export default function InterviewSession() {
  const params = useParams()
  const router = useRouter()
  const sessionId = params.sessionId as string

  const [session, setSession] = React.useState<Session | null>(null)
  const [messages, setMessages] = React.useState<Message[]>([])
  const [input, setInput] = React.useState("")
  const [isTyping, setIsTyping] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const chatContainerRef = React.useRef<HTMLDivElement>(null)
  const [isEnding, setIsEnding] = React.useState(false)

  // Fetch session data and messages on mount
  React.useEffect(() => {
    async function loadSession() {
      try {
        // Fetch session details
        const sessionRes = await fetch(`/api/sessions/${sessionId}`)
        if (!sessionRes.ok) {
          throw new Error("Session not found")
        }
        const { session: sessionData } = await sessionRes.json()
        setSession(sessionData)

        // Fetch existing messages
        const messagesRes = await fetch(`/api/sessions/${sessionId}/messages`)
        if (messagesRes.ok) {
          const { messages: msgData } = await messagesRes.json()
          setMessages(msgData)
        }
      } catch {
        setError("Failed to load session. Please go back and try again.")
      } finally {
        setIsLoading(false)
      }
    }

    loadSession()
  }, [sessionId])

  const handleEnd = React.useCallback(async () => {
    if (isEnding) return
    setIsEnding(true)

    try {
      // End the session
      await fetch(`/api/sessions/${sessionId}`, { method: "PATCH" })

      // Generate summary
      await fetch(`/api/sessions/${sessionId}/summary`, { method: "POST" })
    } catch {
      // Continue to summary page even if requests fail
      console.error("Error ending session")
    }

    router.push(`/summary/${sessionId}`)
  }, [sessionId, router, isEnding])

  const { formattedTime, isLastFiveMinutes, isLastMinute } = useTimer(
    session?.duration || 15,
    handleEnd
  )

  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isTyping) return

    const userText = input.trim()
    setInput("")
    setIsTyping(true)

    // Optimistic UI: show user message immediately
    const optimisticUserMsg: Message = {
      id: `temp-${Date.now()}`,
      session_id: sessionId,
      sender: "user",
      message: userText,
      created_at: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, optimisticUserMsg])

    try {
      const res = await fetch(`/api/sessions/${sessionId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          is_last_5_minutes: isLastFiveMinutes,
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to send message")
      }

      const { userMessage, aiMessage } = await res.json()

      // Replace optimistic message with real ones
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== optimisticUserMsg.id),
        userMessage,
        aiMessage,
      ])
    } catch {
      // Remove optimistic message on error
      setMessages((prev) =>
        prev.filter((m) => m.id !== optimisticUserMsg.id)
      )
      setInput(userText) // Restore the input
      setError("Failed to send message. Please try again.")
      setTimeout(() => setError(null), 3000)
    } finally {
      setIsTyping(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-text-muted">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span>Loading session...</span>
      </div>
    )
  }

  if (error && !session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-text-muted">
        <AlertCircle className="w-8 h-8 text-danger" />
        <span>{error}</span>
        <Button variant="secondary" onClick={() => router.push("/setup")}>
          Back to Setup
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      {/* Header */}
      <header className="h-20 glass border-b border-border flex items-center justify-between px-6 sticky top-0 z-40">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <span className="font-bold text-lg capitalize">{session?.role?.replace('-', ' ')}</span>
            <Badge variant="outline">{session?.interviewer_type} Mode</Badge>
          </div>
          <span className="text-xs text-text-muted mt-1">Interviewer: AI Assistant</span>
        </div>

        <div className="flex items-center gap-6">
          <div className={`flex flex-col items-center px-4 py-1.5 rounded-xl border transition-colors ${isLastMinute ? 'bg-danger/10 border-danger/50 text-danger animate-pulse' : isLastFiveMinutes ? 'bg-warning/10 border-warning/50 text-warning' : 'bg-surface-elevated border-border text-text'}`}>
            <span className="text-xs font-semibold mb-0.5">Time Remaining</span>
            <span className="font-mono text-xl font-bold">{formattedTime}</span>
          </div>
          <Button variant="danger" size="sm" onClick={handleEnd} disabled={isEnding} className="hidden md:flex">
            {isEnding ? "Ending..." : "End Session"} <LogOut className="ml-2 w-4 h-4" />
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

      {/* Error Toast */}
      <AnimatePresence>
        {error && session && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-20"
          >
            <div className="bg-danger/20 border border-danger/50 text-danger px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium backdrop-blur-md">
              <AlertCircle size={16} /> {error}
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
                <MessageBubble message={msg.message} isAI={msg.sender === "ai"} />
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
              disabled={isTyping || isEnding}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isTyping || !input.trim() || isEnding}
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
