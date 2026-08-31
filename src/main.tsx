import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { PickerModal } from "./PickerModal";
import { ItemPickerModal } from "./ItemPickerModal";
import { AccountPortal } from "./AccountPortal";
import { I18nProvider, LocaleSwitcher } from "./i18n";
import { PF2E_ACTIONS_CATALOG } from "./data/actionsData";
import { PF2E_ITEMS_CATALOG } from "./data/equipmentData";
import { PF2E_FEATS_CATALOG } from "./data/featsData";
import { PF2E_PETS_CATALOG } from "./data/petsData";
import { PortalPages } from "./PortalPages";
import "./picker.css";

const modalRoot = document.getElementById("react-modal-root");
const accountRoot = document.getElementById("react-account-root");
const portalRoot = document.getElementById("react-portal-root");

if (!modalRoot || !accountRoot || !portalRoot) {
  throw new Error("Raízes React do portal não foram encontradas.");
}

// O legado continua sendo carregado primeiro, mas passa a consumir os mesmos
// catálogos ricos usados pelos componentes React quando o bridge estiver pronto.
(window as any).pathbuilderCatalogs = {
  actions: PF2E_ACTIONS_CATALOG,
  items: PF2E_ITEMS_CATALOG,
  feats: PF2E_FEATS_CATALOG,
  pets: PF2E_PETS_CATALOG,
};

createRoot(modalRoot).render(
  <StrictMode>
    <I18nProvider>
      <PickerModal />
      <ItemPickerModal />
    </I18nProvider>
  </StrictMode>,
);

createRoot(accountRoot).render(
  <StrictMode>
    <I18nProvider><div className="portal-controls"><LocaleSwitcher /><AccountPortal /></div></I18nProvider>
  </StrictMode>,
);

createRoot(portalRoot).render(
  <StrictMode>
    <I18nProvider>
      <PortalPages />
      <SpeedInsights />
      <Analytics />
    </I18nProvider>
  </StrictMode>,
);
