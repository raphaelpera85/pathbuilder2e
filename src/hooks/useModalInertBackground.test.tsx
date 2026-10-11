import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { useRef } from "react";
import { useModalInertBackground } from "./useModalInertBackground";

function IsolatedDialog({ id, active = true }: { id: string; active?: boolean }) {
  const contentRef = useRef<HTMLDivElement>(null);
  useModalInertBackground(contentRef, active);
  return <div role="dialog" aria-label={id}><div ref={contentRef}>{id}</div></div>;
}

describe("useModalInertBackground", () => {
  let modalHost: HTMLElement;

  beforeEach(() => {
    document.body.innerHTML = "";
    const shell = document.createElement("div");
    shell.id = "app-shell";
    shell.innerHTML = '<header id="site-header"><button>Open</button></header><main id="page-background"><button>Page action</button></main>';
    modalHost = document.createElement("div");
    modalHost.id = "modal-host";
    shell.append(modalHost);
    document.body.append(shell);
  });

  afterEach(() => cleanup());

  it("makes all content outside the dialog inert and restores it on close", () => {
    const view = render(<IsolatedDialog id="primary" />, { container: modalHost });
    const header = document.getElementById("site-header")!;
    const background = document.getElementById("page-background")!;
    const dialog = document.querySelector('[role="dialog"]')!;

    expect(header).toHaveAttribute("inert");
    expect(background).toHaveAttribute("inert");
    expect(dialog).not.toHaveAttribute("inert");

    view.unmount();
    expect(header).not.toHaveAttribute("inert");
    expect(background).not.toHaveAttribute("inert");
  });

  it("restores pre-existing inert state and moves isolation to the top stacked dialog", () => {
    const header = document.getElementById("site-header")!;
    header.setAttribute("inert", "");
    const view = render(<><IsolatedDialog id="first" /><IsolatedDialog id="second" active={false} /></>, { container: modalHost });
    const dialogs = document.querySelectorAll('[role="dialog"]');
    const first = dialogs[0];
    const second = dialogs[1];

    expect(first).not.toHaveAttribute("inert");
    expect(second).toHaveAttribute("inert");
    view.rerender(<><IsolatedDialog id="first" /><IsolatedDialog id="second" /></>);
    expect(first).toHaveAttribute("inert");
    expect(second).not.toHaveAttribute("inert");

    view.rerender(<IsolatedDialog id="first" />);
    expect(first).not.toHaveAttribute("inert");
    expect(header).toHaveAttribute("inert");
    view.unmount();
    expect(header).toHaveAttribute("inert");
    expect(document.getElementById("page-background")).not.toHaveAttribute("inert");
  });
});
