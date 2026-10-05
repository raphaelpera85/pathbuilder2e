// ============================================================================
// D&D 3.5 (pasta "D&D 3.5") — Defensores da Fé (Defenders of the Faith), edição
// brasileira: talentos novos (Cap. 1, pp. 19-20, Tabela 1-5), em português.
// Transcritos da camada de texto OCR do PDF (ruidosa) conferida contra a imagem
// das páginas 19-20; números lidos da imagem (ex.: resistência 5, dispersão de
// 18 m). ATENÇÃO DE VERSÃO: o livro original é de 2000, anterior ao 3.5, e o
// texto usa regras de 3.0 (talentos "virtuais", "Destruir o Mal" etc.). Não
// misturar com os dados do PHB 3.5 até conferir cada talento contra ele.
// "tablePrerequisites" guarda a coluna da Tabela 1-5 quando ela difere da
// descrição (o livro é inconsistente em alguns casos).
// Exigem Expulsar/Fascinar Mortos-vivos: todos os talentos Divinos e Especiais.
// ============================================================================

export type DefensoresFeatType = "Geral" | "Divino" | "Metamágico" | "Especial";

export interface DefensoresFeat {
  id: string;
  name: string;
  type: DefensoresFeatType;
  summary: string;
  /** Pré-requisitos como na descrição; vazio quando não há. */
  prerequisites: string[];
  /** Coluna "Pré-requisito" da Tabela 1-5, só quando difere da descrição. */
  tablePrerequisites?: string[];
  benefit: string;
}

export const DEFENSORES_FEATS: DefensoresFeat[] = [
  {
    id: "defensores-acelerar-expulsao",
    name: "Acelerar Expulsão",
    type: "Especial",
    summary: "Você consegue Expulsar ou Fascinar Mortos-vivos muito rapidamente e de modo reflexo.",
    prerequisites: ["Expulsar/Fascinar Mortos-vivos", "Carisma 13+", "Expulsão Adicional"],
    tablePrerequisites: ["Clérigo ou paladino", "Carisma 13+", "Expulsão Adicional"],
    benefit:
      "O personagem consegue Expulsar ou Fascinar Mortos-vivos como uma ação livre, mas sofrerá -4 de penalidade nas jogadas de Expulsão e dano de Expulsão. É possível realizar apenas uma tentativa de Expulsão por rodada. Esse talento somente pode ser ativado para efetivamente Expulsar ou Fascinar Mortos-vivos; ele não funciona para ativar talentos divinos.",
  },
  {
    id: "defensores-ataque-com-escudo-aprimorado",
    name: "Ataque com Escudo Aprimorado",
    type: "Geral",
    summary: "Você é capaz de empurrar seus oponentes com golpes de seu escudo.",
    prerequisites: ["Ataque Poderoso"],
    tablePrerequisites: ["Força 13+", "Ataque Poderoso"],
    benefit:
      "Sempre que o personagem atingir um oponente usando um escudo (pequeno ou grande), ele afetará o alvo como se tivesse realizado a manobra Encontrão. O personagem não invade realmente a área ocupada pelo adversário e não provoca ataques de oportunidade; além disso, não consegue deslocar a vítima mais de 1,5 m para trás, nem se mover com o defensor. É impossível usar esse talento com um broquel.",
  },
  {
    id: "defensores-destruicao-adicional",
    name: "Destruição Adicional",
    type: "Especial",
    summary: "Você consegue desferir mais ataques para destruir o mal.",
    prerequisites: ["4º nível ou superior", "Destruir o Mal"],
    tablePrerequisites: ["4º nível ou maior de uma classe de personagem"],
    benefit:
      "Quando o personagem seleciona esse talento, ele adquire uma utilização adicional de 'destruir o mal' por dia. Essa tentativa extra aplica-se a qualquer habilidade de 'destruir o mal' (de paladinos, libertadores sagrados ou clérigos com acesso ao domínio Destruição). É possível escolher esse talento diversas vezes.",
  },
  {
    id: "defensores-elevar-expulsao",
    name: "Elevar Expulsão",
    type: "Especial",
    summary: "Você consegue Expulsar ou Fascinar Mortos-vivos mais poderosos que o normal.",
    prerequisites: ["Expulsar/Fascinar Mortos-vivos", "Carisma 13+", "Expulsão Adicional"],
    tablePrerequisites: ["Clérigo ou paladino", "Carisma 13+", "Expulsão Adicional"],
    benefit:
      "O personagem poderá escolher um valor igual ou inferior ao seu nível de clérigo e adicionar esse valor como bônus no seu teste de Expulsão. O mesmo valor será aplicado como penalidade na jogada de dano de Expulsão. Caso não seja um clérigo, esse valor será limitado por seu nível efetivo nessa classe (por exemplo, um paladino tem um nível efetivo de clérigo igual ao seu nível -2). Quando uma classe de prestígio aumentar seu nível de expulsão efetivo, considere o novo valor.",
  },
  {
    id: "defensores-escudo-divino",
    name: "Escudo Divino",
    type: "Divino",
    summary: "Você é capaz de canalizar a energia sagrada para tornar seu escudo mais eficiente — na defesa e no ataque.",
    prerequisites: ["Expulsar/Fascinar Mortos-vivos", "Carisma 13+", "Força 13+", "Ataque Poderoso", "Ataque com Escudo Aprimorado"],
    benefit:
      "O personagem imbui seu escudo de energia, concedendo-lhe um bônus de melhoria equivalente a seu modificador de Carisma. Esse bônus se aplica na CA do usuário e nas suas jogadas de ataque com o escudo; ele dura uma quantidade de rodadas equivalente ao modificador de Carisma do personagem. A ativação usa uma ação padrão e uma tentativa de Expulsão.",
  },
  {
    id: "defensores-forca-divina",
    name: "Força Divina",
    type: "Divino",
    summary: "Você é capaz de canalizar a energia sagrada para aumentar o dano que causa em batalha.",
    prerequisites: ["Expulsar/Fascinar Mortos-vivos", "Carisma 13+", "Força 13+", "Ataque Poderoso"],
    benefit:
      "O personagem adiciona seu bônus de Carisma a todas as suas jogadas de dano com armas, durante uma quantidade de rodadas equivalente ao seu modificador de Carisma. A ativação usa uma ação padrão e uma tentativa de Expulsão.",
  },
  {
    id: "defensores-investida-com-escudo",
    name: "Investida com Escudo",
    type: "Geral",
    summary: "Você causará dano adicional se utilizar um escudo como arma durante uma Investida.",
    prerequisites: ["Ataque Poderoso", "Ataque com Escudo Aprimorado"],
    tablePrerequisites: ["Força 13+", "Ataque Poderoso", "Ataque com Escudo Aprimorado"],
    benefit: "Quando o personagem executar a manobra Investida e utilizar seu escudo como arma, ele causará o dobro do dano normal.",
  },
  {
    id: "defensores-magia-de-alcance",
    name: "Magia de Alcance",
    type: "Metamágico",
    summary: "Você é capaz de conjurar magias de toque sem encostar no alvo.",
    prerequisites: [],
    benefit:
      "O personagem pode lançar uma magia que tenha alcance \"Toque\" a até 9 metros de distância. Efetivamente, a magia se torna um raio; o conjurador precisará realizar um teste de ataque de toque à distância para afetar o alvo desejado. Uma magia de alcance alterado ocupa o espaço de uma magia dois níveis superiores ao padrão.",
  },
  {
    id: "defensores-magia-sagrada",
    name: "Magia Sagrada",
    type: "Metamágico",
    summary: "Suas magias de dano são carregadas de poderes divinos.",
    prerequisites: [],
    benefit:
      "Metade do dano causado por qualquer magia sagrada é alimentada diretamente pelas entidades divinas, portanto não será afetada por efeitos como suportar elementos ou magias similares. A outra metade do dano da magia deve ser tratada normalmente. Uma magia sagrada ocupa o espaço de uma magia dois níveis superiores ao padrão. Somente conjuradores divinos podem selecionar esse talento.",
  },
  {
    id: "defensores-potencializar-expulsao",
    name: "Potencializar Expulsão",
    type: "Especial",
    summary: "Você consegue expulsar ou fascinar mais mortos-vivos na mesma tentativa.",
    prerequisites: ["Expulsar/Fascinar Mortos-vivos", "Carisma 13+", "Expulsão Adicional"],
    tablePrerequisites: ["Clérigo ou paladino", "Carisma 13+", "Expulsão Adicional"],
    benefit:
      "O personagem consegue afetar mais mortos-vivos que o normal, mas tem dificuldade para influenciar as criaturas que tenham muitos Dados de Vida. Ele pode aceitar -2 de penalidade em seu teste de Expulsão para adicionar 2d6 na jogada de dano de Expulsão.",
  },
  {
    id: "defensores-purificacao-divina",
    name: "Purificação Divina",
    type: "Divino",
    summary: "Você é capaz de canalizar a energia sagrada para aumentar a sua resistência — e de seus aliados — contra venenos e maldições.",
    prerequisites: ["Expulsar/Fascinar Mortos-vivos", "Carisma 13+", "Expulsão Adicional"],
    benefit:
      "O personagem e todos os seus aliados, numa dispersão de 18 m, recebem +2 de bônus sagrado nos testes de resistência de Fortitude durante uma quantidade de rodadas equivalente ao modificador de Carisma do usuário do talento. A ativação usa uma ação padrão e uma tentativa de Expulsão.",
  },
  {
    id: "defensores-resistencia-divina",
    name: "Resistência Divina",
    type: "Divino",
    summary: "Você é capaz de canalizar a energia sagrada para reduzir temporariamente o dano causado por algumas fontes contra você e seus aliados.",
    prerequisites: ["Expulsar/Fascinar Mortos-vivos", "Expulsão Adicional", "Purificação Divina"],
    benefit:
      "O personagem e todos os seus aliados, numa dispersão de 18 m, adquirem resistência contra fogo, frio e eletricidade 5. Essa proteção não se acumula com poderes similares, como os fornecidos por magias ou habilidades especiais. A resistência permanece ativa até o final do próximo turno do usuário. A ativação usa uma ação padrão e uma tentativa de Expulsão.",
  },
  {
    id: "defensores-tolerancia-divina",
    name: "Tolerância Divina",
    type: "Divino",
    summary: "Você é capaz de canalizar a energia sagrada para aumentar seu deslocamento e sua Constituição.",
    prerequisites: ["Expulsar/Fascinar Mortos-vivos", "Carisma 13+", "Expulsão Adicional"],
    benefit:
      "O personagem aumenta seu deslocamento básico em 3 metros e recebe +2 de bônus de aprimoramento no valor de Constituição. Esses efeitos duram uma quantidade de minutos equivalente ao modificador de Carisma do personagem. A ativação usa uma ação padrão e uma tentativa de Expulsão.",
  },
  {
    id: "defensores-vinganca-divina",
    name: "Vingança Divina",
    type: "Divino",
    summary: "Você é capaz de canalizar a energia sagrada para causar dano de combate adicional aos mortos-vivos.",
    prerequisites: ["Expulsar/Fascinar Mortos-vivos", "Expulsão Adicional"],
    benefit:
      "O personagem adiciona 2d6 pontos de dano sagrado a todos os ataques bem-sucedidos contra mortos-vivos, usando armas brancas, até o final de sua próxima ação. A ativação usa uma ação padrão e uma tentativa de Expulsão.",
  },
];
