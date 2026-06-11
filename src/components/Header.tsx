import { useState, useEffect } from 'react'
import logoImg from '../assets/images/logo_transparent_gem.png'

const navLinks = [
  { label: 'Leistungen', href: '#services' },
  { label: 'Preise',     href: '#pricing' },
  { label: 'Über uns',  href: '#regional' },
  { label: 'Referenzen', href: '#testimonials' },
  { label: 'FAQ',        href: '#faq' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/97 backdrop-blur-sm shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Hauptnavigation">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home') }}
            className="flex items-center focus-visible:rounded"
            aria-label="WebVilo – zurück zur Startseite"
          >
            <img
              src={logoImg}
              alt="WebVilo Logo"
              className={`h-10 w-auto transition-all duration-300 ${
                isScrolled ? '' : 'brightness-0 invert'
              }`}
            />
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors focus-visible:rounded-lg ${
                    isScrolled
                      ? 'text-gray-600 hover:text-primary-800 hover:bg-primary-50'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
                className="ml-3 px-5 py-2.5 rounded-lg bg-primary-700 text-white text-sm font-semibold hover:bg-primary-800 transition-colors focus-visible:rounded-lg shadow-sm"
              >
                Erstgespräch buchen
              </a>
            </li>
          </ul>

          {/* Mobile menu button */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors focus-visible:rounded-lg ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div id="mobile-menu" className="md:hidden bg-white border-t border-gray-100 rounded-b-2xl shadow-lg pb-4">
            <ul className="flex flex-col gap-1 pt-2" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                    className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-primary-800 hover:bg-primary-50 rounded-lg transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2 px-4">
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
                  className="block w-full text-center px-5 py-3 rounded-lg bg-primary-700 text-white text-sm font-semibold hover:bg-primary-800 transition-colors"
                >
                  Erstgespräch buchen
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}
