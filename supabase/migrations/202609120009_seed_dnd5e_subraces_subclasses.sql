-- D&D 5e 2014: sub-raças e subclasses do Livro do Jogador.
-- IDs permanecem prefixados para impedir colisão com PF2e, OSE e T20.
WITH subraces AS (
  SELECT * FROM jsonb_to_recordset($json$[
    {"id":"anao_colina","race":"anao","name":"Anão da Colina","page":20,"ability":"Sabedoria +1","traits":["Tenacidade anã","Proficiência com armadura anã"]},
    {"id":"anao_montanha","race":"anao","name":"Anão da Montanha","page":20,"ability":"Força +2","traits":["Treinamento com armadura anã"]},
    {"id":"elfo_alto","race":"elfo","name":"Alto Elfo","page":23,"ability":"Inteligência +1","traits":["Truque de mago","Idioma adicional","Treinamento com armas élficas"]},
    {"id":"elfo_floresta","race":"elfo","name":"Elfo da Floresta","page":24,"ability":"Sabedoria +1","traits":["Máscara da natureza","Treinamento com armas élficas"]},
    {"id":"elfo_drow","race":"elfo","name":"Drow","page":24,"ability":"Carisma +1","traits":["Sensibilidade à luz solar","Magia drow","Treinamento com armas drow"]},
    {"id":"halfling_pes_leves","race":"halfling","name":"Halfling Pés-Leves","page":28,"ability":"Carisma +1","traits":["Furtividade natural"]},
    {"id":"halfling_resistente","race":"halfling","name":"Halfling Robusto","page":28,"ability":"Constituição +1","traits":["Resiliência robusta"]},
    {"id":"gnomo_floresta","race":"gnomo","name":"Gnomo da Floresta","page":36,"ability":"Destreza +1","traits":["Ilusionista nato","Falar com bestas pequenas"]},
    {"id":"gnomo_pedra","race":"gnomo","name":"Gnomo das Rochas","page":37,"ability":"Constituição +1","traits":["Conhecimento de artífice","Engenho"]}
  ]$json$) AS x(id text, race text, name text, page smallint, ability text, traits text[])
)
INSERT INTO public.catalog_heritages
  (id, ancestry_id, is_versatile, name_pt, description_pt, traits, rarity, ruleset, source_book, source_page, data, system_id)
SELECT 'dnd5e.' || id, 'dnd5e.' || race, false, name, 'Sub-raça do Livro do Jogador 2014.', traits, 'common', 'standard', 'D&D 5e — Livro do Jogador (2014)', page,
       jsonb_build_object('abilityBonuses', ability), 'dnd5e'
FROM subraces
ON CONFLICT (id) DO UPDATE SET ancestry_id = EXCLUDED.ancestry_id, name_pt = EXCLUDED.name_pt, description_pt = EXCLUDED.description_pt,
  traits = EXCLUDED.traits, ruleset = EXCLUDED.ruleset, source_book = EXCLUDED.source_book, source_page = EXCLUDED.source_page,
  data = EXCLUDED.data, system_id = EXCLUDED.system_id;

WITH subclasses AS (
  SELECT * FROM jsonb_to_recordset($json$[
    {"id":"barbaro_berserker","class":"barbaro","name":"Caminho do Berserker","page":49,"summary":"Fúria frenética e presença intimidante."},
    {"id":"barbaro_totem","class":"barbaro","name":"Caminho do Guerreiro Totêmico","page":50,"summary":"Espírito totêmico e comunhão com a natureza."},
    {"id":"bardo_conhecimento","class":"bardo","name":"Colégio do Conhecimento","page":54,"summary":"Perícias adicionais e palavras cortantes."},
    {"id":"bardo_valor","class":"bardo","name":"Colégio do Valor","page":55,"summary":"Treinamento marcial e inspiração em combate."},
    {"id":"clerigo_conhecimento","class":"clerigo","name":"Domínio do Conhecimento","page":59,"summary":"Sabedoria, línguas e domínio de informações."},
    {"id":"clerigo_vida","class":"clerigo","name":"Domínio da Vida","page":60,"summary":"Cura ampliada e proteção da vida."},
    {"id":"clerigo_luz","class":"clerigo","name":"Domínio da Luz","page":61,"summary":"Luz divina e fogo radiante."},
    {"id":"clerigo_natureza","class":"clerigo","name":"Domínio da Natureza","page":62,"summary":"Ligação com a natureza e seus ciclos."},
    {"id":"clerigo_tempestade","class":"clerigo","name":"Domínio da Tempestade","page":62,"summary":"Trovão, relâmpago e fúria da tormenta."},
    {"id":"clerigo_trapaca","class":"clerigo","name":"Domínio da Trapaça","page":63,"summary":"Ilusão, duplicidade e mobilidade."},
    {"id":"clerigo_guerra","class":"clerigo","name":"Domínio da Guerra","page":63,"summary":"Poder marcial e bênçãos de batalha."},
    {"id":"druida_terra","class":"druida","name":"Círculo da Terra","page":68,"summary":"Magia natural e recuperação de espaços."},
    {"id":"druida_lua","class":"druida","name":"Círculo da Lua","page":69,"summary":"Formas selvagens de combate."},
    {"id":"guerreiro_campeao","class":"guerreiro","name":"Arquétipo do Campeão","page":85,"summary":"Aprimoramento marcial simples e crítico."},
    {"id":"guerreiro_mestre_batalha","class":"guerreiro","name":"Mestre da Batalha","page":86,"summary":"Manobras e dados de superioridade."},
    {"id":"guerreiro_cavaleiro_arcano","class":"guerreiro","name":"Cavaleiro Arcano","page":87,"summary":"Combate marcial combinado com magia."},
    {"id":"monge_mao_aberta","class":"monge","name":"Tradição da Mão Aberta","page":101,"summary":"Técnicas de combate desarmado."},
    {"id":"monge_sombra","class":"monge","name":"Tradição das Sombras","page":102,"summary":"Furtividade e manipulação das sombras."},
    {"id":"monge_quatro_elementos","class":"monge","name":"Tradição dos Quatro Elementos","page":103,"summary":"Disciplina elemental e pontos de chi."},
    {"id":"paladino_devocao","class":"paladino","name":"Juramento de Devoção","page":113,"summary":"Honra, disciplina e proteção da luz."},
    {"id":"paladino_anciaos","class":"paladino","name":"Juramento dos Anciões","page":114,"summary":"Vida, esperança e defesa da natureza."},
    {"id":"paladino_vinganca","class":"paladino","name":"Juramento de Vingança","page":116,"summary":"Perseguição implacável aos inimigos jurados."},
    {"id":"patrulheiro_cacador","class":"patrulheiro","name":"Arquétipo do Caçador","page":119,"summary":"Táticas para enfrentar ameaças escolhidas."},
    {"id":"patrulheiro_mestre_feras","class":"patrulheiro","name":"Mestre das Feras","page":121,"summary":"Companheiro animal e combate coordenado."},
    {"id":"ladino_ladrao","class":"ladino","name":"Arquétipo do Ladrão","page":92,"summary":"Agilidade, furtividade e uso rápido de itens."},
    {"id":"ladino_assassino","class":"ladino","name":"Arquétipo do Assassino","page":93,"summary":"Disfarce, veneno e ataques surpresa."},
    {"id":"ladino_trapaceiro_arcano","class":"ladino","name":"Trapaceiro Arcano","page":94,"summary":"Truques arcanos para ampliar a astúcia."},
    {"id":"bruxo_arque_fada","class":"bruxo","name":"Arquifada","page":109,"summary":"Poderes feéricos e encanto sobrenatural."},
    {"id":"bruxo_infernal","class":"bruxo","name":"Infernal","page":109,"summary":"Poderes concedidos por um patrono infernal."},
    {"id":"bruxo_grande_antigo","class":"bruxo","name":"Grande Antigo","page":110,"summary":"Conhecimento proibido e influência psíquica."},
    {"id":"feiticeiro_linhagem_draconica","class":"feiticeiro","name":"Linhagem Dracônica","page":102,"summary":"Magia inata de ancestralidade dracônica."},
    {"id":"feiticeiro_magia_selvagem","class":"feiticeiro","name":"Magia Selvagem","page":103,"summary":"Surtos imprevisíveis de magia bruta."},
    {"id":"mago_abjuracao","class":"mago","name":"Escola de Abjuração","page":115,"summary":"Proteções, selos e defesa arcana."},
    {"id":"mago_conjuracao","class":"mago","name":"Escola de Conjuração","page":116,"summary":"Criação e transporte por magia."},
    {"id":"mago_adivinhacao","class":"mago","name":"Escola de Adivinhação","page":117,"summary":"Visões e manipulação do acaso."},
    {"id":"mago_encantamento","class":"mago","name":"Escola de Encantamento","page":117,"summary":"Influência sobre mentes e emoções."},
    {"id":"mago_evocacao","class":"mago","name":"Escola de Evocação","page":118,"summary":"Explosões e controle de energia."},
    {"id":"mago_ilusao","class":"mago","name":"Escola de Ilusão","page":118,"summary":"Imagens, sons e enganos mágicos."},
    {"id":"mago_necromancia","class":"mago","name":"Escola de Necromancia","page":119,"summary":"Energia vital, morte e não-morte."},
    {"id":"mago_transmutacao","class":"mago","name":"Escola de Transmutação","page":119,"summary":"Alteração da matéria e do corpo."}
  ]$json$) AS x(id text, class text, name text, page smallint, summary text)
)
INSERT INTO public.catalog_subclasses
  (id, class_id, subclass_type, name_pt, description_pt, traits, rarity, ruleset, source_book, source_page, data, system_id)
SELECT 'dnd5e.' || id, 'dnd5e.' || class, 'subclass', name, summary, ARRAY[]::text[], 'common', 'standard', 'D&D 5e — Livro do Jogador (2014)', page,
       jsonb_build_object('featureLevel', 3), 'dnd5e'
FROM subclasses
ON CONFLICT (id) DO UPDATE SET class_id = EXCLUDED.class_id, name_pt = EXCLUDED.name_pt, description_pt = EXCLUDED.description_pt,
  ruleset = EXCLUDED.ruleset, source_book = EXCLUDED.source_book, source_page = EXCLUDED.source_page, data = EXCLUDED.data, system_id = EXCLUDED.system_id;
