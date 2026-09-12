import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SystemSelectorModal } from "./SystemSelectorModal";
import { I18nProvider } from "./i18n";

describe("SystemSelectorModal accessibility", () => {
  it("move o foco para o diálogo, mantém Tab dentro dele e devolve o foco ao acionador", () => {
    const opener = document.createElement("button");
    opener.textContent = "Abrir seletor";
    document.body.appendChild(opener);
    opener.focus();

    const onClose = vi.fn();
    const { unmount } = render(
      <I18nProvider>
        <SystemSelectorModal
          isOpen
          onClose={onClose}
          onSelectSystem={vi.fn()}
          systems={[{
            id: "t20",
            name: { "pt-BR": "Tormenta 20" },
            description: { "pt-BR": "Arton" },
            icon: "🛡️",
            badgeColor: "#3b82f6",
            supportedRulesets: ["padrao"],
            defaultRuleset: "padrao",
          }] as any}
        />
      </I18nProvider>
    );

    const dialog = screen.getByRole("dialog");
    const close = screen.getByRole("button", { name: /fechar/i });
    expect(dialog).toBeInTheDocument();
    expect(close).toHaveFocus();

    const cancel = screen.getByRole("button", { name: /cancelar/i });
    cancel.focus();
    fireEvent.keyDown(window, { key: "Tab" });
    expect(close).toHaveFocus();

    unmount();
    expect(opener).toHaveFocus();
    opener.remove();
  });
});
