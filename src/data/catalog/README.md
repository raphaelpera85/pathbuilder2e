# Catálogo versionado

Os arquivos em `snapshots/` são a fonte de dados do compêndio publicada pela aplicação. Eles são separados por `system_id`, `ruleset` e categoria, por exemplo:

```text
snapshots/pf2e/remaster/feat.json
snapshots/dnd5e/standard/spell.json
snapshots/dnd35/v35-frostburn/item.json
```

Para atualizar o snapshot a partir do projeto de origem, execute:

```powershell
node scripts/export-catalog-snapshot.mjs
```

O código de produção não consulta o banco para carregar classes, raças, itens, magias, poderes ou demais entradas do catálogo. Cada registro preserva `system_id` e `ruleset`; filtros e fichas nunca devem usar dados de outro sistema ou edição.
