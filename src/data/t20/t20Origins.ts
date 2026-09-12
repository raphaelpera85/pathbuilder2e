export const T20_ORIGIN_SOURCE_BOOK = "Tormenta20 — Livro Básico";

export interface T20Origin {
  id: string;
  name: string;
  sourcePage: number;
  trainedSkills: string[];
  benefitOptions: string[];
  startingItems: string[];
}

const origin = (id: string, name: string, trainedSkills: string[], benefitOptions: string[], startingItems: string[]): T20Origin => ({
  id, name, sourcePage: 93, trainedSkills, benefitOptions, startingItems,
});

/** Core-book origins. The optional origin powers remain choices, not free text. */
export const T20_ORIGINS: T20Origin[] = [
  origin("acolito", "Acólito", ["cura", "religiao", "vontade"], ["medicina", "membro_da_igreja", "vontade_de_ferro"], ["símbolo sagrado", "traje de sacerdote"]),
  origin("amigo_dos_animais", "Amigo dos Animais", ["adestramento", "cavalgar"], ["amigo_especial"], ["cão de guarda, cavalo, pônei ou trobo"]),
  origin("amnesico", "Amnésico", [], ["perícia escolhida pelo mestre", "poder escolhido pelo mestre", "lembrancas_graduais"], ["um ou mais itens somando até T$ 100"]),
  origin("aristocrata", "Aristocrata", ["diplomacia", "enganacao", "nobreza"], ["comandar", "sangue_azul"], ["joia de família (T$ 100)", "traje da corte"]),
  origin("artesao", "Artesão", ["oficio", "vontade"], ["frutos_do_trabalho", "sortudo"], ["kit de ofício", "item fabricável até T$ 50"]),
  origin("artista", "Artista", ["atuacao", "enganacao"], ["atraente", "dom_artistico", "sortudo", "torcida"], ["kit de disfarces ou instrumento musical"]),
  origin("assistente_de_laboratorio", "Assistente de Laboratório", ["oficio", "misticismo"], ["esse_cheiro", "veneficio", "poder_da_tormenta"], ["kit de ofício (alquimia)"]),
  origin("batedor", "Batedor", ["furtividade", "percepcao", "sobrevivencia"], ["a_prova_de_tudo", "estilo_de_disparo", "sentidos_agucados"], ["barraca", "arma simples ou marcial à distância"]),
  origin("capanga", "Capanga", ["luta", "intimidacao"], ["confissao", "poder_de_combate"], ["adereço de gangue aprimorado", "arma simples corpo a corpo"]),
  origin("charlatao", "Charlatão", ["enganacao", "jogatina"], ["alpinista_social", "aparencia_inofensiva", "sortudo"], ["joia falsificada", "kit de disfarces"]),
  origin("circense", "Circense", ["acrobacia", "atuacao", "reflexos"], ["acrobatico", "torcida", "truque_de_magica"], ["traje de artista", "três bolas", "baralho"]),
  origin("criminoso", "Criminoso", ["enganacao", "furtividade", "ladinagem"], ["punguista", "veneficio"], ["kit de ladrão ou kit de disfarces"]),
  origin("curandeiro", "Curandeiro", ["cura", "vontade"], ["medicina", "medico_de_campo", "veneficio"], ["bálsamo restaurador", "kit de medicamentos"]),
  origin("eremita", "Eremita", ["misticismo", "religiao", "sobrevivencia"], ["busca_interior", "lobo_solitario"], ["barraca", "kit de medicamentos"]),
  origin("escravo", "Escravo", ["atletismo", "fortitude", "furtividade"], ["desejo_de_liberdade", "vitalidade"], ["algemas", "ferramenta pesada"]),
  origin("estudioso", "Estudioso", ["conhecimento", "guerra", "misticismo"], ["aparencia_inofensiva", "palpite_fundamentado"], ["livro, pergaminho ou instrumento de estudo"]),
  origin("fazendeiro", "Fazendeiro", ["adestramento", "cavalgar", "oficio", "sobrevivencia"], ["agua_no_feijao", "ginete"], ["ferramenta agrícola", "animal de fazenda"]),
  origin("forasteiro", "Forasteiro", ["cavalgar", "pilotagem", "sobrevivencia"], ["cultura_exotica", "lobo_solitario"], ["diário de viagens", "traje estrangeiro", "instrumento exótico"]),
  origin("gladiador", "Gladiador", ["atuacao", "luta"], ["atraente", "pao_e_circo", "torcida", "poder_de_combate"], ["arma marcial ou exótica", "item de admirador"]),
  origin("guarda", "Guarda", ["investigacao", "luta", "percepcao"], ["detetive", "investigador", "poder_de_combate"], ["apito", "insígnia", "arma marcial"]),
  origin("herdeiro", "Herdeiro", ["misticismo", "nobreza", "oficio"], ["comandar", "heranca"], ["símbolo de herança"]),
  origin("heroi_campones", "Herói Camponês", ["adestramento", "oficio"], ["amigo_dos_plebeus", "sortudo", "surto_heroico", "torcida"], ["kit de ofício ou arma simples", "traje de plebeu"]),
  origin("marujo", "Marujo", ["atletismo", "jogatina", "pilotagem"], ["acrobatico", "passagem_de_navio"], ["T$ 2d6", "corda"]),
  origin("mateiro", "Mateiro", ["atletismo", "furtividade", "sobrevivencia"], ["lobo_solitario", "sentidos_agucados", "vendedor_de_carcacas"], ["barraca", "arco curto", "20 flechas"]),
  origin("membro_de_guilda", "Membro de Guilda", ["diplomacia", "enganacao", "misticismo", "oficio"], ["foco_em_pericia", "rede_de_contatos"], ["kit de ladrão ou kit de ofício"]),
  origin("mercador", "Mercador", ["diplomacia", "intuicao", "oficio"], ["negociacao", "proficiencia", "sortudo"], ["carroça", "trobo", "mercadorias (T$ 100)"]),
  origin("minerador", "Minerador", ["atletismo", "fortitude", "oficio"], ["ataque_poderoso", "escavador", "sentidos_agucados"], ["gemas (T$ 100)", "picareta"]),
  origin("nomade", "Nômade", ["cavalgar", "pilotagem", "sobrevivencia"], ["lobo_solitario", "mochileiro", "sentidos_agucados"], ["bordão", "bússola"]),
  origin("pivete", "Pivete", ["furtividade", "iniciativa", "ladinagem"], ["acrobatico", "aparencia_inofensiva", "quebra_galho"], ["kit de ladrão", "traje de plebeu", "animal urbano"]),
  origin("refugiado", "Refugiado", ["fortitude", "reflexos", "vontade"], ["estoico", "vontade_de_ferro"], ["item estrangeiro até T$ 100"]),
  origin("seguidor", "Seguidor", ["adestramento", "oficio"], ["antigo_mestre", "proficiencia", "surto_heroico"], ["item recebido do mestre até T$ 100"]),
  origin("selvagem", "Selvagem", ["percepcao", "reflexos", "sobrevivencia"], ["lobo_solitario", "vida_rustica", "vitalidade"], ["arma simples", "pequeno animal"]),
  origin("soldado", "Soldado", ["fortitude", "guerra", "luta", "pontaria"], ["influencia_militar", "poder_de_combate"], ["arma marcial", "uniforme", "insígnia"]),
  origin("taverneiro", "Taverneiro", ["diplomacia", "jogatina", "oficio"], ["gororoba", "proficiencia", "vitalidade"], ["rolo de macarrão ou martelo", "panela", "avental", "caneca"]),
  origin("trabalhador", "Trabalhador", ["atletismo", "fortitude"], ["atletico", "esforcado"], ["ferramenta pesada"]),
];
