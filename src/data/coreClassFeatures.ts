import type { SupportedCoreSystem } from "./multiSystemCharacter";

export interface CoreClassFeature {
  name: string;
  level: number;
  description: string;
}

export interface CoreClassResource {
  name: string;
  value: string;
  description: string;
}

const DND_FEATURE_DETAILS: Record<string, Record<string, string>> = {
  barbaro: {
    "Fúria": "Entra em fúria como ação bônus; recebe resistência a dano físico e bônus de dano em ataques de Força.",
    "Defesa sem Armadura": "A CA é 10 + modificador de Destreza + modificador de Constituição quando não usa armadura.",
    "Ataque Descuidado": "Pode obter vantagem no primeiro ataque corpo a corpo usando Força, mas ataques contra você têm vantagem até seu próximo turno.",
    "Ataque Extra": "Pode atacar duas vezes, em vez de uma, ao realizar a ação Atacar.",
    "Movimento Rápido": "Seu deslocamento aumenta enquanto não usa armadura pesada.",
    "Instinto Feral": "Adiciona o bônus de proficiência à iniciativa e pode agir normalmente se estiver surpreso após entrar em fúria.",
  },
  bardo: {
    "Conjuração": "Usa Carisma como atributo de conjuração e pode lançar magias conhecidas da lista de bardo.",
    "Inspiração de Bardo (d6)": "Como ação bônus, concede um dado d6 a uma criatura aliada para adicionar a um teste, ataque ou salvamento.",
    "Inspiração de Bardo (d8)": "O dado de Inspiração de Bardo aumenta para d8.",
    "Especialização": "Dobra o bônus de proficiência em duas perícias escolhidas.",
    "Ataque Extra": "Pode atacar duas vezes, em vez de uma, ao realizar a ação Atacar.",
    "Contracanto": "Pode usar música e performance para conceder vantagem contra ser amedrontado ou enfeitiçado.",
  },
  bruxo: {
    "Patrono Sobrenatural": "Escolhe um patrono, que concede características adicionais nos níveis indicados.",
    "Invocações Místicas": "Escolhe invocações que alteram ou ampliam suas capacidades sobrenaturais.",
    "Dádiva do Pacto": "Recebe uma dádiva do pacto no 3º nível, como pacto da corrente, lâmina ou tomo.",
    "Conjuração": "Usa Carisma e recupera os espaços de magia do bruxo após um descanso curto ou longo.",
  },
  clerigo: {
    "Conjuração": "Usa Sabedoria como atributo de conjuração e prepara magias da lista de clérigo.",
    "Domínio Divino": "Escolhe um domínio que concede proficiências, magias e características extras.",
    "Canalizar Divindade (1 uso)": "Canaliza energia divina uma vez entre descansos; o domínio define o efeito.",
    "Canalizar Divindade (2 usos)": "Pode usar Canalizar Divindade duas vezes entre descansos.",
    "Destruir Mortos-Vivos (ND 1/2)": "Mortos-vivos abaixo do limite de ND podem ser destruídos após falhar no salvamento contra sua CD.",
  },
  druida: {
    "Druídico": "Conhece a língua secreta dos druidas e pode deixar mensagens ocultas na natureza.",
    "Conjuração": "Usa Sabedoria como atributo de conjuração e prepara magias da lista de druida.",
    "Forma Selvagem": "Assume formas de bestas dentro dos limites definidos pelo nível e pelo círculo druídico.",
    "Círculo Druídico": "Escolhe um círculo que concede características e opções adicionais de forma selvagem ou magia.",
  },
  feiticeiro: {
    "Conjuração": "Usa Carisma como atributo de conjuração e conhece magias da lista de feiticeiro.",
    "Origem da Feitiçaria": "Escolhe a origem que determina características adicionais nos níveis indicados.",
    "Fonte de Magia": "Converte pontos de feitiçaria em espaços de magia e espaços em pontos de feitiçaria.",
    "Metamagia": "Modifica a forma de lançar uma magia gastando pontos de feitiçaria.",
  },
  guerreiro: {
    "Estilo de Luta": "Escolhe um estilo de combate que concede um benefício permanente compatível com seu treinamento.",
    "Retomar o Fôlego": "Como ação bônus, recupera pontos de vida uma vez por descanso curto ou longo.",
    "Surto de Ação (1 uso)": "Pode realizar uma ação adicional no seu turno uma vez por descanso curto ou longo.",
    "Ataque Extra": "Pode atacar duas vezes, em vez de uma, ao realizar a ação Atacar.",
    "Indomável (1 uso)": "Pode repetir um salvamento que falhou uma vez por descanso longo.",
  },
  ladino: {
    "Especialização": "Dobra o bônus de proficiência em duas perícias ou em uma perícia e ferramentas de ladrão.",
    "Ataque Furtivo": "Uma vez por turno, causa dano adicional quando ataca com vantagem ou cumpre as condições de aliado e arma adequadas.",
    "Ação Ardilosa": "Pode usar ação bônus para Correr, Desengajar ou Esconder-se.",
    "Esquiva Sobrenatural": "Usa sua reação para reduzir pela metade o dano de um ataque que possa ver.",
    "Evasão": "Em salvamentos de Destreza, sofre metade do dano em sucesso e nenhum dano em sucesso, conforme o efeito.",
  },
  mago: {
    "Conjuração": "Usa Inteligência como atributo de conjuração e registra magias no grimório.",
    "Recuperação Arcana": "Recupera parte dos espaços de magia após um descanso curto uma vez por dia.",
    "Tradição Arcana": "Escolhe uma tradição que concede características nos níveis indicados.",
    "Maestria de Magia": "Escolhe magias de baixo nível para lançar sem gastar espaços, dentro das limitações da característica.",
  },
  monge: {
    "Defesa sem Armadura": "A CA é 10 + modificador de Destreza + modificador de Sabedoria quando não usa armadura ou escudo.",
    "Artes Marciais": "Usa Destreza para ataques com armas de monge, realiza ataque desarmado como ação bônus e melhora o dado de dano.",
    "Ki": "Gasta pontos de ki para ativar técnicas; recupera todos os pontos após descanso curto ou longo.",
    "Defletir Projéteis": "Usa reação para reduzir dano de um ataque à distância e pode arremessar o projétil quando reduz o dano a zero.",
    "Golpe Atordoante": "Ao acertar, gasta ki para forçar um salvamento de Constituição e atordoar o alvo em caso de falha.",
  },
  paladino: {
    "Sentido Divino": "Detecta a presença de celestiais, corruptores e mortos-vivos dentro do alcance por um número limitado de usos.",
    "Imposição das Mãos": "Possui uma reserva de cura igual a cinco vezes o nível de paladino.",
    "Conjuração": "Usa Carisma e começa a conjurar a partir do 2º nível.",
    "Destruição Divina": "Gasta um espaço de magia ao acertar para causar dano radiante adicional.",
    "Aura de Proteção": "Você e aliados próximos adicionam seu modificador de Carisma aos testes de resistência.",
  },
  patrulheiro: {
    "Inimigo Favorito": "Escolhe inimigos favorecidos e recebe benefícios de rastreamento e conhecimento sobre eles.",
    "Explorador Natural": "Escolhe terrenos favorecidos e recebe benefícios de viagem, exploração e orientação.",
    "Conjuração": "Usa Sabedoria e começa a conjurar a partir do 2º nível.",
    "Ataque Extra": "Pode atacar duas vezes, em vez de uma, ao realizar a ação Atacar.",
    "Passo da Terra": "Mover-se por terreno difícil não mágico não custa movimento adicional dentro das condições da característica.",
  },
};

const T20_FEATURE_DETAILS: Record<string, Record<string, string>> = {
  arcanista: { "Caminho do Arcanista": "Escolha de caminho que define sua especialização; recebe Conhecimento Mágico e Magias para construir sua lista." },
  barbaro: { "Fúria": "Entra em fúria para aumentar sua capacidade ofensiva e resistir a ameaças físicas.", "Instinto Selvagem": "Percebe perigos e reage de forma instintiva, conforme as condições da classe." },
  bardo: { "Apenas um Bardo": "Usa sua expressão e repertório para apoiar aliados e controlar o ritmo do conflito.", "Inspiração": "Concede bônus a aliados por meio de música, oratória ou outra expressão artística." },
  bucaneiro: { "Audácia": "Converte ousadia em bônus para ações arriscadas e decisivas.", "Insolência": "Usa Carisma para sustentar sua defesa e provocar adversários." },
  cacador: { "Marca da Presa": "Escolhe uma presa e recebe benefícios para persegui-la e causar dano.", "Rastreador": "Segue rastros e encontra criaturas em ambientes selvagens." },
  cavaleiro: { "Código de Honra": "Adota um código que orienta sua conduta e sustenta suas técnicas de combate.", "Postura de Combate": "Assume uma postura para receber um benefício tático específico." },
  clerigo: { "Prece": "Canaliza sua fé por meio de preces e recebe acesso às ferramentas divinas da classe.", "Devoto": "Escolhe uma divindade e mantém suas restrições para acessar poderes concedidos." },
  druida: { "Devoto": "Escolhe uma divindade e seus poderes concedidos.", "Empatia Selvagem": "Usa linguagem corporal e magia primal para acalmar ou influenciar animais." },
  guerreiro: { "Ataque Especial": "Investe pontos de mana para melhorar um ataque e aumentar seu impacto.", "Durão": "Resiste a golpes decisivos e melhora sua sobrevivência em combate." },
  inventor: { "Engenhosidade": "Aplica Inteligência em soluções técnicas e improvisos de ofício.", "Protótipo": "Cria um item ou engenho inicial que pode ser aprimorado ao longo da campanha." },
  ladino: { "Ataque Furtivo": "Causa dano adicional quando explora distração, surpresa ou posicionamento favorável.", "Especialista": "Recebe treinamento avançado e se destaca em perícias escolhidas." },
  lutador: { "Briga": "Luta desarmado com eficiência e transforma o próprio corpo em arma.", "Golpe Relâmpago": "Ataca rapidamente e aproveita aberturas criadas no combate." },
  nobre: { "Autoconfiança": "Usa Carisma para manter a defesa e inspirar confiança.", "Espólio": "Começa com recursos e contatos compatíveis com sua posição.", "Orgulho": "Transforma sua reputação em vantagem diante de desafios sociais." },
  paladino: { "Abençoado": "Recebe bênçãos da divindade escolhida e acesso a poderes concedidos.", "Código do Herói": "Segue um código de honra e usa sua fé para proteger e punir.", "Golpe Divino": "Canaliza mana para adicionar dano sagrado a um ataque." },
};

function detailFor(system: SupportedCoreSystem, classId: string, name: string): string {
  return (system === "t20" ? T20_FEATURE_DETAILS : DND_FEATURE_DETAILS)[classId]?.[name]
    || "Característica de classe disponível conforme a progressão do nível e a edição selecionada.";
}

export function getCoreClassFeatures(system: SupportedCoreSystem, classId: string, level: number, progression?: { featuresByLevel: Record<number, string[]> }): CoreClassFeature[] {
  if (!progression) return [];
  return Object.entries(progression.featuresByLevel)
    .flatMap(([levelText, names]) => {
      const featureLevel = Number(levelText);
      return featureLevel <= level ? names.map((name) => ({ name, level: featureLevel, description: detailFor(system, classId, name) })) : [];
    })
    .filter((feature, index, features) => features.findIndex((item) => item.name === feature.name && item.level === feature.level) === index)
    .sort((a, b) => a.level - b.level || a.name.localeCompare(b.name, "pt-BR"));
}

export function getCoreClassResources(system: SupportedCoreSystem, classId: string, level: number, modifiers: Record<string, number>): CoreClassResource[] {
  if (system === "t20") return [];
  const safeLevel = Math.max(1, Math.min(20, Math.trunc(level)));
  const resources: CoreClassResource[] = [];
  const add = (name: string, value: string, description: string) => resources.push({ name, value, description });
  if (classId === "barbaro") {
    const rages = safeLevel >= 20 ? 999 : safeLevel >= 17 ? 6 : safeLevel >= 12 ? 5 : safeLevel >= 6 ? 4 : safeLevel >= 3 ? 3 : 2;
    add("Fúrias", String(rages), safeLevel >= 20 ? "Usos ilimitados; recupera os benefícios conforme as regras de Fúria." : "Usos por descanso longo.");
  }
  if (classId === "bardo") add("Inspiração de Bardo", `${Math.max(1, modifiers.cha || 0)}d${safeLevel >= 15 ? 12 : safeLevel >= 10 ? 10 : safeLevel >= 5 ? 8 : 6}`, `Usos por descanso longo: ${Math.max(1, modifiers.cha || 0)}.`);
  if (classId === "guerreiro") {
    add("Retomar o Fôlego", "1d10 + nível", "Recupera PV como ação bônus uma vez por descanso curto ou longo.");
    if (safeLevel >= 2) add("Surto de Ação", safeLevel >= 17 ? "2 usos" : "1 uso", "Concede uma ação adicional; recupera em descanso curto ou longo.");
  }
  if (classId === "ladino") add("Ataque Furtivo", `${Math.ceil(safeLevel / 2)}d6`, "Dano adicional uma vez por turno quando cumpre os requisitos.");
  if (classId === "monge" && safeLevel >= 2) add("Pontos de Ki", String(safeLevel), "Recupera todos os pontos após descanso curto ou longo.");
  if (classId === "paladino") add("Imposição das Mãos", `${safeLevel * 5} PV`, "Reserva total de cura que se recupera após descanso longo.");
  if (classId === "feiticeiro" && safeLevel >= 2) add("Pontos de Feitiçaria", String(safeLevel), "Usados para Metamagia e conversão em espaços de magia.");
  if (classId === "clerigo" && safeLevel >= 2) add("Canalizar Divindade", safeLevel >= 18 ? "3 usos" : safeLevel >= 6 ? "2 usos" : "1 uso", "Recupera usos após descanso curto ou longo.");
  if (classId === "mago") add("Recuperação Arcana", `até ${Math.min(5, Math.ceil(safeLevel / 2))}º nível de espaços`, "Recupera espaços após um descanso curto uma vez por dia.");
  if (classId === "bruxo" && safeLevel >= 2) add("Invocações Místicas", safeLevel >= 18 ? "8" : safeLevel >= 15 ? "7" : safeLevel >= 12 ? "6" : safeLevel >= 9 ? "5" : safeLevel >= 7 ? "4" : safeLevel >= 5 ? "3" : "2", "Escolhas personalizáveis do patrono sobrenatural.");
  if (classId === "druida" && safeLevel >= 2) add("Forma Selvagem", safeLevel >= 18 ? "sem limite de forma" : "2 usos", "Usos recuperados após descanso curto ou longo; o círculo define opções adicionais.");
  if (classId === "patrulheiro") add("Inimigo Favorito", `${Math.max(1, Math.ceil(safeLevel / 5))} escolha(s)`, "Escolhas e benefícios são definidos pela campanha e pelo Livro do Jogador.");
  return resources;
}
