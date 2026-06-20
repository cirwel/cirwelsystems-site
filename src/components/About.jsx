import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { AlertTriangle, Target, Cpu, ArrowRight, Sparkles } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import MCPModal from './MCPModals'
import CoreInnovationModal from './CoreInnovationModals'
import useTilt from '../hooks/useTilt'

function TiltCard({ children, className = '', color = 'cyan', delay = 0, onClick, clickable = true }) {
  const { cardRef, handleMouseMove, handleMouseLeave, tiltStyle } = useTilt(6)

  const glowColors = {
    cyan: 'rgba(0, 212, 230, 0.2)',
    magenta: 'rgba(224, 64, 224, 0.2)',
    orange: 'rgba(255, 102, 0, 0.2)',
    blue: 'rgba(0, 102, 255, 0.2)',
    green: 'rgba(0, 224, 119, 0.2)',
  }

  const borderColors = {
    cyan: 'rgba(0, 212, 230, 0.6)',
    magenta: 'rgba(224, 64, 224, 0.6)',
    orange: 'rgba(255, 102, 0, 0.6)',
    blue: 'rgba(0, 102, 255, 0.6)',
    green: 'rgba(0, 224, 119, 0.6)',
  }

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      className={`relative ${clickable ? 'cursor-pointer' : ''} group ${className}`}
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        y: -8,
        boxShadow: `0 20px 40px ${glowColors[color]}`,
      }}
    >
      {/* Animated electric border on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, transparent, ${borderColors[color]}, transparent)`,
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '200% 0%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <div className="absolute inset-[1px] rounded-xl bg-dark-900 dark:bg-dark-900" />
      </motion.div>
      {children}
    </motion.div>
  )
}

function FloatingOrb({ className }) {
  return (
    <div className={`absolute rounded-full pointer-events-none ${className}`} />
  )
}

function DataLine({ delay = 0 }) {
  return (
    <motion.div
      className="absolute h-[2px] bg-gradient-to-r from-transparent via-cyber-cyan to-transparent"
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 0.5 }}
      transition={{ duration: 1.5, delay, ease: 'easeOut' }}
      viewport={{ once: true }}
      style={{ originX: 0.5 }}
    />
  )
}

export default function About() {
  const containerRef = useRef(null)
  const [activeModal, setActiveModal] = useState(null)
  const [activeCoreModal, setActiveCoreModal] = useState(null)
  
  
  const cirwelApproach = [
    { label: 'Live state readings, per agent', animation: 'state-evolution' },
    { label: 'Automatic circuit breakers', animation: 'circuit-breakers' },
    { label: 'Peer-assisted recovery', animation: 'dialectic-recovery' },
    { label: 'One signal across model families', animation: 'multi-agent-fleet' },
    { label: 'Per-decision audit trail', animation: 'knowledge-graph' },
  ]

  return (
    <section id="about" className="py-32 relative overflow-hidden" ref={containerRef} style={{ position: 'relative' }}>
      <div className="absolute inset-0 bg-mesh opacity-50 pointer-events-none" />
      
      <div className="absolute inset-0 circuit-pattern opacity-30 pointer-events-none" />
      
      <FloatingOrb className="w-64 h-64 bg-cyber-cyan/5 blur-3xl top-20 -left-20" />
      <FloatingOrb className="w-48 h-48 bg-cyber-magenta/5 blur-3xl top-1/3 -right-10" />
      <FloatingOrb className="w-56 h-56 bg-cyber-blue/5 blur-3xl bottom-20 left-1/4" />
      
      <div className="absolute top-0 left-0 right-0">
        <DataLine />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="text-cyber-cyan font-mono text-sm tracking-[0.3em] mb-4 block">
            {'///'} THE PROBLEM
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Agents Ship Without <span className="text-gradient-cyber">Measurement</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
            AI agents are shipping into production without a way to read their own internal state.
            By the time something looks wrong on the outside, it's already failed on the inside.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <span className="px-3 py-1.5 rounded-full bg-cyber-orange/10 border border-cyber-orange/30 text-cyber-orange font-mono">
              No live state signals
            </span>
            <span className="px-3 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan font-mono">
              No stability guarantees
            </span>
            <span className="px-3 py-1.5 rounded-full bg-cyber-magenta/10 border border-cyber-magenta/30 text-cyber-magenta font-mono">
              No open standard
            </span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          <div className="space-y-8">
            <TiltCard color="orange" delay={0} onClick={() => setActiveCoreModal('scalability-problem')}>
              <div className="cyber-card rounded-lg p-8 corner-brackets group relative overflow-hidden">
                <div className="flex items-start gap-4">
                  <motion.div 
                    className="w-14 h-14 rounded-lg bg-cyber-orange/10 flex items-center justify-center border border-cyber-orange/20 group-hover:border-cyber-orange/50 transition-colors"
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <AlertTriangle className="w-7 h-7 text-cyber-orange" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-cyber-orange transition-colors">The Measurement Gap</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Today's agent dashboards show logs and traces. None of them show the agent's actual
                      internal state — whether it's confident, drifting, or about to fail — in a form that
                      supports any real safety guarantee.
                    </p>
                  </div>
                </div>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyber-orange to-cyber-yellow"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{ originX: 0 }}
                />
              </div>
            </TiltCard>

            <TiltCard color="cyan" delay={0.15} onClick={() => setActiveCoreModal('missing-layer')}>
              <div className="cyber-card rounded-lg p-8 corner-brackets group relative overflow-hidden">
                <div className="flex items-start gap-4">
                  <motion.div 
                    className="w-14 h-14 rounded-lg bg-cyber-cyan/10 flex items-center justify-center border border-cyber-cyan/20 group-hover:border-cyber-cyan/50 transition-colors"
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <Target className="w-7 h-7 text-cyber-cyan" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-cyber-cyan transition-colors">An Open Standard</h3>
                    <p className="text-gray-300 leading-relaxed">
                      There's no shared way to measure how an agent is actually doing. CIRWEL is building
                      one — published, reproducible, and the same across model families and vendors.
                    </p>
                  </div>
                </div>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyber-cyan to-cyber-blue"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{ originX: 0 }}
                />
              </div>
            </TiltCard>
          </div>

          <TiltCard color="magenta" delay={0.2} className="h-full" clickable={false}>
            <div className="cyber-card rounded-lg p-8 relative overflow-hidden group h-full">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-magenta/10 rounded-full blur-3xl opacity-40" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div 
                    className="w-14 h-14 rounded-lg bg-cyber-magenta/10 flex items-center justify-center border border-cyber-magenta/20 group-hover:border-cyber-magenta/50 transition-colors"
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <Cpu className="w-7 h-7 text-cyber-magenta" />
                  </motion.div>
                  <div>
                    <span className="text-xs font-mono text-cyber-cyan tracking-wider">MODULE://</span>
                    <h3 className="text-2xl font-bold group-hover:text-cyber-magenta transition-colors">The CIRWEL Approach</h3>
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-3 italic">
                  The intuition: every agent has an internal state we can actually measure. Read it
                  continuously, prove it stays in a safe range, step in early when it doesn't.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  CIRWEL gives every agent four live signals — how confident it is, how much it's
                  actually using the context it was given, how surprised it is by what's happening,
                  and how much that surprise is building up over time. Healthy agents keep those
                  signals bounded; drifting ones don't.
                </p>
                <p className="text-sm text-cyber-cyan/80 font-mono mb-6 flex flex-wrap gap-x-4 gap-y-2 items-center">
                  <span>In production since November 2025.</span>
                  <a
                    href="https://doi.org/10.5281/zenodo.19647159"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-cyber-cyan hover:text-white border-b border-cyber-cyan/30 hover:border-white transition-colors"
                  >
                    Read the paper <ArrowRight className="w-3 h-3" />
                  </a>
                  <a
                    href="https://github.com/cirwel/unitares"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-cyber-cyan hover:text-white border-b border-cyber-cyan/30 hover:border-white transition-colors"
                  >
                    See the code <ArrowRight className="w-3 h-3" />
                  </a>
                </p>
                
                <div className="space-y-4">
                  {cirwelApproach.map((item, index) => (
                    <motion.div
                      key={item.label}
                      onClick={() => setActiveModal(item.animation)}
                      className="flex items-center gap-3 group/item cursor-pointer"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-2 h-2 bg-cyber-cyan rounded-full group-hover/item:scale-125 transition-transform" />
                      <span className="text-gray-300 group-hover/item:text-cyber-cyan transition-colors font-mono text-sm">
                        {item.label}
                      </span>
                      <ArrowRight className="w-4 h-4 text-cyber-cyan opacity-0 group-hover/item:opacity-100 transition-opacity ml-auto" />
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="absolute top-4 right-4 font-mono text-xs text-cyber-cyan/30">
                v2.4.1
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <DataLine delay={0.5} />
      </div>
      
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
    </section>
  )
}
