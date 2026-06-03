<div align="center">

<img src="public/icon/128.png" alt="BERS" width="88" />

# Browser Extension React Starter

A modern, cross-browser extension starter built with WXT, React, TypeScript, Tailwind CSS v4, and shadcn/ui.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=flat-square&logo=typescript&logoColor=white)
![WXT](https://img.shields.io/badge/WXT-0.20-67D7B0?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-black?style=flat-square)

</div>

## Intro

This is a starter for building Chrome and Firefox extensions with React and TypeScript.
It uses [WXT](https://wxt.dev) for the build, manifest generation, HMR, cross-browser
targets, storage, and i18n, so there is no custom build tooling to maintain. UI is built
entirely with [shadcn/ui](https://ui.shadcn.com) on Tailwind CSS v4.

It is a ground-up rebuild of the no-longer-maintained
[chrome-extension-boilerplate-react-vite](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite),
keeping the same feature surface on a smaller, current stack.

## Features

- [WXT](https://wxt.dev) (Vite 8 under the hood) with HMR and cross-browser builds
- [React 19](https://react.dev) + [TypeScript 6](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) (new-york, neutral)
- Light / dark / system theme, persisted in extension storage and shared across every context
- Self-hosted [Geist](https://vercel.com/font) font (no remote requests)
- Type-safe i18n ([`@wxt-dev/i18n`](https://wxt.dev/i18n.html)) with English and Korean locales
- All extension surfaces: popup, options, side panel, new tab, devtools panel, background,
  and content scripts (plain, shadow-DOM UI, and runtime-injected)
- Vitest unit tests with a 75% coverage gate
- [React Doctor](https://react.doctor), ESLint 10, and Prettier wired into a Husky pre-commit hook
- GitHub Actions for CI and tag-driven releases

## Requirements

- **Node 24** (`.nvmrc` / `.node-version` are provided; use [fnm](https://github.com/Schniz/fnm) or nvm)
- **npm**

## Getting started

```bash
npm install        # also runs `wxt prepare` to generate types
npm run dev        # Chrome with HMR
npm run dev:firefox
```

Then load the extension:

### Chrome / Edge

1. `npm run build`
2. Open `chrome://extensions`, enable **Developer mode**
3. **Load unpacked** and select `.output/chrome-mv3`

(`npm run dev` opens a browser with the extension already loaded.)

### Firefox

1. `npm run build:firefox`
2. Open `about:debugging#/runtime/this-firefox`
3. **Load Temporary Add-on** and select `.output/firefox-mv3/manifest.json`

## Project structure

```
src/
  entrypoints/
    background.ts              service worker (mirrors the counter on the toolbar badge)
    popup/                     toolbar popup
    options/                   options page (opens in a tab)
    sidepanel/                 side panel (Chrome) / sidebar (Firefox)
    newtab/                    new tab override (Chromium)
    devtools/ devtools-panel/  custom DevTools panel
    content.ts                 plain content script
    content-ui.content/        React UI injected into a shadow root
    content-runtime.content/   React UI injected on demand from the popup
  components/                  first-party components; components/ui/ holds shadcn primitives
  hooks/                       reusable hooks (use-storage-value)
  lib/                         utils, theme, storage, content-theme, mount
  assets/                      tailwind.css + theme.css
  locales/                     en.yml, ko.yml
public/                        icons and vendored fonts (copied verbatim)
```

## Scripts

| Script                    | Description                                    |
| ------------------------- | ---------------------------------------------- |
| `dev` / `dev:firefox`     | Start the dev server with HMR                  |
| `build` / `build:firefox` | Production build for one browser               |
| `build:all`               | Build for Chrome and Firefox                   |
| `zip` / `zip:firefox`     | Package a store-ready zip                      |
| `compile`                 | `tsc --noEmit`                                 |
| `lint` / `lint:fix`       | ESLint                                         |
| `format` / `format:check` | Prettier                                       |
| `test` / `test:coverage`  | Vitest                                         |
| `doctor`                  | React Doctor health report                     |
| `cleanse:agents`          | Remove AI-agent files when reusing the starter |

## Theming

The active theme is stored once (`local:theme`) and watched in every context, so the
popup, options page, side panel, new tab, and content-script UIs stay in sync. Pages
toggle `.dark` on `<html>`; content-script UIs toggle it on their shadow-root wrapper.
Design tokens are scoped to `:root, :host` in `src/assets/theme.css`.

## Adding shadcn components

The shadcn CLI expects a Vite project, which WXT hides. Create a temporary
`vite.config.ts` (React + `@tailwindcss/vite`, alias `@` to `./src`), run
`npx shadcn@latest add <component>`, then delete the file.

## Quality gates

- `npm run compile`, `npm run lint`, `npm run format:check`, `npm run test:coverage`
- React Doctor must score 100 (rules configured in `doctor.config.json`)
- The pre-commit hook runs Prettier, ESLint, React Doctor, and the coverage gate on the
  staged changes only; CI runs all of them plus both browser builds

## Releasing

Trunk-based on `main`. Cut a `release/vX.Y.Z` branch, merge it to `main`, then push the
tag `X.Y.Z`. The release workflow builds, zips, and publishes a GitHub Release with the
artifacts attached.

## License

[MIT](LICENSE)
