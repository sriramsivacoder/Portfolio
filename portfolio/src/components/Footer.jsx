import { GithubIcon, LinkedinIcon, LeetcodeIcon } from './UI/BrandIcons'
import { personal } from '../data/portfolio'

const footerLinks = [
  { icon: LinkedinIcon, href: personal.social.linkedin, label: 'LinkedIn' },
  { icon: GithubIcon, href: personal.social.github, label: 'GitHub' },
  { icon: LeetcodeIcon, href: personal.social.leetcode, label: 'LeetCode' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      role="contentinfo"
      style={{
        background: 'var(--color-bg-secondary)',
        borderTop: '1px solid var(--color-border)',
        padding: '48px 0 32px',
      }}
    >
      <div
        className="max-container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          textAlign: 'center',
        }}
      >
        {/* Name */}
        <div>
          <p
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
              marginBottom: '6px',
            }}
          >
            Sri Ram Siva S
          </p>
          <p
            style={{
              fontSize: '0.82rem',
              color: 'var(--color-text-muted)',
              letterSpacing: '0.04em',
            }}
          >
            AI · Software Engineering · Product Development
          </p>
        </div>

        {/* Social links */}
        <nav aria-label="Footer social links" style={{ display: 'flex', gap: '8px' }}>
          {footerLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} (opens in new tab)`}
              style={{
                width: 40,
                height: 40,
                borderRadius: '10px',
                border: '1.5px solid var(--color-border)',
                background: 'var(--color-bg-card)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-muted)',
                textDecoration: 'none',
                transition: 'color 0.15s ease, border-color 0.15s ease, background 0.15s ease, transform 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-accent)'
                e.currentTarget.style.borderColor = 'var(--color-accent-muted)'
                e.currentTarget.style.background = 'var(--color-accent-light)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-muted)'
                e.currentTarget.style.borderColor = 'var(--color-border)'
                e.currentTarget.style.background = 'var(--color-bg-card)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <Icon size={16} aria-hidden="true" />
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p
          style={{
            fontSize: '0.78rem',
            color: 'var(--color-text-muted)',
          }}
        >
          © {year} Sri Ram Siva S. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
