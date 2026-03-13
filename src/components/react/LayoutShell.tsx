import { useState } from 'react';
import { LanguageProvider } from './LanguageContext';
import { ThemeProvider } from './ThemeContext';
import { NavBar } from './NavBar';
import { MobileMenu } from './MobileMenu';
import { Footer } from './Footer';
import { BackToTop } from './BackToTop';
import { Hero } from './Hero';
import { About } from './About';
import { Projects } from './Projects';
import { TechStack } from './TechStack';
import { Contact } from './Contact';

export type PageId = 'home' | 'about' | 'projects' | 'techstack' | 'contact';

const PAGE_COMPONENTS: Record<PageId, () => React.JSX.Element> = {
  home: () => <Hero />,
  about: () => <About />,
  projects: () => <Projects />,
  techstack: () => <TechStack />,
  contact: () => <Contact />,
};

interface LayoutShellProps {
  page: PageId;
}

function LayoutShell({ page }: LayoutShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const PageComponent = PAGE_COMPONENTS[page];

  return (
    <ThemeProvider>
      <LanguageProvider>
      <div
        className="relative flex min-h-screen flex-col animate-page-enter"
      >
        <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} page={page} />
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} page={page} />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          <div data-astro-transition-name="page-content">
            {PageComponent()}
          </div>
        </main>
        <Footer />
        <BackToTop />
      </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default LayoutShell;
