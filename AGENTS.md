# AGENTS.md

Guidelines for AI coding agents working in this repository.

Using Calligraph in *your own* project instead of contributing to it?
Read [`packages/calligraph/llms-full.txt`](packages/calligraph/llms-full.txt) - it is the full API documentation, and it ships inside the npm package at `node_modules/calligraph/llms-full.txt`.

## Repository layout

```
packages/calligraph/   # the published npm package
  src/
    index.tsx          # public entry: <Calligraph />, prop defaults, AutoSizeWrapper
    text.tsx           # variant="text"   — LCS grapheme diffing
    number.tsx         # variant="number" — vertical digit roll
    slots.tsx          # variant="slots"  — slot-machine digit spin
    reconcile.ts       # key reconciliation (computeLCS, reconcileTextKeys, reconcileDigitKeys)
    shared.ts          # grapheme splitting, animation presets, small helpers
  llms.txt             # short index for assistants, served at /llms.txt
  llms-full.txt        # full docs, served at /llms-full.txt and /index.md
apps/web/              # Next.js docs site (calligraph.raphaelsalaja.com)
```

Monorepo: pnpm workspaces + Turborepo. Releases go through Changesets.

## Commands

```bash
pnpm install
pnpm dev         # package watch build + docs site
pnpm build       # turbo build (bunchee for the package, next build for the site)
pnpm lint        # biome check --fix --unsafe
pnpm typecheck   # tsc --noEmit
```

Always use `pnpm`, never `npm` or `yarn`.

## Architecture rules

- **One public export.** Consumers import `{ Calligraph }` (and the `CalligraphProps` type). No default export. `computeLCS`, the reconcilers, the renderers, and the animation presets are internal - do not export them.
- **One file per variant.** New rendering behaviour goes in its own `*.tsx` renderer with the same props shape (`text`, `transition`, `stagger`, `animateInitial`, `onComplete`), wired up in `index.tsx`. Do not grow `index.tsx` past prop handling and dispatch.
- **Render-phase reconciliation.** Key reconciliation happens during render by comparing against state (`prevText`), not in `useEffect`. Keep it that way - effects drop frames and break rapid successive updates.
- **Client component.** The `"use client"` directive in `src/index.tsx` is required.
- **Peer dependencies.** `motion`, `react`, `react-dom` stay in `peerDependencies`. Never move them to `dependencies`, never add a runtime dependency.
- **Graphemes, not code units.** Split with `splitGraphemes` (`Intl.Segmenter`) so emoji and combining marks survive. Never use `String.prototype.split("")` or index into a string.
- **Animation presets, not raw transitions.** New timing goes into `animations` in `shared.ts` as a named preset. There is no `transition` prop.

## Style

- Biome config is the source of truth: 2 spaces, double quotes, sorted imports, recommended rules.
- No comments restating what the code says. JSDoc on the public `Calligraph` export only - it is what shows in IDE tooltips.
- Keep the diff small. This package is deliberately tiny; prefer deleting to adding.

## Before you finish

1. `pnpm lint && pnpm typecheck && pnpm build`.
2. Changed public behaviour or props? Update **all three**: the JSDoc in `src/index.tsx`, `packages/calligraph/llms-full.txt`, and `README.md`. Both `llms.txt` files are served by the site and ship in the npm package, so they must stay accurate.
3. Changed the package? Add a changeset: `pnpm changeset`.
4. Commits follow Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`) - enforced by commitlint. Do not add yourself as co-author.
