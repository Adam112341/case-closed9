
import React from 'react';
import { Case, Language } from './types';
import { TRANSLATIONS } from './constants';

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
  caseData, language, selectedSuspects, onToggleSuspect, onCheck, onClose, result, onBackToMenu
}) => {
  const t = TRANSLATIONS[language];
  const isRtl = language === 'ar';

  if (result) {
    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 ${isRtl ? 'rtl' : ''} typewriter`}>
        <div className="max-w-xl w-full bg-black border-2 border-red-700 p-10 text-center">
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">{result === 'correct' ? t.correct : t.incorrect}</h2>
          <div className="bg-[#111] p-6 text-left mb-8 border border-slate-900">
            <h3 className="text-red-700 text-xs font-bold uppercase mb-2">{t.explanation}</h3>
            <p className="text-slate-300 italic">"{caseData.solution.explanation[language]}"</p>
          </div>
          <button onClick={onBackToMenu} className="w-full py-4 bg-white text-black font-black uppercase tracking-widest">{t.backToMenu}</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 ${isRtl ? 'rtl' : ''} typewriter`}>
      <div className="max-w-md w-full bg-black border-2 border-slate-900 p-8 shadow-2xl">
        <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-6">{t.whoDidIt}</h2>
        <div className="space-y-3 mb-8">
          {caseData.suspects.map(suspect => (
            <button
              key={suspect.id}
              onClick={() => onToggleSuspect(suspect.id)}
              className={`w-full p-4 text-left border uppercase font-black tracking-tight transition-all ${selectedSuspects.includes(suspect.id) ? 'bg-red-700 text-black border-red-700' : 'bg-transparent text-slate-500 border-slate-900 hover:border-slate-700'}`}
            >
              {suspect.name[language]}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={onCheck} disabled={selectedSuspects.length === 0} className={`flex-1 py-4 font-black uppercase tracking-widest ${selectedSuspects.length === 0 ? 'bg-slate-900 text-slate-700' : 'bg-red-700 text-black hover:bg-red-600'}`}>{t.check}</button>
          <button onClick={onClose} className="flex-1 py-4 bg-transparent text-slate-500 border border-slate-900 uppercase font-black">{t.cancel}</button>
        </div>
      </div>
    </div>
  );
};

export default SolveModal;
