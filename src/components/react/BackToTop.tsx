import { useEffect, useState } from 'react';
import { useLanguage } from './LanguageContext';

const SCROLL_THRESHOLD = 400;

export function BackToTop() {
  const { trl } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-zinc-900/90 text-zinc-100 shadow-lg backdrop-blur-sm transition hover:border-accent/40 hover:bg-accent hover:text-zinc-950 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-zinc-950"
      aria-label={trl.backToTop}
    >
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}
