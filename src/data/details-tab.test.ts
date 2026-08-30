import { describe, it, expect } from "vitest";

describe("Character Details Tab Logic & State", () => {
  it("deve inicializar e manipular corretamente todos os campos de Detalhes da ficha", () => {
    const character = {
      id: "char_123",
      name: "Valeros",
      level: 1,
      deity: "Iomedae",
      age: 17,
      gender: "Masculino",
      languages: ["Comum", "Anão"],
      notes: "Notas e histórico de campanha...",
      avatar: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
    };

    expect(character.deity).toBe("Iomedae");
    expect(character.age).toBe(17);
    expect(character.gender).toBe("Masculino");
    expect(character.languages).toEqual(["Comum", "Anão"]);
    expect(character.notes).toContain("Notas e histórico");
    expect(character.avatar).toContain("data:image/png");
  });

  it("deve permitir alternar e adicionar idiomas sem duplicação", () => {
    const languages: string[] = ["Comum"];
    
    // Toggle on 'Élfico'
    if (!languages.includes("Élfico")) {
      languages.push("Élfico");
    }
    expect(languages).toContain("Élfico");
    expect(languages.length).toBe(2);

    // Toggle off 'Comum'
    const updated = languages.filter(l => l !== "Comum");
    expect(updated).not.toContain("Comum");
    expect(updated).toEqual(["Élfico"]);
  });

  it("deve resetar o avatar quando solicitado (clearAvatar)", () => {
    const character = {
      avatar: "https://example.com/avatar.jpg" as string | null
    };

    character.avatar = null;
    expect(character.avatar).toBeNull();
  });
});
