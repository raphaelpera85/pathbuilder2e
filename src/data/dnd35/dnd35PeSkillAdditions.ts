/**
 * D&D 3.5 — Livro Punhos e Espadas (Sword and Fist, ed. BR), Capítulo 1
 * "Talentos e Perícias", seção "As Mesmas Perícias, Novas Utilizações"
 * (pp.10-11). Mesmo padrão de `dnd35CgSkillAdditions.ts`/
 * `dnd35AdvSkillAdditions.ts`. Transcrição por leitura visual direta de
 * páginas renderizadas em alta resolução (200dpi) — fonte é scan sem
 * camada de texto.
 *
 * COBERTURA COMPLETA: as 4 perícias com novos usos nomeados do
 * capítulo — Blefar (Sedução), Diplomacia (Reverência), Obter
 * Informação (Encontrar quem Realmente Manda, Quem é Quem, Previsão de
 * Combate, Decifrar Estratégia), Sentir Motivação (uso normal contra
 * Blefar). Confirmado completo por leitura das pp.10-11: a seção
 * termina em "Sentir Motivação" e a p.12 inicia o Capítulo 2 ("Classes
 * de Prestígio", já catalogado em `dnd35PePrestige.ts`).
 *
 * NÃO CATALOGADO: "Novos Conhecimentos" (p.10) — lista de 6 novas
 * categorias de Conhecimento (Sabedoria Popular, Literatura,
 * Matemática, Política, Manha, Guerra) sem CD/regra mecânica própria,
 * apenas sugestões de subtipo de perícia já existente — fora do escopo
 * de "uso nomeado com regra mecânica" desta seção.
 */
export type PeSkillAddition = {
  id: string;
  skillName: string;
  page: number;
  intro?: string;
  entries: { title: string; text: string }[];
};

export const PE_SKILL_ADDITIONS: PeSkillAddition[] = [
  {
    id: "pe-skill-blefar",
    skillName: "Blefar (Car)",
    page: 10,
    intro:
      "Uso Normal: Algumas vezes, é necessário persuadir alguém de que os seus argumentos estranhos ou mesmo improváveis são verdadeiros e que você é confiável. Isto é bastante útil em inúmeras situações, não apenas quando seu personagem precisa vender aqueles itens mágicos obtidos na torre do mago maluco.",
    entries: [
      {
        title: "Novo Uso: Sedução",
        text: "É possível usar Blefar para convencer os integrantes do sexo oposto que as suas intenções românticas com eles são sinceras, persuadindo-a (o) a lhe prestar um pequeno favor temporário (como vigiar enquanto você escala as paredes e entra pela janela ou lhe contar a senha que permitirá passar em segurança pelos guardas). Esta ação não pode ser usada durante o combate.",
      },
    ],
  },
  {
    id: "pe-skill-diplomacia",
    skillName: "Diplomacia (Car)",
    page: 10,
    intro:
      "Uso Normal: Algumas vezes, é importante que as pessoas o considerem uma pessoa agradável, cooperativa ou socialmente aceitável — mesmo quando isso não é verdade. Você pode achar que seu guerreiro é imponente na sua cota de malha manchada de sangue e coberto pelos farrapos de seu manto de viagem, mas o Mestre de Cerimônias não concordará até você convencê-lo a permitir sua entrada no salão do baile do rei, apesar de sua aparência desleixada.",
    entries: [
      {
        title: "Novo Uso: Reverência",
        text: "Mesmo os mais talentosos matadores de dragões não estão em condições de se opor aos indivíduos que ocupam posições de autoridade e poder. Geralmente, os nobres e demais dignitários esperam ser tratados corretamente. Saber quando se dirigir a um patrono rico com \"Vossa Alteza\" em vez de \"Vossa Excelência\" pode ajudar a virar a escala de reações a seu favor.",
      },
    ],
  },
  {
    id: "pe-skill-obter-informacao",
    skillName: "Obter Informação (Car)",
    page: 11,
    intro:
      "Uso Normal: Esta perícia o auxilia a reunir rumores e lendas que existem em relação às ruínas que seu grupo está pensando em explorar, fazendo perguntas aos habitantes locais que possam ter alguma informação útil.",
    entries: [
      {
        title: "Novo Uso: Encontrar quem Realmente Manda",
        text: "Você precisa da ajuda do Templo dos Quatro Ventos, mas não sabe quem procurar no local. Será que é melhor se aproximar diretamente do Grande Mestre em pessoa ou pedir ajuda a um dos diversos subalternos do templo? O uso apropriado dessa perícia o ajudará a encontrar quem toma as decisões importantes.",
      },
      {
        title: "Novo Uso: Quem é Quem",
        text: "Os aventureiros espertos sempre tentam descobrir com quem estão tratando antes de fechar um acordo. Aquele estrangeiro encapuzado que acabou de contratar seu grupo de aventureiros é mesmo o mensageiro do duque, ou será que ele realmente possui a confiança de seu mestre?",
      },
      {
        title: "Novo Uso: Previsão de Combate",
        text: "Você capta facilmente, em linhas gerais, as capacidades de combate dos oponentes. Esse uso da perícia exige o dispêndio de 3 rodadas estudando o oponente engajado em combate. É impossível realizar qualquer outra ação simultânea, exceto percorrer a distância permitida pelo seu deslocamento normal. O personagem precisa observar o alvo durante todo esse tempo. A CD para o teste será 20+1 para cada nível de experiência do oponente. Caso obtenha sucesso, o personagem recebe +4 de bônus na próxima jogada de ataque contra o adversário observado. Este ataque precisa ser desferido em até 24 horas depois da observação ou o bônus será perdido. É impossível receber esse bônus uma segunda vez contra o mesmo oponente, a menos que o nível do adversário tenha mudado desde a última observação.",
      },
      {
        title: "Novo Uso: Decifrar Estratégia",
        text: "Você avalia uma situação do combate e determina qual seu verdadeiro propósito. É necessário estudar o combate durante pelo menos 3 rodadas antes de realizar o teste de perícia. A CD será 15+1 para cada oponente confrontado. Caso obtenha sucesso, o personagem descobrirá qual o verdadeiro objetivo dos seus adversários (cortá-lo em pedaços, afastá-lo ou atraí-lo para um local particular, resgatar um prisioneiro, etc.).",
      },
    ],
  },
  {
    id: "pe-skill-sentir-motivacao",
    skillName: "Sentir Motivação (Sab)",
    page: 11,
    intro:
      "Uso Normal: Esta perícia se mostra muito útil quando alguém tenta utilizar a perícia Blefar contra você. É necessário realizar testes resistidos de perícia; caso o personagem obtenha sucesso, não será enganado.",
    entries: [],
  },
];
