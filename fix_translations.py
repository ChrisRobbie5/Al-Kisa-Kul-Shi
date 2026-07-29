import re

with open('src/translations.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Only add to ar-fusha and ar-iraqi since they were missed.
translations_ar = {
    'title_dua_al_asharat': 'دعاء العشرات',
    'title_dua_al_iftitah': 'دعاء الافتتاح',
    'title_dua_kumayl': 'دعاء كميل',
    'title_dua_mashlool': 'دعاء المشلول',
    'title_dua_nudba': 'دعاء الندبة',
    'title_dua_sabah': 'دعاء الصباح',
    'title_ziyarat_ashura': 'زيارة عاشوراء',
    'title_ziyarat_jamia_kabira': 'الزيارة الجامعة الكبيرة',
    'title_ziyarat_warith': 'زيارة وارث',
    'title_ziyrat_aale_yasin': 'زيارة آل ياسين',
}

with open('mapping.txt', 'r') as f:
    lines = f.read().strip().split('\n')

for line in lines:
    parts = line.split('\t')
    if len(parts) == 2:
        k = 'title_' + parts[0].replace('-', '_')
        if k not in translations_ar:
            v = parts[1]
            if v.startswith('Sahifa Sajjadiya'):
                translations_ar[k] = v.replace('Sahifa Sajjadiya', 'الصحيفة السجادية -')
            else:
                translations_ar[k] = v

keys_content = ""
for k, v in translations_ar.items():
    val = v.replace('"', '\\"')
    keys_content += f'    {k}: "{val}",\n'

# Fix the regex to match `"ar-fusha"`
for lang in ['ar-fusha', 'ar-iraqi']:
    # Match double quotes as well
    pattern = r"([\"']" + lang + r"[\"']|(?<![\"'])\b" + lang + r"\b)\s*:\s*\{([^}]*)\}"
    
    def repl(match):
        lang_key = match.group(1)
        inner_content = match.group(2)
        if not inner_content.strip().endswith(','):
            inner_content += ','
        return f"{lang_key}: {{{inner_content}\n{keys_content}}}"
    
    content = re.sub(pattern, repl, content)

with open('src/translations.ts', 'w', encoding='utf-8') as f:
    f.write(content)
