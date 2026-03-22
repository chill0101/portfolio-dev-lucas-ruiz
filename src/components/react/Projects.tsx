import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from './LanguageContext';
import { RevealOnScroll } from './RevealOnScroll';
import { config } from '../../config/config';
import type { translations } from '../../config/translations';

type TrlKey = keyof (typeof translations)['es'];

type VideoKind = 'youtube' | 'vimeo' | 'direct';

/**
 * Detects video source: YouTube, Vimeo, Cloudinary, or direct file (.mp4, .webm, .ogg).
 * Cloudinary URLs are played as direct video (HTML5) via their delivery URL.
 */
function getVideoKind(url: string): VideoKind | null {
  if (!url || url === '#') return null;
  if (/youtube\.com|youtu\.be/i.test(url)) return 'youtube';
  if (/vimeo\.com/i.test(url)) return 'vimeo';
  if (/res\.cloudinary\.com\/[^/]+\/video\/upload/i.test(url)) return 'direct';
  if (/\.(mp4|webm|ogg)(\?|$)/i.test(url)) return 'direct';
  return null;
}

function getEmbedUrl(url: string, kind: VideoKind): string {
  if (kind === 'youtube') {
    const id = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?]+)/)?.[1];
    return id ? `https://www.youtube.com/embed/${id}` : url;
  }
  if (kind === 'vimeo') {
    const id = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)?.[1];
    return id ? `https://player.vimeo.com/video/${id}` : url;
  }
  return url;
}

const projectKeys = [
  'hChartsApp',
  'assemblyLine',
  'n8nLecturaFacturas',
  'crecerJugandoGestalt',
  'calendar',
  'n8nBigqueryCocheras',
  'railcar',
  'notes',
  'ippt',
  'heyPrinter',
  'n8nDocumentosSalidaPdf',
  'yogalab',
] as const;

const projectMeta: Record<
  (typeof projectKeys)[number],
  { title: string; descKey: TrlKey; tech: string[]; link: string; github: string; video?: string }
> = {
  hChartsApp: {
    title: 'H-charts App',
    descKey: 'hChartsAppDesc',
    tech: ['NextJs', 'React', 'TailwindCSS', 'TypeScript'],
    link: 'https://h-charts-app.vercel.app/',
    github: 'https://github.com/chill0101/h-charts-app',
  },
  assemblyLine: {
    title: 'Assembly Line',
    descKey: 'assemblyLineDesc',
    tech: ['JavaScript','Bigquery'],
    link: '#',
    github: '#',
    video: 'https://res.cloudinary.com/dsbjzd18p/video/upload/v1773108111/assembly_line_dcbzwr.mp4'

  },
  n8nLecturaFacturas: {
    title: 'Lectura de Facturas con n8n',
    descKey: 'n8nLecturaFacturasDesc',
    tech: ['n8n', 'AI Model'],
    link: '#',
    github: '#',
    video: 'https://res.cloudinary.com/dsbjzd18p/video/upload/v1773108115/n8n_lectura_facturas_mxw3ax.mp4', // optional: YouTube, Vimeo, or direct .mp4 URL
  },
  crecerJugandoGestalt: {
    title: 'Landing Page Crecer Jugando Gestalt',
    descKey: 'crecerJugandoGestaltDesc',
    tech: ['Astro'],
    link: 'https://crecer-jugando-gestalt.vercel.app/',
    github: 'https://github.com/chill0101/landing-page-gestalt-crecer',
  },
  calendar: {
    title: 'Calendar App',
    descKey: 'calendarDesc',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Bootstrap'],
    link: 'https://backend-mern-react.onrender.com',
    github: 'https://github.com/chill0101/react-men-calendar',
  },
  railcar: {
    title: 'Google Sheets RailCar',
    descKey: 'railcarDesc',
    tech: ['HTML', 'TailwindCSS', 'JavaScript', 'Google Apps Script'],
    link: 'https://script.google.com/a/macros/davinci.edu.ar/s/AKfycbyLmX8IHZjYxVwqpeDHyRnaC4YSRE4r4n3N3hwz0ijzKDKnVvaQp1T5PNEeXYBXXoEYzw/exec',
    github: 'https://github.com/chill0101/sheets-railcar-apps-script',
  },
  notes: {
    title: 'Notes App',
    descKey: 'notesDesc',
    tech: ['React', 'MaterialUI', 'Firebase', 'JavaScript'],
    link: 'https://reactjs-simple-notes.netlify.app/',
    github: 'https://github.com/chill0101/notes-reactJs-app',
  },
  ippt: {
    title: 'IPPT.com.ar',
    descKey: 'ipptWeb',
    tech: ['WordPress', 'Elementor'],
    link: 'https://ippt.com.ar/',
    github: '#',
  },

  heyPrinter: {
    title: 'Generador de Contratos Masivos',
    descKey: 'heyPrinterDesc',
    tech: ['Google Apps Script', 'n8n', 'TailwindCSS', 'JavaScript'],
    link: '#',
    github: '#',
    video: 'https://res.cloudinary.com/dsbjzd18p/video/upload/v1773108110/contratos_pdf_re9k7v.mp4', // optional: YouTube, Vimeo, or direct .mp4 URL
  },
  n8nBigqueryCocheras: {
    title: 'Generador de reportes bigquery de cocheras con n8n',
    descKey: 'n8nBigqueryCocherasDesc',
    tech: ['n8n', 'Big Query'],
    link: '#',
    github: '#',
    video: 'https://res.cloudinary.com/dsbjzd18p/video/upload/v1773029365/COCHERAS_czscgq.mp4'
  },
  n8nDocumentosSalidaPdf: {
    title: 'Documentos de salida en PDF con n8n',
    descKey: 'n8nDocumentosSalidaPdfDesc',
    tech: ['n8n', 'AI Model'],
    link: '#',
    github: '#',
    video: 'https://res.cloudinary.com/dsbjzd18p/video/upload/v1773108112/n8n_documentos_salida_vkzndn.mp4'
  },
  yogalab: {
    title: 'Yogalab.cl',
    descKey: 'yogalabWeb',
    tech: ['WordPress', 'Flatsome'],
    link: '#',
    github: '#',
  }
};

export function Projects() {
  const { trl } = useLanguage();
  const [videoModal, setVideoModal] = useState<{
    url: string;
    title: string;
    kind: 'embed' | 'direct';
  } | null>(null);

  // Lock body scroll when modal is open; portal keeps modal in viewport regardless of page scroll
  useEffect(() => {
    if (videoModal) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [videoModal]);

  // Close modal on Escape
  useEffect(() => {
    if (!videoModal) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setVideoModal(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [videoModal]);

  const videoModalNode =
    videoModal &&
    createPortal(
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        role="dialog"
        aria-modal="true"
        aria-label={videoModal.title}
        onClick={() => setVideoModal(null)}
      >
        <div
          className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden bg-zinc-900 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {videoModal.kind === 'embed' ? (
            <iframe
              src={videoModal.url}
              title={videoModal.title}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              src={videoModal.url}
              controls
              autoPlay
              className="absolute inset-0 w-full h-full object-contain"
              preload="auto"
              playsInline
            />
          )}
          <button
            type="button"
            onClick={() => setVideoModal(null)}
            className="absolute right-3 top-3 z-10 rounded-full bg-black/60 p-2 text-white transition hover:bg-black/80"
            aria-label={trl.closeModal}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>,
      document.body
    );

  return (
    <section id="projects" className="relative py-24 md:py-32">
      {videoModalNode}
      <RevealOnScroll>
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            {trl.sectionProjects}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-zinc-100 md:text-4xl">
            <span className="gradient-text">{trl.projectsTitle}</span>
          </h2>
          {/* Bento-style grid: first project featured, rest 2-col */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {projectKeys.map((key, index) => {
              const meta = projectMeta[key];
              const projectsImages = config.images.projects as Record<string, { default: string; thumbnail: string }>;
              const img = projectsImages[key] ?? {
                default: 'https://placehold.co/1200x800/1e293b/64748b?text=Project',
                thumbnail: 'https://placehold.co/600x400/1e293b/64748b?text=Project',
              };

              const isFirst = index === 0;
              const desc = (trl[meta.descKey] as string | undefined) ?? meta.title;
              const hasLink = meta.link !== '#' && meta.link !== '';
              const hasGithub = meta.github !== '#' && meta.github !== '';
              const videoUrl = meta.video && meta.video !== '' ? meta.video : null;
              const videoKind = videoUrl ? getVideoKind(videoUrl) : null;
              const hasEmbedVideo = videoKind === 'youtube' || videoKind === 'vimeo';
              const hasDirectVideo = videoKind === 'direct';

              const hasVideo = hasEmbedVideo || hasDirectVideo;
              const openVideoModal = () => {
                if (!videoUrl) return;
                if (hasEmbedVideo) {
                  setVideoModal({
                    url: getEmbedUrl(videoUrl, videoKind!),
                    title: meta.title,
                    kind: 'embed',
                  });
                } else if (hasDirectVideo) {
                  setVideoModal({
                    url: videoUrl,
                    title: meta.title,
                    kind: 'direct',
                  });
                }
              };

              const mediaBlock = (
                <div className={`project-img-bg relative overflow-hidden ${isFirst ? 'h-72 md:h-80' : 'h-52'}`}>
                  <img
                    src={img.thumbnail}
                    srcSet={`${img.thumbnail} 600w, ${img.default} 1200w`}
                    sizes={isFirst ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 25vw'}
                    alt={meta.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {hasVideo && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openVideoModal();
                      }}
                      className="absolute inset-0 flex items-center justify-center bg-black/30 transition hover:bg-black/40 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-inset"
                      aria-label={`${trl.viewVideo}: ${meta.title}`}
                    >
                      <span className="rounded-full bg-white/20 p-4 backdrop-blur-sm transition group-hover:bg-white/30">
                        <svg className="h-12 w-12 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </button>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/95 via-transparent to-transparent pointer-events-none" aria-hidden />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between pointer-events-none">
                    <h3 className="font-display text-xl font-semibold text-zinc-100 rounded-lg bg-black/60 px-3 py-1.5 backdrop-blur-sm">
                      {meta.title}
                    </h3>
                    {hasLink && (
                      <span className="rounded-full bg-white/10 p-2 text-zinc-100 opacity-0 transition group-hover:opacity-100">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </span>
                    )}
                  </div>
                </div>
              );

              return (
                <article
                  key={key}
                  className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-surface-card backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/20 hover:shadow-card-hover ${isFirst ? 'md:col-span-2' : ''}`}
                >
                  {hasLink ? (
                    <a
                      href={meta.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                      aria-label={`${trl.viewProject}: ${meta.title}`}
                    >
                      {mediaBlock}
                    </a>
                  ) : (
                    mediaBlock
                  )}
                  <div className="p-6">
                    <p className="mb-4 text-sm text-zinc-400">{desc}</p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {meta.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-accent-muted px-3 py-1 text-xs font-medium text-accent"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    {(hasLink || hasGithub || hasVideo) && (
                    <div className="flex flex-wrap gap-3">
                      {hasLink && (
                        <a
                          href={meta.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-accent-hover"
                        >
                          {trl.viewProject}
                        </a>
                      )}
                      {hasVideo && (
                        <button
                          type="button"
                          onClick={() => openVideoModal()}
                          className="rounded-xl border border-zinc-600 px-4 py-2 text-sm font-medium text-zinc-400 transition hover:border-zinc-500 hover:bg-white/5 hover:text-zinc-100"
                        >
                          {trl.viewVideo}
                        </button>
                      )}
                      {hasGithub && (
                        <a
                          href={meta.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-xl border border-zinc-600 px-4 py-2 text-sm font-medium text-zinc-400 transition hover:border-zinc-500 hover:bg-white/5 hover:text-zinc-100"
                        >
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                          </svg>
                          {trl.repository}
                        </a>
                      )}
                    </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
