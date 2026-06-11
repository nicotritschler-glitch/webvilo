import { useState, useRef, useEffect, type FormEvent } from 'react'

interface FormState {
  name: string
  email: string
  phone: string
  message: string
  interest: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

const interests = [
  'Landingpage',
  'Unternehmenswebsite',
  'Online-Shop',
  'SEO / Google-Optimierung',
  'Bestehendes Projekt überarbeiten',
  'Sonstiges',
]

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', message: '', interest: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
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
  }, [])

  function validate(): boolean {
    const e: Partial<FormState> = {}
    if (!form.name.trim())    e.name    = 'Bitte geben Sie Ihren Namen ein.'
    if (!form.email.trim())   e.email   = 'E-Mail-Adresse ist erforderlich.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Bitte eine gültige E-Mail eingeben.'
    if (!form.message.trim()) e.message = 'Bitte beschreiben Sie Ihr Projekt kurz.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    await new Promise((r) => setTimeout(r, 1200))
    setStatus('success')
    setForm({ name: '', email: '', phone: '', message: '', interest: '' })
  }

  const inputBase = 'w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
  const inputError  = 'border-red-400 focus:ring-red-400 focus:border-red-400'
  const inputNormal = 'border-gray-200 hover:border-gray-300'

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-gray-50" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: Info */}
          <div>
            <div className="opacity-0" data-animate>
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-4">
                Kostenloses Erstgespräch
              </span>
              <h2 id="contact-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5">
                Starten Sie Ihr Projekt
              </h2>
              <p className="text-gray-500 leading-relaxed text-lg mb-8">
                Schreiben Sie uns — oder rufen Sie direkt an. Wir melden uns garantiert innerhalb von 24 Stunden mit einem ersten Konzept.
              </p>
            </div>

            <dl className="space-y-5 mb-10">
              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  ),
                  label: 'E-Mail',
                  value: 'nico.tritschler@icloud.com',
                  href: 'mailto:nico.tritschler@icloud.com',
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  ),
                  label: 'Standort',
                  value: 'Freiburg im Breisgau, Schwarzwald',
                  href: undefined,
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 opacity-0" data-animate>
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">{item.label}</dt>
                    {item.href ? (
                      <dd><a href={item.href} className="text-gray-900 font-medium hover:text-primary-700 transition-colors">{item.value}</a></dd>
                    ) : (
                      <dd className="text-gray-900 font-medium">{item.value}</dd>
                    )}
                  </div>
                </div>
              ))}
            </dl>

            {/* Response promise */}
            <div className="opacity-0" data-animate>
              <div className="bg-forest-900 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-forest-700 flex items-center justify-center">
                    <svg className="w-4 h-4 text-forest-200" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="font-semibold">48-Stunden-Versprechen</span>
                </div>
                <p className="text-forest-200 text-sm leading-relaxed">
                  Sie erhalten innerhalb von 48 Stunden ein erstes Konzept und ein transparentes Festpreis-Angebot — oder das Erstgespräch ist auf unsere Rechnung.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="opacity-0" data-animate>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              {status === 'success' ? (
                <div className="text-center py-10" role="status" aria-live="polite">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-forest-100 text-forest-700 mb-5" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Nachricht erhalten!</h3>
                  <p className="text-gray-500 mb-6">Danke für Ihre Anfrage. Wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Weitere Nachricht senden
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate aria-label="Kontaktformular">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Unverbindlich anfragen</h3>
                  <div className="space-y-5">

                    {/* Interest */}
                    <div>
                      <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Was interessiert Sie?
                      </label>
                      <select
                        id="interest"
                        value={form.interest}
                        onChange={(e) => setForm((f) => ({ ...f, interest: e.target.value }))}
                        className={`${inputBase} ${inputNormal} cursor-pointer`}
                      >
                        <option value="">Bitte wählen (optional)</option>
                        {interests.map((i) => <option key={i} value={i}>{i}</option>)}
                      </select>
                    </div>

                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Name <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="Max Mustermann"
                        className={`${inputBase} ${errors.name ? inputError : inputNormal}`}
                        aria-required="true"
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && <p id="name-error" className="mt-1.5 text-xs text-red-500" role="alert">{errors.name}</p>}
                    </div>

                    {/* Email + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                          E-Mail <span className="text-red-500" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                          placeholder="max@beispiel.de"
                          className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
                          aria-required="true"
                          aria-describedby={errors.email ? 'email-error' : undefined}
                          aria-invalid={!!errors.email}
                        />
                        {errors.email && <p id="email-error" className="mt-1.5 text-xs text-red-500" role="alert">{errors.email}</p>}
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                          Telefon <span className="text-gray-400 font-normal">(optional)</span>
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          autoComplete="tel"
                          value={form.phone}
                          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                          placeholder="+49 761 …"
                          className={`${inputBase} ${inputNormal}`}
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Ihr Projekt <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        placeholder="Beschreiben Sie kurz Ihr Unternehmen und was Sie sich vorstellen…"
                        className={`${inputBase} resize-none ${errors.message ? inputError : inputNormal}`}
                        aria-required="true"
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        aria-invalid={!!errors.message}
                      />
                      {errors.message && <p id="message-error" className="mt-1.5 text-xs text-red-500" role="alert">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary-700 text-white font-bold hover:bg-primary-800 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 focus-visible:rounded-xl shadow-md"
                      aria-busy={status === 'loading'}
                    >
                      {status === 'loading' ? (
                        <>
                          <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Wird gesendet…
                        </>
                      ) : (
                        'Kostenlose Anfrage senden →'
                      )}
                    </button>

                    <p className="text-center text-xs text-gray-400">
                      Keine Verpflichtung. Kein Spam. Antwort in 24h.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
