import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Card } from "./Card";
import { assertAccessible } from "../test/utils/a11y";

describe("Card", () => {
  it("renders children correctly", () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText("Card Content")).toBeDefined();
  });

  it("applies className correctly", () => {
    render(<Card className="custom-class">Test</Card>);
    const card = screen.getByText("Test");
    expect(card.className.includes("orbi-card")).toBe(true);
    expect(card.className.includes("custom-class")).toBe(true);
  });

  it("forwards ref correctly", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Card ref={ref}>Ref Test</Card>);
    expect(ref.current).toBeDefined();
    expect(ref.current?.tagName).toBe("DIV");
  });

  it("passes through additional HTML attributes", () => {
    render(<Card data-testid="card" aria-label="Main card">Content</Card>);
    const card = screen.getByTestId("card");
    expect(card.getAttribute("aria-label")).toBe("Main card");
  });

  // Accessibility tests
  it("has no a11y violations in minimal state", async () => {
    const { container } = render(<Card>Accessible</Card>);
    await assertAccessible(container);
  });

  it("has no violations when using aria-label", async () => {
    const { container } = render(
      <Card aria-label="labelled card">Content</Card>
    );
    await assertAccessible(container);
  });
});
