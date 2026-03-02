// packages/core/stack/primitive.ts

import { StackBaseProps } from "./types";

export interface StackPrimitiveResult {
  direction: "vertical" | "horizontal";
  gap: StackBaseProps["gap"];
}

export function createStackPrimitive(
  props: StackBaseProps
): StackPrimitiveResult {
  const { direction = "vertical", gap = "md" } = props;

  return {
    direction,
    gap,
  };
}