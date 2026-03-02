import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Input } from "./Input";

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
});