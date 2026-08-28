# Avinash Kumar — Portfolio

Production site: [https://avina5hkr.github.io/](https://avina5hkr.github.io/)

A personal engineering portfolio for Avinash Kumar, a Lead Software Engineer focused on backend architecture, distributed systems, and payment infrastructure. The site presents career impact, selected engineering case studies, and experience for technical recruiters, engineering managers, and staff/principal engineers evaluating architecture credibility.

## Architecture

Static HTML, CSS, and a small progressive-enhancement JavaScript file. No framework, no build step, no client-side application state. The page is fully readable and navigable with JavaScript disabled; JavaScript only adds the theme toggle, mobile menu interactivity, sticky-header styling, and scroll-reveal transitions.

## Repository structure

```text
avina5hkr.github.io/
├── index.html          Semantic page content and metadata
├── 404.html            Static not-found page
├── robots.txt
├── sitemap.xml
├── .nojekyll            Disables Jekyll processing on GitHub Pages
├── css/
│   └── styles.css      Full visual system and responsive styles
├── js/
│   └── main.js          Theme toggle, mobile nav, scroll reveal
└── assets/
    ├── favicon.svg
    ├── apple-touch-icon.png
    ├── og-card.svg        Editable source for og-card.png
    ├── og-card.png
    └── Avinash_Kumar_Resume.pdf
```

## Local development

No build tools or dependencies are required. Serve the directory with any static HTTP server so relative paths and metadata resolve the way they do in production — do not open `index.html` directly with `file://`.

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

## Content updates

- Copy, section order, and links live directly in `index.html`.
- Visual tokens (color, type scale, spacing) are CSS custom properties at the top of `css/styles.css` — update them there rather than scattering one-off values through the file.
- Keep `js/main.js` limited to progressive enhancement; the page must remain usable without it.
- Resume downloads point to `assets/Avinash_Kumar_Resume.pdf`. Replace that file (keeping the same name) to update the downloadable resume, or update the filename in both `index.html` header/hero links if it changes.

## Theme and accessibility

- Dark and light themes are implemented with CSS custom properties, switched via a `data-theme` attribute on `<html>`. Initial theme follows the visitor's `prefers-color-scheme` and an explicit choice is remembered in `localStorage`; a small inline script applies it before first paint to avoid a flash.
- Mobile navigation is a real, always-present `<nav>` that JavaScript hides/shows; with JavaScript disabled it stays visible and usable.
- Built to WCAG 2.2 AA: semantic landmarks, one `<h1>`, a skip link, visible `:focus-visible` styles, keyboard-operable menu and theme toggle, and `prefers-reduced-motion` support that disables smooth scrolling and scroll-reveal transitions.

## GitHub Pages deployment

The site publishes from the `main` branch, repository root — no build step or GitHub Actions workflow is required. `.nojekyll` disables Jekyll processing so files starting with `_` (none currently) and the plain HTML/CSS/JS structure are served as-is.

## Validation commands

```bash
# Serve locally
python3 -m http.server 8000

# Lighthouse (requires Node + network access)
npx lighthouse http://localhost:8000/ --preset=desktop --output=json --output-path=./lighthouse-report.json
```

Manual checks worth repeating after content edits: keyboard-only navigation through the whole page, both themes, the target viewports (320, 375, 390, 768, 1024, 1280 and 1440 px wide), and that `assets/Avinash_Kumar_Resume.pdf` still resolves.

## License status

No `LICENSE` file is included, so no license is granted for reuse. Do not treat this repository as MIT-licensed.
