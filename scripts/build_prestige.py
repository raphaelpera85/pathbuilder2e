# -*- coding: utf-8 -*-
import json
import re

# We will build the 19 prestige classes of O Livro Completo do Arcano
# 1. Acólito da Pele (p. 19-21)
# 2. Acorde Sublime (p. 21-24)
# 3. Arcanamaca de Suel (p. 24-27)
# 4. Discípulo da Estrela Verde (p. 27-30)
# 5. Dominador (p. 30-33)
# 6. Espiral do Destino (p. 33-36)
# 7. Exobiólogo (p. 36-38)
# 8. Geômetra (p. 38-41)
# 9. Guia dos Viajantes (p. 41-43)
# 10. Iniciado dos Sete Véus (p. 43-46)
# 11. Mago da Ordem Arcana (p. 46-51)
# 12. Mago Selvagem (p. 51-53)
# 13. Mestre das Efígies (p. 53-55)
# 14. Mestre Transmogrificador (p. 55-59)
# 15. Peregrino da Canção (p. 59-62)
# 16. Punho Iluminado (p. 62-65)
# 17. Sábio Elemental (p. 64-67)
# 18. Sábio de Prata (p. 65-68)
# 19. Taumaturgo (p. 67-70)

# Let's write the generator script that outputs src/data/dnd35/dnd35ArcPrestige.ts
print("Ready to generate prestige classes.")
