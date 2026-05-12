# lab6 — Vitrina Timpului

- **Plan de proiect și funcționalități (document public):** [FEATURES-AND-PROJECT-PLAN.md](./FEATURES-AND-PROJECT-PLAN.md)
- **Stiluri:** landing `tum-web-lab2` — copii în `src/styles/vendor/`, agregate în [`src/styles/index.css`](./src/styles/index.css).

## Dezvoltare

```bash
npm install
npm run dev
```

Build de verificare (local, rădăcina site-ului `/`):

```bash
npm run build
npm run preview
```

Build ca pe **GitHub Pages** (înlocuiește `lab6` cu numele repository-ului dacă diferă; workflow-ul CI folosește automat numele repo-ului):

**cmd.exe**

```bat
set VITE_BASE_URL=/lab6/
npm run build
npm run preview
```

**PowerShell**

```powershell
$env:VITE_BASE_URL='/lab6/'
npm run build
npm run preview
```

## Publicare

- Workflow: [`.github/workflows/pages.yml`](.github/workflows/pages.yml) — la push pe `main`, artefact `dist` cu `VITE_BASE_URL=/<repo>/`.
- În setările repository-ului GitHub: **Pages** → sursă **GitHub Actions**.
- Fișier [`public/.nojekyll`](./public/.nojekyll) pentru Jekyll off.
