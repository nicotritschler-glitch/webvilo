import { useEffect, useRef } from 'react'

const testimonials = [
  {
    quote: 'Seit WebVilo unsere neue Website gebaut hat, haben wir monatlich 30 % mehr Anrufe. Die Seite sieht fantastisch aus und läuft auf dem Handy perfekt. Absolut empfehlenswert!',
    name: 'Thomas Keller',
    company: 'Keller Schreinerei GmbH, Titisee-Neustadt',
    initials: 'TK',
    rating: 5,
  },
  {
    quote: 'Endlich eine Agentur, die zuhört. Nico hat genau verstanden, was wir als kleines Gasthaus brauchen — kein Schnickschnack, sondern eine Seite, die unsere Gäste überzeugt.',
    name: 'Petra Schwarz',
    company: 'Gasthof Zur Traube, Hinterzarten',
    initials: 'PS',
    rating: 5,
  },
  {
    quote: 'Die Zusammenarbeit war unkompliziert und das Ergebnis übertrifft alle Erwartungen. Meine Online-Buchungen haben sich in den ersten zwei Monaten verdoppelt.',
    name: 'Andrea Müller',
    company: 'Bergkräuter Naturkosmetik, Feldberg',
    initials: 'AM',
    rating: 5,
  },
]

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} von 5 Sternen`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

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

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)
  useIntersection(sectionRef)

  return (
    <section id="testimonials" ref={sectionRef} className="py-24 bg-gray-50" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16 opacity-0" data-animate>
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-sm font-medium mb-4">
            Kundenstimmen
          </span>
          <h2 id="testimonials-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Was unsere Kunden sagen
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-500">
            Schwarzwälder Unternehmer, die mit ihrer neuen Website mehr Kunden gewinnen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              data-animate
              className="opacity-0 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <StarRow count={t.rating} />
              <blockquote className="mt-5 text-gray-700 leading-relaxed flex-1">
                „{t.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 pt-6 border-t border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold" aria-hidden="true">{t.initials}</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.company}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Google rating */}
        <div data-animate className="opacity-0 mt-12 flex justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <div>
              <div className="flex items-center gap-1.5">
                <StarRow count={5} />
                <span className="text-sm font-bold text-gray-900">5,0</span>
              </div>
              <div className="text-xs text-gray-500">Basierend auf Google-Bewertungen</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
