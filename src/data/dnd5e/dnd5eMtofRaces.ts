export const DND5E_MTOF_SOURCE_BOOK = "D&D 5e · Tomo de Inimigos de Mordenkainen";

export interface Dnd5eMtofRace {
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

export interface Dnd5eMtofFeat {
  id: string;
  name: string;
  englishName: string;
  sourcePage: number;
  prerequisite: string;
  description: string;
  spells: string[];
}

export const DND5E_MTOF_FEATS: Dnd5eMtofFeat[] = [
  {
    id: "dnd5e.mtof.feat.magia_dos_svirfneblin",
    name: "Magia dos Svirfneblin",
    englishName: "Svirfneblin Magic",
    sourcePage: 114,
    prerequisite: "Gnomo (Gnomo das Profundezas / Svirfneblin)",
    description: "Você herdou a habilidade inata de conjuração dos seus ancestrais do Subterrâneo. Esta habilidade permite que você conjure Indetectabilidade em si mesmo à vontade, sem precisar de componentes materiais. Você também pode conjurar cada uma das seguintes magias uma vez usando esta habilidade: Cegueira/Surdez, Desfoque e Disfarçar-se. Você recupera a capacidade de conjurar essas três magias quando terminar um descanso longo. Inteligência é sua habilidade de conjuração para todas essas magias.",
    spells: ["Indetectabilidade", "Cegueira/Surdez", "Desfoque", "Disfarçar-se"]
  }
];

export const DND5E_MTOF_RACES: Dnd5eMtofRace[] = [
  // ─── Gith (pp. 96-98) ────────────────────────────────────────────────────────
  {
    id: "dnd5e.mtof.ancestry.githyanki",
    name: "Githyanki",
    englishName: "Githyanki",
    sourcePage: 97,
    abilityBonuses: "+2 Força, +1 Inteligência",
    attributeAdjustments: { str: 2, int: 1 },
    size: "Médio",
    speed: 9,
    languages: "Comum, Gith, mais 1 idioma à sua escolha",
    traits: [
      "Domínio Decadente: Na cidade atemporal de Tu'narath no Plano Astral, os githyanki têm séculos para dominar conhecimentos singulares. Você aprende um idioma adicional à sua escolha e ganha proficiência em uma perícia ou ferramenta à sua escolha.",
      "Prodígio Marcial: Você tem proficiência com armaduras leves e médias, e com espadas curtas, espadas longas e espadas grandes.",
      "Psionismo Githyanki: Você conhece o truque Mãos Mágicas, e a mão criada é invisível ao conjurar por esta característica. A partir do 3º nível, pode conjurar Salto uma vez por descanso longo. A partir do 5º nível, pode conjurar Passo Nebuloso uma vez por descanso longo. Inteligência é sua habilidade de conjuração para essas magias, e você as conjura sem componentes materiais."
    ]
  },
  {
    id: "dnd5e.mtof.ancestry.githzerai",
    name: "Githzerai",
    englishName: "Githzerai",
    sourcePage: 97,
    abilityBonuses: "+2 Sabedoria, +1 Inteligência",
    attributeAdjustments: { wis: 2, int: 1 },
    size: "Médio",
    speed: 9,
    languages: "Comum, Gith",
    traits: [
      "Disciplina Mental: Sob a tutela rigorosa dos mestres monásticos de Limbo, os githzerai aprendem a blindar a própria psique contra influências externas. Você tem vantagem em testes de resistência contra as condições enfeitiçado e amedrontado.",
      "Psionismo Githzerai: Você conhece o truque Mãos Mágicas, e a mão criada é invisível ao conjurar por esta característica. A partir do 3º nível, pode conjurar Escudo Arcano uma vez por descanso longo. A partir do 5º nível, pode conjurar Detectar Pensamentos uma vez por descanso longo. Sabedoria é sua habilidade de conjuração para essas magias, e você as conjura sem componentes materiais."
    ]
  },

  // ─── Elfos (pp. 61-64) ──────────────────────────────────────────────────────
  {
    id: "dnd5e.mtof.ancestry.eladrin",
    name: "Eladrin",
    englishName: "Eladrin",
    sourcePage: 61,
    abilityBonuses: "+2 Destreza (Base Elfo), +1 Carisma",
    attributeAdjustments: { dex: 2, cha: 1 },
    size: "Médio",
    speed: 9,
    languages: "Comum, Élfico",
    traits: [
      "Sentidos Aguçados & Transe: Proficiência em Percepção e descanso em transe meditativo de 4 horas.",
      "Ancestral Feérico: Vantagem em testes de resistência contra ser enfeitiçado e imunidade a sono mágico.",
      "Passo Feérico Sazonal: Como ação bônus, você pode se teletransportar magicamente até 9 metros para um espaço desocupado visível 1 vez por descanso curto ou longo. Ao final de cada descanso longo, você pode sintonizar sua essência a uma das quatro estações: Outono, Inverno, Primavera ou Verão.",
      "Efeito Sazonal de Passo Feérico (3º Nível): A partir do 3º nível, seu Passo Feérico ganha um efeito adicional baseado na sua estação atual (CD = 8 + proficiência + modificador de Carisma):",
      "• Outono: Imediatamente após teleportar, até 2 criaturas à escolha a até 3m de você devem ter sucesso em salvaguarda de Sabedoria ou ficam enfeitiçadas por 1 minuto (ou até você ou aliados causarem dano).",
      "• Inverno: Ao teleportar, 1 criatura à escolha a até 1,5m de você antes do salto deve ter sucesso em salvaguarda de Sabedoria ou fica amedrontada até o final do seu próximo turno.",
      "• Primavera: Ao usar Passo Feérico, você pode tocar uma criatura voluntária a até 1,5m; essa criatura teleporta no seu lugar para um espaço desocupado a até 9m que você veja.",
      "• Verão: Imediatamente após teleportar, cada criatura à sua escolha a até 1,5m de você sofre dano de fogo igual ao seu modificador de Carisma (mínimo 1)."
    ]
  },
  {
    id: "dnd5e.mtof.ancestry.elfo_do_mar",
    name: "Elfo do Mar",
    englishName: "Sea Elf",
    sourcePage: 62,
    abilityBonuses: "+2 Destreza (Base Elfo), +1 Constituição",
    attributeAdjustments: { dex: 2, con: 1 },
    size: "Médio",
    speed: 9,
    languages: "Comum, Élfico, Aquan",
    traits: [
      "Sentidos Aguçados, Ancestral Feérico & Transe: Herança padrão dos elfos (visão no escuro 18m, Percepção, resistência a encantamentos e transe).",
      "Treinamento do Elfo do Mar: Você tem proficiência com lança, tridente, besta leve e rede.",
      "Filho do Mar: Você possui deslocamento de natação de 9 metros e pode respirar ar e água livremente.",
      "Amigo do Mar: Usando gestos e sons subaquáticos, você pode comunicar ideias e conceitos simples para qualquer besta que possua deslocamento de natação inato."
    ]
  },
  {
    id: "dnd5e.mtof.ancestry.shadar_kai",
    name: "Shadar-kai",
    englishName: "Shadar-kai",
    sourcePage: 63,
    abilityBonuses: "+2 Destreza (Base Elfo), +1 Constituição",
    attributeAdjustments: { dex: 2, con: 1 },
    size: "Médio",
    speed: 9,
    languages: "Comum, Élfico",
    traits: [
      "Sentidos Aguçados, Ancestral Feérico & Transe: Herança élfica com visão no escuro de 18 metros, proficiência em Percepção e transe meditativo.",
      "Resistência Necrótica: Você tem resistência a dano necrótico, resguardando sua alma da entropia de Pendor das Sombras.",
      "Bênção da Rainha dos Corvos: Como ação bônus, você pode se teletransportar magicamente até 9 metros para um espaço desocupado que veja. Pode usar esta característica uma vez por descanso longo. A partir do 3º nível, você também ganha resistência a todos os tipos de dano ao usar esta característica, durando até o início do seu próximo turno, período em que você assume forma espectral e translúcida."
    ]
  },

  // ─── Gnomo das Profundezas (pp. 113-115) ───────────────────────────────────
  {
    id: "dnd5e.mtof.ancestry.svirfneblin",
    name: "Gnomo das Profundezas (Svirfneblin)",
    englishName: "Deep Gnome (Svirfneblin)",
    sourcePage: 113,
    abilityBonuses: "+2 Inteligência (Base Gnomo), +1 Destreza",
    attributeAdjustments: { int: 2, dex: 1 },
    size: "Pequeno",
    speed: 7.5,
    languages: "Comum, Gnômico, Subcomum",
    traits: [
      "Esperteza Gnômica: Vantagem em todos os testes de resistência de Inteligência, Sabedoria e Carisma contra magia.",
      "Visão no Escuro Superior: Você enxerga no escuro e penumbra a até 36 metros de distância.",
      "Camuflagem na Pedra: Você tem vantagem em testes de Destreza (Furtividade) para se esconder em terreno rochoso e ambientes subterrâneos."
    ]
  },

  // ─── Tieflings das Linhagens Infernais (pp. 21-24) ───────────────────────────
  {
    id: "dnd5e.mtof.ancestry.tiefling_asmodeus",
    name: "Tiefling de Asmodeus",
    englishName: "Tiefling (Asmodeus)",
    sourcePage: 21,
    abilityBonuses: "+2 Carisma, +1 Inteligência",
    attributeAdjustments: { cha: 2, int: 1 },
    size: "Médio",
    speed: 9,
    languages: "Comum, Infernal",
    traits: [
      "Visão no Escuro: 18 metros de alcance na penumbra e escuridão.",
      "Resistência Infernal: Resistência a dano de fogo.",
      "Legado de Nessus: Você conhece o truque Taumaturgia. A partir do 3º nível, pode conjurar Repreensão Infernal (como magia de 2º nível) uma vez por descanso longo. A partir do 5º nível, pode conjurar Escuridão uma vez por descanso longo. Carisma é sua habilidade de conjuração."
    ]
  },
  {
    id: "dnd5e.mtof.ancestry.tiefling_baalzebul",
    name: "Tiefling de Baalzebul",
    englishName: "Tiefling (Baalzebul)",
    sourcePage: 21,
    abilityBonuses: "+2 Carisma, +1 Inteligência",
    attributeAdjustments: { cha: 2, int: 1 },
    size: "Médio",
    speed: 9,
    languages: "Comum, Infernal",
    traits: [
      "Visão no Escuro: 18 metros de alcance na penumbra e escuridão.",
      "Resistência Infernal: Resistência a dano de fogo.",
      "Legado de Maladomini: Você conhece o truque Taumaturgia. A partir do 3º nível, pode conjurar Raio do Adoecimento (como magia de 2º nível) uma vez por descanso longo. A partir do 5º nível, pode conjurar Coroa da Loucura uma vez por descanso longo. Carisma é sua habilidade de conjuração."
    ]
  },
  {
    id: "dnd5e.mtof.ancestry.tiefling_dispater",
    name: "Tiefling de Dispater",
    englishName: "Tiefling (Dispater)",
    sourcePage: 21,
    abilityBonuses: "+2 Carisma, +1 Destreza",
    attributeAdjustments: { cha: 2, dex: 1 },
    size: "Médio",
    speed: 9,
    languages: "Comum, Infernal",
    traits: [
      "Visão no Escuro: 18 metros de alcance na penumbra e escuridão.",
      "Resistência Infernal: Resistência a dano de fogo.",
      "Legado de Dis: Você conhece o truque Taumaturgia. A partir do 3º nível, pode conjurar Disfarçar-se uma vez por descanso longo. A partir do 5º nível, pode conjurar Detectar Pensamentos uma vez por descanso longo. Carisma é sua habilidade de conjuração."
    ]
  },
  {
    id: "dnd5e.mtof.ancestry.tiefling_fierna",
    name: "Tiefling de Fierna",
    englishName: "Tiefling (Fierna)",
    sourcePage: 21,
    abilityBonuses: "+2 Carisma, +1 Sabedoria",
    attributeAdjustments: { cha: 2, wis: 1 },
    size: "Médio",
    speed: 9,
    languages: "Comum, Infernal",
    traits: [
      "Visão no Escuro: 18 metros de alcance na penumbra e escuridão.",
      "Resistência Infernal: Resistência a dano de fogo.",
      "Legado de Flegetos: Você conhece o truque Amizade. A partir do 3º nível, pode conjurar Enfeitiçar Pessoa (como magia de 2º nível) uma vez por descanso longo. A partir do 5º nível, pode conjurar Sugestão uma vez por descanso longo. Carisma é sua habilidade de conjuração."
    ]
  },
  {
    id: "dnd5e.mtof.ancestry.tiefling_glasya",
    name: "Tiefling de Glasya",
    englishName: "Tiefling (Glasya)",
    sourcePage: 22,
    abilityBonuses: "+2 Carisma, +1 Destreza",
    attributeAdjustments: { cha: 2, dex: 1 },
    size: "Médio",
    speed: 9,
    languages: "Comum, Infernal",
    traits: [
      "Visão no Escuro: 18 metros de alcance na penumbra e escuridão.",
      "Resistência Infernal: Resistência a dano de fogo.",
      "Legado de Malbolge: Você conhece o truque Ilusão Menor. A partir do 3º nível, pode conjurar Disfarçar-se uma vez por descanso longo. A partir do 5º nível, pode conjurar Invisibilidade uma vez por descanso longo. Carisma é sua habilidade de conjuração."
    ]
  },
  {
    id: "dnd5e.mtof.ancestry.tiefling_levistus",
    name: "Tiefling de Levistus",
    englishName: "Tiefling (Levistus)",
    sourcePage: 22,
    abilityBonuses: "+2 Carisma, +1 Constituição",
    attributeAdjustments: { cha: 2, con: 1 },
    size: "Médio",
    speed: 9,
    languages: "Comum, Infernal",
    traits: [
      "Visão no Escuro: 18 metros de alcance na penumbra e escuridão.",
      "Resistência Infernal: Resistência a dano de fogo.",
      "Legado de Estígia: Você conhece o truque Raio de Gelo. A partir do 3º nível, pode conjurar Armadura de Agathys (como magia de 2º nível) uma vez por descanso longo. A partir do 5º nível, pode conjurar Escuridão uma vez por descanso longo. Carisma é sua habilidade de conjuração."
    ]
  },
  {
    id: "dnd5e.mtof.ancestry.tiefling_mammon",
    name: "Tiefling de Mammon",
    englishName: "Tiefling (Mammon)",
    sourcePage: 23,
    abilityBonuses: "+2 Carisma, +1 Inteligência",
    attributeAdjustments: { cha: 2, int: 1 },
    size: "Médio",
    speed: 9,
    languages: "Comum, Infernal",
    traits: [
      "Visão no Escuro: 18 metros de alcance na penumbra e escuridão.",
      "Resistência Infernal: Resistência a dano de fogo.",
      "Legado de Minauros: Você conhece o truque Mãos Mágicas. A partir do 3º nível, pode conjurar Disco Flutuante de Tenser uma vez por descanso curto ou longo. A partir do 5º nível, pode conjurar Tranca Arcana (sem componente material) uma vez por descanso longo. Carisma é sua habilidade de conjuração."
    ]
  },
  {
    id: "dnd5e.mtof.ancestry.tiefling_mephistopheles",
    name: "Tiefling de Mefistófeles",
    englishName: "Tiefling (Mephistopheles)",
    sourcePage: 23,
    abilityBonuses: "+2 Carisma, +1 Inteligência",
    attributeAdjustments: { cha: 2, int: 1 },
    size: "Médio",
    speed: 9,
    languages: "Comum, Infernal",
    traits: [
      "Visão no Escuro: 18 metros de alcance na penumbra e escuridão.",
      "Resistência Infernal: Resistência a dano de fogo.",
      "Legado de Cania: Você conhece o truque Mãos Mágicas. A partir do 3º nível, pode conjurar Mãos Flamejantes (como magia de 2º nível) uma vez por descanso longo. A partir do 5º nível, pode conjurar Lâmina Flamejante uma vez por descanso longo. Carisma é sua habilidade de conjuração."
    ]
  },
  {
    id: "dnd5e.mtof.ancestry.tiefling_zariel",
    name: "Tiefling de Zariel",
    englishName: "Tiefling (Zariel)",
    sourcePage: 24,
    abilityBonuses: "+2 Carisma, +1 Força",
    attributeAdjustments: { cha: 2, str: 1 },
    size: "Médio",
    speed: 9,
    languages: "Comum, Infernal",
    traits: [
      "Visão no Escuro: 18 metros de alcance na penumbra e escuridão.",
      "Resistência Infernal: Resistência a dano de fogo.",
      "Legado de Avernus: Você conhece o truque Taumaturgia. A partir do 3º nível, pode conjurar Destruição Ardente (Searing Smite, como magia de 2º nível) uma vez por descanso longo. A partir do 5º nível, pode conjurar Destruição Marcante (Branding Smite) uma vez por descanso longo. Carisma é sua habilidade de conjuração."
    ]
  }
];
