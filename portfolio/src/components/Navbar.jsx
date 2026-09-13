import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { personal } from '../data/portfolio'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.replace('#', ''))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.4 }
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNav = (href) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        role="banner"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
          background: scrolled ? 'rgba(250, 250, 249, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
          boxShadow: scrolled ? '0 1px 16px rgba(0,0,0,0.06)' : 'none',
        }}
      >
        <div className="max-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          {/* Logo */}
          <a
            href="#home"
            aria-label="Go to top"
            onClick={(e) => { e.preventDefault(); handleNav('#home') }}
            style={{
              fontWeight: 700,
              fontSize: '1.05rem',
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span
              style={{
                width: 32,
                height: 32,
                borderRadius: '8px',
                background: 'var(--color-accent)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.85rem',
                fontWeight: 700,
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              SRS
            </span>
            Sri Ram Siva S
          </a>

          {/* Desktop Nav */}
          <nav aria-label="Main navigation" style={{ display: 'flex', gap: '4px' }} className="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNav(link.href) }}
                aria-current={activeSection === link.href.replace('#', '') ? 'page' : undefined}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: activeSection === link.href.replace('#', '') ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                  background: activeSection === link.href.replace('#', '') ? 'var(--color-accent-light)' : 'transparent',
                  transition: 'color 0.15s ease, background 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== link.href.replace('#', '')) {
                    e.currentTarget.style.color = 'var(--color-text-primary)'
                    e.currentTarget.style.background = 'var(--color-bg-secondary)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== link.href.replace('#', '')) {
                    e.currentTarget.style.color = 'var(--color-text-secondary)'
                    e.currentTarget.style.background = 'transparent'
                  }
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="mobile-nav-toggle"
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '10px',
              border: '1.5px solid var(--color-border)',
              background: 'transparent',
              cursor: 'pointer',
              color: 'var(--color-text-primary)',
            }}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Navigation menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: '64px',
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 99,
              background: 'var(--color-bg)',
              padding: '24px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={(e) => { e.preventDefault(); handleNav(link.href) }}
                style={{
                  padding: '14px 16px',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: activeSection === link.href.replace('#', '') ? 'var(--color-accent)' : 'var(--color-text-primary)',
                  background: activeSection === link.href.replace('#', '') ? 'var(--color-accent-light)' : 'transparent',
                  transition: 'background 0.15s ease',
                }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-toggle { display: flex !important; }
        }
      `}</style>
    </>
  )
}
