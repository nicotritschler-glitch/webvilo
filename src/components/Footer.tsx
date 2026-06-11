const footerLinks = {
  Unternehmen: [
    { label: 'Über uns', href: '#about' },
    { label: 'Team', href: '#team' },
    { label: 'Karriere', href: '#' },
  ],
  Services: [
    { label: 'Webentwicklung', href: '#services' },
    { label: 'Mobile First', href: '#services' },
    { label: 'Performance', href: '#services' },
    { label: 'Accessibility', href: '#services' },
  ],
  Rechtliches: [
    { label: 'Impressum', href: '#' },
    { label: 'Datenschutz', href: '#' },
    { label: 'AGB', href: '#' },
  ],
}

const handleScroll = (href: string) => (e: React.MouseEvent) => {
  if (!href.startsWith('#')) return
  e.preventDefault()
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top area */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a
              href="#home"
              onClick={handleScroll('#home')}
              className="inline-flex items-center gap-2 font-bold text-xl text-white mb-4 focus-visible:rounded"
              aria-label="WebVilo – zurück zur Startseite"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-600 text-white text-sm font-bold" aria-hidden="true">W</span>
              WebVilo
            </a>
            <p className="text-sm leading-relaxed mb-6">
              Professionelle Webentwicklung für moderne Unternehmen. Schnell, zugänglich und mit Leidenschaft gebaut.
            </p>
            <div className="flex gap-3" aria-label="Soziale Netzwerke">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors focus-visible:rounded-lg"
                aria-label="GitHub"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors focus-visible:rounded-lg"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <nav key={section} aria-label={section}>
              <h3 className="text-white font-semibold text-sm mb-5">{section}</h3>
              <ul className="space-y-3" role="list">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={handleScroll(link.href)}
                      className="text-sm hover:text-white transition-colors focus-visible:rounded"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} WebVilo. Alle Rechte vorbehalten.</p>
          <p>
            Gebaut mit{' '}
            <span aria-label="Liebe" role="img">♥</span>
            {' '}in Deutschland
          </p>
        </div>
      </div>
    </footer>
  )
}
