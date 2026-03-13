import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';

export type ThemeId = 'gradient' | 'orange' | 'blue' | 'emerald' | 'violet' | 'light';

const STORAGE_KEY = 'portfolio-theme';
const VALID_THEMES: ThemeId[] = ['gradient', 'orange', 'blue', 'emerald', 'violet', 'light'];

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>('gradient');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
    if (VALID_THEMES.includes(stored as ThemeId)) {
      setThemeState(stored as ThemeId);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute('data-theme', theme);
  }, [mounted, theme]);

  const setTheme = useCallback((id: ThemeId) => {
    setThemeState(id);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, id);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

export const THEMES: { id: ThemeId; label: string; color: string }[] = [
  { id: 'gradient', label: 'Gradient', color: '#22d3ee' },
  { id: 'orange', label: 'Orange', color: '#f97316' },
  { id: 'blue', label: 'Blue', color: '#3b82f6' },
  { id: 'emerald', label: 'Emerald', color: '#10b981' },
  { id: 'violet', label: 'Violet', color: '#8b5cf6' },
  { id: 'light', label: 'Claro', color: '#6366f1' },
];
