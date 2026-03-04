// packages/react/tabs/TabsContext.ts

import { createContext, useContext } from "react";

export interface TabsContextType {
  value: string;
  selectTab: (value: string) => void;
  orientation: "horizontal" | "vertical";
}

export const TabsContext = createContext<TabsContextType | undefined>(undefined);

export function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs sub-components must be used within Tabs");
  }
  return context;
}
