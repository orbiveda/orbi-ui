import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Avatar } from "./Avatar";
import { assertAccessible } from "../test/utils/a11y";

describe("Avatar", () => {
  it("renders image when src is provided", () => {
    render(<Avatar src="photo.jpg" alt="User" />);
    const img = screen.getByAltText("User");
    expect(img).toBeDefined();
    expect(img.getAttribute("src")).toBe("photo.jpg");
  });

  it("renders fallback initials when no src is provided", () => {
    render(<Avatar fallback="JD" />);
    expect(screen.getByText("JD")).toBeDefined();
  });

  it("applies size variant correctly", () => {
    render(<Avatar size="lg" data-testid="avatar" />);
    const avatar = screen.getByTestId("avatar");
    expect(avatar.className.includes("orbi-avatar--lg")).toBe(true);
  });

  it("applies className correctly", () => {
    render(<Avatar className="custom-class" data-testid="avatar" />);
    const avatar = screen.getByTestId("avatar");
    expect(avatar.className.includes("orbi-avatar")).toBe(true);
    expect(avatar.className.includes("custom-class")).toBe(true);
  });

  it("forwards ref correctly", () => {
    const ref = { current: null as HTMLSpanElement | null };
    render(<Avatar ref={ref} />);
    expect(ref.current).toBeDefined();
    expect(ref.current?.tagName).toBe("SPAN");
  });

  it("has proper accessibility attributes", () => {
    render(<Avatar alt="User photo" data-testid="avatar" />);
    const avatar = screen.getByTestId("avatar");
    expect(avatar.getAttribute("role")).toBe("img");
    expect(avatar.getAttribute("aria-label")).toBe("User photo");
  });

  // Accessibility tests
  it("has no violations when image provided", async () => {
    const { container } = render(<Avatar src="photo.jpg" alt="User" />);
    await assertAccessible(container);
  });

  it("has no violations with fallback initials", async () => {
    const { container } = render(<Avatar fallback="JD" />);
    await assertAccessible(container);
  });
});
