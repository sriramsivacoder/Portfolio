import { motion } from 'framer-motion'
import { experience } from '../data/portfolio'
import { MapPin, Clock } from 'lucide-react'
import { useInView } from '../hooks/useInView'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
})

export default function Experience() {
  const { ref, inView } = useInView({ threshold: 0.1 })

  return (
    <section
      id="experience"
      aria-label="Work experience"
      ref={ref}
      style={{ padding: '100px 0', background: 'var(--color-bg)' }}
    >
      <div className="max-container">
        <div style={{ marginBottom: '64px' }}>
          <motion.p
            className="section-label"
            variants={fadeUp(0)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{ display: 'block', marginBottom: '16px' }}
          >
            Experience
          </motion.p>
          <motion.h2
            className="section-heading"
            variants={fadeUp(0.08)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            Internship experience
          </motion.h2>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative', maxWidth: '720px' }}>
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={inView ? { scaleY: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              left: '19px',
              top: '32px',
              bottom: '32px',
              width: '2px',
              background: 'linear-gradient(to bottom, var(--color-accent), var(--color-accent-muted))',
              transformOrigin: 'top',
              opacity: 0.3,
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                variants={fadeUp(0.15 + i * 0.12)}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                style={{ display: 'flex', gap: '28px', alignItems: 'flex-start' }}
              >
                {/* Timeline dot */}
                <div style={{ flexShrink: 0, paddingTop: '20px' }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: 0.2 + i * 0.12, type: 'spring', stiffness: 300 }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: 'var(--color-accent-light)',
                      border: '2px solid var(--color-accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.65rem',
                        fontWeight: 800,
                        color: 'var(--color-accent)',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {exp.company.substring(0, 2).toUpperCase()}
                    </span>
                  </motion.div>
                </div>

                {/* Card */}
                <div
                  className="card"
                  style={{ flex: 1, padding: '28px 28px' }}
                >
                  {/* Header */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      flexWrap: 'wrap',
                      gap: '8px',
                      marginBottom: '12px',
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontSize: '1.05rem',
                          fontWeight: 700,
                          color: 'var(--color-text-primary)',
                          marginBottom: '2px',
                        }}
                      >
                        {exp.role}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.95rem',
                          fontWeight: 600,
                          color: 'var(--color-accent)',
                        }}
                      >
                        {exp.company}
                      </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          fontSize: '0.8rem',
                          color: 'var(--color-text-muted)',
                        }}
                      >
                        <Clock size={13} aria-hidden="true" />
                        {exp.period}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          fontSize: '0.8rem',
                          color: 'var(--color-text-muted)',
                        }}
                      >
                        <MapPin size={13} aria-hidden="true" />
                        {exp.mode}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: '0.92rem',
                      lineHeight: 1.65,
                      color: 'var(--color-text-secondary)',
                      marginBottom: '20px',
                    }}
                  >
                    {exp.description}
                  </p>

                  {/* Technologies */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #experience .max-container > div:last-child > div > div {
            gap: 16px !important;
          }
          #experience .card {
            padding: 20px 16px !important;
          }
        }
      `}</style>
    </section>
  )
}
