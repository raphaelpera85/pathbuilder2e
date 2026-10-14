import { describe, expect, it } from 'vitest';
import { DND5E_SCAG_SPELLS, DND5E_SCAG_SOURCE_BOOK } from './dnd5eScagSpells';

describe('dnd5eScagSpells', () => {
  it('contains exactly 4 iconic SCAG cantrips without stubs or replacement characters', () => {
    expect(DND5E_SCAG_SPELLS.length).toBe(4);

    const ids = new Set<string>();
    for (const spell of DND5E_SCAG_SPELLS) {
      expect(spell.id).toMatch(/^dnd5e\.scag\.magia\.[a-z0-9_]+$/);
      expect(ids.has(spell.id)).toBe(false);
      ids.add(spell.id);

      expect(spell.name.trim().length).toBeGreaterThan(0);
      expect(spell.level).toBe(0);
      expect(spell.castingTime).toBe('1 ação');
      expect(spell.classes).toEqual(['Bruxo', 'Feiticeiro', 'Mago']);
      expect(spell.classIds).toEqual(['bruxo', 'feiticeiro', 'mago']);
      expect(spell.sourcePage).toBeGreaterThanOrEqual(142);
      expect(spell.sourcePage).toBeLessThanOrEqual(143);
      expect(spell.description.trim().length).toBeGreaterThan(50);

      // UTF-8 clean verification
      expect(spell.name).not.toContain('\ufffd');
      expect(spell.description).not.toContain('\ufffd');
      expect(spell.summary).not.toContain('\ufffd');
    }
  });

  it('verifies notable spell mechanics', () => {
    const booming = DND5E_SCAG_SPELLS.find(s => s.name === 'Lâmina Efervescente');
    expect(booming).toBeDefined();
    expect(booming?.school).toBe('evocacao');
    expect(booming?.duration).toBe('1 rodada');
    expect(booming?.description).toContain('dano trovejante');

    const greenFlame = DND5E_SCAG_SPELLS.find(s => s.name === 'Lâmina Verde Flamejante');
    expect(greenFlame).toBeDefined();
    expect(greenFlame?.school).toBe('evocacao');
    expect(greenFlame?.description).toContain('chama verde');

    const lightningLure = DND5E_SCAG_SPELLS.find(s => s.name === 'Atração Elétrica');
    expect(lightningLure).toBeDefined();
    expect(lightningLure?.savingThrow).toBe('Força');
    expect(lightningLure?.range).toBe('4,5m');

    const swordBurst = DND5E_SCAG_SPELLS.find(s => s.name === 'Explosão de Espadas');
    expect(swordBurst).toBeDefined();
    expect(swordBurst?.school).toBe('conjuracao');
    expect(swordBurst?.savingThrow).toBe('Destreza');
    expect(swordBurst?.description).toContain('dano de força');
  });
});
