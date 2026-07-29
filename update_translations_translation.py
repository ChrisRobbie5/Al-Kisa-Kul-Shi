import re
import json

with open('src/translations.ts', 'r', encoding='utf-8') as f:
    content = f.read()

new_keys = {
    'en': "translation: 'Translation',",
    'ar-fusha': "translation: 'الترجمة',",
    'ar-iraqi': "translation: 'الترجمة',",
    'ur': "translation: 'ترجمہ',",
    'hi': "translation: 'अनुवाद',",
    'fa': "translation: 'ترجمه',"
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
