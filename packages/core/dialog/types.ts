// packages/core/dialog/types.ts

export interface DialogBaseProps {
  open?: boolean; // controlled
  defaultOpen?: boolean; // uncontrolled
  onOpenChange?: (open: boolean) => void;
}