import re

with open('src/components/features/DuasView.tsx', 'r') as f:
    content = f.read()

pattern = r"  useEffect\(\(\) => \{\n    if \(selectedItem\) \{.*?\n  \}, \[selectedItem, t\]\);"

replacement = """  useEffect(() => {
    if (selectedItem) {
      setLoading(true);
      fetch(
        `https://raw.githubusercontent.com/adeeb10abbas/shia-library-json/main/db/duas/${selectedItem.filename}`,
      )
        .then((res) => {
          if (!res.ok) throw new Error("Not found");
          return res.json();
        })
        .then((data) => {
          setContent(data);
          setLoading(false);
        })
        .catch((err) => {
          setContent({
            lines: [
              {
                index: 1,
                kind: "arabic" as const,
                text:
                  t("content_unavailable") ||
                  "Content currently unavailable for this specific dua.",
              },
            ],
          });
          setLoading(false);
        });
    }
  }, [selectedItem, t]);"""

new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open('src/components/features/DuasView.tsx', 'w') as f:
    f.write(new_content)
