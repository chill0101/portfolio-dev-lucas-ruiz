import { useLanguage } from './LanguageContext';
import { RevealOnScroll } from './RevealOnScroll';

export function Thanks() {
  const { trl } = useLanguage();

  return (
    <section className="relative py-24 md:py-32">
      <RevealOnScroll>
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="rounded-2xl border border-white/5 bg-surface-card p-10 shadow-card backdrop-blur-sm md:p-14">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400" aria-hidden>
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="mt-6 font-display text-2xl font-bold text-zinc-100 md:text-3xl">
              {trl.thanksTitle}
            </h1>
            <p className="mt-3 text-lg text-zinc-400">
              {trl.thanksMessage}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-accent-hover"
              >
                {trl.backToContact}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="/"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-accent/30 hover:bg-accent/10 hover:text-accent"
              >
                {trl.backToHome}
              </a>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
