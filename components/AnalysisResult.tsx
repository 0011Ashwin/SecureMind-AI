
import React from 'react';
import { PhishingAnalysis, LogAnalysis, AnalysisType } from '../types';
import { RiskIndicator } from './RiskIndicator';

interface AnalysisResultProps {
  type: AnalysisType;
  data: PhishingAnalysis | LogAnalysis;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ type, data }) => {
  const isPhishing = type === 'phishing';
  const phishingData = data as PhishingAnalysis;
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
          <p className="text-xl font-semibold text-slate-900">
            {isPhishing ? phishingData.threat_type : logData.potential_attack}
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Detailed Explanation</h4>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 italic text-slate-700 leading-relaxed">
            {data.explanation}
          </div>
        </div>

        {!isPhishing && logData.detected_patterns && (
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Detected Anomalies</h4>
            <div className="flex flex-wrap gap-2">
              {logData.detected_patterns.map((pattern, idx) => (
                <span key={idx} className="bg-slate-200 text-slate-700 px-3 py-1 rounded text-sm font-medium">
                  {pattern}
                </span>
              ))}
            </div>
          </div>
        )}

        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            {isPhishing ? 'Recommended Safety Actions' : 'Mitigation Steps'}
          </h4>
          <ul className="space-y-3">
            {(isPhishing ? phishingData.recommended_actions : logData.mitigation_steps).map((action, idx) => (
              <li key={idx} className="flex items-start space-x-3 text-slate-700">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                  {idx + 1}
                </span>
                <span className="text-sm font-medium mt-0.5">{action}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
