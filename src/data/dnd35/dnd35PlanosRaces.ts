/**
 * D&D 3.5 — Manual dos Planos (ed. BR), Capítulo 9 "Monstros" (p.159+).
 * Seção "Bariaur" (p.160, subseção "Personagens Bariaur"). Transcrição
 * por leitura visual direta de páginas renderizadas em alta resolução
 * (90-140dpi) — fonte é scan sem camada de texto.
 *
 * Esta raça é uma das 8 referenciadas pela Tabela 3-1 "Ajuste de
 * Nível" do Capítulo 3 "Personagens e Magia" do mesmo livro
 * (ver header de `dnd35PlanosPrestige.ts`) — confirma a suspeita
 * original de que Bariaur/Canolote/Spinagon/Uridezu pertencem ao
 * Capítulo 9 deste próprio livro, não ao "Livro dos Monstros"
 * separado (onde só Aasimar/Tiefling/Githyanki/Githzerai estavam).
 *
 * COBERTURA (lote 2, pp.160-165): Bariaur completo (ver ressalva de
 * gap acima) + Uridezu (p.163, demônio-rato das Tanar'ri) + Spinagon
 * (p.165, diabo menor dos Baatezu) — ambos com stat block tabular
 * completo. Faltam Canolote — ainda não localizado no capítulo,
 * continuar em sessão futura (as seções Gênio/Dao/Marid/Githyanki/
 * Githzerai/Inevitável/Mercano/Pazelemental/Yugoloth ainda não
 * verificadas exaustivamente).
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
    landSpeed: "9 m (quadrúpede)",
    abilityAdjustments:
      "não confirmado neste recorte — não inventado (a prosa descreve apenas características raciais extraordinárias/sobrenaturais, sem listar explicitamente os ajustes de atributo; gap documentado, requer releitura ou localização de um bloco de estatísticas completo do Bariaur no mesmo capítulo)",
    specialQualities: [
      "Resistência à Magia 11 + nível de classe",
      "+2 de bônus racial nos testes de resistência de Vontade contra magias e habilidades similares a magia",
      "Quadrúpede: possuem quatro patas e cascos, os bariaur são mais difíceis de derrubar com um encontrão (consulte o Capítulo 8 do Livro do Jogador). Entretanto, as armaduras devem ser compradas como equipamentos de montaria, não armaduras comuns. Um bariaur não pode utilizar botas criadas para seres humanos",
      "Investida (Ext): um bariaur geralmente inicia um combate investindo contra seu oponente, abaixando a cabeça para golpear o inimigo com seus chifres de carneiro. Além dos benefícios e penalidades de uma investida, isso permite ao bariaur desferir um único ataque de perfuração que inflige 2d6+1 pontos de dano de concussão",
    ],
    skillRacialBonus: "+2 de bônus racial nos testes de Observar e Ouvir (sentidos aguçados)",
    feats: "Os bariaur adquirem talentos conforme o nível de personagem",
    automaticLanguages: "não confirmado neste recorte — não inventado",
    bonusLanguages: "não confirmado neste recorte — não inventado",
    favoredClass: "Patrulheiro (Ranger)",
    levelAdjustment: 1,
    description:
      "Os bariaur são criaturas com anseio de viajar e dificilmente permanecem muito tempo no mesmo lugar. Seus rebanhos seguem um único líder e se mantêm no posto enquanto conseguir derrotar seus adversários em uma \"colisão de chifres\" (uma sequência de investidas similares a uma justa). Os bariaur apreciam todos os tipos de competições, desafiando sua oratória em disputas de histórias, correndo pelas planícies gramadas de Ysgard ou saltando as rochas de um riacho até que somente um deles ainda esteja seco. Eles anseiam por testar a capacidade de recém-chegados e visitantes nesses eventos, que costuma ser uma fonte de diversão amistosa em vez de uma avaliação rigorosa de capacidade física. A dieta dos bariaur é herbívora, sendo os gêneros de primeira necessidade as frutas, as castanhas e as folhas. Eles conhecem bem os arbustos e árvores frutíferos em quilômetros. Uma exceção são os rangers bariaur, que podem comer carne — particularmente de criaturas silvestres que caçaram sozinhas. Os bariaur cultuam Ehlonna, a divindade dos bosques.",
    page: 160,
  },
];
