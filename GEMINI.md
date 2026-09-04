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
