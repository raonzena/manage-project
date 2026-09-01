---
name: project-code-structure
description: Apply this repository's file placement, Next.js App Router colocation, component ownership, module boundaries, and extraction conventions when creating, moving, or refactoring TypeScript and React code.
---

# Project Code Structure

Place code by ownership and actual reuse. Keep route implementation close to its route and keep shared modules independent from route-local code.

## App Router Files

- Reserve `app/` route segments for Next.js routing and route-owned implementation.
- Prefix non-route implementation folders inside `app/` with `_`, for example `_components`, `_lib`, `_data`, or a feature-specific private folder such as `_dashboard`.
- Files inside an underscore-prefixed private folder do not need another underscore prefix. Use `_components/IssueList.tsx`, not `_components/_IssueList.tsx`.
- When a standalone implementation file is colocated directly in a route segment instead of a private folder, prefix it with `_` to make its role explicit.
- Do not prefix Next.js special files such as `page.tsx`, `layout.tsx`, `template.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, or `route.ts`.
- Use route groups such as `(dashboard)` only to organize routes or apply layouts without changing the URL. Do not use route groups as a substitute for private implementation folders.

## Component Ownership

- Place a component used by only one page or route subtree under that route's underscore-prefixed private folder.
- Place a component in root `components/` only after it has real consumers in multiple routes or is part of the persistent application shell.
- Place reusable primitives and tokens in `design-system/`; do not put product-specific feature components there.
- Move a route-local component to shared scope when reuse actually appears. Do not create speculative shared abstractions.
- Shared modules must not import from route-local `app/**/_*` modules. Dependencies should flow from routes toward shared components, the design system, domain logic, and server utilities.

## Module Extraction

- Keep a type, constant, or helper next to its only consumer while the file remains easy to understand.
- Extract by responsibility, reuse, or change frequency rather than by line count alone.
- Move substantial static data or configuration into a focused file such as `issue-views.ts` or `navigation-data.ts` when it obscures component rendering.
- Extract shared domain types into a domain-named module when multiple modules depend on them. Avoid a repository-wide dumping ground named only `types.ts`, `constants.ts`, or `utils.ts`.
- Keep tiny component prop types in the component file unless another module genuinely imports them.
- Keep style files colocated with their component or route and use the existing `.css.ts` naming convention.

## Module Boundaries

- Keep Server Components as the default. Add `"use client"` only to the smallest interactive boundary that needs browser APIs, state, effects, or client hooks.
- Do not move static data, types, or server-safe rendering into a Client Component merely because one nested control is interactive.
- Use `index.ts` only as an intentional public API for a shared component or package directory. Avoid barrel files for route-local folders and avoid import cycles.
- Use path aliases for cross-feature or root imports and relative imports within one cohesive module directory.
- Preserve the repository's existing naming convention when extending a feature; do not rename unrelated files for stylistic uniformity.

## Change Discipline

- Inspect current consumers before moving or promoting a file.
- When replacing a structure, update all imports and remove the superseded file or folder. Do not leave compatibility re-exports without an active consumer.
- Avoid creating empty folders, placeholder modules, or anticipated extension points.
- After structural changes, run ESLint and TypeScript checks. Run the production build when route structure, Server/Client boundaries, or bundler-visible imports change.
