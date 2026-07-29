import React, { useState, useEffect } from 'react';
import { Compass, Loader2, ArrowLeft, Settings } from 'lucide-react';
import { Tab } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

export function QiblaView({ setActiveTab, onOpenSettings }: { setActiveTab: (t: Tab) => void, onOpenSettings: () => void }) {
  const { t } = useLanguage();
  const [direction, setDirection] = useState<number | null>(null);
  const [heading, setHeading] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchQibla();
    
    const handleOrientation = (event: DeviceOrientationEvent) => {
      let absoluteHeading = event.alpha;
      if (absoluteHeading !== null) {
        // Adjust based on iOS webkitCompassHeading if available
        if ('webkitCompassHeading' in event) {
          absoluteHeading = (event as any).webkitCompassHeading;
        } else {
          absoluteHeading = 360 - absoluteHeading;
        }
        setHeading(absoluteHeading);
      }
    };

    if (window.DeviceOrientationEvent) {
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        // Must be triggered by a user action in iOS, we'll handle this in a button if needed
      } else {
        window.addEventListener('deviceorientationabsolute', handleOrientation as any, true);
        window.addEventListener('deviceorientation', handleOrientation, true);
      }
    }

    return () => {
      window.removeEventListener('deviceorientationabsolute', handleOrientation as any, true);
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, []);

  const fetchQibla = () => {
    setLoading(true);
    setError(null);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const res = await fetch(`https://api.aladhan.com/v1/qibla/${latitude}/${longitude}`);
            const data = await res.json();
            if (data && data.data) {
              setDirection(data.data.direction);
            } else {
              throw new Error('Invalid API response');
            }
          } catch (err) {
            setError('Failed to fetch Qibla direction.');
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          setError(t('location_denied_qibla') || 'Location access denied. Cannot calculate Qibla.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation not supported.');
      setLoading(false);
    }
  };

  const requestCompassPermission = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permissionState = await (DeviceOrientationEvent as any).requestPermission();
        if (permissionState === 'granted') {
          window.addEventListener('deviceorientation', (event: DeviceOrientationEvent) => {
            let absoluteHeading = (event as any).webkitCompassHeading || (event.alpha ? 360 - event.alpha : null);
            setHeading(absoluteHeading);
          });
        }
      } catch (console) {
        setError("Error requesting compass permission.");
      }
    }
  };

  return (
    <div className="p-6 md:py-12 animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col min-h-[80vh] max-w-4xl mx-auto">
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

      <header className="mb-16 text-center pt-8">
        <h2 className="text-4xl md:text-5xl font-bold text-teal-400 font-display drop-shadow-md">{t('qibla_compass') || 'Qibla Compass'}</h2>
        <p className="text-slate-400 dark:text-slate-500 dark:text-slate-400 font-medium tracking-wide mt-3 text-lg">{t('find_kaaba') || 'Find the direction to the Kaaba'}</p>
      </header>

      {error && (
        <div className="bg-red-500/10 text-red-400 p-4 rounded-2xl mb-8 text-sm font-medium border border-red-500/20 shadow-lg text-center max-w-lg mx-auto">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center flex-1">
          <Loader2 className="w-16 h-16 animate-spin text-amber-500" />
        </div>
      ) : direction !== null ? (
        <div className="flex-1 flex flex-col items-center justify-center -mt-10 relative">
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 blur-[100px]">
            <div className="w-64 h-64 bg-teal-500/30 rounded-full"></div>
          </div>

          <div className="relative w-72 h-72 md:w-96 md:h-96 border-[8px] border-[#0b1121] bg-slate-50 dark:bg-[#0f172a]/80 shadow-[0_0_50px_rgba(13,148,136,0.1)] rounded-full flex items-center justify-center mb-12 relative z-10">
            {/* Compass inner ring */}
            <div className="absolute inset-2 border border-slate-200 dark:border-slate-800/80 rounded-full"></div>
            
            {/* North Indicator */}
            <div 
              className="absolute w-1 h-full bg-transparent flex justify-center py-4 transition-transform duration-200"
              style={{ transform: `rotate(${-(heading || 0)}deg)` }}
            >
              <div className="w-3 h-6 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
            </div>

            {/* Qibla Pointer */}
            <div 
              className="absolute w-2 h-full bg-transparent flex justify-center py-6 transition-transform duration-200"
              style={{ transform: `rotate(${direction - (heading || 0)}deg)` }}
            >
              <Compass className="w-16 h-16 text-amber-400 -mt-2 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
            </div>

            <div className="text-center bg-white dark:bg-[#0b1121]/90 p-6 rounded-full border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-md">
              <span className="block text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-200 font-mono tracking-tighter">
                {direction.toFixed(1)}°
              </span>
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-teal-600/70 mt-2 block">North</span>
            </div>
          </div>
          
          {typeof (DeviceOrientationEvent as any).requestPermission === 'function' && !heading && (
            <button 
              onClick={requestCompassPermission}
              className="px-8 py-4 bg-teal-600/20 border border-teal-500/50 hover:bg-teal-500/30 text-teal-400 rounded-2xl font-bold transition-all shadow-lg hover:shadow-teal-500/20 font-display tracking-wide relative z-10"
            >
              Enable Device Compass
            </button>
          )}

          {!heading && typeof (DeviceOrientationEvent as any).requestPermission !== 'function' && (
            <p className="text-center text-slate-400 dark:text-slate-500 dark:text-slate-400 font-medium tracking-wide text-sm max-w-sm mt-4 p-4 bg-white dark:bg-[#0b1121] rounded-2xl border border-slate-200 dark:border-slate-800 relative z-10">
              Your device compass may not be active. Use a physical compass and face <span className="text-amber-400 font-bold">{direction.toFixed(1)}° North</span>.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
