// packages/core/progress/primitive.ts

import { ProgressBaseProps } from "./types";

export interface ProgressPrimitiveResult {
  value: number;
  percentage: number;
  variant: "default" | "success" | "warning" | "error";
}

export function createProgressPrimitive(
  props: ProgressBaseProps
): ProgressPrimitiveResult {
  const { value, max = 100, variant = "default" } = props;

  // Clamp value between 0 and max
  const clampedValue = Math.max(0, Math.min(value, max));
  const percentage = (clampedValue / max) * 100;

  return {
    value: clampedValue,
    percentage,
    variant,
  };
}
