// packages/react/switch/Switch.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { Switch } from "./Switch";
import { runAxe, expectNoAxeViolations } from "../test/utils/a11y";

describe("Switch", () => {
  it("renders with aria-checked", () => {
    render(<Switch />);
    const switchButton = screen.getByRole("switch");
    expect(switchButton.getAttribute("aria-checked")).toBe("false");
  });

  it("applies checked class when checked", () => {
    render(<Switch defaultChecked={true} />);
    const switchButton = screen.getByRole("switch");
    expect(switchButton.className).toContain("orbi-switch--checked");
  });

  it("disables when disabled prop is true", () => {
    render(<Switch disabled />);
    const switchButton = screen.getByRole("switch") as HTMLButtonElement;
    expect(switchButton.disabled).toBe(true);
  });

  it("supports keyboard interaction (Space)", async () => {
    render(<Switch />);
    const switchButton = screen.getByRole("switch") as HTMLButtonElement;
    
    switchButton.focus();
    await userEvent.keyboard(" ");
    expect(switchButton.getAttribute("aria-checked")).toBe("true");
  });

  // Accessibility tests
  it("has no accessibility violations", async () => {
    const { container } = render(<Switch aria-label="Dark mode" />);
    const results = await runAxe(container);
    expectNoAxeViolations(results);
  });

  it("has no violations when checked", async () => {
    const { container } = render(<Switch defaultChecked={true} aria-label="Dark mode" />);
    const results = await runAxe(container);
    expectNoAxeViolations(results);
  });

  it("has no violations when disabled", async () => {
    const { container } = render(<Switch disabled aria-label="Dark mode" />);
    const results = await runAxe(container);
    expectNoAxeViolations(results);
  });
});
