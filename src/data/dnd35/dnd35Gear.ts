// ============================================================================
// D&D 3.5 - Catálogo de Itens Gerais (Equipamento de Aventura)
// Fonte: D&D 3.5 - Livro do Jogador (Player's Handbook, tradução em
// português), Capítulo 7 — Equipamento: Tabela 7-8 (Itens e Serviços,
// páginas 128-129). O PDF fonte é uma digitalização de imagem sem camada de
// texto (confirmado via pypdf/pymupdf: 0 caracteres extraíveis em todas as
// páginas). Os dados abaixo foram transcritos por leitura visual direta
// das páginas renderizadas em alta resolução (400dpi), não por OCR nem por
// memória.
//
// A Tabela 7-8 tem as seções Equipamento de Aventura, Itens e Substâncias
// Especiais, Instrumentos de Classe e Kits de Perícia, Indumentária, Comida,
// Bebida e Hospedagem, Montarias e Equipamentos Relacionados, Transporte e
// Conjuração e Serviços. Cobertura completa das linhas tabeladas nas páginas
// 128-129.
// Moeda: PC (peça de cobre), PP (peça de prata), PO (peça de ouro),
// 1 PO = 10 PP = 100 PC (Tabela 7-4, já documentada como conversão no
// dnd35Equipment.ts).
// ============================================================================

export type Dnd35GearSection =
  | "equipamento_aventura"
  | "itens_substancias_especiais"
  | "instrumentos_e_kits"
  | "indumentaria"
  | "comida_bebida_hospedagem"
  | "montarias_equipamentos"
  | "transporte"
  | "conjuracao_servicos";

export interface Dnd35GearItem {
  id: string;
  name: string;
  sourceBook: string;
  sourcePage: number;
  section: Dnd35GearSection;
  cost: string; // preservado como string por misturar PC/PP/PO na mesma tabela (ex.: "5 PP", "1.000 PO")
  weightKg: number | null; // null = "—" (peso desprezível/variável)
  note?: string; // observação impressa na tabela (multiplicadores, notas de rodapé)
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

  // --- Indumentária (p. 129) ---
  "traje-de-artesao": { id: "traje-de-artesao", name: "Traje de artesão", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "indumentaria", cost: "1 PO", weightKg: 2 },
  "traje-de-clima-frio": { id: "traje-de-clima-frio", name: "Traje de clima frio", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "indumentaria", cost: "8 PO", weightKg: 3.5 },
  "traje-da-corte": { id: "traje-da-corte", name: "Traje da corte", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "indumentaria", cost: "30 PO", weightKg: 3 },
  "traje-de-entretenimento": { id: "traje-de-entretenimento", name: "Traje de entretenimento", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "indumentaria", cost: "3 PO", weightKg: 2 },
  "traje-de-explorador": { id: "traje-de-explorador", name: "Traje de explorador", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "indumentaria", cost: "10 PO", weightKg: 4 },
  "traje-de-monge": { id: "traje-de-monge", name: "Traje de monge", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "indumentaria", cost: "5 PO", weightKg: 1 },
  "traje-de-nobre": { id: "traje-de-nobre", name: "Traje de nobre", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "indumentaria", cost: "75 PO", weightKg: 5 },
  "traje-de-plebeu": { id: "traje-de-plebeu", name: "Traje de plebeu", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "indumentaria", cost: "1 PP", weightKg: 1 },
  "traje-de-sabio": { id: "traje-de-sabio", name: "Traje de sábio", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "indumentaria", cost: "5 PO", weightKg: 3 },
  "traje-de-viajante": { id: "traje-de-viajante", name: "Traje de viajante", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "indumentaria", cost: "1 PO", weightKg: 2.5 },
  "traje-real": { id: "traje-real", name: "Traje real", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "indumentaria", cost: "200 PO", weightKg: 7.5 },
  "vestimentas-de-clerigo": { id: "vestimentas-de-clerigo", name: "Vestimentas de clérigo", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "indumentaria", cost: "5 PO", weightKg: 3 },

  // --- Comida, Bebida e Hospedagem (p. 129) ---
  "acomodacao-pobre": { id: "acomodacao-pobre", name: "Acomodação em alojamento, por dia (pobre)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "comida_bebida_hospedagem", cost: "2 PP", weightKg: null },
  "acomodacao-padrao": { id: "acomodacao-padrao", name: "Acomodação em alojamento, por dia (padrão)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "comida_bebida_hospedagem", cost: "5 PP", weightKg: null },
  "acomodacao-bom": { id: "acomodacao-bom", name: "Acomodação em alojamento, por dia (bom)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "comida_bebida_hospedagem", cost: "2 PO", weightKg: null },
  "banquete-por-pessoa": { id: "banquete-por-pessoa", name: "Banquete (por pessoa)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "comida_bebida_hospedagem", cost: "10 PO", weightKg: null },
  "carne-pedaco": { id: "carne-pedaco", name: "Carne (pedaço)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "comida_bebida_hospedagem", cost: "3 PP", weightKg: 0.25 },
  "cerveja-caneca": { id: "cerveja-caneca", name: "Cerveja (caneca)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "comida_bebida_hospedagem", cost: "4 PC", weightKg: 0.5 },
  "cerveja-jarra": { id: "cerveja-jarra", name: "Cerveja (jarra)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "comida_bebida_hospedagem", cost: "2 PP", weightKg: 4 },
  "pao": { id: "pao", name: "Pão", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "comida_bebida_hospedagem", cost: "2 PC", weightKg: 0.25 },
  "queijo-pedaco": { id: "queijo-pedaco", name: "Queijo (pedaço)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "comida_bebida_hospedagem", cost: "1 PP", weightKg: 0.25 },
  "refeicao-pobre": { id: "refeicao-pobre", name: "Refeições, por dia (pobre)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "comida_bebida_hospedagem", cost: "1 PP", weightKg: null },
  "refeicao-padrao": { id: "refeicao-padrao", name: "Refeições, por dia (padrão)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "comida_bebida_hospedagem", cost: "3 PP", weightKg: null },
  "refeicao-bom": { id: "refeicao-bom", name: "Refeições, por dia (bom)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "comida_bebida_hospedagem", cost: "5 PP", weightKg: null },
  "vinho-normal-jarro": { id: "vinho-normal-jarro", name: "Vinho normal (jarro)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "comida_bebida_hospedagem", cost: "2 PP", weightKg: 3 },
  "vinho-bom-garrafa": { id: "vinho-bom-garrafa", name: "Vinho bom (garrafa)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "comida_bebida_hospedagem", cost: "10 PO", weightKg: 0.75 },

  // --- Montarias e Equipamentos Relacionados (p. 129) ---
  // A coluna Custo desta seção imprime só o número, sem unidade (PC/PP/PO);
  // o valor é preservado exatamente como impresso, sem inferir a moeda.
  "alforje": { id: "alforje", name: "Alforje", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "montarias_equipamentos", cost: "4", weightKg: 4 },
  "alimentacao-por-dia": { id: "alimentacao-por-dia", name: "Alimentação (por dia)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "montarias_equipamentos", cost: "5", weightKg: 5 },
  "armadura-de-montaria-criatura-grande": { id: "armadura-de-montaria-criatura-grande", name: "Armadura de montaria (criatura Grande)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "montarias_equipamentos", cost: "x4", weightKg: null, note: "Multiplicadores sobre a armadura base: custo x4, peso x2" },
  "armadura-de-montaria-criatura-media": { id: "armadura-de-montaria-criatura-media", name: "Armadura de montaria (criatura Média)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "montarias_equipamentos", cost: "x2", weightKg: null, note: "Multiplicadores sobre a armadura base: custo x2, peso x1" },
  "cachorro-de-montaria": { id: "cachorro-de-montaria", name: "Cachorro de montaria", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "montarias_equipamentos", cost: "150", weightKg: null },
  "cao-de-guarda": { id: "cao-de-guarda", name: "Cão de guarda", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "montarias_equipamentos", cost: "25", weightKg: null },
  "cavalo-de-guerra-leve": { id: "cavalo-de-guerra-leve", name: "Cavalo de guerra leve", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "montarias_equipamentos", cost: "105", weightKg: null },
  "cavalo-de-guerra-pesado": { id: "cavalo-de-guerra-pesado", name: "Cavalo de guerra pesado", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "montarias_equipamentos", cost: "400", weightKg: null },
  "cavalo-leve": { id: "cavalo-leve", name: "Cavalo leve", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "montarias_equipamentos", cost: "75", weightKg: null },
  "cavalo-pesado": { id: "cavalo-pesado", name: "Cavalo pesado", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "montarias_equipamentos", cost: "200", weightKg: null },
  "ponei-de-guerra": { id: "ponei-de-guerra", name: "Pônei de guerra", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "montarias_equipamentos", cost: "100", weightKg: null },
  "ponei": { id: "ponei", name: "Pônei", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "montarias_equipamentos", cost: "30", weightKg: null },
  "estabulo-por-dia": { id: "estabulo-por-dia", name: "Estábulo (por dia)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "montarias_equipamentos", cost: "5", weightKg: null },
  "freio-e-redeas": { id: "freio-e-redeas", name: "Freio e rédeas", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "montarias_equipamentos", cost: "2", weightKg: 0.5 },
  "jumento-ou-mula": { id: "jumento-ou-mula", name: "Jumento ou mula", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "montarias_equipamentos", cost: "8", weightKg: null },
  "sela-carga": { id: "sela-carga", name: "Sela (carga)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "montarias_equipamentos", cost: "5", weightKg: 7.5 },
  "sela-militar": { id: "sela-militar", name: "Sela (militar)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "montarias_equipamentos", cost: "20", weightKg: 15 },
  "sela-montaria": { id: "sela-montaria", name: "Sela (montaria)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "montarias_equipamentos", cost: "10", weightKg: 12.5 },
  "sela-exotica-carga": { id: "sela-exotica-carga", name: "Sela exótica (carga)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "montarias_equipamentos", cost: "15", weightKg: 10 },
  "sela-exotica-militar": { id: "sela-exotica-militar", name: "Sela exótica (militar)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "montarias_equipamentos", cost: "60", weightKg: 20 },
  "sela-exotica-montaria": { id: "sela-exotica-montaria", name: "Sela exótica (montaria)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "montarias_equipamentos", cost: "30", weightKg: 15 },

  // --- Transporte (p. 129) ---
  "barco-a-remo": { id: "barco-a-remo", name: "Barco a remo", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "transporte", cost: "50 PO", weightKg: 50 },
  "remo": { id: "remo", name: "Remo", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "transporte", cost: "2 PO", weightKg: 5 },
  "barcaca": { id: "barcaca", name: "Barcaça", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "transporte", cost: "3.000 PO", weightKg: null },
  "carroca": { id: "carroca", name: "Carroça", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "transporte", cost: "35 PO", weightKg: 200 },
  "carruagem": { id: "carruagem", name: "Carruagem", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "transporte", cost: "100 PO", weightKg: 300 },
  "charrete": { id: "charrete", name: "Charrete", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "transporte", cost: "15 PO", weightKg: 100 },
  "galeao": { id: "galeao", name: "Galeão", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "transporte", cost: "30.000 PO", weightKg: null },
  "navio-de-guerra": { id: "navio-de-guerra", name: "Navio de guerra", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "transporte", cost: "25.000 PO", weightKg: null },
  "navio": { id: "navio", name: "Navio", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "transporte", cost: "10.000 PO", weightKg: null },
  "treno": { id: "treno", name: "Trenó", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "transporte", cost: "20 PO", weightKg: 150 },
  "veleiro": { id: "veleiro", name: "Veleiro", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "transporte", cost: "10.000 PO", weightKg: null },

  // --- Conjuração e Serviços (p. 129) — NC = nível do conjurador ---
  "conducao-de-carroca": { id: "conducao-de-carroca", name: "Condução de carroça", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "conjuracao_servicos", cost: "3 PC a cada 1,5 km", weightKg: null },
  "mensageiro": { id: "mensageiro", name: "Mensageiro", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "conjuracao_servicos", cost: "2 PC a cada 1,5 km", weightKg: null },
  "passagem-de-navio": { id: "passagem-de-navio", name: "Passagem de navio", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "conjuracao_servicos", cost: "1 PP a cada 1,5 km", weightKg: null },
  "trabalhador-treinado": { id: "trabalhador-treinado", name: "Trabalhador (treinado)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "conjuracao_servicos", cost: "3 PP por dia", weightKg: null },
  "trabalhador-sem-treinamento": { id: "trabalhador-sem-treinamento", name: "Trabalhador (sem treinamento)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "conjuracao_servicos", cost: "1 PP por dia", weightKg: null },
  "pedagio": { id: "pedagio", name: "Pedágio (estrada ou portão)", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "conjuracao_servicos", cost: "1 PC", weightKg: null },
  "magia-nivel-0": { id: "magia-nivel-0", name: "Magia, nível 0", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "conjuracao_servicos", cost: "NC x 5 PO", weightKg: null, note: "Custo adicional conforme a descrição da magia; acima de 3.000 PO só com permissão do Mestre" },
  "magia-nivel-1": { id: "magia-nivel-1", name: "Magia, 1º nível", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "conjuracao_servicos", cost: "NC x 10 PO", weightKg: null, note: "Custo adicional conforme a descrição da magia; acima de 3.000 PO só com permissão do Mestre" },
  "magia-nivel-2": { id: "magia-nivel-2", name: "Magia, 2º nível", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "conjuracao_servicos", cost: "NC x 20 PO", weightKg: null, note: "Custo adicional conforme a descrição da magia; acima de 3.000 PO só com permissão do Mestre" },
  "magia-nivel-3": { id: "magia-nivel-3", name: "Magia, 3º nível", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "conjuracao_servicos", cost: "NC x 30 PO", weightKg: null, note: "Custo adicional conforme a descrição da magia; acima de 3.000 PO só com permissão do Mestre" },
  "magia-nivel-4": { id: "magia-nivel-4", name: "Magia, 4º nível", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "conjuracao_servicos", cost: "NC x 40 PO", weightKg: null, note: "Custo adicional conforme a descrição da magia; acima de 3.000 PO só com permissão do Mestre" },
  "magia-nivel-5": { id: "magia-nivel-5", name: "Magia, 5º nível", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "conjuracao_servicos", cost: "NC x 50 PO", weightKg: null, note: "Custo adicional conforme a descrição da magia; acima de 3.000 PO só com permissão do Mestre" },
  "magia-nivel-6": { id: "magia-nivel-6", name: "Magia, 6º nível", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "conjuracao_servicos", cost: "NC x 60 PO", weightKg: null, note: "Custo adicional conforme a descrição da magia; acima de 3.000 PO só com permissão do Mestre" },
  "magia-nivel-7": { id: "magia-nivel-7", name: "Magia, 7º nível", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "conjuracao_servicos", cost: "NC x 70 PO", weightKg: null, note: "Custo adicional conforme a descrição da magia; acima de 3.000 PO só com permissão do Mestre" },
  "magia-nivel-8": { id: "magia-nivel-8", name: "Magia, 8º nível", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "conjuracao_servicos", cost: "NC x 80 PO", weightKg: null, note: "Custo adicional conforme a descrição da magia; acima de 3.000 PO só com permissão do Mestre" },
  "magia-nivel-9": { id: "magia-nivel-9", name: "Magia, 9º nível", sourceBook: "D&D 3.5 — Livro do Jogador", sourcePage: 129, section: "conjuracao_servicos", cost: "NC x 90 PO", weightKg: null, note: "Custo adicional conforme a descrição da magia; acima de 3.000 PO só com permissão do Mestre" },
};

export const DND35_GEAR_IDS = Object.keys(DND35_GEAR);

/**
 * Converte um custo fixo ("5 PP", "1.000 PO") em PO. "—" vale 0 (item obtido
 * sem custo). Retorna null para custos que não são um preço fixo de compra —
 * serviços por distância/dia, magias escaladas por nível do conjurador,
 * multiplicadores de armadura e os valores sem unidade da seção de montarias —
 * para que o criador não os venda por um preço inventado.
 */
export function dnd35GearFixedCostGp(cost: string): number | null {
  const trimmed = cost.trim();
  if (trimmed === "—") return 0;
  const match = trimmed.match(/^([\d.]+)\s*(PC|PP|PO)$/);
  if (!match) return null;
  const amount = Number(match[1].replace(/\./g, ""));
  const unit = match[2];
  return unit === "PO" ? amount : unit === "PP" ? amount / 10 : amount / 100;
}
