import { motion } from 'framer-motion'
import { education } from '../data/portfolio'
import { GraduationCap, MapPin, Calendar } from 'lucide-react'
import { useInView } from '../hooks/useInView'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
})

export default function Education() {
  const { ref, inView } = useInView({ threshold: 0.1 })

  return (
    <section
      id="education"
      aria-label="Education"
      ref={ref}
      style={{ padding: '100px 0', background: 'var(--color-bg)' }}
    >
      <div className="max-container" style={{ maxWidth: '720px' }}>
        <motion.p
          className="section-label"
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ display: 'block', marginBottom: '16px' }}
        >
          Education
        </motion.p>
        <motion.h2
          className="section-heading"
          variants={fadeUp(0.08)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ marginBottom: '48px' }}
        >
          Academic background
        </motion.h2>

        {education.map((edu, i) => (
          <motion.div
            key={i}
            variants={fadeUp(0.18 + i * 0.1)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="card"
            style={{
              padding: '32px',
              display: 'flex',
              gap: '24px',
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: '14px',
                background: 'var(--color-accent-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <GraduationCap size={24} color="var(--color-accent)" aria-hidden="true" />
            </div>

            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginBottom: '8px',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: 'var(--color-text-primary)',
                      marginBottom: '4px',
                    }}
                  >
                    {edu.institution}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      color: 'var(--color-accent)',
                    }}
                  >
                    {edu.degree}
                  </p>
                </div>

                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '4px 12px',
                    borderRadius: '100px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    background: 'rgba(21,128,61,0.08)',
                    color: '#15803d',
                    border: '1px solid rgba(21,128,61,0.2)',
                  }}
                >
                  {edu.status}
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '20px',
                  flexWrap: 'wrap',
                  marginTop: '12px',
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '0.85rem',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  <MapPin size={14} aria-hidden="true" />
                  {edu.location}
                </span>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '0.85rem',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  <Calendar size={14} aria-hidden="true" />
                  {edu.period}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          #education .card {
            flex-direction: column !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  )
}
