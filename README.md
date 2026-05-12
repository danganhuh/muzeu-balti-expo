# lab6 — Bălți: Vitrina Timpului

Client-only interactive museum-style web app: virtual halls and exhibits, timeline and chronology mission, quizzes, memory pairs game, badge cabinet, local progress (localStorage), light/dark theme, and UI in **English**, **Romanian**, or **Russian**.

- **Feature plan (reference):** [FEATURES-AND-PROJECT-PLAN.md](./FEATURES-AND-PROJECT-PLAN.md)
- **Lab baseline (concept / checklist):** [BAZA-LABORATOR.md](./BAZA-LABORATOR.md)
- **Styling:** based on the static `tum-web-lab2` landing; vendor CSS lives under [`src/styles/vendor/`](./src/styles/vendor/) and is imported from [`src/styles/index.css`](./src/styles/index.css).
- **Logo:** place your asset under [`public/images/`](./public/images/) (default: `logo.svg`). If you rename it, update `LOGO_FILE` in [`src/constants/branding.ts`](./src/constants/branding.ts).

## Stack

React 18, TypeScript, Vite, React Router, i18next, `qrcode` (kiosk join panel).

## Development

```bash
npm install
npm run dev
```

Local production check (site root `/`):

```bash
npm run build
npm run preview
```

## GitHub Pages build

Set `VITE_BASE_URL` to `/<repository-name>/` (replace `lab6` if your repo name differs). The included GitHub Actions workflow sets this from the repository name.

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

`BrowserRouter` uses the same base as Vite’s `base` (see [`src/app/AppRouter.tsx`](./src/app/AppRouter.tsx)). Static assets under `public/` keep working when the app is not served from `/`.

## Deployment

- Workflow: [`.github/workflows/pages.yml`](./.github/workflows/pages.yml) — on push to `main`, builds `dist` with `VITE_BASE_URL=/<repo>/`.
- Repository **Settings → Pages**: source **GitHub Actions**.
- [`public/.nojekyll`](./public/.nojekyll) disables Jekyll processing on Pages.

## Kiosk (touch TV)

Open the site once with **`?kiosk=1`** (also `true`, `yes`, or `on`). That persists in settings, hides the cabinet entry for that browser, redirects `/cabinet` to halls, and shows a **QR code** so visitors can open the same deployment on a phone. Use **`?kiosk=0`** (or `false` / `no` / `off`) to leave kiosk mode.

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Vite dev server          |
| `npm run build`| Typecheck + production build |
| `npm run preview` | Serve `dist` locally  |
| `npm run lint` | ESLint                   |
