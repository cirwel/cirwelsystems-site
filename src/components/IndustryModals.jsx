import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { X, Code2, Network, FlaskConical, Server } from 'lucide-react'

function AIAssistantAnimation() {
  const [cursorLine, setCursorLine] = useState(3)
  const [riskLevel, setRiskLevel] = useState(0.2)
  const [status, setStatus] = useState('monitoring')
  const [codeLines] = useState([
    { text: 'function processData(input) {', risk: 0 },
    { text: '  const result = await fetch(url);', risk: 0.1 },
    { text: '  if (!result.ok) throw error;', risk: 0.2 },
    { text: '  return parseJSON(result);', risk: 0.1 },
    { text: '}', risk: 0 },
    { text: '', risk: 0 },
    { text: 'async function execute() {', risk: 0 },
    { text: '  // AI generating code...', risk: 0.3 },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorLine(prev => (prev + 1) % codeLines.length)
      setRiskLevel(prev => {
        const change = (Math.random() - 0.4) * 0.15
        const next = Math.max(0.1, Math.min(0.9, prev + change))
        if (next > 0.7) {
          setStatus('intervening')
          setTimeout(() => setStatus('monitoring'), 1500)
          return 0.3
        }
        return next
      })
    }, 800)
    return () => clearInterval(interval)
  }, [codeLines.length])

  return (
    <div className="relative w-full h-64 md:h-80 p-3">
      <div className="h-full flex gap-3">
        <div className="flex-1 bg-dark-950 rounded-lg border border-dark-700 overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 bg-dark-800 border-b border-dark-700">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            </div>
            <span className="text-[10px] font-mono text-gray-500 ml-2">main.js - VS Code</span>
          </div>
          <div className="p-2 font-mono text-[10px] space-y-0.5">
            {codeLines.map((line, i) => (
              <div key={i} className={`flex items-center gap-2 px-1 py-0.5 rounded ${i === cursorLine ? 'bg-cyber-cyan/10' : ''}`}>
                <span className="text-gray-600 w-4">{i + 1}</span>
                <span className={`${line.risk > 0.2 ? 'text-yellow-400' : 'text-gray-300'}`}>{line.text}</span>
                {i === cursorLine && <motion.span className="w-1.5 h-3 bg-cyber-cyan" animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} />}
              </div>
            ))}
          </div>
        </div>
        
        <div className="w-28 space-y-2">
          <div className="bg-dark-900 rounded-lg border border-dark-700 p-2">
            <div className="text-[9px] font-mono text-gray-500 mb-1">CIRWEL</div>
            <div className={`text-[10px] font-mono font-bold ${status === 'monitoring' ? 'text-cyber-green' : 'text-cyber-orange'}`}>
              {status === 'monitoring' ? 'MONITORING' : 'INTERVENING'}
            </div>
            <div className={`w-2 h-2 rounded-full mt-1 ${status === 'monitoring' ? 'bg-cyber-green' : 'bg-cyber-orange animate-pulse'}`} />
          </div>
          
          <div className="bg-dark-900 rounded-lg border border-dark-700 p-2">
            <div className="text-[9px] font-mono text-gray-500 mb-1">Risk Level</div>
            <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
              <motion.div 
                className="h-full rounded-full"
                style={{ backgroundColor: riskLevel > 0.5 ? '#ff6600' : '#00ff88' }}
                animate={{ width: `${riskLevel * 100}%` }}
              />
            </div>
            <div className="text-[10px] font-mono mt-1" style={{ color: riskLevel > 0.5 ? '#ff6600' : '#00ff88' }}>
              {(riskLevel * 100).toFixed(0)}%
            </div>
          </div>
          
          <div className="bg-dark-900 rounded-lg border border-dark-700 p-2">
            <div className="text-[9px] font-mono text-gray-500 mb-1">Session</div>
            <div className="text-[10px] font-mono text-cyber-cyan">Active</div>
            <div className="text-[9px] font-mono text-gray-600">12m 34s</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MultiAgentAnimation() {
  const [agents, setAgents] = useState([
    { id: 1, name: 'Agent-01', health: 0.9, state: 'active' },
    { id: 2, name: 'Agent-02', health: 0.85, state: 'active' },
    { id: 3, name: 'Agent-03', health: 0.95, state: 'active' },
    { id: 4, name: 'Agent-04', health: 0.88, state: 'active' },
    { id: 5, name: 'Agent-05', health: 0.92, state: 'active' },
    { id: 6, name: 'Agent-06', health: 0.87, state: 'active' },
  ])
  const [reviewing, setReviewing] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * agents.length)
      setAgents(prev => prev.map((a, i) => {
        if (i === idx) {
          const newHealth = Math.max(0.3, Math.min(1, a.health + (Math.random() - 0.5) * 0.2))
          const newState = newHealth < 0.5 ? 'recovering' : 'active'
          if (newHealth < 0.5 && a.state === 'active') {
            setReviewing({ from: (idx + 1) % agents.length, to: idx })
            setTimeout(() => setReviewing(null), 1000)
          }
          return { ...a, health: Math.min(1, newHealth + (newState === 'recovering' ? 0.2 : 0)), state: newState }
        }
        return a
      }))
    }, 600)
    return () => clearInterval(interval)
  }, [agents.length])

  return (
    <div className="relative w-full h-64 md:h-80 p-3">
      <div className="grid grid-cols-3 gap-2 h-full">
        {agents.map((agent, i) => (
          <motion.div 
            key={agent.id}
            className={`bg-dark-900 rounded-lg border p-2 relative ${agent.state === 'recovering' ? 'border-cyber-orange/50' : 'border-dark-700'}`}
            animate={{ scale: reviewing?.to === i ? [1, 1.05, 1] : 1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-mono text-gray-500">{agent.name}</span>
              <div className={`w-2 h-2 rounded-full ${agent.state === 'active' ? 'bg-cyber-green' : 'bg-cyber-orange animate-pulse'}`} />
            </div>
            <div className="h-1 bg-dark-700 rounded-full overflow-hidden mb-1">
              <motion.div 
                className="h-full rounded-full"
                style={{ backgroundColor: agent.health > 0.7 ? '#00ff88' : agent.health > 0.5 ? '#ffaa00' : '#ff6600' }}
                animate={{ width: `${agent.health * 100}%` }}
              />
            </div>
            <div className="text-[9px] font-mono" style={{ color: agent.health > 0.7 ? '#00ff88' : '#ffaa00' }}>
              {(agent.health * 100).toFixed(0)}%
            </div>
            {reviewing?.to === i && (
              <motion.div 
                className="absolute -top-1 -right-1 bg-cyber-magenta text-dark-950 text-[8px] font-mono px-1 rounded"
                initial={{ scale: 0 }} animate={{ scale: 1 }}
              >
                PEER REVIEW
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      
      <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
        {reviewing && (
          <motion.line
            x1="50%" y1="50%" x2="50%" y2="50%"
            stroke="#ff00ff"
            strokeWidth="2"
            strokeDasharray="4,4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </svg>
      
      <div className="absolute bottom-3 left-3 right-3 bg-dark-900/90 rounded-lg border border-dark-700 p-2 flex items-center justify-between">
        <div className="text-[9px] font-mono text-gray-500">Fleet Status</div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-cyber-green">{agents.filter(a => a.state === 'active').length} Active</span>
          <span className="text-[10px] font-mono text-cyber-orange">{agents.filter(a => a.state === 'recovering').length} Recovering</span>
        </div>
      </div>
    </div>
  )
}

function ResearchAnimation() {
  const [experiments, setExperiments] = useState([
    { id: 'A', name: 'Control', value: 0.72, samples: 1240 },
    { id: 'B', name: 'Variant', value: 0.68, samples: 1180 },
  ])
  const [logs, setLogs] = useState([])
  const [phase, setPhase] = useState('collecting')

  useEffect(() => {
    const interval = setInterval(() => {
      setExperiments(prev => prev.map(e => ({
        ...e,
        value: Math.max(0.4, Math.min(0.95, e.value + (Math.random() - 0.5) * 0.05)),
        samples: e.samples + Math.floor(Math.random() * 20),
      })))
      
      if (Math.random() < 0.3) {
        const logTypes = ['Checkpoint saved', 'Pattern detected', 'Metric logged', 'State captured']
        setLogs(prev => [...prev.slice(-3), { id: Date.now(), text: logTypes[Math.floor(Math.random() * logTypes.length)] }])
      }
      
      setPhase(prev => Math.random() < 0.1 ? (prev === 'collecting' ? 'analyzing' : 'collecting') : prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-64 md:h-80 p-3">
      <div className="h-full flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-gray-500">Experiment: infrastructure-strategy-v2</span>
          <div className={`px-2 py-0.5 rounded text-[9px] font-mono ${phase === 'collecting' ? 'bg-cyber-cyan/20 text-cyber-cyan' : 'bg-cyber-magenta/20 text-cyber-magenta'}`}>
            {phase.toUpperCase()}
          </div>
        </div>
        
        <div className="flex-1 grid grid-cols-2 gap-2">
          {experiments.map(exp => (
            <div key={exp.id} className="bg-dark-900 rounded-lg border border-dark-700 p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-white">{exp.id}: {exp.name}</span>
                <span className="text-[9px] font-mono text-gray-500">n={exp.samples}</span>
              </div>
              <div className="h-16 relative">
                <svg className="w-full h-full" viewBox="0 0 100 50">
                  <rect x="10" y={50 - exp.value * 45} width="30" height={exp.value * 45} fill={exp.id === 'A' ? '#00d4e6' : '#ff00ff'} opacity="0.7" rx="2" />
                  <text x="25" y={45 - exp.value * 45} textAnchor="middle" fill="#fff" fontSize="8" fontFamily="monospace">
                    {(exp.value * 100).toFixed(1)}%
                  </text>
                </svg>
              </div>
              <div className="text-[9px] font-mono text-gray-500 text-center">Success Rate</div>
            </div>
          ))}
        </div>
        
        <div className="bg-dark-900 rounded-lg border border-dark-700 p-2">
          <div className="text-[9px] font-mono text-gray-500 mb-1">Activity Log</div>
          <div className="space-y-0.5 h-10 overflow-hidden">
            {logs.slice(-3).map(log => (
              <div key={log.id} className="text-[9px] font-mono text-cyber-green flex items-center gap-1">
                <span className="text-gray-600">&gt;</span> {log.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductionAnimation() {
  const [metrics, setMetrics] = useState({
    uptime: 99.97,
    latency: 0.8,
    requests: 142847,
  })
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        latency: Math.max(0.3, Math.min(2, prev.latency + (Math.random() - 0.5) * 0.3)),
        requests: prev.requests + Math.floor(Math.random() * 50),
      }))
      
      if (Math.random() < 0.1) {
        setAlerts(prev => [...prev.slice(-2), { id: Date.now(), type: 'info', text: 'Audit log synced' }])
      }
    }, 400)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-64 md:h-80 p-3">
      <div className="h-full flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-gray-500">Production Environment</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
            <span className="text-[10px] font-mono text-cyber-green">OPERATIONAL</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 flex-1">
          <div className="bg-dark-900 rounded-lg border border-dark-700 p-2 flex flex-col">
            <span className="text-[9px] font-mono text-gray-500">Uptime</span>
            <span className="text-lg font-mono font-bold text-cyber-green">{metrics.uptime}%</span>
            <span className="text-[9px] font-mono text-gray-600">30 day avg</span>
          </div>
          <div className="bg-dark-900 rounded-lg border border-dark-700 p-2 flex flex-col">
            <span className="text-[9px] font-mono text-gray-500">Latency</span>
            <span className="text-lg font-mono font-bold text-cyber-cyan">{metrics.latency.toFixed(1)}ms</span>
            <span className="text-[9px] font-mono text-gray-600">p99</span>
          </div>
          <div className="bg-dark-900 rounded-lg border border-dark-700 p-2 flex flex-col">
            <span className="text-[9px] font-mono text-gray-500">Requests</span>
            <span className="text-lg font-mono font-bold text-cyber-magenta">{(metrics.requests / 1000).toFixed(1)}k</span>
            <span className="text-[9px] font-mono text-gray-600">today</span>
          </div>
        </div>
        
        <div className="bg-dark-900 rounded-lg border border-dark-700 p-2">
          <div className="text-[9px] font-mono text-gray-500 mb-1">Audit Trail</div>
          <div className="space-y-0.5 h-8 overflow-hidden">
            {alerts.slice(-2).map(a => (
              <div key={a.id} className="text-[9px] font-mono text-gray-300 flex items-center gap-1">
                <span className="text-cyber-cyan">LOG</span> {a.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const modalContent = {
  'ai-assistant': {
    title: 'Coding-Assistant Instrumentation',
    icon: Code2,
    color: 'cyan',
    description: 'Per-decision (S, I, E, V) telemetry on coding assistants. When the V residual approaches its contraction bound, the agent is halted before the run blows up — circuit breakers tied to a proven stability condition, not a heuristic.',
    Animation: AIAssistantAnimation,
  },
  'multi-agent': {
    title: 'Heterogeneous Multi-Agent Fleets',
    icon: Network,
    color: 'magenta',
    description: 'Mixed-provider fleets exposed through one substrate. Each agent reports the same (S, I, E, V) signature per decision, so fleet health, drift, and peer-assisted recovery are computed against a single comparable state vector.',
    Animation: MultiAgentAnimation,
  },
  'research': {
    title: 'Research & Reproducibility',
    icon: FlaskConical,
    color: 'green',
    description: 'The (S, I, E, V) substrate is defined in UNITARES v6.8.1 (Zenodo DOI 10.5281/zenodo.19647159) with a reference implementation. Experiments are reproducible against a public specification, not a private monitoring API.',
    Animation: ResearchAnimation,
  },
  'production': {
    title: 'Production AI Systems',
    icon: Server,
    color: 'orange',
    description: 'In production since November 2025. Per-decision (S, I, E, V) trace tied back to the state signature at execution — reproducible, exportable, and grounded in a public paper rather than a closed log format.',
    Animation: ProductionAnimation,
  },
}

const colorMap = {
  cyan: { bg: 'from-cyber-cyan/20', border: 'border-cyber-cyan/30', text: 'text-cyber-cyan', glow: 'shadow-cyber-cyan/20' },
  magenta: { bg: 'from-cyber-magenta/20', border: 'border-cyber-magenta/30', text: 'text-cyber-magenta', glow: 'shadow-cyber-magenta/20' },
  green: { bg: 'from-cyber-green/20', border: 'border-cyber-green/30', text: 'text-cyber-green', glow: 'shadow-cyber-green/20' },
  orange: { bg: 'from-orange-500/20', border: 'border-orange-500/30', text: 'text-orange-400', glow: 'shadow-orange-500/20' },
}

export default function IndustryModal({ isOpen, onClose, animationType }) {
  const content = modalContent[animationType]
  
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!content) return null

  const colors = colorMap[content.color]
  const Icon = content.icon

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="absolute inset-0 bg-dark-950/90 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          <motion.div
            className={`relative w-full max-w-lg bg-gradient-to-b ${colors.bg} to-dark-900 border ${colors.border} rounded-2xl overflow-hidden shadow-2xl ${colors.glow}`}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-dark-800 border ${colors.border} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${colors.text}`}>{content.title}</h3>
                    <p className="text-xs text-gray-500 font-mono">Use Case</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-dark-800 transition-colors text-gray-300 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-gray-300 text-sm mb-6">{content.description}</p>
              
              <div className="bg-dark-950/50 rounded-xl border border-dark-700 overflow-hidden">
                <content.Animation />
              </div>
              
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-600">
                <span className="font-mono">ESC</span>
                <span>or click outside to close</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
