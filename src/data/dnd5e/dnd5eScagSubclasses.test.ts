import { describe, expect, it } from 'vitest';
import { DND5E_SCAG_SUBCLASSES, DND5E_SCAG_SOURCE_BOOK } from './dnd5eScagSubclasses';

describe('dnd5eScagSubclasses', () => {
  it('contains exactly 11 SCAG subclasses without stubs or replacement characters', () => {
    expect(DND5E_SCAG_SUBCLASSES.length).toBe(11);

    const ids = new Set<string>();
    for (const sub of DND5E_SCAG_SUBCLASSES) {
      expect(sub.id).toMatch(/^dnd5e\.scag\.subclass\.[a-z0-9_]+$/);
      expect(ids.has(sub.id)).toBe(false);
      ids.add(sub.id);

      expect(sub.name.trim().length).toBeGreaterThan(0);
      expect(sub.classId.trim().length).toBeGreaterThan(0);
      expect(sub.featureLevel).toBeGreaterThanOrEqual(1);
      expect(sub.featureLevel).toBeLessThanOrEqual(3);
      expect(sub.sourcePage).toBeGreaterThanOrEqual(121);
      expect(sub.sourcePage).toBeLessThanOrEqual(142);
      expect(sub.description.trim().length).toBeGreaterThan(30);
      expect(sub.features.length).toBeGreaterThanOrEqual(3);

      for (const feat of sub.features) {
        expect(feat.name.trim().length).toBeGreaterThan(0);
        expect(feat.level).toBeGreaterThanOrEqual(1);
        expect(feat.level).toBeLessThanOrEqual(20);
        expect(feat.description.trim().length).toBeGreaterThan(20);
        expect(feat.description).not.toContain('\ufffd');
      }

      // UTF-8 clean verification
      expect(sub.name).not.toContain('\ufffd');
      expect(sub.description).not.toContain('\ufffd');
    }
  });

  it('covers all official SCAG classes with appropriate feature levels', () => {
    const classIds = new Set(DND5E_SCAG_SUBCLASSES.map(s => s.classId));
    expect(classIds.has('barbaro')).toBe(true);
    expect(classIds.has('clerigo')).toBe(true);
    expect(classIds.has('guerreiro')).toBe(true);
    expect(classIds.has('monge')).toBe(true);
    expect(classIds.has('paladino')).toBe(true);
    expect(classIds.has('ladino')).toBe(true);
    expect(classIds.has('feiticeiro')).toBe(true);
    expect(classIds.has('bruxo')).toBe(true);
    expect(classIds.has('mago')).toBe(true);
  });

  it('verifies notable subclass mechanics', () => {
    const bladesinger = DND5E_SCAG_SUBCLASSES.find(s => s.name === 'Lâminas Cantantes');
    expect(bladesinger).toBeDefined();
    expect(bladesinger?.classId).toBe('mago');
    expect(bladesinger?.restriction).toContain('elfos');
    const songOfDefense = bladesinger?.features.find(f => f.name === 'Canção de Defesa');
    expect(songOfDefense?.level).toBe(10);

    const swashbuckler = DND5E_SCAG_SUBCLASSES.find(s => s.name === 'Espadachim');
    expect(swashbuckler).toBeDefined();
    expect(swashbuckler?.classId).toBe('ladino');
    const audacia = swashbuckler?.features.find(f => f.name === 'Audácia Devassa');
    expect(audacia?.description).toContain('Carisma');

    const battlerager = DND5E_SCAG_SUBCLASSES.find(s => s.name === 'Caminho do Furioso da Batalha');
    expect(battlerager).toBeDefined();
    expect(battlerager?.restriction).toContain('anões');
  });
});
