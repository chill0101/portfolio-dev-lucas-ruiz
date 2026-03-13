import { useState, useRef, useEffect } from 'react';
import { useTheme, THEMES } from './ThemeContext';

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const current = THEMES.find((t) => t.id === theme) ?? THEMES[0]!;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-zinc-950"
        aria-label="Elegir tema de color"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span
          className="h-4 w-4 rounded-full border border-white/20"
          style={{ backgroundColor: current.color }}
        />
      </button>
      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-2 w-40 rounded-xl border border-white/10 bg-zinc-900 py-2 shadow-xl backdrop-blur-xl"
          role="menu"
          aria-label="Temas de color"
        >
          {THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              role="menuitem"
              onClick={() => {
                setTheme(t.id);
                setOpen(false);
              }}
              className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-zinc-300 transition hover:bg-white/5 hover:text-zinc-100"
            >
              <span
                className="h-3.5 w-3.5 shrink-0 rounded-full border border-white/20"
                style={{ backgroundColor: t.color }}
              />
              <span>{t.label}</span>
              {theme === t.id && (
                <span className="ml-auto text-accent" aria-hidden>
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
