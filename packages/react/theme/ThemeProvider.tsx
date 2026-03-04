"use client";
import React, { useEffect } from "react";

export type OrbiTheme = "light" | "dark";

interface ThemeProviderProps {
  theme: OrbiTheme;
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme,
  children,
}) => {
  useEffect(() => {
    document.documentElement.setAttribute("data-orbi-theme", theme);
  }, [theme]);

  return <>{children}</>;
};