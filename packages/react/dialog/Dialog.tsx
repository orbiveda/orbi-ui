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
}

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  ({ open, defaultOpen = false, onOpenChange, children }, ref) => {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);

    const primitive = createDialogPrimitive(
      { open, defaultOpen, onOpenChange },
      internalOpen,
      setInternalOpen
    );

    const overlayRef = useRef<HTMLDivElement>(null);

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
          ref={ref}
          className="orbi-dialog-content"
        >
          {children}
        </div>
      </div>,
      document.body
    );
  }
);

Dialog.displayName = "Dialog";