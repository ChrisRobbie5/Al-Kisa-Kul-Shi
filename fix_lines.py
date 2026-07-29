with open('src/components/features/DuasView.tsx', 'r') as f:
    content = f.read()

bad1 = """        if (currentArabic) {
          pairs.push({
            arabic: currentArabic,
            translation: "",
            index: arrIndex,
          
          arrIndex++;
        }"""
good1 = """        if (currentArabic) {
          pairs.push({
            arabic: currentArabic,
            translation: "",
            index: arrIndex,
          });
          arrIndex++;
        }"""

content = content.replace(bad1, good1)

bad2 = """        if (currentArabic) {
          pairs.push({
            arabic: currentArabic,
            translation: line.text,
            index: arrIndex,
          
          arrIndex++;
          currentArabic = "";
        }"""
good2 = """        if (currentArabic) {
          pairs.push({
            arabic: currentArabic,
            translation: line.text,
            index: arrIndex,
          });
          arrIndex++;
          currentArabic = "";
        }"""
content = content.replace(bad2, good2)

with open('src/components/features/DuasView.tsx', 'w') as f:
    f.write(content)
