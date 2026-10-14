export const DND5E_GGTR_SOURCE_BOOK = "D&D 5e · Guia dos Mestres de Guilda de Ravnica";

export interface Dnd5eGgtrSpell {
  id: string;
  name: string;
  englishName: string;
  level: number;
  school: "evocacao" | "conjuracao" | "abjuracao" | "transmutacao" | "encantamento" | "ilusao" | "adivinhacao" | "necromancia";
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  savingThrow?: string;
  classes: string[];
  classIds: string[];
  sourcePage: number;
  summary: string;
  description: string;
}

export const DND5E_GGTR_SPELLS: Dnd5eGgtrSpell[] = [
  {
    id: "dnd5e.ggtr.magia.codificar_pensamentos",
    name: "Codificar Pensamentos",
    englishName: "Encode Thoughts",
    level: 0,
    school: "encantamento",
    castingTime: "1 ação",
    range: "Pessoal",
    components: "S",
    duration: "Até 8 horas",
    classes: ["Bruxo", "Feiticeiro", "Mago"],
    classIds: ["bruxo", "feiticeiro", "mago"],
    sourcePage: 47,
    summary: "Truque · encantamento · extrai pensamentos e memórias em uma fita semissólida e tangível",
    description: "Colocando um dedo na própria cabeça, você puxa uma memória, ideia ou mensagem da sua mente e a transforma em uma fita tangível de energia brilhante chamada fio de pensamento, que persiste pela duração ou até você conjurar esta magia novamente. O fio aparece num espaço desocupado a até 1,5m de você como um objeto Miúdo, sem peso e semissólido, que pode ser segurado e carregado como uma fita. Caso conjure esta magia enquanto se concentra em uma magia ou habilidade que permita ler ou manipular pensamentos de terceiros (como detectar pensamentos ou modificar memória), você pode transformar os pensamentos da outra criatura no fio. Qualquer criatura segurando o fio que use detectar pensamentos pode ler o conteúdo sem necessidade de testes."
  },
  {
    id: "dnd5e.ggtr.magia.raio_do_caos",
    name: "Raio do Caos",
    englishName: "Chaos Bolt",
    level: 1,
    school: "evocacao",
    castingTime: "1 ação",
    range: "36 metros",
    components: "V, S",
    duration: "Instantânea",
    classes: ["Feiticeiro"],
    classIds: ["feiticeiro"],
    sourcePage: 67,
    summary: "1º nível · evocação · raio imprevisível com tipo de dano variável que pode ricochetear",
    description: "Você arremessa uma massa oscilante e ondulante de energia caótica contra uma criatura no alcance. Faça um ataque à distância com magia. Se acertar, o alvo sofre 2d8 + 1d6 de dano. Escolha um dos d8s: o número rolado determina o tipo de dano (1 Ácido, 2 Frio, 3 Fogo, 4 Força, 5 Elétrico, 6 Veneno, 7 Psíquico, 8 Trovão). Se você rolar o mesmo número em ambos os d8s, a energia caótica salta do alvo para uma criatura diferente à sua escolha a até 9 metros dele. Faça uma nova jogada de ataque contra o novo alvo e faça uma nova rolagem de dano, que também pode saltar se rolar números iguais nos d8s. Uma criatura só pode ser alvejada uma vez por conjuração desta magia. Em níveis superiores: o dano aumenta em 1d6 para cada nível de espaço acima do 1º."
  }
];
