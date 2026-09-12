import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "./i18n";
import { DEFAULT_RPG_SYSTEMS } from "./services/catalog";
import type { IRPGSystem, RPGSystemId } from "./types";

export interface SystemSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSystem: (systemId: RPGSystemId) => void;
  systems?: IRPGSystem[];
}

export const SystemSelectorModal: React.FC<SystemSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelectSystem,
  systems = DEFAULT_RPG_SYSTEMS,
}) => {
  const { t, locale } = useTranslation();
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Fechar com Escape e bloquear scroll do body
  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = Array.from(modalContentRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ) || []);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    const firstFocusable = modalContentRef.current?.querySelector<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    firstFocusable?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      if (previouslyFocused?.isConnected) previouslyFocused.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  if (typeof document === "undefined" || typeof document.querySelector !== "function") {
    return null;
  }

  const modalRoot = document.getElementById("react-modal-root") || document.body;

  return createPortal(
    <div
      className="pb-system-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pb-system-modal-title"
    >
      <div ref={modalContentRef} className="pb-system-modal-content">
        {/* Botão de Fechar */}
        <button
          type="button"
          onClick={onClose}
          className="pb-system-close-btn"
          aria-label={t("close")}
        >
          ✕
        </button>

        {/* Cabeçalho */}
        <div className="pb-system-modal-header">
          <span className="pb-system-modal-icon">🎲</span>
          <h2 id="pb-system-modal-title" className="pb-system-modal-title">
            {t("selectRpgSystem")}
          </h2>
          <p className="pb-system-modal-subtitle">
            {t("selectRpgSystemSubtitle")}
          </p>
        </div>

        {/* Grid de Sistemas */}
        <div className="pb-system-grid" role="list">
          {systems.map((system) => {
            const systemName =
              system.name[locale] ||
              system.name["pt-BR"] ||
              system.id;
            const systemDesc =
              system.description[locale] ||
              system.description["pt-BR"] ||
              "";

            return (
              <button
                key={system.id}
                type="button"
                className="pb-system-card"
                onClick={() => onSelectSystem(system.id)}
                aria-label={`${systemName}: ${systemDesc}`}
              >
                <div className="pb-system-card-main">
                  <div className="pb-system-card-top">
                    <span className="pb-system-card-icon">{system.icon}</span>
                    <span
                      className="pb-system-card-badge"
                      style={{
                        backgroundColor: `${system.badgeColor}22`,
                        color: system.badgeColor,
                        borderColor: `${system.badgeColor}55`,
                      }}
                    >
                      {system.id}
                    </span>
                  </div>
                  <h3 className="pb-system-card-title">{systemName}</h3>
                  <p className="pb-system-card-desc">{systemDesc}</p>
                </div>

                <div className="pb-system-card-footer">
                  <span
                    className="pb-system-card-action"
                    style={{ color: system.badgeColor }}
                  >
                    {t("createSheetForSystem")} →
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Rodapé / Cancelar */}
        <div className="pb-system-modal-footer">
          <button
            type="button"
            onClick={onClose}
            className="pb-system-cancel-btn"
          >
            {t("cancel")}
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};
