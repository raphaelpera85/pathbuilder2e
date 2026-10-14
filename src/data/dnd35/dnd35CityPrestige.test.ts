import { describe, it, expect } from 'vitest';
import { DND35_CITY_PRESTIGE_CLASSES } from './dnd35CityPrestige';

describe('D&D 3.5 — Cityscape Prestige Classes (v35-city)', () => {
  it('should contain all 3 prestige classes with full 10-level progressions and zero stubs', () => {
    expect(DND35_CITY_PRESTIGE_CLASSES).toHaveLength(3);
    for (const prc of DND35_CITY_PRESTIGE_CLASSES) {
      expect(prc.id).toMatch(/^city-prc-/);
      expect(prc.name.length).toBeGreaterThan(0);
      expect(prc.hitDie).toBeGreaterThan(0);
      expect(prc.classSkills.length).toBeGreaterThan(0);
      expect(prc.levels).toHaveLength(10);
      expect(prc.features.length).toBeGreaterThan(0);
      expect(prc.description.length).toBeGreaterThan(0);

      for (let i = 0; i < 10; i++) {
        expect(prc.levels[i].level).toBe(i + 1);
        expect(prc.levels[i].bab).toBeDefined();
        expect(typeof prc.levels[i].fort).toBe('number');
        expect(typeof prc.levels[i].ref).toBe('number');
        expect(typeof prc.levels[i].will).toBe('number');
        expect(prc.levels[i].special.length).toBeGreaterThan(0);
      }
    }
  });

  it('should properly configure Ebonmar Infiltrator, Crimson Scourge, and Urban Savant', () => {
    const ebonmar = DND35_CITY_PRESTIGE_CLASSES.find(p => p.id === 'city-prc-ebonmar-infiltrator');
    expect(ebonmar).toBeDefined();
    expect(ebonmar?.hitDie).toBe(6);
    expect(ebonmar?.levels[9].special).toContain('shadow in the night');

    const scourge = DND35_CITY_PRESTIGE_CLASSES.find(p => p.id === 'city-prc-crimson-scourge');
    expect(scourge).toBeDefined();
    expect(scourge?.hitDie).toBe(10);
    expect(scourge?.levels[0].special).toContain('Kid gloves');

    const savant = DND35_CITY_PRESTIGE_CLASSES.find(p => p.id === 'city-prc-urban-savant');
    expect(savant).toBeDefined();
    expect(savant?.hitDie).toBe(6);
    expect(savant?.levels[0].special).toContain('Urban savvy (strengths)');
  });
});
