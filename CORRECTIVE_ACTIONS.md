# CORRECTIVE ACTIONS — IMPLEMENTATION PATCHES

This file contains the exact code changes required to implement Quality Hardening fixes.

## PRIORITY 1: CRITICAL (Apply immediately — 5 minutes total)

### 1a. Button: Add focus-visible ring
**File**: `packages/react/button/button.css`

**Action**: Append this CSS rule to the existing file:

```css
.orbi-button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--orbi-color-background), 0 0 0 4px var(--orbi-color-ring);
}
```

**Verification**:
- Focus button with Tab key
- Should show 4px ring around button in --orbi-color-ring color

---

### 1b. Button: Remove aria-disabled from primitive
**File**: `packages/core/button/primitive.ts`

**REMOVE this line from the return object**:
```typescript
"aria-disabled": disabled || loading ? true : undefined,
```

**Result**:
```typescript
export function createButtonPrimitive(
  props: ButtonBaseProps
): ButtonPrimitiveResult {
  const { disabled = false, loading = false } = props;

  return {
    "data-orbi-button": true,
    // ❌ REMOVED: "aria-disabled": disabled || loading ? true : undefined,
    "aria-busy": loading ? true : undefined,
    disabled: disabled || loading,
  };
}
```

**Reason**: Native `disabled` attribute is sufficient; aria-disabled is redundant on button elements.

---

### 1c. Checkbox: Remove aria-disabled from component
**File**: `packages/react/checkbox/Checkbox.tsx`

**REMOVE this line** from the return JSX:
```typescript
aria-disabled={disabled || undefined}
```

**Result**:
```tsx
return (
  <input
    ref={ref}
    type="checkbox"
    className={classes}
    disabled={disabled}
    // ❌ REMOVED: aria-disabled={disabled || undefined}
    {...rest}
  />
);
```

**Reason**: Native checkbox's disabled state is sufficient; aria-disabled is redundant.

---

### 1d. Divider: Remove aria-orientation
**File**: `packages/react/divider/Divider.tsx`

**REMOVE this line** from the return JSX:
```typescript
aria-orientation={orientation}
```

**Result**:
```tsx
return (
  <hr
    ref={ref}
    className={classes}
    role="separator"
    // ❌ REMOVED: aria-orientation={orientation}
    {...rest}
  />
);
```

**Reason**: HTML spec prohibits aria-orientation on `<hr>` elements; it's not a valid ARIA attribute for this element.

---

## PRIORITY 2: HIGH (Strongly recommended — 50 minutes total)

### 2a. Dialog: Complete accessibility implementation
**File**: `packages/react/dialog/Dialog.tsx`

**COMPLETE REPLACEMENT** (copy entire file):

```tsx
import React, {
  forwardRef,
  useEffect,
  useState,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import {
  DialogBaseProps,
  createDialogPrimitive,
} from "@orbi/core";
import "./dialog.css";

interface DialogProps extends DialogBaseProps {
  children: React.ReactNode;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  ({ open, defaultOpen = false, onOpenChange, children, ...rest }, ref) => {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const triggerRef = useRef<HTMLElement | null>(null);

    const primitive = createDialogPrimitive(
      { open, defaultOpen, onOpenChange },
      internalOpen,
      setInternalOpen
    );

    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Escape key handling
    useEffect(() => {
      if (!primitive.isOpen) return;

      function handleKeyDown(e: KeyboardEvent) {
        if (e.key === "Escape") {
          primitive.close();
        }
      }

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [primitive]);

    // Focus trap: keep focus inside dialog
    useEffect(() => {
      if (!primitive.isOpen || !contentRef.current) return;

      // Store trigger element to restore focus later
      triggerRef.current = document.activeElement as HTMLElement;

      // Focus dialog content on open
      contentRef.current?.focus();

      function handleKeyDown(e: KeyboardEvent) {
        if (e.key !== "Tab") return;
        if (!contentRef.current) return;

        const focusableElements = contentRef.current.querySelectorAll(
          "button, [href], input, select, textarea, [tabindex]:not([tabindex=\\'-1\\'])"
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        // Restore focus on close
        if (triggerRef.current) {
          triggerRef.current.focus();
        }
      };
    }, [primitive.isOpen]);

    // Backdrop click handling
    function handleOverlayClick(
      e: React.MouseEvent<HTMLDivElement>
    ) {
      if (e.currentTarget === e.target) {
        primitive.close();
      }
    }

    if (!primitive.isOpen) return null;

    return createPortal(
      <div
        ref={overlayRef}
        className="orbi-dialog-overlay"
        onClick={handleOverlayClick}
      >
        <div
          ref={contentRef}
          className="orbi-dialog-content"
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          {...rest}
        >
          {children}
        </div>
      </div>,
      document.body
    );
  }
);

Dialog.displayName = "Dialog";
```

**Key Changes**:
1. Added `role="dialog"` to content div
2. Added `aria-modal="true"` to content div
3. Added `tabIndex={-1}` to content div (makes it focusable)
4. Implemented focus trap: Tab key wraps from last to first element
5. Implemented focus restore: remembers which element opened dialog, restores focus on close
6. Updated DialogProps to accept aria-labelledby and aria-describedby
7. Stores trigger element reference for restoration

**Tests to add**:
```typescript
// Dialog.test.tsx - new tests
it("traps focus inside dialog", async () => {
  render(
    <Dialog open>
      <button>First</button>
      <button>Last</button>
    </Dialog>
  );
  
  const firstButton = screen.getByText("First");
  firstButton.focus();
  fireEvent.keyDown(document.activeElement!, { key: "Tab", shiftKey: true });
  
  expect(document.activeElement?.textContent).toBe("Last");
});

it("restores focus to trigger on close", async () => {
  const trigger = <button>Open</button>;
  const { rerender } = render(
    <>
      {trigger}
      <Dialog open={false}>Content</Dialog>
    </>
  );
  
  const triggerElement = screen.getByText("Open");
  triggerElement.focus();
  
  rerender(
    <>
      {trigger}
      <Dialog open>Content</Dialog>
    </>
  );
  
  rerender(
    <>
      {trigger}
      <Dialog open={false}>Content</Dialog>
    </>
  );
  
  expect(document.activeElement).toBe(triggerElement);
});

it("sets role=dialog and aria-modal", () => {
  render(
    <Dialog open>
      <div>Content</div>
    </Dialog>
  );
  
  const dialogContent = document.querySelector(".orbi-dialog-content");
  expect(dialogContent?.getAttribute("role")).toBe("dialog");
  expect(dialogContent?.getAttribute("aria-modal")).toBe("true");
});
```

---

### 2b. Label: Add aria-required
**File**: `packages/react/label/Label.tsx`

**CHANGE**: Add `aria-required={isRequired || undefined}` to the label element

**Replace this**:
```tsx
return (
  <label ref={ref} className={classes} {...rest}>
```

**With this**:
```tsx
return (
  <label ref={ref} className={classes} aria-required={isRequired || undefined} {...rest}>
```

**Full result**:
```tsx
export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ required, className, children, ...rest }, ref) => {
    const { required: isRequired } = useLabel({ required });

    const classes = ["orbi-label", className]
      .filter(Boolean)
      .join(" ");

    return (
      <label 
        ref={ref} 
        className={classes}
        aria-required={isRequired || undefined}
        {...rest}
      >
        {children}
        {isRequired && (
          <span className="orbi-label-required">*</span>
        )}
      </label>
    );
  }
);
```

**Tests to add**:
```typescript
it("sets aria-required when required", () => {
  render(<Label required>Password</Label>);
  const label = screen.getByText("Password");
  expect(label.getAttribute("aria-required")).toBe("true");
});
```

---

### 2c. Input: Add ARIA types to core
**File**: `packages/core/input/types.ts`

**REPLACE entire file** with:

```typescript
// packages/core/input/types.ts

export interface InputBaseProps {
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
}
```

---

### 2d. Input: Extract and pass ARIA props
**File**: `packages/react/input/Input.tsx`

**REPLACE entire file** with:

```tsx
import React, { forwardRef } from "react";
import { useInput, InputBaseProps } from "@orbi/core";
import "./input.css";

interface InputProps
  extends InputBaseProps,
    React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    disabled, 
    readOnly, 
    required, 
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-invalid": ariaInvalid,
    "aria-describedby": ariaDescribedBy,
    className, 
    ...rest 
  }, ref) => {
    const primitiveProps = useInput({
      disabled,
      readOnly,
      required,
    });

    const classes = ["orbi-input", className]
      .filter(Boolean)
      .join(" ");

    return (
      <input
        ref={ref}
        className={classes}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        {...primitiveProps}
        {...rest}
      />
    );
  }
);

Input.displayName = "Input";
```

**Tests to add**:
```typescript
it("passes aria-label to input", () => {
  render(<Input aria-label="Search" />);
  const input = screen.getByLabelText("Search");
  expect(input).toBeDefined();
});

it("passes aria-invalid with aria-describedby", () => {
  render(
    <>
      <Input aria-invalid={true} aria-describedby="error-msg" />
      <span id="error-msg">Invalid input</span>
    </>
  );
  const input = document.querySelector("input");
  expect(input?.getAttribute("aria-invalid")).toBe("true");
  expect(input?.getAttribute("aria-describedby")).toBe("error-msg");
});
```

---

### 2e. Label: Make htmlFor explicit in core types
**File**: `packages/core/label/types.ts`

**REPLACE entire file** with:

```typescript
export interface LabelBaseProps {
  required?: boolean;
  htmlFor?: string;
}
```

**Reason**: Makes the htmlFor contract explicit in core types, not just relying on HTMLAttributes inference.

---

## PRIORITY 3: MEDIUM (Enhancements — 13 minutes total)

### 3a. Core package: Add optional React peerDependency
**File**: `packages/core/package.json`

**ADD this section** after the "scripts" section:

```json
  "peerDependencies": {
    "react": ">=18.2.0"
  },
  "peerDependenciesMeta": {
    "react": {
      "optional": true
    }
  },
```

**Full section context**:
```json
{
  "name": "@orbi/core",
  "version": "0.1.0-alpha",
  "description": "Headless React hooks for Orbi UI components",
  "license": "MIT",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "tsc"
  },
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    }
  },
  "sideEffects": false,
  "peerDependencies": {
    "react": ">=18.2.0"
  },
  "peerDependenciesMeta": {
    "react": {
      "optional": true
    }
  }
}
```

---

### 3b. Button core types: Add loading
**File**: `packages/core/button/types.ts`

**No change needed** - `loading` is already in ButtonBaseProps. Verify it matches:

```typescript
export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean; // ✓ Already present
}
```

---

### 3c. Dialog core types: Add ARIA attributes
**File**: `packages/core/dialog/types.ts`

**REPLACE entire file** with:

```typescript
export interface DialogBaseProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}
```

---

### 3d. Avatar: Improve alt/aria-label priority
**File**: `packages/react/avatar/Avatar.tsx`

**REPLACE entire file** with:

```tsx
import React, { forwardRef, useState } from "react";
import "./avatar.css";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: AvatarSize;
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ size = "md", src, alt = "", fallback, className, ...rest }, ref) => {
    const [imgError, setImgError] = useState(false);
    const showImage = src && !imgError;

    const classes = [
      "orbi-avatar",
      `orbi-avatar--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Prefer alt text over aria-label prop
    const ariaLabel = alt || rest["aria-label"];

    return (
      <span 
        ref={ref} 
        className={classes} 
        role="img" 
        aria-label={ariaLabel || undefined} 
        {...rest}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt}
            className="orbi-avatar__image"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="orbi-avatar__fallback" aria-hidden="true">
            {fallback}
          </span>
        )}
      </span>
    );
  }
);

Avatar.displayName = "Avatar";
```

**Key change**: `const ariaLabel = alt || rest["aria-label"];` ensures alt text takes priority.

---

## VERIFICATION STEPS

After applying all fixes:

```bash
# 1. Type check
pnpm run type-check

# 2. Run tests
pnpm run test:unit --run

# 3. Build
pnpm run build

# 4. Verify packages
cd packages/react && pnpm pack --dry-run | grep -E "\\.(js|d\\.ts|css)$"
cd ../core && pnpm pack --dry-run | grep -E "\\.(js|d\\.ts)$"
cd ../tokens && pnpm pack --dry-run | grep -E "\\.(js|css|json)$"
```

---

## EXPECTED OUTCOMES

After Priority 1 + 2 implementation:

✅ All ARIA attributes specified correctly  
✅ Focus management working (keyboard navigation)  
✅ Focus trap in Dialog prevents escape  
✅ Focus restoration when Dialog closes  
✅ All native accessibility APIs used (no ARIA when native sufficient)  
✅ Build succeeds with no type errors  
✅ All tests pass  
✅ Packages contain only necessary files  

---

## ROLLBACK INSTRUCTIONS (if needed)

Each change is isolated and can be reverted:  
- CSS changes can be removed from button.css
- Dialog can be reverted to original from git history
- ARIA attributes can be removed from type definitions
- No breaking changes; only additive/refinement
