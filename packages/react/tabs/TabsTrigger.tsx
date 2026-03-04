"use client";
// packages/react/tabs/TabsTrigger.tsx

import React, { forwardRef, useRef, useEffect, useCallback } from "react";
import { useTabsContext } from "./TabsContext";

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, disabled = false, className, onClick, ...rest }, ref) => {
    const { value: selectedValue, selectTab, orientation } = useTabsContext();
    const isSelected = value === selectedValue;
    const internalRef = useRef<HTMLButtonElement>(null);

    // Set external ref when internal ref changes
    useEffect(() => {
      if (typeof ref === "function") {
        ref(internalRef.current);
      } else if (ref) {
        (ref as any).current = internalRef.current;
      }
    }, [ref]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      selectTab(value);
      onClick?.(e);
    };

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
      const trigger = internalRef.current;
      if (!trigger?.parentElement) return;

      const triggers = Array.from(
        trigger.parentElement.querySelectorAll('[role="tab"]')
      );
      const currentIndex = triggers.indexOf(trigger);

      let targetIndex = -1;

      if (orientation === "horizontal") {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          targetIndex = (currentIndex + 1) % triggers.length;
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          targetIndex = (currentIndex - 1 + triggers.length) % triggers.length;
        }
      } else {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          targetIndex = (currentIndex + 1) % triggers.length;
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          targetIndex = (currentIndex - 1 + triggers.length) % triggers.length;
        }
      }

      if (targetIndex !== -1) {
        const targetTrigger = triggers[targetIndex] as HTMLButtonElement;
        targetTrigger?.focus();
      }
    }, [orientation]);

    const classes = [
      "orbi-tabs-trigger",
      isSelected && "orbi-tabs-trigger--active",
      disabled && "orbi-tabs-trigger--disabled",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={internalRef}
        type="button"
        className={classes}
        role="tab"
        aria-selected={isSelected}
        aria-controls={`tab-content-${value}`}
        disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...rest}
      />
    );
  }
);

TabsTrigger.displayName = "TabsTrigger";
