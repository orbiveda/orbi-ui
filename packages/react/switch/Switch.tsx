// packages/react/switch/Switch.tsx

import React, { forwardRef, useState } from "react";
import { SwitchBaseProps, createSwitchPrimitive } from "@orbi/core";
import "./switch.css";

export interface SwitchProps
  extends SwitchBaseProps,
    Omit<React.HTMLAttributes<HTMLButtonElement>, "onChange"> {}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked,
      defaultChecked = false,
      onCheckedChange,
      disabled = false,
      className,
      "aria-label": ariaLabel = "Toggle switch",
      ...rest
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked);

    const primitive = createSwitchPrimitive(
      { checked, defaultChecked, onCheckedChange },
      internalChecked,
      setInternalChecked
    );

    const classes = [
      "orbi-switch",
      primitive.isChecked && "orbi-switch--checked",
      disabled && "orbi-switch--disabled",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        type="button"
        className={classes}
        role="switch"
        aria-checked={primitive.isChecked}
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={primitive.toggle}
        {...rest}
      >
        <span className="orbi-switch-thumb" />
      </button>
    );
  }
);

Switch.displayName = "Switch";
