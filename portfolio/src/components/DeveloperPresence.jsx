import { motion } from 'framer-motion'
import { developerPresence } from '../data/portfolio'
import { ArrowUpRight } from 'lucide-react'
import { GithubIcon, LeetcodeIcon } from './UI/BrandIcons'
import { useInView } from '../hooks/useInView'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
})

function PresenceCard({ href, icon: Icon, platform, handle, description, color, delay }) {
  const { ref, inView } = useInView({ threshold: 0.1 })

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${platform} profile (opens in new tab)`}
      variants={fadeUp(delay)}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      className="card"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        padding: '24px 28px',
        textDecoration: 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle gradient accent */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '160px',
          height: '100%',
          background: `linear-gradient(to left, ${color}08, transparent)`,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: '12px',
          background: `${color}12`,
          border: `1px solid ${color}25`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon size={22} color={color} aria-hidden="true" />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: '0.72rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--color-text-muted)',
            marginBottom: '3px',
          }}
        >
          {platform}
        </p>
        <p
          style={{
            fontSize: '1rem',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            marginBottom: '4px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {handle}
        </p>
        <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>{description}</p>
      </div>

      <ArrowUpRight
        size={18}
        style={{ color: 'var(--color-text-muted)', flexShrink: 0 }}
        aria-hidden="true"
      />
    </motion.a>
  )
}

export default function DeveloperPresence() {
  const { ref, inView } = useInView({ threshold: 0.1 })

  const cards = [
    {
      href: developerPresence.github.url,
      icon: GithubIcon,
      platform: 'GitHub',
      handle: developerPresence.github.handle,
      description: 'Source code and personal projects',
      color: '#1c1917',
      delay: 0,
    },
    {
      href: developerPresence.leetcode.url,
      icon: LeetcodeIcon,
      platform: 'LeetCode',
      handle: developerPresence.leetcode.handle,
      description: 'Competitive programming practice',
      color: '#f89820',
      delay: 0.1,
    },
  ]

  return (
    <section
      id="developer-presence"
      aria-label="Developer profiles"
      style={{ padding: '100px 0', background: 'var(--color-bg-secondary)' }}
    >
      <div className="max-container" style={{ maxWidth: '640px' }}>
        <div ref={ref}>
          <motion.p
            className="section-label"
            variants={fadeUp(0)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{ display: 'block', marginBottom: '16px' }}
          >
            Profiles
          </motion.p>
          <motion.h2
            className="section-heading"
            variants={fadeUp(0.08)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{ marginBottom: '48px' }}
          >
            Developer presence
          </motion.h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {cards.map((card) => (
            <PresenceCard key={card.platform} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}
