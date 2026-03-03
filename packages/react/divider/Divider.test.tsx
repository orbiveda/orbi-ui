import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Divider } from "./Divider";
import { assertAccessible } from "../test/utils/a11y";

describe("Divider", () => {
  it("renders correctly with default horizontal orientation", () => {
    render(<Divider data-testid="divider" />);
    const divider = screen.getByTestId("divider");
    expect(divider).toBeDefined();
    expect(divider.getAttribute("role")).toBe("separator");
    expect(divider.getAttribute("aria-orientation")).toBe("horizontal");
    expect(divider.className.includes("orbi-divider--horizontal")).toBe(true);
  });

  it("applies vertical orientation correctly", () => {
    render(<Divider data-testid="divider" orientation="vertical" />);
    const divider = screen.getByTestId("divider");
    expect(divider.getAttribute("aria-orientation")).toBe("vertical");
    expect(divider.className.includes("orbi-divider--vertical")).toBe(true);
  });

  it("applies className correctly", () => {
    render(<Divider data-testid="divider" className="custom-class" />);
    const divider = screen.getByTestId("divider");
    expect(divider.className.includes("orbi-divider")).toBe(true);
    expect(divider.className.includes("custom-class")).toBe(true);
  });

  it("forwards ref correctly", () => {
    const ref = { current: null as HTMLHRElement | null };
    render(<Divider ref={ref} />);
    expect(ref.current).toBeDefined();
    expect(ref.current?.tagName).toBe("HR");
  });

  // Accessibility tests
  it("has no violations horizontal default", async () => {
    const { container } = render(<Divider />);
    await assertAccessible(container);
  });

  it("has no violations vertical orientation", async () => {
    const { container } = render(<Divider orientation="vertical" />);
    await assertAccessible(container);
  });
});
