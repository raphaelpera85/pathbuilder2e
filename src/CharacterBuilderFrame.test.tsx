import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CharacterBuilderFrame } from "./CharacterBuilderFrame";

describe("CharacterBuilderFrame", () => {
  it("exposes a Pathfinder-style progress list, current step, and persistent system summary", () => {
    const onStepSelect = vi.fn();
    const { container } = render(
      <CharacterBuilderFrame
        steps={[{ id: 1, label: "Atributos" }, { id: 2, label: "Raça e classe" }]}
        activeStep={2}
        onStepSelect={onStepSelect}
        navigationLabel="Etapas da criação D&D 3.5"
        summaryLabel="Resumo D&D 3.5"
        summaryRows={[{ label: "Classe", value: "Guerreiro" }, { label: "PV", value: 12 }]}
      >
        <p>Conteúdo específico do sistema</p>
      </CharacterBuilderFrame>,
    );

    const navigation = screen.getByRole("navigation", { name: "Etapas da criação D&D 3.5" });
    expect(within(navigation).getByRole("button", { name: /Raça e classe/ })).toHaveAttribute("aria-current", "step");
    expect(screen.getByRole("complementary", { name: "Resumo D&D 3.5" })).toHaveTextContent("Guerreiro");
    expect(container.querySelector(".pb-character-builder-main")).toHaveTextContent("Conteúdo específico do sistema");

    fireEvent.click(within(navigation).getByRole("button", { name: /Atributos/ }));
    expect(onStepSelect).toHaveBeenCalledWith(1);
  });

  it("preserves numeric zero in summary values", () => {
    render(<CharacterBuilderFrame steps={[{ id: 0, label: "Revisão" }]} activeStep={0} onStepSelect={vi.fn()} navigationLabel="Etapas" summaryLabel="Resumo" summaryRows={[{ label: "Perícias", value: 0 }]}><p>Ficha</p></CharacterBuilderFrame>);
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
