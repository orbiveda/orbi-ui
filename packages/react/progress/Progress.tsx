// packages/react/progress/Progress.tsx

import React, { forwardRef } from "react";
import { ProgressBaseProps, useProgress } from "@orbi/core";
import "./progress.css";

export interface ProgressProps
  extends ProgressBaseProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      max = 100,
      variant = "default",
      label,
      className,
      "aria-label": ariaLabel,
      ...rest
    },
    ref
  ) => {
    const primitive = useProgress({
      value,
      max,
      variant,
      label,
    });

    const classes = [
      "orbi-progress",
      `orbi-progress--${primitive.variant}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classes} {...rest}>
        <div
          className="orbi-progress-bar"
          role="progressbar"
          aria-valuenow={primitive.value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label || ariaLabel || "Progress"}
          style={{
            width: `${primitive.percentage}%`,
          }}
        />
        {label && <span className="orbi-progress-label">{label}</span>}
      </div>
    );
  }
);

Progress.displayName = "Progress";
