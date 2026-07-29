import re

with open('src/components/features/DuasView.tsx', 'r') as f:
    content = f.read()

pattern = r"import\(\"../../data/duas\"\)\.then\(\(module\) => \{.*?// Fallback to fetch"

replacement = r"// Fetch from GitHub directly since local data is truncated\n      // Fallback to fetch"

new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open('src/components/features/DuasView.tsx', 'w') as f:
    f.write(new_content)
