# Installation Guide

## Overview

Orbi UI is a token-driven React component framework distributed via three NPM packages:

- **@orbi/react** — Styled React components
- **@orbi/core** — Headless React hooks and logic
- **@orbi/tokens** — Design system tokens

## Quick Start

### 1. Install the React components package

```bash
pnpm add @orbi/react
```

Or with npm:

```bash
npm install @orbi/react
```

Or with yarn:

```bash
yarn add @orbi/react
```

### 2. Import and use components

```tsx
import { Button, Card, Input } from "@orbi/react"

export default function App() {
  return (
    <Card>
      <Button>Click me</Button>
      <Input placeholder="Enter text..." />
    </Card>
  )
}
```

### 3. Include design tokens

Add the tokens CSS to your application root:

```tsx
import "@orbi/tokens/tokens.css"
import App from "./App"

export default function Root() {
  return <App />
}
```

## Package Details

### @orbi/react

Full-featured React components with built-in styling and accessibility.

```bash
pnpm add @orbi/react
```

**Components:**

- Button, Input, Label, Checkbox
- Dialog, Tooltip, Tabs
- Card, Badge, Avatar, Divider
- Progress, Select, Stack, Switch
- Textarea

**Features:**

- WCAG 2.1 compliant accessibility
- Built-in keyboard navigation
- Theme support (light/dark mode)
- TypeScript types for all props
- CSS-in-JS styling

### @orbi/core

Headless hooks for building custom components with Orbi UI logic.

```bash
pnpm add @orbi/core
```

**Hooks:**

- `useButton` — Button behavior and keyboard handling
- `useInput` — Input state management
- `useDialog` — Modal behavior and focus management
- `useLabel` — Label-input associations
- And more...

**Usage:**

```tsx
import { useButton } from "@orbi/core"

export function CustomButton(props) {
  const { isPressed, ...buttonProps } = useButton(props)
  return <button {...buttonProps}>{props.children}</button>
}
```

### @orbi/tokens

CSS custom properties and design tokens for consistent styling.

```bash
pnpm add @orbi/tokens
```

**Include in your CSS:**

```css
@import "@orbi/tokens/tokens.css";

body {
  color: var(--color-text);
  background-color: var(--color-background);
}

button {
  padding: var(--spacing-md);
  font-size: var(--typography-body);
  border-radius: var(--radius-md);
}
```

**Available tokens:**

- **Colors:** `--color-primary`, `--color-neutral-*`, `--color-semantic-*`
- **Spacing:** `--spacing-xs`, `--spacing-sm`, `--spacing-md`, `--spacing-lg`, `--spacing-xl`
- **Typography:** `--typography-h1`, `--typography-h2`, `--typography-body`, `--typography-small`
- **Borders:** `--radius-sm`, `--radius-md`, `--radius-lg`
- **Shadows:** `--shadow-sm`, `--shadow-md`, `--shadow-lg`
- **Transitions:** `--transition-fast`, `--transition-normal`, `--transition-slow`

**JavaScript access:**

```ts
import tokens from "@orbi/tokens/tokens.json"

console.log(tokens.color.primary)
console.log(tokens.spacing.md)
```

## Framework Integration

### Next.js

```tsx
// app/layout.tsx
import "@orbi/tokens/tokens.css"
import { ReactNode } from "react"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
```

### Vite + React

```tsx
// main.tsx
import "@orbi/tokens/tokens.css"
import App from "./App"
import React from "react"
import ReactDOM from "react-dom/client"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

### CRA (Create React App)

```tsx
// index.tsx
import "@orbi/tokens/tokens.css"
import App from "./App"
import React from "react"
import ReactDOM from "react-dom/client"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

## Peer Dependencies

### @orbi/react

Requires:
- `react` >= 18.2.0
- `react-dom` >= 18.2.0

### @orbi/core

Optionally requires:
- `react` >= 18.2.0 (optional for some utilities)

### @orbi/tokens

No dependencies — pure CSS and JSON tokens.

## TypeScript

All packages include full TypeScript type definitions.

```tsx
import { ButtonProps } from "@orbi/react"

const MyButton: React.FC<ButtonProps> = (props) => {
  return <button {...props} />
}
```

## Troubleshooting

### Components not styling

Ensure you're importing tokens in your root:

```tsx
import "@orbi/tokens/tokens.css"
```

### Type errors

Update your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

### Module not found

If using monorepos, ensure your package manager resolves workspace dependencies:

```bash
pnpm install
pnpm build
```

## Next Steps

- [API Documentation](./api.md) — Component prop reference
- [Design Tokens Reference](./tokens.md) — Complete token list
- [Accessibility](./accessibility.md) — WCAG compliance details
- [Examples](../examples/) — Complete example applications
