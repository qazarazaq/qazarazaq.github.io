import { About } from "./components/About";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Portfolio } from "./components/Portfolio";
import { TravelSection } from "./components/TravelSection";
import { useSceneMotion } from "./hooks/useSceneMotion";

function App() {
  const motion = useSceneMotion();
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Portfolio />
        <About />
        <TravelSection />
      </main>
      <Footer motion={motion} />
    </>
  );
}

export default App;
