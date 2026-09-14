import type { PickerItem } from "../types";

const DND_CONDITIONS = [
  ["cego", "Cego", "Uma criatura cega não pode ver e falha automaticamente em testes que dependam da visão; ataques contra ela têm vantagem e seus ataques têm desvantagem."],
  ["enfeiticado", "Enfeitiçado", "A criatura enfeitiçada não pode atacar quem a enfeitiçou nem ter essa criatura como alvo de habilidades nocivas; o enfeitiçador tem vantagem em testes sociais contra ela."],
  ["surdo", "Surdo", "A criatura surda não pode ouvir e falha automaticamente em testes que dependam da audição."],
  ["amedrontado", "Amedrontado", "A criatura tem desvantagem em testes de habilidade e ataques enquanto a fonte do medo estiver no campo de visão; não pode se aproximar voluntariamente dela."],
  ["agarrado", "Agarrado", "O deslocamento da criatura agarrada chega a 0 e ela não recebe benefícios de bônus de deslocamento; a condição termina quando o agarrador fica incapacitado ou quando a criatura escapa."],
  ["incapacitado", "Incapacitado", "A criatura não pode realizar ações nem reações."],
  ["invisivel", "Invisível", "A criatura não pode ser vista sem magia ou sentido especial; ataques contra ela têm desvantagem e seus ataques têm vantagem."],
  ["paralisado", "Paralisado", "A criatura está incapacitada, não pode se mover ou falar, falha automaticamente em testes de Força e Destreza e ataques contra ela têm vantagem; ataques próximos que acertem são críticos quando o atacante está no alcance."],
  ["petrificado", "Petrificado", "A criatura é transformada em substância inanimada, fica incapacitada, não percebe os arredores e recebe resistência a todo dano; fica imune a veneno e doença."],
  ["envenenado", "Envenenado", "A criatura tem desvantagem em jogadas de ataque e testes de habilidade."],
  ["caido", "Caído", "A única opção de movimento da criatura caída é rastejar; ela tem desvantagem em ataques e ataques contra ela têm vantagem a até 1,5 m, enquanto outros ataques têm desvantagem."],
  ["contido", "Contido", "O deslocamento da criatura contida chega a 0; ataques contra ela têm vantagem, seus ataques têm desvantagem e ela tem desvantagem em salvamentos de Destreza."],
  ["atordoado", "Atordoado", "A criatura fica incapacitada, não pode se mover e só consegue falar de modo hesitante; falha automaticamente em salvamentos de Força e Destreza e ataques contra ela têm vantagem."],
  ["inconsciente", "Inconsciente", "A criatura está incapacitada, não pode se mover ou falar, não percebe o ambiente, falha em salvamentos de Força e Destreza, ataques contra ela têm vantagem e ataques próximos que acertem são críticos."],
  ["exausto", "Exausto", "Cada nível de exaustão impõe uma penalidade cumulativa de -1 em testes de habilidade, jogadas de ataque e salvamentos; a criatura também reduz seu deslocamento em 1,5 m por nível."],
] as const;

export function getSystemConditionItems(systemId: string): PickerItem[] {
  if (systemId !== "dnd5e") return [];
  return DND_CONDITIONS.map(([id, name, description]) => ({
    id: `dnd5e.condition.${id}`,
    name,
    type: "condition" as const,
    category: "condition" as const,
    summary: description,
    system_id: "dnd5e",
    data: {
      id: `dnd5e.condition.${id}`,
      system_id: "dnd5e",
      systemId: "dnd5e",
      ruleset: "standard" as const,
      description,
      source: { book: "Livro do Jogador — D&D 5e 2014", page: 290 },
      sourceBook: "Livro do Jogador — D&D 5e 2014",
      sourcePage: 290,
    },
  }));
}
