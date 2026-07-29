import re
import json

with open('mapping.txt', 'r') as f:
    lines = f.read().strip().split('\n')

mapping = {}
for line in lines:
    parts = line.split('\t')
    if len(parts) == 2:
        mapping[parts[0]] = parts[1]

# Manually provide Arabic translations for the most common ones
# For Sahifa Sajjadiya we can just prefix "الصحيفة السجادية - " 
# and translate the rest using a simple map, or I can just use a dictionary.

translations_ar = {
    'dua-al-asharat': 'دعاء العشرات',
    'dua-al-iftitah': 'دعاء الافتتاح',
    'dua-kumayl': 'دعاء كميل',
    'dua-mashlool': 'دعاء المشلول',
    'dua-nudba': 'دعاء الندبة',
    'dua-sabah': 'دعاء الصباح',
    'ziyarat-ashura': 'زيارة عاشوراء',
    'ziyarat-jamia-kabira': 'الزيارة الجامعة الكبيرة',
    'ziyarat-warith': 'زيارة وارث',
    'ziyrat-aale-yasin': 'زيارة آل ياسين',
}

translations_ur = {
    'dua-al-asharat': 'دعائے عشرات',
    'dua-al-iftitah': 'دعائے افتتاح',
    'dua-kumayl': 'دعائے کمیل',
    'dua-mashlool': 'دعائے مشلول',
    'dua-nudba': 'دعائے ندبہ',
    'dua-sabah': 'دعائے صباح',
    'ziyarat-ashura': 'زیارت عاشورہ',
    'ziyarat-jamia-kabira': 'زیارت جامعہ کبیرہ',
    'ziyarat-warith': 'زیارت وارث',
    'ziyrat-aale-yasin': 'زیارت آل یاسین',
}

translations_fa = {
    'dua-al-asharat': 'دعای عشرات',
    'dua-al-iftitah': 'دعای افتتاح',
    'dua-kumayl': 'دعای کمیل',
    'dua-mashlool': 'دعای مشلول',
    'dua-nudba': 'دعای ندبه',
    'dua-sabah': 'دعای صباح',
    'ziyarat-ashura': 'زیارت عاشورا',
    'ziyarat-jamia-kabira': 'زیارت جامعه کبیره',
    'ziyarat-warith': 'زیارت وارث',
    'ziyrat-aale-yasin': 'زیارت آل یاسین',
}

translations_hi = {
    'dua-al-asharat': 'दुआ-ए-अशरात',
    'dua-al-iftitah': 'दुआ-ए-इफ़्तिताह',
    'dua-kumayl': 'दुआ-ए-कुमेल',
    'dua-mashlool': 'दुआ-ए-मशलूल',
    'dua-nudba': 'दुआ-ए-नुदबा',
    'dua-sabah': 'दुआ-ए-सबा',
    'ziyarat-ashura': 'ज़ियारत-ए-आशूरा',
    'ziyarat-jamia-kabira': 'ज़ियारत-ए-जामिया कबीरा',
    'ziyarat-warith': 'ज़ियारत-ए-वारिस',
    'ziyrat-aale-yasin': 'ज़ियारत आले यासीन',
}

# The rest are Sahifa Sajjadiya. Let's just generate a generic Arabic string for them.
for key in mapping:
    if key not in translations_ar:
        title = mapping[key]
        if title.startswith('Sahifa Sajjadiya'):
            translations_ar[key] = title.replace('Sahifa Sajjadiya', 'الصحيفة السجادية -')
        else:
            translations_ar[key] = title

for key in mapping:
    if key not in translations_ur:
        title = mapping[key]
        if title.startswith('Sahifa Sajjadiya'):
            translations_ur[key] = title.replace('Sahifa Sajjadiya', 'صحیفہ سجادیہ -')
        else:
            translations_ur[key] = title

for key in mapping:
    if key not in translations_fa:
        title = mapping[key]
        if title.startswith('Sahifa Sajjadiya'):
            translations_fa[key] = title.replace('Sahifa Sajjadiya', 'صحیفه سجادیه -')
        else:
            translations_fa[key] = title

for key in mapping:
    if key not in translations_hi:
        title = mapping[key]
        if title.startswith('Sahifa Sajjadiya'):
            translations_hi[key] = title.replace('Sahifa Sajjadiya', 'सहीफ़ा सज्जादिया -')
        else:
            translations_hi[key] = title

def format_keys(lang_dict):
    out = ""
    for k, v in lang_dict.items():
        key_name = 'title_' + k.replace('-', '_')
        val = v.replace('"', '\\"')
        out += f'    {key_name}: "{val}",\n'
    return out

with open('src/translations.ts', 'r', encoding='utf-8') as f:
    content = f.read()

new_keys = {
    'ar-fusha': format_keys(translations_ar),
    'ar-iraqi': format_keys(translations_ar),
    'ur': format_keys(translations_ur),
    'fa': format_keys(translations_fa),
    'hi': format_keys(translations_hi),
}

for lang, keys_content in new_keys.items():
    pattern = r"('" + lang + r"'|(?<!')\b" + lang + r"\b)\s*:\s*\{([^}]*)\}"
    
    def repl(match):
        lang_key = match.group(1)
        inner_content = match.group(2)
        if not inner_content.strip().endswith(','):
            inner_content += ','
        return f"{lang_key}: {{{inner_content}\n{keys_content}}}"
    
    content = re.sub(pattern, repl, content)

with open('src/translations.ts', 'w', encoding='utf-8') as f:
    f.write(content)
