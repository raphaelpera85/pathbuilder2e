-- Tabelas de magias de domínio do Clérigo D&D 5e 2014.
-- A aplicação usa estas tabelas para conceder magias sempre preparadas.
update public.catalog_subclasses
set data = data || jsonb_build_object('domainSpells', domain_spells), updated_at = now()
from (values
  ('dnd5e.clerigo_conhecimento', '{"1":["Comando","Identificação"],"3":["Augúrio","Sugestão"],"5":["Não Detecção","Falar com os Mortos"],"7":["Olho Arcano","Confusão"],"9":["Conhecimento Lendário","Vidência"]}'::jsonb),
  ('dnd5e.clerigo_vida', '{"1":["Bênção","Curar Ferimentos"],"3":["Restauração Menor","Arma Espiritual"],"5":["Sinal de Esperança","Revivificar"],"7":["Proteção contra a Morte","Guardião da Fé"],"9":["Curar Ferimentos em Massa","Reviver os Mortos"]}'::jsonb),
  ('dnd5e.clerigo_luz', '{"1":["Mãos Flamejantes","Fogo das Fadas"],"3":["Esfera Flamejante","Raio Ardente"],"5":["Luz do Dia","Bola de Fogo"],"7":["Guardião da Fé","Muralha de Fogo"],"9":["Coluna de Chamas","Vidência"]}'::jsonb),
  ('dnd5e.clerigo_natureza', '{"1":["Amizade Animal","Falar com Animais"],"3":["Pele de Árvore","Crescer Espinhos"],"5":["Ampliar Plantas","Muralha de Vento"],"7":["Dominar Besta","Videira Agarrante"],"9":["Praga de Insetos","Caminhar em Árvores"]}'::jsonb),
  ('dnd5e.clerigo_tempestade', '{"1":["Névoa Obscurecente","Onda Trovejante"],"3":["Lufada de Vento","Despedaçar"],"5":["Convocar Relâmpagos","Nevasca"],"7":["Controlar a Água","Tempestade de Gelo"],"9":["Onda Destrutiva","Praga de Insetos"]}'::jsonb),
  ('dnd5e.clerigo_trapaca', '{"1":["Enfeitiçar Pessoa","Disfarçar-se"],"3":["Imagem Espelhada","Passos sem Pegadas"],"5":["Piscar","Dissipar Magia"],"7":["Porta Dimensional","Metamorfose"],"9":["Dominar Pessoa","Modificar Memória"]}'::jsonb),
  ('dnd5e.clerigo_guerra', '{"1":["Auxílio Divino","Escudo da Fé"],"3":["Arma Mágica","Arma Espiritual"],"5":["Manto do Cruzado","Espíritos Guardiões"],"7":["Movimentação Livre","Pele de Pedra"],"9":["Coluna de Chamas","Imobilizar Monstro"]}'::jsonb)
) as domain_rows(id, domain_spells)
where public.catalog_subclasses.id = domain_rows.id
  and public.catalog_subclasses.system_id = 'dnd5e'
  and public.catalog_subclasses.ruleset = 'standard';
