
import React, { useState, useEffect, useRef } from 'react';
import { Language, AppState, Case, UserSettings } from './types';
import { TRANSLATIONS, DEFAULT_OFFLINE_CASES } from './constants';
import { generateCase } from './geminiService';
import MainMenu from './MainMenu';
import CaseView from './CaseView';
import LanguageSelector from './LanguageSelector';
import SolveModal from './SolveModal';
import OfflineList from './OfflineList';
import SettingsView from './SettingsView';

const App: React.FC = () => {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const [state, setState] = useState<AppState>(() => {
    const savedLang = localStorage.getItem('case_closed_lang') as Language;
    const savedCases = localStorage.getItem('case_closed_offline_cases');
    const savedSettings = localStorage.getItem('case_closed_settings');
    
    const initialSettings: UserSettings = savedSettings ? JSON.parse(savedSettings) : {
      soundEnabled: true,
      visualEffects: true,
      preferredDifficulty: 'Medium',
      forensicDetail: '1K'
    };
    
    return {
      language: savedLang || null,
      currentCase: null,
      downloadedCases: savedCases ? JSON.parse(savedCases) : DEFAULT_OFFLINE_CASES,
      isGenerating: false,
      gameStatus: 'menu',
      view: 'overview',
      selectedSuspects: [],
      settings: initialSettings
    } as AppState;
  });

  const [solveResult, setSolveResult] = useState<'correct' | 'incorrect' | null>(null);
  const [isSolving, setIsSolving] = useState(false);

  const getAudioCtx = () => {
    if (!audioCtxRef.current) {
      const WinAudio = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (WinAudio) audioCtxRef.current = new WinAudio();
    }
    return audioCtxRef.current;
  };

  const playSoundEffect = (type: 'click' | 'paper' | 'success' | 'error') => {
    if (!state.settings.soundEnabled) return;
    const ctx = getAudioCtx();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    switch (type) {
      case 'click':
        osc.frequency.setValueAtTime(800, now);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
        break;
      case 'paper':
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(200, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
        break;
      case 'success':
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
        break;
      case 'error':
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(70, now + 0.3);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
        break;
    }
  };

  useEffect(() => {
    if (state.language) {
      localStorage.setItem('case_closed_lang', state.language);
      document.documentElement.dir = state.language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = state.language;
    }
  }, [state.language]);

  const handleStartNewCase = async () => {
    if (!state.language) return;
    playSoundEffect('click');
    setState(prev => ({ ...prev, isGenerating: true }));
    try {
      const newCase = await generateCase(state.language, state.settings.preferredDifficulty);
      playSoundEffect('paper');
      setState(prev => ({
        ...prev,
        currentCase: newCase,
        isGenerating: false,
        gameStatus: 'playing',
        view: 'overview',
        selectedSuspects: [],
      }));
    } catch (error: any) {
      console.error("Investigation generation failed:", error);
      playSoundEffect('error');
      setState(prev => ({ ...prev, isGenerating: false }));
      alert(TRANSLATIONS[state.language || 'en'].generationError + " (Check Vercel API_KEY settings)");
    }
  };

  const handleDownloadCase = async () => {
    if (!state.language) return;
    playSoundEffect('click');
    setState(prev => ({ ...prev, isGenerating: true }));
    try {
      const newCase = await generateCase(state.language, state.settings.preferredDifficulty);
      playSoundEffect('success');
      const updatedCases = [{ ...newCase, downloadedAt: Date.now() }, ...state.downloadedCases];
      localStorage.setItem('case_closed_offline_cases', JSON.stringify(updatedCases));
      setState(prev => ({
        ...prev,
        isGenerating: false,
        downloadedCases: updatedCases
      }));
    } catch (error) {
      console.error("Download failed:", error);
      playSoundEffect('error');
      setState(prev => ({ ...prev, isGenerating: false }));
      alert("Failed to archive the dossier. Ensure API_KEY is set in Vercel.");
    }
  };

  const handleBackToMenu = () => {
    playSoundEffect('click');
    setState(prev => ({ ...prev, gameStatus: 'menu', currentCase: null, selectedSuspects: [] }));
    setSolveResult(null);
    setIsSolving(false);
  };

  if (!state.language) {
    return <LanguageSelector onSelect={(lang) => { setState(prev => ({ ...prev, language: lang })); }} />;
  }

  return (
    <div className={`relative min-h-screen ${state.settings.visualEffects ? 'vignette-active' : ''}`}>
      {state.isGenerating && (
        <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 border-4 border-slate-900 border-t-red-600 rounded-full animate-spin mb-8"></div>
          <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter typewriter">
            {TRANSLATIONS[state.language].generating}
          </h2>
          <p className="text-slate-500 typewriter text-xs uppercase opacity-60">
            {TRANSLATIONS[state.language].consultingOSINT}
          </p>
        </div>
      )}

      {state.gameStatus === 'menu' && (
        <MainMenu
          language={state.language}
          onNewCase={handleStartNewCase}
          onDownloadCase={handleDownloadCase}
          onOfflineCases={() => { playSoundEffect('click'); setState(prev => ({ ...prev, gameStatus: 'offline_list' })); }}
          onSettings={() => { playSoundEffect('click'); setState(prev => ({ ...prev, gameStatus: 'settings' })); }}
        />
      )}

      {state.gameStatus === 'settings' && (
        <SettingsView
          language={state.language}
          settings={state.settings}
          onUpdate={(lang, settings) => { 
            playSoundEffect('success'); 
            localStorage.setItem('case_closed_settings', JSON.stringify(settings));
            setState(prev => ({ ...prev, language: lang, settings })); 
          }}
          onBack={handleBackToMenu}
        />
      )}

      {state.gameStatus === 'offline_list' && (
        <OfflineList
          language={state.language}
          downloadedCases={state.downloadedCases}
          onPlay={(c) => { 
            playSoundEffect('paper'); 
            setState(prev => ({ ...prev, currentCase: c, gameStatus: 'playing', view: 'overview', selectedSuspects: [] })); 
          }}
          onDelete={(id) => { 
            playSoundEffect('click'); 
            const filtered = state.downloadedCases.filter(c => c.id !== id);
            localStorage.setItem('case_closed_offline_cases', JSON.stringify(filtered));
            setState(prev => ({ ...prev, downloadedCases: filtered })); 
          }}
          onBack={() => { playSoundEffect('click'); setState(prev => ({ ...prev, gameStatus: 'menu' })); }}
        />
      )}

      {state.gameStatus === 'playing' && state.currentCase && (
        <>
          <CaseView
            caseData={state.currentCase}
            language={state.language}
            view={state.view}
            onViewChange={(v) => { playSoundEffect('paper'); setState(prev => ({ ...prev, view: v })); }}
            onSolve={() => { playSoundEffect('click'); setIsSolving(true); }}
            onExit={handleBackToMenu}
          />
          {isSolving && (
            <SolveModal
              caseData={state.currentCase}
              language={state.language}
              selectedSuspects={state.selectedSuspects}
              onToggleSuspect={(id) => {
                playSoundEffect('click');
                setState(prev => ({ ...prev, selectedSuspects: prev.selectedSuspects.includes(id) ? prev.selectedSuspects.filter(sId => sId !== id) : [...prev.selectedSuspects, id] }));
              }}
              onCheck={() => {
                if (!state.currentCase) return;
                const correctIds = [...state.currentCase.solution.perpetratorIds].sort();
                const selectedIds = [...state.selectedSuspects].sort();
                const isCorrect = JSON.stringify(correctIds) === JSON.stringify(selectedIds);
                
                if (isCorrect) playSoundEffect('success'); else playSoundEffect('error');
                setSolveResult(isCorrect ? 'correct' : 'incorrect');
              }}
              onClose={() => { playSoundEffect('click'); setIsSolving(false); }}
              result={solveResult}
              onBackToMenu={handleBackToMenu}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
