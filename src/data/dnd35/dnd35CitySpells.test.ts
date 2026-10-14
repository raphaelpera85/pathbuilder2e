import { describe, it, expect } from 'vitest';
import { DND35_CITY_SPELLS } from './dnd35CitySpells';

describe('D&D 3.5 — Cityscape Spells & Invocations (v35-city)', () => {
  it('should contain all 8 spells and 3 warlock invocations without stubs', () => {
    expect(DND35_CITY_SPELLS).toHaveLength(11);
    for (const spell of DND35_CITY_SPELLS) {
      expect(spell.id).toMatch(/^city-/);
      expect(spell.name.length).toBeGreaterThan(0);
      expect(spell.school.length).toBeGreaterThan(0);
      expect(spell.level.length).toBeGreaterThan(0);
      expect(spell.duration.length).toBeGreaterThan(0);
      expect(spell.description.length).toBeGreaterThan(0);
    }
  });

  it('should include warlock invocations with proper tiers', () => {
    const cocoon = DND35_CITY_SPELLS.find(s => s.id === 'city-cocoon-of-refuse');
    expect(cocoon).toBeDefined();
    expect(cocoon?.school).toContain('Least');

    const whispers = DND35_CITY_SPELLS.find(s => s.id === 'city-devils-whispers');
    expect(whispers).toBeDefined();
    expect(whispers?.school).toContain('Greater');
  });
});
