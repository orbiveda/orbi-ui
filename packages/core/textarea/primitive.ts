// packages/core/textarea/primitive.ts

import { TextareaBaseProps } from "./types";

export interface TextareaPrimitiveResult {
  variant: "default" | "outlined";
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
}

export function createTextareaPrimitive(
  props: TextareaBaseProps
): TextareaPrimitiveResult {
  return {
    variant: props.variant || "default",
    disabled: props.disabled || false,
    readOnly: props.readOnly || false,
    required: props.required || false,
  };
}
