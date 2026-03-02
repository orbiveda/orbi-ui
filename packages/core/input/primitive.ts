// packages/core/input/primitive.ts

import { InputBaseProps } from "./types";

export interface InputPrimitiveResult {
  "data-orbi-input": boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
}

export function createInputPrimitive(
  props: InputBaseProps
): InputPrimitiveResult {
  const { disabled = false, readOnly = false, required = false } = props;

  return {
    "data-orbi-input": true,
    disabled,
    readOnly,
    required,
  };
}