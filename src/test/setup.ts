import "@testing-library/jest-dom/vitest";

// jsdom does not implement window.alert, which makes it emit
// "Not implemented: Window's alert() method" to the console whenever app
// code (CampaignsPage, PickerModal, ItemPickerModal) calls it during tests.
// Stub it so the suite runs without that console noise.
window.alert = (message?: unknown) => {
  // no-op — tests assert on state/UI, not on native alert dialogs.
  void message;
};

const memory = new Map<string, string>();
const testStorage: Storage = {
  get length() { return memory.size; },
  clear: () => memory.clear(),
  getItem: (key) => memory.get(key) ?? null,
  key: (index) => Array.from(memory.keys())[index] ?? null,
  removeItem: (key) => { memory.delete(key); },
  setItem: (key, value) => { memory.set(key, String(value)); },
};
Object.defineProperty(window, "localStorage", { configurable: true, value: testStorage });
Object.defineProperty(globalThis, "localStorage", { configurable: true, value: testStorage });
