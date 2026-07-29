with open('src/components/features/DuasView.tsx', 'r') as f:
    content = f.read()

target = "  const [isFavorite, setIsFavorite] = useState(false);\n"
replacement = """  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (selectedItem) {
      const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavorite(favs.some((f: any) => f.id === selectedItem.id));
    }
  }, [selectedItem]);

  const toggleFavorite = () => {
    if (!selectedItem) return;
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isFav = favs.some((f: any) => f.id === selectedItem.id);
    if (isFav) {
      const newFavs = favs.filter((f: any) => f.id !== selectedItem.id);
      localStorage.setItem('favorites', JSON.stringify(newFavs));
      setIsFavorite(false);
    } else {
      favs.push({ id: selectedItem.id, title: selectedItem.title, type: selectedItem.type });
      localStorage.setItem('favorites', JSON.stringify(favs));
      setIsFavorite(true);
    }
  };\n"""

content = content.replace(target, replacement)

with open('src/components/features/DuasView.tsx', 'w') as f:
    f.write(content)
