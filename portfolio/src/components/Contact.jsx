import { motion } from 'framer-motion'
import { personal } from '../data/portfolio'
import { ArrowUpRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './UI/BrandIcons'
import { useInView } from '../hooks/useInView'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
})

const contactLinks = [
  { icon: LinkedinIcon, label: 'LinkedIn', sublabel: 'linkedin.com/in/sriramsiva1', href: 'https://www.linkedin.com/in/sriramsiva1/', color: '#0a66c2' },
  { icon: GithubIcon, label: 'GitHub', sublabel: 'github.com/sriramsivacoder', href: 'https://github.com/sriramsivacoder', color: '#1c1917' },
]

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.15 })

  return (
    <section
      id="contact"
      aria-label="Contact"
      ref={ref}
      style={{ padding: '100px 0', background: 'var(--color-bg)' }}
    >
      <div className="max-container" style={{ maxWidth: '680px' }}>
        <motion.p
          className="section-label"
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ display: 'block', marginBottom: '16px' }}
        >
          Contact
        </motion.p>

        <motion.h2
          className="section-heading"
          variants={fadeUp(0.08)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ marginBottom: '24px' }}
        >
          Let's build something useful.
        </motion.h2>

        <motion.p
          variants={fadeUp(0.16)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            fontSize: '1.05rem',
            lineHeight: 1.7,
            color: 'var(--color-text-secondary)',
            marginBottom: '48px',
            maxWidth: '520px',
          }}
        >
          I am open to software and AI/ML opportunities, internships, freelance and project collaboration, and technical conversations. Feel free to reach out through any of the channels below.
        </motion.p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {contactLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              id={`contact-${link.label.toLowerCase()}`}
              aria-label={`Reach me on ${link.label} (opens in new tab)`}
              variants={fadeUp(0.22 + i * 0.08)}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '18px',
                padding: '22px 28px',
                textDecoration: 'none',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '12px',
                  background: `${link.color}12`,
                  border: `1px solid ${link.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <link.icon size={20} color={link.color} aria-hidden="true" />
              </div>

              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    marginBottom: '2px',
                  }}
                >
                  {link.label}
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  {link.sublabel}
                </p>
              </div>

              <ArrowUpRight size={18} style={{ color: 'var(--color-text-muted)' }} aria-hidden="true" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
