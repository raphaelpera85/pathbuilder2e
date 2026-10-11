import { useLayoutEffect, type RefObject } from "react";

interface InertedElement {
  element: HTMLElement;
  wasAlreadyInert: boolean;
}

interface DocumentModalState {
  stack: HTMLElement[];
  inerted: InertedElement[];
}

const modalStates = new WeakMap<Document, DocumentModalState>();

function isolateTopModal(document: Document, state: DocumentModalState): void {
  for (const { element, wasAlreadyInert } of state.inerted) {
    if (!wasAlreadyInert) element.removeAttribute("inert");
  }
  state.inerted = [];

  const activeDialog = state.stack.at(-1);
  if (!activeDialog?.isConnected) return;
  const HTMLElementConstructor = document.defaultView?.HTMLElement;
  if (!HTMLElementConstructor) return;

  let branch: HTMLElement = activeDialog;
  while (branch.parentElement) {
    const parent = branch.parentElement;
    for (const sibling of Array.from(parent.children)) {
      if (!(sibling instanceof HTMLElementConstructor) || sibling === branch) continue;
      state.inerted.push({ element: sibling, wasAlreadyInert: sibling.hasAttribute("inert") });
      sibling.setAttribute("inert", "");
    }
    branch = parent;
  }
}

/** Keeps only the newest open dialog interactive, then restores prior inert state on close. */
export function useModalInertBackground<T extends HTMLElement>(
  contentRef: RefObject<T | null>,
  active: boolean,
): void {
  useLayoutEffect(() => {
    if (!active) return;
    const dialog = contentRef.current?.closest<HTMLElement>('[role="dialog"]');
    if (!dialog) return;

    const ownerDocument = dialog.ownerDocument;
    let state = modalStates.get(ownerDocument);
    if (!state) {
      state = { stack: [], inerted: [] };
      modalStates.set(ownerDocument, state);
    }
    state.stack = state.stack.filter((openDialog) => openDialog !== dialog);
    state.stack.push(dialog);
    isolateTopModal(ownerDocument, state);

    return () => {
      const currentState = modalStates.get(ownerDocument);
      if (!currentState) return;
      currentState.stack = currentState.stack.filter((openDialog) => openDialog !== dialog);
      isolateTopModal(ownerDocument, currentState);
      if (currentState.stack.length === 0) modalStates.delete(ownerDocument);
    };
  }, [active, contentRef]);
}
