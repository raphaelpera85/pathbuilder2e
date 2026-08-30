import { describe, it, expect, beforeEach } from "vitest";
import {
  saveCampaign,
  listCampaigns,
  deleteCampaign,
  addCharacterToCampaign,
  removeCharacterFromCampaign,
  addSessionLog,
} from "./campaigns";
import {
  saveCharacter,
  linkCharacterToGM,
  listCharactersSharedWithGM,
  unlinkCharacterFromGM,
} from "./characters";

describe("Campaigns & GM Service", () => {
  const gmUser = { id: "gm_123", email: "mestre@rpg.com", username: "MestreKael", role: "user" as const };
  const player1 = { id: "player_456", email: "jogador1@rpg.com", username: "EldrinPlayer", role: "user" as const };

  beforeEach(() => {
    localStorage.clear();
  });

  it("cria, lista e atualiza campanhas do Mestre com sucesso", async () => {
    const campaign = await saveCampaign(
      {
        title: "A Maldição da Coroa Carmesim",
        description: "Campanha épica de Pathfinder 2e nas profundezas de Korvosa.",
        schedule: "Sextas às 20h",
        system: "Pathfinder 2e Remaster",
      },
      gmUser
    );

    expect(campaign.id).toBeTruthy();
    expect(campaign.title).toBe("A Maldição da Coroa Carmesim");
    expect(campaign.gm_email).toBe("mestre@rpg.com");

    const list = await listCampaigns(gmUser);
    expect(list.length).toBe(1);
    expect(list[0].title).toBe("A Maldição da Coroa Carmesim");
  });

  it("permite ao jogador indicar o e-mail do Mestre e o Mestre encontra a ficha vinculada", async () => {
    // 1. Jogador cria sua ficha
    const char = await saveCharacter(
      {
        id: "char_valeros",
        name: "Valeros Fighter",
        level: 3,
        class: "Guerreiro",
        ancestry: "Humano",
      },
      player1
    );

    // 2. Jogador vincula a ficha ao e-mail do GM
    await linkCharacterToGM(char.character_key, "mestre@rpg.com", player1);

    // 3. Mestre consulta fichas compartilhadas com ele
    const sharedWithGM = await listCharactersSharedWithGM("mestre@rpg.com");
    expect(sharedWithGM.length).toBe(1);
    expect(sharedWithGM[0].name).toBe("Valeros Fighter");
    expect(sharedWithGM[0].gm_email).toBe("mestre@rpg.com");
  });

  it("adiciona e remove personagens de uma mesa específica do Mestre", async () => {
    const campaign = await saveCampaign(
      { title: "Mesa dos Cofres" },
      gmUser
    );

    const updated1 = await addCharacterToCampaign(campaign.id, "char_valeros", gmUser);
    expect(updated1.character_keys).toContain("char_valeros");

    const updated2 = await removeCharacterFromCampaign(campaign.id, "char_valeros", gmUser);
    expect(updated2.character_keys).not.toContain("char_valeros");
  });

  it("registra sessões de jogo e histórico de XP/Loot no diário da campanha", async () => {
    const campaign = await saveCampaign(
      { title: "Mesa da Selva de Mwangi" },
      gmUser
    );

    const withSession = await addSessionLog(
      campaign.id,
      {
        title: "Sessão 01: Chegada a Nantambu",
        date: "2026-08-30",
        summary: "Os aventureiros exploraram os mercados mágicos e derrotaram os cultistas.",
        xp: 120,
        loot: "Varinha de Mísseis Mágicos + 50 PO",
      },
      gmUser
    );

    expect(withSession.sessions.length).toBe(1);
    expect(withSession.sessions[0].title).toBe("Sessão 01: Chegada a Nantambu");
    expect(withSession.sessions[0].xp).toBe(120);
  });

  it("desvincula a ficha do Mestre quando solicitado pelo jogador", async () => {
    await saveCharacter(
      {
        id: "char_merisiel",
        name: "Merisiel Ladina",
        level: 2,
        gmEmail: "mestre@rpg.com",
      },
      player1
    );

    let shared = await listCharactersSharedWithGM("mestre@rpg.com");
    expect(shared.length).toBe(1);

    await unlinkCharacterFromGM("char_merisiel", player1);
    shared = await listCharactersSharedWithGM("mestre@rpg.com");
    expect(shared.length).toBe(0);
  });

  it("exclui uma campanha do Mestre", async () => {
    const camp = await saveCampaign({ title: "Campanha Temporária" }, gmUser);
    expect((await listCampaigns(gmUser)).length).toBe(1);

    await deleteCampaign(camp.id, gmUser);
    expect((await listCampaigns(gmUser)).length).toBe(0);
  });
});
