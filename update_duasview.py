import json
import re

with open('full_catalog.json', 'r') as f:
    full_catalog = json.load(f)

with open('src/components/features/DuasView.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

pattern = r"const catalog: CatalogItem\[\] = \[.*?\];"
replacement = f"const catalog: CatalogItem[] = {json.dumps(full_catalog, indent=2)};"
new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open('src/components/features/DuasView.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)
