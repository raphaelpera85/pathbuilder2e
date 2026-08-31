# Graph Report - pathbuilder2e_local  (2026-08-31)

## Corpus Check
- 76 files · ~311,647 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1115 nodes · 2000 edges · 75 communities (62 shown, 13 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 49 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f090e5d7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- pf2e_data.js
- PathbuilderApp
- auth.ts
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
- jt
- ue
- pf2e_ai_assistant.js
- ja
- pe
- jt
- ue
- official-fillable-pdf.test.ts
- setup.ts
- tsconfig.json
- localizedEquipmentSummary
- pf2e_engine.js
- vite-env.d.ts
- index.ts

## God Nodes (most connected - your core abstractions)
1. `PathbuilderApp` - 200 edges
2. `escapeHtml()` - 25 edges
3. `getCurrentSession()` - 25 edges
4. `useI18n()` - 18 edges
5. `compilerOptions` - 16 edges
6. `AccountPortal()` - 15 edges
7. `CampaignsPage()` - 15 edges
8. `listCharacters()` - 12 edges
9. `saveCharacter()` - 12 edges
10. `signUp()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `AccountPortal()` --calls--> `useI18n()`  [EXTRACTED]
  src/AccountPortal.tsx → src/i18n.tsx
- `CampaignsPage()` --calls--> `useI18n()`  [EXTRACTED]
  src/CampaignsPage.tsx → src/i18n.tsx
- `ItemPickerModal()` --calls--> `getItemDisplayName()`  [EXTRACTED]
  src/ItemPickerModal.tsx → src/i18n.tsx
- `ItemPickerModal()` --calls--> `useI18n()`  [EXTRACTED]
  src/ItemPickerModal.tsx → src/i18n.tsx
- `ItemPickerModal()` --calls--> `canAffordPrice()`  [EXTRACTED]
  src/ItemPickerModal.tsx → src/utils/economy.ts

## Import Cycles
- None detected.

## Communities (75 total, 13 thin omitted)

### Community 0 - "pf2e_data.js"
Cohesion: 0.01
Nodes (194): ACTION_SPANISH_NAMES, additionalAdvancedFirearms, additionalGunsGearsFirearms, ARCHETYPE_CLASS_SECTION_REFERENCES, backpackBallista, backpackCatapult, BATTLECRY_ARCHETYPES, BATTLECRY_BACKGROUNDS (+186 more)

### Community 2 - "auth.ts"
Cohesion: 0.11
Nodes (55): AccountPortal(), AuthMode, updateAccountViewState(), CampaignsPage(), isSupabaseConfigured, supabase, SUPABASE_PROJECT_KEY, SUPABASE_PROJECT_URL (+47 more)

### Community 4 - "js/pdf-lib.min.js"
Cohesion: 0.04
Nodes (10): cs(), Gr(), hs(), Kr(), qe(), us(), Ve(), Vr() (+2 more)

### Community 5 - "public/js/pdf-lib.min.js"
Cohesion: 0.04
Nodes (10): cs(), Gr(), hs(), Kr(), qe(), us(), Ve(), Vr() (+2 more)

### Community 6 - "dependencies"
Cohesion: 0.04
Nodes (44): jsdom, dependencies, pdf-lib, react, react-dom, @supabase/supabase-js, typescript, @vercel/analytics (+36 more)

### Community 7 - "compilerOptions"
Cohesion: 0.08
Nodes (24): DOM, DOM.Iterable, ES2022, src, src/**/*.test.ts, src/**/*.test.tsx, compilerOptions, allowJs (+16 more)

### Community 8 - "PortalPages.tsx"
Cohesion: 0.14
Nodes (22): AccountViewState, listeners, snapshot, subscribe(), useAccountViewState(), getItemDisplayName(), MessageKey, useI18n() (+14 more)

### Community 9 - "types.ts"
Cohesion: 0.08
Nodes (21): IAttributePipelineResult, ICharacterAbilities, ICharacterCoins, ICharacterDocument, IDyingState, IPickerBridge, IPickerItem, IPickerItemData (+13 more)

### Community 10 - "PickerModal.tsx"
Cohesion: 0.21
Nodes (18): getPrerequisiteMessage(), getWeaponProficiencyRank(), pickerLabelKeys, PickerModal(), PickerModalProps, rankToInitial(), tabTranslations, controllerDefaults (+10 more)

### Community 11 - "main.tsx"
Cohesion: 0.15
Nodes (12): ActionDefinition, PF2E_ACTIONS_CATALOG, locales, GUNS_GEARS_EQUIPMENT, PF2E_ITEMS_CATALOG, FeatDefinition, PF2E_FEATS_CATALOG, PetCompanionDefinition (+4 more)

### Community 12 - "i"
Cohesion: 0.19
Nodes (19): a(), ae(), as(), _e(), i(), a(), l(), s() (+11 more)

### Community 13 - "i"
Cohesion: 0.19
Nodes (19): a(), ae(), as(), _e(), i(), a(), l(), s() (+11 more)

### Community 14 - "i18n.tsx"
Cohesion: 0.13
Nodes (15): ANCESTRY_TRANSLATIONS, applyLegacyTranslations(), BACKGROUND_TRANSLATIONS, CLASS_TRANSLATIONS, getStoredLocale(), I18nContext, I18nProvider(), I18nValue (+7 more)

### Community 16 - "sync-feats.cjs"
Cohesion: 0.11
Nodes (17): afterFeats, afterFeatsStart, arrayBody, beforeFeats, endIndex, featsArrayCode, featsEndMarkerIndex, featsSection (+9 more)

### Community 17 - "sync-feats.js"
Cohesion: 0.11
Nodes (17): afterFeats, afterFeatsStart, arrayBody, beforeFeats, endIndex, featsArrayCode, featsEndMarkerIndex, featsSection (+9 more)

### Community 19 - ".renderModalLeftList"
Cohesion: 0.21
Nodes (5): findCatalogRecord(), getObjectCatalogRecords(), mergeCatalogRecords(), normalizeCatalogLabel(), UI_TRANSLATIONS

### Community 21 - "PortalPages.test.tsx"
Cohesion: 0.16
Nodes (9): LegacyRecord, PathfinderSource, pathfinderSources, verifiedAncestry, verifiedArchetype, verifiedHeritage, verifiedRitual, verifiedSpell (+1 more)

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
Cohesion: 0.27
Nodes (10): ItemDefinition, Locale, formatItemPrice(), ItemCatalogRecord, itemIdentityKeys(), itemPickerCopy, ItemPickerModal(), ItemPickerState (+2 more)

### Community 27 - "compilerOptions"
Cohesion: 0.20
Nodes (9): vite.config.ts, compilerOptions, allowImportingTsExtensions, composite, module, moduleResolution, noEmit, skipLibCheck (+1 more)

### Community 28 - "Cobertura PF2e, bugs e melhorias"
Cohesion: 0.20
Nodes (9): Auditoria incremental — Campeão (Player Core 2), Cobertura PF2e, bugs e melhorias, Correção de catálogo compartilhado e filtragem contextual, Critério de conclusão, P0 — bloqueios de integridade, P1 — catálogo jogável e proveniência, P1 — contrato único e três idiomas, P2 — UX, acessibilidade e operação (+1 more)

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

### Community 46 - "jt"
Cohesion: 0.40
Nodes (5): Et(), jt(), qt(), Ut(), Vt()

### Community 47 - "ue"
Cohesion: 0.50
Nodes (5): he(), ne(), re(), se(), ue()

### Community 49 - "ja"
Cohesion: 0.40
Nodes (5): Da(), Ea(), Ia(), ja(), Oa()

### Community 50 - "pe"
Cohesion: 0.40
Nodes (5): de(), ee(), fe(), ge(), pe()

### Community 51 - "jt"
Cohesion: 0.40
Nodes (5): Et(), jt(), qt(), Ut(), Vt()

### Community 52 - "ue"
Cohesion: 0.50
Nodes (5): he(), ne(), re(), se(), ue()

## Knowledge Gaps
- **400 isolated node(s):** `UI_TRANSLATIONS`, `PF2E_DATA`, `PLAYER_CORE_SPELLS`, `PLAYER_CORE_RITUALS`, `PLAYER_CORE_CATALOG` (+395 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `PathbuilderApp` connect `PathbuilderApp` to `.renderAll`, `.applyPickerSelection`, `escapeHtml`, `.renderModalLeftList`, `.openSetAbilitiesModal`, `.deductCharacterPrice`, `.loadInitialCharacter`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Why does `useI18n()` connect `PortalPages.tsx` to `PickerModal.tsx`, `auth.ts`, `ItemPickerModal.tsx`, `i18n.tsx`?**
  _High betweenness centrality (0.003) - this node is a cross-community bridge._
- **What connects `UI_TRANSLATIONS`, `PF2E_DATA`, `PLAYER_CORE_SPELLS` to the rest of the system?**
  _400 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `pf2e_data.js` be split into smaller, more focused modules?**
  _Cohesion score 0.01015228426395939 - nodes in this community are weakly interconnected._
- **Should `PathbuilderApp` be split into smaller, more focused modules?**
  _Cohesion score 0.047082494969818915 - nodes in this community are weakly interconnected._
- **Should `auth.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11408730158730158 - nodes in this community are weakly interconnected._
- **Should `.renderAll` be split into smaller, more focused modules?**
  _Cohesion score 0.09014675052410902 - nodes in this community are weakly interconnected._