# Catálogo versionado

Os arquivos em `snapshots/` são a fonte de dados do compêndio publicada pela aplicação. Eles são separados por `system_id`, `ruleset` e categoria, por exemplo:

```text
snapshots/pf2e/remaster/feat.json
snapshots/dnd5e/standard/spell.json
snapshots/dnd35/v35-frostburn/item.json
snapshots/manifest.json
```

Os snapshots são a fonte canônica do catálogo da aplicação. Para incluir ou corrigir conteúdo, edite o JSON da categoria dentro da pasta do sistema e ruleset correspondentes. Depois regenere o índice local:

```powershell
npm run catalog:manifest
```

Para revisar proveniência, páginas e campos de todos os sistemas e rulesets, execute `npm run audit:catalog:snapshots`.

`scripts/export-catalog-snapshot.mjs` é o importador usado na migração inicial e consulta o projeto Supabase de origem; ele não é usado pela aplicação. O código de produção não consulta o banco para carregar classes, raças, itens, magias, poderes ou demais entradas do catálogo. `manifest.json` indexa os arquivos por sistema, ruleset e categoria para que a aplicação carregue apenas os arquivos necessários. Cada registro preserva `system_id` e `ruleset`; filtros e fichas nunca devem usar dados de outro sistema ou edição.
