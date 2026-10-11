// Tabelas de invocação transcritas visualmente do Livro do Jogador, pp. 248 e 250.
// A marca aquática e as habilidades especiais são notas da tabela, não parte do nome.

export interface Dnd35SummonedCreature {
  name: string;
  /** Abreviação de tendência tal como impressa na edição brasileira. */
  alignment: string;
  aquaticOnly?: boolean;
  special?: string;
}

export interface Dnd35SummonListLevel {
  level: number;
  creatures: Dnd35SummonedCreature[];
}

export interface Dnd35SummonTable {
  id: "nature" | "creatures";
  name: string;
  sourcePage: 248 | 250;
  defaultAlignment?: string;
  footnotes: string[];
  levels: Dnd35SummonListLevel[];
}

const n = (name: string, alignment = "N", aquaticOnly = false, special?: string): Dnd35SummonedCreature => ({
  name, alignment, ...(aquaticOnly ? { aquaticOnly: true } : {}), ...(special ? { special } : {}),
});
const c = (name: string, alignment: string, aquaticOnly = false): Dnd35SummonedCreature => ({
  name, alignment, ...(aquaticOnly ? { aquaticOnly: true } : {}),
});
const levels = (rows: Dnd35SummonedCreature[][]): Dnd35SummonListLevel[] => rows.map((creatures, index) => ({ level: index + 1, creatures }));

export const DND35_SUMMON_TABLES: Record<Dnd35SummonTable["id"], Dnd35SummonTable> = {
  nature: {
    id: "nature",
    name: "Aliados da Natureza",
    sourcePage: 248,
    defaultAlignment: "N",
    footnotes: ["Pode lançar a Dança Irresistível de Otto.", "Pode ser invocado apenas em ambientes aquáticos."],
    levels: levels([
      [
        n("Rato atroz"), n("Águia (animal)"), n("Macaco (animal)"), n("Polvo (animal)", "N", true),
        n("Coruja (animal)"), n("Golfinho (animal)", "N", true), n("Cobra, víbora Pequena (animal)"), n("Lobo (animal)"),
      ],
      [
        n("Urso negro (animal)"), n("Crocodilo (animal)"), n("Texugo atroz"), n("Morcego atroz"),
        n("Elemental Pequeno (qualquer)"), n("Hipogrifo"), n("Tubarão Médio (animal)", "N", true),
        n("Cobra, víbora Média (animal)"), n("Lula (animal)", "N", true), n("Carcaju (animal)"),
      ],
      [
        n("Gorila (animal)"), n("Arminho atroz"), n("Lobo atroz"), n("Águia Gigante", "NB"), n("Leão (animal)"),
        n("Coruja Gigante", "NB"), n("Sátiro", "CN", false, "Sem flauta."), n("Tubarão Grande (animal)", "N", true),
        n("Cobra constritora (animal)"), n("Cobra, víbora Grande (animal)"), n("Thoqqua"),
      ],
      [
        n("Gavião Seta Jovem"), n("Urso Marrom (animal)"), n("Crocodilo Gigante (animal)"), n("Deinonicus (dinossauro)"),
        n("Gorila atroz"), n("Javali atroz"), n("Carcaju atroz"), n("Elemental Médio (qualquer)"),
        n("Salamandra, irmã da chama", "NM"), n("Leão Marinho (animal)", "N", true),
        n("Tubarão Enorme (animal)", "N", true), n("Cobra, víbora Enorme (animal)"), n("Tigre (animal)"),
        n("Tojanida Jovem", "N", true), n("Unicórnio", "CB"), n("Xorn Menor"),
      ],
      [
        n("Gavião Seta Adulto"), n("Urso polar (animal)"), n("Leão atroz"), n("Elasmossauro (dinossauro)", "N", true),
        n("Elemental Grande (qualquer)"), n("Grifo"), n("Janni (gênio)"), n("Rinoceronte (animal)"),
        n("Sátiro", "CN", false, "Com flauta."), n("Cobra constritora gigante (animal)"), n("Nixie (sprite)"),
        n("Tojanida Adulto", "N", true), n("Baleia orca (animal)", "N", true),
      ],
      [
        n("Urso atroz"), n("Elemental Enorme (qualquer)"), n("Elefante (animal)"), n("Girallon"),
        n("Megarraptor (dinossauro)"), n("Polvo gigante (animal)", "N", true),
        n("Pixie (sprite)", "NB", false, "Pode lançar a Dança Irresistível de Otto; sem flechas especiais."),
        n("Salamandra Média", "NM"), n("Baleia azul (animal)", "N", true), n("Xorn Médio"),
      ],
      [
        n("Gavião Seta Ancião"), n("Tigre atroz"), n("Elemental maior (qualquer)"), n("Djinni (gênio)", "NB"),
        n("Caçador invisível"), n("Pixie (sprite)", "NB", false, "Pode lançar Dança Irresistível de Otto; com flechas soníferas."),
        n("Lula gigante (animal)", "N", true), n("Tricerátops (dinossauro)"), n("Tiranossauro (dinossauro)"),
        n("Baleia cachalote (animal)", "N", true), n("Xorn Ancião"),
      ],
      [
        n("Tubarão atroz", "N", true), n("Pássaro Roca"), n("Salamandra Nobre", "NN"), n("Tojanida Anciã"),
      ],
      [
        n("Elemental Ancião"), n("Grig (sprite)", "NB", false, "Pode lançar Dança Irresistível de Otto; com violino."),
        n("Pixie (sprite)", "NB", false, "Pode lançar Dança Irresistível de Otto; com flechas soníferas e de perda de memória."),
        n("Unicórnio"), n("Arauto celestial"),
      ],
    ]),
  },
  creatures: {
    id: "creatures",
    name: "Invocar Criaturas",
    sourcePage: 250,
    footnotes: ["Só pode ser invocado apenas em ambientes aquáticos ou aguacentos."],
    levels: levels([
      [
        c("Cão celestial", "LB"), c("Coruja celestial", "LB"), c("Vaga-lume gigante celestial", "NB"),
        c("Golfinho celestial", "NB", true), c("Texugo celestial", "CB"), c("Macaco celestial", "CB"),
        c("Rato atroz abissal", "LM"), c("Corvo abissal", "LM"), c("Centopéia monstruosa abissal, Média", "NM"),
        c("Falcão abissal", "CM"), c("Aranha monstruosa abissal, Pequena", "CM"),
        c("Polvo abissal", "CM", true), c("Cobra abissal, serpente Pequena", "CM"),
      ],
      [
        c("Abelha gigante celestial", "LB"), c("Besouro gigante celestial", "NB"), c("Cachorro de montaria celestial", "NB"),
        c("Águia celestial", "CB"), c("Lêmure (diabo)", "LM"), c("Lula abissal", "LM", true), c("Lobo abissal", "LM"),
        c("Centopéia monstruosa abissal, Grande", "NM"), c("Escorpião monstruoso abissal, Médio", "NM"),
        c("Tubarão abissal, Médio", "NM", true), c("Aranha monstruosa abissal, Média", "CM"),
        c("Cobra abissal, serpente Média", "CM"),
      ],
      [
        c("Urso negro celestial", "LB"), c("Bisão celestial", "NB"), c("Texugo atroz celestial", "CB"),
        c("Hipogrifo celestial", "CB"), c("Elemental Pequeno (qualquer um)", "N"), c("Gorila abissal", "LM"),
        c("Arminho atroz abissal", "LM"), c("Cão infernal", "LM"), c("Cobra abissal, constritora", "LM"),
        c("Javali abissal", "NM"), c("Morcego atroz abissal", "NM"), c("Centopéia monstruosa abissal, Enorme", "NM"),
        c("Crocodilo abissal", "CM"), c("Dretch (demônio)", "CM"), c("Cobra abissal, serpente Grande", "CM"),
        c("Carcaju abissal", "CM"),
      ],
      [
        c("Arconte Luminar", "LB"), c("Coruja gigante celestial", "LB"), c("Águia gigante celestial", "CB"),
        c("Leão celestial", "CB"), c("Mephit (qualquer um)", "N"), c("Lobo atroz abissal", "LM"),
        c("Vespa gigante abissal", "LM"), c("Louva-a-deus gigante abissal", "NM"),
        c("Tubarão abissal, Grande", "NM", true), c("Cão yeth", "NM"),
        c("Aranha monstruosa abissal, Grande", "CM"), c("Cobra abissal, serpente Enorme", "CM"), c("Uivante", "CM"),
      ],
      [
        c("Arconte Guardião (celestial)", "LB"), c("Urso marrom celestial", "LB"), c("Gafanhoto gigante celestial", "NB"),
        c("Leão marinho celestial", "NB", true), c("Grifo celestial", "CB"), c("Elemental Médio (qualquer um)", "N"),
        c("Achaierai", "LM"), c("Diabo barbado", "LM"), c("Deinonychus abissal", "LM"),
        c("Gorila atroz abissal", "LM"), c("Javali atroz abissal", "NM"), c("Tubarão abissal, Enorme", "NM", true),
        c("Escorpião monstruoso abissal, Grande", "NM"), c("Mastim das sombras", "NM"),
        c("Carcaju atroz abissal", "CM"), c("Crocodilo gigante abissal", "CM"), c("Tigre abissal", "CM"),
      ],
      [
        c("Urso atroz celestial", "LB"), c("Baleia orca celestial", "NB", true), c("Bralani (eladrin)", "CB"),
        c("Leão atroz celestial", "CB"), c("Elemental Grande (qualquer um)", "N"), c("Janni (gênio)", "N"),
        c("Fera do caos", "CN"), c("Diabo, correntes", "LM"), c("Xill", "LM"),
        c("Centopéia monstruosa abissal, Imensa", "NM"), c("Rinoceronte abissal", "NM"),
        c("Elasmossauro abissal", "CM", true), c("Aranha monstruosa abissal, Enorme", "CM"),
        c("Cobra abissal, constritora gigante", "CM"),
      ],
      [
        c("Elefante celestial", "LB"), c("Guardião Avoral", "NB"), c("Baleia celestial", "NB", true),
        c("Djinni (gênio)", "CB"), c("Elemental Enorme (qualquer um)", "N"), c("Caçador invisível", "N"),
        c("Slaad vermelho", "CN"), c("Diabo, ósseo", "LM"), c("Megarraptor abissal", "LM"),
        c("Escorpião monstruoso abissal, Enorme", "NM"), c("Babau (demônio)", "CM"),
        c("Polvo gigante abissal", "CM", true), c("Girallon abissal", "CM"),
      ],
      [
        c("Urso atroz celestial", "LB"), c("Baleia cachalote celestial", "NB", true), c("Tricerátops celestial", "NB"),
        c("Lillend", "CB"), c("Elemental maior (qualquer um)", "N"), c("Slaad azul", "CN"),
        c("Lula gigante abissal", "LM", true), c("Gato infernal", "LM"),
        c("Centopéia monstruosa abissal, Colossal", "NM"), c("Tigre atroz abissal", "CM"),
        c("Aranha monstruosa abissal, Imensa", "CM"), c("Tiranossauro abissal", "CM"), c("Vrock (demônio)", "CM"),
      ],
      [
        c("Couatl", "LB"), c("Leonal (guardinal)", "NB"), c("Pássaro roca celestial", "CB"),
        c("Elemental ancião (qualquer um)", "N"), c("Slaad verde", "CN"), c("Diabo, barbado", "LM"),
        c("Tubarão atroz abissal", "NM", true), c("Escorpião monstruoso abissal, Imenso", "NM"),
        c("Bruxa da noite", "NM"), c("Bebilith (demônio)", "CM"), c("Aranha monstruosa abissal, Colossal", "CM"),
        c("Hezrou (demônio)", "CM"),
      ],
    ]),
  },
};

export function getDnd35SummonTableForSpell(name: string): Dnd35SummonTable["id"] | undefined {
  if (/^Invocar Aliado da Natureza [IVX]+$/.test(name)) return "nature";
  if (/^Invocar Criaturas [IVX]+$/.test(name)) return "creatures";
  return undefined;
}
