// vitest.setup.ts
import "@testing-library/jest-dom";
import React from "react";
import ReactDOM from "react-dom";

// Configure React Act environment
declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean;
}

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

// Force React to initialize properly in jsdom by creating a temporary root
// This ensures React's fiber context is properly set up before tests run
try {
  const tempContainer = document.createElement("div");
  const root = (ReactDOM as any).createRoot(tempContainer);
  root.unmount();
  tempContainer.remove();
} catch (e) {
  // Ignore errors in setup
}
