import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutExperiment from './components/AboutExperiment'
import SimulationSection from './components/Simulation/SimulationSection'
import PosterSection from './components/PosterSection'
import ReportsSection from './components/ReportsSection'
import ReferencesSection from './components/ReferencesSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutExperiment />
        <SimulationSection />
        <PosterSection />
        <ReportsSection />
        <ReferencesSection />
      </main>
      <Footer />
    </>
  )
}
