import re

with open('src/components/features/DuasView.tsx', 'r') as f:
    content = f.read()

pattern = r"  const renderPairedLines = \(\) => \{.*?\n  \}  return \("
replacement = """  const renderPairedLines = () => {
    if (!content) return null;
    const pairs: { arabic: string; translation: string; index: number }[] = [];
    let currentArabic = "";
    let arrIndex = 0;
    
    content.lines.forEach((line) => {
      if (line.kind === "arabic") {
        if (currentArabic) {
          pairs.push({
            arabic: currentArabic,
            translation: "",
            index: arrIndex,
          });
          arrIndex++;
        }
        currentArabic = line.text;
      } else if (line.kind === "translation") {
        if (currentArabic) {
          pairs.push({
            arabic: currentArabic,
            translation: line.text,
            index: arrIndex,
          });
          arrIndex++;
          currentArabic = "";
        }
      }
    });
    
    if (currentArabic)
      pairs.push({ arabic: currentArabic, translation: "", index: arrIndex });
      
    const isRtl = ["ur", "fa", "ar-iraqi", "ar-fusha"].includes(
      translationLanguage,
    );
    
    return pairs.map((pair, idx) => (
      <div
        key={idx}
        className="flex flex-col space-y-8 pb-10 border-b border-slate-200 dark:border-slate-800/60 last:border-0 relative"
      >
        <div className="absolute -left-4 top-4 text-xs font-mono text-slate-300 dark:text-slate-700/50 select-none">
          {pair.index}
        </div>
        <p className="text-right text-3xl md:text-4xl text-slate-800 dark:text-slate-100 font-arabic leading-[2.5] tracking-wide" style={{ fontSize: `${fontSize + 12}px` }}>
          {pair.arabic}
        </p>
        
        {pair.translation && showTranslation && (
          <p
            className={`text-slate-600 dark:text-slate-400 text-xl leading-relaxed max-w-4xl opacity-90 ${isRtl ? 'text-right font-arabic' : 'text-left'}`}
            dir={isRtl ? 'rtl' : 'ltr'}
            style={{ fontSize: `${fontSize}px` }}
          >
            {pair.translation}
          </p>
        )}
      </div>
    ));
  }
  return ("""

new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open('src/components/features/DuasView.tsx', 'w') as f:
    f.write(new_content)
