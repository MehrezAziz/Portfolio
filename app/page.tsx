import { getContent } from "@/lib/content";
import { SiteContentProvider } from "@/components/SiteContentProvider";
import ParticleBackground from "@/components/ParticleBackground";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Content is editable at runtime via the control panel, so render dynamically.
export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getContent();
  return (
    <SiteContentProvider value={content}>
      <ParticleBackground />
      <CustomCursor />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </SiteContentProvider>
  );
}
