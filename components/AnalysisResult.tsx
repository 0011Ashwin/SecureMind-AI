
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
    <div className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden animate-in slide-in-from-bottom-2 duration-300">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center space-x-2">
           <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
           <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wider">Analysis Report</h3>
        </div>
        <RiskIndicator level={data.risk_level} />
      </div>
      
      <div className="p-8 space-y-10">
        {/* Classification */}
        <div className="flex items-start space-x-6">
           <div className={`p-4 rounded-full ${data.risk_level === 'High' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
           </div>
           <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{isPhishing ? 'Threat Type' : 'Anomaly Detected'}</p>
              <h4 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {isPhishing ? (data as PhishingAnalysis).threat_type : logData.possible_attack}
              </h4>
           </div>
        </div>

        {/* Explanation */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-gray-900 border-l-4 border-google-blue pl-3">Security Assessment</h4>
          <div className="text-gray-700 text-lg leading-relaxed font-normal bg-gray-50/50 p-6 rounded-lg border border-gray-100">
            {data.explanation}
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-gray-900 border-l-4 border-emerald-500 pl-3">Recommended Mitigation Protocol</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.recommended_actions.map((action, idx) => (
              <div key={idx} className="flex items-start p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-blue-200 transition">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black mr-4 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-sm font-semibold text-gray-800">{action}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Grounding Sources (Google's Transparency) */}
        {isPhishing && (data as PhishingAnalysis).grounding_sources && (data as PhishingAnalysis).grounding_sources!.length > 0 && (
          <div className="pt-8 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Evidence & Grounding</h4>
            <div className="flex flex-wrap gap-2">
              {(data as PhishingAnalysis).grounding_sources!.map((source, idx) => (
                <a 
                  key={idx} 
                  href={source.uri} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1.5 rounded bg-blue-50 text-blue-700 text-xs font-semibold hover:bg-blue-100 transition border border-blue-100"
                >
                  <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/></svg>
                  {source.title || 'Source Reference'}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
