import React, { useState, useEffect } from 'react';
import { useLanguage, AppLanguage, languageNames } from '../context/LanguageContext';

export function LanguageSelectorModal() {
  const { language, setLanguage, t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSelected = localStorage.getItem('languageSelected');
    if (!hasSelected) {
      setIsVisible(true);
    }
  }, []);

  if (!isVisible) return null;

  const handleSelect = (lang: AppLanguage) => {
    setLanguage(lang);
    localStorage.setItem('languageSelected', 'true');
    setIsVisible(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm px-4">
      <div className="bg-white dark:bg-[#0f172a] p-8 rounded-[2rem] shadow-2xl max-w-md w-full border border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl font-bold font-display text-slate-800 dark:text-slate-200 mb-6 text-center">
          {t('app_language')} / Select Language
        </h2>
        <div className="space-y-3">
          {(Object.entries(languageNames) as [AppLanguage, string][]).map(([key, name]) => (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              className={`w-full py-3 px-4 rounded-xl text-left font-medium transition-colors ${
                language === key
                  ? 'bg-amber-500 text-white'
                  : 'bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
