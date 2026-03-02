import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { Dialog } from "./Dialog";

afterEach(() => {
  cleanup();
});

describe("Dialog", () => {
  it("renders when open (controlled)", () => {
    render(
      <Dialog open>
        <div>Content</div>
      </Dialog>
    );

    expect(screen.getByText("Content")).toBeDefined();
  });

  it("does not render when closed", () => {
    render(
      <Dialog open={false}>
        <div>Hidden</div>
      </Dialog>
    );

    expect(screen.queryByText("Hidden")).toBeNull();
  });

  it("closes on Escape key (uncontrolled)", async () => {
    render(
      <Dialog defaultOpen>
        <div>Closable</div>
      </Dialog>
    );

    expect(screen.getByText("Closable")).toBeDefined();

    fireEvent.keyDown(document, { key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByText("Closable")).toBeNull();
    });
  });

  it("closes on backdrop click (uncontrolled)", async () => {
    render(
      <Dialog defaultOpen>
        <div>Backdrop Test</div>
      </Dialog>
    );

    const overlay = document.querySelector(
      ".orbi-dialog-overlay"
    ) as HTMLElement;

    fireEvent.click(overlay);

    await waitFor(() => {
      expect(screen.queryByText("Backdrop Test")).toBeNull();
    });
  });
});