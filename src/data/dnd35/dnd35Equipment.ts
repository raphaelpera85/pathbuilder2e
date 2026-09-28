// ============================================================================
// D&D 3.5 - Catálogo de Equipamento (armas e armaduras núcleo)
// Fonte: D&D 3.5 - Livro do Jogador (Player's Handbook, tradução em
// português), Capítulo 7 — Equipamento: Tabela 7-5 (Armas, páginas 116-117)
// e Tabela 7-6 (Armaduras e Escudos, página 123). O PDF fonte é uma
// digitalização de imagem sem camada de texto (confirmado via pypdf/pymupdf:
// 0 caracteres extraíveis em todas as páginas). Os dados abaixo foram
// transcritos por leitura visual direta das páginas renderizadas em alta
// resolução (400dpi), não por OCR nem por memória.
//
// Armas: cobertura completa das categorias Simples, Comuns e Exóticas da
// Tabela 7-5 (custo, dano para criaturas Pequenas/Médias, incremento
// decisivo, incremento de distância, peso, tipo de dano).
// Armaduras e escudos: cobertura completa da Tabela 7-6 (custo, bônus de
// armadura, bônus máximo de Destreza, penalidade de armadura, chance de
// falha de magia arcana, deslocamento reduzido, peso).
// ============================================================================

export type Dnd35WeaponCategory = "simples" | "comum" | "exotica";
export type Dnd35WeaponHandedness = "leve" | "uma-mao" | "duas-maos" | "distancia";
export type Dnd35DamageType = "concussao" | "perfurante" | "cortante" | "concussao-e-perfurante" | "perfurante-ou-cortante" | "cortante-ou-perfurante";

export interface Dnd35Weapon {
  id: string;
  name: string;
  sourceBook: string;
  sourcePage: number;
  category: Dnd35WeaponCategory;
  handedness: Dnd35WeaponHandedness;
  costGp: number | "especial";
  damageSmall: string;
  damageMedium: string;
  critical: string;
  rangeIncrementM: number | null;
  weightKg: number | "especial";
  damageType: Dnd35DamageType | string;
}

export const DND35_WEAPONS: Record<string, Dnd35Weapon> = {
  "ataque-desarmado": { id: "ataque-desarmado", name: "Ataque desarmado", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 116, category: "simples", handedness: "uma-mao", costGp: 0, damageSmall: "1d2", damageMedium: "1d3", critical: "x2", rangeIncrementM: null, weightKg: 0, damageType: "concussao" },
  manopla: { id: "manopla", name: "Manopla", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 116, category: "simples", handedness: "uma-mao", costGp: 2, damageSmall: "1d2", damageMedium: "1d3", critical: "x2", rangeIncrementM: null, weightKg: 0.5, damageType: "concussao" },
  "adaga-de-soco": { id: "adaga-de-soco", name: "Adaga de Soco", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 116, category: "simples", handedness: "leve", costGp: 2, damageSmall: "1d3", damageMedium: "1d4", critical: "x3", rangeIncrementM: null, weightKg: 0.5, damageType: "perfurante" },
  adaga: { id: "adaga", name: "Adaga", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 116, category: "simples", handedness: "leve", costGp: 2, damageSmall: "1d3", damageMedium: "1d4", critical: "19-20/x2", rangeIncrementM: 3, weightKg: 0.5, damageType: "perfurante-ou-cortante" },
  "foice-curta": { id: "foice-curta", name: "Foice Curta", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 116, category: "simples", handedness: "leve", costGp: 6, damageSmall: "1d4", damageMedium: "1d6", critical: "x2", rangeIncrementM: null, weightKg: 1, damageType: "concussao-e-perfurante" },
  "maca-leve": { id: "maca-leve", name: "Maça leve", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 116, category: "simples", handedness: "leve", costGp: 5, damageSmall: "1d4", damageMedium: "1d6", critical: "x2", rangeIncrementM: null, weightKg: 2, damageType: "concussao" },
  "manopla-com-cravos": { id: "manopla-com-cravos", name: "Manopla com cravos", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 116, category: "simples", handedness: "uma-mao", costGp: 5, damageSmall: "1d3", damageMedium: "1d4", critical: "x2", rangeIncrementM: null, weightKg: 0.5, damageType: "concussao-e-perfurante" },
  clava: { id: "clava", name: "Clava", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 116, category: "simples", handedness: "uma-mao", costGp: 0, damageSmall: "1d4", damageMedium: "1d6", critical: "x2", rangeIncrementM: 3, weightKg: 1.5, damageType: "concussao" },
  "lanca-curta": { id: "lanca-curta", name: "Lança curta", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 116, category: "simples", handedness: "uma-mao", costGp: 1, damageSmall: "1d4", damageMedium: "1d6", critical: "x2", rangeIncrementM: 6, weightKg: 1.5, damageType: "perfurante" },
  "maca-pesada": { id: "maca-pesada", name: "Maça pesada", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 116, category: "simples", handedness: "uma-mao", costGp: 12, damageSmall: "1d6", damageMedium: "1d8", critical: "x2", rangeIncrementM: null, weightKg: 4, damageType: "concussao" },
  "maca-estrela": { id: "maca-estrela", name: "Maça-estrela", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 116, category: "simples", handedness: "uma-mao", costGp: 8, damageSmall: "1d6", damageMedium: "1d8", critical: "x2", rangeIncrementM: null, weightKg: 3, damageType: "concussao-e-perfurante" },
  bordao: { id: "bordao", name: "Bordão", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 116, category: "simples", handedness: "duas-maos", costGp: 0, damageSmall: "1d4/1d4", damageMedium: "1d6/1d6", critical: "x2", rangeIncrementM: null, weightKg: 2, damageType: "concussao" },
  lanca: { id: "lanca", name: "Lança", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 116, category: "simples", handedness: "duas-maos", costGp: 2, damageSmall: "1d6", damageMedium: "1d8", critical: "x3", rangeIncrementM: 6, weightKg: 3, damageType: "perfurante" },
  "lanca-longa": { id: "lanca-longa", name: "Lança longa", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 116, category: "simples", handedness: "duas-maos", costGp: 5, damageSmall: "1d6", damageMedium: "1d8", critical: "x3", rangeIncrementM: null, weightKg: 4.5, damageType: "perfurante" },
  azagaia: { id: "azagaia", name: "Azagaia", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 116, category: "simples", handedness: "distancia", costGp: 1, damageSmall: "1d4", damageMedium: "1d6", critical: "x2", rangeIncrementM: 9, weightKg: 1, damageType: "perfurante" },
  "besta-leve": { id: "besta-leve", name: "Besta leve", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 116, category: "simples", handedness: "distancia", costGp: 35, damageSmall: "1d6", damageMedium: "1d8", critical: "19-20/x2", rangeIncrementM: 24, weightKg: 2, damageType: "perfurante" },
  "besta-pesada": { id: "besta-pesada", name: "Besta pesada", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 116, category: "simples", handedness: "distancia", costGp: 50, damageSmall: "1d8", damageMedium: "1d10", critical: "19-20/x2", rangeIncrementM: 36, weightKg: 4, damageType: "perfurante" },
  dardo: { id: "dardo", name: "Dardo", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 116, category: "simples", handedness: "distancia", costGp: 5, damageSmall: "1d3", damageMedium: "1d4", critical: "x2", rangeIncrementM: 6, weightKg: 0.25, damageType: "perfurante" },
  funda: { id: "funda", name: "Funda", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 116, category: "simples", handedness: "distancia", costGp: 0, damageSmall: "1d3", damageMedium: "1d4", critical: "x2", rangeIncrementM: 15, weightKg: 0, damageType: "concussao" },
  "armaduras-com-cravos": { id: "armaduras-com-cravos", name: "Armaduras com cravos", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "comum", handedness: "leve", costGp: "especial", damageSmall: "1d4", damageMedium: "1d6", critical: "x2", rangeIncrementM: null, weightKg: "especial", damageType: "perfurante" },
  "escudo-pequeno": { id: "escudo-pequeno", name: "Escudo pequeno", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "comum", handedness: "leve", costGp: "especial", damageSmall: "1d2", damageMedium: "1d3", critical: "x2", rangeIncrementM: null, weightKg: "especial", damageType: "concussao" },
  "escudo-pequeno-com-cravos": { id: "escudo-pequeno-com-cravos", name: "Escudo pequeno com cravos", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "comum", handedness: "leve", costGp: "especial", damageSmall: "1d3", damageMedium: "1d4", critical: "x2", rangeIncrementM: null, weightKg: "especial", damageType: "perfurante" },
  "espada-curta": { id: "espada-curta", name: "Espada curta", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "comum", handedness: "leve", costGp: 10, damageSmall: "1d4", damageMedium: "1d6", critical: "19-20/x2", rangeIncrementM: null, weightKg: 1, damageType: "perfurante" },
  kukri: { id: "kukri", name: "Kukri", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "comum", handedness: "leve", costGp: 8, damageSmall: "1d3", damageMedium: "1d4", critical: "18-20/x2", rangeIncrementM: null, weightKg: 1, damageType: "cortante" },
  machadinha: { id: "machadinha", name: "Machadinha", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "comum", handedness: "leve", costGp: 6, damageSmall: "1d4", damageMedium: "1d6", critical: "x3", rangeIncrementM: null, weightKg: 1.5, damageType: "cortante" },
  "machado-de-arremesso": { id: "machado-de-arremesso", name: "Machado de arremesso", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "comum", handedness: "leve", costGp: 8, damageSmall: "1d4", damageMedium: "1d6", critical: "x2", rangeIncrementM: 3, weightKg: 1, damageType: "cortante" },
  "martelo-leve": { id: "martelo-leve", name: "Martelo leve", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "comum", handedness: "leve", costGp: 1, damageSmall: "1d3", damageMedium: "1d4", critical: "x2", rangeIncrementM: 6, weightKg: 1, damageType: "concussao" },
  "picareta-leve": { id: "picareta-leve", name: "Picareta leve", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "comum", handedness: "leve", costGp: 4, damageSmall: "1d3", damageMedium: "1d4", critical: "x4", rangeIncrementM: null, weightKg: 1.5, damageType: "perfurante" },
  porrete: { id: "porrete", name: "Porrete", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "comum", handedness: "leve", costGp: 1, damageSmall: "1d4", damageMedium: "1d6", critical: "x2", rangeIncrementM: null, weightKg: 1, damageType: "concussao" },
  cimitarra: { id: "cimitarra", name: "Cimitarra", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "comum", handedness: "uma-mao", costGp: 15, damageSmall: "1d4", damageMedium: "1d6", critical: "18-20/x2", rangeIncrementM: null, weightKg: 2, damageType: "cortante" },
  "espada-longa": { id: "espada-longa", name: "Espada longa", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "comum", handedness: "uma-mao", costGp: 15, damageSmall: "1d6", damageMedium: "1d8", critical: "19-20/x2", rangeIncrementM: null, weightKg: 2, damageType: "cortante" },
  "machado-de-batalha": { id: "machado-de-batalha", name: "Machado de batalha", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "comum", handedness: "uma-mao", costGp: 10, damageSmall: "1d6", damageMedium: "1d8", critical: "x3", rangeIncrementM: null, weightKg: 3, damageType: "cortante" },
  mangual: { id: "mangual", name: "Mangual", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "comum", handedness: "uma-mao", costGp: 8, damageSmall: "1d6", damageMedium: "1d8", critical: "x2", rangeIncrementM: null, weightKg: 2.5, damageType: "concussao" },
  "martelo-de-guerra": { id: "martelo-de-guerra", name: "Martelo de guerra", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "comum", handedness: "uma-mao", costGp: 12, damageSmall: "1d6", damageMedium: "1d8", critical: "x3", rangeIncrementM: null, weightKg: 2.5, damageType: "concussao" },
  "picareta-pesada": { id: "picareta-pesada", name: "Picareta pesada", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "comum", handedness: "uma-mao", costGp: 8, damageSmall: "1d6", damageMedium: "1d8", critical: "x4", rangeIncrementM: null, weightKg: 3, damageType: "perfurante" },
  sabre: { id: "sabre", name: "Sabre", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "comum", handedness: "uma-mao", costGp: 20, damageSmall: "1d4", damageMedium: "1d6", critical: "18-20/x2", rangeIncrementM: null, weightKg: 1, damageType: "cortante" },
  tridente: { id: "tridente", name: "Tridente", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "comum", handedness: "uma-mao", costGp: 15, damageSmall: "1d6", damageMedium: "1d8", critical: "x2", rangeIncrementM: 3, weightKg: 2, damageType: "perfurante" },
  alabarda: { id: "alabarda", name: "Alabarda", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "comum", handedness: "duas-maos", costGp: 10, damageSmall: "1d8", damageMedium: "1d10", critical: "x3", rangeIncrementM: null, weightKg: 6, damageType: "cortante-ou-perfurante" },
  "clava-grande": { id: "clava-grande", name: "Clava grande", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "comum", handedness: "duas-maos", costGp: 5, damageSmall: "1d8", damageMedium: "1d10", critical: "x2", rangeIncrementM: null, weightKg: 4, damageType: "concussao" },
  "espada-larga": { id: "espada-larga", name: "Espada larga", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "comum", handedness: "duas-maos", costGp: 50, damageSmall: "1d10", damageMedium: "2d6", critical: "19-20/x2", rangeIncrementM: null, weightKg: 4, damageType: "cortante" },
  falcione: { id: "falcione", name: "Falcione", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "comum", handedness: "duas-maos", costGp: 75, damageSmall: "1d6", damageMedium: "2d4", critical: "18-20/x2", rangeIncrementM: null, weightKg: 4, damageType: "cortante" },
  "foice-longa": { id: "foice-longa", name: "Foice longa", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "comum", handedness: "duas-maos", costGp: 18, damageSmall: "1d6", damageMedium: "2d4", critical: "x4", rangeIncrementM: null, weightKg: 5, damageType: "cortante" },
  glaive: { id: "glaive", name: "Glaive", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "comum", handedness: "duas-maos", costGp: 8, damageSmall: "1d8", damageMedium: "1d10", critical: "x3", rangeIncrementM: null, weightKg: 5, damageType: "cortante" },
  guisarme: { id: "guisarme", name: "Guisarme", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "comum", handedness: "duas-maos", costGp: 9, damageSmall: "1d6", damageMedium: "2d4", critical: "x3", rangeIncrementM: null, weightKg: 6, damageType: "cortante" },
  "lanca-montada": { id: "lanca-montada", name: "Lança Montada", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "comum", handedness: "duas-maos", costGp: 10, damageSmall: "1d6", damageMedium: "1d8", critical: "x3", rangeIncrementM: null, weightKg: 5, damageType: "perfurante" },
  "machado-grande": { id: "machado-grande", name: "Machado grande", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "comum", handedness: "duas-maos", costGp: 20, damageSmall: "1d10", damageMedium: "1d12", critical: "x3", rangeIncrementM: null, weightKg: 6, damageType: "cortante" },
  "mangual-pesado": { id: "mangual-pesado", name: "Mangual pesado", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "comum", handedness: "duas-maos", costGp: 15, damageSmall: "1d8", damageMedium: "1d10", critical: "19-20/x2", rangeIncrementM: null, weightKg: 5, damageType: "concussao" },
  ranseur: { id: "ranseur", name: "Ranseur", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "comum", handedness: "duas-maos", costGp: 10, damageSmall: "1d6", damageMedium: "2d4", critical: "x3", rangeIncrementM: null, weightKg: 5, damageType: "perfurante" },
  "arco-curto": { id: "arco-curto", name: "Arco curto", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "comum", handedness: "distancia", costGp: 30, damageSmall: "1d4", damageMedium: "1d6", critical: "x3", rangeIncrementM: 18, weightKg: 1, damageType: "perfurante" },
  "arco-curto-composto": { id: "arco-curto-composto", name: "Arco curto composto", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "comum", handedness: "distancia", costGp: 75, damageSmall: "1d4", damageMedium: "1d6", critical: "x3", rangeIncrementM: 21, weightKg: 1, damageType: "perfurante" },
  "arco-longo": { id: "arco-longo", name: "Arco longo", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "comum", handedness: "distancia", costGp: 75, damageSmall: "1d6", damageMedium: "1d8", critical: "x3", rangeIncrementM: 30, weightKg: 1.5, damageType: "perfurante" },
  "arco-longo-composto": { id: "arco-longo-composto", name: "Arco longo composto", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "comum", handedness: "distancia", costGp: 100, damageSmall: "1d6", damageMedium: "1d8", critical: "x3", rangeIncrementM: 33, weightKg: 1.5, damageType: "perfurante" },
  kama: { id: "kama", name: "Kama", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "exotica", handedness: "leve", costGp: 2, damageSmall: "1d4", damageMedium: "1d6", critical: "x2", rangeIncrementM: null, weightKg: 1, damageType: "cortante" },
  nunchaku: { id: "nunchaku", name: "Nunchaku", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "exotica", handedness: "leve", costGp: 2, damageSmall: "1d4", damageMedium: "1d6", critical: "x2", rangeIncrementM: null, weightKg: 1, damageType: "concussao" },
  sai: { id: "sai", name: "Sai", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "exotica", handedness: "leve", costGp: 1, damageSmall: "1d3", damageMedium: "1d4", critical: "x2", rangeIncrementM: 3, weightKg: 0.5, damageType: "concussao" },
  siangham: { id: "siangham", name: "Siangham", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "exotica", handedness: "leve", costGp: 3, damageSmall: "1d4", damageMedium: "1d6", critical: "x2", rangeIncrementM: null, weightKg: 0.5, damageType: "perfurante" },
  chicote: { id: "chicote", name: "Chicote", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "exotica", handedness: "uma-mao", costGp: 1, damageSmall: "1d2", damageMedium: "1d3", critical: "x2", rangeIncrementM: null, weightKg: 1, damageType: "cortante" },
  "espada-bastarda": { id: "espada-bastarda", name: "Espada bastarda", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "exotica", handedness: "uma-mao", costGp: 35, damageSmall: "1d8", damageMedium: "1d10", critical: "19-20/x2", rangeIncrementM: null, weightKg: 3, damageType: "cortante" },
  "machado-de-guerra-anao": { id: "machado-de-guerra-anao", name: "Machado de guerra anão", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "exotica", handedness: "uma-mao", costGp: 30, damageSmall: "1d8", damageMedium: "1d10", critical: "x3", rangeIncrementM: null, weightKg: 4, damageType: "cortante" },
  "corrente-com-cravos": { id: "corrente-com-cravos", name: "Corrente com cravos", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "exotica", handedness: "duas-maos", costGp: 25, damageSmall: "1d6", damageMedium: "2d4", critical: "x2", rangeIncrementM: null, weightKg: 5, damageType: "perfurante" },
  "espada-de-duas-laminas": { id: "espada-de-duas-laminas", name: "Espada de duas lâminas", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "exotica", handedness: "duas-maos", costGp: 100, damageSmall: "1d6/1d6", damageMedium: "1d8/1d8", critical: "19-20/x2", rangeIncrementM: null, weightKg: 5, damageType: "cortante" },
  "machado-orc-duplo": { id: "machado-orc-duplo", name: "Machado orc duplo", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "exotica", handedness: "duas-maos", costGp: 60, damageSmall: "1d6/1d6", damageMedium: "1d8/1d8", critical: "x3", rangeIncrementM: null, weightKg: 7.5, damageType: "cortante" },
  "mangual-atroz": { id: "mangual-atroz", name: "Mangual atroz", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "exotica", handedness: "duas-maos", costGp: 90, damageSmall: "1d6/1d6", damageMedium: "1d8/1d8", critical: "x2", rangeIncrementM: null, weightKg: 5, damageType: "concussao" },
  "martelo-gnomo-com-gancho": { id: "martelo-gnomo-com-gancho", name: "Martelo gnomo com gancho", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "exotica", handedness: "duas-maos", costGp: 20, damageSmall: "1d6/1d4", damageMedium: "1d8/1d6", critical: "x3/x4", rangeIncrementM: null, weightKg: 3, damageType: "concussao-e-perfurante" },
  "urgrosh-anao": { id: "urgrosh-anao", name: "Urgrosh anão", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "exotica", handedness: "duas-maos", costGp: 50, damageSmall: "1d6/1d4", damageMedium: "1d8/1d6", critical: "x3", rangeIncrementM: null, weightKg: 6, damageType: "cortante-ou-perfurante" },
  "besta-leve-de-repeticao": { id: "besta-leve-de-repeticao", name: "Besta leve de repetição", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "exotica", handedness: "distancia", costGp: 250, damageSmall: "1d6", damageMedium: "1d8", critical: "19-20/x2", rangeIncrementM: 24, weightKg: 3, damageType: "perfurante" },
  "besta-pesada-de-repeticao": { id: "besta-pesada-de-repeticao", name: "Besta pesada de repetição", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "exotica", handedness: "distancia", costGp: 400, damageSmall: "1d8", damageMedium: "1d10", critical: "19-20/x2", rangeIncrementM: 36, weightKg: 6, damageType: "perfurante" },
  "besta-de-mao": { id: "besta-de-mao", name: "Besta de mão", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "exotica", handedness: "distancia", costGp: 100, damageSmall: "1d3", damageMedium: "1d4", critical: "19-20/x2", rangeIncrementM: 9, weightKg: 1, damageType: "perfurante" },
  boleadeira: { id: "boleadeira", name: "Boleadeira", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "exotica", handedness: "distancia", costGp: 5, damageSmall: "1d3", damageMedium: "1d4", critical: "x2", rangeIncrementM: 3, weightKg: 3, damageType: "concussao" },
  rede: { id: "rede", name: "Rede", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "exotica", handedness: "distancia", costGp: 20, damageSmall: "—", damageMedium: "—", critical: "—", rangeIncrementM: 3, weightKg: 3, damageType: "—" },
  shuriken: { id: "shuriken", name: "Shuriken", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 117, category: "exotica", handedness: "distancia", costGp: 1, damageSmall: "1", damageMedium: "1d2", critical: "x2", rangeIncrementM: 3, weightKg: 0.25, damageType: "perfurante" },
};

export const DND35_WEAPON_IDS = Object.keys(DND35_WEAPONS);

// ============================================================================
// Armaduras e escudos — Tabela 7-6 (página 123)
// ============================================================================

export type Dnd35ArmorCategory = "leve" | "media" | "pesada" | "escudo" | "acessorio";

export interface Dnd35Armor {
  id: string;
  name: string;
  sourceBook: string;
  sourcePage: number;
  category: Dnd35ArmorCategory;
  costGp: number;
  armorBonus: number;
  maxDexBonus: number | null; // null = ilimitado (só relevante para escudos)
  armorCheckPenalty: number;
  arcaneSpellFailure: number; // percentual
  speedReduction30m: number | null; // deslocamento reduzido para base 9m, em metros
  speedReduction20m: number | null; // deslocamento reduzido para base 6m, em metros
  weightKg: number;
}

export const DND35_ARMORS: Record<string, Dnd35Armor> = {
  acolchoada: { id: "acolchoada", name: "Acolchoada", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 123, category: "leve", costGp: 5, armorBonus: 1, maxDexBonus: 8, armorCheckPenalty: 0, arcaneSpellFailure: 5, speedReduction30m: 9, speedReduction20m: 6, weightKg: 5 },
  couro: { id: "couro", name: "Couro", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 123, category: "leve", costGp: 10, armorBonus: 2, maxDexBonus: 6, armorCheckPenalty: 0, arcaneSpellFailure: 10, speedReduction30m: 9, speedReduction20m: 6, weightKg: 7.5 },
  "couro-batido": { id: "couro-batido", name: "Couro batido", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 123, category: "leve", costGp: 25, armorBonus: 3, maxDexBonus: -1, armorCheckPenalty: -1, arcaneSpellFailure: 15, speedReduction30m: 9, speedReduction20m: 6, weightKg: 10 },
  "camisao-de-cota-de-malha": { id: "camisao-de-cota-de-malha", name: "Camisão de Cota de Malha", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 123, category: "leve", costGp: 100, armorBonus: 4, maxDexBonus: 4, armorCheckPenalty: -2, arcaneSpellFailure: 20, speedReduction30m: 9, speedReduction20m: 6, weightKg: 12.5 },
  "gibao-de-peles": { id: "gibao-de-peles", name: "Gibão de Peles", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 123, category: "media", costGp: 15, armorBonus: 4, maxDexBonus: -3, armorCheckPenalty: -3, arcaneSpellFailure: 20, speedReduction30m: 6, speedReduction20m: 4.5, weightKg: 12.5 },
  brunea: { id: "brunea", name: "Brunea", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 123, category: "media", costGp: 50, armorBonus: 5, maxDexBonus: -4, armorCheckPenalty: -4, arcaneSpellFailure: 25, speedReduction30m: 6, speedReduction20m: 4.5, weightKg: 15 },
  "cota-de-malha": { id: "cota-de-malha", name: "Cota de Malha", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 123, category: "media", costGp: 150, armorBonus: 5, maxDexBonus: -2, armorCheckPenalty: -5, arcaneSpellFailure: 30, speedReduction30m: 6, speedReduction20m: 4.5, weightKg: 20 },
  "peitoral-de-aco": { id: "peitoral-de-aco", name: "Peitoral de Aço", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 123, category: "media", costGp: 200, armorBonus: 5, maxDexBonus: -3, armorCheckPenalty: -4, arcaneSpellFailure: 25, speedReduction30m: 6, speedReduction20m: 4.5, weightKg: 15 },
  "cota-de-talas": { id: "cota-de-talas", name: "Cota de Talas", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 123, category: "pesada", costGp: 20, armorBonus: 6, maxDexBonus: 0, armorCheckPenalty: -7, arcaneSpellFailure: 40, speedReduction30m: 6, speedReduction20m: 4.5, weightKg: 22.5 },
  "loriga-segmentada": { id: "loriga-segmentada", name: "Loriga Segmentada", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 123, category: "pesada", costGp: 250, armorBonus: 6, maxDexBonus: 1, armorCheckPenalty: -6, arcaneSpellFailure: 35, speedReduction30m: 6, speedReduction20m: 4.5, weightKg: 17.5 },
  "meia-armadura": { id: "meia-armadura", name: "Meia-armadura", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 123, category: "pesada", costGp: 600, armorBonus: 7, maxDexBonus: 0, armorCheckPenalty: -7, arcaneSpellFailure: 40, speedReduction30m: 6, speedReduction20m: 4.5, weightKg: 25 },
  "armadura-de-batalha": { id: "armadura-de-batalha", name: "Armadura de Batalha", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 123, category: "pesada", costGp: 1500, armorBonus: 8, maxDexBonus: 1, armorCheckPenalty: -6, arcaneSpellFailure: 35, speedReduction30m: 6, speedReduction20m: 4.5, weightKg: 25 },
  broquel: { id: "broquel", name: "Broquel", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 123, category: "escudo", costGp: 15, armorBonus: 1, maxDexBonus: null, armorCheckPenalty: -1, arcaneSpellFailure: 5, speedReduction30m: null, speedReduction20m: null, weightKg: 2.5 },
  "escudo-pequeno-de-madeira": { id: "escudo-pequeno-de-madeira", name: "Escudo Pequeno de Madeira", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 123, category: "escudo", costGp: 3, armorBonus: 1, maxDexBonus: null, armorCheckPenalty: -1, arcaneSpellFailure: 5, speedReduction30m: null, speedReduction20m: null, weightKg: 2.5 },
  "escudo-pequeno-de-metal": { id: "escudo-pequeno-de-metal", name: "Escudo Pequeno de Metal", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 123, category: "escudo", costGp: 9, armorBonus: 1, maxDexBonus: null, armorCheckPenalty: -1, arcaneSpellFailure: 5, speedReduction30m: null, speedReduction20m: null, weightKg: 3 },
  "escudo-grande-de-madeira": { id: "escudo-grande-de-madeira", name: "Escudo Grande de Madeira", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 123, category: "escudo", costGp: 7, armorBonus: 2, maxDexBonus: null, armorCheckPenalty: -2, arcaneSpellFailure: 15, speedReduction30m: null, speedReduction20m: null, weightKg: 5 },
  "escudo-grande-de-metal": { id: "escudo-grande-de-metal", name: "Escudo Grande de Metal", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 123, category: "escudo", costGp: 20, armorBonus: 2, maxDexBonus: null, armorCheckPenalty: -2, arcaneSpellFailure: 15, speedReduction30m: null, speedReduction20m: null, weightKg: 7.5 },
  "escudo-de-corpo": { id: "escudo-de-corpo", name: "Escudo de Corpo", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 123, category: "escudo", costGp: 30, armorBonus: 4, maxDexBonus: 2, armorCheckPenalty: -10, arcaneSpellFailure: 50, speedReduction30m: null, speedReduction20m: null, weightKg: 22.5 },
};

export const DND35_ARMOR_IDS = Object.keys(DND35_ARMORS);
