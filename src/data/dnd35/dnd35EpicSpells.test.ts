// ============================================================================
// Testes: D&D - Livro dos Níveis Épicos, Capítulo 2, Descrição das Magias
// Épicas (lote 4, pp.74-79, 15 magias). Cobertura: só dados verificados por
// leitura visual direta das páginas reais — nada inventado.
// ============================================================================
import { describe, expect, it } from "vitest";
import { DND35_EPIC_SPELLS } from "./dnd35EpicSpells";

describe("D&D — Livro dos Níveis Épicos: Magias Épicas (lote 4, A-Eidolon)", () => {
  it("totaliza 15 magias com IDs únicos e descrição não vazia", () => {
    expect(DND35_EPIC_SPELLS).toHaveLength(15);
    const ids = DND35_EPIC_SPELLS.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const s of DND35_EPIC_SPELLS) {
      expect(s.description.length).toBeGreaterThan(20);
      expect(s.name.length).toBeGreaterThan(0);
      expect(s.seeds.length).toBeGreaterThan(0);
      expect(s.developmentGp).toBeGreaterThan(0);
    }
  });

  it("Armadura Arcana Épica: CD 46, uma Palavra de Poder (armadura CD14), +16 de bônus adicional", () => {
    const armadura = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-armadura-arcana-epica")!;
    expect(armadura.cdIdentificarMagia).toBe(46);
    expect(armadura.seeds).toEqual([{ name: "armadura", dc: 14 }]);
    expect(armadura.duration).toBe("24 horas (D)");
  });

  it("Cinzas da Múmia: cria duas múmias Grandes de 18 DV, componente material de 10.000 PO", () => {
    const cinzas = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-cinzas-da-mumia")!;
    expect(cinzas.effect).toBe("Duas múmias de 18 DV");
    expect(cinzas.materialComponent).toMatch(/10\.000 PO/);
    expect(cinzas.developmentXp).toBe(12600);
  });

  it("Controle Cinético: duas Palavras de Poder (proteger CD14, refletir CD27), absorve até 150 pontos de dano", () => {
    const controle = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-controle-cinetico")!;
    expect(controle.seeds).toHaveLength(2);
    expect(controle.seeds[1]).toEqual({ name: "refletir", dc: 27 });
    expect(controle.description).toMatch(/150 pontos de dano/);
    expect(controle.cdIdentificarMagia).toBe(103);
  });

  it("lote 2: Contramágica Épica/Coroa de Insetos corretas", () => {
    const contra = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-contramagica-epica")!;
    const coroa = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-coroa-de-insetos")!;
    expect(contra.seeds).toEqual([{ name: "dissipar", dc: 19 }]);
    expect(coroa.description).toMatch(/1000 pontos de dano/);
    expect(coroa.seeds).toHaveLength(2);
  });

  it("Criar Câmara Viva/Criar Ilha são Rituais com tempo de execução em dias", () => {
    const camara = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-criar-camara-viva")!;
    const ilha = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-criar-ilha")!;
    expect(camara.name).toMatch(/Ritual/);
    expect(camara.castingTime).toBe("100 dias, 11 minutos");
    expect(ilha.castingTime).toBe("65 dias, 11 minutos");
    expect(ilha.duration).toBe("Permanente");
  });

  it("Crucificar nos Céus/Danação têm as três Palavras de Poder corretas e exigem custo em XP", () => {
    const crucificar = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-crucificar-nos-ceus")!;
    const danacao = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-danacao")!;
    expect(crucificar.seeds).toHaveLength(2);
    expect(danacao.seeds).toHaveLength(3);
    expect(danacao.description).toMatch(/CD padrão da magia épica \+15/);
    expect(danacao.materialComponent).toMatch(/2\.000 XP/);
  });

  it("lote 3: Dissipar Magias Magníficas/Divina Contemplação da Vingança corretas", () => {
    const dissipar = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-dissipar-magias-magnificas")!;
    const vinganca = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-divina-contemplacao-da-vinganca")!;
    expect(dissipar.description).toMatch(/bônus máximo no teste de dissipar é \+40/);
    expect(vinganca.description).toMatch(/305d6 pontos de dano/);
    expect(vinganca.cdIdentificarMagia).toBe(419);
  });

  it("Domínio da Alma/Duplicata Temporal corretas", () => {
    const dominio = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-dominio-da-alma")!;
    const duplicata = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-duplicata-temporal")!;
    expect(dominio.seeds).toHaveLength(3);
    expect(dominio.description).toMatch(/controle total sobre o corpo da vítima/);
    expect(duplicata.castingTime).toBe("1 ação livre");
    expect(duplicata.description).toMatch(/1 rodada subsequente/);
  });

  it("lote 4: Eclipse/Eidolon fecham a p.79 corretamente", () => {
    const eclipse = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-eclipse")!;
    const eidolon = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-eidolon")!;
    expect(eclipse.area).toBe("Raio de 7,5 km, centrado no conjurador");
    expect(eclipse.materialComponent).toMatch(/4\.000 XP/);
    expect(eidolon.seeds).toHaveLength(3);
    expect(eidolon.description).toMatch(/21º nível/);
    expect(eidolon.description).toMatch(/nível negativo/);
  });
});
