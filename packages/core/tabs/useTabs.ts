// packages/core/tabs/useTabs.ts

import { TabsBaseProps } from "./types";
import { createTabsPrimitive } from "./primitive";

export function useTabs(props: TabsBaseProps) {
  return createTabsPrimitive(props, "", () => {});
}
