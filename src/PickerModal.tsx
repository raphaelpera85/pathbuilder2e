import { useEffect, useMemo, useRef, useState } from "react";
import type { PickerBridge, PickerItem, PickerSelectionOption, PickerType } from "./types";
import { useI18n, getItemDisplayName, type MessageKey } from "./i18n";

const pickerLabelKeys: Record<PickerType, MessageKey> = {
  ancestry: "ancestries", class: "classes", background: "backgrounds", weapon: "weapons", armor: "armors",
  heritage: "heritages", archetype: "archetypes", spell: "spells", ritual: "rituals", feat: "feats", condition: "conditions", buff: "buffs",
};

interface PickerModalProps {
  onBridgeReady?: (bridge: PickerBridge) => void;
}

export function PickerModal({ onBridgeReady }: PickerModalProps) {
  const { locale, t } = useI18n();
  const [pickerType, setPickerType] = useState<PickerType | null>(null);
  const [pickerOptions, setPickerOptions] = useState<import("./types").IPickerOpenOptions | undefined>();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [optionSelections, setOptionSelections] = useState<Record<string, string>>({});
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
    const filtered = rawItems.filter((item) => {
      const localizedName = getItemDisplayName(item, locale);
      const localizedSummary = item.data.summaries?.[locale] ?? item.data.description ?? "";
      return `${localizedName} ${item.name} ${localizedSummary}`.toLocaleLowerCase(locale).includes(needle);
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
  }, [locale, pickerOptions, pickerType, query]);

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
    : t("uncatalogued");
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

  const confirm = () => {
    if (!selectedItem || selectedState !== "available") return;
    const selection = Object.fromEntries(selectionGroups.map((group) => [group.id, resolvedSelections[group.id]?.id ?? group.options[0]?.id]));
    const itemPayload = { ...selectedItem, ...(selectionGroups.length ? { selection } : {}) };
    if (pickerOptions) {
      window.app.applyPickerSelection(pickerType, itemPayload, pickerOptions);
    } else {
      window.app.applyPickerSelection(pickerType, itemPayload);
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
        <header className="picker-nav">
          <div className="picker-heading">
            <span className="picker-kicker">{t("pickerCompendium")}</span>
            <strong>{t(pickerLabelKeys[pickerType])}</strong>
          </div>
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
            <span aria-hidden="true">🔍</span>
          </label>
        </header>

        <div className="picker-content">
          <div className="picker-list" role="listbox" aria-label={t("availableOptions")}>
            {items.map((item, index) => {
              const itemState = item.data.selectionState ?? "available";
              const itemMessage = item.data.selectionMessages?.[locale] ?? item.data.selectionMessages?.["pt-BR"] ?? "";
              const isSelected = selectedIndex === index;
              const isBlocked = itemState !== "available";
              return (
                <button
                  ref={(element) => { itemRefs.current[index] = element; }}
                  className={`picker-item ${itemState}${isSelected ? " selected" : ""}`}
                  key={`${item.type}-${item.name}`}
                  onClick={() => setSelectedIndex(index)}
                  onKeyDown={(event) => {
                    let nextIndex = index;
                    if (event.key === "ArrowDown") nextIndex = Math.min(items.length - 1, index + 1);
                    else if (event.key === "ArrowUp") nextIndex = Math.max(0, index - 1);
                    else if (event.key === "Home") nextIndex = 0;
                    else if (event.key === "End") nextIndex = items.length - 1;
                    else if (event.key === "Enter") {
                      event.preventDefault();
                      confirm();
                      return;
                    } else return;
                    event.preventDefault();
                    setSelectedIndex(nextIndex);
                    itemRefs.current[nextIndex]?.focus();
                  }}
                  role="option"
                  aria-disabled={isBlocked}
                  aria-selected={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  type="button"
                >
                  <span className="picker-item-icon" aria-hidden="true">📜</span>
                  <span className="picker-option-text">
                    <span>{getItemDisplayName(item, locale)}</span>
                    {isBlocked && itemMessage && <small className="picker-option-status">{itemMessage}</small>}
                  </span>
                </button>
              );
            })}
          </div>

          <article className="picker-detail">
            {items.length === 0 ? (
              <div className="picker-empty-state" role="status" aria-live="polite">
                <span aria-hidden="true">⌕</span>
                <strong>{t("noOption")}</strong>
                <p>{t("searchAnother")}</p>
              </div>
            ) : selectedItem ? (
              <>
                <h3>{getItemDisplayName(selectedItem, locale)}</h3>
                {rarity && <span className={`picker-rarity ${String(selectedItem.data.rarity)}`}>{rarity}</span>}
                {selectedState !== "available" && selectedMessage && <p className="picker-compatibility-note">{selectedMessage}</p>}
                {(selectedItem.data.summaries?.[locale] ?? selectedItem.data.description) && <p>{selectedItem.data.summaries?.[locale] ?? selectedItem.data.description}</p>}
                {ruleFacts.length > 0 && <dl className="picker-rule-facts">{ruleFacts.map((fact) => <div key={fact}><dd>{fact}</dd></div>)}</dl>}
                {selectionGroups.length > 0 && <fieldset className="picker-configuration">
                  <legend>{t("configuration")}</legend>
                  {selectionGroups.map((group) => <label key={group.id}>
                    <span>{t(group.labelKey as MessageKey)}</span>
                    <select value={resolvedSelections[group.id]?.id ?? ""} onChange={(event) => setOptionSelections((current) => ({ ...current, [group.id]: event.target.value }))}>
                      {group.options.map((option) => <option value={option.id} key={option.id}>{option.names[locale] ?? option.names["pt-BR"] ?? option.id}</option>)}
                    </select>
                  </label>)}
                </fieldset>}
                {resolvedHp !== undefined && (
                  <p>{t("baseHp")}: <strong>{resolvedHp}</strong> · {t("landSpeed")}: <strong>{resolvedSpeed ?? 0} {t("feet")}</strong>{resolvedHeritage?.swimSpeed !== undefined && <> · {t("swimSpeed")}: <strong>{resolvedHeritage.swimSpeed} {t("feet")}</strong></>}{resolvedHeritage?.climbSpeed !== undefined && <> · {t("climbSpeed")}: <strong>{resolvedHeritage.climbSpeed} {t("feet")}</strong></>}</p>
                )}
                {selectedItem.data.hpPerLevel && (
                  <p>{t("hpPerLevel")}: <strong>{selectedItem.data.hpPerLevel}</strong> · {t("keyAbility")}: <strong>{selectedItem.data.keyAbility?.join(", ")}</strong></p>
                )}
                {selectedItem.data.damage && (
                  <p>{t("damage")}: <strong>{selectedItem.data.damage} {selectedItem.data.damageType}</strong> · {t("traits")}: <strong>{selectedItem.data.traits?.join(", ")}</strong></p>
                )}
                <small className="picker-source">{t("source")}: {sourceLabel}</small>
              </>
            ) : (
              <p className="picker-empty">{t("selectDetails")}</p>
            )}
          </article>
        </div>

        <footer className="picker-footer">
          <button className="picker-confirm" onClick={confirm} disabled={!canConfirm} type="button">{t("accept")}</button>
          <button className="picker-cancel" onClick={bridge.close} type="button">{t("cancel")}</button>
        </footer>
      </section>
    </div>
  );
}
