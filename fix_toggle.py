with open('src/components/features/DuasView.tsx', 'r') as f:
    content = f.read()

bad = """  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    if (selectedItem) {
      const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavorite(favs.some((f: any) => f.id === selectedItem.id));
    }
  }, [selectedItem, t]);"""

good = """  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    if (selectedItem) {
      const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavorite(favs.some((f: any) => f.id === selectedItem.id));
    }
  }, [selectedItem, t]);

  const toggleFavorite = () => {
    if (!selectedItem) return;
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isFav = favs.some((f: any) => f.id === selectedItem.id);
    if (isFav) {
      const newFavs = favs.filter((f: any) => f.id !== selectedItem.id);
      localStorage.setItem('favorites', JSON.stringify(newFavs));
      setIsFavorite(false);
    } else {
      favs.push(selectedItem);
      localStorage.setItem('favorites', JSON.stringify(favs));
      setIsFavorite(true);
    }
  };"""

content = content.replace(bad, good)
with open('src/components/features/DuasView.tsx', 'w') as f:
    f.write(content)
