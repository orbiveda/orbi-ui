import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Input } from "./Input";
import { assertAccessible } from "../test/utils/a11y";

describe("Input", () => {
  it("renders input element", () => {
    render(<Input placeholder="Test" />);
    expect(screen.getByPlaceholderText("Test")).toBeDefined();
  });

  it("disables when disabled prop is true", () => {
    render(<Input disabled placeholder="Disabled" />);
    const input = screen.getByPlaceholderText("Disabled") as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it("applies base class", () => {
    render(<Input placeholder="Styled" />);
    const input = screen.getByPlaceholderText("Styled");
    expect(input.className.includes("orbi-input")).toBe(true);
  });

  // Accessibility tests
  it("has no accessibility violations", async () => {
    const { container } = render(<Input placeholder="Enter text" />);
    await assertAccessible(container);
  });

  it("has no violations when disabled", async () => {
    const { container } = render(<Input disabled placeholder="Disabled" />);
    await assertAccessible(container);
  });

  it("has no violations with label", async () => {
    const { container } = render(
      <div>
        <label htmlFor="test-input">Label</label>
        <Input id="test-input" placeholder="Input" />
      </div>
    );
    await assertAccessible(container);
  });
});