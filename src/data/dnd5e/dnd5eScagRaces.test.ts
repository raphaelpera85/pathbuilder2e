import { describe, expect, it } from 'vitest';
import { DND5E_SCAG_RACES, DND5E_SCAG_SOURCE_BOOK } from './dnd5eScagRaces';

describe('dnd5eScagRaces', () => {
  it('contains exactly 4 SCAG subraces without stubs or replacement characters', () => {
    expect(DND5E_SCAG_RACES.length).toBe(4);

    const ids = new Set<string>();
    for (const race of DND5E_SCAG_RACES) {
      expect(race.id).toMatch(/^dnd5e\.scag\.ancestry\.[a-z0-9_]+$/);
      expect(ids.has(race.id)).toBe(false);
      ids.add(race.id);

      expect(race.name.trim().length).toBeGreaterThan(0);
      expect(race.englishName.trim().length).toBeGreaterThan(0);
      expect(race.sourcePage).toBeGreaterThanOrEqual(104);
      expect(race.sourcePage).toBeLessThanOrEqual(118);
      expect(race.speed).toBeGreaterThan(0);
      expect(race.traits.length).toBeGreaterThanOrEqual(3);

      for (const trait of race.traits) {
        expect(trait.trim().length).toBeGreaterThan(10);
        expect(trait).not.toContain('\ufffd');
      }

      // UTF-8 clean verification
      expect(race.name).not.toContain('\ufffd');
      expect(race.abilityBonuses).not.toContain('\ufffd');
    }
  });

  it('verifies notable subrace traits', () => {
    const duergar = DND5E_SCAG_RACES.find(r => r.name.includes('Duergar'));
    expect(duergar).toBeDefined();
    expect(duergar?.attributeAdjustments.con).toBe(2);
    expect(duergar?.attributeAdjustments.str).toBe(1);
    expect(duergar?.traits.some(t => t.includes('Magia Duergar'))).toBe(true);

    const svirfneblin = DND5E_SCAG_RACES.find(r => r.name.includes('Svirfneblin'));
    expect(svirfneblin).toBeDefined();
    expect(svirfneblin?.attributeAdjustments.int).toBe(2);
    expect(svirfneblin?.attributeAdjustments.dex).toBe(1);
    expect(svirfneblin?.traits.some(t => t.includes('Camuflagem na Pedra'))).toBe(true);

    const tiefling = DND5E_SCAG_RACES.find(r => r.name.includes('Tiefling Alado'));
    expect(tiefling).toBeDefined();
    expect(tiefling?.traits.some(t => t.includes('Asas'))).toBe(true);
  });
});
