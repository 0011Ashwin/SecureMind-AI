
export type RiskLevel = 'High' | 'Medium' | 'Low';

export interface PhishingAnalysis {
  threat_type: string;
  risk_level: RiskLevel;
  explanation: string;
  recommended_actions: string[];
  grounding_sources?: { uri: string; title: string }[];
}

export interface LogAnalysis {
  suspicious_activity: boolean;
  possible_attack: string;
  risk_level: RiskLevel;
  explanation: string;
  recommended_actions: string[];
}

export interface HistoryItem {
  id: string;
  timestamp: string;
  type: 'phishing' | 'logs';
  input: string;
  result: PhishingAnalysis | LogAnalysis;
}

export type AnalysisType = 'phishing' | 'logs' | 'dashboard' | 'history' | 'how_it_works';

export interface AppState {
  isAnalyzing: boolean;
  result: PhishingAnalysis | LogAnalysis | null;
  error: string | null;
  activeTab: AnalysisType;
  history: HistoryItem[];
}
