// packages/core/tabs/primitive.ts

import { TabsBaseProps } from "./types";

export interface TabsPrimitiveResult {
  value: string;
  selectTab: (value: string) => void;
  orientation: "horizontal" | "vertical";
}

export function createTabsPrimitive(
  props: TabsBaseProps,
  internalState: string,
  setInternalState: (value: string) => void
): TabsPrimitiveResult {
  const { value: controlledValue, onValueChange, orientation = "horizontal" } = props;

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalState;

  function selectTabState(newValue: string) {
    if (!isControlled) {
      setInternalState(newValue);
    }
    onValueChange?.(newValue);
  }

  return {
    value,
    selectTab: selectTabState,
    orientation,
  };
}
