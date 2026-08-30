import { describe, it, expect, beforeEach } from "vitest";

describe("Mobile & Tablet Responsive View Selector", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <nav class="pb-mobile-view-nav" id="mobileViewNav">
        <button type="button" class="pb-mobile-view-btn" id="btnViewPlan">Plano</button>
        <button type="button" class="pb-mobile-view-btn active" id="btnViewStats">Ficha</button>
        <button type="button" class="pb-mobile-view-btn" id="btnViewContent">Ações</button>
      </nav>
      <div class="pb-workspace" id="legacy-builder-root">
        <aside class="pb-plan-tree" id="planTreeCol"></aside>
        <aside class="pb-stats-col" id="statsCol"></aside>
        <main class="pb-content-col" id="contentCol"></main>
      </div>
    `;
  });

  function switchMobileView(view: string) {
    const btnPlan = document.getElementById("btnViewPlan");
    const btnStats = document.getElementById("btnViewStats");
    const btnContent = document.getElementById("btnViewContent");

    const colPlan = document.getElementById("planTreeCol");
    const colStats = document.getElementById("statsCol");
    const colContent = document.getElementById("contentCol");

    [btnPlan, btnStats, btnContent].forEach(b => b?.classList.remove("active"));

    if (view === "plan") {
      btnPlan?.classList.add("active");
      if (colPlan) { colPlan.classList.remove("mobile-hidden"); colPlan.classList.add("mobile-visible"); }
      if (colStats) { colStats.classList.add("mobile-hidden"); colStats.classList.remove("mobile-visible"); }
      if (colContent) { colContent.classList.add("mobile-hidden"); colContent.classList.remove("mobile-visible"); }
    } else if (view === "content") {
      btnContent?.classList.add("active");
      if (colPlan) { colPlan.classList.add("mobile-hidden"); colPlan.classList.remove("mobile-visible"); }
      if (colStats) { colStats.classList.add("mobile-hidden"); colStats.classList.remove("mobile-visible"); }
      if (colContent) { colContent.classList.remove("mobile-hidden"); colContent.classList.add("mobile-visible"); }
    } else {
      btnStats?.classList.add("active");
      if (colPlan) { colPlan.classList.add("mobile-hidden"); colPlan.classList.remove("mobile-visible"); }
      if (colStats) { colStats.classList.remove("mobile-hidden"); colStats.classList.add("mobile-visible"); }
      if (colContent) { colContent.classList.add("mobile-hidden"); colContent.classList.remove("mobile-visible"); }
    }
  }

  it("alterna corretamente para a visualização de Plano/Níveis", () => {
    switchMobileView("plan");
    expect(document.getElementById("btnViewPlan")?.classList.contains("active")).toBe(true);
    expect(document.getElementById("btnViewStats")?.classList.contains("active")).toBe(false);
    expect(document.getElementById("planTreeCol")?.classList.contains("mobile-visible")).toBe(true);
    expect(document.getElementById("statsCol")?.classList.contains("mobile-hidden")).toBe(true);
    expect(document.getElementById("contentCol")?.classList.contains("mobile-hidden")).toBe(true);
  });

  it("alterna corretamente para a visualização de Ações e Abas", () => {
    switchMobileView("content");
    expect(document.getElementById("btnViewContent")?.classList.contains("active")).toBe(true);
    expect(document.getElementById("planTreeCol")?.classList.contains("mobile-hidden")).toBe(true);
    expect(document.getElementById("statsCol")?.classList.contains("mobile-hidden")).toBe(true);
    expect(document.getElementById("contentCol")?.classList.contains("mobile-visible")).toBe(true);
  });

  it("alterna corretamente de volta para a visualização de Ficha & Perícias (Stats)", () => {
    switchMobileView("plan");
    switchMobileView("stats");
    expect(document.getElementById("btnViewStats")?.classList.contains("active")).toBe(true);
    expect(document.getElementById("statsCol")?.classList.contains("mobile-visible")).toBe(true);
    expect(document.getElementById("planTreeCol")?.classList.contains("mobile-hidden")).toBe(true);
    expect(document.getElementById("contentCol")?.classList.contains("mobile-hidden")).toBe(true);
  });
});
