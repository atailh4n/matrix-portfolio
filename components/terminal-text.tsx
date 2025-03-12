"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface TerminalTextProps {
  text: string
  typingSpeed?: number
  delayBeforeStart?: number
  className?: string
  underscore?: boolean
}

export const TerminalText: React.FC<TerminalTextProps> = ({
  text,
  typingSpeed = 50,
  delayBeforeStart = 0,
  className = "",
  underscore
}) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null

    const startTyping = () => {
      timer = setInterval(() => {
        setIndex((prev) => {
          if (prev < text.length) return prev + 1
          if (timer) clearInterval(timer)
          return prev
        })
      }, typingSpeed)
    }

    const delayTimer = setTimeout(startTyping, delayBeforeStart)

    return () => {
      clearTimeout(delayTimer)
      if (timer) clearInterval(timer)
    }
  }, [text, typingSpeed, delayBeforeStart])

  return <span className={className}>{text.slice(0, index)}{underscore ? <span className="cursor">_</span> : ""}</span>
}

interface TerminalPromptProps {
  children: React.ReactNode
  className?: string
}

export const TerminalPrompt: React.FC<TerminalPromptProps> = ({ children, className = "" }) => {
  return (
    <div className={`flex items-center font-mono text-lg ${className}`}>
      <span className="text-green-400 mr-2">&gt;</span>
      {children}
    </div>
  )
}
