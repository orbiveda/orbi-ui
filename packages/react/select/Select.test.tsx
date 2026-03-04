// packages/react/select/Select.test.tsx

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Select } from "./Select";
import { runAxe, expectNoAxeViolations } from "../test/utils/a11y";

describe("Select", () => {
  it("renders select element with options", () => {
    render(
      <Select>
        <option value="">Select an option</option>
        <option value="opt1">Option 1</option>
        <option value="opt2">Option 2</option>
      </Select>
    );
    const select = document.querySelector("select");
    expect(select).toBeDefined();
    expect(document.querySelectorAll("option").length).toBe(3);
  });

  it("applies disabled class when disabled", () => {
    render(
      <Select disabled>
        <option value="">Select</option>
      </Select>
    );
    const select = document.querySelector("select");
    expect(select?.className).toContain("orbi-select--disabled");
  });

  it("supports uncontrolled defaultValue", async () => {
    render(
      <Select defaultValue="opt1">
        <option value="opt1">Option 1</option>
        <option value="opt2">Option 2</option>
      </Select>
    );

    const select = document.querySelector("select") as HTMLSelectElement;
    expect(select.value).toBe("opt1");
  });

  it("disables when disabled prop is true", () => {
    render(
      <Select disabled>
        <option value="">Select</option>
        <option value="opt1">Option 1</option>
      </Select>
    );

    const select = document.querySelector("select") as HTMLSelectElement;
    expect(select.disabled).toBe(true);
  });

  it("sets required attribute", () => {
    render(
      <Select required>
        <option value="">Select</option>
      </Select>
    );

    const select = document.querySelector("select") as HTMLSelectElement;
    expect(select.required).toBe(true);
  });

  // Accessibility tests
  it("has no accessibility violations", async () => {
    const { container } = render(
      <Select aria-label="Select an option">
        <option value="">Select an option</option>
        <option value="opt1">Option 1</option>
      </Select>
    );
    const results = await runAxe(container);
    expectNoAxeViolations(results);
  });

  it("has no violations when disabled", async () => {
    const { container } = render(
      <Select disabled aria-label="Disabled select">
        <option value="">Select</option>
      </Select>
    );
    const results = await runAxe(container);
    expectNoAxeViolations(results);
  });

  it("has no violations when required", async () => {
    const { container } = render(
      <Select required aria-label="Choose required option">
        <option value="">Select</option>
        <option value="opt1">Option 1</option>
      </Select>
    );
    const results = await runAxe(container);
    expectNoAxeViolations(results);
  });

  it("has no violations with aria-label", async () => {
    const { container } = render(
      <Select aria-label="Choose option">
        <option value="">Select</option>
        <option value="opt1">Option 1</option>
      </Select>
    );
    const results = await runAxe(container);
    expectNoAxeViolations(results);
  });
});
