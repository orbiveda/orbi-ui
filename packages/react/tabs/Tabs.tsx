// packages/react/tabs/Tabs.tsx

import React, { forwardRef, useState, ReactNode, useMemo } from "react";
import { TabsBaseProps, createTabsPrimitive } from "@orbi/core";
import { TabsContext } from "./TabsContext";
import "./tabs.css";

export interface TabsProps
  extends Omit<TabsBaseProps, "onValueChange">,
    Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue">,
    Pick<TabsBaseProps, "onValueChange"> {
  children: ReactNode;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      value,
      defaultValue = "",
      onValueChange,
      orientation = "horizontal",
      disabled = false,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);

    const primitive = createTabsPrimitive(
      { value, defaultValue, onValueChange, orientation, disabled },
      internalValue,
      setInternalValue
    );

    const contextValue = useMemo(
      () => ({
        value: primitive.value,
        selectTab: primitive.selectTab,
        orientation: primitive.orientation,
      }),
      [primitive]
    );

    const classes = [
      "orbi-tabs",
      `orbi-tabs--${primitive.orientation}`,
      disabled && "orbi-tabs--disabled",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <TabsContext.Provider value={contextValue}>
        <div ref={ref} className={classes} {...rest}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = "Tabs";
