
import React from 'react';
import { PhishingAnalysis, LogAnalysis, AnalysisType } from '../types';
import { RiskIndicator } from './RiskIndicator';

interface AnalysisResultProps {
  type: AnalysisType;
  data: PhishingAnalysis | LogAnalysis;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ type, data }) => {
  const isPhishing = type === 'phishing';
  const logData = data as LogAnalysis;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-bold text-slate-800">Analysis Result</h3>
        <RiskIndicator level={data.risk_level} />
      </div>
      
      <div className="p-6 space-y-6">
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            {isPhishing ? 'Threat Type' : 'Suspected Attack'}
          </h4>
          <div className="flex items-center space-x-2">
            {!isPhishing && (
              <span className={`w-3 h-3 rounded-full ${logData.suspicious_activity ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
            )}
            <p className="text-xl font-semibold text-slate-900">
              {isPhishing ? (data as PhishingAnalysis).threat_type : logData.possible_attack}
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Detailed Explanation</h4>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 italic text-slate-700 leading-relaxed">
            {data.explanation}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Recommended Actions
          </h4>
          <ul className="space-y-3">
            {data.recommended_actions.map((action, idx) => (
              <li key={idx} className="flex items-start space-x-3 text-slate-700">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                  {idx + 1}
                </span>
                <span className="text-sm font-medium mt-0.5">{action}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Grounding Sources */}
        {isPhishing && (data as PhishingAnalysis).grounding_sources && (data as PhishingAnalysis).grounding_sources!.length > 0 && (
          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Reference Sources</h4>
            <div className="space-y-2">
              {(data as PhishingAnalysis).grounding_sources!.map((source, idx) => (
                <a 
                  key={idx} 
                  href={source.uri} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-xs text-indigo-500 hover:text-indigo-700 truncate"
                >
                  {source.title || source.uri}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
