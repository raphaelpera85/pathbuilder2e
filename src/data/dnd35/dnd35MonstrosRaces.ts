/**
 * D&D 3.5 — Livro dos Monstros (ed. BR), Capítulo 1 "Monstros de A a
 * Z", seções "Aasimar" e "Tiefling" (p.240-241), subseção "Como
 * Personagens". Transcrição por leitura visual direta de páginas
 * renderizadas em alta resolução (180dpi) — fonte é scan sem camada de
 * texto.
 *
 * Estas raças são referenciadas (mas não definidas) pela Tabela 3-1
 * "Ajustes de Nível" do Manual dos Planos (`dnd35PlanosPrestige.ts`
 * header), que lista Aasimar/Bariaur/Canolote/Githyanki/Githzerai/
 * Spinagon/Tiefling/Uridezu com seus Ajustes de Nível mas sem repetir
 * as características raciais completas (remetendo a este livro).
 * Este arquivo fecha o cross-reference para Aasimar, Tiefling,
 * Githyanki e Githzerai — as 4 raças restantes (Bariaur, Canolote,
 * Spinagon, Uridezu) NÃO aparecem no índice alfabético deste livro
 * (confirmado: ausentes da lista completa A-H do sumário) — são
 * provavelmente exclusivas do Capítulo 9 "Monstros" do próprio Manual
 * dos Planos (não deste livro), a verificar em sessão futura.
 */
export type Dnd35MonstrosRace = {
  id: string;
  name: string;
  size: string;
  landSpeed: string;
  abilityAdjustments: string;
  specialQualities: string[];
  skillRacialBonus: string;
  feats: string;
  automaticLanguages: string;
  bonusLanguages: string;
  favoredClass: string;
  levelAdjustment: number;
  description: string;
  page: number;
};

export const DND35_MONSTROS_RACES: Dnd35MonstrosRace[] = [
  {
    id: "monstros-race-aasimar",
    name: "Aasimar",
    size: "Médio",
    landSpeed: "9 m",
    abilityAdjustments: "+2 Sabedoria, +2 Carisma",
    specialQualities: [
      "Visão no escuro 18 m",
      "Resistência a ácido 5, frio 5 e eletricidade 5",
      "Ataques Especiais: Luz do Dia (SM) uma vez por dia, 1º nível de conjurador ou o nível de conjurador equivalente ao seu nível de classe, o que for maior",
    ],
    skillRacialBonus: "+2 de bônus racial nos testes de Observar e Ouvir",
    feats: "Os aasimar recebem talentos de acordo com seus níveis de classe",
    automaticLanguages: "Comum, Celestial",
    bonusLanguages: "Dracônico, Anão, Élfico, Gnomo, Halfling, Silvestre",
    favoredClass: "Paladino",
    levelAdjustment: 1,
    description:
      "Agraciados com um toque celestial, os aasimar são altos, têm boa aparência e são simpáticos. Em geral apresentam uma marca característica física que sugere sua herança, como cabelo prateado, olhos dourados ou um olhar sobrenatural e intenso. A maioria dos aasimar tem tendências bondosas e determinadas. Eles lutam contra as causas malignas e tentam convencer as pessoas a fazer a coisa certa. Em raras ocasiões, escolhem o caminho vingativo e arbitrário de seus ancestrais celestiais. Dificilmente ocuparão posições de liderança e quase sempre vivem como criaturas solitárias, devido à sua absoluta dedicação à bondade. Alguns são menos fanáticos e se adaptam às sociedades humanas. Esse ser parece humano. Dotados de beleza e traços calmos, serenos, com um brilho interior que se reflete em seu rosto.",
    page: 240,
  },
  {
    id: "monstros-race-tiefling",
    name: "Tiefling",
    size: "Médio",
    landSpeed: "9 m",
    abilityAdjustments: "+2 Destreza, +2 Inteligência, −2 Carisma",
    specialQualities: [
      "Visão no escuro 18 m",
      "Ataques Especiais: Escuridão (SM) uma vez por dia (nível de conjurador equivalente ao seu nível de classe)",
      "Resistência a frio 5, eletricidade 5 e fogo 5",
    ],
    skillRacialBonus: "+2 de bônus racial nos testes de Blefar e Esconder-se",
    feats: "Os tiefling recebem talentos de acordo com seus níveis de classe",
    automaticLanguages: "Comum, Infernal",
    bonusLanguages: "Dracônico, Anão, Élfico, Gnomo, Goblin, Halfling, Orc",
    favoredClass: "Ladino",
    levelAdjustment: 1,
    description:
      "Os tiefling são deformados, errantes, indignos de confiança e com muita frequência seguem suas heranças raciais e atendem ao chamado da maldade. Poucos desafiam suas naturezas, mas antes continuarão a lutar contra a opinião popular (caso sua natureza seja conhecida) ou o sentimento de \"falsidade\" sobrenatural que parece lhes seguir eternamente. Na maior parte das sociedades humanas, os tiefling se conservam à margem e atuam como ladrões, assassinos ou espiões. Algumas vezes, conseguem atingir uma posição ou cargo reconhecido, mas quando sua identidade é revelada, rapidamente são proscritos. Esse ser parece humano, mas possui uma leve e ligeiramente perturbadora luz macabra em seus olhos. Chifres curtos emergem de sua testa.",
    page: 240,
  },
  {
    id: "monstros-race-githyanki",
    name: "Githyanki",
    size: "Médio",
    landSpeed: "9 m",
    abilityAdjustments: "+2 Destreza, +2 Constituição, −2 Sabedoria",
    specialQualities: [
      "Visão no escuro 18 m",
      "Ataques Especiais: Psiquismo (SM) 3/dia — pasmar (CD 9), míos mágicos; no 3º nível ou superior também pode usar nublar 3 vezes por dia; no 6º nível também usar porta dimensional 3 vezes por dia; no 9º nível também usar viagem planar (CD 16) uma vez por dia. O nível de conjurador efetivo corresponde aos níveis de classe do githyanki. As CDs para os testes de resistência são baseadas em Carisma",
      "Resistência à Magia (Ext): equivalente aos níveis de classe +5",
    ],
    skillRacialBonus: "—",
    feats: "Os githyanki adquirem talentos conforme o nível de personagem",
    automaticLanguages: "Githyanki",
    bonusLanguages: "Comum, Infernal, Dracônico, Subterrâneo",
    favoredClass: "Guerreiro",
    levelAdjustment: 2,
    description:
      "Esse humanoide alto e esquálido tem a pele áspera e amarelada e cabelos castanho-avermelhados, presos em dois rabos-de-cavalo no alto da cabeça. Seus olhos demonstram brilho sinistro e suas orelhas são pontiagudas e serrilhadas na parte frontal. Os githyanki são uma antiga linhagem de seres humanoides que residem no Plano Astral, preparando seus arsenais para a próxima invasão, incursão ou guerra.",
    page: 143,
  },
  {
    id: "monstros-race-githzerai",
    name: "Githzerai",
    size: "Médio",
    landSpeed: "9 m",
    abilityAdjustments: "+6 Destreza, −2 Inteligência, +2 Sabedoria",
    specialQualities: [
      "Visão no escuro 18 m",
      "Ataques Especiais: Psiquismo (SM) 3/dia — despedaçar (CD 11), pasmar (CD 9); no 11º nível ou superior pode utilizar viagem planar (CD 16) uma vez por dia. Os feiticeiros githzerai usam seus poderes para auxiliar os guerreiros e ladinos. As CDs para os testes de resistência são baseadas em Carisma",
      "Armadura Inercial (SM): os githzerai podem utilizar sua força psíquica para bloquear um golpe de um inimigo, concede +4 de bônus de armadura na CA enquanto permanecerem conscientes. Essa habilidade equivale a uma magia de 1º nível",
      "Resistência à Magia (Ext): um githzerai tem Resistência à Magia equivalente aos níveis de classe +5",
    ],
    skillRacialBonus: "—",
    feats: "Os githzerai adquirem talentos conforme o nível de personagem",
    automaticLanguages: "Githzerai",
    bonusLanguages: "Comum, Infernal, Dracônico, Subterrâneo",
    favoredClass: "Monge",
    levelAdjustment: 2,
    description:
      "Essa criatura é um humanoide alto e magro, com traços marcantes, rosto severo e olhos amarelos. Os githzerai são um povo humanoide empedernido que reside no plano do Limbo, seguro pela proteção de seus monastérios ocultos.",
    page: 145,
  },
];
