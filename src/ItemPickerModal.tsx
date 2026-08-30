import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { PF2E_ITEMS_CATALOG, type ItemDefinition } from "./data/equipmentData";
import { useI18n, getItemDisplayName, type Locale } from "./i18n";
import { canAffordPrice, deductCoins as deductPurseCoins, coinsToCopper } from "./utils/economy";
import "./itemPicker.css";

interface ItemPickerState {
  isOpen: boolean;
  onSelect?: (item: { name: string; qty: number; bulk: string; price?: string; description?: string }, deductCoins: boolean) => void;
}

export function ItemPickerModal({ onBridgeReady }: { onBridgeReady?: (bridge: { open: (cb?: any) => void; close: () => void }) => void } = {}) {
  const { locale, t } = useI18n();
  const [modalState, setModalState] = useState<ItemPickerState>({ isOpen: false });
  const [mainTab, setMainTab] = useState<"gear" | "consumables" | "magic_items" | "all" | "custom">("gear");
  const [subTab, setSubTab] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string>(PF2E_ITEMS_CATALOG[0]?.id || "");
  const [quantity, setQuantity] = useState<number>(1);

  // Custom Item Form State
  const [customName, setCustomName] = useState("");
  const [customBulk, setCustomBulk] = useState("1");
  const [customQty, setCustomQty] = useState(1);
  const [customPrice, setCustomPrice] = useState("");
  const [customDesc, setCustomDesc] = useState("");

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const bridge = {
      open: (callback?: (item: any, deductCoins: boolean) => void) => {
        setModalState({ isOpen: true, onSelect: callback });
        setQuantity(1);
        setQuery("");
        setTimeout(() => searchInputRef.current?.focus(), 50);
      },
      close: () => setModalState({ isOpen: false })
    };
    (window as any).pathbuilderItemPicker = bridge;
    onBridgeReady?.(bridge);
  }, [onBridgeReady]);

  const items = useMemo(() => {
    return PF2E_ITEMS_CATALOG.filter((item) => {
      const matchMain = mainTab === "all" || item.mainCategory === mainTab;
      const matchSub = subTab === "all" || item.subCategory === subTab;
      const localizedName = getItemDisplayName(item as any, locale);
      const searchTarget = `${localizedName} ${item.name} ${item.description}`.toLowerCase();
      const matchQuery = !query.trim() || searchTarget.includes(query.trim().toLowerCase());
      return matchMain && matchSub && matchQuery;
    }).sort((a, b) => {
      const nameA = getItemDisplayName(a as any, locale);
      const nameB = getItemDisplayName(b as any, locale);
      return nameA.localeCompare(nameB, locale, { sensitivity: "base", numeric: true });
    });
  }, [mainTab, subTab, query, locale]);

  const selectedItem = useMemo(() => {
    return PF2E_ITEMS_CATALOG.find((i) => i.id === selectedId) || items[0] || null;
  }, [selectedId, items]);

  const formatPrice = (price?: ItemDefinition["price"]) => {
    if (!price) return "—";
    const parts = [];
    if (price.pp) parts.push(`${price.pp} PP`);
    if (price.gp) parts.push(`${price.gp} PO`);
    if (price.sp) parts.push(`${price.sp} PP`);
    if (price.cp) parts.push(`${price.cp} PC`);
    return parts.join(" ") || "0 PO";
  };

  const handleAddOrBuy = (deductCoins: boolean) => {
    if (!selectedItem) return;
    const localizedName = getItemDisplayName(selectedItem as any, locale);
    const itemData = {
      name: localizedName,
      qty: Math.max(1, quantity),
      bulk: selectedItem.bulk,
      price: formatPrice(selectedItem.price),
      description: selectedItem.description,
      rawPrice: selectedItem.price
    };

    if (modalState.onSelect) {
      modalState.onSelect(itemData, deductCoins);
    } else {
      // Direct integration with app
      const app = (window as any).app;
      if (app && app.character) {
        if (!app.character.inventory) app.character.inventory = [];
        app.character.inventory.push({
          name: itemData.name,
          qty: itemData.qty,
          bulk: itemData.bulk,
          price: itemData.price,
          description: itemData.description
        });
        if (deductCoins && selectedItem.price) {
          const charCoins = app.character.coins || { gp: 0, sp: 0, cp: 0, pp: 0 };
          if (canAffordPrice(charCoins, selectedItem.price, itemData.qty)) {
            app.character.coins = deductPurseCoins(charCoins, selectedItem.price, itemData.qty);
          }
        }
        app.renderAll();
      }
    }
    setModalState({ isOpen: false });
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    const itemData = {
      name: customName.trim(),
      qty: Math.max(1, customQty),
      bulk: customBulk.trim() || "1",
      price: customPrice.trim() || "—",
      description: customDesc.trim()
    };
    const app = (window as any).app;
    if (app && app.character) {
      if (!app.character.inventory) app.character.inventory = [];
      app.character.inventory.push(itemData);
      app.renderAll();
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
      <div className="item-picker-dialog" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        {/* Header Tabs */}
        <header className="item-picker-header">
          <div className="item-picker-main-tabs">
            <button
              className={`main-tab-btn ${mainTab === "gear" ? "active" : ""}`}
              onClick={() => { setMainTab("gear"); setSubTab("all"); }}
            >
              🎒 Equipamentos (Gear)
            </button>
            <button
              className={`main-tab-btn ${mainTab === "consumables" ? "active" : ""}`}
              onClick={() => { setMainTab("consumables"); setSubTab("all"); }}
            >
              🧪 Consumíveis (Consumables)
            </button>
            <button
              className={`main-tab-btn ${mainTab === "magic_items" ? "active" : ""}`}
              onClick={() => { setMainTab("magic_items"); setSubTab("all"); }}
            >
              🔮 Itens Mágicos (Magic Items)
            </button>
            <button
              className={`main-tab-btn ${mainTab === "all" ? "active" : ""}`}
              onClick={() => { setMainTab("all"); setSubTab("all"); }}
            >
              📦 Todos (All)
            </button>
            <button
              className={`main-tab-btn custom-tab-highlight ${mainTab === "custom" ? "active" : ""}`}
              onClick={() => setMainTab("custom")}
            >
              ⚙️ Personalizado (Custom)
            </button>
          </div>
          <button className="item-picker-close-x" onClick={() => setModalState({ isOpen: false })}>✕</button>
        </header>

        {/* Sub-Tabs Bar */}
        {mainTab !== "custom" && (
          <div className="item-picker-subtabs">
            <button className={`subtab-btn ${subTab === "all" ? "active" : ""}`} onClick={() => setSubTab("all")}>
              Todos
            </button>
            {mainTab === "gear" && (
              <>
                <button className={`subtab-btn ${subTab === "adventuring" ? "active" : ""}`} onClick={() => setSubTab("adventuring")}>
                  Aventura (Adventuring)
                </button>
                <button className={`subtab-btn ${subTab === "ammunition" ? "active" : ""}`} onClick={() => setSubTab("ammunition")}>
                  Munição (Ammunition)
                </button>
                <button className={`subtab-btn ${subTab === "toolkits" ? "active" : ""}`} onClick={() => setSubTab("toolkits")}>
                  Ferramentas (Toolkits)
                </button>
              </>
            )}
            {mainTab === "consumables" && (
              <>
                <button className={`subtab-btn ${subTab === "potions" ? "active" : ""}`} onClick={() => setSubTab("potions")}>
                  Poções (Potions)
                </button>
                <button className={`subtab-btn ${subTab === "elixirs" ? "active" : ""}`} onClick={() => setSubTab("elixirs")}>
                  Elixires (Elixirs)
                </button>
                <button className={`subtab-btn ${subTab === "scrolls" ? "active" : ""}`} onClick={() => setSubTab("scrolls")}>
                  Pergaminhos (Scrolls)
                </button>
                <button className={`subtab-btn ${subTab === "bombs" ? "active" : ""}`} onClick={() => setSubTab("bombs")}>
                  Bombas Alquímicas (Bombs)
                </button>
              </>
            )}
            {mainTab === "magic_items" && (
              <>
                <button className={`subtab-btn ${subTab === "worn" ? "active" : ""}`} onClick={() => setSubTab("worn")}>
                  Vestíveis (Worn Items)
                </button>
                <button className={`subtab-btn ${subTab === "wands" ? "active" : ""}`} onClick={() => setSubTab("wands")}>
                  Varinhas (Wands)
                </button>
                <button className={`subtab-btn ${subTab === "runes" ? "active" : ""}`} onClick={() => setSubTab("runes")}>
                  Pedras Rúnicas (Runes)
                </button>
              </>
            )}
            <div className="item-picker-search-wrap">
              <input
                ref={searchInputRef}
                type="search"
                placeholder="Pesquisar item..."
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
              <h3>Criar Item Personalizado / Caseiro</h3>
              <div className="form-row-2">
                <label>
                  <span>Nome do Item *</span>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Amuleto dos Ancestrais"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                  />
                </label>
                <label>
                  <span>Carga (Bulk)</span>
                  <input
                    type="text"
                    placeholder="1, 2, L ou -"
                    value={customBulk}
                    onChange={(e) => setCustomBulk(e.target.value)}
                  />
                </label>
              </div>
              <div className="form-row-2">
                <label>
                  <span>Quantidade</span>
                  <input
                    type="number"
                    min="1"
                    value={customQty}
                    onChange={(e) => setCustomQty(parseInt(e.target.value, 10) || 1)}
                  />
                </label>
                <label>
                  <span>Preço Estimado</span>
                  <input
                    type="text"
                    placeholder="Ex: 25 PO, 5 PP"
                    value={customPrice}
                    onChange={(e) => setCustomPrice(e.target.value)}
                  />
                </label>
              </div>
              <label>
                <span>Descrição / Efeitos Especiais</span>
                <textarea
                  rows={4}
                  placeholder="Anotações sobre propriedades mágicas, histórico ou bônus..."
                  value={customDesc}
                  onChange={(e) => setCustomDesc(e.target.value)}
                />
              </label>
              <div className="custom-form-actions">
                <button type="submit" className="btn-buy-action">➕ Adicionar ao Inventário</button>
              </div>
            </form>
          ) : (
            <div className="item-picker-split">
              {/* Left Column: Items List */}
              <div className="item-picker-list">
                {items.length === 0 ? (
                  <div className="item-empty-msg">Nenhum item encontrado nesta categoria.</div>
                ) : (
                  items.map((item) => {
                    const isSel = (selectedItem?.id === item.id);
                    const displayName = getItemDisplayName(item as any, locale);
                    return (
                      <div
                        key={item.id}
                        className={`item-row-card ${isSel ? "selected" : ""}`}
                        onClick={() => setSelectedId(item.id)}
                      >
                        <div className="item-row-main">
                          <span className="item-row-name">{displayName}</span>
                          <span className="item-row-meta">
                            {item.level > 0 && <span className="item-level-tag">Nv {item.level}</span>}
                            <span className="item-bulk-tag">Carga {item.bulk}</span>
                          </span>
                        </div>
                        <div className="item-row-price">{formatPrice(item.price)}</div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Right Column: Selected Item Detail */}
              <div className="item-picker-detail">
                {selectedItem ? (
                  <div className="item-detail-inner">
                    <div className="detail-header">
                      <span className="detail-category">{selectedItem.mainCategory.toUpperCase()} · {selectedItem.subCategory}</span>
                      {selectedItem.level > 0 && <span className="item-level-tag">Nível {selectedItem.level}</span>}
                    </div>
                    <h2 className="detail-title">{getItemDisplayName(selectedItem as any, locale)}</h2>
                    <div className="detail-specs-grid">
                      <div className="spec-card">
                        <span className="spec-label">Preço</span>
                        <span className="spec-val" style={{ color: "var(--pb-gold, #f59e0b)" }}>{formatPrice(selectedItem.price)}</span>
                      </div>
                      <div className="spec-card">
                        <span className="spec-label">Carga (Bulk)</span>
                        <span className="spec-val">{selectedItem.bulk}</span>
                      </div>
                      <div className="spec-card">
                        <span className="spec-label">Mãos</span>
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
                      </div>
                    )}

                    <div className="detail-qty-control">
                      <span style={{ fontSize: "12px", color: "var(--pb-text-muted)" }}>Quantidade a Adicionar:</span>
                      <div className="qty-stepper">
                        <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                        <input
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                        />
                        <button type="button" onClick={() => setQuantity(quantity + 1)}>+</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="item-empty-msg">Selecione um item para ver os detalhes.</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Bar */}
        {(() => {
          const coins = (window as any).app?.character?.coins || { pp: 0, gp: 15, sp: 0, cp: 0 };
          const canAfford = canAffordPrice(coins, selectedItem?.price, quantity);
          const priceText = formatPrice(selectedItem?.price);
          return (
            <footer className="item-picker-footer">
              <div className="character-wallet">
                <span className="wallet-label">Bolsa de Moedas:</span>
                <span className="coin-tag pp">⚪ {coins.pp || 0} PP</span>
                <span className="coin-tag gp">🟡 {coins.gp || 0} PO</span>
                <span className="coin-tag sp">⚪ {coins.sp || 0} PP</span>
                <span className="coin-tag cp">🟤 {coins.cp || 0} PC</span>
              </div>

              <div className="picker-footer-actions">
                <button className="btn-secondary" onClick={() => setModalState({ isOpen: false })}>
                  Fechar
                </button>
                {mainTab !== "custom" && (
                  <>
                    <button className="btn-add-free" onClick={() => handleAddOrBuy(false)}>
                      Adicionar Grátis
                    </button>
                    <button
                      className={`btn-buy-action ${!canAfford ? "disabled-funds" : ""}`}
                      onClick={() => handleAddOrBuy(true)}
                      disabled={!canAfford}
                      title={canAfford ? `Comprar por ${priceText} e deduzir moedas` : `Moedas insuficientes! Custo: ${priceText}`}
                    >
                      🛒 Comprar (Deduzir Moedas) — {priceText}
                    </button>
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
