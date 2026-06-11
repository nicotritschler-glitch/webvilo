import { useEffect, useRef } from 'react'

const team = [
  {
    name: 'Nico Tritschler',
    role: 'Founder & Lead Developer',
    bio: 'Full-Stack-Entwickler aus dem Schwarzwald mit Leidenschaft für sauberen Code und nutzerzentriertes Design. Ich baue Websites, die nicht nur gut aussehen, sondern Kunden bringen.',
    initials: 'NT',
    gradient: 'from-primary-800 to-primary-950',
    social: { github: '#', linkedin: '#' },
  },
  {
    name: 'Mia Hoffmann',
    role: 'UI/UX Designerin',
    bio: 'Gestaltet digitale Erlebnisse, die Nutzer begeistern — von der ersten Wireframe-Skizze bis zum pixel-perfekten finalen Design.',
    initials: 'MH',
    gradient: 'from-forest-700 to-forest-900',
    social: { github: '#', linkedin: '#' },
  },
  {
    name: 'Luca Berger',
    role: 'Backend-Entwickler',
    bio: 'Spezialist für skalierbare Architekturen, API-Design und schnelle Ladezeiten. Denn eine Website muss nicht nur schön sein — sie muss auch rennen.',
    initials: 'LB',
    gradient: 'from-gray-700 to-gray-900',
    social: { github: '#', linkedin: '#' },
  },
]

const githubIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

const linkedinIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

function useIntersection(ref: React.RefObject<Element>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll<HTMLElement>('[data-animate]').forEach((child, i) => {
            child.style.animationDelay = `${i * 120}ms`
            child.classList.add('animate-fade-up')
            child.classList.remove('opacity-0')
          })
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
}

export default function Team() {
  const sectionRef = useRef<HTMLDivElement>(null)
  useIntersection(sectionRef)

  return (
    <section id="team" ref={sectionRef} className="py-24 bg-white" aria-labelledby="team-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16 opacity-0" data-animate>
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-4">
            Die Menschen hinter WebVilo
          </span>
          <h2 id="team-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Klein. Eingespielt. Leidenschaftlich.
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-500">
            Kein 50-Mann-Büro, keine anonyme Agentur. Wir sind ein kleines Team mit einem einzigen Fokus: Ihre Website.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <article
              key={member.name}
              data-animate
              className="opacity-0 group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              <div className={`relative h-44 bg-gradient-to-br ${member.gradient} flex items-center justify-center`}>
                <div className="w-20 h-20 rounded-2xl bg-white/15 border-2 border-white/25 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white" aria-hidden="true">{member.initials}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-primary-700 text-sm font-medium mb-3">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{member.bio}</p>

                <div className="flex items-center gap-3" aria-label={`Social links für ${member.name}`}>
                  {[
                    { href: member.social.github,   icon: githubIcon,   label: `${member.name} auf GitHub` },
                    { href: member.social.linkedin,  icon: linkedinIcon, label: `${member.name} auf LinkedIn` },
                  ].map(({ href, icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100 text-gray-500 hover:bg-primary-100 hover:text-primary-700 transition-colors focus-visible:rounded-lg"
                      aria-label={label}
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
