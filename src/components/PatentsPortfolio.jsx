import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, Layers, Cpu, Brain, Shield, Scale, Calculator, CheckCircle, Calendar, Hash } from 'lucide-react'

const patentCategories = [
  {
    id: 'foundation',
    title: 'Foundation Layer',
    subtitle: 'September 16-18, 2025',
    icon: Layers,
    color: 'cyan',
    patents: [
      {
        number: 1,
        name: 'Dual-Log Architecture',
        filed: 'September 16, 2025',
        application: '63/882,605',
        description: 'Dual-log architecture for state synchronization in human-AI collaborative systems',
        innovation: 'Operational and reflective log architecture with cross-linking mechanisms'
      },
      {
        number: 2,
        name: 'State Transition Management',
        filed: 'September 18, 2025',
        application: '63/884,213',
        description: 'State transition management for AI governance systems with human oversight',
        innovation: 'Governance system infrastructure for state transitions'
      }
    ]
  },
  {
    id: 'core',
    title: 'Core Mechanisms',
    subtitle: 'September 22-26, 2025',
    icon: Cpu,
    color: 'green',
    patents: [
      {
        number: 3,
        name: 'Drift-Triggered Reset Mechanism (DTRM)',
        filed: 'September 22, 2025',
        application: '63/936,642',
        description: 'System for managing hybrid state synchronization through drift-triggered reset and continuity management',
        innovation: 'Drift detection, KL divergence monitoring, and automated reset mechanisms',
        status: 'Prior Art Search Completed'
      },
      {
        number: 4,
        name: 'Continuity Management',
        filed: 'September 26, 2025',
        application: '63/936,695',
        description: 'System and method for continuity management and custodianship of reflective logs in intelligent agents',
        innovation: 'Continuity management with restoration capsules and domain-specific segmentation'
      }
    ]
  },
  {
    id: 'advanced',
    title: 'Advanced Systems',
    subtitle: 'October 8-9, 2025',
    icon: Brain,
    color: 'magenta',
    patents: [
      {
        number: 5,
        name: 'Reasoning Path Generation System',
        filed: 'October 8, 2025',
        application: '63/936,824',
        description: 'Reasoning path generation architecture for auditable ethical decision-making in AI systems',
        innovation: 'Ethical decision-making framework with assumption graph traversal'
      },
      {
        number: 6,
        name: 'Real-Time Bias Detection',
        filed: 'October 8, 2025',
        application: '63/936,834',
        description: 'System and method for real-time bias detection and adaptive mitigation in co-autonomous human-AI decision-making',
        innovation: 'Real-time bias detection with adaptive mitigation mechanisms'
      }
    ]
  },
  {
    id: 'validation',
    title: 'Validation Systems',
    subtitle: 'November 2025',
    icon: Shield,
    color: 'orange',
    patents: [
      {
        number: 7,
        name: 'Multimodal Symbolic Reasoning Validator (MSRV)',
        filed: 'November 4, 2025',
        application: 'Pending',
        description: 'Multimodal symbolic reasoning validator with canonical MSG, reflexive integrity index, and adversarial oversight',
        innovation: 'Cross-modal validation with symbolic reasoning',
        status: 'Filed'
      },
      {
        number: 8,
        name: 'Meta-Governance Protocol',
        filed: 'November 2025',
        application: 'Provisional',
        description: 'Meta-governance protocol for reflexive validation',
        innovation: 'Meta-level governance for governance systems'
      },
      {
        number: 9,
        name: 'Dynamic Governance System',
        codename: 'ELLI/ARC',
        filed: 'November 2025',
        application: 'Provisional',
        description: 'Dynamic governance system with ELLI/ARC architecture',
        innovation: 'Continuation-in-part of Patent 2, integrates with Patents 7 & 8'
      }
    ]
  },
  {
    id: 'mathematical',
    title: 'Mathematical Foundations',
    subtitle: 'November 6, 2025',
    icon: Calculator,
    color: 'cyan',
    patents: [
      {
        number: 'M',
        name: 'UNITARES/HCK',
        filed: 'November 6, 2025',
        application: 'Pending',
        description: 'Mathematical foundations for hybrid continuity governance',
        innovation: 'UNITARES (Unified Nexus Information Transdisciplinary Adaptive Resonance Entropy System) and HCK (Hybrid Continuity Kernel) frameworks',
        status: 'Prior Art Search Completed'
      }
    ]
  }
]

const keyInnovations = [
  { name: 'Dual-Log Architecture', description: 'Separates operational and reflective reasoning' },
  { name: 'Drift-Triggered Reset', description: 'Automated reliability mechanisms' },
  { name: 'Continuity Management', description: 'State preservation and restoration' },
  { name: 'Reasoning Path Generation', description: 'Ethical decision-making framework' },
  { name: 'Real-Time Bias Detection', description: 'Adaptive mitigation systems' },
  { name: 'Multimodal Validation', description: 'Cross-modal symbolic reasoning' },
  { name: 'Mathematical Foundations', description: 'UNITARES/HCK frameworks' }
]

const colorMap = {
  cyan: {
    border: 'border-cyber-cyan/30',
    bg: 'bg-cyber-cyan/10',
    text: 'text-cyber-cyan',
    glow: 'rgba(0, 212, 230, 0.2)'
  },
  green: {
    border: 'border-cyber-green/30',
    bg: 'bg-cyber-green/10',
    text: 'text-cyber-green',
    glow: 'rgba(0, 224, 119, 0.2)'
  },
  magenta: {
    border: 'border-cyber-magenta/30',
    bg: 'bg-cyber-magenta/10',
    text: 'text-cyber-magenta',
    glow: 'rgba(224, 64, 224, 0.2)'
  },
  orange: {
    border: 'border-cyber-orange/30',
    bg: 'bg-cyber-orange/10',
    text: 'text-cyber-orange',
    glow: 'rgba(255, 102, 0, 0.2)'
  }
}

function PatentCard({ patent, color, index, isHighlighted }) {
  const colors = colorMap[color]
  const patentId = `patent-${patent.number}`
  
  return (
    <motion.div
      id={patentId}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`cyber-card rounded-xl p-6 ${colors.border} hover:border-opacity-60 transition-all duration-300 scroll-mt-24 relative`}
      whileHover={{ y: -4, boxShadow: `0 0 30px ${colors.glow}` }}
      animate={isHighlighted ? {
        boxShadow: [
          `0 0 0px ${colors.glow}`,
          `0 0 40px ${colors.glow}`,
          `0 0 20px ${colors.glow}`,
          `0 0 40px ${colors.glow}`,
          `0 0 0px ${colors.glow}`
        ]
      } : {}}
    >
      {isHighlighted && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.3, 0.1, 0.3, 0],
            scale: [1, 1.02, 1, 1.02, 1]
          }}
          transition={{ duration: 2 }}
          style={{ 
            border: `2px solid ${color === 'cyan' ? '#00d4e6' : color === 'green' ? '#00ff88' : color === 'magenta' ? '#ff00ff' : '#ff6600'}`,
            boxShadow: `inset 0 0 30px ${colors.glow}`
          }}
        />
      )}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className={`font-mono text-2xl font-bold ${colors.text}`}>
            {typeof patent.number === 'number' ? `0${patent.number}` : patent.number}
          </span>
          {patent.status && (
            <span className={`px-2 py-1 rounded text-xs font-mono ${colors.bg} ${colors.text}`}>
              {patent.status}
            </span>
          )}
        </div>
        <FileText className={`w-5 h-5 ${colors.text} opacity-50`} />
      </div>
      
      <h3 className="text-lg font-bold text-white mb-1">{patent.name}</h3>
      {patent.codename && (
        <p className={`text-sm font-mono ${colors.text} opacity-70 mb-3`}>"{patent.codename}"</p>
      )}
      
      <p className="text-gray-300 text-sm mb-4 leading-relaxed">{patent.description}</p>
      
      <div className={`p-3 rounded-lg ${colors.bg} mb-4`}>
        <p className="text-xs font-mono text-gray-500 mb-1">KEY INNOVATION</p>
        <p className="text-sm text-gray-300">{patent.innovation}</p>
      </div>
      
      <div className="flex flex-wrap gap-4 text-xs text-gray-500 font-mono">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {patent.filed}
        </div>
        <div className="flex items-center gap-1">
          <Hash className="w-3 h-3" />
          {patent.application}
        </div>
      </div>
    </motion.div>
  )
}

function CategorySection({ category, index, highlightedPatent }) {
  const colors = colorMap[category.color]
  const Icon = category.icon
  
  return (
    <motion.div
      id={category.id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-16 scroll-mt-28"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center border ${colors.border}`}>
          <Icon className={`w-6 h-6 ${colors.text}`} />
        </div>
        <div>
          <h2 className={`text-2xl font-bold ${colors.text}`}>{category.title}</h2>
          <p className="text-gray-500 font-mono text-sm">{category.subtitle}</p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {category.patents.map((patent, i) => (
          <PatentCard 
            key={patent.number} 
            patent={patent} 
            color={category.color} 
            index={i} 
            isHighlighted={highlightedPatent === `patent-${patent.number}`}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default function PatentsPortfolio() {
  const location = useLocation()
  
  const [highlightedPatent, setHighlightedPatent] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const highlightId = params.get('highlight')
    
    if (location.hash) {
      const categoryId = location.hash.slice(1)
      const scrollToElement = () => {
        const element = document.getElementById(categoryId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          if (highlightId) {
            setHighlightedPatent(`patent-${highlightId}`)
            setTimeout(() => setHighlightedPatent(null), 2500)
          }
        }
      }
      setTimeout(scrollToElement, 400)
    }
  }, [location.hash, location.search])

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span 
            className="text-cyber-cyan font-mono text-sm tracking-[0.3em] mb-4 block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            INTELLECTUAL PROPERTY
          </motion.span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Patent <span className="text-gradient-cyber">Portfolio</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Nine provisional applications were filed between September and November
            2025, covering the runtime-governance stack as it stood at filing. The
            system has evolved substantially since; the durable IP posture is the
            open one — Apache-2.0 releases and a DOI-versioned public record serving
            as prior art, never a gate on research or open-source use.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <div className="cyber-card rounded-xl px-6 py-4 border border-cyber-cyan/20">
              <p className="text-3xl font-bold text-cyber-cyan">9</p>
              <p className="text-gray-500 text-sm font-mono">Applications Filed (2025)</p>
            </div>
            <div className="cyber-card rounded-xl px-6 py-4 border border-cyber-green/20">
              <p className="text-3xl font-bold text-cyber-green">8</p>
              <p className="text-gray-500 text-sm font-mono">Provisional</p>
            </div>
            <div className="cyber-card rounded-xl px-6 py-4 border border-cyber-magenta/20">
              <p className="text-3xl font-bold text-cyber-magenta">1</p>
              <p className="text-gray-500 text-sm font-mono">Math Foundations</p>
            </div>
          </div>
          
          <p className="text-gray-500 font-mono text-sm mt-6">
            Filing Period: September 16 - November 6, 2025
          </p>
        </motion.div>

        {patentCategories.map((category, index) => (
          <CategorySection key={category.id} category={category} index={index} highlightedPatent={highlightedPatent} />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <h2 className="text-2xl font-bold text-center mb-8">
            Key <span className="text-gradient-cyber">Innovations</span>
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {keyInnovations.map((innovation, index) => (
              <motion.div
                key={innovation.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="cyber-card rounded-lg p-4 border border-white/10 hover:border-cyber-cyan/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-cyber-cyan flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">{innovation.name}</p>
                    <p className="text-sm text-gray-500">{innovation.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
