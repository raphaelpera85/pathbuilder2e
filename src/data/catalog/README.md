# Catálogo versionado

Os arquivos em `snapshots/` são a fonte de dados do compêndio publicada pela aplicação. Eles são separados por `system_id`, `ruleset` e categoria, por exemplo:

```text
snapshots/pf2e/remaster/feat.json
snapshots/dnd5e/standard/spell.json
snapshots/dnd35/v35-frostburn/item.json
snapshots/manifest.json
```

Os snapshots são a fonte canônica do catálogo da aplicação. Para incluir ou corrigir conteúdo, edite o JSON da categoria dentro da pasta do sistema e ruleset correspondentes. Para regenerar as categorias PF1e que derivam dos módulos tipados do Livro Básico, execute `npm run catalog:pf1e:core`; para outras mudanças, regenere o índice local:

```powershell
npm run catalog:manifest
```

Para revisar proveniência, páginas e campos de todos os sistemas e rulesets, execute `npm run audit:catalog:snapshots`. Para validar também as contagens e regras de criação dos sistemas nucleares contra os dados locais, execute `npm run audit:core:catalog`.

Para reconstruir as classes OSE a partir do catálogo tipado e preservar os três modos de criação (`advanced`, `classic` e `basico`), execute `npm run catalog:ose:classes`. Classes humanas comuns são compartilhadas pelo serviço entre os modos em que estão disponíveis; as listas exclusivas de cada modo permanecem nos snapshots correspondentes.

O catálogo usado pela aplicação está materializado nos JSONs versionados, separado por `system_id`, `ruleset` e categoria. Na atualização de 2026-10-10 foram exportadas 6.353 linhas das 19 tabelas remotas e mescladas com os registros locais curados; mais 161 registros PF1e das Tabelas 6-9 (pp. 158–159) e 26 registros de moedas/bens de troca das Tabelas 6-2 e 6-3 (p. 140) foram adicionados de fonte local. A soma atual das contagens por categoria no manifesto é 6.919 (inclui três classes raciais OSE adicionais exportadas do escopo avançado). IDs locais prevalecem em colisões para preservar curadoria. O Compêndio carrega esses arquivos pelo serviço local e não consulta Supabase para ler conteúdo. PF1e também expõe por snapshot as raças, classes (incluindo riqueza inicial da Tabela 6-1), perícias, talentos, 77 armas, 8 tipos de munição, 12 armaduras, 6 escudos, 3 acessórios, 4 denominações de moeda e 22 bens de troca, sempre sob `pf1e/legacy_pf1`. As oito substâncias da Tabela 6-9 incluem resumos mecânicos com páginas de descrição conferidas no livro (pp. 157, 159–160); os 28 equipamentos de aventura com benefícios descritos nas pp. 155–157 também têm resumos e proveniência específica; 18 ferramentas/kits incluem resumos das pp. 160–161. A página da tabela é preservada separadamente da página descritiva. A auditoria conta `summaryOnlyRecords`: esses registros ainda não têm a descrição completa da fonte e devem permanecer identificados como conteúdo parcial.

`scripts/export-catalog-snapshot.mjs` é uma ferramenta legada de importação pontual: continua consultando Supabase, mas foi retirada dos comandos npm e não deve ser usada para a manutenção corrente. A fonte de verdade agora é o Git; novas correções devem ser feitas nos dados tipados ou snapshots locais, depois validadas com `npm run audit:core:catalog`, `npm run audit:catalog` e os testes do serviço. `manifest.json` indexa os arquivos para carregar apenas o necessário; cada registro preserva `system_id` e `ruleset`, evitando mistura entre sistemas ou edições. Os scripts de sincronização Supabase restantes também foram retirados dos comandos npm; integrações Supabase de contas, fichas e campanhas permanecem separadas.

Algumas transcrições locais ainda não têm arquivo de snapshot e são expostas pelo runtime do serviço de catálogo. As listas de magia do Livro do Jogador D&D 3.5 em `src/data/dnd35/dnd35SpellLists.ts` são parciais (níveis 0–1 das listas transcritas e Clérigo 2º); aparecem somente como `dnd35/v35`, sem completar níveis ainda não transcritos nem substituir magias dos suplementos. `src/data/pf1e/pf1eSpells.ts` atualmente expõe os 12 truques de clérigo listados na p. 226 do Livro Básico PF1e, somente em `pf1e/legacy_pf1`; seus resumos não substituem as descrições completas das magias e permanecem marcados como `summaryOnly`.
