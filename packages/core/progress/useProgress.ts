// packages/core/progress/useProgress.ts

import { ProgressBaseProps } from "./types";
import { createProgressPrimitive } from "./primitive";

export function useProgress(props: ProgressBaseProps) {
  return createProgressPrimitive(props);
}
