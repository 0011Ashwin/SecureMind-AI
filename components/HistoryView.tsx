
import React from 'react';
import { HistoryItem } from '../types';
import { RiskIndicator } from './RiskIndicator';

interface HistoryViewProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ history, onSelect }) => {
  if (history.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-20 text-center flex flex-col items-center shadow-sm">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-6">
           <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
        </div>
        <h3 className="text-gray-900 font-semibold mb-2">No analysis logs yet</h3>
        <p className="text-gray-500 text-sm max-w-xs mx-auto">Start by analyzing a phishing message or security log to populate your history.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden animate-in fade-in duration-300">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wider">Analysis History</h3>
        <span className="text-[10px] font-bold text-gray-400">{history.length} RECORDS TOTAL</span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">Summary</th>
              <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">Risk Level</th>
              <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">Timestamp</th>
              <th className="px-6 py-3 text-right text-[10px] font-bold text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {history.slice().reverse().map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tight ${item.type === 'phishing' ? 'bg-indigo-100 text-indigo-700' : 'bg-purple-100 text-purple-700'}`}>
                    {item.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 truncate max-w-[300px]">
                    {item.input.substring(0, 60)}...
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <RiskIndicator level={item.result.risk_level} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 font-medium">
                  {item.timestamp}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => onSelect(item)}
                    className="text-blue-600 hover:text-blue-900 font-bold"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
