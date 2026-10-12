/**
 * Defensores da Fé (livro 3.0 em português), cap. 1, p. 23: Tabelas 1-7 a 1-11 (preços de mercado de itens mágicos).
 * Só as tabelas; as descrições dos itens (pp. 21-26) ainda não foram transcritas.
 * Lidas da imagem em resolução reduzida; regras 3.0: conferir com o DMG 3.5 antes de usar no criador.
 */
export type DefensoresPriceEntry = { name: string; price: number; note?: string };

/** Tabela 1-7: habilidades especiais de armaduras e escudos; preço = modificador de bônus de melhoria. */
export const DEFENSORES_ARMOR_ABILITIES: { name: string; bonusModifier: number }[] = [
  { name: "Absorção", bonusModifier: 3 },
  { name: "Alada", bonusModifier: 2 },
  { name: "Antipatia", bonusModifier: 4 },
  { name: "Aquática", bonusModifier: 2 },
  { name: "Aquática c/ respirar na água", bonusModifier: 3 },
  { name: "Cegante", bonusModifier: 1 },
  { name: "Comando", bonusModifier: 2 },
  { name: "Controlar Mortos-vivos", bonusModifier: 4 },
  { name: "Convocação", bonusModifier: 1 },
  { name: "Drenar Energia", bonusModifier: 2 },
  { name: "Etérea, contato", bonusModifier: 4 },
  { name: "Etérea, pessoal", bonusModifier: 3 },
  { name: "Feitiço", bonusModifier: 3 },
  { name: "Glacial", bonusModifier: 3 },
  { name: "Luminosa", bonusModifier: 2 },
  { name: "Romper Mortos-vivos", bonusModifier: 2 },
  { name: "Sagrada", bonusModifier: 2 },
  { name: "Terror", bonusModifier: 2 },
  { name: "Velocidade", bonusModifier: 3 },
];

/** Tabela 1-8: armaduras e escudos específicos (preço em PO). */
export const DEFENSORES_SPECIFIC_ARMOR: DefensoresPriceEntry[] = [
  { name: "Armadura Azul das Montanhas da Névoa Cristalina", price: 20960 },
  { name: "Armadura do Cavalariço", price: 10670 },
  { name: "Armadura do Dragão Vermelho", price: 35200 },
  { name: "Aventail Dourado", price: 22200 },
  { name: "Cota de Talas da Estabilidade", price: 5845 },
];

/** Tabela 1-9: armas (preço em PO). */
export const DEFENSORES_SPECIFIC_WEAPONS: DefensoresPriceEntry[] = [
  { name: "Aguilhão do Domínio", price: 20980 },
  { name: "Bastão de Batalha", price: 35712 },
  { name: "Flecha da Visão Longínqua", price: 3507 },
  { name: "Virote da Demolição", price: 3157 },
];

/** Tabela 1-10: bastões. */
export const DEFENSORES_STAVES: DefensoresPriceEntry[] = [{ name: "Bastão da Autoridade", price: 20576 }];

/** Tabela 1-11: itens maravilhosos. */
export const DEFENSORES_WONDROUS_ITEMS: DefensoresPriceEntry[] = [
  { name: "Amuleto da Memória", price: 36000 },
  { name: "Amuleto do Portal", price: 64000 },
  { name: "Bacia da Contemplação", price: 44800 },
  { name: "Bainha Sagrada", price: 6400 },
  { name: "Braceletes do Aprisionamento", price: 10800 },
  { name: "Braço de Nyr", price: 12800 },
  { name: "Elmo da Visão", price: 91600 },
  { name: "Espelho da Revelação", price: 48000 },
  { name: "Manto da Floresta", price: 39392 },
  { name: "Marca da Apostasia", price: 38880 },
  { name: "Máscara da Morte", price: 23400 },
  { name: "Símbolo Sagrado Maior", price: 5040 },
  { name: "Tapa-olho Negro", price: 8800 },
];
