const { chromium } = require("playwright");
const fs = require("node:fs");

const baseUrl = "http://127.0.0.1:5173/#/builder";
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

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
  await page.evaluate(() => window.app.createNewCharacter());
  await page.waitForTimeout(250);

  async function choose(type, search, options = undefined) {
    await page.evaluate(({ type, options }) => window.app.openPicker(type, options), { type, options });
    const dialog = page.locator(".picker-dialog");
    await dialog.waitFor({ state: "visible" });
    const input = dialog.locator('input[placeholder="Buscar..."]');
    await input.fill(search);
    const item = dialog.locator(".picker-item").filter({ hasText: search }).first();
    await item.waitFor({ state: "visible" });
    await item.click();
    const confirm = dialog.locator(".picker-confirm").first();
    await confirm.waitFor({ state: "visible" });
    check(`${type}:opção pesquisável`, await item.isVisible());
    await confirm.click();
    await page.waitForTimeout(180);
    const buy = dialog.locator(".picker-buy-btn").first();
    if (await buy.isVisible().catch(() => false) && await buy.isEnabled().catch(() => false)) {
      await buy.click();
      await page.waitForTimeout(180);
    }
    if (await dialog.isVisible().catch(() => false)) {
      await dialog.locator(".picker-cancel").filter({ hasText: "Cancelar" }).first().click();
      await page.waitForTimeout(120);
    }
    check(`${type}:diálogo fechado após confirmação`, !(await dialog.isVisible().catch(() => false)));
  }

  async function chooseFirst(type, options = undefined) {
    await page.evaluate(({ type, options }) => window.app.openPicker(type, options), { type, options });
    const dialog = page.locator(".picker-dialog");
    await dialog.waitFor({ state: "visible" });
    const item = dialog.locator(".picker-item.available").first();
    await item.waitFor({ state: "visible" });
    const selectedName = await item.locator(".picker-item-name").innerText();
    await item.click();
    const confirm = dialog.locator(".picker-confirm").first();
    await confirm.click();
    await page.waitForTimeout(180);
    check(`${type}:primeira opção disponível selecionável`, Boolean(selectedName));
    check(`${type}:diálogo de progressão fechado`, !(await dialog.isVisible().catch(() => false)));
    return selectedName;
  }

  await choose("ancestry", "Anão");
  await choose("heritage", "Anão Forjado em Rocha");
  await choose("background", "Eremita");
  await choose("class", "Mago");
  await page.locator("#tab-button-spells").click();
  await page.waitForTimeout(120);
  const traditionSelect = page.locator("#spellcastingProfile select");
  if (await traditionSelect.isVisible().catch(() => false)) {
    const tradition = await traditionSelect.locator("option:not([value=''])").first().getAttribute("value");
    await page.evaluate((value) => window.app.updateMagicTradition(value), tradition);
    await page.waitForTimeout(150);
    check("magia:tradição disponível", Boolean(await traditionSelect.inputValue()));
  }
  await choose("spell", "Iluminar", { slotId: "1_spell", level: 1 });
  await choose("feat", "Estratégia da Montanha", { filterType: "Ancestral", slotId: "ancestryFeat1", level: 1 });
  await choose("weapon", "Arco Longo");

  await page.locator("#charLevel").selectOption("3");
  await page.waitForTimeout(180);
  const levelThreeFeat = await chooseFirst("feat", { filterType: "Classe", slotId: "3_class_feat", level: 3 });

  await page.evaluate(() => window.app.openSkillTrainingModal());
  const skillModal = page.locator("#modalSkillTrainingOverlay");
  await skillModal.waitFor({ state: "visible" });
  const acrobatics = skillModal.locator(".pb-skill-training-row").filter({ hasText: "Acrobacia" }).first();
  await acrobatics.locator(".pb-teml-dots-group").click();
  await page.waitForTimeout(100);
  check("perícia:Acrobacia treinada", await acrobatics.locator(".pb-teml-dot.t.active").count() === 1);
  await skillModal.getByRole("button", { name: "Concluído" }).click();

  const reflected = await page.evaluate(() => {
    const character = window.app.getCurrentCharacter();
    const sheetText = document.querySelector("#planTreeCol")?.innerText || "";
    const weaponsText = document.querySelector("#weaponsList")?.innerText || "";
    const spellsText = document.querySelector("#spellsList")?.innerText || "";
    return {
      character,
      sheetText,
      weaponsText,
      spellsText,
      weaponImage: (() => {
        const image = document.querySelector("#weaponsList img.weapon-visual-strike");
        return image ? { src: image.getAttribute("src"), alt: image.getAttribute("alt"), complete: image.complete, naturalWidth: image.naturalWidth } : null;
      })(),
      title: document.querySelector("#charName")?.value || document.title
    };
  });
  check("ficha:ancestralidade selecionada", reflected.character.ancestry === "Anão");
  check("ficha:herança selecionada", reflected.character.heritage === "Anão Forjado em Rocha");
  check("ficha:classe selecionada", String(reflected.character.class).includes("Mago"));
  check("ficha:background selecionado", String(reflected.character.background).includes("Eremita"));
  check("ficha:talento refletido", (reflected.character.feats || []).some(feat => String(feat.name || feat).toLocaleLowerCase().includes("estratégia da montanha")) || reflected.sheetText.toLocaleLowerCase().includes("estratégia da montanha"));
  check("ficha:perícia refletida", Boolean(reflected.character.trainedSkills?.includes("acrobatics") || reflected.character.skills?.acrobatics));
  check("ficha:arma e dano refletidos", reflected.weaponsText.includes("Arco Longo") && reflected.weaponsText.includes("1d8"));
  check("ficha:imagem da arma com alt e carregamento", Boolean(reflected.weaponImage?.src && reflected.weaponImage?.alt && reflected.weaponImage.complete && reflected.weaponImage.naturalWidth > 0));
  check("ficha:magia refletida", (reflected.character.spells || []).some(spell => String(spell.name).includes("Iluminar")) && reflected.spellsText.includes("Iluminar"));
  check("ficha:talento de classe do nível 3", Boolean(reflected.character.progression?.["3_class_feat"]) && reflected.character.progression["3_class_feat"].includes(levelThreeFeat));

  const exported = await page.evaluate(() => {
    window.app.openExportModal();
    return JSON.parse(document.querySelector("#jsonArea").value);
  });
  check("round-trip:ancestralidade", exported.ancestry === "Anão");
  check("round-trip:classe", String(exported.class).includes("Mago"));
  check("round-trip:talento", (exported.feats || []).some(feat => String(feat.name || feat).toLocaleLowerCase().includes("estratégia da montanha")));
  check("round-trip:perícia", Boolean(exported.trainedSkills?.includes("acrobatics") || exported.skills?.acrobatics));
  check("round-trip:arma", (exported.weapons || []).some(weapon => String(weapon.name).includes("Arco Longo")));
  check("round-trip:magia", (exported.spells || []).some(spell => String(spell.name).includes("Iluminar")));
  check("round-trip:progressão nível 3", Boolean(exported.progression?.["3_class_feat"]));

  console.log(JSON.stringify({ scenarios: 1, checks: checks.length, passed: checks.filter(item => item.pass).length, failures, character: reflected.character, weaponText: reflected.weaponsText.slice(0, 400) }, null, 2));
  await browser.close();
  if (failures.length) process.exitCode = 1;
}

main().catch(error => {
  console.error(error.stack || error);
  process.exitCode = 1;
});
