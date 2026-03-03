import React, { forwardRef } from "react";
import "./divider.css";

export type DividerOrientation = "horizontal" | "vertical";

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: DividerOrientation;
}

export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  ({ orientation = "horizontal", className, ...rest }, ref) => {
    const classes = [
      "orbi-divider",
      `orbi-divider--${orientation}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <hr
        ref={ref}
        className={classes}
        role="separator"
        {...rest}
      />
    );
  }
);

Divider.displayName = "Divider";
