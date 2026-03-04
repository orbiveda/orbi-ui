// packages/core/switch/useSwitch.ts

import { SwitchBaseProps } from "./types";
import { createSwitchPrimitive } from "./primitive";

export function useSwitch(props: SwitchBaseProps) {
  return createSwitchPrimitive(props, false, () => {});
}
