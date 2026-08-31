import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (relativePath: string) => readFileSync(resolve(process.cwd(), relativePath), "utf8");

describe("responsive layout contract", () => {
  it("confines the builder to the portable viewport and keeps long panels scrollable", () => {
    const css = read("css/style.css");

    expect(css).toContain("height: 100dvh !important;");
    expect(css).toContain("overflow-y: hidden !important;");
    expect(css).toContain("overflow-y: auto;");
    expect(css).toContain("overscroll-behavior: contain;");
  });

  it("keeps portal pages inside the portal viewport", () => {
    const css = read("src/portal.css");

    expect(css).toContain(".portal-page-active #react-portal-root { min-height: 0; flex: 1 1 auto; overflow: hidden; }");
    expect(css).toContain(".portal-page-active #react-portal-root > .portal-page");
    expect(css).toContain("overflow-y: auto;");
  });

  it("keeps picker dialogs internally scrollable on touch screens", () => {
    const pickerCss = read("src/picker.css");
    const itemPickerCss = read("src/itemPicker.css");

    expect(pickerCss).toContain(".picker-list { overflow-y: auto;");
    expect(pickerCss).toContain(".picker-detail {\n  min-width: 0;\n  overflow-y: auto;");
    expect(itemPickerCss).toContain(".item-picker-list {");
    expect(itemPickerCss).toContain("overflow-y: auto;");
    expect(itemPickerCss).toContain(".item-picker-detail {\n  padding: 20px;\n  overflow-y: auto;");
  });

  it("aggregates free-roll totals without rendering an ever-growing dice pool", () => {
    const app = read("js/app.js");
    const arena = app.slice(app.indexOf("  renderFreeRollArena()"), app.indexOf("  getPolyhedralDieSvg", app.indexOf("  renderFreeRollArena()")));

    expect(arena).toContain("const d = list[list.length - 1];");
    expect(arena).toContain('this.upsertDiceLog("free-roll"');
    expect(arena).not.toContain("list.map(d => {");
    expect(app).toContain("upsertDiceLog(key, title, formula, total, breakdown");
  });

  it("shares the richer React catalogs with the legacy picker bridge", () => {
    const main = read("src/main.tsx");
    const app = read("js/app.js");

    expect(main).toContain("window as any).pathbuilderCatalogs");
    expect(main).toContain("PF2E_ITEMS_CATALOG");
    expect(main).toContain("PF2E_FEATS_CATALOG");
    expect(app).toContain("const sharedCatalogs = window.pathbuilderCatalogs || {};");
    expect(app).toContain("function mergeCatalogRecords(primary = [], secondary = [])");
    expect(app).toContain("mergeCatalogRecords(sharedCatalogs.items, PF2E_DATA.items)");
    expect(app).toContain("mergeCatalogRecords(sharedCatalogs.feats, PF2E_DATA.feats");
  });

  it("persists every legacy picker type without duplicate companion or buff entries", () => {
    const app = read("js/app.js");
    const apply = app.slice(app.indexOf("  applyPickerSelection("), app.indexOf("  reconcileCurrentHp", app.indexOf("  applyPickerSelection(")));

    expect(apply).toContain('} else if (type === "pet")');
    expect(apply).toContain("this.character.pets.push(pet)");
    expect(apply).toContain("const exists = this.character.buffs.some");
    expect(apply).toContain("this.character.buffs.push({ ...item.data, name: item.name })");
    expect(apply).toContain("this.character.conditions.push({ ...item.data, name: item.name");
  });

  it("provides a strict catalog audit command for the remaining coverage work", () => {
    const packageJson = read("package.json");
    const audit = read("scripts/audit-catalog.cjs");

    expect(packageJson).toContain('"audit:catalog": "node scripts/audit-catalog.cjs"');
    expect(audit).toContain("missingNames");
    expect(audit).toContain("missingSummaries");
    expect(audit).toContain("duplicateIds");
    expect(audit).toContain("process.argv.includes(\"--strict\")");
  });
});
