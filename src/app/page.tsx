import About from "@/components/sections/About";
import Hero from "@/components/sections/Hero";
import Project from "@/components/sections/Project";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import Navbar from "@/components/ui/Navbar";
import ParticlesBackground from "@/components/ui/ParticlesBackground";
import Footer from "@/components/ui/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";

export default function Home() {
  return (
    <>
      <ParticlesBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Project />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
