# Graph Report - pathbuilder2e_local  (2026-09-03)

## Corpus Check
- 139 files · ~1,976,022 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1559 nodes · 2666 edges · 112 communities (77 shown, 15 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 51 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3b07bb72`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- pf2e_data.js
- PathbuilderApp
- characters.ts
- js/pdf-lib.min.js
- public/js/pdf-lib.min.js
- dependencies
- compilerOptions
- PortalPages.tsx
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
- PortalPages.test.tsx
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
- le
- pf2e_ai_assistant.js
- ja
- pe
- build_and_inject_heritages.cjs
- le
- official-fillable-pdf.test.ts
- merge-catalog-expansions.cjs
- setup.ts
- tsconfig.json
- localizedEquipmentSummary
- pf2e_engine.js
- vite-env.d.ts
- index.ts
- build_feats_compendium.cjs
- inject_full_feat_mechanics.cjs
- apply_subclasses_enrichment.cjs
- enrich_all_catalog_feats.cjs
- extract-all-core-class-feats.cjs
- extract-core-ancestry-feats.cjs
- inspect-flagged-details.cjs
- theme.tsx
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

## God Nodes (most connected - your core abstractions)
1. `PathbuilderApp` - 210 edges
2. `getCurrentSession()` - 28 edges
3. `escapeHtml()` - 26 edges
4. `withRequestTimeout()` - 25 edges
5. `useI18n()` - 22 edges
6. `saveCharacter()` - 19 edges
7. `PickerModal()` - 18 edges
8. `listCharacters()` - 18 edges
9. `AccountPortal()` - 16 edges
10. `compilerOptions` - 16 edges

## Surprising Connections (you probably didn't know these)
- `AccountPortal()` --calls--> `useI18n()`  [EXTRACTED]
  src/AccountPortal.tsx → src/i18n.tsx
- `CampaignsPage()` --calls--> `useI18n()`  [EXTRACTED]
  src/CampaignsPage.tsx → src/i18n.tsx
- `ItemPickerModal()` --calls--> `localizeSourceBookName()`  [EXTRACTED]
  src/ItemPickerModal.tsx → src/data/sources.ts
- `ItemPickerModal()` --calls--> `getItemDisplayName()`  [EXTRACTED]
  src/ItemPickerModal.tsx → src/i18n.tsx
- `ItemPickerModal()` --calls--> `useI18n()`  [EXTRACTED]
  src/ItemPickerModal.tsx → src/i18n.tsx

## Import Cycles
- None detected.

## Communities (112 total, 15 thin omitted)

### Community 0 - "pf2e_data.js"
Cohesion: 0.01
Nodes (210): ACTION_SPANISH_NAMES, additionalAdvancedFirearms, additionalGunsGearsFirearms, ALL_HERITAGE_DETAILS, ARCHETYPE_CLASS_SECTION_REFERENCES, backpackBallista, backpackCatapult, BATTLECRY_ARCHETYPES (+202 more)

### Community 2 - "characters.ts"
Cohesion: 0.08
Nodes (80): AccountPortal(), AuthMode, updateAccountViewState(), CampaignsPage(), isSupabaseConfigured, supabase, SUPABASE_PROJECT_KEY, SUPABASE_PROJECT_URL (+72 more)

### Community 4 - "js/pdf-lib.min.js"
Cohesion: 0.05
Nodes (21): cs(), Ei(), Et(), Gr(), hs(), io(), jt(), Ki() (+13 more)

### Community 5 - "public/js/pdf-lib.min.js"
Cohesion: 0.05
Nodes (21): cs(), Ei(), Et(), Gr(), hs(), io(), jt(), Ki() (+13 more)

### Community 6 - "dependencies"
Cohesion: 0.04
Nodes (47): jsdom, dependencies, pdf-lib, react, react-dom, @supabase/supabase-js, typescript, @vercel/analytics (+39 more)

### Community 7 - "compilerOptions"
Cohesion: 0.08
Nodes (24): DOM, DOM.Iterable, ES2022, src, src/**/*.test.ts, src/**/*.test.tsx, compilerOptions, allowJs (+16 more)

### Community 8 - "PortalPages.tsx"
Cohesion: 0.12
Nodes (30): AccountViewState, listeners, snapshot, subscribe(), useAccountViewState(), useI18n(), getTraditionDisplayNames(), AdminPage() (+22 more)

### Community 9 - "types.ts"
Cohesion: 0.08
Nodes (21): IAttributePipelineResult, ICharacterAbilities, ICharacterCoins, ICharacterDocument, IDyingState, IPickerBridge, IPickerItem, IPickerItemData (+13 more)

### Community 10 - "PickerModal.tsx"
Cohesion: 0.15
Nodes (22): getItemDisplayName(), MessageKey, formatGeneratedPrerequisite(), getLocalizedPrerequisiteNames(), getLocalizedSkillName(), getPrerequisiteMessage(), getTraitDisplayName(), getWeaponProficiencyRank() (+14 more)

### Community 11 - "main.tsx"
Cohesion: 0.16
Nodes (13): ActionDefinition, PF2E_ACTIONS_CATALOG, locales, GUNS_GEARS_EQUIPMENT, ItemDefinition, PF2E_ITEMS_CATALOG, FeatDefinition, PF2E_FEATS_CATALOG (+5 more)

### Community 12 - "i"
Cohesion: 0.23
Nodes (17): a(), as(), _e(), i(), a(), l(), s(), is() (+9 more)

### Community 13 - "i"
Cohesion: 0.23
Nodes (17): a(), as(), _e(), i(), a(), l(), s(), is() (+9 more)

### Community 14 - "i18n.tsx"
Cohesion: 0.12
Nodes (17): ANCESTRY_TRANSLATIONS, applyLegacyTranslations(), BACKGROUND_TRANSLATIONS, CLASS_TRANSLATIONS, getStoredLocale(), getTranslationCoverage(), I18nContext, I18nProvider() (+9 more)

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

### Community 21 - "PortalPages.test.tsx"
Cohesion: 0.11
Nodes (15): LegacyRecord, GITHUB_BLOB_BASE_URL, GITHUB_LIVROS_FOLDER_URL, GITHUB_RAW_BASE_URL, GITHUB_REPO_URL, GOOGLE_DRIVE_FOLDER_URL, localizeSourceBookName(), PathfinderSource (+7 more)

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
Cohesion: 0.26
Nodes (17): formatItemCategory(), formatItemPrice(), ItemCatalogRecord, itemIdentityKeys(), itemPickerCopy, ItemPickerModal(), ItemPickerState, itemRichnessScore() (+9 more)

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
Cohesion: 0.47
Nodes (6): ai(), bi(), ii(), mi(), wi(), yi()

### Community 43 - "bi"
Cohesion: 0.47
Nodes (6): ai(), bi(), ii(), mi(), wi(), yi()

### Community 44 - "ja"
Cohesion: 0.40
Nodes (5): Da(), Ea(), Ia(), ja(), Oa()

### Community 45 - "pe"
Cohesion: 0.50
Nodes (5): de(), ee(), fe(), ge(), pe()

### Community 46 - "apply-expanded-feats.cjs"
Cohesion: 0.10
Nodes (20): arrayBody, evalExisting, existingFeats, existingIds, featsDataTsPath, featsToAdd, featsTsContent, formattedNewFeats (+12 more)

### Community 47 - "le"
Cohesion: 0.22
Nodes (11): ae(), he(), le(), ne(), qe(), re(), se(), ue() (+3 more)

### Community 49 - "ja"
Cohesion: 0.40
Nodes (5): Da(), Ea(), Ia(), ja(), Oa()

### Community 50 - "pe"
Cohesion: 0.50
Nodes (5): de(), ee(), fe(), ge(), pe()

### Community 51 - "build_and_inject_heritages.cjs"
Cohesion: 0.12
Nodes (16): content, dataFile, fs, { HERITAGE_DATABASE }, path, content, dataFile, enrichedMap (+8 more)

### Community 52 - "le"
Cohesion: 0.22
Nodes (11): ae(), he(), le(), ne(), qe(), re(), se(), ue() (+3 more)

### Community 54 - "merge-catalog-expansions.cjs"
Cohesion: 0.11
Nodes (17): arrayBody, endIndex, evalExisting, existingFeats, existingFeatsJsonCode, existingIds, existingNames, featsDataTsPath (+9 more)

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

### Community 83 - "theme.tsx"
Cohesion: 0.36
Nodes (8): applyThemeToDOM(), getInitialTheme(), Theme, ThemeContext, ThemeContextType, ThemeProvider(), ThemeSwitcher(), useTheme()

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

## Knowledge Gaps
- **692 isolated node(s):** `UI_TRANSLATIONS`, `PF2E_DATA`, `PLAYER_CORE_SPELLS`, `PLAYER_CORE_RITUALS`, `PLAYER_CORE_CATALOG` (+687 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 855 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `PathbuilderApp` connect `PathbuilderApp` to `.renderAll`, `.applyPickerSelection`, `.renderDetailsTab`, `escapeHtml`, `.renderModalLeftList`, `.loadInitialCharacter`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `IPickerController` connect `IPickerController` to `types.ts`?**
  _High betweenness centrality (0.004) - this node is a cross-community bridge._
- **Why does `useI18n()` connect `PortalPages.tsx` to `characters.ts`, `PickerModal.tsx`, `i18n.tsx`, `theme.tsx`, `ItemPickerModal.tsx`?**
  _High betweenness centrality (0.003) - this node is a cross-community bridge._
- **What connects `UI_TRANSLATIONS`, `PF2E_DATA`, `PLAYER_CORE_SPELLS` to the rest of the system?**
  _692 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `pf2e_data.js` be split into smaller, more focused modules?**
  _Cohesion score 0.009345794392523364 - nodes in this community are weakly interconnected._
- **Should `PathbuilderApp` be split into smaller, more focused modules?**
  _Cohesion score 0.05432692307692308 - nodes in this community are weakly interconnected._
- **Should `characters.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07664150080073209 - nodes in this community are weakly interconnected._