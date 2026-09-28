// ============================================================================
// D&D 3.5 - Catálogo de Itens Gerais (Equipamento de Aventura)
// Fonte: D&D 3.5 - Livro do Jogador (Player's Handbook, tradução em
// português), Capítulo 7 — Equipamento: Tabela 7-8 (Itens e Serviços,
// página 128). O PDF fonte é uma digitalização de imagem sem camada de
// texto (confirmado via pypdf/pymupdf: 0 caracteres extraíveis em todas as
// páginas). Os dados abaixo foram transcritos por leitura visual direta
// da página renderizada em alta resolução (400dpi), não por OCR nem por
// memória.
//
// A Tabela 7-8 tem 3 seções: Equipamento de Aventura, Itens e Substâncias
// Especiais, e Instrumentos de Classe e Kits de Perícia. Cobertura completa
// e exaustiva das 3 seções (a tabela cabe em uma única página de 4 colunas).
// Moeda: PC (peça de cobre), PP (peça de prata), PO (peça de ouro),
// 1 PO = 10 PP = 100 PC (Tabela 7-4, já documentada como conversão no
// dnd35Equipment.ts).
// ============================================================================

export type Dnd35GearSection = "equipamento_aventura" | "itens_substancias_especiais" | "instrumentos_e_kits";

export interface Dnd35GearItem {
  id: string;
  name: string;
  sourceBook: string;
  sourcePage: number;
  section: Dnd35GearSection;
  cost: string; // preservado como string por misturar PC/PP/PO na mesma tabela (ex.: "5 PP", "1.000 PO")
  weightKg: number | null; // null = "—" (peso desprezível/variável)
}

export const DND35_GEAR: Record<string, Dnd35GearItem> = {
  // --- Equipamento de Aventura (p. 128) ---
  "agulha-de-costura": { id: "agulha-de-costura", name: "Agulha de costura", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "5 PP", weightKg: null },
  "algemas-obra-prima": { id: "algemas-obra-prima", name: "Algemas (obra-prima)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "50 PO", weightKg: 1 },
  algemas: { id: "algemas", name: "Algemas", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "15 PO", weightKg: 1 },
  algibeira: { id: "algibeira", name: "Algibeira", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "1 PO", weightKg: 0.25 },
  anzol: { id: "anzol", name: "Anzol", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "1 PP", weightKg: null },
  "apito-de-advertencia": { id: "apito-de-advertencia", name: "Apito de advertência", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "8 PP", weightKg: null },
  ariete: { id: "ariete", name: "Aríete", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "10 PO", weightKg: 10 },
  arpeu: { id: "arpeu", name: "Arpéu", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "1 PO", weightKg: 2 },
  "balde-vazio": { id: "balde-vazio", name: "Balde (vazio)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "5 PP", weightKg: 1 },
  "barril-vazio": { id: "barril-vazio", name: "Barril (vazio)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "2 PO", weightKg: 15 },
  "bau-vazio": { id: "bau-vazio", name: "Baú (vazio)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "2 PO", weightKg: 12.5 },
  "caneco-de-ceramica": { id: "caneco-de-ceramica", name: "Caneco de cerâmica", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "2 PC", weightKg: 0.5 },
  "caneta-tinteiro": { id: "caneta-tinteiro", name: "Caneta tinteiro", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "1 PP", weightKg: null },
  cantil: { id: "cantil", name: "Cantil", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "1 PO", weightKg: 2 },
  "cesto-vazio": { id: "cesto-vazio", name: "Cesto (vazio)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "4 PP", weightKg: 0.5 },
  "cobertor-de-inverno": { id: "cobertor-de-inverno", name: "Cobertor de inverno", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "5 PP", weightKg: 1.5 },
  "corda-de-canhamo-15m": { id: "corda-de-canhamo-15m", name: "Corda de Cânhamo (15 m)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "1 PO", weightKg: 5 },
  "corda-de-seda-15m": { id: "corda-de-seda-15m", name: "Corda de seda (15 m)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "10 PO", weightKg: 2.5 },
  "corrente-3m": { id: "corrente-3m", name: "Corrente (3 m)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "30 PO", weightKg: 1 },
  "escada-3m": { id: "escada-3m", name: "Escada (3 m)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "5 PC", weightKg: 10 },
  esmeril: { id: "esmeril", name: "Esmeril", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "2 PC", weightKg: 0.5 },
  "espelho-de-metal-pequeno": { id: "espelho-de-metal-pequeno", name: "Espelho de metal pequeno", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "10 PO", weightKg: 0.25 },
  estrepes: { id: "estrepes", name: "Estrepes", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "1 PO", weightKg: 1 },
  "fechadura-muito-simples": { id: "fechadura-muito-simples", name: "Fechadura (muito simples)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "20 PO", weightKg: 0.5 },
  "fechadura-padrao": { id: "fechadura-padrao", name: "Fechadura (padrão)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "40 PO", weightKg: 0.5 },
  "fechadura-boa": { id: "fechadura-boa", name: "Fechadura (boa)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "80 PO", weightKg: 0.5 },
  "fechadura-incrivel": { id: "fechadura-incrivel", name: "Fechadura (incrível)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "150 PO", weightKg: 0.5 },
  "frasco-vazio": { id: "frasco-vazio", name: "Frasco (vazio)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "3 PC", weightKg: 0.75 },
  "garrafa-de-vinho-vidro": { id: "garrafa-de-vinho-vidro", name: "Garrafa de vinho (vidro)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "2 PO", weightKg: null },
  "giz-1-pedaco": { id: "giz-1-pedaco", name: "Giz (1 pedaço)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "1 PC", weightKg: null },
  "jarro-de-ceramica": { id: "jarro-de-ceramica", name: "Jarro de cerâmica", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "3 PC", weightKg: 4.5 },
  lampada: { id: "lampada", name: "Lâmpada", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "1 PO", weightKg: 0.5 },
  "lanterna-coberta": { id: "lanterna-coberta", name: "Lanterna coberta", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "7 PO", weightKg: 1 },
  "lanterna-furta-fogo": { id: "lanterna-furta-fogo", name: "Lanterna furta-fogo", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "12 PO", weightKg: 1.5 },
  "lenha-por-dia": { id: "lenha-por-dia", name: "Lenha (por dia)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "1 PC", weightKg: 10 },
  "lona-m2": { id: "lona-m2", name: "Lona (m²)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "1 PP", weightKg: 0.1 },
  luneta: { id: "luneta", name: "Luneta", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "1.000 PO", weightKg: 0.5 },
  marreta: { id: "marreta", name: "Marreta", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "1 PO", weightKg: 5 },
  martelo: { id: "martelo", name: "Martelo", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "5 PP", weightKg: 1 },
  "mochila-vazia": { id: "mochila-vazia", name: "Mochila (vazia)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "2 PO", weightKg: 1 },
  "oleo-500ml": { id: "oleo-500ml", name: "Óleo (500 ml)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "1 PP", weightKg: 0.5 },
  pa: { id: "pa", name: "Pá", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "2 PO", weightKg: 4 },
  "panela-de-ferro": { id: "panela-de-ferro", name: "Panela de ferro", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "5 PP", weightKg: 5 },
  "papel-folha": { id: "papel-folha", name: "Papel (folha)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "4 PP", weightKg: null },
  parafina: { id: "parafina", name: "Parafina", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "1 PO", weightKg: 0.5 },
  "pe-de-cabra": { id: "pe-de-cabra", name: "Pé de cabra", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "2 PO", weightKg: 2.5 },
  "pederneira-e-isqueiro": { id: "pederneira-e-isqueiro", name: "Pederneira e isqueiro", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "1 PO", weightKg: null },
  "pergaminho-folha": { id: "pergaminho-folha", name: "Pergaminho (folha)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "2 PP", weightKg: null },
  "picareta-de-mina": { id: "picareta-de-mina", name: "Picareta de mina", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "3 PO", weightKg: 5 },
  piton: { id: "piton", name: "Piton", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "1 PP", weightKg: 0.25 },
  "porta-mapas": { id: "porta-mapas", name: "Porta-mapas", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "1 PO", weightKg: 0.25 },
  "pote-de-ceramica": { id: "pote-de-ceramica", name: "Pote de cerâmica", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "2 PC", weightKg: 2.5 },
  "racoes-de-viagem-por-dia": { id: "racoes-de-viagem-por-dia", name: "Rações de viagem (por dia)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "5 PP", weightKg: 0.5 },
  "rede-de-pesca-5x5m": { id: "rede-de-pesca-5x5m", name: "Rede de pesca (5 x 5 m)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "4 PO", weightKg: 2.5 },
  "sabao-por-kg": { id: "sabao-por-kg", name: "Sabão (por kg)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "5 PP", weightKg: 0.5 },
  "saco-vazio": { id: "saco-vazio", name: "Saco (vazio)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "1 PP", weightKg: 0.25 },
  "saco-de-dormir": { id: "saco-de-dormir", name: "Saco de dormir", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "1 PP", weightKg: 2.5 },
  sinete: { id: "sinete", name: "Sinete", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "5 PO", weightKg: null },
  sino: { id: "sino", name: "Sino", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "1 PO", weightKg: null },
  "talha-ou-sisal": { id: "talha-ou-sisal", name: "Talha ou sisal", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "5 PO", weightKg: 2.5 },
  tenda: { id: "tenda", name: "Tenda", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "10 PO", weightKg: 10 },
  "tinta-vidro-30ml": { id: "tinta-vidro-30ml", name: "Tinta (vidro de 30 ml)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "8 PO", weightKg: null },
  tocha: { id: "tocha", name: "Tocha", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "1 PC", weightKg: 0.5 },
  "vara-3m": { id: "vara-3m", name: "Vara (3 m)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "2 PP", weightKg: 4 },
  vela: { id: "vela", name: "Vela", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "1 PC", weightKg: null },
  "vidro-para-tinta-ou-pocao": { id: "vidro-para-tinta-ou-pocao", name: "Vidro para tinta ou poção", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "equipamento_aventura", cost: "1 PO", weightKg: 0.05 },

  // --- Itens e Substâncias Especiais (p. 128) ---
  "acido-frasco": { id: "acido-frasco", name: "Ácido (frasco)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "itens_substancias_especiais", cost: "10 PO", weightKg: 0.5 },
  "agua-benta-frasco": { id: "agua-benta-frasco", name: "Água benta (frasco)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "itens_substancias_especiais", cost: "25 PO", weightKg: 0.5 },
  "antidoto-vidro": { id: "antidoto-vidro", name: "Antídoto (vidro)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "itens_substancias_especiais", cost: "50 PO", weightKg: null },
  "bastao-de-fumaca": { id: "bastao-de-fumaca", name: "Bastão de fumaça", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "itens_substancias_especiais", cost: "20 PO", weightKg: 0.25 },
  "bastao-solar": { id: "bastao-solar", name: "Bastão solar", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "itens_substancias_especiais", cost: "2 PO", weightKg: 0.5 },
  "bolsa-de-cola": { id: "bolsa-de-cola", name: "Bolsa de cola", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "itens_substancias_especiais", cost: "50 PO", weightKg: 2 },
  "fogo-alquimico-frasco": { id: "fogo-alquimico-frasco", name: "Fogo alquímico (frasco)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "itens_substancias_especiais", cost: "20 PO", weightKg: 0.5 },
  fosforo: { id: "fosforo", name: "Fósforo", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "itens_substancias_especiais", cost: "1 PO", weightKg: null },
  "pedra-trovao": { id: "pedra-trovao", name: "Pedra trovão", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "itens_substancias_especiais", cost: "30 PO", weightKg: 0.5 },
  "tocha-da-chama-eterna": { id: "tocha-da-chama-eterna", name: "Tocha da chama eterna", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "itens_substancias_especiais", cost: "110 PO", weightKg: 0.5 },

  // --- Instrumentos de Classe e Kits de Perícia (p. 128) ---
  ampulheta: { id: "ampulheta", name: "Ampulheta", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "instrumentos_e_kits", cost: "25 PO", weightKg: 0.5 },
  "azevinho-e-visco": { id: "azevinho-e-visco", name: "Azevinho e visco", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "instrumentos_e_kits", cost: "—", weightKg: null },
  "balanca-de-mercador": { id: "balanca-de-mercador", name: "Balança de mercador", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "instrumentos_e_kits", cost: "2 PO", weightKg: 0.5 },
  "bolsa-de-componentes-de-magia": { id: "bolsa-de-componentes-de-magia", name: "Bolsa de componentes de magia", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "instrumentos_e_kits", cost: "5 PO", weightKg: 1 },
  clepsidra: { id: "clepsidra", name: "Clepsidra", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "instrumentos_e_kits", cost: "1.000 PO", weightKg: 100 },
  "ferramenta-obra-prima": { id: "ferramenta-obra-prima", name: "Ferramenta (obra-prima)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "instrumentos_e_kits", cost: "50 PO", weightKg: 0.5 },
  "ferramenta-de-artesao-obra-prima": { id: "ferramenta-de-artesao-obra-prima", name: "Ferramenta de artesão (obra-prima)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "instrumentos_e_kits", cost: "55 PO", weightKg: 2.5 },
  "ferramenta-de-artesao": { id: "ferramenta-de-artesao", name: "Ferramenta de artesão", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "instrumentos_e_kits", cost: "5 PO", weightKg: 2.5 },
  "grimorio-de-mago-em-branco": { id: "grimorio-de-mago-em-branco", name: "Grimório de mago (em branco)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "instrumentos_e_kits", cost: "15 PO", weightKg: 1.5 },
  "instrumento-musical-obra-prima": { id: "instrumento-musical-obra-prima", name: "Instrumento musical (obra-prima)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "instrumentos_e_kits", cost: "100 PO", weightKg: 1.5 },
  "instrumento-musical-comum": { id: "instrumento-musical-comum", name: "Instrumento musical (comum)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "instrumentos_e_kits", cost: "5 PO", weightKg: 1.5 },
  "instrumentos-de-ladrao-obra-prima": { id: "instrumentos-de-ladrao-obra-prima", name: "Instrumentos de ladrão (obra-prima)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "instrumentos_e_kits", cost: "100 PO", weightKg: 1 },
  "instrumentos-de-ladrao": { id: "instrumentos-de-ladrao", name: "Instrumentos de ladrão", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "instrumentos_e_kits", cost: "30 PO", weightKg: 0.5 },
  "kit-de-disfarces": { id: "kit-de-disfarces", name: "Kit de disfarces", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "instrumentos_e_kits", cost: "50 PO", weightKg: 4 },
  "kit-de-escalada": { id: "kit-de-escalada", name: "Kit de escalada", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "instrumentos_e_kits", cost: "80 PO", weightKg: 2.5 },
  "kit-de-primeiros-socorros": { id: "kit-de-primeiros-socorros", name: "Kit de primeiros socorros", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "instrumentos_e_kits", cost: "50 PO", weightKg: 0.5 },
  "laboratorio-alquimico": { id: "laboratorio-alquimico", name: "Laboratório alquímico", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "instrumentos_e_kits", cost: "500 PO", weightKg: 20 },
  "lente-de-aumento": { id: "lente-de-aumento", name: "Lente de aumento", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "instrumentos_e_kits", cost: "100 PO", weightKg: null },
  "simbolo-sagrado-de-madeira": { id: "simbolo-sagrado-de-madeira", name: "Símbolo sagrado (de madeira)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "instrumentos_e_kits", cost: "1 PO", weightKg: null },
  "simbolo-sagrado-de-prata": { id: "simbolo-sagrado-de-prata", name: "Símbolo sagrado (de prata)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 128, section: "instrumentos_e_kits", cost: "25 PO", weightKg: 0.5 },
};

export const DND35_GEAR_IDS = Object.keys(DND35_GEAR);
