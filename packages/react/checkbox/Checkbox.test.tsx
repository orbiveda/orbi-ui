import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renders correctly", () => {
    render(<Checkbox data-testid="checkbox" />);
    expect(screen.getByTestId("checkbox")).toBeDefined();
  });

  it("applies className correctly", () => {
    render(<Checkbox data-testid="checkbox" className="custom-class" />);
    const checkbox = screen.getByTestId("checkbox");
    expect(checkbox.className.includes("orbi-checkbox")).toBe(true);
    expect(checkbox.className.includes("custom-class")).toBe(true);
  });

  it("handles change events", () => {
    const handleChange = vi.fn();
    render(<Checkbox data-testid="checkbox" onChange={handleChange} />);
    const checkbox = screen.getByTestId("checkbox") as HTMLInputElement;
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(checkbox.checked).toBe(true);
  });

  it("supports disabled state with accessibility", () => {
    render(<Checkbox data-testid="checkbox" disabled />);
    const checkbox = screen.getByTestId("checkbox") as HTMLInputElement;
    expect(checkbox.disabled).toBe(true);
    expect(checkbox.className.includes("orbi-checkbox--disabled")).toBe(true);
  });

  it("forwards ref correctly", () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<Checkbox ref={ref} />);
    expect(ref.current).toBeDefined();
    expect(ref.current?.tagName).toBe("INPUT");
    expect(ref.current?.type).toBe("checkbox");
  });
});
