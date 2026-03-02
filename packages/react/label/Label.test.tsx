import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Label } from "./Label";

describe("Label", () => {
  it("renders children", () => {
    render(<Label>Username</Label>);
    expect(screen.getByText("Username")).toBeDefined();
  });

  it("renders required indicator when required", () => {
    render(<Label required>Password</Label>);
    expect(screen.getByText("*")).toBeDefined();
  });

  it("forwards htmlFor attribute", () => {
    render(<Label htmlFor="input-id">Email</Label>);
    const label = screen.getByText("Email");
    expect(label.getAttribute("for")).toBe("input-id");
  });
});