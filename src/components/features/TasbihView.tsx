import React, { useState, useEffect } from 'react';
import { RotateCcw, Plus, ArrowLeft, Settings } from 'lucide-react';
import { Tab } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

export function TasbihView({ setActiveTab, onOpenSettings }: { setActiveTab: (t: Tab) => void, onOpenSettings: () => void }) {
  const { t } = useLanguage();
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem('tasbihCount');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [target, setTarget] = useState(100);

  useEffect(() => {
    localStorage.setItem('tasbihCount', count.toString());
  }, [count]);

  const increment = () => setCount((prev) => prev + 1);
  const reset = () => setCount(0);

  const presets = [
    { label: t('allahu_akbar') || 'Allahu Akbar', target: 34 },
    { label: t('alhamdulillah') || 'Alhamdulillah', target: 33 },
    { label: t('subhanallah') || 'Subhanallah', target: 33 },
    { label: t('standard') || 'Standard', target: 100 },
  ];

  return (
    <div className="p-6 md:py-12 flex flex-col min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto">
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

      <header className="mb-12 pt-8">
        <h2 className="text-4xl md:text-5xl font-bold text-teal-400 font-display drop-shadow-md">{t('tasbih') || 'Tasbih'}</h2>
        <p className="text-slate-400 dark:text-slate-500 dark:text-slate-400 font-medium tracking-wide mt-3 text-lg">{t('tasbih_desc') || 'Digital counter for dhikr'}</p>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center -mt-20 relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 blur-[100px]">
          <div className="w-80 h-80 bg-teal-500/20 rounded-full"></div>
        </div>

        {/* Preset Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 relative z-10">
          {presets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                setTarget(preset.target);
                setCount(0);
              }}
              className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all border shadow-sm tracking-wide ${
                target === preset.target
                  ? 'bg-amber-500 border-amber-400 text-[#0f172a]'
                  : 'bg-white dark:bg-[#0b1121] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-800 hover:border-slate-700'
              }`}
            >
              {preset.label} <span className={target === preset.target ? 'text-[#0f172a]/70 font-mono ml-1' : 'text-slate-400 dark:text-slate-500 font-mono ml-1'}>({preset.target})</span>
            </button>
          ))}
        </div>

        {/* Counter Display */}
        <div className="relative mb-16 relative z-10 group">
          <div className="absolute inset-0 rounded-full bg-teal-500/5 group-active:bg-teal-500/10 transition-colors pointer-events-none blur-xl"></div>
          <svg className="w-72 h-72 md:w-80 md:h-80 transform -rotate-90 drop-shadow-xl">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              className="text-slate-800/80"
            />
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 144}
              strokeDashoffset={2 * Math.PI * 144 - (count / target) * 2 * Math.PI * 144}
              className="text-teal-400 transition-all duration-300 ease-out drop-shadow-[0_0_10px_rgba(45,212,191,0.5)]"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <span className="text-7xl font-bold text-slate-900 dark:text-slate-100 font-mono tracking-tighter drop-shadow-md block">
              {count}
            </span>
            <div className="text-teal-600/70 font-bold mt-2 text-xl tracking-[0.2em] font-display uppercase">
              / {target}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-8 relative z-10">
          <button
            onClick={reset}
            className="p-5 rounded-2xl bg-white dark:bg-[#0b1121] border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:text-slate-300 hover:bg-slate-800 hover:border-slate-700 transition-all focus:outline-none shadow-lg active:scale-95"
            aria-label="Reset counter"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
          <button
            onClick={increment}
            className="w-28 h-28 rounded-[2rem] bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-[#0f172a] shadow-[0_0_30px_rgba(245,158,11,0.4)] flex items-center justify-center transition-all active:scale-95 focus:outline-none border-2 border-amber-300/50"
            aria-label="Increment counter"
          >
            <Plus className="w-12 h-12" />
          </button>
        </div>
      </div>
    </div>
  );
}
