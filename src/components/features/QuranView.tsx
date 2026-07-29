import React, { useState, useEffect } from 'react';
import { Search, Loader2, ArrowLeft, Settings, Star } from 'lucide-react';
import { useLanguage, AppLanguage } from '../../context/LanguageContext';
import { Tab } from '../../types';

interface SurahMeta {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
}

const getEdition = (lang: AppLanguage) => {
  switch (lang) {
    case 'en': return 'en.asad';
    case 'ur': return 'ur.jalandhry';
    case 'hi': return 'hi.hindi';
    case 'fa': return 'fa.ansarian';
    case 'ar-iraqi': return 'ar.muyassar';
    case 'ar-fusha': return 'ar.muyassar'; // fallback
    default: return 'en.asad';
  }
};

interface QuranViewProps {
  setActiveTab: (tab: Tab) => void;
  onOpenSettings?: () => void;
}

export function QuranView({ setActiveTab, onOpenSettings }: QuranViewProps) {
  const { language, showTranslation, translationLanguage, fontSize, t } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [surahsList, setSurahsList] = useState<SurahMeta[]>([]);
  const [loadingList, setLoadingList] = useState(true);

  const [surahData, setSurahData] = useState<{ arabic: Ayah[], translation: Ayah[] } | null>(null);
  const [loadingSurah, setLoadingSurah] = useState(false);
  
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (selectedSurah) {
      const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavorite(favs.some((f: any) => f.id === `surah-${selectedSurah}`));
    }
  }, [selectedSurah]);

  const toggleFavorite = () => {
    if (!selectedSurah) return;
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    const surahId = `surah-${selectedSurah}`;
    if (isFavorite) {
      const newFavs = favs.filter((f: any) => f.id !== surahId);
      localStorage.setItem('favorites', JSON.stringify(newFavs));
      setIsFavorite(false);
    } else {
      const surahMeta = surahsList.find(s => s.number === selectedSurah);
      if (surahMeta) {
        favs.push({ id: surahId, title: surahMeta.englishName, type: 'quran' });
        localStorage.setItem('favorites', JSON.stringify(favs));
        setIsFavorite(true);
      }
    }
  };

  useEffect(() => {
    fetch('https://api.alquran.cloud/v1/meta')
      .then(res => res.json())
      .then(data => {
        if (data?.data?.surahs?.references) {
          setSurahsList(data.data.surahs.references);
        }
        setLoadingList(false);
      })
      .catch(() => setLoadingList(false));
  }, []);

  useEffect(() => {
    if (selectedSurah !== null) {
      setLoadingSurah(true);
      
      const translationEdition = getEdition(translationLanguage);
      fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah}/editions/quran-uthmani,${translationEdition}`)
        .then(res => res.json())
        .then(data => {
          if (data?.data && data.data.length >= 1) {
            setSurahData({
              arabic: data.data[0].ayahs,
              translation: data.data[1]?.ayahs || [],
            });
          }
          setLoadingSurah(false);
        })
        .catch(() => setLoadingSurah(false));
    }
  }, [selectedSurah, translationLanguage]);

  const filteredSurahs = surahsList.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.englishName.toLowerCase().includes(search.toLowerCase())
  );

  const isRtl = ['ur', 'fa', 'ar-iraqi', 'ar-fusha'].includes(translationLanguage);

  if (selectedSurah && surahData) {
    const surahMeta = surahsList.find(s => s.number === selectedSurah);
    return (
      <div className="animate-in slide-in-from-right-4 duration-500">
        <div className="flex items-center justify-between mb-8 sticky top-4 bg-slate-50 dark:bg-[#0f172a]/80 backdrop-blur-xl p-4 rounded-3xl z-40 border border-slate-200 dark:border-slate-800/60 shadow-xl">
          <button 
            onClick={() => { setSelectedSurah(null); }}
            className="flex items-center space-x-2 text-slate-400 dark:text-slate-500 hover:text-amber-400 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">{t('back')}</span>
          </button>
          <div className="flex items-center space-x-2">
            <button onClick={toggleFavorite} className="p-2 rounded-full text-slate-400 hover:text-amber-500 transition-colors">
              <Star className={`w-5 h-5 ${isFavorite ? 'text-amber-500 fill-amber-500' : ''}`} />
            </button>
            <button onClick={() => onOpenSettings ? onOpenSettings() : setActiveTab('settings')} className="p-2 rounded-full text-slate-400 hover:text-amber-500 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        <header className="text-center mb-12 relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 blur-2xl">
            <div className="w-48 h-48 bg-amber-500/20 rounded-full"></div>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-amber-400 font-arabic mb-4 drop-shadow-md">
            {surahMeta?.name}
          </h2>
          <p className="text-slate-400 dark:text-slate-500 dark:text-slate-400 text-lg font-medium tracking-wide">
            {surahMeta?.englishName} • {surahMeta?.englishNameTranslation} • {surahMeta?.numberOfAyahs} Ayahs
          </p>
        </header>

        {loadingSurah ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-amber-500" />
          </div>
        ) : (
          <div className="space-y-8 max-w-4xl mx-auto">
            {surahData.arabic.map((ayah, index) => (
              <div key={ayah.number} className="bg-white dark:bg-[#0b1121]/50 rounded-[2.5rem] p-6 md:p-10 border border-slate-200 dark:border-slate-800/60 shadow-lg flex flex-col space-y-8 relative overflow-hidden group">
                
                {/* Decorative Pattern Background */}
                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #d97706 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                
                <div className="flex justify-between items-start gap-6 relative z-10">
                  <div className="flex flex-col space-y-3">
                    <span className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-800/80 border border-amber-900/30 text-amber-500 font-bold font-mono shadow-inner text-lg">
                      {ayah.numberInSurah}
                    </span>
                  </div>
                  <p className="font-arabic leading-[1.8] md:leading-[2] text-right text-slate-900 dark:text-slate-100 flex-1" style={{ fontSize: `${fontSize}px` }} dir="rtl">
                    {ayah.text}
                  </p>
                </div>
                {showTranslation && (
                  <div className="border-t border-slate-200 dark:border-slate-800/50 pt-8 relative z-10">
                    <p className={`text-slate-400 dark:text-slate-500 dark:text-slate-400 text-lg md:text-xl font-display leading-relaxed ${isRtl ? 'text-right' : 'text-left'}`} dir={isRtl ? 'rtl' : 'ltr'}>
                      {surahData.translation[index]?.text}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12 text-center pt-8">
        <h2 className="text-4xl md:text-5xl font-bold text-amber-500 mb-3 font-display">{t('al_quran') || 'Al Quran'}</h2>
        <p className="text-slate-400 dark:text-slate-500 dark:text-slate-400 font-medium tracking-wide">{t('read_reflect') || 'Read and reflect upon the Holy Word'}</p>
      </header>

      <div className="relative mb-12 max-w-2xl mx-auto group">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 dark:text-slate-500 group-focus-within:text-amber-500 transition-colors" />
        <input 
          type="text" 
          placeholder={t('search_quran')} 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white dark:bg-[#0b1121] border border-slate-200 dark:border-slate-800 rounded-full py-5 pl-16 pr-6 text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 shadow-inner transition-all text-lg font-display"
        />
      </div>

      {loadingList ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-12 h-12 animate-spin text-teal-500" />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 max-w-5xl mx-auto">
          {filteredSurahs.map((surah) => (
            <div 
              key={surah.number}
              onClick={() => setSelectedSurah(surah.number)}
              className="bg-white dark:bg-[#0b1121]/80 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800/50 flex items-center justify-between cursor-pointer hover:border-teal-500/30 hover:bg-white dark:bg-[#0b1121] transition-all group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center space-x-5 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 flex items-center justify-center text-sm font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 group-hover:border-teal-500/30 group-hover:text-teal-400 transition-colors font-mono shadow-inner">
                  {surah.number}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 group-hover:text-amber-400 transition-colors font-display tracking-wide">{surah.englishName}</h3>
                  <p className="text-sm text-slate-400 dark:text-slate-500 font-medium mt-1">{surah.englishNameTranslation}</p>
                </div>
              </div>
              <div className="text-right relative z-10">
                <h3 className="font-bold text-2xl text-slate-700 dark:text-slate-300 font-arabic">{surah.name}</h3>
                <span className="text-[10px] uppercase tracking-widest text-teal-600/70 font-bold mt-1 block">{surah.revelationType.toLowerCase() === 'meccan' ? (t('meccan') || 'MECCAN') : (t('medinan') || 'MEDINAN')}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
