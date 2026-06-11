import { useState, useEffect, useRef } from 'react'

type WebsiteType = 'landingpage' | 'business' | 'shop'
type PageCount = 'small' | 'medium' | 'large'

interface CalcState {
  type: WebsiteType
  pages: PageCount
  blog: boolean
  booking: boolean
  gallery: boolean
  seo: boolean
  multilang: boolean
  express: boolean
}

const BASE: Record<WebsiteType, [number, number]> = {
  landingpage: [799,  1299],
  business:    [1999, 3499],
  shop:        [3499, 6999],
}

const PAGE_EXTRA: Record<PageCount, [number, number]> = {
  small:  [0,   0],
  medium: [200, 400],
  large:  [500, 900],
}

function calcPrice(s: CalcState): [number, number] {
  let [lo, hi] = BASE[s.type]
  const [elo, ehi] = PAGE_EXTRA[s.pages]
  lo += elo; hi += ehi
  if (s.blog)      { lo += 200; hi += 300 }
  if (s.booking)   { lo += 350; hi += 500 }
  if (s.gallery)   { lo += 150; hi += 200 }
  if (s.seo)       { lo += 400; hi += 600 }
  if (s.multilang) { lo += 500; hi += 700 }
  if (s.express)   { lo = Math.round(lo * 1.3); hi = Math.round(hi * 1.3) }
  return [lo, hi]
}

function useIntersection(ref: React.RefObject<Element>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll<HTMLElement>('[data-animate]').forEach((child, i) => {
            child.style.animationDelay = `${i * 80}ms`
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

export default function Calculator() {
  const sectionRef = useRef<HTMLDivElement>(null)
  useIntersection(sectionRef)

  const [state, setState] = useState<CalcState>({
    type: 'business',
    pages: 'medium',
    blog: false,
    booking: false,
    gallery: false,
    seo: false,
    multilang: false,
    express: false,
  })

  const [lo, hi] = calcPrice(state)

  const set = <K extends keyof CalcState>(key: K, val: CalcState[K]) =>
    setState((s) => ({ ...s, [key]: val }))

  const typeOptions: { value: WebsiteType; label: string; desc: string }[] = [
    { value: 'landingpage', label: 'Landingpage',         desc: 'Eine starke Seite, ein klares Ziel' },
    { value: 'business',   label: 'Unternehmenswebsite', desc: 'Komplett — von Home bis Kontakt' },
    { value: 'shop',       label: 'Online-Shop',         desc: 'Mit Produkten und Zahlungsabwicklung' },
  ]

  const pageOptions: { value: PageCount; label: string }[] = [
    { value: 'small',  label: '1 – 3 Seiten' },
    { value: 'medium', label: '4 – 8 Seiten' },
    { value: 'large',  label: '9+ Seiten' },
  ]

  const extras: { key: keyof CalcState; label: string; price: string }[] = [
    { key: 'blog',      label: 'Blog / News-Bereich',      price: '+200 €' },
    { key: 'booking',   label: 'Online-Buchungssystem',    price: '+350 €' },
    { key: 'gallery',   label: 'Galerie / Portfolio',      price: '+150 €' },
    { key: 'seo',       label: 'SEO-Starterpaket',         price: '+400 €' },
    { key: 'multilang', label: 'Mehrsprachigkeit (DE/EN)', price: '+500 €' },
  ]

  return (
    <section id="calculator" ref={sectionRef} className="py-24 bg-white" aria-labelledby="calc-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14 opacity-0" data-animate>
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-4">
            Budget-Kalkulator
          </span>
          <h2 id="calc-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Was kostet Ihre Website?
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-500">
            Konfigurieren Sie Ihr Wunschprojekt und erhalten Sie sofort eine Preisschätzung — unverbindlich und kostenlos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left: Config */}
          <div className="space-y-8 opacity-0" data-animate>

            {/* Website type */}
            <fieldset>
              <legend className="text-base font-semibold text-gray-900 mb-3">Art der Website</legend>
              <div className="grid grid-cols-1 gap-3">
                {typeOptions.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-150 ${
                      state.type === opt.value
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="type"
                      value={opt.value}
                      checked={state.type === opt.value}
                      onChange={() => set('type', opt.value)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                      state.type === opt.value ? 'border-primary-600' : 'border-gray-300'
                    }`}>
                      {state.type === opt.value && <div className="w-2 h-2 rounded-full bg-primary-600" />}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{opt.label}</div>
                      <div className="text-sm text-gray-500">{opt.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Page count */}
            <fieldset>
              <legend className="text-base font-semibold text-gray-900 mb-3">Anzahl der Seiten</legend>
              <div className="flex gap-3 flex-wrap">
                {pageOptions.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex-1 min-w-[120px] text-center px-4 py-3 rounded-xl border-2 cursor-pointer transition-all duration-150 text-sm font-medium ${
                      state.pages === opt.value
                        ? 'border-primary-600 bg-primary-50 text-primary-800'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="pages"
                      value={opt.value}
                      checked={state.pages === opt.value}
                      onChange={() => set('pages', opt.value)}
                      className="sr-only"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Extras */}
            <fieldset>
              <legend className="text-base font-semibold text-gray-900 mb-3">Zusätzliche Features</legend>
              <div className="space-y-2.5">
                {extras.map((extra) => (
                  <label
                    key={extra.key}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all duration-150 ${
                      state[extra.key]
                        ? 'border-forest-500 bg-forest-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        state[extra.key] ? 'border-forest-600 bg-forest-600' : 'border-gray-300'
                      }`}>
                        {state[extra.key] && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        )}
                      </div>
                      <input
                        type="checkbox"
                        checked={state[extra.key] as boolean}
                        onChange={(e) => set(extra.key, e.target.checked as CalcState[typeof extra.key])}
                        className="sr-only"
                        aria-label={extra.label}
                      />
                      <span className="text-sm font-medium text-gray-800">{extra.label}</span>
                    </div>
                    <span className="text-sm text-gray-500 font-medium">{extra.price}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Express */}
            <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all duration-150 ${
              state.express ? 'border-amber-400 bg-amber-50' : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  state.express ? 'border-amber-500 bg-amber-500' : 'border-gray-300'
                }`}>
                  {state.express && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  )}
                </div>
                <input
                  type="checkbox"
                  checked={state.express}
                  onChange={(e) => set('express', e.target.checked)}
                  className="sr-only"
                  aria-label="Express-Lieferung"
                />
                <div>
                  <div className="text-sm font-medium text-gray-800">Express-Lieferung ⚡</div>
                  <div className="text-xs text-gray-500">Fertig in 2 Wochen statt 4</div>
                </div>
              </div>
              <span className="text-sm text-amber-700 font-medium">+30 %</span>
            </label>
          </div>

          {/* Right: Result */}
          <div className="opacity-0" data-animate>
            <div className="sticky top-24 bg-forest-900 rounded-2xl p-8 text-white shadow-2xl">
              <div className="text-forest-300 text-sm font-medium mb-2">Ihre Schätzung</div>
              <div className="text-5xl font-bold mb-1">
                {lo.toLocaleString('de-DE')}€
                <span className="text-2xl text-forest-300 font-normal"> – {hi.toLocaleString('de-DE')}€</span>
              </div>
              <div className="text-forest-400 text-sm mb-8">einmalig, zzgl. MwSt. · unverbindliche Schätzung</div>

              <div className="space-y-3 mb-8">
                <div className="text-sm font-medium text-forest-200 mb-2">Ihre Konfiguration:</div>
                {[
                  { label: 'Website-Typ', value: typeOptions.find(o => o.value === state.type)?.label },
                  { label: 'Seitenanzahl', value: pageOptions.find(o => o.value === state.pages)?.label },
                  ...(state.blog      ? [{ label: 'Extra', value: 'Blog / News' }]               : []),
                  ...(state.booking   ? [{ label: 'Extra', value: 'Buchungssystem' }]             : []),
                  ...(state.gallery   ? [{ label: 'Extra', value: 'Galerie' }]                    : []),
                  ...(state.seo       ? [{ label: 'Extra', value: 'SEO-Paket' }]                  : []),
                  ...(state.multilang ? [{ label: 'Extra', value: 'Mehrsprachig' }]               : []),
                  ...(state.express   ? [{ label: 'Option', value: '⚡ Express-Lieferung' }]      : []),
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-forest-400">{item.label}</span>
                    <span className="text-white font-medium">{item.value}</span>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="block w-full text-center px-6 py-4 rounded-xl bg-primary-700 text-white font-bold hover:bg-primary-800 transition-colors shadow-lg focus-visible:rounded-xl"
              >
                Kostenloses Angebot anfordern →
              </a>
              <p className="text-center text-forest-400 text-xs mt-3">
                Kein Spam. Keine Verpflichtung. Antwort in 24h.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
