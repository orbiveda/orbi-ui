"use client";
// packages/react/dialog/Dialog.tsx

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