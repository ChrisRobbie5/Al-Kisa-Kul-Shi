import re

with open('src/translations.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Add translation keys

new_keys = {
    'en': '''    supplication_desc: "Supplication.",
    salutation_desc: "Salutation.",
    sunset_prayer: "Sunset",
    midnight_shia: "Midnight (Shia)",
''',
    'ar-fusha': '''    supplication_desc: ".دعاء",
    salutation_desc: ".زيارة",
    sunset_prayer: "الغروب",
    midnight_shia: "منتصف الليل",
''',
    'ar-iraqi': '''    supplication_desc: ".دعاء",
    salutation_desc: ".زيارة",
    sunset_prayer: "الغروب",
    midnight_shia: "منتصف الليل",
''',
    'ur': '''    supplication_desc: ".دعا",
    salutation_desc: ".زیارت",
    sunset_prayer: "غروب آفتاب",
    midnight_shia: "نصف رات",
''',
    'fa': '''    supplication_desc: ".دعا",
    salutation_desc: ".زیارت",
    sunset_prayer: "غروب آفتاب",
    midnight_shia: "نیمه شب",
''',
    'hi': '''    supplication_desc: "दुआ।",
    salutation_desc: "ज़ियारत।",
    sunset_prayer: "सूर्यास्त",
    midnight_shia: "आधी रात",
'''
}

for lang, keys_content in new_keys.items():
    # Match double quotes or single quotes or just word
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
