import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Team from './components/Team'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
