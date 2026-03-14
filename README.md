# Portfolio — Lucas Ruiz

Portfolio personal (Astro + React + Tailwind). ES/EN, temas, formulario de contacto con Formspree.

## Setup

```bash
npm install
cp .env.example .env
# Set PUBLIC_FORMSPREE_FORM_ID in .env (form works only if set)
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
- **Formulario de contacto:** Formspree. Crear formulario en [formspree.io](https://formspree.io), copiar el Form ID (ej. `xyzabc` de `.../f/xyzabc`) y setear `PUBLIC_FORMSPREE_FORM_ID` en .env o en Vercel.
