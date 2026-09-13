import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './UI/BrandIcons'
import { personal } from '../data/portfolio'

function HeroVisual() {
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [8, -8]), { stiffness: 100, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-8, 8]), { stiffness: 100, damping: 30 })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left - rect.width / 2)
      mouseY.set(e.clientY - rect.top - rect.height / 2)
    }
    const handleLeave = () => {
      mouseX.set(0)
      mouseY.set(0)
    }
    window.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [mouseX, mouseY])

  const nodes = [
    { x: 50, y: 50, r: 70, delay: 0 },
    { x: 72, y: 24, r: 32, delay: 0.3 },
    { x: 20, y: 70, r: 28, delay: 0.5 },
    { x: 78, y: 70, r: 20, delay: 0.7 },
    { x: 30, y: 22, r: 16, delay: 0.9 },
  ]

  const connectors = [
    { x1: 50, y1: 50, x2: 72, y2: 24 },
    { x1: 50, y1: 50, x2: 20, y2: 70 },
    { x1: 50, y1: 50, x2: 78, y2: 70 },
    { x1: 50, y1: 50, x2: 30, y2: 22 },
    { x1: 72, y1: 24, x2: 78, y2: 70 },
  ]

  const codeLines = [
    { text: 'model.fit(X_train)', top: '14%', left: '5%' },
    { text: 'const api = express()', top: '72%', left: '5%' },
    { text: 'SELECT * FROM users', top: '85%', left: '40%' },
    { text: '@GetMapping("/events")', top: '8%', left: '42%' },
  ]

  return (
    <motion.div
      ref={containerRef}
      style={{
        width: '100%',
        maxWidth: '460px',
        aspectRatio: '1',
        position: 'relative',
        perspective: '800px',
      }}
      aria-hidden="true"
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Floating code labels */}
        {codeLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ delay: 1 + i * 0.15, duration: 0.5 }}
            style={{
              position: 'absolute',
              top: line.top,
              left: line.left,
              background: 'rgba(255,255,255,0.9)',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '0.7rem',
              fontFamily: 'monospace',
              color: 'var(--color-accent)',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              pointerEvents: 'none',
            }}
          >
            {line.text}
          </motion.div>
        ))}

        {/* SVG network visualization */}
        <svg
          viewBox="0 0 100 100"
          style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
        >
          {/* Connector lines */}
          {connectors.map((c, i) => (
            <motion.line
              key={i}
              x1={c.x1}
              y1={c.y1}
              x2={c.x2}
              y2={c.y2}
              stroke="rgba(59, 91, 219, 0.15)"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.8 }}
            />
          ))}

          {/* Nodes */}
          {nodes.map((n, i) => (
            <motion.g key={i}>
              <motion.circle
                cx={n.x}
                cy={n.y}
                r={n.r * 0.55}
                fill={i === 0 ? 'rgba(59,91,219,0.07)' : 'rgba(116,143,252,0.07)'}
                stroke={i === 0 ? 'rgba(59,91,219,0.25)' : 'rgba(116,143,252,0.2)'}
                strokeWidth={i === 0 ? '0.8' : '0.5'}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: n.delay, duration: 0.5, type: 'spring', stiffness: 200 }}
              />
              <motion.circle
                cx={n.x}
                cy={n.y}
                r={n.r * 0.18}
                fill={i === 0 ? 'rgba(59,91,219,0.6)' : 'rgba(116,143,252,0.5)'}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: n.delay + 0.2, duration: 0.3, type: 'spring' }}
              />
            </motion.g>
          ))}
        </svg>

        {/* Center orb */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '38%',
            aspectRatio: '1',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, rgba(116,143,252,0.25), rgba(59,91,219,0.1))',
            border: '1px solid rgba(116,143,252,0.3)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 12px 40px rgba(59,91,219,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            style={{
              width: '50%',
              aspectRatio: '1',
              borderRadius: '50%',
              border: '1.5px dashed rgba(59,91,219,0.3)',
            }}
          />
        </motion.div>

        {/* Floating ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '62%',
            aspectRatio: '1',
            borderRadius: '50%',
            border: '1px solid rgba(59,91,219,0.1)',
          }}
        />
      </motion.div>
    </motion.div>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: d, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  const handleScroll = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      aria-label="Introduction"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        paddingTop: '80px',
        paddingBottom: '60px',
        overflow: 'hidden',
      }}
    >
      {/* Subtle dot grid */}
      <div
        className="dot-grid"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.5,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        className="max-container"
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          alignItems: 'center',
        }}
      >
        {/* Text content */}
        <div>
          <motion.p
            className="section-label"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            style={{ marginBottom: '20px', display: 'block' }}
          >
            {personal.eyebrow}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              color: 'var(--color-text-primary)',
              marginBottom: '24px',
            }}
          >
            {personal.headline}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
            style={{
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: 'var(--color-text-secondary)',
              maxWidth: '480px',
              marginBottom: '40px',
            }}
          >
            {personal.subheadline}
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '48px' }}
          >
            <a
              href="#projects"
              id="hero-view-projects"
              className="btn-primary"
              onClick={(e) => { e.preventDefault(); handleScroll('#projects') }}
              aria-label="View my projects"
            >
              View Projects
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a
              href={personal.social.linkedin}
              id="hero-linkedin"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              aria-label="Connect on LinkedIn (opens in new tab)"
            >
              <LinkedinIcon size={16} />
              Connect on LinkedIn
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.4}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <GithubIcon size={15} style={{ color: 'var(--color-text-muted)' }} />
            <a
              href={personal.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in new tab)"
              style={{
                fontSize: '0.85rem',
                color: 'var(--color-text-muted)',
                textDecoration: 'none',
                transition: 'color 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
            >
              github.com/sriramsivacoder
            </a>
          </motion.div>
        </div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <HeroVisual />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => handleScroll('#about')}
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--color-text-muted)',
          fontSize: '0.72rem',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        Scroll
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} aria-hidden="true" />
        </motion.div>
      </motion.button>

      <style>{`
        @media (max-width: 768px) {
          #home > .max-container {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          #home > .max-container > div:first-child {
            order: 1;
          }
          #home > .max-container > div:last-child {
            order: 0;
            max-width: 280px;
            margin: 0 auto;
          }
          #home > .max-container p {
            margin-left: auto !important;
            margin-right: auto !important;
          }
        }
      `}</style>
    </section>
  )
}
