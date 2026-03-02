// packages/core/dialog/primitive.ts

import { DialogBaseProps } from "./types";

export interface DialogPrimitiveResult {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export function createDialogPrimitive(
  props: DialogBaseProps,
  internalState: boolean,
  setInternalState: (value: boolean) => void
): DialogPrimitiveResult {
  const { open: controlledOpen, onOpenChange } = props;

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
  };
}