import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { PickerModal } from "./PickerModal";
import { ItemPickerModal } from "./ItemPickerModal";
import { AccountPortal } from "./AccountPortal";
import { I18nProvider, LocaleSwitcher } from "./i18n";
import { ThemeProvider, ThemeSwitcher } from "./theme";
import { PF2E_ACTIONS_CATALOG } from "./data/actionsData";
import { PF2E_ITEMS_CATALOG } from "./data/equipmentData";
import { PF2E_FEATS_CATALOG } from "./data/featsData";
import { PF2E_PETS_CATALOG } from "./data/petsData";
import { PortalPages } from "./PortalPages";
import "../css/style.css";
import "./picker.css";

function ViewportSignals() {
  useEffect(() => {
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateSignals = () => {
      document.documentElement.dataset.inputMode = coarsePointer.matches || "ontouchstart" in window ? "touch" : "pointer";
      document.documentElement.dataset.motionPreference = reducedMotion.matches ? "reduced" : "full";
      document.documentElement.style.setProperty("--pb-viewport-height", `${window.visualViewport?.height || window.innerHeight}px`);
      const topbarHeight = document.querySelector<HTMLElement>(".pb-topbar")?.getBoundingClientRect().height || 0;
      const mobileNavHeight = document.querySelector<HTMLElement>(".pb-mobile-view-nav")?.getBoundingClientRect().height || 0;
      document.documentElement.style.setProperty("--pb-mobile-chrome-height", `${topbarHeight + mobileNavHeight}px`);
    };
    updateSignals();
    const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateSignals) : null;
    document.querySelectorAll<HTMLElement>(".pb-topbar, .pb-mobile-view-nav").forEach((element) => resizeObserver?.observe(element));
    window.addEventListener("resize", updateSignals, { passive: true });
    window.visualViewport?.addEventListener("resize", updateSignals, { passive: true });
    coarsePointer.addEventListener?.("change", updateSignals);
    reducedMotion.addEventListener?.("change", updateSignals);
    return () => {
      window.removeEventListener("resize", updateSignals);
      window.visualViewport?.removeEventListener("resize", updateSignals);
      coarsePointer.removeEventListener?.("change", updateSignals);
      reducedMotion.removeEventListener?.("change", updateSignals);
      resizeObserver?.disconnect();
    };
  }, []);
  return null;
}

const modalRoot = document.getElementById("react-modal-root");
const accountRoot = document.getElementById("react-account-root");
const portalRoot = document.getElementById("react-portal-root");

if (!modalRoot || !accountRoot || !portalRoot) {
  throw new Error("Raízes React do portal não foram encontradas.");
}

// O legado continua sendo carregado primeiro, mas passa a consumir os mesmos
// catálogos ricos usados pelos componentes React quando o bridge estiver pronto.
(window as any).pathbuilderCatalogs = {
  canonical: (window as any).PF2E_DATA,
  actions: PF2E_ACTIONS_CATALOG,
  items: PF2E_ITEMS_CATALOG,
  feats: PF2E_FEATS_CATALOG,
  pets: PF2E_PETS_CATALOG,
};
window.dispatchEvent(new Event("pathbuilder:catalogs-ready"));

createRoot(modalRoot).render(
  <StrictMode>
    <ThemeProvider>
      <I18nProvider>
        <ViewportSignals />
        <PickerModal />
        <ItemPickerModal />
      </I18nProvider>
    </ThemeProvider>
  </StrictMode>,
);

createRoot(accountRoot).render(
  <StrictMode>
    <ThemeProvider>
      <I18nProvider>
        <div className="portal-controls">
          <ThemeSwitcher />
          <LocaleSwitcher />
          <AccountPortal />
        </div>
      </I18nProvider>
    </ThemeProvider>
  </StrictMode>,
);

createRoot(portalRoot).render(
  <StrictMode>
    <ThemeProvider>
      <I18nProvider>
        <PortalPages />
        <SpeedInsights />
        <Analytics />
      </I18nProvider>
    </ThemeProvider>
  </StrictMode>,
);

if (typeof window !== "undefined" && "serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch((err) => {
      console.warn("Falha ao registrar Service Worker PWA:", err);
    });
  });
}

