# ARCHITECTURE_CONTRACT.md

# Orbi UI Architecture Contract

We are building a Dev-first Flexible Hybrid UI framework.

## Core Principles

1. Separation of logic and styling.
2. Tokens are the single source of truth.
3. Core layer contains behavior only.
4. React layer contains styled wrappers.
5. No hardcoded values.
6. No external UI dependencies.
7. Strict TypeScript.

---

## Folder Structure

packages/
  core/
  react/
  tokens/

Each component must follow:

Core:
button/
  primitive.ts
  useButton.ts
  types.ts
  index.ts

React:
button/
  Button.tsx
  styles.ts
  Button.test.tsx
  index.ts

---

## Token Rules

- All spacing, colors, radius, typography must come from tokens.
- No inline px.
- No inline hex.
- No inline hardcoded design values.

---

## Variant Pattern

Every interactive component must support:

- variant: primary | secondary | ghost
- size: sm | md | lg
- disabled: boolean
- loading: boolean (if applicable)

---

## Accessibility Rules

- aria-disabled when disabled
- aria-busy when loading
- keyboard accessible
- semantic HTML

---

## Non-Negotiables

- Never merge core and react logic.
- Never change folder structure.
- Never invent patterns mid-way.
- Keep APIs clean and predictable.