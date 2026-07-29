import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage, languageNames, AppLanguage } from '../../context/LanguageContext';

import { ArrowLeft } from 'lucide-react';

export function SettingsView({ onBack }: { onBack?: () => void }) {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const {
    language, setLanguage,
    showTranslation, setShowTranslation,
    translationLanguage, setTranslationLanguage,
    showTransliteration, setShowTransliteration,
    fontSize, setFontSize,
    t
  } = useLanguage();

  return (
    <div className="animate-in fade-in duration-500 max-w-3xl mx-auto min-h-screen bg-white dark:bg-[#0b1121] text-slate-900 dark:text-slate-100 pb-12">
      <header className="flex items-center p-4 border-b border-slate-200 dark:border-slate-800 bg-blue-700 text-white dark:bg-slate-900">
        {onBack && (
          <button onClick={onBack} className="p-2 mr-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <h1 className="text-xl font-medium ml-2">{t('settings')}</h1>
      </header>

      <div className="space-y-0">
        {/* Font Size Section */}
        <div className="bg-slate-200 dark:bg-slate-800 px-4 py-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
          {t('adjust_font')}
        </div>
        <div className="p-8 flex flex-col items-center justify-center space-y-6 bg-white dark:bg-[#0f172a]">
          <p className="font-arabic" style={{ fontSize: `${fontSize}px` }} dir="rtl">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
          <div className="w-full max-w-md space-y-4 text-center mt-8">
            <input 
              type="range" 
              min="16" 
              max="64" 
              value={fontSize} 
              onChange={(e) => setFontSize(parseInt(e.target.value))}
              className="w-full h-1 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-600 dark:accent-slate-400"
            />
          </div>
        </div>

        {/* Translations Section */}
        <div className="bg-slate-200 dark:bg-slate-800 px-4 py-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
          {t('translations')}
        </div>
        <div className="bg-white dark:bg-[#0f172a] flex flex-col">
          <label className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            <span className="text-slate-800 dark:text-slate-200">{t('show_translation')}</span>
            <input 
              type="checkbox" 
              checked={showTranslation} 
              onChange={(e) => setShowTranslation(e.target.checked)}
              className="w-6 h-6 rounded-md border-slate-300 text-slate-800 dark:text-slate-200 focus:ring-slate-800 dark:focus:ring-slate-200 accent-slate-800 dark:accent-slate-200"
            />
          </label>
          
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col space-y-2">
            <span className="text-slate-800 dark:text-slate-200">{t('translation_language')}</span>
            <select 
              value={translationLanguage} 
              onChange={(e) => setTranslationLanguage(e.target.value as AppLanguage)}
              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-3 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              {Object.entries(languageNames).map(([key, name]) => (
                <option key={key} value={key}>{name}</option>
              ))}
            </select>
          </div>

          <label className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            <span className="text-slate-800 dark:text-slate-200">{t('show_transliteration')}</span>
            <input 
              type="checkbox" 
              checked={showTransliteration} 
              onChange={(e) => setShowTransliteration(e.target.checked)}
              className="w-6 h-6 rounded-md border-slate-300 text-slate-800 dark:text-slate-200 focus:ring-slate-800 dark:focus:ring-slate-200 accent-slate-800 dark:accent-slate-200"
            />
          </label>
        </div>

        {/* App Language Section */}
        <div className="bg-slate-200 dark:bg-slate-800 px-4 py-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
          {t('app_language')}
        </div>
        <div className="bg-white dark:bg-[#0f172a] p-4 flex flex-col space-y-2">
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value as AppLanguage)}
            className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-3 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            {Object.entries(languageNames).map(([key, name]) => (
              <option key={key} value={key}>{name}</option>
            ))}
          </select>
        </div>

        {/* Theme Section */}
        <div className="bg-slate-200 dark:bg-slate-800 px-4 py-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
          {t('theme')}
        </div>
        <div className="bg-white dark:bg-[#0f172a] flex flex-col">
          <label className="flex items-center space-x-4 p-4 border-b border-slate-100 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            <input 
              type="radio" 
              name="theme" 
              checked={!isDarkMode}
              onChange={() => { if(isDarkMode) toggleDarkMode(); }}
              className="w-6 h-6 text-slate-800 dark:text-slate-200 focus:ring-slate-800 dark:focus:ring-slate-200 accent-slate-800 dark:accent-slate-200"
            />
            <span className="text-slate-800 dark:text-slate-200">{t('light_theme')}</span>
          </label>
          <label className="flex items-center space-x-4 p-4 border-b border-slate-100 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            <input 
              type="radio" 
              name="theme" 
              checked={isDarkMode}
              onChange={() => { if(!isDarkMode) toggleDarkMode(); }}
              className="w-6 h-6 text-slate-800 dark:text-slate-200 focus:ring-slate-800 dark:focus:ring-slate-200 accent-slate-800 dark:accent-slate-200"
            />
            <span className="text-slate-800 dark:text-slate-200">{t('dark_theme')}</span>
          </label>
        </div>
      </div>
    </div>
  );
}
