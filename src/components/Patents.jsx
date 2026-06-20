import { motion, useScroll } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Activity, ShieldCheck, Eye, Users, Gauge, RefreshCw, Database, Network, Cpu, ChevronRight } from 'lucide-react'
import AnimatedCounter from './AnimatedCounter'
import MCPModal from './MCPModals'
import useTilt from '../hooks/useTilt'

function CapabilityCard({ item, index, isInView, onClick }) {
  const { cardRef, handleMouseMove, handleMouseLeave, tiltStyle } = useTilt(5)

  const colors = ['cyan', 'magenta', 'blue', 'green', 'orange', 'purple', 'cyan', 'magenta', 'blue']
  const color = colors[index % colors.length]
  
  const colorStyles = {
    cyan: { bg: 'bg-cyber-cyan/10', border: 'border-cyber-cyan/20', text: 'text-cyber-cyan', glow: 'rgba(0, 212, 230, 0.15)' },
    magenta: { bg: 'bg-cyber-magenta/10', border: 'border-cyber-magenta/20', text: 'text-cyber-magenta', glow: 'rgba(224, 64, 224, 0.15)' },
    blue: { bg: 'bg-cyber-blue/10', border: 'border-cyber-blue/20', text: 'text-cyber-blue', glow: 'rgba(0, 102, 255, 0.15)' },
    green: { bg: 'bg-cyber-green/10', border: 'border-cyber-green/20', text: 'text-cyber-green', glow: 'rgba(0, 224, 119, 0.15)' },
    orange: { bg: 'bg-cyber-orange/10', border: 'border-cyber-orange/20', text: 'text-cyber-orange', glow: 'rgba(255, 102, 0, 0.15)' },
    purple: { bg: 'bg-cyber-purple/10', border: 'border-cyber-purple/20', text: 'text-cyber-purple', glow: 'rgba(128, 0, 255, 0.15)' },
  }[color]

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ 
        y: -4, 
        boxShadow: `0 12px 24px ${colorStyles.glow}`
      }}
      className="cyber-card rounded-xl p-6 group cursor-pointer relative overflow-hidden"
    >
      <motion.div 
        className={`absolute inset-0 ${colorStyles.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />
      
      <div className="relative z-10">
        <motion.div 
          className={`w-12 h-12 rounded-lg ${colorStyles.bg} flex items-center justify-center mb-4 border ${colorStyles.border} group-hover:scale-105 transition-transform duration-300`}
        >
          <item.icon className={`w-6 h-6 ${colorStyles.text}`} />
        </motion.div>
        
        <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition-colors">
          {item.title}
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">{item.desc}</p>
        <div className={`flex items-center gap-1 text-xs font-mono ${colorStyles.text} opacity-50 group-hover:opacity-100 transition-opacity`}>
          <span>See How It Works</span>
          <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  )
}

function StatCard({ stat, index, isInView }) {
  const { cardRef, handleMouseMove, handleMouseLeave, tiltStyle } = useTilt(6)

  return (
    <motion.div
      ref={cardRef}
      className="cyber-card rounded-xl p-6 text-center relative overflow-hidden group"
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.8 + index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5, boxShadow: '0 20px 40px rgba(0, 212, 230, 0.2)' }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/10 to-cyber-magenta/10 opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <div className="relative z-10">
        <div className="text-3xl font-bold text-cyber-cyan mb-2 text-glow">{stat.value}</div>
        <div className="text-gray-300 text-sm font-medium">{stat.label}</div>
      </div>
    </motion.div>
  )
}

export default function Platform() {
  const ref = useRef(null)
  const [activeModal, setActiveModal] = useState(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      if (value > 0.1) setIsInView(true)
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  const capabilities = [
    { icon: Activity, title: 'Live State Readings', desc: 'Four measured signals per agent, every decision — surfacing drift before it hits the output. Click for the math.', animationType: 'state-evolution' },
    { icon: ShieldCheck, title: 'Circuit Breakers', desc: 'Automatically pauses agents when risk thresholds are breached, preventing harmful behavior before escalation', animationType: 'circuit-breakers' },
    { icon: RefreshCw, title: 'Peer-Assisted Recovery', desc: 'Agents review each other for recovery without human intervention', animationType: 'dialectic-recovery' },
    { icon: Users, title: 'Multi-Agent Fleet', desc: 'Track unlimited agents with independent state, fleet-wide health metrics, and coordinated recovery', animationType: 'multi-agent-fleet' },
    { icon: Gauge, title: 'Adaptive Control', desc: 'Calibration adapts as the fleet\'s telemetry shifts, reducing manual tuning.', animationType: 'adaptive-control' },
    { icon: Eye, title: 'Anomaly Detection', desc: 'Detect behavioral drift, performance regressions, and unexpected state transitions in real time.', animationType: 'anomaly-detection' },
    { icon: Database, title: 'Knowledge Graph', desc: 'Captures discoveries and patterns across agents, enabling cross-agent learning and improvement', animationType: 'knowledge-graph' },
    { icon: Network, title: 'MCP Integration', desc: 'Standard Model Context Protocol for seamless integration with Cursor, Claude Desktop, VS Code', animationType: 'mcp-integration' },
    { icon: Cpu, title: 'Local-First', desc: 'All data stored locally—no cloud dependencies, complete privacy', animationType: 'local-first' },
  ]

  const stats = [
    { value: '2,500', label: 'Agents Tracked' },
    { value: '94K', label: 'Events Processed' },
    { value: '0', label: 'Cloud Dependencies' },
  ]

  return (
    <section id="platform" className="py-32 relative overflow-hidden" ref={ref} style={{ position: 'relative' }}>
      <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none" />
      
      <div className="absolute inset-0 circuit-pattern opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyber-cyan text-sm tracking-[0.2em] mb-4 block font-medium">
            THE PRODUCT
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient-cyber">Production-Ready</span>
            <br />MCP Tools
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            State tracking, circuit breakers, audit trails, anomaly detection,
            and multi-agent coordination — exposed as MCP tools. Zero cloud
            dependencies, local-first by design.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {capabilities.map((item, index) => (
            <CapabilityCard 
              key={item.title} 
              item={item} 
              index={index} 
              isInView={isInView} 
              onClick={() => setActiveModal(item.animationType)}
            />
          ))}
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
      
      <MCPModal 
        isOpen={activeModal !== null}
        onClose={() => setActiveModal(null)}
        animationType={activeModal}
      />
    </section>
  )
}
