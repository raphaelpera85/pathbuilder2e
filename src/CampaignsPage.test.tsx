import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CampaignsPage } from "./CampaignsPage";
import { I18nProvider } from "./i18n";
import type { AuthSession, UserProfile } from "./services/auth";
import type { Campaign } from "./services/campaigns";
import type { CloudCharacter } from "./services/characters";

vi.mock("./services/auth", () => ({
  getCurrentSession: vi.fn(),
  subscribeToAuth: vi.fn(() => vi.fn()),
}));

vi.mock("./services/campaigns", () => ({
  listCampaignsWithStatus: vi.fn(),
  saveCampaignWithStatus: vi.fn(),
  deleteCampaignWithStatus: vi.fn(),
  addCharacterToCampaignWithStatus: vi.fn(),
  removeCharacterFromCampaignWithStatus: vi.fn(),
  addSessionLogWithStatus: vi.fn(),
  updateCombatant: vi.fn(),
  sortInitiative: vi.fn(),
  subscribeToCampaign: vi.fn(() => vi.fn()),
  getPendingCampaignCount: vi.fn(() => 0),
}));

vi.mock("./services/characters", () => ({
  listCharacters: vi.fn(),
  listCharactersSharedWithGM: vi.fn(),
  linkCharacterToGM: vi.fn(),
  unlinkCharacterFromGM: vi.fn(),
}));

import * as authService from "./services/auth";
import * as campaignService from "./services/campaigns";
import * as characterService from "./services/characters";

describe("CampaignsPage Component", () => {
  const mockUser: UserProfile = {
    id: "user_gm_1",
    email: "gm@test.com",
    username: "GameMaster1",
    role: "user",
    created_at: "2026-09-01T10:00:00Z",
  };

  const mockSession: AuthSession = {
    user: mockUser,
    expires_at: Date.now() + 3600000,
  };

  const mockCampaign: Campaign = {
    id: "camp_1",
    gm_id: "user_gm_1",
    gm_email: "gm@test.com",
    title: "Aventuras em Otari",
    description: "Mesa introdutória para iniciantes.",
    schedule: "Sábados às 14h",
    system: "remaster",
    created_at: "2026-09-01T10:00:00Z",
    updated_at: "2026-09-01T10:00:00Z",
    character_keys: ["char_key_1"],
    sessions: [
      {
        id: "sess_1",
        date: "2026-09-05",
        title: "Capítulo 1: O Porão",
        summary: "Os heróis enfrentaram os ratos gigantes.",
        xp: 120,
        loot: "50 PO e uma poção de cura.",
      },
    ],
    combat: {
      round: 1,
      combatants: [
        {
          id: "npc_1",
          name: "Rato Gigante",
          isPlayer: false,
          initiative: 12,
          currentHp: 8,
          maxHp: 8,
          ac: 15,
        },
      ],
    },
  };

  const mockCharacter: CloudCharacter = {
    id: "char_key_1",
    character_key: "char_key_1",
    user_id: "user_player_1",
    system_id: "pf2e",
    player_name: "Jogador 1",
    player_email: "player1@test.com",
    gm_email: "gm@test.com",
    name: "Kyra Clériga",
    level: 2,
    ruleset: "remaster",
    created_at: "2026-09-01T08:00:00Z",
    updated_at: "2026-09-01T08:00:00Z",
    data: {
      id: "char_key_1",
      name: "Kyra Clériga",
      level: 2,
      abilities: { str: 14, dex: 12, con: 14, int: 10, wis: 18, cha: 12 },
      currentHp: 28,
      maxHp: 28,
      ac: 18,
      perception: 8,
      speed: 25,
      ancestry: "Humano",
      heritage: null,
      class: "Clérigo",
      subclass: null,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    vi.mocked(authService.subscribeToAuth).mockReturnValue(vi.fn());
  });

  afterEach(() => {
    cleanup();
  });

  it("renderiza tela de login e mensagem informativa quando não autenticado", async () => {
    vi.mocked(authService.getCurrentSession).mockResolvedValue(null);

    render(
      <I18nProvider>
        <CampaignsPage />
      </I18nProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Faça login na sua conta|Inicie sesión|Sign in/i)).toBeInTheDocument();
    });
  });

  it("renderiza campanhas, combate e formulários acessíveis quando autenticado", async () => {
    vi.mocked(authService.getCurrentSession).mockResolvedValue(mockSession);
    vi.mocked(campaignService.listCampaignsWithStatus).mockResolvedValue({
      data: [mockCampaign],
      source: "supabase",
    });
    vi.mocked(characterService.listCharactersSharedWithGM).mockResolvedValue([mockCharacter]);
    vi.mocked(characterService.listCharacters).mockResolvedValue([mockCharacter]);

    render(
      <I18nProvider>
        <CampaignsPage />
      </I18nProvider>
    );

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "Aventuras em Otari" })).toBeInTheDocument();
    });

    // Inputs com nomes acessíveis presentes
    expect(screen.getByLabelText(/Selecione seu personagem|Select your character/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail do Mestre|GM email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nome do monstro|Monster \/ NPC/i)).toBeInTheDocument();
  });

  it("abre e fecha o modal de nova campanha com atributos de diálogo acessível e suporte a Escape", async () => {
    vi.mocked(authService.getCurrentSession).mockResolvedValue(mockSession);
    vi.mocked(campaignService.listCampaignsWithStatus).mockResolvedValue({
      data: [mockCampaign],
      source: "supabase",
    });
    vi.mocked(characterService.listCharactersSharedWithGM).mockResolvedValue([mockCharacter]);
    vi.mocked(characterService.listCharacters).mockResolvedValue([mockCharacter]);

    render(
      <I18nProvider>
        <CampaignsPage />
      </I18nProvider>
    );

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "Aventuras em Otari" })).toBeInTheDocument();
    });

    // Abrir modal de criação de campanha
    const newTableBtn = screen.getByRole("button", { name: /Nova mesa|New table|Nueva mesa/i });
    fireEvent.click(newTableBtn);

    // Modal com atributos de acessibilidade
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", "create-campaign-modal-title");

    // Inputs do modal têm rótulos acessíveis
    expect(screen.getByLabelText(/Nome da Campanha \/ Mesa|Campaign \/ Table name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Horário das sessões|Session schedule/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Sistema \/ Edição|System \/ Edition/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Sinopse da Aventura & Notas Iniciais|Adventure synopsis/i)).toBeInTheDocument();

    // Fechar pressionando Escape
    fireEvent.keyDown(window, { key: "Escape" });
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("abre e fecha o modal de inspeção de ficha de jogador com suporte a Escape", async () => {
    vi.mocked(authService.getCurrentSession).mockResolvedValue(mockSession);
    vi.mocked(campaignService.listCampaignsWithStatus).mockResolvedValue({
      data: [mockCampaign],
      source: "supabase",
    });
    vi.mocked(characterService.listCharactersSharedWithGM).mockResolvedValue([mockCharacter]);
    vi.mocked(characterService.listCharacters).mockResolvedValue([mockCharacter]);

    render(
      <I18nProvider>
        <CampaignsPage />
      </I18nProvider>
    );

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "Kyra Clériga" })).toBeInTheDocument();
    });

    // Clicar no botão Inspecionar Ficha
    const inspectBtn = screen.getByRole("button", { name: /Inspecionar Ficha|Inspect Sheet/i });
    fireEvent.click(inspectBtn);

    // Diálogo aberto com role="dialog"
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-labelledby", "inspect-char-modal-title");
    expect(screen.getByText(/Ficha de Kyra Clériga/i)).toBeInTheDocument();

    // Fechar com Escape
    fireEvent.keyDown(window, { key: "Escape" });
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
