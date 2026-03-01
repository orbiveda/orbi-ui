// packages/core/button/useButton.ts

import { ButtonBaseProps } from "./types";
import { createButtonPrimitive } from "./primitive";

export function useButton(props: ButtonBaseProps) {
  return createButtonPrimitive(props);
}