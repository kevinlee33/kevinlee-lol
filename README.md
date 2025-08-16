
# kevinlee.lol – Starter

Minimal, visually-stunning single-page site for Kevin Lee.
Stack: Vite + React + Tailwind + Framer Motion (+ react-icons).

## Quickstart
```bash
npm install
npm run dev
# Optional: npm run build && npm run preview
```

If you see missing packages, run:
```bash
npm install framer-motion react-icons
```

## Files
- `index.html` – meta tags, Inter font, favicon
- `src/App.jsx` – sections, effects (parallax blobs, noise overlay)
- `src/index.css` – Tailwind directives + background/texture utilities
- `tailwind.config.js`, `postcss.config.js` – Tailwind setup
- `public/favicon.svg` – simple gradient favicon

## Replace Portrait
Edit `src/App.jsx` and replace the `src` of the portrait image with your own.

## Dark Mode
Respects system preference; toggle via the sun/moon button.

## Deploy (GitHub Pages)
1. Push this repo to GitHub.
2. Create a `CNAME` file in the repo root with: `kevinlee.lol`.
3. In GitHub → Settings → Pages, set source to `gh-pages` or main via an action.
4. Point your domain DNS to GitHub Pages.
