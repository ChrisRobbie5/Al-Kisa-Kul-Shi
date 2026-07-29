import re

with open('src/components/features/PrayerTimesView.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("label: 'Sunset'", "label: t('sunset_prayer') || 'Sunset'")
content = content.replace("label: 'Midnight (Shia)'", "label: t('midnight_shia') || 'Midnight (Shia)'")

with open('src/components/features/PrayerTimesView.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
