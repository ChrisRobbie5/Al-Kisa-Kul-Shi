import re

with open('src/translations.ts', 'r', encoding='utf-8') as f:
    content = f.read()

new_keys = {
    'en': """
    made_in_remembrance: "Made in remembrance of Fatima",
    and_maroof_kiyani: "and Maroof Kiyani",
""",
    'ar-fusha': """
    made_in_remembrance: "صنع في ذكرى فاطمة",
    and_maroof_kiyani: "ومعروف كياني",
""",
    'ar-iraqi': """
    made_in_remembrance: "صنع في ذكرى فاطمة",
    and_maroof_kiyani: "ومعروف كياني",
""",
    'ur': """
    made_in_remembrance: "فاطمہ کی یاد میں بنایا گیا",
    and_maroof_kiyani: "اور معروف کیانی",
""",
    'hi': """
    made_in_remembrance: "फ़ातिमा की याद में बनाया गया",
    and_maroof_kiyani: "और मारूफ कियानी",
""",
    'fa': """
    made_in_remembrance: "به یاد فاطمه ساخته شده است",
    and_maroof_kiyani: "و معروف کیانی",
"""
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
