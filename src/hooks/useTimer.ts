import { useState, useEffect } from "react"

export function useTimer(initialMinutes: number, onExpire: () => void) {
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60)
  
  useEffect(() => {
    setSecondsLeft(initialMinutes * 60)
  }, [initialMinutes])
  
  useEffect(() => {
    if (secondsLeft <= 0) {
      onExpire()
      return
    }
    
    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1)
    }, 1000)
    
    return () => clearInterval(interval)
  }, [secondsLeft, onExpire])

  const formattedTime = `${Math.floor(secondsLeft / 60).toString().padStart(2, '0')}:${(secondsLeft % 60).toString().padStart(2, '0')}`
  const isLastFiveMinutes = secondsLeft <= 300 && secondsLeft > 0
  const isLastMinute = secondsLeft <= 60 && secondsLeft > 0

  return { secondsLeft, formattedTime, isLastFiveMinutes, isLastMinute }
}
