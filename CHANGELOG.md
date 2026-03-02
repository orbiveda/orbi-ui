# Changelog

All notable changes to Orbi UI are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0-alpha] - 2026-03-02

### Added

- **Initial Alpha Release** with 10 core components
  - Button (primary, secondary, tertiary variants)
  - Input (text, email, password, number support)
  - Label (accessible form labels)
  - Stack (flex-based layout primitive)
  - Card (content grouping and elevation)
  - Badge (status indicators)
  - Avatar (user profile images)
  - Checkbox (boolean selection)
  - Dialog (modal overlays)
  - Divider (visual separators)

- **@orbi/core** — Headless React hooks for all components
  - useButton, useInput, useLabel, useStack, useDialog
  - Full accessibility implementations (WCAG compliant)
  - Keyboard navigation and focus management
  - State management for all interactive components

- **@orbi/tokens** — Design system tokens
  - Color system (primary, neutral, semantic palette)
  - Spacing scale (8px-based grid)
  - Typography (font sizes, weights, line heights)
  - Border radius and shadow definitions
  - Motion and transition easing functions
  - Dark and light theme variants

- **@orbi/react** — Styled React components
  - Full component library with token consumption
  - CSS-based styling using token variables
  - Theme switching (light/dark mode)
  - ThemeProvider for application-wide configuration

- **Documentation** (Next.js-based)
  - Getting Started guide
  - Installation instructions
  - Component API documentation
  - Design tokens reference
  - Live component playground

- **Package Hardening**
  - ESM module support
  - Proper TypeScript exports
  - Tree-shaking enabled (sideEffects: false)
  - Export maps for all packages
  - Build configuration for all packages

### Alpha Status

This is an **alpha release**. While all components are production-ready and stable, the API may evolve based on community feedback. We welcome bug reports, feature requests, and contributions.

## Versioning

Orbi UI follows semantic versioning:
- **MAJOR** — Breaking changes
- **MINOR** — New features (backward compatible)
- **PATCH** — Bug fixes

---

For upcoming changes, see the repository issues and PRs on [GitHub](https://github.com/orbiveda/orbi-ui/issues).
