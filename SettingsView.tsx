
import React, { useState } from 'react';
import { Language, UserSettings, Difficulty, ForensicDetail } from '../types';
import { TRANSLATIONS } from '../constants';

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
        </header>

        <div className="space-y-8">
          <div className="space-y-4">
            <label className="text-xs font-bold text-red-700 uppercase tracking-widest">{t.language}</label>
            <div className="grid grid-cols-3 gap-2">
              {(['en', 'fr', 'ar'] as Language[]).map(l => (
                <button
                  key={l}
                  onClick={() => setLocalLang(l)}
                  className={`py-3 px-4 text-xs font-black border ${localLang === l ? 'bg-red-700 border-red-700 text-black' : 'bg-black border-slate-900 text-slate-500'}`}
                >
                  {l === 'en' ? 'English' : l === 'fr' ? 'Français' : 'العربية'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="mt-12 w-full py-5 bg-red-700 hover:bg-red-600 text-black font-black uppercase tracking-widest"
        >
          {t.save}
        </button>
      </div>
    </div>
  );
};

export default SettingsView;
