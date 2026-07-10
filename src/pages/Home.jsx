import Hero from "../components/Hero";
import Stats from "../components/Stats";
import About from "../components/About";
import TechMarquee from "../components/TechMarquee";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Achievements from "../components/Achievements";
import Experience from "../components/Experience";
import Services from "../components/Services";
import WhyHireMe from "../components/WhyHireMe";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";

function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <TechMarquee />
      <Skills />
      <Projects />
      <Achievements />
      <Experience />
      <Services />
      <WhyHireMe />
      <Testimonials />
      <Contact />
    </>
  );
}

export default Home;
