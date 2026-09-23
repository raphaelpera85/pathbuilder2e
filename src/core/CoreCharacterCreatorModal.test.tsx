import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CoreCharacterCreatorModal } from "./CoreCharacterCreatorModal";

afterEach(cleanup);

describe("construtor core por sistema", () => {
  it.each([
    ["t20", "Tormenta20"],
    ["dnd5e", "D&D 5e 2014"],
  ] as const)("exibe a revisão final e cria uma ficha %s válida", (system, label) => {
    const onCharacterCreated = vi.fn();
    render(<CoreCharacterCreatorModal isOpen system={system} onClose={vi.fn()} onCharacterCreated={onCharacterCreated} />);

    expect(screen.getByText("Revisão final da ficha")).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(label)).length).toBeGreaterThan(0);
    expect(screen.getByText(/Todas as validações obrigatórias/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Criar ficha/i }));
    expect(onCharacterCreated).toHaveBeenCalledTimes(1);
    expect(onCharacterCreated.mock.calls[0][0]).toMatchObject({ system_id: system, systemId: system });
  });
});
