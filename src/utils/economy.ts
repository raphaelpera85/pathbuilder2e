export interface Coins {
  pp: number;
  gp: number;
  sp: number;
  cp: number;
}

/**
 * Converts a coins purse object to total Copper Pieces (CP).
 * 1 PP = 1000 CP, 1 GP = 100 CP, 1 SP = 10 CP, 1 CP = 1 CP.
 */
export function coinsToCopper(coins?: Partial<Coins> | null): number {
  if (!coins) return 0;
  const pp = Number(coins.pp || (coins as any).pl || 0);
  const gp = Number(coins.gp || (coins as any).po || 0);
  const sp = Number(coins.sp || 0);
  const cp = Number(coins.cp || (coins as any).pc || 0);
  return (pp * 1000) + (gp * 100) + (sp * 10) + cp;
}

/**
 * Converts total Copper Pieces back to standard coin denomination object.
 */
export function copperToCoins(totalCp: number): Coins {
  if (totalCp <= 0) return { pp: 0, gp: 0, sp: 0, cp: 0 };
  const pp = Math.floor(totalCp / 1000);
  const rem1 = totalCp % 1000;
  const gp = Math.floor(rem1 / 100);
  const rem2 = rem1 % 100;
  const sp = Math.floor(rem2 / 10);
  const cp = rem2 % 10;
  return { pp, gp, sp, cp };
}

/**
 * Parses any price string, object, or number into Copper Pieces.
 */
export function parsePriceToCopper(price: any, locale: string = "pt-BR"): number {
  if (price === null || price === undefined) return 0;
  if (typeof price === "number") return Math.round(price * 100);
  if (typeof price === "object") {
    return coinsToCopper(price);
  }
  const str = String(price).toLowerCase().trim();
  if (!str || str === "—" || str === "-" || str === "free" || str === "grátis" || str === "0") return 0;

  let totalCp = 0;
  let matched = false;

  // Platinum / Peças de Platina (PL / Platinum / PP platina)
  const plMatch = str.match(/(\d+(?:\.\d+)?)\s*(?:pl|platina|platinum)\b/i);
  if (plMatch) {
    totalCp += Math.round(parseFloat(plMatch[1]) * 1000);
    matched = true;
  }
  if (!plMatch && !locale.toLowerCase().startsWith("pt")) {
    const ppIntlMatch = str.match(/(\d+(?:\.\d+)?)\s*pp\b/i);
    if (ppIntlMatch) {
      totalCp += Math.round(parseFloat(ppIntlMatch[1]) * 1000);
      matched = true;
    }
  }

  // Gold / Peças de Ouro (GP / PO / Ouro / Gold)
  const gpMatch = str.match(/(\d+(?:\.\d+)?)\s*(?:gp|po|ouro|gold)\b/i);
  if (gpMatch) {
    totalCp += Math.round(parseFloat(gpMatch[1]) * 100);
    matched = true;
  }

  // Silver / Peças de Prata (SP / Prata / Silver / PA). Em pt-BR, PP
  // também significa prata; em inglês/espanhol, PP normalmente é platina.
  const spMatch = str.match(/(\d+(?:\.\d+)?)\s*(?:sp|pa|prata|plata|silver)\b/i);
  if (spMatch) {
    totalCp += Math.round(parseFloat(spMatch[1]) * 10);
    matched = true;
  } else if (!plMatch && locale.toLowerCase().startsWith("pt") && /\b\d+(?:\.\d+)?\s*pp\b/i.test(str)) {
    // No PF2e pt-BR, PP é Peça de Prata quando não há PL explícito.
    const ppPtMatch = str.match(/(\d+(?:\.\d+)?)\s*pp\b/i);
    if (ppPtMatch) {
      totalCp += Math.round(parseFloat(ppPtMatch[1]) * 10);
      matched = true;
    }
  }

  // Copper / Peças de Cobre (CP / PC / Cobre / Copper)
  const cpMatch = str.match(/(\d+(?:\.\d+)?)\s*(?:cp|pc|cobre|copper)\b/i);
  if (cpMatch) {
    totalCp += Math.round(parseFloat(cpMatch[1]));
    matched = true;
  }

  if (!matched) {
    const num = parseFloat(str.replace(/[^\d.]/g, ""));
    if (!isNaN(num)) {
      totalCp = Math.round(num * 100);
    }
  }

  return totalCp;
}

/**
 * Checks if the given coins purse can afford an item price.
 */
export function canAffordPrice(coins: Partial<Coins> | undefined | null, price: any, qty: number = 1, locale: string = "pt-BR"): boolean {
  const itemCp = parsePriceToCopper(price, locale) * Math.max(1, qty);
  const purseCp = coinsToCopper(coins);
  return purseCp >= itemCp;
}

/**
 * Deducts price from coins and returns updated coins purse.
 */
export function deductCoins(coins: Partial<Coins> | undefined | null, price: any, qty: number = 1, locale: string = "pt-BR"): Coins {
  const itemCp = parsePriceToCopper(price, locale) * Math.max(1, qty);
  const purseCp = coinsToCopper(coins);
  const remCp = Math.max(0, purseCp - itemCp);
  return copperToCoins(remCp);
}

/**
 * Formats copper total to readable localized string (e.g. "15 PO", "5 PP", "2 PO 5 PP").
 */
export function formatCopperToString(cpTotal: number, locale: string = "pt-BR"): string {
  if (cpTotal <= 0) return locale.startsWith("pt") ? "0 PO" : "0 gp";
  const { pp, gp, sp, cp } = copperToCoins(cpTotal);
  const parts: string[] = [];
  const isPt = locale.startsWith("pt");
  const isEs = locale.startsWith("es");

  if (pp > 0) parts.push(`${pp} ${isPt ? "PL" : "PP"}`);
  if (gp > 0) parts.push(`${gp} ${isPt || isEs ? "PO" : "GP"}`);
  if (sp > 0) parts.push(`${sp} ${isPt ? "PP" : isEs ? "PA" : "SP"}`);
  if (cp > 0) parts.push(`${cp} ${isPt || isEs ? "PC" : "CP"}`);

  return parts.join(" ") || (isPt || isEs ? "0 PO" : "0 GP");
}

/** Formats either a structured purse or a catalog price string for display. */
export function formatPriceToLocale(price: any, locale: string = "pt-BR"): string {
  if (price === null || price === undefined || price === "" || price === "—" || price === "-") return "—";
  return formatCopperToString(parsePriceToCopper(price, locale), locale);
}
