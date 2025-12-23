
export type RiskLevel = 'High' | 'Medium' | 'Low';

export interface PhishingAnalysis {
  threat_type: string;
  risk_level: RiskLevel;
  explanation: string;
  recommended_actions: string[];
}

export interface LogAnalysis {
  detected_patterns: string[];
  potential_attack: string;
  risk_level: RiskLevel;
  explanation: string;
  mitigation_steps: string[];
}

export type AnalysisType = 'phishing' | 'logs';

export interface AppState {
  isAnalyzing: boolean;
  result: PhishingAnalysis | LogAnalysis | null;
  error: string | null;
  activeTab: AnalysisType;
}
