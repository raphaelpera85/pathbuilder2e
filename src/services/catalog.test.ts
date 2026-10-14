import { describe, it, expect, vi, beforeEach } from "vitest";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import {
  PICKER_TYPE_TO_TABLE,
  normalizeCatalogRecordToPickerItem,
  fetchCatalogCategory,
  fetchCatalogItemById,
  getCatalogSyncStatus,
  fetchCatalogTableCounts,
  fetchCatalogLocalMetrics,
  fetchCatalogSystems,
  DEFAULT_RPG_SYSTEMS,
  CATALOG_SYSTEM_IDS,
  CATALOG_RULESETS,
  paginateCatalogItems,
  type CatalogItemRecord,
} from "./catalog";
import type { PickerType } from "../types";
import { T20_RACE_RULES } from "../data/t20/t20Races";
import { T20_ORIGINS } from "../data/t20/t20Origins";
import { T20_CLASS_RULES } from "../data/t20/t20Classes";
import { DND5E_RACE_RULES } from "../data/dnd5e/dnd5eRaces";
import { DND5E_CLASS_RULES } from "../data/dnd5e/dnd5eClasses";
import { DND5E_BACKGROUNDS } from "../data/dnd5e/dnd5eBackgrounds";
import { DND35_WEAPONS, DND35_ARMORS } from "../data/dnd35/dnd35Equipment";
import { DND35_GEAR } from "../data/dnd35/dnd35Gear";
import { DND35_SKILLS } from "../data/dnd35/dnd35Skills";
import { DND35_SPELL_LISTS } from "../data/dnd35/dnd35SpellLists";
import { DND35_FROSTBURN_POWERS } from "../data/dnd35/dnd35FrostburnSpells";
import { PF1E_BARD_CANTRIPS, PF1E_CLERIC_CANTRIPS, PF1E_DRUID_CANTRIPS, PF1E_SORCERER_WIZARD_CANTRIPS } from "../data/pf1e/pf1eSpells";
import { DND5E_SPELLS, DND5E_SPELL_SCHOOLS } from "../data/dnd5e/dnd5eCompendium";
import { OSE_BASIC_METHOD_RACE_BY_CLASS, isOseClassAvailableForMode } from "../data/ose/oseRules";
import { OSE_CLASSES } from "../data/ose/oseClasses";

describe("serviço de catálogo local", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("separa o escopo do Pathfinder 1e do construtor ainda desativado", async () => {
    expect(DEFAULT_RPG_SYSTEMS.find((system) => system.id === "dnd5e")?.supportedRulesets).toEqual(["standard"]);
    expect(DEFAULT_RPG_SYSTEMS.find((system) => system.id === "t20")?.supportedRulesets).toEqual(["padrao"]);
    expect(DEFAULT_RPG_SYSTEMS.find((system) => system.id === "pf1e")).toMatchObject({ active: false, supportedRulesets: ["legacy_pf1"] });
    expect(CATALOG_SYSTEM_IDS).toContain("pf1e");
    expect(await fetchCatalogSystems()).not.toEqual(expect.arrayContaining([expect.objectContaining({ id: "pf1e" })]));
  });

  it("carrega o índice de talentos do Pathfinder 1e pelo escopo local próprio", async () => {
    const { items, source } = await fetchCatalogCategory("feat", { systemId: "pf1e", ruleset: "legacy_pf1" });

    expect(source).toBe("local_snapshot");
    expect(items).toHaveLength(176);
    expect(items.every((item) => item.system_id === "pf1e" && item.data.ruleset === "legacy_pf1")).toBe(true);
    expect(items.find((item) => item.id === "pf1e.crb.feat.acrobatico")?.summary).toContain("Acrobacia");
    const newlyDetailedFeats = [
      ["acelerar-magia", 118, 113, "quatro níveis"],
      ["acrobatico", 114, 113, "10 graduações"],
      ["acuidade-com-armas", 114, 118, "Destreza em vez de Força"],
      ["afastar-mortos-vivos", 114, 118, "teste de Vontade"],
      ["afinidade-com-animais", 114, 118, "Adestrar Animais e Cavalgar"],
      ["agarrar-aprimorado", 116, 118, "Defesa contra Manobras de Combate"],
    ] as const;
    for (const [slug, sourcePage, detailsPage, mechanicsText] of newlyDetailedFeats) {
      const feat = items.find((item) => item.id === `pf1e.crb.feat.${slug}`);
      expect(feat, slug).toBeDefined();
      expect(feat?.data).toMatchObject({
        detailsPage,
        source: { page: sourcePage },
        summaryOnly: true,
      });
      expect(feat?.data.mechanicsSummary).toContain(mechanicsText);
    }
    const page116Feats = items.filter((item) => item.data.source?.page === 116 && item.data.table === "5-1");
    expect(page116Feats).toHaveLength(40);
    expect(page116Feats.every((item) => item.data.summaryOnly === true)).toBe(true);
    const page117Feats = items.filter((item) => item.data.source?.page === 117 && item.data.table === "5-1");
    expect(page117Feats).toHaveLength(36);
    expect(page117Feats.every((item) => item.data.summaryOnly === true)).toBe(true);
    const page118Feats = items.filter((item) => item.data.source?.page === 118);
    expect(page118Feats).toHaveLength(21);
    expect(page118Feats.every((item) => item.data.summaryOnly === true)).toBe(true);
    const detailedFeats = [
      ["agarrar-maior", 116, "Golpe Desarmado Aprimorado", "dois testes por rodada"],
      ["apanhar-objetos", 116, "Golpe Desarmado Aprimorado", "mão totalmente livre"],
      ["apresentacao-adicional", 114, "Capacidade de efetuar apresentação de bardo", "efeitos se acumulam"],
      ["aptidao-magica", 114, null, "+4"],
      ["ampliar-magia", 118, "—", "espaço de magia um nível acima"],
      ["arqueirismo-montado", 114, "Cavalgar 1 graduação", "de -8 para -4"],
      ["arremessar-qualquer-coisa", 114, null, "+1 de bônus de circunstância"],
      ["ataque-com-escudo-aprimorado", 117, "Proficiência com Escudos", "aplica o bônus dele à CA"],
      ["ataque-de-passagem", 114, "Cavalgar 1 graduação", "dobro do deslocamento da montaria"],
      ["ataque-em-movimento", 115, "Des 13, Esquiva, Mobilidade, bônus base de ataque +4", "pelo menos 3 m antes do ataque"],
    ] as const;
    for (const [slug, tablePage, prerequisites, summaryText] of detailedFeats) {
      const feat = items.find((item) => item.id === `pf1e.crb.feat.${slug}`);
      expect(feat, slug).toBeDefined();
      expect(feat?.data).toMatchObject({ detailsPage: 119, source: { page: tablePage }, summaryOnly: true });
      if (prerequisites) expect(feat?.data.prerequisites).toContain(prerequisites);
      expect(feat?.data.mechanicsSummary).toContain(summaryText);
    }
    const page120Feats = [
      ["ataque-poderoso", 114, "For 13, bônus base de ataque +1", "A cada +4 de bônus base de ataque"],
      ["atletico", 114, null, "10 ou mais graduações"],
      ["ataque-giratorio", 115, "Des 13, Int 13, Especialização em Combate, Esquiva, Mobilidade, Ataque em Movimento, bônus base de ataque +4", "cada oponente ao alcance"],
      ["atropelar", 114, "1 graduação em Cavalgar, Combate Montado", "alvo não pode escolher evitá-lo"],
      ["autossuficiente", 114, null, "Cura e Sobrevivência"],
      ["canalizar-aprimorado", 114, "Capacidade de canalizar energia", "+2 a CD"],
      ["canalizar-punicao", 114, "Capacidade de canalizar energia", "ação rápida"],
      ["canalizar-elemental", 114, "Capacidade de canalizar energia", "subtipo elemental"],
      ["canalizar-adicional", 114, "Capacidade de canalizar energia", "duas utilizações adicionais"],
      ["canalizar-seletivo", 114, "Car 13, capacidade de canalizar energia", "modificador de Carisma"],
    ] as const;
    for (const [slug, tablePage, prerequisites, summaryText] of page120Feats) {
      const feat = items.find((item) => item.id === `pf1e.crb.feat.${slug}`);
      expect(feat, slug).toBeDefined();
      expect(feat?.data).toMatchObject({ detailsPage: 120, source: { page: tablePage }, summaryOnly: true });
      if (prerequisites) expect(feat?.data.prerequisites).toContain(prerequisites);
      expect(feat?.data.mechanicsSummary).toContain(summaryText);
    }
    const page121Feats = [
      ["canalizar-tendencia", 114, "Capacidade de canalizar energia", "subtipo de tendência"],
      ["colera-da-medusa", 116, "Golpe Desarmado Aprimorado, Punho da Górgona, Estilo do Escorpião, bônus base de ataque +11", "dois ataques desarmados adicionais"],
      ["comandar-mortos-vivos", 114, "Capacidade de canalizar energia negativa", "mortos-vivos"],
      ["combate-montado", 114, "1 graduação em Cavalgar", "ação imediata"],
      ["combater-com-duas-armas", 114, "Des 15", "mão primária"],
    ] as const;
    for (const [slug, tablePage, prerequisites, summaryText] of page121Feats) {
      const feat = items.find((item) => item.id === `pf1e.crb.feat.${slug}`);
      expect(feat, slug).toBeDefined();
      expect(feat?.data).toMatchObject({ detailsPage: 121, source: { page: tablePage }, summaryOnly: true });
      expect(feat?.data.prerequisites).toContain(prerequisites);
      expect(feat?.data.mechanicsSummary).toContain(summaryText);
      expect(feat?.summary).toContain(summaryText);
    }
    const page122Feats = [
      ["combater-com-duas-armas-maior", 114, "Des 19, Combater com Duas Armas Aprimorado, Combater com Duas Armas, bônus base de ataque +11", "terceiro ataque", "penalidade de -10"],
      ["contramagica-aprimorada", 114, null, "magia da mesma escola", "magia especificamente designada"],
      ["convocacao-ampliada", 114, "Foco em Magia (invocação)", "+4 de aprimoramento em Força e Constituição", "duração da magia"],
      ["corrida", 115, null, "vezes o deslocamento", "+4 nos testes de Acrobacia"],
      ["corte-duplo", 114, "Des 15, Combater com Duas Armas", "bônus total de Força", "metade do modificador"],
      ["criar-armaduras-e-armas-magicas", 118, "5º nível de conjurador", "escudos mágicos", "obra-prima"],
      ["criar-bastao", 118, "9º nível de conjurador", "bastões mágicos", "1 dia por 1.000 PO"],
      ["criar-cajado", 118, "11º nível de conjurador", "10 cargas", "pré-requisitos individuais"],
      ["criar-item-maravilhoso", 118, "3º nível de conjurador", "metade do preço-base", "consertar item quebrado"],
      ["combater-com-duas-armas-aprimorado", 114, "Des 17, Combater com Duas Armas, bônus base de ataque +6", "segundo ataque", "penalidade de -5"],
    ] as const;
    for (const [slug, tablePage, prerequisites, summaryText, mechanicsText] of page122Feats) {
      const feat = items.find((item) => item.id === `pf1e.crb.feat.${slug}`);
      expect(feat, slug).toBeDefined();
      expect(feat?.data).toMatchObject({ detailsPage: 122, source: { page: tablePage }, summaryOnly: true });
      if (prerequisites) expect(feat?.data.prerequisites).toBe(prerequisites);
      else expect(feat?.data.prerequisites).toBeUndefined();
      expect(feat?.data.summaries?.["pt-BR"]).toContain(summaryText);
      expect(feat?.data.mechanicsSummary).toContain(mechanicsText);
    }
    const page123Feats = [
      ["criar-varinha", 118, "5º nível de conjurador", "50 cargas", "4º nível ou inferior"],
      ["critico-aprimorado", 115, "Proficiência com a arma escolhida, bônus base de ataque +8", "margem de ameaça", "não se acumulam"],
      ["critico-estonteante", 115, "Foco em Crítico, bônus base de ataque +13", "zonzo", "1d4+1 rodadas"],
      ["critico-atordoante", 115, "Foco em Crítico, Crítico Estonteante, bônus base de ataque +17", "atordoado por 1d4", "zonzo por 1d4"],
      ["critico-cegante", 115, "Foco em Crítico, bônus base de ataque +15", "permanentemente", "mais de dois olhos"],
      ["critico-enjoativo", 115, "Foco em Crítico, bônus base de ataque +11", "enjoado por 1 minuto", "prolongam a duração"],
      ["critico-ensurdecedor", 115, "Foco em Crítico, bônus base de ataque +13", "surdo permanentemente", "criaturas já surdas"],
      ["critico-exaustivo", 115, "Foco em Crítico, Crítico Cansativo, bônus base de ataque +15", "exausto", "Maestria em Crítico"],
      ["critico-hemorragico", 115, "Foco em Crítico, bônus base de ataque +11", "arma cortante ou perfurante", "CD 15"],
      ["cura-pelas-maos-adicional", 115, "Capacidade de Cura pelas Mãos", "duas vezes adicionais por dia", "se acumulam"],
      ["defesa-com-duas-armas", 114, "Des 15, Combater com Duas Armas", "arma dupla", "+2"],
      ["demonstracao-deslumbrante", 115, "Foco em Arma", "ação de rodada completa", "inimigos a até 9 m"],
      ["critico-cansativo", 115, "Foco em Crítico, bônus base de ataque +13", "fatigado", "Maestria em Crítico"],
    ] as const;
    for (const [slug, tablePage, prerequisites, summaryText, mechanicsText] of page123Feats) {
      const feat = items.find((item) => item.id === `pf1e.crb.feat.${slug}`);
      expect(feat, slug).toBeDefined();
      expect(feat?.data).toMatchObject({ detailsPage: 123, source: { page: tablePage }, summaryOnly: true });
      expect(feat?.data.prerequisites).toBe(prerequisites);
      expect(feat?.data.summaries?.["pt-BR"]).toContain(summaryText);
      expect(feat?.data.mechanicsSummary).toContain(mechanicsText);
      if (slug === "critico-ensurdecedor") {
        expect(feat?.data.sourceNotes).toContain(
          "O livro impresso traz ‘remover cegueira’ neste trecho; o PRD oficial em inglês indica remover surdez.",
        );
      }
    }
    const page125Feats = [
      ["derrubar-aprimorado", 115, "Int 13, Especialização em Combate", "Não provoca ataques de oportunidade", "Defesa contra Manobras de Combate"],
      ["derrubar-maior", 115, "Especialização em Combate, Derrubar Aprimorado, bônus base de ataque +6, Int 13", "provoca ataques de oportunidade", "cumulativo"],
      ["desarmar-aprimorado", 115, "Int 13, Especialização em Combate", "Não provoca ataques de oportunidade", "Defesa contra Manobras de Combate"],
      ["desarmar-maior", 115, "Especialização em Combate, Desarmar Aprimorado, bônus base de ataque +6, Int 13", "arremessada", "4,5 metros"],
      ["desviar-objetos", 116, "Des 13, Golpe Desarmado Aprimorado", "uma mão livre", "ataques naturais ou efeitos de magia"],
      ["dilatar-magia", 118, "—", "Aumenta em 100%", "três níveis acima"],
      ["dilacerar-com-duas-armas", 114, "Des 17, Corte Duplo, Combater com Duas Armas Aprimorado, Combater com Duas Armas, bônus base de ataque +11", "dano adicional de 1d10", "uma vez por rodada"],
      ["disruptivo", 115, "Guerreiro de 6º nível", "+4", "já o usou"],
    ] as const;
    for (const [slug, tablePage, prerequisites, summaryText, mechanicsText] of page125Feats) {
      const feat = items.find((item) => item.id === `pf1e.crb.feat.${slug}`);
      expect(feat, slug).toBeDefined();
      expect(feat?.data).toMatchObject({ detailsPage: 125, source: { page: tablePage }, summaryOnly: true });
      expect(feat?.data.prerequisites).toBe(prerequisites);
      expect(feat?.summary).toContain(summaryText);
      expect(feat?.data.mechanicsSummary).toContain(mechanicsText);
    }
    const page126Feats = [
      ["duro-de-matar", 117, "Tolerância", "1 ponto de dano", "Morre imediatamente"],
      ["elevar-magia", 118, "—", "9º nível", "nível efetivo"],
      ["encontrao-aprimorado", 114, "For 13, Ataque Poderoso, bônus base de ataque +1", "Não provoca ataques de oportunidade", "Defesa contra Manobras de Combate"],
      ["encontrao-maior", 114, "Encontrão Aprimorado, Ataque Poderoso, bônus base de ataque +6, For 13", "aliados", "mas não dele"],
      ["enganador", 115, null, "+2", "10 ou mais graduações"],
      ["escrever-pergaminho", 118, "Conjurador de 1º nível", "qualquer magia", "metade do preço base"],
      ["especializacao-com-arma", 115, "Proficiência com a arma selecionada, Foco em Arma (arma selecionada), guerreiro de 4º nível", "+2", "não se acumulam"],
      ["especializacao-com-arma-maior", 115, "Proficiência com a arma selecionada, Foco em Arma Aprimorado (arma específica), Foco em Arma (arma específica), Especialização com Arma (arma específica), guerreiro de 12º nível", "+2", "se acumula com outros bônus"],
      ["especializacao-em-combate", 115, "Int 13", "+1 de bônus de esquiva", "dura até o próximo turno"],
      ["esquiva", 115, "Destreza 13", "+1 de bônus de esquiva", "perder o bônus de Destreza"],
    ] as const;
    for (const [slug, tablePage, prerequisites, summaryText, mechanicsText] of page126Feats) {
      const feat = items.find((item) => item.id === `pf1e.crb.feat.${slug}`);
      expect(feat, slug).toBeDefined();
      expect(feat?.data).toMatchObject({ detailsPage: 126, source: { page: tablePage }, summaryOnly: true });
      expect(feat?.data.prerequisites).toBe(prerequisites ?? undefined);
      expect(feat?.summary).toContain(summaryText);
      expect(feat?.data.mechanicsSummary).toContain(mechanicsText);
    }
    const page127Feats = [
      ["estilhacar-defesas", 115, "Foco em Arma, Demonstração Deslumbrante, bônus base de ataque +6, usar arma", "até o final do seu próximo turno", "ataques adicionais"],
      ["estilo-do-escorpiao", 116, "Golpe Desarmado Aprimorado", "Fortitude bem-sucedido evita", "modificador de Sabedoria"],
      ["estocada", 115, "Bônus base de ataque +6", "Antes de fazer qualquer ataque", "–2 na CA"],
      ["familiar-aprimorado", 115, "Capacidade de adquirir um novo familiar, tendência compatível, nível suficientemente elevado", "nível mínimo de conjurador arcano", "a até um passo em cada eixo"],
      ["fender-aprimorado", 114, "For 13, Ataque Poderoso, bônus base de ataque +1", "não provoca ataque de oportunidade", "+2 na Defesa contra Manobras de Combate"],
      ["fender-maior", 114, "Fender Aprimorado, Ataque Poderoso, bônus base de ataque +6, For 13", "dano excedente", "1 ponto de vida"],
      ["fintar-aprimorado", 115, "Int 13, Especialização em Combate", "ação de movimento", "ação padrão"],
      ["fintar-maior", 115, "Especialização em Combate, Fintar Aprimorado, bônus base de ataque +6, Int 13", "início do seu próximo turno", "apenas contra o próximo ataque"],
    ] as const;
    for (const [slug, tablePage, prerequisites, summaryText, mechanicsText] of page127Feats) {
      const feat = items.find((item) => item.id === `pf1e.crb.feat.${slug}`);
      expect(feat, slug).toBeDefined();
      expect(feat?.data).toMatchObject({ detailsPage: 127, source: { page: tablePage }, summaryOnly: true });
      expect(feat?.data.prerequisites).toBe(prerequisites);
      expect(feat?.summary).toContain(summaryText);
      expect(feat?.data.mechanicsSummary).toContain(mechanicsText);
    }
    const page128Feats = [
      ["foco-em-arma", 115, "Proficiência com a arma selecionada, bônus base de ataque +1", "+1", "raio para um mago"],
      ["foco-em-arma-maior", 115, "Proficiência com a arma selecionada, Foco em Arma (arma específica), guerreiro de 8º nível", "acumula", "outra arma"],
      ["foco-em-critico", 115, "Bônus base de ataque +9", "+4", "confirmar acertos críticos"],
      ["foco-em-escudo", 117, "Proficiência com Escudos, bônus base de ataque +1", "+1", "bônus na CA"],
      ["foco-em-escudo-maior", 117, "Foco em Escudo, Proficiência com Escudos, guerreiro de 8º nível", "acumula", "bônus na CA"],
      ["foco-em-magia", 116, "—", "+1", "escola diferente"],
      ["foco-em-magia-maior", 116, "Foco em Magia", "+1", "escola já selecionada"],
      ["foco-em-pericia", 116, "—", "+3", "10 ou mais graduações"],
      ["forjar-anel", 118, "7º nível de conjurador", "anéis mágicos", "1.000 PO"],
      ["furia-adicional", 116, "Característica de classe Fúria", "6 rodadas", "se acumulam"],
      ["furtivo", 116, "—", "+2", "10 ou mais graduações"],
      ["golpe-desarmado-aprimorado", 116, "—", "ataques de oportunidade", "dano não letal"],
    ] as const;
    expect(page128Feats).toHaveLength(12);
    for (const [slug, tablePage, prerequisites, summaryText, mechanicsText] of page128Feats) {
      const feat = items.find((item) => item.id === `pf1e.crb.feat.${slug}`);
      expect(feat, slug).toBeDefined();
      expect(feat?.data).toMatchObject({ detailsPage: 128, source: { page: tablePage }, summaryOnly: true });
      expect(feat?.data.prerequisites).toBe(prerequisites);
      expect(feat?.summary).toContain(summaryText);
      expect(feat?.data.mechanicsSummary).toContain(mechanicsText);
    }
    expect(items.find((item) => item.id === "pf1e.crb.feat.golpe-desarmado-aprimorado")?.data.continuationPage).toBe(129);
    const page129Feats = [
      ["grande-fortitude", 116, "—", "+2", "todos os testes de resistência de Fortitude"],
      ["grande-fortitude-aprimorada", 116, "Grande Fortitude", "Uma vez por dia", "mesmo que seja pior"],
      ["golpe-arcano", 116, "Capacidade de conjurar magias arcanas", "bônus de dano", "até +5 no 20º nível"],
      ["golpe-letal", 115, "Demonstração Deslumbrante, Foco em Arma Maior, Estilhaçar Defesas, Foco em Arma, proficiência com a arma selecionada, bônus base de ataque +11", "dano dobrado", "1 ponto de dano de Constituição"],
      ["golpe-penetrante", 115, "Foco em Arma, guerreiro de 12º nível, proficiência com a arma selecionada", "até 5 pontos", "RD 10/–"],
      ["golpe-penetrante-maior", 115, "Golpe Penetrante, Foco em Arma, guerreiro de 16º nível", "até 10 pontos", "RD 10/–"],
      ["golpe-vital", 116, "Bônus base de ataque +6", "duas vezes", "não são multiplicados em um crítico"],
      ["golpe-vital-aprimorado", 116, "Golpe Vital, bônus base de ataque +11", "três vezes", "não são multiplicados em um crítico"],
      ["golpe-vital-maior", 116, "Golpe Vital Aprimorado, bônus base de ataque +16", "quatro vezes", "não são multiplicados em um crítico"],
      ["ignorar-componentes", 116, "—", "1 PO", "ataques de oportunidade"],
    ] as const;
    expect(page129Feats).toHaveLength(10);
    for (const [slug, tablePage, prerequisites, summaryText, mechanicsText] of page129Feats) {
      const feat = items.find((item) => item.id === `pf1e.crb.feat.${slug}`);
      expect(feat, slug).toBeDefined();
      expect(feat?.data).toMatchObject({ detailsPage: 129, source: { page: tablePage }, summaryOnly: true });
      expect(feat?.data.prerequisites).toBe(prerequisites);
      expect(feat?.summary).toContain(summaryText);
      expect(feat?.data.mechanicsSummary).toContain(mechanicsText);
    }
    const page130Feats = [
      ["iniciativa-aprimorada", 116, "—", "+4", "testes de iniciativa"],
      ["investida-implacavel", 114, "1 graduação em Cavalgar, Combate Montado, Ataque de Passagem", "dobro", "triplo com uma lança de cavalaria"],
      ["ki-adicional", 116, "Possuir reserva de ki", "reserva de ki em 2", "benefícios se acumulam"],
      ["lideranca", 116, "Personagem de 7º nível", "seguidores", "não ganham experiência nem níveis"],
      ["localizar-alvo", 117, "Des 19, Tiro Preciso, Tiro Preciso Aprimorado, Tiro à Queima-Roupa, bônus base de ataque +16", "ação padrão", "armadura natural"],
    ] as const;
    expect(page130Feats).toHaveLength(5);
    for (const [slug, tablePage, prerequisites, summaryText, mechanicsText] of page130Feats) {
      const feat = items.find((item) => item.id === `pf1e.crb.feat.${slug}`);
      expect(feat, slug).toBeDefined();
      expect(feat?.data).toMatchObject({ detailsPage: 130, source: { page: tablePage }, summaryOnly: true });
      expect(feat?.data.prerequisites).toBe(prerequisites);
      expect(feat?.summary).toContain(summaryText);
      expect(feat?.data.mechanicsSummary).toContain(mechanicsText);
    }
    expect(items.find((item) => item.id === "pf1e.crb.feat.lideranca")?.data.continuationPage).toBe(131);
    const page131Feats = [
      ["lutar-as-cegas", 116, "—", "ocultação", "magia Piscar"],
      ["maestria-com-arma-improvisada", 116, "Pegar Desprevenido ou Arremessar Qualquer Coisa, bônus base de ataque +8", "arma improvisada", "1d8"],
      ["maestria-com-armadura-arcana", 117, "Treino com Armaduras Arcanas, Proficiência com Armaduras (Médias), conjurador de 7º nível", "20 pontos percentuais", "20 pontos percentuais"],
      ["maestria-em-critico", 115, "Foco em Crítico, quaisquer dois talentos de crítico, guerreiro de 14º nível", "dois efeitos", "dois talentos de crítico"],
      ["mestre-do-escudo", 117, "Pancada com Escudo, Proficiência com Escudos, Ataque com Escudo Aprimorado, Combater com Duas Armas, bônus base de ataque +11", "escudo", "jogadas de ataque e dano"],
      ["maestria-em-magia", 116, "Mago de 1º nível", "grimório", "Ler Magia"],
    ] as const;
    expect(page131Feats).toHaveLength(6);
    for (const [slug, tablePage, prerequisites, summaryText, mechanicsText] of page131Feats) {
      const feat = items.find((item) => item.id === `pf1e.crb.feat.${slug}`);
      expect(feat, slug).toBeDefined();
      expect(feat?.data).toMatchObject({ detailsPage: 131, source: { page: tablePage }, summaryOnly: true });
      expect(feat?.data.prerequisites).toBe(prerequisites);
      expect(feat?.summary).toContain(summaryText);
      expect(feat?.data.mechanicsSummary).toContain(mechanicsText);
    }
    const leadership = items.find((item) => item.id === "pf1e.crb.feat.lideranca");
    expect(leadership?.data.leadershipTable).toHaveLength(25);
    expect(leadership?.data.leadershipTable).toEqual(expect.arrayContaining([
      { leadershipScore: "1 ou menos", cohortLevel: null, subordinatesByLevel: [0, 0, 0, 0, 0, 0] },
      { leadershipScore: "10", cohortLevel: 7, subordinatesByLevel: [5, 0, 0, 0, 0, 0] },
      { leadershipScore: "25 ou mais", cohortLevel: 17, subordinatesByLevel: [135, 13, 7, 4, 2, 2] },
    ]));
    const page132Feats = [
      ["magia-em-combate", 116, "—", "+4", "agarrado"],
      ["magia-natural", 116, "Sab 13, capacidade de Forma Selvagem", "componentes verbais", "itens mágicos"],
      ["magia-penetrante", 116, "—", "+2", "resistência à magia"],
      ["magia-penetrante-maior", 116, "Magia Penetrante", "+2 adicional", "se acumula"],
      ["magia-sem-gestos", 118, "—", "um nível acima", "componentes somáticos"],
      ["magia-silenciosa", 118, "—", "bardos", "componentes verbais"],
      ["manobras-ageis", 116, "—", "Destreza", "bônus de tamanho"],
      ["maos-habeis", 116, "—", "+4", "10 ou mais graduações"],
      ["maximizar-magia", 118, "—", "três níveis", "Potencializar Magia"],
      ["mestre-artesao", 116, "5 graduações em Ofícios ou Profissão", "Ofícios", "itens de gatilho"],
      ["mira-letal", 116, "Des 13, bônus base de ataque +1", "penalidade crescente", "ataques de toque"],
    ] as const;
    expect(page132Feats).toHaveLength(11);
    for (const [slug, tablePage, prerequisites, summaryText, mechanicsText] of page132Feats) {
      const feat = items.find((item) => item.id === `pf1e.crb.feat.${slug}`);
      expect(feat, slug).toBeDefined();
      expect(feat?.data).toMatchObject({ detailsPage: 132, source: { page: tablePage }, summaryOnly: true });
      expect(feat?.data.prerequisites).toBe(prerequisites);
      expect(feat?.summary).toContain(summaryText);
      expect(feat?.data.mechanicsSummary).toContain(mechanicsText);
    }
    const page133Feats = [
      ["misericordia-adicional", 116, "mãos curativas", "misericórdia", "efeitos da mesma misericórdia não se acumulam"],
      ["mobilidade", 115, "Destreza 13, Esquiva", "+4", "entrar em uma área ameaçada"],
      ["movimentos-ageis", 116, "Destreza 13", "1,5 m", "passo de ajuste"],
      ["marcacao-cerrada", 116, "Bônus base de ataque +1", "ação imediata", "reduzido em 1,5 m"],
      ["pancada-com-escudo", 117, "Proficiência com Escudos", "pancada com escudo", "não provoca ataque de oportunidade"],
      ["passos-acrobaticos", 116, "Destreza 15, Movimentos Ágeis", "4,5 m", "total de 6 m"],
      ["pegar-desprevenido", 116, "—", "–4", "ficam desprevenidos"],
      ["permanecer", 117, "Reflexos em Combate", "agarrar", "não pode se mover pelo restante do turno"],
      ["persuasivo", 117, "—", "+2", "10 ou mais graduações"],
      ["postura-relampago", 115, "Esquiva", "50%", "duas ações de movimento"],
      ["postura-do-vento", 115, "Destreza 15, Esquiva, bônus base de ataque +6", "20%", "mais de 1,5 m"],
    ] as const;
    expect(page133Feats).toHaveLength(11);
    for (const [slug, tablePage, prerequisites, summaryText, mechanicsText] of page133Feats) {
      const feat = items.find((item) => item.id === `pf1e.crb.feat.${slug}`);
      expect(feat, slug).toBeDefined();
      expect(feat?.data).toMatchObject({ detailsPage: 133, source: { page: tablePage }, summaryOnly: true });
      expect(feat?.data.prerequisites).toContain(prerequisites);
      expect([feat?.data.summaries?.["pt-BR"] ?? "", feat?.data.mechanicsSummary ?? ""].some((text) => text.includes(summaryText)), slug).toBe(true);
      expect(feat?.data.mechanicsSummary).toContain(mechanicsText);
    }
    const page134Feats = [
      ["potencializar-magia", 118, "—", "50%", "dois níveis acima"],
      ["preparar-pocao", 118, "Conjurador de 3º nível", "250 PO", "metade do preço-base"],
      ["presenca-intimidadora", 117, "—", "modificador de Força", "Intimidação"],
      ["proficiencia-armas-marciais", 117, "—", "arma marcial", "–4"],
      ["proficiencia-armas-exoticas", 117, "Bônus base de ataque +1", "arma exótica", "–4"],
      ["proficiencia-armas-simples", 117, "—", "armas simples", "–4"],
      ["proficiencia-armaduras-leves", 117, "—", "armadura leve", "Força ou Destreza"],
      ["proficiencia-armaduras-medias", 117, "Proficiência com Armaduras (Leves)", "armaduras médias", "regras de falta de proficiência"],
      ["proficiencia-armaduras-pesadas", 117, "Proficiência com Armaduras (Leves), Proficiência com Armaduras (Médias)", "armaduras pesadas", "regras de falta de proficiência"],
      ["proficiencia-com-escudos", 117, "—", "escudos", "Força ou Destreza"],
    ] as const;
    expect(page134Feats).toHaveLength(10);
    for (const [slug, tablePage, prerequisites, summaryText, mechanicsText] of page134Feats) {
      const feat = items.find((item) => item.id === `pf1e.crb.feat.${slug}`);
      expect(feat, slug).toBeDefined();
      expect(feat?.data).toMatchObject({ detailsPage: 134, source: { page: tablePage }, summaryOnly: true });
      expect(feat?.data.prerequisites).toContain(prerequisites);
      expect([feat?.data.summaries?.["pt-BR"] ?? "", feat?.data.mechanicsSummary ?? ""].some((text) => text.includes(summaryText)), slug).toBe(true);
      expect(feat?.data.mechanicsSummary).toContain(mechanicsText);
    }
    const page135Feats = [
      ["proficiencia-com-escudos-de-corpo", 117, "Proficiência com Escudos", "escudo de corpo", "Guerreiros recebem este talento"],
      ["prolongar-magia", 118, "—", "dobro", "um nível acima"],
      ["prontidao", 117, "—", "+2", "10 ou mais graduações"],
      ["punho-atordoante", 116, "Des 13, Sab 13, Golpe Desarmado Aprimorado", "atordoado", "uma vez por dia a cada 4 níveis"],
      ["punho-da-gorgona", 116, "Golpe Desarmado Aprimorado, Estilo do Escorpião", "zonzo", "ação padrão"],
      ["quebra-magia", 115, "Disruptivo, guerreiro de 10º nível", "ataques de oportunidade", "falhem em testes"],
      ["rapidez-de-recarga", 117, "Proficiência com Armas (besta escolhida)", "besta", "ação de movimento"],
      ["reflexos-em-combate", 117, "—", "ataques de oportunidade", "bônus de Destreza"],
      ["reflexos-rapidos", 117, "—", "+2", "testes de resistência de Reflexos"],
    ] as const;
    expect(page135Feats).toHaveLength(9);
    for (const [slug, tablePage, prerequisites, summaryText, mechanicsText] of page135Feats) {
      const feat = items.find((item) => item.id === `pf1e.crb.feat.${slug}`);
      expect(feat, slug).toBeDefined();
      expect(feat?.data).toMatchObject({ detailsPage: 135, source: { page: tablePage }, summaryOnly: true });
      expect(feat?.data.prerequisites).toContain(prerequisites);
      expect(feat?.data.summaries?.["pt-BR"]).toBeTruthy();
      expect(feat?.data.mechanicsSummary).toContain(summaryText);
      expect(feat?.data.mechanicsSummary).toContain(mechanicsText);
    }
    const page136Feats = [
      ["reflexos-rapidos-aprimorado", 117, "Reflexos Rápidos", "Uma vez por dia", "antes de conhecer o resultado"],
      ["revidar", 117, "Bônus base de ataque +11", "ataque corpo a corpo", "preparar uma ação"],
      ["saque-rapido", 117, "Bônus base de ataque +1", "ação livre", "itens alquímicos"],
      ["tirar-da-sela", 114, "Encontrão Aprimorado", "montaria", "lança de cavalaria"],
      ["tiro-a-queima-roupa", 117, "—", "+1", "até 9 m"],
      ["tiro-em-movimento", 117, "Esquiva", "ação de rodada completa", "deslocamento completo"],
      ["tiro-longo", 117, "Tiro a Queima-Roupa", "–1", "por incremento"],
      ["tiro-preciso", 117, "Tiro a Queima-Roupa", "–4", "combate corpo a corpo"],
      ["tiro-preciso-aprimorado", 117, "Tiro Preciso", "cobertura", "ocultação totais"],
      ["tiro-rapido", 117, "Destreza 13", "ataque adicional", "penalidade de –2"],
      ["tiros-multiplos", 117, "Tiro Rápido", "duas flechas", "aplicadas separadamente"],
    ] as const;
    expect(page136Feats).toHaveLength(11);
    for (const [slug, tablePage, prerequisites, summaryText, mechanicsText] of page136Feats) {
      const feat = items.find((item) => item.id === `pf1e.crb.feat.${slug}`);
      expect(feat, slug).toBeDefined();
      expect(feat?.data).toMatchObject({ detailsPage: 136, source: { page: tablePage }, summaryOnly: true });
      expect(feat?.data.prerequisites).toContain(prerequisites);
      expect([feat?.data.summaries?.["pt-BR"] ?? "", feat?.data.mechanicsSummary ?? ""].some((text) => text.includes(summaryText)), slug).toBe(true);
      expect(feat?.data.mechanicsSummary).toContain(mechanicsText);
    }
    const page137Feats = [
      ["tolerancia", 117, "—", "+4", "marcha forçada"],
      ["treino-em-combate-defensivo", 117, "—", "Dados de Vida", "Defesa contra Manobras de Combate"],
      ["trespassar", 114, "Força 13, Ataque Poderoso, bônus base de ataque +3", "ataque adicional", "–2 na CA"],
      ["trespassar-maior", 114, "Força 13, Trespassar, Ataque Poderoso, bônus base de ataque +4", "inimigo adjacente", "não pode atacar o mesmo inimigo"],
      ["treino-com-armaduras-arcanas", 117, "Proficiência com Armaduras (Leves), conjurador de 3º nível", "chance de falha", "ação rápida"],
      ["ultrapassar-aprimorado", 114, "Força 13, Ataque Poderoso, bônus base de ataque +1", "+2", "não podem escolher evitar"],
      ["ultrapassar-maior", 114, "Ultrapassar Aprimorado, Ataque Poderoso, bônus base de ataque +6, Força 13", "+2 adicional", "ataques de oportunidade"],
      ["veloz", 118, "—", "1,5 m", "carga média ou pesada"],
      ["vitalidade", 118, "—", "+3", "Dado de Vida acima do terceiro"],
      ["vontade-de-ferro", 118, "—", "+2", "testes de resistência de Vontade"],
      ["vontade-de-ferro-aprimorada", 118, "Vontade de Ferro", "Uma vez por dia", "aceitar a segunda jogada"],
    ] as const;
    expect(page137Feats).toHaveLength(11);
    for (const [slug, tablePage, prerequisites, summaryText, mechanicsText] of page137Feats) {
      const feat = items.find((item) => item.id === `pf1e.crb.feat.${slug}`);
      expect(feat, slug).toBeDefined();
      expect(feat?.data).toMatchObject({ detailsPage: 137, source: { page: tablePage }, summaryOnly: true });
      expect(feat?.data.prerequisites).toContain(prerequisites);
      expect([feat?.data.summaries?.["pt-BR"] ?? "", feat?.data.mechanicsSummary ?? ""].some((text) => text.includes(summaryText)), slug).toBe(true);
      expect(feat?.data.mechanicsSummary).toContain(mechanicsText);
    }
    const improvedFamiliar = items.find((item) => item.id === "pf1e.crb.feat.familiar-aprimorado");
    expect(improvedFamiliar?.data.familiarOptions).toHaveLength(10);
    expect(improvedFamiliar?.data.familiarOptions).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: "Falcão Celestial", minimumArcaneCasterLevel: 3 }),
      expect.objectContaining({ name: "Homúnculo", minimumArcaneCasterLevel: 7, note: "O mestre deve criar o homúnculo primeiro." }),
      expect.objectContaining({ name: "Quasit", alignment: "Caótico e maligno", minimumArcaneCasterLevel: 7 }),
    ]));
    const snapshotAudit = JSON.parse(execFileSync(process.execPath, ["scripts/audit-catalog-snapshots.mjs"], { encoding: "utf8" }));
    expect(snapshotAudit.byScope["pf1e/legacy_pf1"].feat.summaryOnlyRecords).toBe(items.filter((item) => item.data.summaryOnly === true).length);
  });

  it("expõe raças, classes e perícias do Livro Básico PF1e no catálogo local", async () => {
    const [ancestries, classes, skills] = await Promise.all([
      fetchCatalogCategory("ancestry", { systemId: "pf1e", ruleset: "legacy_pf1" }),
      fetchCatalogCategory("class", { systemId: "pf1e", ruleset: "legacy_pf1" }),
      fetchCatalogCategory("skill", { systemId: "pf1e", ruleset: "legacy_pf1" }),
    ]);

    expect(ancestries.source).toBe("local_snapshot");
    expect(ancestries.items).toHaveLength(7);
    expect(ancestries.items.find((item) => item.id === "pf1e.ancestry.anao")?.data.traits).toHaveLength(9);
    expect(classes.source).toBe("local_snapshot");
    expect(classes.items).toHaveLength(11);
    expect(classes.items.find((item) => item.id === "pf1e.class.barbaro")?.data.babProgression).toBe("full");
    expect(classes.items.find((item) => item.id === "pf1e.class.barbaro")).toMatchObject({
      summary: expect.stringContaining("Riqueza inicial: 3d6 × 10 PO"),
      data: { startingWealth: { diceCount: 3, multiplierGp: 10, averageGp: 105, sourcePage: 140 } },
    });
    expect(skills.source).toBe("local_snapshot");
    expect(skills.items).toHaveLength(26);
    expect(skills.items.find((item) => item.id === "pf1e.skill.acrobacia")?.data.skillAbility).toBe("des");
  });

  it("expõe armas e munições da Tabela 6-4 do Livro Básico PF1e", async () => {
    const [weapons, ammunition] = await Promise.all([
      fetchCatalogCategory("weapon", { systemId: "pf1e", ruleset: "legacy_pf1" }),
      fetchCatalogCategory("item", { systemId: "pf1e", ruleset: "legacy_pf1" }),
    ]);

    expect(weapons.source).toBe("local_snapshot");
    expect(weapons.items).toHaveLength(77);
    expect(weapons.items.find((item) => item.id === "pf1e.weapon.adaga")?.data).toMatchObject({
      damageSmall: "1d3", damageMedium: "1d4", critical: "19-20/x2", rangeMeters: 3,
    });
    expect(weapons.items.every((item) => item.data.source?.page === 142 || item.data.source?.page === 143)).toBe(true);
    expect(ammunition.source).toBe("local_snapshot");
    expect(ammunition.items).toHaveLength(198);
    expect(ammunition.items.find((item) => item.id === "pf1e.item.virotes-besta-leve-10")?.data.quantity).toBe(10);
  });

  it("expõe armaduras, escudos e acessórios da Tabela 6-6 do Livro Básico PF1e", async () => {
    const [armors, shields, items] = await Promise.all([
      fetchCatalogCategory("armor", { systemId: "pf1e", ruleset: "legacy_pf1" }),
      fetchCatalogCategory("shield", { systemId: "pf1e", ruleset: "legacy_pf1" }),
      fetchCatalogCategory("item", { systemId: "pf1e", ruleset: "legacy_pf1" }),
    ]);

    expect(armors.source).toBe("local_snapshot");
    expect(armors.items).toHaveLength(12);
    expect(armors.items.find((item) => item.id === "pf1e.armor.acolchoada")?.data).toMatchObject({
      acBonus: 1, maxDexBonus: 8, armorCheckPenalty: 0, arcaneSpellFailure: 5, weightKg: 5,
    });
    expect(armors.items.find((item) => item.id === "pf1e.armor.acolchoada")?.data).toMatchObject({
      donningGroup: "light",
      donningTimes: { don: "1 minuto", donQuick: "5 rodadas", remove: "1 minuto" },
      donningTable: "6-7",
      donningSourcePage: 153,
    });
    expect(armors.items.find((item) => item.id === "pf1e.armor.armadura-completa")?.data.donningTimes).toEqual({
      don: "4 minutos", donQuick: "4 minutos", remove: "1d4+1 minutos",
    });
    expect(armors.items.find((item) => item.id === "pf1e.armor.acolchoada")?.data.sizeAdjustments).toMatchObject({
      table: "6-8",
      sourcePage: 153,
      humanoid: { "miúdo-ou-menor": { cost: 0.5, weight: 0.1 }, colossal: { cost: 16, weight: 12 } },
      nonHumanoid: { "miúdo-ou-menor": { cost: 1, weight: 0.1 }, colossal: { cost: 32, weight: 12 } },
      tinyOrSmallerArmorBonusMultiplier: 0.5,
    });
    expect(armors.items.every((item) => item.data.source?.page === 150 && item.data.summaryOnly === true)).toBe(true);
    expect(shields.source).toBe("local_snapshot");
    expect(shields.items).toHaveLength(6);
    expect(shields.items.find((item) => item.id === "pf1e.shield.escudo-de-corpo")?.data).toMatchObject({
      acBonus: 4, maxDexBonus: 2, armorCheckPenalty: -10, arcaneSpellFailure: 50, weightKg: 22.5,
    });
    expect(shields.items.find((item) => item.id === "pf1e.shield.broquel")?.data.donningTimes).toEqual({
      don: "1 ação de movimento", donQuick: null, remove: "1 ação de movimento",
    });
    expect(shields.items.find((item) => item.id === "pf1e.shield.broquel")?.data.sizeAdjustments).toEqual(
      armors.items.find((item) => item.id === "pf1e.armor.acolchoada")?.data.sizeAdjustments,
    );
    expect(shields.items.every((item) => item.data.source?.page === 150 && item.data.summaryOnly === true)).toBe(true);
    expect(items.items).toHaveLength(198);
    expect(items.items.every((item) => item.data.ruleset === "legacy_pf1")).toBe(true);
    expect(items.items.filter((item) => item.data.table === "6-6")).toHaveLength(3);
    expect(items.items.filter((item) => item.data.table === "6-9")).toHaveLength(161);
    const currency = items.items.filter((item) => item.data.table === "6-2");
    expect(currency).toHaveLength(4);
    expect(currency.find((item) => item.id === "pf1e.item.moeda-pl")).toMatchObject({
      data: { costLabel: "1 PL", priceGp: 10, weightKg: 0.01, tablePage: 140, source: { page: 140 } },
    });
    const tradeGoods = items.items.filter((item) => item.data.table === "6-3");
    expect(tradeGoods).toHaveLength(22);
    expect(tradeGoods.find((item) => item.id === "pf1e.item.bem-troca-platina")).toMatchObject({
      data: { costLabel: "500 PO", priceGp: 500, weightKg: 0.5, unit: "meio quilo", tablePage: 140, summaryOnly: true },
    });
    expect(tradeGoods.find((item) => item.id === "pf1e.item.bem-troca-galinha")?.data.weightKg).toBeNull();
  });

  it("carrega as regras de riqueza e câmbio PF1e pelo ruleset isolado", async () => {
    const { items, source } = await fetchCatalogCategory("rule", { systemId: "pf1e", ruleset: "legacy_pf1" });
    expect(source).toBe("local_runtime");
    expect(items).toHaveLength(3);
    expect(items.every((item) => item.system_id === "pf1e" && item.data.ruleset === "legacy_pf1")).toBe(true);
    expect(items.find((item) => item.id === "pf1e.rule.creation.legacy_pf1")?.data.source?.page).toBe(140);
  });

  it("expõe os equipamentos gerais da Tabela 6-9 PF1e com custo, peso e proveniência da p. 158", async () => {
    const { items } = await fetchCatalogCategory("item", { systemId: "pf1e", ruleset: "legacy_pf1" });
    const tableEntries = items.filter((item) => item.data.table === "6-9");
    expect(tableEntries).toHaveLength(161);
    expect(new Set(items.map((item) => item.id)).size).toBe(items.length);
    expect(tableEntries.filter((item) => item.data.tableSection === "equipamento de aventura")).toHaveLength(68);
    expect(tableEntries.filter((item) => item.data.tableSection === "substância especial")).toHaveLength(10);
    expect(tableEntries.filter((item) => item.data.tableSection === "ferramenta ou kit")).toHaveLength(18);
    expect(tableEntries.filter((item) => item.data.tableSection === "vestuário")).toHaveLength(12);
    expect(tableEntries.filter((item) => item.data.tableSection === "comida, bebida e estadia")).toHaveLength(14);
    expect(tableEntries.filter((item) => item.data.tableSection === "montaria ou equipamento relacionado")).toHaveLength(21);
    expect(tableEntries.filter((item) => item.data.tableSection === "transporte")).toHaveLength(11);
    expect(tableEntries.filter((item) => item.data.tableSection === "serviço")).toHaveLength(7);
    expect(tableEntries.filter((item) => item.data.tablePage === 158)).toHaveLength(102);
    expect(tableEntries.filter((item) => item.data.tablePage === 159)).toHaveLength(59);
    expect(tableEntries.every((item) => item.data.source?.page === (item.data.detailsPage ?? item.data.tablePage) && item.data.summaryOnly === true)).toBe(true);
    expect(items.find((item) => item.id === "pf1e.item.algemas-obra-prima")).toMatchObject({
      data: { costLabel: "50 PO", priceGp: 50, weightKg: 1, ruleset: "legacy_pf1", table: "6-9" },
    });
    expect(items.find((item) => item.id === "pf1e.item.tocha")?.data).toMatchObject({
      costLabel: "1 PC", priceGp: 0.01, weightKg: 0.5, tableSection: "equipamento de aventura",
    });
    expect(items.find((item) => item.id === "pf1e.item.azevinho-e-visco")?.data.priceGp).toBeNull();
    expect(items.find((item) => item.id === "pf1e.item.armadura-de-montaria-criatura-grande")?.data).toMatchObject({
      priceGp: null, costMultiplier: 4, weightMultiplier: 2, tablePage: 159,
    });
    expect(items.find((item) => item.id === "pf1e.item.conjuracao-de-magia")?.data).toMatchObject({
      priceGp: null, costFormula: "nível de conjurador × nível da magia × 10 PO; consultar a magia para custos adicionais", tablePage: 159,
    });
    expect(items.find((item) => item.id === "pf1e.item.mensageiro")?.data).toMatchObject({
      priceGp: 0.02, unit: "por km", tablePage: 159,
    });
    expect(items.find((item) => item.id === "pf1e.item.antidoto-ampola")).toMatchObject({
      summary: expect.stringContaining("+5 de bônus alquímico em um teste de Fortitude contra veneno"),
      data: { detailsPage: 159, source: { page: 159 }, mechanicsSummary: expect.stringContaining("1 hora"), summaryOnly: true },
    });
    expect(items.find((item) => item.id === "pf1e.item.acido-frasco")).toMatchObject({
      summary: expect.stringContaining("1d6 de dano ácido"),
      data: {
        detailsPage: 157, source: { page: 157 },
        mechanicsSummary: expect.stringContaining("1 ponto de dano ácido por respingo"), summaryOnly: true,
      },
    });
    expect(items.find((item) => item.id === "pf1e.item.agua-benta-frasco")).toMatchObject({
      summary: expect.stringContaining("2d4 de dano"),
      data: {
        detailsPage: 157, source: { page: 157 },
        mechanicsSummary: expect.stringContaining("mortos-vivos ou extraplanares malignos"), summaryOnly: true,
      },
    });
    expect(items.find((item) => item.id === "pf1e.item.agua-benta-frasco")?.data.mechanicsSummary).toContain("1 ponto por respingo");
    expect(items.find((item) => item.id === "pf1e.item.agua-benta-frasco")?.data.mechanicsSummary).toContain("não provoca ataques de oportunidade");
    for (const id of ["bastao-de-fumaca", "bastao-solar"]) {
      expect(items.find((item) => item.id === `pf1e.item.${id}`)?.data).toMatchObject({
        detailsPage: 159, source: { page: 159 },
      });
    }
    for (const id of ["bolsa-enredape", "fogo-alquimico-frasco", "fosforos", "pedra-trovao", "tocha-da-chama-eterna"]) {
      expect(items.find((item) => item.id === `pf1e.item.${id}`)?.data).toMatchObject({
        detailsPage: 160, source: { page: 160 },
      });
    }
    expect(items.find((item) => item.id === "pf1e.item.bolsa-enredape")?.data).toMatchObject({
      tablePage: 158, detailsPage: 160, source: { page: 160 },
      mechanicsSummary: expect.stringContaining("Reflexos CD 15"),
    });
    expect(items.find((item) => item.id === "pf1e.item.fogo-alquimico-frasco")?.data.mechanicsSummary).toContain("1d6 de fogo");
    expect(items.find((item) => item.id === "pf1e.item.pedra-trovao")?.data.mechanicsSummary).toContain("Fortitude CD 15");
    expect(items.find((item) => item.id === "pf1e.item.tocha-da-chama-eterna")?.summary).toContain("não produz calor");
    const adventureGearPages = new Map<string, number>([
      ["algemas-obra-prima", 155], ["algemas", 155], ["ampola-tinta-ou-pocao", 155],
      ["arete-portatil", 155], ["arpao", 155], ["corda-de-canhamo-16m", 155],
      ["corda-de-seda-16m", 155], ["corrente-3m", 155], ["estrepes-1kg", 155],
      ["fechadura-boa", 155], ["fechadura-comum", 155], ["fechadura-simples", 155],
      ["fechadura-superior", 155], ["jarro-de-ceramica", 155],
      ...["lampada", "lanterna-coberta", "lanterna-focada", "luneta", "martelo", "oleo-frasco-meio-litro", "pa", "pe-de-cabra", "pederneira", "picareta-de-mina", "relogio-de-agua", "tinta-vidro-30ml", "tocha", "vela"].map((id) => [id, 156] as [string, number]),
    ]);
    for (const [id, page] of adventureGearPages) {
      expect(items.find((item) => item.id === `pf1e.item.${id}`)).toMatchObject({
        summary: expect.any(String),
        data: { detailsPage: page, source: { page }, summaryOnly: true },
      });
      expect(items.find((item) => item.id === `pf1e.item.${id}`)?.data.mechanicsSummary.length).toBeGreaterThan(0);
    }
    const toolsAndKits = tableEntries.filter((item) => item.data.tableSection === "ferramenta ou kit");
    expect(toolsAndKits).toHaveLength(18);
    expect(toolsAndKits.every((item) => typeof item.data.mechanicsSummary === "string" && item.data.mechanicsSummary.length > 0)).toBe(true);
    expect(toolsAndKits.every((item) => [160, 161].includes(Number(item.data.detailsPage)) && item.data.source?.page === item.data.detailsPage)).toBe(true);
    expect(items.find((item) => item.id === "pf1e.item.kit-de-primeiros-socorros")?.data.mechanicsSummary).toContain("10 usos");
    expect(items.find((item) => item.id === "pf1e.item.grimorio-em-branco")?.data.mechanicsSummary).toContain("100 páginas");
    expect(items.find((item) => item.id === "pf1e.item.ferramentas-de-artesao")?.data.mechanicsSummary).toContain("-2 nos testes de Ofícios");
  });

  it("expõe todos os rulesets presentes no snapshot para filtros do Compêndio", () => {
    expect(DEFAULT_RPG_SYSTEMS.map((system) => system.id)).toEqual(expect.arrayContaining(["pf2e", "t20", "dnd5e", "ose", "dnd35"]));
    expect(CATALOG_RULESETS).toEqual([
      "advanced", "basico", "classic", "legacy", "legacy_pf1", "padrao", "remaster", "standard",
      "v35", "v35-adv", "v35-cg", "v35-cor", "v35-cov", "v35-defensores", "v35-frostburn",
    ]);
  });

  it("carrega somente os arquivos do sistema, ruleset e categoria solicitados", async () => {
    const result = await fetchCatalogCategory("spell", { systemId: "dnd35", ruleset: "v35-cov" });
    expect(result.source).toBe("local_snapshot");
    expect(result.items).toHaveLength(33);
    expect(result.items.every((item) => item.system_id === "dnd35" && item.data.ruleset === "v35-cov")).toBe(true);
  });

  it("preserva os quatro pré-requisitos de Ataque em Movimento no catálogo D&D 3.5", async () => {
    const { items } = await fetchCatalogCategory("feat", { systemId: "dnd35", ruleset: "v35" });
    const feat = items.find((item) => item.id === "dnd35.feat.ataque-em-movimento");
    expect(feat).toMatchObject({
      data: {
        prerequisites: "Des 13, Esquiva, Mobilidade, bônus base de ataque +4",
        source: { page: 92 },
      },
    });
    expect(feat?.data.full).toMatchObject({
      prerequisites: ["Des 13", "Esquiva", "Mobilidade", "bônus base de ataque +4"],
    });
  });

  it("preserva Int 13 e a cadeia completa de pré-requisitos de Ataque Giratório no snapshot D&D 3.5", async () => {
    const { items, source } = await fetchCatalogCategory("feat", { systemId: "dnd35", ruleset: "v35" });
    const feat = items.find((item) => item.id === "dnd35.feat.ataque-giratorio");
    expect(source).toBe("local_snapshot");
    expect(feat?.data.prerequisites).toBe(
      "Des 13, Int 13, Especialização em Combate, Esquiva, Mobilidade, Ataque em Movimento, bônus base de ataque +4",
    );
  });

  it("serve danos estruturados dos poderes Frostburn pelo snapshot v35-frostburn", async () => {
    const { items, source } = await fetchCatalogCategory("spell", { systemId: "dnd35", ruleset: "v35-frostburn" });
    const byId = new Map(items.map((item) => [item.id, item]));

    expect(source).toBe("local_snapshot");
    expect(items).toHaveLength(106);
    for (const power of DND35_FROSTBURN_POWERS.filter((entry) => entry.damage)) {
      expect(byId.get(`dnd35.frostburn.power.${power.id}`)?.data).toMatchObject({
        damage: power.damage,
        damageType: power.damageType,
      });
    }
  });

  it("expõe as listas de magias D&D 3.5 já transcritas apenas no ruleset v35", async () => {
    const expectedCount = DND35_SPELL_LISTS.reduce((total, list) => total + list.entries.length, 0);
    const { items, source } = await fetchCatalogCategory("spell", { systemId: "dnd35", ruleset: "v35" });

    expect(source).toBe("local_runtime");
    expect(items).toHaveLength(expectedCount);
    const transcribedBookSpells = items.filter((item) => typeof item.data.listId === "string");
    expect(transcribedBookSpells).toHaveLength(expectedCount);
    const allReviewedSummaryIds = transcribedBookSpells.filter((item) => item.data.summaryOnly === false).map((item) => item.id).sort();
    const reviewedSummoningIds = allReviewedSummaryIds.filter((id) => /\.invocar-(?:aliado-da-natureza|criaturas|enxames)(?:-|$)/.test(id));
    const romanLevels = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix"];
    const expectedSummoningIds = [
      ...romanLevels.map((level) => `dnd35.phb.spell.druida.${romanLevels.indexOf(level) + 1}.invocar-aliado-da-natureza-${level}`),
      ...romanLevels.slice(0, 4).map((level) => `dnd35.phb.spell.patrulheiro.${romanLevels.indexOf(level) + 1}.invocar-aliado-da-natureza-${level}`),
      ...["bardo", "clerigo", "feiticeiro_mago"].flatMap((classId) => {
        const maxLevel = classId === "bardo" ? 6 : 9;
        return romanLevels.slice(0, maxLevel).map((level) => `dnd35.phb.spell.${classId}.${romanLevels.indexOf(level) + 1}.invocar-criaturas-${level}`);
      }),
      ...["bardo", "druida", "feiticeiro_mago"].map((classId) => `dnd35.phb.spell.${classId}.2.invocar-enxames`),
    ].sort();
    expect(reviewedSummoningIds).toEqual(expectedSummoningIds);
    const reviewedSummaryIds = allReviewedSummaryIds.filter((id) => !reviewedSummoningIds.includes(id));
    expect(reviewedSummaryIds.sort()).toEqual([
      "dnd35.phb.spell.bardo.1.compreender-idiomas",
      "dnd35.phb.spell.bardo.0.detectar-magia",
      "dnd35.phb.spell.bardo.3.confusao",
      "dnd35.phb.spell.bardo.0.consertar",
      "dnd35.phb.spell.bardo.1.confusao-menor",
      "dnd35.phb.spell.bardo.1.detectar-portas-secretas",
      "dnd35.phb.spell.bardo.1.dissimular-tendencia",
      "dnd35.phb.spell.bardo.2.detectar-pensamentos",
      "dnd35.phb.spell.bardo.4.conjuracao-de-sombras",
      "dnd35.phb.spell.bardo.4.detectar-videncia",
      "dnd35.phb.spell.bardo.6.danca-irresistivel-de-otto",
      "dnd35.phb.spell.bardo.2.despedacar",
      "dnd35.phb.spell.bardo.3.desespero-esmagador",
      "dnd35.phb.spell.bardo.3.deslocamento",
      "dnd35.phb.spell.bardo.5.despistar",
      "dnd35.phb.spell.clerigo.0.consertar",
      "dnd35.phb.spell.clerigo.0.detectar-magia",
      "dnd35.phb.spell.clerigo.0.detectar-venenos",
      "dnd35.phb.spell.clerigo.1.compreender-idiomas",
      "dnd35.phb.spell.clerigo.2.consagrar",
      "dnd35.phb.spell.clerigo.2.descanso-tranquilo",
      "dnd35.phb.spell.clerigo.1.desespero",
      "dnd35.phb.spell.clerigo.1.detectar-caos-mal-bem-ordem",
      "dnd35.phb.spell.clerigo.1.detectar-mortos-vivos",
      "dnd35.phb.spell.clerigo.2.despedacar",
      "dnd35.phb.spell.clerigo.1.maldicao-menor",
      "dnd35.phb.spell.clerigo.3.mao-opifera",
      "dnd35.phb.spell.clerigo.8.manto-do-caos",
      "dnd35.phb.spell.clerigo.2.dissimular-tendencia",
      "dnd35.phb.spell.clerigo.4.discernir-mentiras",
      "dnd35.phb.spell.clerigo.6.destruir-mortos-vivos",
      "dnd35.phb.spell.clerigo.7.destruicao",
      "dnd35.phb.spell.clerigo.3.criar-mortos-vivos-menor",
      "dnd35.phb.spell.clerigo.6.cupula-de-protecao-contra-a-vida",
      "dnd35.phb.spell.clerigo.6.cura-completa",
      "dnd35.phb.spell.clerigo.5.comunhao",
      "dnd35.phb.spell.clerigo.5.conspurcar",
      "dnd35.phb.spell.clerigo.6.criar-mortos-vivos",
      "dnd35.phb.spell.clerigo.7.controlar-o-clima",
      "dnd35.phb.spell.clerigo.8.criar-mortos-vivos-maior",
      "dnd35.phb.spell.clerigo.9.cura-completa-em-massa",
      "dnd35.phb.spell.druida.0.consertar",
      "dnd35.phb.spell.druida.0.detectar-magia",
      "dnd35.phb.spell.druida.0.detectar-venenos",
      "dnd35.phb.spell.druida.1.constricao",
      "dnd35.phb.spell.druida.4.comandar-plantas",
      "dnd35.phb.spell.druida.5.comunhao-com-a-natureza",
      "dnd35.phb.spell.druida.5.conspurcar",
      "dnd35.phb.spell.druida.4.controlar-agua",
      "dnd35.phb.spell.druida.4.malogro",
      "dnd35.phb.spell.druida.6.conto-das-rochas",
      "dnd35.phb.spell.druida.4.cupula-de-protecao-contra-vegetais",
      "dnd35.phb.spell.druida.6.cupula-de-protecao-contra-a-vida",
      "dnd35.phb.spell.druida.7.controlar-o-clima",
      "dnd35.phb.spell.druida.7.cura-completa",
      "dnd35.phb.spell.druida.8.dedo-da-morte",
      "dnd35.phb.spell.druida.1.detectar-animais-ou-plantas",
      "dnd35.phb.spell.druida.1.detectar-armadilhas",
      "dnd35.phb.spell.druida.5.despertar",
      "dnd35.phb.spell.druida.7.destruicao-rastejante",
      "dnd35.phb.spell.druida.3.convocar-relampagos",
      "dnd35.phb.spell.druida.5.convocar-tempestade-de-relampagos",
      "dnd35.phb.spell.druida.3.crescer-espinhos",
      "dnd35.phb.spell.feiticeiro_mago.1.compreender-idiomas",
      "dnd35.phb.spell.feiticeiro_mago.2.comandar-mortos-vivos",
      "dnd35.phb.spell.feiticeiro_mago.0.consertar",
      "dnd35.phb.spell.feiticeiro_mago.0.detectar-magia",
      "dnd35.phb.spell.feiticeiro_mago.0.detectar-venenos",
      "dnd35.phb.spell.feiticeiro_mago.1.detectar-mortos-vivos",
      "dnd35.phb.spell.feiticeiro_mago.1.detectar-portas-secretas",
      "dnd35.phb.spell.feiticeiro_mago.1.disco-flutuante-de-tenser",
      "dnd35.phb.spell.feiticeiro_mago.2.detectar-pensamentos",
      "dnd35.phb.spell.feiticeiro_mago.4.conjuracao-de-sombras",
      "dnd35.phb.spell.feiticeiro_mago.4.confusao",
      "dnd35.phb.spell.feiticeiro_mago.4.criar-mortos-vivos-menor",
      "dnd35.phb.spell.feiticeiro_mago.5.compor",
      "dnd35.phb.spell.feiticeiro_mago.5.cone-glacial",
      "dnd35.phb.spell.feiticeiro_mago.5.contato-extraplanar",
      "dnd35.phb.spell.feiticeiro_mago.5.criar-passagens",
      "dnd35.phb.spell.feiticeiro_mago.5.malogro",
      "dnd35.phb.spell.feiticeiro_mago.2.mao-espectral",
      "dnd35.phb.spell.feiticeiro_mago.5.mao-interposta-de-bigby-a",
      "dnd35.phb.spell.feiticeiro_mago.1.maos-flamejantes",
      "dnd35.phb.spell.feiticeiro_mago.6.contingencia",
      "dnd35.phb.spell.feiticeiro_mago.6.controlar-agua",
      "dnd35.phb.spell.feiticeiro_mago.6.controlar-o-clima",
      "dnd35.phb.spell.feiticeiro_mago.6.mao-vigorosa-de-bigby-a",
      "dnd35.phb.spell.feiticeiro_mago.7.mansao-magnifica-de-mordenkainen",
      "dnd35.phb.spell.feiticeiro_mago.7.mao-poderosa-de-bigby-a",
      "dnd35.phb.spell.feiticeiro_mago.9.mao-esmagadora-de-bigby-a",
      "dnd35.phb.spell.feiticeiro_mago.6.corrente-de-relampagos",
      "dnd35.phb.spell.feiticeiro_mago.6.criar-mortos-vivos",
      "dnd35.phb.spell.feiticeiro_mago.7.cubo-de-energia",
      "dnd35.phb.spell.feiticeiro_mago.8.corpo-de-ferro",
      "dnd35.phb.spell.feiticeiro_mago.8.discernir-localizacao",
      "dnd35.phb.spell.feiticeiro_mago.8.danca-irresistivel-de-otto",
      "dnd35.phb.spell.feiticeiro_mago.3.descanso-tranquilo",
      "dnd35.phb.spell.feiticeiro_mago.2.despedacar",
      "dnd35.phb.spell.feiticeiro_mago.3.deslocamento",
      "dnd35.phb.spell.feiticeiro_mago.3.dificultar-deteccao",
      "dnd35.phb.spell.feiticeiro_mago.3.encolher-item",
      "dnd35.phb.spell.feiticeiro_mago.4.detectar-videncia",
      "dnd35.phb.spell.feiticeiro_mago.9.disjuncao-de-mordenkainen",
      "dnd35.phb.spell.feiticeiro_mago.4.desespero-esmagador",
      "dnd35.phb.spell.feiticeiro_mago.6.desintegrar",
      "dnd35.phb.spell.feiticeiro_mago.6.despistar",
      "dnd35.phb.spell.feiticeiro_mago.6.destruir-mortos-vivos",
      "dnd35.phb.spell.feiticeiro_mago.7.dedo-da-morte",
      "dnd35.phb.spell.feiticeiro_mago.7.desejo-restrito",
      "dnd35.phb.spell.feiticeiro_mago.8.criar-mortos-vivos-maior",
      "dnd35.phb.spell.patrulheiro.3.comandar-plantas",
      "dnd35.phb.spell.patrulheiro.1.constricao",
      "dnd35.phb.spell.patrulheiro.2.crescer-espinhos",
      "dnd35.phb.spell.patrulheiro.4.comunhao-com-a-natureza",
      "dnd35.phb.spell.patrulheiro.1.detectar-animais-ou-plantas",
      "dnd35.phb.spell.patrulheiro.1.detectar-armadilhas",
      "dnd35.phb.spell.paladino.1.detectar-venenos",
      "dnd35.phb.spell.paladino.1.detectar-mortos-vivos",
      "dnd35.phb.spell.paladino.2.dissimular-tendencia",
      "dnd35.phb.spell.paladino.3.discernir-mentiras",
      "dnd35.phb.spell.patrulheiro.4.dificultar-deteccao",
      "dnd35.phb.spell.bardo.3.dissipar-magia",
      "dnd35.phb.spell.bardo.5.dissipar-magia-maior",
      "dnd35.phb.spell.clerigo.3.dissipar-magia",
      "dnd35.phb.spell.clerigo.5.dissipar-o-caos-mal-bem-ordem",
      "dnd35.phb.spell.clerigo.6.dissipar-magia-maior",
      "dnd35.phb.spell.clerigo.7.ditado",
      "dnd35.phb.spell.druida.4.dissipar-magia",
      "dnd35.phb.spell.druida.6.dissipar-magia-maior",
      "dnd35.phb.spell.feiticeiro_mago.3.dissipar-magia",
      "dnd35.phb.spell.feiticeiro_mago.6.dissipar-magia-maior",
      "dnd35.phb.spell.feiticeiro_mago.6.elucubracao-de-mordenkainen",
      "dnd35.phb.spell.paladino.3.dissipar-magia",
      "dnd35.phb.spell.paladino.4.dissipar-o-caos",
      "dnd35.phb.spell.paladino.4.dissipar-o-mal",
      "dnd35.phb.spell.feiticeiro_mago.1.escudo-arcano",
      "dnd35.phb.spell.clerigo.1.escudo-entropico",
      "dnd35.phb.spell.clerigo.1.escudo-da-fe",
      "dnd35.phb.spell.feiticeiro_mago.4.escudo-do-fogo",
      "dnd35.phb.spell.clerigo.8.escudo-da-ordem",
      "dnd35.phb.spell.bardo.3.esculpir-som",
      "dnd35.phb.spell.feiticeiro_mago.4.esfera-resiliente-de-otiluke",
      "dnd35.phb.spell.feiticeiro_mago.8.esfera-telecinetica-de-otiluke",
      "dnd35.phb.spell.druida.2.esfriar-metal",
      "dnd35.phb.spell.feiticeiro_mago.7.espada-de-mordenkainen",
      "dnd35.phb.spell.paladino.4.espada-sagrada",
      "dnd35.phb.spell.feiticeiro_mago.8.evocacao-de-sombras-maior",
      "dnd35.phb.spell.clerigo.4.expulsao",
      "dnd35.phb.spell.feiticeiro_mago.5.expulsao",
      "dnd35.phb.spell.bardo.2.explosao-sonora",
      "dnd35.phb.spell.clerigo.2.explosao-sonora",
      "dnd35.phb.spell.druida.8.explosao-solar",
      "dnd35.phb.spell.feiticeiro_mago.8.explosao-solar",
      "dnd35.phb.spell.druida.3.extinguir-fogo",
      "dnd35.phb.spell.bardo.3.falar-com-animais",
      "dnd35.phb.spell.druida.1.falar-com-animais",
      "dnd35.phb.spell.patrulheiro.1.falar-com-animais",
      "dnd35.phb.spell.clerigo.3.falar-com-os-mortos",
      "dnd35.phb.spell.bardo.4.falar-com-plantas",
      "dnd35.phb.spell.druida.3.falar-com-plantas",
      "dnd35.phb.spell.patrulheiro.2.falar-com-plantas",
      "dnd35.phb.spell.feiticeiro_mago.2.flecha-acida-de-melf",
      "dnd35.phb.spell.feiticeiro_mago.3.flecha-de-chamas",
      "dnd35.phb.spell.druida.1.fogo-das-fadas",
      "dnd35.phb.spell.clerigo.5.forca-dos-justos",
      "dnd35.phb.spell.feiticeiro_mago.2.forca-do-touro",
      "dnd35.phb.spell.clerigo.2.forca-do-touro",
      "dnd35.phb.spell.druida.2.forca-do-touro",
      "dnd35.phb.spell.paladino.2.forca-do-touro",
      "dnd35.phb.spell.bardo.0.globos-de-luz",
      "dnd35.phb.spell.bardo.2.furia",
      "dnd35.phb.spell.bardo.4.grito",
      "dnd35.phb.spell.bardo.6.grito-maior",
      "dnd35.phb.spell.druida.9.grupo-de-elementais",
      "dnd35.phb.spell.feiticeiro_mago.0.globos-de-luz",
      "dnd35.phb.spell.feiticeiro_mago.3.furia",
      "dnd35.phb.spell.feiticeiro_mago.4.globo-de-invulnerabilidade-menor",
      "dnd35.phb.spell.feiticeiro_mago.4.grito",
      "dnd35.phb.spell.feiticeiro_mago.6.globo-de-invulnerabilidade",
      "dnd35.phb.spell.feiticeiro_mago.8.grito-maior",
      "dnd35.phb.spell.feiticeiro_mago.9.grito-da-banshee",
      "dnd35.phb.spell.bardo.3.forma-gasosa",
      "dnd35.phb.spell.clerigo.6.forca-do-touro-em-massa",
      "dnd35.phb.spell.clerigo.9.forma-eterea",
      "dnd35.phb.spell.druida.2.forma-de-arvore",
      "dnd35.phb.spell.druida.6.forca-do-touro-em-massa",
      "dnd35.phb.spell.druida.8.forma-animal",
      "dnd35.phb.spell.feiticeiro_mago.3.forma-gasosa",
      "dnd35.phb.spell.feiticeiro_mago.6.forca-do-touro-em-massa",
      "dnd35.phb.spell.feiticeiro_mago.9.forma-eterea",
      "dnd35.phb.spell.patrulheiro.3.forma-de-arvore",
      "dnd35.phb.spell.bardo.1.imagem-silenciosa",
      "dnd35.phb.spell.bardo.2.imobilizar-pessoa",
      "dnd35.phb.spell.bardo.4.imobilizar-monstro",
      "dnd35.phb.spell.bardo.5.imagem-persistente",
      "dnd35.phb.spell.bardo.6.imagem-programada",
      "dnd35.phb.spell.clerigo.2.imobilizar-pessoa",
      "dnd35.phb.spell.clerigo.4.imunidade-a-magia",
      "dnd35.phb.spell.clerigo.9.implosao",
      "dnd35.phb.spell.druida.2.imobilizar-animal",
      "dnd35.phb.spell.feiticeiro_mago.1.imagem-silenciosa",
      "dnd35.phb.spell.feiticeiro_mago.1.leque-cromatico",
      "dnd35.phb.spell.feiticeiro_mago.3.imobilizar-mortos-vivos",
      "dnd35.phb.spell.feiticeiro_mago.3.imobilizar-pessoa",
      "dnd35.phb.spell.feiticeiro_mago.3.lentidao",
      "dnd35.phb.spell.feiticeiro_mago.5.imagem-persistente",
      "dnd35.phb.spell.feiticeiro_mago.5.imobilizar-monstro",
      "dnd35.phb.spell.feiticeiro_mago.6.imagem-programada",
      "dnd35.phb.spell.feiticeiro_mago.6.lendas-e-historias",
      "dnd35.phb.spell.feiticeiro_mago.7.imobilizar-pessoa-em-massa",
      "dnd35.phb.spell.feiticeiro_mago.9.imobilizar-monstro-em-massa",
      "dnd35.phb.spell.patrulheiro.2.imobilizar-animal",
      "dnd35.phb.spell.bardo.2.heroismo",
      "dnd35.phb.spell.feiticeiro_mago.3.heroismo",
      "dnd35.phb.spell.bardo.5.heroismo-maior",
      "dnd35.phb.spell.feiticeiro_mago.6.heroismo-maior",
      "dnd35.phb.spell.bardo.1.hipnotismo",
      "dnd35.phb.spell.feiticeiro_mago.1.hipnotismo",
      "dnd35.phb.spell.druida.9.homens-vegetais",
      "dnd35.phb.spell.bardo.1.identificacao",
      "dnd35.phb.spell.feiticeiro_mago.1.identificacao",
      "dnd35.phb.spell.bardo.2.idiomas",
      "dnd35.phb.spell.clerigo.4.idiomas",
      "dnd35.phb.spell.feiticeiro_mago.3.idiomas",
      "dnd35.phb.spell.bardo.3.imagem-maior",
      "dnd35.phb.spell.bardo.3.lentidao",
      "dnd35.phb.spell.feiticeiro_mago.3.imagem-maior",
      "dnd35.phb.spell.bardo.2.imagem-menor",
      "dnd35.phb.spell.feiticeiro_mago.2.imagem-menor",
      "dnd35.phb.spell.bardo.6.imagem-permanente",
      "dnd35.phb.spell.feiticeiro_mago.6.imagem-permanente",
      "dnd35.phb.spell.clerigo.8.imunidade-a-magia-maior",
      "dnd35.phb.spell.clerigo.4.infligir-ferimentos-criticos",
      "dnd35.phb.spell.clerigo.8.infligir-ferimentos-criticos-em-massa",
      "dnd35.phb.spell.clerigo.3.infligir-ferimentos-graves",
      "dnd35.phb.spell.clerigo.7.infligir-ferimentos-graves-em-massa",
      "dnd35.phb.spell.clerigo.1.infligir-ferimentos-leves",
      "dnd35.phb.spell.clerigo.5.infligir-ferimentos-leves-em-massa",
      "dnd35.phb.spell.clerigo.0.infligir-ferimentos-minimos",
      "dnd35.phb.spell.clerigo.2.infligir-ferimentos-moderados",
      "dnd35.phb.spell.clerigo.6.infligir-ferimentos-moderados-em-massa",
      "dnd35.phb.spell.feiticeiro_mago.7.insanidade",
      "dnd35.phb.spell.clerigo.4.inseto-gigante",
      "dnd35.phb.spell.druida.4.inseto-gigante",
      "dnd35.phb.spell.feiticeiro_mago.8.instante-de-presciencia",
      "dnd35.phb.spell.bardo.0.intuir-direcao",
      "dnd35.phb.spell.druida.0.intuir-direcao",
      "dnd35.phb.spell.druida.8.inverter-a-gravidade",
      "dnd35.phb.spell.feiticeiro_mago.7.inverter-a-gravidade",
      "dnd35.phb.spell.bardo.2.invisibilidade",
      "dnd35.phb.spell.feiticeiro_mago.2.invisibilidade",
      "dnd35.phb.spell.druida.1.invisibilidade-contra-animais",
      "dnd35.phb.spell.patrulheiro.1.invisibilidade-contra-animais",
      "dnd35.phb.spell.clerigo.1.invisibilidade-contra-mortos-vivos",
      "dnd35.phb.spell.bardo.4.invisibilidade-maior",
      "dnd35.phb.spell.bardo.4.lendas-e-historias",
      "dnd35.phb.spell.feiticeiro_mago.4.invisibilidade-maior",
      "dnd35.phb.spell.feiticeiro_mago.7.invisibilidade-em-massa",
      "dnd35.phb.spell.bardo.0.ler-magia",
      "dnd35.phb.spell.bardo.0.luz",
      "dnd35.phb.spell.bardo.2.localizar-objetos",
      "dnd35.phb.spell.bardo.3.loquacidade",
      "dnd35.phb.spell.bardo.3.luz-do-dia",
      "dnd35.phb.spell.bardo.4.localizar-criatura",
      "dnd35.phb.spell.clerigo.0.ler-magias",
      "dnd35.phb.spell.clerigo.0.luz",
      "dnd35.phb.spell.clerigo.3.localizar-objetos",
      "dnd35.phb.spell.clerigo.3.luz-cegante",
      "dnd35.phb.spell.clerigo.3.luz-do-dia",
      "dnd35.phb.spell.druida.0.ler-magias",
      "dnd35.phb.spell.druida.0.luz",
      "dnd35.phb.spell.druida.2.lufada-de-vento",
      "dnd35.phb.spell.druida.3.luz-do-dia",
      "dnd35.phb.spell.druida.6.madeira-ferro",
      "dnd35.phb.spell.feiticeiro_mago.0.ler-magias",
      "dnd35.phb.spell.feiticeiro_mago.0.luz",
      "dnd35.phb.spell.feiticeiro_mago.2.levitacao",
      "dnd35.phb.spell.feiticeiro_mago.2.localizar-objetos",
      "dnd35.phb.spell.feiticeiro_mago.2.lufada-de-vento",
      "dnd35.phb.spell.feiticeiro_mago.3.luz-do-dia",
      "dnd35.phb.spell.feiticeiro_mago.4.localizar-criatura",
      "dnd35.phb.spell.feiticeiro_mago.5.ligacao-telepatica-de-rary",
      "dnd35.phb.spell.feiticeiro_mago.8.limpar-a-mente",
      "dnd35.phb.spell.feiticeiro_mago.9.libertacao",
      "dnd35.phb.spell.paladino.1.ler-magias",
      "dnd35.phb.spell.paladino.3.luz-do-dia",
      "dnd35.phb.spell.patrulheiro.1.ler-magias",
      "dnd35.phb.spell.bardo.0.maos-magicas",
      "dnd35.phb.spell.feiticeiro_mago.0.maos-magicas",
      "dnd35.phb.spell.feiticeiro_mago.0.marca-arcana",
      "dnd35.phb.spell.clerigo.5.marca-da-justica",
      "dnd35.phb.spell.paladino.4.marca-da-justica",
      "dnd35.phb.spell.clerigo.5.matar",
      "dnd35.phb.spell.bardo.3.medo",
      "dnd35.phb.spell.feiticeiro_mago.4.medo",
      "dnd35.phb.spell.feiticeiro_mago.4.melhoria-mnemonica-de-rary",
      "dnd35.phb.spell.bardo.2.mensageiro-animal",
      "dnd35.phb.spell.druida.2.mensageiro-animal",
      "dnd35.phb.spell.patrulheiro.1.mensageiro-animal",
      "dnd35.phb.spell.bardo.0.mensagem",
      "dnd35.phb.spell.feiticeiro_mago.0.mensagem",
      "dnd35.phb.spell.clerigo.3.mesclar-se-as-rochas",
      "dnd35.phb.spell.druida.3.mesclar-se-as-rochas",
      "dnd35.phb.spell.druida.7.metal-em-madeira",
    ].sort());
    expect(items.find((item) => item.id === "dnd35.phb.spell.feiticeiro_mago.1.disco-flutuante-de-tenser")?.data).toMatchObject({
      detailsPage: 231, detailsPageEnd: 232, summaryOnly: false,
      mechanics: { target: "Disco de energia horizontal com 90 cm de diâmetro", duration: "1 hora/nível" },
    });
    expect(items.find((item) => item.id === "dnd35.phb.spell.feiticeiro_mago.3.dificultar-deteccao")?.data).toMatchObject({
      detailsPage: 231, summaryOnly: false, spellFlags: ["M"],
      mechanics: { components: "V, G, M", savingThrow: "Vontade anula (inofensiva, objeto)" },
    });
    expect(items.find((item) => item.id === "dnd35.phb.spell.clerigo.4.discernir-mentiras")?.data).toMatchObject({
      detailsPage: 231, summaryOnly: false, mechanics: { components: "V, G, FD", spellResistance: "Não" },
    });
    expect(items.find((item) => item.data.listId === "feiticeiro_mago" && item.data.spellLevel === 3 && item.name === "Dissipar Magia")?.data).toMatchObject({
      detailsPage: 232, summaryOnly: false,
      mechanics: { range: "Médio (30 m + 3 m/nível)", savingThrow: "Nenhum", spellResistance: "Não" },
    });
    expect(items.find((item) => item.data.listId === "clerigo" && item.data.spellLevel === 7 && item.name === "Ditado")?.data).toMatchObject({
      detailsPage: 232, detailsPageEnd: 233, summaryOnly: false,
      mechanics: { target: "Criaturas não Leais numa dispersão de 9 m de raio centrada no conjurador" },
    });
    for (const [listId, level, name, detailsPage, detailsPageEnd] of [
      ["feiticeiro_mago", 8, "Evocação de Sombras Maior", 240, undefined],
      ["clerigo", 4, "Expulsão", 240, undefined], ["feiticeiro_mago", 5, "Expulsão", 240, undefined],
      ["bardo", 2, "Explosão Sonora", 240, undefined], ["clerigo", 2, "Explosão Sonora", 240, undefined],
      ["druida", 8, "Explosão Solar", 240, undefined], ["feiticeiro_mago", 8, "Explosão Solar", 240, undefined],
      ["druida", 3, "Extinguir Fogo", 240, undefined], ["bardo", 3, "Falar com Animais", 240, undefined],
      ["druida", 1, "Falar com Animais", 240, undefined], ["patrulheiro", 1, "Falar Com Animais", 240, undefined],
      ["clerigo", 3, "Falar com os Mortos", 240, 241], ["bardo", 4, "Falar com Plantas", 241, undefined],
      ["druida", 3, "Falar com Plantas", 241, undefined], ["patrulheiro", 2, "Falar com Plantas", 241, undefined],
      ["feiticeiro_mago", 2, "Flecha Ácida de Melf", 241, undefined], ["feiticeiro_mago", 3, "Flecha de Chamas", 241, undefined],
      ["druida", 1, "Fogo das Fadas", 241, undefined], ["clerigo", 5, "Força dos Justos", 241, undefined],
      ["feiticeiro_mago", 2, "Força do Touro", 241, undefined], ["clerigo", 2, "Força do Touro", 241, undefined],
      ["druida", 2, "Força do Touro", 241, undefined], ["paladino", 2, "Força do Touro", 241, undefined],
    ] as const) {
      expect(items.find((item) => item.data.listId === listId && item.data.spellLevel === level && item.name === name)?.data)
        .toMatchObject({ detailsPage, ...(detailsPageEnd ? { detailsPageEnd } : {}), summaryOnly: false });
    }
    // Ter uma ficha mecânica não remove, por si só, o aviso de resumo parcial.
    expect(transcribedBookSpells.find((item) => item.id === "dnd35.phb.spell.feiticeiro_mago.8.clone")?.data.summaryOnly).toBe(true);
    expect(items.find((item) => item.data.listId === "feiticeiro_mago" && item.data.spellLevel === 2 && item.name === "Comandar Mortos-Vivos")?.data).toMatchObject({
      detailsPage: 216, summaryOnly: false, spellFlags: ["M"], mechanics: { duration: "1 dia/nível", savingThrow: "Vontade anula (veja texto)" },
    });
    for (const [listId, level] of [["druida", 4], ["patrulheiro", 3]] as const) {
      expect(items.find((item) => item.data.listId === listId && item.data.spellLevel === level && item.name === "Comandar Plantas")?.data).toMatchObject({
        detailsPage: 216, summaryOnly: false, mechanics: { target: "Até 2 DV/nível de criaturas tipo planta" },
      });
    }
    expect(items.find((item) => item.data.listId === "druida" && item.data.spellLevel === 8 && item.name === "Comandar Plantas")?.data.summaryOnly).toBe(true);
    const shadowConjuration = items.find((item) => item.id === "dnd35.phb.spell.feiticeiro_mago.4.conjuracao-de-sombras");
    expect(shadowConjuration?.data).toMatchObject({ detailsPage: 218, detailsPageEnd: 219, summaryOnly: false });
    expect(items.find((item) => item.id === "dnd35.phb.spell.clerigo.2.consagrar")?.data).toMatchObject({
      detailsPage: 219, summaryOnly: false, spellFlags: ["M"], mechanics: { components: "V, G, M, FD" },
    });
    expect(items.find((item) => item.id === "dnd35.phb.spell.druida.5.conspurcar")?.data).toMatchObject({
      detailsPage: 219, summaryOnly: false, spellFlags: ["M"], mechanics: { components: "V, G, M" },
    });
    expect(items.find((item) => item.id === "dnd35.phb.spell.patrulheiro.1.constricao")?.data).toMatchObject({
      detailsPage: 219, detailsPageEnd: 220, summaryOnly: false,
      mechanics: { savingThrow: "Reflexos parcial (veja texto)", spellResistance: "Não" },
    });
    expect(items.find((item) => item.id === "dnd35.phb.spell.feiticeiro_mago.5.contato-extraplanar")?.data).toMatchObject({ detailsPage: 220, summaryOnly: false });
    expect(items.find((item) => item.id === "dnd35.phb.spell.feiticeiro_mago.6.contingencia")?.data).toMatchObject({ detailsPage: 220, detailsPageEnd: 221, summaryOnly: false });
    expect(items.find((item) => item.id === "dnd35.phb.spell.druida.6.conto-das-rochas")?.data).toMatchObject({ detailsPage: 220, summaryOnly: false });
    for (const [listId, level] of [["druida", 4], ["feiticeiro_mago", 6]] as const) {
      expect(items.find((item) => item.data.listId === listId && item.data.spellLevel === level && item.name === "Controlar Água")?.data).toMatchObject({ detailsPage: 220, detailsPageEnd: 221, summaryOnly: false });
    }
    for (const [listId, level] of [["clerigo", 7], ["druida", 7], ["feiticeiro_mago", 6]] as const) {
      expect(items.find((item) => item.data.listId === listId && item.data.spellLevel === level && item.name === "Controlar o Clima")?.data).toMatchObject({ detailsPage: 221, summaryOnly: false });
    }
    for (const [listId, level, name, detailsPage, detailsPageEnd] of [
      ["druida", 3, "Convocar Relâmpagos", 222, undefined],
      ["druida", 5, "Convocar Tempestade de Relâmpagos", 222, undefined],
      ["feiticeiro_mago", 6, "Corrente de Relâmpagos", 222, undefined],
      ["feiticeiro_mago", 8, "Corpo de Ferro", 222, undefined],
      ["druida", 3, "Crescer Espinhos", 222, 223],
      ["patrulheiro", 2, "Crescer Espinhos", 222, 223],
      ["feiticeiro_mago", 6, "Criar Mortos-Vivos", 223, 224],
      ["clerigo", 6, "Criar Mortos-Vivos", 223, 224],
      ["feiticeiro_mago", 4, "Criar Mortos-Vivos Menor", 224, undefined],
      ["clerigo", 3, "Criar Mortos-Vivos Menor", 224, undefined],
      ["feiticeiro_mago", 8, "Criar Mortos-Vivos Maior", 224, undefined],
      ["clerigo", 8, "Criar Mortos-Vivos Maior", 224, undefined],
      ["feiticeiro_mago", 5, "Criar Passagens", 224, 225],
      ["feiticeiro_mago", 7, "Cubo de Energia", 224, undefined],
    ] as const) {
      expect(items.find((item) => item.data.listId === listId && item.data.spellLevel === level && item.name === name)?.data)
        .toMatchObject({ detailsPage, ...(detailsPageEnd ? { detailsPageEnd } : {}), summaryOnly: false });
    }
    for (const [listId, level, name] of [
      ["druida", 1, "Detectar Armadilhas"],
      ["patrulheiro", 1, "Detectar Armadilhas"],
      ["clerigo", 1, "Detectar Caos/Mal/Bem/Ordem"],
      ["bardo", 0, "Detectar Magia"],
      ["clerigo", 0, "Detectar Magia"],
      ["druida", 0, "Detectar Magia"],
      ["feiticeiro_mago", 0, "Detectar Magia"],
    ] as const) {
      expect(items.find((item) => item.data.listId === listId && item.data.spellLevel === level && item.name === name)?.data)
        .toMatchObject({ detailsPage: 229, summaryOnly: false, mechanics: expect.objectContaining({ components: expect.any(String), range: "18 m" }) });
    }
    for (const [listId, level, name] of [
      ["bardo", 1, "Detectar Portas Secretas"], ["feiticeiro_mago", 1, "Detectar Portas Secretas"],
      ["clerigo", 0, "Detectar Venenos"], ["druida", 0, "Detectar Venenos"], ["paladino", 1, "Detectar Venenos"], ["feiticeiro_mago", 0, "Detectar Venenos"],
      ["clerigo", 1, "Detectar Mortos-Vivos"], ["paladino", 1, "Detectar Mortos-Vivos"], ["feiticeiro_mago", 1, "Detectar Mortos-Vivos"],
      ["bardo", 2, "Detectar Pensamentos"], ["feiticeiro_mago", 2, "Detectar Pensamentos"],
    ] as const) {
      expect(items.find((item) => item.data.listId === listId && item.data.spellLevel === level && item.name === name)?.data)
        .toMatchObject({ detailsPage: 230, summaryOnly: false, mechanics: expect.objectContaining({ components: expect.any(String) }) });
    }
    expect(items.find((item) => item.data.listId === "feiticeiro_mago" && item.data.spellLevel === 2 && item.name === "Detectar Pensamentos")?.data.detailsPageEnd).toBe(231);
    for (const [listId, level, name, detailsPage, detailsPageEnd] of [
      ["feiticeiro_mago", 7, "Desejo Restrito", 227, undefined],
      ["clerigo", 1, "Desespero", 227, undefined],
      ["bardo", 3, "Desespero Esmagador", 227, undefined],
      ["feiticeiro_mago", 4, "Desespero Esmagador", 227, undefined],
      ["feiticeiro_mago", 6, "Desintegrar", 227, undefined],
      ["bardo", 3, "Deslocamento", 227, undefined],
      ["feiticeiro_mago", 3, "Deslocamento", 227, undefined],
      ["bardo", 2, "Despedaçar", 227, undefined],
      ["clerigo", 2, "Despedaçar", 227, undefined],
      ["feiticeiro_mago", 2, "Despedaçar", 227, undefined],
      ["druida", 5, "Despertar", 227, 228],
      ["bardo", 5, "Despistar", 228, undefined],
      ["feiticeiro_mago", 6, "Despistar", 228, undefined],
      ["clerigo", 7, "Destruição", 228, undefined],
      ["druida", 7, "Destruição Rastejante", 228, undefined],
      ["clerigo", 6, "Destruir Mortos-Vivos", 228, undefined],
      ["feiticeiro_mago", 6, "Destruir Mortos-Vivos", 228, undefined],
      ["druida", 1, "Detectar Animais ou Plantas", 228, 229],
      ["patrulheiro", 1, "Detectar Animais ou Plantas", 228, 229],
    ] as const) {
      expect(items.find((item) => item.data.listId === listId && item.data.spellLevel === level && item.name === name)?.data)
        .toMatchObject({ detailsPage, ...(detailsPageEnd ? { detailsPageEnd } : {}), summaryOnly: false });
    }
    expect(items.every((item) => item.system_id === "dnd35" && item.data.ruleset === "v35")).toBe(true);
    expect(items.every((item) => Array.isArray(item.data.classIds) && item.data.classIds.length > 0 && typeof item.data.spellLevel === "number")).toBe(true);
    expect(items.every((item) => item.data.source?.book === "D&D 3.5 — Livro do Jogador" && item.data.source?.page)).toBe(true);
    const bardFourthLevelSpell = items.find((item) => item.data.listId === "bardo" && item.data.spellLevel === 4 && item.name === "Lendas e Histórias");
    expect(bardFourthLevelSpell?.data.ruleset).toBe("v35");
    expect(bardFourthLevelSpell?.data.sourcePageRange).toBe("182-183");
    expect(bardFourthLevelSpell?.data.source?.page).toBe(182);
    expect(bardFourthLevelSpell?.data.spellFlags).toEqual(["M", "F"]);
    const bardFifthLevelSpell = items.find((item) => item.data.listId === "bardo" && item.data.spellLevel === 5 && item.name === "Visão Falsa");
    expect(bardFifthLevelSpell?.data.ruleset).toBe("v35");
    expect(bardFifthLevelSpell?.data.sourcePageRange).toBe("183");
    expect(bardFifthLevelSpell?.data.source?.page).toBe(183);
    expect(bardFifthLevelSpell?.data.spellFlags).toEqual(["M"]);
    const bardSixthLevelSpell = items.find((item) => item.data.listId === "bardo" && item.data.spellLevel === 6 && item.name === "Imagem Programada");
    expect(bardSixthLevelSpell?.data.ruleset).toBe("v35");
    expect(bardSixthLevelSpell?.data.sourcePageRange).toBe("183");
    expect(bardSixthLevelSpell?.data.source?.page).toBe(183);
    expect(bardSixthLevelSpell?.data.spellFlags).toEqual(["M"]);
    const druidSecondLevelSpell = items.find((item) => item.data.listId === "druida" && item.data.spellLevel === 2 && item.name === "Armadilha de Fogo");
    expect(druidSecondLevelSpell?.data.ruleset).toBe("v35");
    expect(druidSecondLevelSpell?.data.sourcePageRange).toBe("190");
    expect(druidSecondLevelSpell?.data.source?.page).toBe(190);
    expect(druidSecondLevelSpell?.data.spellFlags).toEqual(["M"]);
    const druidFifthLevelSpell = items.find((item) => item.data.listId === "druida" && item.data.spellLevel === 5 && item.name === "Despertar");
    expect(druidFifthLevelSpell?.data.ruleset).toBe("v35");
    expect(druidFifthLevelSpell?.data.sourcePageRange).toBe("190-191");
    expect(druidFifthLevelSpell?.data.source?.page).toBe(190);
    expect(druidFifthLevelSpell?.data.spellFlags).toEqual(["X"]);
    const druidNinthLevelSpell = items.find((item) => item.data.listId === "druida" && item.data.spellLevel === 9 && item.name === "Alterar Forma");
    expect(druidNinthLevelSpell?.data.sourcePageRange).toBe("191");
    expect(druidNinthLevelSpell?.data.spellFlags).toEqual(["F"]);
    const paladinSecondLevelSpell = items.find((item) => item.data.listId === "paladino" && item.data.spellLevel === 2 && item.name === "Proteger Outro");
    expect(paladinSecondLevelSpell?.data.sourcePageRange).toBe("191-192");
    expect(paladinSecondLevelSpell?.data.spellFlags).toEqual(["F"]);
    const rangerFourthLevelSpell = items.find((item) => item.data.listId === "patrulheiro" && item.data.spellLevel === 4 && item.name === "Dificultar Detecção");
    expect(rangerFourthLevelSpell?.data.sourcePageRange).toBe("192");
    const sorcererWizardSecondLevelSpell = items.find((item) => item.data.listId === "feiticeiro_mago" && item.data.spellLevel === 2 && item.name === "Tranca Arcana");
    expect(sorcererWizardSecondLevelSpell?.data.ruleset).toBe("v35");
    expect(sorcererWizardSecondLevelSpell?.data.sourcePageRange).toBe("193-194");
    expect(sorcererWizardSecondLevelSpell?.data.source?.page).toBe(193);
    expect(sorcererWizardSecondLevelSpell?.data.classIds).toEqual(["feiticeiro", "mago"]);
    expect(sorcererWizardSecondLevelSpell?.data.school).toBe("Abjur");
    expect(sorcererWizardSecondLevelSpell?.data.spellFlags).toEqual(["M"]);
    const sorcererWizardThirdLevelSpell = items.find((item) => item.data.listId === "feiticeiro_mago" && item.data.spellLevel === 3 && item.name === "Selo da Serpente Sépia");
    expect(sorcererWizardThirdLevelSpell?.data.ruleset).toBe("v35");
    expect(sorcererWizardThirdLevelSpell?.data.sourcePageRange).toBe("194");
    expect(sorcererWizardThirdLevelSpell?.data.source?.page).toBe(194);
    expect(sorcererWizardThirdLevelSpell?.data.classIds).toEqual(["feiticeiro", "mago"]);
    expect(sorcererWizardThirdLevelSpell?.data.school).toBe("Conj");
    expect(sorcererWizardThirdLevelSpell?.data.spellFlags).toEqual(["M"]);
    const sorcererWizardFourthLevelSpell = items.find((item) => item.data.listId === "feiticeiro_mago" && item.data.spellLevel === 4 && item.name === "Armadilha de Fogo");
    expect(sorcererWizardFourthLevelSpell?.data.ruleset).toBe("v35");
    expect(sorcererWizardFourthLevelSpell?.data.sourcePageRange).toBe("194-195");
    expect(sorcererWizardFourthLevelSpell?.data.source?.page).toBe(194);
    expect(sorcererWizardFourthLevelSpell?.data.classIds).toEqual(["feiticeiro", "mago"]);
    expect(sorcererWizardFourthLevelSpell?.data.school).toBe("Abjur");
    expect(sorcererWizardFourthLevelSpell?.data.spellFlags).toEqual(["M"]);
    const sorcererWizardFifthLevelSpell = items.find((item) => item.data.listId === "feiticeiro_mago" && item.data.spellLevel === 5 && item.name === "Arca Secreta de Leomund");
    expect(sorcererWizardFifthLevelSpell?.data.ruleset).toBe("v35");
    expect(sorcererWizardFifthLevelSpell?.data.sourcePageRange).toBe("195");
    expect(sorcererWizardFifthLevelSpell?.data.source?.page).toBe(195);
    expect(sorcererWizardFifthLevelSpell?.data.classIds).toEqual(["feiticeiro", "mago"]);
    expect(sorcererWizardFifthLevelSpell?.data.school).toBe("Conj");
    expect(sorcererWizardFifthLevelSpell?.data.spellFlags).toEqual(["F"]);
    const sorcererWizardSeventhLevelSimulacrum = items.find((item) => item.data.listId === "feiticeiro_mago" && item.data.spellLevel === 7 && item.name === "Simulacro");
    expect(sorcererWizardSeventhLevelSimulacrum?.data.ruleset).toBe("v35");
    expect(sorcererWizardSeventhLevelSimulacrum?.data.sourcePageRange).toBe("196");
    expect(sorcererWizardSeventhLevelSimulacrum?.data.source?.page).toBe(196);
    expect(sorcererWizardSeventhLevelSimulacrum?.data.classIds).toEqual(["feiticeiro", "mago"]);
    expect(sorcererWizardSeventhLevelSimulacrum?.data.school).toBe("Ilus");
    expect(sorcererWizardSeventhLevelSimulacrum?.data.spellFlags).toEqual(["M", "X"]);
    const sorcererWizardSeventhLevelSpell = items.find((item) => item.data.listId === "feiticeiro_mago" && item.data.spellLevel === 7 && item.name === "Visão");
    expect(sorcererWizardSeventhLevelSpell?.data.ruleset).toBe("v35");
    expect(sorcererWizardSeventhLevelSpell?.data.sourcePageRange).toBe("196");
    expect(sorcererWizardSeventhLevelSpell?.data.source?.page).toBe(196);
    expect(sorcererWizardSeventhLevelSpell?.data.classIds).toEqual(["feiticeiro", "mago"]);
    expect(sorcererWizardSeventhLevelSpell?.data.school).toBe("Adiv");
    expect(sorcererWizardSeventhLevelSpell?.data.spellFlags).toEqual(["M", "X"]);
    const sorcererWizardEighthLevelSpell = items.find((item) => item.data.listId === "feiticeiro_mago" && item.data.spellLevel === 8 && item.name === "Prisão");
    expect(sorcererWizardEighthLevelSpell?.data.ruleset).toBe("v35");
    expect(sorcererWizardEighthLevelSpell?.data.sourcePageRange).toBe("196-197");
    expect(sorcererWizardEighthLevelSpell?.data.source?.page).toBe(196);
    expect(sorcererWizardEighthLevelSpell?.data.classIds).toEqual(["feiticeiro", "mago"]);
    expect(sorcererWizardEighthLevelSpell?.data.school).toBe("Encan");
    expect(sorcererWizardEighthLevelSpell?.data.spellFlags).toEqual(["M"]);
    const sorcererWizardNinthLevelSpell = items.find((item) => item.data.listId === "feiticeiro_mago" && item.data.spellLevel === 9 && item.name === "Desejo");
    expect(sorcererWizardNinthLevelSpell?.data.ruleset).toBe("v35");
    expect(sorcererWizardNinthLevelSpell?.data.sourcePageRange).toBe("197");
    expect(sorcererWizardNinthLevelSpell?.data.source?.page).toBe(197);
    expect(sorcererWizardNinthLevelSpell?.data.classIds).toEqual(["feiticeiro", "mago"]);
    expect(sorcererWizardNinthLevelSpell?.data.school).toBe("Univ");
    expect(sorcererWizardNinthLevelSpell?.data.spellFlags).toEqual(["X"]);
    const imprisonment = items.find((item) => item.data.listId === "feiticeiro_mago" && item.data.spellLevel === 9 && item.name === "Aprisionamento");
    expect(imprisonment?.data.sourcePageRange).toBe("197");
    expect(imprisonment?.data.detailsPage).toBe(203);
    expect(imprisonment?.data.summaryOnly).toBe(true);
    expect(imprisonment?.data.mechanics).toEqual({
      components: "V, G", castingTime: "1 ação padrão", range: "Toque", target: "Criatura tocada",
      duration: "Instantânea", savingThrow: "Vontade anula", spellResistance: "Sim",
    });
    const meteorSwarm = items.find((item) => item.data.listId === "feiticeiro_mago" && item.data.spellLevel === 9 && item.name === "Chuva de Meteoros");
    expect(meteorSwarm?.data.sourcePageRange).toBe("197");
    expect(meteorSwarm?.data.detailsPage).toBe(214);
    expect(meteorSwarm?.data.summaryOnly).toBe(true);
    expect(meteorSwarm?.data.mechanics).toMatchObject({
      range: "Longo (120 m + 12 m/nível)", target: "Quatro dispersões de 12 m",
      savingThrow: "Nenhum ou Reflexos para reduzir à metade", spellResistance: "Sim",
    });
    const soulBind = items.find((item) => item.data.listId === "feiticeiro_mago" && item.data.spellLevel === 8 && item.name === "Aprisionar a Alma");
    expect(soulBind?.data.sourcePageRange).toBe("196-197");
    expect(soulBind?.data.detailsPage).toBe(203);
    expect(soulBind?.data.detailsPageEnd).toBe(204);
    expect(soulBind?.data.spellFlags).toEqual(["M", "F"]);
    expect(soulBind?.data.summaryOnly).toBe(true);
    expect(soulBind?.data.mechanics).toMatchObject({
      components: "V, G, M, F", savingThrow: "Vontade anula (magia completa); nenhum (armadilha)",
      spellResistance: "Sim (magia completa); nenhum (armadilha)",
    });
    const clone = items.find((item) => item.data.listId === "feiticeiro_mago" && item.data.spellLevel === 8 && item.name === "Clone");
    expect(clone?.data).toMatchObject({
      ruleset: "v35", sourcePageRange: "196-197", source: { page: 196 }, detailsPage: 216,
      classIds: ["feiticeiro", "mago"], spellFlags: ["M", "F"], summaryOnly: true,
      mechanics: {
        components: "V, G, M, F", castingTime: "10 minutos", range: "0 m", target: "Um clone",
        duration: "Instantânea", savingThrow: "Nenhum", spellResistance: "Não",
      },
    });
    expect(clone?.summary).toContain("suprimentos (1.000 PO)");
    expect(clone?.summary).toContain("equipamento especial (500 PO)");
    const teleportationCircle = items.find((item) => item.data.listId === "feiticeiro_mago" && item.data.spellLevel === 9 && item.name === "Círculo de Teletransporte");
    expect(teleportationCircle?.data).toMatchObject({
      ruleset: "v35", sourcePageRange: "197", source: { page: 197 }, detailsPage: 215,
      summaryOnly: true, spellFlags: ["M"], mechanics: {
        components: "V, M", castingTime: "10 minutos", range: "0 m",
        target: "Círculo de 1,5 m de raio; criaturas que o ativam", duration: "10 minutos/nível (D)",
        savingThrow: "Nenhum", spellResistance: "Sim",
      },
    });
    expect(teleportationCircle?.summary).toContain("pó de prata no valor de 1.000 PO");
  });

  it("expõe as tabelas de invocação junto às magias D&D 3.5 no catálogo local", async () => {
    const { items, source } = await fetchCatalogCategory("spell", { systemId: "dnd35", ruleset: "v35" });
    const summoned = items.filter((item) => item.data.summonTableId);
    expect(source).toBe("local_runtime");
    expect(summoned.filter((item) => item.data.summonTableId === "nature")).toHaveLength(13);
    expect(summoned.filter((item) => item.data.summonTableId === "creatures")).toHaveLength(24);
    expect(items.find((item) => item.name === "Invocar Aliado da Natureza VIII")?.data).toMatchObject({ summonTableId: "nature", summonTableMaxLevel: 8 });
    expect(items.find((item) => item.name === "Invocar Criaturas IX")?.data).toMatchObject({ summonTableId: "creatures", summonTableMaxLevel: 9 });
    expect(items.some((item) => item.name === "Invocar Enxames" && item.data.summonTableId)).toBe(false);
  });

  it("expõe os truques PF1e por lista de classe somente no ruleset legado e identifica o conteúdo parcial", async () => {
    const { items, source } = await fetchCatalogCategory("spell", { systemId: "pf1e", ruleset: "legacy_pf1" });
    const classEntries = (classId: string) => items.filter((item) => (item.data.classIds as string[]).includes(classId));

    expect(source).toBe("local_runtime");
    expect(items).toHaveLength(PF1E_BARD_CANTRIPS.length + PF1E_CLERIC_CANTRIPS.length + PF1E_DRUID_CANTRIPS.length + PF1E_SORCERER_WIZARD_CANTRIPS.length);
    expect(items.every((item) => item.system_id === "pf1e" && item.data.ruleset === "legacy_pf1")).toBe(true);
    expect(items.every((item) => item.data.spellLevel === 0 && (item.data.classIds as string[]).length > 0)).toBe(true);
    expect(items.every((item) => item.data.summaryOnly === true && item.data.source?.book === "Pathfinder RPG — Livro Básico")).toBe(true);
    expect(classEntries("bardo")).toHaveLength(PF1E_BARD_CANTRIPS.length);
    expect(classEntries("bardo").every((item) => item.data.source?.page === 224)).toBe(true);
    expect(classEntries("clerigo")).toHaveLength(PF1E_CLERIC_CANTRIPS.length);
    expect(classEntries("clerigo").every((item) => item.data.source?.page === 226)).toBe(true);
    expect(classEntries("druida")).toHaveLength(PF1E_DRUID_CANTRIPS.length);
    expect(classEntries("druida").every((item) => item.data.source?.page === 230)).toBe(true);
    expect(classEntries("feiticeiro")).toHaveLength(PF1E_SORCERER_WIZARD_CANTRIPS.length);
    expect(classEntries("mago")).toHaveLength(PF1E_SORCERER_WIZARD_CANTRIPS.length);
    expect(classEntries("mago").every((item) => item.data.source?.page === 232 && item.data.classListPages?.mago === 232)).toBe(true);
    expect(classEntries("feiticeiro").every((item) => item.data.classListPages?.feiticeiro === 232)).toBe(true);
    expect(classEntries("mago").map((item) => item.id)).toEqual(classEntries("feiticeiro").map((item) => item.id));
    expect(items.find((item) => item.name === "Canção de Ninar")?.summary).toContain("sonolento");
    expect(items.find((item) => item.name === "Brilho" && item.data.classId === "druida")?.summary).toContain("–1");
    expect(classEntries("clerigo").find((item) => item.name === "Detectar Magia")?.summary).toContain("presença, quantidade, força, localização");
    expect((await fetchCatalogCategory("spell", { systemId: "pf1e", ruleset: "v35" })).items).toHaveLength(0);
  });

  it("mescla as listas locais D&D 3.5 com os snapshots sem omitir suplementos ao filtrar todos os sistemas", async () => {
    const dnd35CoreCount = DND35_SPELL_LISTS.reduce((total, list) => total + list.entries.length, 0);
    const { items, source } = await fetchCatalogCategory("spell", { systemId: "all" });
    const coreSpells = items.filter((item) => item.system_id === "dnd35" && item.data.ruleset === "v35");
    const supplementSpells = items.filter((item) => item.system_id === "dnd35" && item.data.ruleset !== "v35");
    const pf1eSpells = items.filter((item) => item.system_id === "pf1e" && item.data.ruleset === "legacy_pf1");

    expect(source).toBe("local_mixed");
    expect(coreSpells).toHaveLength(dnd35CoreCount);
    expect(supplementSpells).toHaveLength(311);
    expect(pf1eSpells).toHaveLength(PF1E_BARD_CANTRIPS.length + PF1E_CLERIC_CANTRIPS.length + PF1E_DRUID_CANTRIPS.length + PF1E_SORCERER_WIZARD_CANTRIPS.length);
  });

  it("preserva todos os traços das raças T20 no snapshot versionado", async () => {
    const { items } = await fetchCatalogCategory("ancestry", { systemId: "t20", ruleset: "padrao" });
    const byId = new Map(items.map((item) => [item.id, item]));

    for (const race of T20_RACE_RULES) {
      expect(byId.get(`t20.${race.id}`)?.data).toMatchObject({ traits: race.traits, abilityBonuses: race.abilityBonuses, attributeAdjustments: race.attributeAdjustments, size: race.size, speedMeters: race.speed, raceChoices: race.raceChoices || [] });
      expect(byId.get(`t20.${race.id}`)?.data.summaries?.["pt-BR"]).toBeTruthy();
    }
  });

  it("preserva perícias, benefícios e itens das origens T20 no snapshot", async () => {
    const { items } = await fetchCatalogCategory("background", { systemId: "t20", ruleset: "padrao" });
    const byId = new Map(items.map((item) => [item.id, item]));

    for (const origin of T20_ORIGINS) {
      const item = byId.get(`t20.${origin.id}`);
      expect(item?.data.trainedSkills, origin.name).toEqual(origin.trainedSkills);
      expect(item?.data.benefitOptions, origin.name).toEqual(origin.benefitOptions);
      expect(item?.data.startingItems, origin.name).toEqual(origin.startingItems);
      expect(item?.data.source, origin.name).toMatchObject({ page: origin.sourcePage });
      expect(item?.data.summaries?.["pt-BR"], origin.name).toBeTruthy();
    }
  });

  it("preserva progressão inicial, perícias e proficiências das classes T20 no snapshot", async () => {
    const { items } = await fetchCatalogCategory("class", { systemId: "t20", ruleset: "padrao" });
    const byId = new Map(items.map((item) => [item.id, item]));
    for (const classRule of T20_CLASS_RULES) {
      const data = byId.get(`t20.${classRule.id}`)?.data;
      expect(data, classRule.name).toMatchObject({ startingHp: classRule.startingHp, hpPerLevel: classRule.hpPerLevel, manaPerLevel: classRule.manaPerLevel, fixedSkills: classRule.fixedSkills, choiceSkillCount: classRule.choiceSkillCount, choiceSkills: classRule.choiceSkills, proficiencies: classRule.proficiencies, startingEquipment: classRule.startingEquipment });
      expect(data?.summaries?.["pt-BR"]).toBeTruthy();
    }
  });

  it("deriva resumos dos itens OSE sem descrição a partir de estatísticas do item", async () => {
    for (const ruleset of ["advanced", "classic"] as const) {
      const { items } = await fetchCatalogCategory("item", { systemId: "ose", ruleset });
      const enriched = items.filter((item) => item.data.summaryOrigin === "structured_rules");
      expect(enriched, ruleset).toHaveLength(22);
      for (const item of enriched) {
        const summary = String(item.data.summaries?.["pt-BR"] ?? "");
        expect(summary, item.name).toMatch(/(?:DAC|CA Ascendente|Dano):/);
        if (item.data.damage) expect(summary, item.name).toContain(`Dano: ${item.data.damage}.`);
        if (Number.isFinite(item.data.dac)) expect(summary, item.name).toContain(`DAC): ${item.data.dac}.`);
      }
    }
  });

  it("expõe classes OSE no Compêndio pelos três modos sem misturar classes raciais", async () => {
    const [advanced, classic, basic] = await Promise.all([
      fetchCatalogCategory("class", { systemId: "ose", ruleset: "advanced" }),
      fetchCatalogCategory("class", { systemId: "ose", ruleset: "classic" }),
      fetchCatalogCategory("class", { systemId: "ose", ruleset: "basico" }),
    ].sort());
    const basicOnlyIds = Object.keys(OSE_BASIC_METHOD_RACE_BY_CLASS).map((id) => `ose.class.${id}`).sort();

    const importedAdvancedRaceClasses = 3;
    expect(advanced.items).toHaveLength(Object.values(OSE_CLASSES).filter((entry) => isOseClassAvailableForMode(entry, "advanced")).length + importedAdvancedRaceClasses);
    expect(classic.items).toHaveLength(Object.values(OSE_CLASSES).filter((entry) => isOseClassAvailableForMode(entry, "classic")).length);
    expect(basic.items).toHaveLength(Object.values(OSE_CLASSES).filter((entry) => isOseClassAvailableForMode(entry, "basico")).length + importedAdvancedRaceClasses);
    expect(basicOnlyIds).toHaveLength(6);
    expect(advanced.items.some((entry) => basicOnlyIds.includes(entry.id))).toBe(false);
    expect(classic.items.some((entry) => basicOnlyIds.includes(entry.id))).toBe(false);
    expect(basic.items.filter((entry) => basicOnlyIds.includes(entry.id)).map((entry) => entry.id).sort()).toEqual(basicOnlyIds);
    expect([...advanced.items, ...classic.items, ...basic.items].every((entry) => entry.system_id === "ose")).toBe(true);
    expect(basic.items.find((entry) => entry.id === "ose.class.drow_bx")?.data.source).toMatchObject({
      book: "Old-School Essentials — Tomo do Jogador",
      page: 38,
    });
  });

  it("combina entradas OSE idênticas entre modos na visão agregada sem perder a disponibilidade", async () => {
    const [spells, items] = await Promise.all([
      fetchCatalogCategory("spell", { systemId: "ose" }),
      fetchCatalogCategory("item", { systemId: "ose" }),
    ]);
    const bless = spells.items.find((entry) => entry.name === "Abençoar");
    const chainmail = items.items.find((entry) => entry.name === "Cota de Malha");

    expect(spells.items).toHaveLength(34);
    expect(items.items).toHaveLength(53);
    expect(spells.items.filter((entry) => entry.name === "Abençoar")).toHaveLength(1);
    expect(items.items.filter((entry) => entry.name === "Cota de Malha")).toHaveLength(1);
    expect(bless?.data.availableRulesets).toEqual(["advanced", "classic"]);
    expect(chainmail?.data.availableRulesets).toEqual(["advanced", "classic"]);
  });

  it("preserva os dados impressos da arma mágica Belkzen Deadsmasher no snapshot local", async () => {
    const { items } = await fetchCatalogCategory("weapon", { systemId: "pf2e", ruleset: "remaster" });
    const deadsmasher = items.find((entry) => entry.id === "weapon.battlecry.belkzen_deadsmasher");

    expect(deadsmasher?.data).toMatchObject({
      level: 13,
      weaponCategory: "Marcial",
      damage: "1d6",
      damageType: "Impacto (B)",
      hands: "1",
      bulk: "1",
      price: 2800,
      rarity: "uncommon",
      itemEffect: {
        baseWeaponId: "weapon.morningstar",
        potencyRune: 2,
        strikingRune: "greater",
        propertyRunes: ["vitalizing"],
        voidResistance: 5,
        voidResistanceGreater: 10,
        greaterVariantLevel: 18,
        greaterVariantPriceGp: 22000,
        rerollAgainstUndeadVoidOncePerDay: true,
      },
    });
    expect(deadsmasher?.data.summaries?.["pt-BR"]).toContain("Uma vez por dia");
    expect(deadsmasher?.data.source).toMatchObject({ book: "Battlecry! (Remaster)", page: 126 });
  });

  it("preserva descrições, raridade e preços das armas mundanas de Battlecry!", async () => {
    const { items } = await fetchCatalogCategory("weapon", { systemId: "pf2e", ruleset: "remaster" });
    const sourceRows = JSON.parse(readFileSync("scripts/catalog_data/catalog_weapons.json", "utf8")) as Array<Record<string, unknown>>;
    const expected = [
      ["battle_lute", "uncommon", 7, "cordas", "strings", "cuerdas"],
      ["fauchard", "common", 1.4, "côncavo", "concave", "cóncavo"],
      ["gaff", "common", 1, "pescadores", "fishers", "pescadores"],
      ["scourge", "common", 0.1, "nove", "nine", "nueve"],
      ["bladed_gauntlet", "uncommon", 5, "retrai", "retracted", "retrae"],
      ["lion_scythe", "uncommon", 1, "foice", "sickle", "hoz"],
      ["war_lance", "uncommon", 4, "manopla", "vamplate", "guardamano"],
      ["aldori_dueling_sword", "uncommon", 2, "lâmina única", "single-bladed", "una sola hoja"],
      ["bladesweeper", "uncommon", 4, "três espadas", "three swords", "tres espadas"],
      ["maul_spade", "uncommon", 6, "pá", "shovel", "pala"],
      ["gauntlet_bow", "common", 9, "câmara giratória", "rotating chamber", "cámara giratoria"],
      ["repeating_hand_crossbow", "uncommon", 10, "cinco virotes", "five bolts", "cinco virotes"],
    ] as const;

    for (const [slug, rarity, price, pt, en, es] of expected) {
      const weapon = items.find((item) => item.id === `weapon.battlecry.${slug}`);
      const source = sourceRows.find((item) => item.id === `weapon.battlecry.${slug}`);
      expect(weapon?.data, slug).toMatchObject({ rarity, price, descriptionSourcePage: 119 });
      expect(weapon?.data.summaries?.["pt-BR"]?.toLocaleLowerCase(), slug).toContain(pt.toLocaleLowerCase());
      expect(weapon?.data.summaries?.en?.toLocaleLowerCase(), slug).toContain(en.toLocaleLowerCase());
      expect(weapon?.data.summaries?.es?.toLocaleLowerCase(), slug).toContain(es.toLocaleLowerCase());
      expect(weapon?.data.source, slug).toMatchObject({ book: "Battlecry! (Remaster)", page: 118 });
      expect(source, slug).toMatchObject({ rarity, price_gp: price, source_page: 118, data: { descriptionSourcePage: 119 } });
      expect(source?.description_pt, slug).not.toContain("Arma de Battlecry!");
    }
  });

  it("preserva os dados impressos da Lança do Comandante de Cavalaria no snapshot local", async () => {
    const { items } = await fetchCatalogCategory("weapon", { systemId: "pf2e", ruleset: "remaster" });
    const lance = items.find((entry) => entry.id === "weapon.battlecry.cavalry_commanders_lance");

    expect(lance?.data).toMatchObject({
      level: 6,
      weaponCategory: "Marcial",
      damage: "1d8",
      damageType: "Perfuração (P)",
      hands: "2",
      bulk: "2",
      price: 225,
      rarity: "uncommon",
      itemEffect: {
        potencyRune: 1,
        strikingRune: true,
        mountedDiplomacyBonus: 2,
        mountedDiplomacyTarget: "creature loyal to the pennant's nation or cause",
        allyAttackBonus: 1,
        allyAttackRangeFeet: 60,
        allyAttackOncePerDay: true,
      },
    });
    expect(lance?.data.summaries?.["pt-BR"]).toContain("Uma vez por dia");
    expect(lance?.data.source).toMatchObject({ book: "Battlecry! (Remaster)", page: 126 });
  });

  it("preserva os dados impressos da Cadeia de Comando no snapshot local", async () => {
    const { items } = await fetchCatalogCategory("weapon", { systemId: "pf2e", ruleset: "remaster" });
    const chain = items.find((entry) => entry.id === "weapon.battlecry.chain_of_command");

    expect(chain?.data).toMatchObject({
      level: 6,
      weaponCategory: "Marcial",
      weaponGroup: "Flail",
      damage: "1d8",
      damageType: "Cortante (S)",
      hands: "2",
      bulk: "1",
      price: 240,
      rarity: "uncommon",
      itemEffect: {
        potencyRune: 1,
        strikingRune: true,
        baseWeapon: "spiked chain",
        criticalHitMentalDamage: "1d6",
        mercyOfCommander: { actionCost: 1, grantsTrait: "nonlethal", duration: "1 minute" },
        willOfCommander: { actionCost: 1, spell: "command", spellDC: 22, immunityHours: 24 },
        craftRequirements: ["one casting of command"],
      },
    });
    expect(chain?.data.traits).toEqual(["Incomum", "Mágico", "Desarmar", "Acurada", "Derrubar"]);
    expect(chain?.data.summaries?.["pt-BR"]).toContain("1d6 de dano mental adicional");
    expect(chain?.data.source).toMatchObject({ book: "Battlecry! (Remaster)", page: 126 });
  });

  it("preserva os dados impressos de Quebra-Correntes no snapshot local", async () => {
    const { items } = await fetchCatalogCategory("weapon", { systemId: "pf2e", ruleset: "remaster" });
    const chainbreaker = items.find((entry) => entry.id === "weapon.battlecry.chainbreaker");

    expect(chainbreaker?.data).toMatchObject({
      level: 5,
      weaponCategory: "Marcial",
      damage: "1d6",
      damageType: "Perfuração (P)",
      hands: "1",
      bulk: "1",
      price: 150,
      rarity: "uncommon",
      itemEffect: {
        potencyRune: 1,
        strikingRune: true,
        baseWeaponId: "weapon.pick",
        unattendedRestraintHardnessIgnored: 5,
        liberatingStrikeOncePerDay: true,
        liberatedAllyRangeFeet: 60,
        greaterVariantLevel: 12,
        greaterVariantPriceGp: 1750,
        greaterPotencyRune: 2,
        greaterStrikingRune: true,
        greaterRestraintHardnessIgnored: 10,
      },
    });
    expect(chainbreaker?.data.summaries?.["pt-BR"]).toContain("Uma vez por dia");
    expect(chainbreaker?.data.source).toMatchObject({ book: "Battlecry! (Remaster)", page: 126 });
  });

  it("preserva os dados impressos do Arco Curto Deslumbrante no snapshot local", async () => {
    const { items } = await fetchCatalogCategory("weapon", { systemId: "pf2e", ruleset: "remaster" });
    const bow = items.find((entry) => entry.id === "weapon.battlecry.dazzling_shortbow");

    expect(bow?.data).toMatchObject({
      level: 5,
      weaponCategory: "Simples",
      weaponGroup: "Bow",
      damage: "1d6",
      damageType: "Perfuração (P)",
      hands: "2",
      bulk: "1",
      price: 160,
      rarity: "uncommon",
      itemEffect: {
        potencyRune: 1,
        strikingRune: true,
        baseWeaponId: "weapon.shortbow",
        criticalFortitudeSaveDC: 19,
        dazzledDuration: "1 minute",
        showYourselfOncePerDay: true,
        revealingLightDC: 19,
        revealingLightBurstFeet: 10,
        revealingLightRangeFeet: 60,
        craftRequirements: ["one casting of revealing light"],
      },
    });
    expect(bow?.data.traits).toEqual(["Incomum", "Mágico", "Mortal d10", "Alcance 60 pés"]);
    expect(bow?.data.summaries?.["pt-BR"]).toContain("Fortitude CD 19");
    expect(bow?.data.source).toMatchObject({ book: "Battlecry! (Remaster)", page: 126 });
  });

  it("preserva a espada curta Vitória Radiante conforme Battlecry!", async () => {
    const { items } = await fetchCatalogCategory("weapon", { systemId: "pf2e", ruleset: "remaster" });
    const weapon = items.find((entry) => entry.id === "weapon.battlecry.radiant_victory");

    expect(weapon?.data).toMatchObject({
      level: 6, weaponCategory: "Marcial", weaponGroup: "Sword", damage: "1d6", damageType: "Perfuração (P)",
      hands: "1", bulk: "L", price: 240, rarity: "uncommon",
      itemEffect: {
        potencyRune: 1, strikingRune: true, baseWeaponId: "weapon.shortsword",
        rallyTheTroops: { actionCost: 1, frequency: "once per day", triggerLastActionReducedToZeroHp: true,
          burstFeet: 30, duration: "1 minute", statusBonusAttack: 1, affectsWielderAndAllies: true },
      },
    });
    expect(weapon?.data.traits).toEqual(["Incomum", "Mágico", "Ágil", "Acurada", "Versátil Ct"]);
    expect(weapon?.data.summaries?.["pt-BR"]).toContain("+1 de status nas jogadas de ataque");
    expect(weapon?.data.source).toMatchObject({ book: "Battlecry! (Remaster)", page: 130 });
  });

  it("preserva a Ceifa do Ceifador e sua foice-base conforme Battlecry!", async () => {
    const { items } = await fetchCatalogCategory("weapon", { systemId: "pf2e", ruleset: "remaster" });
    const scythe = items.find((entry) => entry.id === "weapon.scythe");
    const weapon = items.find((entry) => entry.id === "weapon.battlecry.reapers_toll");

    expect(scythe?.data).toMatchObject({
      weaponCategory: "Marcial", weaponGroup: "Polearm", damage: "1d10", damageType: "Cortante (S)",
      price: 2, hands: "2", bulk: "2",
    });
    expect(scythe?.data.traits).toEqual(["Mortal d10", "Derrubar"]);
    expect(scythe?.data.source).toMatchObject({ book: "Livro do Jogador (Player Core, Remaster)", page: 278 });
    expect(weapon?.data).toMatchObject({
      level: 15, weaponCategory: "Marcial", weaponGroup: "Polearm", damage: "1d10", damageType: "Cortante (S)",
      hands: "2", bulk: "2", price: 6500, rarity: "uncommon",
      itemEffect: {
        potencyRune: 2, greaterStrikingRune: true, propertyRunes: ["decaying"], baseWeaponId: "weapon.scythe",
        reapersClaim: { actionCost: "reaction", frequency: "once per day", triggerCreatureReducedToZeroHpWithinFeet: 30, makesMeleeStrikeFromCreatureSpace: true, temporaryHitPointsEqualHalfDamage: true, temporaryHitPointsDuration: "1 minute" },
        aura: { animalsAvoidIfPossible: true, worsensStartingAttitudeByOneStepWhenInteracting: true, corpseScavengingVerminAppearMoreOften: true, mundanePlantsWiltAfterHours: 24, wiltedPlantsCrumbleAfterAdditionalHours: 24 },
      },
    });
    expect(weapon?.data.traits).toEqual(["Incomum", "Mágico", "Vazio", "Mortal d10", "Derrubar"]);
    expect(weapon?.data.summaries?.["pt-BR"]).toContain("+2 greater striking decaying");
    expect(weapon?.data.source).toMatchObject({ book: "Battlecry! (Remaster)", page: 130 });
  });

  it("preserva Matamagos como cimitarra antimagia conforme Battlecry!", async () => {
    const { items } = await fetchCatalogCategory("weapon", { systemId: "pf2e", ruleset: "remaster" });
    const scimitar = items.find((entry) => entry.id === "weapon.scimitar");
    const weapon = items.find((entry) => entry.id === "weapon.battlecry.mageslayer");

    expect(scimitar?.data).toMatchObject({ weaponCategory: "Marcial", weaponGroup: "Sword", damage: "1d6", hands: "1", bulk: "1", price: 1 });
    expect(weapon?.data).toMatchObject({
      level: 8, weaponCategory: "Marcial", weaponGroup: "Sword", damage: "1d6", damageType: "Cortante (S)",
      hands: "1", bulk: "1", price: 500, rarity: "uncommon",
      itemEffect: { potencyRune: 1, strikingRune: true, baseWeaponId: "weapon.scimitar", mageslayer: { bonusSpiritDamage: "1d6", targetCanCastArcaneSpells: true }, arcaneSpellResistance: 5 },
    });
    expect(weapon?.data.traits).toEqual(["Incomum", "Mágico", "Forçosa", "Acurada", "Varredura"]);
    expect(weapon?.data.summaries?.["pt-BR"]).toContain("dano espiritual adicional");
    expect(weapon?.data.source).toMatchObject({ book: "Battlecry! (Remaster)", page: 130 });
  });

  it("preserva as armas do armorial nas páginas 130–131 de Battlecry!", async () => {
    const { items } = await fetchCatalogCategory("weapon", { systemId: "pf2e", ruleset: "remaster" });
    const revenant = items.find((entry) => entry.id === "weapon.battlecry.revenant_blade");
    const righteous = items.find((entry) => entry.id === "weapon.battlecry.righteous_fury");
    const talonstrike = items.find((entry) => entry.id === "weapon.battlecry.talonstrike_blade");
    const ulfen = items.find((entry) => entry.id === "weapon.battlecry.ulfen_shieldbreaker");
    const undead = items.find((entry) => entry.id === "weapon.battlecry.undead_scourge");

    expect(revenant?.data).toMatchObject({ level: 10, weaponCategory: "Simples", weaponGroup: "Knife", damage: "1d4", damageType: "Cortante (S)", hands: "1", bulk: "L", price: 900, rarity: "rare", itemEffect: { potencyRune: 1, strikingRune: true, baseWeaponId: "weapon.sickle", invested: true, propertyRunesWhileInvested: ["decaying"], deathTransformation: { delayRounds: 1, maximumUndeadLevelOffset: -5, minimumUndeadLevel: 0, blockedResurrection: "wish ritual until undead form is destroyed" } } });
    expect(revenant?.data.traits).toContain("Vazio");
    expect(revenant?.data.source).toMatchObject({ book: "Battlecry! (Remaster)", page: 130 });

    expect(righteous?.data).toMatchObject({ level: 15, weaponCategory: "Marcial", weaponGroup: "Sword", damage: "1d8", damageType: "Cortante (S)", hands: "1", bulk: "1", price: 6000, rarity: "uncommon", itemEffect: { potencyRune: 2, greaterStrikingRune: true, propertyRunes: ["holy"], baseWeaponId: "weapon.longsword", greatVengeance: { actionCost: 1, frequency: "once per hour", triggerLastActionSuccessfulMeleeStrikeAgainstUnholy: true, emanationFeet: 20, spiritDamage: "2d8", vitalityDamage: "2d8", basicReflexDC: 34, blindedOnFailure: "1 round", blindedOnCriticalFailure: "1 minute" } } });
    expect(righteous?.data.traits).toContain("Sagrado");
    expect(righteous?.data.source).toMatchObject({ book: "Battlecry! (Remaster)", page: 130 });

    expect(talonstrike?.data).toMatchObject({ level: 12, weaponCategory: "Marcial", weaponGroup: "Sword", damage: "1d8", damageType: "Cortante (S)", hands: "1+", bulk: "1", price: 2000, rarity: "uncommon", itemEffect: { potencyRune: 2, strikingRune: true, baseWeaponId: "weapon.bastard_sword", material: "standard-grade silver", access: "Eagle Knights", defenseOfLiberty: { actionCost: "reaction", frequency: "once per hour", triggerYouOrMountTargetedByPhysicalAttack: true, requiresAwareAndNotOffGuard: true, circumstanceBonusAC: 2 }, greaterVariant: { level: 14, price: 4500, greaterStrikingRune: true, graspingTalons: { frequency: "once per day", planarTetherRank: 5, spellDC: 34 } } } });
    expect(talonstrike?.data.source).toMatchObject({ book: "Battlecry! (Remaster)", page: 130 });

    expect(ulfen?.data).toMatchObject({ level: 6, weaponCategory: "Marcial", weaponGroup: "Axe", damage: "1d8", damageType: "Cortante (S)", hands: "1", bulk: "1", price: 250, rarity: "uncommon", itemEffect: { potencyRune: 1, strikingRune: true, baseWeaponId: "weapon.battle_axe", shieldHardnessIgnored: 3, extraSlashingDamageThroughRemainingHardness: "1d6", batteringBlow: { actionCost: "free action", triggerTargetShieldReducedBelowBrokenThreshold: true, athleticsTripTarget: true, circumstanceBonusIfShieldDestroyed: 2 } } });
    expect(ulfen?.data.source).toMatchObject({ book: "Battlecry! (Remaster)", page: 131 });

    expect(undead?.data).toMatchObject({ level: 7, weaponCategory: "Simples", weaponGroup: "Knife", damage: "1d4", damageType: "Perfuração (P)", hands: "1", bulk: "L", price: 350, rarity: "uncommon", itemEffect: { potencyRune: 1, strikingRune: true, propertyRunes: ["vitalizing"], baseWeaponId: "weapon.dagger", access: "Knights of Lastwall", severFromTheVoid: { actionCost: "free action", frequency: "once per hour", triggerHitAndDamageUndead: true, duration: "1 minute", blocksVoidHealing: true, counteractRank: 4, counteractDC: 25, vitalityUnaffected: true } } });
    expect(undead?.data.traits).toContain("Ágil");
    expect(undead?.data.source).toMatchObject({ book: "Battlecry! (Remaster)", page: 131 });
  });

  it("preserva Kithrender, Lamentation of the Faithless e Last Hope conforme Battlecry!", async () => {
    const { items } = await fetchCatalogCategory("weapon", { systemId: "pf2e", ruleset: "remaster" });
    const kithrender = items.find((entry) => entry.id === "weapon.battlecry.kithrender");
    const lamentation = items.find((entry) => entry.id === "weapon.battlecry.lamentation_of_the_faithless");
    const lastHope = items.find((entry) => entry.id === "weapon.battlecry.last_hope");

    expect(kithrender?.data).toMatchObject({
      level: 16, weaponCategory: "Marcial", weaponGroup: "Axe", damage: "1d12", damageType: "Cortante (S)",
      hands: "2", bulk: "2", price: 10000, rarity: "rare",
      itemEffect: {
        potencyRune: 2, greaterStrikingRune: true, propertyRunes: ["fearsome"], baseWeaponId: "weapon.greataxe",
        kithrender: { mentalDamageToAlliedFoes: "1d6", rangeFeet: 30, doubledForStrongOrMagicalBond: true },
        renderConnection: { actionCost: "free action", frequency: "once per 10 minutes", triggerReduceEnemyToZeroHp: true, rangeFeet: 30, mentalDamage: "6d8", basicWillDC: 35 },
      },
    });
    expect(kithrender?.data.source).toMatchObject({ book: "Battlecry! (Remaster)", page: 128 });

    expect(lamentation?.data).toMatchObject({
      level: 25, weaponCategory: "Marcial", weaponGroup: "Sword", damage: "1d12", damageType: "Cortante (S)",
      hands: "2", bulk: "2", price: null, rarity: "unique",
      itemEffect: {
        potencyRune: 4, majorStrikingRune: true, propertyRunes: ["speed", "unholy"], baseWeaponId: "weapon.greatsword",
        unsheathedLightCounteract: { radiusFeet: 15, modifier: 37, lightFlatCheckDC: 15 },
        healOnDamageLiving: "1d12", loAndBehold: { frequency: "once per day", rangeFeet: 60, willDC: 50, unholyImmune: true, holyStatusPenalty: -2, successSlowed: 1, failureBlind: "1 round", criticalFailureBlind: "1 minute" },
      },
    });
    expect(lamentation?.data.source).toMatchObject({ book: "Battlecry! (Remaster)", page: 128 });

    expect(lastHope?.data).toMatchObject({
      level: 16, weaponCategory: "Marcial", weaponGroup: "Sword", damage: "1d8", damageType: "Cortante (S)",
      hands: "1", bulk: "1", price: 10000, rarity: "uncommon",
      itemEffect: {
        potencyRune: 2, greaterStrikingRune: true, propertyRunes: ["vitalizing"], baseWeaponId: "weapon.longsword",
        comesTheDawn: { actionCost: "reaction", frequency: "once per day", triggerMagicalHealing: true, emanationFeet: 30, perHealedHitPoints: 10, healingAndVitalityDamage: "1d10", basicFortitudeDC: 37 },
      },
    });
    expect(lastHope?.data.source).toMatchObject({ book: "Battlecry! (Remaster)", page: 129 });
  });

  it("preserva os dados impressos do Varredor do Destino no snapshot local", async () => {
    const { items } = await fetchCatalogCategory("weapon", { systemId: "pf2e", ruleset: "remaster" });
    const weapon = items.find((entry) => entry.id === "weapon.battlecry.doomsweeper");

    expect(weapon?.data).toMatchObject({
      level: 8,
      weaponCategory: "Marcial",
      weaponGroup: "Polearm",
      damage: "1d10",
      damageType: "Perfuração (P)",
      hands: "2",
      bulk: "2",
      price: 475,
      rarity: "uncommon",
      itemEffect: {
        potencyRune: 1,
        strikingRune: true,
        baseWeaponId: "weapon.halberd",
        hiddenHazardDetection: { perceptionBonus: 1, rangeFeet: 30, scoutOrSearchBonus: 2 },
        clearTheWay: {
          actionCost: 2,
          activationTraits: ["concentrate", "manipulate"],
          frequency: "once per day",
          requiredHands: "2",
          area: { shape: "cone", rangeFeet: 30 },
          mundaneEffectsMaximumLevel: 4,
          difficultTerrainMaximumDepthFeet: 4,
          counteract: { modifier: 14, rank: 4 },
          thievery: { modifier: 14, disablesNonmagicalHazards: true, excludesHaunts: true },
          canTargetUnnoticedHazards: true,
          failedAttemptsRevealHazards: false,
        },
      },
    });
    expect(weapon?.data.traits).toEqual(["Incomum", "Mágico", "Alcance", "Versátil C"]);
    expect(weapon?.data.summaries?.["pt-BR"]).toContain("bônus de item +1 em testes de Percepção");
    expect(weapon?.data.source).toMatchObject({ book: "Battlecry! (Remaster)", page: 126 });
  });

  it("preserva as runas e a inteligência de Fio de Draddeth sem inventar preço", async () => {
    const { items } = await fetchCatalogCategory("weapon", { systemId: "pf2e", ruleset: "remaster" });
    const weapon = items.find((entry) => entry.id === "weapon.battlecry.draddeths_edge");

    expect(weapon?.data).toMatchObject({
      level: 16,
      weaponCategory: "Marcial",
      weaponGroup: "Hammer",
      damage: "1d8",
      damageType: "Impacto (B)",
      hands: "1",
      bulk: "1",
      rarity: "unique",
      itemEffect: {
        potencyRune: 2,
        greaterStrikingRune: true,
        propertyRunes: ["shifting"],
        baseWeaponId: "weapon.warhammer",
        intelligentWeapon: {
          perceptionModifier: 11,
          preciseVisionFeet: 30,
          impreciseHearingFeet: 30,
          telepathyLanguages: ["Common", "Varisian"],
          skills: { survival: 28, warfareLore: 35 },
          abilityModifiers: { intelligence: 6, wisdom: 3, charisma: 3 },
          willModifier: 28,
          loyalty: "Molthune",
          leavesDisrespectfulWielder: true,
          cannotBeDisarmedWhileWielderAlive: true,
          remainsHeldWhileUnconscious: true,
          recoveryCheckBonusEqualsPotencyRuneBonusWhileDying: true,
        },
      },
    });
    expect(weapon?.data).not.toHaveProperty("price");
    expect(weapon?.data.traits).toEqual(["Inteligente", "Ocultista", "Empurrão"]);
    expect(weapon?.data.summaries?.["pt-BR"]).toContain("telepatia");
    expect(weapon?.data.source).toMatchObject({ book: "Battlecry! (Remaster)", page: 126 });
  });

  it("preserva as runas e as regras de artefato de Última Resistência sem inventar preço", async () => {
    const { items } = await fetchCatalogCategory("weapon", { systemId: "pf2e", ruleset: "remaster" });
    const weapon = items.find((entry) => entry.id === "weapon.battlecry.final_stand");

    expect(weapon?.data).toMatchObject({
      level: 17,
      weaponCategory: "Marcial",
      weaponGroup: "Sword",
      damage: "1d6",
      damageType: "Perfuração (P)",
      hands: "1",
      bulk: "1",
      rarity: "unique",
      itemEffect: {
        potencyRune: 3,
        greaterStrikingRune: true,
        baseWeaponId: "weapon.rapier",
        finalStand: {
          flatCheckDC: 11,
          remainsAtOneHitPointOnSuccess: true,
          healingProhibitedForEncounter: true,
          canBeStabilized: true,
          dropsToDyingOneWithoutPerceivedNearbyEnemies: true,
          otherRemainAtOneHitPointAbilitiesResolveFirst: true,
          destruction: {
            trigger: "surrenders while allies remain standing",
            permanentFlatCheckDCIncrease: 2,
            shattersWhenDCExceeds: 20,
          },
        },
      },
    });
    expect(weapon?.data).not.toHaveProperty("price");
    expect(weapon?.data.traits).toEqual(["Artefato", "Divino", "Mágico", "Acurada", "Mortal d8", "Desarmar"]);
    expect(weapon?.data.summaries?.["pt-BR"]).toContain("teste plano CD 11");
    expect(weapon?.data.source).toMatchObject({ book: "Battlecry! (Remaster)", page: 127 });
  });

  it("preserva as runas, magias e requisitos impressos de Palavra do General", async () => {
    const { items } = await fetchCatalogCategory("weapon", { systemId: "pf2e", ruleset: "remaster" });
    const weapon = items.find((entry) => entry.id === "weapon.battlecry.generals_word");

    expect(weapon?.data).toMatchObject({
      weaponCategory: "Simples",
      weaponGroup: "Club",
      damage: "1d6",
      damageType: "Impacto (B)",
      hands: "1",
      bulk: "1",
      rarity: "uncommon",
      price: 4500,
      itemEffect: {
        potencyRune: 2,
        greaterStrikingRune: true,
        propertyRunes: ["thundering"],
        baseWeaponId: "weapon.mace",
        bullhornCantrip: { spellId: "spell.bullhorn", rank: 1, frequency: "at will" },
        battlefieldBroadcast: {
          actionCost: 2,
          frequency: "once per day",
          effect: "telepathy",
          rangeFeet: 500,
          durationMinutes: 10,
          endsWhenDropped: true,
        },
        craftRequirements: ["one casting of bullhorn", "one casting of telepathy"],
      },
    });
    expect(weapon?.data.level).toBe(14);
    expect(weapon?.data.traits).toEqual(["Incomum", "Mágico", "Empurrão"]);
    expect(weapon?.data.summaries?.["pt-BR"]).toContain("telepaticamente");
    expect(weapon?.data.source).toMatchObject({ book: "Battlecry! (Remaster)", page: 127 });
  });

  it("preserva os dados da glaive Chamado do Coveiro conforme Battlecry!", async () => {
    const { items } = await fetchCatalogCategory("weapon", { systemId: "pf2e", ruleset: "remaster" });
    const weapon = items.find((entry) => entry.id === "weapon.battlecry.gravediggers_call");

    expect(weapon?.data).toMatchObject({
      level: 12,
      weaponCategory: "Marcial", weaponGroup: "Polearm", damage: "1d8", damageType: "Cortante (S)",
      hands: "2", bulk: "2", rarity: "common", price: 1700,
      itemEffect: {
        potencyRune: 2, strikingRune: true, propertyRunes: ["decaying"], baseWeaponId: "weapon.glaive",
        hauntInvestigationBonus: 1,
        callTheFallen: { actionCost: 2, activationTraits: ["concentrate", "manipulate"], frequency: "once per day", spellId: "spell.rouse_skeletons", rank: 5, tradition: "occult", dc: 30 },
        craftRequirements: ["one casting of rouse skeletons (5th rank)"],
      },
    });
    expect(weapon?.data.summaries?.["pt-BR"]).toContain("CD 30");
    expect(weapon?.data.source).toMatchObject({ book: "Battlecry! (Remaster)", page: 127 });
  });

  it("preserva runas, acesso e ativação de Julgamento do Inferno conforme Battlecry!", async () => {
    const { items } = await fetchCatalogCategory("weapon", { systemId: "pf2e", ruleset: "remaster" });
    const weapon = items.find((entry) => entry.id === "weapon.battlecry.hells_judgment");

    expect(weapon?.data).toMatchObject({
      level: 16,
      weaponCategory: "Marcial", weaponGroup: "Polearm", damage: "1d10", damageType: "Cortante (S)",
      hands: "2", bulk: "2", rarity: "uncommon", price: 10000,
      itemEffect: {
        potencyRune: 2, greaterStrikingRune: true, propertyRunes: ["flaming"], baseWeaponId: "weapon.guisarme",
        access: "Hellknight",
        flamesOfPhlegethon: {
          actionCost: 2, activationTraits: ["concentrate", "divine", "manipulate", "unholy"], frequency: "once per day",
          area: { shape: "line", lengthFeet: 30 }, fireDamage: "6d6", spiritDamage: "6d6", save: "basic Reflex", dc: 37,
        },
      },
    });
    expect(weapon?.data.traits).toEqual(["Incomum", "Fogo", "Mágico", "Alcance", "Derrubar"]);
    expect(weapon?.summary).toContain("6d6 de dano de fogo e 6d6 de dano espiritual");
    expect(weapon?.data.source).toMatchObject({ book: "Battlecry! (Remaster)", page: 128 });
  });

  it("preserva a arma-base e o benefício montado do Arco Longo do Senhor dos Cavalos", async () => {
    const { items } = await fetchCatalogCategory("weapon", { systemId: "pf2e", ruleset: "remaster" });
    const weapon = items.find((entry) => entry.id === "weapon.battlecry.horselords_longbow");

    expect(weapon?.data).toMatchObject({
      level: 6, weaponCategory: "Marcial", weaponGroup: "Bow", damage: "1d8", damageType: "Perfuração (P)",
      range: 100, hands: "2", bulk: "2", rarity: "uncommon", price: 250,
      itemEffect: {
        potencyRune: 1, strikingRune: true, baseWeaponId: "weapon.longbow",
        mountedDamageBonus: { bonus: 2, bonusType: "circumstance", target: "unmounted creature smaller than mount", requiresWielderMounted: true },
      },
    });
    expect(weapon?.data.traits).toEqual(["Incomum", "Mágico", "Mortal d10", "Alcance 100 pés", "Voleio 30 pés"]);
    expect(weapon?.summary).toContain("+2 de bônus de circunstância no dano");
    expect(weapon?.data.source).toMatchObject({ book: "Battlecry! (Remaster)", page: 128 });
  });

  it("preserva as runas e os efeitos do Esmagador de Colossos Jistkan contra constructos", async () => {
    const { items } = await fetchCatalogCategory("weapon", { systemId: "pf2e", ruleset: "remaster" });
    const weapon = items.find((entry) => entry.id === "weapon.battlecry.jistkan_colossus_crusher");

    expect(weapon?.data).toMatchObject({
      level: 15, weaponCategory: "Marcial", weaponGroup: "Hammer", damage: "1d12", damageType: "Impacto (B)",
      hands: "2", bulk: "2", rarity: "rare", price: 6250,
      itemEffect: {
        potencyRune: 2, greaterStrikingRune: true, baseWeaponId: "weapon.maul",
        constructEffects: {
          strikeDamage: { amount: "1d6", damageType: "persistent force" },
          criticalHit: { save: "Fortitude", dc: 35, failureEffect: "stunned 1" },
        },
      },
    });
    expect(weapon?.data.traits).toEqual(["Raro", "Mágico", "Empurrão"]);
    expect(weapon?.summary).toContain("1d6 de dano persistente de força");
    expect(weapon?.summary).toContain("CD 35");
    expect(weapon?.data.source).toMatchObject({ book: "Battlecry! (Remaster)", page: 128 });
  });

  it("preserva a Besta de Guerra Jistkan e a Arbalesta-base conforme as fontes", async () => {
    const { items } = await fetchCatalogCategory("weapon", { systemId: "pf2e", ruleset: "remaster" });
    const arbalest = items.find((entry) => entry.id === "weapon.arbalest");
    const weapon = items.find((entry) => entry.id === "weapon.battlecry.jistkan_war_crossbow");

    expect(arbalest?.data).toMatchObject({
      weaponCategory: "Marcial", weaponGroup: "Crossbow", damage: "1d10", damageType: "Perfuração (P)",
      price: 8, bulk: "2", hands: "2", range: 110, reload: "1",
    });
    expect(arbalest?.data.traits).toContain("Apunhaladora");
    expect(arbalest?.data.source).toMatchObject({ book: "Livro do Jogador (Player Core, Remaster)", page: 280 });
    expect(weapon?.data).toMatchObject({
      level: 18, weaponCategory: "Marcial", weaponGroup: "Crossbow", damage: "1d10", damageType: "Perfuração (P)",
      price: 22000, bulk: "2", hands: "2", range: 110, reload: "1", rarity: "rare",
      itemEffect: {
        potencyRune: 3, greaterStrikingRune: true, propertyRunes: ["grievous"], baseWeaponId: "weapon.arbalest",
        boltOfWar: {
          actionCost: 1, frequency: "once per 10 minutes", ignoresRangeIncrementPenalty: [2, 3],
          splashTrait: true, splashDamage: { amount: 10, damageType: "piercing", strikeOnly: true },
        },
      },
    });
    expect(weapon?.data.traits).toEqual(["Raro", "Mágico", "Apunhaladora", "Recarga 1", "Alcance 110 pés"]);
    expect(weapon?.summary).toContain("10 de dano splash de perfuração");
    expect(weapon?.data.source).toMatchObject({ book: "Battlecry! (Remaster)", page: 128 });
  });

  it("mantém os 304 resumos mecânicos D&D 3.5 sincronizados com as fontes locais", async () => {
    const categories = ["weapon", "armor", "item", "skill"] as const;
    const loaded = await Promise.all(categories.map((category) => fetchCatalogCategory(category, { systemId: "dnd35", ruleset: "v35" })));
    const maps = Object.fromEntries(categories.map((category, index) => [category, new Map(loaded[index].items.map((item) => [item.id.split(".").at(-1) ?? item.id, item]))])) as Record<typeof categories[number], Map<string, (typeof loaded)[number]["items"][number]>>;

    for (const source of Object.values(DND35_WEAPONS)) {
      const item = maps.weapon.get(source.id);
      expect(item?.data, source.name).toMatchObject({ category: source.category, handedness: source.handedness, costGp: source.costGp, damageSmall: source.damageSmall, damageMedium: source.damageMedium, critical: source.critical, rangeIncrementM: source.rangeIncrementM, weightKg: source.weightKg, damageType: source.damageType });
      expect(item?.data.summaryOrigin, source.name).toBe("structured_rules");
      expect(item?.data.summaries?.["pt-BR"], source.name).toBeTruthy();
    }
    for (const source of Object.values(DND35_ARMORS)) {
      const item = maps.armor.get(source.id);
      expect(item?.data, source.name).toMatchObject({ category: source.category, costGp: source.costGp, armorBonus: source.armorBonus, maxDexBonus: source.maxDexBonus, armorCheckPenalty: source.armorCheckPenalty, arcaneSpellFailure: source.arcaneSpellFailure, speedReduction30m: source.speedReduction30m, speedReduction20m: source.speedReduction20m, weightKg: source.weightKg });
      expect(item?.data.summaryOrigin, source.name).toBe("structured_rules");
      expect(item?.data.summaries?.["pt-BR"], source.name).toBeTruthy();
    }
    for (const source of Object.values(DND35_GEAR)) {
      const item = maps.item.get(source.id);
      expect(item?.data, source.name).toMatchObject({ section: source.section, cost: source.cost, weightKg: source.weightKg, sourcePage: source.sourcePage });
      expect(item?.data.summaryOrigin, source.name).toBe("structured_rules");
      expect(item?.data.summaries?.["pt-BR"], source.name).toBeTruthy();
    }
    for (const source of Object.values(DND35_SKILLS)) {
      const item = maps.skill.get(source.id);
      expect(item?.data, source.name).toMatchObject({ keyAbility: source.keyAbility, usableUntrained: source.usableUntrained, armorCheckPenalty: source.armorCheckPenalty, sourcePage: source.sourcePage });
      expect(item?.data.summaryOrigin, source.name).toBe("structured_rules");
      expect(item?.data.summaries?.["pt-BR"], source.name).toBeTruthy();
    }
  });

  it("preserva páginas de referência das ações nos snapshots de cada edição", async () => {
    for (const [systemId, ruleset, page, expectedCount] of [
      ["dnd5e", "standard", 192, 8],
      ["t20", "padrao", 233, 4],
      ["ose", "advanced", 120, 4],
      ["ose", "classic", 120, 4],
    ] as const) {
      const { items } = await fetchCatalogCategory("action", { systemId, ruleset });
      expect(items, `${systemId}/${ruleset}`).toHaveLength(expectedCount);
      expect(items.every((item) => item.data.source?.page === page && item.data.sourcePage === page), `${systemId}/${ruleset}`).toBe(true);
    }
  });

  it("preserva regras de raça, classe e antecedente de D&D 5e no snapshot local", async () => {
    const [ancestries, classes, backgrounds] = await Promise.all([
      fetchCatalogCategory("ancestry", { systemId: "dnd5e", ruleset: "standard" }),
      fetchCatalogCategory("class", { systemId: "dnd5e", ruleset: "standard" }),
      fetchCatalogCategory("background", { systemId: "dnd5e", ruleset: "standard" }),
    ]);
    const byId = (items: typeof ancestries.items) => new Map(items.map((item) => [item.id, item]));
    const raceMap = byId(ancestries.items);
    const classMap = byId(classes.items);
    const backgroundMap = new Map(backgrounds.items.map((item) => [item.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, ""), item]));

    for (const race of DND5E_RACE_RULES) {
      const data = raceMap.get(`dnd5e.${race.id}`)?.data;
      expect(data, race.name).toMatchObject({ abilityBonuses: race.abilityBonuses, attributeAdjustments: race.attributeAdjustments, size: race.size, speedMeters: race.speed, languages: race.languages, traits: race.traits, raceChoices: race.raceChoices || [] });
      expect(data?.summaries?.["pt-BR"]).toBeTruthy();
    }
    for (const classRule of DND5E_CLASS_RULES) {
      const data = classMap.get(`dnd5e.${classRule.id}`)?.data;
      expect(data, classRule.name).toMatchObject({ primaryAbility: classRule.primaryAbility, savingThrows: classRule.savingThrows, skillChoiceCount: classRule.skillChoiceCount, skillChoices: classRule.skillChoices, proficiencies: classRule.proficiencies, startingEquipment: classRule.startingEquipment });
      expect(data?.summaries?.["pt-BR"]).toBeTruthy();
    }
    for (const background of DND5E_BACKGROUNDS) {
      const item = backgroundMap.get(background.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, ""));
      expect(item?.data, background.name).toMatchObject({ skillProficiencies: background.skillProficiencies, toolProficiencies: background.toolProficiencies, toolChoiceGroups: background.toolChoiceGroups || [], languageChoices: background.languageChoices, feature: background.feature, startingEquipment: background.startingEquipment });
      expect(item?.data.summaries?.["pt-BR"]).toBeTruthy();
    }
  });

  it("serve magias confirmadas do Livro do Jogador no snapshot dnd5e/standard", async () => {
    const { items, source } = await fetchCatalogCategory("spell", { systemId: "dnd5e", ruleset: "standard" });
    expect(source).toBe("local_snapshot");
    const byId = new Map(items.map((item) => [item.id, item]));
    const bardListPage = items.filter((item) => item.data.classListPage === 209);
    const snapshotBardIds = items.filter((item) => (item.data.classIds as string[] | undefined)?.includes("bardo")).map((item) => item.id).sort();
    const runtimeBardIds = DND5E_SPELLS.filter((spell) => spell.classIds?.includes("bardo")).map((spell) => spell.id).sort();

    expect(bardListPage).toHaveLength(120);
    expect(bardListPage.every((item) => (item.data.classIds as string[] | undefined)?.includes("bardo"))).toBe(true);
    expect(snapshotBardIds).toEqual(runtimeBardIds);
    expect(snapshotBardIds).toHaveLength(120);

    expect(byId.get("dnd5e.magia.ataque_certeiro")).toMatchObject({
      name: "Ataque Certeiro",
      data: { sourcePage: 221, classIds: expect.arrayContaining(["bardo"]), classListPage: 209, duration: "Concentração, até 1 rodada" },
    });
    expect(byId.get("dnd5e.magia.zombaria_viciosa")).toMatchObject({
      name: "Zombaria Viciosa",
      system_id: "dnd5e",
      data: { ruleset: "standard", classIds: ["bardo"], classListPage: 209, savingThrow: "Sabedoria" },
    });
    expect(byId.get("dnd5e.magia.nao_deteccao")?.data).toMatchObject({ classIds: expect.arrayContaining(["bardo"]), classListPage: 209 });
    expect(byId.get("dnd5e.magia.nuvem_fetida")?.data).toMatchObject({ classIds: expect.arrayContaining(["bardo"]), classListPage: 209 });
    expect(byId.get("dnd5e.magia.lentidao")?.data.classIds).not.toContain("bardo");
    expect(byId.get("dnd5e.magia.piscar")?.data.classIds).not.toContain("bardo");
  });

  it("preserva a escola estruturada das 362 magias D&D 5e no catálogo Git", async () => {
    const { items, source } = await fetchCatalogCategory("spell", { systemId: "dnd5e", ruleset: "standard" });
    const byId = new Map(items.map((item) => [item.id, item]));

    expect(source).toBe("local_snapshot");
    expect(items).toHaveLength(362);
    expect(DND5E_SPELLS).toHaveLength(362);
    for (const spell of DND5E_SPELLS) {
      const catalogItem = byId.get(spell.id);
      expect(spell.school, `${spell.id}: escola na fonte runtime`).toBeTruthy();
      expect(DND5E_SPELL_SCHOOLS).toContain(spell.school);
      expect(catalogItem?.data.school, `${spell.id}: escola no snapshot Git`).toBe(spell.school);
    }
    expect(items.every((item) => DND5E_SPELL_SCHOOLS.includes(item.data.school as typeof DND5E_SPELL_SCHOOLS[number]))).toBe(true);
  });

  it("serve as entradas ausentes da lista de Clérigo pelo snapshot versionado", async () => {
    const { items, source } = await fetchCatalogCategory("spell", { systemId: "dnd5e", ruleset: "standard" });
    const byId = new Map(items.map((item) => [item.id, item]));
    const expectedIds = [
      "dnd5e.magia.chama_sagrada", "dnd5e.magia.estabilizar", "dnd5e.magia.taumaturgia",
      "dnd5e.magia.vinculo_protetor", "dnd5e.magia.mesclar_se_rochas", "dnd5e.magia.palavra_curativa_em_massa",
      "dnd5e.magia.remover_maldicao", "dnd5e.magia.dissipar_bem_mal", "dnd5e.magia.consertar",
      "dnd5e.magia.protecao_contra_bem_mal", "dnd5e.magia.imobilizar_pessoa",
    ];
    expect(source).toBe("local_snapshot");
    for (const id of expectedIds) {
      const item = byId.get(id);
      expect(item, id).toBeDefined();
      expect(item?.data.classIds, id).toContain("clerigo");
      expect((item?.data.classListPages as Record<string, number>)?.clerigo, id).toBeGreaterThan(0);
      expect(item?.data.sourcePage, id).toBeGreaterThan(0);
      expect(item?.data.castingTime, id).toBeTruthy();
      expect(item?.data.range, id).toBeTruthy();
      expect(item?.data.components, id).toBeTruthy();
      expect(item?.data.duration, id).toBeTruthy();
    }
  });

  it("serve as listas de Paladino e Patrulheiro com suas páginas no snapshot", async () => {
    const { items, source } = await fetchCatalogCategory("spell", { systemId: "dnd5e", ruleset: "standard" });
    const paladin = items.filter((item) => (item.data.classListPages as Record<string, number> | undefined)?.paladino === 214);
    const ranger = items.filter((item) => (item.data.classListPages as Record<string, number> | undefined)?.patrulheiro === 214);
    const byId = new Map(items.map((item) => [item.id, item]));
    expect(source).toBe("local_snapshot");
    expect(paladin).toHaveLength(45);
    expect(ranger).toHaveLength(46);
    expect(paladin.every((item) => (item.data.classIds as string[]).includes("paladino"))).toBe(true);
    expect(ranger.every((item) => (item.data.classIds as string[]).includes("patrulheiro"))).toBe(true);
    for (const id of ["dnd5e.magia.convocar_montaria", "dnd5e.magia.marca_da_punicao", "dnd5e.magia.destruicao_cegante"]) {
      expect(byId.get(id)?.data).toMatchObject({
        classIds: expect.arrayContaining(["paladino"]), classListPages: expect.objectContaining({ paladino: 214 }),
        sourcePage: expect.any(Number), castingTime: expect.any(String), range: expect.any(String),
        components: expect.any(String), duration: expect.any(String),
      });
    }
    expect(byId.get("dnd5e.magia.nao_deteccao")?.data).toMatchObject({
      classIds: expect.arrayContaining(["patrulheiro"]), classListPages: expect.objectContaining({ patrulheiro: 214 }),
    });
    expect(byId.get("dnd5e.magia.movimentacao_livre")?.data.classIds).not.toContain("paladino");
  });

  it("serve as magias ausentes pelas rotas do snapshot dnd5e/standard", async () => {
    const { items, source } = await fetchCatalogCategory("spell", { systemId: "dnd5e", ruleset: "standard" });
    const byId = new Map(items.map((item) => [item.id, item]));
    const addedIds = [
      "dnd5e.magia.espirro_acido", "dnd5e.magia.protecao_contra_laminas", "dnd5e.magia.rajada_de_veneno",
      "dnd5e.magia.toque_chocante", "dnd5e.magia.alterar_se", "dnd5e.magia.coroa_da_loucura",
      "dnd5e.magia.reflexos", "dnd5e.magia.imagem_maior", "dnd5e.magia.padrao_hipnotico",
      "dnd5e.magia.bordao_mistico", "dnd5e.magia.chicote_de_espinhos", "dnd5e.magia.criar_chamas",
      "dnd5e.magia.druidismo", "dnd5e.magia.orientacao", "dnd5e.magia.resistencia",
    ];
    expect(source).toBe("local_snapshot");
    expect(items).toHaveLength(362);
    for (const spell of DND5E_SPELLS.filter(({ id }) => addedIds.includes(id))) {
      expect(byId.get(spell.id), spell.name).toMatchObject({
        system_id: "dnd5e",
        data: {
          ruleset: "standard", classIds: spell.classIds, classListPages: spell.classListPages,
          source: { book: "D&D 5e — Livro do Jogador (2014)", page: spell.sourcePage },
          summary: spell.summary, sourcePage: spell.sourcePage, spellLevel: spell.spellLevel,
          castingTime: spell.castingTime, range: spell.range, components: spell.components, duration: spell.duration,
        },
      });
      if (spell.classListPage !== undefined) {
        expect(byId.get(spell.id)?.data.classListPage, spell.name).toBe(spell.classListPage);
      }
    }
  });

  it("serve a lista de Druida com suas associações e páginas sem sobrescrever as do Bardo", async () => {
    const { items } = await fetchCatalogCategory("spell", { systemId: "dnd5e", ruleset: "standard" });
    const byId = new Map(items.map((item) => [item.id, item]));
    for (const id of [
      "dnd5e.magia.consertar",
      "dnd5e.magia.enfeiticar_pessoa",
      "dnd5e.magia.imobilizar_pessoa",
      "dnd5e.magia.muralha_de_fogo",
    ]) {
      expect(byId.get(id)?.data.classIds, id).toContain("druida");
      expect(byId.get(id)?.data.classListPages, id).toMatchObject({ druida: 211 });
    }
    expect(byId.get("dnd5e.magia.consertar")?.data.classListPage).toBe(209);
    expect(byId.get("dnd5e.magia.enfeiticar_pessoa")?.data.classListPage).toBe(209);
    expect(byId.get("dnd5e.magia.imobilizar_pessoa")?.data.classListPage).toBe(209);
  });

  it("serve Missão e Nuvem de Adagas do snapshot local na lista de Mago", async () => {
    const { items, source } = await fetchCatalogCategory("spell", { systemId: "dnd5e", ruleset: "standard" });
    const byId = new Map(items.map((item) => [item.id, item]));
    expect(source).toBe("local_snapshot");
    for (const id of ["dnd5e.magia.missao", "dnd5e.magia.nuvem_de_adagas"]) {
      expect(byId.get(id)?.data.classIds, id).toContain("mago");
      expect(byId.get(id)?.data.classListPages, id).toMatchObject({ mago: 213 });
    }
  });

  it("serve as magias da lista de Mago registradas a partir do Livro do Jogador", async () => {
    const { items } = await fetchCatalogCategory("spell", { systemId: "dnd5e", ruleset: "standard" });
    const byId = new Map(items.map((item) => [item.id, item]));
    for (const id of [
      "dnd5e.magia.montaria_fantasmagorica", "dnd5e.magia.arca_secreta_leomund", "dnd5e.magia.assassino_fantasmagorico",
      "dnd5e.magia.cao_fiel_mordenkainen", "dnd5e.magia.santuario_particular_mordenkainen", "dnd5e.magia.mao_de_bigby",
      "dnd5e.magia.muralha_de_energia", "dnd5e.magia.esfera_congelante_otiluke", "dnd5e.magia.invocacao_instantanea_drawmij",
      "dnd5e.magia.ligacao_telepatica_rary",
    ]) {
      expect(byId.get(id)?.data.classIds, id).toContain("mago");
      expect(byId.get(id)?.data.classListPages, id).toMatchObject({ mago: 213 });
    }
    for (const [id, page] of [
      ["dnd5e.magia.escudo", 213], ["dnd5e.magia.escalar", 213], ["dnd5e.magia.nao_deteccao", 213],
      ["dnd5e.magia.nuvem_fetida", 213], ["dnd5e.magia.passagem", 213], ["dnd5e.magia.aprisionamento", 214],
      ["dnd5e.magia.enfraquecer_intelecto", 214],
    ] as const) {
      expect(byId.get(id)?.data.classIds, id).toContain("mago");
      expect(byId.get(id)?.data.classListPages, id).toMatchObject({ mago: page });
    }
  });

  it("serve as associações de Feiticeiro da página 212 e preserva a exceção de Imagem Espelhada", async () => {
    const { items } = await fetchCatalogCategory("spell", { systemId: "dnd5e", ruleset: "standard" });
    const byId = new Map(items.map((item) => [item.id, item]));
    for (const id of ["dnd5e.magia.consertar", "dnd5e.magia.nuvem_de_adagas", "dnd5e.magia.praga_de_insetos"]) {
      expect(byId.get(id)?.data.classIds, id).toContain("feiticeiro");
      expect(byId.get(id)?.data.classListPages, id).toMatchObject({ feiticeiro: 212 });
    }
    expect(byId.get("dnd5e.magia.imagem_espelhada")?.data.classIds).toContain("feiticeiro");
    expect((byId.get("dnd5e.magia.imagem_espelhada")?.data.classListPages as Record<string, number> | undefined)?.feiticeiro).toBeUndefined();
  });

  it("preserves the complete Cleric, Druid, and Sorcerer printed lists in the Git snapshot", async () => {
    const { items } = await fetchCatalogCategory("spell", { systemId: "dnd5e", ruleset: "standard" });
    const expectedPages: Record<string, Record<number, number>> = {
      clerigo: { 210: 67, 211: 39 },
      druida: { 211: 100, 212: 11 },
      feiticeiro: { 212: 129 },
    };
    for (const [classId, pageCounts] of Object.entries(expectedPages)) {
      const classSpells = items.filter((item) => (item.data.classListPages as Record<string, number> | undefined)?.[classId] !== undefined);
      const actualPages = Object.fromEntries(Object.entries(pageCounts).map(([page, _count]) => [
        page,
        classSpells.filter((item) => (item.data.classListPages as Record<string, number>)[classId] === Number(page)).length,
      ]));
      const expectedIds = DND5E_SPELLS
        .filter((spell) => spell.classIds?.includes(classId) && spell.classListPages?.[classId] !== undefined)
        .map((spell) => spell.id)
        .sort();
      expect(Object.fromEntries(Object.entries(actualPages).filter(([, count]) => count > 0)), classId).toEqual(pageCounts);
      expect(classSpells.map((item) => item.id).sort(), classId).toEqual(expectedIds);
    }
    const weakeningRay = items.find((item) => item.id === "dnd5e.magia.raio_do_enfraquecimento");
    expect(weakeningRay?.data.classIds).toEqual(expect.arrayContaining(["bruxo", "mago"]));
    expect(weakeningRay?.data.classIds).not.toContain("feiticeiro");
    expect(weakeningRay?.data.classListPages).toMatchObject({ bruxo: 210, mago: 213 });
    expect(items.find((item) => item.id === "dnd5e.magia.imagem_espelhada")?.data.classIds).toContain("feiticeiro");
    expect((items.find((item) => item.id === "dnd5e.magia.imagem_espelhada")?.data.classListPages as Record<string, number> | undefined)?.feiticeiro).toBeUndefined();
  });

  it("não expõe caracteres de substituição nas magias do snapshot D&D 5e", async () => {
    const { items } = await fetchCatalogCategory("spell", { systemId: "dnd5e", ruleset: "standard" });
    expect(JSON.stringify(items)).not.toContain("\uFFFD");
  });

  it("calcula totais de tabelas pelo manifesto sem carregar registros", async () => {
    const counts = await fetchCatalogTableCounts();
    expect(counts.catalog_feats).toBe(2896);
    expect(counts.catalog_spells).toBe(1222);
    expect(counts.catalog_weapons).toBe(321);
    expect(counts.catalog_armors).toBe(79);
    expect(counts.catalog_shields).toBe(32);
    expect(counts.catalog_items).toBe(1428);
  });

  it("calcula as métricas do compêndio pelos snapshots locais, incluindo perícias", async () => {
    const metrics = await fetchCatalogLocalMetrics();
    expect(metrics.counts.catalog_skills).toBe(195);
    expect(Object.values(metrics.counts).reduce((sum, count) => sum + count, 0)).toBe(8398);
    expect(metrics.counts.catalog_spells).toBe(2302);
    expect(metrics.verifiedCount + metrics.reviewCount).toBe(8398);
  });

  it("compartilha o cálculo das métricas locais entre chamadas concorrentes", async () => {
    const pendingMetrics = fetchCatalogLocalMetrics();
    expect(fetchCatalogLocalMetrics()).toBe(pendingMetrics);
    await pendingMetrics;
  });

  it("pagina resultados sem descartar o total filtrado", () => {
    const result = paginateCatalogItems(Array.from({ length: 205 }, (_, index) => index), 2, 100);
    expect(result).toEqual({ items: Array.from({ length: 100 }, (_, index) => index + 100), page: 2, pageCount: 3, total: 205 });
    expect(paginateCatalogItems(["a"], 9, 100)).toEqual({ items: ["a"], page: 1, pageCount: 1, total: 1 });
  });

  it("mantém o mapeamento de categorias usado pelo exportador de snapshot", () => {
    const requiredCategories: PickerType[] = [
      "ancestry",
      "heritage",
      "class",
      "subclass",
      "background",
      "archetype",
      "skill",
      "spell",
      "ritual",
      "feat",
      "item",
      "weapon",
      "armor",
      "shield",
      "formula",
      "pet",
      "action",
      "condition",
      "buff",
    ];

    for (const cat of requiredCategories) {
      expect(PICKER_TYPE_TO_TABLE[cat]).toBeDefined();
      expect(PICKER_TYPE_TO_TABLE[cat]).toMatch(/^catalog_/);
    }
  });

  it("normaliza corretamente um registro do snapshot para o formato PickerItem", () => {
    const mockRecord: CatalogItemRecord = {
      id: "feat.toughness",
      name_pt: "Robustez",
      name_en: "Toughness",
      name_es: "Dureza",
      description_pt: "Ganha +1 PV por nível.",
      description_en: "Gain +1 HP per level.",
      description_es: "Gana +1 PG por nivel.",
      category: "Geral",
      level: 1,
      traits: ["Geral"],
      rarity: "common",
      ruleset: "remaster",
      source_book: "Livro do Jogador",
      source_page: 256,
      data: {
        effects: [{ type: "max_hp_per_level", value: 1 }],
        mechanics: { failure: "fica atordoado 1", heightened: "+1d6" },
      },
    };

    const item = normalizeCatalogRecordToPickerItem(mockRecord, "feat");

    expect(item.id).toBe("feat.toughness");
    expect(item.name).toBe("Robustez");
    expect(item.data.names["pt-BR"]).toBe("Robustez");
    expect(item.data.names["en"]).toBe("Toughness");
    expect(item.data.names["es"]).toBe("Dureza");
    expect(item.data.translationStatus).toMatchObject({ names: { "pt-BR": true, en: true, es: true }, summaries: { "pt-BR": true, en: true, es: true } });
    expect(item.data.summaries["pt-BR"]).toBe("Ganha +1 PV por nível.");
    expect(item.data.level).toBe(1);
    expect(item.data.source.book).toBe("Livro do Jogador");
    expect(item.data.source.page).toBe(256);
    expect(item.data.traits).toEqual(["Geral"]);
    expect(item.data.mechanics).toEqual({ failure: "fica atordoado 1", heightened: "+1d6" });
  });

  it("marca idioma ausente como fallback sem confundi-lo com uma tradução", () => {
    const item = normalizeCatalogRecordToPickerItem({
      id: "dnd35.weapon.adaga",
      system_id: "dnd35",
      name_pt: "Adaga",
      description_pt: "Arma simples; dano: 1d4.",
      source_page: 116,
    }, "weapon");

    expect(item.name).toBe("Adaga");
    expect(item.data.summaries.en).toBe(item.data.summaries["pt-BR"]);
    expect(item.data.translationStatus).toMatchObject({ names: { en: false, es: false }, summaries: { en: false, es: false } });
  });

  it("preserva metadados de ações e condições core no snapshot", () => {
    const action = normalizeCatalogRecordToPickerItem({
      id: "dnd5e.action.dodge",
      system_id: "dnd5e",
      name_pt: "Esquivar",
      action_cost: "1",
      action_type: "basic",
      ruleset: "standard",
      source_book: "Livro do Jogador — D&D 5e 2014",
      source_page: 192,
    }, "action");
    const condition = normalizeCatalogRecordToPickerItem({
      id: "dnd5e.condition.exausto",
      system_id: "dnd5e",
      name_pt: "Exausto",
      has_value: true,
      condition_group: "core",
      ruleset: "standard",
      source_book: "Livro do Jogador — D&D 5e 2014",
      source_page: 291,
    }, "condition");
    expect(action.data).toMatchObject({ actionCost: "1", actionType: "basic" });
    expect(condition.data).toMatchObject({ hasValue: true, conditionGroup: "core" });
  });

  it("serve perícias core diretamente do snapshot", async () => {
    const t20 = await fetchCatalogCategory("skill", { systemId: "t20" });
    const dnd = await fetchCatalogCategory("skill", { systemId: "dnd5e" });
    expect(t20.source).toBe("local_snapshot");
    expect(t20.items).toHaveLength(29);
    expect(dnd.items).toHaveLength(18);
    expect(t20.items[0]).toMatchObject({ category: "skill", system_id: "t20" });
    expect(t20.items[0].data.source).toMatchObject({ book: "Tormenta20 — Livro Básico" });
  });

  it("promove o resumo estruturado de um poder T20 para o texto do compêndio", async () => {
    const t20 = await fetchCatalogCategory("feat", { systemId: "t20", ruleset: "padrao" });
    const power = t20.items.find((item) => item.id === "t20.poder.abencoar_arma");
    expect(power?.data.summary).toContain("arma preferida da divindade");
    expect(power?.summary).toBe(power?.data.summary);
    expect(power?.data.summaries["pt-BR"]).toBe(power?.data.summary);
  });

  it("não reutiliza o cache Advanced ao carregar perícias OSE Classic", async () => {
    const advanced = await fetchCatalogCategory("skill", { systemId: "ose", ruleset: "advanced" });
    const classic = await fetchCatalogCategory("skill", { systemId: "ose", ruleset: "classic" });
    expect(advanced.items.some((item) => item.data.skillTable === "thief" || item.data.skillTable === "acrobat")).toBe(true);
    expect(classic.items.length).toBe(32);
    expect(classic.items.every((item) => item.data.ruleset === "classic" && item.data.skillTable === undefined)).toBe(true);
  });

  it("serve regras de criação por sistema no Compêndio", async () => {
    const t20 = await fetchCatalogCategory("rule", { systemId: "t20" });
    const ose = await fetchCatalogCategory("rule", { systemId: "ose" });
    expect(t20.source).toBe("local_runtime");
    expect(t20.items.some((item) => item.data.ruleKind === "creation" && item.data.ruleset === "padrao")).toBe(true);
    expect(ose.items.some((item) => item.data.ruleKind === "creation" && item.data.ruleset === "advanced")).toBe(true);
  });

  it("carrega o Compêndio inteiro quando o filtro de sistema é Todos", async () => {
    const rules = await fetchCatalogCategory("rule", { systemId: "all" });
    expect(new Set(rules.items.map((item) => item.system_id))).toEqual(new Set(["t20", "dnd5e", "ose", "pf1e"]));
    expect(rules.items.some((item) => item.system_id === "pf1e" && item.data.ruleset === "legacy_pf1")).toBe(true);
    expect(rules.items.some((item) => item.data.ruleset === "classic")).toBe(true);
  });

  it("preserva os campos estruturados de armas ao normalizar um registro do snapshot", () => {
    const weapon = normalizeCatalogRecordToPickerItem({
      id: "weapon.longbow",
      name_pt: "Arco Longo",
      name_en: "Longbow",
      name_es: "Arco largo",
      damage_dice: "1d8",
      damage_type: "Perfuração (P)",
      range_feet: 100,
      reload: 0,
      hands: "2",
      weapon_group: "Arco",
      weapon_category: "Marcial",
      traits: ["Mortal d10", "Voleio 30 pés"],
      source_book: "Livro do Jogador",
      source_page: 280,
    }, "weapon");

    expect(weapon.data).toMatchObject({
      damage: "1d8",
      damageType: "Perfuração (P)",
      range: 100,
      rangeFeet: 100,
      reload: 0,
      hands: "2",
      weaponGroup: "Arco",
      weaponCategory: "Marcial",
    });
  });

  it("retorna o status do catálogo local", () => {
    const status = getCatalogSyncStatus();
    expect(status).toHaveProperty("isConfigured");
    expect(status).toHaveProperty("isOnline");
    expect(status).toHaveProperty("source");
  });

  it("usa o snapshot também no ambiente de teste", async () => {
    const res = await fetchCatalogCategory("ancestry");
    expect(res).toBeDefined();
    expect(Array.isArray(res.items)).toBe(true);
    expect(["local_snapshot", "local_runtime"]).toContain(res.source);
  });
});
