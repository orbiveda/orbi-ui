// packages/core/select/useSelect.ts

import { SelectBaseProps } from "./types";
import { createSelectPrimitive } from "./primitive";

export function useSelect(props: SelectBaseProps) {
  return createSelectPrimitive(props, "", () => {});
}
