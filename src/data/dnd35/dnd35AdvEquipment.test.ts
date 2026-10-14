// ============================================================================
// Testes: D&D 3.5 — Livro Completo do Aventureiro, Capítulo 4 (Novas Armas,
// Tabela 4-1, pp. 115-117). 5 armas exóticas completas.
// ============================================================================
import { describe, expect, it } from "vitest";
import { DND35_ADV_ITEMS, DND35_ADV_WEAPONS } from "./dnd35AdvEquipment";

describe("D&D 3.5 — Livro Completo do Aventureiro: Novas Armas (Tabela 4-1)", () => {
  it("totaliza as 5 armas exóticas da Tabela 4-1, cada uma com id único", () => {
    expect(DND35_ADV_WEAPONS).toHaveLength(5);
    const ids = DND35_ADV_WEAPONS.map((w) => w.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("Adaga Dentada: 19-20/×2, +2 de dano por torção com 5 graduações em Prestidigitação, dobrado em decisivos", () => {
    const w = DND35_ADV_WEAPONS.find((x) => x.id === "adv-weapon-adaga-dentada")!;
    expect(w.critical).toBe("19-20/×2");
    expect(w.damageMedium).toBe("1d4");
    expect(w.description).toMatch(/\+2 de bônus nas jogadas de dano realizadas torcendo essa arma na ferida/);
    expect(w.description).toMatch(/também se aplica \(e portanto é duplicado\) nos sucessos decisivos/);
  });

  it("Gládio concede bônus extra de CA ao lutar na defensiva/defesa total (+1 além do bônus normal da manobra)", () => {
    const w = DND35_ADV_WEAPONS.find((x) => x.id === "adv-weapon-gladio")!;
    expect(w.description).toMatch(/recebe \+1 de bônus na CA pelo restante da rodada além do bônus normal da manobra/);
  });

  it("Sabre Rápido pode ser usado montado sem exigir Combate Montado", () => {
    const w = DND35_ADV_WEAPONS.find((x) => x.id === "adv-weapon-sabre-rapido")!;
    expect(w.critical).toBe("18-20/×2");
    expect(w.description).toMatch(/mesmo estando montado a cavalo, sem precisar do talento Combate Montado/);
  });

  it("Bordão Longo só ataca com uma extremidade por vez se empunhado com uma mão só", () => {
    const w = DND35_ADV_WEAPONS.find((x) => x.id === "adv-weapon-bordao-longo")!;
    expect(w.damageMedium).toBe("1d6/1d6");
    expect(w.description).toMatch(/Uma criatura empunhando um bordão longo em uma das mãos não consegue utilizá-lo como uma arma dupla/);
  });

  it("Machado Longo ataca a mais de 1,5m de distância trocando precisão por dano adicional", () => {
    const w = DND35_ADV_WEAPONS.find((x) => x.id === "adv-weapon-machado-longo")!;
    expect(w.critical).toBe("×3");
    expect(w.description).toMatch(/atacar inimigos a mais de 1,5 m de distância/);
  });

  it("Machado Longo pode ser tratado como arma de haste (alcance 3m) com Ataque Poderoso transferindo 3+ pontos", () => {
    const w = DND35_ADV_WEAPONS.find((x) => x.id === "adv-weapon-machado-longo")!;
    expect(w.description).toMatch(/pode tratá-lo como uma arma de haste sempre que utilizar o talento Ataque Poderoso/);
    expect(w.description).toMatch(/atingir oponentes a 3 m de distância, mas não é capaz de usá-lo contra inimigos adjacentes/);
  });

  it("Sabre Rápido concede +2 para desarmar, +2 em Blefar para fintar, e não aplica 1,5x Força com duas mãos", () => {
    const w = DND35_ADV_WEAPONS.find((x) => x.id === "adv-weapon-sabre-rapido")!;
    expect(w.description).toMatch(/\+2 de bônus nas jogadas de ataque resistidas para desarmar um inimigo/);
    expect(w.description).toMatch(/Não é possível empunhar essa arma com as duas mãos para aplicar 1,5 vezes o bônus de Força ao dano/);
  });
});

describe("D&D 3.5 — Livro Completo do Aventureiro: Itens Alquímicos, Cápsulas e Ferramentas (Tabelas 4-2 a 4-5)", () => {
  it("totaliza 36 itens de equipamento novos com IDs únicos", () => {
    expect(DND35_ADV_ITEMS).toHaveLength(36);
    const ids = DND35_ADV_ITEMS.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("cobre todas as 13 substâncias alquímicas da Tabela 4-2 com CD de Ofícios", () => {
    const alq = DND35_ADV_ITEMS.filter((i) => i.category === "alquimico");
    expect(alq).toHaveLength(13);
    for (const item of alq) {
      expect(item.craftDc).toBeGreaterThanOrEqual(20);
      expect(item.cost).toMatch(/\d+ PO/);
    }
  });

  it("Apertofirme concede +1 em Escalar e Gel-Sabão concede +2 em Arte da Fuga", () => {
    const aperto = DND35_ADV_ITEMS.find((i) => i.id === "adv-item-apertofirme")!;
    const gel = DND35_ADV_ITEMS.find((i) => i.id === "adv-item-gel-sabao")!;
    expect(aperto.description).toMatch(/\+1 de bônus alquímico nos testes de Escalar/);
    expect(gel.description).toMatch(/\+2 de bônus alquímico nos testes de Arte da Fuga/);
  });

  it("Cápsula do Vigor permite ignorar restrições da condição zonzo", () => {
    const vigor = DND35_ADV_ITEMS.find((i) => i.id === "adv-item-capsula-do-vigor")!;
    expect(vigor.description).toMatch(/ignorar dores e restrições da condição zonzo/);
    expect(vigor.category).toBe("capsula");
  });

  it("Cápsulas para armas (Anti-fantasma, Chamas, Faíscas, Gelo, Prata) infligem bônus elementais e especiais", () => {
    const fantasma = DND35_ADV_ITEMS.find((i) => i.id === "adv-item-capsula-anti-fantasma")!;
    const chamas = DND35_ADV_ITEMS.find((i) => i.id === "adv-item-capsula-de-chamas-instantaneas")!;
    expect(fantasma.description).toMatch(/ignorar a chance de falha normal de 50% contra criaturas incorpóreas/);
    expect(chamas.description).toMatch(/\+1d6 pontos de dano por fogo/);
  });

  it("Ferramentas de ladrão de longo alcance permitem operar a 1,5m de distância", () => {
    const norm = DND35_ADV_ITEMS.find((i) => i.id === "adv-item-ferramentas-de-ladrao-longo-alcance")!;
    const op = DND35_ADV_ITEMS.find((i) => i.id === "adv-item-ferramentas-de-ladrao-longo-alcance-obra-prima")!;
    expect(norm.description).toMatch(/a até 1,5 m de distância/);
    expect(norm.description).toMatch(/-2 de penalidade/);
    expect(op.description).toMatch(/sem qualquer penalidade/);
  });
});
