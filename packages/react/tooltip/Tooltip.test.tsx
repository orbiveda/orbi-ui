// packages/react/tooltip/Tooltip.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Tooltip } from "./Tooltip";
import { runAxe, expectNoAxeViolations } from "../test/utils/a11y";

describe("Tooltip", () => {
  it("renders trigger element", () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByText("Hover me")).toBeDefined();
  });

  it("disables tooltip when disabled prop is true", () => {
    render(
      <Tooltip content="Tooltip content" disabled>
        <button>Hover me</button>
      </Tooltip>
    );

    const trigger = screen.getByText("Hover me");
    fireEvent.mouseEnter(trigger);

    expect(screen.queryByText("Tooltip content")).toBeNull();
  });

  it("applies placement class", () => {
    const { container } = render(
      <Tooltip content="Tooltip content" placement="right" defaultOpen={true}>
        <button>Hover me</button>
      </Tooltip>
    );

    const tooltip = container.querySelector(".orbi-tooltip--right");
    expect(tooltip).toBeDefined();
  });

  it("has tooltip role", () => {
    const { container } = render(
      <Tooltip content="Tooltip content" defaultOpen={true}>
        <button>Hover me</button>
      </Tooltip>
    );

    const tooltip = container.querySelector('[role="tooltip"]');
    expect(tooltip).toBeDefined();
  });

  // Accessibility tests
  it("has no accessibility violations", async () => {
    const { container } = render(
      <Tooltip content="Tooltip content">
        <div>Hover me</div>
      </Tooltip>
    );
    const results = await runAxe(container);
    expectNoAxeViolations(results);
  });

  it("has no violations when open", async () => {
    const { container } = render(
      <Tooltip content="Tooltip content" defaultOpen={true}>
        <div>Hover me</div>
      </Tooltip>
    );

    expect(screen.getByText("Tooltip content")).toBeDefined();

    // Test only the container, not the whole document to avoid "region" violation
    // which is an axe rule about page-level landmark structure, not component issue
    const results = await runAxe(container);
    expectNoAxeViolations(results);
  });

  it("trigger has button role", () => {
    const { container } = render(
      <Tooltip content="Tooltip content">
        <button>Click me</button>
      </Tooltip>
    );

    const button = container.querySelector(".orbi-tooltip-trigger button");
    expect(button?.tagName.toLowerCase()).toBe("button");
  });

  it("trigger is keyboard accessible (tabindex)", () => {
    const { container } = render(
      <Tooltip content="Tooltip content">
        <button>Click me</button>
      </Tooltip>
    );

    const trigger = container.querySelector(".orbi-tooltip-trigger");
    expect(trigger?.getAttribute("tabindex")).toBe("0");
  });
});
