import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { PF2E_ITEMS_CATALOG, type ItemDefinition } from "./data/equipmentData";
import { useI18n, getItemDisplayName, type Locale } from "./i18n";
import { canAffordPrice, deductCoins as deductPurseCoins, coinsToCopper, parsePriceToCopper, formatPriceToLocale } from "./utils/economy";
import "./itemPicker.css";

interface ItemPickerState {
  isOpen: boolean;
  onSelect?: (item: Record<string, unknown>, deductCoins: boolean) => void;
}

const itemPickerCopy: Record<Locale, Record<string, string>> = {
  "pt-BR": { gear: "🎒 Equipamentos", consumables: "🧪 Consumíveis", magicItems: "🔮 Itens Mágicos", all: "📦 Todos", custom: "⚙️ Personalizado", close: "Fechar", allSub: "Todos", adventuring: "Aventura", ammunition: "Munição", toolkits: "Ferramentas", potions: "Poções", elixirs: "Elixires", scrolls: "Pergaminhos", bombs: "Bombas Alquímicas", worn: "Vestíveis", wands: "Varinhas", runes: "Pedras Rúnicas", search: "Pesquisar item...", none: "Nenhum item encontrado nesta categoria.", select: "Selecione um item para ver os detalhes.", customTitle: "Criar Item Personalizado / Caseiro", requiredName: "Nome do Item *", bulk: "Carga (Bulk)", quantity: "Quantidade", estimatedPrice: "Preço Estimado", description: "Descrição / Efeitos Especiais", addInventory: "➕ Adicionar ao Inventário", free: "Adicionar Grátis", buy: "🛒 Comprar (Deduzir Moedas)", wallet: "Bolsa de Moedas:", addQuantity: "Quantidade a Adicionar:", price: "Preço", hands: "Mãos", incompatible: "Este item não é compatível com a ficha atual.", insufficientFunds: "Moedas insuficientes para comprar este item.", namePlaceholder: "Ex: Amuleto dos Ancestrais", bulkPlaceholder: "1, 2, L ou -", pricePlaceholder: "Ex: 25 PO, 5 PP", descriptionPlaceholder: "Anotações sobre propriedades mágicas, histórico ou bônus...", rulesetRemaster: "Remaster", rulesetLegacy: "Legado", rulesetReview: "Revisão pendente", sourceSection: "Referência de seção" },
  en: { gear: "🎒 Gear", consumables: "🧪 Consumables", magicItems: "🔮 Magic Items", all: "📦 All", custom: "⚙️ Custom", close: "Close", allSub: "All", adventuring: "Adventuring", ammunition: "Ammunition", toolkits: "Tools", potions: "Potions", elixirs: "Elixirs", scrolls: "Scrolls", bombs: "Alchemical Bombs", worn: "Worn", wands: "Wands", runes: "Runestones", search: "Search item...", none: "No item found in this category.", select: "Select an item to view its details.", customTitle: "Create Custom / Homebrew Item", requiredName: "Item Name *", bulk: "Bulk", quantity: "Quantity", estimatedPrice: "Estimated Price", description: "Description / Special Effects", addInventory: "➕ Add to Inventory", free: "Add for Free", buy: "🛒 Buy (Deduct Coins)", wallet: "Coin Purse:", addQuantity: "Quantity to Add:", price: "Price", hands: "Hands", incompatible: "This item is not compatible with the current character.", insufficientFunds: "You cannot afford this item.", namePlaceholder: "E.g. Ancestral Amulet", bulkPlaceholder: "1, 2, L, or -", pricePlaceholder: "E.g. 25 GP, 5 SP", descriptionPlaceholder: "Notes about magical properties, history, or bonuses...", rulesetRemaster: "Remaster", rulesetLegacy: "Legacy", rulesetReview: "Review pending", sourceSection: "Section reference" },
  es: { gear: "🎒 Equipo", consumables: "🧪 Consumibles", magicItems: "🔮 Objetos Mágicos", all: "📦 Todos", custom: "⚙️ Personalizado", close: "Cerrar", allSub: "Todos", adventuring: "Aventura", ammunition: "Munición", toolkits: "Herramientas", potions: "Pociones", elixirs: "Elixires", scrolls: "Pergaminos", bombs: "Bombas alquímicas", worn: "Vestibles", wands: "Varitas", runes: "Piedras rúnicas", search: "Buscar objeto...", none: "No se encontró ningún objeto en esta categoría.", select: "Selecciona un objeto para ver sus detalles.", customTitle: "Crear objeto personalizado / casero", requiredName: "Nombre del objeto *", bulk: "Carga (Bulk)", quantity: "Cantidad", estimatedPrice: "Precio estimado", description: "Descripción / Efectos especiales", addInventory: "➕ Añadir al inventario", free: "Añadir gratis", buy: "🛒 Comprar (deducir monedas)", wallet: "Bolsa de monedas:", addQuantity: "Cantidad a añadir:", price: "Precio", hands: "Manos", incompatible: "Este objeto no es compatible con el personaje actual.", insufficientFunds: "No tienes monedas suficientes para comprar este objeto.", namePlaceholder: "Ej.: Amuleto ancestral", bulkPlaceholder: "1, 2, L o -", pricePlaceholder: "Ej.: 25 PO, 5 PP", descriptionPlaceholder: "Notas sobre propiedades mágicas, historia o bonificadores...", rulesetRemaster: "Remaster", rulesetLegacy: "Legado", rulesetReview: "Revisión pendiente", sourceSection: "Referencia de sección" }
};

export function formatItemPrice(price: ItemDefinition["price"] | string | number | undefined, locale: Locale): string {
  if (!price) return "—";
  if (typeof price !== "object") return formatPriceToLocale(price, locale);
  const labels: Record<Locale, { pp: string; gp: string; sp: string; cp: string; zero: string }> = {
    "pt-BR": { pp: "PL", gp: "PO", sp: "PP", cp: "PC", zero: "PO" },
    en: { pp: "PP", gp: "GP", sp: "SP", cp: "CP", zero: "GP" },
    es: { pp: "PP", gp: "PO", sp: "PA", cp: "PC", zero: "PO" },
  };
  const label = labels[locale];
  const parts = [];
  const structuredPrice = price as ItemDefinition["price"] & { pl?: number };
  if (structuredPrice.pp || structuredPrice.pl) parts.push(`${structuredPrice.pp ?? structuredPrice.pl} ${label.pp}`);
  if (price.gp) parts.push(`${price.gp} ${label.gp}`);
  if (price.sp) parts.push(`${price.sp} ${label.sp}`);
  if (price.cp) parts.push(`${price.cp} ${label.cp}`);
  return parts.join(" ") || `0 ${label.zero}`;
}

function formatItemCategory(mainCategory: string, subCategory: string, locale: Locale): string {
  const labels: Record<Locale, Record<string, string>> = {
    "pt-BR": {
      gear: "Equipamentos", consumables: "Consumíveis", magic_items: "Itens Mágicos",
      adventuring: "Aventura", ammunition: "Munição", toolkits: "Ferramentas", potions: "Poções",
      elixirs: "Elixires", bombs: "Bombas Alquímicas", scrolls: "Pergaminhos", worn: "Vestíveis",
      wands: "Varinhas", runes: "Pedras Rúnicas", guns_gears: "Pólvora e Engrenagens"
    },
    en: {
      gear: "Gear", consumables: "Consumables", magic_items: "Magic Items", adventuring: "Adventuring",
      ammunition: "Ammunition", toolkits: "Tools", potions: "Potions", elixirs: "Elixirs", bombs: "Alchemical Bombs",
      scrolls: "Scrolls", worn: "Worn", wands: "Wands", runes: "Runestones", guns_gears: "Guns & Gears"
    },
    es: {
      gear: "Equipo", consumables: "Consumibles", magic_items: "Objetos Mágicos", adventuring: "Aventura",
      ammunition: "Munición", toolkits: "Herramientas", potions: "Pociones", elixirs: "Elixires", bombs: "Bombas alquímicas",
      scrolls: "Pergaminos", worn: "Vestibles", wands: "Varitas", runes: "Piedras rúnicas", guns_gears: "Pólvora y Engranajes"
    }
  };
  const dictionary = labels[locale];
  return `${dictionary[mainCategory] || mainCategory} · ${dictionary[subCategory] || subCategory}`;
}

const itemIdentityKeys = (item: ItemDefinition) => [item.id, item.name, item.names?.["pt-BR"], item.names?.en, item.names?.es]
  .filter(Boolean)
  .flatMap((value) => {
    const normalized = String(value).toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    const simplified = normalized
      .replace(/\([^)]*\)/g, " ")
      .replace(/\b(companion|mount|familiar|animal|mascota|montura)\b/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return [normalized, simplified].filter(Boolean);
  });

type ItemCatalogRecord = ItemDefinition & { prerequisites?: unknown[] };

const itemRichnessScore = (item: ItemCatalogRecord) =>
  Object.values(item.names || {}).filter(Boolean).length * 3
  + Object.values(item.summaries || {}).filter(Boolean).length * 3
  + (item.source?.book ? 2 : 0)
  + (Number.isInteger(item.source?.page) ? 2 : 0)
  + (item.description ? 2 : 0)
  + [item.traits, item.prerequisites].filter((field) => Array.isArray(field) && field.length > 0).length;

export function mergeItemCatalogRecords(records: ItemDefinition[]): ItemDefinition[] {
  const merged: ItemCatalogRecord[] = [];
  const seen = new Map<string, number[]>();
  for (const rawItem of records) {
    const item = rawItem as ItemCatalogRecord;
    if (!item || String(item.id || "").includes(".legacy_alias.")) continue;
    const keys = itemIdentityKeys(item);
    const existingIndex = keys
      .flatMap((key) => seen.get(key) || [])
      .find((index, position, candidates) => candidates.indexOf(index) === position
        && (!merged[index]?.id || !item.id || merged[index].id === item.id));
    if (existingIndex === undefined) {
      const index = merged.push(item) - 1;
      keys.forEach((key) => seen.set(key, [...new Set([...(seen.get(key) || []), index])]));
      continue;
    }
    const existing = merged[existingIndex];
    const preferred = itemRichnessScore(item) > itemRichnessScore(existing) ? item : existing;
    const fallback = preferred === item ? existing : item;
    merged[existingIndex] = {
      ...fallback,
      ...preferred,
      id: existing.id || item.id,
      names: { ...(fallback.names || {}), ...(preferred.names || {}) },
      summaries: { ...(fallback.summaries || {}), ...(preferred.summaries || {}) },
      source: { ...(fallback.source || {}), ...(preferred.source || {}) },
      traits: (preferred.traits?.length || 0) >= (fallback.traits?.length || 0) ? preferred.traits : fallback.traits,
      prerequisites: (preferred.prerequisites?.length || 0) >= (fallback.prerequisites?.length || 0) ? preferred.prerequisites : fallback.prerequisites,
    } as ItemCatalogRecord;
    itemIdentityKeys(merged[existingIndex]).forEach((key) => seen.set(key, [...new Set([...(seen.get(key) || []), existingIndex])]));
  }
  return merged;
}

export function ItemPickerModal({ onBridgeReady }: { onBridgeReady?: (bridge: { open: (cb?: any) => void; close: () => void }) => void } = {}) {
  const { locale, t } = useI18n();
  const copy = itemPickerCopy[locale];
  const [modalState, setModalState] = useState<ItemPickerState>({ isOpen: false });
  const [mainTab, setMainTab] = useState<"gear" | "consumables" | "magic_items" | "all" | "custom">("gear");
  const [subTab, setSubTab] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string>(PF2E_ITEMS_CATALOG[0]?.id || "");
  const [quantity, setQuantity] = useState<number>(1);
  const [purchasePool, setPurchasePool] = useState<Array<{ item: ItemDefinition; qty: number }>>([]);

  // Custom Item Form State
  const [customName, setCustomName] = useState("");
  const [customBulk, setCustomBulk] = useState("1");
  const [customQty, setCustomQty] = useState(1);
  const [customPrice, setCustomPrice] = useState("");
  const [customDesc, setCustomDesc] = useState("");
  const [characterRevision, setCharacterRevision] = useState(0);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const bridge = {
      open: (callback?: (item: any, deductCoins: boolean) => void) => {
        returnFocusRef.current = document.activeElement as HTMLElement | null;
        setModalState({ isOpen: true, onSelect: callback });
        setQuantity(1);
        setPurchasePool([]);
        setQuery("");
        setTimeout(() => searchInputRef.current?.focus(), 50);
      },
      close: () => setModalState({ isOpen: false })
    };
    (window as any).pathbuilderItemPicker = bridge;
    onBridgeReady?.(bridge);
  }, [onBridgeReady]);

  // A ficha é mantida pelo bridge legado; este sinal mantém a lista filtrada
  // sincronizada quando os pré-requisitos mudam sem remontar o componente.
  useEffect(() => {
    const refresh = () => setCharacterRevision((revision) => revision + 1);
    window.addEventListener("pathbuilder:character-render", refresh);
    return () => window.removeEventListener("pathbuilder:character-render", refresh);
  }, []);

  useEffect(() => {
    if (!modalState.isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFirst = () => {
      (searchInputRef.current || dialogRef.current?.querySelector<HTMLElement>("button, input, textarea, [tabindex]:not([tabindex='-1'])"))?.focus();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setModalState({ isOpen: false });
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
        "button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])",
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
    };
    requestAnimationFrame(focusFirst);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      returnFocusRef.current?.focus();
    };
  }, [modalState.isOpen]);

  const items = useMemo(() => {
    const character = (window as any).app?.character;
    const checker = (window as any).PF2E_ENGINE?.getPrerequisiteCompatibility;
    const legacyCatalog = [
      ...(((window as any).PF2E_DATA?.items || []) as any[]),
      ...(((window as any).PF2E_DATA?.itemCompendium || []) as any[]),
    ].map((item) => ({
      ...item,
      mainCategory: item.mainCategory || "gear",
      subCategory: item.subCategory || "catalog",
      level: Number.isFinite(Number(item.level)) ? Number(item.level) : 0,
      price: item.price && typeof item.price === "object" ? item.price : {},
      bulk: String(item.bulk ?? "-"),
      traits: Array.isArray(item.traits) ? item.traits : [],
      description: String(item.description || item.summaries?.[locale] || ""),
    })) as ItemDefinition[];
    const catalog = mergeItemCatalogRecords([...PF2E_ITEMS_CATALOG, ...legacyCatalog]);
    const seenLabels = new Set<string>();
    return catalog.filter((item) => {
      if (typeof checker === "function" && checker.call((window as any).PF2E_ENGINE, character, item as any)?.state === "incompatible") return false;
      const matchMain = mainTab === "all" || item.mainCategory === mainTab;
      const matchSub = subTab === "all" || item.subCategory === subTab;
      const localizedName = getItemDisplayName(item as any, locale);
      const localizedNames = Object.values(item.names || {}).join(" ");
      const searchTarget = `${localizedName} ${localizedNames} ${item.name} ${item.description}`.toLocaleLowerCase(locale);
      const matchQuery = !query.trim() || searchTarget.includes(query.trim().toLowerCase());
      const dedupeKey = localizedName.toLocaleLowerCase(locale).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (seenLabels.has(dedupeKey)) return false;
      if (matchMain && matchSub && matchQuery) { seenLabels.add(dedupeKey); return true; }
      return false;
    }).sort((a, b) => {
      const nameA = getItemDisplayName(a as any, locale);
      const nameB = getItemDisplayName(b as any, locale);
      return nameA.localeCompare(nameB, locale, { sensitivity: "base", numeric: true });
    });
  }, [mainTab, subTab, query, locale, (window as any).app?.character, characterRevision]);

  useEffect(() => {
    if (!items.some((item) => item.id === selectedId)) {
      setSelectedId(items[0]?.id || "");
    }
  }, [items, selectedId]);

  const selectedItem = useMemo(() => {
    return items.find((item) => item.id === selectedId) || items[0] || null;
  }, [selectedId, items]);

  const handleAddOrBuy = (deductCoins: boolean) => {
    if (!selectedItem) return;
    const checker = (window as any).PF2E_ENGINE?.getPrerequisiteCompatibility;
    const character = (window as any).app?.character;
    if (typeof checker === "function" && checker.call((window as any).PF2E_ENGINE, character, selectedItem as any)?.state === "incompatible") {
      window.alert(copy.incompatible);
      return;
    }
    const localizedName = getItemDisplayName(selectedItem as any, locale);
    const itemData = {
      ...selectedItem,
      name: localizedName,
      qty: Math.max(1, quantity),
      bulk: selectedItem.bulk,
      price: formatItemPrice(selectedItem.price, locale),
      description: selectedItem.description,
      rawPrice: selectedItem.price
    };

    if (modalState.onSelect) {
      modalState.onSelect(itemData, deductCoins);
    } else {
      // Direct integration with app
      const app = (window as any).app;
      if (app && app.character) {
        const charCoins = app.character.coins || { gp: 0, sp: 0, cp: 0, pp: 0 };
        if (deductCoins && selectedItem.price && !canAffordPrice(charCoins, selectedItem.price, itemData.qty, locale)) {
          window.alert(copy.insufficientFunds);
          return;
        }
        // Prefer the shared bridge. Keep the small fallback for older hosts that
        // expose only character/render methods, preserving the public contract.
        if (typeof app.applyPickerSelection === "function") {
          app.applyPickerSelection("item", { name: itemData.name, data: itemData }, undefined, deductCoins);
        } else {
          app.character.inventory.push({ ...itemData });
          if (deductCoins && selectedItem.price) {
            app.character.coins = deductPurseCoins(charCoins, selectedItem.price, itemData.qty, locale);
          }
          app.saveCharacterLocal?.(false);
          app.renderAll?.();
        }
      }
    }
    setModalState({ isOpen: false });
  };

  const addSelectedToPurchasePool = () => {
    if (!selectedItem) return;
    setPurchasePool((pool) => {
      const existing = pool.find((entry) => entry.item.id === selectedItem.id);
      if (existing) return pool.map((entry) => entry.item.id === selectedItem.id ? { ...entry, qty: entry.qty + quantity } : entry);
      return [...pool, { item: selectedItem, qty: quantity }];
    });
  };

  const purchasePoolTotal = purchasePool.reduce((total, entry) => total + parsePriceToCopper(entry.item.price, locale) * entry.qty, 0);

  const updatePurchasePoolQuantity = (id: string, delta: number) => {
    setPurchasePool((pool) => pool
      .map((entry) => entry.item.id === id ? { ...entry, qty: entry.qty + delta } : entry)
      .filter((entry) => entry.qty > 0));
  };

  const commitPurchasePool = () => {
    const entries = purchasePool.length ? purchasePool : selectedItem ? [{ item: selectedItem, qty: quantity }] : [];
    if (!entries.length) return;
    const currentCoins = (window as any).app?.character?.coins || { pp: 0, gp: 0, sp: 0, cp: 0 };
    const total = entries.reduce((sum, entry) => sum + parsePriceToCopper(entry.item.price, locale) * entry.qty, 0);
    if (coinsToCopper(currentCoins) < total) {
      window.alert(copy.insufficientFunds);
      return;
    }
    for (const entry of entries) {
      const itemData = { ...entry.item, name: getItemDisplayName(entry.item as any, locale), qty: entry.qty, rawPrice: entry.item.price, price: formatItemPrice(entry.item.price, locale) };
      if (modalState.onSelect) modalState.onSelect(itemData, true);
      else {
        const app = (window as any).app;
        if (typeof app?.applyPickerSelection === "function") app.applyPickerSelection("item", { name: itemData.name, data: itemData }, undefined, true);
        else if (app?.character) {
          app.character.inventory = Array.isArray(app.character.inventory) ? app.character.inventory : [];
          app.character.inventory.push(itemData);
          app.character.coins = deductPurseCoins(app.character.coins, entry.item.price, entry.qty, locale);
          app.saveCharacterLocal?.(false);
          app.renderAll?.();
        }
      }
    }
    setPurchasePool([]);
    setModalState({ isOpen: false });
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    const customId = `item.custom.${Date.now()}`;
    const itemData = {
      id: customId,
      name: customName.trim(),
      names: { "pt-BR": customName.trim(), en: customName.trim(), es: customName.trim() },
      qty: Math.max(1, customQty),
      bulk: customBulk.trim() || "1",
      price: customPrice.trim() || "—",
      description: customDesc.trim(),
      summaries: { "pt-BR": customDesc.trim(), en: customDesc.trim(), es: customDesc.trim() },
      custom: true,
      ruleset: "needs_review",
      needs_review: true
    };
    const app = (window as any).app;
    if (app && app.character) {
      if (typeof app.applyPickerSelection === "function") {
        app.applyPickerSelection("item", { name: itemData.name, data: itemData }, undefined, false);
      } else {
        app.character.inventory.push(itemData);
        app.saveCharacterLocal?.(false);
        app.renderAll?.();
      }
    }
    setCustomName("");
    setCustomDesc("");
    setModalState({ isOpen: false });
  };

  if (!modalState.isOpen) return null;

  const app = (window as any).app;
  const coins = app?.character?.coins || { gp: 15, sp: 0, cp: 0, pp: 0 };

  return (
    <div className="item-picker-backdrop" onClick={() => setModalState({ isOpen: false })}>
      <div ref={dialogRef} className="item-picker-dialog" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="item-picker-title">
        {/* Header Tabs */}
        <header className="item-picker-header">
          <h2 id="item-picker-title" className="sr-only">{mainTab === "custom" ? copy.customTitle : copy.search}</h2>
          <div className="item-picker-main-tabs">
            <button
              className={`main-tab-btn ${mainTab === "gear" ? "active" : ""}`}
              onClick={() => { setMainTab("gear"); setSubTab("all"); }}
            >
              {copy.gear}
            </button>
            <button
              className={`main-tab-btn ${mainTab === "consumables" ? "active" : ""}`}
              onClick={() => { setMainTab("consumables"); setSubTab("all"); }}
            >
              {copy.consumables}
            </button>
            <button
              className={`main-tab-btn ${mainTab === "magic_items" ? "active" : ""}`}
              onClick={() => { setMainTab("magic_items"); setSubTab("all"); }}
            >
              {copy.magicItems}
            </button>
            <button
              className={`main-tab-btn ${mainTab === "all" ? "active" : ""}`}
              onClick={() => { setMainTab("all"); setSubTab("all"); }}
            >
              {copy.all}
            </button>
            <button
              className={`main-tab-btn custom-tab-highlight ${mainTab === "custom" ? "active" : ""}`}
              onClick={() => setMainTab("custom")}
            >
              {copy.custom}
            </button>
          </div>
          <button className="item-picker-close-x" aria-label={copy.close} onClick={() => setModalState({ isOpen: false })}>✕</button>
        </header>

        {/* Sub-Tabs Bar */}
        {mainTab !== "custom" && (
          <div className="item-picker-subtabs">
            <button className={`subtab-btn ${subTab === "all" ? "active" : ""}`} onClick={() => setSubTab("all")}>
              {copy.allSub}
            </button>
            {mainTab === "gear" && (
              <>
                <button className={`subtab-btn ${subTab === "adventuring" ? "active" : ""}`} onClick={() => setSubTab("adventuring")}>
                  {copy.adventuring}
                </button>
                <button className={`subtab-btn ${subTab === "ammunition" ? "active" : ""}`} onClick={() => setSubTab("ammunition")}>
                  {copy.ammunition}
                </button>
                <button className={`subtab-btn ${subTab === "toolkits" ? "active" : ""}`} onClick={() => setSubTab("toolkits")}>
                  {copy.toolkits}
                </button>
              </>
            )}
            {mainTab === "consumables" && (
              <>
                <button className={`subtab-btn ${subTab === "potions" ? "active" : ""}`} onClick={() => setSubTab("potions")}>
                  {copy.potions}
                </button>
                <button className={`subtab-btn ${subTab === "elixirs" ? "active" : ""}`} onClick={() => setSubTab("elixirs")}>
                  {copy.elixirs}
                </button>
                <button className={`subtab-btn ${subTab === "scrolls" ? "active" : ""}`} onClick={() => setSubTab("scrolls")}>
                  {copy.scrolls}
                </button>
                <button className={`subtab-btn ${subTab === "bombs" ? "active" : ""}`} onClick={() => setSubTab("bombs")}>
                  {copy.bombs}
                </button>
              </>
            )}
            {mainTab === "magic_items" && (
              <>
                <button className={`subtab-btn ${subTab === "worn" ? "active" : ""}`} onClick={() => setSubTab("worn")}>
                  {copy.worn}
                </button>
                <button className={`subtab-btn ${subTab === "wands" ? "active" : ""}`} onClick={() => setSubTab("wands")}>
                  {copy.wands}
                </button>
                <button className={`subtab-btn ${subTab === "runes" ? "active" : ""}`} onClick={() => setSubTab("runes")}>
                  {copy.runes}
                </button>
              </>
            )}
            <div className="item-picker-search-wrap">
              <input
                ref={searchInputRef}
                type="search"
                placeholder={copy.search}
                aria-label={copy.search}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="item-search-input"
              />
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="item-picker-body">
          {mainTab === "custom" ? (
            <form className="custom-item-form" onSubmit={handleAddCustom}>
              <h3>{copy.customTitle}</h3>
              <div className="form-row-2">
                <label>
                  <span>{copy.requiredName}</span>
                  <input
                    type="text"
                    required
                    placeholder={copy.namePlaceholder}
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                  />
                </label>
                <label>
                  <span>{copy.bulk}</span>
                  <input
                    type="text"
                    placeholder={copy.bulkPlaceholder}
                    value={customBulk}
                    onChange={(e) => setCustomBulk(e.target.value)}
                  />
                </label>
              </div>
              <div className="form-row-2">
                <label>
                  <span>{copy.quantity}</span>
                  <input
                    type="number"
                    min="1"
                    value={customQty}
                    onChange={(e) => setCustomQty(parseInt(e.target.value, 10) || 1)}
                  />
                </label>
                <label>
                  <span>{copy.estimatedPrice}</span>
                  <input
                    type="text"
                    placeholder={copy.pricePlaceholder}
                    value={customPrice}
                    onChange={(e) => setCustomPrice(e.target.value)}
                  />
                </label>
              </div>
              <label>
                <span>{copy.description}</span>
                <textarea
                  rows={4}
                  placeholder={copy.descriptionPlaceholder}
                  value={customDesc}
                  onChange={(e) => setCustomDesc(e.target.value)}
                />
              </label>
              <div className="custom-form-actions">
                <button type="submit" className="btn-buy-action">{copy.addInventory}</button>
              </div>
            </form>
          ) : (
            <div className="item-picker-split">
              {/* Left Column: Items List */}
              <div className="item-picker-list">
                {items.length === 0 ? (
                  <div className="item-empty-msg">{copy.none}</div>
                ) : (
                  items.map((item) => {
                    const isSel = (selectedItem?.id === item.id);
                    const displayName = getItemDisplayName(item as any, locale);
                    return (
                        <button
                          type="button"
                          key={item.id}
                          className={`item-row-card ${isSel ? "selected" : ""}`}
                          aria-pressed={isSel}
                          aria-label={displayName}
                          onClick={() => setSelectedId(item.id)}
                        >
                        <div className="item-row-main">
                          <span className="item-row-name">{displayName}</span>
                          <span className="item-row-meta">
                            {item.level > 0 && <span className="item-level-tag">Nv {item.level}</span>}
                            <span className="item-bulk-tag">{copy.bulk} {item.bulk}</span>
                          </span>
                        </div>
                        <div className="item-row-price">{formatItemPrice(item.price, locale)}</div>
                        </button>
                    );
                  })
                )}
              </div>

              {/* Right Column: Selected Item Detail */}
              <div className="item-picker-detail">
                {selectedItem ? (
                  <div className="item-detail-inner">
                    <div className="detail-header">
                      <span className="detail-category">{formatItemCategory(selectedItem.mainCategory, selectedItem.subCategory, locale)}</span>
                      {selectedItem.level > 0 && <span className="item-level-tag">{locale === "en" ? "Level" : locale === "es" ? "Nivel" : "Nível"} {selectedItem.level}</span>}
                    </div>
                    <h2 className="detail-title">{getItemDisplayName(selectedItem as any, locale)}</h2>
                    <div className="detail-specs-grid">
                      <div className="spec-card">
                        <span className="spec-label">{copy.price}</span>
                        <span className="spec-val" style={{ color: "var(--pb-gold, #f59e0b)" }}>{formatItemPrice(selectedItem.price, locale)}</span>
                      </div>
                      <div className="spec-card">
                        <span className="spec-label">{copy.bulk}</span>
                        <span className="spec-val">{selectedItem.bulk}</span>
                      </div>
                      <div className="spec-card">
                        <span className="spec-label">{copy.hands}</span>
                        <span className="spec-val">{selectedItem.hands || "—"}</span>
                      </div>
                    </div>

                    {selectedItem.traits.length > 0 && (
                      <div className="detail-traits">
                        {selectedItem.traits.map((tr) => (
                          <span key={tr} className="item-trait-badge">{tr}</span>
                        ))}
                      </div>
                    )}

                    <div className="detail-desc">
                      <p>{selectedItem.description}</p>
                    </div>

                    {selectedItem.source && (
                      <div className="detail-source">
                        📖 {selectedItem.source.book} {selectedItem.source.page ? `· p. ${selectedItem.source.page}` : ""}
                        <span className={`source-badge ${selectedItem.ruleset === "legacy" ? "legacy" : selectedItem.ruleset === "remaster" && selectedItem.needs_review === false ? "verified" : "review"}`}>
                          {selectedItem.ruleset === "legacy" ? copy.rulesetLegacy : selectedItem.ruleset === "remaster" && selectedItem.needs_review === false ? copy.rulesetRemaster : copy.rulesetReview}
                        </span>
                        {selectedItem.sourceApproximate && <span className="source-badge review">{copy.sourceSection}</span>}
                      </div>
                    )}

                    <div className="detail-qty-control">
                      <span style={{ fontSize: "12px", color: "var(--pb-text-muted)" }}>{copy.addQuantity}</span>
                      <div className="qty-stepper">
                        <button type="button" aria-label={`${copy.addQuantity} -`} onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                        <input
                          type="number"
                          min="1"
                          aria-label={copy.addQuantity}
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                        />
                        <button type="button" onClick={() => setQuantity(quantity + 1)}>+</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="item-empty-msg">{copy.select}</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Bar */}
        {(() => {
          const coins = (window as any).app?.character?.coins || { pp: 0, gp: 15, sp: 0, cp: 0 };
          const canAfford = purchasePool.length > 0
            ? coinsToCopper(coins) >= purchasePoolTotal
            : canAffordPrice(coins, selectedItem?.price, quantity, locale);
          const priceText = formatItemPrice(selectedItem?.price, locale);
          const coinLabels = locale === "pt-BR"
            ? { pp: "PL", gp: "PO", sp: "PP", cp: "PC", buy: "Comprar por", insufficient: "Moedas insuficientes! Custo:" }
            : locale === "en"
              ? { pp: "PP", gp: "GP", sp: "SP", cp: "CP", buy: "Buy for", insufficient: "Insufficient coins! Cost:" }
              : { pp: "PP", gp: "PO", sp: "PA", cp: "PC", buy: "Comprar por", insufficient: "¡Monedas insuficientes! Coste:" };
          return (
            <footer className="item-picker-footer">
              <div className="character-wallet">
                <span className="wallet-label">{copy.wallet}</span>
                <span className="coin-tag pp">⚪ {coins.pp || 0} {coinLabels.pp}</span>
                <span className="coin-tag gp">🟡 {coins.gp || 0} {coinLabels.gp}</span>
                <span className="coin-tag sp">⚪ {coins.sp || 0} {coinLabels.sp}</span>
                <span className="coin-tag cp">🟤 {coins.cp || 0} {coinLabels.cp}</span>
              </div>

              {purchasePool.length > 0 && (
                <div className="purchase-pool" aria-label={locale === "en" ? "Purchase pool" : locale === "es" ? "Carrito de compra" : "Pool de compras"}>
                  {purchasePool.map((entry) => (
                    <div className="purchase-pool-row" key={entry.item.id}>
                      <span>{getItemDisplayName(entry.item as any, locale)}</span>
                      <button type="button" onClick={() => updatePurchasePoolQuantity(entry.item.id, -1)} aria-label="-">−</button>
                      <strong>{entry.qty}</strong>
                      <button type="button" onClick={() => updatePurchasePoolQuantity(entry.item.id, 1)} aria-label="+">+</button>
                      <small>{formatPriceToLocale(parsePriceToCopper(entry.item.price, locale) * entry.qty, locale)}</small>
                    </div>
                  ))}
                </div>
              )}

              <div className="picker-footer-actions">
                <button className="btn-secondary" onClick={() => setModalState({ isOpen: false })}>
                  {copy.close}
                </button>
                {mainTab !== "custom" && (
                  <>
                    <button className="btn-add-free" onClick={addSelectedToPurchasePool}>
                      {locale === "pt-BR" ? "Adicionar ao pool" : locale === "en" ? "Add to purchase pool" : "Añadir al carrito"}
                    </button>
                    <button className="btn-secondary" onClick={() => handleAddOrBuy(false)}>
                      {copy.free}
                    </button>
                    <button
                      className={`btn-buy-action ${!canAfford ? "disabled-funds" : ""}`}
                      onClick={commitPurchasePool}
                      disabled={!canAfford}
                      title={canAfford ? `${coinLabels.buy} ${priceText}` : `${coinLabels.insufficient} ${priceText}`}
                    >
                      {copy.buy} — {purchasePool.length ? formatPriceToLocale(purchasePoolTotal, locale) : priceText}
                    </button>
                    {purchasePool.length > 0 && <span className="purchase-pool-summary">{purchasePool.length} {locale === "en" ? "item groups" : locale === "es" ? "grupos" : "grupos"} · {formatPriceToLocale(purchasePoolTotal, locale)}</span>}
                  </>
                )}
              </div>
            </footer>
          );
        })()}
      </div>
    </div>
  );
}
