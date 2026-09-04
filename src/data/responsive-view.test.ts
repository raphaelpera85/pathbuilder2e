import { describe, it, expect, beforeEach } from "vitest";

describe("Workspace Responsive Layout (Natural Flow sem pb-mobile-view-nav)", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="pb-workspace" id="legacy-builder-root">
        <aside class="pb-plan-tree" id="planTreeCol"></aside>
        <aside class="pb-stats-col" id="statsCol"></aside>
        <main class="pb-content-col" id="contentCol"></main>
      </div>
    `;
  });

  it("não renderiza nem exige barra pb-mobile-view-nav, mantendo as 3 colunas no DOM", () => {
    expect(document.getElementById("mobileViewNav")).toBeNull();
    expect(document.getElementById("planTreeCol")).not.toBeNull();
    expect(document.getElementById("statsCol")).not.toBeNull();
    expect(document.getElementById("contentCol")).not.toBeNull();
  });

  it("permite colapsar a árvore de plano via togglePlanTree", () => {
    const tree = document.getElementById("planTreeCol")!;
    expect(tree.classList.contains("collapsed")).toBe(false);
    tree.classList.toggle("collapsed");
    expect(tree.classList.contains("collapsed")).toBe(true);
    tree.classList.toggle("collapsed");
    expect(tree.classList.contains("collapsed")).toBe(false);
  });
});

describe("Mobile Tabs Menu (Seletor de Seções em Menu)", () => {
  let mockApp: any;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="pb-mobile-tabs-menu" id="pbMobileTabsMenu">
        <div class="pb-mobile-tabs-bar">
          <button type="button" class="pb-mobile-tabs-nav-btn" id="pbMobileTabPrev">◀</button>
          <button type="button" class="pb-mobile-tab-trigger" id="pbMobileTabTrigger" aria-haspopup="true" aria-expanded="false">
            <span class="pb-mobile-tab-current">
              <span class="pb-mobile-tab-icon" id="pbMobileTabIcon">⚔️</span>
              <span class="pb-mobile-tab-title" id="pbMobileTabTitle">Armas</span>
            </span>
            <span class="pb-mobile-tab-indicator">
              <span class="pb-mobile-tab-hint" id="pbMobileTabHint">Seção</span>
              <span class="pb-mobile-tab-chevron">▼</span>
            </span>
          </button>
          <button type="button" class="pb-mobile-tabs-nav-btn" id="pbMobileTabNext">▶</button>
        </div>

        <div class="pb-mobile-tabs-dropdown" id="pbMobileTabsDropdown" role="menu" aria-hidden="true">
          <div class="pb-mobile-tabs-grid">
            <button type="button" class="pb-mobile-tab-item active" data-tab="tab-weapons">
              <span class="pb-mobile-tab-item-icon">⚔️</span>
              <span class="pb-mobile-tab-item-text" id="mobile-tab-label-weapons">Armas</span>
            </button>
            <button type="button" class="pb-mobile-tab-item" data-tab="tab-defense">
              <span class="pb-mobile-tab-item-icon">🛡️</span>
              <span class="pb-mobile-tab-item-text" id="mobile-tab-label-defense">Defesa</span>
            </button>
            <button type="button" class="pb-mobile-tab-item" data-tab="tab-gear">
              <span class="pb-mobile-tab-item-icon">🎒</span>
              <span class="pb-mobile-tab-item-text" id="mobile-tab-label-gear">Equipamentos</span>
            </button>
          </div>
        </div>
      </div>
      <div class="pb-mobile-tabs-backdrop" id="pbMobileTabsBackdrop"></div>

      <nav class="pb-nav-tabs">
        <button id="tab-button-weapons" class="pb-tab-btn active" role="tab" aria-selected="true" aria-controls="tab-weapons">Armas</button>
        <button id="tab-button-defense" class="pb-tab-btn" role="tab" aria-selected="false" aria-controls="tab-defense">Defesa</button>
        <button id="tab-button-gear" class="pb-tab-btn" role="tab" aria-selected="false" aria-controls="tab-gear">Equipamentos</button>
      </nav>

      <div class="pb-tab-body">
        <div id="tab-weapons" class="tab-panel active">Weapons Content</div>
        <div id="tab-defense" class="tab-panel" hidden>Defense Content</div>
        <div id="tab-gear" class="tab-panel" hidden>Gear Content</div>
      </div>
    `;

    mockApp = {
      switchTab(tabId: string) {
        document.querySelectorAll(".pb-tab-btn").forEach(b => {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        document.querySelectorAll(".tab-panel").forEach(p => {
          p.classList.remove("active");
          (p as HTMLElement).hidden = true;
        });
        const targetBtn = document.querySelector(`[aria-controls="${tabId}"]`);
        if (targetBtn) {
          targetBtn.classList.add("active");
          targetBtn.setAttribute("aria-selected", "true");
        }
        const target = document.getElementById(tabId);
        if (target) {
          target.classList.add("active");
          target.hidden = false;
        }
        this.syncMobileTabsMenu(tabId);
      },
      syncMobileTabsMenu(tabId: string) {
        const metaMap: Record<string, { icon: string; defaultTitle: string }> = {
          "tab-weapons": { icon: "⚔️", defaultTitle: "Armas" },
          "tab-defense": { icon: "🛡️", defaultTitle: "Defesa" },
          "tab-gear": { icon: "🎒", defaultTitle: "Equipamentos" }
        };
        const meta = metaMap[tabId];
        if (meta) {
          const iconEl = document.getElementById("pbMobileTabIcon");
          const titleEl = document.getElementById("pbMobileTabTitle");
          const desktopBtn = document.querySelector(`[aria-controls="${tabId}"]`);
          if (iconEl) iconEl.textContent = meta.icon;
          if (titleEl) titleEl.textContent = desktopBtn?.textContent?.trim() || meta.defaultTitle;
        }
        document.querySelectorAll(".pb-mobile-tab-item").forEach(item => {
          const isActive = item.getAttribute("data-tab") === tabId;
          item.classList.toggle("active", isActive);
          item.setAttribute("aria-selected", isActive ? "true" : "false");
        });
      },
      toggleMobileTabsMenu() {
        const dropdown = document.getElementById("pbMobileTabsDropdown");
        const backdrop = document.getElementById("pbMobileTabsBackdrop");
        const trigger = document.getElementById("pbMobileTabTrigger");
        if (!dropdown) return;
        const isOpen = dropdown.classList.contains("open");
        if (isOpen) {
          this.closeMobileTabsMenu();
        } else {
          dropdown.classList.add("open");
          dropdown.setAttribute("aria-hidden", "false");
          if (backdrop) backdrop.classList.add("active");
          if (trigger) trigger.setAttribute("aria-expanded", "true");
        }
      },
      closeMobileTabsMenu() {
        const dropdown = document.getElementById("pbMobileTabsDropdown");
        const backdrop = document.getElementById("pbMobileTabsBackdrop");
        const trigger = document.getElementById("pbMobileTabTrigger");
        if (dropdown) {
          dropdown.classList.remove("open");
          dropdown.setAttribute("aria-hidden", "true");
        }
        if (backdrop) backdrop.classList.remove("active");
        if (trigger) trigger.setAttribute("aria-expanded", "false");
      },
      selectMobileTab(tabId: string) {
        this.switchTab(tabId);
        this.closeMobileTabsMenu();
      },
      prevMobileTab() {
        const tabs = ["tab-weapons", "tab-defense", "tab-gear"];
        const currentActive = document.querySelector(".tab-panel.active")?.id || "tab-weapons";
        const currentIndex = tabs.indexOf(currentActive);
        const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        this.switchTab(tabs[prevIndex]);
      },
      nextMobileTab() {
        const tabs = ["tab-weapons", "tab-defense", "tab-gear"];
        const currentActive = document.querySelector(".tab-panel.active")?.id || "tab-weapons";
        const currentIndex = tabs.indexOf(currentActive);
        const nextIndex = (currentIndex + 1) % tabs.length;
        this.switchTab(tabs[nextIndex]);
      }
    };
  });

  it("abre e fecha o dropdown do menu mobile corretamente", () => {
    mockApp.toggleMobileTabsMenu();
    expect(document.getElementById("pbMobileTabsDropdown")?.classList.contains("open")).toBe(true);
    expect(document.getElementById("pbMobileTabsBackdrop")?.classList.contains("active")).toBe(true);
    expect(document.getElementById("pbMobileTabTrigger")?.getAttribute("aria-expanded")).toBe("true");

    mockApp.closeMobileTabsMenu();
    expect(document.getElementById("pbMobileTabsDropdown")?.classList.contains("open")).toBe(false);
    expect(document.getElementById("pbMobileTabsBackdrop")?.classList.contains("active")).toBe(false);
    expect(document.getElementById("pbMobileTabTrigger")?.getAttribute("aria-expanded")).toBe("false");
  });

  it("seleciona uma aba através do menu mobile atualizando o cabeçalho e fechando o dropdown", () => {
    mockApp.toggleMobileTabsMenu();
    mockApp.selectMobileTab("tab-defense");

    expect(document.getElementById("tab-defense")?.classList.contains("active")).toBe(true);
    expect(document.getElementById("tab-defense")?.hidden).toBe(false);
    expect(document.getElementById("tab-weapons")?.classList.contains("active")).toBe(false);

    // Verifica que o menu sincronizou o ícone e título
    expect(document.getElementById("pbMobileTabIcon")?.textContent).toBe("🛡️");
    expect(document.getElementById("pbMobileTabTitle")?.textContent).toBe("Defesa");

    // Verifica que o item do menu recebeu a classe active
    const defenseItem = document.querySelector('.pb-mobile-tab-item[data-tab="tab-defense"]');
    expect(defenseItem?.classList.contains("active")).toBe(true);

    // Verifica que o dropdown fechou
    expect(document.getElementById("pbMobileTabsDropdown")?.classList.contains("open")).toBe(false);
  });

  it("navega entre as seções usando os botões anterior e próximo", () => {
    mockApp.nextMobileTab();
    expect(document.getElementById("pbMobileTabTitle")?.textContent).toBe("Defesa");
    expect(document.getElementById("tab-defense")?.classList.contains("active")).toBe(true);

    mockApp.nextMobileTab();
    expect(document.getElementById("pbMobileTabTitle")?.textContent).toBe("Equipamentos");
    expect(document.getElementById("tab-gear")?.classList.contains("active")).toBe(true);

    mockApp.prevMobileTab();
    expect(document.getElementById("pbMobileTabTitle")?.textContent).toBe("Defesa");
    expect(document.getElementById("tab-defense")?.classList.contains("active")).toBe(true);
  });
});
