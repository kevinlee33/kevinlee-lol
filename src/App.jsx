
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FiImage, FiMail, FiLinkedin, FiInstagram } from 'react-icons/fi'
import portrait from './IMG_5825.png'

const EXPERIENCES = [
  { company:'NVIDIA', role:'Incoming SWE Intern', dates:'Fall 2025', summary:'Cloud Infrastructure — building scalable GPU services.', tech:['Go','Kubernetes','AWS'] },
  { company:'Databricks', role:'SWE Intern', dates:'Summer 2025', summary:'Shipped notebook export & cloning features to speed iteration.', tech:['React','Scala','TypeScript'] },
  { company:'BAIR', role:'ML Researcher', dates:'2024 – Present', summary:'Evaluating & fine-tuning LLMs for decision-making tasks.', tech:['PyTorch','TensorFlow','LoRA'] },
  { company:'Genentech', role:'ML Research Intern', dates:'Fall 2024', summary:'Built LLM-augmented knowledge graphs accelerating target ID.', tech:['Python','Spark','GNN'] },
  { company:'Amazon AWS', role:'SDE Intern', dates:'Summer 2024', summary:'Automated 1.5k+ CloudWatch dashboards, cut incident time 30%.', tech:['Python','Ruby','Java'] },
]

const SKILLS = {
  Languages: ['Python','Java','Scala','TypeScript','C++'],
  Frameworks: ['React','Node.js','PyTorch','TensorFlow'],
  Tools: ['AWS','Docker','Kubernetes','Git'],
}

const Pill = ({ children }) => (
  <motion.span
    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.02)' }}
    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    className="px-3 py-1 rounded-full text-xs border border-white/30 transition will-change-transform"
  >
    {children}
  </motion.span>
)

// Small 3D tilt card for hover micro-interaction (max 3deg). Reduced on touch devices.
function TiltCard({ className = '', children }) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const isFinePointer = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(pointer: fine)').matches
  }, [])

  const handleMove = (e) => {
    if (!isFinePointer || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    const max = 3
    setTilt({ x: -(py * max), y: px * max })
  }

  const reset = () => setTilt({ x: 0, y: 0 })

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ perspective: 800 }}
      className={className}
    >
      <motion.div
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

function TopBar({ bgAlt, setBgAlt }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="h-14 flex items-center justify-end px-4 lg:px-6"
    >
      <motion.button
        aria-label="Toggle background image"
        onClick={() => setBgAlt(!bgAlt)}
        whileTap={{ scale: 0.95, rotate: 20 }}
        className="p-2 rounded-full hover:bg-white/10 transition text-xl"
        title="Swap background"
      >
        <FiImage />
      </motion.button>
    </motion.header>
  )
}

// Tabs removed for new static two-panel layout

export default function App() {
  const [dark, setDark] = useState(false)
  const [bgAlt, setBgAlt] = useState(false)
  const [typedText, setTypedText] = useState('')
  const fullHeader = "hey, i'm Kevin!"
  const [typingDone, setTypingDone] = useState(false)
  useEffect(() => {
    setDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
  }, [])

  // Header typing effect on mount
  useEffect(() => {
    let cancelled = false
    let index = 0
    const minDelay = 25
    const maxDelay = 80

    function typeNext() {
      if (cancelled) return
      if (index <= fullHeader.length) {
        setTypedText(fullHeader.slice(0, index))
        index += 1
        const jitter = Math.random() * (maxDelay - minDelay) + minDelay
        setTimeout(typeNext, jitter)
      } else {
        setTypingDone(true)
      }
    }
    const kick = setTimeout(typeNext, 350)
    return () => { cancelled = true; clearTimeout(kick) }
  }, [])

  // Parallax helper for ambient blobs
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const onMove = (e) => {
      const { innerWidth:w, innerHeight:h } = window
      const x = (e.clientX - w/2) / w
      const y = (e.clientY - h/2) / h
      setOffset({ x, y })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // tabs removed

  // Intro parent timeline (background fade 0.0–0.3, right card 0.4–1.0, left portrait 0.6–1.2 handled in children)
  return (
    <div className={dark ? 'dark' : ''}>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`min-h-screen overflow-x-hidden md:overflow-hidden text-gray-100 bg-vibe ${bgAlt ? 'image2' : ''} dark:bg-vibe noise transition-colors duration-500`}
      >
        <div aria-hidden className="aurora" />
        {/* Ambient blobs (fade with parent) */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <motion.div
            className="absolute top-24 left-[-8rem] h-64 w-64 rounded-full bg-white/6 blur-2xl"
            style={{ transform: `translate(${offset.x * 12}px, ${offset.y * 10}px)` }}
            animate={{ opacity: [0.25, 0.15, 0.25] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-24 right-[-6rem] h-72 w-72 rounded-full bg-white/8 blur-3xl"
            style={{ transform: `translate(${offset.x * -16}px, ${offset.y * -12}px)` }}
            animate={{ opacity: [0.2, 0.1, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="h-full flex flex-col">
          <TopBar bgAlt={bgAlt} setBgAlt={setBgAlt} />

          {/* Canvas: on mobile let content flow; on md+ constrain to viewport minus header/footer */}
          <div className="min-h-0 h-auto md:h-[calc(100vh-3.5rem-2rem)] mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[0.9fr,1.1fr] gap-6 p-4 lg:p-6 w-full">
            {/* Left: Large portrait panel */}
            <TiltCard className="min-h-0">
              <motion.div
                initial={{ scale: 0.98, filter: 'blur(8px)' }}
                animate={{ scale: 1, filter: 'blur(0px)' }}
                transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl overflow-hidden h-auto md:h-full relative shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
              >
                <img src={portrait} alt="Portrait of Kevin Lee" className="w-full h-auto md:h-full object-cover rounded-2xl" />
                <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
                <div aria-hidden className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[140%] h-40 bg-gradient-to-b from-white/20 to-transparent blur-3xl" />
              </motion.div>
            </TiltCard>

            {/* Right: Description + want to connect? */}
            <TiltCard className="min-h-0">
              <motion.div
                initial={{ scale: 0.98, filter: 'blur(8px)' }}
                animate={{ scale: 1, filter: 'blur(0px)' }}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-2xl h-auto md:h-full flex flex-col frosted-panel shadow-[0_8px_30px_rgba(0,0,0,0.25)] p-5 lg:p-7"
              >
                {/* Decorative overlays */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
                <div className="pointer-events-none absolute -top-28 -left-28 h-72 w-72 rounded-full bg-white/10 blur-3xl opacity-40" />
                <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <div className="space-y-3 min-h-0 flex-1 overflow-visible md:overflow-auto pr-0 md:pr-1 scroll-area">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-teal-200 drop-shadow-[0_1px_8px_rgba(99,102,241,0.25)]" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.75rem)' }}>
                      {typedText}
                    </h2>
                    {!typingDone && <span className="typing-caret" />}
                    <motion.span
                      role="img"
                      aria-label="waving hand"
                      className="inline-block select-none"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: [0, 20, -8, 14, -4, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
                      style={{ transformOrigin: '70% 70%', fontSize: 'clamp(1.8rem, 3vw, 2.1rem)' }}
                    >
                      👋
                    </motion.span>
                  </div>
                  <p className="text-white/85 leading-relaxed">
                    I’m an engineer originally from New York, currently pursuing a BA in Computer Science + Applied Mathematics at UC Berkeley. My experience spans across industry and research, where I’ve:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-white/85">
                    <li>Developed scalable cloud infrastructure at <span className="font-semibold underline">NVIDIA</span></li>
                    <li>Shipped core Notebook features at <span className="font-semibold underline">Databricks</span></li>
                    <li>Built large-scale knowledge graph systems at <span className="font-semibold underline">Genentech</span></li>
                    <li>Engineered observability tools at <span className="font-semibold underline">Amazon</span></li>
                    <li>Evaluated and fine-tuned LLMs at <span className="font-semibold underline">Berkeley AI Research</span></li>
                  </ul>
                  <p className="text-white/80 leading-relaxed">
                    My work ranges from full-stack development and distributed systems to applied ML, with a goal of making AGI more accessible, safe, and impactful for end users.
                  </p>
                  <p className="text-white/70 leading-relaxed">
                    When I'm not doing anything serious, you’ll find me playing betting games, playing racquet sports, stargazing, or exploring new places—whether it’s a hidden café, a great hiking trail, or a spontaneous trip.
                  </p>
                </div>
                <div className="mt-auto pt-6">
                  <div className="border-t border-white/10 mb-4" />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="relative rounded-xl p-4 lg:p-5 shadow-[0_6px_20px_rgba(0,0,0,0.20)] frosted-panel glow-border"
                  >
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <div className="font-semibold text-white" style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)' }}>want to connect?</div>
                        <div className="text-sm text-white/70">reach me here!</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <motion.a whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }} aria-label="Email" href="mailto:kevinlee1@berkeley.edu" className="inline-flex items-center justify-center p-2 rounded-full border border-white/30 hover:bg-white/15 transition text-xl lg:text-2xl">
                          <FiMail />
                        </motion.a>
                        <motion.a whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }} aria-label="LinkedIn" href="https://linkedin.com/in/kevinlee33" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center p-2 rounded-full border border-white/30 hover:bg-white/15 transition text-xl lg:text-2xl">
                          <FiLinkedin />
                        </motion.a>
                        <motion.a whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }} aria-label="Instagram" href="https://instagram.com/kevi.n.ly" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center p-2 rounded-full border border-white/30 hover:bg-white/15 transition text-xl lg:text-2xl">
                          <FiInstagram />
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </TiltCard>
          </div>

          <footer className="h-8 flex items-center justify-center text-center text-xs opacity-70 px-4">
            © {new Date().getFullYear()} Kevin Lee — kevinlee.one
          </footer>
        </div>
      </motion.main>
    </div>
  )
}
