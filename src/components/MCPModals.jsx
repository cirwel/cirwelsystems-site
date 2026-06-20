import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { X, Activity, ShieldCheck, RefreshCw, Users, Gauge, Eye, Database, Network, Cpu } from 'lucide-react'

function StateEvolutionAnimation() {
  const [points, setPoints] = useState([])
  const [time, setTime] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => {
        const newT = t + 0.1
        setPoints(prev => {
          const newPoints = [...prev, {
            x: newT * 8,
            y1: 50 + Math.sin(newT * 0.8) * 20 + Math.sin(newT * 1.5) * 10,
            y2: 50 + Math.cos(newT * 0.6) * 15 + Math.sin(newT * 2) * 8,
            y3: 50 + Math.sin(newT * 0.4 + 1) * 18 + Math.cos(newT * 1.2) * 5,
          }].slice(-50)
          return newPoints
        })
        return newT > 12 ? 0 : newT
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const createPath = (key) => {
    if (points.length < 2) return ''
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p[key]}`).join(' ')
  }

  return (
    <div className="relative w-full h-64 md:h-72">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00d4e6" stopOpacity="0" />
            <stop offset="100%" stopColor="#00d4e6" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="magentaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff00ff" stopOpacity="0" />
            <stop offset="100%" stopColor="#ff00ff" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ff88" stopOpacity="0" />
            <stop offset="100%" stopColor="#00ff88" stopOpacity="1" />
          </linearGradient>
        </defs>
        
        {[20, 40, 60, 80].map(y => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#ffffff" strokeOpacity="0.05" />
        ))}
        
        <motion.path d={createPath('y1')} fill="none" stroke="url(#cyanGrad)" strokeWidth="1.5" />
        <motion.path d={createPath('y2')} fill="none" stroke="url(#magentaGrad)" strokeWidth="1.5" />
        <motion.path d={createPath('y3')} fill="none" stroke="url(#greenGrad)" strokeWidth="1.5" />
        
        {points.length > 0 && (
          <>
            <circle cx={points[points.length-1]?.x} cy={points[points.length-1]?.y1} r="2" fill="#00d4e6" />
            <circle cx={points[points.length-1]?.x} cy={points[points.length-1]?.y2} r="2" fill="#ff00ff" />
            <circle cx={points[points.length-1]?.x} cy={points[points.length-1]?.y3} r="2" fill="#00ff88" />
          </>
        )}
      </svg>
      
      <div className="absolute top-2 right-2 space-y-1 text-xs font-mono">
        <div className="flex items-center gap-2"><span className="w-3 h-0.5 bg-cyber-cyan" /> Entropy (S)</div>
        <div className="flex items-center gap-2"><span className="w-3 h-0.5 bg-cyber-magenta" /> Mutual Info (I)</div>
        <div className="flex items-center gap-2"><span className="w-3 h-0.5 bg-cyber-green" /> Residual (V)</div>
      </div>
      
      <p className="absolute bottom-2 left-0 right-0 text-center text-xs text-gray-500 font-mono">
        (S, I, V) co-evolve under the measured substrate dynamics
      </p>
    </div>
  )
}

function CircuitBreakerAnimation() {
  const [load, setLoad] = useState(20)
  const [isTripped, setIsTripped] = useState(false)
  const directionRef = useRef(1)
  const timeoutRef = useRef(null)
  const isRecoveringRef = useRef(false)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setLoad(prev => {
        let next = prev + directionRef.current * 2
        
        if (next >= 85 && !isRecoveringRef.current) {
          isRecoveringRef.current = true
          setIsTripped(true)
          directionRef.current = -1
          timeoutRef.current = setTimeout(() => {
            setIsTripped(false)
          }, 1500)
        }
        
        if (next <= 15 && isRecoveringRef.current) {
          isRecoveringRef.current = false
        }
        
        return Math.max(10, Math.min(90, next))
      })
    }, 80)
    
    return () => {
      clearInterval(interval)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="relative w-full h-64 md:h-72 flex flex-col items-center justify-center">
      <div className="relative w-64 h-32">
        <svg className="w-full h-full" viewBox="0 0 200 100">
          <line x1="20" y1="50" x2="60" y2="50" stroke="#00d4e6" strokeWidth="3" />
          
          <motion.g
            animate={{ rotate: isTripped ? 45 : 0 }}
            style={{ originX: '80px', originY: '50px' }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <line x1="60" y1="50" x2="100" y2="50" stroke={isTripped ? '#ff4444' : '#00d4e6'} strokeWidth="3" />
          </motion.g>
          
          <circle cx="60" cy="50" r="4" fill="#1a1a24" stroke="#00d4e6" strokeWidth="2" />
          
          <line x1="100" y1="50" x2="140" y2="50" stroke="#00d4e6" strokeWidth="3" strokeDasharray={isTripped ? "4 4" : "0"} />
          <line x1="140" y1="50" x2="180" y2="50" stroke="#00d4e6" strokeWidth="3" />
          
          <circle cx="100" cy="50" r="4" fill="#1a1a24" stroke={isTripped ? '#ff4444' : '#00d4e6'} strokeWidth="2" />
          
          {!isTripped && (
            <motion.circle
              cx="20"
              cy="50"
              r="3"
              fill="#00d4e6"
              animate={{ cx: [20, 180] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </svg>
      </div>
      
      <div className="mt-4 w-48">
        <div className="flex justify-between text-xs font-mono mb-1">
          <span className="text-gray-300">System Load</span>
          <span className={load > 70 ? 'text-red-400' : load > 50 ? 'text-yellow-400' : 'text-green-400'}>
            {Math.round(load)}%
          </span>
        </div>
        <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: load > 70 ? '#ff4444' : load > 50 ? '#ffaa00' : '#00ff88',
            }}
            animate={{ width: `${load}%` }}
          />
        </div>
      </div>
      
      <AnimatePresence>
        {isTripped && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-4 px-4 py-2 bg-red-500/20 border border-red-500 rounded-lg"
          >
            <div className="flex items-center gap-2 text-red-400 text-xs font-mono">
              <motion.div className="w-2 h-2 bg-red-500 rounded-full" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.3, repeat: Infinity }} />
              CIRCUIT BREAKER TRIPPED
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <p className="absolute bottom-2 text-xs text-gray-500 font-mono">
        Automatic protection when thresholds exceeded
      </p>
    </div>
  )
}

function DialecticRecoveryAnimation() {
  const [phase, setPhase] = useState(0)
  const phases = ['Agent A flags issue', 'Agent B reviews', 'Consensus reached', 'Recovery complete']
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(p => (p + 1) % 4)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-64 md:h-72 flex flex-col items-center justify-center">
      <div className="flex items-center gap-8 md:gap-16">
        <motion.div
          className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center ${phase === 0 ? 'border-yellow-500 bg-yellow-500/20' : phase === 3 ? 'border-green-500 bg-green-500/20' : 'border-cyber-cyan/50 bg-cyber-cyan/10'}`}
          animate={{ scale: phase === 0 ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-2xl">🤖</span>
          <span className="absolute -bottom-6 text-xs font-mono text-gray-300">Agent A</span>
        </motion.div>
        
        <div className="relative w-16 md:w-24 h-1">
          <div className="absolute inset-0 bg-dark-700 rounded-full" />
          <motion.div
            className="absolute h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #00d4e6, #ff00ff)' }}
            animate={{ 
              width: phase >= 1 ? '100%' : '0%',
              opacity: phase >= 1 && phase < 3 ? 1 : 0.3
            }}
            transition={{ duration: 0.5 }}
          />
          {phase >= 1 && phase < 3 && (
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white"
              animate={{ left: ['0%', '100%', '0%'] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </div>
        
        <motion.div
          className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center ${phase === 1 ? 'border-cyber-magenta bg-cyber-magenta/20' : phase === 3 ? 'border-green-500 bg-green-500/20' : 'border-cyber-cyan/50 bg-cyber-cyan/10'}`}
          animate={{ scale: phase === 1 ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-2xl">🤖</span>
          <span className="absolute -bottom-6 text-xs font-mono text-gray-300">Agent B</span>
        </motion.div>
      </div>
      
      <motion.div
        className="mt-12 px-4 py-2 rounded-lg border"
        animate={{
          borderColor: phase === 3 ? '#00ff88' : phase === 2 ? '#00d4e6' : '#666',
          backgroundColor: phase === 3 ? 'rgba(0,255,136,0.1)' : 'transparent'
        }}
      >
        <p className="text-sm font-mono text-center">
          {phases[phase]}
          {phase === 3 && <span className="ml-2 text-green-400">✓</span>}
        </p>
      </motion.div>
      
      <p className="absolute bottom-2 text-xs text-gray-500 font-mono">
        Peer-review enables autonomous recovery
      </p>
    </div>
  )
}

function MultiAgentFleetAnimation() {
  const [agents, setAgents] = useState(
    Array.from({ length: 9 }, (_, i) => ({ id: i, health: 80 + Math.random() * 20, status: 'healthy' }))
  )
  
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => {
        let health = agent.health + (Math.random() - 0.5) * 10
        health = Math.max(20, Math.min(100, health))
        const status = health > 70 ? 'healthy' : health > 40 ? 'warning' : 'critical'
        return { ...agent, health, status }
      }))
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const statusColors = {
    healthy: 'bg-green-500',
    warning: 'bg-yellow-500',
    critical: 'bg-red-500'
  }

  return (
    <div className="relative w-full h-64 md:h-72 flex flex-col items-center justify-center">
      <div className="grid grid-cols-3 gap-3">
        {agents.map(agent => (
          <motion.div
            key={agent.id}
            className="w-14 h-14 md:w-16 md:h-16 rounded-lg bg-dark-800 border border-gray-700 flex flex-col items-center justify-center relative overflow-hidden"
            animate={{
              borderColor: agent.status === 'healthy' ? '#00ff88' : agent.status === 'warning' ? '#ffaa00' : '#ff4444'
            }}
          >
            <span className="text-lg mb-1">🤖</span>
            <div className="w-8 h-1 bg-dark-900 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${statusColors[agent.status]}`}
                animate={{ width: `${agent.health}%` }}
              />
            </div>
            <motion.div
              className={`absolute top-1 right-1 w-2 h-2 rounded-full ${statusColors[agent.status]}`}
              animate={{ opacity: agent.status !== 'healthy' ? [1, 0.3, 1] : 1 }}
              transition={{ duration: 0.5, repeat: agent.status !== 'healthy' ? Infinity : 0 }}
            />
          </motion.div>
        ))}
      </div>
      
      <div className="mt-4 flex items-center gap-4 text-xs font-mono">
        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" /> Healthy</div>
        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500" /> Warning</div>
        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Critical</div>
      </div>
      
      <p className="absolute bottom-2 text-xs text-gray-500 font-mono">
        Fleet-wide health monitoring in real-time
      </p>
    </div>
  )
}

function AdaptiveControlAnimation() {
  const [params, setParams] = useState([
    { name: 'Sensitivity', value: 50 },
    { name: 'Threshold', value: 60 },
    { name: 'Response', value: 40 },
  ])
  
  useEffect(() => {
    const interval = setInterval(() => {
      setParams(prev => prev.map(p => ({
        ...p,
        value: Math.max(20, Math.min(80, p.value + (Math.random() - 0.5) * 8))
      })))
    }, 300)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-64 md:h-72 flex flex-col items-center justify-center gap-4">
      {params.map((param, i) => (
        <div key={param.name} className="w-48">
          <div className="flex justify-between text-xs font-mono mb-1">
            <span className="text-gray-300">{param.name}</span>
            <motion.span className="text-cyber-cyan">{Math.round(param.value)}%</motion.span>
          </div>
          <div className="relative h-2 bg-dark-800 rounded-full">
            <motion.div
              className="absolute h-full rounded-full"
              style={{ background: `linear-gradient(90deg, #00d4e6, ${i === 0 ? '#ff00ff' : i === 1 ? '#00ff88' : '#0066ff'})` }}
              animate={{ width: `${param.value}%` }}
              transition={{ type: 'spring', stiffness: 100 }}
            />
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"
              animate={{ left: `calc(${param.value}% - 6px)` }}
              transition={{ type: 'spring', stiffness: 100 }}
            />
          </div>
        </div>
      ))}
      
      <div className="flex items-center gap-2 mt-2">
        <motion.div
          className="w-5 h-5 border border-cyber-cyan rounded-full flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <Gauge className="w-3 h-3 text-cyber-cyan" />
        </motion.div>
        <span className="text-xs text-gray-300 font-mono">Auto-tuning active</span>
      </div>
      
      <p className="absolute bottom-2 text-xs text-gray-500 font-mono">
        Parameters self-adjust for optimal operation
      </p>
    </div>
  )
}

function AnomalyDetectionAnimation() {
  const [data, setData] = useState(Array.from({ length: 30 }, () => 50 + Math.random() * 10))
  const [anomalyIndex, setAnomalyIndex] = useState(-1)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)]
        const isAnomaly = Math.random() < 0.1
        const newValue = isAnomaly ? 20 + Math.random() * 10 : 45 + Math.random() * 15
        newData.push(newValue)
        if (isAnomaly) setAnomalyIndex(29)
        else setAnomalyIndex(i => i > 0 ? i - 1 : -1)
        return newData
      })
    }, 200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-64 md:h-72 flex flex-col items-center justify-center">
      <svg className="w-full h-40" viewBox="0 0 100 60" preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00d4e6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00d4e6" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        <line x1="0" y1="12" x2="100" y2="12" stroke="#00ff88" strokeWidth="0.3" strokeDasharray="2 2" opacity="0.5" />
        <text x="2" y="10" fill="#00ff88" fontSize="3" opacity="0.7">Normal</text>
        
        <line x1="0" y1="35" x2="100" y2="35" stroke="#ff4444" strokeWidth="0.3" strokeDasharray="2 2" opacity="0.5" />
        <text x="2" y="38" fill="#ff4444" fontSize="3" opacity="0.7">Alert</text>
        
        <path
          d={`M 0 ${60 - data[0]} ${data.map((d, i) => `L ${(i / 29) * 100} ${60 - d}`).join(' ')} L 100 60 L 0 60 Z`}
          fill="url(#waveGrad)"
        />
        
        <path
          d={`M 0 ${60 - data[0]} ${data.map((d, i) => `L ${(i / 29) * 100} ${60 - d}`).join(' ')}`}
          fill="none"
          stroke="#00d4e6"
          strokeWidth="1"
        />
        
        {anomalyIndex >= 0 && (
          <g>
            <circle cx={(anomalyIndex / 29) * 100} cy={60 - data[anomalyIndex]} r="3" fill="#ff4444" />
            <motion.circle
              cx={(anomalyIndex / 29) * 100}
              cy={60 - data[anomalyIndex]}
              r="6"
              fill="none"
              stroke="#ff4444"
              strokeWidth="1"
              animate={{ r: [6, 12], opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </g>
        )}
      </svg>
      
      <AnimatePresence>
        {anomalyIndex >= 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="px-3 py-1 bg-red-500/20 border border-red-500 rounded text-xs font-mono text-red-400"
          >
            ⚠️ Anomaly detected
          </motion.div>
        )}
      </AnimatePresence>
      
      <p className="absolute bottom-2 text-xs text-gray-500 font-mono">
        Real-time behavioral anomaly detection
      </p>
    </div>
  )
}

function KnowledgeGraphAnimation() {
  const [activeNode, setActiveNode] = useState(0)
  const nodes = [
    { x: 50, y: 25, label: 'Pattern A' },
    { x: 25, y: 50, label: 'Pattern B' },
    { x: 75, y: 50, label: 'Pattern C' },
    { x: 35, y: 75, label: 'Pattern D' },
    { x: 65, y: 75, label: 'Pattern E' },
  ]
  const edges = [[0,1], [0,2], [1,3], [2,4], [1,2], [3,4]]
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode(n => (n + 1) % nodes.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-64 md:h-72 flex items-center justify-center">
      <svg className="w-64 h-56" viewBox="0 0 100 100">
        {edges.map(([from, to], i) => (
          <motion.line
            key={i}
            x1={nodes[from].x}
            y1={nodes[from].y}
            x2={nodes[to].x}
            y2={nodes[to].y}
            stroke="#00d4e6"
            strokeWidth="0.5"
            opacity={activeNode === from || activeNode === to ? 0.8 : 0.2}
          />
        ))}
        
        {edges.map(([from, to], i) => (
          (activeNode === from || activeNode === to) && (
            <motion.circle
              key={`pulse-${i}`}
              r="1.5"
              fill="#00d4e6"
              initial={{ cx: nodes[from].x, cy: nodes[from].y }}
              animate={{ cx: nodes[to].x, cy: nodes[to].y }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )
        ))}
        
        {nodes.map((node, i) => (
          <g key={i}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={activeNode === i ? 8 : 6}
              fill={activeNode === i ? '#00d4e6' : '#1a1a24'}
              stroke="#00d4e6"
              strokeWidth="1"
              animate={{ scale: activeNode === i ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.5 }}
            />
            <text x={node.x} y={node.y + 15} textAnchor="middle" fill="#666" fontSize="4">{node.label}</text>
          </g>
        ))}
      </svg>
      
      <p className="absolute bottom-2 text-xs text-gray-500 font-mono">
        Cross-agent learning and pattern sharing
      </p>
    </div>
  )
}

function MCPIntegrationAnimation() {
  const [step, setStep] = useState(0)
  const tools = ['Cursor', 'Claude', 'VS Code']
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStep(s => (s + 1) % 4)
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-64 md:h-72 flex flex-col items-center justify-center">
      <div className="flex items-center gap-6 md:gap-10">
        <div className="flex flex-col items-center gap-3">
          {tools.map((tool, i) => (
            <motion.div
              key={tool}
              className="px-3 py-1.5 rounded border text-xs font-mono"
              animate={{
                borderColor: step === 1 && i === step % 3 ? '#00d4e6' : '#333',
                backgroundColor: step >= 2 ? 'rgba(0,212,230,0.1)' : 'transparent'
              }}
            >
              {tool}
            </motion.div>
          ))}
        </div>
        
        <div className="flex flex-col items-center gap-1">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-12 md:w-16 h-0.5 bg-cyber-cyan/30 relative overflow-hidden"
            >
              {step >= 1 && (
                <motion.div
                  className="absolute h-full w-4 bg-cyber-cyan"
                  animate={{ left: ['-20%', '120%'] }}
                  transition={{ duration: 0.8, delay: i * 0.1, repeat: Infinity, repeatDelay: 1 }}
                />
              )}
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="w-20 h-20 rounded-xl border-2 flex flex-col items-center justify-center"
          animate={{
            borderColor: step >= 2 ? '#00ff88' : '#00d4e6',
            boxShadow: step >= 2 ? '0 0 20px rgba(0,255,136,0.3)' : 'none'
          }}
        >
          <Network className="w-6 h-6 text-cyber-cyan mb-1" />
          <span className="text-[10px] font-mono text-gray-300">MCP Server</span>
        </motion.div>
      </div>
      
      <motion.div
        className="mt-6 px-3 py-1 rounded border text-xs font-mono"
        animate={{
          borderColor: step === 3 ? '#00ff88' : '#333',
          color: step === 3 ? '#00ff88' : '#666'
        }}
      >
        {step === 0 && 'Initializing...'}
        {step === 1 && 'Handshake in progress'}
        {step === 2 && 'Protocol established'}
        {step === 3 && '✓ Connected'}
      </motion.div>
      
      <p className="absolute bottom-2 text-xs text-gray-500 font-mono">
        Standard protocol for seamless integration
      </p>
    </div>
  )
}

function LocalFirstAnimation() {
  const [latency, setLatency] = useState(0.3)
  const [requests, setRequests] = useState([])
  
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(0.2 + Math.random() * 0.5)
      setRequests(prev => {
        const newReq = { id: Date.now(), x: 20 }
        return [...prev.slice(-3), newReq]
      })
    }, 800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-64 md:h-72 flex flex-col items-center justify-center">
      <div className="flex items-center gap-8 md:gap-12">
        <div className="flex flex-col items-center">
          <motion.div className="w-16 h-16 rounded-xl bg-dark-800 border border-cyber-cyan flex items-center justify-center">
            <span className="text-2xl">💻</span>
          </motion.div>
          <span className="text-xs font-mono text-gray-300 mt-2">Local</span>
        </div>
        
        <div className="relative w-20 h-1 bg-dark-700 rounded-full overflow-visible">
          {requests.map(req => (
            <motion.div
              key={req.id}
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyber-cyan"
              initial={{ left: 0 }}
              animate={{ left: '100%' }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
        
        <div className="flex flex-col items-center">
          <motion.div
            className="w-16 h-16 rounded-xl bg-dark-800 border border-cyber-green flex items-center justify-center"
            animate={{ boxShadow: ['0 0 10px rgba(0,255,136,0.3)', '0 0 20px rgba(0,255,136,0.5)', '0 0 10px rgba(0,255,136,0.3)'] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Cpu className="w-8 h-8 text-cyber-green" />
          </motion.div>
          <span className="text-xs font-mono text-gray-300 mt-2">CIRWEL</span>
        </div>
      </div>
      
      <div className="mt-6 flex items-center gap-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-cyber-cyan">{latency.toFixed(1)}ms</div>
          <div className="text-xs text-gray-500">Latency</div>
        </div>
        <div className="w-px h-8 bg-gray-700" />
        <div className="text-center">
          <div className="text-2xl font-bold text-cyber-green">0</div>
          <div className="text-xs text-gray-500">Cloud Deps</div>
        </div>
        <div className="w-px h-8 bg-gray-700" />
        <div className="text-center">
          <div className="text-2xl font-bold text-cyber-magenta">100%</div>
          <div className="text-xs text-gray-500">Privacy</div>
        </div>
      </div>
      
      <p className="absolute bottom-2 text-xs text-gray-500 font-mono">
        All data stays local
      </p>
    </div>
  )
}

const animations = {
  'state-evolution': {
    title: 'State Evolution under (S, I, E, V)',
    subtitle: 'The four measured variables of the substrate',
    icon: Activity,
    color: 'cyan',
    Component: StateEvolutionAnimation,
    insight: 'Per decision: S = H(Y|x) response entropy, I = I(X;Y) context–response mutual information, E = −F (negative variational free energy; high E = low surprise), V the accumulated free-energy residual. UNITARES v6.8.1 specifies the update rule; CIRWEL streams the values.',
  },
  'circuit-breakers': {
    title: 'V-Residual Circuit Breakers',
    subtitle: 'Halting before the contraction bound is violated',
    icon: ShieldCheck,
    color: 'magenta',
    Component: CircuitBreakerAnimation,
    insight: 'Contraction analysis (UNITARES v6.8.1, Appendix B) bounds the V residual along stable trajectories. When the projected V would breach that bound, CIRWEL halts the agent — the intervention is tied to a paper-backed stability condition, not a guessed threshold.',
  },
  'dialectic-recovery': {
    title: 'Peer-Assisted Recovery',
    subtitle: 'Agents resolve drift via cross-checking, not retraining',
    icon: RefreshCw,
    color: 'blue',
    Component: DialecticRecoveryAnimation,
    insight: 'After a halt, peer agents re-derive the (S, I, E, V) trajectory and propose a consensus continuation. Recovery is a substrate-level protocol, not a one-off prompt patch.',
  },
  'multi-agent-fleet': {
    title: 'Heterogeneous Fleet Coordination',
    subtitle: 'One substrate across mixed model providers and roles',
    icon: Users,
    color: 'green',
    Component: MultiAgentFleetAnimation,
    insight: 'Each agent — regardless of provider or role — exposes the same (S, I, E, V) signal. Fleet-wide health, drift, and recovery are computed against one comparable state vector.',
  },
  'adaptive-control': {
    title: 'Calibration, Not Training',
    subtitle: 'Parameters fit to measured state, not gradient descent',
    icon: Gauge,
    color: 'orange',
    Component: AdaptiveControlAnimation,
    insight: 'Class-conditional calibration: scale constants and healthy operating points fit per agent class (Lumen, Sentinel, Vigil, Watcher, default), not via a single fleet-wide normalization. No model weights are trained — substrate parameters are fit from observed (S, I, E, V) trajectories.',
  },
  'anomaly-detection': {
    title: 'Drift Detection on (S, I, E, V)',
    subtitle: 'Statistical deviation in the measured state, not in outputs',
    icon: Eye,
    color: 'purple',
    Component: AnomalyDetectionAnimation,
    insight: 'Drift surfaces in the substrate variables before it surfaces in user-visible outputs — entropy spikes, mutual information collapses, or V begins to grow super-linearly.',
  },
  'knowledge-graph': {
    title: 'Per-Decision Audit Trail',
    subtitle: 'Each decision tied back to its (S, I, E, V) signature',
    icon: Database,
    color: 'cyan',
    Component: KnowledgeGraphAnimation,
    insight: 'Every decision is recorded with its substrate state at execution time. Reproducible, exportable, and grounded in a public paper rather than a closed log format.',
  },
  'mcp-integration': {
    title: 'MCP Integration',
    subtitle: 'How tool integration works',
    icon: Network,
    color: 'blue',
    Component: MCPIntegrationAnimation,
    insight: 'Standard Model Context Protocol enables seamless integration with Cursor, Claude Desktop, VS Code, and other MCP-compatible tools.',
  },
  'local-first': {
    title: 'Local-First Architecture',
    subtitle: 'How privacy and speed are achieved',
    icon: Cpu,
    color: 'green',
    Component: LocalFirstAnimation,
    insight: 'All data stored locally with zero cloud dependencies and complete privacy for sensitive AI operations.',
  },
}

export default function MCPModal({ isOpen, onClose, animationType }) {
  const modalRef = useRef(null)
  const config = animations[animationType]
  
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

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose()
    }
  }

  if (!config) return null

  const colors = {
    cyan: { border: 'border-cyber-cyan/30', text: 'text-cyber-cyan', bg: 'bg-cyber-cyan/10' },
    magenta: { border: 'border-cyber-magenta/30', text: 'text-cyber-magenta', bg: 'bg-cyber-magenta/10' },
    blue: { border: 'border-cyber-blue/30', text: 'text-cyber-blue', bg: 'bg-cyber-blue/10' },
    green: { border: 'border-cyber-green/30', text: 'text-cyber-green', bg: 'bg-cyber-green/10' },
    orange: { border: 'border-cyber-orange/30', text: 'text-cyber-orange', bg: 'bg-cyber-orange/10' },
    purple: { border: 'border-purple-500/30', text: 'text-purple-400', bg: 'bg-purple-500/10' },
  }[config.color]

  const Icon = config.icon

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="absolute inset-0 bg-dark-950/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          <motion.div
            ref={modalRef}
            className={`relative w-full max-w-lg bg-dark-900 rounded-2xl border ${colors.border} overflow-hidden shadow-2xl`}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none" />
            
            <div className={`relative border-b ${colors.border} p-4 flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center border ${colors.border}`}>
                  <Icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                <div>
                  <h3 className="font-bold text-white">{config.title}</h3>
                  <p className="text-xs text-gray-500">{config.subtitle}</p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-dark-800 hover:bg-dark-700 flex items-center justify-center transition-colors group"
              >
                <X className="w-4 h-4 text-gray-500 group-hover:text-white" />
              </button>
            </div>
            
            <div className="relative p-4">
              <config.Component />
            </div>
            
            <div className={`relative border-t ${colors.border} p-4`}>
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <span className={`text-xs ${colors.text}`}>💡</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {config.insight}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { animations }
