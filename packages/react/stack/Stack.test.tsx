import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Stack } from "./Stack";


describe("Stack", () => {
  it("renders children", () => {
    const { getByText } = render(
      <Stack>
        <div>Child</div>
      </Stack>
    );

    expect(getByText("Child")).toBeDefined();
  });

  it("applies direction class", () => {
    const { container } = render(
      <Stack direction="horizontal">
        <div>Test</div>
      </Stack>
    );

  const div = container.firstElementChild as HTMLDivElement;
  expect(div.className.includes("horizontal")).toBe(true);
});

it("applies gap class", () => {
  const { container } = render(
    <Stack gap="lg">
      <div>Test</div>
    </Stack>
  );

  const div = container.firstElementChild as HTMLDivElement;
  expect(div.className.includes("gap-lg")).toBe(true);
});
});