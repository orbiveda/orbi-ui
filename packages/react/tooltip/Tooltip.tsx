// packages/react/tooltip/Tooltip.tsx

import React, { 
  forwardRef, 
  useState, 
  useRef, 
  useEffect, 
  ReactNode, 
  useCallback 
} from "react";
import { createPortal } from "react-dom";
import { TooltipBaseProps, createTooltipPrimitive } from "@orbi/core";
import "./tooltip.css";

export interface TooltipProps extends TooltipBaseProps {
  children: ReactNode;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      open,
      defaultOpen = false,
      onOpenChange,
      placement = "top",
      delay = 200,
      disabled = false,
      children,
      ...rest
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const delayTimeoutRef = useRef<NodeJS.Timeout>();

    const primitive = createTooltipPrimitive(
      { open, defaultOpen, onOpenChange, placement, disabled, content },
      internalOpen,
      setInternalOpen
    );

    // Calculate tooltip position
    const calculatePosition = useCallback(() => {
      if (!triggerRef.current || !tooltipRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const gap = 8; // gap between trigger and tooltip

      let top = 0;
      let left = 0;

      switch (placement) {
        case "top":
          top = triggerRect.top - tooltipRect.height - gap;
          left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
          break;
        case "bottom":
          top = triggerRect.bottom + gap;
          left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
          break;
        case "left":
          top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
          left = triggerRect.left - tooltipRect.width - gap;
          break;
        case "right":
          top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
          left = triggerRect.right + gap;
          break;
      }

      // Clamp to viewport
      const maxLeft = window.innerWidth - tooltipRect.width - 10;
      left = Math.max(10, Math.min(left, maxLeft));

      setTooltipPos({ top, left });
    }, [placement]);

    // Show tooltip with optional delay
    const handleShow = useCallback(() => {
      if (disabled) return;

      if (delay > 0) {
        delayTimeoutRef.current = setTimeout(() => {
          primitive.open();
        }, delay);
      } else {
        primitive.open();
      }
    }, [primitive, delay, disabled]);

    // Hide tooltip
    const handleHide = useCallback(() => {
      if (delayTimeoutRef.current) {
        clearTimeout(delayTimeoutRef.current);
      }
      primitive.close();
    }, [primitive]);

    // Handle keyboard
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        handleHide();
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        primitive.toggle();
      }
    };

    // Position tooltip when it opens
    useEffect(() => {
      if (primitive.isOpen) {
        // Use next frame to ensure tooltip is rendered
        requestAnimationFrame(calculatePosition);
      }
    }, [primitive.isOpen, calculatePosition]);

    // Reposition on window resize
    useEffect(() => {
      if (!primitive.isOpen) return;

      const handleResize = () => {
        calculatePosition();
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [primitive.isOpen, calculatePosition]);

    // Close tooltip when clicking outside
    useEffect(() => {
      if (!primitive.isOpen) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (!triggerRef.current?.contains(e.target as Node) && 
            !tooltipRef.current?.contains(e.target as Node)) {
          handleHide();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [primitive.isOpen, handleHide]);

    return (
      <>
        <div
          ref={triggerRef}
          className="orbi-tooltip-trigger"
          onMouseEnter={handleShow}
          onMouseLeave={handleHide}
          onFocus={handleShow}
          onBlur={handleHide}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          {...rest}
        >
          {children}
        </div>

        {primitive.isOpen &&
          createPortal(
            <div
              ref={tooltipRef}
              className={`orbi-tooltip orbi-tooltip--${placement}`}
              role="tooltip"
              style={{
                position: "fixed",
                top: `${tooltipPos.top}px`,
                left: `${tooltipPos.left}px`,
                zIndex: 1000,
              }}
            >
              <div className="orbi-tooltip-content">{content}</div>
              <div className={`orbi-tooltip-arrow`} />
            </div>,
            document.body
          )}
      </>
    );
  }
);

Tooltip.displayName = "Tooltip";
