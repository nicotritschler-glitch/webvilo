import { useEffect, useRef } from 'react'

function TanneIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 60" fill="currentColor" className={className} aria-hidden="true">
      <polygon points="20,2 28,18 24,18 31,33 26,33 34,50 6,50 14,33 9,33 16,18 12,18" />
      <rect x="17" y="50" width="6" height="10" />
    </svg>
  )
}

const highlights = [
  {
    title: 'Wir kennen die Region',
    text: 'Als Schwarzwälder kennen wir den lokalen Markt, die Eigenheiten und die Kunden vor Ort. Kein Stadtagentur-Ansatz — sondern echter Heimvorteil für Ihr Unternehmen.',
  },
  {
    title: 'Persönlich & nahbar',
    text: 'Kein anonymes Ticket-System, kein Outsourcing in Billiglohnländer. Sie haben einen direkten Ansprechpartner, der Ihre Website kennt wie seine Westentasche.',
  },
  {
    title: 'Verlässlich & langfristig',
    text: 'Unsere Kunden kommen aus dem Schwarzwald und bleiben langfristig. Wir denken nicht in Projekten — wir denken in Partnerschaften.',
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

export default function Regional() {
  const sectionRef = useRef<HTMLDivElement>(null)
  useIntersection(sectionRef)

  return (
    <section
      id="regional"
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0d2818 0%, #1b4332 60%, #0d2818 100%)' }}
      aria-labelledby="regional-heading"
    >
      {/* Decorative tannen */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <TanneIcon className="absolute -left-4 bottom-0 text-forest-800 h-48 opacity-30" />
        <TanneIcon className="absolute left-20 bottom-0 text-forest-800 h-64 opacity-20" />
        <TanneIcon className="absolute right-8 bottom-0 text-forest-800 h-56 opacity-25" />
        <TanneIcon className="absolute right-32 bottom-0 text-forest-800 h-40 opacity-15" />
        {/* Red accent glow */}
        <div
          className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, #9b1c1c 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <div className="opacity-0" data-animate>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-forest-200 text-sm font-medium mb-6 border border-white/15">
                <TanneIcon className="h-4 text-forest-300" />
                Verwurzelt im Schwarzwald
              </span>
              <h2 id="regional-heading" className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
                Wir bauen Websites<br />
                <span className="text-forest-300">für Menschen, die wir kennen.</span>
              </h2>
              <p className="text-forest-200/80 text-lg leading-relaxed mb-6">
                WebVilo ist in Freiburg im Breisgau verwurzelt. Wir kennen den Schwarzwald, seine Menschen und seine Unternehmen. Handwerksbetriebe, Gasthäuser, Boutiquen, Praxen — wir wissen, wie Ihr Kunde denkt und was ihn überzeugt.
              </p>
              <p className="text-forest-200/60 leading-relaxed">
                Während große Agenturen Kundenprojekte als Nummern behandeln, kennen wir Sie bei Namen. Ihr Erfolg ist unser Aushängeschild — und den nehmen wir persönlich.
              </p>
            </div>

            {/* Region badge */}
            <div className="opacity-0 mt-8 flex items-center gap-4" data-animate>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-white/10 rounded-xl border border-white/15 backdrop-blur-sm">
                <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-white text-sm font-medium">Freiburg im Breisgau</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-white/10 rounded-xl border border-white/15 backdrop-blur-sm">
                <TanneIcon className="h-5 text-forest-300" />
                <span className="text-white text-sm font-medium">Schwarzwald</span>
              </div>
            </div>
          </div>

          {/* Right: Highlights */}
          <div className="space-y-5">
            {highlights.map((h, i) => (
              <div
                key={h.title}
                data-animate
                className="opacity-0 bg-white/8 border border-white/12 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/12 transition-colors duration-200"
                style={{ '--delay': `${i * 120}ms` } as React.CSSProperties}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-700/80 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{h.title}</h3>
                    <p className="text-forest-200/70 text-sm leading-relaxed">{h.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
