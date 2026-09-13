import { motion } from 'framer-motion'
import { skills } from '../data/portfolio'
import { useInView } from '../hooks/useInView'

const categoryColors = {
  Languages: { bg: '#fff7ed', text: '#c2410c', border: '#fdba74' },
  Frontend: { bg: '#eff6ff', text: '#1d4ed8', border: '#93c5fd' },
  Backend: { bg: '#f0fdf4', text: '#15803d', border: '#86efac' },
  Databases: { bg: '#fdf4ff', text: '#7e22ce', border: '#d8b4fe' },
  'Tools & DevOps': { bg: '#fef2f2', text: '#b91c1c', border: '#fca5a5' },
}

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
})

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.1 })

  return (
    <section
      id="skills"
      aria-label="Skills"
      ref={ref}
      style={{
        padding: '100px 0',
        background: 'var(--color-bg-secondary)',
      }}
    >
      <div className="max-container">
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <motion.p
            className="section-label"
            variants={fadeUp(0)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{ display: 'block', marginBottom: '16px' }}
          >
            Skills
          </motion.p>
          <motion.h2
            className="section-heading"
            variants={fadeUp(0.08)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            Technologies I work with
          </motion.h2>
          <motion.p
            variants={fadeUp(0.16)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{
              marginTop: '16px',
              color: 'var(--color-text-secondary)',
              fontSize: '1rem',
              maxWidth: '480px',
              margin: '16px auto 0',
            }}
          >
            A focused set of technologies I have learned and applied through coursework, internships, and personal projects.
          </motion.p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '20px',
          }}
        >
          {skills.map((group, gi) => {
            const colors = categoryColors[group.category] || { bg: '#f8f8f8', text: '#333', border: '#ddd' }
            return (
              <motion.div
                key={group.category}
                variants={fadeUp(0.1 + gi * 0.07)}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="card"
                style={{ padding: '24px' }}
              >
                <div style={{ marginBottom: '16px' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '4px 12px',
                      borderRadius: '100px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      background: colors.bg,
                      color: colors.text,
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    {group.category}
                  </span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="tag"
                      style={{ fontSize: '0.85rem', fontWeight: 500 }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #skills .max-container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
