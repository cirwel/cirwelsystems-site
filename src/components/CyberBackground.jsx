import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false)
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mediaQuery.matches)
    
    const handler = (e) => setPrefersReduced(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])
  
  return prefersReduced
}

function useDeviceCapability() {
  const [capability, setCapability] = useState('high')
  
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    const isSmallScreen = window.innerWidth < 768
    const hasLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4
    const hasSlowCPU = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4
    
    if (isMobile || hasLowMemory || hasSlowCPU) {
      setCapability('low')
    } else if (isSmallScreen) {
      setCapability('medium')
    } else {
      setCapability('high')
    }
  }, [])
  
  return capability
}

function ParticleNetwork({ capability, reducedMotion }) {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0, isActive: false })

  useEffect(() => {
    if (capability === 'low' || reducedMotion) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []
    let lastTime = 0
    const fps = capability === 'medium' ? 30 : 50

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      mouseRef.current.isActive = true
    }

    const handleMouseLeave = () => {
      mouseRef.current.isActive = false
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.4
        this.vy = (Math.random() - 0.5) * 0.4
        this.radius = Math.random() * 2.5 + 0.8
        this.baseRadius = this.radius
        const colorChoice = Math.random()
        if (colorChoice > 0.7) {
          this.color = '#e040e0'
        } else if (colorChoice > 0.4) {
          this.color = '#00d4e6'
        } else {
          this.color = '#4da6ff'
        }
        this.alpha = Math.random() * 0.5 + 0.3
        this.pulseOffset = Math.random() * Math.PI * 2
        this.glowSize = Math.random() * 15 + 10
      }

      update(time) {
        this.x += this.vx
        this.y += this.vy

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1

        if (mouseRef.current.isActive) {
          const dx = mouseRef.current.x - this.x
          const dy = mouseRef.current.y - this.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = 180

          if (dist < maxDist) {
            const force = (maxDist - dist) / maxDist
            const angle = Math.atan2(dy, dx)
            this.x -= Math.cos(angle) * force * 2.5
            this.y -= Math.sin(angle) * force * 2.5
            this.radius = this.baseRadius + force * 3
            this.alpha = Math.min(0.9, this.alpha + force * 0.4)
          } else {
            this.radius = this.baseRadius
          }
        }

        this.alpha = 0.3 + Math.sin(time * 0.002 + this.pulseOffset) * 0.2
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = this.alpha
        ctx.fill()
        ctx.globalAlpha = 1
      }
    }

    const maxParticles = capability === 'medium' ? 15 : 25
    const particleCount = Math.min(maxParticles, Math.floor((canvas.width * canvas.height) / 50000))
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    const drawLines = () => {
      ctx.lineWidth = 1
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dist < 200) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = particles[i].color
            ctx.globalAlpha = 0.15 * (1 - dist / 200)
            ctx.stroke()
          }
        }

        if (mouseRef.current.isActive) {
          const dx = mouseRef.current.x - particles[i].x
          const dy = mouseRef.current.y - particles[i].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dist < 220) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y)
            ctx.strokeStyle = particles[i].color
            ctx.globalAlpha = 0.2 * (1 - dist / 220)
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1
    }

    const animate = (currentTime) => {
      animationId = requestAnimationFrame(animate)
      
      const deltaTime = currentTime - lastTime
      if (deltaTime < 1000 / fps) return
      lastTime = currentTime
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(p => {
        p.update(currentTime)
        p.draw()
      })
      drawLines()
    }
    animate(0)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [capability])

  if (capability === 'low') return null

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  )
}

function AuroraGradient({ reducedMotion }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute w-[150%] h-[150%] -left-[25%] -top-[25%]"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 20%, rgba(0, 224, 240, 0.22) 0%, transparent 50%),
            radial-gradient(ellipse 70% 50% at 80% 30%, rgba(240, 80, 240, 0.18) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 40% 80%, rgba(100, 180, 255, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 50% 50% at 90% 70%, rgba(0, 224, 240, 0.12) 0%, transparent 50%)
          `,
        }}
        {...(reducedMotion ? {} : {
          animate: { rotate: [0, 5, -5, 0], scale: [1, 1.05, 0.98, 1] },
          transition: { duration: 25, repeat: Infinity, ease: 'easeInOut' }
        })}
      />
      
      <motion.div
        className="absolute w-full h-full"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 60% 40%, rgba(0, 200, 240, 0.12) 0%, transparent 60%),
            radial-gradient(ellipse 40% 30% at 30% 60%, rgba(180, 80, 220, 0.1) 0%, transparent 50%)
          `,
        }}
        {...(reducedMotion ? {} : {
          animate: { opacity: [0.5, 1, 0.5] },
          transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' }
        })}
      />
    </div>
  )
}

function GlowOrbs({ reducedMotion, capability }) {
  if (capability === 'low') {
    return (
      <>
        <div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 212, 230, 0.1) 0%, transparent 70%)',
            filter: 'blur(40px)',
            left: '-5%',
            top: '10%',
          }}
        />
        <div
          className="absolute w-[350px] h-[350px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(224, 64, 224, 0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
            right: '0%',
            top: '30%',
          }}
        />
      </>
    )
  }

  const animationProps = reducedMotion ? {} : {
    animate: {
      x: [0, 50, 0],
      y: [0, 30, 0],
      scale: [1, 1.1, 1],
    },
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: 'easeInOut',
    }
  }

  return (
    <>
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0, 224, 240, 0.18) 0%, rgba(0, 224, 240, 0.06) 40%, transparent 70%)',
          filter: 'blur(40px)',
          left: '-10%',
          top: '5%',
        }}
        {...(reducedMotion ? {} : {
          animate: { x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] },
          transition: { duration: 20, repeat: Infinity, ease: 'easeInOut' }
        })}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(240, 80, 240, 0.15) 0%, rgba(240, 80, 240, 0.05) 40%, transparent 70%)',
          filter: 'blur(40px)',
          right: '-5%',
          top: '25%',
        }}
        {...(reducedMotion ? {} : {
          animate: { x: [0, -40, 0], y: [0, 50, 0], scale: [1, 1.15, 1] },
          transition: { duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }
        })}
      />
      <motion.div
        className="absolute w-[450px] h-[450px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(100, 180, 255, 0.12) 0%, rgba(100, 180, 255, 0.04) 40%, transparent 70%)',
          filter: 'blur(40px)',
          left: '30%',
          bottom: '10%',
        }}
        {...(reducedMotion ? {} : {
          animate: { x: [0, 30, -20, 0], y: [0, -40, 0], scale: [1, 1.08, 1] },
          transition: { duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }
        })}
      />
    </>
  )
}

function CircuitLines() {
  const paths = [
    { d: 'M 0 20 L 15 20 L 25 35 L 40 35 L 50 20 L 70 20 L 80 35 L 100 35', delay: 0 },
    { d: 'M 0 50 L 20 50 L 30 65 L 50 65 L 60 50 L 100 50', delay: 2 },
    { d: 'M 0 80 L 25 80 L 35 65 L 55 65 L 65 80 L 100 80', delay: 4 },
    { d: 'M 20 0 L 20 15 L 35 25 L 35 45 L 20 55 L 20 70 L 35 80 L 35 100', delay: 1 },
    { d: 'M 60 0 L 60 20 L 75 30 L 75 50 L 60 60 L 60 75 L 75 85 L 75 100', delay: 3 },
  ]

  const nodes = [
    { x: 25, y: 35 }, { x: 50, y: 20 }, { x: 80, y: 35 },
    { x: 30, y: 65 }, { x: 60, y: 50 },
    { x: 35, y: 80 }, { x: 65, y: 80 },
    { x: 20, y: 55 }, { x: 60, y: 60 },
  ]

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00d4e6" stopOpacity="0" />
          <stop offset="50%" stopColor="#00d4e6" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#00d4e6" stopOpacity="0" />
        </linearGradient>
      </defs>
      
      {paths.map((path, i) => (
        <g key={i}>
          <path
            d={path.d}
            fill="none"
            stroke="#00d4e6"
            strokeWidth="0.12"
            opacity="0.2"
          />
          <motion.path
            d={path.d}
            fill="none"
            stroke="url(#circuit-gradient)"
            strokeWidth="0.4"
            strokeLinecap="round"
            initial={{ pathLength: 0, pathOffset: 0 }}
            animate={{ 
              pathLength: [0, 0.35, 0],
              pathOffset: [0, 0.65, 1]
            }}
            transition={{
              duration: 5,
              delay: path.delay,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        </g>
      ))}

      {nodes.map((node, i) => (
        <g key={`node-${i}`}>
          <circle
            cx={node.x}
            cy={node.y}
            r="0.9"
            fill="#00d4e6"
            opacity="0.35"
          />
          <motion.circle
            cx={node.x}
            cy={node.y}
            r="0.5"
            fill="#00d4e6"
            initial={{ opacity: 0.3, scale: 1 }}
            animate={{ 
              opacity: [0.3, 0.9, 0.3],
              scale: [1, 1.6, 1]
            }}
            transition={{
              duration: 2.5,
              delay: i * 0.4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </g>
      ))}
    </svg>
  )
}

function GridOverlay() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 212, 230, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 212, 230, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />
  )
}

function Vignette() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `
          radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(5, 8, 15, 0.4) 100%),
          linear-gradient(to bottom, rgba(5, 8, 15, 0.3) 0%, transparent 15%, transparent 85%, rgba(5, 8, 15, 0.5) 100%)
        `,
      }}
    />
  )
}

function NoiseTexture() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none opacity-[0.015]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  )
}

export default function CyberBackground({ variant = 'full' }) {
  const reducedMotion = useReducedMotion()
  const capability = useDeviceCapability()
  
  return (
    <div className="cyber-bg absolute inset-0 overflow-hidden pointer-events-none -z-10 transition-opacity duration-500">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050810] via-[#080c18] to-[#050810]" />
      
      <AuroraGradient reducedMotion={reducedMotion} />
      <GlowOrbs reducedMotion={reducedMotion} capability={capability} />
      
      {variant === 'full' && capability !== 'low' && (
        <>
          <ParticleNetwork capability={capability} reducedMotion={reducedMotion} />
          {!reducedMotion && <CircuitLines />}
        </>
      )}
      
      {variant === 'minimal' && !reducedMotion && capability !== 'low' && (
        <CircuitLines />
      )}
      
      <GridOverlay />
      {capability !== 'low' && <NoiseTexture />}
      <Vignette />
    </div>
  )
}
