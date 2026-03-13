# Portfolio — Lucas Ruiz

Portfolio personal (Astro + React + Tailwind). ES/EN, temas, formulario de contacto con EmailJS.

## Setup

```bash
npm install
cp .env.example .env
# Edit .env with your EmailJS keys (optional; form works only if keys are set)
```

## Scripts

- `npm run dev` — desarrollo
- `npm run build` — build estático en `dist/`
- `npm run preview` — previsualizar build

## Deploy

Build estático. Puedes desplegar en Vercel, Netlify, GitHub Pages, etc. apuntando al directorio `dist/` (o al comando `npm run build`).

## Config

- **Contenido y links:** `src/config/config.ts` (CV, ubicación, redes, imágenes).
- **Textos ES/EN:** `src/config/translations.ts`.
