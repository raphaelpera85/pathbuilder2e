/**
 * D&D 3.5 — Manual dos Planos (ed. BR), Capítulo 9 "Monstros" (pp.159-187).
 * Raças planares jogáveis referenciadas pela Tabela 3-1 "Ajustes de Nível"
 * do Capítulo 3 (p.24): Bariaur (p.159-160), Uridezu (p.163-164),
 * Spinagon (p.165-166) e Canolote (p.186-187).
 *
 * Transcrição por leitura visual direta e verificação com OCR em alta
 * resolução de scan oficial. As outras 4 raças da Tabela 3-1 (Aasimar,
 * Tiefling, Githyanki, Githzerai) estão catalogadas em
 * `dnd35MonstrosRaces.ts`.
 */
export type Dnd35PlanosRace = {
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

export const DND35_PLANOS_RACES: Dnd35PlanosRace[] = [
  {
    id: "planos-race-bariaur",
    name: "Bariaur",
    size: "Médio",
    landSpeed: "12 m (9 m com armadura pesada/média)",
    abilityAdjustments: "+2 Força, +2 Sabedoria, −2 Carisma",
    specialQualities: [
      "Resistência à Magia 11 + nível de classe",
      "+2 de bônus racial nos testes de resistência de Vontade contra magias e habilidades similares a magia",
      "Quadrúpede: quatro patas com cascos; bônus de estabilidade contra encontrão. Armaduras devem ser adquiridas como equipamentos de montaria; não podem calçar botas humanas comuns",
      "Investida (Ext): golpe com chifres que inflige 2d6+1 pontos de dano de concussão",
    ],
    skillRacialBonus: "+2 de bônus racial nos testes de Observar e Ouvir (sentidos aguçados)",
    feats: "Ataque Poderoso; talentos adicionais conforme o nível de personagem",
    automaticLanguages: "Comum, Celestial",
    bonusLanguages: "Silvestre, Élfico, Gnomo",
    favoredClass: "Patrulheiro (Ranger)",
    levelAdjustment: 1,
    description:
      "Os bariaur combinam o corpo de carneiro com o tronco e cabeça humanóides, ostentando grandes chifres curvos. São criaturas com grande anseio de viajar, vivendo em rebanhos pelas planícies de Ysgard. São apreciadores de competições atléticas amigáveis e oratória, cultuando Ehlonna.",
    page: 159,
  },
  {
    id: "planos-race-uridezu",
    name: "Uridezu (Tanar'ri)",
    size: "Médio",
    landSpeed: "12 m",
    abilityAdjustments: "+2 Força, +6 Destreza, +2 Constituição, −2 Inteligência, +4 Sabedoria, +4 Carisma",
    specialQualities: [
      "Visão no escuro 18 m, faro",
      "Redução de dano 10/+1, RM 17",
      "Características de Tanar'ri: imunidade a veneno e eletricidade; resistência a ácido 20, frio 20 e fogo 20; telepatia 30 m",
      "Mordida Paralisante (Ext): CD 14 Fortitude ou paralisia por 2d6 minutos",
      "Golpe de Cauda: chicote para imobilizar ou desarmar oponentes sem risco de perder a cauda",
      "Habilidades Similares a Magia (SM): conjurador efetivo de 14º nível (CD 12)",
      "Empatia com Ratos: comunicação e comando simples de ratos e ratos atrozes com bônus racial",
      "Invocar Tanar'ri (SM): 1/dia invocar outro uridezu (30% de chance de sucesso)",
    ],
    skillRacialBonus: "Empatia com Animais +12, Esconder-se +13, Ouvir +11, Furtividade +13, Observar +11",
    feats: "Lutar às Cegas, Ataques Múltiplos",
    automaticLanguages: "Abissal, telepatia 30 m",
    bonusLanguages: "Comum, Dracônico, Infernal",
    favoredClass: "Ladino",
    levelAdjustment: 5,
    description:
      "Esses abissais raros assemelham-se a ratos humanóides sem pêlos, eretos, com caudas longas flexíveis e garras afiadas. Frequentemente enviados ao Plano Material em missões servis, refugiam-se em subterrâneos e comandam hordas de ratos comuns e atrozes.",
    page: 163,
  },
  {
    id: "planos-race-spinagon",
    name: "Spinagon (Baatezu)",
    size: "Pequeno",
    landSpeed: "Vôo 36 m (médio)",
    abilityAdjustments: "+0 Força, +2 Destreza, +0 Constituição, −2 Inteligência, +2 Sabedoria, +2 Carisma",
    specialQualities: [
      "Visão no escuro, ver na escuridão (inclusive mágica)",
      "RM 18, Regenerar Espinhos (Sob): 2 espinhos por rodada (alcance 9 m, dano 1d4+1 e 1d4 fogo, munição ilimitada)",
      "Características de Baatezu: imunidade a veneno e fogo; resistência a ácido 20 e frio 20; telepatia 30 m",
      "Habilidades Similares a Magia: feiticeiro de 8º nível (CD 10 + nível da magia)",
      "Invocar Baatezu (SM): 1/dia invocar spinagons adicionais com chance de sucesso",
    ],
    skillRacialBonus: "Diplomacia +7, Ouvir +7, Observar +7",
    feats: "Tiro Certeiro",
    automaticLanguages: "Infernal, Celestial, Dracônico, telepatia 30 m",
    bonusLanguages: "Comum, Abissal",
    favoredClass: "Feiticeiro",
    levelAdjustment: 4,
    description:
      "Um dos menores tipos de diabos de Baator, os spinagon assemelham-se a gárgulas cobertas de espinhos chamejantes, com olhos vermelhos brilhantes. Atuam como mensageiros, espiões e torturadores, atacando à distância com rajadas de espinhos incandescentes.",
    page: 165,
  },
  {
    id: "planos-race-canolote",
    name: "Canolote (Yugolote)",
    size: "Médio",
    landSpeed: "15 m",
    abilityAdjustments: "+6 Força, +0 Destreza, +6 Constituição, −6 Inteligência, +6 Sabedoria, +2 Carisma",
    specialQualities: [
      "Percepção às Cegas (Ext) 12 m, faro; imune a efeitos visuais, ilusões e ataques dependentes de visão (não possui olhos)",
      "Redução de dano 10/+1, RM 18",
      "Características de Yugolote: imunidade a veneno e ácido; resistência a frio 20, fogo 20 e eletricidade 20; telepatia 30 m",
      "Língua farpada (alcance 6 m): Agarrar Aprimorado (Ext), puxa criatura Média ou menor para a boca na mesma rodada e desfere mordida",
      "Paralisia (Ext): CD 12 Fortitude ou paralisia por 1d6+2 minutos",
      "Habilidades Similares a Magia (SM): feiticeiro de 5º nível (CD 11 + nível da magia)",
      "Invocar Yugolote (SM): 1/dia invocar 1 mezzolote ou 1d3 canolotes (40% de chance de sucesso)",
    ],
    skillRacialBonus: "Esconder-se +5, Ouvir +11, Furtividade +7, Observar +11",
    feats: "Iniciativa Aprimorada, Ataques Múltiplos",
    automaticLanguages: "Abissal, Dracônico, Infernal, telepatia 30 m",
    bonusLanguages: "Comum",
    favoredClass: "Guerreiro",
    levelAdjustment: 5,
    description:
      "Os canolotes assemelham-se a robustos buldogues blindados do tamanho de humanos, dotados de mandíbulas cruzadas horizontal e verticalmente, sem olhos. Atuam como batedores e guardas de Geena, farejando intrusos e capturando-os com línguas farpadas extensíveis.",
    page: 186,
  },
];

