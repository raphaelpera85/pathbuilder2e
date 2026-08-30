import { useEffect, useMemo, useRef, useState } from "react";
import type { PickerBridge, PickerItem, PickerSelectionOption, PickerType } from "./types";
import { useI18n, getItemDisplayName, type MessageKey } from "./i18n";
import { coinsToCopper, parsePriceToCopper, canAffordPrice, formatCopperToString } from "./utils/economy";

const pickerLabelKeys: Record<PickerType, MessageKey> = {
  ancestry: "ancestries", class: "classes", background: "backgrounds", weapon: "weapons", armor: "armors",
  heritage: "heritages", archetype: "archetypes", spell: "spells", ritual: "rituals", feat: "feats", item: "items", pet: "pets", action: "actions", condition: "conditions", buff: "buffs",
};

interface PickerModalProps {
  onBridgeReady?: (bridge: PickerBridge) => void;
}

export function getWeaponProficiencyRank(character: any, item: any): "U" | "T" | "E" | "M" | "L" {
  if (!character) return "T";
  const cat = String(item?.data?.category || item?.category || "").toLowerCase();

  // Custom weapon proficiencies on character
  const customProf = character.weaponProficiencies;
  if (customProf) {
    if (cat.includes("simples") || cat.includes("simple")) {
      const r = customProf.Simples || customProf.simple;
      if (r) return rankToInitial(r);
    }
    if (cat.includes("marcial") || cat.includes("martial")) {
      const r = customProf.Marcial || customProf.martial;
      if (r) return rankToInitial(r);
    }
    if (cat.includes("avan") || cat.includes("advanced")) {
      const r = customProf.Avançada || customProf.advanced;
      if (r) return rankToInitial(r);
    }
    if (cat.includes("desarmad") || cat.includes("unarmed")) {
      const r = customProf.Desarmado || customProf.unarmed;
      if (r) return rankToInitial(r);
    }
  }

  // Class default proficiencies
  const className = String(character.class || "").toLowerCase();
  if (cat.includes("simples") || cat.includes("simple")) {
    if (className.includes("guerreiro") || className.includes("fighter")) return "E";
    return "T";
  }
  if (cat.includes("desarmad") || cat.includes("unarmed")) {
    if (className.includes("monge") || className.includes("monk")) return "E";
    if (className.includes("guerreiro") || className.includes("fighter")) return "E";
    return "T";
  }
  if (cat.includes("marcial") || cat.includes("martial")) {
    if (
      className.includes("mago") ||
      className.includes("wizard") ||
      className.includes("feiticeir") ||
      className.includes("sorcerer") ||
      className.includes("brux") ||
      className.includes("witch") ||
      className.includes("clausur") ||
      className.includes("cloistered")
    ) {
      return "U";
    }
    if (className.includes("guerreiro") || className.includes("fighter")) return "E";
    return "T";
  }
  if (cat.includes("avan") || cat.includes("advanced")) {
    if (className.includes("guerreiro") || className.includes("fighter")) return "T";
    return "U";
  }

  return "T";
}

function rankToInitial(rank: string): "U" | "T" | "E" | "M" | "L" {
  const norm = String(rank).toUpperCase().trim();
  if (norm.startsWith("L") || norm.includes("LENDÁRIO") || norm.includes("LEGENDARY")) return "L";
  if (norm.startsWith("M") || norm.includes("MESTRE") || norm.includes("MASTER")) return "M";
  if (norm.startsWith("E") || norm.includes("ESPECIALISTA") || norm.includes("EXPERT")) return "E";
  if (norm.startsWith("T") || norm.includes("TREINADO") || norm.includes("TRAINED")) return "T";
  return "U";
}

export function PickerModal({ onBridgeReady }: PickerModalProps) {
  const { locale, t } = useI18n();
  const [pickerType, setPickerType] = useState<PickerType | null>(null);
  const [pickerOptions, setPickerOptions] = useState<import("./types").IPickerOpenOptions | undefined>();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [optionSelections, setOptionSelections] = useState<Record<string, string>>({});
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>("All");
  const [activeSubTab, setActiveSubTab] = useState<string>("Standard");

  // Custom weapon form state
  const [customName, setCustomName] = useState("");
  const [customCategory, setCustomCategory] = useState("Marcial");
  const [customDamage, setCustomDamage] = useState("1d8");
  const [customDamageType, setCustomDamageType] = useState("Cortante");
  const [customBulk, setCustomBulk] = useState("1");
  const [customHands, setCustomHands] = useState("1");
  const [customPrice, setCustomPrice] = useState("2 PO");
  const [customTraits, setCustomTraits] = useState("");
  const [customDesc, setCustomDesc] = useState("");

  const categoryTabs = useMemo(() => {
    if (!pickerType) return [];
    if (pickerType === "weapon") {
      return ["All", "Simple", "Martial", "Advanced", "Unarmed", "Proficient"];
    }
    if (pickerType === "armor") {
      return ["All", "Unarmored", "Light", "Medium", "Heavy", "Shields"];
    }
    if (pickerType === "feat") {
      const fType = pickerOptions?.filterType?.toLowerCase() || "";
      if (fType.includes("ancestry")) {
        return ["Ancestry Feats", "All Feats"];
      } else if (fType.includes("class")) {
        return ["Class Feats", "Dedication Feats", "Archetype Class Feats", "All Feats"];
      } else {
        return ["General Feats", "Skill Feats", "Archetype Skill Feats", "All Feats"];
      }
    }
    return [t(pickerLabelKeys[pickerType])];
  }, [pickerType, pickerOptions, t]);

  const subTabs = useMemo(() => {
    if (pickerType === "weapon" || pickerType === "armor" || pickerType === "item") {
      return ["Standard", "Magic", "Custom"];
    }
    return [];
  }, [pickerType]);

  useEffect(() => {
    if (categoryTabs.length > 0) {
      setActiveCategoryTab(categoryTabs[0]);
    }
    setActiveSubTab("Standard");
  }, [categoryTabs, pickerType]);

  const searchRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const bridge = useMemo<PickerBridge>(() => ({
    open(type, options) {
      returnFocusRef.current = document.activeElement as HTMLElement | null;
      setPickerType(type);
      setPickerOptions(options);
      setQuery("");
      setSelectedIndex(0);
      setOptionSelections({});
      setActiveSubTab("Standard");
    },
    close() {
      setPickerType(null);
      setPickerOptions(undefined);
      requestAnimationFrame(() => returnFocusRef.current?.focus());
    },
  }), []);

  useEffect(() => {
    onBridgeReady?.(bridge);
    window.pathbuilderPicker = bridge;
    const pending = window.app?.consumePendingPicker?.();
    if (pending) {
      if (typeof pending === "string") bridge.open(pending as PickerType);
      else if (pending.type) bridge.open(pending.type, pending.options);
    }
    if (import.meta.env.DEV) {
      const previewType = new URLSearchParams(window.location.search).get("picker") as PickerType | null;
      if (previewType && previewType in pickerLabelKeys) bridge.open(previewType);
    }
    return () => {
      if (window.pathbuilderPicker === bridge) delete window.pathbuilderPicker;
    };
  }, [bridge, onBridgeReady]);

  useEffect(() => {
    if (!pickerType) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    searchRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") bridge.close();
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ));
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [bridge, pickerType]);

  const character = window.app?.character;
  const characterCoins = character?.coins || { pp: 0, gp: 15, sp: 0, cp: 0 };
  const isPurchasable = pickerType === "weapon" || pickerType === "armor" || pickerType === "item";

  const items = useMemo(() => {
    if (!pickerType || !window.app) return [];
    const needle = query.toLocaleLowerCase(locale);
    let rawItems = window.app.getPickerItems(pickerType);

    if (pickerOptions?.filterType && pickerType === "feat") {
      const matchType = (item: PickerItem) => {
        const itemType = String(item.type || item.data?.type || "").toLowerCase();
        return itemType.includes(pickerOptions.filterType!.toLowerCase());
      };
      const matching = rawItems.filter(matchType);
      if (matching.length > 0) rawItems = matching;
    }

    // Category Tabs Filtering for Weapons
    if (pickerType === "weapon") {
      if (activeCategoryTab === "Simple") {
        rawItems = rawItems.filter((i) => {
          const cat = String(i.data?.category || "").toLowerCase();
          return cat.includes("simples") || cat.includes("simple");
        });
      } else if (activeCategoryTab === "Martial") {
        rawItems = rawItems.filter((i) => {
          const cat = String(i.data?.category || "").toLowerCase();
          return cat.includes("marcial") || cat.includes("martial");
        });
      } else if (activeCategoryTab === "Advanced") {
        rawItems = rawItems.filter((i) => {
          const cat = String(i.data?.category || "").toLowerCase();
          return cat.includes("avan") || cat.includes("advanced");
        });
      } else if (activeCategoryTab === "Unarmed") {
        rawItems = rawItems.filter((i) => {
          const cat = String(i.data?.category || "").toLowerCase();
          return cat.includes("desarmad") || cat.includes("unarmed");
        });
      } else if (activeCategoryTab === "Proficient") {
        rawItems = rawItems.filter((i) => getWeaponProficiencyRank(character, i) !== "U");
      }

      if (activeSubTab === "Magic") {
        rawItems = rawItems.filter((i) => (i.data?.level || 0) > 0 || (i.data?.traits || []).some((t: string) => /mágic|magic|runa|rune/i.test(t)));
      } else if (activeSubTab === "Standard") {
        rawItems = rawItems.filter((i) => (i.data?.level || 0) <= 1);
      }
    }

    const filtered = rawItems.filter((item) => {
      if (!item) return false;
      const localizedName = getItemDisplayName(item, locale);
      const localizedSummary = item.data?.summaries?.[locale] ?? item.data?.description ?? "";
      return `${localizedName} ${item.name || ""} ${localizedSummary}`.toLocaleLowerCase(locale).includes(needle);
    });

    return filtered.slice().sort((a, b) => {
      if (pickerType === "spell") {
        const weights: Record<string, number> = { available: 0, "requires-choice": 1, incompatible: 2 };
        const stateA = weights[a.data?.selectionState ?? "available"] ?? 0;
        const stateB = weights[b.data?.selectionState ?? "available"] ?? 0;
        if (stateA !== stateB) return stateA - stateB;
        if ((a.data?.rank ?? 0) !== (b.data?.rank ?? 0)) return (a.data?.rank ?? 0) - (b.data?.rank ?? 0);
      }
      const nameA = getItemDisplayName(a, locale);
      const nameB = getItemDisplayName(b, locale);
      return nameA.localeCompare(nameB, locale, { sensitivity: "base", numeric: true });
    });
  }, [locale, pickerOptions, pickerType, query, activeCategoryTab, activeSubTab, character]);

  useEffect(() => {
    if (selectedIndex >= items.length) setSelectedIndex(0);
  }, [items.length, selectedIndex]);

  if (!pickerType) return null;

  const selectedItem: PickerItem | undefined = items[selectedIndex];
  const selectedState = selectedItem?.data.selectionState ?? "available";
  const selectedMessage = selectedItem?.data.selectionMessages?.[locale] ?? selectedItem?.data.selectionMessages?.["pt-BR"] ?? "";
  const canConfirm = Boolean(selectedItem) && selectedState === "available";
  const source = selectedItem?.data.source;
  const sourceLabel = source?.book
    ? `${source.book}${source.page ? `, p. ${source.page}` : ""}`
    : "PC1";
  const rarity = selectedItem?.data.rarity === "rare" ? t("rarityRare") : selectedItem?.data.rarity === "uncommon" ? t("rarityUncommon") : selectedItem?.data.rarity === "common" ? t("rarityCommon") : null;
  const castingTimes = selectedItem?.data.castingTimes as Partial<Record<"pt-BR" | "en" | "es", string>> | undefined;
  const traditionNames = selectedItem?.data.traditionNames as Partial<Record<"pt-BR" | "en" | "es", string[]>> | undefined;
  const primaryChecks = selectedItem?.data.primaryChecks as Partial<Record<"pt-BR" | "en" | "es", string>> | undefined;
  const ruleFacts = selectedItem ? [
    typeof selectedItem.data.rank === "number" ? `${t("rank")} ${selectedItem.data.rank}` : null,
    castingTimes?.[locale] ? `${t("castingTime")}: ${castingTimes[locale]}` : null,
    traditionNames?.[locale]?.length ? `${t("traditions")}: ${traditionNames[locale]?.join(", ")}` : null,
    primaryChecks?.[locale] ? `${t("primaryCheck")}: ${primaryChecks[locale]}` : null,
  ].filter((fact): fact is string => Boolean(fact)) : [];
  const selectionGroups = selectedItem?.data.selectionGroups ?? [];
  const resolvedSelections = Object.fromEntries(selectionGroups.map((group) => {
    const selectedId = optionSelections[group.id] ?? group.options[0]?.id;
    return [group.id, group.options.find((option) => option.id === selectedId) ?? group.options[0]];
  })) as Record<string, PickerSelectionOption | undefined>;
  const resolvedSize = resolvedSelections.size;
  const resolvedHeritage = resolvedSelections.heritage;
  const resolvedHp = resolvedSize?.hp ?? selectedItem?.data.hp;
  const resolvedSpeed = resolvedHeritage?.speed ?? selectedItem?.data.speed;

  // Economy & Price Affordability
  const itemPrice = selectedItem?.data?.price ?? selectedItem?.price ?? "0 PO";
  const isAffordable = canAffordPrice(characterCoins, itemPrice);

  const confirm = (deductCoins: boolean = false) => {
    if (!selectedItem || selectedState !== "available") return;
    const selection = Object.fromEntries(selectionGroups.map((group) => [group.id, resolvedSelections[group.id]?.id ?? group.options[0]?.id]));
    const itemPayload = { ...selectedItem, ...(selectionGroups.length ? { selection } : {}) };
    if (pickerOptions) {
      if (deductCoins) {
        (window.app?.applyPickerSelection as any)?.(pickerType, itemPayload, pickerOptions, true);
      } else {
        (window.app?.applyPickerSelection as any)?.(pickerType, itemPayload, pickerOptions);
      }
    } else {
      if (deductCoins) {
        (window.app?.applyPickerSelection as any)?.(pickerType, itemPayload, undefined, true);
      } else {
        (window.app?.applyPickerSelection as any)?.(pickerType, itemPayload);
      }
    }
    bridge.close();
  };

  const handleCreateCustom = (deductCoins: boolean) => {
    if (!customName.trim()) return;
    const customItem: PickerItem = {
      name: customName.trim(),
      type: pickerType === "weapon" ? "Arma" : pickerType === "armor" ? "Armadura" : "Item",
      data: {
        name: customName.trim(),
        category: customCategory,
        damage: customDamage,
        damageType: customDamageType,
        bulk: customBulk || "1",
        hands: customHands,
        price: customPrice || "0 PO",
        traits: customTraits ? customTraits.split(",").map((s) => s.trim()).filter(Boolean) : [],
        description: customDesc.trim() || "Item personalizado criado pelo jogador."
      }
    };
    if (pickerOptions) {
      (window.app?.applyPickerSelection as any)?.(pickerType, customItem, pickerOptions, deductCoins);
    } else {
      (window.app?.applyPickerSelection as any)?.(pickerType, customItem, undefined, deductCoins);
    }
    bridge.close();
  };

  const clearSelection = () => {
    if (pickerOptions) {
      window.app?.applyPickerSelection(pickerType, null, pickerOptions);
    }
    bridge.close();
  };

  return (
    <div
      className="picker-overlay"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) bridge.close();
      }}
    >
      <section
        ref={dialogRef}
        className="picker-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="picker-title"
      >
        <h2 id="picker-title" className="sr-only">{t("select")} {t(pickerLabelKeys[pickerType])}</h2>
        
        {/* TOP BAR */}
        <header className="picker-nav">
          <div className="picker-tabs-bar">
            {categoryTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                className={`picker-tab-btn ${activeCategoryTab === tab ? "active" : ""}`}
                onClick={() => setActiveCategoryTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "auto" }}>
            <label className="picker-search">
              <span className="sr-only">{t("searchOptions")}</span>
              <input
                ref={searchRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setSelectedIndex(0);
                }}
                placeholder={t("search")}
              />
            </label>
            <button type="button" className="picker-filter-btn" title="Filtros avançados">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
              </svg>
            </button>
          </div>
        </header>

        {/* SUB TABS BAR (STANDARD | MAGIC | CUSTOM) */}
        {subTabs.length > 0 && (
          <div className="picker-subtabs-bar">
            {subTabs.map((st) => (
              <button
                key={st}
                type="button"
                className={`picker-subtab-btn ${activeSubTab === st ? "active" : ""}`}
                onClick={() => setActiveSubTab(st)}
              >
                {st}
              </button>
            ))}
          </div>
        )}

        {/* MAIN BODY */}
        <div className="picker-content">
          {activeSubTab === "Custom" ? (
            <div className="picker-custom-form-container">
              <h3 style={{ color: "var(--pb-orange)", marginBottom: "16px", fontSize: "18px" }}>
                Criar {pickerType === "weapon" ? "Arma Personalizada" : pickerType === "armor" ? "Armadura Personalizada" : "Item Personalizado"}
              </h3>
              <div className="picker-custom-grid">
                <label>
                  <span>Nome:</span>
                  <input value={customName} onChange={(e) => setCustomName(e.target.value)} placeholder="Ex: Machado Vorpal Ancestral" />
                </label>
                <label>
                  <span>Categoria:</span>
                  <select value={customCategory} onChange={(e) => setCustomCategory(e.target.value)}>
                    <option value="Simples">Simples</option>
                    <option value="Marcial">Marcial</option>
                    <option value="Avançada">Avançada</option>
                    <option value="Desarmado">Desarmado</option>
                  </select>
                </label>
                <label>
                  <span>Dado de Dano:</span>
                  <select value={customDamage} onChange={(e) => setCustomDamage(e.target.value)}>
                    <option value="1d4">1d4</option>
                    <option value="1d6">1d6</option>
                    <option value="1d8">1d8</option>
                    <option value="1d10">1d10</option>
                    <option value="1d12">1d12</option>
                    <option value="2d6">2d6</option>
                  </select>
                </label>
                <label>
                  <span>Tipo de Dano:</span>
                  <select value={customDamageType} onChange={(e) => setCustomDamageType(e.target.value)}>
                    <option value="Cortante">Cortante (S)</option>
                    <option value="Perfuração">Perfuração (P)</option>
                    <option value="Impacto">Impacto (B)</option>
                    <option value="Elemental">Elemental</option>
                  </select>
                </label>
                <label>
                  <span>Carga (Bulk):</span>
                  <input value={customBulk} onChange={(e) => setCustomBulk(e.target.value)} placeholder="1 ou L" />
                </label>
                <label>
                  <span>Mãos:</span>
                  <input value={customHands} onChange={(e) => setCustomHands(e.target.value)} placeholder="1 ou 2" />
                </label>
                <label>
                  <span>Preço:</span>
                  <input value={customPrice} onChange={(e) => setCustomPrice(e.target.value)} placeholder="Ex: 5 PO" />
                </label>
                <label style={{ gridColumn: "1 / -1" }}>
                  <span>Traços (separados por vírgula):</span>
                  <input value={customTraits} onChange={(e) => setCustomTraits(e.target.value)} placeholder="Ex: Ágil, Acurada, Versátil C" />
                </label>
                <label style={{ gridColumn: "1 / -1" }}>
                  <span>Descrição / Efeitos:</span>
                  <textarea rows={3} value={customDesc} onChange={(e) => setCustomDesc(e.target.value)} placeholder="Regras especiais e lore..." />
                </label>
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <button type="button" className="picker-confirm" onClick={() => handleCreateCustom(false)}>
                  Adicionar Grátis (Give)
                </button>
                <button type="button" className="picker-buy-btn" onClick={() => handleCreateCustom(true)}>
                  Comprar ({customPrice || "0 PO"})
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* LEFT LIST */}
              <div className="picker-list" role="listbox" aria-label={t("availableOptions")}>
                {items.map((item, index) => {
                  const itemState = item.data?.selectionState ?? "available";
                  const isSelected = selectedIndex === index;
                  const isBlocked = itemState !== "available";
                  const itemLvl = item.data?.level ?? item.data?.rank ?? 0;
                  const profRank = pickerType === "weapon" ? getWeaponProficiencyRank(character, item) : null;

                  return (
                    <button
                      key={`${item.name}-${index}`}
                      ref={(element) => { itemRefs.current[index] = element; }}
                      role="option"
                      aria-selected={isSelected}
                      className={`picker-item ${itemState}${isSelected ? " selected" : ""}${isBlocked ? " blocked" : ""}`}
                      onClick={() => setSelectedIndex(index)}
                      onKeyDown={(event) => {
                        if (event.key === "ArrowDown") {
                          event.preventDefault();
                          const next = (index + 1) % items.length;
                          setSelectedIndex(next);
                          itemRefs.current[next]?.focus();
                        } else if (event.key === "ArrowUp") {
                          event.preventDefault();
                          const prev = (index - 1 + items.length) % items.length;
                          setSelectedIndex(prev);
                          itemRefs.current[prev]?.focus();
                        } else if (event.key === "Enter") {
                          event.preventDefault();
                          confirm(false);
                        }
                      }}
                      type="button"
                    >
                      <div className="picker-item-left">
                        {profRank && (
                          <span className={`picker-prof-badge ${profRank.toLowerCase()}`} title={`Proficiência: ${profRank}`}>
                            {profRank}
                          </span>
                        )}
                        <span className="picker-item-name">
                          {getItemDisplayName(item, locale)}
                        </span>
                      </div>
                      <span className="picker-item-level-box">
                        {itemLvl}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* RIGHT DETAILS PANE */}
              <article className="picker-detail">
                {selectedItem ? (
                  <>
                    <header className="picker-detail-header">
                      <div>
                        <h3>{getItemDisplayName(selectedItem, locale)}</h3>
                        <div style={{ fontSize: "12px", color: "var(--pb-text-muted)", marginTop: "2px" }}>
                          {selectedItem.data?.category ? `${selectedItem.data.category} Weapon` : selectedItem.type}
                        </div>
                      </div>
                      <span className="picker-item-level-box" style={{ fontSize: "13px", padding: "3px 9px" }}>
                        Nível {selectedItem.data?.level ?? selectedItem.data?.rank ?? 0}
                      </span>
                    </header>

                    {/* WEAPON QUICK STATS BAR */}
                    {pickerType === "weapon" && (
                      <div className="picker-weapon-stats-bar">
                        <div className="pws-stat">
                          <span className="pws-label">Dano</span>
                          <strong className="pws-value" style={{ color: "var(--pb-orange)" }}>
                            {String(selectedItem.data?.damage || "1d6")} {selectedItem.data?.damageType ? `(${String(selectedItem.data.damageType)})` : ""}
                          </strong>
                        </div>
                        <div className="pws-stat">
                          <span className="pws-label">Preço</span>
                          <strong className="pws-value" style={{ color: "var(--pb-gold, #f59e0b)" }}>
                            {String(selectedItem.data?.price || "—")}
                          </strong>
                        </div>
                        <div className="pws-stat">
                          <span className="pws-label">Carga</span>
                          <strong className="pws-value">{String(selectedItem.data?.bulk || "1")}</strong>
                        </div>
                        <div className="pws-stat">
                          <span className="pws-label">Mãos</span>
                          <strong className="pws-value">{String(selectedItem.data?.hands || "1")}</strong>
                        </div>
                      </div>
                    )}

                    {/* TRAITS PILLS */}
                    {Array.isArray(selectedItem.data?.traits) && selectedItem.data.traits.length > 0 && (
                      <div className="picker-traits-row">
                        {selectedItem.data.traits.map((trait: string) => (
                          <span key={trait} className="picker-trait-pill">{trait}</span>
                        ))}
                      </div>
                    )}

                    {/* RULE FACTS (SPELLS, ACTIONS, ETC.) */}
                    {ruleFacts.length > 0 && (
                      <div className="picker-traits-row" style={{ marginTop: "4px" }}>
                        {ruleFacts.map((fact) => (
                          <span key={fact} className="picker-trait-pill" style={{ background: "#065f46", borderColor: "#10b981", color: "#a7f3d0" }}>
                            {fact}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* CONFIGURATION SELECTION GROUPS (ANCESTRIES SIZE/HERITAGE) */}
                    {selectionGroups.length > 0 && (
                      <fieldset className="picker-configuration">
                        <legend>{t("configuration")}</legend>
                        {selectionGroups.map((group) => (
                          <label key={group.id}>
                            <span>{t(group.labelKey as MessageKey)}</span>
                            <select
                              aria-label={t(group.labelKey as MessageKey)}
                              value={resolvedSelections[group.id]?.id ?? ""}
                              onChange={(event) => setOptionSelections((current) => ({ ...current, [group.id]: event.target.value }))}
                            >
                              {group.options.map((option) => (
                                <option value={option.id} key={option.id}>
                                  {option.names[locale] ?? option.names["pt-BR"] ?? option.id}
                                </option>
                              ))}
                            </select>
                          </label>
                        ))}
                      </fieldset>
                    )}

                    {resolvedHp !== undefined && (
                      <p style={{ margin: "8px 0", fontSize: "12.5px" }}>
                        {t("baseHp")}: <strong>{resolvedHp}</strong> · {t("landSpeed")}: <strong>{resolvedSpeed ?? 0} {t("feet")}</strong>
                      </p>
                    )}
                    {selectedItem.data?.hpPerLevel && (
                      <p style={{ margin: "8px 0", fontSize: "12.5px" }}>
                        {t("hpPerLevel")}: <strong>{selectedItem.data.hpPerLevel}</strong> · {t("keyAbility")}: <strong>{selectedItem.data.keyAbility?.join(", ")}</strong>
                      </p>
                    )}

                    {/* DESCRIPTION */}
                    <div className="picker-desc">
                      {selectedItem.data?.summaries?.[locale] ?? selectedItem.data?.description ?? t("selectDetails")}
                    </div>

                    {/* SOURCE BOOK */}
                    <div className="picker-source-tag">
                      Fonte: {sourceLabel}
                    </div>
                  </>
                ) : (
                  <p className="picker-empty">{t("selectDetails")}</p>
                )}
              </article>
            </>
          )}
        </div>

        {/* FOOTER */}
        <footer className="picker-footer">
          {isPurchasable ? (
            <>
              <button
                className={`picker-buy-btn ${!isAffordable ? "insufficient-funds" : ""}`}
                onClick={() => confirm(true)}
                disabled={!canConfirm || !isAffordable}
                type="button"
                title={isAffordable ? `Comprar por ${itemPrice} e deduzir da carteira` : `Moedas insuficientes! Custo: ${itemPrice}`}
              >
                Buy ({itemPrice})
              </button>
              <button className="picker-confirm" onClick={() => confirm(false)} disabled={!canConfirm} type="button" title="Adicionar sem deduzir moedas">
                Give
              </button>
              <button className="picker-cancel" onClick={bridge.close} type="button">
                {t("cancel")}
              </button>
              <button
                className="picker-cancel"
                onClick={() => window.open(pickerType === "weapon" ? "https://2e.aonprd.com/Weapons.aspx" : "https://2e.aonprd.com", "_blank")}
                type="button"
              >
                PRD
              </button>
              <button
                className={`picker-cancel ${activeSubTab === "Custom" ? "active" : ""}`}
                onClick={() => setActiveSubTab(activeSubTab === "Custom" ? "Standard" : "Custom")}
                type="button"
              >
                Custom
              </button>

              {/* LIVE COIN PURSE DISPLAY */}
              <div className="picker-footer-coins" title="Sua carteira de moedas atual">
                <span className="coin-indicator">
                  <span className="coin-dot pp" /> {characterCoins.pp || 0} PP
                </span>
                <span className="coin-indicator">
                  <span className="coin-dot gp" /> {characterCoins.gp || 0} GP
                </span>
                <span className="coin-indicator">
                  <span className="coin-dot sp" /> {characterCoins.sp || 0} SP
                </span>
                <span className="coin-indicator">
                  <span className="coin-dot cp" /> {characterCoins.cp || 0} CP
                </span>
              </div>
            </>
          ) : (
            <>
              <button className="picker-confirm" onClick={() => confirm(false)} disabled={!canConfirm} type="button">
                {t("accept")}
              </button>
              <button className="picker-cancel" onClick={bridge.close} type="button">
                {t("cancel")}
              </button>
              <button className="picker-cancel" onClick={() => window.open("https://2e.aonprd.com", "_blank")} type="button">
                PRD
              </button>
              <button className="picker-cancel" onClick={clearSelection} type="button">
                Clear
              </button>
            </>
          )}
        </footer>
      </section>
    </div>
  );
}
