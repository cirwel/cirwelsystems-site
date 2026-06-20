import { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useTheme } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Footer from './components/Footer'
import CyberBackground from './components/CyberBackground'
import GlitchText from './components/GlitchText'

const Platform = lazy(() => import('./components/Patents'))
const Technology = lazy(() => import('./components/Technology'))
const StateDiagram = lazy(() => import('./components/StateDiagram'))
const Contact = lazy(() => import('./components/Contact'))
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'))
const PatentsPortfolio = lazy(() => import('./components/PatentsPortfolio'))
const Research = lazy(() => import('./components/Research'))

function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-dark-900/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div 
        className="h-full bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-magenta"
        style={{ width: `${scrollProgress}%` }}
      />
    </motion.div>
  )
}

function InitialLoader() {
  const { isDark } = useTheme()
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + Math.random() * 30
      })
    }, 50)
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center ${isDark ? 'bg-dark-950' : 'bg-gray-50'}`}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col items-center"
      >
        <div className="flex items-center gap-3 mb-6">
          <img src="/logo.webp" alt="CIRWEL" className="w-12 h-12 rounded-lg" />
          <GlitchText
            glitchOnLoad
            glitchOnHover={false}
            duration={600}
            className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            CIRWEL
          </GlitchText>
        </div>
        
        <div className={`w-48 h-0.5 rounded-full overflow-hidden ${isDark ? 'bg-dark-800' : 'bg-gray-200'}`}>
          <motion.div 
            className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-blue"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        
        <motion.p 
          className="mt-3 text-xs font-mono text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {progress < 100 ? 'Initializing...' : 'Ready'}
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

function SectionLoader() {
  return (
    <div className="min-h-[200px] flex items-center justify-center">
      <div className="flex items-center gap-2">
        <motion.div 
          className="w-2 h-2 rounded-full bg-cyber-cyan"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
        />
        <motion.div 
          className="w-2 h-2 rounded-full bg-cyber-cyan"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div 
          className="w-2 h-2 rounded-full bg-cyber-cyan"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
        />
      </div>
    </div>
  )
}

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0, 212, 230, 0.5)' }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-blue flex items-center justify-center shadow-lg shadow-cyber-cyan/30 border border-cyber-cyan/50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 text-dark-950" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  
  return null
}

function Layout({ children }) {
  const { isDark } = useTheme()
  
  return (
    <div className="min-h-screen transition-colors duration-300" style={{ position: 'relative' }}>
      <CyberBackground variant="full" />
      <ScrollProgressBar />
      <Navbar />
      <main style={{ position: 'relative' }}>
        {children}
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}

function SectionDivider() {
  return (
    <div className="relative h-16 sm:h-24 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[60%] h-px bg-gradient-to-r from-transparent via-cyber-cyan/20 to-transparent" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-cyber-cyan/30" />
      </div>
    </div>
  )
}

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Suspense fallback={<SectionLoader />}>
        <SectionDivider />
        <Technology />
        <SectionDivider />
        <StateDiagram />
        <SectionDivider />
        <Platform />
        <SectionDivider />
        <Contact />
        <SectionDivider />
        <Research />
      </Suspense>
    </>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {isLoading && <InitialLoader key="loader" />}
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <ScrollToTop />
        <Layout>
          <Suspense fallback={<SectionLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/patents" element={<PatentsPortfolio />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
            </Routes>
          </Suspense>
        </Layout>
      </motion.div>
    </BrowserRouter>
  )
}

export default App
