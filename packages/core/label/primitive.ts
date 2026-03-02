import { LabelBaseProps } from "./types";

export interface LabelPrimitiveResult {
  required: boolean;
}

export function createLabelPrimitive(
  props: LabelBaseProps
): LabelPrimitiveResult {
  const { required = false } = props;

  return {
    required,
  };
}