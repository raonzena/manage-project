---
name: design-system-guidelines
description: Apply this repository's design-system, layout, spacing, accessibility, and verification conventions when implementing or reviewing UI. Use for React components, pages, navigation, responsive layouts, and Vanilla Extract styles in this project.
---

# Design System Guidelines

Build interfaces that look and behave like one product, with the smallest clear implementation.

## Inspect Before Building

- Inspect `design-system/ui/index.ts` and the relevant component implementation before creating a UI primitive.
- Inspect `design-system/styles/theme.css.ts` before adding a color, spacing, typography, radius, shadow, transition, height, or width value.
- Reuse and compose `Button`, `Badge`, `Card`, `CardHeader`, `CardTitle`, `CardDescription`, and `Input` from `@/design-system/ui` whenever they satisfy the requirement.
- Extend an existing component with a meaningful variant when the behavior will recur. Keep a local style when the need is specific to one feature.
- Do not duplicate a design-system component inside `app/` or `components/`.

## Layout and Spacing

- Prefer Grid or Flexbox when either produces simpler markup, fewer positioning rules, and clearer responsive behavior. Choose Grid for two-dimensional alignment and Flexbox for one-dimensional flow.
- Avoid extra wrapper elements used only to simulate spacing. Prefer `gap` for spacing between layout children.
- Use tokens from `vars.space` for `gap`, `padding`, and `margin`.
- When a token does not fit, prefer even pixel values and a 4px-based rhythm. Allow deliberate exceptions such as 1px borders, optical alignment, or constraints inherited from an asset.
- Keep related controls spatially grouped and express hierarchy through spacing before adding borders, backgrounds, or decoration.
- Use `minmax(0, 1fr)` and `minWidth: 0` where grid or flex content must truncate instead of overflowing.

## Tokens and Visual Consistency

- Use `vars` from `@/design-system/styles/theme.css`. Do not hardcode a value when an equivalent semantic token exists.
- Prefer semantic color tokens such as `textSecondary`, `border`, `surface`, `brand`, `danger`, and their subtle variants over raw palette values.
- Add a theme token only when the value has a reusable semantic role. Do not expand the token contract for a one-off visual adjustment.
- Follow the existing typography roles: body/display families for readable content and mono for identifiers, counts, dates, shortcuts, and compact metadata.
- Preserve existing radius, shadow, and transition conventions unless the requested design direction explicitly changes them.

## Components and States

- Keep components focused on one responsibility. Extract a component when it has independent behavior, is reused, or materially clarifies the parent; do not split trivial markup into files by default.
- Model visual variants with typed props or `styleVariants` rather than boolean combinations that can produce invalid states.
- Cover applicable interaction states: default, hover, focus-visible, active or selected, disabled, loading, error, and empty.
- Derive selected and active UI from the current route or application state. Do not store transient UI state in static menu data.
- Preserve native element behavior. Prefer `button`, `a`, `label`, `input`, and `select` over clickable generic elements.

## Responsive and Accessible UI

- Design from content constraints and existing breakpoints. Ensure layouts work at 320px and do not rely on a single desktop viewport.
- Use semantic landmarks and heading order. Give icon-only controls an accessible name and mark decorative SVGs with `aria-hidden="true"`.
- Keep keyboard navigation and visible focus states intact. Do not remove outlines without an equivalent focus treatment.
- Associate form labels, hints, validation messages, and error states with their controls.
- Prevent layout shift where loading or client-only state replaces server-rendered content.

## Verification

- Run ESLint and TypeScript checks for changed UI code.
- Run the production build for changes that affect routing, Server/Client Component boundaries, bundling, or global styles.
- Inspect the rendered page after material visual changes. Verify desktop and mobile layout, overflow, truncation, focus behavior, and the relevant interactive states.
- Remove unused styles, obsolete components, and superseded compatibility paths introduced by the change.
