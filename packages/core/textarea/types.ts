// packages/core/textarea/types.ts

export interface TextareaBaseProps {
  variant?: "default" | "outlined";
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  placeholder?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
}
