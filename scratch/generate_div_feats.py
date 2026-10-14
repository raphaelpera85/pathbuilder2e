# Helper script to assemble dnd35DivFeats.ts with high fidelity
import json

feats_data = [
    {
        "id": "div-feat-acelerar-expulsao",
        "name": "Acelerar Expulsão",
        "nameEn": "Quicken Turning",
        "category": "geral",
        "page": 79,
        "prerequisites": ["Habilidade de expulsar ou fascinar mortos-vivos"],
        "benefit": "O personagem é capaz de expulsar ou fascinar mortos-vivos como uma ação livre. Ele ainda será capaz de realizar apenas uma tentativa de expulsão por rodada."
    },
    {
        "id": "div-feat-armas-gloriosas",
        "name": "Armas Gloriosas",
        "nameEn": "Glorious Weapons",
        "category": "divino",
        "page": 79,
        "prerequisites": ["Habilidade de expulsar ou fascinar mortos-vivos"],
        "benefit": "O personagem gasta uma tentativa de expulsar ou fascinar como ação padrão para imbuir todas as armas corpo a corpo de seus aliados em uma explosão de 18 metros com a tendência do personagem (Bem se canalizar energia positiva, Mal se canalizar negativa). Essas armas ignoram Redução de Dano como se possuíssem essa tendência até o final do próximo turno do personagem."
    },
    {
        "id": "div-feat-asas-da-aguia",
        "name": "Asas da Águia",
        "nameEn": "Eagle's Wings",
        "category": "selvagem",
        "page": 79,
        "prerequisites": ["Habilidade de forma selvagem"],
        "benefit": "O personagem pode gastar uma utilização de sua forma selvagem para expelir asas de suas costas. Elas lhe permitem voar com deslocamento de 18 metros (manobrabilidade média) durante 1 hora."
    },
    {
        "id": "div-feat-bote-do-leao",
        "name": "Bote do Leão",
        "nameEn": "Lion's Pounce",
        "category": "selvagem",
        "page": 79,
        "prerequisites": ["Habilidade de forma selvagem"],
        "benefit": "Durante uma investida, o personagem pode gastar uma utilização de forma selvagem como uma ação livre para desferir um ataque total completo ao final da investida.",
        "normal": "Sem esse talento, o personagem só pode realizar um único ataque simples após uma investida."
    },
    {
        "id": "div-feat-consagrar-magia",
        "name": "Consagrar Magia",
        "nameEn": "Consecrate Spell",
        "category": "metamagico",
        "page": 79,
        "prerequisites": ["Tendência: Qualquer Bom"],
        "benefit": "Uma magia modificada por este talento adquire o descritor [Bem]. Além disso, se a magia infligir dano, metade do valor (arredondado para baixo) é resultado direto do poder divino sagrado e não pode ser reduzido por resistência ou imunidade a energia. Uma magia consagrada ocupa um espaço de magia um nível superior ao normal."
    },
    {
        "id": "div-feat-corromper-magia",
        "name": "Corromper Magia",
        "nameEn": "Corrupt Spell",
        "category": "metamagico",
        "page": 79,
        "prerequisites": ["Tendência: Qualquer Maligno"],
        "benefit": "Uma magia modificada por este talento adquire o descritor [Mal]. Além disso, se a magia infligir dano, metade do valor (arredondado para baixo) é resultado direto do poder profano perverso e não pode ser reduzido por resistência ou imunidade a energia. Uma magia corrompida ocupa um espaço de magia um nível superior ao normal."
    },
    {
        "id": "div-feat-couro-de-elefante",
        "name": "Couro de Elefante",
        "nameEn": "Elephant's Hide",
        "category": "selvagem",
        "page": 80,
        "prerequisites": ["Habilidade de adotar forma selvagem de criaturas Grandes"],
        "benefit": "O personagem gasta uma utilização de sua forma selvagem para obter +7 de bônus de armadura natural na CA por 10 minutos. Esse bônus se acumula com qualquer armadura natural existente."
    },
    {
        "id": "div-feat-cura-ampliada",
        "name": "Cura Ampliada",
        "nameEn": "Augment Healing",
        "category": "geral",
        "page": 80,
        "prerequisites": ["4 graduações em Cura"],
        "benefit": "Acrescente +2 pontos de vida recuperados por nível de magia para cada magia de Conjuração [Cura] que o personagem conjurar."
    },
    {
        "id": "div-feat-cura-elemental",
        "name": "Cura Elemental",
        "nameEn": "Elemental Healing",
        "category": "divino",
        "page": 80,
        "prerequisites": ["Habilidade de fascinar criaturas com um subtipo elemental"],
        "benefit": "O personagem pode gastar uma tentativa de fascinar de domínio elemental como uma ação padrão para liberar um pulso em explosão de 18 metros que cura 1d8 pontos de dano para cada 2 níveis de clérigo em todas as criaturas do subtipo elemental correspondente."
    },
    {
        "id": "div-feat-cura-espontanea",
        "name": "Cura Espontânea",
        "nameEn": "Spontaneous Healer",
        "category": "geral",
        "page": 80,
        "prerequisites": ["Sab 13", "4 graduações em Conhecimento (religião)", "Tendência: Qualquer não-maligna", "Capacidade de conjurar magias divinas"],
        "benefit": "O personagem pode converter qualquer magia preparada da lista de sua classe em uma magia da subescola Cura de mesmo nível ou inferior, uma quantidade de vezes por dia igual ao seu modificador de Sabedoria."
    },
    {
        "id": "div-feat-cura-sagrada",
        "name": "Cura Sagrada",
        "nameEn": "Sacred Healing",
        "category": "divino",
        "page": 80,
        "prerequisites": ["8 graduações em Cura", "Habilidade de expulsar mortos-vivos"],
        "benefit": "O personagem gasta uma tentativa de expulsar como ação de rodada completa para conceder cura acelerada 3 a todas as criaturas vivas em um raio de 18 metros durante 1 rodada mais 1 rodada por ponto de modificador de Carisma."
    },
    {
        "id": "div-feat-conjurador-experiente",
        "name": "Conjurador Experiente",
        "nameEn": "Practiced Caster",
        "category": "geral",
        "page": 80,
        "prerequisites": ["4 graduações em Identificar Magia"],
        "benefit": "Seu nível de conjurador para uma classe de conjurador escolhida aumenta em +4, até o limite máximo dos seus Dados de Vida totais.",
        "special": "Você pode adquirir este talento várias vezes; cada vez ele se aplica a uma classe de conjurador diferente."
    },
    {
        "id": "div-feat-destruir-aprimorado",
        "name": "Destruir Aprimorado",
        "nameEn": "Improved Smite",
        "category": "geral",
        "page": 80,
        "prerequisites": ["Car 13", "Habilidade de classe Destruir"],
        "benefit": "Sempre que desferir um ataque de destruir, o ataque é considerado como possuindo a tendência apropriada do personagem para superar Redução de Dano e inflige +1d6 pontos de dano adicionais contra alvos com tendência oposta."
    },
    {
        "id": "div-feat-destruir-elementais",
        "name": "Destruir Elementais",
        "nameEn": "Elemental Smite",
        "category": "divino",
        "page": 81,
        "prerequisites": ["Habilidade de expulsar criaturas com um subtipo elemental"],
        "benefit": "Como ação livre antes de um ataque corpo a corpo contra uma criatura com o subtipo elemental oposto, gaste uma tentativa de expulsar elemental para somar seu nível de clérigo na jogada de ataque e infligir +1d6 pontos de dano por nível de clérigo se acertar."
    },
    {
        "id": "div-feat-discipulo-arcano",
        "name": "Discípulo Arcano",
        "nameEn": "Arcane Disciple",
        "category": "geral",
        "page": 81,
        "prerequisites": ["4 graduações em Conhecimento (religião)", "4 graduações em Identificar Magia", "Capacidade de conjurar magias arcanas", "Tendência idêntica à divindade escolhida"],
        "benefit": "Escolha uma divindade e um domínio dela. As magias daquele domínio são adicionadas à lista de magias da sua classe arcana, utilizando Sabedoria para determinar o nível máximo e as CDs."
    },
    {
        "id": "div-feat-discipulo-do-sol",
        "name": "Discípulo do Sol",
        "nameEn": "Disciple of the Sun",
        "category": "divino",
        "page": 81,
        "prerequisites": ["Habilidade de expulsar mortos-vivos", "Tendência: Qualquer Boa"],
        "benefit": "Ao obter sucesso em uma tentativa de expulsão de mortos-vivos, você pode gastar uma segunda tentativa adicional imediatamente para destruir os mortos-vivos que seriam normalmente apenas expulsos."
    },
    {
        "id": "div-feat-dominio-espontaneo",
        "name": "Domínio Espontâneo",
        "nameEn": "Spontaneous Domain Caster",
        "category": "divino",
        "page": 82,
        "prerequisites": ["Habilidade de expulsar ou fascinar mortos-vivos"],
        "benefit": "Escolha um de seus domínios clericais. Você pode gastar uma tentativa de expulsar/fascinar para converter qualquer magia preparada de mesmo nível ou superior em uma magia desse domínio espontaneamente."
    },
    {
        "id": "div-feat-fe-verdadeira",
        "name": "Fé Verdadeira",
        "nameEn": "True Believer",
        "category": "divino",
        "page": 82,
        "prerequisites": ["Devoção a uma divindade específica", "Tendência a até um passo da divindade"],
        "benefit": "Uma vez por dia, ao realizar um teste de resistência, você pode declarar o uso da sua fé verdadeira para receber um bônus sagrado (ou profano) de +2 no teste. Além disso, permite utilizar as relíquias de sua divindade."
    },
    {
        "id": "div-feat-ferocidade-do-javali",
        "name": "Ferocidade do Javali",
        "nameEn": "Boar's Ferocity",
        "category": "selvagem",
        "page": 82,
        "prerequisites": ["Habilidade de forma selvagem"],
        "benefit": "Se seus pontos de vida caírem a 0 ou menos (mas não estiver morto), você pode gastar uma utilização de forma selvagem como ação imediata para continuar lutando sem ficar incapacitado ou inconsciente durante 1 minuto."
    },
    {
        "id": "div-feat-foco-em-dominio",
        "name": "Foco em Domínio",
        "nameEn": "Domain Focus",
        "category": "geral",
        "page": 82,
        "prerequisites": ["Acesso ao domínio apropriado"],
        "benefit": "Seu nível de conjurador efetivo aumenta em +1 ao conjurar qualquer magia pertencente ao domínio selecionado."
    },
    {
        "id": "div-feat-foco-em-magia-da-tendencia",
        "name": "Foco em Magia da Tendência",
        "nameEn": "Align Spell: Chaos, Evil, Good, Law",
        "category": "geral",
        "page": 82,
        "prerequisites": ["Tendência apropriada"],
        "benefit": "Escolha um descritor de tendência (Caos, Ordem, Bem ou Mal) correspondente à sua tendência. A CD de todos os testes de resistência contra magias com esse descritor que você conjurar aumenta em +1."
    },
    {
        "id": "div-feat-forma-selvagem-acelerada",
        "name": "Forma Selvagem Acelerada",
        "nameEn": "Fast Wild Shape",
        "category": "selvagem",
        "page": 82,
        "prerequisites": ["Des 13", "Habilidade de forma selvagem"],
        "benefit": "O personagem adquire a capacidade de adotar a forma selvagem como uma ação equivalente a movimento, em vez de uma ação padrão.",
        "normal": "Assumir a forma selvagem é uma ação padrão."
    },
    {
        "id": "div-feat-forma-selvagem-adicional",
        "name": "Forma Selvagem Adicional",
        "nameEn": "Extra Wild Shape",
        "category": "selvagem",
        "page": 82,
        "prerequisites": ["Habilidade de forma selvagem"],
        "benefit": "O personagem recebe 2 utilizações diárias adicionais da habilidade forma selvagem por dia.",
        "special": "Você pode adquirir este talento várias vezes. Seus efeitos são cumulativos."
    },
    {
        "id": "div-feat-furia-do-carcaju",
        "name": "Fúria do Carcaju",
        "nameEn": "Wolverine's Rage",
        "category": "selvagem",
        "page": 82,
        "prerequisites": ["Habilidade de forma selvagem"],
        "benefit": "Após sofrer dano em combate, você pode gastar uma utilização de forma selvagem como ação livre para entrar em fúria (+2 For, +2 Con, −2 CA) durante 5 rodadas."
    },
    {
        "id": "div-feat-garras-do-urso",
        "name": "Garras do Urso",
        "nameEn": "Grizzly's Claws",
        "category": "selvagem",
        "page": 82,
        "prerequisites": ["Habilidade de forma selvagem"],
        "benefit": "O personagem pode gastar uma utilização de sua forma selvagem como ação livre para expelir garras nas mãos, adquirindo 2 ataques primários com garras (1d6 para Médio, 1d4 para Pequeno) durante 1 hora."
    },
    {
        "id": "div-feat-impulso-profano",
        "name": "Impulso Profano",
        "nameEn": "Profane Boost",
        "category": "divino",
        "page": 84,
        "prerequisites": ["Habilidade de fascinar mortos-vivos"],
        "benefit": "Gaste uma tentativa de fascinar como ação padrão para criar uma onda de energia negativa de 18 metros. Qualquer magia de infligir ferimentos conjurada na área antes do final do seu próximo turno é maximizada sem consumir espaço superior."
    },
    {
        "id": "div-feat-impulso-sagrado",
        "name": "Impulso Sagrado",
        "nameEn": "Sacred Boost",
        "category": "divino",
        "page": 84,
        "prerequisites": ["Habilidade de expulsar mortos-vivos"],
        "benefit": "Gaste uma tentativa de expulsar como ação padrão para criar uma onda de energia positiva de 18 metros. Qualquer magia de curar ferimentos conjurada na área antes do final do seu próximo turno é maximizada sem consumir espaço superior."
    },
    {
        "id": "div-feat-infligir-espontaneo",
        "name": "Infligir Espontâneo",
        "nameEn": "Spontaneous Wounder",
        "category": "geral",
        "page": 84,
        "prerequisites": ["Sab 13", "4 graduações em Conhecimento (religião)", "Tendência: Qualquer não-boa", "Capacidade de conjurar magias divinas"],
        "benefit": "O personagem pode converter qualquer magia preparada da lista de sua classe em uma magia da subescola Infligir de mesmo nível ou inferior, uma quantidade de vezes por dia igual ao seu modificador de Sabedoria."
    },
    {
        "id": "div-feat-invocacao-espontanea",
        "name": "Invocação Espontânea",
        "nameEn": "Spontaneous Summoner",
        "category": "geral",
        "page": 84,
        "prerequisites": ["Sab 13", "4 graduações em Conhecimento (natureza)", "Tendência parcialmente neutra (NB, NM, LN, CN ou N)", "Capacidade de conjurar magias divinas"],
        "benefit": "O personagem pode converter qualquer magia preparada em uma magia de invocar aliado da natureza de mesmo nível ou inferior, uma quantidade de vezes por dia igual ao seu modificador de Sabedoria."
    },
    {
        "id": "div-feat-magia-de-alcance",
        "name": "Magia de Alcance",
        "nameEn": "Reach Spell",
        "category": "metamagico",
        "page": 84,
        "prerequisites": [],
        "benefit": "Você pode conjurar uma magia cujo alcance normal seja toque a até 9 metros como um raio (ataque de toque à distância). Uma magia de alcance ocupa um espaço de magia dois níveis superior ao normal."
    },
    {
        "id": "div-feat-magia-transdimensional",
        "name": "Magia Transdimensional",
        "nameEn": "Transdimensional Spell",
        "category": "metamagico",
        "page": 84,
        "prerequisites": [],
        "benefit": "Uma magia transdimensional afeta criaturas que estejam no Plano Etéreo, no Plano das Sombras ou no interior de espaços extradimensionais (como truque de corda), com efeito total. Ocupa um espaço de magia um nível superior ao normal."
    },
    {
        "id": "div-feat-metamagia-divina",
        "name": "Metamagia Divina",
        "nameEn": "Divine Metamagic",
        "category": "divino",
        "page": 84,
        "prerequisites": ["Habilidade de expulsar ou fascinar mortos-vivos"],
        "benefit": "Escolha um talento metamágico que você possua. Você pode gastar uma quantidade de tentativas diárias de expulsar/fascinar igual a 1 + o ajuste de nível daquele talento para aplicar seus benefícios a uma magia divina espontaneamente, sem aumentar o nível do espaço de magia.",
        "special": "Você pode adquirir este talento várias vezes; cada vez ele se aplica a um talento metamágico diferente."
    },
    {
        "id": "div-feat-nadar-como-um-peixe",
        "name": "Nadar Como um Peixe",
        "nameEn": "Swim Like a Fish",
        "category": "selvagem",
        "page": 85,
        "prerequisites": ["Habilidade de forma selvagem"],
        "benefit": "O personagem pode gastar uma utilização de forma selvagem para desenvolver guelras e membranas natatórias durante 1 hora, respirando sob a água e adquirindo deslocamento de natação de 12 metros (+8 em testes de Natação)."
    },
    {
        "id": "div-feat-poder-magico-divino",
        "name": "Poder Mágico Divino",
        "nameEn": "Divine Spellpower",
        "category": "divino",
        "page": 85,
        "prerequisites": ["Habilidade de expulsar ou fascinar mortos-vivos", "Capacidade de conjurar magias divinas de 1º nível"],
        "benefit": "Antes de conjurar uma magia divina, gaste uma tentativa de expulsar/fascinar como ação livre e faça um teste de expulsão: resultado até 9 confere −4 NC; 10–12 confere −2 NC; 13–15 confere +0; 16–18 confere +1 NC; 19–21 confere +2 NC; 22+ confere +3 ou +4 NC para aquela magia."
    },
    {
        "id": "div-feat-potencializar-expulsao",
        "name": "Potencializar Expulsão",
        "nameEn": "Empower Turning",
        "category": "geral",
        "page": 85,
        "prerequisites": ["Habilidade de expulsar ou fascinar mortos-vivos"],
        "benefit": "Você pode potencializar sua rolagem de dano de expulsão (total de Dados de Vida de mortos-vivos afetados), multiplicando o resultado obtido em 2d6 + nível de clérigo + mod Car por 1,5."
    },
    {
        "id": "div-feat-resistencia-do-carvalho",
        "name": "Resistência do Carvalho",
        "nameEn": "Oaken Resiliency",
        "category": "selvagem",
        "page": 85,
        "prerequisites": ["Habilidade de adotar forma selvagem de uma Planta"],
        "benefit": "Gaste uma utilização de forma selvagem como ação padrão para assumir traços vegetais durante 10 minutos, tornando-se imune a acertos críticos, veneno, sono, paralisia, metamorfose e atordoamento."
    },
    {
        "id": "div-feat-santificar-reliquia",
        "name": "Santificar Relíquia",
        "nameEn": "Sanctify Relic",
        "category": "criacao",
        "page": 86,
        "prerequisites": ["Qualquer talento de criação de itens"],
        "benefit": "Permite criar relíquias sagradas ou profanas imbuídas com uma conexão com uma divindade específica, conforme as regras detalhadas de itens mágicos do Capítulo 4."
    },
    {
        "id": "div-feat-velocidade-do-guepardo",
        "name": "Velocidade do Guepardo",
        "nameEn": "Cheetah's Sprint",
        "category": "selvagem",
        "page": 86,
        "prerequisites": ["Habilidade de forma selvagem"],
        "benefit": "Gaste uma utilização de sua forma selvagem para aumentar seu deslocamento base terrestre para 15 metros durante 1 hora. Além disso, uma vez durante essa duração, você pode realizar uma investida percorrendo até dez vezes seu deslocamento."
    },
    {
        "id": "div-feat-veneno-da-serpente",
        "name": "Veneno da Serpente",
        "nameEn": "Serpent's Venom",
        "category": "selvagem",
        "page": 86,
        "prerequisites": ["Habilidade de forma selvagem"],
        "benefit": "Gaste uma utilização de forma selvagem para adquirir um ataque natural de mordida durante 1 minuto. A mordida inocula veneno (Fortitude CD 10 + 1/2 DV + mod Con; dano 1d6 Con / 1d6 Con)."
    },
    {
        "id": "div-feat-alma-piedosa",
        "name": "Alma Piedosa",
        "nameEn": "Pious Soul",
        "category": "fe",
        "page": 86,
        "prerequisites": ["2 graduações em Conhecimento (religião)"],
        "benefit": "O personagem adquire pontos de fé. Ele pode gastar 1 ponto de fé como ação livre para obter +1d6 de bônus em qualquer jogada de ataque, teste de perícia ou teste de resistência."
    },
    {
        "id": "div-feat-defesa-piedosa",
        "name": "Defesa Piedosa",
        "nameEn": "Pious Defense",
        "category": "fe",
        "page": 86,
        "prerequisites": ["2 graduações em Conhecimento (religião)"],
        "benefit": "O personagem pode gastar 1 ponto de fé como uma reação imediata para converter um golpe mortífero em dano não-letal ou reduzir pela metade o dano de um único ataque que o reduziria a 0 PV ou menos."
    },
    {
        "id": "div-feat-magia-piedosa",
        "name": "Magia Piedosa",
        "nameEn": "Pious Spells",
        "category": "fe",
        "page": 86,
        "prerequisites": ["4 graduações em Conhecimento (religião)"],
        "benefit": "O personagem pode gastar pontos de fé para amplificar o efeito de uma magia divina: 1 ponto aumenta em +1 o nível efetivo de conjurador para a magia; 2 pontos aumentam em +1 a CD do teste de resistência da magia."
    }
]

print(f"Total: {len(feats_data)} feats configured.")
with open("scratch/div_feats_export.json", "w", encoding="utf-8") as f:
    json.dump(feats_data, f, ensure_ascii=False, indent=2)
print("Exported scratch/div_feats_export.json")
