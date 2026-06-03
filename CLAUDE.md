# CLAUDE.md

Project conventions for AI agents (Claude Code, and any other agent) working in this
repository. Human contributors should read `README.md` first.

Chat with the maintainer in Korean; keep code comments and docs in English. Keep this
file updated when conventions change. It is committed so future sessions stay in sync;
`npm run cleanse:agents` removes it when the starter is reused for a new extension.

## What this is

A cross-browser extension starter built with **WXT**. Single package (no monorepo).
Stack: WXT 0.20, React 19, TypeScript 6, Tailwind CSS v4, shadcn/ui, Vite 8.
Package manager is **npm**. Runtime is **Node 24**.

## Toolchain

- Use **Node 24**. The repo pins it in `.node-version` / `.nvmrc`. With `fnm`, prefix
  commands as `fnm exec --using=24 -- <cmd>` if your shell is not already on 24.
- Always **npm**, never pnpm/yarn.
- After `npm install`, the `postinstall` runs `wxt prepare`, which generates `.wxt/`
  (the extended tsconfig, the `#imports` / `#i18n` virtual modules, and entrypoint
  types). Re-run `npx wxt prepare` after adding entrypoints, modules, or locale keys.

## Layout

All TypeScript source lives under `src/` (`srcDir: 'src'` in `wxt.config.ts`).

```
src/
  entrypoints/   popup, options, sidepanel, newtab, devtools, devtools-panel,
                 background, content, content-ui, content-runtime
  components/    first-party React components; components/ui/ holds shadcn primitives
  hooks/         reusable hooks (e.g. use-storage-value)
  lib/           framework-agnostic helpers (utils, theme, storage, content-theme, mount)
  assets/        bundled CSS (tailwind.css imports theme.css)
  locales/       i18n source (en.yml, ko.yml)
public/          copied verbatim to the output root (icons, vendored Geist fonts)
```

`@/` resolves to `src/` and `@@/` to the project root (provided by the generated tsconfig).

## Conventions

- **Explicit imports only.** `wxt.config.ts` sets `imports: false`, so import WXT APIs
  from `#imports` (`defineBackground`, `defineContentScript`, `browser`, `storage`,
  `createShadowRootUi`) and i18n from `#i18n`. No directory auto-imports.
- **UI is shadcn/ui.** Prefer shadcn components over raw HTML controls (`<button>`,
  `<input>`, `<select>`). Structural elements (`div`, `p`, `header`, `output`) are fine.
- **Comments and docs are English. Keep comments minimal.**
- Add shadcn components with the CLI: it needs a Vite project, which WXT hides, so create
  a temporary `vite.config.ts` (plugins: react + tailwindcss, alias `@` to `./src`), run
  `npx shadcn@latest add <name>`, then delete the temp file.

## Theming

- One source of truth: the `local:theme` storage item (`src/lib/theme.ts`), so the choice
  is shared across every page and context.
- `ThemeProvider` (`src/components/theme-provider.tsx`) applies `.dark` to
  `document.documentElement` for pages. Content-script UIs apply it to their shadow-root
  wrapper via `src/lib/content-theme.ts`.
- Design tokens live in `src/assets/theme.css`, scoped to `:root, :host` so they also
  work inside content-script shadow roots.

## i18n

- `@wxt-dev/i18n`. Source in `src/locales/<locale>.yml`; default locale `en`.
- Use `i18n.t('section.key')` from `#i18n`. Manifest name/description use
  `__MSG_extName__` / `__MSG_extDescription__`.
- After editing locale files, run `npx wxt prepare` to refresh `#i18n` types.

## Cross-browser

- Chrome/Edge build MV3 by default. Firefox builds MV3 too (`--mv3` in the firefox
  scripts) so `browser.action` is consistent.
- The Firefox manifest adds `sidebar_action` (the side panel equivalent) and a
  `browser_specific_settings.gecko` id. The `newtab` entrypoint is excluded on Firefox.
- When publishing to Firefox AMO, declare data collection under
  `browser_specific_settings.gecko.data_collection_permissions` (this starter collects
  none); the dev-build warning about it is informational.

## Quality gates (all must stay green)

- `npm run compile` — `tsc --noEmit`.
- `npm run lint` — ESLint 10 flat config. Note: `eslint-plugin-react` and
  `eslint-plugin-jsx-a11y` are intentionally absent (they do not yet support ESLint 10);
  React Doctor covers a11y and React-specific concerns.
- `npm run format:check` — Prettier (sorts Tailwind classes via `tailwindStylesheet`).
- `npm run test:coverage` — Vitest (`WxtVitest`, jsdom). Coverage thresholds are 75%.
- `npm run doctor` — React Doctor. Config in `doctor.config.json`:
  - `deadCode: false` — WXT entrypoints are loaded by the framework, not imported, and
    `#imports` / `#i18n` are virtual, so dead-code analysis only produces false positives.
  - `only-export-components: off` — shadcn primitives intentionally co-locate a component
    and its variants.
  - The score must be **100**. Scoring calls the React Doctor API (needs network).

## Pre-commit hook

`.husky/pre-commit` runs, on the staged changes only:

1. `lint-staged` (Prettier + ESLint, auto-fix and re-stage).
2. `react-doctor --staged --score` must be 100.
3. `npm run test:coverage` (>=75%).

## Git flow

Trunk-based. `main` is the default branch. Work on `release/vX.Y.Z`, merge to `main`,
tag `X.Y.Z`, and publish a GitHub Release (the release workflow does this on tag push).
The local git identity for this repo is `sbd530` / `byungdon92@gmail.com`. If a Bash
command runs on the wrong Node version, wrap it as `fnm exec --using=24 -- <cmd>`.

## Verify changes in a browser

Build (`npm run build`) and load `.output/chrome-mv3` as an unpacked extension at
`chrome://extensions`, or run `npm run dev` (auto-opens a browser with HMR). Prefer
verifying UI changes in a real browser, not only with tests.

## Starting a new extension from this starter

Run `npm run cleanse:agents` to remove the agent instruction files (`CLAUDE.md`,
`.claude/`). Alternatively, keep these files only on a dedicated branch so the default
branch stays clean for downstream projects.
