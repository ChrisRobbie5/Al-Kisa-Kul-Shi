import re

with open('src/components/features/DuasView.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# I will replace the logic in DuasView.tsx

old_logic = """    const translatedName = tTitle !== titleKey ? tTitle : fallbackTitle;
    const englishName = item.title;

    let displayTitle = englishName;
    let displaySubtitle = null;

    if (language === 'ar-fusha' || language === 'ar-iraqi') {
       displayTitle = translatedName;
    } else if (language === 'en') {
       displayTitle = englishName;
    } else {
       displayTitle = englishName;
       displaySubtitle = translatedName;
    }"""

new_logic = """    const translatedName = tTitle !== titleKey ? tTitle : fallbackTitle;
    const englishName = item.title;

    let displayTitle = englishName;
    let displaySubtitle = null;

    if (language === 'ar-fusha' || language === 'ar-iraqi') {
       displayTitle = translatedName;
       displaySubtitle = null;
    } else if (language === 'en') {
       displayTitle = englishName;
       displaySubtitle = null;
    } else {
       displayTitle = englishName;
       displaySubtitle = translatedName;
    }"""

# Actually, my previous logic was exactly that! Let's check why it didn't work.
