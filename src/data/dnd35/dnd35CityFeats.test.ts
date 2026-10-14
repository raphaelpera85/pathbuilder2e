import { describe, it, expect } from 'vitest';
import { DND35_CITY_FEATS } from './dnd35CityFeats';

describe('D&D 3.5 — Cityscape Feats (v35-city)', () => {
  it('should contain all 14 official feats without stubs', () => {
    expect(DND35_CITY_FEATS).toHaveLength(14);
    for (const feat of DND35_CITY_FEATS) {
      expect(feat.id).toMatch(/^city-/);
      expect(feat.name.length).toBeGreaterThan(0);
      expect(feat.summary.length).toBeGreaterThan(0);
      expect(feat.benefit.length).toBeGreaterThan(0);
    }
  });

  it('should include tactical and metamagic feats', () => {
    const roofwalker = DND35_CITY_FEATS.find(f => f.id === 'city-roofwalker');
    expect(roofwalker).toBeDefined();
    expect(roofwalker?.type).toBe('Tactical');
    expect(roofwalker?.benefit).toContain('Fleet of Feet');

    const sculptSpell = DND35_CITY_FEATS.find(f => f.id === 'city-sculpt-spell');
    expect(sculptSpell).toBeDefined();
    expect(sculptSpell?.type).toBe('Metamagic');
  });
});
