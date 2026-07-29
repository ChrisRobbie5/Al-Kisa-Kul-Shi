import json
import re

with open('full_catalog.json', 'r') as f:
    full_catalog = json.load(f)

with open('src/data/duas.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace export const catalog: Supplication[] = [ ... ];
pattern = r"export const catalog: Supplication\[\] = \[.*?\];"
replacement = f"export const catalog: Supplication[] = {json.dumps(full_catalog, indent=2)};"

# re.DOTALL to match across newlines
new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open('src/data/duas.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)
