# Changelog

## 2026-09-12 — Construtores multi-sistema

- Adicionado seletor separado para Pathfinder 2e, Tormenta20, D&D 5e 2014 e Old-School Essentials.
- Adicionados catálogos e regrasets isolados por sistema, com proveniência de livro e página.
- Implementados construtores e fichas próprias para T20, D&D 5e e OSE.
- Adicionadas progressões de classe, subclasses/sub-raças, perícias, equipamentos, magias, poderes/talentos e regras de criação específicas.
- Adicionadas escolhas raciais condicionais de atributos, idiomas, perícias e poderes nos casos catalogados.
- Adicionado PDF editável de uma página para T20, D&D 5e e OSE.
- Adicionadas validações contra mistura de sistemas, regrasets incompatíveis, escolhas duplicadas e referências órfãs.
- Adicionado isolamento de sincronização Supabase por `system_id` + `ruleset`.
- Adicionado foco contido, Escape e restauração de foco nos modais de criação/ficha.

### Limites da cobertura

- OSE não possui talentos nem vantagem/desvantagem nativos no núcleo importado.
- Conteúdo de suplementos e efeitos mecânicos ainda incompletos permanece marcado como revisão pendente.
- A auditoria remota RLS com dois usuários autenticados ainda precisa ser executada no projeto Supabase; a auditoria das migrations locais está aprovada.
