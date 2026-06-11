import Header       from './components/Header'
import Hero         from './components/Hero'
import Features     from './components/Features'
import Pricing      from './components/Pricing'
import Process      from './components/Process'
import Calculator   from './components/Calculator'
import Regional     from './components/Regional'
import Testimonials from './components/Testimonials'
import Team         from './components/Team'
import FAQ          from './components/FAQ'
import Contact      from './components/Contact'
import Footer       from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <Process />
        <Calculator />
        <Regional />
        <Testimonials />
        <Team />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
