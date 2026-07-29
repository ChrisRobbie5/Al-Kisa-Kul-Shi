import re

with open('src/translations.ts', 'r', encoding='utf-8') as f:
    content = f.read()

translations_en = {}

with open('mapping.txt', 'r') as f:
    lines = f.read().strip().split('\n')

for line in lines:
    parts = line.split('\t')
    if len(parts) == 2:
        k = 'title_' + parts[0].replace('-', '_')
        translations_en[k] = parts[1]

keys_content = ""
for k, v in translations_en.items():
    val = v.replace('"', '\\"')
    keys_content += f'    {k}: "{val}",\n'

# Match English
pattern = r"(\ben\b)\s*:\s*\{([^}]*)\}"

def repl(match):
    lang_key = match.group(1)
    inner_content = match.group(2)
    if not inner_content.strip().endswith(','):
        inner_content += ','
    return f"{lang_key}: {{{inner_content}\n{keys_content}}}"

content = re.sub(pattern, repl, content)

with open('src/translations.ts', 'w', encoding='utf-8') as f:
    f.write(content)
