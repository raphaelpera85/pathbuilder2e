/**
 * Defensores da Fé (livro 3.0 em português), cap. 4, pp. 76-77: "Novas Magias de Clérigo/Paladino/Druida/Ranger".
 * Só nomes por nível, como impressos (a descrição de uma linha de cada magia está em dnd35DefensoresSpells.ts).
 * Regras da versão 3.0: conferir com o PHB/DMG 3.5 antes de usar no criador.
 */
export type DefensoresSpellList = { class: "Clérigo" | "Paladino" | "Druida" | "Ranger"; level: number; spells: string[] };

export const DEFENSORES_SPELL_LISTS: DefensoresSpellList[] = [
  { class: "Clérigo", level: 1, spells: ["Abençoar Funeral"] },
  { class: "Clérigo", level: 2, spells: ["Chamas Divinas", "Rajada de Facas", "Zéfiro Celestial"] },
  {
    class: "Clérigo",
    level: 3,
    spells: ["Água Doce", "Chamas da Fé", "Estacas", "Laço Telepático Menor", "Maldição dos Brutos", "Máscara Bestial", "Mira Abençoada", "Rajada de Espadas", "Trama de Espinhos", "Visão Seqüencial"],
  },
  { class: "Clérigo", level: 4, spells: ["Arma da Divindade", "Caçador", "Castigar", "Garras Bestiais", "Recital", "Tempestade Divina", "Tolerância Infinita", "Visão Climática"] },
  { class: "Clérigo", level: 5, spells: ["Agilidade Divina", "Coração de Urso", "Esturricar"] },
  { class: "Clérigo", level: 7, spells: ["Ira Justa dos Fiéis", "Onda de Lodo"] },
  { class: "Clérigo", level: 8, spells: ["Aracnídeo Mental", "Corrente de Caos"] },
  { class: "Paladino", level: 1, spells: ["Sacrifício Divino"] },
  { class: "Paladino", level: 2, spells: ["Maldição dos Brutos", "Mira Abençoada", "Zelo"] },
  { class: "Paladino", level: 4, spells: ["Arma da Divindade", "Aspecto da Divindade Menor"] },
  { class: "Druida", level: 2, spells: ["Água Doce", "Arbustos", "Máscara Bestial", "Trama de Espinhos"] },
  { class: "Druida", level: 3, spells: ["Caçador", "Estacas", "Garras Bestiais", "Visão Climática"] },
  { class: "Druida", level: 4, spells: ["Coração de Urso", "Esturricar", "Visão Seqüencial"] },
  { class: "Druida", level: 7, spells: ["Onda de Lodo"] },
  { class: "Ranger", level: 2, spells: ["Trama de Espinhos"] },
];
