import { describe, expect, it } from "vitest";
import { ADV_SKILL_ADDITIONS } from "./dnd35AdvSkillAdditions";

describe("Livro Completo do Aventureiro: Perícias Expandidas (Cap.3, COMPLETO, pp.96-103)", () => {
  it("18 perícias com usos novos", () => {
    expect(ADV_SKILL_ADDITIONS).toHaveLength(18);
    expect(new Set(ADV_SKILL_ADDITIONS.map((s) => s.id)).size).toBe(18);
    for (const skill of ADV_SKILL_ADDITIONS) {
      expect(skill.intro.length).toBeGreaterThan(10);
      expect(skill.entries.length).toBeGreaterThan(0);
      for (const entry of skill.entries) {
        expect(entry.title.length).toBeGreaterThan(0);
        expect(entry.text.length).toBeGreaterThan(10);
      }
    }
  });

  it("Abrir Fechaduras: Destrancar Acelerado soma +20 à CD para ação de movimento", () => {
    const s = ADV_SKILL_ADDITIONS.find((x) => x.id === "adv-skill-abrir-fechaduras")!;
    const e = s.entries.find((x) => x.title === "Destrancar Acelerado")!;
    expect(e.text).toMatch(/acrescente 20 à CD/);
    expect(e.text).toMatch(/CD 45 para ser aberta com uma ação de movimento/);
  });

  it("Acrobacia: Ignorar Dano de Queda reduz 3m a cada 10 pontos acima do necessário", () => {
    const s = ADV_SKILL_ADDITIONS.find((x) => x.id === "adv-skill-acrobacia")!;
    const e = s.entries.find((x) => x.title === "Ignorar Dano de Queda")!;
    expect(e.text).toMatch(/cada 10 pontos do resultado do teste de Acrobacia/);
    expect(e.text).toMatch(/considere a queda 3 m mais curta/);
  });

  it("Adestrar Animais: 7 truques nomeados + regra de Capacidade de Aprendizado + talento Truques Adicionais", () => {
    const s = ADV_SKILL_ADDITIONS.find((x) => x.id === "adv-skill-adestrar-animais")!;
    const titulos = s.entries.map((e) => e.title);
    expect(titulos).toEqual(
      expect.arrayContaining([
        "Auxiliar Ataque (CD 20)",
        "Auxiliar Defesa (CD 20)",
        "Auxiliar a Rastrear (CD 20)",
        "Imobilizar (CD 20)",
        "Casa (CD 20)",
        "Caçar (CD 15)",
        "Capacidade de Aprendizado",
      ]),
    );
    expect(s.entries.find((e) => e.title === "Truques Adicionais — Especial")!.text).toMatch(/três novos truques/);
  });

  it("Adestrar Animais: tarefas gerais Combate Avançado/Guarda e Defesa/Roubo presentes", () => {
    const s = ADV_SKILL_ADDITIONS.find((x) => x.id === "adv-skill-adestrar-animais")!;
    const titulos = s.entries.map((e) => e.title);
    expect(titulos).toEqual(
      expect.arrayContaining(["Combate Avançado (CD 20)", "Guarda e Defesa (CD 20)", "Roubo (CD 20)", "Seguir (CD 20)"]),
    );
    expect(s.entries.find((e) => e.title === "Combate Avançado (CD 20)")!.text).toMatch(/cinco semanas/);
  });

  it("Arte da Fuga: Fuga Rápida soma +10 à CD", () => {
    const s = ADV_SKILL_ADDITIONS.find((x) => x.id === "adv-skill-arte-da-fuga")!;
    expect(s.entries[0].text).toMatch(/aumenta a CD em 10/);
  });

  it("Avaliação: CDs por categoria (Comum 15, Raro 20, Exótico 25, Exclusivo 30+)", () => {
    const s = ADV_SKILL_ADDITIONS.find((x) => x.id === "adv-skill-avaliacao")!;
    const teste = s.entries.find((e) => e.title === "Teste")!;
    expect(teste.text).toMatch(/Comum.*CD 15/);
    expect(teste.text).toMatch(/Exclusivo.*CD 30\+/);
  });

  it("Cura: tabela de causa da morte com 5 CDs", () => {
    const s = ADV_SKILL_ADDITIONS.find((x) => x.id === "adv-skill-cura")!;
    const tab = s.entries.find((e) => e.title === "Causa da Morte — CDs")!;
    expect(tab.text).toMatch(/Ferimentos físicos CD 0/);
    expect(tab.text).toMatch(/Magia sem efeitos visíveis CD 20/);
  });

  it("Diplomacia: Pechinchar reduz preço em 10% se tornar vendedor prestativo", () => {
    const s = ADV_SKILL_ADDITIONS.find((x) => x.id === "adv-skill-diplomacia-pechinchar")!;
    const e = s.entries.find((x) => x.title === "Pechinchar")!;
    expect(e.text).toMatch(/reduzido em 10% abaixo do normal/);
  });

  it("Equilíbrio: Resistir a Derrubar exige 10+ graduações e -10 de penalidade", () => {
    const s = ADV_SKILL_ADDITIONS.find((x) => x.id === "adv-skill-equilibrio")!;
    expect(s.entries.find((e) => e.title === "Resistir a Derrubar")!.text).toMatch(/10 ou mais graduações.*-10 de penalidade/s);
  });

  it("Escalar: Escalada Rápida/Escalar em Combate com -20 de penalidade", () => {
    const s = ADV_SKILL_ADDITIONS.find((x) => x.id === "adv-skill-escalar")!;
    expect(s.entries.find((e) => e.title === "Escalada Rápida")!.text).toMatch(/-20 de penalidade/);
    expect(s.entries.find((e) => e.title === "Escalar em Combate")!.text).toMatch(/conservará seu bônus de Destreza na CA/);
  });

  it("Esconder-se: Seguir ao Alvo exige teste a cada 10 minutos (18m) ou por rodada (<18m)", () => {
    const s = ADV_SKILL_ADDITIONS.find((x) => x.id === "adv-skill-esconder-se")!;
    const e = s.entries.find((x) => x.title === "Seguir ao Alvo")!;
    expect(e.text).toMatch(/18 m.*a cada 10 minutos/);
    expect(e.text).toMatch(/menos de 18 m, é necessário um teste de Esconder-se por rodada/);
  });

  it("Falsificação: Documentos Oficiais concede +2 em Falsificação/Diplomacia/Intimidação", () => {
    const s = ADV_SKILL_ADDITIONS.find((x) => x.id === "adv-skill-falsificacao")!;
    const e = s.entries.find((x) => x.title === "Documentos Oficiais")!;
    expect(e.text).toMatch(/\+2 de bônus de circunstância em testes de Falsificação, Diplomacia ou Intimidação/);
  });

  it("Natação: Natação Acelerada com -10 de penalidade permite deslocamento total", () => {
    const s = ADV_SKILL_ADDITIONS.find((x) => x.id === "adv-skill-natacao")!;
    const e = s.entries.find((x) => x.title === "Natação Acelerada")!;
    expect(e.text).toMatch(/-10 de penalidade no teste de Natação/);
    expect(e.text).toMatch(/deslocamento total como uma ação de rodada completa/);
  });

  it("Ofícios: Criação Rápida soma +10 à CD; regras de Ofícios-Venenos presentes", () => {
    const s = ADV_SKILL_ADDITIONS.find((x) => x.id === "adv-skill-oficios")!;
    expect(s.entries.find((e) => e.title === "Criação Rápida")!.text).toMatch(/\+10 ou mais na CD/);
    expect(s.entries.find((e) => e.title === "Ofícios (Venenos) — Quantidade")!.text).toMatch(/margem igual ou superior a 5, metade das matérias-primas serão arruinadas/);
  });

  it("Operar Mecanismo: Desarmar Acelerado soma +20 à CD", () => {
    const s = ADV_SKILL_ADDITIONS.find((x) => x.id === "adv-skill-operar-mecanismo")!;
    expect(s.entries.find((e) => e.title === "Desarmar Acelerado")!.text).toMatch(/acrescente \+20 à CD/);
  });

  it("Sentir Motivação: Avaliar Oponente com 5 categorias de ND relativo e talento Intuição em Combate +4", () => {
    const s = ADV_SKILL_ADDITIONS.find((x) => x.id === "adv-skill-sentir-motivacao")!;
    const e = s.entries.find((x) => x.title === "Avaliar Oponente")!;
    expect(e.text).toMatch(/Uma galinha morta/);
    expect(e.text).toMatch(/Uma grave ameaça/);
    expect(s.entries.find((x) => x.title === "Especial")!.text).toMatch(/\+4 de bônus nos testes de Sentir Motivação/);
  });

  it("Sobrevivência: Queimar o Chão aumenta deslocamento de viagem até x1", () => {
    const s = ADV_SKILL_ADDITIONS.find((x) => x.id === "adv-skill-sobrevivencia")!;
    const e = s.entries.find((x) => x.title === "Queimar o Chão")!;
    expect(e.text).toMatch(/resultado igual ou superior a 15.*aumenta em 1\/4/s);
    expect(e.text).toMatch(/máximo de x1/);
  });

  it("Usar Cordas: Dar Nós com Rapidez exige -10 de penalidade para ação de movimento", () => {
    const s = ADV_SKILL_ADDITIONS.find((x) => x.id === "adv-skill-usar-cordas")!;
    const e = s.entries.find((x) => x.title === "Dar Nós com Rapidez")!;
    expect(e.text).toMatch(/-10 de penalidade/);
    expect(e.text).toMatch(/ação de movimento/);
  });
});
