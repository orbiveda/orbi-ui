// packages/core/switch/types.ts

export interface SwitchBaseProps {
  checked?: boolean; // controlled
  defaultChecked?: boolean; // uncontrolled
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  "aria-label"?: string;
  "aria-describedby"?: string;
}
