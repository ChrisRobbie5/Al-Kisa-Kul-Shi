import React, { useState, useEffect } from 'react';
import { MapPin, Loader2, Bell, BellOff, Settings2, X, Music, Clock as ClockIcon, Heart, ArrowLeft, Settings } from 'lucide-react';
import { PrayerTimeData, Coordinates, Tab } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface PrayerSettings {
  enabled: boolean;
  offset: number; // minutes before/after
  sound: string;
  dua: string;
}

export function PrayerTimesView({ setActiveTab, onOpenSettings }: { setActiveTab: (t: Tab) => void, onOpenSettings: () => void }) {
  const { t } = useLanguage();
  const [prayers, setPrayers] = useState<PrayerTimeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locationName, setLocationName] = useState('Locating...');
  const [notifications, setNotifications] = useState<Record<string, PrayerSettings>>(() => {
    const saved = localStorage.getItem('prayerAlertSettings');
    return saved ? JSON.parse(saved) : {};
  });

  const [activeSettings, setActiveSettings] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('prayerAlertSettings', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    fetchPrayerTimes();
  }, []);

  const fetchPrayerTimes = () => {
    setLoading(true);
    setError(null);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            setLocationName(`${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`);
            const res = await fetch(`https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=4`);
            const data = await res.json();
            if (data && data.data && data.data.timings) {
              setPrayers(data.data.timings);
            } else {
              throw new Error('Invalid API response');
            }
          } catch (err) {
            setError('Failed to fetch prayer times. Please try again.');
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          setError(t('location_denied_najaf') || 'Location access denied. Using default (Najaf).');
          fetchDefaultPrayers();
        }
      );
    } else {
      setError(t('location_denied_najaf') || 'Geolocation not supported. Using default (Najaf).');
      fetchDefaultPrayers();
    }
  };

  const fetchDefaultPrayers = async () => {
    try {
      setLocationName('Najaf, Iraq');
      const res = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=Najaf&country=Iraq&method=4`);
      const data = await res.json();
      if (data && data.data && data.data.timings) {
        setPrayers(data.data.timings);
      }
    } catch (err) {
      setError('Failed to load prayer times.');
    } finally {
      setLoading(false);
    }
  };

  const toggleNotification = (prayer: string) => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
    setNotifications(prev => {
      const current = prev[prayer] || { enabled: false, offset: 0, sound: 'Adhan (Makkah)', dua: 'None' };
      return { ...prev, [prayer]: { ...current, enabled: !current.enabled } };
    });
  };

  const updateSettings = (prayer: string, updates: Partial<PrayerSettings>) => {
    setNotifications(prev => {
      const current = prev[prayer] || { enabled: false, offset: 0, sound: 'Adhan (Makkah)', dua: 'None' };
      return { ...prev, [prayer]: { ...current, ...updates } };
    });
  };

  const prayerList = [
    { key: 'Fajr', label: t('fajr') || 'Fajr' },
    { key: 'Sunrise', label: t('sunrise') || 'Sunrise' },
    { key: 'Dhuhr', label: t('dhuhr') || 'Dhuhr' },
    { key: 'Asr', label: t('asr') || 'Asr' },
    { key: 'Sunset', label: t('sunset_prayer') || 'Sunset' },
    { key: 'Maghrib', label: t('maghrib') || 'Maghrib' },
    { key: 'Isha', label: t('isha') || 'Isha' },
    { key: 'Midnight', label: t('midnight_shia') || 'Midnight (Shia)' },
  ];

  const sounds = ['Adhan (Makkah)', 'Adhan (Najaf)', 'Gentle Chime', 'Standard Alert'];
  const duas = ['None', 'Dua Faraj', 'Dua al-Ahd (Fajr)', 'Dua Kumayl (Isha)'];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-2xl mx-auto pt-8 pb-12">
      <div className="flex items-center justify-between mb-8 sticky top-4 bg-slate-50 dark:bg-[#0f172a]/80 backdrop-blur-xl p-4 rounded-3xl z-40 border border-slate-200 dark:border-slate-800/60 shadow-xl flex-wrap gap-4">
        <button 
          onClick={() => setActiveTab('home')}
          className="flex items-center space-x-2 text-slate-400 dark:text-slate-500 hover:text-amber-400 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">{t('back')}</span>
        </button>
        <button onClick={onOpenSettings} className="p-2 rounded-full text-slate-400 hover:text-amber-500 transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <header className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-teal-400 font-display drop-shadow-md">{t('prayer_times') || 'Prayer Times'}</h2>
        <div className="flex items-center space-x-2 text-slate-400 dark:text-slate-500 dark:text-slate-400 mt-4 bg-teal-500/10 border border-teal-500/20 w-fit px-4 py-2 rounded-full">
          <MapPin className="w-4 h-4 text-amber-500" />
          <span className="text-sm font-medium tracking-wide">{locationName}</span>
        </div>
      </header>

      {error && (
        <div className="bg-red-500/10 text-red-400 p-4 rounded-2xl mb-8 text-sm font-medium border border-red-500/20 shadow-lg">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-12 h-12 animate-spin text-amber-500" />
        </div>
      ) : prayers ? (
        <div className="space-y-5">
          {prayerList.map((prayer) => {
            const time = prayers[prayer.key as keyof PrayerTimeData];
            if (!time) return null;
            const settings = notifications[prayer.key] || { enabled: false, offset: 0, sound: 'Adhan (Makkah)', dua: 'None' };
            const isNotificationOn = settings.enabled;
            const isSettingsOpen = activeSettings === prayer.key;

            return (
              <div key={prayer.key} className="bg-white dark:bg-[#0b1121]/80 rounded-[2rem] border border-slate-200 dark:border-slate-800/60 shadow-lg overflow-hidden transition-all hover:border-amber-500/30 group">
                <div className="p-5 md:p-8 flex items-center justify-between relative">
                  {/* subtle glow */}
                  {isNotificationOn && <div className="absolute inset-0 bg-amber-500/5 pointer-events-none transition-opacity"></div>}
                  
                  <div className="flex flex-col relative z-10">
                    <span className="font-bold text-xl text-slate-800 dark:text-slate-200 group-hover:text-amber-400 transition-colors font-display tracking-wide">
                      {prayer.label}
                    </span>
                    {isNotificationOn && (
                      <span className="text-xs font-bold text-amber-500 mt-1.5 uppercase tracking-widest">
                        Alert {settings.offset > 0 ? `+${settings.offset}m` : settings.offset < 0 ? `${settings.offset}m` : 'at time'}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 md:space-x-6 relative z-10">
                    <span className="text-2xl md:text-4xl font-mono font-bold text-teal-400 drop-shadow-sm">
                      {time}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setActiveSettings(isSettingsOpen ? null : prayer.key)}
                        className={`p-2.5 rounded-xl transition-colors ${
                          isSettingsOpen ? 'bg-slate-800 text-amber-400' : 'text-slate-400 dark:text-slate-500 hover:bg-slate-800/50 hover:text-amber-400'
                        }`}
                        aria-label={`Settings for ${prayer.label}`}
                      >
                        <Settings2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => toggleNotification(prayer.key)}
                        className={`p-3 rounded-xl transition-all ${
                          isNotificationOn
                            ? 'text-[#0f172a] bg-amber-500 hover:bg-amber-400 shadow-lg shadow-amber-500/20'
                            : 'text-slate-400 dark:text-slate-500 hover:bg-slate-800 hover:text-slate-700 dark:text-slate-300 bg-slate-800/30 border border-slate-700/50'
                        }`}
                        aria-label={`Toggle notification for ${prayer.label}`}
                      >
                        {isNotificationOn ? (
                          <Bell className="w-5 h-5 fill-current" />
                        ) : (
                          <BellOff className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Settings Panel */}
                {isSettingsOpen && (
                  <div className="px-6 py-6 bg-slate-50 dark:bg-[#0f172a]/90 border-t border-slate-200 dark:border-slate-800/60 animate-in slide-in-from-top-2 duration-300">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="text-xs font-bold text-teal-500 uppercase tracking-[0.2em]">Alert Preferences</h4>
                      <button onClick={() => setActiveSettings(null)} className="text-slate-400 dark:text-slate-500 hover:text-amber-400 transition-colors p-1">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2.5">
                          <label className="text-[11px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center space-x-2">
                            <ClockIcon className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                            <span>Offset (Minutes)</span>
                          </label>
                          <input 
                            type="number" 
                            value={settings.offset}
                            onChange={(e) => updateSettings(prayer.key, { offset: parseInt(e.target.value) || 0 })}
                            className="w-full bg-white dark:bg-[#0b1121] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 shadow-inner font-mono"
                          />
                        </div>
                        <div className="space-y-2.5">
                          <label className="text-[11px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center space-x-2">
                            <Music className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                            <span>Sound</span>
                          </label>
                          <select 
                            value={settings.sound}
                            onChange={(e) => updateSettings(prayer.key, { sound: e.target.value })}
                            className="w-full bg-white dark:bg-[#0b1121] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 shadow-inner appearance-none cursor-pointer"
                          >
                            {sounds.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                      </div>
                      
                      <div className="space-y-2.5">
                        <label className="text-[11px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center space-x-2">
                          <Heart className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                          <span>Accompanied Recitation / Dua</span>
                        </label>
                        <select 
                          value={settings.dua}
                          onChange={(e) => updateSettings(prayer.key, { dua: e.target.value })}
                          className="w-full bg-white dark:bg-[#0b1121] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 shadow-inner appearance-none cursor-pointer"
                        >
                          {duas.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
