"use client";
// packages/react/tabs/TabsContent.tsx

import React, { forwardRef } from "react";
import { useTabsContext } from "./TabsContext";

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, className, ...rest }, ref) => {
    const { value: selectedValue } = useTabsContext();
    const isSelected = value === selectedValue;

    if (!isSelected) {
      return null;
    }

    const classes = ["orbi-tabs-content", className].filter(Boolean).join(" ");

    return (
      <div
        ref={ref}
        className={classes}
        role="tabpanel"
        id={`tab-content-${value}`}
        aria-labelledby={`tab-trigger-${value}`}
        {...rest}
      />
    );
  }
);

TabsContent.displayName = "TabsContent";
