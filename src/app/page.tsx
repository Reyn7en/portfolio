import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Work from '@/components/Work'
import Notes from '@/components/Notes'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Particles from '@/components/Particles'
import ConsoleEgg from '@/components/ConsoleEgg'
import CustomCursor from '@/components/CustomCursor'
import MouseGlow from '@/components/MouseGlow'

export default function Home() {
  return (
    <main className="relative">
      <CustomCursor />
      <ConsoleEgg />
      <MouseGlow />
      <Particles />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Work />
      <Notes />
      <Contact />
      <Footer />
    </main>
  )
}
