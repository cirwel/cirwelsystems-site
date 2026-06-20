import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function Footer() {
  const { isDark } = useTheme()
  const currentYear = new Date().getFullYear()

  const links = [
    { name: 'Problem', href: '/#about' },
    { name: 'Moat', href: '/#technology' },
    { name: 'Markets', href: '/#industries' },
    { name: 'Product', href: '/#platform' },
    { name: 'IP', href: '/#ip' },
    { name: 'Contact', href: '/#contact' },
  ]

  return (
    <footer className="relative overflow-hidden">
            
      <motion.div 
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan/30 to-transparent"
      />
      
      <div className="absolute inset-0 circuit-pattern opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <motion.a 
              href="/" 
              className="flex items-center gap-3 group mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden">
                <img src="/logo.webp" alt="CIRWEL" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className={`text-xl font-bold tracking-tight group-hover:text-cyber-cyan transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  CIRWEL
                </span>
                <span className="text-[10px] font-mono text-cyber-cyan/50 tracking-widest -mt-1">
                  SYSTEMS
                </span>
              </div>
            </motion.a>
            
            <p className={`leading-relaxed mb-6 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              The governance layer for autonomous AI — making AI agents measurable, auditable, and insurable.
            </p>
            
            <a 
              href="mailto:founder@cirwel.org" 
              className="inline-flex items-center gap-2 text-cyber-cyan hover:text-cyber-magenta transition-colors text-sm font-mono"
            >
              founder@cirwel.org
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          <div>
            <h4 className="font-mono text-xs text-cyber-cyan/70 mb-6 tracking-wider uppercase">Navigation</h4>
            <ul className="grid grid-cols-2 gap-3">
              {links.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-cyber-cyan transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="text-cyber-cyan/30 font-mono text-xs">{`0${index + 1}`}</span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs text-cyber-cyan/70 mb-6 tracking-wider uppercase">System Status</h4>
            <div className="cyber-card rounded-lg p-4 font-mono text-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-500">Platform</span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
                  <span className="text-cyber-green">Operational</span>
                </span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-500">MCP Server</span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
                  <span className="text-cyber-green">Online</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Source</span>
                <a
                  href="https://github.com/cirwel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyber-cyan hover:text-cyber-magenta transition-colors"
                >
                  Open / GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        <motion.div 
          className="h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan/20 to-transparent mb-8"
        />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <p className="text-gray-600 text-xs font-mono">
              &copy; {currentYear} CIRWEL Systems. All rights reserved.
            </p>
            <Link
              to="/privacy"
              className="text-gray-500 hover:text-cyber-cyan text-xs font-mono transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
          
          <div className="flex items-center gap-1">
            <span className="text-cyber-cyan/30 font-mono text-xs mr-2">{'<'}{'/'}</span>
            <span className="text-gray-500 text-xs">AI Governance & Compliance</span>
            <span className="text-cyber-cyan/30 font-mono text-xs ml-2">{'>'}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
