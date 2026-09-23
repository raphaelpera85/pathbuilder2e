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
    "Instinto Feral": "Recebe vantagem nas jogadas de iniciativa e pode agir normalmente se estiver surpreso, desde que entre em fúria no primeiro turno.",
    "Sentido de Perigo": "Recebe vantagem em salvamentos de Destreza contra efeitos que possa ver, desde que não esteja incapacitado ou cego.",
    "Caminho Primitivo": "Escolhe uma tradição bárbara no 3º nível; ela concede características adicionais nos níveis indicados.",
    "Característica do Caminho": "Recebe a característica do Caminho Primitivo escolhido para este nível.",
    "Fúria Incansável": "Se estiver com 0 pontos de vida enquanto em fúria, pode fazer um salvamento de Constituição para permanecer com 1 ponto de vida.",
    "Fúria Persistente": "A fúria só termina antes do limite normal se ficar inconsciente ou se não atacar uma criatura hostil nem sofrer dano desde seu último turno.",
    "Crítico Brutal (1 dado)": "Adiciona um dado de dano da arma ao dano extra de um acerto crítico.",
    "Crítico Brutal (2 dados)": "Adiciona dois dados de dano da arma ao dano extra de um acerto crítico.",
    "Crítico Brutal (3 dados)": "Adiciona três dados de dano da arma ao dano extra de um acerto crítico.",
    "Força Indomável": "Se o resultado de um teste de Força for menor que seu valor de Força, pode usar esse valor no lugar do resultado.",
    "Campeão Primitivo": "Aumenta Força e Constituição em 4, até o máximo de 24.",
  },
  bardo: {
    "Conjuração": "Usa Carisma como atributo de conjuração e pode lançar magias conhecidas da lista de bardo.",
    "Inspiração de Bardo (d6)": "Como ação bônus, concede um dado d6 a uma criatura aliada para adicionar a um teste, ataque ou salvamento.",
    "Inspiração de Bardo": "Como ação bônus, concede um dado de Inspiração a uma criatura aliada para adicionar a um teste, ataque ou salvamento dentro de 10 minutos.",
    "Inspiração de Bardo (d8)": "O dado de Inspiração de Bardo aumenta para d8.",
    "Inspiração de Bardo (d10)": "O dado de Inspiração de Bardo aumenta para d10.",
    "Inspiração de Bardo (d12)": "O dado de Inspiração de Bardo aumenta para d12.",
    "Especialização": "Dobra o bônus de proficiência em duas perícias escolhidas.",
    "Ataque Extra": "Pode atacar duas vezes, em vez de uma, ao realizar a ação Atacar.",
    "Contracanto": "Pode usar música e performance para conceder vantagem contra ser amedrontado ou enfeitiçado.",
    "Versatilidade": "Adiciona metade do bônus de proficiência, arredondada para baixo, aos testes que ainda não recebem seu bônus de proficiência.",
    "Canção de Descanso (d6)": "Durante um descanso curto, aliados que ouvem sua música recuperam um dado adicional de vida.",
    "Canção de Descanso (d8)": "O dado extra de cura da Canção de Descanso aumenta para d8.",
    "Canção de Descanso (d10)": "O dado extra de cura da Canção de Descanso aumenta para d10.",
    "Canção de Descanso (d12)": "O dado extra de cura da Canção de Descanso aumenta para d12.",
    "Colégio de Bardo": "Escolhe um colégio que concede proficiências e características adicionais nos níveis indicados.",
    "Característica do Colégio": "Recebe a característica do Colégio de Bardo escolhido para este nível.",
    "Fonte de Inspiração": "Recupera os usos de Inspiração de Bardo ao terminar um descanso curto ou longo.",
    "Segredos Mágicos": "Aprende magias de qualquer classe, respeitando os níveis de magia que consegue conjurar.",
    "Inspiração Superior": "Ao rolar iniciativa sem usos de Inspiração de Bardo restantes, recupera um uso.",
  },
  bruxo: {
    "Patrono Sobrenatural": "Escolhe um patrono, que concede características adicionais nos níveis indicados.",
    "Invocações Místicas": "Escolhe invocações que alteram ou ampliam suas capacidades sobrenaturais.",
    "Dádiva do Pacto": "Recebe uma dádiva do pacto no 3º nível, como pacto da corrente, lâmina ou tomo.",
    "Conjuração": "Usa Carisma e recupera os espaços de magia do bruxo após um descanso curto ou longo.",
    "Característica do Patrono": "Recebe a característica do Patrono Sobrenatural escolhido para este nível.",
    "Invocação Mística": "Aprende uma invocação disponível e pode substituí-la quando avança de nível nesta classe.",
    "Arcana Mística (6º nível)": "Pode conjurar uma magia de 6º nível uma vez sem gastar espaço, recuperando o uso após um descanso longo.",
    "Arcana Mística (7º nível)": "Pode conjurar uma magia de 7º nível uma vez sem gastar espaço, recuperando o uso após um descanso longo.",
    "Arcana Mística (8º nível)": "Pode conjurar uma magia de 8º nível uma vez sem gastar espaço, recuperando o uso após um descanso longo.",
    "Arcana Mística (9º nível)": "Pode conjurar uma magia de 9º nível uma vez sem gastar espaço, recuperando o uso após um descanso longo.",
    "Mestre das Dádivas": "Recupera um espaço de magia do Pacto ao rolar iniciativa quando não tiver nenhum espaço restante.",
  },
  clerigo: {
    "Conjuração": "Usa Sabedoria como atributo de conjuração e prepara magias da lista de clérigo.",
    "Domínio Divino": "Escolhe um domínio que concede proficiências, magias e características extras.",
    "Canalizar Divindade (1 uso)": "Canaliza energia divina uma vez entre descansos; o domínio define o efeito.",
    "Canalizar Divindade (2 usos)": "Pode usar Canalizar Divindade duas vezes entre descansos.",
    "Canalizar Divindade (3 usos)": "Pode usar Canalizar Divindade três vezes entre descansos.",
    "Destruir Mortos-Vivos (ND 1/2)": "Mortos-vivos abaixo do limite de ND podem ser destruídos após falhar no salvamento contra sua CD.",
    "Característica do Domínio": "Recebe a característica do Domínio Divino escolhido para este nível.",
    "Destruir Mortos-Vivos (ND 1)": "Mortos-vivos de ND 1 ou menor podem ser destruídos quando falham no salvamento contra sua CD.",
    "Destruir Mortos-Vivos (ND 2)": "Mortos-vivos de ND 2 ou menor podem ser destruídos quando falham no salvamento contra sua CD.",
    "Destruir Mortos-Vivos (ND 3)": "Mortos-vivos de ND 3 ou menor podem ser destruídos quando falham no salvamento contra sua CD.",
    "Destruir Mortos-Vivos (ND 4)": "Mortos-vivos de ND 4 ou menor podem ser destruídos quando falham no salvamento contra sua CD.",
    "Intervenção Divina": "Pode invocar sua divindade para intervir; o Mestre determina o efeito e a tentativa pode ser repetida após um descanso longo.",
    "Intervenção Divina Aprimorada": "Sua Intervenção Divina é bem-sucedida sem rolagem quando o resultado necessário é alcançado conforme a regra de nível 20.",
  },
  druida: {
    "Druídico": "Conhece a língua secreta dos druidas e pode deixar mensagens ocultas na natureza.",
    "Conjuração": "Usa Sabedoria como atributo de conjuração e prepara magias da lista de druida.",
    "Forma Selvagem": "Assume formas de bestas dentro dos limites definidos pelo nível e pelo círculo druídico.",
    "Círculo Druídico": "Escolhe um círculo que concede características e opções adicionais de forma selvagem ou magia.",
    "Aprimoramento da Forma Selvagem": "Aumenta as capacidades das formas de besta permitidas pela Forma Selvagem, conforme o nível de druida.",
    "Característica do Círculo": "Recebe a característica do Círculo Druídico escolhido para este nível.",
    "Mil Formas": "Pode lançar Alterar-se à vontade, sem gastar espaço de magia.",
    "Corpo Atemporal": "Não sofre as penalidades de idade e não pode ser envelhecido magicamente; ainda pode morrer de velhice.",
    "Conjuração de Fera": "Pode conjurar magias em Forma Selvagem, ignorando componentes verbais e somáticos, dentro das limitações da forma.",
    "Arquidruida": "Pode usar Forma Selvagem um número ilimitado de vezes e ignora componentes verbais, somáticos e materiais sem custo ao lançar magias.",
  },
  feiticeiro: {
    "Conjuração": "Usa Carisma como atributo de conjuração e conhece magias da lista de feiticeiro.",
    "Origem da Feitiçaria": "Escolhe a origem que determina características adicionais nos níveis indicados.",
    "Origem Feiticeira": "Escolhe a origem que determina características adicionais nos níveis indicados.",
    "Fonte de Magia": "Converte pontos de feitiçaria em espaços de magia e espaços em pontos de feitiçaria.",
    "Metamagia": "Modifica a forma de lançar uma magia gastando pontos de feitiçaria.",
    "Característica da Origem": "Recebe a característica da Origem Feiticeira escolhida para este nível.",
    "Restauração Feiticeira": "Recupera pontos de feitiçaria gastos ao terminar um descanso curto.",
  },
  guerreiro: {
    "Estilo de Luta": "Escolhe um estilo de combate que concede um benefício permanente compatível com seu treinamento.",
    "Retomar o Fôlego": "Como ação bônus, recupera pontos de vida uma vez por descanso curto ou longo.",
    "Surto de Ação (1 uso)": "Pode realizar uma ação adicional no seu turno uma vez por descanso curto ou longo.",
    "Surto de Ação (2 usos)": "Pode usar Surto de Ação duas vezes entre descansos, mas somente uma vez no mesmo turno.",
    "Ataque Extra": "Pode atacar duas vezes, em vez de uma, ao realizar a ação Atacar.",
    "Indomável (1 uso)": "Pode repetir um salvamento que falhou uma vez por descanso longo.",
    "Arquétipo Marcial": "Escolhe uma tradição marcial que concede características adicionais nos níveis indicados.",
    "Característica do Arquétipo": "Recebe a característica do Arquétipo Marcial escolhido para este nível.",
    "Aumento de Atributo": "Aumenta atributos ou escolhe um talento, conforme as regras de criação e os limites de pré-requisito.",
    "Indomável (2 usos)": "Pode usar Indomável duas vezes entre descansos longos.",
    "Indomável (3 usos)": "Pode usar Indomável três vezes entre descansos longos.",
    "Ataque Extra (2)": "Pode atacar três vezes ao realizar a ação Atacar.",
    "Ataque Extra (3)": "Pode atacar quatro vezes ao realizar a ação Atacar.",
  },
  ladino: {
    "Especialização": "Dobra o bônus de proficiência em duas perícias ou em uma perícia e ferramentas de ladrão.",
    "Ataque Furtivo": "Uma vez por turno, causa dano adicional quando ataca com vantagem ou cumpre as condições de aliado e arma adequadas.",
    "Ação Ardilosa": "Pode usar ação bônus para Correr, Desengajar ou Esconder-se.",
    "Esquiva Sobrenatural": "Usa sua reação para reduzir pela metade o dano de um ataque que possa ver.",
    "Evasão": "Em salvamentos de Destreza, sofre metade do dano em sucesso e nenhum dano em sucesso, conforme o efeito.",
    "Gíria de Ladrão": "Conhece a linguagem secreta dos ladrões e reconhece mensagens ocultas em conversas e sinais.",
    "Arquétipo de Ladino": "Escolhe uma especialização que concede características adicionais nos níveis indicados.",
    "Característica do Arquétipo": "Recebe a característica do Arquétipo de Ladino escolhido para este nível.",
    "Talento Confiável": "Sempre que um teste de habilidade incluir seu bônus de proficiência, um resultado de 9 ou menos no d20 conta como 10.",
    "Sentido Cego": "Percebe a localização de qualquer criatura escondida ou invisível a até 3 metros, desde que possa ouvir.",
    "Mente Escorregadia": "Adquire proficiência em salvamentos de Sabedoria e Inteligência.",
    "Elusivo": "Nenhuma jogada de ataque tem vantagem contra você enquanto não estiver incapacitado.",
    "Golpe de Sorte": "Transforma uma jogada de ataque, teste de habilidade ou salvamento que falhou em um resultado 20 natural, uma vez por descanso longo.",
  },
  mago: {
    "Conjuração": "Usa Inteligência como atributo de conjuração e registra magias no grimório.",
    "Recuperação Arcana": "Recupera parte dos espaços de magia após um descanso curto uma vez por dia.",
    "Tradição Arcana": "Escolhe uma tradição que concede características nos níveis indicados.",
    "Maestria de Magia": "Escolhe magias de baixo nível para lançar sem gastar espaços, dentro das limitações da característica.",
    "Característica da Tradição Arcana": "Recebe a característica da Tradição Arcana escolhida para este nível.",
    "Magias de Assinatura": "Escolhe duas magias de 3º nível ou inferior para lançar uma vez cada sem gastar espaço de magia entre descansos curtos ou longos.",
  },
  monge: {
    "Defesa sem Armadura": "A CA é 10 + modificador de Destreza + modificador de Sabedoria quando não usa armadura ou escudo.",
    "Artes Marciais": "Usa Destreza para ataques com armas de monge, realiza ataque desarmado como ação bônus e melhora o dado de dano.",
    "Ki": "Gasta pontos de ki para ativar técnicas; recupera todos os pontos após descanso curto ou longo.",
    "Defletir Projéteis": "Usa reação para reduzir dano de um ataque à distância e pode arremessar o projétil quando reduz o dano a zero.",
    "Golpe Atordoante": "Ao acertar, gasta ki para forçar um salvamento de Constituição e atordoar o alvo em caso de falha.",
    "Movimento sem Armadura": "Seu deslocamento aumenta enquanto não usa armadura nem escudo; o bônus escala com o nível.",
    "Tradição Monástica": "Escolhe uma tradição que concede características adicionais nos níveis indicados.",
    "Característica da Tradição": "Recebe a característica da Tradição Monástica escolhida para este nível.",
    "Queda Lenta": "Usa sua reação para reduzir dano de queda por um valor igual a cinco vezes seu nível de monge.",
    "Golpes de Ki": "Seus ataques desarmados contam como mágicos para superar resistência e imunidade a dano não mágico.",
    "Mente Serena": "Pode encerrar um efeito de amedrontado ou enfeitiçado em si como uma ação.",
    "Pureza do Corpo": "Fica imune a doenças e veneno.",
    "Língua do Sol e da Lua": "Entende todos os idiomas falados e pode ser entendido por qualquer criatura que tenha um idioma.",
    "Alma de Diamante": "Adquire proficiência em todos os salvamentos e pode gastar ki para repetir um salvamento falho.",
    "Corpo Vazio": "Pode ficar invisível e resistente a dano por 1 minuto ao gastar ki; também pode projetar-se no Plano Etéreo.",
    "Perfeição Pessoal": "Recupera 4 pontos de ki ao rolar iniciativa quando tiver menos de 4 pontos restantes.",
    "Ataque Extra": "Pode atacar duas vezes, em vez de uma, ao realizar a ação Atacar.",
    "Evasão": "Em salvamentos de Destreza, sofre metade do dano em sucesso e nenhum dano em sucesso, conforme o efeito.",
  },
  paladino: {
    "Sentido Divino": "Detecta a presença de celestiais, corruptores e mortos-vivos dentro do alcance por um número limitado de usos.",
    "Imposição das Mãos": "Possui uma reserva de cura igual a cinco vezes o nível de paladino.",
    "Estilo de Luta": "Escolhe um estilo de combate que concede um benefício permanente compatível com seu treinamento.",
    "Conjuração": "Usa Carisma e começa a conjurar a partir do 2º nível.",
    "Destruição Divina": "Gasta um espaço de magia ao acertar para causar dano radiante adicional.",
    "Aura de Proteção": "Você e aliados próximos adicionam seu modificador de Carisma aos testes de resistência.",
    "Saúde Divina": "Fica imune a doenças.",
    "Ataque Extra": "Pode atacar duas vezes, em vez de uma, ao realizar a ação Atacar.",
    "Juramento Sagrado": "Escolhe um juramento que concede características adicionais e magias nos níveis indicados.",
    "Característica do Juramento": "Recebe a característica do Juramento Sagrado escolhido para este nível.",
    "Aprimoramento da Aura": "Aumenta o alcance das auras do paladino para 9 metros.",
    "Aura de Coragem": "Você e aliados próximos não podem ficar amedrontados enquanto estiver consciente.",
    "Destruição Divina Aprimorada": "Seus ataques corpo a corpo causam dano radiante adicional, sem gastar espaço de magia.",
    "Toque Purificador": "Usa sua ação para encerrar uma magia em si ou em uma criatura tocada, dentro do limite de usos por Carisma.",
    "Alcance da Aura Aprimorado": "Aumenta o alcance das auras do paladino para 30 metros.",
  },
  patrulheiro: {
    "Inimigo Favorito": "Escolhe inimigos favorecidos e recebe benefícios de rastreamento e conhecimento sobre eles.",
    "Explorador Natural": "Escolhe terrenos favorecidos e recebe benefícios de viagem, exploração e orientação.",
    "Estilo de Luta": "Escolhe um estilo de combate que concede um benefício permanente compatível com seu treinamento.",
    "Conjuração": "Usa Sabedoria e começa a conjurar a partir do 2º nível.",
    "Ataque Extra": "Pode atacar duas vezes, em vez de uma, ao realizar a ação Atacar.",
    "Passo da Terra": "Mover-se por terreno difícil não mágico não custa movimento adicional dentro das condições da característica.",
    "Consciência Primitiva": "Usa espaços de magia para perceber a presença de tipos de criaturas favorecidos na região por um curto período.",
    "Arquétipo de Patrulheiro": "Escolhe uma especialização que concede características adicionais nos níveis indicados.",
    "Característica do Arquétipo": "Recebe a característica do Arquétipo de Patrulheiro escolhido para este nível.",
    "Esconder-se à Vista": "Pode criar camuflagem para receber bônus em testes de Furtividade quando permanece imóvel e prepara o disfarce.",
    "Desaparecer": "Pode Esconder-se como ação bônus e não pode ser rastreado por meios não mágicos, salvo se escolher deixar um rastro.",
    "Sentidos Selvagens": "Percebe a localização de criaturas invisíveis a até 9 metros e pode detectar criaturas sem depender da visão.",
    "Matador de Inimigos": "Uma vez por turno, adiciona seu modificador de Sabedoria a uma jogada de ataque ou dano contra sua presa favorecida.",
  },
};

const T20_FEATURE_DETAILS: Record<string, Record<string, string>> = {
  arcanista: { "Caminho do Arcanista": "Escolhe Bruxo, Feiticeiro ou Mago; o caminho define o atributo-chave, a forma de conjuração e as limitações de aprendizado.", "Magias": "Lança magias arcanas; começa no 1º círculo e acessa círculos maiores nos níveis 5, 9, 13 e 17.", "Alta Arcana": "Reduz pela metade o custo das magias arcanas após aplicar aprimoramentos e outras reduções." },
  barbaro: { "Fúria": "Gasta 2 PM para receber bônus de combate; o bônus aumenta conforme a tabela da classe.", "Instinto Selvagem": "Recebe bônus em Percepção e Reflexos, aumentando nos níveis indicados.", "Resistência a Dano": "Reduz o dano sofrido pelo valor indicado enquanto a progressão da classe permitir.", "Fúria Titânica": "Dobra os benefícios ofensivos da Fúria no 20º nível." },
  bardo: { "Inspiração": "Gasta ação padrão e 2 PM para conceder a você e aliados em alcance curto bônus em perícias; o bônus aumenta a cada quatro níveis.", "Magias": "Escolhe três escolas e lança magias arcanas dessas escolas; acessa círculos maiores nos níveis 6, 10 e 14.", "Eclético": "Gasta 1 PM para receber os benefícios de ser treinado em uma perícia por um teste.", "Artista Completo": "Usa Inspiração como ação livre e reduz pela metade o custo das habilidades enquanto estiver inspirado." },
  bucaneiro: { "Audácia": "Gasta 2 PM para receber seu modificador de Carisma em um teste de perícia, exceto testes de ataque.", "Insolência": "Soma Carisma à Defesa, limitado pelo nível, enquanto possui liberdade de movimentos.", "Evasão": "Em um salvamento de Reflexos bem-sucedido contra dano, não sofre dano.", "Esquiva Sagaz": "Recebe bônus em Reflexos conforme a progressão da classe.", "Panache": "Transforma feitos ousados e acertos críticos em recursos para suas técnicas.", "Evasão Aprimorada": "Aprimora a Evasão da classe.", "Sorte de Nimb": "Recebe a maior expressão da sorte e do risco do bucaneiro." },
  cacador: { "Marca da Presa": "Analisa uma criatura e recebe dados adicionais de dano contra ela; o dado aumenta pela tabela da classe.", "Rastreador": "Recebe +2 em Sobrevivência e move-se normalmente enquanto rastreia.", "Explorador": "Escolhe terrenos favorecidos e melhora deslocamento, perícias e exploração neles.", "Caminho do Explorador": "Aprimora os benefícios do terreno escolhido e a capacidade de atravessá-lo.", "Mestre Caçador": "Pode marcar como ação livre e amplia o potencial da Marca da Presa." },
  cavaleiro: { "Baluarte": "Gasta PM para receber bônus na Defesa e nos testes de resistência; pode proteger aliados adjacentes e em alcance curto nos níveis maiores.", "Código de Honra": "Não se beneficia de atacar pelas costas, alvos caídos ou incapazes; quebrar o código remove seus PM até o dia seguinte.", "Duelo": "Marca um inimigo e recebe bônus em ataques e dano contra ele até o fim da cena.", "Caminho do Cavaleiro": "Escolhe uma tradição de cavalaria que amplia seus recursos.", "Resoluto": "Aprimora sua resistência mental e sua capacidade de persistir.", "Bravura Final": "Conclui a progressão de defesa e liderança do cavaleiro." },
  clerigo: { "Devoto": "Escolhe uma divindade e segue suas Obrigações & Restrições para receber Poderes Concedidos.", "Magias": "Lança magias divinas e acessa círculos maiores nos níveis 5, 9, 13 e 17.", "Mão da Divindade": "Recebe a expressão máxima do poder concedido por sua divindade." },
  druida: { "Devoto": "Escolhe uma divindade e seus Poderes Concedidos, respeitando Obrigações & Restrições.", "Empatia Selvagem": "Usa uma ação e teste de Adestramento para influenciar animais.", "Magias": "Lança magias divinas e acessa círculos maiores nos níveis 6, 10 e 14.", "Caminho dos Ermos": "Recebe benefícios de exploração e sobrevivência ligados à natureza.", "Força da Natureza": "Alcança o ápice de sua ligação com a natureza." },
  guerreiro: { "Ataque Especial": "Gasta PM para receber bônus no ataque; o bônus aumenta para +8, +12, +16 e +20 nos níveis indicados.", "Durão": "Pode gastar PM para reduzir dano sofrido.", "Ataque Extra": "Pode fazer um ataque adicional quando realiza a ação atacar.", "Campeão": "Aprimora sua capacidade de combate no 20º nível." },
  inventor: { "Engenhosidade": "Usa Inteligência em testes de perícia e soluções técnicas, conforme as regras da classe.", "Protótipo": "Cria um item inicial que pode ser aprimorado com modificações e fabricação.", "Fabricar Item Superior": "Adiciona modificações a itens conforme o limite de nível da tabela.", "Comerciante": "Obtém vantagens comerciais e reduz custos em aquisições adequadas.", "Encontrar Fraqueza": "Identifica vulnerabilidades para aumentar a eficácia de seus ataques e engenhos.", "Fabricar Item Mágico": "Pode fabricar itens mágicos menores, médios e maiores nos níveis indicados.", "Olho do Dragão": "Aprimora percepção e análise de itens e mecanismos.", "Obra-Prima": "Conclui um item excepcional com as melhores capacidades de inventor." },
  ladino: { "Ataque Furtivo": "Causa dados adicionais de dano quando explora distração, surpresa ou posicionamento favorável; o dano escala por nível.", "Especialista": "Dobra o bônus de treinamento em perícias escolhidas.", "Evasão": "Em um salvamento de Reflexos bem-sucedido contra dano, não sofre dano.", "Esquiva Sobrenatural": "Usa seus instintos para evitar ou reduzir ataques perigosos.", "Olhos nas Costas": "Não pode ser surpreendido por criaturas que consiga perceber.", "Evasão Aprimorada": "Aprimora a Evasão da classe.", "A Pessoa Certa para o Trabalho": "Encontra ou improvisa a competência adequada para resolver um desafio." },
  lutador: { "Briga": "Melhora o dano dos ataques desarmados conforme a tabela da classe.", "Golpe Relâmpago": "Ataca com velocidade e transforma uma abertura em golpe adicional ou mais eficiente.", "Casca Grossa": "Recebe bônus de Constituição na resistência e na sobrevivência, aumentando com o nível.", "Golpe Cruel": "Aprimora o dano dos golpes desarmados.", "Golpe Violento": "Aprimora ainda mais o impacto de seus golpes.", "Dono da Rua": "Alcança o ápice da técnica desarmada." },
  nobre: { "Autoconfiança": "Pode somar Carisma à Defesa em vez de Destreza quando as condições da armadura permitem.", "Espólio": "Recebe um item à escolha de até T$ 2.000.", "Orgulho": "Gasta PM para receber +2 por PM em um teste de perícia, limitado pelo Carisma.", "Riqueza": "Aumenta seus recursos e acesso a bens conforme a posição social.", "Gritar Ordens": "Usa autoridade para orientar aliados e melhorar suas ações.", "Realeza": "Atinge o auge de sua influência e liderança." },
  paladino: { "Abençoado": "Soma Carisma ao total de PM e escolhe uma divindade ou o caminho do paladino do bem.", "Código do Herói": "Deve manter a palavra, ajudar inocentes e não mentir, trapacear ou roubar.", "Golpe Divino": "Gasta PM para somar Carisma ao ataque e dados de dano sagrado; o dano aumenta a cada quatro níveis.", "Cura pelas Mãos": "Gasta ação de movimento e PM para curar PV; a cura escala pela tabela.", "Aura Sagrada": "Emite uma aura que protege aliados e sustenta suas habilidades divinas.", "Bênção da Justiça": "Escolhe uma forma de julgamento que orienta seus poderes de paladino.", "Vingador Sagrado": "Alcança o ápice de sua missão e poder divino." },
};

function detailFor(system: SupportedCoreSystem, classId: string, name: string): string {
  const systemDetails = (system === "t20" ? T20_FEATURE_DETAILS : DND_FEATURE_DETAILS)[classId] || {};
  const normalizedName = name.replace(/\s+\([^)]*\)$/u, "").replace(/\s+\+\d+d\d+$/u, "").replace(/\s+\+\d+$/u, "");
  const details = systemDetails[name] || systemDetails[normalizedName];
  if (details) return details;
  if (system === "dnd5e" && name === "Aumento de Atributo") {
    return "Aumenta um atributo em 2, dois atributos em 1, ou escolhe um talento, respeitando o máximo de 20 e os pré-requisitos.";
  }
  if (system === "dnd5e" && name === "Aumento de Atributo ou Talento") {
    return "Aumenta um atributo em 2, dois atributos em 1, ou escolhe um talento, respeitando o máximo de 20 e os pré-requisitos.";
  }
  if (system === "dnd5e" && name === "Escolha de subclasse") {
    return "Escolhe a subclasse indicada pela classe; as características dessa subclasse são recebidas nos níveis correspondentes.";
  }
  if (system === "t20") {
    const damageReduction = name.match(/^Resistência a Dano (\d+)$/u)?.[1];
    if (damageReduction) return `Reduz cada dano sofrido em ${damageReduction}; aplica-se depois de resistências e outros efeitos que alterem o dano, conforme as regras de Tormenta20.`;
    const powerClass = name.match(/^Poder de (.+)$/u)?.[1];
    if (powerClass) {
      const powerDescriptions: Record<string, string> = {
        Arcanista: "Escolhe um poder de Arcanista disponível para seu nível, respeitando os pré-requisitos; o poder pode conceder magias, familiar, escola, redução de custos ou outro efeito arcano.",
        Bárbaro: "Escolhe um poder de Bárbaro disponível para seu nível, respeitando os pré-requisitos; os poderes ampliam Fúria, resistência, ataques e sobrevivência.",
        Bardo: "Escolhe um poder de Bardo disponível para seu nível, respeitando os pré-requisitos; os poderes ampliam Inspiração, atuação, perícias e magias.",
        Bucaneiro: "Escolhe um poder de Bucaneiro disponível para seu nível, respeitando os pré-requisitos; os poderes ampliam Audácia, Panache, mobilidade e combate ágil.",
        Caçador: "Escolhe um poder de Caçador disponível para seu nível, respeitando os pré-requisitos; os poderes ampliam Marca da Presa, exploração, companheiros e ataques à distância.",
        Cavaleiro: "Escolhe um poder de Cavaleiro disponível para seu nível, respeitando os pré-requisitos; os poderes ampliam Baluarte, Duelo, montaria, defesa e autoridade.",
        Clérigo: "Escolhe um poder de Clérigo disponível para seu nível, respeitando os pré-requisitos; os poderes ampliam devoção, magias divinas, cura e poderes concedidos.",
        Druida: "Escolhe um poder de Druida disponível para seu nível, respeitando os pré-requisitos; os poderes ampliam natureza, forma selvagem, magias e companheiros.",
        Guerreiro: "Escolhe um poder de Guerreiro disponível para seu nível, respeitando os pré-requisitos; os poderes ampliam armas, manobras, ataques e resistência.",
        Inventor: "Escolhe um poder de Inventor disponível para seu nível, respeitando os pré-requisitos; os poderes ampliam engenhocas, modificações, alquimia e fabricação.",
        Ladino: "Escolhe um poder de Ladino disponível para seu nível, respeitando os pré-requisitos; os poderes ampliam perícias, furtividade, ataques precisos e truques.",
        Lutador: "Escolhe um poder de Lutador disponível para seu nível, respeitando os pré-requisitos; os poderes ampliam Briga, golpes desarmados, manobras e resistência.",
        Nobre: "Escolhe um poder de Nobre disponível para seu nível, respeitando os pré-requisitos; os poderes ampliam liderança, influência, riqueza e ordens aos aliados.",
        Paladino: "Escolhe um poder de Paladino disponível para seu nível, respeitando os pré-requisitos; os poderes ampliam bênçãos, auras, cura e combate sagrado.",
      };
      return powerDescriptions[powerClass] || `Escolhe um poder de ${powerClass} disponível para seu nível, respeitando os pré-requisitos do sistema.`;
    }
  }
  return "Característica de classe disponível conforme a progressão do nível e a edição selecionada.";
}

export function getCoreClassFeatures(system: SupportedCoreSystem, classId: string, level: number, progression?: { featuresByLevel: Record<number, string[]> }): CoreClassFeature[] {
  if (!progression) return [];
  return Object.entries(progression.featuresByLevel)
    .flatMap(([levelText, names]) => {
    const featureLevel = Number(levelText);
      return featureLevel <= level ? names.map((name) => ({
        name: name.replace(/\s+\([^)]*\)$/u, "").replace(/\s+\+\d+d\d+$/u, "").replace(/\s+\+\d+$/u, ""),
        level: featureLevel,
        description: detailFor(system, classId, name),
      })) : [];
    })
    .filter((feature, index, features) => features.findIndex((item) => item.name === feature.name && item.level === feature.level) === index)
    .sort((a, b) => a.level - b.level || a.name.localeCompare(b.name, "pt-BR"));
}

export function getCoreClassResources(system: SupportedCoreSystem, classId: string, level: number, modifiers: Record<string, number>): CoreClassResource[] {
  const safeLevel = Math.max(1, Math.min(20, Math.trunc(level)));
  const resources: CoreClassResource[] = [];
  const add = (name: string, value: string, description: string) => resources.push({ name, value, description });
  if (system === "t20") {
    if (classId === "arcanista") {
      const spellCircle = 1 + Math.floor((safeLevel - 1) / 4);
      add("Caminho do Arcanista", "Bruxo, Feiticeiro ou Mago", "Escolhe o caminho que define o atributo-chave, a tradição arcana e as regras de aprendizado e conjuração.");
      add("Magias Arcanas", `${spellCircle}º círculo`, "Lança magias arcanas; acessa círculos maiores nos níveis 5, 9, 13 e 17, conforme o caminho escolhido.");
      if (safeLevel >= 20) add("Alta Arcana", "Custos reduzidos", "Reduz pela metade o custo das magias arcanas após aplicar aprimoramentos e outras reduções.");
    }
    if (classId === "barbaro") {
      const furyBonus = 2 + Math.floor((safeLevel - 1) / 5);
      const furyCost = (furyBonus - 1) * 2;
      add("Fúria", `+${furyBonus}${safeLevel >= 20 ? ` (titânica: +${furyBonus * 2})` : ""} · ${furyCost} PM`, "Recebe bônus em ataques e dano corpo a corpo; termina se não atacar nem sofrer efeito hostil na rodada.");
      if (safeLevel >= 3) add("Instinto Selvagem", `+${1 + Math.floor((safeLevel - 3) / 6)}`, "Bônus em Percepção e Reflexos.");
      if (safeLevel >= 5) add("Resistência a Dano", `RD ${Math.min(10, 2 + 2 * Math.floor((safeLevel - 5) / 3))}`, "Reduz todo dano sofrido pelo valor indicado.");
      if (safeLevel >= 20) add("Fúria Titânica", `+${furyBonus * 2}`, "Dobra o bônus de ataque e dano concedido pela Fúria.");
    }
    if (classId === "cacador") {
      const mark = safeLevel >= 17 ? "2d10" : safeLevel >= 13 ? "2d8" : safeLevel >= 9 ? "1d12" : safeLevel >= 5 ? "1d8" : "1d4";
      const markCost = 1 + Math.floor((safeLevel - 1) / 4);
      add("Marca da Presa", `+${mark} · ${markCost} PM`, "Analisa uma criatura em alcance curto; recebe os dados indicados nas rolagens de dano contra ela até o fim da cena.");
      add("Rastreador", "+2 Sobrevivência", "Move-se com deslocamento normal enquanto rastreia, sem penalidade no teste de Sobrevivência.");
      if (safeLevel >= 3) add("Explorador", "Terreno escolhido", "Em terreno escolhido, soma Sabedoria na Defesa e em perícias; amplia terreno ou bônus a cada quatro níveis.");
      if (safeLevel >= 5) add("Caminho do Explorador", "Terreno escolhido", "Ignora terreno difícil e aumenta a CD para rastrear você nos terrenos favorecidos.");
      if (safeLevel >= 20) add("Mestre Caçador", "Marca como ação livre", "Pode gastar +5 PM para aumentar margem de ameaça e recupera 5 PM ao derrotar presa marcada.");
    }
    if (classId === "bardo") {
      const inspirationBonus = 1 + Math.floor((safeLevel - 1) / 4);
      add("Inspiração", `+${inspirationBonus} · ${inspirationBonus * 2} PM`, "Você e aliados em alcance curto recebem o bônus em testes de perícia até o fim da cena.");
      add("Magias", `${safeLevel >= 14 ? "4º" : safeLevel >= 10 ? "3º" : safeLevel >= 6 ? "2º" : "1º"} círculo`, "Usa Carisma; o modificador de Carisma já está incluído no total de PM da ficha.");
      if (safeLevel >= 2) add("Eclético", "1 PM", "Recebe todos os benefícios de ser treinado em uma perícia por um teste.");
      if (safeLevel >= 20) add("Artista Completo", "Inspiração livre", "Pode usar Inspiração como ação livre e reduz pela metade os custos de PM das habilidades de bardo enquanto inspirado.");
    }
    if (classId === "clerigo") {
      const spellCircle = 1 + Math.floor((safeLevel - 1) / 4);
      add("Devoto", "Divindade ou Panteão", "Escolhe uma divindade para receber seus poderes concedidos e obrigações, ou cultua o Panteão sem poderes concedidos.");
      add("Magias Divinas", `${spellCircle}º círculo`, "Usa Sabedoria; o modificador de Sabedoria já está incluído no total de PM da ficha.");
      if (safeLevel >= 20) add("Mão da Divindade", "15 PM", "Lança três magias divinas como ação livre, sem gastar seus PM, e fica atordoado por 1d4 rodadas.");
    }
    if (classId === "druida") {
      add("Devoto", "Allihanna, Megalokk ou Oceano", "Escolhe uma das divindades disponíveis ao Druida e recebe seus poderes concedidos e obrigações.");
      add("Empatia Selvagem", "Animais", "Comunica-se com animais e usa Adestramento para mudar atitude e pedir favores.");
      add("Magias", `${safeLevel >= 14 ? "4º" : safeLevel >= 10 ? "3º" : safeLevel >= 6 ? "2º" : "1º"} círculo`, "Usa Sabedoria; o modificador de Sabedoria já está incluído no total de PM da ficha.");
      if (safeLevel >= 2) add("Caminho dos Ermos", "Terrenos naturais", "Ignora terreno difícil e aumenta em +10 a CD para rastreá-lo em terrenos naturais.");
      if (safeLevel >= 20) add("Força da Natureza", "-2 PM · +2 CD", "Reduz custo de magias e aumenta CD; os bônus dobram em terrenos naturais.");
    }
    if (classId === "bucaneiro") {
      add("Audácia", "2 PM", "Ao fazer teste de perícia, recebe bônus igual ao modificador de Carisma; não se aplica a testes de ataque.");
      add("Insolência", `Carisma na Defesa · até +${safeLevel}`, "Soma Carisma à Defesa, limitado pelo nível; não funciona com armadura pesada ou imobilizado.");
      if (safeLevel >= 2) add("Evasão", "Reflexos", "Em efeito que permita Reflexos para reduzir dano à metade, não sofre dano se passar.");
      if (safeLevel >= 3) add("Esquiva Sagaz", `+${1 + Math.floor((safeLevel - 3) / 4)} Defesa`, "Bônus de Defesa que escala a cada quatro níveis; não funciona com armadura pesada ou imobilizado.");
      if (safeLevel >= 5) add("Panache", "1 PM", "Ao obter crítico em combate ou reduzir inimigo a 0 PV, recupera 1 PM.");
      if (safeLevel >= 10) add("Evasão Aprimorada", "Reflexos", "Em efeitos que permitam Reflexos para reduzir dano, sofre metade mesmo ao falhar.");
      if (safeLevel >= 20) add("Sorte de Nimb", "5 PM", "Refaz um teste; resultado 11 ou mais na segunda rolagem conta como 20 natural.");
    }
    if (classId === "ladino") {
      add("Ataque Furtivo", `+${Math.ceil(safeLevel / 2)}d6`, "Uma vez por rodada contra alvo desprevenido, flanqueado ou em alcance curto; criaturas imunes a críticos também são imunes.");
      add("Especialista", `1 PM · até ${Math.max(1, modifiers.int || 0)} perícia(s)`, "Escolhe perícias treinadas iguais ao modificador de Inteligência; pode dobrar bônus de treinamento em um teste.");
      if (safeLevel >= 2) add("Evasão", "Reflexos", "Em efeito que permita Reflexos para reduzir dano à metade, não sofre dano se passar.");
      if (safeLevel >= 4) add("Esquiva Sobrenatural", "Nunca surpreendido", "Não fica surpreendido.");
      if (safeLevel >= 8) add("Olhos nas Costas", "Não flanqueável", "Não pode ser flanqueado.");
      if (safeLevel >= 10) add("Evasão Aprimorada", "Reflexos", "Em efeitos que permitam Reflexos para reduzir dano, sofre metade mesmo ao falhar.");
      if (safeLevel >= 20) add("A Pessoa Certa para o Trabalho", "5 PM · +10", "Ao fazer Ataque Furtivo ou usar perícia da lista de Ladino, recebe +10 no teste.");
    }
    if (classId === "inventor") {
      const superiorModifications = safeLevel >= 12 ? 6 : safeLevel >= 10 ? 5 : safeLevel >= 8 ? 4 : safeLevel >= 6 ? 3 : safeLevel >= 4 ? 2 : safeLevel >= 2 ? 1 : 0;
      add("Engenhosidade", "2 PM", "Ao fazer teste de perícia, recebe bônus igual ao modificador de Inteligência; não se aplica a testes de ataque.");
      add("Protótipo", "Item superior ou alquímicos", "Começa com item superior de uma modificação ou itens alquímicos até T$ 500.");
      if (safeLevel >= 2) add("Fabricar Item Superior", `${superiorModifications} modificação(ões)`, "Recebe e pode fabricar item superior com o limite de modificações indicado.");
      if (safeLevel >= 3) add("Comerciante", "+10% na venda", "Vende itens por 10% a mais; não cumulativo com Barganha.");
      if (safeLevel >= 7) add("Encontrar Fraqueza", "2 PM", "Analisa objeto ou inimigo; ignora RD de objeto e obtém +2 em ataques contra alvo de armadura ou construto.");
      if (safeLevel >= 9) add("Fabricar Item Mágico", safeLevel >= 17 ? "maior" : safeLevel >= 13 ? "médio" : "menor", "Recebe e pode fabricar item mágico da categoria indicada.");
      if (safeLevel >= 11) add("Olho do Dragão", "Análise automática", "Descobre se item é mágico, suas propriedades e como utilizá-las.");
      if (safeLevel >= 20) add("Obra-Prima", "Item único", "Cria obra-prima aprovada pelo mestre, combinando benefícios de item superior e mágico maior.");
    }
    if (classId === "paladino") {
      const divineDice = 1 + Math.floor((safeLevel - 1) / 4);
      add("Golpe Divino", `${divineDice}d8 · ${divineDice + 1} PM`, "Ao acertar ataque corpo a corpo, pode gastar PM para somar Carisma no ataque e dano de luz.");
      const charismaMana = modifiers.cha || 0;
      add("Abençoado", `${charismaMana >= 0 ? "+" : ""}${charismaMana} PM`, "O modificador de Carisma já está incluído no total de PM da ficha.");
      if (safeLevel >= 2) {
        const healingDice = 1 + Math.floor((safeLevel - 2) / 4);
        add("Cura pelas Mãos", `${healingDice}d8+${healingDice} · ${healingDice} PM`, safeLevel >= 6 ? "Também pode gastar +1 PM para anular uma condição elegível." : "Cura um alvo em alcance corpo a corpo, incluindo você.");
      }
      if (safeLevel >= 3) add("Aura Sagrada", "1 PM + 1 PM/turno", "Você e aliados na aura recebem o bônus de Carisma em testes de resistência.");
    }
    if (classId === "guerreiro") {
      const specialRank = 1 + Math.floor((safeLevel - 1) / 4);
      add("Ataque Especial", `+${specialRank * 4} · até ${specialRank} PM`, "Gasta PM para distribuir o bônus entre teste de ataque e rolagem de dano.");
      if (safeLevel >= 3) add("Durão", "2 PM", "Quando sofre dano, pode gastar PM para reduzi-lo à metade.");
      if (safeLevel >= 6) add("Ataque Extra", "2 PM", "Ao usar a ação atacar, realiza um ataque adicional com a mesma arma.");
      if (safeLevel >= 20) add("Campeão", "+1 passo de dano", "Todos os ataques causam mais dano e recupera parte do PM gasto em Ataque Especial ou Golpe Pessoal ao acertar.");
    }
    if (classId === "lutador") {
      const brigaDamage = safeLevel >= 20 ? "2d10" : safeLevel >= 17 ? "2d8" : safeLevel >= 13 ? "2d6" : safeLevel >= 9 ? "1d10" : safeLevel >= 5 ? "1d8" : "1d6";
      add("Briga", brigaDamage, "Dano do ataque desarmado para criatura Pequena ou Média.");
      add("Golpe Relâmpago", "1 PM", "Ao usar a ação atacar para ataque desarmado, realiza um ataque desarmado adicional.");
      if (safeLevel >= 3) add("Casca Grossa", `Con +${Math.floor((safeLevel - 3) / 4)}`, "Soma Constituição à Defesa sem armadura pesada; o bônus adicional de Defesa escala a cada quatro níveis.");
      if (safeLevel >= 5) add("Golpe Cruel", "+1 margem de ameaça", "Aumenta a margem de ameaça de ataques desarmados.");
      if (safeLevel >= 9) add("Golpe Violento", "+1 multiplicador crítico", "Aumenta o multiplicador de crítico de ataques desarmados.");
      if (safeLevel >= 20) add("Dono da Rua", "2 ataques", "Ao usar a ação atacar desarmado, faz dois ataques em vez de um.");
    }
    if (classId === "nobre") {
      const charismaLimit = Math.max(0, modifiers.cha || 0);
      add("Orgulho", `até ${charismaLimit} PM`, "Ao fazer teste de perícia, cada PM gasto concede +2 no resultado.");
      if (safeLevel >= 2) add("Riqueza", "1/aventura · Car + nível", "Faz teste de Carisma com bônus igual ao nível de Nobre para receber Tibares de ouro.");
      if (safeLevel >= 3) add("Gritar Ordens", `até ${charismaLimit} PM`, "Aliados em alcance curto recebem bônus em perícias igual ao PM gasto até seu próximo turno.");
      if (safeLevel >= 20) add("Realeza", "Presença soberana", "Aprimora Presença Aristocrática e Palavras Afiadas contra criaturas que falhem em suas resistências.");
    }
    if (classId === "cavaleiro") {
      const bulwarkRank = 1 + Math.floor((safeLevel - 1) / 4);
      add("Baluarte", `+${bulwarkRank * 2} · até ${bulwarkRank} PM`, "Gasta PM para receber bônus na Defesa e em testes de resistência até o início de seu próximo turno.");
      if (safeLevel >= 2) add("Duelo", "2 PM · +1", "Escolhe um inimigo em alcance curto; cada 2 PM adicionais aumentam em +1 os testes de ataque e dano contra ele até o fim da cena.");
      if (safeLevel >= 5) add("Caminho do Cavaleiro", "Bastião ou Montaria", "Escolha de caminho: Bastião concede RD com armadura pesada; Montaria fornece um cavalo de guerra aliado.");
      if (safeLevel >= 11) add("Resoluto", "1 PM", "Refaz um teste de resistência contra condição que o afete, com +5; uma vez por efeito.");
      if (safeLevel >= 20) add("Bravura Final", "5 PM/turno", "Ao chegar a 0 PV ou menos, permanece consciente e agindo enquanto pagar o custo no início de cada turno.");
    }
    return resources;
  }
  if (classId === "barbaro") {
    const rages = safeLevel >= 20 ? 999 : safeLevel >= 17 ? 6 : safeLevel >= 12 ? 5 : safeLevel >= 6 ? 4 : safeLevel >= 3 ? 3 : 2;
    add("Fúrias", String(rages), safeLevel >= 20 ? "Usos ilimitados; recupera os benefícios conforme as regras de Fúria." : "Usos por descanso longo.");
  }
  if (classId === "bardo") {
    const inspirationUses = Math.max(1, modifiers.cha || 0);
    const inspirationRecovery = safeLevel >= 5 ? "descanso curto ou longo" : "descanso longo";
    add("Inspiração de Bardo", `${inspirationUses}d${safeLevel >= 15 ? 12 : safeLevel >= 10 ? 10 : safeLevel >= 5 ? 8 : 6}`, `Usos por ${inspirationRecovery}: ${inspirationUses}.`);
    if (safeLevel >= 2) add("Canção de Descanso", `d${safeLevel >= 15 ? 12 : safeLevel >= 10 ? 10 : safeLevel >= 5 ? 8 : 6}`, "Durante um descanso curto, aliados que ouvem sua música recuperam um dado adicional de vida.");
  }
  if (classId === "guerreiro") {
    add("Retomar o Fôlego", "1d10 + nível", "Recupera PV como ação bônus uma vez por descanso curto ou longo.");
    if (safeLevel >= 2) add("Surto de Ação", safeLevel >= 17 ? "2 usos" : "1 uso", "Concede uma ação adicional; recupera em descanso curto ou longo.");
    if (safeLevel >= 9) add("Indomável", safeLevel >= 17 ? "3 usos" : safeLevel >= 13 ? "2 usos" : "1 uso", "Pode repetir um teste de resistência que falhou; recupera os usos após um descanso longo.");
  }
  if (classId === "ladino") add("Ataque Furtivo", `${Math.ceil(safeLevel / 2)}d6`, "Dano adicional uma vez por turno quando cumpre os requisitos.");
  if (classId === "monge" && safeLevel >= 2) add("Pontos de Ki", String(safeLevel), "Recupera todos os pontos após descanso curto ou longo.");
  if (classId === "paladino") {
    add("Imposição das Mãos", `${safeLevel * 5} PV`, "Reserva total de cura que se recupera após descanso longo.");
    if (safeLevel >= 14) add("Toque Purificador", `${Math.max(1, modifiers.cha || 0)} usos`, "Encerra uma magia em si ou em uma criatura tocada; recupera os usos após um descanso longo.");
  }
  if (classId === "feiticeiro" && safeLevel >= 2) add("Pontos de Feitiçaria", String(safeLevel), "Usados para Metamagia e conversão em espaços de magia.");
  if (classId === "clerigo" && safeLevel >= 2) add("Canalizar Divindade", safeLevel >= 18 ? "3 usos" : safeLevel >= 6 ? "2 usos" : "1 uso", "Recupera usos após descanso curto ou longo.");
  if (classId === "mago") add("Recuperação Arcana", `até ${Math.min(5, Math.ceil(safeLevel / 2))}º nível de espaços`, "Recupera espaços após um descanso curto uma vez por dia.");
  if (classId === "bruxo" && safeLevel >= 2) add("Invocações Místicas", safeLevel >= 18 ? "8" : safeLevel >= 15 ? "7" : safeLevel >= 12 ? "6" : safeLevel >= 9 ? "5" : safeLevel >= 7 ? "4" : safeLevel >= 5 ? "3" : "2", "Escolhas personalizáveis do patrono sobrenatural.");
  if (classId === "bruxo") {
    const pactSlots = safeLevel >= 17 ? 4 : safeLevel >= 11 ? 3 : safeLevel >= 2 ? 2 : 1;
    const pactCircle = safeLevel >= 9 ? 5 : safeLevel >= 7 ? 4 : safeLevel >= 5 ? 3 : safeLevel >= 3 ? 2 : 1;
    add("Magia de Pacto", `${pactSlots} espaço(s) de ${pactCircle}º círculo`, "Os espaços recuperam após descanso curto ou longo e são lançados sempre no maior círculo disponível.");
    if (safeLevel >= 11) add("Arcana Mística (6º nível)", "1 uso", "Aprende uma magia de 6º nível para lançar uma vez sem gastar espaço; recupera após descanso longo.");
    if (safeLevel >= 13) add("Arcana Mística (7º nível)", "1 uso", "Aprende uma magia de 7º nível para lançar uma vez sem gastar espaço; recupera após descanso longo.");
    if (safeLevel >= 15) add("Arcana Mística (8º nível)", "1 uso", "Aprende uma magia de 8º nível para lançar uma vez sem gastar espaço; recupera após descanso longo.");
    if (safeLevel >= 17) add("Arcana Mística (9º nível)", "1 uso", "Aprende uma magia de 9º nível para lançar uma vez sem gastar espaço; recupera após descanso longo.");
  }
  if (classId === "druida" && safeLevel >= 2) add("Forma Selvagem", safeLevel >= 18 ? "sem limite de forma" : "2 usos", "Usos recuperados após descanso curto ou longo; o círculo define opções adicionais.");
  if (classId === "patrulheiro") {
    const favoredEnemyCount = safeLevel >= 14 ? 3 : safeLevel >= 6 ? 2 : 1;
    const favoredTerrainCount = safeLevel >= 10 ? 3 : safeLevel >= 6 ? 2 : 1;
    add("Inimigo Favorito", `${favoredEnemyCount} escolha(s)`, "Escolhas e benefícios são definidos pela campanha e pelo Livro do Jogador.");
    add("Explorador Natural", `${favoredTerrainCount} terreno(s) favorecido(s)`, "Escolhe terrenos favorecidos e recebe benefícios de viagem, exploração e orientação conforme o Livro do Jogador.");
  }
  return resources;
}
