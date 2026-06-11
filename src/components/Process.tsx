import { useEffect, useRef } from 'react'

const steps = [
  {
    number: '01',
    title: 'Kostenloses Erstgespräch',
    description: 'Wir hören zu. In einem 30-minütigen Telefonat oder Video-Call lernen wir Ihr Unternehmen kennen — ohne Verkaufsdruck, ohne Verpflichtung.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Konzept & Angebot',
    description: 'Innerhalb von 48 Stunden erhalten Sie ein maßgeschneidertes Konzept und ein transparentes Festpreis-Angebot — ohne böse Überraschungen.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Design & Entwicklung',
    description: 'Wir bauen Ihre Website — mit regelmäßigen Updates und Ihrem Feedback. Kein verstaubtes Template, sondern echte Handarbeit für Ihr Unternehmen.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Launch & Betreuung',
    description: 'Go-Live! Wir schalten Ihre Website frei und schulen Sie in der Pflege. Danach bleiben wir Ihr Partner — für Updates, Fragen und Wachstum.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
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

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null)
  useIntersection(sectionRef)

  return (
    <section id="process" ref={sectionRef} className="py-24 bg-gray-50" aria-labelledby="process-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16 opacity-0" data-animate>
          <span className="inline-block px-4 py-1.5 rounded-full bg-forest-100 text-forest-800 text-sm font-medium mb-4">
            Unser Ablauf
          </span>
          <h2 id="process-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Einfach. Klar. Zuverlässig.
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-500">
            Vom ersten Gespräch bis zum fertigen Auftritt — in vier Schritten zu Ihrer neuen Website.
          </p>
        </div>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200" aria-hidden="true" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div
                key={step.number}
                data-animate
                className="opacity-0 relative text-center"
              >
                {/* Step circle */}
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className={`w-24 h-24 rounded-2xl flex items-center justify-center shadow-sm border-2 transition-colors ${
                    i === 0 ? 'bg-primary-700 border-primary-600 text-white' : 'bg-white border-gray-200 text-primary-700'
                  }`}>
                    {step.icon}
                  </div>
                  <span className={`absolute -top-2 -right-2 w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${
                    i === 0 ? 'bg-white text-primary-800' : 'bg-primary-700 text-white'
                  }`}>
                    {i + 1}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div data-animate className="opacity-0 mt-16 text-center">
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary-700 text-white font-bold text-lg hover:bg-primary-800 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 focus-visible:rounded-xl"
          >
            Jetzt Schritt 1 starten — kostenlos
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
