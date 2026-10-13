/**
 * Novos Domínios do D&D 3.5 — O Livro Completo do Guerreiro (ed. BR),
 * Capítulo 3: "Novas Magias" (pp.113-115). Cada domínio inclui o poder
 * concedido (texto novo) e a lista de magias por nível de domínio (1-9).
 * A maioria das magias listadas já existe no Livro do Jogador; magias
 * realmente novas estão marcadas com `new: true` e têm descrição completa
 * em `CG_NEW_SPELLS` (dnd35CgNewSpells.ts).
 */
export type CgDomainSpell = { level: number; name: string; isNew?: boolean };

export type CgDomain = {
  id: string;
  name: string;
  page: number;
  deities: string[];
  grantedPower: string;
  spells: CgDomainSpell[];
};

export const CG_DOMAINS: CgDomain[] = [
  {
    id: "cg-dominio-coragem",
    name: "Domínio da Coragem",
    page: 114,
    deities: ["Valkar", "Heironeous", "Yondalla"],
    grantedPower: "O personagem emana uma aura de coragem que fornece +4 de bônus nos testes de resistência contra efeitos de medo para todos os aliados (incluindo o personagem) num raio de 3 m. Essa habilidade sobrenatural somente está ativa quando o usuário estiver consciente.",
    spells: [
      { level: 1, name: "Remover Medo" },
      { level: 2, name: "Ajuda" },
      { level: 3, name: "Manto da Bravura", isNew: true },
      { level: 4, name: "Heroísmo" },
      { level: 5, name: "Fúria Valente", isNew: true },
      { level: 6, name: "Banquete de Heróis" },
      { level: 7, name: "Heroísmo Maior" },
      { level: 8, name: "Rugido do Leão", isNew: true },
      { level: 9, name: "Manto da Bravura Maior", isNew: true },
    ],
  },
  {
    id: "cg-dominio-destino",
    name: "Domínio do Destino",
    page: 114,
    deities: ["Lyris", "Nerull", "Obad-Hai"],
    grantedPower: "O personagem adquire a habilidade sobrenatural de esquiva, que lhe permite conservar seu bônus de Destreza na CA (se houver), mesmo em situações de surpresa ou contra ataques de um oponente invisível. No entanto, ele ainda perde seu bônus de Destreza na CA quando estiver imobilizado. Caso tenha a habilidade esquiva sobrenatural de uma classe diferente, ele adiciona seus níveis de clérigo à classe original para determinar se adquire a esquiva sobrenatural aprimorada (consulte ladino, no Livro do Jogador).",
    spells: [
      { level: 1, name: "Ataque Certeiro" },
      { level: 2, name: "Augúrio MF" },
      { level: 3, name: "Rogar Maldição" },
      { level: 4, name: "Condição" },
      { level: 5, name: "Marca da Justiça" },
      { level: 6, name: "Tarefa/Missão" },
      { level: 7, name: "Visão MX" },
      { level: 8, name: "Limpar a Mente" },
      { level: 9, name: "Sexto Sentido" },
    ],
  },
  {
    id: "cg-dominio-nobreza",
    name: "Domínio da Nobreza",
    page: 115,
    deities: ["Altua", "Heironeous", "Pelor"],
    grantedPower: "Uma vez por dia, o personagem tem a habilidade similar a magia de inspirar seus aliados, concedendo-lhes +2 de bônus de moral em testes de resistência, jogadas de ataque, testes de habilidade e perícia e dano com armas. Eles devem ser capazes de ouvir o personagem durante uma rodada. Ativar essa habilidade é uma ação padrão. Ela permanece ativa durante uma quantidade de rodadas equivalente ao bônus de Carisma do usuário.",
    spells: [
      { level: 1, name: "Auxílio Divino" },
      { level: 2, name: "Cativar" },
      { level: 3, name: "Roupa Encantada" },
      { level: 4, name: "Discernir Mentiras" },
      { level: 5, name: "Comando Maior" },
      { level: 6, name: "Tarefa/Missão" },
      { level: 7, name: "Repulsão" },
      { level: 8, name: "Ordem" },
      { level: 9, name: "Tempestade da Vingança" },
    ],
  },
  {
    id: "cg-dominio-planejamento",
    name: "Domínio do Planejamento",
    page: 115,
    deities: ["Halmyr", "Boccob", "Vecna", "Wee Jas"],
    grantedPower: "O personagem recebe o talento Estender Magia como um talento adicional.",
    spells: [
      { level: 1, name: "Visão da Morte" },
      { level: 2, name: "Augúrio MF" },
      { level: 3, name: "Claridivência/Clariaudiência" },
      { level: 4, name: "Condição" },
      { level: 5, name: "Detectar Vidência" },
      { level: 6, name: "Banquete de Heróis" },
      { level: 7, name: "Vidência Maior" },
      { level: 8, name: "Discernir Localização" },
      { level: 9, name: "Parar o Tempo" },
    ],
  },
  {
    id: "cg-dominio-tirania",
    name: "Domínio da Tirania",
    page: 115,
    deities: ["Typhos", "Hextor", "Vecna", "Wee Jas"],
    grantedPower: "Adicione +1 na CD dos testes de resistência contra qualquer magia de compulsão que o personagem conjurar.",
    spells: [
      { level: 1, name: "Comando" },
      { level: 2, name: "Cativar" },
      { level: 3, name: "Discernir Mentiras" },
      { level: 4, name: "Medo" },
      { level: 5, name: "Comando Maior" },
      { level: 6, name: "Tarefa/Missão" },
      { level: 7, name: "Mão Poderosa de Bigby, A" },
      { level: 8, name: "Enfeitiçar Monstro em Massa" },
      { level: 9, name: "Dominar Monstro" },
    ],
  },
];
