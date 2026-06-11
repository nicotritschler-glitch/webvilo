import { useEffect, useRef } from 'react'

function ForestSilhouette() {
  const trees = [
    { x: 30,   h: 110, w: 38 },
    { x: 90,   h: 160, w: 52 },
    { x: 155,  h: 130, w: 44 },
    { x: 215,  h: 190, w: 60 },
    { x: 290,  h: 145, w: 48 },
    { x: 355,  h: 175, w: 56 },
    { x: 430,  h: 120, w: 40 },
    { x: 490,  h: 200, w: 64 },
    { x: 570,  h: 150, w: 50 },
    { x: 640,  h: 170, w: 54 },
    { x: 715,  h: 135, w: 44 },
    { x: 775,  h: 185, w: 58 },
    { x: 850,  h: 155, w: 50 },
    { x: 920,  h: 125, w: 42 },
    { x: 975,  h: 165, w: 52 },
    { x: 1045, h: 145, w: 46 },
    { x: 1110, h: 185, w: 60 },
    { x: 1185, h: 130, w: 42 },
    { x: 1245, h: 170, w: 54 },
    { x: 1315, h: 115, w: 38 },
    { x: 1370, h: 150, w: 48 },
  ]

  return (
    <svg
      viewBox="0 0 1440 220"
      fill="currentColor"
      preserveAspectRatio="none"
      className="text-forest-950 w-full"
      aria-hidden="true"
    >
      {/* Background ridge */}
      <ellipse cx="720" cy="260" rx="1100" ry="120" opacity="0.35" />

      {trees.map((t, i) => {
        const cx = t.x + t.w / 2
        const base = 220
        const tipY = base - t.h
        const hw = t.w / 2

        return (
          <g key={i} opacity={0.7 + (i % 4) * 0.08}>
            {/* Layer 3 (bottom, widest) */}
            <polygon points={`${cx},${tipY} ${cx - hw * 1.35},${base} ${cx + hw * 1.35},${base}`} />
            {/* Layer 2 */}
            <polygon points={`${cx},${tipY} ${cx - hw * 1.1},${base - t.h * 0.3} ${cx + hw * 1.1},${base - t.h * 0.3}`} />
            {/* Layer 1 (top, narrowest) */}
            <polygon points={`${cx},${tipY} ${cx - hw * 0.75},${base - t.h * 0.6} ${cx + hw * 0.75},${base - t.h * 0.6}`} />
            {/* Trunk */}
            <rect x={cx - 3} y={base} width="6" height="14" />
          </g>
        )
      })}
    </svg>
  )
}

const pixelDots = [
  { top: '8%',  left: '12%',  size: 4 },
  { top: '14%', left: '78%',  size: 6 },
  { top: '28%', left: '44%',  size: 4 },
  { top: '38%', left: '91%',  size: 4 },
  { top: '11%', left: '58%',  size: 3 },
  { top: '52%', left: '7%',   size: 4 },
  { top: '20%', left: '32%',  size: 3 },
  { top: '31%', left: '67%',  size: 5 },
  { top: '17%', left: '84%',  size: 3 },
  { top: '6%',  left: '49%',  size: 4 },
  { top: '43%', left: '22%',  size: 3 },
  { top: '24%', left: '96%',  size: 4 },
]

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    el.querySelectorAll<HTMLElement>('[data-ha]').forEach((child, i) => {
      child.style.animationDelay = `${i * 160}ms`
      child.classList.add('animate-fade-up')
    })
  }, [])

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #071510 0%, #0d2818 40%, #1b4332 100%)' }}
      aria-labelledby="hero-heading"
    >
      {/* Pixel dots referencing logo design */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {pixelDots.map((d, i) => (
          <div
            key={i}
            className="absolute rounded-sm bg-white/15"
            style={{ top: d.top, left: d.left, width: d.size, height: d.size }}
          />
        ))}
        {/* Red glow accent */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #9b1c1c 0%, transparent 70%)' }} />
        <div className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, #2d6a4f 0%, transparent 70%)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-44 pt-24">

        {/* Location badge */}
        <div
          data-ha
          className="opacity-0 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/8 text-white/75 text-sm font-medium mb-8 backdrop-blur-sm"
        >
          <svg className="w-3.5 h-3.5 text-primary-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          Ihre Webdesign-Agentur aus dem Schwarzwald
        </div>

        {/* Main heading */}
        <h1
          id="hero-heading"
          data-ha
          className="opacity-0 text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 tracking-tight"
        >
          Webseiten, die{' '}
          <span className="text-primary-400">verkaufen.</span>
          <br />
          <span className="text-forest-300">Für den Schwarzwald.</span>
        </h1>

        {/* Sub-heading */}
        <p
          data-ha
          className="opacity-0 max-w-2xl mx-auto text-lg sm:text-xl text-white/65 leading-relaxed mb-10"
        >
          Wir bauen professionelle Websites für Kleinunternehmen in Freiburg und dem Schwarzwald.
          Modern, schnell und auf Conversion optimiert — damit Ihre Kunden Sie finden und anrufen.
        </p>

        {/* CTA */}
        <div data-ha className="opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary-700 text-white font-bold text-lg hover:bg-primary-800 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus-visible:rounded-xl"
          >
            Kostenloses Erstgespräch →
          </a>
          <a
            href="#pricing"
            onClick={(e) => { e.preventDefault(); document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl border-2 border-white/25 text-white font-semibold text-lg hover:bg-white/8 hover:border-white/40 transition-all duration-200 focus-visible:rounded-xl"
          >
            Preise ansehen
          </a>
        </div>

        {/* Trust line */}
        <div data-ha className="opacity-0 mt-12 flex flex-wrap items-center justify-center gap-6 text-white/45 text-sm">
          {[
            'Kein versteckter Kostenpunkt',
            'Antwort in 24 Stunden',
            'Persönliche Betreuung',
          ].map((item) => (
            <span key={item} className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-forest-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Forest silhouette */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden="true">
        <ForestSilhouette />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce" aria-hidden="true">
        <div className="w-6 h-10 rounded-full border-2 border-white/25 flex items-start justify-center pt-2">
          <div className="w-1 h-3 rounded-full bg-white/35 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
