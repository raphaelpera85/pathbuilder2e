import { describe, expect, it } from "vitest";
import {
  DND35_MONSTROS_FEATS,
  DND35_MONSTROS_SKILL_CONTROLAR_FORMA,
} from "./dnd35MonstrosFeats";

describe("Livro dos Monstros: Perícias e Talentos (Capítulo 6, pp.304-306)", () => {
  it("Perícia Controlar Forma possui 6 tarefas com CDs canônicas", () => {
    expect(DND35_MONSTROS_SKILL_CONTROLAR_FORMA.name).toBe("Controlar Forma");
    expect(DND35_MONSTROS_SKILL_CONTROLAR_FORMA.keyAbility).toBe("Sabedoria");
    expect(DND35_MONSTROS_SKILL_CONTROLAR_FORMA.trainedOnly).toBe(false);
    expect(DND35_MONSTROS_SKILL_CONTROLAR_FORMA.tasks).toHaveLength(6);

    const avoidInvoluntary = DND35_MONSTROS_SKILL_CONTROLAR_FORMA.tasks.find(
      (t) => t.task.includes("involuntária")
    )!;
    expect(avoidInvoluntary.dc).toBe(25);

    const hybrid = DND35_MONSTROS_SKILL_CONTROLAR_FORMA.tasks.find((t) =>
      t.task.includes("forma híbrida")
    )!;
    expect(hybrid.dc).toBe(15);
  });

  it("13 talentos de monstros catalogados", () => {
    expect(DND35_MONSTROS_FEATS).toHaveLength(13);
  });

  it("Fabricar Constructo: pré-requisito e benefício completos", () => {
    const f = DND35_MONSTROS_FEATS.find(
      (x) => x.id === "monstros-feat-fabricar-constructo"
    )!;
    expect(f.name).toBe("Fabricar Constructo");
    expect(f.prerequisites).toBe(
      "Criar Armas e Armaduras Mágicas, Criar Item Maravilhoso"
    );
    expect(f.fullDescription).toMatch(/1\/25 do seu preço base em XP/);
    expect(f.page).toBe(305);
  });

  it("Golpe Avassalador: categoria fighter_bonus, For 25 e Encontrão Aprimorado", () => {
    const f = DND35_MONSTROS_FEATS.find(
      (x) => x.id === "monstros-feat-golpe-avassalador"
    )!;
    expect(f.category).toBe("fighter_bonus");
    expect(f.prerequisites).toMatch(/For 25/);
    expect(f.prerequisites).toMatch(/Encontrão Aprimorado/);
    expect(f.benefit).toMatch(/arremessar um oponente corpóreo menor a 3 metros/);
    expect(f.page).toBe(305);
  });

  it("Combater com Múltiplas Armas: Des 13, três ou mais braços", () => {
    const f = DND35_MONSTROS_FEATS.find(
      (x) => x.id === "monstros-feat-combater-com-multiplas-armas"
    )!;
    expect(f.prerequisites).toBe("Des 13, três ou mais braços");
    expect(f.special).toMatch(/substitui Combater com Duas Armas/);
  });

  it("Acelerar e Potencializar Habilidade Similar à Magia", () => {
    const quicken = DND35_MONSTROS_FEATS.find(
      (x) => x.id === "monstros-feat-acelerar-habilidade-similar-a-magia"
    )!;
    expect(quicken.prerequisites).toMatch(/10º nível de conjurador/);
    expect(quicken.benefit).toMatch(/ação livre/);

    const empower = DND35_MONSTROS_FEATS.find(
      (x) => x.id === "monstros-feat-potencializar-habilidade-similar-a-magia"
    )!;
    expect(empower.prerequisites).toMatch(/6º nível de conjurador/);
    expect(empower.benefit).toMatch(/aumentados em 50%/);
  });
});
