import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Activity, Fingerprint, RefreshCw, Terminal } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import MCPModal from './MCPModals'
import CoreInnovationModal from './CoreInnovationModals'

function StaggeredText({ text, className = '', delay = 0 }) {
  const words = text.split(' ')
  
  return (
    <motion.span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ 
            delay: delay + i * 0.08, 
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          {word}{i < words.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </motion.span>
  )
}

function GradientText({ children }) {
  return (
    <span 
      className="text-gradient-cyber"
      style={{
        background: 'linear-gradient(90deg, #00d4e6 0%, #0066ff 50%, #e040e0 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}
    >
      {children}
    </span>
  )
}

const rotatingLabels = [
  'Governance',
  'Stability',
]

function RotatingLabel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % rotatingLabels.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={currentIndex}
        initial={{ y: 12, opacity: 0, filter: 'blur(4px)' }}
        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
        exit={{ y: -12, opacity: 0, filter: 'blur(4px)' }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="inline-block"
        style={{
          background: 'linear-gradient(90deg, #00d4e6 0%, #0066ff 50%, #e040e0 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {rotatingLabels[currentIndex]}
      </motion.span>
    </AnimatePresence>
  )
}

function CyberCard({ icon: Icon, title, desc, index, isDark }) {
  return (
    <motion.div
      className="relative rounded-xl group will-change-transform h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: 0.7 + index * 0.08, 
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      <div className="cyber-card rounded-xl h-full flex flex-col p-6">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
          style={{ 
            backgroundColor: isDark ? 'rgba(0, 212, 230, 0.1)' : 'rgba(0, 102, 255, 0.08)',
            border: `1px solid ${isDark ? 'rgba(0, 212, 230, 0.2)' : 'rgba(0, 102, 255, 0.15)'}`
          }}
        >
          <Icon className="w-5 h-5" style={{ color: isDark ? '#00d4e6' : '#0066ff' }} />
        </div>
        <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {desc}
        </p>
      </div>
    </motion.div>
  )
}

function TypewriterText({ text, className = '', typingDelay = 1.2 }) {
  return (
    <motion.span
      className={`inline-flex items-center font-mono text-cyber-cyan max-w-full ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: typingDelay }}
    >
      <motion.span
        initial={{ width: 0 }}
        animate={{ width: 'auto' }}
        transition={{ duration: 2, delay: typingDelay + 0.3, ease: 'linear' }}
        className="overflow-hidden whitespace-nowrap inline-block text-xs sm:text-sm"
      >
        {text}
      </motion.span>
      <motion.span 
        className="inline-block w-[8px] sm:w-[10px] h-[14px] sm:h-[18px] bg-cyber-cyan ml-1 rounded-sm flex-shrink-0"
        animate={{ 
          opacity: [1, 1, 0, 0],
          boxShadow: [
            '0 0 8px rgba(0, 212, 230, 0.8), 0 0 12px rgba(0, 212, 230, 0.4)',
            '0 0 8px rgba(0, 212, 230, 0.8), 0 0 12px rgba(0, 212, 230, 0.4)',
            '0 0 0px rgba(0, 212, 230, 0)',
            '0 0 0px rgba(0, 212, 230, 0)'
          ]
        }}
        transition={{ 
          duration: 1, 
          repeat: Infinity, 
          ease: 'easeInOut',
          times: [0, 0.5, 0.5, 1]
        }}
      />
    </motion.span>
  )
}

export default function Hero() {
  const { isDark } = useTheme()
  const containerRef = useRef(null)
  const [activeModal, setActiveModal] = useState(null)
  
  const heroFeatures = [
    { icon: Activity, title: 'Agents Read Their Own State', desc: 'A live read on each agent — whether it\'s drifting, hedging, or running on fumes — before anything breaks.' },
    { icon: Fingerprint, title: 'Stable by Design', desc: 'When the system pauses an agent, it\'s tied to a measured signal with a published proof — not a guessed threshold.' },
    { icon: RefreshCw, title: 'Every Decision is Auditable', desc: 'Every agent decision leaves a reproducible trace you can replay later. No black box, no proprietary log format.' },
  ]
  
  const [activeCoreModal, setActiveCoreModal] = useState(null)

  return (
    <motion.section 
      ref={containerRef} 
      className="min-h-screen flex flex-col items-center justify-center overflow-hidden py-20"
      style={{ position: 'relative' }}
    >
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full cyber-card mb-6 mx-auto relative overflow-hidden group"
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-cyan/20 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
          />
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <motion.span 
              className="absolute inline-flex rounded-full h-2 w-2 bg-cyber-green"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ boxShadow: '0 0 10px #00e077' }} 
            />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-green" style={{ boxShadow: '0 0 10px #00e077' }} />
          </span>
          <span className="text-[10px] sm:text-sm font-mono tracking-wide sm:tracking-wider relative z-10" style={{ color: isDark ? '#d1d5db' : '#334155' }}>
            <span style={{ color: isDark ? '#00d4e6' : '#0066ff' }}>STATUS:</span> IN PRODUCTION <span className="hidden sm:inline">|</span><span className="sm:hidden">&middot;</span> SINCE NOV 2025
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-6"
        >
          <h1
            className="text-5xl md:text-7xl font-bold tracking-tight mb-2"
            style={{
              background: isDark
                ? 'linear-gradient(135deg, #ffffff 40%, rgba(0,212,230,0.85) 100%)'
                : 'linear-gradient(135deg, #0f172a 40%, #0066ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.1,
            }}
          >
            CIRWEL
          </h1>
          <p
            className="text-lg md:text-xl font-mono font-light tracking-[0.2em] uppercase"
            style={{ color: isDark ? 'rgba(0,212,230,0.6)' : '#0066ff99' }}
          >
            Runtime Governance for Autonomous Agents
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
          className="text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed"
        >
          Live state readings for AI agents in production, so they slow down, ask for review, or hand off — before something visible fails. Delivers{' '}
          <span className="font-mono" style={{ color: isDark ? 'rgba(0, 212, 230, 0.75)' : '#0066ff' }}>
            <RotatingLabel />
          </span>{' '}
          backed by a published method, not vibes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
        >
          <motion.a
            href="https://github.com/cirwel/unitares"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-full sm:w-auto px-8 py-4 rounded-lg font-semibold text-base sm:text-lg overflow-hidden shadow-lg shadow-cyber-cyan/20 text-center"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 212, 230, 0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyber-cyan to-cyber-blue" />
            <span className="absolute inset-0 bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-magenta opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 text-dark-950 font-bold flex items-center justify-center gap-2">
              <Terminal className="w-5 h-5" />
              Quickstart
            </span>
          </motion.a>
          <motion.a
            href="mailto:founder@cirwel.org"
            className="w-full sm:w-auto px-8 py-4 border rounded-lg font-semibold text-base sm:text-lg transition-all group text-center relative overflow-hidden"
            style={{
              borderColor: 'rgba(0, 212, 230, 0.3)',
              backgroundColor: 'rgba(0, 212, 230, 0.05)'
            }}
            whileHover={{ scale: 1.05, borderColor: 'rgba(0, 212, 230, 0.6)', boxShadow: '0 0 20px rgba(0, 212, 230, 0.15)' }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/0 via-cyber-cyan/5 to-cyber-cyan/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 text-gray-300 group-hover:text-cyber-cyan transition-colors duration-300">Talk to the Founder</span>
          </motion.a>
        </motion.div>
      </div>


      {/* Scroll indicator - hidden on mobile to avoid overlap */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1, ease: 'easeOut' }}
        className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <a
          href="#about"
          className="flex flex-col items-center cursor-pointer group"
        >
          <span className="text-xs font-mono text-cyber-cyan/60 group-hover:text-cyber-cyan/80 mb-2 tracking-widest transition-colors">
            SCROLL
          </span>
          <div className="relative">
            <ChevronDown className="w-6 h-6 text-cyber-cyan/50 group-hover:text-cyber-cyan transition-colors" />
          </div>
        </a>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-950 to-transparent pointer-events-none" />
      
      <MCPModal 
        isOpen={activeModal !== null}
        onClose={() => setActiveModal(null)}
        animationType={activeModal}
      />
      
      <CoreInnovationModal 
        isOpen={activeCoreModal !== null}
        onClose={() => setActiveCoreModal(null)}
        animationType={activeCoreModal}
      />
    </motion.section>
  )
}
