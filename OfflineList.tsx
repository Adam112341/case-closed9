
import React from 'react';
import { Case, Language } from '../types';
import { TRANSLATIONS, GAME_TITLE } from '../constants';

interface Props {
  language: Language;
  downloadedCases: Case[];
  onPlay: (c: Case) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
}

const OfflineList: React.FC<Props> = ({ language, downloadedCases, onPlay, onDelete, onBack }) => {
  const t = TRANSLATIONS[language];
  const isRtl = language === 'ar';

  return (
    <div className={`min-h-screen bg-black p-6 ${isRtl ? 'rtl' : ''} typewriter`}>
      <div className="max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-6 mb-16 border-b-2 border-slate-900 pb-8">
          <button onClick={onBack} className="p-2 text-red-700 hover:text-white transition-colors">
            <svg className={`w-10 h-10 ${isRtl ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">{t.offlineCases}</h1>
        </div>

        {downloadedCases.length === 0 ? (
          <div className="text-center py-24 bg-[#0a0a0a] border border-slate-900 border-dashed">
            <p className="text-slate-700 font-bold uppercase tracking-widest">{t.offlineEmpty}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {downloadedCases.map((c) => (
              <div key={c.id} className="bg-[#0a0a0a] border border-slate-900 p-8 flex items-center justify-between hover:border-red-700 transition-all">
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">{c.title[language]}</h3>
                </div>
                
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => onPlay(c)}
                    className="px-8 py-3 bg-red-700 hover:bg-red-600 text-black font-black uppercase text-sm"
                  >
                    {t.play}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OfflineList;
