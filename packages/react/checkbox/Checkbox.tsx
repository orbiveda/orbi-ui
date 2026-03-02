import React, { forwardRef } from "react";
import "./checkbox.css";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> { }

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, disabled, ...rest }, ref) => {
    const classes = [
      "orbi-checkbox",
      disabled && "orbi-checkbox--disabled",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <input
        ref={ref}
        type="checkbox"
        className={classes}
        disabled={disabled}
        aria-disabled={disabled || undefined}
        {...rest}
      />
    );
  }
);

Checkbox.displayName = "Checkbox";
