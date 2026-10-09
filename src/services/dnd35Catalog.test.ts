import { describe, expect, it } from "vitest";
import { dnd35RowPayload, loadDnd35Catalog } from "./dnd35Catalog";

describe("catálogo D&D 3.5 local", () => {
  it("aceita só linhas dnd35 cujo data.id bate com o id da linha", () => {
    expect(dnd35RowPayload({ id: "dnd35.class.guerreiro", data: { id: "guerreiro", name: "x" } })).toEqual({ id: "guerreiro", name: "x" });
    expect(dnd35RowPayload({ id: "dnd5e.class.guerreiro", data: { id: "guerreiro" } })).toBeNull();
    expect(dnd35RowPayload({ id: "dnd35.class.mago", data: { id: "guerreiro" } })).toBeNull();
    expect(dnd35RowPayload({ id: "dnd35.class.mago", data: null })).toBeNull();
    expect(dnd35RowPayload({ id: "dnd35.class.mago", data: {} })).toBeNull();
  });

  it("usa os dados locais sem consultar a rede", async () => {
    await expect(loadDnd35Catalog(true)).resolves.toEqual({ source: "local", applied: {} });
  });
});
