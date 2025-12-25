
import React from 'react';
import { HistoryItem } from '../types';

interface DashboardProps {
  history: HistoryItem[];
}

export const Dashboard: React.FC<DashboardProps> = ({ history }) => {
  const total = history.length;
  const highRisk = history.filter(h => h.result.risk_level === 'High').length;
  const phishingCount = history.filter(h => h.type === 'phishing').length;
  const logCount = history.filter(h => h.type === 'logs').length;
  
  const highRiskPercent = total > 0 ? Math.round((highRisk / total) * 100) : 0;
  
  // Mock trend data based on history
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'];
  const mockTrend = [20, 45, 30, 70, 55, 85];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'TOTAL_SCANS', val: total },
          { label: 'HIGH_THREATS', val: highRisk, color: 'text-red-500' },
          { label: 'PHISH_DETECTED', val: phishingCount },
          { label: 'LOG_ANOMALIES', val: logCount },
        ].map((stat, i) => (
          <div key={i} className="bg-black border-4 border-emerald-900 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-[8px] pixel-font text-emerald-700 mb-2">{stat.label}</p>
            <p className={`text-3xl font-bold pixel-font ${stat.color || 'text-white'}`}>{stat.val}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Risk Distribution Chart */}
        <div className="bg-black border-4 border-emerald-900 p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-xs font-bold text-emerald-500 pixel-font mb-6 underline">RISK_DISTRIBUTION</h3>
          <div className="flex items-end justify-around h-48 border-b-4 border-emerald-900 px-4">
            {['High', 'Medium', 'Low'].map((lvl) => {
              const count = history.filter(h => h.result.risk_level === lvl).length;
              const height = total > 0 ? (count / total) * 100 : 0;
              const colors: Record<string, string> = { High: 'bg-red-500', Medium: 'bg-amber-500', Low: 'bg-emerald-500' };
              return (
                <div key={lvl} className="flex flex-col items-center w-16 group">
                  <div 
                    className={`${colors[lvl]} w-full border-x-4 border-t-4 border-black transition-all duration-500`} 
                    style={{ height: `${Math.max(height, 5)}%` }}
                  >
                    <div className="bg-white/20 w-full h-1"></div>
                  </div>
                  <span className="text-[8px] pixel-font text-emerald-800 mt-2">{lvl}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Threat Level Percentile */}
        <div className="bg-black border-4 border-emerald-900 p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center">
          <h3 className="text-xs font-bold text-emerald-500 pixel-font mb-6 self-start underline">HEALTH_RISK_INDEX</h3>
          <div className="relative w-40 h-40 border-8 border-emerald-900 flex items-center justify-center">
            <div className="absolute inset-0 bg-emerald-500/10 animate-pulse"></div>
            <p className="text-4xl font-bold text-emerald-400 pixel-font z-10">{highRiskPercent}%</p>
            <div className="absolute -bottom-2 bg-black px-2 text-[8px] pixel-font text-red-500">CRITICAL_LOAD</div>
          </div>
          <p className="text-[10px] pixel-font text-emerald-800 mt-6 text-center">CURRENT SYSTEM VULNERABILITY COEFFICIENT</p>
        </div>

        {/* Improvement Curve (CSS Line Chart) */}
        <div className="lg:col-span-2 bg-black border-4 border-emerald-900 p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-xs font-bold text-emerald-500 pixel-font mb-6 underline">THREAT_TRENDS_2025</h3>
          <div className="h-32 flex items-end justify-between px-2 relative border-l-2 border-b-2 border-emerald-900/30">
             {mockTrend.map((v, i) => (
               <div key={i} className="flex flex-col items-center flex-1">
                 <div className="w-1 h-1 bg-emerald-500 absolute mb-1" style={{ bottom: `${v}%`, left: `${(i/5)*100}%` }}></div>
                 <div className="w-full bg-emerald-500/10 border-t border-emerald-500/30" style={{ height: `${v}%` }}></div>
                 <span className="text-[8px] pixel-font text-emerald-900 mt-2">{months[i]}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};
