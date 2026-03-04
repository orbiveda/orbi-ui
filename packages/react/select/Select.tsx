"use client";
// packages/react/select/Select.tsx

import React, { forwardRef, useState } from "react";
import { SelectBaseProps, createSelectPrimitive } from "@orbi/core";
import "./select.css";

export interface SelectProps
  extends Omit<SelectBaseProps, "onValueChange">,
  Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "value" | "defaultValue">,
  Pick<SelectBaseProps, "onValueChange"> {
  children: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      value,
      defaultValue = "",
      onValueChange,
      disabled = false,
      required = false,
      className,
      children,
      "aria-label": ariaLabel = "Select option",
      ...rest
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);

    const primitive = createSelectPrimitive(
      { value, defaultValue, onValueChange },
      internalValue,
      setInternalValue
    );

    const classes = [
      "orbi-select",
      disabled && "orbi-select--disabled",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
      primitive.setValue(e.target.value);
    }

    return (
      <select
        ref={ref}
        className={classes}
        value={primitive.value}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        aria-label={ariaLabel}
        {...rest}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = "Select";
