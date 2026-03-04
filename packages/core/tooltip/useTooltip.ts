// packages/core/tooltip/useTooltip.ts

import { TooltipBaseProps } from "./types";
import { createTooltipPrimitive } from "./primitive";

export function useTooltip(props: TooltipBaseProps) {
  return createTooltipPrimitive(props, false, () => {});
}
