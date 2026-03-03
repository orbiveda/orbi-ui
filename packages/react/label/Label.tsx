import React, { forwardRef } from "react";
import { useLabel, LabelBaseProps } from "@orbi/core";
import "./label.css";

interface LabelProps
  extends LabelBaseProps,
    React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ required, className, children, ...rest }, ref) => {
    const { required: isRequired } = useLabel({ required });

    const classes = ["orbi-label", className]
      .filter(Boolean)
      .join(" ");

    return (
      <label 
        ref={ref} 
        className={classes}
        aria-required={isRequired || undefined}
        {...rest}
      >
        {children}
        {isRequired && (
          <span className="orbi-label-required">*</span>
        )}
      </label>
    );
  }
);

Label.displayName = "Label";