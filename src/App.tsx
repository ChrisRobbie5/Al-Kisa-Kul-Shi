/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Tab } from './types';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AppLayout } from './components/layout/AppLayout';
import { HomeView } from './components/features/HomeView';
import { QuranView } from './components/features/QuranView';
import { DuasView } from './components/features/DuasView';
import { PrayerTimesView } from './components/features/PrayerTimesView';
import { QiblaView } from './components/features/QiblaView';
import { TasbihView } from './components/features/TasbihView';
import { SettingsView } from './components/features/SettingsView';
import { FavoritesView } from './components/features/FavoritesView';
import { LanguageSelectorModal } from './components/LanguageSelectorModal';

function AppContent({ activeTab, setActiveTab, renderContent, isSettingsOpen, setIsSettingsOpen }: any) {
  const { language } = useLanguage();
  const isRtl = ['ur', 'fa', 'ar-iraqi', 'ar-fusha'].includes(language);
  
  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  }, [isRtl]);

  if (isSettingsOpen) {
    return (
      <AppLayout activeTab={activeTab} setActiveTab={setActiveTab}>
        <SettingsView onBack={() => setIsSettingsOpen(false)} />
      </AppLayout>
    );
  }

  return (
    <AppLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </AppLayout>
  );
}

export default function App() {
  const [activeTab, setActiveTabState] = useState<Tab>('home');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const setActiveTab = (tab: Tab) => {
    if (tab === 'settings') {
      setIsSettingsOpen(true);
    } else {
      setActiveTabState(tab);
      setIsSettingsOpen(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView setActiveTab={setActiveTab} onOpenSettings={() => setIsSettingsOpen(true)} />;
      case 'quran':
        return <QuranView setActiveTab={setActiveTab} onOpenSettings={() => setIsSettingsOpen(true)} />;
      case 'duas':
        return <DuasView setActiveTab={setActiveTab} onOpenSettings={() => setIsSettingsOpen(true)} />;
      case 'prayers':
        return <PrayerTimesView setActiveTab={setActiveTab} onOpenSettings={() => setIsSettingsOpen(true)} />;
      case 'qibla':
        return <QiblaView setActiveTab={setActiveTab} onOpenSettings={() => setIsSettingsOpen(true)} />;
      case 'tasbih':
        return <TasbihView setActiveTab={setActiveTab} onOpenSettings={() => setIsSettingsOpen(true)} />;
      case 'favorites':
        return <FavoritesView setActiveTab={setActiveTab} onOpenSettings={() => setIsSettingsOpen(true)} />;
      case 'settings':
        return <HomeView setActiveTab={setActiveTab} onOpenSettings={() => setIsSettingsOpen(true)} />; // Fallback since it's a modal now
      default:
        return <HomeView setActiveTab={setActiveTab} onOpenSettings={() => setIsSettingsOpen(true)} />;
    }
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <LanguageSelectorModal />
        <AppContent 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          renderContent={renderContent}
          isSettingsOpen={isSettingsOpen}
          setIsSettingsOpen={setIsSettingsOpen}
        />
      </LanguageProvider>
    </ThemeProvider>
  );
}
