import React from 'react';
import { Tab } from '../../types';
import { Home, BookOpen, Heart, Clock, Compass, Hand, Settings } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface AppLayoutProps {
  children: React.ReactNode;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export function AppLayout({ children, activeTab, setActiveTab }: AppLayoutProps) {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();

  const navItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: t('home'), icon: <Home className="w-6 h-6" /> },
    { id: 'quran', label: t('quran'), icon: <BookOpen className="w-6 h-6" /> },
    { id: 'duas', label: t('duas'), icon: <Heart className="w-6 h-6" /> },
    { id: 'prayers', label: t('prayers'), icon: <Clock className="w-6 h-6" /> },
    { id: 'qibla', label: t('qibla'), icon: <Compass className="w-6 h-6" /> },
    { id: 'tasbih', label: t('tasbih'), icon: <Hand className="w-6 h-6" /> },
    { id: 'settings', label: t('settings'), icon: <Settings className="w-6 h-6" /> },
  ];

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-[#0f172a] text-slate-800 dark:text-slate-200 font-sans pb-28 md:pb-12 md:pl-24 transition-colors duration-300 relative selection:bg-amber-500/30`}>
      {/* Background ambient light */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-600/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Main Content Area */}
      <main className="w-full max-w-5xl mx-auto min-h-screen pb-16 relative z-10 px-4 md:px-8">
        {children}
      </main>

      {/* Footer Memorial */}
      <footer className="w-full max-w-5xl mx-auto text-center pb-24 md:pb-8 text-slate-400 dark:text-slate-500/60 text-[10px] md:text-xs tracking-[0.2em] uppercase flex flex-col space-y-2 relative z-10 font-display">
        <span>{t('made_in_remembrance') || 'Made in remembrance of Fatima'}</span>
        <span>{t('and_maroof_kiyani') || 'and Maroof Kiyani'}</span>
      </footer>

      {/* Bottom Navigation for Mobile, Side Navigation for Desktop */}
      <nav className="fixed bottom-0 left-0 right-0 md:top-0 md:right-auto md:w-24 md:h-full bg-white dark:bg-[#0b1121]/95 backdrop-blur-xl border-t md:border-t-0 md:border-r border-slate-200 dark:border-slate-800/60 z-50 overflow-x-auto md:overflow-x-visible shadow-2xl">
        <div className="flex md:flex-col items-center justify-start md:justify-center md:space-y-8 px-4 md:px-0 py-4 md:py-8 min-w-full md:min-w-0 md:h-full hide-scrollbar space-x-6 md:space-x-0">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-300 min-w-[4.5rem] md:min-w-0 md:w-16 md:h-16 group relative
                  ${isActive 
                    ? 'text-amber-400' 
                    : 'text-slate-400 dark:text-slate-500 hover:text-teal-400'
                  }`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-amber-400/10 rounded-2xl scale-110 transition-transform blur-sm"></div>
                )}
                <div className={`relative z-10 transition-transform duration-300 ${isActive ? '-translate-y-1' : 'group-hover:-translate-y-1'}`}>
                  {item.icon}
                </div>
                <span className={`text-[10px] font-medium mt-1.5 relative z-10 font-display tracking-wide ${isActive ? 'text-amber-400 opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
