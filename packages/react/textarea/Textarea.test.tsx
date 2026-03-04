// packages/react/textarea/Textarea.test.tsx

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Textarea } from "./Textarea";
import { runAxe, expectNoAxeViolations } from "../test/utils/a11y";

describe("Textarea", () => {
  it("renders textarea element", () => {
    render(<Textarea />);
    const textarea = document.querySelector("textarea");
    expect(textarea).toBeDefined();
  });

  it("applies default variant class", () => {
    render(<Textarea variant="default" />);
    const textarea = document.querySelector("textarea");
    expect(textarea?.className).toContain("orbi-textarea--default");
  });

  it("applies outlined variant class", () => {
    render(<Textarea variant="outlined" />);
    const textarea = document.querySelector("textarea");
    expect(textarea?.className).toContain("orbi-textarea--outlined");
  });

  it("sets rows attribute", () => {
    render(<Textarea rows={8} />);
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement;
    expect(parseInt(textarea.getAttribute("rows") || "4")).toBe(8);
  });

  it("handles placeholder", () => {
    render(<Textarea placeholder="Enter your message..." />);
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement;
    expect(textarea.placeholder).toBe("Enter your message...");
  });

  it("disables when disabled prop is true", () => {
    render(<Textarea disabled />);
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement;
    expect(textarea.disabled).toBe(true);
    expect(textarea.className).toContain("orbi-textarea--disabled");
  });

  it("applies readonly state", () => {
    render(<Textarea readOnly />);
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement;
    expect(textarea.readOnly).toBe(true);
    expect(textarea.className).toContain("orbi-textarea--readonly");
  });

  it("sets required attribute", () => {
    render(<Textarea required />);
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement;
    expect(textarea.required).toBe(true);
  });

  // Accessibility tests
  it("has no accessibility violations", async () => {
    const { container } = render(<Textarea aria-label="Message" />);
    const results = await runAxe(container);
    expectNoAxeViolations(results);
  });

  it("has no violations when disabled", async () => {
    const { container } = render(<Textarea disabled aria-label="Disabled message" />);
    const results = await runAxe(container);
    expectNoAxeViolations(results);
  });

  it("has no violations with aria-label", async () => {
    const { container } = render(<Textarea aria-label="Message input" />);
    const results = await runAxe(container);
    expectNoAxeViolations(results);
  });

  it("has no violations when required", async () => {
    const { container } = render(<Textarea required aria-label="Required message" />);
    const results = await runAxe(container);
    expectNoAxeViolations(results);
  });
});
