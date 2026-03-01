// packages/react/button/Button.tsx

import React, { forwardRef } from "react";
import { useButton, ButtonBaseProps } from "@orbi/core";
import "./button.css";

interface ButtonProps
  extends ButtonBaseProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      disabled,
      loading,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const primitiveProps = useButton({
      variant,
      size,
      disabled,
      loading,
    });

    const classes = [
      "orbi-button",
      `orbi-button--${size}`,
      `orbi-button--${variant}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} className={classes} {...primitiveProps} {...rest}>
        {loading ? "Loading..." : children}
      </button>
    );
  }
);

Button.displayName = "Button";