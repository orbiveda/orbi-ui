// packages/react/textarea/Textarea.tsx

import React, { forwardRef } from "react";
import { TextareaBaseProps, useTextarea } from "@orbi/core";
import "./textarea.css";

export interface TextareaProps
  extends TextareaBaseProps,
    Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "type"> {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      variant = "default",
      disabled,
      readOnly,
      required,
      className,
      rows = 4,
      "aria-label": ariaLabel = "Text input",
      ...rest
    },
    ref
  ) => {
    const primitiveProps = useTextarea({
      variant,
      disabled,
      readOnly,
      required,
    });

    const classes = [
      "orbi-textarea",
      `orbi-textarea--${primitiveProps.variant}`,
      primitiveProps.disabled && "orbi-textarea--disabled",
      primitiveProps.readOnly && "orbi-textarea--readonly",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <textarea
        ref={ref}
        className={classes}
        disabled={primitiveProps.disabled}
        readOnly={primitiveProps.readOnly}
        required={primitiveProps.required}
        rows={rows}
        aria-label={ariaLabel}
        {...rest}
      />
    );
  }
);

Textarea.displayName = "Textarea";
