"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import MatrixRain from "@/components/matrix-rain"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import ContactSection from "@/components/contact-section"
import { TerminalText, TerminalPrompt } from "@/components/terminal-text"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export default function Home() {
  const introRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [introComplete, setIntroComplete] = useState(false)
  const [showMainContent, setShowMainContent] = useState(false)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.to(".cursor", { opacity: 0, repeat: -1, yoyo: true, duration: 0.5 })

    setTimeout(() => {
      setShowMainContent(true)
    }, 5000) // Adjust timing as needed

    const handleDive = () => {
      if (introRef.current && contentRef.current) {
        gsap.to(introRef.current, {
          yPercent: -100,
          duration: 1.5,
          ease: "power3.inOut",
          onComplete: () => setIntroComplete(true),
        })

        gsap.fromTo(
          contentRef.current,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.5, delay: 0.5, ease: "power3.out" },
        )

        gsap.to(window, {
          duration: 0.1,
          scrollTo: { y: contentRef.current, offsetY: 0 },
          delay: 1.5,
        })
      }
    }

    const intro = introRef.current
    intro?.addEventListener("click", handleDive)

    return () => {
      intro?.removeEventListener("click", handleDive)
      tl.kill()
    }
  }, [])

  return (
    <main className="relative min-h-screen bg-black text-green-400 overflow-hidden font-mono">
      {/* Matrix Intro */}
      <div
        ref={introRef}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer"
        style={{ pointerEvents: introComplete ? "none" : "auto" }}
      >
        <MatrixRain />
        <div className="relative z-10 text-center px-4 bg-black bg-opacity-50 p-8 rounded-lg w-full max-w-3xl">
          <TerminalPrompt>
            <TerminalText text="gcc example.c" typingSpeed={50} underscore={true} />
          </TerminalPrompt>
          <TerminalPrompt>
            <TerminalText text="Building system profile..." typingSpeed={50} delayBeforeStart={1500} underscore={true} />
          </TerminalPrompt>
          {showMainContent && (
            <TerminalPrompt className="mt-4">
              <TerminalText text="BUILD OK. Click anywhere to run." typingSpeed={50} delayBeforeStart={500} />
            </TerminalPrompt>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div ref={contentRef} className="relative min-h-screen" style={{ opacity: introComplete ? 1 : 0 }}>
        <AboutSection />
        <SkillsSection />
        <ContactSection />
      </div>
    </main>
  )
}

