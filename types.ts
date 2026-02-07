export type Language = 'en' | 'fr' | 'ar';

export type EvidenceType = 'physical' | 'digital' | 'financial' | 'forensic';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type ForensicDetail = '1K' | '2K' | '4K';

export type LocalizedString = Record<Language, string>;

// Added SearchResult interface for forensic lab searches
export interface SearchResult {
  text: string;
  sources: { uri: string; title: string }[];
}

export interface UserSettings {
  soundEnabled: boolean;
  visualEffects: boolean;
  preferredDifficulty: Difficulty;
  forensicDetail: ForensicDetail;
}

export interface Suspect {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  alibi: LocalizedString;
  motive: LocalizedString;
}

export interface Evidence {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  type: EvidenceType;
  imageUrl?: string;
}

export interface Statement {
  id: string;
  witnessName: LocalizedString;
  text: LocalizedString;
}

export interface Case {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  type: LocalizedString;
  difficulty: Difficulty;
  suspects: Suspect[];
  evidence: Evidence[];
  statements: Statement[];
  solution: {
    perpetratorIds: string[];
    explanation: LocalizedString;
  };
  downloadedAt?: number;
}

export type GameStatus = 'menu' | 'playing' | 'offline_list' | 'settings';

export interface AppState {
  language: Language | null;
  currentCase: Case | null;
  downloadedCases: Case[];
  isGenerating: boolean;
  gameStatus: GameStatus;
  view: 'overview' | 'suspects' | 'evidence' | 'statements';
  selectedSuspects: string[];
  settings: UserSettings;
}