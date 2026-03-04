// packages/core/switch/primitive.ts

import { SwitchBaseProps } from "./types";

export interface SwitchPrimitiveResult {
  isChecked: boolean;
  toggle: () => void;
}

export function createSwitchPrimitive(
  props: SwitchBaseProps,
  internalState: boolean,
  setInternalState: (value: boolean) => void
): SwitchPrimitiveResult {
  const { checked: controlledChecked, onCheckedChange } = props;

  const isControlled = controlledChecked !== undefined;
  const isChecked = isControlled ? controlledChecked : internalState;

  function setCheckedState(value: boolean) {
    if (!isControlled) {
      setInternalState(value);
    }
    onCheckedChange?.(value);
  }

  return {
    isChecked,
    toggle: () => setCheckedState(!isChecked),
  };
}
