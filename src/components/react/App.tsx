import { useState } from 'react';
import { LanguageProvider } from './LanguageContext';
import { NavBar } from './NavBar';
import { MobileMenu } from './MobileMenu';
import { Hero } from './Hero';
import { TechStack } from './TechStack';
import { Projects } from './Projects';
import { About } from './About';
import { Contact } from './Contact';
import { Footer } from './Footer';
import { BackToTop } from './BackToTop';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <LanguageProvider>
      <div className="relative flex min-h-screen flex-col animate-page-enter">
        <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <TechStack />
          <Projects />
          <About />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </LanguageProvider>
  );
}
