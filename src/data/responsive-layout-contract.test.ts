import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (relativePath: string) => readFileSync(resolve(process.cwd(), relativePath), "utf8");

const loadCatalogMerger = () => {
  const app = read("js/app.js");
  const start = app.indexOf("function mergeCatalogRecords(primary = [], secondary = [])");
  const end = app.indexOf("\nfunction getObjectCatalogRecords", start);
  if (start < 0 || end < 0) throw new Error("mergeCatalogRecords implementation not found");
  return new Function(
    "normalizeCatalogLabel",
    `${app.slice(start, end)}; return mergeCatalogRecords;`,
  )((value: unknown) => String(value ?? "").trim().toLowerCase());
};

const loadBackgroundBoostConstraints = (catalog: { backgrounds: Array<Record<string, unknown>> }) => {
  const app = read("js/app.js");
  const start = app.indexOf("getBackgroundBoostConstraints(backgroundValue = this.character?.background)");
  const end = app.indexOf("\n\n  openSetAbilitiesModal", start);
  if (start < 0 || end < 0) throw new Error("background boost constraint implementation not found");
  return new Function("PF2E_DATA", `return function ${app.slice(start, end)}`)(catalog);
};

const loadCollectionRemover = () => {
  const app = read("js/app.js");
  const start = app.indexOf("removeCharacterCollectionItem(collection, idx)");
  const end = app.indexOf("\n  removeWeapon", start);
  if (start < 0 || end < 0) throw new Error("collection remover implementation not found");
  return new Function(`return function ${app.slice(start, end)}`)();
};

describe("responsive layout contract", () => {
  it("declara os gates de compatibilidade usados pelos pickers", () => {
    const types = read("src/types.ts");
    expect(types).toContain("requiredSubclass?: string | string[];");
    expect(types).toContain("requiresDeity?: boolean;");
    expect(types).toContain("requiresNoPatron?: boolean;");
    expect(types).toContain("maxClassHpPerLevel?: number;");
  });

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
    expect(read("src/account.css")).toContain(".locale-switcher .flag-btn:not(.active) { display: none; }");
    expect(css).toContain("body.portal-page-active #legacy-builder-root { display: none !important; }");
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
    const campaignsCss = read("src/campaigns.css");
    expect(campaignsCss).toContain(".campaigns-layout {\n    min-height: 0;\n    flex: 1 1 auto;\n    overflow-y: auto;");
    expect(campaignsCss).toContain("overscroll-behavior: contain;");
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
    expect(pickerCss).toContain("overflow: hidden;");
    expect(pickerCss).toContain("grid-template-rows: minmax(138px, 34%) minmax(0, 1fr);");
    expect(pickerCss).toContain("@media (max-width: 640px)");
    expect(pickerCss).toContain(".picker-detail {\n  min-width: 0;\n  overflow-y: auto;");
    expect(itemPickerCss).toContain(".item-picker-list {");
    expect(itemPickerCss).toContain("overflow-y: auto;");
    expect(itemPickerCss).toContain(".item-picker-detail {\n  padding: 20px;\n  overflow-y: auto;");
  });

  it("restringe o primeiro aprimoramento aos atributos do antecedente", () => {
    const getConstraints = loadBackgroundBoostConstraints({ backgrounds: [
      { id: "background.player_core_2.rare.wild_child", name: "Criança Selvagem (Wild Child)", names: { "pt-BR": "Criança Selvagem", en: "Wild Child", es: "Niño salvaje" }, ability: ["Força", "Destreza", "Constituição"] },
      { id: "background.player_core_2.rare.amnesiac", name: "Amnésico (Amnesiac)", names: { "pt-BR": "Amnésico", en: "Amnesiac", es: "Amnésico" }, ability: ["Livre", "Livre", "Livre"] }
    ] });
    expect(getConstraints.call({ character: { background: "Niño salvaje" } })).toEqual({ restricted: ["str", "dex", "con"] });
    expect(getConstraints.call({ character: { background: "Amnesiac" } })).toEqual({ restricted: [] });
  });

  it("torna as remoções de CRUD seguras para fichas importadas", () => {
    const remove = loadCollectionRemover();
    const state = { character: { spells: [{ id: "spell-1" }] }, saved: 0, rendered: 0,
      saveCharacterLocal() { this.saved += 1; }, renderAll() { this.rendered += 1; } };
    expect(remove.call(state, "spells", 0)).toBe(true);
    expect(state.character.spells).toEqual([]);
    expect(state.saved).toBe(1);
    expect(state.rendered).toBe(1);
    expect(remove.call(state, "pets", 0)).toBe(false);
    expect(remove.call(state, "spells", "not-an-index")).toBe(false);
  });

  it("aggregates free-roll totals without rendering an ever-growing dice pool", () => {
    const app = read("js/app.js");
    const arena = app.slice(app.indexOf("  renderFreeRollArena()"), app.indexOf("  getPolyhedralDieSvg", app.indexOf("  renderFreeRollArena()")));

    expect(arena).toContain("const d = list[list.length - 1];");
    expect(arena).toContain('this.upsertDiceLog("free-roll"');
    expect(arena).not.toContain("list.map(d => {");
    expect(app).toContain("upsertDiceLog(key, title, formula, total, breakdown");
    expect(app).toContain("heritageInnateSpells");
    expect(app).toContain("heritageInnate: true");
    expect(app).toContain("Number(item.data?.rank ?? item.data?.level) !== 0");
    expect(app).toContain('role="img" aria-label="Dado d${d.sides}, resultado ${d.value}"');
    expect(app).toContain("Tirada libre");
    expect(app).toContain("Selecciona dados usando los botones de arriba");
    const css = read("css/style.css");
    expect(css).toContain(".polyhedral-die-wrapper::before");
    expect(css).toContain(".polyhedral-die-wrapper::after");
    expect(css).toContain("translate3d(7px, 8px, -10px)");
    expect(css).toContain("backface-visibility: hidden;");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    const main = read("src/main.tsx");
    expect(main).toContain('matchMedia("(pointer: coarse)")');
    expect(main).toContain('dataset.inputMode');
    expect(main).toContain("--pb-viewport-height");
    expect(main).toContain("--pb-mobile-chrome-height");
    expect(main).toContain("ResizeObserver");
    expect(css).toContain("var(--pb-mobile-chrome-height, 48px)");
    expect(css).toContain("height: min(540px, calc(var(--pb-viewport-height, 100dvh) - 24px))");
    expect(css).toContain(".pb-modal-left-list {");
    expect(css).toContain("overscroll-behavior: contain");
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
    expect(app).toContain("const richnessScore = (record) =>");
    expect(app).toContain("const canMerge = (existing, incoming) => !existing?.id || !incoming?.id || existing.id === incoming.id;");
    expect(app).toContain("const indexes = seen.get(key) || [];");
    expect(app).toContain("result.names = mergeLocalized(fallback.names, preferred.names)");
    expect(app).toContain("result.source = { ...(fallback.source || {}), ...(preferred.source || {}) }");
    expect(app).toContain('if (String(record.id || "").includes(".legacy_alias.")) return;');
    expect(app).toContain("function getObjectCatalogRecords(collection = {})");
    expect(app).toContain('if (type === "subclass")');
    expect(app).toContain("PF2E_DATA.subclasses");
    expect(app).toContain("mergeCatalogRecords([], PF2E_DATA.archetypes || [])");
    expect(app).toContain("mergeCatalogRecords([], PF2E_DATA.weapons || [])");
    expect(app).toContain("mergeCatalogRecords([], PF2E_DATA.armors || [])");
    expect(app).toContain('promptSubclass(options = {}) {\n    this.openPicker("subclass", options);\n  }');
    expect(app).toContain('["Patrono", "Patron", "Patrón", "subclass", "patron"]');
    expect(app).toContain('targetField === "patron"');
    expect(app).toContain('targetField === "wizardThesis"');
    expect(app).toContain('targetField === "mystery"');
    expect(app).toContain('["Tese Arcana", "Select Thesis", "Seleccionar tesis", "subclass", "wizardThesis"]');
    expect(app).toContain('["Mistério", "Select Mystery", "Seleccionar misterio", "subclass", "mystery"]');
    expect(app).toContain("grantedByPatron: patron.id");
    expect(app).toContain('pet.id === "pet.familiar.mystic"');
    expect(app).toContain('grantedByClass: "class.witch"');
    expect(app).toContain("applySubclassSelection(item, this.activePickerOptions || {})");
    expect(app).toContain('["Hex Inicial", "Initial Hex", "Maleficio inicial", "none", "patronHex"]');
    expect(app).toContain("this.character.spells = this.character.spells.filter((spell) => PF2E_ENGINE.getSpellCompatibility(this.character, spell).state !== \"incompatible\")");
    expect(app).toContain("function findCatalogRecord(collection, value)");
    expect(app).toContain("const heritages = (PF2E_DATA.heritages || []).map(h => ({ name: h.name, type: \"Herança\", data: h }));");
    expect(app).toContain("const maximumRank = Number(level) >= 15 ? 4 : Number(level) >= 7 ? 3 : Number(level) >= 3 ? 2 : 1;");
    expect(app).toContain("const skillOptions = Object.keys(this.calc?.skills || {})");
    expect(app).toContain('this.clearProgressionSlots("class_feat");');
    expect(app).toContain('this.clearProgressionSlots("ancestry_feat");');
    expect(app).toContain("const classBound = feat?.classId || (Array.isArray(feat?.classIds)");
    expect(app).toContain("const ancestryBound = feat?.ancestryId || (Array.isArray(feat?.ancestryIds)");
    expect(app).toContain("this.character.archetypes = this.character.archetypes.filter");
    expect(app).toContain("this.character.spells = this.character.spells.filter(spell => PF2E_ENGINE.getSpellCompatibility");
    expect(app).toContain("this.character.pets = this.character.pets.filter(pet => PF2E_ENGINE.getPrerequisiteCompatibility(this.character, pet).state !== \"incompatible\")");
    expect(app).toContain("this.character.archetypes = this.character.archetypes.filter(archetype => {");
    expect(app).toContain("this.character.spells = this.character.spells.filter(spell => PF2E_ENGINE.getSpellCompatibility(this.character, spell).state !== \"incompatible\")");
    expect(app).toContain("this.character.spells.push({ ...item.data, name: item.name, level: item.data.rank ?? item.data.level })");
    expect(app).toContain("this.character.rituals.push({ ...item.data, name: item.name })");
    expect(app).toContain('else if (type === "archetype")');
    expect(app).toContain("this.character.archetypes.push({ ...item.data, name: item.name })");
    expect(app).toContain("removeArchetype(idx)");
    expect(app).toContain('this.currentPickerType === "archetype"');
    expect(app).toContain("if (feats.length === 0) list.replaceChildren();");
    expect(app).toContain('if (this.currentPickerType === "spell") {');
    expect(app).toContain('this.currentPickerType === "ritual"');
    expect(app).toContain('mergeCatalogRecords([], PF2E_DATA.rituals || []).map(ritual => ({ name: ritual.name, type: "Ritual", data: ritual }))');
    expect(app).toContain("PF2E_ENGINE.getSpellCompatibility(compatibilityCharacter, item.data)?.state !== \"incompatible\"");
    expect(app).not.toContain("PF2E_ENGINE.getSpellCompatibility(this.character, item.data)?.state === \"available\"");
    expect(app).toContain("const spellCompatibility = PF2E_ENGINE?.getSpellCompatibility?.(this.character, item.data);");
    const engine = read("js/pf2e_engine.js");
    expect(engine).toContain("resolveCatalogRecord(collection, value)");
    expect(engine).toContain("return this.resolveCatalogRecord(PF2E_DATA.classes, character?.class)?.spellcasting || null;");
    expect(app).toContain("getPrerequisiteCompatibility");
    expect(app).toContain("filterPickerItemsByCompatibility(type, items = [])");
    expect(app).toContain("getPickerCompatibilityCharacter(type = this.currentPickerType)");
    expect(app).toContain("const slotLevel = Number(this.activePickerOptions?.level);");
    expect(app).toContain("return { ...this.character, level: slotLevel };");
    expect(app).toContain("this.activePickerOptions?.filterType");
    expect(app).toContain("if (filterType.includes(\"geral\") || filterType.includes(\"general\"))");
    expect(app).toContain("moveInventoryItemToContainer(idx)");
    expect(app).toContain("moveContainerItemToInventory(containerIdx, itemIdx)");
    expect(app).toContain("adjustContainerItemQty(containerIdx, itemIdx, delta)");
    expect(app).toContain("editContainerItem(containerIdx, itemIdx)");
    expect(app).toContain("removeContainerItem(containerIdx, itemIdx)");
    expect(app).toContain("const existing = containers[selected].items.find");
    expect(app).toContain("const existing = this.character.inventory.find");
    expect(app).toContain("const finalize = (items) => this.filterPickerItemsByCompatibility(type, items);");
    expect(app).toContain("items = items.filter(item => item.data?.selectionState !== \"incompatible\");");
    expect(app).toContain("heritageInnateSpell");
    expect(app).toContain("compatibility.reason !== \"spellcasting-required\"");
    expect(app).toContain("return compatibility?.state !== \"incompatible\" || compatibility.reason === \"spellcasting-required\";");
    expect(app).toContain("const customId = `item.custom.${Date.now()}`");
    expect(app).toContain('summaries: { "pt-BR": description.trim(), en: description.trim(), es: description.trim() }');
    expect(app).toContain('ruleset: "needs_review"');
    expect(app).toContain("const descriptionPrompt = locale === \"en\"");
    expect(app).toContain("item.summaries = { \"pt-BR\": item.summaries?.[\"pt-BR\"]");
    expect(app).toContain("No hay fórmulas registradas en tu Libro de Fórmulas.");
    expect(app).toContain("const copy = locale === \"en\"");
    expect(app).toContain("getPrerequisiteCompatibilityMessage");
    expect(app).toContain("getBackgroundBoostConstraints(backgroundValue = this.character?.background)");
    expect(app).toContain("backgroundConstraints.restricted");
    expect(app).toContain("group === \"background\" && idx === 0");
    expect(app).toContain("this.character.abilityBoosts.background[0] = backgroundConstraints.restricted[0]");
    expect(app).toContain("removeCharacterCollectionItem(collection, idx)");
    expect(app).toContain('return this.removeCharacterCollectionItem("formulas", idx);');
    expect(app).toContain("const profileStats = Array.isArray(companion.profiles)");
    expect(app).toContain("Eidolon matrices");
    expect(app).toContain("const mechanics = item.data.mechanics?.[locale] || item.data.mechanics?.[\"pt-BR\"];");
    expect(app).toContain("mechanicsLabels.actions");
    expect(picker).toContain('className="picker-prereqs"');
    expect(picker).toContain('item.data?.selectionState !== "incompatible"');
    expect(picker).toContain('window.addEventListener("pathbuilder:character-render", refresh)');
    expect(itemPicker).toContain("if (!items.some((item) => item.id === selectedId))");
    expect(itemPicker).toContain("return items.find((item) => item.id === selectedId)");
    expect(itemPicker).toContain("const itemPickerCopy: Record<Locale");
    expect(itemPicker).toContain("PF2E_DATA?.itemCompendium");
    expect(itemPicker).toContain("export function mergeItemCatalogRecords(records: ItemDefinition[]): ItemDefinition[]");
    expect(itemPicker).toContain("const catalog = mergeItemCatalogRecords([...PF2E_ITEMS_CATALOG, ...legacyCatalog]);");
    expect(itemPicker).toContain("item.names?.[\"pt-BR\"]");
    expect(itemPicker).toContain("const localizedNames = Object.values(item.names || {}).join(\" \")");
    expect(itemPicker).toContain('window.addEventListener("pathbuilder:character-render", refresh)');
    expect(itemPicker).toContain('role="dialog" aria-modal="true" aria-labelledby="item-picker-title"');
    expect(itemPicker).toContain('aria-pressed={isSel}');
    expect(itemPicker).toContain('aria-label={copy.addQuantity}');
    expect(itemPicker).toContain('event.key === "Escape"');
    expect(itemPicker).toContain('document.addEventListener("keydown", onKeyDown)');
    expect(itemPicker).toContain('document.body.style.overflow = "hidden"');
    expect(itemPicker).toContain("const itemIdentityKeys");
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
    expect(app).toContain("comparação literal ocultava heranças válidas");
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

  it("mantém blocos de progressão específicos para as classes das referências", () => {
    const app = read("js/app.js");
    ["Hex Spells", "Arcane School", "Hybrid Study", "Mystery", "Fatal Method", "Research Field", "Instinct", "Muse", "Doctrine", "Order", "Martial Training", "Racket", "Hunter's Edge", "Cause", "Bloodline", "Methodology", "Innovation", "Conscious Mind", "Implement", "Apparition", "Banner", "Elemental Gate", "Eidolon"].forEach((label) => {
      expect(app).toContain(label);
    });
    expect(app).toContain('this.clearProgressionSlots("class_feature");');
    expect(app).toContain("options?.classFeatureSlot");
    expect(app).toContain("activePickerOptions?.classFeatureSlot");
    expect(app).toContain("const stableSlot = `1_class_feature_${classFeatureId}_${entryIndex}`;");
    expect(app).toContain("const legacySlot = `1_class_feature_${key}`;");
  });

  it("merges rich records without collapsing distinct ruleset variants", () => {
    const mergeCatalogRecords = loadCatalogMerger();
    const result = mergeCatalogRecords(
      [
        {
          id: "feat.quick-draw",
          name: "Quick Draw",
          names: { "pt-BR": "Saque Rápido" },
          prerequisites: ["Treinado em Ladinagem"],
        },
        { id: "feat.quick-draw.legacy_alias.en", name: "Quick Draw" },
        { id: "feat.same-name.remaster", name: "Same Name" },
      ],
      [
        {
          id: "feat.quick-draw",
          name: "Quick Draw",
          names: { en: "Quick Draw", es: "Desenfunde rápido" },
          summaries: { "pt-BR": "Você saca uma arma rapidamente." },
          source: { book: "Player Core", page: 267 },
          effects: ["Interact"],
        },
        { id: "feat.same-name.remaster-variant", name: "Same Name" },
      ],
    );

    expect(result).toHaveLength(3);
    expect(result.find((record: { id: string }) => record.id === "feat.quick-draw")).toMatchObject({
      names: { "pt-BR": "Saque Rápido", en: "Quick Draw", es: "Desenfunde rápido" },
      summaries: { "pt-BR": "Você saca uma arma rapidamente." },
      source: { book: "Player Core", page: 267 },
      prerequisites: ["Treinado em Ladinagem"],
      effects: ["Interact"],
    });
    expect(result.map((record: { id: string }) => record.id)).toEqual([
      "feat.quick-draw",
      "feat.same-name.remaster",
      "feat.same-name.remaster-variant",
    ]);
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
    expect(app).toContain("this.closePicker();\n    this.saveCharacterLocal(false);\n    this.renderAll();\n  }\n\n  getFallbackFeatCatalog");
    expect(app).toContain("stowArmor()");
    expect(app).toContain("stowShield()");
    expect(app).toContain("storeInventoryEntry(this.character.equippedArmor)");
    expect(app).toContain("storeInventoryEntry(this.character.equippedShield)");
    expect(app).toContain("equipArmorFromPicker(item.data)");
    expect(app).toContain("equipShieldFromPicker(item.data)");
    expect(app).toContain("const heritages = (PF2E_DATA.heritages || []).map(h => ({ name: h.name, type: \"Herança\", data: h }));");
    expect(app).toContain("comparação literal ocultava heranças válidas");
    expect(app).toContain('identity === "armor.unarmored"');
    expect(app).toContain("isUnarmoredEntry(previous)");
    expect(app).toContain("editEquippedArmor()");
    expect(app).toContain("editEquippedShield()");
    expect(app).toContain("shield.currentHp = currentHp;");
    expect(app).toContain("const entries = conditions.map((condition) => ({ ...condition, isBuff: false }))");
    expect(app).toContain("app.editCharacterCollectionItem('buffs', ${condition.buffIndex})");
    expect(app).toContain("removeBuff(index)");
    expect(app).toContain("const selectedActions = (this.character.actions || []).map");
    expect(app).toContain("removeAction(idx)");
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

  it("exports every character collection with localized provenance metadata", () => {
    const app = read("js/app.js");
    const exporter = app.slice(app.indexOf("  exportMarkdown()"), app.indexOf("  // EXPORTAÇÃO E DOWNLOAD", app.indexOf("  exportMarkdown()")));
    expect(exporter).toContain("const locale = this.getLocale()");
    expect(exporter).toContain("record?.names?.[locale]");
    expect(exporter).toContain("record?.source?.book");
    expect(exporter).toContain("record?.ruleset");
    expect(exporter).toContain("this.character.heritageInnateSpells");
    expect(exporter).toContain("this.character.inventory");
    expect(app).toContain("const sheetRecordMeta = (record)");
    expect(app).toContain("const sheetMetaLabels = sheetLocale === \"en\"");
    expect(app).toContain("sheetRecordMeta(item)");
    expect(app).toContain("sheetRecordMeta(sp)");
    expect(app).toContain("sheetRecordMeta(rit)");
  });

  it("keeps CRUD prompts localized for all configured locales", () => {
    const app = read("js/app.js");

    expect(app).toContain("const labels = locale === \"en\"");
    expect(app).toContain("Nombre del objeto:");
    expect(app).toContain("Nombre del conjuro:");
    expect(app).toContain("Nombre del nuevo contenedor");
  });

  it("does not hide object-catalog variants that have distinct IDs", () => {
    const app = read("js/app.js");

    expect(app).toContain("const identityKey = record?.id ? `id:${record.id}` : `name:${record?.names?.en || record?.name || key}`;");
    expect(app).toContain("Registros com IDs distintos podem compartilhar um nome localizado");
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
