// packages/react/progress/Progress.test.tsx

import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Progress } from "./Progress";
import { runAxe, expectNoAxeViolations } from "../test/utils/a11y";

describe("Progress", () => {
  it("renders progress element", () => {
    const { container } = render(<Progress value={50} />);
    const progress = container.querySelector(".orbi-progress");
    expect(progress).toBeDefined();
  });

  it("renders progress bar with correct width", () => {
    const { container } = render(<Progress value={75} />);
    const bar = container.querySelector(".orbi-progress-bar") as HTMLElement;
    expect(bar.style.width).toBe("75%");
  });

  it("applies variant class", () => {
    const { container } = render(<Progress value={50} variant="success" />);
    const progress = container.querySelector(".orbi-progress");
    expect(progress?.className).toContain("orbi-progress--success");
  });

  it("renders label when provided", () => {
    const { container } = render(<Progress value={50} label="Loading..." />);
    expect(container.textContent).toContain("Loading...");
  });

  it("clamps value between 0 and max", () => {
    const { container } = render(<Progress value={150} max={100} />);
    const bar = container.querySelector(".orbi-progress-bar") as HTMLElement;
    expect(bar.style.width).toBe("100%");
  });

  it("handles custom max value", () => {
    const { container } = render(<Progress value={50} max={200} />);
    const bar = container.querySelector(".orbi-progress-bar") as HTMLElement;
    expect(bar.style.width).toBe("25%");
  });

  it("has correct aria attributes", () => {
    const { container } = render(
      <Progress value={50} max={100} label="Download" />
    );
    const bar = container.querySelector(".orbi-progress-bar");
    expect(bar?.getAttribute("role")).toBe("progressbar");
    expect(bar?.getAttribute("aria-valuenow")).toBe("50");
    expect(bar?.getAttribute("aria-valuemin")).toBe("0");
    expect(bar?.getAttribute("aria-valuemax")).toBe("100");
    expect(bar?.getAttribute("aria-label")).toBe("Download");
  });

  it("handles zero value", () => {
    const { container } = render(<Progress value={0} />);
    const bar = container.querySelector(".orbi-progress-bar") as HTMLElement;
    expect(bar.style.width).toBe("0%");
  });

  it("handles full value", () => {
    const { container } = render(<Progress value={100} />);
    const bar = container.querySelector(".orbi-progress-bar") as HTMLElement;
    expect(bar.style.width).toBe("100%");
  });

  // Accessibility tests
  it("has no accessibility violations", async () => {
    const { container } = render(<Progress value={50} aria-label="Loading" />);
    const results = await runAxe(container);
    expectNoAxeViolations(results);
  });

  it("has no violations with label", async () => {
    const { container } = render(<Progress value={50} label="Uploading..." />);
    const results = await runAxe(container);
    expectNoAxeViolations(results);
  });

  it("has no violations with different variants", async () => {
    const variants = ["default", "success", "warning", "error"] as const;

    for (const variant of variants) {
      const { container } = render(<Progress value={50} variant={variant} aria-label="Progress" />);
      const results = await runAxe(container);
      expectNoAxeViolations(results);
    }
  });

  it("updates aria-valuenow when value changes", async () => {
    const { rerender, container } = render(<Progress value={25} />);
    let bar = container.querySelector(".orbi-progress-bar");
    expect(bar?.getAttribute("aria-valuenow")).toBe("25");

    rerender(<Progress value={75} />);
    bar = container.querySelector(".orbi-progress-bar");
    expect(bar?.getAttribute("aria-valuenow")).toBe("75");
  });
});
