# Orbi UI Documentation System — Addition Summary

This document summarizes the new documentation system added to the Orbi UI monorepo.

## 🛠️ Summary of Additions

We have introduced a complete, production-ready documentation and playground site located in `packages/docs`.

### 1. Framework & Infrastructure
- **Next.js 15 (App Router)**: Modern React framework for the documentation site.
- **MDX Support**: High-performance content authoring using `@next/mdx`.
- **TypeScript**: Full type safety across the documentation codebase.
- **Workspace Integration**: Uses `pnpm` workspace links, ensuring the docs always reflect the latest component changes in `packages/react` and `packages/tokens`.

### 2. Core Components (Docs UI)
- **Sidebar Navigation**: Highly organized navigation for Getting Started, Installation, Design Tokens, and 10+ UI Components.
- **Theme Engine**: Dark and Light mode support using Orbi's own tokens, with persistent state via cookies.
- **Live Playground**: Integrated `react-live` component allowing developers to edit code and see instant previews of Orbi components.
- **API Reference System**: Custom `PropsTable` component for clear, consistent property documentation.
- **Token Swatches**: Visual documentation of the design system's colors (Neutral, Primary, Semantic).

### 3. Documentation Content
- **Getting Started**: Philosophy, Architecture overview, and Quick Start guide.
- **Installation**: Step-by-step setup, peer dependencies, and theme configuration.
- **Design Tokens**: Complete reference for Colors, Spacing, Radius, Shadow, Typography, and Motion.
- **Component Pages**: 10 detailed pages (Button, Input, Label, Stack, Card, Badge, Avatar, Checkbox, Divider, Dialog) each containing:
  - Interactive Examples
  - Live Code Playground
  - Full API Props Table
  - Implementation Snippets

### 4. Styling & Design
- **100% Token-Driven**: All styling for the documentation site consumes Orbi's CSS variables (`--orbi-*`).
- **Premium Minimalist Aesthetic**: Clean, modern layout focused on readability and developer experience.

## 🚀 How to Run

To start the documentation site:

```bash
cd packages/docs
pnpm dev
```

The site will be live at [http://localhost:3000](http://localhost:3000).
