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
    <div className="gcp-card overflow-hidden animate-in slide-in-from-right-4 duration-300">
      <div className="px-6 py-4 bg-[#f8f9fa] border-b border-[#dadce0] flex justify-between items-center">
        <div className="flex items-center space-x-3">
           <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
           </div>
           <h3 className="font-bold text-[#202124] text-sm uppercase tracking-wider">Security Report</h3>
        </div>
        <RiskIndicator level={data.risk_level} />
      </div>
      
      <div className="p-6 md:p-8 space-y-8">
        {/* Classification Header */}
        <div className="flex items-start space-x-6">
           <div className={`p-4 rounded-xl ${data.risk_level === 'High' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
           </div>
           <div>
              <p className="text-[10px] font-bold text-[#5f6368] uppercase tracking-widest mb-1">{isPhishing ? 'Threat Class' : 'Identified Anomaly'}</p>
              <h4 className="text-2xl font-bold text-[#202124] leading-tight">
                {isPhishing ? (data as PhishingAnalysis).threat_type : logData.possible_attack}
              </h4>
           </div>
        </div>

        {/* Core Reasoning */}
        <div className="bg-[#f8f9fa] border border-[#dadce0] rounded-lg p-5">
          <h4 className="text-[11px] font-bold text-[#202124] uppercase tracking-wider mb-3 flex items-center">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
            AI Core Findings
          </h4>
          <p className="text-[#3c4043] text-sm leading-relaxed font-medium">
            {data.explanation}
          </p>
        </div>

        {/* Actionable Steps */}
        <div className="space-y-4">
          <h4 className="text-[11px] font-bold text-[#202124] uppercase tracking-wider flex items-center">
             <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
             Mitigation Playbook
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.recommended_actions.map((action, idx) => (
              <div key={idx} className="flex items-start p-4 bg-white border border-[#dadce0] rounded-lg hover:border-blue-300 transition-colors shadow-sm group">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-xs font-black mr-3 mt-0.5 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  {idx + 1}
                </span>
                <span className="text-sm font-semibold text-[#3c4043] leading-snug">{action}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Grounding Info */}
        {isPhishing && (data as PhishingAnalysis).grounding_sources && (data as PhishingAnalysis).grounding_sources!.length > 0 && (
          <div className="pt-6 border-t border-[#dadce0]">
            <h4 className="text-[10px] font-bold text-[#70757a] uppercase tracking-widest mb-3">Transparency & Grounding</h4>
            <div className="flex flex-wrap gap-2">
              {(data as PhishingAnalysis).grounding_sources!.map((source, idx) => (
                <a 
                  key={idx} 
                  href={source.uri} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1.5 rounded border border-[#dadce0] bg-white text-blue-600 text-[10px] font-bold hover:bg-blue-50 transition shadow-sm"
                >
                  <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/></svg>
                  {source.title || 'Research Artifact'}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};