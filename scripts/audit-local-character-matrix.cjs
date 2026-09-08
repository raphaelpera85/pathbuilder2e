const { chromium } = require("playwright");
const fs = require("node:fs");

const baseUrl = "http://127.0.0.1:5173/#/builder";
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const scenarios = [
  { id: "mago-anao", ancestry: "Anão", heritage: "Anão Forjado em Rocha", background: "Eremita", className: "Mago", weapon: "Arco Longo" },
  { id: "guerreiro-elfo", ancestry: "Elfo", heritage: "Elfo da Caverna", background: "Gladiador", className: "Guerreiro", weapon: "Espada Longa" },
  { id: "ladino-goblin", ancestry: "Goblin", heritage: "Goblin Cabeça-Dura", background: "Criminoso", className: "Ladino", weapon: "Adaga" },
  { id: "clerigo-humano", ancestry: "Humano", heritage: "Humano Habilidoso (Perícia extra)", background: "Abençoado", className: "Clérigo", weapon: "Maça" },
];

async function main() {
  const options = { headless: true };
  if (fs.existsSync(chromePath)) options.executablePath = chromePath;
  const browser = await chromium.launch(options);
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const failures = [];
  const checks = [];
  const check = (name, value) => {
    checks.push({ name, pass: Boolean(value) });
    if (!value) failures.push(name);
  };

  page.on("dialog", dialog => dialog.dismiss());
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#legacy-builder-root:not([hidden])");

  async function openPicker(type, options) {
    await page.evaluate(({ type, options }) => window.app.openPicker(type, options), { type, options });
    const dialog = page.locator(".picker-dialog");
    await dialog.waitFor({ state: "visible" });
    return dialog;
  }

  async function choose(type, search, options) {
    console.log(`choose ${type}: ${search}`);
    const dialog = await openPicker(type, options);
    const input = dialog.locator('input[placeholder="Buscar..."]');
    if (await input.count()) await input.fill(search);
    const item = dialog.locator(".picker-item.available").filter({ hasText: search }).first();
    await item.waitFor({ state: "visible", timeout: 5000 });
    await item.click();
    await dialog.locator(".picker-confirm").first().click();
    await page.waitForTimeout(160);
    const buy = dialog.locator(".picker-buy-btn").first();
    if (await buy.isVisible().catch(() => false) && await buy.isEnabled().catch(() => false)) {
      await buy.click();
      await page.waitForTimeout(160);
    }
    if (await dialog.isVisible().catch(() => false)) {
      await dialog.locator(".picker-cancel").first().click();
      await page.waitForTimeout(100);
    }
  }

  async function chooseFirstFeat() {
    console.log("choose feat: primeira opção de classe");
    const dialog = await openPicker("feat", { filterType: "Classe", slotId: "1_class_feat", level: 1 });
    const item = dialog.locator(".picker-item.available").first();
    await item.waitFor({ state: "visible", timeout: 5000 });
    const name = await item.locator(".picker-item-name").innerText();
    await item.click();
    await dialog.locator(".picker-confirm").first().click();
    await page.waitForTimeout(160);
    if (await dialog.isVisible().catch(() => false)) await dialog.locator(".picker-cancel").first().click();
    return name;
  }

  async function trainFirstSkill(shouldTrain = true) {
    console.log("train skill");
    await page.evaluate(() => window.app.openSkillTrainingModal());
    const modal = page.locator("#modalSkillTrainingOverlay");
    await modal.waitFor({ state: "visible", timeout: 5000 });
    console.log("skill modal open");
    if (!shouldTrain) {
      await modal.getByRole("button", { name: "Concluído" }).click();
      return true;
    }
    const row = modal.locator(".pb-skill-training-row:has(.pb-teml-dot:not(.active))").first();
    await row.waitFor({ state: "visible", timeout: 5000 });
    console.log("skill row open");
    await row.locator(".pb-teml-dots-group").click();
    console.log("skill selected");
    const active = await row.locator(".pb-teml-dot.t.active").count();
    await modal.getByRole("button", { name: "Concluído" }).click();
    console.log("skill modal closed");
    return active === 1;
  }

  for (const scenario of scenarios) {
    console.log(`scenario ${scenario.id}`);
    await page.evaluate(() => window.app.createNewCharacter());
    await page.waitForTimeout(120);
    await choose("ancestry", scenario.ancestry);
    await choose("heritage", scenario.heritage);
    await choose("background", scenario.background);
    await choose("class", scenario.className);
    await chooseFirstFeat();
    await choose("weapon", scenario.weapon);
    if (scenario === scenarios[0]) check(`${scenario.id}: perícia treinada`, await trainFirstSkill(true));

    const state = await page.evaluate(() => {
      const character = window.app.getCurrentCharacter();
      return {
        character,
        sheet: document.querySelector("#planTreeCol")?.innerText || "",
        weapons: document.querySelector("#weaponsList")?.innerText || "",
      };
    });
    console.log(`${scenario.id} state: ${JSON.stringify({ ancestry: state.character.ancestry, heritage: state.character.heritage, background: state.character.background, class: state.character.class })}`);
    const exported = await page.evaluate(() => {
      window.app.openExportModal();
      return JSON.parse(document.querySelector("#jsonArea").value);
    });

    check(`${scenario.id}: ancestralidade refletida`, state.character.ancestry === scenario.ancestry);
    check(`${scenario.id}: herança refletida`, state.character.heritage === scenario.heritage);
    check(`${scenario.id}: biografia refletida`, String(state.character.background).includes(scenario.background));
    check(`${scenario.id}: classe refletida`, String(state.character.class).includes(scenario.className));
    check(`${scenario.id}: talento refletido`, Boolean(state.character.feats?.length) || /talento/i.test(state.sheet));
    check(`${scenario.id}: arma e dano refletidos`, state.weapons.includes(scenario.weapon) && /d\d+/.test(state.weapons));
    check(`${scenario.id}: round-trip JSON`, exported.ancestry === scenario.ancestry && String(exported.class).includes(scenario.className) && exported.weapons?.some(item => String(item.name).includes(scenario.weapon)));
  }

  console.log(JSON.stringify({ scenarios: scenarios.length, checks: checks.length, passed: checks.filter(item => item.pass).length, failures }, null, 2));
  await browser.close();
  if (failures.length) process.exitCode = 1;
}

main().catch(error => {
  console.error(error.stack || error);
  process.exitCode = 1;
});
