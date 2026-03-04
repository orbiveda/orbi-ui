// packages/react/tabs/Tabs.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Tabs } from "./Tabs";
import { TabsList } from "./TabsList";
import { TabsTrigger } from "./TabsTrigger";
import { TabsContent } from "./TabsContent";
import { runAxe, expectNoAxeViolations } from "../test/utils/a11y";

describe("Tabs", () => {
  const TabsComponent = ({ value, onValueChange, ...props }: any) => (
    <Tabs value={value} onValueChange={onValueChange} {...props}>
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content 1</TabsContent>
      <TabsContent value="tab2">Content 2</TabsContent>
      <TabsContent value="tab3">Content 3</TabsContent>
    </Tabs>
  );

  it("renders tabs with correct structure", () => {
    render(<TabsComponent defaultValue="tab1" />);
    expect(screen.getByText("Tab 1")).toBeDefined();
    expect(screen.getByText("Tab 2")).toBeDefined();
    expect(screen.getByText("Tab 3")).toBeDefined();
    expect(screen.getByText("Content 1")).toBeDefined();
  });

  it("shows only active tab content", () => {
    render(<TabsComponent defaultValue="tab1" />);
    expect(screen.getByText("Content 1")).toBeDefined();
    expect(screen.queryByText("Content 2")).toBeNull();
    expect(screen.queryByText("Content 3")).toBeNull();
  });

  it("switches tabs on trigger click", () => {
    render(<TabsComponent defaultValue="tab1" />);

    const tab2 = screen.getByText("Tab 2") as HTMLButtonElement;
    fireEvent.click(tab2);

    expect(screen.queryByText("Content 1")).toBeNull();
    expect(screen.getByText("Content 2")).toBeDefined();
  });

  it("marks active trigger with aria-selected", () => {
    render(<TabsComponent defaultValue="tab1" />);

    const tab1 = screen.getByText("Tab 1") as HTMLButtonElement;
    const tab2 = screen.getByText("Tab 2") as HTMLButtonElement;

    expect(tab1.getAttribute("aria-selected")).toBe("true");
    expect(tab2.getAttribute("aria-selected")).toBe("false");

    fireEvent.click(tab2);

    expect(tab1.getAttribute("aria-selected")).toBe("false");
    expect(tab2.getAttribute("aria-selected")).toBe("true");
  });

  it("handles horizontal orientation", async () => {
    const { container } = render(
      <TabsComponent defaultValue="tab1" orientation="horizontal" />
    );

    const tabs = container.querySelector(".orbi-tabs");
    expect(tabs?.className).toContain("orbi-tabs--horizontal");
  });

  it("handles vertical orientation", async () => {
    const { container } = render(
      <TabsComponent defaultValue="tab1" orientation="vertical" />
    );

    const tabs = container.querySelector(".orbi-tabs");
    expect(tabs?.className).toContain("orbi-tabs--vertical");
  });

  // Accessibility tests
  it("has no accessibility violations", async () => {
    const { container } = render(<TabsComponent defaultValue="tab1" />);
    const results = await runAxe(container);
    expectNoAxeViolations(results);
  });

  it("has no violations with all tabs", async () => {
    const { container } = render(
      <Tabs defaultValue="tab1">
        <TabsList>
          {Array.from({ length: 5 }, (_, i) => (
            <TabsTrigger key={i} value={`tab${i}`}>
              Tab {i}
            </TabsTrigger>
          ))}
        </TabsList>
        {Array.from({ length: 5 }, (_, i) => (
          <TabsContent key={i} value={`tab${i}`}>
            Content {i}
          </TabsContent>
        ))}
      </Tabs>
    );
    const results = await runAxe(container);
    expectNoAxeViolations(results);
  });

  it("tab triggers have correct roles", () => {
    render(<TabsComponent defaultValue="tab1" />);

    const tab1 = screen.getByText("Tab 1") as HTMLButtonElement;
    expect(tab1.getAttribute("role")).toBe("tab");
  });

  it("tab list has tablist role", () => {
    const { container } = render(<TabsComponent defaultValue="tab1" />);

    const tablist = container.querySelector('[role="tablist"]');
    expect(tablist).toBeDefined();
  });

  it("tab content has tabpanel role", () => {
    const { container } = render(<TabsComponent defaultValue="tab1" />);

    const tabpanel = container.querySelector('[role="tabpanel"]');
    expect(tabpanel).toBeDefined();
  });
});
