import { useLanguage } from './LanguageContext';
import { LanguageToggle } from './LanguageToggle';
import { ThemeSelector } from './ThemeSelector';
import { config } from '../../config/config';
import type { PageId } from './LayoutShell';

interface MobileMenuProps {
  menuOpen: boolean;
  setMenuOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  page: PageId;
}

const links: { href: string; page: PageId; trlKey: 'home' | 'about' | 'sectionTech' | 'projects' | 'contact' }[] = [
  { href: '/', page: 'home', trlKey: 'home' },
  { href: '/about', page: 'about', trlKey: 'about' },
  { href: '/techstack', page: 'techstack', trlKey: 'sectionTech' },
  { href: '/projects', page: 'projects', trlKey: 'projects' },
  { href: '/contact', page: 'contact', trlKey: 'contact' },
];

export function MobileMenu({ menuOpen, setMenuOpen, page }: MobileMenuProps) {
  const { trl } = useLanguage();
  const hasResume = config.resumeUrl && config.resumeUrl.length > 0;

  if (!menuOpen) return null;

  return (
    <div
      className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-6 bg-zinc-950/95 backdrop-blur-xl md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Menú de navegación"
    >
      <button
        type="button"
        onClick={() => setMenuOpen(false)}
        className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition hover:bg-white/5 hover:text-zinc-100"
        aria-label="Cerrar menú"
      >
        ×
      </button>
      {links.map(({ href, page: linkPage, trlKey }) => {
        const isActive = page === linkPage;
        return (
          <a
            key={href}
            href={href}
            onClick={() => setMenuOpen(false)}
            className={`font-display text-2xl font-medium transition hover:text-accent ${isActive ? 'text-accent' : 'text-zinc-100'}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {trl[trlKey]}
          </a>
        );
      })}
      <a
        href="/contact"
        onClick={() => setMenuOpen(false)}
        className="mt-4 rounded-xl bg-accent px-6 py-3 font-semibold text-zinc-950"
      >
        {trl.ctaLetsTalk}
      </a>
      {hasResume && (
        <a
          href={config.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuOpen(false)}
          className="text-sm font-medium text-zinc-400 transition hover:text-zinc-100"
        >
          {trl.downloadCv}
        </a>
      )}
      <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
        <ThemeSelector />
        <LanguageToggle />
      </div>
    </div>
  );
}
