import { describe, expect, it } from "vitest";
import { DND35_PLANOS_PRESTIGE } from "./dnd35PlanosPrestige";

describe("Manual dos Planos: Classes de Prestígio (Cap.3, COMPLETO, pp.25-31)", () => {
  it("4 classes completas: Arrombador de Portais, Campeão Planar, Emissário Divino, Viajante Planar", () => {
    expect(DND35_PLANOS_PRESTIGE).toHaveLength(4);
    const c = DND35_PLANOS_PRESTIGE[0];
    expect(c.name).toBe("Arrombador de Portais");
    expect(c.hitDie).toBe("d6");
    expect(c.progression).toHaveLength(10);
    expect(c.classFeatures.length).toBeGreaterThan(5);
  });

  it("tabela de progressão: nível 1 começa +0/+0/+2/+2, nível 10 termina +7/+3/+7/+7", () => {
    const c = DND35_PLANOS_PRESTIGE[0];
    expect(c.progression[0]).toMatchObject({ level: 1, bab: "+0", fort: 0, ref: 2, will: 2 });
    expect(c.progression[9]).toMatchObject({ level: 10, bab: "+7", fort: 3, ref: 7, will: 7 });
  });

  it("Abrir Portal: CDs corretas (portal 20, chave típica 25, selado 20+NdC, divindade 50)", () => {
    const c = DND35_PLANOS_PRESTIGE[0];
    const f = c.classFeatures.find((x) => x.title === "Abrir Portal (Sob)")!;
    expect(f.text).toMatch(/Portal \(CD 20\)/);
    expect(f.text).toMatch(/Portal criado por uma divindade \(CD 50\)/);
  });

  it("Redução de Dano: 5/+1 a partir do 7º nível", () => {
    const c = DND35_PLANOS_PRESTIGE[0];
    const f = c.classFeatures.find((x) => x.title === "Redução de Dano")!;
    expect(f.text).toMatch(/Redução de Dano 5\/\+1/);
  });

  it("Amortecimento Planar: lista extensa de magias afetadas incluindo viagem planar e teletransporte", () => {
    const c = DND35_PLANOS_PRESTIGE[0];
    const f = c.classFeatures.find((x) => x.title === "Amortecimento Planar (SM)")!;
    expect(f.text).toMatch(/viagem planar/);
    expect(f.text).toMatch(/teletransporte/);
  });

  it("Campeão Planar: d10, Redução de Dano 20/+1 no 9º nível", () => {
    const c = DND35_PLANOS_PRESTIGE.find((x) => x.name === "Campeão Planar")!;
    expect(c.hitDie).toBe("d10");
    const f = c.classFeatures.find((x) => x.title === "Redução de Dano")!;
    expect(f.text).toMatch(/Redução de Dano 20\/\+1/);
  });

  it("Campeão Planar: Plano Predileto adquirido no 1º, 5º e 10º nível", () => {
    const c = DND35_PLANOS_PRESTIGE.find((x) => x.name === "Campeão Planar")!;
    expect(c.progression[0].special).toBe("Plano predileto");
    expect(c.progression[4].special).toBe("Plano predileto");
    expect(c.progression[9].special).toBe("Plano predileto");
  });

  it("Emissário Divino: d8, União Mística no 9º nível concede Redução de Dano 20/+1", () => {
    const c = DND35_PLANOS_PRESTIGE.find((x) => x.name === "Emissário Divino")!;
    expect(c.hitDie).toBe("d8");
    const f = c.classFeatures.find((x) => x.title === "União Mística")!;
    expect(f.text).toMatch(/Redução de Dano 20\/\+1/);
  });

  it("Emissário Divino: Emissários Divinos Caídos documentado (perde comunhão/portal/audiência)", () => {
    const c = DND35_PLANOS_PRESTIGE.find((x) => x.name === "Emissário Divino")!;
    const f = c.classFeatures.find((x) => x.title === "Emissários Divinos Caídos (regra especial)")!;
    expect(f.text).toMatch(/perde todas as habilidades de comunhão, portal e audiência/);
  });

  it("Viajante Planar: d4, Semente do Semiplano exige joia de 1.000 PO e 100 dias de trabalho", () => {
    const c = DND35_PLANOS_PRESTIGE.find((x) => x.name === "Viajante Planar")!;
    expect(c.hitDie).toBe("d4");
    const f = c.classFeatures.find((x) => x.title === "Semente do Semiplano")!;
    expect(f.text).toMatch(/joia perfeita com valor de pelo menos 1\.000 PO/);
    expect(f.text).toMatch(/100 dias consecutivos, 8 horas por dia/);
  });

  it("Viajante Planar: Viagem Planar 1/dia no 1º, ilimitada no 8º", () => {
    const c = DND35_PLANOS_PRESTIGE.find((x) => x.name === "Viajante Planar")!;
    expect(c.progression[0].special).toBe("Viagem planar 1/dia");
    expect(c.progression[7].special).toBe("Viagem planar ilimitada");
  });
});
