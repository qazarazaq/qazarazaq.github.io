import { About } from "./components/About";
import { Approach } from "./components/Approach";
import { Archive } from "./components/Archive";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Portfolio } from "./components/Portfolio";
import { ProfessionalProof } from "./components/ProfessionalProof";
import { TravelSection } from "./components/TravelSection";

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <ProfessionalProof />
        <Portfolio />
        <Approach />
        <TravelSection />
        <About />
        <Archive />
      </main>
      <Footer />
    </>
  );
}

export default App;
