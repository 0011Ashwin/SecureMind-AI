
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
    <div className="bg-black border-4 border-emerald-900/50 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden animate-in zoom-in-95 duration-300">
      <div className="px-6 py-4 bg-emerald-900/20 border-b-4 border-emerald-900/50 flex justify-between items-center">
        <h3 className="text-sm font-bold text-emerald-400 pixel-font">OUTPUT_LOG_DATA</h3>
        <RiskIndicator level={data.risk_level} />
      </div>
      
      <div className="p-8 space-y-8">
        <div>
          <h4 className="text-[10px] font-bold text-emerald-600 uppercase tracking-[2px] mb-3 pixel-font">
            [ {isPhishing ? 'THREAT_CLASSIFICATION' : 'ANOMALY_DETECTED'} ]
          </h4>
          <div className="flex items-center space-x-3">
            <span className={`w-4 h-4 ${logData.risk_level === 'High' ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`}></span>
            <p className="text-2xl font-bold text-white tracking-tight">
              {isPhishing ? (data as PhishingAnalysis).threat_type : logData.possible_attack}
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold text-emerald-600 uppercase tracking-[2px] mb-3 pixel-font">[ ANALYSIS_SUMMARY ]</h4>
          <div className="bg-emerald-950/20 p-6 border-l-4 border-emerald-500 text-emerald-100 text-lg leading-relaxed font-mono italic opacity-90">
            {data.explanation}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold text-emerald-600 uppercase tracking-[2px] mb-4 pixel-font">
            [ PROTOCOL_COMMANDS ]
          </h4>
          <ul className="space-y-4">
            {data.recommended_actions.map((action, idx) => (
              <li key={idx} className="flex items-start space-x-4 text-emerald-400">
                <span className="flex-shrink-0 font-bold text-white bg-emerald-900 px-2">
                  &gt;
                </span>
                <span className="text-md font-bold leading-tight">{action}</span>
              </li>
            ))}
          </ul>
        </div>

        {isPhishing && (data as PhishingAnalysis).grounding_sources && (data as PhishingAnalysis).grounding_sources!.length > 0 && (
          <div className="pt-6 border-t-2 border-emerald-900/30">
            <h4 className="text-[10px] font-bold text-emerald-600 uppercase tracking-[2px] mb-3 pixel-font">[ INTEL_SOURCES ]</h4>
            <div className="space-y-2">
              {(data as PhishingAnalysis).grounding_sources!.map((source, idx) => (
                <a 
                  key={idx} 
                  href={source.uri} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-sm text-blue-400 hover:text-white hover:underline truncate"
                >
                  * {source.title || source.uri}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
