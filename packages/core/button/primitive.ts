// packages/core/button/primitive.ts

import { ButtonBaseProps } from "./types";

export interface ButtonPrimitiveResult {
  "data-orbi-button": boolean;
  "aria-disabled"?: boolean;
  "aria-busy"?: boolean;
  disabled?: boolean;
}

export function createButtonPrimitive(
  props: ButtonBaseProps
): ButtonPrimitiveResult {
  const { disabled = false, loading = false } = props;

  return {
    "data-orbi-button": true,
    "aria-busy": loading ? true : undefined,
    disabled: disabled || loading,
  };
}