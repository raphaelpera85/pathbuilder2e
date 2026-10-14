import { describe, expect, it } from 'vitest';
import { T20_DEUSES_GRANTED_POWERS, T20_DEUSES_SOURCE_BOOK } from './t20DeusesPowers';

describe('t20DeusesPowers', () => {
  it('contains exactly 75 granted powers without stubs or replacement characters', () => {
    expect(T20_DEUSES_GRANTED_POWERS.length).toBe(75);

    const ids = new Set<string>();
    for (const power of T20_DEUSES_GRANTED_POWERS) {
      expect(power.id).toMatch(/^t20\.deuses\.poder\.[a-z0-9_]+$/);
      expect(ids.has(power.id)).toBe(false);
      ids.add(power.id);

      expect(power.name.trim().length).toBeGreaterThan(0);
      expect(power.deities.length).toBeGreaterThan(0);
      expect(power.deityIds.length).toBeGreaterThan(0);
      expect(power.description.trim().length).toBeGreaterThan(20);
      expect(power.sourcePage).toBeGreaterThanOrEqual(42);
      expect(power.sourcePage).toBeLessThanOrEqual(47);

      // UTF-8 clean verification
      expect(power.name).not.toContain('\ufffd');
      expect(power.description).not.toContain('\ufffd');
    }
  });

  it('covers all 20 major deities of the Artonian pantheon', () => {
    const allDeities = new Set<string>();
    for (const power of T20_DEUSES_GRANTED_POWERS) {
      for (const deity of power.deities) {
        allDeities.add(deity);
      }
    }

    const expectedDeities = [
      'Aharadak', 'Allihanna', 'Arsenal', 'Azgher', 'Hyninn', 'Kallyadranoch',
      'Khalmyr', 'Lena', 'Lin-Wu', 'Marah', 'Megalokk', 'Nimb', 'Oceano',
      'Sszzaas', 'Tanna-Toh', 'Tenebra', 'Thwor', 'Thyatis', 'Valkaria', 'Wynna'
    ];

    for (const d of expectedDeities) {
      expect(allDeities.has(d)).toBe(true);
    }
  });

  it('verifies notable granted powers mechanics', () => {
    const abraço = T20_DEUSES_GRANTED_POWERS.find(p => p.name === 'Abraço da Fênix');
    expect(abraço).toBeDefined();
    expect(abraço?.deities).toContain('Thyatis');
    expect(abraço?.description).toContain('imune a fogo');

    const adagaNoturna = T20_DEUSES_GRANTED_POWERS.find(p => p.name === 'Adaga Noturna');
    expect(adagaNoturna).toBeDefined();
    expect(adagaNoturna?.deities).toContain('Tenebra');
    expect(adagaNoturna?.description).toContain('+1d6 pontos de dano de frio');

    const ferramenta = T20_DEUSES_GRANTED_POWERS.find(p => p.name === 'A Ferramenta Certa');
    expect(ferramenta).toBeDefined();
    expect(ferramenta?.deities).toContain('Hyninn');
    expect(ferramenta?.description).toContain('T$ 400');
  });
});
