
import React from 'react';
import { Case, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface Props {
  caseData: Case;
  language: Language;
  selectedSuspects: string[];
  onToggleSuspect: (id: string) => void;
  onCheck: () => void;
  onClose: () => void;
  result: 'correct' | 'incorrect' | null;
  onBackToMenu: () => void;
}

const SolveModal: React.FC<Props> = ({ 
  caseData, 
  language, 
  selectedSuspects, 
  onToggleSuspect, 
  onCheck, 
  onClose,
  result,
  onBackToMenu
}) => {
  const t = TRANSLATIONS[language];
  const isRtl = language === 'ar';

  if (result) {
    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl ${isRtl ? 'rtl' : ''} typewriter`}>
        <div className="max-w-2xl w-full bg-[#050505] border-2 border-red-700 p-10 shadow-2xl overflow-y-auto max-h-[90vh]">
          <div className="flex flex-col items-center text-center mb-10">
            <div className={`w-24 h-24 border-4 flex items-center justify-center mb-6 ${result === 'correct' ? 'border-emerald-600 text-emerald-600' : 'border-red-700 text-red-700'}`}>
              <span className="text-4xl font-black">{result === 'correct' ? '✓' : '✗'}</span>
            </div>
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter">{result === 'correct' ? t.correct : t.incorrect}</h2>
          </div>

          <div className="space-y-8">
            <div className={`p-8 bg-[#111] border border-slate-900 ${isRtl ? 'text-right' : 'text-left'}`}>
              <h3 className="text-red-700 font-black uppercase text-xs mb-4 tracking-widest border-b border-red-900/30 pb-2">{t.explanation}</h3>
              <p className="text-slate-300 leading-relaxed text-lg italic">"{caseData.solution.explanation[language]}"</p>
            </div>

            <button
              onClick={onBackToMenu}
              className="w-full py-5 px-6 bg-white hover:bg-slate-200 text-black font-black uppercase tracking-widest transition-all"
            >
              {t.backToMenu}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm ${isRtl ? 'rtl' : ''} typewriter`}>
      <div className="max-w-xl w-full bg-[#0a0a0a] border-2 border-slate-900 shadow-2xl">
        <div className="p-6 border-b border-slate-900 bg-black flex justify-between items-center">
          <h2 className={`text-xl font-black text-white uppercase tracking-tighter border-s-4 border-red-700 ps-4`}>{t.whoDidIt}</h2>
          <button onClick={onClose} className="text-slate-700 hover:text-red-700 transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-8 space-y-4">
          {caseData.suspects.map(suspect => (
            <button
              key={suspect.id}
              onClick={() => onToggleSuspect(suspect.id)}
              className={`w-full p-5 flex items-center justify-between transition-all border ${
                selectedSuspects.includes(suspect.id)
                  ? 'bg-red-700 border-red-600 text-black'
                  : 'bg-transparent border-slate-900 text-slate-500 hover:border-slate-700'
              }`}
            >
              <span className="font-black uppercase text-lg tracking-tight">{suspect.name[language]}</span>
            </button>
          ))}
        </div>

        <div className="p-8 bg-black flex flex-col md:flex-row gap-4">
          <button
            onClick={onCheck}
            disabled={selectedSuspects.length === 0}
            className={`flex-1 py-5 px-6 font-black uppercase tracking-widest transition-all ${
              selectedSuspects.length === 0 
                ? 'bg-slate-900 text-slate-700 cursor-not-allowed'
                : 'bg-red-700 hover:bg-red-600 text-black'
            }`}
          >
            {t.check}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SolveModal;
