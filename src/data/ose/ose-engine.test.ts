import { describe, it, expect } from "vitest";
import {
  getOseStandardModifier,
  getOseStrModifiers,
  getOseIntModifiers,
  getOseDexModifiers,
  getOseChaModifiers,
  getOsePrimeRequisiteXpMod,
  getOseMovementByLoad,
  getOseSecondarySkillByRoll,
  OSE_ALIGNMENTS,
} from "./oseRules";
import { OSE_RACES } from "./oseRaces";
import { OSE_CLASSES } from "./oseClasses";
import { OSE_WEAPONS, OSE_ARMORS, OSE_GEAR, OSE_BEASTS, OSE_SPECIALISTS_RETAINERS, calculateOseArmorClass } from "./oseEquipment";
import { OSE_SPELLS } from "./oseSpells";

describe("Old-School Essentials (OSE) - Engine de Regras", () => {
  describe("Modificadores de Atributos", () => {
    it("calcula a escala padrão de modificadores B/X (-3 a +3)", () => {
      expect(getOseStandardModifier(3)).toBe(-3);
      expect(getOseStandardModifier(4)).toBe(-2);
      expect(getOseStandardModifier(5)).toBe(-2);
      expect(getOseStandardModifier(6)).toBe(-1);
      expect(getOseStandardModifier(8)).toBe(-1);
      expect(getOseStandardModifier(9)).toBe(0);
      expect(getOseStandardModifier(12)).toBe(0);
      expect(getOseStandardModifier(13)).toBe(1);
      expect(getOseStandardModifier(15)).toBe(1);
      expect(getOseStandardModifier(16)).toBe(2);
      expect(getOseStandardModifier(17)).toBe(2);
      expect(getOseStandardModifier(18)).toBe(3);
    });

    it("calcula Força: ataque corpo a corpo e chance de abrir portas", () => {
      expect(getOseStrModifiers(3)).toEqual({ melee: -3, openDoors: 1 });
      expect(getOseStrModifiers(10)).toEqual({ melee: 0, openDoors: 2 });
      expect(getOseStrModifiers(14)).toEqual({ melee: 1, openDoors: 3 });
      expect(getOseStrModifiers(16)).toEqual({ melee: 2, openDoors: 4 });
      expect(getOseStrModifiers(18)).toEqual({ melee: 3, openDoors: 5 });
    });

    it("calcula Inteligência: idiomas adicionais e alfabetização", () => {
      expect(getOseIntModifiers(3)).toEqual({ bonusLanguages: 0, literacy: "analfabeto" });
      expect(getOseIntModifiers(7)).toEqual({ bonusLanguages: 0, literacy: "basico" });
      expect(getOseIntModifiers(11)).toEqual({ bonusLanguages: 0, literacy: "alfabetizado" });
      expect(getOseIntModifiers(13)).toEqual({ bonusLanguages: 1, literacy: "alfabetizado" });
      expect(getOseIntModifiers(16)).toEqual({ bonusLanguages: 2, literacy: "alfabetizado" });
      expect(getOseIntModifiers(18)).toEqual({ bonusLanguages: 3, literacy: "alfabetizado" });
    });

    it("calcula Destreza: CA, míssil e iniciativa", () => {
      expect(getOseDexModifiers(3)).toEqual({ acMod: -3, missile: -3, initiative: -2 });
      expect(getOseDexModifiers(10)).toEqual({ acMod: 0, missile: 0, initiative: 0 });
      expect(getOseDexModifiers(14)).toEqual({ acMod: 1, missile: 1, initiative: 1 });
      expect(getOseDexModifiers(18)).toEqual({ acMod: 3, missile: 3, initiative: 2 });
    });

    it("calcula Carisma: reações, máximo de lacaios e lealdade", () => {
      expect(getOseChaModifiers(3)).toEqual({ npcReactions: -2, maxRetainers: 1, retainerLoyalty: 4 });
      expect(getOseChaModifiers(10)).toEqual({ npcReactions: 0, maxRetainers: 4, retainerLoyalty: 7 });
      expect(getOseChaModifiers(14)).toEqual({ npcReactions: 1, maxRetainers: 5, retainerLoyalty: 8 });
      expect(getOseChaModifiers(18)).toEqual({ npcReactions: 2, maxRetainers: 7, retainerLoyalty: 10 });
    });

    it("calcula bônus/penalidade de XP pelo Requisito Principal", () => {
      expect(getOsePrimeRequisiteXpMod(4)).toBe(-0.2); // -20%
      expect(getOsePrimeRequisiteXpMod(7)).toBe(-0.1); // -10%
      expect(getOsePrimeRequisiteXpMod(10)).toBe(0.0);  // 0%
      expect(getOsePrimeRequisiteXpMod(14)).toBe(0.05); // +5%
      expect(getOsePrimeRequisiteXpMod(17)).toBe(0.1);  // +10%
    });
  });

  describe("Cálculos de Combate, Carga e Sobrecarga", () => {
    it("calcula Classe de Armadura Descendente (DAC) e Ascendente (AAC)", () => {
      const leather = OSE_ARMORS.find((a) => a.id === "couro")!;
      const chain = OSE_ARMORS.find((a) => a.id === "cota_malha")!;
      const plate = OSE_ARMORS.find((a) => a.id === "placas")!;

      // Sem armadura (Base DAC 9, AAC 10), sem DES
      expect(calculateOseArmorClass(null, false, 0)).toEqual({ dac: 9, aac: 10 });

      // Sem armadura + DES 14 (+1)
      expect(calculateOseArmorClass(null, false, 1)).toEqual({ dac: 8, aac: 11 });

      // Couro (DAC 7, AAC 12) + Escudo (-1 DAC, +1 AAC) + DES 16 (+2)
      // DAC: 7 - 1 (escudo) - 2 (des) = 4
      // AAC: 12 + 1 (escudo) + 2 (des) = 15
      expect(calculateOseArmorClass(leather, true, 2)).toEqual({ dac: 4, aac: 15 });

      // Cota de Placas (DAC 3, AAC 16) + Escudo + DES 18 (+3)
      // DAC: 3 - 1 - 3 = -1
      // AAC: 16 + 1 + 3 = 20
      expect(calculateOseArmorClass(plate, true, 3)).toEqual({ dac: -1, aac: 20 });
    });

    it("calcula velocidade de movimento por peso em moedas (Coins)", () => {
      expect(getOseMovementByLoad(350).exploration).toBe(36);
      expect(getOseMovementByLoad(600).exploration).toBe(27);
      expect(getOseMovementByLoad(1000).exploration).toBe(18);
      expect(getOseMovementByLoad(1500).exploration).toBe(9);
      expect(getOseMovementByLoad(2000).exploration).toBe(0);
    });

    it("sorteia e mapeia perícias secundárias d100", () => {
      expect(getOseSecondarySkillByRoll(2)).toBe("Treinador de Animais");
      expect(getOseSecondarySkillByRoll(4)).toBe("Armeiro");
      expect(getOseSecondarySkillByRoll(11)).toBe("Ferreiro");
      expect(getOseSecondarySkillByRoll(80)).toBe("Marinheiro");
      expect(getOseSecondarySkillByRoll(100)).toBe("Especialista Múltiplo (Duas Perícias)");
    });
  });

  describe("Catálogo de Raças e Classes OSE", () => {
    it("contém as 10 raças completas com requisitos e idiomas", () => {
      expect(Object.keys(OSE_RACES).length).toBe(10);
      expect(OSE_RACES.humano.nativeLanguages).toContain("Comum");
      expect(OSE_RACES.anao.minRequirements.con).toBe(9);
      expect(OSE_RACES.elfo.minRequirements.int).toBe(9);
      expect(OSE_RACES.halfling.statModifiers).toEqual({ str: -1, dex: 1 });
      expect(OSE_RACES.meio_orc.statModifiers).toEqual({ str: 1, con: 1, cha: -2 });
    });

    it("contém as 13 classes avançadas e classes clássicas", () => {
      expect(OSE_CLASSES.guerreiro.hitDie).toBe("d8");
      expect(OSE_CLASSES.clerigo.hitDie).toBe("d6");
      expect(OSE_CLASSES.ladrao.hitDie).toBe("d4");
      expect(OSE_CLASSES.mago.hitDie).toBe("d4");
      expect(OSE_CLASSES.paladino.primeRequisites).toEqual(["str", "wis"]);
      expect(OSE_CLASSES.druida.spellCasting?.type).toBe("druidica");

      // Progressão do Guerreiro no nível 1 e nível 14
      const fighterL1 = OSE_CLASSES.guerreiro.progression[0];
      expect(fighterL1.thac0).toBe(19);
      expect(fighterL1.aacBonus).toBe(0);
      expect(fighterL1.saves.death).toBe(12);

      const fighterL14 = OSE_CLASSES.guerreiro.progression[13];
      expect(fighterL14.thac0).toBe(10);
      expect(fighterL14.aacBonus).toBe(9);
      expect(fighterL14.saves.death).toBe(4);
    });

    it("fornece tabelas de perícias de Ladrão e Acrobata", () => {
      const thiefSkillsL1 = OSE_CLASSES.ladrao.thiefSkills?.[1];
      expect(thiefSkillsL1?.esi).toBe(87);
      expect(thiefSkillsL1?.ms).toBe(20);
      expect(thiefSkillsL1?.es).toBe(10);

      const acrobatSkillsL1 = OSE_CLASSES.acrobata.acrobatSkills?.[1];
      expect(acrobatSkillsL1?.ssi).toBe(87);
      expect(acrobatSkillsL1?.ccb).toBe(60);
    });

    it("cataloga armas, armaduras, equipamentos, feras e especialistas", () => {
      expect(OSE_WEAPONS.length).toBeGreaterThan(15);
      expect(OSE_ARMORS.length).toBe(5);
      expect(OSE_GEAR.length).toBeGreaterThanOrEqual(30);
      expect(OSE_BEASTS.length).toBe(9);
      expect(OSE_SPECIALISTS_RETAINERS.length).toBe(10);
      expect(OSE_SPELLS.length).toBeGreaterThan(20);

      const warhorse = OSE_BEASTS.find((b) => b.id === "cavalo_guerra");
      expect(warhorse).toMatchObject({ costGp: 250, ac: 7, hd: "3", attacks: "2x Cascos (1d6)" });

      const mule = OSE_BEASTS.find((b) => b.id === "mula");
      expect(mule).toMatchObject({ costGp: 30, maxLoadCoins: 2000 });

      const barding = OSE_GEAR.find((g) => g.id === "barda_cavalo");
      expect(barding).toMatchObject({ costGp: 150, weightCoins: 600 });

      const heavyFoot = OSE_SPECIALISTS_RETAINERS.find((r) => r.id === "mercenario_infantaria_pesada");
      expect(heavyFoot).toMatchObject({ wageGpPerMonth: 6 });

      const magicMissile = OSE_SPELLS.find((s) => s.id === "mago_missil_magico");
      expect(magicMissile?.className).toBe("mago");
      expect(magicMissile?.circle).toBe(1);

      const cureWounds = OSE_SPELLS.find((s) => s.id === "clerigo_curar_ferimentos_leves");
      expect(cureWounds?.reversible).toBe(true);
      expect(cureWounds?.reversibleName).toBe("Causar Ferimentos Leves");
    });
  });
});
