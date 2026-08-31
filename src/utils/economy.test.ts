import { describe, it, expect } from "vitest";
import {
  coinsToCopper,
  copperToCoins,
  parsePriceToCopper,
  canAffordPrice,
  deductCoins,
  formatCopperToString,
  formatPriceToLocale,
} from "./economy";

describe("economy utility", () => {
  it("converts coins object to copper correctly", () => {
    expect(coinsToCopper({ pp: 1, gp: 2, sp: 3, cp: 4 })).toBe(1234);
    expect(coinsToCopper({ gp: 15 })).toBe(1500);
    expect(coinsToCopper({ sp: 5 })).toBe(50);
    expect(coinsToCopper(null)).toBe(0);
  });

  it("converts copper back to coins correctly", () => {
    expect(copperToCoins(1234)).toEqual({ pp: 1, gp: 2, sp: 3, cp: 4 });
    expect(copperToCoins(1500)).toEqual({ pp: 1, gp: 5, sp: 0, cp: 0 });
    expect(copperToCoins(0)).toEqual({ pp: 0, gp: 0, sp: 0, cp: 0 });
  });

  it("parses diverse price strings and objects into copper pieces", () => {
    expect(parsePriceToCopper("2 PO")).toBe(200);
    expect(parsePriceToCopper("5 PP")).toBe(50);
    expect(parsePriceToCopper("1 PC")).toBe(1);
    expect(parsePriceToCopper("14 PO")).toBe(1400);
    expect(parsePriceToCopper("35 PO")).toBe(3500);
    expect(parsePriceToCopper("10 gp")).toBe(1000);
    expect(parsePriceToCopper("5 sp")).toBe(50);
    expect(parsePriceToCopper("25 cp")).toBe(25);
    expect(parsePriceToCopper("1 pp")).toBe(10);
    expect(parsePriceToCopper("1 PL")).toBe(1000);
    expect(parsePriceToCopper("1 PP", "en")).toBe(1000);
    expect(parsePriceToCopper("1 PP", "es")).toBe(1000);
    expect(parsePriceToCopper("1 PA", "es")).toBe(10);
    expect(parsePriceToCopper({ gp: 5, sp: 5 })).toBe(550);
    expect(parsePriceToCopper(0)).toBe(0);
    expect(parsePriceToCopper("—")).toBe(0);
  });

  it("validates affordability correctly", () => {
    const characterCoins = { gp: 15, sp: 0, cp: 0, pp: 0 }; // 1500 CP

    // Adze (2 PO = 200 CP)
    expect(canAffordPrice(characterCoins, "2 PO")).toBe(true);

    // Axe Musket (14 PO = 1400 CP)
    expect(canAffordPrice(characterCoins, "14 PO")).toBe(true);

    // Backpack Catapult (35 PO = 3500 CP) -> insufficient
    expect(canAffordPrice(characterCoins, "35 PO")).toBe(false);

    // Multiple quantity (2 x 14 PO = 2800 CP) -> insufficient
    expect(canAffordPrice(characterCoins, "14 PO", 2)).toBe(false);
  });

  it("deducts price correctly from coins purse", () => {
    const characterCoins = { gp: 15, sp: 0, cp: 0, pp: 0 }; // 1500 CP
    const remaining = deductCoins(characterCoins, "2 PO"); // 1500 - 200 = 1300 CP
    expect(coinsToCopper(remaining)).toBe(1300);
    expect(remaining).toEqual({ pp: 1, gp: 3, sp: 0, cp: 0 });
  });

  it("formats copper total into human readable string", () => {
    expect(formatCopperToString(1500, "pt-BR")).toBe("1 PL 5 PO");
    expect(formatCopperToString(250, "pt-BR")).toBe("2 PO 5 PP");
    expect(formatCopperToString(0, "pt-BR")).toBe("0 PO");
    expect(formatCopperToString(1250, "en")).toBe("1 PP 2 GP 5 SP");
    expect(formatCopperToString(1250, "es")).toBe("1 PP 2 PO 5 PA");
    expect(formatPriceToLocale("2 PO", "en")).toBe("2 GP");
    expect(formatPriceToLocale("1 PP", "es")).toBe("1 PP");
    expect(formatPriceToLocale("1 PA", "es")).toBe("1 PA");
  });
});
