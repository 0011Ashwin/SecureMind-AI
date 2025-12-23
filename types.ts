
export type RiskLevel = 'High' | 'Medium' | 'Low';

export interface PhishingAnalysis {
  threat_type: string;
  risk_level: RiskLevel;
  explanation: string;
  recommended_actions: string[];
}

export interface LogAnalysis {
  suspicious_activity: boolean;
  possible_attack: string;
  risk_level: RiskLevel;
  explanation: string;
  recommended_actions: string[];
}

export type AnalysisType = 'phishing' | 'logs';

export interface AppState {
  isAnalyzing: boolean;
  result: PhishingAnalysis | LogAnalysis | null;
  error: string | null;
  activeTab: AnalysisType;
}
