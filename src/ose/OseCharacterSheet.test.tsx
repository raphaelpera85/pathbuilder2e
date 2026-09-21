import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { OseCharacterSheet } from "./OseCharacterSheet";
import type { OseCharacterCreatedData } from "./OseCharacterCreatorModal";
import { OSE_ARMORS, OSE_GEAR, OSE_WEAPONS } from "../data/ose/oseEquipment";

// O gerador de PDF carrega pdf-lib e o template; o cartão de carga não depende dele.
vi.mock("../services/osePdfExport", () => ({
  createOseEditablePdf: vi.fn(async () => new Uint8Array()),
  downloadOseEditablePdf: vi.fn(),
}));

afterEach(cleanup);

function characterWith(overrides: Partial<OseCharacterCreatedData> = {}): OseCharacterCreatedData {
  return {
    id: "ose-sheet-test",
    name: "Alda da Floresta",
    system_id: "ose",
    ruleset: "advanced",
    raceId: "elfo",
    classId: "mago",
    level: 1,
    xp: 0,
    alignment: "neutro",
    abilities: { str: 9, int: 15, wis: 12, dex: 13, con: 10, cha: 8 },
    maxHp: 3,
    currentHp: 3,
    goldGp: 0,
    languages: ["Comum"],
    weapons: [],
    armors: [],
    gear: [],
    spellsKnown: [],
    preparedSpells: [],
    ...overrides,
  };
}

/**
 * O cartão "Movimento & Carga" da ficha OSE tem de mostrar as duas opções do
 * Livro de Regras (p. 41): a Carga Detalhada pelo peso somado e a Carga
 * Simplificada pelo tipo de armadura vestida.
 */
describe("Ficha OSE — cartão de Movimento & Carga", () => {
  it("mostra a faixa da Carga Detalhada correspondente ao peso carregado", () => {
    const gear = OSE_GEAR.find((item) => item.id === "pe_de_cabra")!; // 50 moedas
    const { container } = render(<OseCharacterSheet character={characterWith({ goldGp: 550, gear: [gear] })} />);

    // 600 moedas caem na faixa 401–600, que o código antigo pulava.
    expect(container.textContent).toContain("600 moedas");
    expect(container.textContent).toContain("Carga detalhada · 401–600 moedas");
  });

  it("mostra 27 m de exploração para 600 moedas, e não 36 m", () => {
    const { container } = render(<OseCharacterSheet character={characterWith({ goldGp: 600 })} />);

    const movementCard = container.textContent!;
    expect(movementCard).toContain("Exploração: 27m");
    expect(movementCard).toContain("Combate: 13m");
  });

  it("mostra a Carga Simplificada pela armadura vestida, ignorando o peso das armas", () => {
    const plate = OSE_ARMORS.find((armor) => armor.id === "placas")!; // pesada
    const sword = OSE_WEAPONS.find((weapon) => weapon.id === "espada")!; // 60 moedas
    const { container } = render(<OseCharacterSheet character={characterWith({ armors: [plate], weapons: [sword] })} />);

    // Carga detalhada: 500 (placas) + 60 (espada) = 560 → 27 m.
    expect(container.textContent).toContain("Carga detalhada · 401–600 moedas");
    // Carga simplificada: armadura pesada sem tesouros → 18 m / 9 m. A armadura
    // e a arma equipadas não contam como tesouro carregado.
    expect(container.textContent).toContain("Carga simplificada · armadura pesada");
    expect(container.textContent).toContain("Exploração: 18m");
    expect(container.textContent).toContain("Combate: 9m");
    expect(container.textContent).not.toContain("armadura pesada · com tesouros");
  });

  it("na Carga Simplificada, moedas e itens guardados contam como tesouro", () => {
    const plate = OSE_ARMORS.find((armor) => armor.id === "placas")!;
    const { container } = render(<OseCharacterSheet character={characterWith({ armors: [plate], goldGp: 30 })} />);

    expect(container.textContent).toContain("Carga simplificada · armadura pesada · com tesouros");
    expect(container.textContent).toContain("Exploração: 9m");
  });

  it("trata armadura de couro como leve na Carga Simplificada", () => {
    const leather = OSE_ARMORS.find((armor) => armor.id === "couro")!;
    const { container } = render(<OseCharacterSheet character={characterWith({ armors: [leather] })} />);

    expect(container.textContent).toContain("Carga simplificada · armadura leve");
    expect(container.textContent).toContain("Exploração: 27m");
  });

  it("marca como sem armadura a ficha que não veste armadura", () => {
    const { container } = render(<OseCharacterSheet character={characterWith()} />);

    expect(container.textContent).toContain("Carga simplificada · sem armadura");
    expect(container.textContent).toContain("Exploração: 36m");
    expect(container.textContent).toContain("Carga detalhada · Até 400 moedas");
  });

  it("renderiza a ficha sem quebrar quando o nível é alto", () => {
    render(<OseCharacterSheet character={characterWith({ level: 14 })} />);
    expect(screen.getByText(/Movimento & Carga/)).toBeTruthy();
  });
});
