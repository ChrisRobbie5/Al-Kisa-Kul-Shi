import React from 'react';
import { Tab } from '../../types';
import { Star, ArrowLeft, Settings } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function FavoritesView({ setActiveTab, onOpenSettings }: { setActiveTab: (t: Tab) => void, onOpenSettings: () => void }) {
  const { t, language } = useLanguage();
  const [favorites, setFavorites] = React.useState<any[]>([]);

  React.useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(favs);
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto pb-12">
      <div className="flex items-center justify-between mb-8 sticky top-4 bg-slate-50 dark:bg-[#0f172a]/80 backdrop-blur-xl p-4 rounded-3xl z-40 border border-slate-200 dark:border-slate-800/60 shadow-xl flex-wrap gap-4">
        <button 
          onClick={() => setActiveTab('home')}
          className="flex items-center space-x-2 text-slate-400 dark:text-slate-500 hover:text-amber-400 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">{t('back')}</span>
        </button>
        <h2 className="text-xl font-bold font-arabic text-amber-500">{t('favorites')}</h2>
        <button onClick={onOpenSettings} className="p-2 rounded-full text-slate-400 hover:text-amber-500 transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        {favorites.length === 0 ? (
          <div className="text-center text-slate-500 py-20">{t('no_favorites_yet')}</div>
        ) : (
          favorites.map((fav, i) => (
            <div key={i} className="bg-white dark:bg-[#0b1121]/80 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800/50 flex items-center justify-between cursor-pointer hover:border-amber-500/30 transition-all">
              <div>
                <div className="flex flex-col">
                  <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">
                    {(() => {
                      const titleKey = `title_${fav.id?.replace(/-/g, '_')}`;
                      const tTitle = t(titleKey);
                      let fallbackTitle = fav.title;
                      if (tTitle === titleKey) {
                          fallbackTitle = fallbackTitle.replace('Dua', t('dua')).replace('Ziyarat', t('ziyarat'));
                      }
                      const translatedName = tTitle !== titleKey ? tTitle : fallbackTitle;
                      
                      if (language === 'ar-fusha' || language === 'ar-iraqi') {
                         return translatedName;
                      } else if (language === 'en') {
                         return fav.title;
                      }
                      return fav.title;
                    })()}
                  </h3>
                  {(() => {
                    if (language === 'ar-fusha' || language === 'ar-iraqi' || language === 'en') return null;
                    const titleKey = `title_${fav.id?.replace(/-/g, '_')}`;
                    const tTitle = t(titleKey);
                    let fallbackTitle = fav.title;
                    if (tTitle === titleKey) {
                        fallbackTitle = fallbackTitle.replace('Dua', t('dua')).replace('Ziyarat', t('ziyarat'));
                    }
                    const translatedName = tTitle !== titleKey ? tTitle : fallbackTitle;
                    return (
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                        {translatedName}
                      </p>
                    );
                  })()}
                </div>
                <p className="text-sm text-slate-400 mt-1 capitalize">{t(fav.type) || fav.type}</p>
              </div>
              <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
