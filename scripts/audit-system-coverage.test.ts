import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("auditoria de cobertura OSE Classic", () => {
  it("mantém as sete classes jogáveis no escopo Classic", () => {
    const source = readFileSync(resolve(process.cwd(), "scripts/audit-system-coverage.cjs"), "utf8");
    expect(source).toContain('expected: { classes: 7, items: 53, spells: 34 }');
    expect(source).toContain('isOseClassAvailableForMode(entry, "classic")');
  });
});
