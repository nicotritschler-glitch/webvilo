import { useState, useEffect, useRef } from 'react'

const faqs = [
  {
    q: 'Wie lange dauert die Erstellung meiner Website?',
    a: 'Bei unserem Starter-Paket rechnen Sie mit 1–2 Wochen. Das Business-Paket dauert typischerweise 3–4 Wochen. Für komplexere Projekte wie Online-Shops planen wir 5–8 Wochen ein. Mit der Express-Option verkürzen wir die Zeit auf die Hälfte.',
  },
  {
    q: 'Was passiert, wenn ich später Änderungen haben möchte?',
    a: 'Jedes Paket beinhaltet einen kostenlosen Support-Zeitraum. Danach bieten wir flexible Wartungsverträge an — oder wir schulen Sie, sodass Sie kleinere Änderungen selbst vornehmen können. Sie sind nie auf uns angewiesen.',
  },
  {
    q: 'Kümmert ihr euch auch um Hosting und Domain?',
    a: 'Ja — auf Wunsch übernehmen wir alles. Wir empfehlen und richten Hosting, Domain und SSL-Zertifikat ein. Alternativ nutzen wir Ihren bestehenden Hoster. Das Hosting zahlen Sie direkt beim Anbieter (ca. 5–15 € / Monat), damit Sie unabhängig von uns bleiben.',
  },
  {
    q: 'Muss ich technische Vorkenntnisse haben?',
    a: 'Nein. Wir erklären alles verständlich und auf Augenhöhe. Nach dem Launch schulen wir Sie, wie Sie Texte und Bilder selbst aktualisieren — auch wenn Sie noch nie eine Website gepflegt haben.',
  },
  {
    q: 'Macht ihr auch Google-Optimierung (SEO)?',
    a: 'Ja! Jede Website liefern wir mit technischer SEO-Grundoptimierung. Das SEO-Starterpaket geht tiefer: Keyword-Analyse, lokale SEO für Freiburg/Schwarzwald, Google Business Profil-Einrichtung und ein strukturierter Starterplan, damit Sie bei Google gefunden werden.',
  },
  {
    q: 'Kann ich zuerst sehen, wie meine Website aussehen wird?',
    a: 'Selbstverständlich. Bevor wir mit der Entwicklung beginnen, erstellen wir Ihnen einen Design-Prototyp zur Freigabe. Sie sehen Layout, Farben und Inhalte — und können Feedback geben, bevor auch nur eine Zeile Code geschrieben wird.',
  },
  {
    q: 'Was kostet eine Website monatlich nach dem Launch?',
    a: 'Die laufenden Kosten sind gering: Hosting 5–15 €/Monat, Domain ca. 1–2 €/Monat. Unser optionaler Pflegevertrag beginnt ab 49 €/Monat und umfasst Updates, Backups und kleine Änderungen.',
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
            child.style.animationDelay = `${i * 60}ms`
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

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  useIntersection(sectionRef)

  return (
    <section id="faq" ref={sectionRef} className="py-24 bg-white" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14 opacity-0" data-animate>
          <span className="inline-block px-4 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium mb-4">
            Häufige Fragen
          </span>
          <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Alles, was Sie wissen wollen
          </h2>
          <p className="text-lg text-gray-500">
            Noch Fragen offen? Schreiben Sie uns — wir antworten persönlich.
          </p>
        </div>

        <dl className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              data-animate
              className="opacity-0 border border-gray-200 rounded-2xl overflow-hidden"
            >
              <dt>
                <button
                  type="button"
                  aria-expanded={open === i}
                  aria-controls={`faq-answer-${i}`}
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors focus-visible:rounded-2xl"
                >
                  <span>{faq.q}</span>
                  <svg
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                      open === i ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
              </dt>
              <dd
                id={`faq-answer-${i}`}
                className={`overflow-hidden transition-all duration-200 ${
                  open === i ? 'max-h-96' : 'max-h-0'
                }`}
                aria-hidden={open !== i}
              >
                <p className="px-6 pb-5 text-gray-600 leading-relaxed">{faq.a}</p>
              </dd>
            </div>
          ))}
        </dl>

        <div data-animate className="opacity-0 mt-12 text-center bg-gray-50 rounded-2xl p-8 border border-gray-100">
          <p className="text-gray-700 font-medium mb-3">Ihre Frage ist nicht dabei?</p>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-700 text-white font-semibold hover:bg-primary-800 transition-colors focus-visible:rounded-xl"
          >
            Direkt fragen →
          </a>
        </div>
      </div>
    </section>
  )
}
