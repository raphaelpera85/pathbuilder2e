export const DND5E_SCAG_SOURCE_BOOK = "D&D 5e · Guia de Aventureiros da Costa da Espada";

export interface Dnd5eScagSpell {
  id: string;
  name: string;
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

export const DND5E_SCAG_SPELLS: Dnd5eScagSpell[] = [
  {
    id: "dnd5e.scag.magia.lamina_efervescente",
    name: "Lâmina Efervescente",
    level: 0,
    school: "evocacao",
    castingTime: "1 ação",
    range: "1,5m",
    components: "V, M (uma arma)",
    duration: "1 rodada",
    classes: ["Bruxo", "Feiticeiro", "Mago"],
    classIds: ["bruxo", "feiticeiro", "mago"],
    sourcePage: 142,
    summary: "Truque · evocação · ataque com arma causa dano trovejante extra se o alvo se mover",
    description: "Como parte da ação usada para conjurar esta magia, você deve fazer um ataque corpo a corpo com uma arma contra uma criatura dentro do alcance da magia, do contrário a magia falha. Se acertar, o alvo sofre os efeitos normais do ataque e fica envolto em uma energia efervescente até o começo do próximo turno do conjurador. Se o alvo se mover voluntariamente antes disso, ele imediatamente recebe 1d8 de dano trovejante e a magia encerra. No 5º nível o ataque causa +1d8 de dano trovejante e o dano de movimento sobe para 2d8 (+1d8 no 11º e 17º níveis)."
  },
  {
    id: "dnd5e.scag.magia.lamina_verde_flamejante",
    name: "Lâmina Verde Flamejante",
    level: 0,
    school: "evocacao",
    castingTime: "1 ação",
    range: "1,5m",
    components: "V, M (uma arma)",
    duration: "Instantânea",
    classes: ["Bruxo", "Feiticeiro", "Mago"],
    classIds: ["bruxo", "feiticeiro", "mago"],
    sourcePage: 143,
    summary: "Truque · evocação · ataque com arma salta chama verde para criatura adjacente",
    description: "Como parte da ação usada para conjurar esta magia, você deve fazer um ataque corpo a corpo com uma arma contra uma criatura dentro do alcance da magia, do contrário a magia falha. Se acertar, o alvo sofre os efeitos normais do ataque e uma chama verde salta do alvo até uma criatura que você possa ver a até 1,5m dele, causando dano de fogo igual ao seu modificador de habilidade de conjuração. No 5º nível o ataque causa +1d8 de fogo e a segunda criatura sofre 1d8 + modificador (+1d8 no 11º e 17º níveis)."
  },
  {
    id: "dnd5e.scag.magia.atracao_eletrica",
    name: "Atração Elétrica",
    level: 0,
    school: "evocacao",
    castingTime: "1 ação",
    range: "4,5m",
    components: "V",
    duration: "Instantânea",
    savingThrow: "Força",
    classes: ["Bruxo", "Feiticeiro", "Mago"],
    classIds: ["bruxo", "feiticeiro", "mago"],
    sourcePage: 143,
    summary: "Truque · evocação · chicote elétrico puxa alvo 3m e causa dano elétrico",
    description: "Você cria um chicote de energia elétrica em uma criatura à sua escolha que você possa ver dentro do alcance. O alvo deve obter sucesso em um TR de Força ou é puxado 3 metros em linha reta em sua direção e sofre 1d8 de dano elétrico se terminar a até 1,5m de você. O dano aumenta para 2d8 no nível 5, 3d8 no nível 11 e 4d8 no nível 17."
  },
  {
    id: "dnd5e.scag.magia.explosao_de_espadas",
    name: "Explosão de Espadas",
    level: 0,
    school: "conjuracao",
    castingTime: "1 ação",
    range: "1,5m",
    components: "V",
    duration: "Instantânea",
    savingThrow: "Destreza",
    classes: ["Bruxo", "Feiticeiro", "Mago"],
    classIds: ["bruxo", "feiticeiro", "mago"],
    sourcePage: 143,
    summary: "Truque · conjuração · círculo momentâneo de lâminas espectrais causa dano de força",
    description: "Você cria um círculo momentâneo de lâminas espectrais que lhe rodeiam. Cada criatura dentro do alcance, exceto você, precisa obter sucesso em um TR de Destreza ou sofrerá 1d6 de dano de força. O dano aumenta para 2d6 no nível 5, 3d6 no nível 11 e 4d6 no nível 17."
  }
];
