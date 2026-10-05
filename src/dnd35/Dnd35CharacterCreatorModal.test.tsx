import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Dnd35CharacterCreatorModal, type Dnd35CharacterCreatedData } from "./Dnd35CharacterCreatorModal";

/**
 * Verificação de DOM da riqueza inicial (Tabela 7-1, p. 111): o ouro inicial
 * acompanha a classe escolhida e uma ficha reaberta mantém o saldo salvo.
 */
afterEach(cleanup);

// Cada clique redesenha os 109 cards de talento com a checagem de pré-requisitos;
// sob carga da suíte completa alguns testes passavam de 5 s (isolados levam ~1-3 s).
vi.setConfig({ testTimeout: 30000 });

/**
 * Botões de escolha (cards). Consulta direta ao DOM: getAllByRole calcula o
 * nome acessível de cada botão e, com os 109 talentos da Tabela 5-1 na tela,
 * fica lento demais para o tempo-limite dos testes.
 */
const allButtons = () => Array.from(document.body.querySelectorAll("button"));

const tab = (label: RegExp) => fireEvent.click(screen.getByRole("tab", { name: label }));
const pickClass = (name: string) =>
  fireEvent.click(allButtons().find((b) => b.querySelector("strong")?.textContent === name)!);

describe("Dnd35CharacterCreatorModal — riqueza inicial por classe", () => {
  it("Guerreiro começa com a média 150 PO; trocar para Mago usa 75 PO; Monge usa 5d4 (12,50 PO)", () => {
    render(<Dnd35CharacterCreatorModal isOpen onClose={() => {}} onCharacterCreated={() => {}} />);
    tab(/Talentos & Equipamento/);
    expect(screen.getByText(/150\.00 PO restantes/)).toBeTruthy();

    tab(/Raça & Classe/);
    pickClass("Mago");
    tab(/Talentos & Equipamento/);
    expect(screen.getByText(/75\.00 PO restantes/)).toBeTruthy();
    expect(screen.getByText(/3d4 x 10 \(média 75 PO/)).toBeTruthy();

    tab(/Raça & Classe/);
    pickClass("Monge");
    tab(/Talentos & Equipamento/);
    expect(screen.getByText(/12\.50 PO restantes/)).toBeTruthy();
  });

  it("ficha reaberta mantém exatamente o saldo salvo, mesmo com compras", () => {
    const saved: Dnd35CharacterCreatedData = {
      id: "dnd35-teste", name: "Tordek", system_id: "dnd35", ruleset: "v35", raceId: "anao", classId: "guerreiro",
      level: 1, xp: 0, alignment: "Leal e Bom", abilities: { for: 15, des: 13, con: 16, int: 10, sab: 12, car: 6 },
      maxHp: 13, currentHp: 13, goldGp: 37.5, trainedSkillIds: [], featIds: [],
      weaponIds: ["espada-longa"], armorIds: [], gearIds: [],
    };
    const onCreated = vi.fn();
    render(<Dnd35CharacterCreatorModal isOpen onClose={() => {}} onCharacterCreated={onCreated} initialCharacter={saved} />);
    tab(/Talentos & Equipamento/);
    expect(screen.getByText(/37\.50 PO restantes/)).toBeTruthy();
  });
});

describe("Dnd35CharacterCreatorModal — bônus de 1º nível (Tabela 3-1)", () => {
  it("Guerreiro humano padrão: BBA +1, Fort boa; Monge: BBA +0, três resistências boas", () => {
    render(<Dnd35CharacterCreatorModal isOpen onClose={() => {}} onCharacterCreated={() => {}} />);
    tab(/Raça & Classe/);
    // Padrões: For 13 (+1), Des 12 (+1), Con 14 (+2), Sab 11 (+0), humano sem ajustes.
    expect(screen.getByTestId("dnd35-combat-stats").textContent).toContain(
      "BBA +1 · Corpo a corpo +2 · Distância +2 · Fort +4 · Ref +1 · Von +0",
    );
    pickClass("Monge");
    expect(screen.getByTestId("dnd35-combat-stats").textContent).toContain(
      "BBA +0 · Corpo a corpo +1 · Distância +1 · Fort +4 · Ref +3 · Von +2",
    );
    expect(screen.getByTestId("dnd35-class-features").textContent).toContain("Talento adicional, rajada de golpes, ataque desarmado");
    pickClass("Mago");
    expect(screen.getByTestId("dnd35-class-features").textContent).toContain("Invocar familiar, escrever pergaminho");
    expect(screen.getByTestId("dnd35-spells").textContent).toContain("0: 3 · 1º: — (Inteligência mínima 11)");
    pickClass("Guerreiro");
    expect(screen.queryByTestId("dnd35-spells")).toBeNull();
    pickClass("Paladino");
    expect(screen.getByTestId("dnd35-spells").textContent).toContain("nenhuma no 1º nível");
  });

  it("magias do Mago acompanham a Inteligência (Tabela 1-1): Int 16 → 1º: 2 (1 + 1 atributo)", () => {
    render(<Dnd35CharacterCreatorModal isOpen onClose={() => {}} onCharacterCreated={() => {}} />);
    fireEvent.change(screen.getByLabelText(/Inteligência/), { target: { value: "16" } });
    tab(/Raça & Classe/);
    pickClass("Mago");
    expect(screen.getByTestId("dnd35-spells").textContent).toContain("0: 3 · 1º: 2 (1 + 1 atributo)");
    expect(screen.getByTestId("dnd35-spells").textContent).toContain("CD = 10 + nível da magia +3");
  });

  it("orçamento de talentos no 1º nível: humano guerreiro 3, humano mago 2", () => {
    render(<Dnd35CharacterCreatorModal isOpen onClose={() => {}} onCharacterCreated={() => {}} />);
    tab(/Talentos & Equipamento/);
    expect(screen.getByRole("heading", { name: /Talentos \(0\/3\)/ })).toBeTruthy();
    tab(/Raça & Classe/);
    pickClass("Mago");
    tab(/Talentos & Equipamento/);
    expect(screen.getByRole("heading", { name: /Talentos \(0\/2\)/ })).toBeTruthy();
  });
});

const spellCard = (name: string) =>
  allButtons().find((b) => b.querySelector("strong")?.textContent?.replace(/ \([MFX]+\)$/, "") === name)!;

describe("Dnd35CharacterCreatorModal — escolha de magias (Capítulo 11)", () => {

  it("Mago Int 14: grimório de 3 + 2 = 5 magias de 1º nível, limite respeitado e salvo na ficha", () => {
    const onCreated = vi.fn();
    render(<Dnd35CharacterCreatorModal isOpen onClose={() => {}} onCharacterCreated={onCreated} />);
    fireEvent.change(screen.getByLabelText(/Inteligência/), { target: { value: "14" } });
    tab(/Raça & Classe/);
    pickClass("Mago");
    tab(/Talentos & Equipamento/);
    expect(screen.getByRole("heading", { name: "1º nível (0/5)" })).toBeTruthy();
    for (const name of ["Sono", "Mísseis Mágicos", "Armadura Arcana", "Escudo Arcano", "Identificação", "Enfeitiçar Pessoa"]) {
      fireEvent.click(spellCard(name));
    }
    // o 6º clique é ignorado
    expect(screen.getByRole("heading", { name: "1º nível (5/5)" })).toBeTruthy();
    expect(spellCard("Enfeitiçar Pessoa").getAttribute("aria-pressed")).toBe("false");
    fireEvent.click(spellCard("Sono"));
    expect(screen.getByRole("heading", { name: "1º nível (4/5)" })).toBeTruthy();

    tab(/Revisão final/);
    fireEvent.click(screen.getByRole("button", { name: /Salvar personagem/ }));
    expect(onCreated).toHaveBeenCalledTimes(1);
    expect(onCreated.mock.calls[0][0].spellIds).toEqual(["1:Mísseis Mágicos", "1:Armadura Arcana", "1:Escudo Arcano", "1:Identificação"]);
  });

  it("Feiticeiro Car 14: escolhe 4 truques e 2 magias de 1º (Tabela 3-10)", () => {
    render(<Dnd35CharacterCreatorModal isOpen onClose={() => {}} onCharacterCreated={() => {}} />);
    fireEvent.change(screen.getByLabelText(/Carisma/), { target: { value: "14" } });
    tab(/Raça & Classe/);
    pickClass("Feiticeiro");
    tab(/Talentos & Equipamento/);
    expect(screen.getByRole("heading", { name: "Nível 0 (0/4)" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "1º nível (0/2)" })).toBeTruthy();
  });

  it("Bardo 1º nível escolhe 4 truques (Tabela 3-5); sem magia de 1º no 1º nível", () => {
    render(<Dnd35CharacterCreatorModal isOpen onClose={() => {}} onCharacterCreated={() => {}} />);
    fireEvent.change(screen.getByLabelText(/Carisma/), { target: { value: "14" } });
    tab(/Raça & Classe/);
    pickClass("Bardo");
    tab(/Talentos & Equipamento/);
    expect(screen.getByRole("heading", { name: "Nível 0 (0/4)" })).toBeTruthy();
    expect(screen.queryByRole("heading", { name: /1º nível/ })).toBeNull();
    expect(spellCard("Canção de Ninar")).toBeTruthy();
  });

  it("Druida vê a lista de preces que prepara; Paladino de 1º nível ainda não conjura", () => {
    render(<Dnd35CharacterCreatorModal isOpen onClose={() => {}} onCharacterCreated={() => {}} />);
    tab(/Raça & Classe/);
    pickClass("Druida");
    tab(/Talentos & Equipamento/);
    expect(screen.getByTestId("dnd35-spell-choice").textContent).toContain("Lista de nível 0 (13 magias)");
    expect(screen.getByTestId("dnd35-spell-choice").textContent).toContain("Intuir Direção");
    tab(/Raça & Classe/);
    pickClass("Paladino");
    tab(/Talentos & Equipamento/);
    expect(screen.getByTestId("dnd35-spell-choice").textContent).not.toContain("Lista de");
  });

  it("magias deixam de valer ao trocar de classe e não são salvas", () => {
    const onCreated = vi.fn();
    render(<Dnd35CharacterCreatorModal isOpen onClose={() => {}} onCharacterCreated={onCreated} />);
    tab(/Raça & Classe/);
    pickClass("Mago");
    tab(/Talentos & Equipamento/);
    fireEvent.click(spellCard("Sono"));
    tab(/Raça & Classe/);
    pickClass("Clérigo");
    fireEvent.click(domainCard("Cura"));
    fireEvent.click(domainCard("Sol"));
    tab(/Talentos & Equipamento/);
    expect(screen.getByTestId("dnd35-spell-choice").textContent).toContain("prepara magias da lista completa");
    tab(/Revisão final/);
    fireEvent.click(screen.getByRole("button", { name: /Salvar personagem/ }));
    expect(onCreated.mock.calls[0][0].spellIds).toEqual([]);
  });
});

const domainCard = (name: string) =>
  Array.from(screen.getByTestId("dnd35-domains").querySelectorAll("button")).find((b) => b.querySelector("strong")?.textContent === name)!;
const domainNames = () =>
  Array.from(screen.getByTestId("dnd35-domains").querySelectorAll("button")).map((b) => b.querySelector("strong")?.textContent);

describe("Dnd35CharacterCreatorModal — divindade e domínios do clérigo (Tabela 3-7, p. 32)", () => {
  const openCleric = (onCreated = vi.fn()) => {
    render(<Dnd35CharacterCreatorModal isOpen onClose={() => {}} onCharacterCreated={onCreated} />);
    tab(/Raça & Classe/);
    pickClass("Clérigo");
    return onCreated;
  };

  it("sem divindade: todos os domínios exceto os de tendência que não correspondem (Neutro e Bom → sem Caos/Mal/Ordem)", () => {
    openCleric();
    const names = domainNames();
    expect(names).toHaveLength(19);
    expect(names).toContain("Bem");
    expect(names).not.toContain("Caos");
    expect(names).not.toContain("Mal");
    expect(names).not.toContain("Ordem");
  });

  it("divindade limita aos domínios dela; máximo de dois; salvar grava divindade e domínios", () => {
    const onCreated = openCleric();
    fireEvent.change(screen.getByLabelText("Divindade"), { target: { value: "pelor" } });
    expect(domainNames()).toEqual(["Bem", "Cura", "Força", "Sol"]);
    fireEvent.click(domainCard("Cura"));
    fireEvent.click(domainCard("Sol"));
    fireEvent.click(domainCard("Força"));
    expect(domainCard("Força").getAttribute("aria-pressed")).toBe("false");
    tab(/Talentos & Equipamento/);
    expect(screen.getByTestId("dnd35-domain-spells").textContent).toContain("Curar Ferimentos Leves (Cura) ou Suportar Elementos (Sol)");
    tab(/Revisão final/);
    fireEvent.click(screen.getByRole("button", { name: /Salvar personagem/ }));
    expect(onCreated.mock.calls[0][0]).toMatchObject({ deityId: "pelor", domainIds: ["cura", "sol"] });
  });

  it("clérigo sem dois domínios não salva", () => {
    const onCreated = openCleric();
    fireEvent.click(domainCard("Cura"));
    tab(/Revisão final/);
    fireEvent.click(screen.getByRole("button", { name: /Salvar personagem/ }));
    expect(onCreated).not.toHaveBeenCalled();
    expect(screen.getByText(/deve escolher dois domínios/)).toBeTruthy();
  });

  it("raça restringe divindades de 'Adoradores Típicos': humano não vê Moradin", () => {
    openCleric();
    const options = within(screen.getByLabelText("Divindade")).getAllByRole("option").map((o) => o.textContent);
    expect(options.some((o) => o?.startsWith("Moradin"))).toBe(false);
    expect(options.some((o) => o?.startsWith("Pelor"))).toBe(true);
  });

  it("domínio Enganação torna Blefar perícia de classe (custa 1 ponto)", () => {
    openCleric();
    fireEvent.click(domainCard("Enganação"));
    tab(/PV & Perícias/);
    const row = screen.getByText("Blefar").closest("label")!;
    expect(row.className).toContain("class-skill");
  });
});

describe("Dnd35CharacterCreatorModal — tendência (Capítulo 3; clérigo p. 31)", () => {
  const alignmentSelect = () => within(screen.getByTestId("dnd35-alignment")).getByRole("combobox") as HTMLSelectElement;
  const enabledOptions = () => Array.from(alignmentSelect().options).filter((o) => !o.disabled).map((o) => o.value);

  it("Paladino ajusta a tendência para Leal e Bom e bloqueia as demais; Monge só Leal", () => {
    render(<Dnd35CharacterCreatorModal isOpen onClose={() => {}} onCharacterCreated={() => {}} />);
    tab(/Raça & Classe/);
    expect(alignmentSelect().value).toBe("Neutro e Bom");
    pickClass("Paladino");
    expect(alignmentSelect().value).toBe("Leal e Bom");
    expect(enabledOptions()).toEqual(["Leal e Bom"]);
    expect(screen.getByRole("status").textContent).toContain("Tendência ajustada para Leal e Bom");
    pickClass("Monge");
    expect(enabledOptions()).toEqual(["Leal e Bom", "Leal e Neutro", "Leal e Mau"]);
    expect(alignmentSelect().value).toBe("Leal e Bom");
  });

  it("clérigo de Pelor: só um passo da divindade; Neutro autêntico proibido", () => {
    render(<Dnd35CharacterCreatorModal isOpen onClose={() => {}} onCharacterCreated={() => {}} />);
    tab(/Raça & Classe/);
    pickClass("Clérigo");
    fireEvent.change(screen.getByLabelText("Divindade"), { target: { value: "pelor" } });
    expect(enabledOptions()).toEqual(["Leal e Bom", "Neutro e Bom", "Caótico e Bom"]);
    // Clérigo de Hextor com tendência NB é ajustado automaticamente.
    fireEvent.change(screen.getByLabelText("Divindade"), { target: { value: "hextor" } });
    expect(alignmentSelect().value).toBe("Leal e Neutro");
    expect(enabledOptions()).toEqual(["Leal e Neutro", "Leal e Mau", "Neutro e Mau"]);
  });

  it("ficha antiga com tendência não reconhecida não salva até escolher uma das nove", () => {
    const saved: Dnd35CharacterCreatedData = {
      id: "dnd35-antiga", name: "Velho", system_id: "dnd35", ruleset: "v35", raceId: "humano", classId: "guerreiro",
      level: 1, xp: 0, alignment: "sei lá", abilities: { for: 13, des: 12, con: 14, int: 10, sab: 11, car: 9 },
      maxHp: 12, currentHp: 12, goldGp: 150, trainedSkillIds: [], featIds: [], weaponIds: [], armorIds: [], gearIds: [],
    };
    const onCreated = vi.fn();
    render(<Dnd35CharacterCreatorModal isOpen onClose={() => {}} onCharacterCreated={onCreated} initialCharacter={saved} />);
    tab(/Revisão final/);
    fireEvent.click(screen.getByRole("button", { name: /Salvar personagem/ }));
    expect(onCreated).not.toHaveBeenCalled();
    expect(screen.getByRole("alert").textContent).toContain("Tendência inválida");
    fireEvent.change(alignmentSelect(), { target: { value: "Caótico e Neutro" } });
    tab(/Revisão final/);
    fireEvent.click(screen.getByRole("button", { name: /Salvar personagem/ }));
    expect(onCreated.mock.calls[0][0].alignment).toBe("Caótico e Neutro");
  });

  it("ficha antiga com sigla é normalizada para o nome impresso", () => {
    const saved: Dnd35CharacterCreatedData = {
      id: "dnd35-sigla", name: "Sigla", system_id: "dnd35", ruleset: "v35", raceId: "humano", classId: "guerreiro",
      level: 1, xp: 0, alignment: "cm", abilities: { for: 13, des: 12, con: 14, int: 10, sab: 11, car: 9 },
      maxHp: 12, currentHp: 12, goldGp: 150, trainedSkillIds: [], featIds: [], weaponIds: [], armorIds: [], gearIds: [],
    };
    render(<Dnd35CharacterCreatorModal isOpen onClose={() => {}} onCharacterCreated={() => {}} initialCharacter={saved} />);
    tab(/Raça & Classe/);
    expect(alignmentSelect().value).toBe("Caótico e Mau");
  });
});

describe("Dnd35CharacterCreatorModal — especialização em escola do Mago (p. 47)", () => {
  const openWizard = (onCreated = vi.fn()) => {
    render(<Dnd35CharacterCreatorModal isOpen onClose={() => {}} onCharacterCreated={onCreated} />);
    fireEvent.change(screen.getByLabelText(/Inteligência/), { target: { value: "14" } });
    tab(/Raça & Classe/);
    pickClass("Mago");
    tab(/Talentos & Equipamento/);
    return onCreated;
  };
  const specialty = () => screen.getByLabelText(/Especialização em escola/);
  const prohibit = (name: string) => fireEvent.click(within(screen.getByTestId("dnd35-specialization")).getByLabelText(name));

  it("evocador que proíbe Encantamento e Ilusão: essas magias somem das listas e das escolhas", () => {
    const onCreated = openWizard();
    expect(spellCard("Sono")).toBeTruthy(); // Encan
    fireEvent.click(spellCard("Sono"));
    fireEvent.change(specialty(), { target: { value: "Evoc" } });
    // Adivinhação e a própria Evocação não podem ser proibidas
    const options = Array.from(screen.getByTestId("dnd35-specialization").querySelectorAll("input[type=checkbox]")).map((c) => c.parentElement?.textContent);
    expect(options).not.toContain("Adivinhação");
    expect(options).not.toContain("Evocação");
    prohibit("Encantamento");
    prohibit("Ilusão");
    prohibit("Necromancia"); // terceiro ignorado
    expect(screen.getByText(/Escolas proibidas \(2\/2\)/)).toBeTruthy();
    expect(spellCard("Sono")).toBeUndefined();
    expect(spellCard("Imagem Silenciosa")).toBeUndefined(); // Ilus
    expect(spellCard("Mísseis Mágicos")).toBeTruthy();
    fireEvent.click(spellCard("Mísseis Mágicos"));
    tab(/Revisão final/);
    expect(screen.getByTestId("dnd35-specialization-summary").textContent).toContain("Especialista em Evocação");
    fireEvent.click(screen.getByRole("button", { name: /Salvar personagem/ }));
    expect(onCreated.mock.calls[0][0]).toMatchObject({
      specialtySchool: "Evoc", prohibitedSchools: ["Encan", "Ilus"], spellIds: ["1:Mísseis Mágicos"],
    });
  });

  it("adivinho abandona só uma escola; especialista incompleto não salva", () => {
    const onCreated = openWizard();
    fireEvent.change(specialty(), { target: { value: "Adiv" } });
    expect(screen.getByText(/Escolas proibidas \(0\/1\)/)).toBeTruthy();
    tab(/Revisão final/);
    fireEvent.click(screen.getByRole("button", { name: /Salvar personagem/ }));
    expect(onCreated).not.toHaveBeenCalled();
    expect(screen.getByRole("alert").textContent).toContain("Escolha 1 escola(s) proibida(s)");
    prohibit("Necromancia");
    tab(/Revisão final/);
    fireEvent.click(screen.getByRole("button", { name: /Salvar personagem/ }));
    expect(onCreated.mock.calls[0][0]).toMatchObject({ specialtySchool: "Adiv", prohibitedSchools: ["Necro"] });
  });
});

describe("Dnd35CharacterCreatorModal — talento adicional restrito (Tabela 5-1 nota 1; Monge p. 50)", () => {
  const featCard = (name: string) =>
    allButtons().find((b) => b.querySelector("strong")?.textContent?.replace(/ ★$/, "") === name)!;

  it("Monge humano: 2 talentos quaisquer + o adicional só Agarrar Aprimorado ou Ataque Atordoante", () => {
    render(<Dnd35CharacterCreatorModal isOpen onClose={() => {}} onCharacterCreated={() => {}} />);
    tab(/Raça & Classe/);
    pickClass("Monge");
    tab(/Talentos & Equipamento/);
    expect(featCard("Ataque Atordoante").textContent).toContain("★");
    expect(featCard("Esquiva").textContent).not.toContain("★");
    fireEvent.click(featCard("Prontidão"));
    fireEvent.click(featCard("Rastrear"));
    fireEvent.click(featCard("Esquiva")); // terceiro fora da lista: recusado
    expect(featCard("Esquiva").getAttribute("aria-pressed")).toBe("false");
    fireEvent.click(featCard("Ataque Atordoante"));
    expect(featCard("Ataque Atordoante").getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByRole("heading", { name: /Talentos \(3\/3\)/ })).toBeTruthy();
  });

  it("Guerreiro não humano: 1 geral + adicional de combate; Rastrear não cabe no adicional", () => {
    render(<Dnd35CharacterCreatorModal isOpen onClose={() => {}} onCharacterCreated={() => {}} />);
    tab(/Raça & Classe/);
    fireEvent.click(allButtons().find((b) => b.querySelector("strong")?.textContent === "Anão")!);
    tab(/Talentos & Equipamento/);
    fireEvent.click(featCard("Rastrear"));
    fireEvent.click(featCard("Prontidão"));
    expect(featCard("Prontidão").getAttribute("aria-pressed")).toBe("false");
    fireEvent.click(featCard("Ataque Poderoso"));
    expect(featCard("Ataque Poderoso").getAttribute("aria-pressed")).toBe("true");
  });
});

describe("Dnd35CharacterCreatorModal — catálogo completo da Tabela 5-1", () => {
  it("mostra os 109 talentos por seção; busca filtra e mantém os escolhidos; Guerreiro escolhe Trespassar depois de Ataque Poderoso", () => {
    const onCreated = vi.fn();
    render(<Dnd35CharacterCreatorModal isOpen onClose={() => {}} onCharacterCreated={onCreated} />);
    tab(/Talentos & Equipamento/);
    expect(screen.getByRole("heading", { name: "Talentos comuns (92)" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Talentos de criação de item (8)" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Talentos metamágicos (9)" })).toBeTruthy();
    const card = (name: string) =>
      allButtons().find((b) => b.querySelector("strong")?.textContent?.replace(/ ★$/, "") === name);
    fireEvent.click(card("Prontidão")!);
    fireEvent.change(screen.getByLabelText("Buscar talento"), { target: { value: "trespassar" } });
    expect(card("Trespassar")!.textContent).toContain("★");
    expect(card("Trespassar Maior")).toBeTruthy();
    expect(card("Esquiva")).toBeUndefined();
    expect(card("Prontidão")).toBeTruthy(); // escolhido continua visível
    // Trespassar exige Ataque Poderoso (p. 87: pré-requisito atendido no mesmo nível vale)
    expect(card("Trespassar")!.textContent).toContain("Falta: Ataque Poderoso");
    fireEvent.click(card("Trespassar")!);
    expect(card("Trespassar")!.getAttribute("aria-pressed")).toBe("false");
    fireEvent.change(screen.getByLabelText("Buscar talento"), { target: { value: "poderoso" } });
    fireEvent.click(card("Ataque Poderoso")!); // For 13 do padrão atende
    fireEvent.change(screen.getByLabelText("Buscar talento"), { target: { value: "trespassar" } });
    fireEvent.click(card("Trespassar")!);
    tab(/Revisão final/);
    expect(screen.getByText(/Talentos: Prontidão, Ataque Poderoso, Trespassar/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /Salvar personagem/ }));
    expect(onCreated.mock.calls[0][0].featIds).toEqual(["prontidao", "ataque-poderoso", "trespassar"]);
  });
});

describe("Dnd35CharacterCreatorModal — pré-requisitos de talento (p. 87)", () => {
  const card = (name: string) =>
    allButtons().find((b) => b.querySelector("strong")?.textContent?.replace(/ ★$/, "") === name);
  const search = (q: string) => fireEvent.change(screen.getByLabelText("Buscar talento"), { target: { value: q } });

  it("atributo insuficiente bloqueia; com o atributo ajustado, libera", () => {
    render(<Dnd35CharacterCreatorModal isOpen onClose={() => {}} onCharacterCreated={() => {}} />);
    tab(/Talentos & Equipamento/);
    search("esquiva");
    expect(card("Esquiva")!.textContent).toContain("Falta: Des 13"); // Des 12 padrão
    fireEvent.click(card("Esquiva")!);
    expect(card("Esquiva")!.getAttribute("aria-pressed")).toBe("false");
    tab(/Atributos/);
    fireEvent.change(screen.getByLabelText(/Destreza/), { target: { value: "13" } });
    tab(/Talentos & Equipamento/);
    search("esquiva");
    fireEvent.click(card("Esquiva")!);
    expect(card("Esquiva")!.getAttribute("aria-pressed")).toBe("true");
  });

  it("monge: Ataque Atordoante como adicional dispensa Des/Sab/BBA; depois Agarrar Aprimorado volta a exigir Des 13", () => {
    render(<Dnd35CharacterCreatorModal isOpen onClose={() => {}} onCharacterCreated={() => {}} />);
    tab(/Raça & Classe/);
    pickClass("Monge");
    tab(/Talentos & Equipamento/);
    search("atordoante");
    expect(card("Ataque Atordoante")!.textContent).toContain("dispensa pré-requisitos");
    fireEvent.click(card("Ataque Atordoante")!);
    expect(card("Ataque Atordoante")!.getAttribute("aria-pressed")).toBe("true");
    search("agarrar");
    fireEvent.click(card("Agarrar Aprimorado")!);
    expect(card("Agarrar Aprimorado")!.getAttribute("aria-pressed")).toBe("false");
  });

  it("perícia escolhida na criação conta: Combate Montado exige 1 graduação em Cavalgar", () => {
    render(<Dnd35CharacterCreatorModal isOpen onClose={() => {}} onCharacterCreated={() => {}} />);
    tab(/Talentos & Equipamento/);
    search("combate montado");
    expect(card("Combate Montado")!.textContent).toContain("Falta: 1 graduação em Cavalgar");
    tab(/PV & Perícias/);
    fireEvent.click(screen.getByText("Cavalgar").closest("label")!.querySelector("input")!);
    tab(/Talentos & Equipamento/);
    search("combate montado");
    expect(card("Combate Montado")!.textContent).not.toContain("Falta");
  });
});
