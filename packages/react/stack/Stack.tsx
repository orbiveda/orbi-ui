import React, { forwardRef } from "react";
import { useStack, StackBaseProps } from "@orbi/core";
import "./stack.css";

interface StackProps
  extends StackBaseProps,
    React.HTMLAttributes<HTMLDivElement> {}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ direction, gap, className, children, ...rest }, ref) => {
    const { direction: finalDirection, gap: finalGap } = useStack({
      direction,
      gap,
    });

    const classes = [
      "orbi-stack",
      `orbi-stack--${finalDirection}`,
      `orbi-stack--gap-${finalGap}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    );
  }
);

Stack.displayName = "Stack";