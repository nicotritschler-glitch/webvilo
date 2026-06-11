import { useEffect, useRef } from 'react'

const packages = [
  {
    name: 'Starter',
    subtitle: 'Für den schnellen Einstieg',
    price: '799',
    description: 'Perfekt für Handwerker, Gastronomie und Einzelunternehmer, die online präsent sein möchten.',
    features: [
      'Bis zu 3 Seiten (Start, Über uns, Kontakt)',
      'Mobile-optimiertes Design',
      'Kontaktformular',
      'Google Maps Einbindung',
      'SSL-Zertifikat inklusive',
      '1 Monat kostenloser Support',
    ],
    cta: 'Starter wählen',
    highlight: false,
    badge: null,
  },
  {
    name: 'Business',
    subtitle: 'Unser beliebtestes Paket',
    price: '1.999',
    description: 'Die vollständige Unternehmenswebsite mit allem, was Sie brauchen, um Kunden zu gewinnen.',
    features: [
      'Bis zu 8 Seiten inkl. Blog',
      'Lokale Suchmaschinenoptimierung (SEO)',
      'Google Business Profil Setup',
      'Online-Buchungsformular',
      'Bildergalerie & Teamseite',
      'Ladezeit-Optimierung',
      '3 Monate kostenloser Support',
      'Schulung zur eigenständigen Pflege',
    ],
    cta: 'Business wählen',
    highlight: true,
    badge: 'Empfohlen',
  },
  {
    name: 'Premium',
    subtitle: 'Für maximales Wachstum',
    price: '3.499',
    description: 'Volle Power: Online-Shop, erweitertes SEO und alles, was Ihr Unternehmen nach vorne bringt.',
    features: [
      'Unbegrenzte Seiten',
      'Online-Shop (bis 100 Produkte)',
      'Umfassendes SEO-Paket',
      'Buchungssystem Integration',
      'Mehrsprachigkeit (DE/EN)',
      'Performance-Monitoring',
      '6 Monate Priority-Support',
      'Monatliches SEO-Reporting',
    ],
    cta: 'Premium wählen',
    highlight: false,
    badge: null,
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

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null)
  useIntersection(sectionRef)

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault()
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="pricing" ref={sectionRef} className="py-24 bg-white" aria-labelledby="pricing-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16 opacity-0" data-animate>
          <span className="inline-block px-4 py-1.5 rounded-full bg-forest-100 text-forest-800 text-sm font-medium mb-4">
            Transparente Preise
          </span>
          <h2 id="pricing-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Investition, die sich lohnt
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-500">
            Keine versteckten Kosten, keine Überraschungen. Wählen Sie das Paket, das zu Ihrem Unternehmen passt — oder wir schnüren Ihnen ein individuelles Angebot.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {packages.map((pkg) => (
            <article
              key={pkg.name}
              data-animate
              className={`opacity-0 relative rounded-2xl border transition-all duration-300 ${
                pkg.highlight
                  ? 'border-primary-300 shadow-xl shadow-primary-100/50 scale-[1.02]'
                  : 'border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1'
              }`}
            >
              {pkg.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-primary-700 text-white text-xs font-bold uppercase tracking-wide">
                    {pkg.badge}
                  </span>
                </div>
              )}

              <div className={`p-8 rounded-t-2xl ${pkg.highlight ? 'bg-primary-800' : 'bg-white'}`}>
                <h3 className={`text-xl font-bold mb-1 ${pkg.highlight ? 'text-white' : 'text-gray-900'}`}>
                  {pkg.name}
                </h3>
                <p className={`text-sm mb-6 ${pkg.highlight ? 'text-primary-200' : 'text-gray-500'}`}>
                  {pkg.subtitle}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className={`text-sm font-medium ${pkg.highlight ? 'text-primary-200' : 'text-gray-500'}`}>
                    ab
                  </span>
                  <span className={`text-4xl font-bold ${pkg.highlight ? 'text-white' : 'text-gray-900'}`}>
                    {pkg.price}€
                  </span>
                </div>
                <p className={`text-sm mt-1 ${pkg.highlight ? 'text-primary-300' : 'text-gray-400'}`}>
                  einmalig, zzgl. MwSt.
                </p>
              </div>

              <div className={`p-8 ${pkg.highlight ? 'bg-primary-50' : 'bg-white'} rounded-b-2xl`}>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">{pkg.description}</p>
                <ul className="space-y-3 mb-8" role="list">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-forest-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  onClick={scrollToContact}
                  className={`block w-full text-center px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 focus-visible:rounded-xl ${
                    pkg.highlight
                      ? 'bg-primary-700 text-white hover:bg-primary-800 shadow-md hover:shadow-lg'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {pkg.cta}
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Custom offer note */}
        <div data-animate className="opacity-0 mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Kein passendes Paket dabei?{' '}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="text-primary-700 font-medium hover:underline"
            >
              Individuelles Angebot anfragen →
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
