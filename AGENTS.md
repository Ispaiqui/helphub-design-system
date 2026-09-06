# AGENTS.md — HelpHub Design System

This repository is the durable source of truth for the HelpHub visual language. When working here or consuming this package from another Cursor project, follow these rules.

## Source of truth

1. **CSS variables in `src/styles/tokens.css` are authoritative.** Primitive hex values live only there.
2. Semantic roles (`--background`, `--primary`, `--sidebar`, `--chart-1`…`--chart-5`, etc.) must reference primitives via `var(--hh-*)`.
3. Tailwind utilities come from `src/styles/theme.css` (`@theme inline`). Do not duplicate a parallel Tailwind config with different colors.
4. React components must use tokenized classes (`bg-primary`, `text-foreground`, `border-border`, `shadow-primary`). **No hardcoded hex** in `src/components`.
5. Do not invent alternate brand colors. If a new role is needed, map it to an existing primitive.

## Brand palette (locked)

Neutrals: `#ffffff` `#f8fafc` `#f1f5f9` `#e2e8f0` `#94a3b8` `#64748b` `#1e293b` `#0f172a` `#020617`  
Blues: `#bfdbfe` `#93c5fd` `#60a5fa` `#3b82f6` `#2563eb` `#1d4ed8` `#1e40af` `#1e3a8a`  
Destructive: `#ef4444` `#7f1d1d`

Light/dark semantic mapping is documented in the README and enforced by `pnpm check:tokens`.

## Package

- Name: `@helphub/design-system`
- Repository: `https://github.com/Ispaiqui/helphub-design-system.git`
- Default typeface: Inter, swappable via `--font-sans`

## Commands

- `pnpm dev` — Vite playground
- `pnpm typecheck` — TypeScript
- `pnpm check:tokens` — hex + semantic role + no-hex-in-components
- `pnpm build` — playground production build
- `pnpm build:lib` — library JS, d.ts, and CSS copy

## Consuming from another Cursor project

```css
@import "@helphub/design-system/styles.css";
```

```tsx
import { ThemeProvider, Button } from "@helphub/design-system";
```

If the package is not published, depend on `github:Ispaiqui/helphub-design-system` or a local workspace path. Copy `.cursor/rules/helphub-design-system.mdc` into the consumer so agents keep using tokens.

## Implementation conventions

- TypeScript + React function components
- `cn()` (`clsx` + `tailwind-merge`) for class composition
- `class-variance-authority` for variants
- English for code and comments; Portuguese for user-facing copy in the playground/README
- Keep the playground favicon at `public/favicon.svg` so `/favicon.svg` does not 404
- Theme is class-based (`.dark` on `<html>`), not `prefers-color-scheme` only

## Out of scope

Do not add a second palette, a CSS-in-JS theme, or hardcoded `blue-500` / `#2563eb` in components. Prefer a new semantic token if hover/focus needs a distinct role (`--primary-hover` already exists).
