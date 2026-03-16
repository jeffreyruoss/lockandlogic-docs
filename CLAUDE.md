# Lock & Logic Docs Site

VitePress documentation site for the Lock & Logic escape room project.

- Repo: `jeffreyruoss/lockandlogic-docs`
- GitHub Pages deployment via `.github/workflows/deploy.yml`

## Tech

- VitePress with `srcDir: 'docs'`, `base: '/lockandlogic-docs/'`
- Config: `.vitepress/config.mts`
- Custom theme: `.vitepress/theme/`

## Auth & Access

- Client-side password gate (`PasswordGate.vue`, stored in `localStorage` as `ll-docs-auth`)
- IP-based admin sidebar (`Layout.vue`): admin IP `45.11.81.248` sees all docs grouped by Client-Facing / Internal; everyone else sees 5 client-facing docs only
- Admin status cached in `localStorage` as `ll-docs-admin`, verified via `api.ipify.org`

## Sidebar

- **Default (client view):** 5 flat items — Features Overview, SEO Strategy, Google Ads Strategy, Bookeo vs Resova, Competitor Analysis (configured in `config.mts`)
- **Admin view:** All docs in two groups — Client-Facing (5) and Internal (12) (configured in `Layout.vue`)
- Admin sidebar is re-applied on every route change via a Vue watcher

## Docs

- All markdown docs live in `docs/` (single source of truth)
- `feature-estimator.md` uses a Vue component (`FeatureEstimator.vue`)
- Homepage (`index.md`) shows client-facing docs as feature cards
- **When adding a new client-facing page:** add it to the homepage `features` cards in `docs/index.md`, the default sidebar in `config.mts`, and the admin Client-Facing sidebar group in `Layout.vue`

## Estimating

See `.claude/projects/.../memory/project_estimating.md` for developer speed context when estimating timelines. Never expose these details in client-facing content.

## Commands

- `npm run docs:dev` — Start dev server (http://localhost:5173/lockandlogic-docs/)
- `npm run docs:build` — Build static site
