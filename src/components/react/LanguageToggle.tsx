import { useLanguage } from './LanguageContext';

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex rounded-xl border border-zinc-700/60 bg-white/5 p-1">
      <button
        type="button"
        onClick={() => setLang('es')}
        className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
          lang === 'es' ? 'bg-accent text-zinc-950' : 'text-zinc-400 hover:text-zinc-100'
        }`}
        aria-label="Español"
      >
        ES
      </button>
      <button
        type="button"
        onClick={() => setLang('en')}
        className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
          lang === 'en' ? 'bg-accent text-zinc-950' : 'text-zinc-400 hover:text-zinc-100'
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
