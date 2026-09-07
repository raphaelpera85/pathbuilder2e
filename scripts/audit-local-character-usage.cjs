const { chromium } = require("playwright");
const fs = require("node:fs");

const baseUrl = process.env.PF2E_BASE_URL || "http://127.0.0.1:5173";
const chromePath = process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const scenarios = [
  {
    id: "wizard-dwarf",
    character: {
      id: "browser-wizard-dwarf",
      name: "Alma da Montanha",
      level: 1,
      ancestry: "Anão",
      heritage: "Anão Forjado em Rocha",
      background: "Eremita",
      class: "Mago (Wizard)",
      abilities: { str: 10, dex: 14, con: 12, int: 18, wis: 12, cha: 10 },
      skills: { arcana: "Treinado", occultism: "Treinado" },
      feats: [{ name: "Estratégia Da Montanha", type: "Talento de Ancestralidade", level: 1 }],
      weapons: [{ name: "Arco Longo", category: "Marcial", damage: "1d8", damageType: "Perfuração", range: 100, traits: ["Mortal d10", "Voleio 30 pés"] }],
      inventory: [{ name: "Livro", qty: 1, bulk: 1 }],
      spells: [],
    },
    expect: {
      identity: ["Alma da Montanha", "Anão", "Anão Forjado em Rocha", "Mago"],
      stats: ["20pés", "17", "Visão no Escuro"],
      skills: ["Arcanismo", "Ocultismo"],
      weapons: ["Arco Longo", "1d8", "100 pés", "Mortal d10", "Voleio 30 pés"],
      feats: ["Estratégia Da Montanha"],
      spells: ["Luz"],
    },
  },
  {
    id: "champion-human",
    character: {
      id: "browser-champion-human",
      name: "Guardião da Estrada",
      level: 3,
      ancestry: "Humano",
      heritage: "Humano Versátil",
      background: "Guarda da Cidade",
      class: "Campeão",
      abilities: { str: 18, dex: 12, con: 14, int: 10, wis: 14, cha: 16 },
      equippedArmor: { name: "Cota de Malha", category: "Pesada", acBonus: 5, dexCap: 1, strength: 16, bulk: 4 },
      armors: [{ name: "Cota de Malha", category: "heavy", acBonus: 5, dexCap: 1, strength: 16, bulk: 4, equipped: true }],
      shields: [{ name: "Escudo de Aço", acBonus: 2, hardness: 5, hp: 20, maxHp: 20, equipped: true }],
      weapons: [{ name: "Espada Longa", category: "Marcial", damage: "1d8", damageType: "Cortante", traits: ["Versátil P"] }],
      feats: [{ name: "Robustez", type: "Talento Geral", level: 3 }],
      skills: { athletics: "Treinado", intimidation: "Treinado", crafting: "Treinado" },
      inventory: [{ name: "Mochila", qty: 1, bulk: 1 }],
    },
    expect: {
      identity: ["Guardião da Estrada", "Humano", "Humano Versátil", "Campeão"],
      stats: ["23", "67 / 67"],
      skills: ["Atletismo", "Intimidação", "Manufatura"],
      weapons: ["Espada Longa", "1d8", "VERSÁTIL P"],
      defense: ["Cota de Malha", "Escudo de Aço"],
      feats: ["Robustez"],
    },
  },
  {
    id: "barbarian-jotunnato",
    character: {
      id: "browser-barbarian-jotunnato",
      name: "Fúria do Norte",
      level: 5,
      ancestry: "Jotunnato",
      heritage: "Jotunnato Guerreiro",
      background: "Soldado",
      class: "Bárbaro",
      abilities: { str: 18, dex: 14, con: 16, int: 10, wis: 12, cha: 10 },
      skills: { athletics: "Treinado", intimidation: "Treinado" },
      weapons: [{ name: "Machado de Batalha", category: "Marcial", damage: "1d8", damageType: "Cortante", traits: ["Varredura"] }],
      feats: [{ name: "Frota", type: "Talento Geral", level: 1 }],
      inventory: [{ name: "Kit de aventureiro", qty: 1, bulk: 2 }],
    },
    expect: {
      identity: ["Fúria do Norte", "Jotunnato", "Jotunnato Guerreiro", "Bárbaro"],
      stats: ["Grande", "25pés"],
      skills: ["Atletismo", "Intimidação"],
      weapons: ["Machado de Batalha", "1d8", "VARREDURA"],
      feats: ["Frota"],
    },
  },
];

function includesAll(text, values) {
  return values.every((value) => text.toLocaleLowerCase().includes(String(value).toLocaleLowerCase()));
}

async function importCharacter(page, character) {
  await page.locator("#pbMenuButton").click();
  await page.locator("#drawerImportJson").click();
  await page.locator("#jsonArea").fill(JSON.stringify(character));
  await page.locator("#btnImportAction").click();
  await page.waitForTimeout(150);
  await page.waitForSelector("#legacy-builder-root:not([hidden])", { timeout: 10000 });
}

async function exportCharacter(page) {
  await page.locator("#pbMenuButton").click();
  await page.locator("#drawerExportJson").click();
  const raw = await page.locator("#jsonArea").inputValue();
  await page.locator("#modalJsonOverlay .pb-modal-close-btn").click();
  return JSON.parse(raw);
}

async function main() {
  const launchOptions = { headless: true };
  if (fs.existsSync(chromePath)) launchOptions.executablePath = chromePath;
  const browser = await chromium.launch(launchOptions);
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  const results = [];

  page.on("dialog", (dialog) => dialog.dismiss());

  try {
    await page.goto(`${baseUrl}/#/builder`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForSelector("#legacy-builder-root:not([hidden])", { timeout: 30000 });

    for (const scenario of scenarios) {
      await page.evaluate(() => localStorage.removeItem("pf2e_current_character"));
      await page.reload({ waitUntil: "domcontentloaded" });
      await page.waitForSelector("#legacy-builder-root:not([hidden])", { timeout: 30000 });
      if (scenario.id === "wizard-dwarf") {
        scenario.character.spells = [{ name: "Luz", rank: 0, actions: "◆◆", manual: true }];
        scenario.expect.spells = [scenario.character.spells[0].name];
      }
      if (scenario.id === "champion-human") {
        scenario.character.equippedShield = { ...scenario.character.shields[0], currentHp: 20 };
      }
      await importCharacter(page, scenario.character);

      const panels = {};
      for (const [tab, id] of [["weapons", "#tab-button-weapons"], ["defense", "#tab-button-defense"], ["spells", "#tab-button-spells"], ["feats", "#tab-button-feats"]]) {
        await page.locator(id).click();
        panels[tab] = await page.locator("#contentCol").innerText();
      }
      const statsText = await page.locator("#statsCol").innerText();
      const treeText = await page.locator("#planTreeCol").innerText();
      const exported = await exportCharacter(page);
      const titleText = await page.locator("#topCharTitle").innerText();
      const combined = `${titleText}\n${statsText}\n${treeText}\n${Object.values(panels).join("\n")}`;
      const checks = [
        ["identidade e classe refletidas", includesAll(combined, scenario.expect.identity)],
        ["atributos calculados refletidos", includesAll(`${statsText} ${titleText}`, scenario.expect.stats)],
        ["perícias refletidas", includesAll(combined, scenario.expect.skills)],
        ["arma, dano e características refletidos", includesAll(panels.weapons, scenario.expect.weapons)],
        ["talentos refletidos", includesAll(panels.feats, scenario.expect.feats)],
        ["defesa refletida", !scenario.expect.defense || includesAll(panels.defense, scenario.expect.defense)],
        ["magias refletidas", !scenario.expect.spells || includesAll(panels.spells, scenario.expect.spells)],
        ["exportação preserva escolhas", exported.name === scenario.character.name && exported.ancestry === scenario.character.ancestry && String(exported.class).toLocaleLowerCase().includes(String(scenario.character.class).split(" ")[0].toLocaleLowerCase()) && exported.weapons?.[0]?.name === scenario.character.weapons?.[0]?.name],
      ];
      results.push({
        id: scenario.id,
        checks,
        exportedKeys: Object.keys(exported).length,
        observed: {
          title: await page.locator("#topCharTitle").innerText(),
          speed: await page.locator("#charSpeed").innerText(),
          ac: await page.locator("#acVal").innerText(),
          hp: await page.locator("#hpVal").innerText(),
          weapons: panels.weapons.slice(0, 1200),
          defense: panels.defense.slice(0, 1200),
          spells: panels.spells.slice(0, 1200),
          feats: panels.feats.slice(0, 1200),
          tree: treeText.slice(0, 600),
          runtime: await page.evaluate(() => ({ ancestry: window.app?.character?.ancestry, heritage: window.app?.character?.heritage, class: window.app?.character?.class, spells: window.app?.character?.spells?.map((spell) => spell.name), equippedShield: window.app?.character?.equippedShield, shields: window.app?.character?.shields })),
          exported: { name: exported.name, ancestry: exported.ancestry, heritage: exported.heritage, class: exported.class, level: exported.level, weapon: exported.weapons?.[0]?.name },
        },
      });
    }
  } finally {
    await browser.close();
  }

  const failures = results.flatMap((result) => result.checks.filter(([, passed]) => !passed).map(([label]) => `${result.id}: ${label}`));
  console.log(JSON.stringify({ scenarios: results.length, results, failures }, null, 2));
  if (failures.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
