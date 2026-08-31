# Pathbuilder 2e Local

Construtor de personagens PF2e local-first com React, TypeScript e suporte
opcional a contas e fichas privadas no Supabase.

## Desenvolvimento local

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Sem `.env.local`, o portal continua funcionando no modo local. Com Supabase,
preencha apenas a URL e a chave **publishable** do projeto:

```dotenv
VITE_SUPABASE_URL=https://SEU_PROJETO.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

Nunca coloque `service_role`, `sb_secret_*` ou senhas no frontend. Variáveis
`VITE_*` são públicas no bundle; a proteção real dos personagens é o RLS.

## Configurar o Supabase

1. Crie um projeto gratuito no Supabase.
2. Em Auth, mantenha **Confirm email** habilitado.
3. Configure Site URL e Redirect URLs para:
   - `http://localhost:5173/`
   - o domínio de produção, quando existir.
4. Aplique, em ordem, as migrations de [`supabase/migrations`](supabase/migrations): a base de contas/personagens e o hardening de limites.
5. Publique a função de exclusão de conta:

```powershell
supabase functions deploy delete-account
```

As variáveis `SUPABASE_URL`, `SUPABASE_ANON_KEY` e
`SUPABASE_SERVICE_ROLE_KEY` são disponibilizadas no ambiente da Edge Function.
A chave administrativa jamais é enviada ao navegador.

### Conta administrativa

A migration reserva o username `raphaelpera` e promove automaticamente a conta
com e-mail `raphaelpera85@gmail.com` para `admin`. Crie essa conta pelo próprio
portal usando:

- usuário: `raphaelpera`
- e-mail: `raphaelpera85@gmail.com`
- uma senha forte escolhida pelo proprietário

Confirme o e-mail antes de entrar. A senha não pertence ao código nem ao banco
de migrations.

## Dados e segurança

- `profiles`: username e papel da conta;
- `characters`: UUID, proprietário, metadados e ficha integral em `jsonb`;
- quatro políticas RLS distintas protegem SELECT, INSERT, UPDATE e DELETE;
- usuários anônimos não recebem acesso às tabelas;
- usuários autenticados acessam somente suas próprias fichas;
- somente a coluna `username` do perfil pode ser atualizada pelo usuário;
- exclusão da conta exige o token do próprio usuário na Edge Function;
- personagens são removidos automaticamente quando a conta é apagada.
- cada ficha possui limite de 1 MB e cada conta pode criar até 100 personagens;
- documentos importados são validados e todo texto variável é escapado antes de entrar no HTML legado.

## Idiomas

O seletor da barra superior persiste a preferência no navegador e oferece
pt-BR, inglês e espanhol. Conta, biblioteca, páginas e seletor de opções usam
chaves tipadas. Registros catalogados possuem IDs estáveis e nomes e resumos
localizados sem alterar os nomes canônicos gravados nas fichas. A tradução do
construtor legado continua progressiva.

## Páginas do portal

A navegação funciona por hash e não exige regras especiais do servidor estático:

- `#/builder`: construtor e ficha legada;
- `#/compendium`: busca e filtros de ancestralidades, heranças, classes, arquétipos, magias, rituais, biografias e demais opções de criação;
- `#/rules`: validações de ficha e inventário das fontes locais;
- `#/library`: entrada para conta, CRUD, perfil e segurança.
- `#/privacy`: armazenamento local, nuvem, exclusão e uso dos livros;
- `#/admin`: curadoria somente leitura, visível no menu apenas para `admin`.

O DOM do construtor permanece montado ao trocar de página, evitando quebrar o
motor legado. As abas da ficha expõem somente um painel por vez e mantêm
semântica de `tablist`/`tabpanel`.

## Proveniência dos livros

Os PDFs em `D:\Users\rapha\Documents\Projetos\RPG\livros` são a fonte
primária local. Eles nunca entram no bundle nem são publicados pelo portal.
Contagem de páginas, idioma, edição e catalogação são estados separados:

- `pageCountStatus`: conferido por `pdfinfo`;
- `languageEvidence`: inferido pelo nome do arquivo quando o PDF não informa idioma;
- `ruleset`: `remaster` ou `legacy` somente quando a edição for confirmada; caso contrário `needs_review`;
- `linkedRecords`: opções que já possuem livro e página editorial.

Na última auditoria (`npm run audit:catalog`), o catálogo continha 2205 registros,
incluindo o compêndio expandido legado, subclasses derivadas, heranças específicas
normalizadas, opções de Player Core 2, Pólvora e Engrenagens, Livro dos Mortos,
Dark Archive, Rage of Elements, Howl of the Wild, War of Immortals e Battlecry!:
2161 com livro e página registrados; 44 ainda não têm fonte/página local e 1572
estão marcados como `needs_review`. Não há
nomes ou resumos ausentes nos três idiomas configurados (pt-BR, inglês e
espanhol), nem fallback de tradução detectado no compêndio; as opções sem fonte
continuam visivelmente pendentes. No
Player Core 2, as páginas foram conferidas no início real das seções porque o
sumário brasileiro diverge do miolo em parte das classes, heranças e tabelas.
Essa contagem é um diagnóstico do estado atual, não uma alegação de cobertura
integral dos livros.

## CRUD de personagens

- **Criar:** crie uma ficha e use **Salvar ficha atual**;
- **Listar:** abra **Minha conta**;
- **Atualizar:** altere a ficha e salve novamente;
- **Excluir:** use a lixeira ao lado da ficha na biblioteca;
- **Carregar:** selecione o personagem salvo na biblioteca.

O JSON completo é preservado. Fichas sem proveniência confirmada são gravadas
como `needs_review`, sem inventar livro, página ou classificação Remaster.

## Publicação gratuita recomendada

Cloudflare Pages é a opção principal:

1. coloque o projeto em um repositório Git;
2. crie um projeto em **Workers & Pages** e conecte o repositório;
3. configure o comando `npm run build`;
4. configure a saída `dist`;
5. adicione `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY` nas variáveis de produção;
6. adicione o domínio `*.pages.dev` às Redirect URLs do Supabase Auth;
7. publique e teste cadastro, confirmação de e-mail, CRUD e exclusão de conta.

O plano gratuito do Cloudflare Pages suporta 500 builds mensais e o Supabase
fornece Auth, Postgres e Data API no plano gratuito. Nenhum deploy é feito
automaticamente por este projeto.

## Verificações locais

```powershell
npm test
npm run build
```

O teste local prova contratos TypeScript e componentes. RLS, confirmação de
e-mail, Edge Function e isolamento entre duas contas exigem um projeto
Supabase real antes de poderem ser considerados verificados de ponta a ponta.
