import { useEffect, useRef } from 'react'

const services = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
      </svg>
    ),
    title: 'Professionelle Website',
    description: 'Ihr digitales Schaufenster — maßgeschneidert für Ihr Unternehmen. Klar, modern und auf Ihre Wunschkunden ausgerichtet.',
    accent: 'bg-primary-50 text-primary-700',
    border: 'border-primary-100 hover:border-primary-200',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    title: 'Lokale Suchoptimierung',
    description: 'Wenn jemand in Freiburg oder im Schwarzwald sucht — werden Sie gefunden. Lokales SEO, das Kunden zu Ihnen bringt.',
    accent: 'bg-forest-50 text-forest-700',
    border: 'border-forest-100 hover:border-forest-200',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 15.75h3" />
      </svg>
    ),
    title: 'Mobile First',
    description: 'Über 70 % Ihrer Kunden besuchen Ihre Website vom Smartphone. Wir bauen Seiten, die auf jedem Gerät überzeugend wirken.',
    accent: 'bg-amber-50 text-amber-700',
    border: 'border-amber-100 hover:border-amber-200',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    title: 'Persönlicher Support',
    description: 'Kein anonymes Ticket-System. Sie haben einen direkten Ansprechpartner aus der Region — schnell, zuverlässig, auf Augenhöhe.',
    accent: 'bg-violet-50 text-violet-700',
    border: 'border-violet-100 hover:border-violet-200',
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

        <div className="text-center mb-16 opacity-0" data-animate>
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-4">
            Was wir bieten
          </span>
          <h2 id="services-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Alles, was Ihr Unternehmen<br className="hidden sm:block" /> digital braucht
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-500">
            Von der ersten Idee bis zum Go-Live — wir begleiten Sie Schritt für Schritt und liefern eine Website, die wirklich Kunden bringt.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <article
              key={s.title}
              data-animate
              className={`opacity-0 bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border ${s.border}`}
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${s.accent} mb-5`}>
                {s.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.description}</p>
            </article>
          ))}
        </div>

        {/* Stats row */}
        <div
          data-animate
          className="opacity-0 mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          aria-label="Kennzahlen"
        >
          {[
            { value: '2–4 Wochen', label: 'bis zur fertigen Website' },
            { value: '90+',        label: 'Google Lighthouse Score' },
            { value: '48h',        label: 'Antwortzeit garantiert' },
            { value: '100 %',      label: 'regional & persönlich' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm"
            >
              <div className="text-2xl font-bold text-primary-800 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
