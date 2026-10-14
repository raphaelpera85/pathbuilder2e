import { describe, expect, it } from 'vitest';
import { T20_DEUSES_EQUIPMENT, T20_DEUSES_SOURCE_BOOK } from './t20DeusesEquipment';

describe('t20DeusesEquipment', () => {
  it('contains exactly 105 equipment items (70 general + 35 liturgical) without stubs or replacement characters', () => {
    expect(T20_DEUSES_EQUIPMENT.length).toBe(105);

    const ids = new Set<string>();
    for (const item of T20_DEUSES_EQUIPMENT) {
      expect(item.id).toMatch(/^t20\.deuses\.(item|liturgico)\.[a-z0-9_]+$/);
      expect(ids.has(item.id)).toBe(false);
      ids.add(item.id);

      expect(item.name.trim().length).toBeGreaterThan(0);
      expect(item.category.trim().length).toBeGreaterThan(0);
      expect(item.cost).toMatch(/^T\$\s*[\d\.\,]+/);
      expect(item.spaces).toBeGreaterThanOrEqual(0);
      expect(item.sourcePage).toBeGreaterThanOrEqual(48);
      expect(item.sourcePage).toBeLessThanOrEqual(59);
      expect(item.description.trim().length).toBeGreaterThan(20);

      // UTF-8 clean verification
      expect(item.name).not.toContain('\ufffd');
      expect(item.description).not.toContain('\ufffd');
    }
  });

  it('correctly segregates general items and liturgical items', () => {
    const tableItems = T20_DEUSES_EQUIPMENT.filter(it => it.category !== 'liturgico');
    const liturgicalItems = T20_DEUSES_EQUIPMENT.filter(it => it.category === 'liturgico');

    expect(tableItems.length).toBe(70);
    expect(liturgicalItems.length).toBe(35);

    // Check all 20 deities represented in liturgical items
    const deitiesInLiturgical = new Set(liturgicalItems.map(it => it.deity));
    expect(deitiesInLiturgical.size).toBe(20);
  });

  it('verifies notable item mechanics', () => {
    const aguaBentaConc = T20_DEUSES_EQUIPMENT.find(it => it.name === 'Água benta concentrada');
    expect(aguaBentaConc).toBeDefined();
    expect(aguaBentaConc?.cost).toBe('T$ 60');
    expect(aguaBentaConc?.spaces).toBe(0.5);
    expect(aguaBentaConc?.description).toContain('4d10 pontos de dano');

    const cilicio = T20_DEUSES_EQUIPMENT.find(it => it.name === 'Cilício Vivo');
    expect(cilicio).toBeDefined();
    expect(cilicio?.deity).toBe('Aharadak');
    expect(cilicio?.cost).toBe('T$ 37.000');
    expect(cilicio?.description).toContain('anzóis');

    const nimb = T20_DEUSES_EQUIPMENT.find(it => it.name === 'Alguma Coisa de Nimb');
    expect(nimb).toBeDefined();
    expect(nimb?.deity).toBe('Nimb');
    expect(nimb?.cost).toBe('T$ 54.000');
  });
});
