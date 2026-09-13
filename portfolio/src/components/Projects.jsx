import { motion } from 'framer-motion'
import { projects } from '../data/portfolio'
import { ExternalLink, ArrowRight } from 'lucide-react'
import { GithubIcon } from './UI/BrandIcons'
import { useInView } from '../hooks/useInView'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
})

function ProjectVisual({ project }) {
  const colorMap = {
    'ip-screw-fix': {
      primary: 'rgba(59,91,219,0.12)',
      secondary: 'rgba(116,143,252,0.08)',
      accent: 'rgba(59,91,219,0.4)',
      label: 'AI · RAG · Python',
    },
    vh: {
      primary: 'rgba(21,128,61,0.1)',
      secondary: 'rgba(134,239,172,0.1)',
      accent: 'rgba(21,128,61,0.4)',
      label: 'Full-Stack · Spring Boot · React',
    },
  }
  const c = colorMap[project.id] || colorMap['vh']

  return (
    <div
      aria-hidden="true"
      style={{
        height: '200px',
        background: `linear-gradient(135deg, ${c.primary}, ${c.secondary})`,
        borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      {/* Decorative circles */}
      {[100, 60, 30].map((size, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: size,
            height: size,
            borderRadius: '50%',
            border: `1px solid ${c.accent}`,
            opacity: 0.2 + i * 0.1,
            top: `${20 + i * 20}%`,
            left: `${10 + i * 15}%`,
          }}
        />
      ))}

      {/* Project icon area */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '16px',
            background: 'rgba(255,255,255,0.9)',
            border: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.4rem',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          }}
        >
          {project.id === 'ip-screw-fix' ? '🧠' : '🎟️'}
        </div>
        <span
          style={{
            fontSize: '0.7rem',
            fontWeight: 600,
            color: c.accent,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            background: 'rgba(255,255,255,0.85)',
            padding: '3px 10px',
            borderRadius: '100px',
            border: `1px solid ${c.accent}`,
          }}
        >
          {c.label}
        </span>
      </div>

      {project.context && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(255,255,255,0.9)',
            border: '1px solid var(--color-border)',
            borderRadius: '6px',
            padding: '3px 10px',
            fontSize: '0.68rem',
            fontWeight: 600,
            color: 'var(--color-text-muted)',
          }}
        >
          {project.context}
        </div>
      )}
    </div>
  )
}

function ProjectCard({ project, index }) {
  const { ref, inView } = useInView({ threshold: 0.1 })

  return (
    <motion.article
      ref={ref}
      aria-label={`Project: ${project.title}`}
      variants={fadeUp(index * 0.1)}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      className="card"
      style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
    >
      <ProjectVisual project={project} />

      <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p
          style={{
            fontSize: '0.72rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--color-accent)',
            marginBottom: '8px',
          }}
        >
          {project.tagline}
        </p>

        <h3
          style={{
            fontSize: '1.2rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'var(--color-text-primary)',
            marginBottom: '12px',
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            fontSize: '0.9rem',
            lineHeight: 1.7,
            color: 'var(--color-text-secondary)',
            marginBottom: '20px',
            flex: 1,
          }}
        >
          {project.description}
        </p>

        {/* Tech tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
          {project.technologies.map((tech) => (
            <span key={tech} className="tag" style={{ fontSize: '0.78rem' }}>
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: 'auto' }}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            id={`project-github-${project.id}`}
            aria-label={`View ${project.title} on GitHub (opens in new tab)`}
            className="btn-secondary"
            style={{ fontSize: '0.85rem', padding: '9px 18px', flex: 1, justifyContent: 'center' }}
          >
                        <GithubIcon size={15} />
            View on GitHub
            <ArrowRight size={14} aria-hidden="true" />
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              id={`project-live-${project.id}`}
              aria-label={`View ${project.title} live demo (opens in new tab)`}
              className="btn-primary"
              style={{ fontSize: '0.85rem', padding: '9px 18px' }}
            >
              <ExternalLink size={15} aria-hidden="true" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const { ref, inView } = useInView({ threshold: 0.1 })

  return (
    <section
      id="projects"
      aria-label="Projects"
      style={{ padding: '100px 0', background: 'var(--color-bg-secondary)' }}
    >
      <div className="max-container">
        <div ref={ref} style={{ marginBottom: '64px' }}>
          <motion.p
            className="section-label"
            variants={fadeUp(0)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{ display: 'block', marginBottom: '16px' }}
          >
            Projects
          </motion.p>
          <motion.h2
            className="section-heading"
            variants={fadeUp(0.08)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            Things I have built
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
            }}
          >
            Projects I have worked on — each one representing real engineering decisions and learnings.
          </motion.p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '24px',
          }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #projects .max-container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
