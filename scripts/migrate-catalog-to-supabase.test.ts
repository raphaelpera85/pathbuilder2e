import { describe, expect, it } from "vitest";
import { findStaleRows } from "./migrate-catalog-to-supabase.cjs";

describe("sincronização segura do catálogo", () => {
  it("remove obsoletos apenas dentro do mesmo sistema e ruleset", () => {
    const seeded = [
      { id: "t20.item.novo", system_id: "t20", ruleset: "padrao" },
      { id: "dnd5e.item.existente", system_id: "dnd5e", ruleset: "standard" },
    ];
    const current = [
      { id: "t20.item.antigo", system_id: "t20", ruleset: "padrao" },
      { id: "dnd5e.item.existente", system_id: "dnd5e", ruleset: "standard" },
      { id: "dnd5e.item.suplemento", system_id: "dnd5e", ruleset: "standard" },
      { id: "ose.item.legitimo", system_id: "ose", ruleset: "advanced" },
    ];

    expect(findStaleRows(current, seeded)).toEqual(["t20.item.antigo", "dnd5e.item.suplemento"]);
    expect(findStaleRows(current, seeded)).not.toContain("ose.item.legitimo");
  });

  it("não remove registros quando o seed não informa escopo", () => {
    expect(findStaleRows([{ id: "legacy" }], [{ id: "novo" }])).toEqual([]);
  });
});
