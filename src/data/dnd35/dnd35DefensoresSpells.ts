// ============================================================================
// D&D 3.5 (pasta "D&D 3.5") — Defensores da Fé (edição brasileira): descrições
// das magias novas (Cap. 4, "Novas Magias", a partir da p. 81), em português.
// Lidas da imagem das páginas (OCR só como apoio). Feitas até agora: pp. 81-82
// (Abençoar Funeral a Aspecto da Divindade). Pendente: Aspecto da Divindade
// Maior (início na p. 82) e as magias das pp. 83-92. Aviso de versão: livro de
// 2000 (regras 3.0); conferir com o PHB 3.5 antes de usar no criador.
// Os cabeçalhos são mantidos como impressos (escola, níveis por classe/domínio).
// ============================================================================

export interface DefensoresSpell {
  id: string;
  name: string;
  school: string;
  /** Níveis como impressos: ex. "Clr 3, Drd 2" ou "Misticismo 6". */
  level: string;
  components?: string;
  castingTime?: string;
  range?: string;
  /** "Alvo", "Área" ou "Efeito" como impresso, com o rótulo. */
  target?: string;
  duration?: string;
  savingThrow?: string;
  spellResistance?: string;
  description: string;
  materialComponent?: string;
  xpCost?: string;
}

export const DEFENSORES_SPELLS: DefensoresSpell[] = [
  {
    id: "defensores-abencoar-funeral",
    name: "Abençoar Funeral",
    school: "Abjuração [Bem]",
    level: "Clr 1",
    components: "V, S, M, XP",
    castingTime: "10 minutos",
    range: "Toque",
    target: "Área: Cadáver tocado",
    duration: "Permanente",
    savingThrow: "Vontade anula (veja texto)",
    spellResistance: "Sim",
    description:
      "Usando essa magia, o clérigo protege um cadáver das influências e efeitos malignos. A menos que o corpo seja profanado ou a benção seja anulada, o indivíduo não poderá ser transformado num morto-vivo ou numa cria desses monstros (como um carniçal ou um vampiro, por exemplo). Além disso, qualquer criatura que deseje perturbar o corpo será afetada por uma onda de medo e deve obter sucesso num teste de Vontade ou fugirá do local durante um minuto por nível do conjurador. Se o corpo protegido for ressuscitado, a magia abençoar funeral será dissipada.",
    materialComponent: "O símbolo sagrado do conjurador e um frasco de água benta ou profana, conforme a tendência, que é borrifada sobre o cadáver.",
    xpCost: "100 XP",
  },
  {
    id: "defensores-agilidade-divina",
    name: "Agilidade Divina",
    school: "Transmutação",
    level: "Clr 5",
    components: "V, S",
    castingTime: "1 ação",
    range: "Toque",
    target: "Alvo: Criatura viva tocada",
    duration: "1 rodada/nível",
    savingThrow: "Vontade anula (benéfica)",
    spellResistance: "Não",
    description:
      "Invocando o poder divino de seu patrono, você concede mais agilidade e capacidade de combate à criatura tocada. Você lhe fornece o bônus base de resistência de Reflexos de um ladino do seu nível de personagem, um bônus de aprimoramento na Destreza suficiente para elevá-la até 18 (caso não seja 18 ou superior) e o talento Deslocamento enquanto a magia permanecer ativa.",
  },
  {
    id: "defensores-agua-doce",
    name: "Água Doce",
    school: "Adivinhação",
    level: "Clr 3, Drd 2",
    components: "V, S, M",
    castingTime: "1 ação",
    range: "Longo (120 m + 12 m/nível)",
    target: "Efeito: Um poço com 3 m de diâmetro e até 30 m de profundidade",
    duration: "Instantânea",
    savingThrow: "Nenhum",
    spellResistance: "Não",
    description:
      "Essa magia localiza um lençol de água fresca a até 30 m abaixo da superfície. Se a água encontrada estiver dentro do alcance, a magia escavará um poço até ela. Caso contrário, a magia fracassa.",
    materialComponent: "Uma pá ou espátula.",
  },
  {
    id: "defensores-aracnideo-mental",
    name: "Aracnídeo Mental",
    school: "Adivinhação [ação mental]",
    level: "Clr 8, Mente 7",
    components: "V, S, M, FD",
    castingTime: "1 rodada completa",
    range: "Longo (120 m + 12 m/nível)",
    target: "Alvos: Até oito criaturas vivas na área",
    duration: "1 minuto por nível",
    savingThrow: "Vontade anula",
    spellResistance: "Sim",
    description:
      "Essa magia lhe permite vasculhar os pensamentos de até oito criaturas diferentes, usando uma ação padrão, simultaneamente, e obter as seguintes informações: • O caos incessante dos pensamentos e imagens superficiais. • As linhas de raciocínio individuais, em qualquer ordem desejada. • Detalhes conhecidos por todos os indivíduos sobre um único assunto, objeto ou criatura — você obtém um fragmento de informação por nível de conjurador. • Um estudo dos pensamentos e memórias de uma criatura em especial no grupo. Uma vez por rodada, exceto quando você realiza um estudo detalhado da mente de uma criatura, poderá implantar uma sugestão na mente de qualquer um dos alvos usando uma ação padrão. A criatura deve realizar outro teste de resistência de Vontade para resistir à sugestão, usando a CD inicial do aracnídeo mental (as criaturas que tenham resistência especial a magias de encantamento podem utilizá-la para evitar a sugestão.) Um sucesso nesse teste de resistência não anula os demais efeitos de aracnídeo mental. A seu critério, é possível afetar todos os seres inteligentes dentro do alcance (até o limite de oito criaturas), começando com os alvos conhecidos ou que tenham nomes. O idioma não é um impedimento e você não precisa conhecer pessoalmente os alvos — pode-se escolher, por exemplo, \"os oito guardas mais próximos que deveriam estar naquela câmara.\" A magia não afetará as criaturas que obtenham sucesso no teste de resistência de Vontade inicial.",
    materialComponent: "Uma aranha de qualquer tamanho ou espécie. Ela pode estar morta, mas ainda deve ter as oito patas.",
  },
  {
    id: "defensores-arbustos",
    name: "Arbustos",
    school: "Transmutação",
    level: "Clr 2, Drd 2",
    components: "V, S, M",
    castingTime: "1 ação",
    range: "Toque",
    target: "Alvo: Arma de madeira tocada",
    duration: "1 rodada/nível",
    savingThrow: "Nenhum",
    spellResistance: "Não",
    description:
      "Pequenos espinhos ou farpas mágicas projetam-se da superfície de uma arma de madeira — como uma clava, uma clava grande, um nunchaku ou um bordão. Enquanto a magia permanecer ativa, a arma causará dano perfurante e de concussão, além de receber +1 de bônus de aprimoramento no ataque e causar +1 ponto de dano por nível do conjurador (limite +10). Essa magia afeta somente armas brancas que sejam feitas de madeira. Por exemplo, ela não afetará um arco, uma flecha ou uma maça de metal.",
    materialComponent: "Um pequeno espinho.",
  },
  {
    id: "defensores-arma-da-divindade",
    name: "Arma da Divindade",
    school: "Transmutação",
    level: "Clr 4, Misticismo 4, Pal 4",
    components: "V, FD",
    castingTime: "1 ação",
    range: "Pessoal",
    target: "Alvo: Sua arma",
    duration: "1 rodada/nível",
    description:
      "Você deve estar empunhando a arma favorita de sua divindade para conjurar essa magia. O conjurador poderá brandir a arma como se possuísse o Talento Usar Arma adequado, mesmo se normalmente não o tiver. A arma recebe +1 de bônus de melhoria nas jogadas de ataque e dano e uma habilidade especial (consulte a lista a seguir). Uma arma dupla recebe o bônus de melhoria e a habilidade especial para apenas uma de suas pontas, a critério do conjurador. O bônus de melhoria aumenta conforme o nível do conjurador: +2 a partir do 9º nível; +3 a partir do 12º; +4 a partir do 15º nível e +5 no 18º nível.",
  },
  {
    id: "defensores-aspecto-da-divindade",
    name: "Aspecto da Divindade",
    school: "Transmutação [Bem, Mal]",
    level: "Misticismo 6",
    description:
      "Como aspecto da divindade menor, mas o conjurador adquire todas as qualidades de uma criatura celestial ou abissal (consulte o Livro dos Monstros para obter detalhes): • Você adquire uma aparência metálica e brilhante (para os clérigos bons) ou aterrorizante (para os maus). • Você adquire a habilidade de destruir o mal (ou o bem) uma vez por dia. Adicione seu modificador de Carisma numa jogada de ataque e o seu nível de personagem ao dano contra um inimigo de tendência oposta à sua. • Você adquire Visão no Escuro de 18 m. • Você adquire resistência contra ácido, frio e eletricidade 20 (para clérigos bons) resistência contra fogo e frio 20 (para clérigos do mal). • Você adquire redução de dano 10/+3. • Você adquire RM 25. Seu tipo de criatura não se altera (você não se transforma numa criatura extra-planar).",
  },
];

/** Lista de Armas dos Deuses (p. 82): arma que a magia Arma da Divindade fornece, com a habilidade especial. */
export const DEFENSORES_DEITY_WEAPONS: { deity: string; weapon: string }[] = [
  { deity: "Annam (gigantes)", weapon: "ataque desarmado aprimorado +1, defensor" },
  { deity: "Blibdoolpoolp (kuo-toa)", weapon: "bastão tenaz elétrico +1" },
  { deity: "Boccob", weapon: "bordão de armazenar magias +1" },
  { deity: "Callarduran Smoothhands (svirfneblin)", weapon: "machado de guerra defensor +1" },
  { deity: "Corellon Larethian (elfos)", weapon: "espada longa afiada +1" },
  { deity: "Sashelas das Profundezas (elfos aquáticos)", weapon: "tridente do comando píscio" },
  { deity: "Diirinka (derro)", weapon: "adaga venenosa de armazenar magias +1" },
  { deity: "Eadro (locathahs, povo-do-mar)", weapon: "lança curta congelante +1" },
  { deity: "Ehlonna", weapon: "espada longa congelante +1" },
  { deity: "Erythnul", weapon: "maça estrela de trespassar poderoso +1" },
  { deity: "Fharlanghn", weapon: "bordão defensor +1" },
  { deity: "Garl Glittergold (gnomos)", weapon: "machado de guerra de arremesso +1" },
  { deity: "Grolantor (gigantes da colina, ettins, ogros)", weapon: "clava de trespassar poderoso +1" },
  { deity: "Gruumsh (orcs)", weapon: "lança curta de retorno +1" },
  { deity: "Heironeous", weapon: "espada longa elétrica +1" },
  { deity: "Hextor", weapon: "mangual pesado de trespassar poderoso +1" },
  { deity: "Hiatea (gigantes, especialmente mulheres)", weapon: "lança longa de distância +1" },
  { deity: "Hruggek (bugbear)", weapon: "maça estrela de trespassar poderoso +1" },
  { deity: "Iallanis (gigantes bons)", weapon: "ataque desarmado aprimorado +1, defensor" },
  { deity: "Iuz", weapon: "espada larga de trespassar poderoso +1" },
  { deity: "Kaelthiere (criaturas do fogo malignas)", weapon: "lança curta flamejante +1" },
  { deity: "Kord", weapon: "espada larga de trespassar poderoso +1" },
  { deity: "Kurtulmak (kobolds)", weapon: "meia-lança elétrica +1" },
  { deity: "Laduguer (duergar)", weapon: "martelo de combate defensor +1" },
  { deity: "Laogzeg (trogloditas)", weapon: "azagaia de trespassar poderoso +1" },
  { deity: "Lolth (driders, drow)", weapon: "chicote afiado +1" },
  { deity: "Maglubiyet (goblins, hobgoblins)", weapon: "machado de batalha de trespassar poderoso +1" },
  { deity: "Memnor (gigante das nuvens maligno)", weapon: "maça estrela de trespassar poderoso +1" },
  { deity: "Merrshaulk (yuan-ti)", weapon: "espada longa venenosa +1 (como adaga)" },
  { deity: "Moradin (anões)", weapon: "martelo de combate de arremesso +1" },
  { deity: "Nerull", weapon: "foice longa afiada +1" },
  { deity: "Obad-Hai", weapon: "bordão defensor +1" },
  { deity: "Olidammara", weapon: "sabre afiado +1" },
  { deity: "Panzuriel (criaturas do mar malignas)", weapon: "bordão elétrico +1" },
  { deity: "Pelor", weapon: "maça pesada flamejante +1" },
  { deity: "Sekolah (sahuagin)", weapon: "tridente de comando píscio" },
  { deity: "Semuanya (homem-lagarto)", weapon: "clava grande de trespassar poderoso +1" },
  { deity: "Sixin (xill)", weapon: "espada curta congelante +1" },
  { deity: "Skerrit (centauro)", weapon: "lança curta flamejante +1" },
  { deity: "Skoraeus Stonebones (gigantes de pedra)", weapon: "martelo de combate de trespassar poderoso +1" },
  { deity: "St. Cuthbert", weapon: "maça pesada de trespassar poderoso +1" },
  { deity: "Stronmaus (gigantes de tempestade e de pedra)", weapon: "martelo de combate elétrico +1" },
  { deity: "Surtr (gigantes de fogo)", weapon: "espada larga flamejante +1" },
  { deity: "Thrym (gigantes do gelo)", weapon: "machado grande congelante +1" },
  { deity: "Vaprak (ogres)", weapon: "clava grande de trespassar poderoso +1" },
  { deity: "Vecna", weapon: "adaga congelante +1" },
  { deity: "Wee Jas", weapon: "adaga venenosa" },
  { deity: "Yondalla (halflings)", weapon: "espada curta defensora +1" },
  { deity: "Bem", weapon: "martelo de combate congelante +1" },
  { deity: "Mal", weapon: "mangual leve de trespassar poderoso +1" },
  { deity: "Neutro", weapon: "maça pesada defensora +1" },
  { deity: "Ordem", weapon: "espada longa flamejante +1" },
  { deity: "Caos", weapon: "machado de guerra elétrico +1" },
];
