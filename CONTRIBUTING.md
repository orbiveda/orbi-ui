# Contributing to Orbi UI

Thank you for your interest in contributing to Orbi UI. This document provides guidelines for contributing to the project.

## Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please read and adhere to our Code of Conduct:

- Be respectful and inclusive
- Welcome diverse perspectives
- Focus on constructive feedback
- Report inappropriate behavior

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+
- Git

### Local Setup

1. **Fork and clone**

```bash
git clone https://github.com/orbiveda/orbi-ui.git
cd orbi-ui
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Build packages**

```bash
pnpm build
```

4. **Verify setup**

```bash
pnpm typecheck
pnpm test
```

## Development Workflow

### Branch Naming

Create feature branches with clear names:

```
feature/component-name        — New component
fix/issue-description         — Bug fix
docs/what-changed             — Documentation
refactor/improvement-area     — Code improvements
```

### Commits

Follow conventional commits for clarity:

```
feat: add Button component props
fix: resolve focus management in Dialog
docs: update installation guide
refactor: simplify token consumption in theme
test: add Button variant tests
```

Format: `<type>: <subject>`

Types:
- `feat` — New feature
- `fix` — Bug fix
- `docs` — Documentation
- `refactor` — Code refactoring
- `test` — Tests
- `chore` — Maintenance

### Pull Requests

1. **Create a feature branch**

```bash
git checkout -b feature/my-feature
```

2. **Make your changes**

Ensure:
- No new dependencies without discussion
- No modifications to public APIs without approval
- No changes to token structure
- Code is properly typed

3. **Type-check and test**

```bash
pnpm typecheck
pnpm test
```

4. **Commit and push**

```bash
git commit -m "feat: descriptive message"
git push origin feature/my-feature
```

5. **Start a Pull Request**

Include:
- Clear description of changes
- Reference to related issues (e.g., "Fixes #123")
- Any breaking changes clearly noted
- Screenshots/videos if UI changes

## Submitting Issues

If you find a bug or have a feature request:

1. **Check existing issues** — Your issue may already be reported
2. **Provide clear reproduction steps**
3. **Include environment details** (OS, Node version, browser if applicable)
4. **Add minimal code example** that reproduces the issue

## What We Won't Accept

To maintain focus and quality, we don't accept contributions that:

- Add new components beyond the core set
- Modify public APIs without consensus
- Change the token structure
- Add heavy external dependencies
- Lack proper TypeScript types
- Missing accessibility implementations

## Project Structure

```
packages/
├── core/       — Headless hooks (useButton, useInput, etc.)
├── react/      — Styled React components
├── tokens/     — Design system tokens
└── docs/       — Documentation website

Root:
├── tsconfig.base.json  — Base TypeScript config
├── pnpm-workspace.yaml — Workspace configuration
└── vite.config.ts      — Vitest configuration
```

## Licensing

By contributing to Orbi UI, you agree that your contributions will be licensed under the MIT License. See [LICENSE](./LICENSE) for details.

## Questions?

- **Issues & Discussions** — [GitHub Issues](https://github.com/orbiveda/orbi-ui/issues)
- **Documentation** — [Orbi UI Docs](./packages/docs)

---

We appreciate your contribution to Orbi UI!
