import re

with open('src/components/features/DuasView.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_logic = """      description: tDesc !== descKey ? tDesc : item.description,"""
new_logic = """      description: tDesc !== descKey ? tDesc : (item.description === 'Supplication.' ? (t('supplication_desc') || item.description) : (item.description === 'Salutation.' ? (t('salutation_desc') || item.description) : item.description)),"""

content = content.replace(old_logic, new_logic)

with open('src/components/features/DuasView.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
