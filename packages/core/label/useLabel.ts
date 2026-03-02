import { LabelBaseProps } from "./types";
import { createLabelPrimitive } from "./primitive";

export function useLabel(props: LabelBaseProps) {
  return createLabelPrimitive(props);
}