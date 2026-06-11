import { useEffect, useRef } from 'react'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    el.classList.add('animate-fade-in')
  }, [])

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-primary-700"
      aria-labelledby="hero-heading"
    >
      {/* Background decorative circles */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-primary-400/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary-600/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/20 border border-primary-400/30 text-primary-200 text-sm font-medium mb-8 animate-fade-up">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
          Professionelle Webentwicklung
        </div>

        {/* Heading */}
        <h1
          id="hero-heading"
          className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-up animation-delay-100"
        >
          Wir bauen Ihre{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-blue-300">
            digitale Zukunft
          </span>
        </h1>

        {/* Subheading */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-primary-200 leading-relaxed mb-10 animate-fade-up animation-delay-200">
          WebVilo entwickelt moderne, performante und barrierefreie Web­applikationen, die Ihr Unter­nehmen zum Wachsen bringen.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-300">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-primary-700 font-semibold text-lg hover:bg-primary-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus-visible:rounded-xl"
          >
            Projekt starten
          </a>
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-primary-400/50 text-white font-semibold text-lg hover:bg-primary-800/50 transition-all duration-200 focus-visible:rounded-xl"
          >
            Unsere Services
          </a>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-up animation-delay-400" aria-label="Kennzahlen">
          {[
            { value: '50+', label: 'Projekte' },
            { value: '98%', label: 'Zufriedenheit' },
            { value: '5★', label: 'Bewertung' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-primary-300 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <div className="w-6 h-10 rounded-full border-2 border-primary-400/50 flex items-start justify-center pt-2">
          <div className="w-1 h-3 rounded-full bg-primary-400 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
