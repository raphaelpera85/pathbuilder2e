# Graph Report - pathbuilder2e_local  (2026-09-04)

## Corpus Check
- 180 files · ~3,151,093 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1748 nodes · 2878 edges · 131 communities (110 shown, 21 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 51 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `17fc1daa`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- pf2e_data.js
- PathbuilderApp
- PortalPages.tsx
- js/pdf-lib.min.js
- public/js/pdf-lib.min.js
- dependencies
- compilerOptions
- Communities (112 total, 15 thin omitted)
- types.ts
- PickerModal.tsx
- main.tsx
- i
- i
- i18n.tsx
- sync-feats.cjs
- sync-feats.js
- escapeHtml
- .renderModalLeftList
- merge-and-sync-all.cjs
- sources.ts
- audit-catalog.cjs
- 2. Regras que Faltavam e Foram Implementadas
- .loadInitialCharacter
- Pathbuilder 2e Local
- ItemPickerModal.tsx
- compilerOptions
- Cobertura PF2e, bugs e melhorias
- 1. O Que Foi Implementado
- 1. Auditoria e Catálogo de Classes, Raças, Arquétipos e Subclasses
- Bt
- za
- Bt
- za
- gi
- Ir
- gi
- Ir
- PathbuilderHandler
- responsive-layout-contract.test.ts
- IPickerController
- bi
- bi
- ja
- pe
- apply-expanded-feats.cjs
- ue
- pf2e_ai_assistant.js
- ja
- pe
- build_and_inject_heritages.cjs
- ue
- pdfFormExport.ts
- merge-catalog-expansions.cjs
- setup.ts
- tsconfig.json
- localizedEquipmentSummary
- pf2e_engine.js
- pf2e_pdf_form_filler.js
- vite-env.d.ts
- index.ts
- build_feats_compendium.cjs
- inject_full_feat_mechanics.cjs
- apply_subclasses_enrichment.cjs
- enrich_all_catalog_feats.cjs
- extract-all-core-class-feats.cjs
- extract-core-ancestry-feats.cjs
- inspect-flagged-details.cjs
- useI18n
- extract-gng-class-feats.cjs
- extract-pc2-class-feats.cjs
- extract-som-class-feats.cjs
- mass_compendium_revamp.cjs
- audit-books.cjs
- enrich_final_compendium_sources.cjs
- inspect_remaining_flagged.cjs
- apply-compendium-audit.cjs
- enrich-all-compendium-items.cjs
- enrich_subclasses.js
- fix-armors-shields.cjs
- inspect-last-23.cjs
- audit-live-character-trees.cjs
- audit-original-pathbuilder.cjs
- extract_all_feats_from_books.py
- find_all_unverified_in_data.cjs
- clean_provenance_assertions.cjs
- fix_all_provenance_test_expectations.cjs
- revise_all_compendium.cjs
- update_provenance_tests.cjs
- audit-all-needs-review.cjs
- breakdown-review.cjs
- check-compendium-review.cjs
- pf2e_feats_mechanics.js
- sw.js
- devDependencies
- Graph Report - pathbuilder2e_local  (2026-09-03)
- scripts
- audit-playwright-multicharacter.cjs
- jt
- package.json
- jt
- rules/graphify.md
- workflows/graphify.md
- GEMINI.md
- typescript
- vite-plugin-static-copy
- generate-catalog-seed.cjs
- catalog.ts
- migrate-catalog-to-supabase.cjs
- PortalPages.test.tsx
- IPickerBridge
- PickerItem

## God Nodes (most connected - your core abstractions)
1. `PathbuilderApp` - 210 edges
2. `Communities (112 total, 15 thin omitted)` - 78 edges
3. `getCurrentSession()` - 28 edges
4. `escapeHtml()` - 26 edges
5. `withRequestTimeout()` - 24 edges
6. `useI18n()` - 22 edges
7. `PickerModal()` - 19 edges
8. `saveCharacter()` - 19 edges
9. `listCharacters()` - 18 edges
10. `AccountPortal()` - 16 edges

## Surprising Connections (you probably didn't know these)
- `CatalogPage()` --calls--> `getItemDisplayName()`  [EXTRACTED]
  src/PortalPages.tsx → src/i18n.tsx
- `CatalogPage()` --calls--> `useI18n()`  [EXTRACTED]
  src/PortalPages.tsx → src/i18n.tsx
- `CatalogPage()` --calls--> `fetchCatalogCategory()`  [EXTRACTED]
  src/PortalPages.tsx → src/services/catalog.ts
- `CatalogPage()` --calls--> `getCatalogSyncStatus()`  [EXTRACTED]
  src/PortalPages.tsx → src/services/catalog.ts
- `CatalogPage()` --calls--> `formatPriceToLocale()`  [EXTRACTED]
  src/PortalPages.tsx → src/utils/economy.ts

## Import Cycles
- None detected.

## Communities (131 total, 21 thin omitted)

### Community 0 - "pf2e_data.js"
Cohesion: 0.01
Nodes (210): ACTION_SPANISH_NAMES, additionalAdvancedFirearms, additionalGunsGearsFirearms, ALL_HERITAGE_DETAILS, ARCHETYPE_CLASS_SECTION_REFERENCES, backpackBallista, backpackCatapult, BATTLECRY_ARCHETYPES (+202 more)

### Community 2 - "PortalPages.tsx"
Cohesion: 0.06
Nodes (103): AccountPortal(), AuthMode, AccountViewState, listeners, snapshot, subscribe(), updateAccountViewState(), useAccountViewState() (+95 more)

### Community 4 - "js/pdf-lib.min.js"
Cohesion: 0.04
Nodes (10): cs(), Gr(), hs(), Kr(), qe(), us(), Ve(), Vr() (+2 more)

### Community 5 - "public/js/pdf-lib.min.js"
Cohesion: 0.04
Nodes (10): cs(), Gr(), hs(), Kr(), qe(), us(), Ve(), Vr() (+2 more)

### Community 6 - "dependencies"
Cohesion: 0.12
Nodes (17): dependencies, pdf-lib, react, react-dom, @supabase/supabase-js, @vercel/analytics, @vercel/speed-insights, vite (+9 more)

### Community 7 - "compilerOptions"
Cohesion: 0.08
Nodes (24): DOM, DOM.Iterable, ES2022, src, src/**/*.test.ts, src/**/*.test.tsx, compilerOptions, allowJs (+16 more)

### Community 8 - "Communities (112 total, 15 thin omitted)"
Cohesion: 0.03
Nodes (78): Communities (112 total, 15 thin omitted), Community 0 - "pf2e_data.js", Community 100 - "clean_provenance_assertions.cjs", Community 101 - "fix_all_provenance_test_expectations.cjs", Community 102 - "revise_all_compendium.cjs", Community 103 - "update_provenance_tests.cjs", Community 104 - "audit-all-needs-review.cjs", Community 105 - "breakdown-review.cjs" (+70 more)

### Community 9 - "types.ts"
Cohesion: 0.09
Nodes (21): IAttributePipelineResult, ICharacterAbilities, ICharacterCoins, ICharacterDocument, IDyingState, IPickerItem, IPickerItemData, IPickerOpenOptions (+13 more)

### Community 10 - "PickerModal.tsx"
Cohesion: 0.20
Nodes (19): getItemDisplayName(), formatGeneratedPrerequisite(), getLocalizedPrerequisiteNames(), getLocalizedSkillName(), getPrerequisiteMessage(), getTraditionDisplayNames(), getTraitDisplayName(), getWeaponProficiencyRank() (+11 more)

### Community 11 - "main.tsx"
Cohesion: 0.16
Nodes (13): ActionDefinition, PF2E_ACTIONS_CATALOG, locales, GUNS_GEARS_EQUIPMENT, ItemDefinition, PF2E_ITEMS_CATALOG, FeatDefinition, PF2E_FEATS_CATALOG (+5 more)

### Community 12 - "i"
Cohesion: 0.19
Nodes (19): a(), ae(), as(), _e(), i(), a(), l(), s() (+11 more)

### Community 13 - "i"
Cohesion: 0.19
Nodes (19): a(), ae(), as(), _e(), i(), a(), l(), s() (+11 more)

### Community 14 - "i18n.tsx"
Cohesion: 0.12
Nodes (16): ANCESTRY_TRANSLATIONS, applyLegacyTranslations(), BACKGROUND_TRANSLATIONS, CLASS_TRANSLATIONS, getStoredLocale(), getTranslationCoverage(), I18nContext, I18nProvider() (+8 more)

### Community 16 - "sync-feats.cjs"
Cohesion: 0.11
Nodes (17): afterFeats, afterFeatsStart, arrayBody, beforeFeats, endIndex, featsArrayCode, featsEndMarkerIndex, featsSection (+9 more)

### Community 17 - "sync-feats.js"
Cohesion: 0.11
Nodes (17): afterFeats, afterFeatsStart, arrayBody, beforeFeats, endIndex, featsArrayCode, featsEndMarkerIndex, featsSection (+9 more)

### Community 19 - ".renderModalLeftList"
Cohesion: 0.13
Nodes (8): findCatalogRecord(), getCatalogDisplayName(), getObjectCatalogRecords(), localizeSourceBookName(), mergeCatalogRecords(), normalizeCatalogLabel(), normalizePickerDedupLabel(), UI_TRANSLATIONS

### Community 20 - "merge-and-sync-all.cjs"
Cohesion: 0.08
Nodes (23): allExtracted, catalog, categories, counts, evalFn, existingFeatIds, featsDataTsPath, featsToAdd (+15 more)

### Community 21 - "sources.ts"
Cohesion: 0.18
Nodes (9): LegacyRecord, GITHUB_BLOB_BASE_URL, GITHUB_LIVROS_FOLDER_URL, GITHUB_RAW_BASE_URL, GITHUB_REPO_URL, GOOGLE_DRIVE_FOLDER_URL, localizeSourceBookName(), PathfinderSource (+1 more)

### Community 22 - "audit-catalog.cjs"
Cohesion: 0.15
Nodes (11): categories, fs, ids, locales, path, report, root, sandbox (+3 more)

### Community 23 - "2. Regras que Faltavam e Foram Implementadas"
Cohesion: 0.17
Nodes (11): 1. Contexto e Auditoria de Regras dos Livros, 2. Regras que Faltavam e Foram Implementadas, [FASE 1] Pipeline Oficial de Atributos Remaster (Attribute Boosts & Flaws), [FASE 2] Perícias Iniciais e Idiomas, [FASE 3] Sentidos Especiais e Visão, [FASE 4] Mecânica Completa de Traços de Armas e Críticos Avançados, [FASE 5] Mecânica de Escudo, Dureza e Bloqueio com Escudo (Shield Block), [FASE 6] Condições de Risco de Morte: Morrendo, Ferido e Condenado (+3 more)

### Community 25 - "Pathbuilder 2e Local"
Cohesion: 0.17
Nodes (11): Configurar o Supabase, Conta administrativa, CRUD de personagens, Dados e segurança, Desenvolvimento local, Idiomas, Pathbuilder 2e Local, Proveniência dos livros (+3 more)

### Community 26 - "ItemPickerModal.tsx"
Cohesion: 0.24
Nodes (18): Locale, formatItemCategory(), formatItemPrice(), ItemCatalogRecord, itemIdentityKeys(), itemPickerCopy, ItemPickerModal(), ItemPickerState (+10 more)

### Community 27 - "compilerOptions"
Cohesion: 0.20
Nodes (9): vite.config.ts, compilerOptions, allowImportingTsExtensions, composite, module, moduleResolution, noEmit, skipLibCheck (+1 more)

### Community 28 - "Cobertura PF2e, bugs e melhorias"
Cohesion: 0.12
Nodes (16): Auditoria incremental — Campeão (Player Core 2), Cobertura PF2e, bugs e melhorias, Correção de catálogo compartilhado e filtragem contextual, Critério de conclusão, Estado confirmado nesta sessão, HANDOFF PARA CONTINUIDADE (atualizado em 01/09/2026), Objetivo integral do usuário, P0 — bloqueios de integridade (+8 more)

### Community 29 - "1. O Que Foi Implementado"
Cohesion: 0.22
Nodes (8): 1. O Que Foi Implementado, 2. Verificação e Testes Automatizados, 💖 Condições de Risco de Morte: Morrendo, Ferido e Condenado, 📚 Cálculo de Perícias Treinadas e Sentidos Especiais, 🛡️ Escudos & Bloqueio com Escudo (Shield Block), 🎯 Pipeline Oficial de Atributos Remaster, ⚔️ Traços Avançados de Armas e Fórmulas Críticas, Walkthrough - Implementação Completa das Regras dos Livros e Criação de Personagens (PF2e Remaster)

### Community 30 - "1. Auditoria e Catálogo de Classes, Raças, Arquétipos e Subclasses"
Cohesion: 0.25
Nodes (7): 1. Auditoria e Catálogo de Classes, Raças, Arquétipos e Subclasses, [FASE 1] Novas Classes de Todos os Livros, [FASE 2] Novas Raças / Ancestralidades de Todos os Livros, [FASE 3] Heranças Versáteis e Arquétipos Oficiais, [FASE 4] Assistente de IA Gratuito para Criação de Personagens, [FASE 5] Testes Automatizados & Validação, Tarefas: Expansão de Conteúdo dos Livros e Assistente de IA no Portal

### Community 31 - "Bt"
Cohesion: 0.39
Nodes (8): Bt(), Dt(), Ht(), It(), Kt(), Nt(), Ot(), Wt()

### Community 32 - "za"
Cohesion: 0.39
Nodes (8): Ma(), Na(), Pa(), qa(), Ra(), Ta(), Va(), za()

### Community 33 - "Bt"
Cohesion: 0.39
Nodes (8): Bt(), Dt(), Ht(), It(), Kt(), Nt(), Ot(), Wt()

### Community 34 - "za"
Cohesion: 0.39
Nodes (8): Ma(), Na(), Pa(), qa(), Ra(), Ta(), Va(), za()

### Community 35 - "gi"
Cohesion: 0.38
Nodes (7): ci(), di(), fi(), gi(), li(), pi(), si()

### Community 36 - "Ir"
Cohesion: 0.52
Nodes (7): Hr(), Ir(), jr(), Lr(), Mr(), Ur(), Zr()

### Community 37 - "gi"
Cohesion: 0.38
Nodes (7): ci(), di(), fi(), gi(), li(), pi(), si()

### Community 38 - "Ir"
Cohesion: 0.52
Nodes (7): Hr(), Ir(), jr(), Lr(), Mr(), Ur(), Zr()

### Community 40 - "responsive-layout-contract.test.ts"
Cohesion: 0.43
Nodes (4): loadBackgroundBoostConstraints(), loadCatalogMerger(), loadCollectionRemover(), read()

### Community 42 - "bi"
Cohesion: 0.40
Nodes (6): ai(), bi(), ii(), mi(), wi(), yi()

### Community 43 - "bi"
Cohesion: 0.40
Nodes (6): ai(), bi(), ii(), mi(), wi(), yi()

### Community 44 - "ja"
Cohesion: 0.40
Nodes (5): Da(), Ea(), Ia(), ja(), Oa()

### Community 45 - "pe"
Cohesion: 0.40
Nodes (5): de(), ee(), fe(), ge(), pe()

### Community 46 - "apply-expanded-feats.cjs"
Cohesion: 0.10
Nodes (20): arrayBody, evalExisting, existingFeats, existingIds, featsDataTsPath, featsToAdd, featsTsContent, formattedNewFeats (+12 more)

### Community 47 - "ue"
Cohesion: 0.50
Nodes (5): he(), ne(), re(), se(), ue()

### Community 49 - "ja"
Cohesion: 0.40
Nodes (5): Da(), Ea(), Ia(), ja(), Oa()

### Community 50 - "pe"
Cohesion: 0.40
Nodes (5): de(), ee(), fe(), ge(), pe()

### Community 51 - "build_and_inject_heritages.cjs"
Cohesion: 0.12
Nodes (16): content, dataFile, fs, { HERITAGE_DATABASE }, path, content, dataFile, enrichedMap (+8 more)

### Community 52 - "ue"
Cohesion: 0.50
Nodes (5): he(), ne(), re(), se(), ue()

### Community 53 - "pdfFormExport.ts"
Cohesion: 0.17
Nodes (15): CharacterDocument, cleanWeaponName(), fillCharacterPdfForm(), getLocalizedFeatDetails(), localizeCatalogItem(), localizeDamageType(), localizeSense(), localizeTrait() (+7 more)

### Community 54 - "merge-catalog-expansions.cjs"
Cohesion: 0.11
Nodes (17): arrayBody, endIndex, evalExisting, existingFeats, existingFeatsJsonCode, existingIds, existingNames, featsDataTsPath (+9 more)

### Community 59 - "pf2e_pdf_form_filler.js"
Cohesion: 0.57
Nodes (7): cleanWeaponName(), fillOfficialPdf(), getLocalizedFeatDetails(), localizeCatalogItem(), localizeDamageType(), localizeSense(), localizeTrait()

### Community 75 - "build_feats_compendium.cjs"
Cohesion: 0.12
Nodes (12): featsDataTsPath, fs, html, indexHtmlPath, jsData, masterFeats, masterJsonPath, mechanicsJsPath (+4 more)

### Community 76 - "inject_full_feat_mechanics.cjs"
Cohesion: 0.14
Nodes (10): featsDataTsPath, fs, jsContent, masterFeats, masterJsonPath, mechanicsEntries, path, pf2eDataJsPath (+2 more)

### Community 77 - "apply_subclasses_enrichment.cjs"
Cohesion: 0.15
Nodes (12): code, end1, end2, filePath, finalLines, fs, lines, lines2 (+4 more)

### Community 78 - "enrich_all_catalog_feats.cjs"
Cohesion: 0.15
Nodes (9): featsDataTsPath, fs, jsContent, masterFeats, masterJsonPath, path, pf2eDataJsPath, slugLookup (+1 more)

### Community 79 - "extract-all-core-class-feats.cjs"
Cohesion: 0.20
Nodes (11): extractClassFeatsFromText(), fs, path, pc1Classes, pc1ClassFeats, pc1Txt, pc2Classes, pc2ClassFeats (+3 more)

### Community 81 - "extract-core-ancestry-feats.cjs"
Cohesion: 0.18
Nodes (8): ancestries, enNames, esNames, extractedFeats, fs, path, seenSlugs, txt

### Community 82 - "inspect-flagged-details.cjs"
Cohesion: 0.20
Nodes (9): archFlagged, bgFlagged, dataFilePath, fs, path, petFlagged, sandbox, source (+1 more)

### Community 83 - "useI18n"
Cohesion: 0.19
Nodes (14): LocaleSwitcher(), useI18n(), DownloadsPage(), getRoute(), PortalPages(), PrivacyPage(), applyThemeToDOM(), getInitialTheme() (+6 more)

### Community 84 - "extract-gng-class-feats.cjs"
Cohesion: 0.22
Nodes (6): classes, extractedFeats, fs, path, seenSlugs, txt

### Community 85 - "extract-pc2-class-feats.cjs"
Cohesion: 0.22
Nodes (6): classes, extractedFeats, fs, path, seenSlugs, txt

### Community 86 - "extract-som-class-feats.cjs"
Cohesion: 0.22
Nodes (6): classes, extractedFeats, fs, path, seenSlugs, txt

### Community 87 - "mass_compendium_revamp.cjs"
Cohesion: 0.22
Nodes (8): content, dataFilePath, eqContent, eqFilePath, fs, path, petsContent, petsFilePath

### Community 88 - "audit-books.cjs"
Cohesion: 0.25
Nodes (6): booksDir, fs, path, { PDFDocument }, positionalArgs, { spawnSync }

### Community 89 - "enrich_final_compendium_sources.cjs"
Cohesion: 0.25
Nodes (7): ancestrySources, content, dataFilePath, fs, heritageSources, path, versatileSources

### Community 90 - "inspect_remaining_flagged.cjs"
Cohesion: 0.25
Nodes (6): dataFilePath, fs, path, sandbox, source, vm

### Community 91 - "apply-compendium-audit.cjs"
Cohesion: 0.29
Nodes (6): dataFilePath, fs, path, sandbox, source, vm

### Community 92 - "enrich-all-compendium-items.cjs"
Cohesion: 0.29
Nodes (6): content, coreArmors, coreShields, dataFilePath, fs, path

### Community 93 - "enrich_subclasses.js"
Cohesion: 0.29
Nodes (6): content, filePath, fs, path, SUBCLASSES_MASTER_DATA, vm

### Community 94 - "fix-armors-shields.cjs"
Cohesion: 0.29
Nodes (6): armors, dataFilePath, fs, path, s, shields

### Community 95 - "inspect-last-23.cjs"
Cohesion: 0.29
Nodes (6): dataFilePath, fs, path, sandbox, source, vm

### Community 96 - "audit-live-character-trees.cjs"
Cohesion: 0.33
Nodes (4): fs, OUTPUT_DIR, path, puppeteer

### Community 97 - "audit-original-pathbuilder.cjs"
Cohesion: 0.33
Nodes (4): fs, OUTPUT_DIR, path, puppeteer

### Community 98 - "extract_all_feats_from_books.py"
Cohesion: 0.60
Nodes (5): clean_feat_name(), extract_feats_from_pdf(), normalize_text(), parse_action_icon(), slugify()

### Community 99 - "find_all_unverified_in_data.cjs"
Cohesion: 0.33
Nodes (5): content, dataFilePath, fs, lines, path

### Community 100 - "clean_provenance_assertions.cjs"
Cohesion: 0.40
Nodes (4): content, fs, path, testPath

### Community 101 - "fix_all_provenance_test_expectations.cjs"
Cohesion: 0.40
Nodes (4): content, fs, path, testPath

### Community 102 - "revise_all_compendium.cjs"
Cohesion: 0.40
Nodes (4): dataContent, dataFilePath, fs, path

### Community 103 - "update_provenance_tests.cjs"
Cohesion: 0.40
Nodes (4): content, fs, path, testPath

### Community 104 - "audit-all-needs-review.cjs"
Cohesion: 0.50
Nodes (3): fs, sandbox, vm

### Community 105 - "breakdown-review.cjs"
Cohesion: 0.50
Nodes (3): fs, sandbox, vm

### Community 106 - "check-compendium-review.cjs"
Cohesion: 0.50
Nodes (3): fs, sandbox, vm

### Community 112 - "devDependencies"
Cohesion: 0.12
Nodes (17): jsdom, devDependencies, jsdom, playwright, puppeteer-core, @testing-library/jest-dom, @testing-library/react, @types/react (+9 more)

### Community 113 - "Graph Report - pathbuilder2e_local  (2026-09-03)"
Cohesion: 0.18
Nodes (10): Community Hubs (Navigation), Corpus Check, God Nodes (most connected - your core abstractions), Graph Freshness, Graph Report - pathbuilder2e_local  (2026-09-03), Import Cycles, Knowledge Gaps, Suggested Questions (+2 more)

### Community 114 - "scripts"
Cohesion: 0.29
Nodes (7): scripts, audit:books, audit:catalog, audit:catalog:provenance, build, dev, test

### Community 115 - "audit-playwright-multicharacter.cjs"
Cohesion: 0.33
Nodes (4): { chromium }, fs, path, SNAPSHOTS_DIR

### Community 116 - "jt"
Cohesion: 0.40
Nodes (5): Et(), jt(), qt(), Ut(), Vt()

### Community 117 - "package.json"
Cohesion: 0.40
Nodes (4): name, private, type, version

### Community 118 - "jt"
Cohesion: 0.40
Nodes (5): Et(), jt(), qt(), Ut(), Vt()

### Community 124 - "generate-catalog-seed.cjs"
Cohesion: 0.05
Nodes (42): actionsData, allHeritages, ancestriesData, ancestryNameToId, archetypesData, armorsData, backgroundsData, buffsData (+34 more)

### Community 125 - "catalog.ts"
Cohesion: 0.26
Nodes (13): CatalogItemRecord, CatalogSyncStatus, CatalogTableName, fetchCatalogCategory(), fetchCatalogItemById(), getCatalogSyncStatus(), getFromLocalCache(), getLocalRuntimeItems() (+5 more)

### Community 127 - "migrate-catalog-to-supabase.cjs"
Cohesion: 0.25
Nodes (6): { createClient }, dataDir, fs, path, supabase, tableOrder

### Community 128 - "PortalPages.test.tsx"
Cohesion: 0.25
Nodes (6): verifiedAncestry, verifiedArchetype, verifiedHeritage, verifiedRitual, verifiedSpell, PickerController

## Knowledge Gaps
- **837 isolated node(s):** `fs`, `path`, `vm`, `dataPath`, `fileContent` (+832 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `PathbuilderApp` connect `PathbuilderApp` to `.renderAll`, `.applyPickerSelection`, `.renderDetailsTab`, `escapeHtml`, `.renderModalLeftList`, `.loadInitialCharacter`, `.openSetAbilitiesModal`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `useI18n()` connect `useI18n` to `PickerModal.tsx`, `PortalPages.tsx`, `ItemPickerModal.tsx`, `i18n.tsx`?**
  _High betweenness centrality (0.002) - this node is a cross-community bridge._
- **Why does `Communities (112 total, 15 thin omitted)` connect `Communities (112 total, 15 thin omitted)` to `Graph Report - pathbuilder2e_local  (2026-09-03)`?**
  _High betweenness centrality (0.002) - this node is a cross-community bridge._
- **What connects `fs`, `path`, `vm` to the rest of the system?**
  _837 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `pf2e_data.js` be split into smaller, more focused modules?**
  _Cohesion score 0.009345794392523364 - nodes in this community are weakly interconnected._
- **Should `PathbuilderApp` be split into smaller, more focused modules?**
  _Cohesion score 0.06458635703918723 - nodes in this community are weakly interconnected._
- **Should `PortalPages.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.056117362199116935 - nodes in this community are weakly interconnected._