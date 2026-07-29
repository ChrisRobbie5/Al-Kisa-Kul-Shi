import re

with open('src/components/features/DuasView.tsx', 'r') as f:
    content = f.read()

pattern = r"          pairs.push\(\{\n            arabic: currentArabic,\n            translation: \"\",\n            index: arrIndex,\n                    arrIndex\+\+;"
replacement = r"          pairs.push({\n            arabic: currentArabic,\n            translation: \"\",\n            index: arrIndex,\n          });\n          arrIndex++;"
content = re.sub(pattern, replacement, content)

pattern2 = r"          pairs.push\(\{\n            arabic: currentArabic,\n            translation: line.text,\n            index: arrIndex,\n                    arrIndex\+\+;"
replacement2 = r"          pairs.push({\n            arabic: currentArabic,\n            translation: line.text,\n            index: arrIndex,\n          });\n          arrIndex++;"
content = re.sub(pattern2, replacement2, content)

with open('src/components/features/DuasView.tsx', 'w') as f:
    f.write(content)
