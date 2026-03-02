// packages/core/stack/types.ts

export type StackDirection = "vertical" | "horizontal";

export type StackGap = "xs" | "sm" | "md" | "lg" | "xl";

export interface StackBaseProps {
  direction?: StackDirection;
  gap?: StackGap;
}