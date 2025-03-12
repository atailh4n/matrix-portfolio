"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Mail, ExternalLink, Download } from "lucide-react"
import { TerminalText, TerminalPrompt } from "@/components/terminal-text"
import { useRouter } from "next/navigation"

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [showContent, setShowContent] = useState(false)
  const router = useRouter();

  useEffect(() => {
    if (!sectionRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => setShowContent(true),
        once: true,
      },
    })

    tl.fromTo(
      ".contact-animate",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "power3.out" },
    )

    tl.fromTo(
      ".social-icon",
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(1.7)",
      },
      "-=0.5",
    )

    return () => {
      tl.kill()
    }
  }, [])

  function handleMail() {
    router.push('mailto:example@gmail.com');
  }

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
          <TerminalText text="get CONTACT_PROTOCOLS" typingSpeed={50} />
        </TerminalPrompt>

        <TerminalPrompt className="mb-4">
          <TerminalText text="Establishing secure connection..." typingSpeed={50} delayBeforeStart={1000} />
        </TerminalPrompt>

        {showContent && (
          <div className="space-y-6">
            <Card className="contact-animate bg-black border border-green-500/30 text-green-400">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 tracking-wider">Initiate Communication</h3>
                <p className="mb-4">
                  Secure channel open. Ready to receive transmissions on new projects, collaborations, or inquiries.
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-black" onClick={handleMail}>
                  <Mail className="mr-2 h-4 w-4"  />
                  Send Encrypted Message
                </Button>
              </CardContent>
            </Card>

            <Card className="contact-animate bg-black border border-green-500/30 text-green-400">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 tracking-wider">Access Data Banks</h3>
                <div className="space-y-4">
                  <Link href="#" className="flex items-center p-2 rounded-md hover:bg-green-900/20 transition-colors">
                    <Download className="mr-3 h-5 w-5" />
                    <span>Download Credentials (Resume)</span>
                    <ExternalLink className="ml-auto h-4 w-4" />
                  </Link>
                  <Link href="https://github.com/example" className="flex items-center p-2 rounded-md hover:bg-green-900/20 transition-colors">
                    <Github className="mr-3 h-5 w-5" />
                    <span>View Code Repository</span>
                    <ExternalLink className="ml-auto h-4 w-4" />
                  </Link>
                  <Link href="https://linkedin.com/in/example" className="flex items-center p-2 rounded-md hover:bg-green-900/20 transition-colors">
                    <Linkedin className="mr-3 h-5 w-5" />
                    <span>Professional Network Node</span>
                    <ExternalLink className="ml-auto h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            <div className="contact-animate text-center">
              <h4 className="text-sm font-medium mb-4 tracking-wider">ACTIVE NETWORK INTERFACES</h4>
              <div className="flex justify-center space-x-4">
                <Link
                  href="https://github.com/example"
                  className="social-icon p-3 bg-green-900/30 rounded-full hover:bg-green-800/50 transition-colors"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href="https://tr.linkedin.com/in/example"
                  className="social-icon p-3 bg-green-900/30 rounded-full hover:bg-green-800/50 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link
                  href="mailto:example@gmail.com"
                  className="social-icon p-3 bg-green-900/30 rounded-full hover:bg-green-800/50 transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 animate-blink">_</div>
      </div>
    </section>
  )
}

