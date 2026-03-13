import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { translations } from '../../config/translations';

type Lang = 'es' | 'en';

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  trl: Record<string, string>;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'portfolio-lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('es');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored === 'es' || stored === 'en') setLangState(stored);
    setMounted(true);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const trl = mounted ? translations[lang] : translations.es;

  return (
    <LanguageContext.Provider value={{ lang, setLang, trl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
