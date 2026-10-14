import { describe, expect, it } from 'vitest';
import { DND35_ARC_PRESTIGE } from './dnd35ArcPrestige';

describe('DND35 Complete Arcane Prestige Classes', () => {
  it('contém exatamente 19 classes de prestígio oficiais', () => {
    expect(DND35_ARC_PRESTIGE).toHaveLength(19);
  });

  it('todos os registros possuem IDs únicos com prefixo arc-prestige-', () => {
    const ids = DND35_ARC_PRESTIGE.map((c) => c.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(19);
    for (const id of ids) {
      expect(id).toMatch(/^arc-prestige-[a-z0-9-]+$/);
    }
  });

  it('todas as classes possuem metadados válidos e coerentes com o livro Completo do Arcano', () => {
    for (const c of DND35_ARC_PRESTIGE) {
      expect(c.name).toBeTruthy();
      expect(c.page).toBeGreaterThanOrEqual(17);
      expect(c.page).toBeLessThanOrEqual(70);
      expect(c.hitDie).toMatch(/^d[468]$/);
      expect(c.skillPoints).toContain('modificador');
      expect(c.classSkills.length).toBeGreaterThan(0);
      expect(c.requirements).toBeDefined();
      expect(Array.isArray(c.requirements.skills)).toBe(true);
      expect(Array.isArray(c.requirements.feats)).toBe(true);
      expect(Array.isArray(c.requirements.special)).toBe(true);
      expect(c.features.length).toBeGreaterThan(0);
      expect(c.description).toBeTruthy();
    }
  });

  it('as progressões de níveis batem com a duração de cada classe (3, 5, 7 ou 10 níveis)', () => {
    const durations = new Set([3, 5, 7, 10]);
    for (const c of DND35_ARC_PRESTIGE) {
      expect(durations.has(c.levels.length)).toBe(true);
      expect(c.levels[0].level).toBe(1);
      expect(c.levels[c.levels.length - 1].level).toBe(c.levels.length);

      for (let i = 0; i < c.levels.length; i++) {
        const lvl = c.levels[i];
        expect(lvl.level).toBe(i + 1);
        expect(lvl.bab).toMatch(/^\+\d+/);
        expect(lvl.fort).toBeGreaterThanOrEqual(0);
        expect(lvl.ref).toBeGreaterThanOrEqual(0);
        expect(lvl.will).toBeGreaterThanOrEqual(0);
        expect(typeof lvl.special).toBe('string');
      }
    }
  });

  it('valida classes de prestígio específicas com durações não-padrão', () => {
    const guia = DND35_ARC_PRESTIGE.find((c) => c.id === 'arc-prestige-guia-dos-viajantes');
    expect(guia).toBeDefined();
    expect(guia?.levels).toHaveLength(3);

    const geometra = DND35_ARC_PRESTIGE.find((c) => c.id === 'arc-prestige-geometra');
    expect(geometra).toBeDefined();
    expect(geometra?.levels).toHaveLength(5);

    const espiral = DND35_ARC_PRESTIGE.find((c) => c.id === 'arc-prestige-espiral-do-destino');
    expect(espiral).toBeDefined();
    expect(espiral?.levels).toHaveLength(5);

    const efigies = DND35_ARC_PRESTIGE.find((c) => c.id === 'arc-prestige-mestre-das-efigies');
    expect(efigies).toBeDefined();
    expect(efigies?.levels).toHaveLength(5);

    const sabioPrata = DND35_ARC_PRESTIGE.find((c) => c.id === 'arc-prestige-sabio-de-prata');
    expect(sabioPrata).toBeDefined();
    expect(sabioPrata?.levels).toHaveLength(5);

    const seteVeus = DND35_ARC_PRESTIGE.find((c) => c.id === 'arc-prestige-iniciado-dos-sete-veus');
    expect(seteVeus).toBeDefined();
    expect(seteVeus?.levels).toHaveLength(7);
  });

  it('valida que todas as 19 classes têm características detalhadas', () => {
    for (const c of DND35_ARC_PRESTIGE) {
      for (const feat of c.features) {
        expect(feat.name).toBeTruthy();
        expect(feat.text).toBeTruthy();
        expect(feat.text.length).toBeGreaterThan(10);
      }
    }
  });
});
