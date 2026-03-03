import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "./Button";
import { assertAccessible } from "../test/utils/a11y";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeDefined();
  });

  it("applies variant class", () => {
    render(<Button variant="secondary">Test</Button>);
    const button = screen.getByText("Test");
    expect(button.className.includes("secondary")).toBe(true);
  });

  it("disables when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByText("Disabled") as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  it("shows loading text when loading", () => {
    render(<Button loading>Load</Button>);
    expect(screen.getByText("Loading...")).toBeDefined();
  });

  // Accessibility tests
  it("has no accessibility violations", async () => {
    const { container } = render(<Button>Click Me</Button>);
    await assertAccessible(container);
  });

  it("has no violations when disabled", async () => {
    const { container } = render(<Button disabled>Disabled</Button>);
    await assertAccessible(container);
  });
});