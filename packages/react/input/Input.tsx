import React, { forwardRef } from "react";
import { useInput, InputBaseProps } from "@orbi/core";
import "./input.css";

interface InputProps
  extends InputBaseProps,
    React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ disabled, readOnly, required, className, ...rest }, ref) => {
    const primitiveProps = useInput({
      disabled,
      readOnly,
      required,
    });

    const classes = ["orbi-input", className]
      .filter(Boolean)
      .join(" ");

    return (
      <input
        ref={ref}
        className={classes}
        {...primitiveProps}
        {...rest}
      />
    );
  }
);

Input.displayName = "Input";