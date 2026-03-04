// packages/core/progress/types.ts

export interface ProgressBaseProps {
  value: number; // 0-100
  max?: number;
  min?: number;
  label?: string;
  variant?: "default" | "success" | "warning" | "error";
  "aria-label"?: string;
  "aria-labelledby"?: string;
}
