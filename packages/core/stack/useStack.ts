// packages/core/stack/useStack.ts

import { StackBaseProps } from "./types";
import { createStackPrimitive } from "./primitive";

export function useStack(props: StackBaseProps) {
  return createStackPrimitive(props);
}