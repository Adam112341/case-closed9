
import React from 'react';
import { Language } from './types';
import { GAME_TITLE } from './constants';

interface Props {
  onSelect: (lang: Language) => void;
}

const LanguageSelector: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-6">
      <div className="bg-[#0a0a0a] border-l-4 border-red-700 p-10 max-w-md w-full text-center shadow-2xl">
        <h1 className="text-4xl font-black text-white mb-2 tracking-tighter typewriter uppercase">{GAME_TITLE}</h1>
        <p className="text-slate-500 mb-10 typewriter text-sm border-b border-slate-900 pb-4 italic">Initialize System Protocol</p>
        
        <div className="grid gap-3">
          {['en', 'fr', 'ar'].map((lang) => (
            <button
              key={lang}
              onClick={() => onSelect(lang as Language)}
              className="group w-full py-4 px-6 bg-transparent hover:bg-red-700/10 text-slate-300 hover:text-red-500 rounded-none transition-all border border-slate-900 hover:border-red-700 font-bold flex items-center justify-between typewriter"
            >
              <span>{lang === 'en' ? 'English' : lang === 'fr' ? 'Français' : 'العربية'}</span>
              <span className="text-slate-700 group-hover:text-red-900">{lang.toUpperCase()}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
