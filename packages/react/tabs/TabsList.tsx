// packages/react/tabs/TabsList.tsx

import React, { forwardRef } from "react";
import { useTabsContext } from "./TabsContext";

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, ...rest }, ref) => {
    const { orientation } = useTabsContext();

    const classes = [
      "orbi-tabs-list",
      `orbi-tabs-list--${orientation}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        ref={ref}
        className={classes}
        role="tablist"
        aria-orientation={orientation}
        {...rest}
      />
    );
  }
);

TabsList.displayName = "TabsList";
