"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { TerminalText, TerminalPrompt } from "@/components/terminal-text"
import { EditableCard } from "@/components/editable-card"

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => setShowContent(true),
        once: true,
      },
    })

    tl.fromTo(
      ".skill-card",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "power3.out" },
    )

    return () => {
      tl.kill()
    }
  }, [])

  const skills = [
    {
      category: "Languages",
      command: "Hallo, Hello oder Merhaba?",
      items: [
        { name: "Türkçe", value: 100 },
        { name: "English", value: 90 },
        { name: "Deutch", value: 78 },
      ],
    },
    {
      category: "Cyber Security",
      command: "nmap -sV --script vuln",
      items: [
        { name: "Penetration Testing", value: 80 },
        { name: "Network Security", value: 95 },
        { name: "Cryptography", value: 100 },
        { name: "Security Auditing", value: 70 },
      ],
    },
    {
      category: "Embedded Development",
      command: "make flash DEVICE=stm32f4",
      items: [
        { name: "Microcontroller Programming", value: 70 },
        { name: "IoT Development", value: 80 },
        { name: "RTOS/Buildroot", value: 100 },
        { name: "Circuit Design", value: 65 },
      ],
    },
    {
      category: "Game Development",
      command: "./build_game.sh --engine UnityEngine",
      items: [
        { name: "Unity", value: 95 },
        { name: "Godot", value: 90 },
        { name: "Unreal Engine", value: 75 },
        { name: "3D Modeling", value: 70 },
        { name: "Game Physics", value: 85 },
      ],
    },
    {
      category: "Web Development",
      command: "npm run build && npm start",
      items: [
        { name: "Frontend (React/Next.js)", value: 80 },
        { name: "Backend (Node.js)", value: 95 },
        { name: "Database Design", value: 100 },
        { name: "DevOps", value: 80 },
      ],
    },
    {
      category: "Databases",
      command: "SELECT `hello`, `world` FROM my_life WHERE id=?;",
      items: [
        { name: "SQL (PostgreSQL/MySQL)", value: 95 },
        { name: "MongoDB", value: 100 },
        { name: "Cassandra", value: 80 },
        { name: "ORMs", value: 90 },
      ],
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center py-20 px-4 md:px-8 bg-black text-green-400 font-mono"
    >
      <div className="w-full max-w-4xl bg-black border border-green-500/30 p-4 rounded-lg shadow-lg terminal-window">
        <div className="mb-4 flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>

        <TerminalPrompt>
          <TerminalText text="echo SKILLS_AND_EXPERTISE" typingSpeed={50} />
        </TerminalPrompt>

        <TerminalPrompt className="mb-4">
          <TerminalText text="Analyzing skill matrices..." typingSpeed={50} delayBeforeStart={1000} />
        </TerminalPrompt>

        {showContent && (
          <div className="space-y-6">
            {skills.map((skillGroup, index) => (
              <div key={index} className="skill-card">
                <TerminalPrompt>
                  <TerminalText text={skillGroup.command} typingSpeed={50} delayBeforeStart={index * 500} />
                </TerminalPrompt>
                <EditableCard
                  className="mt-2 bg-black border border-green-500/30 text-green-400"
                  title={skillGroup.category}
                  titleClassName="tracking-wider"
                  defaultContent={`
                    <div class="space-y-2">
                      ${skillGroup.items
                        .map(
                          (skill) => `
                        <div class="flex items-center justify-between">
                          <span>${skill.name}</span>
                          <div class="w-1/2 bg-green-900/30 rounded-full h-2 overflow-hidden">
                            <div class="bg-green-400 h-full" style="width: ${skill.value}%"></div>
                          </div>
                        </div>
                      `,
                        )
                        .join("")}
                    </div>
                  `}
                />
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 animate-blink">_</div>
      </div>
    </section>
  )
}

