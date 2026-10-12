/**
 * Defensores da Fé (livro 3.0 em português), cap. 1, pp. 12-14: Montarias Especiais do paladino (Tabelas 1-1, 1-2 e 1-3).
 * Lidas da imagem em resolução reduzida; regras 3.0: conferir com o PHB 3.5 antes de usar no criador.
 * O texto corrido (variação de montarias, velhice, dragões) ainda não foi transcrito.
 */
export type DefensoresMount = {
  /** Nível mínimo do paladino para convocar a montaria. */
  paladinLevel: 5 | 6 | 7 | 8;
  name: string;
  strength: number;
  /** Deslocamento de vôo (manobrabilidade) ou null se não voa. */
  flying: string | null;
  /** Carga máxima em kg. Montarias voadoras trazem duas linhas: voando e no solo. */
  loadKg: number;
  /** Carga em solo, para montarias capazes de voar (segunda linha da tabela). */
  groundLoadKg?: number;
  /** "**" = apenas paladinos aquáticos; † = unicórnios só aceitam amazonas humanas e élficas; * = capaz de voar e se deslocar no solo. */
  note?: "voador" | "aquático" | "unicórnio";
};

/** Tabela 1-1: paladino Médio. */
export const DEFENSORES_MOUNTS_MEDIUM: DefensoresMount[] = [
  { paladinLevel: 5, name: "Camelo", strength: 18, flying: null, loadKg: 450 },
  { paladinLevel: 5, name: "Cavalo de guerra, pesado", strength: 18, flying: null, loadKg: 450 },
  { paladinLevel: 5, name: "Cavalo de guerra, leve", strength: 16, flying: null, loadKg: 345 },
  { paladinLevel: 6, name: "Cavalo de guerra celestial, pesado", strength: 18, flying: null, loadKg: 450 },
  { paladinLevel: 6, name: "Cavalo de guerra celestial, leve", strength: 16, flying: null, loadKg: 345 },
  { paladinLevel: 6, name: "Lobo atroz", strength: 25, flying: null, loadKg: 1200 },
  { paladinLevel: 6, name: "Hipogrifo", strength: 18, flying: "33 m (médio)", loadKg: 150, groundLoadKg: 450, note: "voador" },
  { paladinLevel: 6, name: "Aranha monstruosa, Grande", strength: 15, flying: null, loadKg: 300 },
  { paladinLevel: 6, name: "Tubarão, Grande", strength: 17, flying: null, loadKg: 260, note: "aquático" },
  { paladinLevel: 6, name: "Unicórnio", strength: 20, flying: null, loadKg: 600, note: "unicórnio" },
  { paladinLevel: 7, name: "Javali atroz", strength: 27, flying: null, loadKg: 1560 },
  { paladinLevel: 7, name: "Carcajú atroz", strength: 22, flying: null, loadKg: 780 },
  { paladinLevel: 7, name: "Águia gigante", strength: 18, flying: "24 m (médio)", loadKg: 100 },
  { paladinLevel: 7, name: "Coruja gigante", strength: 18, flying: "21 m (médio)", loadKg: 100 },
  { paladinLevel: 7, name: "Pégaso", strength: 18, flying: "36 m (médio)", loadKg: 150, groundLoadKg: 450, note: "voador" },
  { paladinLevel: 7, name: "Rinoceronte", strength: 26, flying: null, loadKg: 1380 },
  { paladinLevel: 7, name: "Leão marinho", strength: 19, flying: null, loadKg: 350, note: "aquático" },
  { paladinLevel: 8, name: "Leão atroz", strength: 25, flying: null, loadKg: 1200 },
  { paladinLevel: 8, name: "Grifo", strength: 18, flying: "24 m (médio)", loadKg: 150, groundLoadKg: 450, note: "voador" },
];

/** Tabela 1-2: paladino Pequeno. */
export const DEFENSORES_MOUNTS_SMALL: DefensoresMount[] = [
  { paladinLevel: 5, name: "Aranha monstruosa, Média", strength: 11, flying: null, loadKg: 57.5 },
  { paladinLevel: 5, name: "Golfinho", strength: 11, flying: null, loadKg: 57.5, note: "aquático" },
  { paladinLevel: 5, name: "Cachorro de montaria", strength: 15, flying: null, loadKg: 150 },
  { paladinLevel: 5, name: "Tubarão, Médio", strength: 13, flying: null, loadKg: 75, note: "aquático" },
  { paladinLevel: 5, name: "Pônei de guerra", strength: 15, flying: null, loadKg: 150 },
  { paladinLevel: 6, name: "Cachorro de montaria celestial", strength: 15, flying: null, loadKg: 150 },
  { paladinLevel: 6, name: "Pônei de guerra celestial", strength: 15, flying: null, loadKg: 150 },
  { paladinLevel: 6, name: "Morcego atroz", strength: 17, flying: "12 m (bom)", loadKg: 86 },
  { paladinLevel: 6, name: "Texugo atroz", strength: 14, flying: null, loadKg: 131 },
  { paladinLevel: 6, name: "Arminho atroz", strength: 14, flying: null, loadKg: 131 },
  { paladinLevel: 6, name: "Lagarto gigante", strength: 17, flying: null, loadKg: 195 },
];

/**
 * Tabela 1-3: habilidades das montarias especiais. `levels` traz, por coluna de disponibilidade (nível mínimo 5º/6º/7º/8º ou dragão),
 * a faixa de níveis do paladino em que a montaria tem aquela linha de habilidades.
 */
export type DefensoresMountAbilityRow = {
  levels: { 5: string; 6: string; 7: string; 8: string; dragao: string };
  bonusHD: number;
  naturalArmor: number;
  strengthAdjust: number;
  int: number;
  special: string;
};

export const DEFENSORES_MOUNT_ABILITIES: DefensoresMountAbilityRow[] = [
  {
    levels: { 5: "5-7", 6: "6-8", 7: "7-9", 8: "8-10", dragao: "5-12" },
    bonusHD: 2, naturalArmor: 4, strengthAdjust: 1, int: 6,
    special: "Evasão Aprimorada, partilhar magias, vínculo empático, partilhar testes de resistência",
  },
  { levels: { 5: "8-10", 6: "9-11", 7: "10-12", 8: "11-13", dragao: "13-16" }, bonusHD: 4, naturalArmor: 6, strengthAdjust: 2, int: 7, special: "—" },
  { levels: { 5: "11-14", 6: "12-15", 7: "13-16", 8: "14-17", dragao: "17-19" }, bonusHD: 6, naturalArmor: 8, strengthAdjust: 3, int: 8, special: "Comando de criaturas de sua espécie" },
  { levels: { 5: "15-20", 6: "16-20", 7: "17-20", 8: "18-20", dragao: "20" }, bonusHD: 8, naturalArmor: 10, strengthAdjust: 4, int: 9, special: "Resistência à Magia" },
];
