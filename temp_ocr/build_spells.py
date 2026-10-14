import re, json

# First, let's get the master list of all spells mentioned in the book
# Pages 140-143 contain the class lists.
# Pages 143-159 contain the detailed descriptions.

# Let's inspect the detailed descriptions by searching for all spell blocks
spells_data = []

# Known spells from Complete Adventurer (English & Portuguese):
# Let's scan all text from p143 to p160
full_text = {}
for p in range(143, 160):
    with open(f'temp_ocr/ocr_p{p}.txt', 'r', encoding='utf-8') as f:
        full_text[p] = f.read()

print("Loaded pages 143-159")
