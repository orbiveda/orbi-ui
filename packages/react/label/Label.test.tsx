import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Label } from "./Label";
import { assertAccessible } from "../test/utils/a11y";

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

  // Accessibility tests
  it("has no accessibility violations", async () => {
    const { container } = render(<Label>Label Text</Label>);
    await assertAccessible(container);
  });

  it("has no violations when associated with input", async () => {
    const { container } = render(
      <div>
        <Label htmlFor="test-input">Input Label</Label>
        <input id="test-input" />
      </div>
    );
    await assertAccessible(container);
  });

  it("has no violations with required indicator", async () => {
    const { container } = render(
      <div>
        <Label htmlFor="password" required>Password</Label>
        <input id="password" type="password" />
      </div>
    );
    await assertAccessible(container);
  });

  it("has proper semantic structure with form elements", async () => {
    const { container } = render(
      <form>
        <Label htmlFor="email">Email Address</Label>
        <input id="email" type="email" />
        <Label htmlFor="password">Password</Label>
        <input id="password" type="password" />
      </form>
    );
    await assertAccessible(container);
  });
});