// ============================================================================
// D&D 3.5 — Punhos e Espadas (Sword and Fist), edição brasileira:
// Capítulo 2: Classes de Prestígio (pp. 11-40). Transcrição integral de todas
// as 19 classes de prestígio oficiais da Devir Brasil (Tabelas 2-1 a 2-19).
// Ruleset "v35-pe".
// ============================================================================

export interface Dnd35PePrestigeLevel {
  level: number;
  bab: string;
  fort: number;
  ref: number;
  will: number;
  special: string;
}

export interface Dnd35PePrestigeRequirements {
  bab?: string;
  skills?: string[];
  feats?: string[];
  spells?: string[];
  special?: string[];
}

export interface Dnd35PePrestigeClass {
  id: string;
  name: string;
  page: number;
  hitDie: number;
  skillPoints: string;
  classSkills: string[];
  requirements: Dnd35PePrestigeRequirements;
  levels: Dnd35PePrestigeLevel[];
  features: { name: string; text: string }[];
  description: string;
}

export const DND35_PE_PRESTIGE_CLASSES: Dnd35PePrestigeClass[] = [
  {
    "id": "pe-prestige-acoiteador",
    "name": "Açoiteador",
    "page": 11,
    "hitDie": 10,
    "skillPoints": "2 + modificador de Int",
    "classSkills": [
      "Acrobacia (Des)",
      "Arte da Fuga (Des)",
      "Equilíbrio (Des)",
      "Intimidação (Car)",
      "Ofícios (Int)",
      "Profissão (Sab)",
      "Saltar (For)",
      "Usar Cordas (Des)"
    ],
    "requirements": {
      "bab": "+5",
      "skills": [
        "Usar Cordas: 2 graduações",
        "Ofícios (couro): 2 graduações"
      ],
      "feats": [
        "Usar Arma Exótica (chicote)",
        "Foco em Arma (chicote)",
        "Especialização em Arma (chicote)"
      ],
      "special": []
    },
    "levels": [
      {
        "level": 1,
        "bab": "+1",
        "fort": 2,
        "ref": 2,
        "will": 0,
        "special": "Ferrão do chicote, chicote aprimorado"
      },
      {
        "level": 2,
        "bab": "+2",
        "fort": 3,
        "ref": 3,
        "will": 0,
        "special": "Açoite furtivo +1d6"
      },
      {
        "level": 3,
        "bab": "+3",
        "fort": 3,
        "ref": 3,
        "will": 1,
        "special": "Chicote defensivo"
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": 4,
        "ref": 4,
        "will": 1,
        "special": "Açoite furtivo +2d6"
      },
      {
        "level": 5,
        "bab": "+5",
        "fort": 4,
        "ref": 4,
        "will": 1,
        "special": "Lacerar, chicote preênsil"
      },
      {
        "level": 6,
        "bab": "+6",
        "fort": 5,
        "ref": 5,
        "will": 2,
        "special": "Açoite furtivo +3d6"
      },
      {
        "level": 7,
        "bab": "+7",
        "fort": 5,
        "ref": 5,
        "will": 2,
        "special": "Mestre do chicote"
      },
      {
        "level": 8,
        "bab": "+8",
        "fort": 6,
        "ref": 6,
        "will": 2,
        "special": "Açoite furtivo +4d6"
      },
      {
        "level": 9,
        "bab": "+9",
        "fort": 6,
        "ref": 6,
        "will": 3,
        "special": "Golpe final debilitante"
      },
      {
        "level": 10,
        "bab": "+10",
        "fort": 7,
        "ref": 7,
        "will": 3,
        "special": "Açoite furtivo +5d6, dano mortal com chicote"
      }
    ],
    "features": [
      {
        "name": "Ferrão do Chicote (Ext)",
        "text": "O açoiteador pode causar dano letal normal com o chicote mesmo contra oponentes vestindo armadura."
      },
      {
        "name": "Chicote Aprimorado (Ext)",
        "text": "O personagem ameaça a área ao seu redor com o chicote como se fosse uma arma normal e não provoca ataques de oportunidade ao usá-lo."
      },
      {
        "name": "Açoite Furtivo (Ext)",
        "text": "Causa dano adicional ao atacar oponentes desprevenidos ou flanqueados com o chicote, escalando de +1d6 a +5d6."
      },
      {
        "name": "Chicote Defensivo (Ext)",
        "text": "No 3º nível, pode usar o chicote para aparar ataques corporais recebendo +2 de bônus na CA."
      },
      {
        "name": "Lacerar (Ext)",
        "text": "No 5º nível, seus ataques causam ferimentos lacerantes que sangram por 1 ponto de dano adicional por rodada."
      }
    ],
    "description": "Mestres absolutos do chicote, transformando tiras de couro e farpas metálicas numa arma letal capaz de desarmar, derrubar e estraçalhar armaduras."
  },
  {
    "id": "pe-prestige-andarilho-fantasma",
    "name": "Andarilho Fantasma",
    "page": 12,
    "hitDie": 10,
    "skillPoints": "2 + modificador de Int",
    "classSkills": [
      "Cavalgar (Des)",
      "Esconder-se (Des)",
      "Furtividade (Des)",
      "Intimidação (Car)",
      "Observar (Sab)",
      "Ouvir (Sab)",
      "Sobrevivência (Sab)"
    ],
    "requirements": {
      "bab": "+6",
      "skills": [
        "Sobrevivência: 6 graduações",
        "Intimidação: 4 graduações"
      ],
      "feats": [
        "Rastrear",
        "Vontade de Ferro"
      ],
      "special": [
        "O personagem deve ter sofrido uma traição que quase custou sua vida e jurado vingança implacável."
      ]
    },
    "levels": [
      {
        "level": 1,
        "bab": "+1",
        "fort": 2,
        "ref": 0,
        "will": 2,
        "special": "Presença aterradora, andarilho silencioso"
      },
      {
        "level": 2,
        "bab": "+2",
        "fort": 3,
        "ref": 0,
        "will": 3,
        "special": "Passo sem pegadas"
      },
      {
        "level": 3,
        "bab": "+3",
        "fort": 3,
        "ref": 1,
        "will": 3,
        "special": "Olhar do julgamento"
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": 4,
        "ref": 1,
        "will": 4,
        "special": "Passo fantasma (invisibilidade)"
      },
      {
        "level": 5,
        "bab": "+5",
        "fort": 4,
        "ref": 1,
        "will": 4,
        "special": "Fúria vingativa"
      },
      {
        "level": 6,
        "bab": "+6",
        "fort": 5,
        "ref": 2,
        "will": 5,
        "special": "Caminhada nas sombras"
      },
      {
        "level": 7,
        "bab": "+7",
        "fort": 5,
        "ref": 2,
        "will": 5,
        "special": "Imunidade a medo"
      },
      {
        "level": 8,
        "bab": "+8",
        "fort": 6,
        "ref": 2,
        "will": 6,
        "special": "Toque etéreo"
      },
      {
        "level": 9,
        "bab": "+9",
        "fort": 6,
        "ref": 3,
        "will": 6,
        "special": "Forma espectral"
      },
      {
        "level": 10,
        "bab": "+10",
        "fort": 7,
        "ref": 3,
        "will": 7,
        "special": "Vingança consumada"
      }
    ],
    "features": [
      {
        "name": "Presença Aterradora (Ext)",
        "text": "Inimigos que testemunhem o andarilho devem realizar teste de Vontade contra abalo de pânico moral."
      },
      {
        "name": "Passo sem Pegadas (Ext)",
        "text": "Não deixa rastros em terreno natural nem emite som ao se deslocar."
      },
      {
        "name": "Passo Fantasma (Sob)",
        "text": "Pode se tornar invisível ou etéreo temporariamente para cruzar obstáculos."
      }
    ],
    "description": "Guerreiros solitários que retornaram da fronteira da morte alimentados por uma determinação inquebrável de executar julgamento contra seus algozes."
  },
  {
    "id": "pe-prestige-cavaleiro",
    "name": "Cavaleiro",
    "page": 14,
    "hitDie": 10,
    "skillPoints": "2 + modificador de Int",
    "classSkills": [
      "Adestrar Animais (Car)",
      "Cavalgar (Des)",
      "Conhecimento (nobreza e realeza) (Int)",
      "Diplomacia (Car)",
      "Intimidação (Car)",
      "Ofícios (Int)",
      "Profissão (Sab)"
    ],
    "requirements": {
      "bab": "+8",
      "skills": [
        "Cavalgar: 11 graduações",
        "Adestrar Animais: 4 graduações"
      ],
      "feats": [
        "Combate Montado",
        "Ataque em Movimento",
        "Investida Montada",
        "Tiro Montado",
        "Arma de Haste Aprimorada"
      ],
      "special": [
        "Código de conduta cavalheiresco e montaria de guerra apropriada."
      ]
    },
    "levels": [
      {
        "level": 1,
        "bab": "+1",
        "fort": 2,
        "ref": 0,
        "will": 0,
        "special": "Cortejamento nobre, montaria leal"
      },
      {
        "level": 2,
        "bab": "+2",
        "fort": 3,
        "ref": 0,
        "will": 0,
        "special": "Investida devastadora"
      },
      {
        "level": 3,
        "bab": "+3",
        "fort": 3,
        "ref": 1,
        "will": 1,
        "special": "Liderança inspiradora"
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": 4,
        "ref": 1,
        "will": 1,
        "special": "Investida com lança implacável"
      },
      {
        "level": 5,
        "bab": "+5",
        "fort": 4,
        "ref": 1,
        "will": 1,
        "special": "Defesa montada aperfeiçoada"
      },
      {
        "level": 6,
        "bab": "+6",
        "fort": 5,
        "ref": 2,
        "will": 2,
        "special": "Dano supremo de investida"
      },
      {
        "level": 7,
        "bab": "+7",
        "fort": 5,
        "ref": 2,
        "will": 2,
        "special": "Comando de batalha"
      },
      {
        "level": 8,
        "bab": "+8",
        "fort": 6,
        "ref": 2,
        "will": 2,
        "special": "Investida implacável"
      },
      {
        "level": 9,
        "bab": "+9",
        "fort": 6,
        "ref": 3,
        "will": 3,
        "special": "Presença régia"
      },
      {
        "level": 10,
        "bab": "+10",
        "fort": 7,
        "ref": 3,
        "will": 3,
        "special": "Mestre da cavalaria"
      }
    ],
    "features": [
      {
        "name": "Investida Devastadora (Ext)",
        "text": "Multiplica o dano de investida montada usando lança de montaria em x3 ou x4."
      },
      {
        "name": "Montaria Leal (Ext)",
        "text": "Sua montaria recebe bônus de dados de vida, armadura natural e moral em testes de vontade."
      }
    ],
    "description": "Campeões do combate montado pesado, liderando cargas de lanceiros capazes de romper muralhas de escudos e exércitos inteiros."
  },
  {
    "id": "pe-prestige-cavaleiro-batedor-halfling",
    "name": "Cavaleiro Batedor Halfling",
    "page": 15,
    "hitDie": 10,
    "skillPoints": "4 + modificador de Int",
    "classSkills": [
      "Acrobacia (Des)",
      "Adestrar Animais (Car)",
      "Cavalgar (Des)",
      "Equilíbrio (Des)",
      "Esconder-se (Des)",
      "Furtividade (Des)",
      "Observar (Sab)",
      "Ouvir (Sab)",
      "Sobrevivência (Sab)"
    ],
    "requirements": {
      "bab": "+5",
      "skills": [
        "Cavalgar: 8 graduações",
        "Observar: 4 graduações",
        "Ouvir: 4 graduações"
      ],
      "feats": [
        "Combate Montado",
        "Esquiva",
        "Tiro Certeiro"
      ],
      "special": [
        "Raça: Halfling."
      ]
    },
    "levels": [
      {
        "level": 1,
        "bab": "+1",
        "fort": 0,
        "ref": 2,
        "will": 2,
        "special": "Montaria alerta, acuidade montada"
      },
      {
        "level": 2,
        "bab": "+2",
        "fort": 0,
        "ref": 3,
        "will": 3,
        "special": "Esquiva acrobática montada"
      },
      {
        "level": 3,
        "bab": "+3",
        "fort": 1,
        "ref": 3,
        "will": 3,
        "special": "Salto veloz de montaria"
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": 1,
        "ref": 4,
        "will": 4,
        "special": "Ataque em investida rápida"
      },
      {
        "level": 5,
        "bab": "+5",
        "fort": 1,
        "ref": 4,
        "will": 4,
        "special": "Disparo em movimento montado"
      },
      {
        "level": 6,
        "bab": "+6",
        "fort": 2,
        "ref": 5,
        "will": 5,
        "special": "Evasão montada"
      },
      {
        "level": 7,
        "bab": "+7",
        "fort": 2,
        "ref": 5,
        "will": 5,
        "special": "Giro defensivo"
      },
      {
        "level": 8,
        "bab": "+8",
        "fort": 2,
        "ref": 6,
        "will": 6,
        "special": "Ataque furtivo montado +1d6"
      },
      {
        "level": 9,
        "bab": "+9",
        "fort": 3,
        "ref": 6,
        "will": 6,
        "special": "Evasão aprimorada montada"
      },
      {
        "level": 10,
        "bab": "+10",
        "fort": 3,
        "ref": 7,
        "will": 7,
        "special": "Irmandade perfeita com a montaria"
      }
    ],
    "features": [
      {
        "name": "Esquiva Acrobática Montada (Ext)",
        "text": "Adiciona o modificador de Destreza da montaria como esquiva na CA combinada."
      },
      {
        "name": "Evasão Montada (Ext)",
        "text": "Tanto o cavaleiro quanto sua montaria adquirem os benefícios de Evasão ao montarem juntos."
      }
    ],
    "description": "Batedores halflings montados em cães de guarda ou pôneis velozes, combinando furtividade de terra e disparos em velocidade vertiginosa."
  },
  {
    "id": "pe-prestige-cavaleiro-protetor",
    "name": "Cavaleiro Protetor do Grande Reino",
    "page": 18,
    "hitDie": 10,
    "skillPoints": "2 + modificador de Int",
    "classSkills": [
      "Cavalgar (Des)",
      "Conhecimento (nobreza e realeza) (Int)",
      "Diplomacia (Car)",
      "Intimidação (Car)",
      "Ofícios (Int)",
      "Profissão (Sab)"
    ],
    "requirements": {
      "bab": "+8",
      "skills": [
        "Diplomacia: 6 graduações",
        "Cavalgar: 6 graduações"
      ],
      "feats": [
        "Ataque Poderoso",
        "Trespassar",
        "Liderança",
        "Vontade de Ferro"
      ],
      "special": [
        "Tendência: Leal e Bom ou Leal e Neutro; admissão formal na Ordem dos Cavaleiros Protetores."
      ]
    },
    "levels": [
      {
        "level": 1,
        "bab": "+1",
        "fort": 2,
        "ref": 0,
        "will": 2,
        "special": "Postura defensiva inabalável"
      },
      {
        "level": 2,
        "bab": "+2",
        "fort": 3,
        "ref": 0,
        "will": 3,
        "special": "Escudo dos inocentes"
      },
      {
        "level": 3,
        "bab": "+3",
        "fort": 3,
        "ref": 1,
        "will": 3,
        "special": "Golpe contra o caos"
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": 4,
        "ref": 1,
        "will": 4,
        "special": "Aura de coragem protetora"
      },
      {
        "level": 5,
        "bab": "+5",
        "fort": 4,
        "ref": 1,
        "will": 4,
        "special": "Resistência de aço"
      },
      {
        "level": 6,
        "bab": "+6",
        "fort": 5,
        "ref": 2,
        "will": 5,
        "special": "Muralha de honra"
      },
      {
        "level": 7,
        "bab": "+7",
        "fort": 5,
        "ref": 2,
        "will": 5,
        "special": "Golpe final honrado"
      },
      {
        "level": 8,
        "bab": "+8",
        "fort": 6,
        "ref": 2,
        "will": 6,
        "special": "Inspiração de batalha leal"
      },
      {
        "level": 9,
        "bab": "+9",
        "fort": 6,
        "ref": 3,
        "will": 6,
        "special": "Baluarte da justiça"
      },
      {
        "level": 10,
        "bab": "+10",
        "fort": 7,
        "ref": 3,
        "will": 7,
        "special": "Campeão supremo do reino"
      }
    ],
    "features": [
      {
        "name": "Postura Defensiva Inabalável (Ext)",
        "text": "Ganha bônus de Força, Constituição e CA ao sustentar uma posição de bloqueio."
      },
      {
        "name": "Escudo dos Inocentes (Ext)",
        "text": "Transfere parte do seu bônus de armadura para proteger aliados adjacentes indefesos."
      }
    ],
    "description": "Defensores da lei e dos reinos antigos, erguendo escudos intransponíveis para proteger os fracos e sustentar a ordem da civilização."
  },
  {
    "id": "pe-prestige-defensor-dedicado",
    "name": "Defensor Dedicado",
    "page": 19,
    "hitDie": 12,
    "skillPoints": "2 + modificador de Int",
    "classSkills": [
      "Acrobacia (Des)",
      "Equilíbrio (Des)",
      "Escalar (For)",
      "Intimidação (Car)",
      "Observar (Sab)",
      "Ouvir (Sab)",
      "Sentir Motivação (Sab)"
    ],
    "requirements": {
      "bab": "+5",
      "skills": [
        "Sentir Motivação: 4 graduações",
        "Observar: 4 graduações"
      ],
      "feats": [
        "Esquiva",
        "Reflexos de Combate",
        "Prontidão"
      ],
      "special": [
        "Contrato de guarda-costas pessoal assumido perante um protegido designado."
      ]
    },
    "levels": [
      {
        "level": 1,
        "bab": "+1",
        "fort": 2,
        "ref": 2,
        "will": 0,
        "special": "Designar protegido, interceptar ataque"
      },
      {
        "level": 2,
        "bab": "+2",
        "fort": 3,
        "ref": 3,
        "will": 0,
        "special": "Ataque retaliatório"
      },
      {
        "level": 3,
        "bab": "+3",
        "fort": 3,
        "ref": 3,
        "will": 1,
        "special": "Troca de posição defensiva"
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": 4,
        "ref": 4,
        "will": 1,
        "special": "Defesa dedicada +1"
      },
      {
        "level": 5,
        "bab": "+5",
        "fort": 4,
        "ref": 4,
        "will": 1,
        "special": "Absorver golpe"
      },
      {
        "level": 6,
        "bab": "+6",
        "fort": 5,
        "ref": 5,
        "will": 2,
        "special": "Contra-ataque fulminante"
      },
      {
        "level": 7,
        "bab": "+7",
        "fort": 5,
        "ref": 5,
        "will": 2,
        "special": "Defesa dedicada +2"
      },
      {
        "level": 8,
        "bab": "+8",
        "fort": 6,
        "ref": 6,
        "will": 2,
        "special": "Vínculo de lealdade total"
      },
      {
        "level": 9,
        "bab": "+9",
        "fort": 6,
        "ref": 6,
        "will": 3,
        "special": "Escudo de carne"
      },
      {
        "level": 10,
        "bab": "+10",
        "fort": 7,
        "ref": 7,
        "will": 3,
        "special": "Defesa dedicada +4, golpe salvador"
      }
    ],
    "features": [
      {
        "name": "Interceptar Ataque (Ext)",
        "text": "Pode se mover até 1,5m para interceptar um ataque corpo a corpo desferido contra seu protegido."
      },
      {
        "name": "Troca de Posição Defensiva (Ext)",
        "text": "Troca de lugar com o protegido adjacente como reação imediata a uma ameaça."
      }
    ],
    "description": "Guardiões juramentados e guarda-costas profissionais especializados em neutralizar assassinos e proteger seu cliente ao custo do próprio sangue."
  },
  {
    "id": "pe-prestige-destruidor",
    "name": "Destruidor",
    "page": 20,
    "hitDie": 10,
    "skillPoints": "2 + modificador de Int",
    "classSkills": [
      "Cavalgar (Des)",
      "Escalar (For)",
      "Intimidação (Car)",
      "Natação (For)",
      "Ofícios (Int)",
      "Sobrevivência (Sab)"
    ],
    "requirements": {
      "bab": "+6",
      "skills": [
        "Intimidação: 6 graduações",
        "Sobrevivência: 4 graduações"
      ],
      "feats": [
        "Ataque Poderoso",
        "Separar",
        "Trespassar"
      ],
      "special": [
        "Tendência: Qualquer Má; participação em ritos de destruição sanguinária."
      ]
    },
    "levels": [
      {
        "level": 1,
        "bab": "+1",
        "fort": 2,
        "ref": 0,
        "will": 0,
        "special": "Aura de medo, dor sacrificial"
      },
      {
        "level": 2,
        "bab": "+2",
        "fort": 3,
        "ref": 0,
        "will": 0,
        "special": "Golpe cruel +1d6"
      },
      {
        "level": 3,
        "bab": "+3",
        "fort": 3,
        "ref": 1,
        "will": 1,
        "special": "Fúria destruidora"
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": 4,
        "ref": 1,
        "will": 1,
        "special": "Separar aprimorado letal"
      },
      {
        "level": 5,
        "bab": "+5",
        "fort": 4,
        "ref": 1,
        "will": 1,
        "special": "Golpe cruel +2d6"
      },
      {
        "level": 6,
        "bab": "+6",
        "fort": 5,
        "ref": 2,
        "will": 2,
        "special": "Terror contagioso"
      },
      {
        "level": 7,
        "bab": "+7",
        "fort": 5,
        "ref": 2,
        "will": 2,
        "special": "Sede de sangue insaciável"
      },
      {
        "level": 8,
        "bab": "+8",
        "fort": 6,
        "ref": 2,
        "will": 2,
        "special": "Golpe cruel +3d6"
      },
      {
        "level": 9,
        "bab": "+9",
        "fort": 6,
        "ref": 3,
        "will": 3,
        "special": "Resistência visceral"
      },
      {
        "level": 10,
        "bab": "+10",
        "fort": 7,
        "ref": 3,
        "will": 3,
        "special": "Avatar da aniquilação"
      }
    ],
    "features": [
      {
        "name": "Aura de Medo (Sob)",
        "text": "Emite uma presença opressiva forçando oponentes adjacentes a testes de pânico."
      },
      {
        "name": "Golpe Cruel (Ext)",
        "text": "Causa dano adicional maciço que ignora defesas contra alvos feridos e em agonia."
      }
    ],
    "description": "Arautos do caos e devassidão marcial que canalizam o sadismo e a destruição total como caminho para o poder físico supremo."
  },
  {
    "id": "pe-prestige-duelista",
    "name": "Duelista",
    "page": 21,
    "hitDie": 10,
    "skillPoints": "4 + modificador de Int",
    "classSkills": [
      "Acrobacia (Des)",
      "Arte da Fuga (Des)",
      "Atuação (Car)",
      "Blefar (Car)",
      "Equilíbrio (Des)",
      "Falar Idioma (Int)",
      "Observar (Sab)",
      "Ouvir (Sab)",
      "Saltar (For)",
      "Sentir Motivação (Sab)"
    ],
    "requirements": {
      "bab": "+6",
      "skills": [
        "Acrobacia: 5 graduações",
        "Atuação: 3 graduações",
        "Equilíbrio: 5 graduações"
      ],
      "feats": [
        "Esquiva",
        "Mobilidade",
        "Acuidade em Arma (espada perfurante)"
      ],
      "special": []
    },
    "levels": [
      {
        "level": 1,
        "bab": "+1",
        "fort": 0,
        "ref": 2,
        "will": 0,
        "special": "Defesa astuta"
      },
      {
        "level": 2,
        "bab": "+2",
        "fort": 0,
        "ref": 3,
        "will": 0,
        "special": "Reação aprimorada"
      },
      {
        "level": 3,
        "bab": "+3",
        "fort": 1,
        "ref": 3,
        "will": 1,
        "special": "Mobilidade aprimorada"
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": 1,
        "ref": 4,
        "will": 1,
        "special": "Graça marcial"
      },
      {
        "level": 5,
        "bab": "+5",
        "fort": 1,
        "ref": 4,
        "will": 1,
        "special": "Golpe preciso +1d6"
      },
      {
        "level": 6,
        "bab": "+6",
        "fort": 2,
        "ref": 5,
        "will": 2,
        "special": "Aparar acrobático"
      },
      {
        "level": 7,
        "bab": "+7",
        "fort": 2,
        "ref": 5,
        "will": 2,
        "special": "Carga acrobática"
      },
      {
        "level": 8,
        "bab": "+8",
        "fort": 2,
        "ref": 6,
        "will": 2,
        "special": "Riposta veloz"
      },
      {
        "level": 9,
        "bab": "+9",
        "fort": 3,
        "ref": 6,
        "will": 3,
        "special": "Reflexos de aço"
      },
      {
        "level": 10,
        "bab": "+10",
        "fort": 3,
        "ref": 7,
        "will": 3,
        "special": "Golpe preciso +2d6, toque da morte"
      }
    ],
    "features": [
      {
        "name": "Defesa Astuta (Ext)",
        "text": "Adiciona o modificador de Inteligência à Classe de Armadura quando não usa armadura pesada nem escudo."
      },
      {
        "name": "Golpe Preciso (Ext)",
        "text": "Adiciona dados extras de dano perfurante ao atacar empunhando uma arma leve ou de uma mão."
      }
    ],
    "description": "Lutadores aristocráticos que transformam o combate com floretes e sabres numa dança de precisão cirúrgica e reflexos fulminantes."
  },
  {
    "id": "pe-prestige-gladiador",
    "name": "Gladiador",
    "page": 22,
    "hitDie": 10,
    "skillPoints": "4 + modificador de Int",
    "classSkills": [
      "Acrobacia (Des)",
      "Atuação (Car)",
      "Blefar (Car)",
      "Escalar (For)",
      "Intimidação (Car)",
      "Saltar (For)",
      "Sentir Motivação (Sab)"
    ],
    "requirements": {
      "bab": "+5",
      "skills": [
        "Atuação: 4 graduações",
        "Intimidação: 6 graduações"
      ],
      "feats": [
        "Foco em Arma (qualquer arma de arena)",
        "Lutar Sujo",
        "Especialização em Combate"
      ],
      "special": [
        "Experiência comprovada em combate sangrento de arena ou fosso."
      ]
    },
    "levels": [
      {
        "level": 1,
        "bab": "+1",
        "fort": 2,
        "ref": 0,
        "will": 0,
        "special": "Truques de arena, cortejar a multidão"
      },
      {
        "level": 2,
        "bab": "+2",
        "fort": 3,
        "ref": 0,
        "will": 0,
        "special": "Golpe espetacular"
      },
      {
        "level": 3,
        "bab": "+3",
        "fort": 3,
        "ref": 1,
        "will": 1,
        "special": "Finta de arena"
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": 4,
        "ref": 1,
        "will": 1,
        "special": "Inspiração sanguinolenta"
      },
      {
        "level": 5,
        "bab": "+5",
        "fort": 4,
        "ref": 1,
        "will": 1,
        "special": "Golpe de misericórdia teatral"
      },
      {
        "level": 6,
        "bab": "+6",
        "fort": 5,
        "ref": 2,
        "will": 2,
        "special": "Resistência da arena"
      },
      {
        "level": 7,
        "bab": "+7",
        "fort": 5,
        "ref": 2,
        "will": 2,
        "special": "Rugido do coliseu"
      },
      {
        "level": 8,
        "bab": "+8",
        "fort": 6,
        "ref": 2,
        "will": 2,
        "special": "Maestria em armas de arena"
      },
      {
        "level": 9,
        "bab": "+9",
        "fort": 6,
        "ref": 3,
        "will": 3,
        "special": "Sobrevivente nato"
      },
      {
        "level": 10,
        "bab": "+10",
        "fort": 7,
        "ref": 3,
        "will": 3,
        "special": "Lenda imortal das arenas"
      }
    ],
    "features": [
      {
        "name": "Truques de Arena (Ext)",
        "text": "Pode arremessar areia nos olhos de oponentes para cegá-los temporariamente e usar qualquer arma improvisada sem penalidade."
      },
      {
        "name": "Cortejar a Multidão (Ext)",
        "text": "Usa a reação do público para ganhar bônus de moral em ataques e defesas."
      }
    ],
    "description": "Lutadores das arenas de gladiadores, mestres do espetáculo da violência treinados para matar com estilo perante plateias sedentas de sangue."
  },
  {
    "id": "pe-prestige-iniciado-da-ordem-do-arco",
    "name": "Iniciado da Ordem do Arco",
    "page": 23,
    "hitDie": 10,
    "skillPoints": "2 + modificador de Int",
    "classSkills": [
      "Artesanato (fabricar arcos) (Int)",
      "Cavalgar (Des)",
      "Equilíbrio (Des)",
      "Observar (Sab)",
      "Ouvir (Sab)"
    ],
    "requirements": {
      "bab": "+5",
      "skills": [
        "Artesanato (fabricar arcos): 5 graduações"
      ],
      "feats": [
        "Tiro Certeiro",
        "Tiro Preciso",
        "Tiro Rápido",
        "Foco em Arma (arco longo ou arco curto)",
        "Precisão"
      ],
      "special": [
        "Iniciação solene na Ordem dos Arqueiros."
      ]
    },
    "levels": [
      {
        "level": 1,
        "bab": "+1",
        "fort": 0,
        "ref": 2,
        "will": 2,
        "special": "Disparo preciso aprimorado +1d8"
      },
      {
        "level": 2,
        "bab": "+2",
        "fort": 0,
        "ref": 3,
        "will": 3,
        "special": "Disparo em combate corporal sem provocar ataque de oportunidade"
      },
      {
        "level": 3,
        "bab": "+3",
        "fort": 1,
        "ref": 3,
        "will": 3,
        "special": "Disparo preciso aprimorado +2d8"
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": 1,
        "ref": 4,
        "will": 4,
        "special": "Arquearia zen aprimorada"
      },
      {
        "level": 5,
        "bab": "+5",
        "fort": 1,
        "ref": 4,
        "will": 4,
        "special": "Disparo preciso aprimorado +3d8"
      },
      {
        "level": 6,
        "bab": "+6",
        "fort": 2,
        "ref": 5,
        "will": 5,
        "special": "Disparo reflexo"
      },
      {
        "level": 7,
        "bab": "+7",
        "fort": 2,
        "ref": 5,
        "will": 5,
        "special": "Disparo preciso aprimorado +4d8"
      },
      {
        "level": 8,
        "bab": "+8",
        "fort": 2,
        "ref": 6,
        "will": 6,
        "special": "Flecha penetrante"
      },
      {
        "level": 9,
        "bab": "+9",
        "fort": 3,
        "ref": 6,
        "will": 6,
        "special": "Disparo preciso aprimorado +5d8"
      },
      {
        "level": 10,
        "bab": "+10",
        "fort": 3,
        "ref": 7,
        "will": 7,
        "special": "Disparo zen supremo"
      }
    ],
    "features": [
      {
        "name": "Disparo Preciso Aprimorado (Ext)",
        "text": "Adiciona dados de dano de precisão quando dispara com concentração em alvos a menos de 9 metros."
      },
      {
        "name": "Disparo em Combate Corporal (Ext)",
        "text": "Não provoca ataques de oportunidade ao disparar com arco estando adjacente a inimigos."
      }
    ],
    "description": "Arqueiros místicos que tratam o arco não como ferramenta, mas como disciplina espiritual que une respiração, mente e flecha num único vetor de destruição."
  },
  {
    "id": "pe-prestige-mestre-de-armas",
    "name": "Mestre de Armas",
    "page": 25,
    "hitDie": 10,
    "skillPoints": "2 + modificador de Int",
    "classSkills": [
      "Acrobacia (Des)",
      "Equilíbrio (Des)",
      "Intimidação (Car)",
      "Observar (Sab)",
      "Ouvir (Sab)",
      "Saltar (For)"
    ],
    "requirements": {
      "bab": "+5",
      "skills": [
        "Intimidação: 4 graduações"
      ],
      "feats": [
        "Esquiva",
        "Mobilidade",
        "Especialização em Combate",
        "Ataque em Movimento",
        "Foco em Arma (com a arma escolhida)",
        "Ataque Giratório"
      ],
      "special": [
        "Escolha de uma arma branca específica como arma foco."
      ]
    },
    "levels": [
      {
        "level": 1,
        "bab": "+1",
        "fort": 0,
        "ref": 2,
        "will": 0,
        "special": "Dano de Ki (máximo), arma predileta"
      },
      {
        "level": 2,
        "bab": "+2",
        "fort": 0,
        "ref": 3,
        "will": 0,
        "special": "Margem de ameaça aprimorada +1"
      },
      {
        "level": 3,
        "bab": "+3",
        "fort": 1,
        "ref": 3,
        "will": 1,
        "special": "Defesa superior com arma"
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": 1,
        "ref": 4,
        "will": 1,
        "special": "Multiplicador de crítico aprimorado +1"
      },
      {
        "level": 5,
        "bab": "+5",
        "fort": 1,
        "ref": 4,
        "will": 1,
        "special": "Dano de Ki adicional"
      },
      {
        "level": 6,
        "bab": "+6",
        "fort": 2,
        "ref": 5,
        "will": 2,
        "special": "Reflexos de combate kensai"
      },
      {
        "level": 7,
        "bab": "+7",
        "fort": 2,
        "ref": 5,
        "will": 2,
        "special": "Golpe giratório fulminante"
      },
      {
        "level": 8,
        "bab": "+8",
        "fort": 2,
        "ref": 6,
        "will": 2,
        "special": "Aparar perfeito"
      },
      {
        "level": 9,
        "bab": "+9",
        "fort": 3,
        "ref": 6,
        "will": 3,
        "special": "Dano de Ki mestre"
      },
      {
        "level": 10,
        "bab": "+10",
        "fort": 3,
        "ref": 7,
        "will": 3,
        "special": "Maestria absoluta na lâmina"
      }
    ],
    "features": [
      {
        "name": "Dano de Ki (Sob)",
        "text": "Pode canalizar foco de Ki para que os dados de dano de sua arma inflijam o valor máximo possível."
      },
      {
        "name": "Multiplicador Crítico Aprimorado (Ext)",
        "text": "Aumenta o multiplicador de crítico de sua arma foco em +1 (ex.: x2 vira x3)."
      }
    ],
    "description": "Espadachins lendários que devotaram suas vidas à perfeição de uma única lâmina, atingindo a sintonia onde a espada e a vontade se tornam indistinguíveis."
  },
  {
    "id": "pe-prestige-mestre-bebado",
    "name": "Mestre Bêbado",
    "page": 26,
    "hitDie": 8,
    "skillPoints": "4 + modificador de Int",
    "classSkills": [
      "Acrobacia (Des)",
      "Arte da Fuga (Des)",
      "Atuação (Car)",
      "Blefar (Car)",
      "Equilíbrio (Des)",
      "Natação (For)",
      "Ouvir (Sab)",
      "Saltar (For)"
    ],
    "requirements": {
      "bab": "+4",
      "skills": [
        "Acrobacia: 6 graduações",
        "Arte da Fuga: 6 graduações"
      ],
      "feats": [
        "Esquiva",
        "Ataque Desarmado Aprimorado",
        "Garrafa e Copo (usar armas improvisadas)"
      ],
      "special": [
        "Capacidade de usar Rajada de Golpes de monge."
      ]
    },
    "levels": [
      {
        "level": 1,
        "bab": "+0",
        "fort": 2,
        "ref": 2,
        "will": 0,
        "special": "Garrafas e banquetes como armas improvisadas, bebida estimulante"
      },
      {
        "level": 2,
        "bab": "+1",
        "fort": 3,
        "ref": 3,
        "will": 0,
        "special": "Cambalear defensivo"
      },
      {
        "level": 3,
        "bab": "+2",
        "fort": 3,
        "ref": 3,
        "will": 1,
        "special": "Sopro de álcool flamejante"
      },
      {
        "level": 4,
        "bab": "+3",
        "fort": 4,
        "ref": 4,
        "will": 1,
        "special": "Rolamento bêbado"
      },
      {
        "level": 5,
        "bab": "+3",
        "fort": 4,
        "ref": 4,
        "will": 1,
        "special": "Postura de monge bêbado"
      },
      {
        "level": 6,
        "bab": "+4",
        "fort": 5,
        "ref": 5,
        "will": 2,
        "special": "Imunidade a venenos embriagantes"
      },
      {
        "level": 7,
        "bab": "+5",
        "fort": 5,
        "ref": 5,
        "will": 2,
        "special": "Golpe tonto imprevisível"
      },
      {
        "level": 8,
        "bab": "+6",
        "fort": 6,
        "ref": 6,
        "will": 2,
        "special": "Dano aumentado de improviso"
      },
      {
        "level": 9,
        "bab": "+6",
        "fort": 6,
        "ref": 6,
        "will": 3,
        "special": "Bêbado invulnerável"
      },
      {
        "level": 10,
        "bab": "+7",
        "fort": 7,
        "ref": 7,
        "will": 3,
        "special": "Mestre da embriaguez mística"
      }
    ],
    "features": [
      {
        "name": "Armas Improvisadas (Ext)",
        "text": "Transforma cadeiras, garrafas quebradas e comida em armas letais causando dano como seu ataque desarmado."
      },
      {
        "name": "Cambalear Defensivo (Ext)",
        "text": "Seus movimentos desordenados concedem bônus de esquiva imprevisível na CA."
      }
    ],
    "description": "Praticantes do estilo embriagado do kung fu que transformam a perda de equilíbrio aparente na arma marcial mais traiçoeira e impenetrável do mundo."
  },
  {
    "id": "pe-prestige-mestre-das-correntes",
    "name": "Mestre das Correntes",
    "page": 29,
    "hitDie": 10,
    "skillPoints": "2 + modificador de Int",
    "classSkills": [
      "Arte da Fuga (Des)",
      "Equilíbrio (Des)",
      "Escalar (For)",
      "Intimidação (Car)",
      "Ofícios (ferraria) (Int)"
    ],
    "requirements": {
      "bab": "+5",
      "skills": [
        "Arte da Fuga: 4 graduações",
        "Escalar: 4 graduações"
      ],
      "feats": [
        "Usar Arma Exótica (corrente com cravos)",
        "Foco em Arma (corrente com cravos)",
        "Especialização em Combate",
        "Derrubar Aprimorado"
      ],
      "special": []
    },
    "levels": [
      {
        "level": 1,
        "bab": "+1",
        "fort": 2,
        "ref": 0,
        "will": 0,
        "special": "Aparar com corrente, corrente como extensão"
      },
      {
        "level": 2,
        "bab": "+2",
        "fort": 3,
        "ref": 0,
        "will": 0,
        "special": "Escalar corrente veloz"
      },
      {
        "level": 3,
        "bab": "+3",
        "fort": 3,
        "ref": 1,
        "will": 1,
        "special": "Prender oponente"
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": 4,
        "ref": 1,
        "will": 1,
        "special": "Alcance de chicote de corrente"
      },
      {
        "level": 5,
        "bab": "+5",
        "fort": 4,
        "ref": 1,
        "will": 1,
        "special": "Golpe duplo de corrente"
      },
      {
        "level": 6,
        "bab": "+6",
        "fort": 5,
        "ref": 2,
        "will": 2,
        "special": "Desarme implacável"
      },
      {
        "level": 7,
        "bab": "+7",
        "fort": 5,
        "ref": 2,
        "will": 2,
        "special": "Defesa de elos giratórios"
      },
      {
        "level": 8,
        "bab": "+8",
        "fort": 6,
        "ref": 2,
        "will": 2,
        "special": "Estrangular com corrente"
      },
      {
        "level": 9,
        "bab": "+9",
        "fort": 6,
        "ref": 3,
        "will": 3,
        "special": "Corrente viva"
      },
      {
        "level": 10,
        "bab": "+10",
        "fort": 7,
        "ref": 3,
        "will": 3,
        "special": "Dança das correntes da morte"
      }
    ],
    "features": [
      {
        "name": "Aparar com Corrente (Ext)",
        "text": "Usa os elos girando em torno do corpo para defletir armas e flechas, ganhando +2 de bônus na CA."
      },
      {
        "name": "Prender Oponente (Ext)",
        "text": "Pode enlaçar os membros do adversário para imobilizá-lo e restringir sua movimentação e conjuração."
      }
    ],
    "description": "Especialistas em correntes com cravos e elos de aço reforçados, capazes de envolver o campo de batalha numa rede giratória de metal dilacerante."
  },
  {
    "id": "pe-prestige-mestre-da-guerra",
    "name": "Mestre da Guerra",
    "page": 30,
    "hitDie": 10,
    "skillPoints": "2 + modificador de Int",
    "classSkills": [
      "Conhecimento (estratégia e guerra) (Int)",
      "Conhecimento (engenharia) (Int)",
      "Diplomacia (Car)",
      "Intimidação (Car)",
      "Ofícios (Int)",
      "Sentir Motivação (Sab)"
    ],
    "requirements": {
      "bab": "+7",
      "skills": [
        "Diplomacia: 5 graduações",
        "Intimidação: 5 graduações"
      ],
      "feats": [
        "Liderança",
        "Vontade de Ferro"
      ],
      "special": [
        "Comando ativo de pelotões ou tropas de batalha."
      ]
    },
    "levels": [
      {
        "level": 1,
        "bab": "+1",
        "fort": 2,
        "ref": 0,
        "will": 2,
        "special": "Aura de comando militar"
      },
      {
        "level": 2,
        "bab": "+2",
        "fort": 3,
        "ref": 0,
        "will": 3,
        "special": "Tática de cerco defensiva"
      },
      {
        "level": 3,
        "bab": "+3",
        "fort": 3,
        "ref": 1,
        "will": 3,
        "special": "Liderança de tropas leais"
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": 4,
        "ref": 1,
        "will": 4,
        "special": "Comando de investida tática"
      },
      {
        "level": 5,
        "bab": "+5",
        "fort": 4,
        "ref": 1,
        "will": 4,
        "special": "Torre de comando fortificada"
      },
      {
        "level": 6,
        "bab": "+6",
        "fort": 5,
        "ref": 2,
        "will": 5,
        "special": "Estratégia de flanco superior"
      },
      {
        "level": 7,
        "bab": "+7",
        "fort": 5,
        "ref": 2,
        "will": 5,
        "special": "Grito de vitória estimulante"
      },
      {
        "level": 8,
        "bab": "+8",
        "fort": 6,
        "ref": 2,
        "will": 6,
        "special": "Resistência de trincheira"
      },
      {
        "level": 9,
        "bab": "+9",
        "fort": 6,
        "ref": 3,
        "will": 6,
        "special": "Mente estratégica infalível"
      },
      {
        "level": 10,
        "bab": "+10",
        "fort": 7,
        "ref": 3,
        "will": 7,
        "special": "General supremo das armas"
      }
    ],
    "features": [
      {
        "name": "Aura de Comando (Ext)",
        "text": "Aliados próximos ganham bônus de moral em jogadas de ataque, dano e testes de Vontade contra medo."
      },
      {
        "name": "Torre de Comando (Ext)",
        "text": "Recebe uma fortificação concedida pelo seu patrono ou reino para abrigar sua companhia militar."
      }
    ],
    "description": "Generais e capitães mercenários veteranos que comandam batalhões e moldam o destino dos impérios no tabuleiro da guerra em grande escala."
  },
  {
    "id": "pe-prestige-mestre-samurai",
    "name": "Mestre Samurai",
    "page": 32,
    "hitDie": 10,
    "skillPoints": "2 + modificador de Int",
    "classSkills": [
      "Cavalgar (Des)",
      "Conhecimento (nobreza e realeza) (Int)",
      "Diplomacia (Car)",
      "Intimidação (Car)",
      "Sentir Motivação (Sab)"
    ],
    "requirements": {
      "bab": "+5",
      "skills": [
        "Intimidação: 4 graduações",
        "Sentir Motivação: 4 graduações"
      ],
      "feats": [
        "Usar Arma Exótica (katana)",
        "Saque Rápido",
        "Foco em Arma (katana)"
      ],
      "special": [
        "Código de honra do Bushido e serviço a um senhor feudal (daimyo)."
      ]
    },
    "levels": [
      {
        "level": 1,
        "bab": "+1",
        "fort": 2,
        "ref": 0,
        "will": 0,
        "special": "Espada ancestral honrada, iaijutsu rápido"
      },
      {
        "level": 2,
        "bab": "+2",
        "fort": 3,
        "ref": 0,
        "will": 0,
        "special": "Ataque com duas espadas (daisho)"
      },
      {
        "level": 3,
        "bab": "+3",
        "fort": 3,
        "ref": 1,
        "will": 1,
        "special": "Olhar assustador de samurai"
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": 4,
        "ref": 1,
        "will": 1,
        "special": "Golpe supremo de iaijutsu +2d6"
      },
      {
        "level": 5,
        "bab": "+5",
        "fort": 4,
        "ref": 1,
        "will": 1,
        "special": "Defesa de duas espadas"
      },
      {
        "level": 6,
        "bab": "+6",
        "fort": 5,
        "ref": 2,
        "will": 2,
        "special": "Espada ancestral aprimorada"
      },
      {
        "level": 7,
        "bab": "+7",
        "fort": 5,
        "ref": 2,
        "will": 2,
        "special": "Golpe de iaijutsu mortal +4d6"
      },
      {
        "level": 8,
        "bab": "+8",
        "fort": 6,
        "ref": 2,
        "will": 2,
        "special": "Vontade inabalável de guerreiro"
      },
      {
        "level": 9,
        "bab": "+9",
        "fort": 6,
        "ref": 3,
        "will": 3,
        "special": "Lâmina cortadora de almas"
      },
      {
        "level": 10,
        "bab": "+10",
        "fort": 7,
        "ref": 3,
        "will": 3,
        "special": "Mestre absoluto do Bushido"
      }
    ],
    "features": [
      {
        "name": "Espada Ancestral (Ext)",
        "text": "Pode despertar os espíritos ancestrais em sua katana concedendo bônus mágicos e propriedades sobrenaturais crescentes."
      },
      {
        "name": "Iaijutsu Rápido (Ext)",
        "text": "Desembainha a espada e disfere um ataque cortante com dano bônus devastador antes que o inimigo possa reagir."
      }
    ],
    "description": "Cavaleiros orientais do código Bushido que empunham a katana e wakizashi com devoção sagrada e velocidade de saque inigualável."
  },
  {
    "id": "pe-prestige-ninja-da-lua-crescente",
    "name": "Ninja da Lua Crescente",
    "page": 34,
    "hitDie": 8,
    "skillPoints": "4 + modificador de Int",
    "classSkills": [
      "Acrobacia (Des)",
      "Arte da Fuga (Des)",
      "Disfarces (Car)",
      "Equilíbrio (Des)",
      "Escalar (For)",
      "Esconder-se (Des)",
      "Furtividade (Des)",
      "Observar (Sab)",
      "Ouvir (Sab)",
      "Saltar (For)"
    ],
    "requirements": {
      "bab": "+5",
      "skills": [
        "Esconder-se: 8 graduações",
        "Furtividade: 8 graduações",
        "Acrobacia: 5 graduações"
      ],
      "feats": [
        "Esquiva",
        "Mobilidade",
        "Reflexos Rápidos"
      ],
      "special": [
        "Admissão iniciática no clã secreto da Lua Crescente."
      ]
    },
    "levels": [
      {
        "level": 1,
        "bab": "+0",
        "fort": 0,
        "ref": 2,
        "will": 0,
        "special": "Passo silencioso, ataque furtivo +1d6"
      },
      {
        "level": 2,
        "bab": "+1",
        "fort": 0,
        "ref": 3,
        "will": 0,
        "special": "Queda suave de monge"
      },
      {
        "level": 3,
        "bab": "+2",
        "fort": 1,
        "ref": 3,
        "will": 1,
        "special": "Ataque furtivo +2d6, uso de venenos"
      },
      {
        "level": 4,
        "bab": "+3",
        "fort": 1,
        "ref": 4,
        "will": 1,
        "special": "Invisibilidade lunar"
      },
      {
        "level": 5,
        "bab": "+3",
        "fort": 1,
        "ref": 4,
        "will": 1,
        "special": "Ataque furtivo +3d6"
      },
      {
        "level": 6,
        "bab": "+4",
        "fort": 2,
        "ref": 5,
        "will": 2,
        "special": "Salto nas sombras"
      },
      {
        "level": 7,
        "bab": "+5",
        "fort": 2,
        "ref": 5,
        "will": 2,
        "special": "Ataque furtivo +4d6"
      },
      {
        "level": 8,
        "bab": "+6",
        "fort": 2,
        "ref": 6,
        "will": 2,
        "special": "Mestre da névoa sombria"
      },
      {
        "level": 9,
        "bab": "+6",
        "fort": 3,
        "ref": 6,
        "will": 3,
        "special": "Ataque furtivo +5d6"
      },
      {
        "level": 10,
        "bab": "+7",
        "fort": 3,
        "ref": 7,
        "will": 3,
        "special": "Golpe fantasma mortal"
      }
    ],
    "features": [
      {
        "name": "Ataque Furtivo (Ext)",
        "text": "Adiciona dados de dano furtivo quando ataca alvos sem Destreza na CA ou flanqueados, escalando até +5d6."
      },
      {
        "name": "Invisibilidade Lunar (Sob)",
        "text": "Pode se fundir com as sombras e luz da lua para ficar invisível como a magia homônima."
      }
    ],
    "description": "Espiões e assassinos místicos do clã da Lua Crescente, operando como espectros nas noites sem estrelas para executar seus alvos."
  },
  {
    "id": "pe-prestige-protetor-tribal",
    "name": "Protetor Tribal",
    "page": 35,
    "hitDie": 10,
    "skillPoints": "2 + modificador de Int",
    "classSkills": [
      "Adestrar Animais (Car)",
      "Escalar (For)",
      "Esconder-se (Des)",
      "Furtividade (Des)",
      "Intimidação (Car)",
      "Natação (For)",
      "Observar (Sab)",
      "Ouvir (Sab)",
      "Saltar (For)",
      "Sobrevivência (Sab)"
    ],
    "requirements": {
      "bab": "+5",
      "skills": [
        "Sobrevivência: 8 graduações",
        "Observar: 4 graduações"
      ],
      "feats": [
        "Ataque Poderoso",
        "Trespassar",
        "Rastrear"
      ],
      "special": [
        "Membro ativo e escolhido como guardião juramentado de uma tribo bárbara ou selvagem."
      ]
    },
    "levels": [
      {
        "level": 1,
        "bab": "+1",
        "fort": 2,
        "ref": 2,
        "will": 0,
        "special": "Defesa da tribo, terreno familiar"
      },
      {
        "level": 2,
        "bab": "+2",
        "fort": 3,
        "ref": 3,
        "will": 0,
        "special": "Fúria protetora +1"
      },
      {
        "level": 3,
        "bab": "+3",
        "fort": 3,
        "ref": 3,
        "will": 1,
        "special": "Faro apurado"
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": 4,
        "ref": 4,
        "will": 1,
        "special": "Golpe selvagem implacável"
      },
      {
        "level": 5,
        "bab": "+5",
        "fort": 4,
        "ref": 4,
        "will": 1,
        "special": "Fúria protetora +2"
      },
      {
        "level": 6,
        "bab": "+6",
        "fort": 5,
        "ref": 5,
        "will": 2,
        "special": "Resistência tribal contra magia"
      },
      {
        "level": 7,
        "bab": "+7",
        "fort": 5,
        "ref": 5,
        "will": 2,
        "special": "Vínculo totem com a terra"
      },
      {
        "level": 8,
        "bab": "+8",
        "fort": 6,
        "ref": 6,
        "will": 2,
        "special": "Fúria protetora +3"
      },
      {
        "level": 9,
        "bab": "+9",
        "fort": 6,
        "ref": 6,
        "will": 3,
        "special": "Pele de ferro ancestral"
      },
      {
        "level": 10,
        "bab": "+10",
        "fort": 7,
        "ref": 7,
        "will": 3,
        "special": "Guardião eterno do povo"
      }
    ],
    "features": [
      {
        "name": "Defesa da Tribo (Ext)",
        "text": "Ganha bônus de ataque e dano quando defende terras tribais e membros de sua comunidade contra invasores."
      },
      {
        "name": "Fúria Protetora (Ext)",
        "text": "Entra em estado de fúria selvagem adicionando bônus na Força e Constituição ao ver aliados feridos."
      }
    ],
    "description": "Guerreiros sagrados das tribos das estepes e florestas, protegendo as terras natais contra forasteiros e monstros predadores."
  },
  {
    "id": "pe-prestige-punho-de-hextor",
    "name": "Punho de Hextor",
    "page": 37,
    "hitDie": 10,
    "skillPoints": "2 + modificador de Int",
    "classSkills": [
      "Cavalgar (Des)",
      "Conhecimento (religião) (Int)",
      "Intimidação (Car)",
      "Ofícios (Int)",
      "Profissão (Sab)"
    ],
    "requirements": {
      "bab": "+5",
      "skills": [
        "Intimidação: 4 graduações",
        "Conhecimento (religião): 4 graduações"
      ],
      "feats": [
        "Ataque Poderoso",
        "Separar",
        "Foco em Arma (mangual pesado)"
      ],
      "special": [
        "Tendência: Leal e Mau; devoto consagrado de Hextor, deus da tirania."
      ]
    },
    "levels": [
      {
        "level": 1,
        "bab": "+1",
        "fort": 2,
        "ref": 0,
        "will": 0,
        "special": "Aura de tirania brutal, punho de ferro"
      },
      {
        "level": 2,
        "bab": "+2",
        "fort": 3,
        "ref": 0,
        "will": 0,
        "special": "Dano de tortura +1d6"
      },
      {
        "level": 3,
        "bab": "+3",
        "fort": 3,
        "ref": 1,
        "will": 1,
        "special": "Comando de ferro"
      },
      {
        "level": 4,
        "bab": "+4",
        "fort": 4,
        "ref": 1,
        "will": 1,
        "special": "Dano de tortura +2d6"
      },
      {
        "level": 5,
        "bab": "+5",
        "fort": 4,
        "ref": 1,
        "will": 1,
        "special": "Imposição tirânica"
      },
      {
        "level": 6,
        "bab": "+6",
        "fort": 5,
        "ref": 2,
        "will": 2,
        "special": "Dano de tortura +3d6"
      },
      {
        "level": 7,
        "bab": "+7",
        "fort": 5,
        "ref": 2,
        "will": 2,
        "special": "Braço de Hextor"
      },
      {
        "level": 8,
        "bab": "+8",
        "fort": 6,
        "ref": 2,
        "will": 2,
        "special": "Dano de tortura +4d6"
      },
      {
        "level": 9,
        "bab": "+9",
        "fort": 6,
        "ref": 3,
        "will": 3,
        "special": "Muralha de aço negro"
      },
      {
        "level": 10,
        "bab": "+10",
        "fort": 7,
        "ref": 3,
        "will": 3,
        "special": "General do punho de ferro"
      }
    ],
    "features": [
      {
        "name": "Punho de Ferro (Ext)",
        "text": "Recebe manoplas sagradas forjadas no ódio que inflamam seus golpes desarmados e ataques com mangual com força impiedosa."
      },
      {
        "name": "Aura de Tirania (Sob)",
        "text": "Inimigos próximos sofrem penalidades morais em ataques e perícias pela crueldade iminente."
      }
    ],
    "description": "Campeões brutais da fé de Hextor que usam armaduras negras pontiagudas e manguais para impor a ordem e a submissão aos fracos."
  },
  {
    "id": "pe-prestige-vingador-escarlate",
    "name": "Vingador Escarlate",
    "page": 38,
    "hitDie": 8,
    "skillPoints": "4 + modificador de Int",
    "classSkills": [
      "Acrobacia (Des)",
      "Arte da Fuga (Des)",
      "Atuação (Car)",
      "Blefar (Car)",
      "Cura (Sab)",
      "Equilíbrio (Des)",
      "Observar (Sab)",
      "Ouvir (Sab)",
      "Saltar (For)",
      "Sentir Motivação (Sab)"
    ],
    "requirements": {
      "bab": "+5",
      "skills": [
        "Sentir Motivação: 5 graduações",
        "Acrobacia: 5 graduações"
      ],
      "feats": [
        "Ataque Desarmado Aprimorado",
        "Ataque Atordoante",
        "Reflexos de Combate"
      ],
      "special": [
        "Capacidade de manipular energia Ki interior."
      ]
    },
    "levels": [
      {
        "level": 1,
        "bab": "+0",
        "fort": 0,
        "ref": 2,
        "will": 2,
        "special": "Fogo de Ki vermelho, golpe atordoante amplificado"
      },
      {
        "level": 2,
        "bab": "+1",
        "fort": 0,
        "ref": 3,
        "will": 3,
        "special": "Cura de sangue pessoal"
      },
      {
        "level": 3,
        "bab": "+2",
        "fort": 1,
        "ref": 3,
        "will": 3,
        "special": "Rajada de sangue Ki"
      },
      {
        "level": 4,
        "bab": "+3",
        "fort": 1,
        "ref": 4,
        "will": 4,
        "special": "Velocidade da vingança"
      },
      {
        "level": 5,
        "bab": "+3",
        "fort": 1,
        "ref": 4,
        "will": 4,
        "special": "Toque escarlate fatal"
      },
      {
        "level": 6,
        "bab": "+4",
        "fort": 2,
        "ref": 5,
        "will": 5,
        "special": "Armadura de sangue Ki"
      },
      {
        "level": 7,
        "bab": "+5",
        "fort": 2,
        "ref": 5,
        "will": 2,
        "special": "Rajada carmesim penetrante"
      },
      {
        "level": 8,
        "bab": "+6",
        "fort": 2,
        "ref": 6,
        "will": 2,
        "special": "Fúria escarlate inquebrável"
      },
      {
        "level": 9,
        "bab": "+6",
        "fort": 3,
        "ref": 6,
        "will": 3,
        "special": "Ondas de dor vingativa"
      },
      {
        "level": 10,
        "bab": "+7",
        "fort": 3,
        "ref": 7,
        "will": 3,
        "special": "Avatar do dragão vermelho de Ki"
      }
    ],
    "features": [
      {
        "name": "Fogo de Ki Vermelho (Sob)",
        "text": "Canaliza energia Ki visível como chamas escarlates nas mãos para infligir dano de fogo e força adicional."
      },
      {
        "name": "Cura de Sangue (Sob)",
        "text": "Usa a circulação de Ki para estancar hemorragias e regenerar pontos de vida durante o combate."
      }
    ],
    "description": "Artistas marciais místicos que dominam a canalização do Ki avermelhado gerado pela raiva focada e vingança honrada contra injustiças."
  }
];
