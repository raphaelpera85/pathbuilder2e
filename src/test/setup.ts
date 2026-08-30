import "@testing-library/jest-dom/vitest";

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
