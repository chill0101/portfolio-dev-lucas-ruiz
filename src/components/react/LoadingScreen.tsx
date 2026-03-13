import { useEffect, useState } from 'react';
import { useLanguage } from './LanguageContext';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const { trl } = useLanguage();
  const [progress, setProgress] = useState(0);
  const fullText = trl.greeting ?? '< Hello! />';

  useEffect(() => {
    const visited = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('portfolio-visited');
    if (visited) {
      onComplete();
      return;
    }
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setProgress((index / fullText.length) * 100);
      if (index >= fullText.length) {
        clearInterval(interval);
        if (typeof sessionStorage !== 'undefined') sessionStorage.setItem('portfolio-visited', '1');
        setTimeout(onComplete, 200);
      }
    }, 80);
    return () => clearInterval(interval);
  }, [fullText.length, onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950 bg-grid-pattern"
      aria-hidden="true"
    >
      <p className="font-display text-3xl font-bold text-zinc-100 mb-6">
        <span className="gradient-text">
          {fullText.slice(0, Math.floor((progress / 100) * fullText.length))}
        </span>
        <span className="animate-pulse text-accent">|</span>
      </p>
      <div className="w-72 h-1 rounded-full bg-zinc-800 overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-150 ease-out shadow-glow-sm"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-zinc-500 text-sm mt-5">{trl.loading}</p>
    </div>
  );
}
