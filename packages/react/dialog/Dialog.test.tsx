import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { Dialog } from "./Dialog";
import { assertAccessible } from "../test/utils/a11y";

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

  // Accessibility tests
  it("has no accessibility violations when open with minimal content", async () => {
    const { container } = render(
      <Dialog open={true}>
        <div role="dialog" aria-labelledby="dialog-title">
          <h2 id="dialog-title">Dialog Title</h2>
          <p>Dialog description goes here.</p>
        </div>
      </Dialog>
    );
    await assertAccessible(container);
  });

  it("has no violations with proper semantics (title + description)", async () => {
    const { container } = render(
      <Dialog
        open={true}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <h2 id="dialog-title">Confirm Action</h2>
        <p id="dialog-description">Are you sure you want to proceed?</p>
        <button>Confirm</button>
        <button>Cancel</button>
      </Dialog>
    );
    await assertAccessible(container);
  });

  it("has proper role and aria attributes", () => {
    render(
      <Dialog open={true} aria-labelledby="title" aria-describedby="desc">
        <div id="title">Title</div>
        <div id="desc">Description</div>
      </Dialog>
    );
    const dialogContent = document.body.querySelector('[role="dialog"]');
    expect(dialogContent).toBeDefined();
    expect(dialogContent?.getAttribute("aria-modal")).toBe("true");
  });
});