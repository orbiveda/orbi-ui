// packages/core/tooltip/types.ts

export type TooltipPlacement = 
  | "top" 
  | "bottom" 
  | "left" 
  | "right" 
  | "auto";

export interface TooltipBaseProps {
  content: string | React.ReactNode;
  open?: boolean; // controlled
  defaultOpen?: boolean; // uncontrolled
  onOpenChange?: (open: boolean) => void;
  placement?: TooltipPlacement;
  delay?: number;
  disabled?: boolean;
  "aria-label"?: string;
}
