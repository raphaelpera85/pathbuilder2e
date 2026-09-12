import React, { useEffect } from "react";
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

  // Fechar com Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="pb-system-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(6px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pb-system-modal-title"
    >
      <div
        className="pb-system-modal-content relative w-full max-w-2xl rounded-2xl p-6 sm:p-8 shadow-2xl border transition-all"
        style={{
          background: "var(--card-bg, #1e2430)",
          borderColor: "var(--border-color, #334155)",
          color: "var(--text-color, #f8fafc)",
        }}
      >
        {/* Botão de Fechar */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold rounded-lg p-2 leading-none transition-colors opacity-70 hover:opacity-100 focus:outline-none"
          aria-label={t("close")}
          style={{ color: "var(--text-muted, #94a3b8)" }}
        >
          ✕
        </button>

        {/* Cabeçalho */}
        <div className="mb-6 text-center">
          <span className="text-3xl mb-2 inline-block">🎲</span>
          <h2
            id="pb-system-modal-title"
            className="text-2xl sm:text-3xl font-bold tracking-tight"
            style={{ color: "var(--primary-color, #f97316)" }}
          >
            {t("selectRpgSystem")}
          </h2>
          <p
            className="mt-1 text-sm sm:text-base opacity-80"
            style={{ color: "var(--text-muted, #94a3b8)" }}
          >
            {t("selectRpgSystemSubtitle")}
          </p>
        </div>

        {/* Lista de Sistemas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
              <div
                key={system.id}
                onClick={() => onSelectSystem(system.id)}
                className="pb-system-card group relative flex flex-col justify-between p-5 rounded-xl border transition-all duration-200 cursor-pointer text-left hover:-translate-y-1 hover:shadow-lg focus-within:ring-2"
                style={{
                  background: "var(--bg-card-hover, rgba(255, 255, 255, 0.03))",
                  borderColor: "var(--border-color, #334155)",
                }}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectSystem(system.id);
                  }
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl filter drop-shadow">{system.icon}</span>
                    <span
                      className="text-xs px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider"
                      style={{
                        backgroundColor: `${system.badgeColor}22`,
                        color: system.badgeColor,
                        border: `1px solid ${system.badgeColor}44`,
                      }}
                    >
                      {system.id}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                    {systemName}
                  </h3>
                  <p
                    className="mt-2 text-xs leading-relaxed opacity-75"
                    style={{ color: "var(--text-muted, #94a3b8)" }}
                  >
                    {systemDesc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span
                    className="text-xs font-medium tracking-wide flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    style={{ color: system.badgeColor }}
                  >
                    {t("createSheetForSystem")} →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rodapé / Cancelar */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors opacity-80 hover:opacity-100"
            style={{
              background: "var(--btn-secondary-bg, #334155)",
              color: "var(--text-color, #f8fafc)",
            }}
          >
            {t("cancel")}
          </button>
        </div>
      </div>
    </div>
  );
};
