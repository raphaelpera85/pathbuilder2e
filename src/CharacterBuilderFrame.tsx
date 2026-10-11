import { useEffect, useRef, type ReactNode } from "react";

export interface CharacterBuilderStep {
  id: number;
  label: string;
}

export interface CharacterBuilderSummaryRow {
  label: string;
  value: string | number;
}

interface CharacterBuilderFrameProps {
  steps: CharacterBuilderStep[];
  activeStep: number;
  onStepSelect: (step: number) => void;
  navigationLabel: string;
  summaryLabel: string;
  summaryRows: CharacterBuilderSummaryRow[];
  children: ReactNode;
}

/** Shared Pathfinder-style workbench chrome; system rules remain in each builder. */
export function CharacterBuilderFrame({
  steps,
  activeStep,
  onStepSelect,
  navigationLabel,
  summaryLabel,
  summaryRows,
  children,
}: CharacterBuilderFrameProps) {
  const activeStepRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    activeStepRef.current?.scrollIntoView?.({ behavior: "smooth", block: "nearest", inline: "nearest" });
  }, [activeStep]);

  return (
    <div className="pb-character-builder-frame">
      <nav className="pb-character-builder-progress" aria-label={navigationLabel}>
        <h3 className="pb-character-builder-panel-title">{navigationLabel}</h3>
        <p className="pb-character-builder-progress-hint">Deslize para ver todas as etapas.</p>
        <ol>
          {steps.map((step, index) => (
            <li key={step.id}>
              <button
                type="button"
                ref={step.id === activeStep ? activeStepRef : undefined}
                className={`pb-tree-card pb-character-builder-step${step.id === activeStep ? " active" : ""}`}
                aria-current={step.id === activeStep ? "step" : undefined}
                onClick={() => onStepSelect(step.id)}
              >
                <span className="pb-tree-card-icon" aria-hidden="true">{index + 1}</span>
                <span className="pb-tree-card-content">
                  <span className="pb-tree-card-label">{step.id === activeStep ? "Etapa atual" : index < steps.findIndex(({ id }) => id === activeStep) ? "Etapa anterior" : "Próxima etapa"}</span>
                  <span className="pb-tree-card-value">{step.label}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <div className="pb-character-builder-main">{children}</div>

      <aside className="pb-character-builder-summary" aria-label={summaryLabel}>
        <h3 className="pb-character-builder-panel-title">{summaryLabel}</h3>
        <dl>
          {summaryRows.map(({ label, value }) => (
            <div className="pb-character-builder-summary-row" key={label}>
              <dt>{label}</dt>
              <dd>{value ?? "—"}</dd>
            </div>
          ))}
        </dl>
      </aside>
    </div>
  );
}
