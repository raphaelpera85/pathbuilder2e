import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (relativePath: string) => readFileSync(resolve(process.cwd(), relativePath), "utf8");

describe("responsive layout contract", () => {
  it("confines the builder to the portable viewport and keeps long panels scrollable", () => {
    const css = read("css/style.css");

    expect(css).toContain("height: 100dvh !important;");
    expect(css).toContain("overflow-y: hidden !important;");
    expect(css).toContain("overflow-y: hidden !important;");
    expect(css).toContain("overflow-y: auto;");
    expect(css).toContain("overscroll-behavior: contain;");
    expect(css).toContain("#gearList");
    expect(css).toContain("#featsFullList");
    expect(css).toContain("#spellsList");
    expect(css).toContain("scrollbar-gutter: stable;");
  });

  it("keeps portal pages inside the portal viewport", () => {
    const css = read("src/portal.css");

    expect(css).toContain("body.portal-page-active { width: 100vw; min-width: 0; max-width: 100vw; overflow-x: hidden; }");
    expect(css).toContain("body.portal-page-active .pb-topbar { width: 100%; min-width: 0; max-width: 100vw; }");
    expect(css).toContain("#react-portal-root { flex: 0 0 auto; width: 100%; max-width: 100%; min-width: 0; }");
    expect(css).toContain(".portal-page-active #react-portal-root { min-height: 0; flex: 1 1 0%; width: 100%; max-width: 100%; overflow: hidden; }");
    expect(css).toContain(".portal-page-active #react-portal-root > * { min-width: 0; max-width: 100%; }");
    expect(css).toContain(".portal-page-active #react-portal-root > .portal-page");
    expect(css).toContain(".portal-page h1, .portal-page h2, .portal-page h3, .portal-page p");
    expect(css).toContain(".access-card h1, .access-card p { width: 100%; max-width: 100%; min-width: 0; white-space: normal;");
    expect(css).toContain(".access-card { width: 100%; min-width: 0;");
    expect(css).toContain("overflow-y: auto;");
    expect(css).toContain(".portal-page-active #react-portal-root > .portal-page { padding-bottom: 40px; overflow: hidden; display: flex; flex-direction: column; }");
    expect(css).toContain(".portal-page-active #react-portal-root > .portal-page > .rules-layout");
    expect(css).toContain(".portal-page-active #react-portal-root > .portal-catalog-page { overflow: hidden;");
    expect(css).toContain(".portal-page-active .portal-catalog-page .catalog-grid { flex: 1 1 auto; overflow-y: auto;");
    expect(css).toContain("flex: 1 1 auto;\n    min-height: 0;\n    overflow-y: auto;");
    expect(css).toContain("@media (max-width: 1080px)");
    expect(css).toContain("Tablets e portáteis também mantêm a viewport fixa");
    expect(css).toContain(".portal-page { width: min(calc(100vw - 24px), 1280px); max-width: calc(100vw - 24px); padding-top: 28px; box-sizing: border-box; }");
    expect(css).toContain(".characters-library-grid { grid-template-columns: minmax(0, 1fr); }");
    expect(css).toContain(".portal-page.access-page { width: calc(100vw - 24px); max-width: calc(100vw - 24px); }");
    expect(css).toContain(".library-auth-page, .auth-card-hero, .auth-main-container { width: 100%; min-width: 0; max-width: 100%; box-sizing: border-box; }");
    expect(css).toContain(".auth-main-container { width: 100%; min-width: 0; display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);");
    expect(css).toContain(".source-badge.translation-pending");
    expect(css).toContain(".catalog-card-status");
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
    expect(app).toContain('role="img" aria-label="Dado d${d.sides}, resultado ${d.value}"');
    expect(app).toContain("Tirada libre");
    expect(app).toContain("Selecciona dados usando los botones de arriba");
    const css = read("css/style.css");
    expect(css).toContain(".polyhedral-die-wrapper::before");
    expect(css).toContain("backface-visibility: hidden;");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    const main = read("src/main.tsx");
    expect(main).toContain('matchMedia("(pointer: coarse)")');
    expect(main).toContain('dataset.inputMode');
    expect(main).toContain("--pb-viewport-height");
  });

  it("shares the richer React catalogs with the legacy picker bridge", () => {
    const main = read("src/main.tsx");
    const app = read("js/app.js");
    const picker = read("src/PickerModal.tsx");
    const itemPicker = read("src/ItemPickerModal.tsx");

    expect(main).toContain("window as any).pathbuilderCatalogs");
    expect(main).toContain("PF2E_ITEMS_CATALOG");
    expect(main).toContain("PF2E_FEATS_CATALOG");
    expect(app).toContain("const sharedCatalogs = window.pathbuilderCatalogs || {};");
    expect(app).toContain("function mergeCatalogRecords(primary = [], secondary = [])");
    expect(app).toContain('if (String(record.id || "").includes(".legacy_alias.")) return;');
    expect(app).toContain("function getObjectCatalogRecords(collection = {})");
    expect(app).toContain('if (type === "subclass")');
    expect(app).toContain("PF2E_DATA.subclasses");
    expect(app).toContain('promptSubclass() {\n    this.openPicker("subclass");\n  }');
    expect(app).toContain("function findCatalogRecord(collection, value)");
    expect(app).toContain("const ancestry = findCatalogRecord(PF2E_DATA.ancestries");
    expect(app).toContain("const maximumRank = Number(level) >= 15 ? 4 : Number(level) >= 7 ? 3 : Number(level) >= 3 ? 2 : 1;");
    expect(app).toContain("const skillOptions = Object.keys(this.calc?.skills || {})");
    expect(app).toContain('this.clearProgressionSlots("class_feat");');
    expect(app).toContain('this.clearProgressionSlots("ancestry_feat");');
    expect(app).toContain("const classBound = feat?.classId || (Array.isArray(feat?.classIds)");
    expect(app).toContain("const ancestryBound = feat?.ancestryId || (Array.isArray(feat?.ancestryIds)");
    expect(app).toContain("this.character.archetypes = this.character.archetypes.filter");
    expect(app).toContain("this.character.spells = this.character.spells.filter(spell => PF2E_ENGINE.getSpellCompatibility");
    expect(app).toContain("this.character.spells.push({ ...item.data, name: item.name, level: item.data.rank ?? item.data.level })");
    expect(app).toContain("this.character.rituals.push({ ...item.data, name: item.name })");
    expect(app).toContain('else if (type === "archetype")');
    expect(app).toContain("this.character.archetypes.push({ ...item.data, name: item.name })");
    expect(app).toContain("removeArchetype(idx)");
    expect(app).toContain('this.currentPickerType === "archetype"');
    expect(app).toContain("if (feats.length === 0) list.replaceChildren();");
    expect(app).toContain('if (this.currentPickerType === "spell") {');
    expect(app).toContain('this.currentPickerType === "ritual"');
    expect(app).toContain('(PF2E_DATA.rituals || []).map(ritual => ({ name: ritual.name, type: "Ritual", data: ritual }))');
    expect(app).toContain("PF2E_ENGINE.getSpellCompatibility(this.character, item.data)?.state === \"available\"");
    expect(app).toContain("const spellCompatibility = PF2E_ENGINE?.getSpellCompatibility?.(this.character, item.data);");
    const engine = read("js/pf2e_engine.js");
    expect(engine).toContain("resolveCatalogRecord(collection, value)");
    expect(engine).toContain("return this.resolveCatalogRecord(PF2E_DATA.classes, character?.class)?.spellcasting || null;");
    expect(app).toContain("getPrerequisiteCompatibility");
    expect(app).toContain("filterPickerItemsByCompatibility(type, items = [])");
    expect(app).toContain("moveInventoryItemToContainer(idx)");
    expect(app).toContain("moveContainerItemToInventory(containerIdx, itemIdx)");
    expect(app).toContain("adjustContainerItemQty(containerIdx, itemIdx, delta)");
    expect(app).toContain("editContainerItem(containerIdx, itemIdx)");
    expect(app).toContain("removeContainerItem(containerIdx, itemIdx)");
    expect(app).toContain("const existing = containers[selected].items.find");
    expect(app).toContain("const existing = this.character.inventory.find");
    expect(app).toContain("const finalize = (items) => this.filterPickerItemsByCompatibility(type, items);");
    expect(app).toContain("const customId = `item.custom.${Date.now()}`");
    expect(app).toContain('summaries: { "pt-BR": description.trim(), en: description.trim(), es: description.trim() }');
    expect(app).toContain('ruleset: "needs_review"');
    expect(app).toContain("const descriptionPrompt = locale === \"en\"");
    expect(app).toContain("item.summaries = { \"pt-BR\": item.summaries?.[\"pt-BR\"]");
    expect(app).toContain("No hay fórmulas registradas en tu Libro de Fórmulas.");
    expect(app).toContain("const copy = locale === \"en\"");
    expect(app).toContain("getPrerequisiteCompatibilityMessage");
    expect(picker).toContain('className="picker-prereqs"');
    expect(picker).toContain('item.data?.selectionState !== "incompatible"');
    expect(picker).toContain('window.addEventListener("pathbuilder:character-render", refresh)');
    expect(itemPicker).toContain("if (!items.some((item) => item.id === selectedId))");
    expect(itemPicker).toContain("return items.find((item) => item.id === selectedId)");
    expect(itemPicker).toContain("const itemPickerCopy: Record<Locale");
    expect(itemPicker).toContain("PF2E_DATA?.itemCompendium");
    expect(itemPicker).toContain("[...PF2E_ITEMS_CATALOG, ...legacyCatalog].reduce");
    expect(itemPicker).toContain("item.names?.[\"pt-BR\"]");
    expect(itemPicker).toContain("const localizedNames = Object.values(item.names || {}).join(\" \")");
    expect(itemPicker).toContain('window.addEventListener("pathbuilder:character-render", refresh)');
    expect(itemPicker).toContain('role="dialog" aria-modal="true" aria-labelledby="item-picker-title"');
    expect(itemPicker).toContain('aria-pressed={isSel}');
    expect(itemPicker).toContain('aria-label={copy.addQuantity}');
    expect(itemPicker).toContain('event.key === "Escape"');
    expect(itemPicker).toContain('document.addEventListener("keydown", onKeyDown)');
    expect(itemPicker).toContain('document.body.style.overflow = "hidden"');
    expect(itemPicker).toContain("const identityKeys");
    expect(itemPicker).toContain('itemPickerCopy[locale]');
    expect(itemPicker).toContain("getPrerequisiteCompatibility");
    expect(itemPicker).toContain("state === \"incompatible\")");
    expect(itemPicker).toContain("copy.incompatible");
    expect(picker).toContain("const customCopy = {");
    expect(picker).toContain("Custom Weapon");
    expect(picker).toContain("Arma personalizada");
    expect(picker).toContain('ruleset: "needs_review"');
    expect(picker).toContain('summaries: { "pt-BR": customDescription, en: customDescription, es: customDescription }');
    expect(picker).toContain("const footerCopy = {");
    expect(picker).toContain("footerCopy.give");
    expect(picker).toContain("footerCopy.clear");
    expect(picker).toContain('"Impulse Feats"');
    expect(picker).toContain('cat.includes("impulso") || cat.includes("impulse")');
    const portalPages = read("src/PortalPages.tsx");
    const i18n = read("src/i18n.tsx");
    expect(portalPages).toContain("function hasFallbackTranslation");
    expect(portalPages).not.toContain("1087");
    expect(portalPages).not.toContain("1,087");
    expect(portalPages).toContain("campos do modelo oficial");
    expect(portalPages).toContain('className="source-badge translation-pending"');
    expect(portalPages).toContain('entry.data.sourceApproximate');
    expect(portalPages).toContain('sourceSectionReference');
    expect(portalPages).toContain('{ type: "shield", label: "shields" }');
    expect(i18n).toContain("translationPending: \"Tradução pendente\"");
    expect(i18n).toContain("translationPending: \"Translation pending\"");
    expect(i18n).toContain("translationPending: \"Traducción pendiente\"");
    expect(app).toContain(".legacy_alias.");
    expect(app).toContain("const itemCatalog = (PF2E_DATA.items || []).concat(PF2E_DATA.itemCompendium || [])");
    expect(app).toContain("mergeCatalogRecords(sharedCatalogs.feats, PF2E_DATA.feats");
    expect(app).toContain("PF2E_DATA.heritages || []");
    expect(app).toContain("h.ancestryIds?.includes(ancestry?.id)");
    expect(app).toContain('openAddPetModal() {');
    expect(app).toContain('this.openPicker("pet");');
    expect(app).toContain('const pets = Array.isArray(this.character.pets) ? this.character.pets : [];');
    expect(app).not.toContain('this.character.id === "Joao_Ranger" ? [{');
    expect(app).toContain("// Nunca invente opções de regra quando o catálogo oficial não carregou.");
    expect(app).toContain("getFallbackFeatCatalog() {\n    // Nunca invente opções de regra");
    expect(app).not.toContain("Mochila de Aventureiro Padrão");
    expect(app).not.toContain('character.actions || [\n      { name: "Golpe (Strike) [◆]"');
    const ai = read("js/pf2e_ai_assistant.js");
    expect(ai).toContain("const chooseBackground = (candidate) =>");
    expect(ai).not.toContain('|| ["Herança Padrão"]');
    expect(ai).not.toContain('|| ["Especialização Padrão"]');
    expect(ai).not.toContain('|| data?.classes?.["Guerreiro (Fighter)"]');
    expect(read("js/pf2e_engine.js")).toContain("const ancestryIds = Array.isArray(item.ancestryIds)");
    expect(read("js/pf2e_engine.js")).toContain("(coins.pl || 0) + (coins.pp || 0)");
    expect(read("js/pf2e_engine.js")).toContain("this.resolveCatalogRecord(PF2E_DATA.ancestries, character.ancestry)");
    expect(read("js/pf2e_engine.js")).toContain("this.resolveCatalogRecord(PF2E_DATA.backgrounds, character?.background)");
    expect(read("js/pf2e_engine.js")).toContain("Object.entries(PF2E_DATA.spellcastingByClass)");
    expect(read("js/pf2e_engine.js")).toContain("Object.keys(PF2E_DATA.classStarterKits)");
    expect(read("js/pf2e_data.js")).toContain("COMPENDIUM_SECTION_REFERENCES");
    expect(read("js/pf2e_data.js")).toContain("sourceApproximate = true");
    expect(read("js/app.js")).toContain("spell.custom.${Date.now()}");
    expect(read("js/app.js")).toContain('summaries: { "pt-BR": desc.trim(), en: desc.trim(), es: desc.trim() }');
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

  it("exposes complete inventory CRUD and persists each mutation", () => {
    const app = read("js/app.js");
    const gear = app.slice(app.indexOf("  adjustItemQty("), app.indexOf("  promptEditCoin(", app.indexOf("  adjustItemQty(")));

    expect(app).toContain("editInventoryItem(idx)");
    expect(gear).toContain("this.saveCharacterLocal(false);");
    expect(gear).toContain("this.character.inventory.splice(idx, 1);");
    expect(app).toContain("onclick=\"app.editInventoryItem(${idx})\"");
    expect(app).toContain("onclick=\"app.editContainer(${idx})\"");
    expect(app).toContain("removeContainer(idx)");
    expect(app).toContain("container.items.forEach((item) => {");
    expect(app).toContain("incomingIdentity && identity(entry) === incomingIdentity");
    expect(app).toContain("editCharacterCollectionItem(collection, idx)");
    expect(app).toContain("app.editCharacterCollectionItem('spells', ${idx})");
    expect(app).toContain("app.editCharacterCollectionItem('formulas', ${idx})");
    expect(app).toContain("this.saveCharacterLocal(false);\n    this.renderAll();\n  }\n\n  // MODAL PICKER DUAL-PANE");
    expect(app).toContain("this.saveCharacterLocal(false);\n    this.renderAll();\n  }\n\n  reconcileCurrentHp");
    expect(app).toContain("stowArmor()");
    expect(app).toContain("stowShield()");
    expect(app).toContain("editEquippedArmor()");
    expect(app).toContain("editEquippedShield()");
    expect(app).toContain("shield.currentHp = currentHp;");
    expect(app).toContain("const entries = conditions.map((condition) => ({ ...condition, isBuff: false }))");
    expect(app).toContain("app.editCharacterCollectionItem('buffs', ${condition.buffIndex})");
    expect(app).toContain("removeBuff(index)");
    expect(app).toContain("cycleSkillRank(skillId)");
    expect(app).toContain("this.character.skills[skillId] = ranks[nextIdx];\n    this.saveCharacterLocal(false);");
    expect(app).toContain("updateField(f, v) { this.character[f] = v; this.saveCharacterLocal(false);");
    expect(app).toContain('const copy = {');
    expect(app).toContain('Fighter Starter Kit');
    expect(app).toContain('Starter Kit equipped successfully!');
  });

  it("normalizes legacy platinum aliases before rendering or persisting", () => {
    const app = read("js/app.js");

    expect(app).toContain("normalizeCharacterCoins()");
    expect(app).toContain("if (coins.pp === undefined && coins.pl !== undefined) coins.pp = Number(coins.pl) || 0;");
    expect(app).toContain("delete coins.pl;");
    expect(app).toContain("<span class=\"sheet-cell-label\">${sheetCoinLabels.pp}</span>");
  });

  it("keeps CRUD prompts localized for all configured locales", () => {
    const app = read("js/app.js");

    expect(app).toContain("const labels = locale === \"en\"");
    expect(app).toContain("Nombre del objeto:");
    expect(app).toContain("Nombre del conjuro:");
    expect(app).toContain("Nombre del nuevo contenedor");
  });

  it("provides a strict catalog audit command for the remaining coverage work", () => {
    const packageJson = read("package.json");
    const audit = read("scripts/audit-catalog.cjs");

    expect(packageJson).toContain('"audit:catalog": "node scripts/audit-catalog.cjs"');
    expect(audit).toContain("missingNames");
    expect(audit).toContain("missingSummaries");
    expect(audit).toContain("duplicateIds");
    expect(audit).toContain("duplicateNames");
    expect(audit).toContain('category === "items"');
    expect(audit).toContain("itemCompendium");
    expect(audit).toContain('"subclasses"');
    expect(audit).toContain('"heritages"');
    expect(audit).toContain("process.argv.includes(\"--strict\")");
  });
});
