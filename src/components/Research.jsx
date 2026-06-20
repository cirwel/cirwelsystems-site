import { motion } from 'framer-motion'
import { FileText, Github, ArrowUpRight } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const cards = [
  {
    label: 'Paper',
    title: 'Methodology & technical reference',
    description:
      'The methodology paper — system design, how we calibrate, and how we measure it. Citable, reproducible.',
    href: 'https://doi.org/10.5281/zenodo.19647159',
    linkText: 'doi.org/10.5281/zenodo.19647159',
    Icon: FileText,
    color: 'cyan',
  },
  {
    label: 'Code',
    title: 'Reference implementation',
    description:
      'Source for the unitares runtime that runs in production. Inspect, audit, reproduce.',
    href: 'https://github.com/cirwel/unitares',
    linkText: 'github.com/cirwel/unitares',
    Icon: Github,
    color: 'magenta',
  },
]

const colorMap = {
  cyan: {
    border: 'rgba(0, 212, 230, 0.4)',
    text: 'text-cyber-cyan',
    glow: 'rgba(0, 212, 230, 0.15)',
  },
  magenta: {
    border: 'rgba(224, 64, 224, 0.4)',
    text: 'text-cyber-magenta',
    glow: 'rgba(224, 64, 224, 0.15)',
  },
}

function ResearchCard({ card, index }) {
  const { isDark } = useTheme()
  const c = colorMap[card.color]
  const { Icon } = card

  return (
    <motion.a
      href={card.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -3 }}
      className={`group relative block rounded-xl p-6 sm:p-7 border transition-colors ${
        isDark
          ? 'bg-dark-900/60 border-dark-700 hover:bg-dark-900/80'
          : 'bg-white/80 border-gray-200 hover:bg-white'
      }`}
      style={{
        borderColor: c.border,
        boxShadow: `0 0 0 1px ${c.glow}`,
      }}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center ${
              isDark ? 'bg-dark-800' : 'bg-gray-100'
            }`}
          >
            <Icon className={`w-4 h-4 ${c.text}`} />
          </div>
          <span
            className={`text-[10px] font-mono uppercase tracking-[0.2em] ${c.text}`}
          >
            {card.label}
          </span>
        </div>
        <ArrowUpRight
          className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
            isDark ? 'text-gray-500' : 'text-gray-400'
          }`}
        />
      </div>

      <h3
        className={`text-base sm:text-lg font-semibold mb-2 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}
      >
        {card.title}
      </h3>
      <p
        className={`text-sm leading-relaxed mb-4 ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}
      >
        {card.description}
      </p>
      <p
        className={`text-xs font-mono break-all ${
          isDark ? 'text-gray-500' : 'text-gray-500'
        } group-hover:${c.text}`}
      >
        {card.linkText}
      </p>
    </motion.a>
  )
}

export default function Research() {
  const { isDark } = useTheme()

  return (
    <section className="relative py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
          className="mb-8 sm:mb-10"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyber-cyan">
            Research
          </span>
          <h2
            className={`mt-2 text-2xl sm:text-3xl font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Paper-backed methodology, open reference code
          </h2>
          <p
            className={`mt-2 text-sm sm:text-base max-w-2xl ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            The production substrate is documented and externally resolvable.
            Read the paper, read the code.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {cards.map((card, i) => (
            <ResearchCard key={card.label} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
