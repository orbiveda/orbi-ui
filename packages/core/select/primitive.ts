// packages/core/select/primitive.ts

import { SelectBaseProps } from "./types";

export interface SelectPrimitiveResult {
  value: string;
  setValue: (value: string) => void;
}

export function createSelectPrimitive(
  props: SelectBaseProps,
  internalState: string,
  setInternalState: (value: string) => void
): SelectPrimitiveResult {
  const { value: controlledValue, onValueChange } = props;

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalState;

  function setValueState(newValue: string) {
    if (!isControlled) {
      setInternalState(newValue);
    }
    onValueChange?.(newValue);
  }

  return {
    value,
    setValue: setValueState,
  };
}
