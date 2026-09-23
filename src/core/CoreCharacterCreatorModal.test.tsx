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

  it("mostra a quantidade progressiva de escolhas de Metamagia no construtor D&D 5e", () => {
    render(<CoreCharacterCreatorModal isOpen system="dnd5e" onClose={vi.fn()} onCharacterCreated={vi.fn()} />);

    fireEvent.change(screen.getByLabelText("Classe"), { target: { value: "feiticeiro" } });
    fireEvent.change(screen.getByLabelText("Nível"), { target: { value: "3" } });
    expect(screen.getByText("Metamagia (0/2)")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Nível"), { target: { value: "10" } });
    expect(screen.getByText("Metamagia (0/3)")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Nível"), { target: { value: "17" } });
    expect(screen.getByText("Metamagia (0/4)")).toBeInTheDocument();
  });
});
