import { useEffect, useState, useMemo } from "react";
import { useI18n, type MessageKey } from "./i18n";
import {
  listCampaigns,
  saveCampaign,
  deleteCampaign,
  addCharacterToCampaign,
  removeCharacterFromCampaign,
  addSessionLog,
  type Campaign,
  type Combatant,
  type CampaignSession,
} from "./services/campaigns";
import {
  listCharactersSharedWithGM,
  listCharacters,
  linkCharacterToGM,
  unlinkCharacterFromGM,
  type CloudCharacter,
} from "./services/characters";
import { getCurrentSession, type AuthSession } from "./services/auth";
import "./campaigns.css";

export function CampaignsPage() {
  const { t } = useI18n();
  const [session, setSession] = useState<AuthSession | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [sharedCharacters, setSharedCharacters] = useState<CloudCharacter[]>([]);
  const [myCharacters, setMyCharacters] = useState<CloudCharacter[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [inspectedChar, setInspectedChar] = useState<CloudCharacter | null>(null);

  // Forms
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newSchedule, setNewSchedule] = useState("");
  const [newSystem, setNewSystem] = useState("Pathfinder 2e Remaster");

  // New Session Log Form
  const [sessionTitle, setSessionTitle] = useState("");
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().slice(0, 10));
  const [sessionSummary, setSessionSummary] = useState("");
  const [sessionXp, setSessionXp] = useState<number>(80);
  const [sessionLoot, setSessionLoot] = useState("");
  const [showSessionForm, setShowSessionForm] = useState(false);

  // Quick Monster / NPC for Combat Tracker
  const [npcName, setNpcName] = useState("");
  const [npcHp, setNpcHp] = useState<number>(25);
  const [npcAc, setNpcAc] = useState<number>(16);
  const [npcInit, setNpcInit] = useState<number>(10);

  // Link My Character to GM Form
  const [playerSelectedCharKey, setPlayerSelectedCharKey] = useState<string>("");
  const [targetGMEmail, setTargetGMEmail] = useState("");
  const [linkNotice, setLinkNotice] = useState<string | null>(null);

  const activeCampaign = useMemo(
    () => campaigns.find((c) => c.id === selectedCampaignId) || campaigns[0] || null,
    [campaigns, selectedCampaignId]
  );

  const refreshData = async () => {
    setLoading(true);
    try {
      const cur = await getCurrentSession();
      setSession(cur);
      if (cur?.user) {
        const [camps, shared, own] = await Promise.all([
          listCampaigns(cur.user),
          cur.user.email ? listCharactersSharedWithGM(cur.user.email) : Promise.resolve([]),
          listCharacters(cur.user),
        ]);
        setCampaigns(camps);
        setSharedCharacters(shared);
        setMyCharacters(own);
        if (camps.length > 0 && !selectedCampaignId) {
          setSelectedCampaignId(camps[0].id);
        }
      }
    } catch (err) {
      console.error("Erro ao carregar campanhas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refreshData();
  }, []);

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !session?.user) return;
    try {
      const created = await saveCampaign(
        {
          title: newTitle.trim(),
          description: newDesc.trim(),
          schedule: newSchedule.trim(),
          system: newSystem,
        },
        session.user
      );
      setNewTitle("");
      setNewDesc("");
      setNewSchedule("");
      setShowCreateModal(false);
      await refreshData();
      setSelectedCampaignId(created.id);
    } catch (err) {
      alert("Erro ao criar campanha: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  const handleDeleteCampaign = async (id: string) => {
    if (!confirm("Deseja realmente excluir esta campanha/mesa?") || !session?.user) return;
    await deleteCampaign(id, session.user);
    if (selectedCampaignId === id) setSelectedCampaignId(null);
    await refreshData();
  };

  const handleToggleCharInCampaign = async (charKey: string) => {
    if (!activeCampaign || !session?.user) return;
    const isInside = activeCampaign.character_keys.includes(charKey);
    if (isInside) {
      await removeCharacterFromCampaign(activeCampaign.id, charKey, session.user);
    } else {
      await addCharacterToCampaign(activeCampaign.id, charKey, session.user);
    }
    await refreshData();
  };

  const handleAddSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCampaign || !sessionTitle.trim() || !session?.user) return;
    await addSessionLog(
      activeCampaign.id,
      {
        title: sessionTitle.trim(),
        date: sessionDate,
        summary: sessionSummary.trim(),
        xp: sessionXp,
        loot: sessionLoot.trim(),
      },
      session.user
    );
    setSessionTitle("");
    setSessionSummary("");
    setSessionLoot("");
    setShowSessionForm(false);
    await refreshData();
  };

  const handleAddCombatant = async () => {
    if (!activeCampaign || !npcName.trim() || !session?.user) return;
    const newCombatant: Combatant = {
      id: `npc_${Date.now()}`,
      name: npcName.trim(),
      isPlayer: false,
      initiative: Number(npcInit) || 10,
      currentHp: Number(npcHp) || 20,
      maxHp: Number(npcHp) || 20,
      ac: Number(npcAc) || 15,
    };
    const updated = {
      ...activeCampaign,
      combatants: [...(activeCampaign.combatants || []), newCombatant].sort(
        (a, b) => b.initiative - a.initiative
      ),
    };
    await saveCampaign(updated, session.user);
    setNpcName("");
    await refreshData();
  };

  const handleRollPartyInitiative = async () => {
    if (!activeCampaign || !session?.user) return;
    const partyCombatants: Combatant[] = campaignPartyCharacters.map((char) => {
      const data = (char.data || {}) as any;
      const roll = Math.floor(Math.random() * 20) + 1 + (Number(data.perception) || 0);
      return {
        id: `pc_${char.character_key}`,
        name: char.name,
        isPlayer: true,
        characterKey: char.character_key,
        initiative: roll,
        currentHp: data.currentHp ?? data.maxHp ?? 20,
        maxHp: data.maxHp ?? 20,
        ac: data.ac ?? 15,
        perception: data.perception ?? 0,
      };
    });

    const nonPlayers = (activeCampaign.combatants || []).filter((c) => !c.isPlayer);
    const updatedCombatants = [...partyCombatants, ...nonPlayers].sort(
      (a, b) => b.initiative - a.initiative
    );

    await saveCampaign({ ...activeCampaign, combatants: updatedCombatants }, session.user);
    await refreshData();
  };

  const handleUpdateCombatantHp = async (combatantId: string, delta: number) => {
    if (!activeCampaign || !session?.user) return;
    const updated = (activeCampaign.combatants || []).map((c) => {
      if (c.id === combatantId) {
        const nextHp = Math.max(0, Math.min(c.maxHp, c.currentHp + delta));
        return { ...c, currentHp: nextHp };
      }
      return c;
    });
    await saveCampaign({ ...activeCampaign, combatants: updated }, session.user);
    await refreshData();
  };

  const handleRemoveCombatant = async (combatantId: string) => {
    if (!activeCampaign || !session?.user) return;
    const updated = (activeCampaign.combatants || []).filter((c) => c.id !== combatantId);
    await saveCampaign({ ...activeCampaign, combatants: updated }, session.user);
    await refreshData();
  };

  const handleLinkMyCharacter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerSelectedCharKey || !targetGMEmail.trim() || !session?.user) return;
    try {
      await linkCharacterToGM(playerSelectedCharKey, targetGMEmail.trim(), session.user);
      setLinkNotice(`Ficha vinculada com sucesso ao Mestre: ${targetGMEmail.trim()}`);
      setTargetGMEmail("");
      await refreshData();
    } catch (err) {
      alert("Erro ao vincular: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  const handleUnlinkMyCharacter = async (charKey: string) => {
    if (!session?.user) return;
    try {
      await unlinkCharacterFromGM(charKey, session.user);
      setLinkNotice("Ficha desvinculada do Mestre com sucesso.");
      await refreshData();
    } catch (err) {
      alert("Erro: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  const campaignPartyCharacters = useMemo(() => {
    if (!activeCampaign) return [];
    const allKnown = [...sharedCharacters, ...myCharacters];
    const unique = new Map<string, CloudCharacter>();
    for (const c of allKnown) {
      if (activeCampaign.character_keys.includes(c.character_key)) {
        unique.set(c.character_key, c);
      }
    }
    return Array.from(unique.values());
  }, [activeCampaign, sharedCharacters, myCharacters]);

  if (!session) {
    return (
      <main className="portal-page" id="portal-content" tabIndex={-1}>
        <header className="portal-hero">
          <span>PAINEL DO MESTRE · GAME MASTER</span>
          <h1>{t("campaignsTitle")}</h1>
          <p>{t("campaignsIntro")}</p>
        </header>
        <section className="portal-panel" style={{ textAlign: "center", padding: "40px 20px" }}>
          <span style={{ fontSize: "42px" }}>🏰</span>
          <h2 style={{ marginTop: "12px", color: "var(--pb-orange)" }}>Faça login na sua conta</h2>
          <p style={{ maxWidth: "500px", margin: "10px auto 20px auto", color: "var(--pb-text-muted)" }}>
            Para organizar campanhas, gerenciar mesas de RPG e ter acesso em tempo real às fichas enviadas por seus jogadores, conecte-se à sua conta.
          </p>
          <button
            className="btn-card-open"
            type="button"
            onClick={() => window.dispatchEvent(new Event("pathbuilder:open-account"))}
            style={{ display: "inline-flex", width: "auto", padding: "10px 24px", fontSize: "14px" }}
          >
            🛡️ Acessar Minha Conta
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="portal-page" id="portal-content" tabIndex={-1}>
      <header className="portal-hero">
        <span>MESTRE DA MESA · {session.user.username || session.user.email}</span>
        <h1>{t("campaignsTitle")}</h1>
        <p>{t("campaignsIntro")}</p>
      </header>

      {/* TOP STATS BAR */}
      <section className="campaign-stats-banner">
        <div className="camp-stat-box">
          <span className="stat-num">{campaigns.length}</span>
          <span className="stat-label">Campanhas Ativas</span>
        </div>
        <div className="camp-stat-box">
          <span className="stat-num">{sharedCharacters.length}</span>
          <span className="stat-label">Fichas de Jogadores Conectadas</span>
        </div>
        <div className="camp-stat-box">
          <span className="stat-num">{session.user.email}</span>
          <span className="stat-label">Seu E-mail de Mestre</span>
        </div>
      </section>

      {/* MAIN TWO-COLUMN SPLIT: CAMPAIGNS LIST & CAMPAIGN DETAILS */}
      <div className="campaigns-layout">
        {/* COLUNA ESQUERDA: LISTA DE MESAS / CAMPANHAS */}
        <aside className="campaigns-sidebar">
          <div className="campaigns-sidebar-header">
            <h3>🏰 Suas Mesas de RPG</h3>
            <button
              className="btn-add-camp"
              type="button"
              onClick={() => setShowCreateModal(true)}
            >
              ➕ Nova Mesa
            </button>
          </div>

          {campaigns.length === 0 ? (
            <div className="camp-empty-state">
              <p>Nenhuma campanha criada ainda.</p>
              <button
                className="btn-card-open"
                type="button"
                onClick={() => setShowCreateModal(true)}
              >
                Criar Primeira Campanha
              </button>
            </div>
          ) : (
            <div className="camp-nav-list">
              {campaigns.map((camp) => (
                <button
                  key={camp.id}
                  type="button"
                  className={`camp-nav-item ${activeCampaign?.id === camp.id ? "active" : ""}`}
                  onClick={() => setSelectedCampaignId(camp.id)}
                >
                  <div className="camp-nav-main">
                    <strong>{camp.title}</strong>
                    <span className="camp-nav-meta">
                      {camp.character_keys.length} jogadores · {camp.schedule || "Sem horário"}
                    </span>
                  </div>
                  <span className="camp-nav-arrow">❯</span>
                </button>
              ))}
            </div>
          )}

          {/* VINCULAR MEU PERSONAGEM A OUTRO MESTRE (PLAYER MODE) */}
          <div className="link-gm-widget">
            <h4>🎲 Vincular minha Ficha a um Mestre</h4>
            <p className="widget-desc">
              Você também é jogador em outra mesa? Indique o e-mail do seu Mestre:
            </p>
            {linkNotice && <div className="link-feedback">{linkNotice}</div>}
            <form onSubmit={handleLinkMyCharacter} className="link-gm-form">
              <select
                value={playerSelectedCharKey}
                onChange={(e) => setPlayerSelectedCharKey(e.target.value)}
                required
                className="camp-input"
              >
                <option value="">Selecione seu personagem...</option>
                {myCharacters.map((c) => (
                  <option key={c.character_key} value={c.character_key}>
                    {c.name} (Nv {c.level}) {c.gm_email ? `[GM: ${c.gm_email}]` : ""}
                  </option>
                ))}
              </select>
              <input
                type="email"
                placeholder="email.do.mestre@exemplo.com"
                value={targetGMEmail}
                onChange={(e) => setTargetGMEmail(e.target.value)}
                required
                className="camp-input"
              />
              <button type="submit" className="btn-link-gm">
                🔗 Conceder Acesso ao Mestre
              </button>
            </form>
          </div>
        </aside>

        {/* COLUNA DIREITA: DETALHES DA CAMPANHA ATIVA */}
        <section className="campaign-main-content">
          {activeCampaign ? (
            <>
              <div className="campaign-hero-panel">
                <div className="camp-title-row">
                  <div>
                    <h2>{activeCampaign.title}</h2>
                    <span className="camp-tags">
                      <span className="camp-tag-system">{activeCampaign.system}</span>
                      <span className="camp-tag-schedule">📅 {activeCampaign.schedule || "Horário flexível"}</span>
                    </span>
                  </div>
                  <div className="camp-hero-actions">
                    <button
                      className="btn-danger-sm"
                      type="button"
                      onClick={() => handleDeleteCampaign(activeCampaign.id)}
                    >
                      🗑️ Excluir Mesa
                    </button>
                  </div>
                </div>
                {activeCampaign.description && (
                  <p className="camp-description">{activeCampaign.description}</p>
                )}
              </div>

              {/* ABAS DO PAINEL DO MESTRE DA CAMPANHA */}
              <div className="camp-sections">
                {/* 1. GRUPO DE AVENTUREIROS (PARTY) */}
                <div className="camp-section-box">
                  <div className="section-header-row">
                    <h3>🛡️ Grupo de Aventureiros ({campaignPartyCharacters.length})</h3>
                  </div>

                  {campaignPartyCharacters.length === 0 ? (
                    <div className="empty-party-notice">
                      <p>Nenhum personagem foi atribuído a esta mesa ainda.</p>
                      <span style={{ fontSize: "12px", color: "var(--pb-text-muted)" }}>
                        Selecione jogadores na lista abaixo de fichas vinculadas para adicioná-los.
                      </span>
                    </div>
                  ) : (
                    <div className="party-cards-grid">
                      {campaignPartyCharacters.map((char) => {
                        const charData = (char.data || {}) as any;
                        return (
                          <div className="party-member-card" key={char.id}>
                            <div className="member-top">
                              <div>
                                <h4>{char.name}</h4>
                                <span className="member-subtitle">
                                  {charData.ancestry || "Humano"} {charData.class || "Aventureiro"} · Nv {char.level}
                                </span>
                              </div>
                              <span className="player-badge">
                                👤 {char.player_name || char.player_email || "Jogador"}
                              </span>
                            </div>

                            <div className="member-vitals">
                              <div className="vital-item">
                                <span className="vital-lbl">PV</span>
                                <span className="vital-val pv">{charData.maxHp || 20}</span>
                              </div>
                              <div className="vital-item">
                                <span className="vital-lbl">CA</span>
                                <span className="vital-val ca">{charData.ac || 15}</span>
                              </div>
                              <div className="vital-item">
                                <span className="vital-lbl">Percepção</span>
                                <span className="vital-val">+{charData.perception || 5}</span>
                              </div>
                              <div className="vital-item">
                                <span className="vital-lbl">Velocidade</span>
                                <span className="vital-val">{charData.speed || 25}ft</span>
                              </div>
                            </div>

                            <div className="member-actions">
                              <button
                                className="btn-inspect"
                                type="button"
                                onClick={() => setInspectedChar(char)}
                              >
                                🔍 Inspecionar Ficha
                              </button>
                              <button
                                className="btn-remove-party"
                                type="button"
                                onClick={() => handleToggleCharInCampaign(char.character_key)}
                                title="Remover desta campanha"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* ADICIONAR JOGADORES VINCULADOS A ESTA MESA */}
                  <div className="assign-party-box">
                    <h4>➕ Adicionar Fichas Disponíveis a esta Campanha:</h4>
                    <div className="assign-chips">
                      {[...sharedCharacters, ...myCharacters].map((c) => {
                        const isInside = activeCampaign.character_keys.includes(c.character_key);
                        return (
                          <button
                            key={c.id}
                            type="button"
                            className={`assign-chip ${isInside ? "selected" : ""}`}
                            onClick={() => handleToggleCharInCampaign(c.character_key)}
                          >
                            {isInside ? "✓ " : "+ "}
                            {c.name} (Nv {c.level})
                          </button>
                        );
                      })}
                      {sharedCharacters.length === 0 && myCharacters.length === 0 && (
                        <span style={{ fontSize: "12px", color: "var(--pb-text-muted)" }}>
                          Nenhuma ficha vinculada ao seu e-mail ({session.user.email}). Peça aos jogadores para informarem seu e-mail.
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. RASTREADOR DE INICIATIVA & COMBATE */}
                <div className="camp-section-box">
                  <div className="section-header-row">
                    <h3>⚔️ {t("initiativeTracker")}</h3>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        className="btn-action-primary"
                        type="button"
                        onClick={handleRollPartyInitiative}
                      >
                        🎲 Rolar Iniciativa do Grupo
                      </button>
                    </div>
                  </div>

                  {/* TABELA DE COMBATE */}
                  {(!activeCampaign.combatants || activeCampaign.combatants.length === 0) ? (
                    <p style={{ color: "var(--pb-text-muted)", fontSize: "13px", padding: "10px 0" }}>
                      Nenhum combate em andamento. Clique em "Rolar Iniciativa do Grupo" ou adicione monstros abaixo.
                    </p>
                  ) : (
                    <div className="combat-table-wrap">
                      <table className="combat-table">
                        <thead>
                          <tr>
                            <th>Iniciativa</th>
                            <th>Combatente</th>
                            <th>Tipo</th>
                            <th>CA</th>
                            <th>Pontos de Vida (PV)</th>
                            <th>Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {activeCampaign.combatants.map((comb) => (
                            <tr key={comb.id} className={comb.isPlayer ? "row-player" : "row-monster"}>
                              <td className="init-col">
                                <span className="init-badge">{comb.initiative}</span>
                              </td>
                              <td className="comb-name">
                                <strong>{comb.name}</strong>
                              </td>
                              <td>
                                <span className={`type-tag ${comb.isPlayer ? "player" : "monster"}`}>
                                  {comb.isPlayer ? "Jogador" : "Monstro/NPC"}
                                </span>
                              </td>
                              <td><strong>{comb.ac}</strong></td>
                              <td>
                                <div className="hp-adjuster">
                                  <button
                                    type="button"
                                    onClick={() => handleUpdateCombatantHp(comb.id, -5)}
                                    className="btn-hp-dec"
                                  >
                                    -5
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleUpdateCombatantHp(comb.id, -1)}
                                    className="btn-hp-dec"
                                  >
                                    -1
                                  </button>
                                  <span className="hp-display">
                                    {comb.currentHp} / {comb.maxHp}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => handleUpdateCombatantHp(comb.id, 1)}
                                    className="btn-hp-inc"
                                  >
                                    +1
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleUpdateCombatantHp(comb.id, 5)}
                                    className="btn-hp-inc"
                                  >
                                    +5
                                  </button>
                                </div>
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="btn-del-combatant"
                                  onClick={() => handleRemoveCombatant(comb.id)}
                                  title="Remover do combate"
                                >
                                  ✕
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* FORM RÁPIDO PARA ADICIONAR MONSTRO/NPC */}
                  <div className="add-monster-row">
                    <input
                      type="text"
                      placeholder="Nome do Monstro / NPC (Ex: Dragão Vermelho Jovem)"
                      value={npcName}
                      onChange={(e) => setNpcName(e.target.value)}
                      className="camp-input"
                      style={{ flex: 2 }}
                    />
                    <input
                      type="number"
                      placeholder="PV"
                      value={npcHp}
                      onChange={(e) => setNpcHp(Number(e.target.value))}
                      className="camp-input"
                      style={{ width: "70px" }}
                    />
                    <input
                      type="number"
                      placeholder="CA"
                      value={npcAc}
                      onChange={(e) => setNpcAc(Number(e.target.value))}
                      className="camp-input"
                      style={{ width: "70px" }}
                    />
                    <input
                      type="number"
                      placeholder="Inic."
                      value={npcInit}
                      onChange={(e) => setNpcInit(Number(e.target.value))}
                      className="camp-input"
                      style={{ width: "70px" }}
                    />
                    <button
                      type="button"
                      className="btn-action-secondary"
                      onClick={handleAddCombatant}
                    >
                      ➕ Adicionar ao Combate
                    </button>
                  </div>
                </div>

                {/* 3. DIÁRIO DE SESSÕES & ANOTAÇÕES */}
                <div className="camp-section-box">
                  <div className="section-header-row">
                    <h3>📜 {t("sessionJournal")} ({activeCampaign.sessions?.length || 0})</h3>
                    <button
                      className="btn-action-primary"
                      type="button"
                      onClick={() => setShowSessionForm(!showSessionForm)}
                    >
                      {showSessionForm ? "Fechar Formulário" : "➕ Registrar Nova Sessão"}
                    </button>
                  </div>

                  {showSessionForm && (
                    <form onSubmit={handleAddSession} className="session-form">
                      <div className="form-row">
                        <input
                          type="text"
                          placeholder="Título da Sessão (Ex: Sessão 04 - O Templo Subterrâneo)"
                          value={sessionTitle}
                          onChange={(e) => setSessionTitle(e.target.value)}
                          required
                          className="camp-input"
                          style={{ flex: 2 }}
                        />
                        <input
                          type="date"
                          value={sessionDate}
                          onChange={(e) => setSessionDate(e.target.value)}
                          required
                          className="camp-input"
                          style={{ width: "160px" }}
                        />
                        <input
                          type="number"
                          placeholder="XP"
                          value={sessionXp}
                          onChange={(e) => setSessionXp(Number(e.target.value))}
                          className="camp-input"
                          style={{ width: "90px" }}
                        />
                      </div>
                      <textarea
                        placeholder="Resumo dos acontecimentos, decisões dos jogadores e segredos descobertos..."
                        value={sessionSummary}
                        onChange={(e) => setSessionSummary(e.target.value)}
                        required
                        className="camp-textarea"
                      />
                      <input
                        type="text"
                        placeholder="Tesouros & Itens Encontrados (Loot)"
                        value={sessionLoot}
                        onChange={(e) => setSessionLoot(e.target.value)}
                        className="camp-input"
                      />
                      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                        <button
                          type="button"
                          className="btn-secondary-sm"
                          onClick={() => setShowSessionForm(false)}
                        >
                          Cancelar
                        </button>
                        <button type="submit" className="btn-action-primary">
                          💾 Salvar Registro de Sessão
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="sessions-timeline">
                    {(!activeCampaign.sessions || activeCampaign.sessions.length === 0) ? (
                      <p style={{ color: "var(--pb-text-muted)", fontSize: "13px" }}>
                        Nenhuma sessão registrada para esta aventura ainda.
                      </p>
                    ) : (
                      activeCampaign.sessions.map((sess) => (
                        <article key={sess.id} className="session-log-card">
                          <div className="session-card-header">
                            <div>
                              <h4>{sess.title}</h4>
                              <span className="session-date">📅 {sess.date}</span>
                            </div>
                            {sess.xp ? (
                              <span className="session-xp-badge">+{sess.xp} XP</span>
                            ) : null}
                          </div>
                          <p className="session-summary">{sess.summary}</p>
                          {sess.loot && (
                            <div className="session-loot-box">
                              <strong>💎 Tesouro Concedido:</strong> {sess.loot}
                            </div>
                          )}
                        </article>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="no-campaign-selected">
              <span style={{ fontSize: "40px" }}>🛡️</span>
              <h3>Selecione ou Crie uma Campanha</h3>
              <p>Gerencie grupos de RPG, aventureiros e encontros em um só lugar.</p>
            </div>
          )}
        </section>
      </div>

      {/* MODAL DE CRIAÇÃO DE NOVA CAMPANHA */}
      {showCreateModal && (
        <div className="modal-backdrop-dark">
          <div className="modal-content-camp">
            <header className="modal-camp-header">
              <h3>🏰 {t("createCampaign")}</h3>
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setShowCreateModal(false)}
              >
                ✕
              </button>
            </header>
            <form onSubmit={handleCreateCampaign} className="modal-camp-form">
              <div>
                <label>Nome da Campanha / Mesa:</label>
                <input
                  type="text"
                  placeholder="Ex: A Maldição do Trono Carmesim"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  className="camp-input"
                />
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <div style={{ flex: 1 }}>
                  <label>Horário das Sessões:</label>
                  <input
                    type="text"
                    placeholder="Ex: Quintas-feiras às 19:30"
                    value={newSchedule}
                    onChange={(e) => setNewSchedule(e.target.value)}
                    className="camp-input"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Sistema / Edição:</label>
                  <select
                    value={newSystem}
                    onChange={(e) => setNewSystem(e.target.value)}
                    className="camp-input"
                  >
                    <option value="Pathfinder 2e Remaster">Pathfinder 2e Remaster</option>
                    <option value="Pathfinder 2e Clássico">Pathfinder 2e Clássico</option>
                    <option value="Pathfinder 2e (Custom)">Regras Variantes / Híbrido</option>
                  </select>
                </div>
              </div>
              <div>
                <label>Sinopse da Aventura & Notas Iniciais:</label>
                <textarea
                  placeholder="Descreva o cenário, premissa da campanha e ganchos de aventura..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="camp-textarea"
                />
              </div>
              <div className="modal-camp-footer">
                <button
                  type="button"
                  className="btn-secondary-sm"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-action-primary">
                  🏰 Criar Mesa de RPG
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE INSPEÇÃO COMPLETA DA FICHA DO JOGADOR */}
      {inspectedChar && (
        <div className="modal-backdrop-dark" onClick={() => setInspectedChar(null)}>
          <div
            className="modal-content-inspect"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="modal-camp-header">
              <div>
                <h3>📜 Ficha de {inspectedChar.name}</h3>
                <span style={{ fontSize: "12px", color: "var(--pb-text-muted)" }}>
                  Jogador: {inspectedChar.player_name || inspectedChar.player_email || "Convidado"} · Nível {inspectedChar.level}
                </span>
              </div>
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setInspectedChar(null)}
              >
                ✕
              </button>
            </header>

            <div className="inspect-body">
              {/* ESTATÍSTICAS FUNDAMENTAIS */}
              <div className="inspect-stat-grid">
                <div className="inspect-stat-card">
                  <span className="inspect-label">Pontos de Vida</span>
                  <strong className="inspect-val hp">
                    {(inspectedChar.data as any).currentHp ?? (inspectedChar.data as any).maxHp ?? 20} / {(inspectedChar.data as any).maxHp ?? 20}
                  </strong>
                </div>
                <div className="inspect-stat-card">
                  <span className="inspect-label">Classe de Armadura (CA)</span>
                  <strong className="inspect-val ca">{(inspectedChar.data as any).ac || 15}</strong>
                </div>
                <div className="inspect-stat-card">
                  <span className="inspect-label">Percepção</span>
                  <strong className="inspect-val">+{(inspectedChar.data as any).perception || 5}</strong>
                </div>
                <div className="inspect-stat-card">
                  <span className="inspect-label">Deslocamento</span>
                  <strong className="inspect-val">{(inspectedChar.data as any).speed || 25} pés</strong>
                </div>
              </div>

              {/* ATRIBUTOS */}
              <div className="inspect-section">
                <h4>Atributos & Modificadores</h4>
                <div className="inspect-abilities-row">
                  {Object.entries((inspectedChar.data as any).abilities || {
                    str: 14, dex: 16, con: 12, int: 10, wis: 12, cha: 14
                  }).map(([k, v]) => {
                    const score = Number(v);
                    const mod = Math.floor((score - 10) / 2);
                    return (
                      <div className="ability-box" key={k}>
                        <span className="ab-key">{k.toUpperCase()}</span>
                        <span className="ab-score">{score}</span>
                        <span className="ab-mod">{mod >= 0 ? `+${mod}` : mod}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SALVAMENTOS */}
              <div className="inspect-section">
                <h4>Salvamentos</h4>
                <div className="inspect-saves-row">
                  <div className="save-chip">Fortitude: +{(inspectedChar.data as any).saves?.fortitude || 6}</div>
                  <div className="save-chip">Reflexos: +{(inspectedChar.data as any).saves?.reflex || 8}</div>
                  <div className="save-chip">Vontade: +{(inspectedChar.data as any).saves?.will || 5}</div>
                </div>
              </div>

              {/* HISTÓRICO E DETALHES */}
              <div className="inspect-section">
                <h4>Histórico & Divindade</h4>
                <p style={{ fontSize: "13px", color: "var(--pb-text-muted)" }}>
                  <strong>Divindade:</strong> {(inspectedChar.data as any).deity || "Nenhuma especificada"}
                </p>
                <p style={{ fontSize: "13px", color: "var(--pb-text-muted)", marginTop: "4px" }}>
                  <strong>Histórico:</strong> {(inspectedChar.data as any).backstory || "Sem histórico preenchido."}
                </p>
              </div>
            </div>

            <div className="modal-camp-footer">
              <button
                type="button"
                className="btn-action-primary"
                onClick={() => {
                  if ((window as any).app?.loadCharacter) {
                    (window as any).app.loadCharacter(inspectedChar.data);
                    window.location.hash = "#/builder";
                  }
                  setInspectedChar(null);
                }}
              >
                ⚔️ Abrir no Construtor Interativo
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
