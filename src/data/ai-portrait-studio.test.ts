import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createContext, runInContext } from "node:vm";

function loadAIModule() {
  const aiCode = readFileSync(resolve(process.cwd(), "js", "pf2e_ai_assistant.js"), "utf8");
  const sandbox: any = {
    module: { exports: {} },
    window: {},
    globalThis: {}
  };
  createContext(sandbox);
  runInContext(`${aiCode}; sandboxAI = globalThis.PF2E_AI_ASSISTANT || window.PF2E_AI_ASSISTANT;`, sandbox);
  return sandbox.sandboxAI;
}

describe("Estúdio de Retratos de Personagens com IA (AI Portrait Studio)", () => {
  const ai = loadAIModule();

  it("deve carregar todos os estilos artísticos de RPG predefinidos", () => {
    expect(ai.portraitStyles).toBeDefined();
    expect(ai.portraitStyles["pf2e_official"]).toBeDefined();
    expect(ai.portraitStyles["oil_painting"]).toBeDefined();
    expect(ai.portraitStyles["dark_fantasy"]).toBeDefined();
    expect(ai.portraitStyles["anime_heroic"]).toBeDefined();
    expect(ai.portraitStyles["pixel_art"]).toBeDefined();
    expect(ai.portraitStyles["3d_render"]).toBeDefined();
    expect(ai.portraitStyles["vintage_ink"]).toBeDefined();
  });

  it("deve construir prompt contextual rico baseado na ficha do personagem", () => {
    const mockCharacter = {
      name: "Valeros",
      gender: "Masculino",
      ancestry: "Humano",
      class: "Guerreiro",
      subclass: "Vanguarda",
      equippedArmor: "Cota de Malha",
      weapons: [{ name: "Espada Longa" }, { name: "Escudo Pesado" }],
      deity: "Iomedae"
    };

    const prompt = ai.buildPortraitPrompt(mockCharacter, "pf2e_official", "cicatriz no olho direito");
    expect(prompt).toContain("Valeros");
    expect(prompt).toContain("Humano");
    expect(prompt).toContain("Guerreiro");
    expect(prompt).toContain("Iomedae");
    expect(prompt).toContain("Espada Longa");
    expect(prompt).toContain("Cota de Malha");
    expect(prompt).toContain("cicatriz no olho direito");
    expect(prompt).toContain("Pathfinder 2e official art style");
  });

  it("deve alternar estilos de arte corretamente no prompt gerado", () => {
    const mockChar = { name: "Lyra", ancestry: "Elfo", class: "Mago" };
    const darkPrompt = ai.buildPortraitPrompt(mockChar, "dark_fantasy");
    expect(darkPrompt).toContain("grimdark fantasy");

    const animePrompt = ai.buildPortraitPrompt(mockChar, "anime_heroic");
    expect(animePrompt).toContain("anime character design");

    const pixelPrompt = ai.buildPortraitPrompt(mockChar, "pixel_art");
    expect(pixelPrompt).toContain("pixel art");
  });

  it("deve gerar URLs válidas e codificadas para geração de imagem com IA", () => {
    const url = ai.generatePortraitUrl("Hero warrior with glowing sword", 12345);
    expect(url).toContain("https://image.pollinations.ai/prompt/");
    expect(url).toContain("seed=12345");
    expect(url).toContain("width=512");
    expect(url).toContain("height=640");
    expect(url).toContain("model=flux");
  });
});
