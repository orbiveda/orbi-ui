# Orbi UI Documentation System

This package contains the official documentation and interactive playground for Orbi UI Alpha.

## 🚀 Overview

The documentation system is built using **Next.js 15 (App Router)** and **MDX**, providing a premium, developer-first experience for exploring the Orbi UI ecosystem. It features a live code playground, dark mode support, and comprehensive API references for every component.

## 🏗️ Architecture

| Component | Responsibility |
|-----------|----------------|
| **Next.js 15** | Framework and routing (App Router) |
| **MDX** | Content authoring for documentation pages |
| **react-live** | Powering the interactive component playground |
| **Orbi Tokens** | Single source of truth for all styling (CSS variables) |
| **Monorepo** | Integrated via `pnpm` workspaces for live component updates |

## 📂 File Structure

- `src/app/docs/` — Core MDX documentation pages.
- `src/components/` — Documentation UI components (Sidebar, Search, Playground, etc.).
- `src/styles/` — Documentation-specific styles (consuming Orbi tokens).
- `mdx-components.tsx` — Custom MDX element mappings.

## ✨ Key Features

1.  **Live Playground**: Every component page includes an editable code block with instant visual feedback.
2.  **Dark Mode**: Fully integrated with the Orbi token system using `data-orbi-theme` and SSR-safe cookie persistence.
3.  **Automatic Props Tables**: Detailed API references for every component.
4.  **Responsive Layout**: Optimized for desktop and mobile reading.
5.  **Token Swatches**: Visual reference for colors, spacing, and other design tokens.

## 🛠️ Components Documented

The following components are currently documented with examples and API references:

- [x] **Button**: Variants, sizes, loading, and disabled states.
- [x] **Input**: Form input behavior and styling.
- [x] **Label**: Accessible label with required indicators.
- [x] **Stack**: Layout utility for horizontal/vertical spacing.
- [x] **Card**: Surface container for content grouping.
- [x] **Badge**: Status indicators and tags.
- [x] **Avatar**: User profiles with image and fallback support.
- [x] **Checkbox**: Accessible boolean input.
- [x] **Divider**: Visual separators.
- [x] **Dialog**: Modal dialogs and overlays.

## 🏁 Getting Started

To run the documentation site locally:

```bash
cd packages/docs
pnpm install
pnpm dev
```

The site will be available at `http://localhost:3000`.
