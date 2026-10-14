import { T20CompendiumEntry } from "./t20Compendium";

export const T20_AMEACAS_SPELLS: T20CompendiumEntry[] = [
  {
    id: "t20.ameacas.magia.acoite_flamejante",
    name: "Açoite Flamejante",
    sourcePage: 404,
    category: "magia",
    spellLevel: 1,
    tradition: "arcana",
    school: "convocacao",
    castingTime: "padrao",
    range: "pessoal",
    duration: "sustentada",
    savingThrow: "Reflexos reduz parcial",
    summary: "Cria um açoite de chamas na mão. Ação padrão causa 2d6 pontos de dano de fogo em criatura em alcance curto e a deixa em chamas e enredada."
  },
  {
    id: "t20.ameacas.magia.dardo_gelido",
    name: "Dardo Gélido",
    sourcePage: 404,
    category: "magia",
    spellLevel: 1,
    tradition: "arcana",
    school: "evocacao",
    castingTime: "padrao",
    range: "curto",
    target: "1 criatura",
    duration: "instantanea",
    savingThrow: "Fortitude parcial",
    summary: "Dispara um dardo de gelo causando 2d6 pontos de dano de frio e deixa o alvo lento por 1 rodada (Fortitude reduz à metade e evita a lentidão)."
  },
  {
    id: "t20.ameacas.magia.invocar_fagulha_elemental",
    name: "Invocar Fagulha Elemental",
    sourcePage: 404,
    category: "magia",
    spellLevel: 2,
    tradition: "arcana",
    school: "convocacao",
    castingTime: "completa",
    range: "curto",
    duration: "sustentada",
    summary: "Transforma uma porção de elemento inerte em um familiar elemental Pequeno (ar, água, fogo ou terra) que auxilia o conjurador sem contar no limite de parceiros."
  },
  {
    id: "t20.ameacas.magia.jato_corrosivo",
    name: "Jato Corrosivo",
    sourcePage: 404,
    category: "magia",
    spellLevel: 1,
    tradition: "arcana",
    school: "evocacao",
    castingTime: "padrao",
    range: "pessoal",
    area: "linha de 9m",
    duration: "instantanea",
    savingThrow: "Reflexos reduz à metade",
    summary: "Dispara um jato ácido causando 2d6 pontos de dano de ácido às criaturas na área (+1 por dado contra construtos e objetos soltos)."
  },
  {
    id: "t20.ameacas.magia.katana_celestial",
    name: "Katana Celestial",
    sourcePage: 404,
    category: "magia",
    spellLevel: 5,
    tradition: "divina",
    school: "evocacao",
    castingTime: "padrao",
    range: "pessoal",
    area: "linha de 60m ou duas de 30m",
    duration: "instantanea",
    savingThrow: "Reflexos parcial",
    summary: "Golpe vindo dos céus causa 12d8 pontos de dano de luz (12d12 em mortos-vivos) e deixa os alvos cegos e surdos até o fim da cena."
  },
  {
    id: "t20.ameacas.magia.momento_de_tormenta",
    name: "Momento de Tormenta",
    sourcePage: 404,
    category: "magia",
    spellLevel: 2,
    tradition: "universal",
    school: "convocacao",
    castingTime: "completa",
    range: "pessoal",
    area: "cubo de 30m",
    duration: "sustentada",
    savingThrow: "veja texto",
    summary: "Invoca uma nuvem rubra de tempestade lefeu que a cada turno manifesta chuva ácida (6d4 ácido), neblina venenosa (perde 2d12 PV), raios escarlates (6d8 eletricidade) ou pesadelos reais (4d6 psíquico e perde 1d4 PM)."
  },
  {
    id: "t20.ameacas.magia.transformacao_em_dragao",
    name: "Transformação em Dragão",
    sourcePage: 405,
    category: "magia",
    spellLevel: 4,
    tradition: "arcana",
    school: "transmutacao",
    castingTime: "completa",
    range: "pessoal",
    target: "você",
    duration: "sustentada",
    summary: "Concede +2 em For, Con, Int e Car, +5 na Defesa, RD 30 contra elemento dracônico e sopro de 8d6+8 em cone de 9m."
  },
  {
    id: "t20.ameacas.magia.conjurar_mortos_vivos_aprimoramentos",
    name: "Conjurar Mortos-vivos (Aprimoramentos de Ameaças)",
    sourcePage: 405,
    category: "magia",
    spellLevel: 3,
    tradition: "universal",
    school: "necromancia",
    summary: "Novas opções de invocação: Soterrados (+2 PM, causam frio e enredam), Fúria de Tauron (+3 PM, voo 12m e incorpóreo), Guerreiro Perpétuo (+3 PM, devotos de Arsenal, Defesa 33) e Zumbi Peçonha (+3 PM, devotos de Sszzaas, atordoa e envenena)."
  }
];

export const getT20AmeacasSpell = (id: string) => T20_AMEACAS_SPELLS.find((item) => item.id === id);
