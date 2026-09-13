import { motion } from 'framer-motion'
import { about, personal } from '../data/portfolio'
import { MapPin, BookOpen, Zap, Lightbulb } from 'lucide-react'
import { useInView } from '../hooks/useInView'

const iconMap = {
  Focus: Zap,
  Education: BookOpen,
  'Based in': MapPin,
  Interests: Lightbulb,
}

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
})

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.15 })

  return (
    <section
      id="about"
      aria-label="About me"
      ref={ref}
      style={{
        padding: '100px 0',
        background: 'var(--color-bg)',
      }}
    >
      <div
        className="max-container"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'start',
        }}
      >
        {/* Left: Text */}
        <div>
          <motion.p
            className="section-label"
            variants={fadeUp(0)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{ marginBottom: '16px', display: 'block' }}
          >
            About
          </motion.p>

          <motion.h2
            className="section-heading"
            variants={fadeUp(0.08)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{ marginBottom: '28px' }}
          >
            Computer science student passionate about AI and software.
          </motion.h2>

          {about.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              variants={fadeUp(0.16 + i * 0.08)}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              style={{
                fontSize: '1rem',
                lineHeight: 1.75,
                color: 'var(--color-text-secondary)',
                marginBottom: '16px',
              }}
            >
              {p}
            </motion.p>
          ))}
        </div>

        {/* Right: Highlights */}
        <motion.div
          variants={fadeUp(0.24)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          {about.highlights.map((h, i) => {
            const Icon = iconMap[h.label] || Zap
            return (
              <motion.div
                key={i}
                variants={fadeUp(0.28 + i * 0.07)}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="card"
                style={{
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    background: 'var(--color-accent-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} color="var(--color-accent)" aria-hidden="true" />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-muted)',
                      marginBottom: '2px',
                    }}
                  >
                    {h.label}
                  </p>
                  <p
                    style={{
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    {h.value}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .max-container {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  )
}
