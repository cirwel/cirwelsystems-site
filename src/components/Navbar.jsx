import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const navigate = useNavigate()
  const { isDark, refined, toggleRefined } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isHomePage = window.location.pathname === '/'

  const handleContactClick = (e) => {
    e.preventDefault()
    if (isHomePage) {
      const contactSection = document.getElementById('contact')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      navigate('/')
      setTimeout(() => {
        const contactSection = document.getElementById('contact')
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' })
        } else {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
        }
      }, 300)
    }
  }

  const handleNavClick = (e, item) => {
    if (item.href.startsWith('/') && !item.href.startsWith('/#')) {
      e.preventDefault()
      navigate(item.href)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = isHomePage
    ? [
        { name: 'Problem', href: '#about' },
        { name: 'Approach', href: '#technology' },
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'Product', href: '#platform' },
        { name: 'IP', href: '/patents' },
        { name: 'Contact', href: '#contact' },
      ]
    : [
        { name: 'Home', href: '/' },
        { name: 'Patents', href: '/patents' },
        { name: 'Privacy', href: '/privacy' },
        { name: 'Contact', href: '/#contact' },
      ]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? isDark 
            ? 'bg-dark-950/90 backdrop-blur-xl border-b border-cyber-cyan/10' 
            : 'bg-white/90 backdrop-blur-xl border-b border-gray-200'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <motion.a 
            href="/" 
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 rounded-lg overflow-hidden relative">
              <img 
                src="/logo.webp" 
                alt="CIRWEL Logo" 
                className="w-full h-full object-cover"
              />
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

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => item.name === 'Contact' ? handleContactClick(e) : handleNavClick(e, item)}
                className={`relative px-4 py-2 hover:text-cyber-cyan transition-all font-medium text-sm group overflow-hidden ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ 
                  textShadow: '0 0 8px rgba(0, 212, 230, 0.5)',
                }}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyber-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </motion.a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <motion.button
              onClick={toggleRefined}
              title={refined ? 'Switch to vivid theme' : 'Switch to refined theme'}
              aria-pressed={refined}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-xs border transition-colors duration-300 ${
                refined
                  ? 'border-cyber-cyan/30 text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan/50'
                  : 'border-cyber-cyan/50 text-cyber-cyan bg-cyber-cyan/5'
              }`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              {refined ? 'Refined' : 'Vivid'}
            </motion.button>
            <motion.a
              href={isHomePage ? '#contact' : '/#contact'}
              onClick={handleContactClick}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm border transition-colors duration-300 ${isDark ? 'border-cyber-cyan/50 bg-dark-900/80 hover:bg-cyber-cyan/10' : 'border-cyber-blue/50 bg-white hover:bg-cyber-blue/10'}`}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 20px rgba(0, 212, 230, 0.3)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={`transition-colors duration-300 ${isDark ? 'text-cyber-cyan hover:text-white' : 'text-cyber-blue hover:text-gray-900'}`}>
                Contact
              </span>
            </motion.a>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button
              className={`p-2 ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden backdrop-blur-xl border-b ${isDark ? 'bg-dark-950/95 border-cyber-cyan/10' : 'bg-white/95 border-gray-200'}`}
          >
            <div className="px-6 py-4 space-y-1">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 hover:text-cyber-cyan rounded-lg transition-all font-medium ${isDark ? 'text-gray-300 hover:bg-cyber-cyan/5' : 'text-gray-600 hover:bg-gray-100'}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={(e) => {
                    setIsMobileMenuOpen(false)
                    if (item.name === 'Contact') {
                      handleContactClick(e)
                    } else {
                      handleNavClick(e, item)
                    }
                  }}
                >
                  <span className="font-mono text-cyber-cyan/50 mr-2">{`0${index + 1}`}</span>
                  {item.name}
                </motion.a>
              ))}
              <motion.button
                onClick={toggleRefined}
                aria-pressed={refined}
                className="w-full flex items-center justify-center gap-2 mt-2 px-4 py-3 rounded-lg font-mono text-sm border border-cyber-cyan/30 text-gray-300 hover:text-cyber-cyan hover:bg-cyber-cyan/5 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <Sparkles className="w-4 h-4" />
                Theme: {refined ? 'Refined' : 'Vivid'}
              </motion.button>
              <motion.a
                href={isHomePage ? '#contact' : '/#contact'}
                className="block mt-4 px-4 py-3 text-center cyber-card rounded-lg font-semibold text-cyber-cyan border-cyber-cyan/30 hover:bg-cyber-cyan/10 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={(e) => {
                  setIsMobileMenuOpen(false)
                  handleContactClick(e)
                }}
              >
                Contact
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
