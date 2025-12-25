
import React from 'react';
import { HistoryItem, PhishingAnalysis, LogAnalysis } from '../types';
import { RiskIndicator } from './RiskIndicator';

interface HistoryViewProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ history, onSelect }) => {
  if (history.length === 0) {
    return (
      <div className="border-4 border-dashed border-emerald-900/30 p-16 text-center bg-black/40">
        <h3 className="text-emerald-900 font-bold pixel-font text-xs mb-3">DATABASE_EMPTY</h3>
        <p className="text-emerald-900 text-[10px] font-bold uppercase tracking-widest">No previous analysis records found in local memory.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
      <h3 className="text-xs font-bold text-emerald-500 pixel-font mb-6 underline">ARCHIVED_REPORTS_STREAM</h3>
      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {history.slice().reverse().map((item) => (
          <div 
            key={item.id}
            onClick={() => onSelect(item)}
            className="group cursor-pointer bg-black border-2 border-emerald-900 hover:border-emerald-400 p-4 transition-all flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="flex items-center space-x-4 overflow-hidden">
               <div className={`w-2 h-8 ${item.type === 'phishing' ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
               <div className="truncate">
                  <p className="text-[8px] pixel-font text-emerald-700">{item.timestamp}</p>
                  <p className="text-white font-bold truncate max-w-md">
                    {item.type.toUpperCase()} :: {item.input.substring(0, 50)}...
                  </p>
               </div>
            </div>
            <div className="flex-shrink-0">
               <RiskIndicator level={item.result.risk_level} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
