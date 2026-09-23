## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

## Diretrizes do Projeto (Pathbuilder 2e Local)
- **Mobile-First & Responsividade**: telas `<= 1080px` usam seletor em menu dropdown `.pb-mobile-tabs-menu` nas 9 seções da ficha para evitar armadilhas de scroll e sobreposição de abas, fluindo as colunas verticalmente.
- **Dual-Theme**: suporte obrigatório a tema escuro e claro pergaminho (`[data-theme="light"]`).
- **i18n Trilíngue**: sincronização em `updateStaticLabels()` e `src/i18n.tsx` para `pt-BR`, `en` e `es`.
- **Testes & Headless VM**: guarda defensiva `if (typeof document === "undefined" || typeof document.querySelector !== "function") return;` em métodos com acesso a DOM.
- **Contratos de CSS**: preservação dos seletores validados em `src/data/responsive-layout-contract.test.ts`.
- **Mecânicas de Descanso PF2e**: descanso de 8 horas segue o Player Core p. 444 (zera `tempHp`, remove `Fatigado`, decrementa `Condenado` e `Drenado`, limpa `Ferido` se curado ao máximo e consulta `slotsInfo` defensivamente).
- **Normalização de VTTs**: slugs de talentos normalizados (`class`, `ancestry`, `general`, `skill`, `archetype`) e inclusão de armas, armaduras, escudos e equipamentos na matriz de itens exportada.
- **Privacidade de Dados**: qualquer e-mail exibido no painel administrativo deve ser mascarado com `maskEmail()`, suportando prefixos de qualquer comprimento.
- **Acervo Multi-Sistema & Isolamento de Rulesets**: novos sistemas de RPG integrados ao acervo de downloads ou ficha devem possuir vocabulário isolado de ruleset (ex.: `remaster`/`legacy` em PF2e, `padrao` em T20, `standard` em D&D 5e, `classic`/`advanced` em OSE, `v35` em D&D 3.5). Nunca reaproveitar rótulos de edição do PF2e em outros sistemas.
- **Aferição Factual de PDFs & Acessibilidade nos Downloads**: contagens de página de novos livros devem ser verificadas com parsers binários (`pdf-lib`/`pdfinfo`). Títulos de livros homônimos em múltiplos sistemas devem ser qualificados (ex.: "Livro do Jogador (D&D 3.5)") para evitar colisões de `aria-label` e acessibilidade em botões de download direto.

