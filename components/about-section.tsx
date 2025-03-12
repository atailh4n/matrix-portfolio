"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { EditableCard } from "@/components/editable-card";
import { TerminalText, TerminalPrompt } from "@/components/terminal-text";

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => setShowContent(true),
        once: true,
      },
    });

    tl.fromTo(
      ".terminal-card",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "power3.out" }
    );

    return () => {
      tl.kill();
    };
  }, []);

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
          <TerminalText text="echo SYSTEM_PROFILE" typingSpeed={50} />
        </TerminalPrompt>

        <TerminalPrompt className="mb-4">
          <TerminalText
            text="Printing system profile..."
            typingSpeed={50}
            delayBeforeStart={1000}
          />
        </TerminalPrompt>

        {showContent && (
          <>
            <div className="terminal-card mb-6">
              <TerminalPrompt>
                <TerminalText text="cat identity.txt" typingSpeed={50} />
              </TerminalPrompt>
              <EditableCard
                className="mt-2 bg-black border border-green-500/30 text-green-400"
                title="Identity"
                titleClassName="tracking-wider"
                defaultContent={`
                  <div class="flex items-center mb-4">
                    <div class="relative w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-green-400">
                      <img src="/profile_pic.jpeg?height=64&width=64" alt="Profile" class="object-cover" />
                    </div>
                    <div>
                      <h3 class="text-lg font-bold tracking-wider">Ata Ilhan Kokturk</h3>
                      <p class="text-sm">Designation: Multi-disciplinary Developer</p>
                    </div>
                  </div>
                  <p class="mb-2">Specializations: Cyber-security, Embedded Systems, Game Development, Full-stack Web Development</p>
                  <p>Mission: Create secure, efficient, and innovative solutions for the digital realm.</p>
                `}
              />
            </div>

            <div className="terminal-card mb-6">
              <TerminalPrompt>
                <TerminalText
                  text="ls core_protocols/"
                  typingSpeed={50}
                  delayBeforeStart={500}
                />
              </TerminalPrompt>
              <EditableCard
                className="mt-2 bg-black border border-green-500/30 text-green-400"
                title="Core Protocols"
                titleClassName="tracking-wider"
                defaultContent={`
                  <ul class="space-y-2">
                    <li class="flex items-center">
                      <span class="inline-block w-3 h-3 bg-green-400 mr-2 animate-pulse"></span>
                      <span>Penetration_Testing.exe</span>
                    </li>
                    <li class="flex items-center">
                      <span class="inline-block w-3 h-3 bg-green-400 mr-2 animate-pulse"></span>
                      <span>Embedded_Systems_Development.bin</span>
                    </li>
                    <li class="flex items-center">
                      <span class="inline-block w-3 h-3 bg-green-400 mr-2 animate-pulse"></span>
                      <span>Game_Engine_Architecture.dll</span>
                    </li>
                    <li class="flex items-center">
                      <span class="inline-block w-3 h-3 bg-green-400 mr-2 animate-pulse"></span>
                      <span>Full_Stack_Web_Development.js</span>
                    </li>
                    <li class="flex items-center">
                      <span class="inline-block w-3 h-3 bg-green-400 mr-2 animate-pulse"></span>
                      <span>Network_Security.hc</span>
                    </li>
                    <li class="flex items-center">
                      <span class="inline-block w-3 h-3 bg-green-400 mr-2 animate-pulse"></span>
                      <span>System_Architecture.blueprint</span>
                    </li>
                    <li class="flex items-center">
                      <span class="inline-block w-3 h-3 bg-green-400 mr-2 animate-pulse"></span>
                      <span>DevOps_CI_CD.krnos</span>
                    </li>
                    <li class="flex items-center">
                      <span class="inline-block w-3 h-3 bg-green-400 mr-2 animate-pulse"></span>
                      <span>OS_Development.c</span>
                    </li>
                    <li class="flex items-center">
                      <span class="inline-block w-3 h-3 bg-green-400 mr-2 animate-pulse"></span>
                      <span>Mobile_App_Development.aab</span>
                    </li>
                  </ul>
                `}
              />
            </div>

            <div className="terminal-card">
              <TerminalPrompt>
                <TerminalText
                  text="grep -r 'language' /code_matrices"
                  typingSpeed={50}
                  delayBeforeStart={1000}
                />
              </TerminalPrompt>
              <EditableCard
                className="mt-2 bg-black border border-green-500/30 text-green-400"
                title="Code Matrices"
                titleClassName="tracking-wider"
                defaultContent={`
                  <div class="grid grid-cols-2 gap-2">
                    <div class="bg-green-900/30 p-2 rounded text-center hover:bg-green-400 hover:text-black transition-colors">[C/C++/C#]</div>
                    <div class="bg-green-900/30 p-2 rounded text-center hover:bg-green-400 hover:text-black transition-colors">[Python]</div>
                    <div class="bg-green-900/30 p-2 rounded text-center hover:bg-green-400 hover:text-black transition-colors">[JavaScript]</div>
                    <div class="bg-green-900/30 p-2 rounded text-center hover:bg-green-400 hover:text-black transition-colors">[TypeScript]</div>
                    <div class="bg-green-900/30 p-2 rounded text-center hover:bg-green-400 hover:text-black transition-colors">[Lua]</div>
                    <div class="bg-green-900/30 p-2 rounded text-center hover:bg-green-400 hover:text-black transition-colors">[Go]</div>
                    <div class="bg-green-900/30 p-2 rounded text-center hover:bg-green-400 hover:text-black transition-colors">[React]</div>
                    <div class="bg-green-900/30 p-2 rounded text-center hover:bg-green-400 hover:text-black transition-colors">[Node.js]</div>
                    <div class="bg-green-900/30 p-2 rounded text-center hover:bg-green-400 hover:text-black transition-colors">[Unity]</div>
                    <div class="bg-green-900/30 p-2 rounded text-center hover:bg-green-400 hover:text-black transition-colors">[Unreal]</div>
                  </div>
                `}
              />
            </div>
          </>
        )}

        <div className="mt-4 animate-blink">_</div>
      </div>
    </section>
  );
}
