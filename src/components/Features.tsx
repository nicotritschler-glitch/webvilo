import { useEffect, useRef } from 'react'

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: 'Webentwicklung',
    description: 'Moderne, skalierbare Web­applikationen mit den neuesten Technologien – React, TypeScript, Node.js und mehr.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 15.75h3" />
      </svg>
    ),
    title: 'Mobile First',
    description: 'Responsive Design, das auf jedem Gerät perfekt aussieht und funktioniert – vom Smartphone bis zum Desktop.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Performance',
    description: 'Lighthouse-Score 90+ garantiert. Optimierte Lade­zeiten und Core Web Vitals für maximale Konversionsrate.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: 'Accessibility',
    description: 'WCAG 2.1 konform. Wir bauen Webanwendungen, die für alle Menschen zugänglich sind – inklusive Screen­reader-Unterstützung.',
    color: 'bg-green-50 text-green-600',
  },
]

function useIntersection(ref: React.RefObject<Element>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll<HTMLElement>('[data-animate]').forEach((child, i) => {
            child.style.animationDelay = `${i * 100}ms`
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

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null)
  useIntersection(sectionRef)

  return (
    <section id="services" ref={sectionRef} className="py-24 bg-gray-50" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 opacity-0" data-animate>
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
            Was wir bieten
          </span>
          <h2 id="services-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Unsere Services
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Von der Idee bis zur Produktion — wir begleiten Ihr Projekt ganzheitlich und liefern messbare Ergebnisse.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <article
              key={feature.title}
              data-animate
              className="opacity-0 bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${feature.color} mb-5`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </article>
          ))}
        </div>

        {/* About blurb */}
        <div id="about" className="mt-20 bg-white rounded-3xl p-10 md:p-16 shadow-sm border border-gray-100 opacity-0" data-animate>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5">Über WebVilo</h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-6">
              WebVilo ist ein junges, leidenschaftliches Entwicklungsstudio mit dem Ziel, Unternehmen aller Größen mit erstklassiger Software zu versorgen. Wir glauben daran, dass gutes Design und sauberer Code Hand in Hand gehen.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['React', 'TypeScript', 'Node.js', 'TailwindCSS', 'PostgreSQL', 'Docker'].map((tech) => (
                <span key={tech} className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
