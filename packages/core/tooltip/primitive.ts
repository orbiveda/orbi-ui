// packages/core/tooltip/primitive.ts

import { TooltipBaseProps } from "./types";

export interface TooltipPrimitiveResult {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  placement: string;
}

export function createTooltipPrimitive(
  props: TooltipBaseProps,
  internalState: boolean,
  setInternalState: (value: boolean) => void
): TooltipPrimitiveResult {
  const { open: controlledOpen, onOpenChange, placement = "top" } = props;

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalState;

  function setOpenState(value: boolean) {
    if (!isControlled) {
      setInternalState(value);
    }
    onOpenChange?.(value);
  }

  return {
    isOpen,
    open: () => setOpenState(true),
    close: () => setOpenState(false),
    toggle: () => setOpenState(!isOpen),
    placement,
  };
}
