
import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS, GAME_TITLE } from '../constants';

interface Props {
  language: Language;
  onNewCase: () => void;
  onDownloadCase: () => void;
  onOfflineCases: () => void;
  onSettings: () => void;
}

const MainMenu: React.FC<Props> = ({ language, onNewCase, onDownloadCase, onOfflineCases, onSettings }) => {
  const t = TRANSLATIONS[language] as any;
  const isRtl = language === 'ar';

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-black p-6 ${isRtl ? 'rtl' : ''}`}>
      <div className="relative z-10 text-center max-w-lg w-full">
        <div className="mb-16">
          <div className="inline-block p-1 border-2 border-red-700 mb-8">
            <div className="bg-red-700 p-6 text-black">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
            </div>
          </div>
          <h1 className="text-7xl font-black text-white tracking-tighter mb-4 typewriter uppercase">{GAME_TITLE}</h1>
          <p className="text-red-700 text-sm font-bold tracking-[0.3em] uppercase opacity-80 typewriter">{t.bureauOfInvestigation}</p>
        </div>

        <div className="grid gap-3 w-full">
          <button
            onClick={onNewCase}
            className="group relative flex items-center justify-between p-6 bg-red-700 hover:bg-red-600 text-black transition-all hover:scale-[1.02] active:scale-100"
          >
            <span className="text-xl font-black uppercase tracking-tight typewriter">{t.newCase}</span>
            <svg className={`w-6 h-6 ${isRtl ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          <button
            onClick={onDownloadCase}
            className="flex items-center justify-between p-6 bg-[#0a0a0a] hover:bg-[#111] text-white transition-all border border-slate-900 hover:border-red-900"
          >
            <span className="text-lg font-bold uppercase tracking-tight typewriter">{t.downloadCase}</span>
            <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>

          <button
            onClick={onOfflineCases}
            className="flex items-center justify-between p-6 bg-[#0a0a0a] hover:bg-[#111] text-white transition-all border border-slate-900 hover:border-red-900"
          >
            <span className="text-lg font-bold uppercase tracking-tight typewriter">{t.offlineCases}</span>
            <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </button>

          <button
            onClick={onSettings}
            className="mt-8 flex items-center justify-center gap-2 p-2 text-slate-600 hover:text-red-700 transition-colors typewriter text-xs"
          >
            <span className="font-bold uppercase tracking-widest">{t.settings}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
