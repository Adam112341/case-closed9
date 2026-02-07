
import React from 'react';
import { Case, Language } from '../types';
import { TRANSLATIONS } from '../constants';

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
              <div className={isRtl ? 'text-left' : 'text-right'}>
                <div className="text-[10px] font-bold text-slate-400 uppercase">{t.fileStatus}</div>
                <div className="text-red-700 font-black uppercase italic">{t.underInvestigation}</div>
              </div>
            </div>
            
            <div className="space-y-6 text-lg leading-relaxed">
              <div className={`bg-slate-100 p-4 border-s-4 border-slate-300`}>
                <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">{t.incidentProfile}</span>
                <p className="font-bold">{caseData.type[language]} - {t[caseData.difficulty as keyof typeof t]}</p>
              </div>
              <p className={`${isRtl ? 'first-letter:ml-2' : 'first-letter:mr-2'} first-letter:text-4xl first-letter:font-bold first-letter:text-red-700 first-letter:float-start`}>
                {caseData.description[language]}
              </p>
            </div>
          </div>
        );
      case 'suspects':
        return (
          <div className={paperClasses}>
             <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 border-b-2 border-slate-200 pb-4">{t.subjectProfiles}</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {caseData.suspects.map(suspect => (
                <div key={suspect.id} className="border border-slate-200 p-6 bg-white hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-slate-900 text-white flex items-center justify-center text-2xl font-black">
                      {suspect.name[language].charAt(0)}
                    </div>
                    <h3 className="text-xl font-bold uppercase border-b-2 border-red-700">{suspect.name[language]}</h3>
                  </div>
                  <p className="text-sm text-slate-500 italic mb-6">{suspect.description[language]}</p>
                  
                  <div className="space-y-4">
                    <div className="border-t border-slate-100 pt-2">
                      <span className="text-[10px] font-bold text-red-700 uppercase block">{t.reportedAlibi}</span>
                      <p className="text-sm text-slate-700">"{suspect.alibi[language]}"</p>
                    </div>
                    <div className="border-t border-slate-100 pt-2">
                      <span className="text-[10px] font-bold text-red-700 uppercase block">{t.suspectedMotive}</span>
                      <p className="text-sm text-slate-700">{suspect.motive[language]}</p>
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
                <div key={item.id} className="flex flex-col border border-slate-200 group overflow-hidden bg-white">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-40 bg-slate-900 text-white p-4 flex flex-col justify-center items-center text-center shrink-0">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 mb-2">{t[item.type as keyof typeof t]}</span>
                      <div className="h-0.5 w-8 bg-red-700"></div>
                    </div>
                    <div className="p-6 flex-1">
                      <h3 className="text-lg font-black uppercase mb-2 group-hover:text-red-700 transition-colors">{item.title[language]}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.description[language]}</p>
                    </div>
                  </div>
                  
                  {item.imageUrl && (
                    <div className="p-6 bg-slate-100 border-t border-slate-200">
                      <div className="max-w-xl mx-auto border-4 border-slate-300 relative shadow-xl overflow-hidden grayscale">
                        <img src={item.imageUrl} className="w-full" alt="Exhibit" />
                        <div className={`absolute top-2 ${isRtl ? 'right-2' : 'left-2'} bg-red-700 text-black px-1 text-[8px] font-black uppercase`}>{t.officialScan}</div>
                      </div>
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
                <div key={statement.id} className={`relative ps-8 border-s-4 border-red-700 py-2`}>
                  <div className={`absolute top-0 ${isRtl ? 'right-0 translate-x-full ps-4' : 'left-0 -translate-x-full pr-4'} text-[10px] font-bold text-slate-400 uppercase ${isRtl ? 'rotate-90 origin-left' : '-rotate-90 origin-right'} whitespace-nowrap`}>
                    {t.logRef}: {statement.id.slice(-4)}
                  </div>
                  <h3 className="font-black text-red-700 uppercase mb-2">{statement.witnessName[language]}</h3>
                  <p className="text-slate-800 italic leading-relaxed text-lg">"{statement.text[language]}"</p>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  const navItems = [
    { id: 'overview', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'suspects', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { id: 'evidence', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.691.315a2 2 0 01-1.705 0l-.691-.315a6 6 0 00-3.86-.517l-2.387.477a2 2 0 00-1.022.547V21h18v-5.572z' },
    { id: 'statements', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' }
  ];

  return (
    <div className={`min-h-screen bg-[#050505] flex flex-col ${isRtl ? 'rtl' : ''} p-2 md:p-6 pb-12`}>
      <header className="flex items-center justify-between mb-4 px-2">
        <button onClick={onExit} className="p-2 text-red-700 hover:text-red-500 transition-colors">
          <svg className={`w-8 h-8 ${isRtl ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
          </svg>
        </button>
        <div className="text-center typewriter">
           <h1 className="text-white font-black text-xl uppercase tracking-tighter">{caseData.title[language]}</h1>
           <span className="text-red-700 text-[10px] font-bold tracking-widest uppercase">{t.bureauFile} #00{caseData.id.slice(-2)}</span>
        </div>
        <button 
          onClick={onSolve}
          className="bg-red-700 hover:bg-red-600 text-black px-6 py-2 font-black uppercase text-sm transition-all typewriter shadow-lg shadow-red-900/40"
        >
          {t.solveCase}
        </button>
      </header>

      <div className="flex flex-col md:flex-row flex-1 gap-4 max-w-6xl mx-auto w-full mb-12">
        <aside className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex-shrink-0 flex items-center gap-3 p-4 typewriter font-black uppercase text-xs transition-all border-2 ${
                view === item.id 
                ? 'bg-red-700 border-red-700 text-black translate-x-1' 
                : 'bg-black border-slate-900 text-slate-500 hover:text-white hover:border-slate-700'
              }`}
            >
              <svg className={`w-5 h-5 ${isRtl ? 'scale-x-[-1]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              <span className="hidden md:inline">{t[item.id as keyof typeof t]}</span>
            </button>
          ))}
        </aside>

        <main className="flex-1 relative z-10">
          <div className={`absolute inset-0 bg-slate-900 ${isRtl ? '-translate-x-2' : 'translate-x-2'} translate-y-2 -z-10 opacity-30`}></div>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default CaseView;
