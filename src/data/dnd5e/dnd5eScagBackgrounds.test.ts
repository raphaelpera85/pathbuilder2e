import { describe, expect, it } from 'vitest';
import { DND5E_SCAG_BACKGROUNDS, DND5E_SCAG_SOURCE_BOOK } from './dnd5eScagBackgrounds';

describe('dnd5eScagBackgrounds', () => {
  it('contains exactly 12 SCAG backgrounds without stubs or replacement characters', () => {
    expect(DND5E_SCAG_BACKGROUNDS.length).toBe(12);

    const ids = new Set<string>();
    for (const bg of DND5E_SCAG_BACKGROUNDS) {
      expect(bg.id).toMatch(/^dnd5e\.scag\.background\.[a-z0-9_]+$/);
      expect(ids.has(bg.id)).toBe(false);
      ids.add(bg.id);

      expect(bg.name.trim().length).toBeGreaterThan(0);
      expect(bg.englishName.trim().length).toBeGreaterThan(0);
      expect(bg.sourcePage).toBeGreaterThanOrEqual(145);
      expect(bg.sourcePage).toBeLessThanOrEqual(154);
      expect(bg.skillProficiencies.length).toBeGreaterThanOrEqual(2);
      expect(bg.featureName.trim().length).toBeGreaterThan(0);
      expect(bg.featureDescription.trim().length).toBeGreaterThan(30);
      expect(bg.startingEquipment.length).toBeGreaterThanOrEqual(2);

      // UTF-8 clean verification
      expect(bg.name).not.toContain('\ufffd');
      expect(bg.featureDescription).not.toContain('\ufffd');
    }
  });

  it('verifies notable background mechanics', () => {
    const vigia = DND5E_SCAG_BACKGROUNDS.find(b => b.name === 'Vigia da Cidade');
    expect(vigia).toBeDefined();
    expect(vigia?.skillProficiencies).toContain('atletismo');
    expect(vigia?.skillProficiencies).toContain('intuicao');
    expect(vigia?.featureName).toBe('Olhos da Vigia');

    const nobre = DND5E_SCAG_BACKGROUNDS.find(b => b.name === 'Nobre de Águas Profundas');
    expect(nobre).toBeDefined();
    expect(nobre?.skillProficiencies).toContain('persuasao');
    expect(nobre?.featureName).toBe('Graça de Águas Profundas');

    const mercenario = DND5E_SCAG_BACKGROUNDS.find(b => b.name === 'Mercenário Veterano');
    expect(mercenario).toBeDefined();
    expect(mercenario?.toolProficiencies).toContain('veiculos_terrestres');
  });
});
