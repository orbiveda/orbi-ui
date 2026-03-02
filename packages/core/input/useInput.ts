// packages/core/input/useInput.ts

import { InputBaseProps } from "./types";
import { createInputPrimitive } from "./primitive";

export function useInput(props: InputBaseProps) {
  return createInputPrimitive(props);
}