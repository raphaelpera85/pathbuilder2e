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
    const accountCss = read("src/account.css");
    expect(accountCss).toContain(".locale-switcher .flag-btn");
    expect(accountCss).toContain(".account-overlay");
    expect(accountCss).toContain("overflow: hidden;");
    expect(accountCss).toContain("overscroll-behavior: contain;");
    expect(css).toContain("body.portal-page-active #legacy-builder-root { display: none !important; }");
    expect(css).toContain("body.portal-page-active #mobileViewNav,");
    expect(css).toContain("body.portal-page-active .quick-action-bar,");
    expect(css).toContain("body.portal-page-active .dice-roller-drawer { display: none !important; }");
    expect(read("src/PortalPages.tsx")).toContain("useLayoutEffect");
    expect(read("src/PortalPages.tsx")).toContain("useLayoutEffect(() => {");
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
    const legacyCss = read("css/style.css");
    expect(legacyCss).toContain("height: 52px;\n    min-height: 52px;");
    expect(legacyCss).toContain("flex-wrap: nowrap;");
    expect(legacyCss).toContain("top: 52px;");
    expect(css).toContain("Tablets e portáteis também mantêm a viewport fixa");
    expect(css).toContain(".portal-page { width: min(calc(100vw - 24px), 1280px); max-width: calc(100vw - 24px); padding-top: 28px; box-sizing: border-box; }");
    expect(css).toContain(".characters-library-grid { grid-template-columns: minmax(0, 1fr); }");
    expect(css).toContain(".portal-page.access-page { width: calc(100vw - 24px); max-width: calc(100vw - 24px); }");
    expect(css).toContain(".library-auth-page, .auth-card-hero, .auth-main-container { width: 100%; min-width: 0; max-width: 100%; box-sizing: border-box; }");
    expect(css).toContain(".auth-main-container { width: 100%; min-width: 0; display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);");
    expect(css).toContain(".source-badge.translation-pending");
    expect(css).toContain(".catalog-card-status");
  });

  it("prevents the item picker shell from widening portable viewports", () => {
    const css = read("src/itemPicker.css");
    expect(css).toContain("min-width: 0;");
    expect(css).toContain("box-sizing: border-box;");
    expect(css).toContain(".item-picker-main-tabs");
    expect(css).toContain("overflow-x: auto;");
  });

  it("fecha o drawer antes de navegar para evitar sobreposição da barra superior", () => {
    const app = read("js/app.js");
    const html = read("index.html");
    expect(app).toContain("navigatePortal(route)");
    expect(app).toContain('document.getElementById("drawerOverlay")?.classList.remove("active");');
    expect(app).toContain('document.querySelectorAll(".pb-drawer-overlay.active, .pb-modal-overlay.active")');
    expect(app).toContain('document.body.classList.toggle("portal-page-active", !onBuilder);');
    expect(app).toContain("window.location.hash = `#/${cleanRoute}`;");
    expect(app).toContain("// Antecedentes homônimos de livros/edições diferentes podem ter");
    expect(app).toContain("return finalize(PF2E_DATA.backgrounds.map(b => ({ name: b.name, type: \"Antecedente\", data: b })));");
    expect(html).toContain("onclick=\"app.navigatePortal('campaigns');\"");
    expect(html).toContain("onclick=\"app.navigatePortal('library');\"");
  });

  it("mantém a descrição acessível do dado na língua ativa", () => {
    const app = read("js/app.js");
    expect(app).toContain('const diceAriaPrefix = locale === "en" ? "Die"');
    expect(app).toContain('locale === "es" ? "resultado" : "resultado"');
  });

  it("exibe o resumo localizado dos mascotes na ficha", () => {
    const app = read("js/app.js");
    expect(app).toContain('pet.summaries?.[locale] || pet.description');
    expect(app).toContain('class="companion-description"');
  });

  it("indexa aliases legados para localizar nomes antigos da ficha", () => {
    const app = read("js/app.js");
    expect(app).toContain('Array.isArray(record.legacyNames) ? record.legacyNames : []');
  });

  it("revalida escolhas de classe por ID canônico também em fichas localizadas", () => {
    const app = read("js/app.js");
    expect(app).toContain('const classId = classRecord?.id || "";');
    expect(app).toContain('isClass("class.witch")');
    expect(app).toContain('isClass("class.oracle")');
    expect(app).toContain('classText.includes("bruja")');
  });

  it("deduplica mascotes pelo ID sem ocultar variantes homônimas", () => {
    const app = read("js/app.js");
    expect(app).toContain('pet?.id\n        ? `id:${String(pet.id).trim().toLowerCase()}`');
    expect(app).toContain('`name:${this.localizeItemName(pet?.name || "", locale)');
  });

  it("targets the actual legacy save-row markup during locale changes", () => {
    const app = read("js/app.js");
    expect(app).toContain('document.querySelectorAll(".saves-col-box .save-badge-row")');
    expect(app).toContain('querySelector("span:last-child")');
    expect(app).not.toContain('.saves-col-box .save-row-box');
  });

  it("targets the actual legacy ability-card markup during locale changes", () => {
    const app = read("js/app.js");
    expect(app).toContain('document.querySelectorAll(".abilities-summary-bar .ability-mini-box")');
    expect(app).not.toContain('.abilities-summary-bar .mini-box');
  });

  it("revalidates account and campaign characters before rendering", () => {
    const app = read("js/app.js");
    const start = app.indexOf("  loadCharacter(character) {");
    const end = app.indexOf("\n  openExportModal()", start);
    expect(start).toBeGreaterThanOrEqual(0);
    const loader = app.slice(start, end);
    expect(loader).toContain("assertSafeCharacterDocument(character)");
    expect(loader).toContain("this.revalidateLoadedSelections();");
    expect(loader).toContain("this.renderAll();");
    expect(app).toContain("this.character = assertSafeCharacterDocument(JSON.parse(document.getElementById(\"jsonArea\").value));\n      this.revalidateLoadedSelections();");
    expect(app).toContain("this.character = assertSafeCharacterDocument(this.lastAIGeneratedChar);\n      this.revalidateLoadedSelections();");
  });

  it("keeps campaign destructive actions and edition labels localized", () => {
    const campaigns = read("src/CampaignsPage.tsx");
    expect(campaigns).toContain('confirm(t("deleteCampaignConfirm"))');
    expect(campaigns).toContain('t("campaignCreateFailed")');
    expect(campaigns).not.toContain('err.message : String(err)');
    expect(campaigns).toContain('t("remasterEdition")');
    expect(campaigns).not.toContain('confirm("Deseja realmente excluir');
  });

  it("clears campaign data when the session resolves as signed out", () => {
    const campaigns = read("src/CampaignsPage.tsx");
    expect(campaigns).toContain("setCampaigns([]);");
    expect(campaigns).toContain("setSharedCharacters([]);");
    expect(campaigns).toContain("setMyCharacters([]);");
    expect(campaigns).toContain("setSelectedCampaignId(null);");
  });

  it("does not render raw service errors in account and library panels", () => {
    const app = read("js/app.js");
    const account = read("src/AccountPortal.tsx");
    const portal = read("src/PortalPages.tsx");
    expect(account).not.toContain("caught.message");
    expect(portal).not.toContain("err.message");
    expect(app).not.toContain("prefix + e.message");
    expect(app).not.toContain("prefix + (err.message || err)");
    expect(app).not.toContain("messages[locale]?.[issue.id] || issue.message");
  });

  it("keeps picker dialogs internally scrollable on touch screens", () => {
    const pickerCss = read("src/picker.css");
    const itemPickerCss = read("src/itemPicker.css");

    expect(pickerCss).toContain(".picker-list { min-height: 0; overflow-y: auto;");
    expect(pickerCss).toContain("overflow: hidden;");
    expect(pickerCss).toContain("grid-template-rows: minmax(138px, 34%) minmax(0, 1fr);");
    expect(pickerCss).toContain("@media (max-width: 640px)");
    expect(pickerCss).toContain(".picker-detail {\n  min-width: 0;\n  min-height: 0;\n  overflow-y: auto;");
    expect(pickerCss).toContain(".picker-list { min-height: 0;");
    expect(itemPickerCss).toContain(".item-picker-list {");
    expect(itemPickerCss).toContain("overflow-y: auto;");
    expect(itemPickerCss).toContain(".item-picker-detail {\n  padding: 20px;\n  overflow-y: auto;");
    expect(itemPickerCss).toContain("height: calc(100dvh - 8px);");
    expect(itemPickerCss).toContain("grid-template-rows: 180px minmax(0, 1fr);");
    expect(itemPickerCss).toContain(".picker-footer-actions { display: grid;");
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
    expect(app).toContain("this.freeRollTotal = (Number.isFinite(previousTotal) ? previousTotal : 0) + rollEntry.value;");
    expect(app).toContain("this.freeRollDiceList = [rollEntry];");
    expect(app).toContain("this.freeRollTotal = 0;");
    expect(arena).toContain('this.upsertDiceLog("free-roll"');
    expect(arena).not.toContain("list.map(d => {");
    expect(app).toContain("upsertDiceLog(key, title, formula, total, breakdown");
    expect(app).toContain("heritageInnateSpells");
    expect(app).toContain("heritageInnate: true");
    expect(app).toContain("Number(item.data?.rank ?? item.data?.level) !== 0");
    expect(app).toContain('const diceAriaPrefix = locale === "en" ? "Die"');
    expect(app).toContain('aria-label="${diceAriaPrefix} d${d.sides}');
    expect(app).toContain("Tirada libre");
    expect(read("index.html")).toContain('id="detGmLabel"');
    expect(app).toContain("Sincronização do Mestre");
    expect(app).toContain("staticLegacyLabels");
    expect(read("index.html")).toContain('id="knownRitualsHeading"');
    expect(read("index.html")).toContain('id="formulaBookIntro"');
    expect(app).toContain("formulaBookIntro");
    expect(read("index.html")).toContain('id="legacyRulesContent"');
    expect(app).toContain("The 4-Step Ability Boost Method");
    expect(read("index.html")).toContain('id="diceHistoryTitle"');
    expect(app).toContain("diceStaticLabels");
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

  it("persists and restores the dice history with the character document", () => {
    const app = read("js/app.js");
    expect(app).toContain("this.revalidateLoadedSelections();");
    expect(app).toContain("this.skipCloudAutosave = true;");
    expect(app).toContain("this.revalidateLoadedSelections();\n    this.normalizeCharacterCoins();");
    expect(app).toContain("snapshot.diceHistory = structuredClone(this.diceHistory.slice(0, 100));");
    expect(app).toContain("this.diceHistory = Array.isArray(this.character.diceHistory) ? this.character.diceHistory.slice(0, 100) : [];");
    expect(app).toContain("this.character.diceHistory = structuredClone(this.diceHistory.slice(0, 100));");
    expect(app).toContain("this.saveCharacterLocal(false);\n    const content = document.getElementById(\"diceLogContent\");");
  });

  it("não expõe o nome inglês entre parênteses no Livro de Fórmulas em pt-BR", () => {
    const app = read("js/app.js");
    expect(app).toContain("escapeHtml(this.localizeItemName(f.name, locale))");
  });

  it("mantém as ações básicas somente em português no locale pt-BR", () => {
    const app = read("js/app.js");
    expect(app).toContain('isEs ? "Golpear" : "Golpear"');
    expect(app).toContain('isEs ? "Zancada" : "Movimentar-se"');
    expect(app).not.toContain('"Golpear (Strike)"');
    expect(app).not.toContain('"Movimentar-se (Stride)"');
    expect(app).not.toContain('"Desmoralizar (Demoralize)"');
  });

  it("prioriza o resumo localizado nas descrições de talentos, arquétipos e fórmulas", () => {
    const app = read("js/app.js");
    expect(app).toContain("f.summaries?.[locale] || f.description || \"\"");
    expect(app).toContain("archetype.summaries?.[locale] || archetype.description || \"\"");
    expect(app).toContain("const localizedDescription = item.data.summaries?.[locale] || item.data.description || \"\"");
  });

  it("mantém os nomes estruturais do Ladino e do Cineticista em pt-BR", () => {
    const app = read("js/app.js");
    expect(app).toContain('["Especialização", "Racket", "Especialización"]');
    expect(app).toContain('["CD de Classe do Cineticista", "Kineticist Class DC", "CD de clase del cineticista", "none"]');
  });

  it("renderiza o bloco específico do Necromante também para fichas em inglês", () => {
    const app = read("js/app.js");
    expect(app).toContain('"class.necromancer": "necromancer"');
    expect(app).toContain('const classFeature = classFeatureKey ? featureCopy[classFeatureKey] : null;');
    expect(app).toContain('"necromant", "nigromant", "necromancer"');
  });

  it("localiza unidades e nomes de deslocamento no construtor", () => {
    const app = read("js/app.js");
    expect(app).toContain('const unit = locale === "en" ? "ft." : locale === "es" ? "pies" : "pés";');
    expect(app).toContain('{ swim: "Swim", climb: "Climb" }');
    expect(app).toContain('{ swim: "Nadar", climb: "Trepar" }');
    expect(app).toContain('this.getTraditionLabel(spellcasting.tradition, locale)');
  });

  it("localiza atributos estáticos acessíveis fora do React", () => {
    const index = read("index.html");
    const app = read("js/app.js");
    expect(index).toContain('id="trainedSkillsBadge"');
    expect(index).toContain('id="divineFontInput"');
    expect(index).toContain('id="aiPortraitPromptInput"');
    expect(app).toContain('trainedSkillsBadge.title = isEn ? "Selected Skills / Total Granted"');
    expect(app).toContain('divineFontInput.setAttribute("aria-label", isEn ? "Deity divine font"');
    expect(app).toContain('aiPortraitPrompt.setAttribute("placeholder", isEn ? "Character description for the AI..."');
  });

  it("mantém Bruxa como denominação pt-BR em todos os fallbacks", () => {
    const i18n = read("src/i18n.tsx");
    expect(i18n).toContain('"Bruxo": { "pt-BR": "Bruxa", en: "Witch", es: "Bruja" }');
  });

  it("normaliza traços importados em inglês antes de exibi-los em pt-BR", () => {
    const app = read("js/app.js");
    expect(app).toContain("const aliasKey = Object.keys(aliases).find((key) => normalized === key || normalized.startsWith(`${key} `));");
    expect(app).toContain('suffix = suffix.replace(/\\bfeet?\\b|\\bft\\.?\\b/gi, "pés")');
    expect(app).toContain('tethered: ["Ancorada", "Tethered", "Atada"]');
    expect(app).toContain('aftermath: ["Consequência", "Aftermath", "Consecuencia"]');
  });

  it("mantém os resultados do rolador 3D no idioma ativo", () => {
    const app = read("js/app.js");
    expect(app).toContain('title: `${locale === "en" ? "Damage" : locale === "es" ? "Daño" : "Dano"}: ${weaponName}`');
    expect(app).toContain('tag: isCrit ? (locale === "en" ? "Doubled Damage!"');
    expect(app).toContain('const displayLabel = checkLabels[locale]?.[label] || label;');
  });

  it("quebra a barra do picker em telefones estreitos sem criar scroll da página", () => {
    const pickerCss = read("src/picker.css");
    expect(pickerCss).toContain("@media (max-width: 420px)");
    expect(pickerCss).toContain(".picker-nav > div:last-child");
    expect(pickerCss).toContain("margin-left: 0 !important");
  });

  it("protege a remoção de condições e buffs contra índices inválidos", () => {
    const app = read("js/app.js");
    expect(app).toContain("if (!Array.isArray(entries) || !Number.isInteger(position) || position < 0 || position >= entries.length) return false;");
    expect(app).toContain("return true;\n  }\n\n  // MODAL PICKER DUAL-PANE");
  });

  it("mantém as concessões do Patrono separadas por idioma", () => {
    const app = read("js/app.js");
    expect(app).toContain("if (rawName && typeof rawName === \"object\")");
    expect(app).toContain("return rawName[locale] || rawName[\"pt-BR\"] || rawName.en || rawName.es || \"\";");
    expect(app).toContain("const trilingual = (value) => value ? { ...value } : \"\";");
  });

  it("reindexa nomes quando os catálogos React ficam disponíveis", () => {
    const app = read("js/app.js");
    const main = read("src/main.tsx");
    expect(app).toContain('window.addEventListener("pathbuilder:catalogs-ready"');
    expect(app).toContain("this.catalogNameIndex = null;");
    expect(main).toContain('window.dispatchEvent(new Event("pathbuilder:catalogs-ready"));');
  });

  it("mantém consultas e mutações de campanhas com fallback quando o backend trava", () => {
    const campaigns = read("src/services/campaigns.ts");
    expect(campaigns).toContain('import { withRequestTimeout } from "./requestTimeout";');
    expect(campaigns).toContain("As campanhas demoraram para responder");
    expect(campaigns).toContain("O salvamento da campanha demorou para responder");
    expect(campaigns).toContain("A exclusão da campanha demorou para responder");
  });

  it("não deixa a janela de regras variantes vazar o idioma padrão", () => {
    const index = read("index.html");
    const app = read("js/app.js");
    expect(index).toContain('id="variantRulesIntro"');
    expect(index).toContain('id="variantParagonTitle"');
    expect(app).toContain('setText("variantRulesIntro", copy.intro);');
    expect(app).toContain('paragonTitle: "🧬 Ancestry Paragon"');
    expect(app).toContain('paragonTitle: "🧬 Parangón de Ascendencia"');
  });

  it("usa os seletores reais do painel legado ao localizar ações e proficiências", () => {
    const index = read("index.html");
    const app = read("js/app.js");
    expect(index).toContain('class="quick-action-bar"');
    expect(index).toContain('pathbuilder:save-account-character');
    expect(index).toContain('class="weapon-prof-label"');
    expect(index).toContain('class="skills-column-heading"');
    expect(index).toContain('id="drawerPdf"');
    expect(index).toContain('id="drawerCompendium"');
    expect(index).toContain('id="skipToContent"');
    expect(app).toContain('document.querySelectorAll(".quick-action-bar button")');
    expect(app).toContain('quickButtons[7].innerText = isEn ? "☁️ Save to Account"');
    expect(app).toContain('document.querySelectorAll(".weapon-prof-group-item .weapon-prof-label")');
    expect(app).toContain('document.querySelector(".skills-column-heading")');
    expect(app).toContain('drawerPdf: isEn ?');
    expect(app).toContain('drawerCompendium: isEn ?');
    expect(app).toContain('skipToContent.textContent = isEn ? "Skip to content"');
    expect(app).toContain('document.querySelector("#percVal")?.parentElement?.querySelector("span:last-child")');
    expect(app).toContain('document.querySelector("#initVal")?.parentElement?.querySelector("span:last-child")');
  });

  it("mantém o Compêndio completo sem relaxar a filtragem dos pickers de escolha", () => {
    const app = read("js/app.js");
    const portal = read("src/PortalPages.tsx");
    expect(app).toContain("getPickerItems(type, options = {})");
    expect(app).toContain("resolvedOptions.includeIncompatible ? items : this.filterPickerItemsByCompatibility(type, items)");
    expect(portal).toContain("getPickerItems(type, { includeIncompatible: true })");
  });

  it("mantém a rolagem livre 3D com apenas o último dado visual e soma finita", () => {
    const app = read("js/app.js");
    expect(app).toContain("const previousTotal = Number(this.freeRollTotal);");
    expect(app).toContain("this.freeRollTotal = (Number.isFinite(previousTotal) ? previousTotal : 0) + rollEntry.value;");
    expect(app).toContain("this.freeRollDiceList = [rollEntry];");
    expect(app).toContain('this.upsertDiceLog("free-roll", logItemTitle, detailedRolls, total, formulaStr, false, false);');
  });

  it("expõe uma única fonte canônica para os módulos legado e React", () => {
    const data = read("js/pf2e_data.js");
    const main = read("src/main.tsx");
    expect(data).toContain('window.PF2E_DATA = PF2E_DATA;');
    expect(main).toContain('canonical: (window as any).PF2E_DATA');
    expect(main).toContain('window.dispatchEvent(new Event("pathbuilder:catalogs-ready"));');
  });

  it("evita que uma resposta antiga da biblioteca sobrescreva a sessão atual", () => {
    const portal = read("src/PortalPages.tsx");
    expect(portal).toContain("const charactersLoadIdRef = useRef(0);");
    expect(portal).toContain("if (requestId !== charactersLoadIdRef.current) return;");
    expect(portal).toContain("const refreshAfterCharacterChange = () => {");
    expect(portal).toContain("if (sessionRef.current) void loadUserCharacters(sessionRef.current);");
    expect(portal).toContain("sessionRef.current = next;");
    expect(portal).toContain("setSessionReady(true);");
    expect(portal).toContain("void loadUserCharacters(next);");
    expect(portal).toContain("charactersLoadIdRef.current += 1;");
    expect(portal).toContain("}, []);");
  });

  it("atualiza a lista de personagens imediatamente no painel de conta", () => {
    const account = read("src/AccountPortal.tsx");
    expect(account).toContain("void refreshCharacters(newSession.user);");
    expect(account).toContain("void refreshCharacters(logged.user);");
    expect(account).toContain("charactersLoadIdRef.current += 1;");
    expect(account).toContain("setLoading(false);");
  });

  it("impede que o login remoto fique indefinidamente em Processando", () => {
    const auth = read("src/services/auth.ts");
    expect(auth).toContain('supabase.auth.signInWithPassword({ email: emailToUse, password })');
    expect(auth).toContain('"O login demorou para responder. Tente novamente."');
    expect(auth).toContain('"A busca do usuário demorou para responder."');
    expect(auth).toContain('"O cadastro demorou para responder. Tente novamente."');
    expect(auth).toContain('"A exclusão da conta demorou para responder."');
  });

  it("não permite que um carregamento antigo reative o estado da tela de campanhas", () => {
    const campaigns = read("src/CampaignsPage.tsx");
    expect(campaigns).toContain("const loadEpoch = authEpochRef.current;");
    expect(campaigns).toContain("if (loadEpoch !== authEpochRef.current) return;");
    expect(campaigns).toContain("if (loadEpoch === authEpochRef.current) setLoading(false);");
  });

  it("invalida eventos assíncronos antigos de autenticação", () => {
    const auth = read("src/services/auth.ts");
    expect(auth).toContain("let authEventEpoch = 0;");
    expect(auth).toContain("const eventEpoch = ++authEventEpoch;");
    expect(auth).toContain("if (eventEpoch !== authEventEpoch || !current) return;");
    expect(auth).toContain("authEventEpoch += 1;");
    const callbackStart = auth.indexOf("supabase.auth.onAuthStateChange");
    const callbackEnd = auth.indexOf("supabaseAuthSubscription = subscription", callbackStart);
    const callback = auth.slice(callbackStart, callbackEnd);
    expect(callback).not.toContain("await getCurrentSession()");
    expect(callback).toContain("void Promise.resolve().then");
  });

  it("localiza a unidade de deslocamento nos detalhes de ancestralidade", () => {
    const app = read("js/app.js");
    expect(app).toContain('locale === "en" ? "feet" : locale === "es" ? "pies" : "pés"');
  });

  it("prioriza descrições localizadas nas ações da ficha", () => {
    const app = read("js/app.js");
    expect(app).toContain("desc: a.summaries?.[locale] || a.description || \"\"");
    expect(app).toContain("desc: action.summaries?.[locale] || action.description || action.desc || \"\"");
  });

  it("localiza traços exibidos no detalhe do compêndio", () => {
    const portal = read("src/PortalPages.tsx");
    expect(portal).toContain("function getLocalizedTrait(trait: string");
    expect(portal).toContain("getLocalizedTrait(trait, locale)");
  });

  it("localiza títulos e idiomas das fontes do compêndio", () => {
    const portal = read("src/PortalPages.tsx");
    expect(portal).toContain("function localizeSourceBook(book: string");
    expect(portal).toContain("localizeSourceTitle(source, locale)");
    expect(portal).toContain("localizeSourceLanguage(source.language, locale)");
  });

  it("localiza nomes de perfis e ataques dos mascotes", () => {
    const app = read("js/app.js");
    expect(app).toContain("this.localizeItemName(profile.name || \"\", locale)");
    expect(app).toContain("this.localizeItemName(atk.name || \"\", locale)");
    expect(app).toContain('"Companheiro animal"');
    expect(app).toContain("const petTypeLabel = petTypeKey.includes");
  });

  it("impede overflow dos botões de navegação em telas portáteis estreitas", () => {
    const css = read("css/style.css");
    expect(css).toContain(".pb-mobile-view-btn {");
    expect(css).toContain("min-width: 0;");
    expect(css).toContain("overflow-wrap: anywhere;");
  });

  it("rotula o picker de escudos como escudos", () => {
    const picker = read("src/PickerModal.tsx");
    expect(picker).toContain('armor: "armors", shield: "shields"');
  });

  it("oculta o alias legado duplicado de Exemplar no catálogo de classes", () => {
    const data = read("js/pf2e_data.js");
    expect(data).toContain('PF2E_DATA.classes["Exemplar (Exemplar)"].legacyAlias = true');
  });

  it("consolida nomes repetidos de mascotes, fórmulas e heranças no picker legado", () => {
    const app = read("js/app.js");
    expect(app).toContain("const collapseDuplicateLabels = (entries) => {");
    expect(app).toContain("this.localizeItemName(");
    expect(app).toContain('["background", "formula", "pet", "heritage"].includes(this.currentPickerType)');
    expect(app).toContain("if (!previous || score(entry) > score(previous)) bestByLabel.set(label, entry);");
    const compatibilityFilter = app.indexOf("items = items.filter(item => {");
    const deduplication = app.lastIndexOf("collapseDuplicateLabels(items)");
    expect(compatibilityFilter).toBeGreaterThan(-1);
    expect(deduplication).toBeGreaterThan(compatibilityFilter);
  });

  it("mantém controles da topbar com largura estável ao trocar rota ou idioma", () => {
    const css = read("src/account.css");
    expect(css).toContain(".locale-switcher {\n  flex: 0 0 auto;");
    expect(css).toContain(".account-trigger {\n  flex: 0 0 auto;");
  });

  it("confina o conteúdo de páginas simples em painéis internos no portátil", () => {
    const css = read("src/portal.css");
    expect(css).toContain(".portal-page-active #react-portal-root > .portal-page > .portal-panel,");
    expect(css).toContain(".portal-page-active #react-portal-root > .portal-page > .privacy-card,");
  });

  it("usa o mesmo localizador de traços no picker React", () => {
    const picker = read("src/PickerModal.tsx");
    expect(picker).toContain("function getTraitDisplayName(trait: string");
    expect(picker).toContain("getTraitDisplayName(trait, locale)");
  });

  it("não exibe categorias brutas em inglês no detalhe do item", () => {
    const picker = read("src/ItemPickerModal.tsx");
    expect(picker).toContain("function formatItemCategory(mainCategory: string");
    expect(picker).toContain("formatItemCategory(selectedItem.mainCategory, selectedItem.subCategory, locale)");
    expect(picker).toContain('locale === "en" ? "Level" : locale === "es" ? "Nivel" : "Nível"');
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
    expect(app).toContain("const hexValueLabels = typeof hexValue === \"object\"");
    expect(app).toContain("this.character.patronHexId = hex.id");
    expect(app).toContain("mergeCatalogRecords([], PF2E_DATA.archetypes || [])");
    expect(app).toContain("mergeCatalogRecords([], PF2E_DATA.weapons || [])");
    expect(app).toContain("mergeCatalogRecords([], PF2E_DATA.armors || [])");
    expect(app).toContain('promptSubclass(options = {}) {\n    this.openPicker("subclass", options);\n  }');
    expect(app).toContain('const supportedTargetFields = new Set([');
    expect(app).toContain('"researchField", "instinct", "muse", "doctrine", "order"');
    expect(app).toContain('const classTargetFields = {');
    expect(app).toContain('alchemist: "researchField", barbarian: "instinct", bard: "muse"');
    expect(app).toContain('summoner: "eidolon", wizard: "arcaneSchool", magus: "hybridStudy", necromancer: "fatalMethod"');
    expect(app).toContain('"fatalMethod", "grimFascination"');
    expect(app).toContain('clearFields(["fatalMethod", "grimFascination"])');
    expect(app).toContain('"fatalMethod", "grimFascination"\n    ]);');
    expect(app).toContain("const choiceFields = new Set([");
    expect(app).toContain("record.choiceField === field || record[field] === true");
    expect(read("js/pf2e_data.js")).toContain("const CLASS_CHOICE_FIELDS = {");
    expect(read("js/pf2e_data.js")).toContain("choiceField: CLASS_CHOICE_FIELDS[classId]");
    expect(app).toContain('const recoveryCopy = locale === "en"');
    expect(app).toContain('const shieldCopy = locale === "en"');
    expect(app).toContain('["Patrono", "Patron", "Patrón", "subclass", "patron"]');
    expect(app).toContain('targetField === "patron"');
    expect(app).toContain('targetField === "wizardThesis"');
    expect(app).toContain('targetField === "patron" && itemData?.patron !== true');
    expect(app).toContain('targetField === "wizardThesis" && itemData?.thesis !== true');
    expect(app).toContain('targetField === "mystery" && itemData?.mystery !== true');
    expect(app).toContain('subclass.choiceField === targetField || subclass[targetField] === true');
    expect(app).toContain('item.data?.choiceField === targetField || item.data?.[targetField] === true');
    expect(app).toContain('itemData.classId !== selectedClass.id');
    expect(app).toContain('compatibility?.state === "incompatible"');
    expect(app).toContain('targetField === "mystery"');
    expect(app).toContain('const canonicalValue = item.data?.id || item.name;');
    expect(app).toContain('this.character[targetField] = canonicalValue;');
    expect(app).toContain('["Tese Arcana", "Select Thesis", "Seleccionar tesis", "subclass", "wizardThesis"]');
    expect(app).toContain('["Mistério", "Select Mystery", "Seleccionar misterio", "subclass", "mystery"]');
    expect(app).toContain("grantedByPatron: patron.id");
    expect(app).toContain("(!spell?.grantedByArcaneSchool || isWizard)");
    expect(app).toContain("(!spell?.grantedByHybridStudy || isMagus)");
    expect(app).toContain("(!spell?.grantedByMystery || isOracle)");
    expect(app).toContain("!pet?.grantedByPatron || isWitch");
    expect(app).toContain("grantedByArcaneSchool: schoolId");
    expect(app).toContain("spell?.grantedByArcaneSchool");
    expect(app).toContain("grantedByHybridStudy: selectedHybridStudy.id");
    expect(app).toContain("this.character.hybridStudy = selectedHybridStudy.name;");
    expect(app).toContain('key === "Feitiços de Revelação" && selectedOracle?.revelationSpellIds');
    expect(app).toContain("grantedByMystery: selectedOracleMystery.id");
    expect(app).toContain("this.character.mystery = selectedOracleMystery.name;");
    expect(app).toContain('pet.id === "pet.familiar.mystic"');
    expect(app).toContain('grantedByClass: "class.witch"');
    expect(app).toContain("applySubclassSelection(item, this.activePickerOptions || {})");
    expect(app).toContain("spell?.grantedByClass || spell?.grantedByPatron || spell?.grantedByHybridStudy");
    expect(app).toContain("pet?.grantedByClass || pet?.grantedByPatron || pet?.grantedByHybridStudy");
    expect(app).toContain('getObjectCatalogRecords(PF2E_DATA.classes).filter(({ record }) => !record?.legacyAlias)');
    expect(app).toContain('["Hex Inicial", "Initial Hex", "Maleficio inicial", "spell", "patronHex"]');
    expect(app).toContain("this.character.spells = this.character.spells.filter((spell) => PF2E_ENGINE.getSpellCompatibility(this.character, spell).state !== \"incompatible\")");
    expect(app).toContain("function findCatalogRecord(collection, value)");
    expect(app).toContain("const heritages = (PF2E_DATA.heritages || []).filter(h => !h?.legacyAlias).map(h => ({ name: h.name, type: \"Herança\", data: h }));");
    expect(app).toContain("const maximumRank = Number(level) >= 15 ? 4 : Number(level) >= 7 ? 3 : Number(level) >= 3 ? 2 : 1;");
    expect(app).toContain("const skillOptions = Object.keys(this.calc?.skills || {})");
    expect(app).toContain('this.clearProgressionSlots("class_feat");');
    expect(app).toContain('this.clearProgressionSlots("ancestry_feat");');
    expect(app).toContain("const classBound = feat?.classId || (Array.isArray(feat?.classIds)");
    expect(app).toContain("const ancestryBound = feat?.ancestryId || (Array.isArray(feat?.ancestryIds)");
    expect(app).toContain("this.character.archetypes = this.character.archetypes.filter");
    expect(app).toContain("this.character.spells = this.character.spells.filter(spell => PF2E_ENGINE.getSpellCompatibility");
    expect(app).toContain("this.character.pets = this.character.pets.filter(pet => PF2E_ENGINE.getPrerequisiteCompatibility(this.character, pet).state !== \"incompatible\")");
    expect(app).toContain('"researchField", "instinct", "muse", "doctrine", "order", "racket", "hunterEdge"');
    expect(app).toContain('this.character.actions = this.character.actions.filter((action) => !action?.grantedByClass);');
    expect(app).toContain('this.character.classFeatures = this.character.classFeatures.filter((feature) => !feature?.grantedByClass);');
    expect(app).toContain('"bloodline", "methodology", "style", "innovation", "way"');
    expect(app).toContain('"implement", "apparition", "icon", "banner", "guardianDefense"');
    expect(app).toContain("const selectedClassRecord = Object.entries(PF2E_DATA.classes || {}).find");
    expect(app).toContain('const classValue = this.character.class && typeof this.character.class === "object"');
    expect(app).toContain('const classText = String(classValue || "").toLowerCase();');
    expect(app).toContain('const classValue = char.class && typeof char.class === "object"');
    expect(app).toContain("const classHasSubclassOptions = Boolean(selectedClassRecord?.id)");
    expect(app).toContain('picker === "subclass" && classHasSubclassOptions');
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
    expect(app).toContain("const compatible = resolvedOptions.includeIncompatible ? items : this.filterPickerItemsByCompatibility(type, items);");
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
    expect(app).toContain("const mechanics = item.data.mechanics?.[locale];");
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
    expect(app).toContain("const abilityCopy = isEn ? [\"SIZE\", \"SPEED\", \"STR\", \"DEX\", \"CON\", \"INT\"]");
    expect(app).toContain("Character Name");
    expect(app).toContain("Configure variant rules (Free Archetype, ABP)");
    expect(picker).toContain('"Impulse Feats"');
    expect(picker).toContain('cat.includes("impulso") || cat.includes("impulse")');
    expect(picker).toContain('locale === "en" ? "AC Bonus"');
    expect(picker).toContain('locale === "es" ? "PG (LCR)"');
    expect(picker).toContain('const collapseExactLabels = ["class", "background", "heritage", "pet", "formula"].includes(pickerType);');
    expect(picker).toContain('const previous = collapsedLabels.get(normalizedLabel);');
    expect(picker).toContain("const canStillApply = purchasePool.every");
    expect(picker).toContain("const currentCopper = typeof (window as any).app?.getCharacterTotalCopper");
    expect(picker).toContain("currentCopper < purchasePoolTotalCopper");
    expect(picker).toContain("O pool é confirmado como uma transação");
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
    expect(app).toContain("const seenPetIdentities = new Set();");
    expect(app).toContain("const profileAcLabel = isEn ? \"AC\" : \"CA\";");
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
    expect(app).toContain('this.character.patronFamiliarSpell = "";');
    expect(app).toContain('this.character.magicTradition = "";');
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
    expect(app).toContain('const editableCollections = new Set(["weapons", "spells", "heritageInnateSpells", "rituals", "pets", "feats", "archetypes", "actions", "formulas", "buffs", "loreSkills"]);');
    expect(app).toContain('const removableCollections = new Set(["weapons", "spells", "heritageInnateSpells", "rituals", "pets", "feats", "archetypes", "actions", "formulas", "buffs", "loreSkills"]);');
    expect(app).toContain("return true;\n    }\n    return false;\n  }\n\n  promptEditCoin");
    expect(gear).toContain("this.saveCharacterLocal(false);");
    expect(gear).toContain("this.character.inventory.splice(idx, 1);");
    expect(app).toContain("onclick=\"app.editInventoryItem(${idx})\"");
    expect(app).toContain("onclick=\"app.editContainer(${idx})\"");
    expect(app).toContain("removeContainer(idx)");
    expect(app).toContain("container.items.forEach((item) => {");
    expect(app).toContain("incomingIdentity && identity(entry) === incomingIdentity");
    expect(app).toContain("editCharacterCollectionItem(collection, idx)");
    expect(app).toContain("app.editCharacterCollectionItem('spells', ${idx})");
    expect(app).toContain("app.editCharacterCollectionItem('formulas', ${formulaIndex})");
    expect(app).toContain("this.saveCharacterLocal(false);\n    this.renderAll();\n    return true;\n  }\n  removeCharacterCollectionItem(collection, idx)");
    expect(app).toContain("this.saveCharacterLocal(false);\n    this.renderAll();\n  }\n\n  applyPurchasePoolSelection");
    expect(app).toContain("this.closePicker();\n    this.saveCharacterLocal(false);\n    this.renderAll();\n  }\n\n  getFallbackFeatCatalog");
    expect(app).toContain("stowArmor()");
    expect(app).toContain("stowShield()");
    expect(app).toContain("storeInventoryEntry(this.character.equippedArmor)");
    expect(app).toContain("storeInventoryEntry(this.character.equippedShield)");
    expect(app).toContain("equipArmorFromPicker(item.data)");
    expect(app).toContain("equipShieldFromPicker(item.data)");
    expect(app).toContain("const heritages = (PF2E_DATA.heritages || []).filter(h => !h?.legacyAlias).map(h => ({ name: h.name, type: \"Herança\", data: h }));");
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

  it("não deixa textos de equipamentos em português nos locales alternativos", () => {
    const app = read("js/app.js");
    expect(app).toContain('isEn ? "Click to edit" : isEs ? "Haz clic para editar" : "Clique para editar"');
    expect(app).toContain('isEn ? " · +1 saves" : isEs ? " · +1 salvaciones" : " · +1 salvaguardas"');
    expect(app).toContain('isEn ? "Max" : isEs ? "Máx." : "Máx."');
  });

  it("não trata INITIAL_SESSION nula como logout durante a hidratação", () => {
    const auth = read("src/services/auth.ts");
    expect(auth).toContain('event === "INITIAL_SESSION" && !nextSession');
    expect(auth).toContain("não é uma confirmação de logout");
  });

  it("não renderiza o formulário de login antes da sessão ser resolvida", () => {
    const account = read("src/AccountPortal.tsx");
    expect(account).toContain("const [sessionReady, setSessionReady] = useState(false);");
    expect(account).toContain("!sessionReady ? (");
    expect(account).toContain('role="status" aria-live="polite"');
  });

  it("reusa a sessão compartilhada ao remontar o portal de conta", () => {
    const auth = read("src/services/auth.ts");
    expect(auth).toContain("if (cachedSession !== undefined) callback(cachedSession);");
    expect(auth).toContain("Reaberturas do portal");
  });

  it("revalida a sessão compartilhada antes de abrir o login pelo salvamento do construtor", () => {
    const account = read("src/AccountPortal.tsx");
    const app = read("js/app.js");
    expect(account).toContain("const saveCurrent = async (activeSession: AuthSession | null = session, silent = false, queuedCharacter?: Record<string, unknown>)");
    expect(account).toContain('pathbuilder:character-changed');
    expect(app).toContain('pathbuilder:character-changed');
    expect(account).toContain('pf2e_pending_cloud_save_');
    expect(account).toContain('Math.min(30_000, 1_000 * (2 ** Math.min(autoSaveAttemptRef.current, 5)))');
    expect(account).toContain('autoSaveStatus === "syncing"');
    expect(account).toContain('JSON.parse(pending)');
    expect(account).toContain("const scheduleAutoSave = (activeSession: AuthSession) =>");
    expect(account).toContain("void getCurrentSession().then((activeSession) => {");
    expect(account).toContain("void saveCurrent(activeSession, true, char || undefined);");
    expect(account).toContain("window.setTimeout(() => void saveCurrent(activeSession, true), 0);");
    expect(account).toContain("window.clearTimeout(autoSaveRetryTimerRef.current);");
    expect(account).toContain("const activeSession = session || await getCurrentSession();");
    expect(account).toContain("void saveCurrent(activeSession);");
  });

  it("localiza os subtítulos estruturais do portal", () => {
    const portal = read("src/PortalPages.tsx");
    const campaigns = read("src/CampaignsPage.tsx");
    expect(portal).toContain('t("compendiumKicker")');
    expect(portal).toContain('t("rulesKicker")');
    expect(portal).toContain('t("libraryKicker")');
    expect(portal).toContain('t("privacyKicker")');
    expect(campaigns).toContain('t("gmPanelKicker")');
    expect(campaigns).toContain('t("treasureGranted")');
    expect(campaigns).toContain('t("hitPointsShort")');
    expect(campaigns).toContain('t("armorClassShort")');
  });

  it("não deixa a opção de divindade vazia voltar ao português em espanhol", () => {
    const app = read("js/app.js");
    expect(app).toContain('locale === "es" ? "No seleccionada" : "Não definida"');
    expect(app).toContain('locale === "es" ? "Ninguna deidad" : "Nenhuma divindade"');
    expect(app).toContain("const deityTitles = {");
    expect(app).toContain('title: titles[locale === "en" ? 1 : locale === "es" ? 2 : 0]');
    expect(app).toContain('locale === "es" ? "No seleccionada" : "Não definida"');
    expect(app).toContain('deityName === "No seleccionada"');
  });

  it("revalida escolhas específicas de classe contra o catálogo", () => {
    const app = read("js/app.js");
    expect(app).toContain('record.classId === "class.witch" && record.patron === true');
    expect(app).toContain('spell.grantedByPatron === patron.id');
    expect(app).toContain('pet.grantedByPatron === patron.id');
    expect(app).toContain('record.classId === "class.wizard" && record.thesis === true');
    expect(app).toContain('record.classId === "class.wizard" && record.school === true');
    expect(app).toContain('record.classId === "class.magus" && record.hybridStudy === true');
    expect(app).toContain('record.classId === "class.oracle" && record.mystery === true');
    expect(read("js/pf2e_data.js")).toContain("const PLAYER_CORE_2_ORACLE_INITIAL_REVELATIONS");
    expect(read("js/pf2e_data.js")).toContain("revelationSpellIds: [spell.id]");
    expect(read("js/pf2e_data.js")).toContain("const PLAYER_CORE_2_ORACLE_MYSTERY_DETAILS");
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

  it("localizes readiness status, issues, actions, and close control", () => {
    const app = read("js/app.js");
    const html = read("index.html");
    const readiness = app.slice(app.indexOf("  renderReadinessModal()"), app.indexOf("  resolveReadinessIssue(", app.indexOf("  renderReadinessModal()")));

    expect(readiness).toContain('const copy = locale === "en"');
    expect(readiness).toContain("const localizedIssue = (issue)");
    expect(readiness).toContain('const closeEl = document.getElementById("readinessModalClose");');
    expect(readiness).toContain("closeEl.innerText = copy.close;");
    expect(html).toContain('id="readinessModalClose"');
  });

  it("builds the printable reference sheet from the selected locale", () => {
    const app = read("js/app.js");
    const print = app.slice(app.indexOf("  printReferenceSheet()"), app.indexOf("  printLegacySheet()", app.indexOf("  printReferenceSheet()")));

    expect(print).toContain('const sheetCopy = sheetLocale === "en"');
    expect(print).toContain("${sheetCopy.officialSubtitle}");
    expect(print).toContain("${sheetCopy.pageOf.replace(\"{page}\", \"4\")}");
    expect(print).toContain("${sheetCopy.noSpells}");
    expect(print).toContain('sheetCopy.circle.replace("{rank}"');
  });

  it("localizes the legacy printable sheet and escapes character-controlled labels", () => {
    const app = read("js/app.js");
    const legacyPrint = app.slice(app.indexOf("  printLegacySheet()"), app.indexOf("  // =========================================================================\n  // CONTROLADOR DO ASSISTENTE", app.indexOf("  printLegacySheet()")));

    expect(legacyPrint).toContain('const copy = locale === "en"');
    expect(legacyPrint).toContain("${copy.title}");
    expect(legacyPrint).toContain("${esc(this.character.name)}");
    expect(legacyPrint).toContain("${copy.saves}");
    expect(legacyPrint).toContain("const abilityShort = locale === \"en\"");
    expect(legacyPrint).toContain("str: \"STR\"");
    expect(legacyPrint).toContain("str: \"FUE\"");
    expect(legacyPrint).toContain("${abilityShort.str}");
  });

  it("localizes interactive alerts and escapes AI preview content", () => {
    const app = read("js/app.js");

    expect(app).toContain('prompt(locale === "en"');
    expect(app).toContain('alert(locale === "en" ? "JSON copied!"');
    expect(app).toContain("Editable PDF module was not loaded.");
    expect(app).toContain('locale === "en" ? "Weapons"');
    expect(app).toContain("escapeHtml(generated.equippedArmor?.name");
    expect(app).toContain("escapeHtml(generated.aiNotes.tacticalTip)");
    expect(app).toContain('locale === "en" ? "Speed"');
    expect(app).toContain('locale === "en" ? "Perception"');
    expect(app).toContain('locale === "en" ? "AC"');
    expect(app).toContain('locale === "en" ? "HP"');
    expect(app).toContain('const copy = locale === "en"');
    expect(app).toContain('const critText = locale === "en"');
    expect(app).toContain('No GM linked');
    expect(app).toContain('avatarModalTitle: isEn ? "Portrait & Avatar Studio"');
    expect(app).toContain('btnGenerateAICharacter: isEn ? "✨ Generate Character with AI"');
    expect(app).toContain('const diceTitle = isEn ? "Open Dice Roller (Free Roll / History)"');
    expect(app).toContain('button.title = isEn ? `Roll ${label}`');
    expect(app).toContain('["class", "background", "formula", "pet", "heritage"].includes(this.currentPickerType)');
    expect(app).toContain('if ((type === "item" || type === "gear") && deductCoins)');
    expect(app).toContain('if (type === "spell" && options?.hexOnly && item.data?.hex !== true');
    expect(app).toContain('if (this.currentPickerType === "spell" && this.activePickerOptions?.hexOnly && item.data?.hex !== true');
    expect(app).toContain("const isWitchHex = options?.hexOnly");
    expect(app).toContain("const isWitchHex = this.activePickerOptions?.hexOnly");
    expect(app).toContain("nunca adicionar o item e deixar o");
    expect(app).toContain("const visibleLabels = new Set();");
    expect(app).toContain("function getCatalogDisplayName(record, locale = \"pt-BR\")");
    expect(app).toContain("function localizeSourceBookName(book, locale = \"pt-BR\")");
    expect(app).toContain("localizeSourceBookName(record.source.book, locale)");
    expect(app).toContain("Manual do Jogador PF2e (compilação local)");
    expect(app).toContain("getCatalogDisplayName(item.data, locale)");
    expect(read("js/pf2e_data.js")).toContain('legacyNames: ["Bruxo"]');
    expect(read("js/pf2e_engine.js")).toContain("...(record.legacyNames || [])");
  });

  it("does not hide object-catalog variants that have distinct IDs", () => {
    const app = read("js/app.js");

    expect(app).toContain("const identityKey = record?.id ? `id:${record.id}` : `name:${record?.names?.en || record?.name || key}`;");
    expect(app).toContain("Registros com IDs distintos podem compartilhar um nome localizado");
  });

  it("keeps the Exemplar legacy alias importable but out of visible class pickers", () => {
    const data = read("js/pf2e_data.js");
    const app = read("js/app.js");

    expect(data).toContain('legacyAlias: true');
    expect(app).toContain('getObjectCatalogRecords(PF2E_DATA.classes).filter(({ record }) => !record?.legacyAlias)');
    expect(app).toContain('getObjectCatalogRecords(PF2E_DATA.classes).filter(({ record }) => !record?.legacyAlias).map(({ key, record }) => ({ name: key, type: "Classe", data: record }))');
  });

  it("colapsa duplicatas exatas nos pickers sem esconder variantes de itens", () => {
    const app = read("js/app.js");
    expect(app).toContain("const finalize = (items, finalizeOptions = {}) =>");
    expect(app).toContain("if (resolvedOptions.collapseDuplicateLabels) {");
    expect(app).toContain("{ collapseDuplicateLabels: true });");
    expect(app).toContain("localizeSourceBookName(source.book, locale)");
    expect(app).toContain("const recoveryMultiplier = Math.max(1, Number(this.calc.featEffects?.dailyRecoveryMultiplier) || 1);");
    expect(app).toContain("const naturalRecovery = Math.max(1, conModifier * (Number(this.character.level) || 1)) * recoveryMultiplier;");
    expect(app).toContain('if (["class", "background", "formula", "pet", "heritage"].includes(this.currentPickerType))');
    expect(app).toContain("if (!label || visibleLabels.has(label)) return false;");
    expect(app).toContain("mergeCatalogRecords(sharedCatalogs.pets, PF2E_DATA.pets)");
    expect(app).toContain("mergeCatalogRecords([], PF2E_DATA.formulas || [])");
  });

  it("consolida rótulos legados e canônicos equivalentes nos pickers", () => {
    const app = read("js/app.js");
    const picker = read("src/PickerModal.tsx");
    expect(app).toContain("function normalizePickerDedupLabel(value, type)");
    expect(app).toContain('replace(/^formula\\s*:\\s*/, "").replace(/\\s*\\([^)]*\\)\\s*$/, "")');
    expect(picker).toContain("function normalizePickerDedupLabel(value: string, pickerType: PickerType)");
    expect(picker).toContain('replace(/^formula\\s*:\\s*/, "").replace(/\\s*\\([^)]*\\)\\s*$/, "")');
    expect(app).toContain("recordScore(item) > recordScore(result[previousIndex])");
    expect(picker).toContain("score(item) > score(previous)");
  });

  it("aplica o pool de compras de itens atomicamente", () => {
    const app = read("js/app.js");
    const picker = read("src/ItemPickerModal.tsx");
    expect(app).toContain("applyPurchasePoolSelection(entries = [])");
    expect(app).toContain("const totalCopper = normalizedEntries.reduce");
    expect(app).toContain("this.character.coins = { pp, gp, sp, cp };");
    expect(picker).toContain("app.applyPurchasePoolSelection(entries)");
  });

  it("mantém os textos iniciais do shell em português sem parentéticos ingleses", () => {
    const html = read("index.html");
    expect(html).toContain("Arquétipo Livre, Progressão Automática de Bônus");
    expect(html).toContain("📁 Enviar imagem / URL");
    expect(html).toContain("Rolagem Livre / Histórico");
    expect(html).not.toContain("Free Archetype)");
    expect(html).not.toContain("Ancestry Paragon)");
    expect(html).not.toContain("Upload / URL Manual");
    expect(html).not.toContain("Saberes (Lores)");
  });

  it("exibe pré-requisitos localizados no detalhe do picker legado", () => {
    const app = read("js/app.js");
    expect(app).toContain("localizePrerequisiteText(value, locale = this.getLocale())");
    expect(app).toContain("const prerequisite = item.data.prereq || item.data.prerequisites;");
    expect(app).toContain('"Requisitos previos"');
  });

  it("permite atualizar a ficha de número 100 sem quebrar a cota", () => {
    const migration = read("supabase/migrations/202608270002_character_limits.sql");
    const schema = read("supabase/schema_full.sql");
    for (const sql of [migration, schema]) {
      expect(sql).toContain("where user_id = new.user_id");
      expect(sql).toContain("and character_key = new.character_key");
      expect(sql).toContain("if not exists (");
      expect(sql).toContain("count(*) from public.characters where user_id = new.user_id");
      expect(sql).toContain("pg_catalog.pg_advisory_xact_lock");
      expect(sql).toContain("pg_catalog.hashtextextended(new.user_id::text, 0)");
    }
  });

  it("mantém histórico normalizado de revisões no banco além do fallback embutido", () => {
    const migration = read("supabase/migrations/202608270002_character_limits.sql");
    const schema = read("supabase/schema_full.sql");
    for (const sql of [migration, schema]) {
      expect(sql).toContain("create table if not exists public.character_revisions");
      expect(sql).toContain("references public.characters(id) on delete cascade");
      expect(sql).toContain("character_revisions_owner_saved_idx");
      expect(sql).toContain('create policy "character_revisions_own"');
      expect(sql).toContain("auth.uid()) = user_id");
    }
    const service = read("src/services/characters.ts");
    expect(service).toContain('from("character_revisions").insert');
    expect(service).toContain("persistRemoteRevision(saved, savedCharacter.history?.[0])");
    expect(service).toContain('from("character_revisions")');
    expect(service).toContain("hydrateRemoteHistory(remote, activeUser.id)");
    expect(service).toContain("character_id,saved_at,name,level,data");
  });

  it("reconhece nomes espanhóis de classes ao renderizar a progressão legada", () => {
    const app = read("js/app.js");
    expect(app).toContain('"class.ranger": "ranger"');
    expect(app).toContain('"class.monk": "monk"');
    expect(app).toContain('"class.sorcerer": "sorcerer"');
    expect(app).toContain('"class.gunslinger": "gunslinger"');
    expect(app).toContain('"class.rogue": "rogue"');
    expect(app).toContain('"class.guardian": "guardian"');
    expect(app).toContain('"class.kineticist": "kineticist"');
    expect(app).toContain('"bruja"');
    expect(app).toContain('"guerr"');
    expect(app).toContain('"hechicer"');
  });

  it("provides a strict catalog audit command for the remaining coverage work", () => {
    const packageJson = read("package.json");
    const audit = read("scripts/audit-catalog.cjs");

    expect(packageJson).toContain('"audit:catalog": "node scripts/audit-catalog.cjs"');
    expect(audit).toContain("missingNames");
    expect(audit).toContain("missingSummaries");
    expect(audit).toContain("duplicateIds");
    expect(audit).toContain("duplicateNames");
    expect(audit).toContain("duplicateLocalizedNames");
    expect(audit).toContain('category === "items"');
    expect(audit).toContain("itemCompendium");
    expect(audit).toContain('"subclasses"');
    expect(audit).toContain('"heritages"');
    expect(audit).toContain("process.argv.includes(\"--strict\")");
  });
});
