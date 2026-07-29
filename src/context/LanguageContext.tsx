import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations } from '../translations';

export type AppLanguage = 'ar-fusha' | 'ar-iraqi' | 'en' | 'ur' | 'hi' | 'fa';

export const languageNames: Record<AppLanguage, string> = {
  'ar-fusha': 'العربية الفصحى (Arabic Fusha)',
  'ar-iraqi': 'عراقي (Iraqi Ammiya)',
  'en': 'English',
  'ur': 'اردو (Urdu)',
  'hi': 'हिंदी (Hindi)',
  'fa': 'فارسی (Farsi)'
};

interface LanguageContextType {
  language: AppLanguage; // This is the overall app language
  setLanguage: (lang: AppLanguage) => void;
  
  // Specific settings for translations
  showTranslation: boolean;
  setShowTranslation: (show: boolean) => void;
  
  translationLanguage: AppLanguage;
  setTranslationLanguage: (lang: AppLanguage) => void;

  showTransliteration: boolean;
  setShowTransliteration: (show: boolean) => void;

  fontSize: number;
  setFontSize: (size: number) => void;

  t: (key: string) => string;
}

const defaultContext: LanguageContextType = {
  language: 'en',
  setLanguage: () => {},
  showTranslation: false,
  setShowTranslation: () => {},
  translationLanguage: 'en',
  setTranslationLanguage: () => {},
  showTransliteration: false,
  setShowTransliteration: () => {},
  fontSize: 24,
  setFontSize: () => {},
  t: (key: string) => key
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<AppLanguage>(() => {
    return (localStorage.getItem('appLanguage') as AppLanguage) || 'en';
  });
  const [showTranslation, setShowTranslation] = useState<boolean>(() => {
    return localStorage.getItem('showTranslation') === 'true';
  });
  const [translationLanguage, setTranslationLanguage] = useState<AppLanguage>(() => {
    return (localStorage.getItem('translationLanguage') as AppLanguage) || 'en';
  });
  const [showTransliteration, setShowTransliteration] = useState<boolean>(() => {
    return localStorage.getItem('showTransliteration') === 'true';
  });
  const [fontSize, setFontSize] = useState<number>(() => {
    const saved = localStorage.getItem('fontSize');
    return saved ? parseInt(saved, 10) : 24;
  });

  useEffect(() => { localStorage.setItem('appLanguage', language); }, [language]);
  useEffect(() => { localStorage.setItem('showTranslation', String(showTranslation)); }, [showTranslation]);
  useEffect(() => { localStorage.setItem('translationLanguage', translationLanguage); }, [translationLanguage]);
  useEffect(() => { localStorage.setItem('showTransliteration', String(showTransliteration)); }, [showTransliteration]);
  useEffect(() => { localStorage.setItem('fontSize', String(fontSize)); }, [fontSize]);

  const t = useCallback((key: string) => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{
      language, setLanguage,
      showTranslation, setShowTranslation,
      translationLanguage, setTranslationLanguage,
      showTransliteration, setShowTransliteration,
      fontSize, setFontSize,
      t
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
