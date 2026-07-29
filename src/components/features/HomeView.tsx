import React, { useState, useEffect } from 'react';
import { BookOpen, MapPin, Heart, Hand, Clock, Settings, Star, BookKey, Search, Globe, ChevronDown } from 'lucide-react';
import { Tab } from '../../types';
import { useLanguage, AppLanguage } from '../../context/LanguageContext';

interface HomeViewProps {
  setActiveTab: (tab: Tab) => void;
  onOpenSettings?: () => void;
}

export function HomeView({ setActiveTab, onOpenSettings }: HomeViewProps) {
  const { language, t } = useLanguage();
  
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string; diffMs: number } | null>(null);
  const [locationName, setLocationName] = useState(t('najaf') || 'Najaf, Iraq');
  
  const [prayerTimes, setPrayerTimes] = useState<any>(null);
  
  useEffect(() => {
    const fetchTimes = async () => {
      try {
        let lat = 31.9934;
        let lng = 44.3149;
        
        if ('geolocation' in navigator) {
          try {
            const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            lat = pos.coords.latitude;
            lng = pos.coords.longitude;
            setLocationName(`${lat.toFixed(2)}°, ${lng.toFixed(2)}°`);
          } catch(e) {
            // keep Najaf defaults
          }
        }
        
        const res = await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=4`);
        const data = await res.json();
        
        if (data?.data?.timings) {
          setPrayerTimes(data.data.timings);
        }
      } catch (err) {
        console.error("Error fetching prayer times:", err);
      }
    };
    
    fetchTimes();
    const interval = setInterval(fetchTimes, 3600000); // refresh API hourly
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!prayerTimes) return;
    
    const updateCountdown = () => {
      const t = prayerTimes;
      const now = new Date();
      const p = [
        { name: 'Fajr', time: t.Fajr },
        { name: 'Sunrise', time: t.Sunrise },
        { name: 'Dhuhr', time: t.Dhuhr },
        { name: 'Asr', time: t.Asr },
        { name: 'Maghrib', time: t.Maghrib },
        { name: 'Isha', time: t.Isha },
        { name: 'Midnight', time: t.Midnight },
      ];
      
      let next = null;
      let minDiff = Infinity;
      for (let pTime of p) {
        const [h, m] = pTime.time.split(':');
        const ptDate = new Date();
        ptDate.setHours(parseInt(h), parseInt(m), 0, 0);
        const diff = ptDate.getTime() - now.getTime();
        if (diff > 0 && diff < minDiff) {
          minDiff = diff;
          next = { name: pTime.name, time: pTime.time, diffMs: diff };
        }
      }
      if (!next) {
        // Next is Fajr tomorrow
        const [h, m] = t.Fajr.split(':');
        const ptDate = new Date();
        ptDate.setDate(ptDate.getDate() + 1);
        ptDate.setHours(parseInt(h), parseInt(m), 0, 0);
        next = { name: 'Fajr', time: t.Fajr, diffMs: ptDate.getTime() - now.getTime() };
      }
      setNextPrayer(next);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [prayerTimes]);

  const formatCountdown = (ms: number) => {
    const totalSecs = Math.floor(ms / 1000);
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    return `-${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  const handleAction = (action: string) => {
    switch (action) {
      case 'mafatih': setActiveTab('duas'); break;
      case 'quran': setActiveTab('quran'); break;
      case 'favorites': setActiveTab('favorites'); break;
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 min-h-screen -mx-4 md:-mx-8 px-4 md:px-8 bg-gradient-to-b from-slate-100 dark:from-[#09152b] via-slate-50 dark:via-[#0f172a] to-slate-50 dark:to-[#0f172a] overflow-hidden relative">
      
      {/* Najaf Style Background Elements */}
      <div className="absolute top-0 left-0 right-0 h-64 md:h-96 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] bg-repeat opacity-20 mask-image-gradient"></div>
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/20 rounded-full blur-[100px]"></div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-600/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-4xl mx-auto pt-6 pb-20 relative z-10">
        
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3 gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30 shadow-inner">
              <BookKey className="w-7 h-7 text-amber-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 font-display tracking-tight">{t('al_kisa')}</h1>
              <p className="text-xs text-slate-500 font-medium tracking-widest uppercase">{t('the_cloak')}</p>
            </div>
          </div>
          <button onClick={() => onOpenSettings ? onOpenSettings() : setActiveTab('settings')} className="p-2 rounded-full bg-white dark:bg-[#0b1121]/80 backdrop-blur-md border border-amber-500/20 text-amber-500 hover:bg-amber-500/10 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Next Prayer Banner */}
        <div className="bg-white dark:bg-[#0b1121]/90 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border-t-2 border-amber-500/40 border-b border-l border-r border-slate-200 dark:border-slate-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-10 relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-50"></div>
          
          {nextPrayer ? (
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-1">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white font-display flex items-baseline space-x-4 drop-shadow-md">
                  <span>{t(nextPrayer.name.toLowerCase()) || nextPrayer.name} {t('prayers')}</span>
                  <span className="text-amber-400">{nextPrayer.time}</span>
                </h2>
                <div className="flex items-center space-x-2 mt-4 text-slate-400 dark:text-slate-500 dark:text-slate-400">
                  <MapPin className="w-4 h-4 text-teal-500" />
                  <span className="text-sm font-medium tracking-wide uppercase">{locationName}</span>
                </div>
              </div>
              <div className="bg-slate-100 dark:bg-slate-900/50 rounded-2xl px-6 py-4 border border-amber-500/20 inline-flex flex-col items-center justify-center">
                <span className="text-3xl font-mono text-amber-500 font-bold tracking-tight shadow-sm">
                  {formatCountdown(nextPrayer.diffMs)}
                </span>
                <span className="text-[10px] text-amber-500/70 font-bold tracking-[0.2em] uppercase mt-1">{t('time_until_adhan')}</span>
              </div>
            </div>
          ) : (
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-6 bg-slate-700/50 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-700/50 rounded"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          <button onClick={() => handleAction('mafatih')} className="bg-white dark:bg-[#0b1121]/80 backdrop-blur-md rounded-3xl p-6 border border-teal-500/30 flex flex-col items-center justify-center space-y-4 hover:bg-teal-900/20 hover:border-teal-400/50 hover:-translate-y-1 transition-all shadow-lg group">
            <div className="w-16 h-16 rounded-2xl bg-teal-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookKey className="w-8 h-8 text-teal-400" />
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200 text-lg font-display">{t('duas')}</span>
          </button>
          
          <button onClick={() => handleAction('quran')} className="bg-white dark:bg-[#0b1121]/80 backdrop-blur-md rounded-3xl p-6 border border-emerald-500/30 flex flex-col items-center justify-center space-y-4 hover:bg-emerald-900/20 hover:border-emerald-400/50 hover:-translate-y-1 transition-all shadow-lg group">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-8 h-8 text-emerald-400" />
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200 text-lg font-display">{t('quran')}</span>
          </button>
          
          <button onClick={() => handleAction('favorites')} className="bg-white dark:bg-[#0b1121]/80 backdrop-blur-md rounded-3xl p-6 border border-amber-500/30 flex flex-col items-center justify-center space-y-4 hover:bg-amber-900/20 hover:border-amber-400/50 hover:-translate-y-1 transition-all shadow-lg group relative overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Star className="w-8 h-8 text-amber-400" />
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200 text-lg font-display">{t('favorites')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
