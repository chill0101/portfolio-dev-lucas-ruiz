import { useLanguage } from './LanguageContext';
import { RevealOnScroll } from './RevealOnScroll';
import { config } from '../../config/config';

export function Hero() {
  const { trl } = useLanguage();
  const hasResume = config.resumeUrl && config.resumeUrl.length > 0;

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-20"
    >
      {/* Decorative gradient blobs - soft fade so no hard cut with rest of page */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-accent/15 blur-[120px] animate-float" />
        <div className="absolute -right-40 top-1/2 h-80 w-80 rounded-full bg-accent/10 blur-[100px] animate-float" style={{ animationDelay: '-2s' }} />
        {/* Soft gradient: fades into theme background so no hard cut */}
        <div className="hero-overlay absolute inset-0 pointer-events-none" aria-hidden />
      </div>
      <RevealOnScroll>
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-12 md:flex-row md:items-center md:justify-between">
          <div className="order-2 flex-1 text-center md:order-1 md:text-left">
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2 md:justify-start">
              {config.openToWork && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
                  {trl.openToWork}
                </span>
              )}
              <span className="font-mono text-sm uppercase tracking-widest text-accent">
                {trl.fullstack}
              </span>
            </div>
            <h1 className="font-display text-5xl font-bold leading-tight tracking-tight text-zinc-100 md:text-7xl lg:text-8xl">
              <span className="gradient-text">{trl.heroTitle}</span>
            </h1>
            {config.location && (
              <p className="mt-3 text-base text-zinc-500">
                {config.location}
              </p>
            )}
            <p className="mt-4 max-w-lg text-lg text-zinc-400">
              {trl.aboutDescription1}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <a
                href="/contact"
                className="btn-primary inline-flex items-center rounded-xl bg-accent px-6 py-3 font-semibold text-zinc-950 shadow-glow-sm transition hover:bg-accent-hover hover:shadow-glow"
              >
                {trl.ctaLetsTalk}
              </a>
              <a
                href="/projects"
                className="btn-secondary inline-flex items-center rounded-xl border border-zinc-600 px-6 py-3 font-medium text-zinc-300 transition hover:border-zinc-500 hover:bg-white/5 hover:text-zinc-100"
              >
                {trl.viewProjects}
              </a>
              {hasResume && (
                <a
                  href={config.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center gap-2 rounded-xl border border-zinc-600 px-6 py-3 font-medium text-zinc-300 transition hover:border-zinc-500 hover:bg-white/5 hover:text-zinc-100"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {trl.downloadCv}
                </a>
              )}
            </div>
            <div className="mt-10 flex justify-center gap-5 md:justify-start">
              <a
                href={config.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 transition hover:text-zinc-100"
                aria-label="GitHub"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href={config.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 transition hover:text-zinc-100"
                aria-label="LinkedIn"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="order-1 flex-shrink-0 md:order-2">
            <div className="relative">
              <div className="absolute -inset-3 rounded-full bg-accent/20 blur-2xl opacity-60" />
              <div className="relative overflow-hidden rounded-full border-2 border-white/10 shadow-2xl ring-2 ring-accent/30">
                <img
                  src={config.images.profile.default}
                  srcSet={`${config.images.profile.small} 400w, ${config.images.profile.medium} 800w, ${config.images.profile.default} 1200w`}
                  sizes="(max-width: 768px) 256px, 320px"
                  alt="Lucas Ruiz"
                  className="h-64 w-64 object-cover transition-transform duration-500 hover:scale-105 md:h-80 md:w-80"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
