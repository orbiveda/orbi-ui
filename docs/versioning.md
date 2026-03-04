# Versioning Policy

Orbi UI follows [Semantic Versioning](https://semver.org/) (SemVer) with extended phases for pre-release development.

## Version Format

```
MAJOR.MINOR.PATCH-PHASE
```

Example: `0.1.1-alpha`, `1.0.0-beta`, `1.0.0`

## Version Phases

### Alpha (Pre-Release)

**Format:** `0.x.y-alpha`

**Status:**
- Experimental and evolving APIs
- May contain breaking changes between alpha versions
- Core features present but incomplete
- Not recommended for production use
- Early feedback encouraged

**When:** Initial development and feature exploration

**Example:** `0.1.1-alpha`

### Beta (Feature Complete)

**Format:** `x.y.z-beta`

**Status:**
- All planned features implemented
- APIs stabilizing but may change
- Focused on bug fixes and performance
- Suitable for early adopters
- Breaking changes avoided when possible

**When:** Feature-complete releases awaiting stabilization

**Example:** `1.0.0-beta.1`, `1.0.0-beta.2`

### Stable (Production Ready)

**Format:** `MAJOR.MINOR.PATCH`

**Status:**
- Production-ready
- Stable APIs with semantic versioning guarantees
- Breaking changes only in major versions
- Security and bug fixes as patches

**When:** General availability release

**Example:** `1.0.0`, `1.2.3`

## Semantic Versioning

Once a package reaches stable (non-prerelease) version, it follows strict semantic versioning:

### MAJOR Version

Increment when making **incompatible API changes**.

Examples:
- Removing a component prop
- Changing a hook signature
- Renaming exports
- Removing a component

```
1.0.0 → 2.0.0
```

### MINOR Version

Increment when adding **new functionality** in a backward-compatible manner.

Examples:
- Adding a new component
- Adding a new hook
- Adding optional props to existing components
- New utility functions

```
1.0.0 → 1.1.0
```

### PATCH Version

Increment for **bug fixes** and patches that don't affect API.

Examples:
- Fixing accessibility issues
- Performance improvements
- CSS refinements
- Type definition fixes

```
1.0.0 → 1.0.1
```

## Pre-Release Versions

### Alpha

Used for experimental versions during active development.

```
0.1.0-alpha
0.1.0-alpha.1
0.1.1-alpha
```

No guarantees between alpha versions. Breaking changes allowed.

### Beta

Used for feature-complete versions nearing release.

```
1.0.0-beta
1.0.0-beta.1
1.0.0-beta.2
```

API mostly stable. Avoid breaking changes if possible.

## Release Cycle

### Typical Path to Stable Release

1. **Alpha phase** — Develop and stabilize components
   - `0.1.0-alpha` → `0.1.1-alpha` → `0.2.0-alpha`
   - May skip minor/patch versions
   - Rapid iteration possible

2. **Beta phase** — Feature freeze and stabilization
   - `1.0.0-beta` → `1.0.0-beta.1` → `1.0.0-beta.2`
   - Focus on bugs and polish
   - Limited new features

3. **Stable release** — Production ready
   - `1.0.0` → `1.0.1` → `1.1.0` → `2.0.0`
   - Strict semantic versioning
   - Regular maintenance releases

## Breaking Change Policy

### Alpha/Beta

Breaking changes allowed with notice in CHANGELOG.

### Stable

Breaking changes only in MAJOR versions.

Before breaking changes:
- Deprecation notice in at least one previous version
- Clear migration guide provided
- Community feedback gathered

## Release Communication

### Alpha/Beta

- Announced in CHANGELOG
- GitHub releases page updated
- Community discussion encouraged

### Stable

- Full release notes published
- Migration guides if applicable
- Blog post for major releases
- Announcement in community channels

## Package Versioning

All Orbi UI packages release together with the same version number:

- `@orbi/react` — `0.1.1-alpha`
- `@orbi/core` — `0.1.1-alpha`
- `@orbi/tokens` — `0.1.1-alpha`

This simplifies dependency management and ensures consistency.

## Dependency Specifications

### Versions to use

- **Pre-release (alpha/beta):** Exact version
  ```json
  "@orbi/react": "0.1.1-alpha"
  ```

- **Stable:** Caret version for flexibility
  ```json
  "@orbi/react": "^1.0.0"
  ```

### Peer Dependencies

- React: `>=18.2.0` (no breaking changes expected for React 18 and 19)

## Decision Record

**Date:** 2026-03-04
**Status:** Active
**Rationale:**
- Clear phase distinction for pre-release development
- Semantic versioning for stable releases maintains trust
- Single version number for all packages reduces confusion
- Releases tied to Git tags in GitHub Actions workflow
