
import React, { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { FiMail, FiLinkedin, FiArrowRight, FiMapPin } from 'react-icons/fi'
import portrait from './IMG_5825.png'
import ripplingLogo from './image copy 4.png'
import nvidiaLogo from './image copy 2.png'
import databricksLogo from './image copy 3.png'
import genentechLogo from './image copy 5.png'
import amazonLogo from './image copy.png'
import openaiLogo from './image copy 6.png'

// Company logo components using imported images
const RipplingLogo = () => (
  <img src={ripplingLogo} alt="Rippling" className="h-8 w-auto object-contain" />
)

const NvidiaLogo = () => (
  <img src={nvidiaLogo} alt="NVIDIA" className="h-8 w-auto object-contain" />
)

const DatabricksLogo = () => (
  <img src={databricksLogo} alt="Databricks" className="h-8 w-auto object-contain" />
)

const BairLogo = () => (
  <svg viewBox="0 0 100 32" className="h-6 w-auto">
    <rect x="0" y="6" width="20" height="20" rx="3" fill="#003262" />
    <text x="4" y="21" fill="#FDB515" fontSize="12" fontWeight="700" fontFamily="Inter, sans-serif">AI</text>
    <text x="28" y="21" fill="currentColor" fontSize="16" fontWeight="600" fontFamily="Inter, sans-serif">BAIR</text>
  </svg>
)

const GenentechLogo = () => (
  <img src={genentechLogo} alt="Genentech" className="h-7 w-auto object-contain" />
)

const AWSLogo = () => (
  <img src={amazonLogo} alt="Amazon" className="h-7 w-auto object-contain" />
)

const EXPERIENCES = [
  {
    company: 'Rippling',
    Logo: RipplingLogo,
    role: 'Software Engineering Intern',
    location: 'San Francisco',
    dates: 'Feb 2026 – May 2026',
    description: 'Building AI agents and evaluation frameworks for Rippling\'s intelligent assistant in the Analytics team.',
    accent: 'from-yellow-400 to-amber-500',
    glow: 'group-hover:shadow-[0_0_60px_-15px_rgba(251,191,36,0.5)]',
  },
  {
    company: 'NVIDIA',
    Logo: NvidiaLogo,
    role: 'Software Engineering Intern',
    location: 'Santa Clara',
    dates: 'Sep 2025 – Dec 2025',
    description: 'Built a scalable Go/Kubernetes log pipeline processing 1.2B+ logs daily with real-time anomaly detection.',
    accent: 'from-green-400 to-emerald-500',
    glow: 'group-hover:shadow-[0_0_60px_-15px_rgba(74,222,128,0.5)]',
  },
  {
    company: 'Databricks',
    Logo: DatabricksLogo,
    role: 'Software Engineering Intern',
    location: 'San Francisco',
    dates: 'May 2025 – Aug 2025',
    description: 'Shipped full-stack notebook features that transformed developer iteration time from hours to seconds.',
    accent: 'from-red-400 to-orange-500',
    glow: 'group-hover:shadow-[0_0_60px_-15px_rgba(248,113,113,0.5)]',
  },
  {
    company: 'BAIR',
    Logo: BairLogo,
    role: 'Machine Learning Researcher',
    location: 'Berkeley',
    dates: 'Jan 2024 – Present',
    description: 'Leading LLM evaluations and fine-tuning research for complex decision-making tasks.',
    accent: 'from-blue-400 to-indigo-500',
    glow: 'group-hover:shadow-[0_0_60px_-15px_rgba(96,165,250,0.5)]',
  },
  {
    company: 'Genentech',
    Logo: GenentechLogo,
    role: 'ML Research Intern',
    location: 'San Francisco',
    dates: 'Sep 2024 – Dec 2024',
    description: 'Designed an LLM-augmented knowledge graph integrating 2M+ biological entities for clinical discovery.',
    accent: 'from-cyan-400 to-teal-500',
    glow: 'group-hover:shadow-[0_0_60px_-15px_rgba(34,211,238,0.5)]',
  },
  {
    company: 'AWS',
    Logo: AWSLogo,
    role: 'Software Development Intern',
    location: 'Seattle',
    dates: 'May 2024 – Aug 2024',
    description: 'Shipped automated observability tooling for 1,500+ CloudWatch dashboards across 100+ accounts.',
    accent: 'from-orange-400 to-yellow-500',
    glow: 'group-hover:shadow-[0_0_60px_-15px_rgba(251,146,60,0.5)]',
  },
]

// Magnetic button effect
function MagneticButton({ children, className, href, ...props }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.15)
    y.set((e.clientY - centerY) * 0.15)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const Component = href ? motion.a : motion.button

  return (
    <Component
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  )
}

// Experience card with tilt effect
function ExperienceCard({ experience, index }) {
  const { company, Logo, role, location, dates, description, accent, glow } = experience
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [8, -8])
  const rotateY = useTransform(x, [-100, 100], [-8, 8])

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      className="group"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        className={`
          relative h-full p-6 lg:p-8 rounded-2xl
          bg-white/70 backdrop-blur-xl
          border border-white/50
          transition-all duration-700 ease-out
          hover:bg-white/85 hover:border-white/70
          ${glow}
          overflow-hidden
          shadow-xl shadow-black/10
        `}
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        <div className="relative z-10 h-full flex flex-col" style={{ transform: 'translateZ(20px)' }}>
          {/* Header with logo */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="text-gray-800">
              <Logo />
            </div>
            <span className={`px-3 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-gradient-to-r ${accent} text-white shadow-sm`}>
              {dates.split(' ')[0]} {dates.split(' ')[1]}
            </span>
          </div>

          {/* Company name */}
          <h3 className="text-lg font-bold text-gray-900 mb-1">{company}</h3>

          {/* Role */}
          <p className="text-base font-medium text-gray-700 mb-2">{role}</p>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
            <FiMapPin className="w-3.5 h-3.5" />
            {location}
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed flex-grow">
            {description}
          </p>

          {/* Bottom hover indicator */}
          <div className="mt-6 flex items-center gap-2 text-gray-400 group-hover:text-gray-600 transition-colors">
            <span className="text-xs font-medium uppercase tracking-wider">{company}</span>
            <FiArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Nature Background Component
function NatureBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden" style={{ zIndex: -10 }}>
      {/* Sky gradient - beautiful golden hour with more depth */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-300 to-amber-100" />
        {/* Atmospheric haze layers */}
        <div className="absolute inset-0 bg-gradient-to-t from-amber-100/40 via-transparent to-sky-300/20" />
      </div>

      {/* Sun with realistic glow layers - TOP LEFT */}
      <div className="absolute top-[3%] left-[8%]">
        {/* Outer glow */}
        <motion.div
          className="absolute -inset-20"
          style={{
            background: 'radial-gradient(circle, rgba(255,200,100,0.3) 0%, rgba(255,180,80,0.1) 40%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Mid glow */}
        <motion.div
          className="absolute -inset-10"
          style={{
            background: 'radial-gradient(circle, rgba(255,230,150,0.5) 0%, rgba(255,200,100,0.2) 50%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Sun core */}
        <motion.div
          style={{
            width: '140px',
            height: '140px',
            background: 'radial-gradient(circle, #fffef0 0%, #fff9c4 20%, #ffee58 40%, #ffca28 60%, #ff8f00 85%, transparent 100%)',
            borderRadius: '50%',
            filter: 'blur(1px)',
          }}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Subtle sun rays from top left */}
      <div className="absolute top-0 left-0 w-[500px] h-[400px] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top left, rgba(255,240,200,0.5) 0%, transparent 60%)',
        }}
      />

      {/* Clouds layer 1 - High altitude, wispy */}
      <motion.div
        className="absolute w-[200%] h-32 top-[5%]"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 150, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 2000 120" className="w-full h-full">
          <defs>
            <linearGradient id="wispy-cloud" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.9" />
              <stop offset="100%" stopColor="white" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <ellipse cx="150" cy="60" rx="120" ry="25" fill="url(#wispy-cloud)" opacity="0.5" />
          <ellipse cx="500" cy="50" rx="150" ry="20" fill="url(#wispy-cloud)" opacity="0.4" />
          <ellipse cx="900" cy="65" rx="100" ry="18" fill="url(#wispy-cloud)" opacity="0.45" />
          <ellipse cx="1300" cy="55" rx="130" ry="22" fill="url(#wispy-cloud)" opacity="0.5" />
          <ellipse cx="1700" cy="60" rx="110" ry="20" fill="url(#wispy-cloud)" opacity="0.4" />
        </svg>
      </motion.div>

      {/* Clouds layer 2 - Mid altitude, fluffy cumulus */}
      <motion.div
        className="absolute w-[200%] h-56 top-[8%]"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 1800 220" className="w-full h-full">
          <defs>
            <linearGradient id="cloud-main" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#f8f8f8" />
              <stop offset="100%" stopColor="#e8e8e8" />
            </linearGradient>
            <filter id="cloud-shadow">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.1"/>
            </filter>
          </defs>
          {/* Cloud 1 - Large fluffy */}
          <g fill="url(#cloud-main)" filter="url(#cloud-shadow)" opacity="0.95">
            <ellipse cx="130" cy="110" rx="100" ry="55" />
            <ellipse cx="200" cy="85" rx="80" ry="50" />
            <ellipse cx="80" cy="95" rx="70" ry="45" />
            <ellipse cx="160" cy="130" rx="90" ry="45" />
            <ellipse cx="230" cy="115" rx="60" ry="40" />
          </g>
          {/* Cloud 2 */}
          <g fill="url(#cloud-main)" filter="url(#cloud-shadow)" opacity="0.9">
            <ellipse cx="550" cy="100" rx="110" ry="60" />
            <ellipse cx="630" cy="75" rx="85" ry="50" />
            <ellipse cx="490" cy="85" rx="75" ry="45" />
            <ellipse cx="580" cy="125" rx="95" ry="50" />
            <ellipse cx="670" cy="105" rx="65" ry="42" />
          </g>
          {/* Cloud 3 */}
          <g fill="url(#cloud-main)" filter="url(#cloud-shadow)" opacity="0.92">
            <ellipse cx="1000" cy="105" rx="95" ry="55" />
            <ellipse cx="1070" cy="85" rx="75" ry="45" />
            <ellipse cx="950" cy="90" rx="65" ry="40" />
            <ellipse cx="1020" cy="125" rx="85" ry="45" />
          </g>
          {/* Cloud 4 */}
          <g fill="url(#cloud-main)" filter="url(#cloud-shadow)" opacity="0.88">
            <ellipse cx="1400" cy="95" rx="105" ry="58" />
            <ellipse cx="1480" cy="75" rx="80" ry="48" />
            <ellipse cx="1350" cy="82" rx="70" ry="42" />
            <ellipse cx="1420" cy="120" rx="90" ry="48" />
            <ellipse cx="1510" cy="100" rx="55" ry="38" />
          </g>
        </svg>
      </motion.div>

      {/* Clouds layer 3 - Lower, slower */}
      <motion.div
        className="absolute w-[200%] h-44 top-[16%]"
        animate={{ x: ['-50%', '0%'] }}
        transition={{ duration: 130, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 1600 170" className="w-full h-full">
          <g fill="white" opacity="0.75">
            <ellipse cx="200" cy="85" rx="120" ry="60" />
            <ellipse cx="290" cy="60" rx="90" ry="50" />
            <ellipse cx="140" cy="70" rx="80" ry="45" />
            <ellipse cx="230" cy="105" rx="100" ry="50" />
          </g>
          <g fill="white" opacity="0.7">
            <ellipse cx="750" cy="80" rx="100" ry="55" />
            <ellipse cx="830" cy="60" rx="75" ry="45" />
            <ellipse cx="700" cy="68" rx="65" ry="40" />
            <ellipse cx="780" cy="100" rx="85" ry="45" />
          </g>
          <g fill="white" opacity="0.72">
            <ellipse cx="1250" cy="90" rx="115" ry="58" />
            <ellipse cx="1340" cy="68" rx="85" ry="48" />
            <ellipse cx="1195" cy="75" rx="72" ry="42" />
            <ellipse cx="1280" cy="112" rx="95" ry="48" />
          </g>
        </svg>
      </motion.div>

      {/* BACK MOUNTAIN LAYER - distant blue-gray mountains */}
      <svg className="absolute bottom-[22%] w-full h-[45%]" viewBox="0 0 1440 450" preserveAspectRatio="none">
        <defs>
          <linearGradient id="mountain-distant" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8ca0b5" />
            <stop offset="100%" stopColor="#a8b8c8" />
          </linearGradient>
        </defs>
        <path d="M0,450 L0,280 L80,220 L150,280 L200,180 L280,260 L350,140 L420,220 L480,100 L560,200 L620,120 L700,180 L780,80 L860,160 L920,100 L1000,150 L1080,80 L1160,140 L1220,100 L1300,160 L1380,120 L1440,180 L1440,450 Z" fill="url(#mountain-distant)" opacity="0.4" />
      </svg>

      {/* MAIN MOUNTAIN RANGE - rocky brown with proper peaks */}
      <svg className="absolute bottom-[18%] w-full h-[50%]" viewBox="0 0 1440 500" preserveAspectRatio="none">
        <defs>
          {/* Rocky brown gradient */}
          <linearGradient id="mountain-rock" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7a6a5a" />
            <stop offset="40%" stopColor="#6B5344" />
            <stop offset="70%" stopColor="#5D4E37" />
            <stop offset="100%" stopColor="#4a3f2f" />
          </linearGradient>
          {/* Darker rock for shadows */}
          <linearGradient id="mountain-shadow" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5a4a3a" />
            <stop offset="100%" stopColor="#3a3025" />
          </linearGradient>
          {/* Snow gradient */}
          <linearGradient id="snow-main" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#f0f4f8" />
            <stop offset="100%" stopColor="#dce4ec" />
          </linearGradient>
          {/* Snow shadow */}
          <linearGradient id="snow-shade" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e0e8f0" />
            <stop offset="100%" stopColor="#b0c0d0" />
          </linearGradient>
        </defs>

        {/* Main mountain silhouette - spans full width with natural peaks */}
        <path d="M0,500 L0,350 L60,300 L100,340 L140,280 L180,320 L220,240 L260,290 L300,200 L340,260 L380,160 L420,230 L460,120 L500,200 L540,80 L580,160 L620,100 L660,150 L700,70 L740,140 L780,90 L820,130 L860,80 L900,120 L940,90 L980,115 L1020,85 L1060,110 L1100,90 L1140,105 L1180,95 L1220,108 L1260,100 L1300,112 L1340,105 L1380,115 L1420,108 L1440,115 L1440,500 Z" fill="url(#mountain-rock)" />

        {/* Mountain ridge detail/shadow layer */}
        <path d="M380,160 L420,230 L400,210 Z" fill="url(#mountain-shadow)" opacity="0.4" />
        <path d="M460,120 L500,200 L480,175 Z" fill="url(#mountain-shadow)" opacity="0.4" />
        <path d="M540,80 L580,160 L560,135 Z" fill="url(#mountain-shadow)" opacity="0.4" />
        <path d="M700,70 L740,140 L720,115 Z" fill="url(#mountain-shadow)" opacity="0.35" />
        <path d="M300,200 L340,260 L320,235 Z" fill="url(#mountain-shadow)" opacity="0.4" />

        {/* SNOW CAPS - on tallest peaks */}
        {/* Peak 1 - tallest (540) */}
        <path d="M540,80 L590,180 L570,155 L550,170 L540,130 L530,150 L520,125 L505,155 L490,120 Z" fill="url(#snow-main)" />
        <path d="M555,105 L590,180 L570,155 Z" fill="url(#snow-shade)" opacity="0.5" />

        {/* Peak 2 (700) */}
        <path d="M700,70 L750,165 L730,140 L710,155 L700,115 L690,135 L680,110 L665,140 L650,105 Z" fill="url(#snow-main)" />
        <path d="M715,95 L750,165 L730,140 Z" fill="url(#snow-shade)" opacity="0.5" />

        {/* Peak 3 (460) */}
        <path d="M460,120 L510,215 L490,190 L470,205 L460,165 L450,185 L440,160 L425,190 L410,155 Z" fill="url(#snow-main)" />
        <path d="M475,145 L510,215 L490,190 Z" fill="url(#snow-shade)" opacity="0.45" />

        {/* Peak 4 (380) */}
        <path d="M380,160 L425,250 L408,228 L390,240 L380,205 L370,222 L360,200 L348,225 L335,195 Z" fill="url(#snow-main)" />
        <path d="M393,182 L425,250 L408,228 Z" fill="url(#snow-shade)" opacity="0.45" />

        {/* Peak 5 (620) */}
        <path d="M620,100 L665,190 L648,168 L630,180 L620,145 L610,162 L600,140 L588,165 L575,135 Z" fill="url(#snow-main)" />
        <path d="M633,122 L665,190 L648,168 Z" fill="url(#snow-shade)" opacity="0.45" />

        {/* Peak 6 (780) */}
        <path d="M780,90 L820,170 L805,152 L790,162 L780,130 L770,148 L760,125 L750,150 L738,120 Z" fill="url(#snow-main)" opacity="0.9" />
        <path d="M792,110 L820,170 L805,152 Z" fill="url(#snow-shade)" opacity="0.4" />

        {/* Peak 7 (860) */}
        <path d="M860,80 L898,155 L884,140 L870,148 L860,118 L850,135 L842,115 L832,138 L822,108 Z" fill="url(#snow-main)" opacity="0.85" />

        {/* Peak 8 (300) */}
        <path d="M300,200 L342,285 L328,265 L312,275 L300,245 L290,262 L280,242 L270,265 L258,235 Z" fill="url(#snow-main)" opacity="0.9" />

        {/* Peak 9 (220) */}
        <path d="M220,240 L260,320 L248,302 L232,312 L220,285 L210,300 L200,280 L190,302 L178,275 Z" fill="url(#snow-main)" opacity="0.85" />

        {/* Rock texture lines */}
        <path d="M350,280 Q370,300 355,330" fill="none" stroke="#3a3025" strokeWidth="1.5" opacity="0.25" />
        <path d="M480,250 Q500,275 485,305" fill="none" stroke="#3a3025" strokeWidth="1.5" opacity="0.25" />
        <path d="M600,220 Q620,245 605,275" fill="none" stroke="#3a3025" strokeWidth="1.5" opacity="0.25" />
        <path d="M750,200 Q770,225 755,255" fill="none" stroke="#3a3025" strokeWidth="1.5" opacity="0.25" />
        <path d="M900,180 Q920,205 905,235" fill="none" stroke="#3a3025" strokeWidth="1.5" opacity="0.2" />
        <path d="M250,320 Q270,345 255,375" fill="none" stroke="#3a3025" strokeWidth="1.5" opacity="0.25" />

        {/* Snow texture highlights */}
        <path d="M530,110 Q545,100 560,120" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.7" />
        <path d="M690,100 Q705,90 720,110" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.7" />
        <path d="M450,150 Q465,140 480,160" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" />
        <path d="M610,130 Q625,120 640,140" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" />
        <path d="M370,190 Q385,180 400,200" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.55" />
      </svg>

      {/* Foothills - green forested with texture */}
      <svg className="absolute bottom-[14%] w-full h-[20%]" viewBox="0 0 1440 200" preserveAspectRatio="none">
        <defs>
          <linearGradient id="foothill-green" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3a6b4a" />
            <stop offset="50%" stopColor="#3d6b4f" />
            <stop offset="100%" stopColor="#4a7c59" />
          </linearGradient>
          <linearGradient id="foothill-dark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2d5a3f" />
            <stop offset="100%" stopColor="#3a6b4a" />
          </linearGradient>
        </defs>
        {/* Back foothill layer */}
        <path d="M0,200 L0,100 L60,70 L120,95 L180,50 L240,80 L300,40 L360,70 L420,30 L480,60 L540,25 L600,55 L660,35 L720,58 L780,40 L840,60 L900,45 L960,62 L1020,50 L1080,65 L1140,55 L1200,68 L1260,58 L1320,70 L1380,62 L1440,72 L1440,200 Z" fill="url(#foothill-dark)" opacity="0.5" />
        {/* Front foothill layer */}
        <path d="M0,200 L0,120 L50,95 L100,110 L150,80 L200,100 L250,70 L300,90 L350,60 L400,82 L450,55 L500,75 L550,50 L600,72 L650,48 L700,68 L750,52 L800,70 L850,55 L900,72 L950,60 L1000,75 L1050,62 L1100,78 L1150,65 L1200,80 L1250,68 L1300,82 L1350,72 L1400,85 L1440,78 L1440,200 Z" fill="url(#foothill-green)" opacity="0.8" />
        {/* Foothill texture */}
        <path d="M100,120 Q120,100 140,118" fill="none" stroke="#2d5a3f" strokeWidth="2" opacity="0.3" />
        <path d="M300,105 Q320,85 340,103" fill="none" stroke="#2d5a3f" strokeWidth="2" opacity="0.3" />
        <path d="M500,95 Q520,75 540,93" fill="none" stroke="#2d5a3f" strokeWidth="2" opacity="0.3" />
        <path d="M700,100 Q720,80 740,98" fill="none" stroke="#2d5a3f" strokeWidth="2" opacity="0.3" />
        <path d="M900,105 Q920,85 940,103" fill="none" stroke="#2d5a3f" strokeWidth="2" opacity="0.25" />
        <path d="M1100,108 Q1120,88 1140,106" fill="none" stroke="#2d5a3f" strokeWidth="2" opacity="0.25" />
      </svg>

      {/* Detailed forest treeline */}
      <svg className="absolute bottom-[14%] w-full h-[26%]" viewBox="0 0 1440 260" preserveAspectRatio="none">
        <defs>
          <linearGradient id="forest-deep" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a4025" />
            <stop offset="50%" stopColor="#1e4d2b" />
            <stop offset="100%" stopColor="#2d5a3f" />
          </linearGradient>
        </defs>
        {/* Detailed tree silhouettes */}
        <path d="M0,260 L0,120
          C10,90 15,110 20,70 C25,100 30,80 35,95 C40,55 45,85 50,60 C55,90 60,70 65,85
          C70,45 75,75 80,50 C85,80 90,60 95,75 C100,35 105,65 110,40 C115,70 120,50 125,65
          C130,25 135,55 140,30 C145,60 150,40 155,55 C160,15 165,45 170,20 C175,50 180,30 185,45
          C190,5 195,35 200,10 C205,40 210,20 215,35 C220,0 225,25 230,5 C235,30 240,15 245,25
          C250,0 255,18 260,3 C265,22 270,10 275,18 C280,0 285,12 290,2 C295,15 300,8 305,12
          C310,0 315,8 320,1 C325,10 330,5 335,8 C340,0 345,5 350,1 C355,7 360,3 365,5
          C370,0 375,3 380,1 C385,5 390,2 395,4 C400,0 405,2 410,1 C415,3 420,1 425,2
          C430,0 435,1 440,0 C445,2 450,1 455,1 C460,0 465,1 470,0 C475,1 480,0 485,1
          C490,0 495,0 500,0 C505,1 510,0 515,0 C520,0 525,0 530,0
          C535,1 540,0 545,1 C550,0 555,1 560,0 C565,2 570,0 575,1 C580,0 585,1 590,0
          C595,2 600,1 605,2 C610,0 615,2 620,1 C625,3 630,1 635,2 C640,0 645,2 650,1
          C655,4 660,1 665,3 C670,0 675,3 680,1 C685,5 690,2 695,4 C700,0 705,4 710,2
          C715,6 720,2 725,5 C730,0 735,5 740,2 C745,8 750,3 755,6 C760,0 765,6 770,3
          C775,10 780,4 785,8 C790,0 795,8 800,4 C805,12 810,5 815,10 C820,0 825,10 830,5
          C835,15 840,6 845,12 C850,0 855,12 860,6 C865,18 870,8 875,15 C880,2 885,15 890,8
          C895,22 900,10 905,18 C910,3 915,18 920,10 C925,25 930,12 935,22 C940,5 945,22 950,12
          C955,30 960,15 965,26 C970,8 975,26 980,15 C985,35 990,18 995,30 C1000,10 1005,30 1010,18
          C1015,40 1020,22 1025,35 C1030,15 1035,35 1040,22 C1045,48 1050,28 1055,42 C1060,20 1065,42 1070,28
          C1075,55 1080,32 1085,48 C1090,25 1095,48 1100,35 C1105,60 1110,38 1115,55 C1120,30 1125,55 1130,40
          C1135,68 1140,45 1145,62 C1150,38 1155,62 1160,48 C1165,75 1170,52 1175,70 C1180,45 1185,70 1190,55
          C1195,82 1200,60 1205,78 C1210,52 1215,78 1220,62 C1225,90 1230,68 1235,85 C1240,60 1245,85 1250,70
          C1255,98 1260,75 1265,92 C1270,68 1275,92 1280,78 C1285,105 1290,82 1295,100 C1300,75 1305,100 1310,85
          C1315,112 1320,90 1325,108 C1330,82 1335,108 1340,92 C1345,118 1350,98 1355,115 C1360,90 1365,115 1370,100
          C1375,125 1380,105 1385,120 C1390,98 1395,120 1400,108 C1405,130 1410,112 1415,128 C1420,105 1425,128 1430,115
          C1435,135 1440,120 1440,120 L1440,260 Z" fill="url(#forest-deep)" />
      </svg>

      {/* Individual detailed trees - Left group */}
      <motion.div
        className="absolute bottom-[9%] left-[1%]"
        animate={{ rotate: [-0.3, 0.3, -0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: 'bottom center' }}
      >
        <svg width="140" height="230" viewBox="0 0 140 230">
          <defs>
            <linearGradient id="pine1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2d8a4e" />
              <stop offset="50%" stopColor="#236b3c" />
              <stop offset="100%" stopColor="#1a5030" />
            </linearGradient>
          </defs>
          <rect x="62" y="195" width="16" height="35" fill="#4a3728" />
          <path d="M70,0 L98,45 L88,45 L112,88 L98,88 L125,135 L108,135 L135,180 L5,180 L32,135 L15,135 L42,88 L28,88 L52,45 L42,45 Z" fill="url(#pine1)" />
          <path d="M70,0 L85,28 L76,28 L92,58 L82,58 L98,92 L70,92 Z" fill="#3d9955" opacity="0.35" />
        </svg>
      </motion.div>

      {/* Tree - Left 2 */}
      <motion.div
        className="absolute bottom-[9%] left-[8%]"
        animate={{ rotate: [0.2, -0.2, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        style={{ transformOrigin: 'bottom center' }}
      >
        <svg width="110" height="185" viewBox="0 0 110 185">
          <defs>
            <linearGradient id="pine2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34905a" />
              <stop offset="100%" stopColor="#1e5631" />
            </linearGradient>
          </defs>
          <rect x="48" y="158" width="14" height="27" fill="#5d4037" />
          <path d="M55,0 L82,40 L72,40 L95,78 L82,78 L108,125 L2,125 L28,78 L15,78 L38,40 L28,40 Z" fill="url(#pine2)" />
        </svg>
      </motion.div>

      {/* Tree - Left 3 (smaller, behind) */}
      <div className="absolute bottom-[10%] left-[5%]" style={{ opacity: 0.7 }}>
        <svg width="75" height="125" viewBox="0 0 75 125">
          <rect x="33" y="105" width="9" height="20" fill="#4a3728" />
          <path d="M37,0 L55,28 L48,28 L63,55 L55,55 L70,90 L4,90 L19,55 L11,55 L26,28 L19,28 Z" fill="#1e5631" />
        </svg>
      </div>

      {/* Tree - Left 4 */}
      <motion.div
        className="absolute bottom-[9%] left-[14%]"
        animate={{ rotate: [-0.2, 0.2, -0.2] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        style={{ transformOrigin: 'bottom center' }}
      >
        <svg width="95" height="160" viewBox="0 0 95 160">
          <rect x="42" y="138" width="11" height="22" fill="#5d4037" />
          <path d="M47,0 L72,35 L64,35 L85,70 L74,70 L95,110 L0,110 L21,70 L10,70 L31,35 L23,35 Z" fill="#236b3c" />
        </svg>
      </motion.div>

      {/* Tree - Left 5 (small background) */}
      <div className="absolute bottom-[11%] left-[11%]" style={{ opacity: 0.55 }}>
        <svg width="55" height="90" viewBox="0 0 55 90">
          <rect x="24" y="75" width="7" height="15" fill="#4a3728" />
          <path d="M27,0 L42,22 L37,22 L50,45 L42,45 L55,70 L0,70 L13,45 L5,45 L18,22 L13,22 Z" fill="#1a5030" />
        </svg>
      </div>

      {/* Tree - Center-left */}
      <motion.div
        className="absolute bottom-[9%] left-[20%]"
        animate={{ rotate: [0.15, -0.15, 0.15] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        style={{ transformOrigin: 'bottom center' }}
      >
        <svg width="85" height="145" viewBox="0 0 85 145">
          <rect x="37" y="125" width="11" height="20" fill="#5d4037" />
          <path d="M42,0 L65,32 L57,32 L78,65 L67,65 L85,100 L0,100 L18,65 L7,65 L28,32 L20,32 Z" fill="#2d7043" />
        </svg>
      </motion.div>

      {/* Tree - Right side large */}
      <motion.div
        className="absolute bottom-[9%] right-[2%]"
        animate={{ rotate: [0.3, -0.3, 0.3] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        style={{ transformOrigin: 'bottom center' }}
      >
        <svg width="135" height="225" viewBox="0 0 135 225">
          <defs>
            <linearGradient id="pine3" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3d9955" />
              <stop offset="50%" stopColor="#2d7043" />
              <stop offset="100%" stopColor="#1a5030" />
            </linearGradient>
          </defs>
          <rect x="60" y="192" width="15" height="33" fill="#4a3728" />
          <path d="M67,0 L98,50 L86,50 L115,98 L100,98 L130,150 L112,150 L135,198 L0,198 L23,150 L5,150 L35,98 L20,98 L49,50 L37,50 Z" fill="url(#pine3)" />
        </svg>
      </motion.div>

      {/* Tree - Right 2 */}
      <motion.div
        className="absolute bottom-[9%] right-[10%]"
        animate={{ rotate: [-0.25, 0.25, -0.25] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        style={{ transformOrigin: 'bottom center' }}
      >
        <svg width="100" height="170" viewBox="0 0 100 170">
          <defs>
            <linearGradient id="pine4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38a060" />
              <stop offset="100%" stopColor="#236b3c" />
            </linearGradient>
          </defs>
          <rect x="44" y="148" width="12" height="22" fill="#5d4037" />
          <path d="M50,0 L75,38 L66,38 L88,75 L76,75 L100,118 L0,118 L24,75 L12,75 L34,38 L25,38 Z" fill="url(#pine4)" />
        </svg>
      </motion.div>

      {/* Tree - Right 3 (behind) */}
      <div className="absolute bottom-[10%] right-[6%]" style={{ opacity: 0.65 }}>
        <svg width="70" height="115" viewBox="0 0 70 115">
          <rect x="30" y="95" width="10" height="20" fill="#4a3728" />
          <path d="M35,0 L52,28 L46,28 L60,55 L52,55 L68,85 L2,85 L18,55 L10,55 L24,28 L18,28 Z" fill="#1a5030" />
        </svg>
      </div>

      {/* Tree - Right 4 */}
      <motion.div
        className="absolute bottom-[9%] right-[17%]"
        animate={{ rotate: [0.2, -0.2, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        style={{ transformOrigin: 'bottom center' }}
      >
        <svg width="90" height="150" viewBox="0 0 90 150">
          <rect x="40" y="130" width="10" height="20" fill="#5d4037" />
          <path d="M45,0 L68,32 L60,32 L80,65 L70,65 L90,105 L0,105 L20,65 L10,65 L30,32 L22,32 Z" fill="#2d8a4e" />
        </svg>
      </motion.div>

      {/* Tree - Right 5 (small background) */}
      <div className="absolute bottom-[11%] right-[13%]" style={{ opacity: 0.5 }}>
        <svg width="50" height="85" viewBox="0 0 50 85">
          <rect x="22" y="70" width="6" height="15" fill="#4a3728" />
          <path d="M25,0 L38,20 L34,20 L45,40 L38,40 L50,65 L0,65 L12,40 L5,40 L16,20 L12,20 Z" fill="#1e5631" />
        </svg>
      </div>

      {/* Tree - Center-right */}
      <motion.div
        className="absolute bottom-[9%] right-[24%]"
        animate={{ rotate: [-0.15, 0.15, -0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        style={{ transformOrigin: 'bottom center' }}
      >
        <svg width="80" height="135" viewBox="0 0 80 135">
          <rect x="35" y="118" width="10" height="17" fill="#5d4037" />
          <path d="M40,0 L62,30 L54,30 L72,60 L62,60 L80,95 L0,95 L18,60 L8,60 L26,30 L18,30 Z" fill="#236b3c" />
        </svg>
      </motion.div>

      {/* Additional small trees scattered */}
      <div className="absolute bottom-[10%] left-[26%]" style={{ opacity: 0.6 }}>
        <svg width="60" height="100" viewBox="0 0 60 100">
          <rect x="26" y="85" width="8" height="15" fill="#4a3728" />
          <path d="M30,0 L45,25 L40,25 L52,50 L45,50 L60,80 L0,80 L15,50 L8,50 L20,25 L15,25 Z" fill="#1e5631" />
        </svg>
      </div>

      <div className="absolute bottom-[10%] right-[30%]" style={{ opacity: 0.55 }}>
        <svg width="55" height="92" viewBox="0 0 55 92">
          <rect x="24" y="78" width="7" height="14" fill="#4a3728" />
          <path d="M27,0 L42,23 L37,23 L48,46 L42,46 L55,74 L0,74 L13,46 L7,46 L18,23 L13,23 Z" fill="#1a5030" />
        </svg>
      </div>

      {/* Cozy Cabin in the meadow */}
      <div className="absolute bottom-[10%] left-[38%]" style={{ zIndex: 5 }}>
        <svg width="220" height="180" viewBox="0 0 220 180">
          <defs>
            {/* Wood gradient for walls */}
            <linearGradient id="cabin-wall" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B6914" />
              <stop offset="50%" stopColor="#6B4F0A" />
              <stop offset="100%" stopColor="#5a4208" />
            </linearGradient>
            {/* Darker wood for shadow side */}
            <linearGradient id="cabin-wall-dark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6B4F0A" />
              <stop offset="100%" stopColor="#4a3506" />
            </linearGradient>
            {/* Roof gradient */}
            <linearGradient id="cabin-roof" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5D4037" />
              <stop offset="50%" stopColor="#4E342E" />
              <stop offset="100%" stopColor="#3E2723" />
            </linearGradient>
            {/* Window glow */}
            <linearGradient id="window-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff9c4" />
              <stop offset="50%" stopColor="#ffecb3" />
              <stop offset="100%" stopColor="#ffe082" />
            </linearGradient>
            {/* Stone chimney */}
            <linearGradient id="chimney-stone" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#757575" />
              <stop offset="50%" stopColor="#616161" />
              <stop offset="100%" stopColor="#555555" />
            </linearGradient>
          </defs>

          {/* Foundation stones */}
          <rect x="35" y="155" width="150" height="12" rx="2" fill="#5a5a5a" />
          <ellipse cx="50" cy="161" rx="12" ry="5" fill="#6a6a6a" opacity="0.5" />
          <ellipse cx="90" cy="160" rx="10" ry="4" fill="#6a6a6a" opacity="0.5" />
          <ellipse cx="130" cy="161" rx="11" ry="5" fill="#6a6a6a" opacity="0.5" />
          <ellipse cx="165" cy="160" rx="9" ry="4" fill="#6a6a6a" opacity="0.5" />

          {/* Main cabin body - front wall */}
          <rect x="40" y="85" width="140" height="70" fill="url(#cabin-wall)" />

          {/* Wood plank texture on front */}
          <line x1="40" y1="95" x2="180" y2="95" stroke="#5a4208" strokeWidth="1" opacity="0.4" />
          <line x1="40" y1="108" x2="180" y2="108" stroke="#5a4208" strokeWidth="1" opacity="0.4" />
          <line x1="40" y1="121" x2="180" y2="121" stroke="#5a4208" strokeWidth="1" opacity="0.4" />
          <line x1="40" y1="134" x2="180" y2="134" stroke="#5a4208" strokeWidth="1" opacity="0.4" />
          <line x1="40" y1="147" x2="180" y2="147" stroke="#5a4208" strokeWidth="1" opacity="0.4" />

          {/* Side wall (darker - shadow) */}
          <polygon points="180,85 220,65 220,135 180,155" fill="url(#cabin-wall-dark)" />
          <line x1="180" y1="100" x2="220" y2="80" stroke="#3a2a04" strokeWidth="1" opacity="0.3" />
          <line x1="180" y1="120" x2="220" y2="100" stroke="#3a2a04" strokeWidth="1" opacity="0.3" />
          <line x1="180" y1="140" x2="220" y2="120" stroke="#3a2a04" strokeWidth="1" opacity="0.3" />

          {/* Roof - main front */}
          <polygon points="30,85 110,30 190,85" fill="url(#cabin-roof)" />
          {/* Roof - side */}
          <polygon points="190,85 110,30 150,10 230,65" fill="#3E2723" />
          {/* Roof edge highlight */}
          <line x1="30" y1="85" x2="110" y2="30" stroke="#6D4C41" strokeWidth="2" />
          <line x1="110" y1="30" x2="150" y2="10" stroke="#5D4037" strokeWidth="2" />

          {/* Roof texture lines */}
          <line x1="50" y1="75" x2="110" y2="38" stroke="#2a1a10" strokeWidth="1" opacity="0.3" />
          <line x1="70" y1="80" x2="110" y2="45" stroke="#2a1a10" strokeWidth="1" opacity="0.3" />
          <line x1="130" y1="68" x2="110" y2="38" stroke="#2a1a10" strokeWidth="1" opacity="0.3" />
          <line x1="150" y1="75" x2="110" y2="45" stroke="#2a1a10" strokeWidth="1" opacity="0.3" />

          {/* Chimney */}
          <rect x="140" y="15" width="22" height="40" fill="url(#chimney-stone)" />
          <rect x="137" y="12" width="28" height="6" fill="#616161" />
          {/* Chimney stone texture */}
          <line x1="140" y1="25" x2="162" y2="25" stroke="#4a4a4a" strokeWidth="1" opacity="0.5" />
          <line x1="140" y1="35" x2="162" y2="35" stroke="#4a4a4a" strokeWidth="1" opacity="0.5" />
          <line x1="140" y1="45" x2="162" y2="45" stroke="#4a4a4a" strokeWidth="1" opacity="0.5" />
          <line x1="151" y1="15" x2="151" y2="55" stroke="#4a4a4a" strokeWidth="1" opacity="0.4" />

          {/* Smoke from chimney */}
          <motion.ellipse
            cx="151"
            cy="5"
            rx="8"
            ry="5"
            fill="rgba(200,200,200,0.4)"
            animate={{
              cy: [5, -15, -35],
              rx: [8, 12, 18],
              ry: [5, 8, 12],
              opacity: [0.4, 0.25, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeOut' }}
          />
          <motion.ellipse
            cx="155"
            cy="8"
            rx="6"
            ry="4"
            fill="rgba(180,180,180,0.35)"
            animate={{
              cy: [8, -10, -30],
              rx: [6, 10, 15],
              ry: [4, 7, 10],
              opacity: [0.35, 0.2, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeOut', delay: 1.5 }}
          />

          {/* Door */}
          <rect x="95" y="115" width="30" height="40" rx="2" fill="#4a3506" />
          <rect x="98" y="118" width="24" height="34" rx="1" fill="#3a2a04" />
          {/* Door panels */}
          <rect x="101" y="121" width="8" height="13" fill="#4a3506" opacity="0.6" />
          <rect x="111" y="121" width="8" height="13" fill="#4a3506" opacity="0.6" />
          <rect x="101" y="137" width="8" height="13" fill="#4a3506" opacity="0.6" />
          <rect x="111" y="137" width="8" height="13" fill="#4a3506" opacity="0.6" />
          {/* Door handle */}
          <circle cx="118" cy="137" r="2.5" fill="#d4a84b" />

          {/* Front windows with warm glow */}
          <rect x="52" y="100" width="28" height="25" rx="2" fill="#3a2a04" />
          <rect x="55" y="103" width="22" height="19" fill="url(#window-glow)" />
          {/* Window cross frame */}
          <line x1="66" y1="103" x2="66" y2="122" stroke="#4a3506" strokeWidth="2" />
          <line x1="55" y1="112" x2="77" y2="112" stroke="#4a3506" strokeWidth="2" />

          <rect x="140" y="100" width="28" height="25" rx="2" fill="#3a2a04" />
          <rect x="143" y="103" width="22" height="19" fill="url(#window-glow)" />
          {/* Window cross frame */}
          <line x1="154" y1="103" x2="154" y2="122" stroke="#4a3506" strokeWidth="2" />
          <line x1="143" y1="112" x2="165" y2="112" stroke="#4a3506" strokeWidth="2" />

          {/* Attic window */}
          <circle cx="110" cy="60" r="12" fill="#3a2a04" />
          <circle cx="110" cy="60" r="9" fill="url(#window-glow)" />
          <line x1="110" y1="51" x2="110" y2="69" stroke="#4a3506" strokeWidth="2" />
          <line x1="101" y1="60" x2="119" y2="60" stroke="#4a3506" strokeWidth="2" />

          {/* Window light glow effect */}
          <ellipse cx="66" cy="112" rx="18" ry="15" fill="#fff9c4" opacity="0.15" filter="blur(8px)" />
          <ellipse cx="154" cy="112" rx="18" ry="15" fill="#fff9c4" opacity="0.15" filter="blur(8px)" />

          {/* Small porch roof overhang */}
          <polygon points="85,115 110,105 135,115" fill="#4E342E" />

          {/* Flower boxes under windows */}
          <rect x="50" y="127" width="32" height="6" fill="#5D4037" />
          <ellipse cx="56" cy="126" rx="4" ry="3" fill="#e57373" />
          <ellipse cx="66" cy="125" rx="4" ry="3" fill="#f06292" />
          <ellipse cx="76" cy="126" rx="4" ry="3" fill="#e57373" />

          <rect x="138" y="127" width="32" height="6" fill="#5D4037" />
          <ellipse cx="144" cy="126" rx="4" ry="3" fill="#ba68c8" />
          <ellipse cx="154" cy="125" rx="4" ry="3" fill="#f06292" />
          <ellipse cx="164" cy="126" rx="4" ry="3" fill="#ba68c8" />
        </svg>
      </div>

      {/* Boulders scattered in the middle - BIGGER and more detailed */}
      {/* Large boulder cluster - center left */}
      <div className="absolute bottom-[9%] left-[30%]">
        <svg width="120" height="75" viewBox="0 0 120 75">
          <defs>
            <linearGradient id="boulder1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8a8a8a" />
              <stop offset="40%" stopColor="#6a6a6a" />
              <stop offset="100%" stopColor="#4a4a4a" />
            </linearGradient>
            <linearGradient id="boulder1-highlight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a0a0a0" />
              <stop offset="100%" stopColor="#808080" />
            </linearGradient>
          </defs>
          {/* Main large boulder */}
          <ellipse cx="60" cy="50" rx="55" ry="28" fill="url(#boulder1)" />
          {/* Highlight */}
          <ellipse cx="50" cy="42" rx="35" ry="18" fill="url(#boulder1-highlight)" opacity="0.4" />
          {/* Texture cracks */}
          <path d="M25,45 Q40,38 55,48" fill="none" stroke="#3a3a3a" strokeWidth="1.5" opacity="0.4" />
          <path d="M60,35 Q75,42 70,55" fill="none" stroke="#3a3a3a" strokeWidth="1" opacity="0.3" />
          <path d="M85,48 Q95,45 100,52" fill="none" stroke="#3a3a3a" strokeWidth="1" opacity="0.3" />
          {/* Small attached boulder */}
          <ellipse cx="100" cy="58" rx="18" ry="12" fill="#5a5a5a" />
          <ellipse cx="97" cy="55" rx="10" ry="6" fill="#6a6a6a" opacity="0.5" />
        </svg>
      </div>

      {/* Medium boulder group - center */}
      <div className="absolute bottom-[9.2%] left-[44%]">
        <svg width="100" height="65" viewBox="0 0 100 65">
          <defs>
            <linearGradient id="boulder2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7d7d7d" />
              <stop offset="50%" stopColor="#5d5d5d" />
              <stop offset="100%" stopColor="#3d3d3d" />
            </linearGradient>
          </defs>
          {/* Main boulder */}
          <ellipse cx="50" cy="42" rx="45" ry="24" fill="url(#boulder2)" />
          <ellipse cx="42" cy="36" rx="28" ry="15" fill="#6d6d6d" opacity="0.45" />
          {/* Texture */}
          <path d="M20,40 Q35,32 50,42" fill="none" stroke="#3a3a3a" strokeWidth="1.5" opacity="0.35" />
          <path d="M55,30 Q68,38 65,50" fill="none" stroke="#3a3a3a" strokeWidth="1" opacity="0.3" />
          {/* Small boulder next to it */}
          <ellipse cx="85" cy="52" rx="14" ry="10" fill="#505050" />
        </svg>
      </div>

      {/* Boulder - right of center */}
      <div className="absolute bottom-[9.5%] left-[56%]">
        <svg width="85" height="55" viewBox="0 0 85 55">
          <defs>
            <linearGradient id="boulder3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#888888" />
              <stop offset="60%" stopColor="#606060" />
              <stop offset="100%" stopColor="#404040" />
            </linearGradient>
          </defs>
          <ellipse cx="42" cy="35" rx="40" ry="22" fill="url(#boulder3)" />
          <ellipse cx="35" cy="30" rx="25" ry="13" fill="#787878" opacity="0.4" />
          {/* Crack texture */}
          <path d="M18,32 Q30,26 42,35" fill="none" stroke="#383838" strokeWidth="1.2" opacity="0.35" />
          <path d="M50,25 Q62,32 58,42" fill="none" stroke="#383838" strokeWidth="1" opacity="0.3" />
        </svg>
      </div>

      {/* Large boulder group - right side */}
      <div className="absolute bottom-[9%] right-[32%]">
        <svg width="110" height="70" viewBox="0 0 110 70">
          <defs>
            <linearGradient id="boulder4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#858585" />
              <stop offset="50%" stopColor="#656565" />
              <stop offset="100%" stopColor="#454545" />
            </linearGradient>
          </defs>
          {/* Main boulder */}
          <ellipse cx="55" cy="45" rx="50" ry="26" fill="url(#boulder4)" />
          <ellipse cx="45" cy="38" rx="32" ry="16" fill="#757575" opacity="0.4" />
          {/* Texture */}
          <path d="M22,42 Q38,34 55,45" fill="none" stroke="#353535" strokeWidth="1.5" opacity="0.35" />
          <path d="M60,32 Q75,40 72,52" fill="none" stroke="#353535" strokeWidth="1" opacity="0.3" />
          {/* Small boulder */}
          <ellipse cx="95" cy="55" rx="14" ry="10" fill="#505050" />
        </svg>
      </div>

      {/* Medium boulder - far right */}
      <div className="absolute bottom-[9.3%] right-[38%]">
        <svg width="70" height="48" viewBox="0 0 70 48">
          <defs>
            <linearGradient id="boulder5" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7a7a7a" />
              <stop offset="100%" stopColor="#4a4a4a" />
            </linearGradient>
          </defs>
          <ellipse cx="35" cy="32" rx="32" ry="18" fill="url(#boulder5)" />
          <ellipse cx="30" cy="28" rx="20" ry="11" fill="#686868" opacity="0.4" />
          <path d="M15,30 Q25,24 38,32" fill="none" stroke="#3a3a3a" strokeWidth="1" opacity="0.35" />
        </svg>
      </div>

      {/* Small accent boulders */}
      <div className="absolute bottom-[10%] left-[38%]">
        <svg width="45" height="32" viewBox="0 0 45 32">
          <ellipse cx="22" cy="20" rx="20" ry="13" fill="#585858" />
          <ellipse cx="18" cy="17" rx="12" ry="7" fill="#686868" opacity="0.4" />
        </svg>
      </div>

      <div className="absolute bottom-[10.2%] left-[52%]">
        <svg width="38" height="28" viewBox="0 0 38 28">
          <ellipse cx="19" cy="18" rx="17" ry="11" fill="#525252" />
          <ellipse cx="16" cy="15" rx="10" ry="6" fill="#626262" opacity="0.4" />
        </svg>
      </div>

      <div className="absolute bottom-[10.5%] right-[44%]">
        <svg width="32" height="24" viewBox="0 0 32 24">
          <ellipse cx="16" cy="16" rx="14" ry="9" fill="#4e4e4e" />
          <ellipse cx="14" cy="14" rx="8" ry="5" fill="#5e5e5e" opacity="0.4" />
        </svg>
      </div>

      {/* Grass/meadow with more detail and texture */}
      <div className="absolute bottom-[10%] left-0 right-0 h-[6%]">
        <svg className="w-full h-full" viewBox="0 0 1440 60" preserveAspectRatio="none">
          <defs>
            <linearGradient id="grass-main" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5ca34d" />
              <stop offset="100%" stopColor="#4a8b3a" />
            </linearGradient>
            <linearGradient id="grass-light" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6db35d" />
              <stop offset="100%" stopColor="#5a9b4a" />
            </linearGradient>
            <linearGradient id="grass-dark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4a8b3a" />
              <stop offset="100%" stopColor="#3a7b2a" />
            </linearGradient>
          </defs>
          {/* Base grass */}
          <path d="M0,60 L0,30 Q15,22 30,30 Q45,15 60,28 Q75,18 90,30 Q105,10 120,26 Q135,18 150,30 Q165,12 180,28 Q195,20 210,32 Q225,14 240,28 Q255,20 270,32 Q285,12 300,26 Q315,18 330,30 Q345,10 360,26 Q375,18 390,30 Q405,14 420,28 Q435,20 450,32 Q465,12 480,28 Q495,18 510,30 Q525,14 540,28 Q555,20 570,32 Q585,12 600,28 Q615,18 630,30 Q645,14 660,28 Q675,20 690,32 Q705,12 720,28 Q735,18 750,30 Q765,14 780,28 Q795,20 810,32 Q825,12 840,28 Q855,18 870,30 Q885,14 900,28 Q915,20 930,32 Q945,12 960,28 Q975,18 990,30 Q1005,14 1020,28 Q1035,20 1050,32 Q1065,12 1080,28 Q1095,18 1110,30 Q1125,14 1140,28 Q1155,20 1170,32 Q1185,12 1200,28 Q1215,18 1230,30 Q1245,14 1260,28 Q1275,20 1290,32 Q1305,12 1320,28 Q1335,18 1350,30 Q1365,14 1380,28 Q1395,20 1410,32 Q1425,22 1440,30 L1440,60 Z" fill="url(#grass-main)" />
          {/* Highlighted grass tufts */}
          <path d="M80,32 Q92,16 104,30 Q116,22 128,34" fill="none" stroke="url(#grass-light)" strokeWidth="3" opacity="0.55" />
          <path d="M220,30 Q235,14 250,28 Q265,20 280,32" fill="none" stroke="url(#grass-light)" strokeWidth="3" opacity="0.5" />
          <path d="M380,28 Q395,12 410,26 Q425,18 440,30" fill="none" stroke="url(#grass-light)" strokeWidth="3" opacity="0.5" />
          <path d="M550,30 Q565,14 580,28 Q595,20 610,32" fill="none" stroke="url(#grass-light)" strokeWidth="3" opacity="0.5" />
          <path d="M720,28 Q735,12 750,26 Q765,18 780,30" fill="none" stroke="url(#grass-light)" strokeWidth="3" opacity="0.5" />
          <path d="M880,30 Q895,14 910,28 Q925,20 940,32" fill="none" stroke="url(#grass-light)" strokeWidth="3" opacity="0.5" />
          <path d="M1050,28 Q1065,12 1080,26 Q1095,18 1110,30" fill="none" stroke="url(#grass-light)" strokeWidth="3" opacity="0.5" />
          <path d="M1220,30 Q1235,14 1250,28 Q1265,20 1280,32" fill="none" stroke="url(#grass-light)" strokeWidth="3" opacity="0.5" />
          <path d="M1350,28 Q1365,12 1380,26 Q1395,18 1410,30" fill="none" stroke="url(#grass-light)" strokeWidth="3" opacity="0.5" />
          {/* Dark shadow grass tufts */}
          <path d="M150,35 Q162,25 174,35" fill="none" stroke="url(#grass-dark)" strokeWidth="2" opacity="0.4" />
          <path d="M320,33 Q332,23 344,33" fill="none" stroke="url(#grass-dark)" strokeWidth="2" opacity="0.4" />
          <path d="M490,35 Q502,25 514,35" fill="none" stroke="url(#grass-dark)" strokeWidth="2" opacity="0.4" />
          <path d="M660,33 Q672,23 684,33" fill="none" stroke="url(#grass-dark)" strokeWidth="2" opacity="0.4" />
          <path d="M830,35 Q842,25 854,35" fill="none" stroke="url(#grass-dark)" strokeWidth="2" opacity="0.4" />
          <path d="M1000,33 Q1012,23 1024,33" fill="none" stroke="url(#grass-dark)" strokeWidth="2" opacity="0.4" />
          <path d="M1170,35 Q1182,25 1194,35" fill="none" stroke="url(#grass-dark)" strokeWidth="2" opacity="0.4" />
        </svg>
      </div>

      {/* Rocky shoreline with pebbles */}
      <div className="absolute bottom-[9%] left-0 right-0 h-[3%]">
        <svg className="w-full h-full" viewBox="0 0 1440 30" preserveAspectRatio="none">
          <defs>
            <linearGradient id="shore" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6b8c5a" />
              <stop offset="100%" stopColor="#5a7a4a" />
            </linearGradient>
          </defs>
          <path d="M0,30 L0,15 Q40,8 80,15 Q120,5 160,12 Q200,8 240,15 Q280,3 320,12 Q360,8 400,14 Q440,5 480,12 Q520,8 560,15 Q600,4 640,13 Q680,8 720,14 Q760,5 800,12 Q840,8 880,15 Q920,4 960,12 Q1000,8 1040,14 Q1080,5 1120,12 Q1160,8 1200,15 Q1240,5 1280,13 Q1320,8 1360,14 Q1400,10 1440,15 L1440,30 Z" fill="url(#shore)" />
          {/* Pebbles on shoreline */}
          <ellipse cx="100" cy="18" rx="8" ry="4" fill="#5a6a4a" opacity="0.5" />
          <ellipse cx="250" cy="16" rx="6" ry="3" fill="#5a6a4a" opacity="0.5" />
          <ellipse cx="420" cy="17" rx="7" ry="4" fill="#5a6a4a" opacity="0.5" />
          <ellipse cx="580" cy="18" rx="5" ry="3" fill="#5a6a4a" opacity="0.5" />
          <ellipse cx="750" cy="16" rx="8" ry="4" fill="#5a6a4a" opacity="0.5" />
          <ellipse cx="920" cy="18" rx="6" ry="3" fill="#5a6a4a" opacity="0.5" />
          <ellipse cx="1100" cy="17" rx="7" ry="4" fill="#5a6a4a" opacity="0.5" />
          <ellipse cx="1280" cy="16" rx="5" ry="3" fill="#5a6a4a" opacity="0.5" />
        </svg>
      </div>

      {/* Wooden Sailboat on the lake */}
      <motion.div
        className="absolute bottom-[5%] left-[25%]"
        style={{ zIndex: 6 }}
        animate={{
          x: [0, 15, 0, -10, 0],
          rotate: [-1, 1, -1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="120" height="140" viewBox="0 0 120 140">
          <defs>
            <linearGradient id="boat-hull" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8B4513" />
              <stop offset="50%" stopColor="#6B3510" />
              <stop offset="100%" stopColor="#5a2a0a" />
            </linearGradient>
            <linearGradient id="sail-main" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fff8f0" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f5f0e8" />
            </linearGradient>
            <linearGradient id="sail-shadow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e8e0d8" />
              <stop offset="100%" stopColor="#d0c8c0" />
            </linearGradient>
          </defs>

          {/* Mast */}
          <rect x="58" y="15" width="4" height="110" fill="#5D4037" />

          {/* Main sail */}
          <motion.path
            d="M62,20 Q95,50 62,115"
            fill="url(#sail-main)"
            stroke="#d0c8c0"
            strokeWidth="1"
            animate={{
              d: [
                "M62,20 Q95,50 62,115",
                "M62,20 Q100,55 62,115",
                "M62,20 Q95,50 62,115",
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Sail detail lines */}
          <motion.path
            d="M62,40 Q82,55 62,75"
            fill="none"
            stroke="#e0d8d0"
            strokeWidth="1"
            opacity="0.6"
            animate={{
              d: [
                "M62,40 Q82,55 62,75",
                "M62,40 Q85,57 62,75",
                "M62,40 Q82,55 62,75",
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.path
            d="M62,55 Q78,68 62,90"
            fill="none"
            stroke="#e0d8d0"
            strokeWidth="1"
            opacity="0.5"
            animate={{
              d: [
                "M62,55 Q78,68 62,90",
                "M62,55 Q82,70 62,90",
                "M62,55 Q78,68 62,90",
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Jib sail (front sail) */}
          <motion.path
            d="M58,18 L58,70 L25,70 Z"
            fill="url(#sail-shadow)"
            stroke="#c8c0b8"
            strokeWidth="1"
            animate={{
              d: [
                "M58,18 L58,70 L25,70 Z",
                "M58,18 L58,70 L22,68 Z",
                "M58,18 L58,70 L25,70 Z",
              ]
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Boat hull */}
          <path d="M20,120 Q25,140 60,140 Q95,140 100,120 L90,120 Q85,130 60,130 Q35,130 30,120 Z" fill="url(#boat-hull)" />
          {/* Hull highlight */}
          <path d="M30,122 Q35,128 60,128 Q85,128 90,122" fill="none" stroke="#9B5523" strokeWidth="2" opacity="0.5" />
          {/* Hull planks */}
          <path d="M25,125 Q60,132 95,125" fill="none" stroke="#4a2508" strokeWidth="1" opacity="0.4" />

          {/* Deck */}
          <ellipse cx="60" cy="120" rx="38" ry="8" fill="#A0522D" />
          <ellipse cx="60" cy="119" rx="32" ry="6" fill="#B8763A" opacity="0.4" />

          {/* Flag on top */}
          <motion.path
            d="M60,15 L60,5 L75,10 L60,15"
            fill="#e74c3c"
            animate={{
              d: [
                "M60,15 L60,5 L75,10 L60,15",
                "M60,15 L60,5 L78,9 L60,15",
                "M60,15 L60,5 L75,10 L60,15",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Ropes */}
          <line x1="25" y1="70" x2="30" y2="120" stroke="#8B7355" strokeWidth="1" />
          <line x1="62" y1="20" x2="95" y2="120" stroke="#8B7355" strokeWidth="1" opacity="0.6" />
        </svg>
      </motion.div>

      {/* Small rowing boat on the right */}
      <motion.div
        className="absolute bottom-[4%] right-[20%]"
        style={{ zIndex: 6 }}
        animate={{
          x: [0, -8, 0, 5, 0],
          rotate: [0.5, -0.5, 0.5],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <svg width="80" height="45" viewBox="0 0 80 45">
          <defs>
            <linearGradient id="rowboat" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#A0522D" />
              <stop offset="100%" stopColor="#6B3510" />
            </linearGradient>
          </defs>
          {/* Boat hull */}
          <path d="M5,25 Q10,40 40,42 Q70,40 75,25 L68,25 Q62,35 40,36 Q18,35 12,25 Z" fill="url(#rowboat)" />
          {/* Inner boat */}
          <ellipse cx="40" cy="28" rx="28" ry="10" fill="#8B5A2B" />
          <ellipse cx="40" cy="27" rx="22" ry="7" fill="#A0724A" opacity="0.4" />
          {/* Seats */}
          <rect x="25" y="24" width="30" height="4" rx="1" fill="#6B4423" />
          <rect x="30" y="30" width="20" height="3" rx="1" fill="#6B4423" />
          {/* Oars */}
          <line x1="20" y1="28" x2="0" y2="18" stroke="#5D4037" strokeWidth="2" />
          <ellipse cx="0" cy="16" rx="5" ry="3" fill="#5D4037" transform="rotate(-20 0 16)" />
          <line x1="60" y1="28" x2="80" y2="18" stroke="#5D4037" strokeWidth="2" />
          <ellipse cx="80" cy="16" rx="5" ry="3" fill="#5D4037" transform="rotate(20 80 16)" />
        </svg>
      </motion.div>

      {/* Lily pads on the water */}
      <div className="absolute bottom-[2%] left-[8%]" style={{ zIndex: 7 }}>
        <motion.svg
          width="60" height="35" viewBox="0 0 60 35"
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ellipse cx="30" cy="20" rx="28" ry="14" fill="#228B22" />
          <ellipse cx="28" cy="18" rx="22" ry="10" fill="#2E8B2E" opacity="0.5" />
          {/* Notch in lily pad */}
          <path d="M30,6 L30,20 L42,12 Z" fill="#4a90a4" />
          {/* Veins */}
          <path d="M30,20 Q20,15 10,20" fill="none" stroke="#1a6b1a" strokeWidth="1" opacity="0.5" />
          <path d="M30,20 Q25,25 15,28" fill="none" stroke="#1a6b1a" strokeWidth="1" opacity="0.5" />
          <path d="M30,20 Q40,25 50,22" fill="none" stroke="#1a6b1a" strokeWidth="1" opacity="0.5" />
        </motion.svg>
      </div>

      <div className="absolute bottom-[3%] left-[12%]" style={{ zIndex: 7 }}>
        <motion.svg
          width="45" height="28" viewBox="0 0 45 28"
          animate={{ rotate: [1, -2, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <ellipse cx="22" cy="15" rx="20" ry="11" fill="#2E8B2E" />
          <ellipse cx="20" cy="14" rx="15" ry="8" fill="#3CB371" opacity="0.4" />
          <path d="M22,4 L22,15 L32,9 Z" fill="#4a90a4" />
          <path d="M22,15 Q14,12 8,16" fill="none" stroke="#1a6b1a" strokeWidth="1" opacity="0.5" />
        </motion.svg>
      </div>

      {/* Lily pad with pink flower */}
      <div className="absolute bottom-[2.5%] left-[15%]" style={{ zIndex: 7 }}>
        <motion.svg
          width="70" height="55" viewBox="0 0 70 55"
          animate={{ rotate: [-1, 1.5, -1] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <ellipse cx="35" cy="38" rx="32" ry="15" fill="#228B22" />
          <ellipse cx="33" cy="36" rx="25" ry="11" fill="#2E8B2E" opacity="0.5" />
          <path d="M35,23 L35,38 L48,30 Z" fill="#4a90a4" />
          <path d="M35,38 Q25,34 15,40" fill="none" stroke="#1a6b1a" strokeWidth="1" opacity="0.5" />
          <path d="M35,38 Q45,42 55,38" fill="none" stroke="#1a6b1a" strokeWidth="1" opacity="0.5" />
          {/* Lotus flower */}
          <ellipse cx="35" cy="18" rx="4" ry="6" fill="#FFB6C1" />
          <ellipse cx="28" cy="20" rx="4" ry="6" fill="#FFC0CB" transform="rotate(-30 28 20)" />
          <ellipse cx="42" cy="20" rx="4" ry="6" fill="#FFC0CB" transform="rotate(30 42 20)" />
          <ellipse cx="25" cy="24" rx="3" ry="5" fill="#FFD1DC" transform="rotate(-50 25 24)" />
          <ellipse cx="45" cy="24" rx="3" ry="5" fill="#FFD1DC" transform="rotate(50 45 24)" />
          <ellipse cx="35" cy="15" rx="3" ry="4" fill="#FF69B4" />
          <circle cx="35" cy="22" r="4" fill="#FFE4B5" />
        </motion.svg>
      </div>

      {/* More lily pads on right side */}
      <div className="absolute bottom-[1.5%] right-[12%]" style={{ zIndex: 7 }}>
        <motion.svg
          width="55" height="32" viewBox="0 0 55 32"
          animate={{ rotate: [2, -1, 2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        >
          <ellipse cx="28" cy="18" rx="25" ry="13" fill="#228B22" />
          <ellipse cx="26" cy="16" rx="19" ry="9" fill="#3CB371" opacity="0.4" />
          <path d="M28,5 L28,18 L40,11 Z" fill="#4a90a4" />
          <path d="M28,18 Q18,14 10,19" fill="none" stroke="#1a6b1a" strokeWidth="1" opacity="0.5" />
          <path d="M28,18 Q38,22 48,17" fill="none" stroke="#1a6b1a" strokeWidth="1" opacity="0.5" />
        </motion.svg>
      </div>

      <div className="absolute bottom-[2.8%] right-[8%]" style={{ zIndex: 7 }}>
        <motion.svg
          width="40" height="25" viewBox="0 0 40 25"
          animate={{ rotate: [-1.5, 1, -1.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        >
          <ellipse cx="20" cy="14" rx="18" ry="10" fill="#2E8B2E" />
          <ellipse cx="18" cy="13" rx="13" ry="7" fill="#3CB371" opacity="0.4" />
          <path d="M20,4 L20,14 L30,9 Z" fill="#4a90a4" />
        </motion.svg>
      </div>

      {/* Lily pad with white flower */}
      <div className="absolute bottom-[2%] right-[15%]" style={{ zIndex: 7 }}>
        <motion.svg
          width="65" height="50" viewBox="0 0 65 50"
          animate={{ rotate: [1, -1.5, 1] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        >
          <ellipse cx="32" cy="35" rx="30" ry="14" fill="#228B22" />
          <ellipse cx="30" cy="33" rx="23" ry="10" fill="#2E8B2E" opacity="0.5" />
          <path d="M32,21 L32,35 L45,27 Z" fill="#4a90a4" />
          <path d="M32,35 Q22,31 12,36" fill="none" stroke="#1a6b1a" strokeWidth="1" opacity="0.5" />
          {/* White lotus flower */}
          <ellipse cx="32" cy="16" rx="4" ry="6" fill="#FFFAFA" />
          <ellipse cx="25" cy="18" rx="4" ry="6" fill="#FFF5EE" transform="rotate(-35 25 18)" />
          <ellipse cx="39" cy="18" rx="4" ry="6" fill="#FFF5EE" transform="rotate(35 39 18)" />
          <ellipse cx="22" cy="22" rx="3" ry="5" fill="#FFFAF0" transform="rotate(-55 22 22)" />
          <ellipse cx="42" cy="22" rx="3" ry="5" fill="#FFFAF0" transform="rotate(55 42 22)" />
          <ellipse cx="32" cy="13" rx="3" ry="4" fill="#FFF8DC" />
          <circle cx="32" cy="19" r="3" fill="#FFD700" />
        </motion.svg>
      </div>

      {/* Small lily pad cluster in middle */}
      <div className="absolute bottom-[1.8%] left-[45%]" style={{ zIndex: 7 }}>
        <motion.svg
          width="35" height="22" viewBox="0 0 35 22"
          animate={{ rotate: [0.5, -1, 0.5] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        >
          <ellipse cx="17" cy="12" rx="15" ry="9" fill="#2E8B2E" />
          <path d="M17,3 L17,12 L26,7 Z" fill="#4a90a4" />
        </motion.svg>
      </div>

      <div className="absolute bottom-[2.2%] left-[48%]" style={{ zIndex: 7 }}>
        <motion.svg
          width="28" height="18" viewBox="0 0 28 18"
          animate={{ rotate: [-0.5, 1.5, -0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
        >
          <ellipse cx="14" cy="10" rx="12" ry="7" fill="#228B22" />
          <ellipse cx="13" cy="9" rx="8" ry="5" fill="#3CB371" opacity="0.4" />
          <path d="M14,3 L14,10 L22,6 Z" fill="#4a90a4" />
        </motion.svg>
      </div>

      {/* Lake/Water with realistic ripples */}
      <div className="absolute bottom-0 left-0 right-0 h-[12%] overflow-hidden">
        {/* Water base with depth gradient */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-sky-400/85 via-sky-500/80 to-sky-600/85" />
          {/* Depth variation */}
          <div className="absolute inset-0 bg-gradient-to-r from-sky-600/20 via-transparent to-sky-600/20" />
        </div>

        {/* Animated water surface texture */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'repeating-linear-gradient(90deg, transparent 0px, rgba(255,255,255,0.08) 80px, transparent 160px)',
          }}
          animate={{ x: [0, 160] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'repeating-linear-gradient(95deg, transparent 0px, rgba(255,255,255,0.05) 120px, transparent 240px)',
          }}
          animate={{ x: [0, -120] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />

        {/* Realistic water ripples - multiple layers */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="ripple-main" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="20%" stopColor="rgba(255,255,255,0.12)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.2)" />
              <stop offset="80%" stopColor="rgba(255,255,255,0.12)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
            <linearGradient id="ripple-subtle" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="30%" stopColor="rgba(255,255,255,0.08)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.12)" />
              <stop offset="70%" stopColor="rgba(255,255,255,0.08)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>

          {/* Large gentle waves */}
          <motion.ellipse
            cx="20%"
            cy="30%"
            rx="180"
            ry="6"
            fill="none"
            stroke="url(#ripple-main)"
            strokeWidth="2"
            animate={{ rx: [180, 250, 180], ry: [6, 8, 6], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.ellipse
            cx="50%"
            cy="45%"
            rx="200"
            ry="7"
            fill="none"
            stroke="url(#ripple-main)"
            strokeWidth="2"
            animate={{ rx: [200, 280, 200], ry: [7, 9, 7], opacity: [0.45, 0.15, 0.45] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          <motion.ellipse
            cx="75%"
            cy="35%"
            rx="160"
            ry="5"
            fill="none"
            stroke="url(#ripple-main)"
            strokeWidth="2"
            animate={{ rx: [160, 220, 160], ry: [5, 7, 5], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />

          {/* Medium ripples */}
          <motion.ellipse
            cx="35%"
            cy="55%"
            rx="120"
            ry="4"
            fill="none"
            stroke="url(#ripple-subtle)"
            strokeWidth="1.5"
            animate={{ rx: [120, 170, 120], opacity: [0.4, 0.1, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
          <motion.ellipse
            cx="65%"
            cy="60%"
            rx="140"
            ry="5"
            fill="none"
            stroke="url(#ripple-subtle)"
            strokeWidth="1.5"
            animate={{ rx: [140, 190, 140], opacity: [0.35, 0.1, 0.35] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          />
          <motion.ellipse
            cx="15%"
            cy="65%"
            rx="100"
            ry="4"
            fill="none"
            stroke="url(#ripple-subtle)"
            strokeWidth="1.5"
            animate={{ rx: [100, 140, 100], opacity: [0.4, 0.12, 0.4] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
          />
          <motion.ellipse
            cx="85%"
            cy="50%"
            rx="110"
            ry="4"
            fill="none"
            stroke="url(#ripple-subtle)"
            strokeWidth="1.5"
            animate={{ rx: [110, 155, 110], opacity: [0.38, 0.1, 0.38] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          />

          {/* Small detailed ripples */}
          <motion.ellipse
            cx="30%"
            cy="75%"
            rx="60"
            ry="3"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
            animate={{ rx: [60, 90, 60], opacity: [0.3, 0.08, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          />
          <motion.ellipse
            cx="55%"
            cy="80%"
            rx="70"
            ry="3"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
            animate={{ rx: [70, 100, 70], opacity: [0.25, 0.06, 0.25] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
          />
          <motion.ellipse
            cx="80%"
            cy="70%"
            rx="55"
            ry="2.5"
            fill="none"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="1"
            animate={{ rx: [55, 80, 55], opacity: [0.28, 0.07, 0.28] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 2.2 }}
          />
        </svg>

        {/* Sun reflection column on water - LEFT side now */}
        <motion.div
          className="absolute left-[6%] top-0 w-40 h-full"
          style={{
            background: 'linear-gradient(180deg, rgba(255,240,180,0.5) 0%, rgba(255,200,100,0.3) 25%, rgba(255,180,80,0.2) 50%, rgba(255,160,60,0.1) 75%, transparent 100%)',
          }}
          animate={{
            opacity: [0.5, 0.75, 0.5],
            scaleX: [1, 1.3, 1],
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Secondary sun reflection sparkles */}
        <motion.div
          className="absolute left-[8%] top-[10%] w-28 h-[80%]"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,200,0.25) 0%, transparent 100%)',
          }}
          animate={{ opacity: [0.25, 0.4, 0.25], x: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />

        {/* Shoreline reflection */}
        <div className="absolute inset-0 opacity-25"
          style={{
            background: 'linear-gradient(180deg, rgba(45,90,63,0.4) 0%, rgba(45,90,63,0.2) 30%, transparent 60%)',
          }}
        />
      </div>

      {/* Floating particles / pollen / dust motes */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${2 + (i % 4)}px`,
            height: `${2 + (i % 4)}px`,
            background: i % 3 === 0
              ? 'radial-gradient(circle, rgba(255,255,220,0.95) 0%, rgba(255,255,180,0.5) 50%, transparent 100%)'
              : 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
            left: `${3 + (i * 4.5)}%`,
            top: `${20 + (i % 6) * 10}%`,
            filter: 'blur(0.3px)',
          }}
          animate={{
            y: [0, -35 - (i % 4) * 12, 0],
            x: [0, (i % 2 === 0 ? 25 : -25) + (i % 3) * 5, 0],
            opacity: [0.3, 0.85, 0.3],
            scale: [0.7, 1.3, 0.7],
          }}
          transition={{
            duration: 5 + (i % 5),
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.25,
          }}
        />
      ))}

      {/* Birds flying - more realistic V formation */}
      <motion.svg
        className="absolute top-[18%] opacity-55"
        width="50"
        height="20"
        viewBox="0 0 50 20"
        animate={{
          x: [-60, typeof window !== 'undefined' ? window.innerWidth + 60 : 1500],
          y: [0, -25, 15, -20, 5, -10, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <path d="M0,10 Q6,4 12,10 Q18,4 25,10" fill="none" stroke="#2a2a2a" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8,14 Q12,10 16,14 Q20,10 25,14" fill="none" stroke="#3a3a3a" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M25,10 Q31,4 37,10 Q43,4 50,10" fill="none" stroke="#2a2a2a" strokeWidth="1.8" strokeLinecap="round" />
      </motion.svg>
      <motion.svg
        className="absolute top-[22%] opacity-45"
        width="35"
        height="15"
        viewBox="0 0 35 15"
        animate={{
          x: [-40, typeof window !== 'undefined' ? window.innerWidth + 40 : 1500],
          y: [0, -18, 10, -12, 0],
        }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear', delay: 8 }}
      >
        <path d="M0,8 Q5,3 10,8 Q15,3 20,8 Q25,3 35,8" fill="none" stroke="#3a3a3a" strokeWidth="1.5" strokeLinecap="round" />
      </motion.svg>
      <motion.svg
        className="absolute top-[15%] opacity-35"
        width="25"
        height="12"
        viewBox="0 0 25 12"
        animate={{
          x: [-30, typeof window !== 'undefined' ? window.innerWidth + 30 : 1500],
          y: [0, -12, 6, -8, 0],
        }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear', delay: 15 }}
      >
        <path d="M0,6 Q4,2 8,6 Q12,2 17,6 Q21,2 25,6" fill="none" stroke="#4a4a4a" strokeWidth="1.3" strokeLinecap="round" />
      </motion.svg>

      {/* Butterflies - more detailed */}
      <motion.div
        className="absolute top-[32%] left-[18%]"
        animate={{
          x: [0, 120, 60, 180, 30, 0],
          y: [0, -35, 25, -25, 15, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.svg width="24" height="20" viewBox="0 0 24 20"
          animate={{ scaleX: [1, 0.25, 1] }}
          transition={{ duration: 0.35, repeat: Infinity }}
        >
          <ellipse cx="6" cy="10" rx="6" ry="8" fill="rgba(255,180,80,0.75)" />
          <ellipse cx="18" cy="10" rx="6" ry="8" fill="rgba(255,180,80,0.75)" />
          <ellipse cx="6" cy="10" rx="4" ry="5" fill="rgba(255,140,60,0.5)" />
          <ellipse cx="18" cy="10" rx="4" ry="5" fill="rgba(255,140,60,0.5)" />
          <rect x="11" y="4" width="2" height="14" fill="#4a3728" rx="1" />
        </motion.svg>
      </motion.div>
      <motion.div
        className="absolute top-[40%] right-[25%]"
        animate={{
          x: [0, -80, -40, -100, 0],
          y: [0, -25, 15, -30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      >
        <motion.svg width="18" height="15" viewBox="0 0 18 15"
          animate={{ scaleX: [1, 0.2, 1] }}
          transition={{ duration: 0.3, repeat: Infinity }}
        >
          <ellipse cx="4.5" cy="7.5" rx="4.5" ry="6" fill="rgba(200,180,255,0.7)" />
          <ellipse cx="13.5" cy="7.5" rx="4.5" ry="6" fill="rgba(200,180,255,0.7)" />
          <rect x="8" y="3" width="2" height="11" fill="#4a3728" rx="1" />
        </motion.svg>
      </motion.div>

      {/* Dragonfly */}
      <motion.div
        className="absolute top-[28%] left-[40%]"
        animate={{
          x: [0, 200, 100, -50, 150, 0],
          y: [0, -40, 20, -30, 10, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      >
        <motion.svg width="30" height="12" viewBox="0 0 30 12"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          <ellipse cx="8" cy="6" rx="8" ry="2" fill="rgba(180,220,255,0.6)" />
          <ellipse cx="22" cy="6" rx="8" ry="2" fill="rgba(180,220,255,0.6)" />
          <rect x="5" y="5" width="20" height="2" fill="#2a5a6a" rx="1" />
        </motion.svg>
      </motion.div>

      {/* Lens flare effects - LEFT side now */}
      <motion.div
        className="absolute top-[8%] left-[10%] w-8 h-8 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 30%, transparent 70%)',
          filter: 'blur(1px)',
        }}
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.4, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[15%] left-[15%] w-5 h-5 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,240,200,0.7) 0%, transparent 70%)',
        }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      />
      <motion.div
        className="absolute top-[20%] left-[22%] w-10 h-10 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,220,150,0.3) 0%, transparent 70%)',
        }}
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.2, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />
      <motion.div
        className="absolute top-[28%] left-[5%] w-4 h-4 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,200,100,0.45) 0%, transparent 70%)',
        }}
        animate={{ opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Atmospheric haze at horizon */}
      <div className="absolute bottom-[10%] left-0 right-0 h-[8%] pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(200,220,240,0.15) 50%, rgba(180,200,220,0.25) 100%)',
        }}
      />
    </div>
  )
}

// Underwater Background Component
function UnderwaterBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden" style={{ zIndex: -10 }}>
      {/* Deep ocean gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-400 via-blue-600 to-blue-950" />

      {/* Light rays from surface */}
      <div className="absolute top-0 left-[10%] w-[300px] h-[60%] opacity-20"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)',
          clipPath: 'polygon(30% 0%, 70% 0%, 90% 100%, 10% 100%)',
          filter: 'blur(10px)',
        }}
      />
      <div className="absolute top-0 left-[35%] w-[250px] h-[55%] opacity-15"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 100%)',
          clipPath: 'polygon(25% 0%, 75% 0%, 85% 100%, 15% 100%)',
          filter: 'blur(8px)',
        }}
      />
      <div className="absolute top-0 right-[25%] w-[280px] h-[50%] opacity-18"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, transparent 100%)',
          clipPath: 'polygon(28% 0%, 72% 0%, 88% 100%, 12% 100%)',
          filter: 'blur(9px)',
        }}
      />
      <div className="absolute top-0 right-[5%] w-[200px] h-[45%] opacity-12"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 100%)',
          clipPath: 'polygon(20% 0%, 80% 0%, 95% 100%, 5% 100%)',
          filter: 'blur(6px)',
        }}
      />

      {/* Sandy ocean floor */}
      <div className="absolute bottom-0 left-0 right-0 h-[15%]">
        <svg className="w-full h-full" viewBox="0 0 1440 150" preserveAspectRatio="none">
          <defs>
            <linearGradient id="sand" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c4a574" />
              <stop offset="50%" stopColor="#b89860" />
              <stop offset="100%" stopColor="#a08050" />
            </linearGradient>
          </defs>
          <path d="M0,150 L0,60 Q60,40 120,55 Q180,30 240,50 Q300,25 360,45 Q420,20 480,40 Q540,15 600,38 Q660,22 720,42 Q780,18 840,40 Q900,25 960,45 Q1020,20 1080,42 Q1140,28 1200,48 Q1260,25 1320,45 Q1380,35 1440,50 L1440,150 Z" fill="url(#sand)" />
          {/* Sand ripples */}
          <path d="M100,80 Q200,70 300,82" fill="none" stroke="#9a8050" strokeWidth="2" opacity="0.3" />
          <path d="M400,75 Q500,65 600,78" fill="none" stroke="#9a8050" strokeWidth="2" opacity="0.3" />
          <path d="M700,82 Q800,72 900,85" fill="none" stroke="#9a8050" strokeWidth="2" opacity="0.3" />
          <path d="M1000,78 Q1100,68 1200,80" fill="none" stroke="#9a8050" strokeWidth="2" opacity="0.3" />
        </svg>
      </div>

      {/* Coral reef - left side */}
      <svg className="absolute bottom-[10%] left-[2%] w-[300px] h-[250px]" viewBox="0 0 300 250">
        <defs>
          <linearGradient id="coral-pink" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff6b9d" />
            <stop offset="100%" stopColor="#c44569" />
          </linearGradient>
          <linearGradient id="coral-orange" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff9a56" />
            <stop offset="100%" stopColor="#d4622a" />
          </linearGradient>
          <linearGradient id="coral-purple" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b47ede" />
            <stop offset="100%" stopColor="#8246af" />
          </linearGradient>
          <linearGradient id="coral-yellow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffd93d" />
            <stop offset="100%" stopColor="#d4aa00" />
          </linearGradient>
        </defs>
        {/* Brain coral */}
        <ellipse cx="80" cy="210" rx="50" ry="35" fill="url(#coral-pink)" />
        <path d="M45,200 Q60,190 75,200 Q90,190 105,200" fill="none" stroke="#ff8fb3" strokeWidth="3" opacity="0.6" />
        <path d="M50,210 Q65,200 80,210 Q95,200 110,210" fill="none" stroke="#ff8fb3" strokeWidth="3" opacity="0.6" />
        <path d="M55,220 Q70,210 85,220 Q100,210 115,220" fill="none" stroke="#ff8fb3" strokeWidth="3" opacity="0.6" />
        {/* Branching coral */}
        <path d="M150,250 L150,180 L130,140 M150,180 L170,130 M150,200 L125,170 M150,200 L180,160" fill="none" stroke="url(#coral-orange)" strokeWidth="8" strokeLinecap="round" />
        <circle cx="130" cy="140" r="8" fill="#ffb07a" />
        <circle cx="170" cy="130" r="8" fill="#ffb07a" />
        <circle cx="125" cy="170" r="6" fill="#ffb07a" />
        <circle cx="180" cy="160" r="7" fill="#ffb07a" />
        {/* Fan coral */}
        <path d="M220,250 Q220,180 200,140 M220,250 Q225,190 210,150 M220,250 Q230,185 220,145 M220,250 Q240,190 240,155 M220,250 Q250,200 260,170" fill="none" stroke="url(#coral-purple)" strokeWidth="4" strokeLinecap="round" />
        {/* Small yellow coral */}
        <ellipse cx="270" cy="230" rx="25" ry="18" fill="url(#coral-yellow)" />
        <ellipse cx="268" cy="225" rx="18" ry="12" fill="#ffe566" opacity="0.5" />
      </svg>

      {/* Coral reef - right side */}
      <svg className="absolute bottom-[10%] right-[3%] w-[280px] h-[220px]" viewBox="0 0 280 220">
        {/* Tube coral */}
        <path d="M50,220 L50,160 L45,120" fill="none" stroke="#e85d75" strokeWidth="12" strokeLinecap="round" />
        <path d="M70,220 L70,150 L75,100" fill="none" stroke="#e85d75" strokeWidth="12" strokeLinecap="round" />
        <path d="M90,220 L90,165 L85,130" fill="none" stroke="#e85d75" strokeWidth="12" strokeLinecap="round" />
        <circle cx="45" cy="120" r="10" fill="#ff8599" />
        <circle cx="75" cy="100" r="10" fill="#ff8599" />
        <circle cx="85" cy="130" r="10" fill="#ff8599" />
        {/* Green coral mound */}
        <ellipse cx="160" cy="195" rx="45" ry="30" fill="#3cb371" />
        <ellipse cx="155" cy="188" rx="30" ry="20" fill="#4cd787" opacity="0.5" />
        <path d="M125,190 Q140,175 155,190 Q170,175 185,190" fill="none" stroke="#2d9254" strokeWidth="2" opacity="0.5" />
        {/* Blue staghorn */}
        <path d="M230,220 L230,170 L210,130 M230,170 L250,120 M230,185 L215,155 M230,185 L255,145" fill="none" stroke="#4a9fff" strokeWidth="6" strokeLinecap="round" />
        <circle cx="210" cy="130" r="6" fill="#7ab8ff" />
        <circle cx="250" cy="120" r="6" fill="#7ab8ff" />
        <circle cx="215" cy="155" r="5" fill="#7ab8ff" />
        <circle cx="255" cy="145" r="5" fill="#7ab8ff" />
      </svg>

      {/* Kelp forest - left */}
      <motion.div
        className="absolute bottom-[8%] left-[15%]"
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: 'bottom center' }}
      >
        <svg width="60" height="350" viewBox="0 0 60 350">
          <defs>
            <linearGradient id="kelp1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2d5a27" />
              <stop offset="50%" stopColor="#3d7a37" />
              <stop offset="100%" stopColor="#2d5a27" />
            </linearGradient>
          </defs>
          <path d="M30,350 Q25,300 35,250 Q25,200 35,150 Q28,100 32,50 Q30,25 35,0" fill="none" stroke="url(#kelp1)" strokeWidth="8" strokeLinecap="round" />
          {/* Kelp leaves */}
          <ellipse cx="20" cy="280" rx="18" ry="8" fill="#4a8a44" transform="rotate(-20 20 280)" />
          <ellipse cx="45" cy="240" rx="16" ry="7" fill="#4a8a44" transform="rotate(25 45 240)" />
          <ellipse cx="18" cy="190" rx="15" ry="6" fill="#4a8a44" transform="rotate(-30 18 190)" />
          <ellipse cx="48" cy="140" rx="14" ry="6" fill="#4a8a44" transform="rotate(20 48 140)" />
          <ellipse cx="22" cy="90" rx="12" ry="5" fill="#4a8a44" transform="rotate(-25 22 90)" />
          <ellipse cx="42" cy="50" rx="10" ry="4" fill="#4a8a44" transform="rotate(15 42 50)" />
        </svg>
      </motion.div>

      {/* Kelp forest - left 2 */}
      <motion.div
        className="absolute bottom-[8%] left-[20%]"
        animate={{ rotate: [2, -2, 2] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        style={{ transformOrigin: 'bottom center' }}
      >
        <svg width="50" height="300" viewBox="0 0 50 300">
          <path d="M25,300 Q30,250 22,200 Q30,150 25,100 Q28,50 25,0" fill="none" stroke="#3d7a37" strokeWidth="7" strokeLinecap="round" />
          <ellipse cx="38" cy="240" rx="15" ry="6" fill="#5a9a54" transform="rotate(30 38 240)" />
          <ellipse cx="12" cy="190" rx="14" ry="6" fill="#5a9a54" transform="rotate(-25 12 190)" />
          <ellipse cx="40" cy="130" rx="12" ry="5" fill="#5a9a54" transform="rotate(20 40 130)" />
          <ellipse cx="15" cy="70" rx="10" ry="4" fill="#5a9a54" transform="rotate(-20 15 70)" />
        </svg>
      </motion.div>

      {/* Kelp forest - right */}
      <motion.div
        className="absolute bottom-[8%] right-[18%]"
        animate={{ rotate: [-3, 3, -3] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        style={{ transformOrigin: 'bottom center' }}
      >
        <svg width="55" height="320" viewBox="0 0 55 320">
          <path d="M28,320 Q22,270 32,220 Q25,170 30,120 Q27,70 30,20 Q28,0 30,0" fill="none" stroke="#3d7a37" strokeWidth="7" strokeLinecap="round" />
          <ellipse cx="15" cy="260" rx="16" ry="7" fill="#4a8a44" transform="rotate(-25 15 260)" />
          <ellipse cx="42" cy="210" rx="15" ry="6" fill="#4a8a44" transform="rotate(30 42 210)" />
          <ellipse cx="12" cy="160" rx="14" ry="6" fill="#4a8a44" transform="rotate(-30 12 160)" />
          <ellipse cx="45" cy="100" rx="12" ry="5" fill="#4a8a44" transform="rotate(25 45 100)" />
          <ellipse cx="18" cy="50" rx="10" ry="4" fill="#4a8a44" transform="rotate(-20 18 50)" />
        </svg>
      </motion.div>

      {/* Kelp forest - right 2 */}
      <motion.div
        className="absolute bottom-[8%] right-[12%]"
        animate={{ rotate: [2, -3, 2] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        style={{ transformOrigin: 'bottom center' }}
      >
        <svg width="45" height="280" viewBox="0 0 45 280">
          <path d="M22,280 Q28,230 20,180 Q26,130 22,80 Q24,40 22,0" fill="none" stroke="#2d6a27" strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="35" cy="220" rx="14" ry="6" fill="#4a8a44" transform="rotate(28 35 220)" />
          <ellipse cx="10" cy="170" rx="13" ry="5" fill="#4a8a44" transform="rotate(-22 10 170)" />
          <ellipse cx="38" cy="110" rx="11" ry="5" fill="#4a8a44" transform="rotate(18 38 110)" />
          <ellipse cx="12" cy="55" rx="9" ry="4" fill="#4a8a44" transform="rotate(-15 12 55)" />
        </svg>
      </motion.div>

      {/* Tropical fish - school 1 */}
      <motion.div
        className="absolute top-[25%]"
        animate={{
          x: [typeof window !== 'undefined' ? window.innerWidth + 100 : 1600, -150],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <svg width="120" height="80" viewBox="0 0 120 80">
          {/* Fish 1 - Orange */}
          <g transform="translate(0, 10)">
            <ellipse cx="30" cy="20" rx="22" ry="12" fill="#ff9a3c" />
            <polygon points="52,20 65,10 65,30" fill="#ff7a1c" />
            <polygon points="20,8 30,15 20,18" fill="#ff7a1c" />
            <polygon points="20,22 30,25 20,32" fill="#ff7a1c" />
            <circle cx="18" cy="18" r="4" fill="white" />
            <circle cx="17" cy="18" r="2" fill="black" />
            <path d="M25,15 Q35,12 40,20" fill="none" stroke="#ffb060" strokeWidth="2" />
          </g>
          {/* Fish 2 - Yellow */}
          <g transform="translate(40, 40)">
            <ellipse cx="25" cy="18" rx="18" ry="10" fill="#ffd93d" />
            <polygon points="43,18 54,10 54,26" fill="#e6c235" />
            <polygon points="15,8 23,13 15,16" fill="#e6c235" />
            <circle cx="14" cy="16" r="3" fill="white" />
            <circle cx="13" cy="16" r="1.5" fill="black" />
          </g>
          {/* Fish 3 - Orange small */}
          <g transform="translate(70, 5)">
            <ellipse cx="20" cy="15" rx="15" ry="9" fill="#ff8c42" />
            <polygon points="35,15 45,8 45,22" fill="#e67332" />
            <circle cx="12" cy="13" r="2.5" fill="white" />
            <circle cx="11" cy="13" r="1.2" fill="black" />
          </g>
        </svg>
      </motion.div>

      {/* Tropical fish - school 2 (blue) */}
      <motion.div
        className="absolute top-[45%]"
        animate={{
          x: [-100, typeof window !== 'undefined' ? window.innerWidth + 100 : 1600],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      >
        <svg width="140" height="90" viewBox="0 0 140 90">
          {/* Blue tang style fish */}
          <g transform="translate(0, 20)">
            <ellipse cx="35" cy="22" rx="28" ry="18" fill="#2196f3" />
            <polygon points="63,22 80,8 80,36" fill="#1976d2" />
            <polygon points="18,10 30,18 18,22" fill="#1976d2" />
            <circle cx="20" cy="20" r="5" fill="white" />
            <circle cx="19" cy="20" r="2.5" fill="black" />
            <path d="M30,15 Q45,10 55,22" fill="none" stroke="#0d47a1" strokeWidth="3" />
            <ellipse cx="55" cy="22" rx="4" ry="8" fill="#ffd93d" />
          </g>
          {/* Second blue fish */}
          <g transform="translate(60, 50)">
            <ellipse cx="28" cy="18" rx="22" ry="14" fill="#42a5f5" />
            <polygon points="50,18 64,8 64,28" fill="#1e88e5" />
            <circle cx="16" cy="16" r="4" fill="white" />
            <circle cx="15" cy="16" r="2" fill="black" />
            <path d="M25,12 Q38,8 45,18" fill="none" stroke="#0d47a1" strokeWidth="2" />
          </g>
          {/* Small blue fish */}
          <g transform="translate(100, 10)">
            <ellipse cx="20" cy="15" rx="16" ry="10" fill="#64b5f6" />
            <polygon points="36,15 48,8 48,22" fill="#42a5f5" />
            <circle cx="12" cy="13" r="3" fill="white" />
            <circle cx="11" cy="13" r="1.5" fill="black" />
          </g>
        </svg>
      </motion.div>

      {/* Clownfish */}
      <motion.div
        className="absolute top-[60%] left-[25%]"
        animate={{
          x: [0, 30, 0, -20, 0],
          y: [0, -15, 5, -10, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="50" height="35" viewBox="0 0 50 35">
          <ellipse cx="25" cy="17" rx="20" ry="13" fill="#ff6b35" />
          <polygon points="45,17 55,10 55,24" fill="#e55a2b" />
          <polygon points="15,7 22,12 15,15" fill="#e55a2b" />
          <polygon points="15,19 22,22 15,27" fill="#e55a2b" />
          {/* White stripes */}
          <path d="M15,5 Q15,17 15,30" fill="none" stroke="white" strokeWidth="4" />
          <path d="M30,3 Q28,17 30,32" fill="none" stroke="white" strokeWidth="3" />
          <circle cx="10" cy="15" r="4" fill="white" />
          <circle cx="9" cy="15" r="2" fill="black" />
        </svg>
      </motion.div>

      {/* Sea turtle */}
      <motion.div
        className="absolute top-[30%]"
        animate={{
          x: [-200, typeof window !== 'undefined' ? window.innerWidth + 200 : 1800],
          y: [0, -30, 20, -20, 0],
        }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
      >
        <svg width="120" height="80" viewBox="0 0 120 80">
          {/* Shell */}
          <ellipse cx="60" cy="45" rx="40" ry="28" fill="#5d8a4a" />
          <ellipse cx="60" cy="42" rx="32" ry="22" fill="#6d9a5a" />
          {/* Shell pattern */}
          <path d="M40,35 Q60,25 80,35" fill="none" stroke="#4a7a3a" strokeWidth="2" />
          <path d="M35,45 Q60,35 85,45" fill="none" stroke="#4a7a3a" strokeWidth="2" />
          <path d="M40,55 Q60,45 80,55" fill="none" stroke="#4a7a3a" strokeWidth="2" />
          <line x1="60" y1="25" x2="60" y2="65" stroke="#4a7a3a" strokeWidth="2" />
          {/* Head */}
          <ellipse cx="105" cy="40" rx="15" ry="10" fill="#7aaa6a" />
          <circle cx="112" cy="37" r="3" fill="black" />
          {/* Flippers */}
          <ellipse cx="30" cy="30" rx="18" ry="8" fill="#6d9a5a" transform="rotate(-30 30 30)" />
          <ellipse cx="30" cy="60" rx="18" ry="8" fill="#6d9a5a" transform="rotate(30 30 60)" />
          <ellipse cx="85" cy="25" rx="14" ry="6" fill="#6d9a5a" transform="rotate(-20 85 25)" />
          <ellipse cx="85" cy="65" rx="14" ry="6" fill="#6d9a5a" transform="rotate(20 85 65)" />
        </svg>
      </motion.div>

      {/* Jellyfish */}
      <motion.div
        className="absolute top-[15%] right-[30%]"
        animate={{
          y: [0, 30, 0],
          x: [0, 15, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="60" height="100" viewBox="0 0 60 100">
          <defs>
            <linearGradient id="jelly" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,150,200,0.8)" />
              <stop offset="100%" stopColor="rgba(200,100,180,0.4)" />
            </linearGradient>
          </defs>
          {/* Bell */}
          <ellipse cx="30" cy="25" rx="25" ry="22" fill="url(#jelly)" />
          <ellipse cx="30" cy="22" rx="18" ry="15" fill="rgba(255,200,230,0.4)" />
          {/* Tentacles */}
          <motion.path
            d="M15,45 Q12,60 18,75 Q12,90 15,100"
            fill="none"
            stroke="rgba(255,150,200,0.6)"
            strokeWidth="2"
            animate={{ d: ["M15,45 Q12,60 18,75 Q12,90 15,100", "M15,45 Q18,60 12,75 Q18,90 15,100", "M15,45 Q12,60 18,75 Q12,90 15,100"] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.path
            d="M25,47 Q22,65 28,80 Q22,95 25,100"
            fill="none"
            stroke="rgba(255,150,200,0.6)"
            strokeWidth="2"
            animate={{ d: ["M25,47 Q22,65 28,80 Q22,95 25,100", "M25,47 Q28,65 22,80 Q28,95 25,100", "M25,47 Q22,65 28,80 Q22,95 25,100"] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: 0.3 }}
          />
          <motion.path
            d="M35,47 Q32,65 38,80 Q32,95 35,100"
            fill="none"
            stroke="rgba(255,150,200,0.6)"
            strokeWidth="2"
            animate={{ d: ["M35,47 Q32,65 38,80 Q32,95 35,100", "M35,47 Q38,65 32,80 Q38,95 35,100", "M35,47 Q32,65 38,80 Q32,95 35,100"] }}
            transition={{ duration: 2.1, repeat: Infinity, delay: 0.5 }}
          />
          <motion.path
            d="M45,45 Q42,60 48,75 Q42,90 45,100"
            fill="none"
            stroke="rgba(255,150,200,0.6)"
            strokeWidth="2"
            animate={{ d: ["M45,45 Q42,60 48,75 Q42,90 45,100", "M45,45 Q48,60 42,75 Q48,90 45,100", "M45,45 Q42,60 48,75 Q42,90 45,100"] }}
            transition={{ duration: 1.9, repeat: Infinity, delay: 0.2 }}
          />
        </svg>
      </motion.div>

      {/* Second jellyfish */}
      <motion.div
        className="absolute top-[35%] left-[40%]"
        animate={{
          y: [0, -25, 0],
          x: [0, -10, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      >
        <svg width="45" height="80" viewBox="0 0 45 80">
          <ellipse cx="22" cy="20" rx="20" ry="18" fill="rgba(150,200,255,0.7)" />
          <ellipse cx="22" cy="18" rx="14" ry="12" fill="rgba(200,230,255,0.4)" />
          <path d="M10,36 Q7,50 12,65 Q7,75 10,80" fill="none" stroke="rgba(150,200,255,0.5)" strokeWidth="2" />
          <path d="M18,38 Q15,52 20,68 Q15,76 18,80" fill="none" stroke="rgba(150,200,255,0.5)" strokeWidth="2" />
          <path d="M27,38 Q24,52 29,68 Q24,76 27,80" fill="none" stroke="rgba(150,200,255,0.5)" strokeWidth="2" />
          <path d="M35,36 Q32,50 37,65 Q32,75 35,80" fill="none" stroke="rgba(150,200,255,0.5)" strokeWidth="2" />
        </svg>
      </motion.div>

      {/* Bubbles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`bubble-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${8 + (i % 5) * 4}px`,
            height: `${8 + (i % 5) * 4}px`,
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(255,255,255,0.2))',
            border: '1px solid rgba(255,255,255,0.3)',
            left: `${5 + (i * 4.5)}%`,
            bottom: '10%',
          }}
          animate={{
            y: [0, -800 - (i % 4) * 100],
            x: [0, (i % 2 === 0 ? 30 : -30), (i % 2 === 0 ? -20 : 20), 0],
            opacity: [0.7, 0.5, 0.3, 0],
            scale: [1, 1.2, 1.4, 1.5],
          }}
          transition={{
            duration: 8 + (i % 5) * 2,
            repeat: Infinity,
            ease: 'easeOut',
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Starfish on sand */}
      <svg className="absolute bottom-[8%] left-[35%] w-[50px] h-[50px]" viewBox="0 0 50 50">
        <polygon points="25,5 29,18 43,18 32,27 36,42 25,33 14,42 18,27 7,18 21,18" fill="#ff6b6b" />
        <polygon points="25,10 28,18 38,18 30,25 33,37 25,30 17,37 20,25 12,18 22,18" fill="#ff8a8a" opacity="0.5" />
      </svg>

      {/* Another starfish */}
      <svg className="absolute bottom-[9%] right-[28%] w-[40px] h-[40px]" viewBox="0 0 40 40">
        <polygon points="20,4 23,14 34,14 26,21 29,33 20,26 11,33 14,21 6,14 17,14" fill="#ffa64d" />
        <polygon points="20,8 22,14 30,14 24,19 26,28 20,23 14,28 16,19 10,14 18,14" fill="#ffb870" opacity="0.5" />
      </svg>

      {/* Seashells */}
      <svg className="absolute bottom-[7%] left-[55%] w-[35px] h-[25px]" viewBox="0 0 35 25">
        <path d="M5,25 Q5,10 17,5 Q30,10 30,25 Z" fill="#f5deb3" />
        <path d="M8,22 Q10,12 17,8 Q25,12 27,22" fill="none" stroke="#d4b896" strokeWidth="1" />
        <path d="M11,20 Q12,14 17,11 Q22,14 24,20" fill="none" stroke="#d4b896" strokeWidth="1" />
      </svg>

      {/* Small seashell */}
      <svg className="absolute bottom-[8%] right-[45%] w-[25px] h-[20px]" viewBox="0 0 25 20">
        <ellipse cx="12" cy="12" rx="10" ry="8" fill="#ffe4c4" />
        <path d="M5,12 Q12,5 20,12" fill="none" stroke="#dcc4a4" strokeWidth="1" />
        <path d="M7,14 Q12,8 18,14" fill="none" stroke="#dcc4a4" strokeWidth="1" />
      </svg>

      {/* Underwater particles/debris */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full bg-white/20"
          style={{
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            left: `${(i * 6.5)}%`,
            top: `${20 + (i % 6) * 12}%`,
          }}
          animate={{
            y: [0, 50, 0],
            x: [0, (i % 2 === 0 ? 20 : -20), 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6 + (i % 4),
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  )
}

// Animated text reveal
function AnimatedText({ children, delay = 0 }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="inline-block"
    >
      {children}
    </motion.span>
  )
}

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const experienceSectionRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!experienceSectionRef.current) return

      const experienceSection = experienceSectionRef.current
      const rect = experienceSection.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Start transition when experience section enters viewport
      // Complete transition when it's fully in view
      const startOffset = windowHeight * 0.8
      const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / startOffset))

      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate the water level position (100% = top of screen, 0% = bottom)
  const waterLevel = 100 - (scrollProgress * 100)

  return (
    <div className="min-h-screen text-gray-900 antialiased overflow-x-hidden">
      {/* Underwater Background - always visible but clipped from bottom */}
      <div
        className="fixed inset-0"
        style={{
          clipPath: `inset(${waterLevel}% 0 0 0)`,
          zIndex: -9,
        }}
      >
        <UnderwaterBackground />
      </div>

      {/* Water surface effect - the diving line */}
      {scrollProgress > 0 && scrollProgress < 1 && (
        <div
          className="fixed left-0 right-0 pointer-events-none"
          style={{
            top: `${waterLevel}%`,
            zIndex: -8,
            transform: 'translateY(-50%)',
          }}
        >
          {/* Water surface with wave effect */}
          <svg className="w-full h-24" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="water-surface" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
                <stop offset="30%" stopColor="rgba(150,220,255,0.4)" />
                <stop offset="100%" stopColor="rgba(50,150,200,0.2)" />
              </linearGradient>
              <linearGradient id="water-line" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                <stop offset="100%" stopColor="rgba(200,240,255,0.5)" />
              </linearGradient>
            </defs>
            {/* Wavy water surface */}
            <motion.path
              d="M0,50 Q60,30 120,50 Q180,70 240,50 Q300,30 360,50 Q420,70 480,50 Q540,30 600,50 Q660,70 720,50 Q780,30 840,50 Q900,70 960,50 Q1020,30 1080,50 Q1140,70 1200,50 Q1260,30 1320,50 Q1380,70 1440,50 L1440,100 L0,100 Z"
              fill="url(#water-surface)"
              animate={{
                d: [
                  "M0,50 Q60,30 120,50 Q180,70 240,50 Q300,30 360,50 Q420,70 480,50 Q540,30 600,50 Q660,70 720,50 Q780,30 840,50 Q900,70 960,50 Q1020,30 1080,50 Q1140,70 1200,50 Q1260,30 1320,50 Q1380,70 1440,50 L1440,100 L0,100 Z",
                  "M0,50 Q60,70 120,50 Q180,30 240,50 Q300,70 360,50 Q420,30 480,50 Q540,70 600,50 Q660,30 720,50 Q780,70 840,50 Q900,30 960,50 Q1020,70 1080,50 Q1140,30 1200,50 Q1260,70 1320,50 Q1380,30 1440,50 L1440,100 L0,100 Z",
                  "M0,50 Q60,30 120,50 Q180,70 240,50 Q300,30 360,50 Q420,70 480,50 Q540,30 600,50 Q660,70 720,50 Q780,30 840,50 Q900,70 960,50 Q1020,30 1080,50 Q1140,70 1200,50 Q1260,30 1320,50 Q1380,70 1440,50 L1440,100 L0,100 Z"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Bright water line */}
            <motion.path
              d="M0,48 Q60,28 120,48 Q180,68 240,48 Q300,28 360,48 Q420,68 480,48 Q540,28 600,48 Q660,68 720,48 Q780,28 840,48 Q900,68 960,48 Q1020,28 1080,48 Q1140,68 1200,48 Q1260,28 1320,48 Q1380,68 1440,48"
              fill="none"
              stroke="url(#water-line)"
              strokeWidth="4"
              animate={{
                d: [
                  "M0,48 Q60,28 120,48 Q180,68 240,48 Q300,28 360,48 Q420,68 480,48 Q540,28 600,48 Q660,68 720,48 Q780,28 840,48 Q900,68 960,48 Q1020,28 1080,48 Q1140,68 1200,48 Q1260,28 1320,48 Q1380,68 1440,48",
                  "M0,48 Q60,68 120,48 Q180,28 240,48 Q300,68 360,48 Q420,28 480,48 Q540,68 600,48 Q660,28 720,48 Q780,68 840,48 Q900,28 960,48 Q1020,68 1080,48 Q1140,28 1200,48 Q1260,68 1320,48 Q1380,28 1440,48",
                  "M0,48 Q60,28 120,48 Q180,68 240,48 Q300,28 360,48 Q420,68 480,48 Q540,28 600,48 Q660,68 720,48 Q780,28 840,48 Q900,68 960,48 Q1020,28 1080,48 Q1140,68 1200,48 Q1260,28 1320,48 Q1380,68 1440,48"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
          {/* Light refraction effect above water line */}
          <div
            className="absolute -top-8 left-0 right-0 h-8"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(150,220,255,0.15) 100%)',
            }}
          />
          {/* Bubbles at the water line */}
          <div className="absolute -top-4 left-0 right-0">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/50"
                style={{
                  width: `${6 + (i % 3) * 3}px`,
                  height: `${6 + (i % 3) * 3}px`,
                  left: `${10 + i * 12}%`,
                }}
                animate={{
                  y: [-10, -30, -10],
                  opacity: [0.6, 0.3, 0.6],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Nature Background - visible above water */}
      <div
        className="fixed inset-0"
        style={{
          clipPath: `inset(0 0 ${100 - waterLevel}% 0)`,
          zIndex: -10,
        }}
      >
        <NatureBackground />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text content */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative p-8 md:p-10 rounded-3xl bg-white/20 border border-white/30 backdrop-blur-md shadow-2xl shadow-black/5 overflow-hidden"
              >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/10 pointer-events-none" />

                {/* Top decorative line */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-emerald-400/10 to-transparent rounded-tl-3xl" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-cyan-400/10 to-transparent rounded-br-3xl" />

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-gray-600 text-lg mb-4 font-light tracking-wide"
                >
                  hey, i'm
                </motion.p>

                <h1 className="mb-6">
                  <AnimatedText delay={0.3}>
                    <span className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900">
                      kevin lee
                    </span>
                  </AnimatedText>
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-xl md:text-2xl font-light mb-10 text-gray-700"
                >
                  i build stuff that works.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="flex flex-wrap gap-4 justify-center lg:justify-start"
                >
                  <MagneticButton
                    href="mailto:kevinlee1@berkeley.edu"
                    className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full overflow-hidden shadow-lg"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
                    <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative flex items-center gap-2 text-white font-semibold">
                      <FiMail className="w-4 h-4" />
                      get in touch
                      <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </MagneticButton>

                  <MagneticButton
                    href="https://linkedin.com/in/kevinlee33"
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/80 backdrop-blur-sm border border-white/60 hover:bg-white/95 hover:border-white/90 transition-all duration-300 shadow-md text-gray-700 hover:text-gray-900"
                  >
                    <FiLinkedin className="w-4 h-4" />
                    linkedin
                  </MagneticButton>
                </motion.div>
              </motion.div>
            </div>

            {/* Right: Portrait with Flip Effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <div className="relative group" style={{ perspective: '1000px' }}>
                {/* Flip card container */}
                <div
                  className="relative w-72 h-96 md:w-80 md:h-[440px] transition-transform duration-700 ease-in-out group-hover:[transform:rotateY(180deg)]"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Front - Portrait */}
                  <div
                    className="absolute inset-0 rounded-3xl overflow-hidden border-2 border-white/60 shadow-2xl"
                    style={{
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    <img
                      src={portrait}
                      alt="Kevin Lee"
                      className="w-full h-full object-cover"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>

                  {/* Back - OpenAI */}
                  <div
                    className="absolute inset-0 rounded-3xl overflow-hidden border-2 border-white/60 shadow-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-8"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    {/* OpenAI Logo */}
                    <div className="w-32 h-32 mb-6 flex items-center justify-center">
                      <img
                        src={openaiLogo}
                        alt="OpenAI"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Text */}
                    <p className="text-white text-center text-lg font-medium leading-relaxed">
                      i'm currently at{' '}
                      <span className="text-emerald-400 font-bold">OpenAI</span>{' '}
                      as a member of technical staff!
                    </p>

                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-20 h-20 bg-emerald-500/10 rounded-full blur-2xl" />
                    <div className="absolute bottom-4 left-4 w-16 h-16 bg-teal-500/10 rounded-full blur-2xl" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-gray-500 uppercase tracking-widest">scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-gray-400 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section - Now before Experience */}
      <section className="relative px-6 py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative p-8 md:p-12 rounded-3xl bg-white/80 border border-white/60 backdrop-blur-xl shadow-xl">
              {/* Decorative gradient line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

              <div className="flex items-start gap-5 mb-8">
                <motion.span
                  animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                  className="text-5xl"
                >
                  👋
                </motion.span>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">about me</h3>
                  <p className="text-gray-500">beyond the code</p>
                </div>
              </div>

              <div className="space-y-5 text-gray-600 leading-relaxed text-lg">
                <p>
                  originally from <span className="text-gray-800 font-medium">new york</span>, i'm pursuing
                  <span className="text-gray-800 font-medium"> computer science + applied math</span> at uc berkeley.
                  my work spans full-stack development, distributed systems, and applied ml.
                </p>
                <p>
                  when i'm not building, you'll find me playing racquet sports, stargazing,
                  or exploring new places—whether it's a hidden café, a great hiking trail, or a spontaneous trip.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section ref={experienceSectionRef} className="relative px-6 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-5 py-2 mb-6 text-xs font-semibold uppercase tracking-[0.25em] bg-white/80 backdrop-blur-sm border border-white/60 rounded-full text-cyan-700 shadow-sm"
            >
              experience
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              where i've built
            </h2>
            <p className="text-lg text-white/90 max-w-xl mx-auto drop-shadow-md">
              from ai agents to distributed systems, shipping at scale
            </p>
          </motion.div>

          {/* Experience Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXPERIENCES.map((exp, i) => (
              <ExperienceCard key={exp.company} experience={exp} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-8">
            {/* Social links */}
            <div className="flex items-center gap-4">
              {[
                { icon: FiMail, href: 'mailto:kevinlee1@berkeley.edu', label: 'Email' },
                { icon: FiLinkedin, href: 'https://linkedin.com/in/kevinlee33', label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <MagneticButton
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel={href.startsWith('mailto') ? undefined : 'noreferrer'}
                  aria-label={label}
                  className="p-4 rounded-full bg-white/30 backdrop-blur-md border border-white/40 hover:bg-white/50 hover:border-white/60 transition-all duration-300 text-white hover:text-white shadow-lg"
                >
                  <Icon className="w-5 h-5" />
                </MagneticButton>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center">
              <p className="text-white/80 text-sm drop-shadow-md">
                © {new Date().getFullYear()} kevin lee
              </p>
              <p className="text-white/60 text-xs mt-1 drop-shadow-md">
                kevinlee.one
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
