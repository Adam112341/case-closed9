
import React from 'react';
import { Case, Language } from './types';
import { TRANSLATIONS } from './constants';

interface Props {
  caseData: Case;
  language: Language;
  view: 'overview' | 'suspects' | 'evidence' | 'statements';
  onViewChange: (view: any) => void;
  onSolve: () => void;
  onExit: () => void;
}

const CaseView: React.FC<Props> = ({ caseData, language, view, onViewChange, onSolve, onExit }) => {
  const t = TRANSLATIONS[language];
  const isRtl = language === 'ar';

  const renderContent = () => {
    const paperClasses = `bg-[#fcfcfc] text-slate-900 p-8 md:p-12 paper-shadow min-h-[70vh] relative border-t-8 border-red-700 typewriter animate-in slide-in-from-bottom-2 duration-500 ${isRtl ? 'text-right' : 'text-left'}`;
    
    switch (view) {
      case 'overview':
        return (
          <div className={paperClasses}>
            <div className="flex justify-between items-start mb-8 border-b-2 border-slate-200 pb-4">
              <div>
                <span className="text-red-700 font-bold uppercase text-xs tracking-[0.2em] mb-2 block">{t.officialDossier}</span>
                <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">{caseData.title[language]}</h2>
              </div>
            </div>
            <div className="space-y-6 text-lg leading-relaxed">
              <p>{caseData.description[language]}</p>
              <div className="bg-slate-100 p-4 border-s-4 border-slate-300">
                <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">{t.type}</span>
                <p className="font-bold">{caseData.type[language]}</p>
              </div>
            </div>
          </div>
        );
      case 'suspects':
        return (
          <div className={paperClasses}>
             <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 border-b-2 border-slate-200 pb-4">{t.subjectProfiles}</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {caseData.suspects.map(suspect => (
                <div key={suspect.id} className="border border-slate-200 p-6 bg-white">
                  <h3 className="text-xl font-bold uppercase border-b-2 border-red-700 mb-4">{suspect.name[language]}</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] font-bold text-red-700 uppercase block">{t.reportedAlibi}</span>
                      <p className="text-sm text-slate-700 italic">"{suspect.alibi[language]}"</p>
                    </div>
                  </div>
                </div>
              ))}
             </div>
          </div>
        );
      case 'evidence':
        return (
          <div className={paperClasses}>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 border-b-2 border-slate-200 pb-4">{t.forensicExhibits}</h2>
            <div className="space-y-6">
              {caseData.evidence.map(item => (
                <div key={item.id} className="border border-slate-200 p-6 bg-white">
                  <h3 className="text-lg font-black uppercase mb-2">{item.title[language]}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{item.description[language]}</p>
                  {item.imageUrl && (
                    <div className="border-2 border-slate-300 overflow-hidden grayscale">
                      <img src={item.imageUrl} className="w-full" alt="Exhibit" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case 'statements':
        return (
          <div className={paperClasses}>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 border-b-2 border-slate-200 pb-4">{t.witnessTranscripts}</h2>
            <div className="space-y-8">
              {caseData.statements.map(statement => (
                <div key={statement.id} className="ps-8 border-s-4 border-red-700 py-2">
                  <h3 className="font-black text-red-700 uppercase mb-2">{statement.witnessName[language]}</h3>
                  <p className="text-slate-800 italic leading-relaxed text-lg">"{statement.text[language]}"</p>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen bg-black flex flex-col ${isRtl ? 'rtl' : ''} p-4`}>
      <header className="flex items-center justify-between mb-8 max-w-6xl mx-auto w-full">
        <button onClick={onExit} className="p-2 text-red-700 hover:text-white">
          <svg className={`w-8 h-8 ${isRtl ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" /></svg>
        </button>
        <button onClick={onSolve} className="bg-red-700 text-black px-6 py-2 font-black uppercase tracking-tighter hover:bg-red-600 transition-colors">
          {t.solveCase}
        </button>
      </header>

      <div className="flex flex-col md:flex-row flex-1 gap-4 max-w-6xl mx-auto w-full mb-12">
        <aside className="flex md:flex-col gap-2">
          {['overview', 'suspects', 'evidence', 'statements'].map((id) => (
            <button
              key={id}
              onClick={() => onViewChange(id as any)}
              className={`p-4 text-xs font-black uppercase border transition-all ${view === id ? 'bg-red-700 text-black border-red-700' : 'bg-black text-slate-500 border-slate-900 hover:border-slate-700'}`}
            >
              {(t as any)[id]}
            </button>
          ))}
        </aside>
        <main className="flex-1">{renderContent()}</main>
      </div>
    </div>
  );
};

export default CaseView;
