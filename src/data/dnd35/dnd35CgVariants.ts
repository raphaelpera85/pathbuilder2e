/**
 * O Livro Completo do Guerreiro (D&D 3.5, edição brasileira; scan sem camada de texto), cap. 1, pp. 13: variação "Paladinos e Rangers sem Magias".
 * Substitui as magias do paladino/ranger do Livro do Jogador por habilidades; lido da imagem a 300dpi; português, como no livro.
 * Só dados (sem UI nem Supabase). Livro 3.5.
 */
export type CgClassVariantChange = { name: string; kind: "Sob" | "Ext" | "SM" | "remoção"; level: number | null; text: string };

export type CgClassVariant = {
  id: string;
  name: string;
  baseClass: "Paladino" | "Ranger";
  intro: string;
  changes: CgClassVariantChange[];
};

export const CG_CLASS_VARIANTS: CgClassVariant[] = [
  {
    id: "cg-paladino-opcional",
    name: "Paladino Opcional",
    baseClass: "Paladino",
    intro: "O paladino opcional adquire todas as características de classe normais, com as seguintes alterações.",
    changes: [
      { name: "Magias", kind: "remoção", level: null, text: "O paladino não é capaz de conjurar magias divinas." },
      { name: "Arma Abençoada", kind: "Sob", level: 6, text: "Qualquer arma branca empunhada por um paladino de 6º nível ou superior é considerada sagrada para sobrepujar a Redução de Dano das criaturas." },
      { name: "Poder Divino", kind: "Sob", level: 11, text: "No 11º nível, ou superior, o paladino pode usar uma ação padrão para adicionar +4 de bônus ao seu valor de Força, Sabedoria ou Carisma. Essa habilidade pode ser utilizada uma vez por dia e permanece ativa durante 1 minuto por nível de classe." },
      { name: "Resguardar Montaria", kind: "Sob", level: 13, text: "Um paladino de 13º nível ou superior que utilizar a habilidade cura pelas mãos em sua montaria recupera cinco vezes mais pontos de vida da criatura. Além disso, o paladino é capaz de gastar 5 PV da cura pelas mãos para remover uma das seguintes condições da sua montaria (exceto quando especificado o contrário): dano de habilidade temporário (1 PV de cura pelas mãos a cada ponto restaurado), atordoamento, cegueira, confusão, doença, enfraquecer o intelecto, enjôo, exaustão, fadiga, insanidade, náusea, ofuscar, pasmar, surdez ou veneno. O paladino consegue remover as condições ao mesmo tempo em que recupera os PV perdidos da montaria, mas qualquer PV despendido para remover uma condição não recupera os pontos de dano da criatura." },
      { name: "Espada Sagrada", kind: "SM", level: 16, text: "No 16º nível, um paladino é capaz de conjurar espada sagrada uma vez por dia, com nível de conjurador equivalente a metade de seu nível de paladino." },
    ],
  },
  {
    id: "cg-ranger-opcional",
    name: "Ranger Opcional",
    baseClass: "Ranger",
    intro: "O ranger opcional adquire todas as características de classe normais, com as seguintes alterações.",
    changes: [
      { name: "Magias", kind: "remoção", level: null, text: "O ranger não é capaz de conjurar magias divinas." },
      { name: "Movimento Rápido", kind: "Ext", level: 6, text: "No 6º nível, o deslocamento básico terrestre do ranger aumenta em +3 m. Esse benefício somente estará ativo quando o ranger não usar armaduras, utilizar armaduras leves ou médias, e não transportar uma carga superior a média." },
      { name: "Benção da Natureza", kind: "Sob", level: 11, text: "A partir do 11º nível, o ranger pode usar uma ação padrão para adicionar +4 de bônus ao seu valor de Constituição, Destreza ou Sabedoria. Essa habilidade pode ser utilizada uma vez por dia e permanece ativa durante 1 minuto por nível de classe." },
      { name: "Toque da Cura", kind: "SM", level: 13, text: "Uma vez por dia, um ranger de 13º nível ou superior pode conjurar remover doenças ou neutralizar veneno, com nível de conjurador equivalente a metade de seu nível de ranger." },
      { name: "Movimentação Livre", kind: "SM", level: 16, text: "Uma vez por dia, um ranger de 16º nível ou superior pode conjurar movimentação livre, com nível de conjurador equivalente a metade de seu nível de ranger." },
    ],
  },
];
