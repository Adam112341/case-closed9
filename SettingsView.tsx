
import React, { useState } from 'react';
import { Language, UserSettings, Difficulty, ForensicDetail } from './types';
import { TRANSLATIONS } from './constants';

interface Props {
  language: Language;
  settings: UserSettings;
  onUpdate: (lang: Language, settings: UserSettings) => void;
  onBack: () => void;
}

const SettingsView: React.FC<Props> = ({ language, settings, onUpdate, onBack }) => {
  const [localLang, setLocalLang] = useState<Language>(language);
  const [localSettings, setLocalSettings] = useState<UserSettings>(settings);
  
  const t = TRANSLATIONS[localLang];
  const isRtl = localLang === 'ar';

  const handleSave = () => {
    onUpdate(localLang, localSettings);
    onBack();
  };

  return (
    <div className={`min-h-screen bg-black text-slate-300 p-6 flex flex-col items-center justify-center ${isRtl ? 'rtl' : ''} typewriter`}>
      <div className="max-w-2xl w-full bg-[#0a0a0a] border-2 border-slate-900 p-10 shadow-2xl relative">
        <header className="mb-12 border-b-2 border-slate-900 pb-6 flex justify-between items-center">
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">{t.settings}</h1>
          <button onClick={onBack} className="text-red-700 hover:text-white transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>

        <div className="space-y-8">
          {/* Protocol Language */}
          <div className="space-y-4">
            <label className="text-xs font-bold text-red-700 uppercase tracking-widest">{t.language}</label>
            <div className="grid grid-cols-3 gap-2">
              {(['en', 'fr', 'ar'] as Language[]).map(l => (
                <button
                  key={l}
                  onClick={() => setLocalLang(l)}
                  className={`py-3 px-4 text-xs font-black border transition-all ${localLang === l ? 'bg-red-700 border-red-700 text-black' : 'bg-black border-slate-900 text-slate-500 hover:border-slate-700'}`}
                >
                  {l === 'en' ? 'English' : l === 'fr' ? 'Français' : 'العربية'}
                </button>
              ))}
            </div>
          </div>

          {/* Feedback & FX */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-xs font-bold text-red-700 uppercase tracking-widest">{t.soundEffects}</label>
              <button
                onClick={() => setLocalSettings(s => ({ ...s, soundEnabled: !s.soundEnabled }))}
                className={`w-full py-4 text-sm font-black border flex items-center justify-center gap-3 ${localSettings.soundEnabled ? 'border-red-700 text-red-500' : 'border-slate-900 text-slate-700'}`}
              >
                {localSettings.soundEnabled ? t.on : t.off}
              </button>
            </div>
            <div className="space-y-4">
              <label className="text-xs font-bold text-red-700 uppercase tracking-widest">{t.visualFX}</label>
              <button
                onClick={() => setLocalSettings(s => ({ ...s, visualEffects: !s.visualEffects }))}
                className={`w-full py-4 text-sm font-black border flex items-center justify-center gap-3 ${localSettings.visualEffects ? 'border-red-700 text-red-500' : 'border-slate-900 text-slate-700'}`}
              >
                {localSettings.visualEffects ? t.on : t.off}
              </button>
            </div>
          </div>

          {/* Difficulty */}
          <div className="space-y-4">
            <label className="text-xs font-bold text-red-700 uppercase tracking-widest">{t.prefDifficulty}</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map(d => (
                <button
                  key={d}
                  onClick={() => setLocalSettings(s => ({ ...s, preferredDifficulty: d }))}
                  className={`py-3 px-4 text-[10px] font-black border transition-all ${localSettings.preferredDifficulty === d ? 'bg-red-700 border-red-700 text-black' : 'bg-black border-slate-900 text-slate-500 hover:border-slate-700'}`}
                >
                  {t[d]}
                </button>
              ))}
            </div>
          </div>

          {/* Quality */}
          <div className="space-y-4">
            <label className="text-xs font-bold text-red-700 uppercase tracking-widest">{t.forensicDetail}</label>
            <div className="grid grid-cols-3 gap-2">
              {(['1K', '2K', '4K'] as ForensicDetail[]).map(f => (
                <button
                  key={f}
                  onClick={() => setLocalSettings(s => ({ ...s, forensicDetail: f }))}
                  className={`py-3 px-4 text-[10px] font-black border transition-all ${localSettings.forensicDetail === f ? 'bg-red-700 border-red-700 text-black' : 'bg-black border-slate-900 text-slate-500 hover:border-slate-700'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="mt-12 w-full py-5 bg-red-700 hover:bg-red-600 text-black font-black uppercase tracking-widest shadow-xl transition-all"
        >
          {t.save}
        </button>
      </div>
    </div>
  );
};

export default SettingsView;
