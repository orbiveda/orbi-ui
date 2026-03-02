import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders children correctly", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeDefined();
  });

  it("applies className correctly", () => {
    render(<Badge className="custom-class">Test</Badge>);
    const badge = screen.getByText("Test");
    expect(badge.className.includes("orbi-badge")).toBe(true);
    expect(badge.className.includes("custom-class")).toBe(true);
  });

  it("applies default primary variant", () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText("Default");
    expect(badge.className.includes("orbi-badge--primary")).toBe(true);
  });

  it("applies variant class correctly", () => {
    render(<Badge variant="error">Error</Badge>);
    const badge = screen.getByText("Error");
    expect(badge.className.includes("orbi-badge--error")).toBe(true);
  });

  it("forwards ref correctly", () => {
    const ref = { current: null as HTMLSpanElement | null };
    render(<Badge ref={ref}>Ref</Badge>);
    expect(ref.current).toBeDefined();
    expect(ref.current?.tagName).toBe("SPAN");
  });
});
