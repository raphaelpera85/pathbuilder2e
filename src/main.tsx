import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PickerModal } from "./PickerModal";
import { AccountPortal } from "./AccountPortal";
import { I18nProvider, LocaleSwitcher } from "./i18n";
import { PortalPages } from "./PortalPages";
import "./picker.css";

const modalRoot = document.getElementById("react-modal-root");
const accountRoot = document.getElementById("react-account-root");
const portalRoot = document.getElementById("react-portal-root");

if (!modalRoot || !accountRoot || !portalRoot) {
  throw new Error("Raízes React do portal não foram encontradas.");
}

createRoot(modalRoot).render(
  <StrictMode>
    <I18nProvider><PickerModal /></I18nProvider>
  </StrictMode>,
);

createRoot(accountRoot).render(
  <StrictMode>
    <I18nProvider><div className="portal-controls"><LocaleSwitcher /><AccountPortal /></div></I18nProvider>
  </StrictMode>,
);

createRoot(portalRoot).render(
  <StrictMode>
    <I18nProvider><PortalPages /></I18nProvider>
  </StrictMode>,
);
