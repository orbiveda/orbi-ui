import React, { forwardRef } from "react";
import "./badge.css";

export type BadgeVariant = "primary" | "secondary" | "success" | "warning" | "error";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "primary", className, children, ...rest }, ref) => {
    const classes = [
      "orbi-badge",
      `orbi-badge--${variant}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <span ref={ref} className={classes} {...rest}>
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
