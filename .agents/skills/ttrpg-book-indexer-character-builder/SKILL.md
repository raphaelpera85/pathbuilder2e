---
name: ttrpg-book-indexer-character-builder
description: Comprehensive workflow and architecture for reading tabletop RPG sourcebooks, extracting tables of contents and indices, structuring rules/entities, and building multi-system character creation engines.
---

# TTRPG Book Indexer & Character Builder

This skill defines the rigorous, cross-system standard for:
1. **Reading & Auditing RPG Sourcebooks (PDF/EPUB)**: Validating page counts, metadata, tables of contents, and indices.
2. **Cataloging & Ordering Rules and Options**: Parsing classes, heritages, feats, spells, items, and rulesets across systems (PF2e, D&D 5e, Tormenta 20, OSE, D&D 3.5).
3. **Character Creation Engine**: System-agnostic progression pipeline, attribute point-buy/rolls, choice pickers, validation gates, and sheet generation.

---

## 1. Book Ingestion & Indexing Pipeline

### 1.1 Physical File Validation
- **Exact Page Counting**: Never estimate or trust subjective filenames. Run authoritative PDF header parsers (`pdf-lib`, `pdfinfo`, `pypdf`) to extract exact document page counts (`pages: number`).
- **Filename Normalization**: Sanitize file names to clean ASCII or normalized UTF-8 identifiers matching cloud storage keys.
- **Trilingual Metadata Extraction**: Every catalogued title must provide localized titles across `pt-BR`, `en`, and `es`:
  ```typescript
  titles: {
    "pt-BR": "Livro do Jogador",
    "en": "Player's Handbook",
    "es": "Manual del Jugador",
  }
  ```

### 1.2 Table of Contents & Index Extraction
1. **Bookmark Tree Extraction**: Read PDF catalog outlines (`/Outlines`). Extract hierarchical chapter headings with target page offsets.
2. **TOC Text Scraping**: For PDFs lacking internal outlines, OCR or parse the introductory TOC pages (typically pages 2–6). Match Roman numerals or Arabic page indices with regex: `^([\w\s\-,]+)\s+[\.\s]+(\d+)$`.
3. **Index Mapping**: Parse rear index pages to cross-reference rules, spells, feats, and equipment with exact rulebook pages (`source: { book, page }`).

---

## 2. Ruleset & Taxonomy Governance

### 2.1 Supported RPG Systems & Canonical Rulesets
Each RPG system maintains its own isolated ruleset vocabulary. Never cross-contaminate ruleset IDs across different systems:
- **Pathfinder 2e (`pf2e`)**: `remaster`, `legacy`, `both`.
- **Dungeons & Dragons 5e (`dnd5e`)**: `standard` (2014 SRD), `2024` (Revised).
- **Tormenta 20 (`t20`)**: `padrao`, `jogo_do_ano`.
- **Old-School Essentials (`ose`)**: `classic`, `advanced`.
- **Dungeons & Dragons 3.5 (`dnd35`)**: `v35`.

### 2.2 Relational Compendium Category Schema
Compendium items are normalized into typed categories mapped to relational database tables (`catalog_<category>`):
- `ancestry`, `heritage`, `class`, `subclass`, `background`
- `skill`, `feat`, `spell`, `ritual`
- `weapon`, `armor`, `shield`, `item`, `gear`, `formula`
- `action`, `condition`, `buff`, `rule`, `pet`

---

## 3. Character Creation Architecture

### 3.1 The 6-Step Universal Character Loop
1. **System & Ruleset Selection**: Initialize system ID (`t20`, `dnd35`, `pf2e`, etc.) and ruleset constraints.
2. **Core Ancestry & Background**: Apply starting ability boosts, flaws, size, speed, and granted traits/languages.
3. **Class & Subclass Selection**: Determine key ability score, initial HP per level, proficiencies (weapons, armor, saves, skills), and starting class feats.
4. **Attributes Allocation**: Calculate final ability scores via Standard Array, Point Buy (PF2e 18-cap, D&D 27-point, T20 20-point), or Rolling (4d6 drop lowest).
5. **Skills & Feats Selection**: Filter available skill points and feats strictly adhering to prerequisites (minimum stat, level, prior feat).
6. **Equipment & Derived Stats Calculation**:
   - Armor Class (AC) = `10 + Dex (capped by Max Dex) + Armor Bonus + Shield + Misc`.
   - Hit Points (HP) = `Ancestry HP + Class HP Per Level * Level + (Con Mod * Level)`.
   - Attack Bonuses, Saving Throws, and Spell DCs calculated dynamically without persistent mutation of base values.

---

## 4. Quality & Contract Testing Checklist

Before promoting any new book or ruleset to production:
- [ ] Verified PDF exists and page count confirmed via programmatic runner.
- [ ] Trilingual labels populated in `src/i18n.tsx` (`pt-BR`, `en`, `es`).
- [ ] Ruleset added to `src/services/characters.ts` (`normalizeCharacterRuleset`).
- [ ] Catalog source added to `src/data/sources.ts` and `src/services/catalog.ts`.
- [ ] Automated tests pass with 100% green status (`npx vitest run`).
