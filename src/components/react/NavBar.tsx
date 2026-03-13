import { useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { LanguageToggle } from './LanguageToggle';
import { ThemeSelector } from './ThemeSelector';
import { config } from '../../config/config';
import type { PageId } from './LayoutShell';

interface NavBarProps {
  menuOpen: boolean;
  setMenuOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  page: PageId;
}

const navLinks: { href: string; page: PageId; trlKey: 'about' | 'sectionTech' | 'projects' | 'contact' }[] = [
  { href: '/about', page: 'about', trlKey: 'about' },
  { href: '/techstack', page: 'techstack', trlKey: 'sectionTech' },
  { href: '/projects', page: 'projects', trlKey: 'projects' },
  { href: '/contact', page: 'contact', trlKey: 'contact' },
];

export function NavBar({ menuOpen, setMenuOpen, page }: NavBarProps) {
  const { trl } = useLanguage();
  const hasResume = config.resumeUrl && config.resumeUrl.length > 0;

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  return (
    <nav
      className="fixed left-0 right-0 top-4 z-40 px-4 sm:px-6"
      aria-label="Main navigation"
    >
      <div className="nav-pill mx-auto flex max-w-4xl items-center justify-between gap-4 rounded-full border border-white/10 bg-zinc-950/80 px-4 py-2.5 shadow-lg shadow-black/20 backdrop-blur-xl sm:px-6 sm:py-3">
        <a
          href="/"
          className={`font-display text-lg font-semibold transition hover:text-accent ${page === 'home' ? 'text-accent' : ''}`}
          aria-current={page === 'home' ? 'page' : undefined}
        >
          Lucas Ruiz
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ href, page: linkPage, trlKey }) => {
            const isActive = page === linkPage;
            return (
              <a
                key={href}
                href={href}
                className={`rounded-full px-3 py-2 text-sm font-medium transition hover:text-zinc-100 ${isActive ? 'bg-accent/15 text-accent' : 'text-zinc-400 hover:bg-white/5'}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {trl[trlKey]}
              </a>
            );
          })}
          {hasResume && (
            <a
              href={config.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-3 py-2 text-sm font-medium text-zinc-400 transition hover:bg-white/5 hover:text-zinc-100"
            >
              {trl.downloadCv}
            </a>
          )}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/contact"
            className="hidden rounded-full bg-accent px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-accent-hover sm:inline-block"
          >
            {trl.ctaLetsTalk}
          </a>
          <ThemeSelector />
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition hover:bg-white/5 hover:text-zinc-100 md:hidden"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            <span className="text-lg font-light">{menuOpen ? '×' : '☰'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
