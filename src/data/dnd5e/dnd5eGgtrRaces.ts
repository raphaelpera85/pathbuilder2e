export const DND5E_GGTR_SOURCE_BOOK = "D&D 5e · Guia dos Mestres de Guilda de Ravnica";

export interface Dnd5eGgtrRace {
  id: string;
  name: string;
  englishName: string;
  sourcePage: number;
  abilityBonuses: string;
  attributeAdjustments: Partial<Record<"str" | "dex" | "con" | "int" | "wis" | "cha", number>>;
  size: "Pequeno" | "Médio";
  speed: number;
  languages: string;
  traits: string[];
}

export const DND5E_GGTR_RACES: Dnd5eGgtrRace[] = [
  {
    id: "dnd5e.ggtr.ancestry.centauro",
    name: "Centauro",
    englishName: "Centaur",
    sourcePage: 15,
    abilityBonuses: "+2 Força, +1 Sabedoria",
    attributeAdjustments: { str: 2, wis: 1 },
    size: "Médio",
    speed: 12,
    languages: "Comum, Silvestre",
    traits: [
      "Tipo Feérico: O seu tipo de criatura é feérico, em vez de humanoide.",
      "Investida: Se você se mover ao menos 9 metros em linha reta em direção a um alvo e acertá-lo com um ataque corpo a corpo com arma no mesmo turno, pode imediatamente usar uma ação bônus para fazer um ataque contra o alvo com seus cascos.",
      "Cascos: Seus cascos são armas naturais corpo a corpo, que você pode usar para fazer ataques desarmados. Se acertar, causa 1d4 + modificador de Força de dano de concussão.",
      "Físico Equino: Você conta como uma categoria de tamanho maior ao determinar sua capacidade de carga e o peso que pode empurrar, puxar ou erguer. Além disso, qualquer subida que exija mãos e pés custa 4 vezes mais deslocamento em vez do dobro normal.",
      "Sobrevivência: Você tem proficiência em uma das seguintes perícias à sua escolha: Adestrar Animais, Medicina, Natureza ou Sobrevivência."
    ]
  },
  {
    id: "dnd5e.ggtr.ancestry.goblin_ravnica",
    name: "Goblin (Ravnica)",
    englishName: "Goblin (Ravnica)",
    sourcePage: 16,
    abilityBonuses: "+2 Destreza, +1 Constituição",
    attributeAdjustments: { dex: 2, con: 1 },
    size: "Pequeno",
    speed: 9,
    languages: "Comum, Goblin",
    traits: [
      "Visão no Escuro: Você enxerga na penumbra a até 18 metros como se fosse luz plena e na escuridão como penumbra.",
      "Fúria dos Pequenos: Ao causar dano com um ataque ou magia a uma criatura de tamanho maior que o seu, você pode fazê-la sofrer dano extra igual ao seu nível de personagem. Pode usar esta característica uma vez por descanso curto ou longo.",
      "Fuga Ágil: Você pode realizar a ação de Desengajar ou Esconder como uma ação bônus em cada um dos seus turnos."
    ]
  },
  {
    id: "dnd5e.ggtr.ancestry.loxodonte",
    name: "Loxodonte",
    englishName: "Loxodon",
    sourcePage: 17,
    abilityBonuses: "+2 Constituição, +1 Sabedoria",
    attributeAdjustments: { con: 2, wis: 1 },
    size: "Médio",
    speed: 9,
    languages: "Comum, Loxodonte",
    traits: [
      "Físico Poderoso: Você conta como uma categoria de tamanho maior ao determinar sua capacidade de carga e o peso que pode empurrar, arrastar ou erguer.",
      "Serenidade Loxodonte: Você tem vantagem em testes de resistência contra ficar amedrontado ou enfeitiçado.",
      "Armadura Natural: Você tem pele espessa e coriácea. Quando não estiver usando armadura, sua CA é igual a 12 + seu modificador de Constituição. Você pode usar um escudo e manter esse benefício.",
      "Tromba: Você pode usar sua tromba para agarrar objetos ou criaturas, abrir portas destrancadas, puxar ou empurrar alavancas. Ela tem alcance de 1,5m e pode erguer um peso em libras de até 5 vezes seu valor de Força. Você tem vantagem em testes de Sabedoria (Percepção) que dependam do olfato."
    ]
  },
  {
    id: "dnd5e.ggtr.ancestry.minotauro_ravnica",
    name: "Minotauro (Ravnica)",
    englishName: "Minotaur (Ravnica)",
    sourcePage: 18,
    abilityBonuses: "+2 Força, +1 Constituição",
    attributeAdjustments: { str: 2, con: 1 },
    size: "Médio",
    speed: 9,
    languages: "Comum, Minotauro",
    traits: [
      "Chifres: Seus chifres são armas naturais corpo a corpo com as quais você pode desferir ataques desarmados. Se acertar, causa 1d6 + modificador de Força de dano perfurante.",
      "Investida Cornífera: Imediatamente após usar a ação de Disparada em seu turno e se mover ao menos 6 metros, você pode fazer um ataque corpo a corpo com seus chifres como uma ação bônus.",
      "Chifres de Martelo: Imediatamente após acertar uma criatura com um ataque corpo a corpo como parte da ação de Ataque em seu turno, você pode usar uma ação bônus para tentar empurrar o alvo com seus chifres. O alvo não pode ser mais que uma categoria de tamanho maior que você e deve estar a até 1,5m. Se falhar numa salvaguarda de Força (CD 8 + bônus de proficiência + mod. Força), é empurrado até 3 metros para longe de você.",
      "Presença Imponente: Você tem proficiência na perícia Intimidação ou Persuasão (à sua escolha)."
    ]
  },
  {
    id: "dnd5e.ggtr.ancestry.hibrido_simic",
    name: "Híbrido Simic",
    englishName: "Simic Hybrid",
    sourcePage: 20,
    abilityBonuses: "+2 Constituição, +1 em outro atributo à escolha",
    attributeAdjustments: { con: 2 },
    size: "Médio",
    speed: 9,
    languages: "Comum, Élfico ou Vedalken",
    traits: [
      "Visão no Escuro: Você enxerga na penumbra a até 18 metros como se fosse luz plena e na escuridão como penumbra.",
      "Aprimoramento Animal (1º nível): Você escolhe uma adaptação biológica entre Planar de Manta (subtrai 30m de queda para dano e plana 60cm para cada 30cm descidos), Escalador Ágil (deslocamento de escalada igual ao de caminhada) ou Adaptação Subaquática (respira ar e água e deslocamento de natação igual ao de caminhada).",
      "Aprimoramento Animal (5º nível): No 5º nível você adquire uma segunda adaptação entre as opções não escolhidas ou uma nova: Apêndices Agarradores (garras ou tentáculos que causam 1d6 + For de concussão e permitem agarrar como ação bônus), Carapaça (+1 na CA quando não estiver usando armadura pesada) ou Cuspe Ácido (ação, spray de ácido a 9m causando 2d10 de dano de ácido, escalando para 3d10 no 11º e 4d10 no 17º, Con usos por descanso longo)."
    ]
  },
  {
    id: "dnd5e.ggtr.ancestry.vedalken",
    name: "Vedalken",
    englishName: "Vedalken",
    sourcePage: 21,
    abilityBonuses: "+2 Inteligência, +1 Sabedoria",
    attributeAdjustments: { int: 2, wis: 1 },
    size: "Médio",
    speed: 9,
    languages: "Comum, Vedalken, mais um idioma à escolha",
    traits: [
      "Desapego Vedalken: Você tem vantagem em todos os testes de resistência de Inteligência, Sabedoria e Carisma.",
      "Precisão Incansável: Você é proficiente em uma perícia à sua escolha entre Arcanismo, História, Investigação, Medicina, Atuação ou Prestidigitação, e proficiente com uma ferramenta à sua escolha. Toda vez que fizer um teste com a perícia ou ferramenta escolhida, adicione +1d4 ao total.",
      "Parcialmente Anfíbio: Ao absorver oxigênio através da sua pele, você pode respirar debaixo d'água por até 1 hora. Recupera esta habilidade após um descanso longo."
    ]
  }
];
