import { useLanguage } from './LanguageContext';
import { RevealOnScroll } from './RevealOnScroll';

const CDN_DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';
const CDN_SIMPLE = 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons';

type TechItem = { name: string; icon: string; invertIcon?: boolean };

const FRONTEND: TechItem[] = [
  { name: 'JavaScript', icon: `${CDN_DEVICON}/javascript/javascript-original.svg` },
  { name: 'TypeScript', icon: `${CDN_DEVICON}/typescript/typescript-original.svg` },
  { name: 'React', icon: `${CDN_DEVICON}/react/react-original.svg` },
  { name: 'Next.js', icon: `${CDN_DEVICON}/nextjs/nextjs-original.svg` },
  { name: 'Tailwind CSS', icon: `${CDN_DEVICON}/tailwindcss/tailwindcss-original.svg` },
  { name: 'Bootstrap', icon: `${CDN_DEVICON}/bootstrap/bootstrap-plain.svg` },
  { name: 'HTML', icon: `${CDN_DEVICON}/html5/html5-original.svg` },
  { name: 'CSS', icon: `${CDN_DEVICON}/css3/css3-original.svg` },
];

const BACKEND_AND_DB: TechItem[] = [
  { name: 'Node.js', icon: `${CDN_DEVICON}/nodejs/nodejs-original.svg` },
  { name: 'Express', icon: `${CDN_DEVICON}/express/express-original.svg` },
  { name: 'Python', icon: `${CDN_DEVICON}/python/python-original.svg` },
  { name: 'MongoDB', icon: `${CDN_DEVICON}/mongodb/mongodb-original.svg` },
  { name: 'Firebase', icon: `${CDN_DEVICON}/firebase/firebase-plain.svg` },
  { name: 'MySQL', icon: `${CDN_DEVICON}/mysql/mysql-original.svg` },
  { name: 'PHP', icon: `${CDN_DEVICON}/php/php-original.svg` },
];

const DATA_AND_AUTOMATION: TechItem[] = [
  { name: 'n8n', icon: `${CDN_SIMPLE}/n8n.svg`, invertIcon: true },
  { name: 'BigQuery', icon: `${CDN_SIMPLE}/googlebigquery.svg`, invertIcon: true },
  { name: 'Looker', icon: `${CDN_SIMPLE}/looker.svg`, invertIcon: true },
];

const SECTIONS = [
  { key: 'frontend' as const, items: FRONTEND },
  { key: 'backend' as const, items: BACKEND_AND_DB },
  { key: 'dataTools' as const, items: DATA_AND_AUTOMATION },
];

function TechCard({ name, icon, invertIcon }: TechItem) {
  return (
    <div
      className="group flex flex-col items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.02] p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:bg-accent-muted/30 hover:shadow-card-hover"
      title={name}
    >
      <div className="flex h-10 w-10 items-center justify-center transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-0.5">
        <img
          src={icon}
          alt=""
          className={`h-10 w-10 object-contain opacity-95 transition-opacity duration-300 group-hover:opacity-100 ${invertIcon ? 'invert' : ''}`}
          loading="lazy"
          decoding="async"
        />
      </div>
      <span className="text-center text-xs font-medium text-zinc-500 transition-colors duration-300 group-hover:text-zinc-100">
        {name}
      </span>
    </div>
  );
}

export function TechStack() {
  const { trl } = useLanguage();

  return (
    <section id="techstack" className="relative py-24 md:py-32">
      <RevealOnScroll>
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            {trl.sectionTech}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-zinc-100 md:text-4xl">
            <span className="gradient-text">{trl.techStackTitle}</span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-zinc-400">
            {trl.techStackSubtitle}
          </p>

          <div className="mt-10 space-y-10">
            {SECTIONS.map((section, index) => (
              <div
                key={section.key}
                className="techstack-block rounded-2xl border border-white/5 bg-surface-card/80 p-6 shadow-card backdrop-blur-sm md:p-8"
              >
                <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-accent">
                  {section.key === 'frontend'
                    ? trl.frontendTitle
                    : section.key === 'backend'
                      ? trl.backendTitle
                      : trl.dataToolsTitle}
                </h3>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                  {section.items.map((tech) => (
                    <TechCard key={tech.name} name={tech.name} icon={tech.icon} invertIcon={tech.invertIcon} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
