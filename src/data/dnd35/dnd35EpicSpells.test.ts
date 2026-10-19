// ============================================================================
// Testes: D&D - Livro dos Níveis Épicos, Capítulo 2, Descrição das Magias
// Épicas (COBERTURA COMPLETA, pp.74-87, 43 magias, A→Verdete Catastrófico).
// Cobertura: só dados verificados por leitura visual direta das páginas
// reais — nada inventado.
// ============================================================================
import { describe, expect, it } from "vitest";
import { DND35_EPIC_SPELLS } from "./dnd35EpicSpells";

describe("D&D — Livro dos Níveis Épicos: Magias Épicas (COMPLETO, A-Verdete Catastrófico)", () => {
  it("totaliza 43 magias com IDs únicos e descrição não vazia", () => {
    expect(DND35_EPIC_SPELLS).toHaveLength(43);
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

  it("lote 5: Escravizar/Espionar Alma/Explosão Infernal fecham a p.80", () => {
    const escravizar = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-escravizar")!;
    const espionar = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-espionar-alma")!;
    const explosao = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-explosao-infernal")!;
    expect(escravizar.duration).toBe("Permanente");
    expect(escravizar.description).toMatch(/-10 de penalidade/);
    expect(espionar.seeds).toHaveLength(3);
    expect(explosao.seeds[0].dc).toBe(76);
    expect(explosao.description).toMatch(/inferno na terra/);
  });

  it("lote 6: Explosão Negativa/Falecimento Despercebido/Fuga Onírica corretas", () => {
    const negativa = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-explosao-negativa")!;
    const falecimento = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-falecimento-despercebido")!;
    const fuga = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-fuga-onirica")!;
    expect(negativa.description).toMatch(/20 criaturas/);
    expect(falecimento.seeds).toHaveLength(3);
    expect(falecimento.school).toMatch(/Necromancia/);
    expect(fuga.description).toMatch(/Região dos Sonhos/);
    expect(fuga.cdIdentificarMagia).toBe(29);
  });

  it("lote 7: Holocausto Negativo (gap fechado)/Inverno Atroz/Invocar Behemoth corretas", () => {
    const holocausto = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-holocausto-negativo")!;
    const inverno = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-inverno-atroz")!;
    const behemoth = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-invocar-behemoth")!;
    expect(holocausto.description).toMatch(/30d6 pontos de dano de frio/);
    expect(holocausto.cdIdentificarMagia).toBe(78);
    expect(inverno.materialComponent).toMatch(/10\.000 XP/);
    expect(behemoth.seeds).toEqual([{ name: "invocar", dc: 14 }]);
    expect(behemoth.description).toMatch(/mesma Iniciativa do conjurador/);
  });

  it("lote 8: Liberdade Eterna/Maldição do Sapo em Massa corretas", () => {
    const liberdade = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-liberdade-eterna")!;
    const sapo = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-maldicao-do-sapo-em-massa")!;
    expect(liberdade.duration).toBe("Permanente");
    expect(liberdade.description).toMatch(/imunidade permanente/);
    expect(sapo.description).toMatch(/lendário mago Miko/);
    expect(sapo.seeds).toEqual([{ name: "transformar", dc: 21 }]);
  });

  it("lote 9: Invocar Dragão (gap fechado)/Memento Mori (gap fechado)/Pestilência corretas", () => {
    const dragao = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-invocar-dragao")!;
    const memento = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-memento-mori")!;
    const pestilencia = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-pestilencia")!;
    expect(dragao.effect).toBe("Invoca um dragão vermelho adulto");
    expect(memento.description).toMatch(/achaierai/);
    expect(memento.seeds).toHaveLength(3);
    expect(pestilencia.description).toMatch(/destruição repugnante/);
    expect(pestilencia.cdIdentificarMagia).toBe(104);
  });

  it("lote 10: Reflexão Épica de Magias/de Projéteis fecham a p.84", () => {
    const magias = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-reflexao-epica-de-magias")!;
    const projeteis = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-reflexao-epica-de-projeteis")!;
    expect(magias.description).toMatch(/1º a 9º nível/);
    expect(magias.duration).toBe("Permanente");
    expect(projeteis.description).toMatch(/cinco ataques/);
    expect(projeteis.range).toBe("Pessoal");
  });

  it("lote 11: Relâmpago Vivo/Resistência à Magia Maior corretas", () => {
    const relampago = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-relampago-vivo")!;
    const resistencia = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-resistencia-a-magia-maior")!;
    expect(relampago.description).toMatch(/se conjura sozinha/);
    expect(relampago.seeds).toHaveLength(2);
    expect(resistencia.name).toMatch(/Ritual/);
    expect(resistencia.description).toMatch(/\+10 de bônus adicional/);
  });

  it("lote 12: Ressurreição Contingente/Revoada de Dragões/Ruína corretas", () => {
    const ressurreicao = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-ressurreicao-contingente")!;
    const revoada = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-revoada-de-dragoes")!;
    const ruina = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-ruina")!;
    expect(ressurreicao.description).toMatch(/não ressuscita as criaturas que tenham morrido de velhice/);
    expect(revoada.description).toMatch(/dez dragões vermelhos adultos/);
    expect(ruina.description).toMatch(/20d6 pontos de dano/);
    expect(ruina.cdIdentificarMagia).toBe(27);
  });

  it("lote 13: Ruína Maior/Segurança Temporal corretas", () => {
    const ruinaMaior = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-ruina-maior")!;
    const seguranca = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-seguranca-temporal")!;
    expect(ruinaMaior.description).toMatch(/35d6 pontos de dano/);
    expect(ruinaMaior.cdIdentificarMagia).toBe(59);
    expect(seguranca.description).toMatch(/fluxo temporal estático/);
    expect(seguranca.school).toMatch(/Teletransporte/);
  });

  it("lote 14: Senhor dos Pesadelos/Sorvedouro Mágico/Tormenta Ígnea corretas", () => {
    const pesadelos = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-senhor-dos-pesadelos")!;
    const sorvedouro = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-sorvedouro-magico")!;
    const tormenta = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-tormenta-ignea")!;
    expect(pesadelos.description).toMatch(/larva onírica/);
    expect(sorvedouro.description).toMatch(/desperdiçar suas magias/);
    expect(tormenta.seeds).toHaveLength(2);
    expect(tormenta.area).toBe("Emanação de 3 km de raio");
  });

  it("lote 15: Verdete/Verdete Catastrófico corretas, gap anterior fechado", () => {
    const verdete = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-verdete")!;
    const catastrofico = DND35_EPIC_SPELLS.find((s) => s.id === "epic-spell-verdete-catastrofico")!;
    expect(verdete.description).toMatch(/onda vegetal imensa/);
    expect(catastrofico.description).toMatch(/40d6 pontos de dano/);
    expect(catastrofico.cdIdentificarMagia).toBe(170);
    expect(catastrofico.developmentGp).toBe(1530000);
  });

  it("confirma o fechamento alfabético do catálogo em Verdete Catastrófico", () => {
    expect(DND35_EPIC_SPELLS[DND35_EPIC_SPELLS.length - 1].id).toBe("epic-spell-verdete-catastrofico");
  });
});
