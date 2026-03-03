import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Stack } from "./Stack";
import { assertAccessible } from "../test/utils/a11y";


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
  // Accessibility tests
  it("has no violations with a single child", async () => {
    const { container } = render(
      <Stack>
        <div>Child</div>
      </Stack>
    );
    await assertAccessible(container);
  });

  it("has no violations with multiple children", async () => {
    const { container } = render(
      <Stack>
        <div>One</div>
        <div>Two</div>
      </Stack>
    );
    await assertAccessible(container);
  });});