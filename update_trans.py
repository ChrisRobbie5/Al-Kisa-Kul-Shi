with open('src/translations.ts', 'r') as f:
    content = f.read()

content = content.replace('    duas: "الأدعية والزيارات",\n', '    duas: "الأدعية والزيارات",\n    dua: "دعاء",\n    ziyarat: "زيارة",\n')
content = content.replace('    duas: "أدعية وزيارات",\n', '    duas: "أدعية وزيارات",\n    dua: "دعاء",\n    ziyarat: "زيارة",\n')

with open('src/translations.ts', 'w') as f:
    f.write(content)
