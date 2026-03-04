// packages/core/textarea/useTextarea.ts

import { TextareaBaseProps } from "./types";
import { createTextareaPrimitive } from "./primitive";

export function useTextarea(props: TextareaBaseProps) {
  return createTextareaPrimitive(props);
}
