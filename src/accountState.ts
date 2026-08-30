import { useSyncExternalStore } from "react";

export interface AccountViewState {
  configured: boolean;
  authenticated: boolean;
  isAdmin: boolean;
  username: string | null;
}

let snapshot: AccountViewState = { configured: false, authenticated: false, isAdmin: false, username: null };
const listeners = new Set<() => void>();

export function updateAccountViewState(next: AccountViewState) {
  if (Object.entries(next).every(([key, value]) => snapshot[key as keyof AccountViewState] === value)) return;
  snapshot = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useAccountViewState() {
  return useSyncExternalStore(subscribe, () => snapshot, () => snapshot);
}
