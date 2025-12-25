
import React from 'react';
import { HistoryItem } from '../types';

interface DashboardProps {
  history: HistoryItem[];
}

export const Dashboard: React.FC<DashboardProps> = ({ history }) => {
  const total = history.length;
  const highRisk = history.filter(h => h.result.risk_level === 'High').length;
  const phishCount = history.filter(h => h.type === 'phishing').length;
  const logCount = history.filter(h => h.type === 'logs').length;
  
  const highRiskPercent = total > 0 ? Math.round((highRisk / total) * 100) : 0;
  
  const mockTrend = [35, 42, 38, 55, 48, 60, 52];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Scans', val: total, icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', color: 'text-blue-600' },
          { label: 'High Threats', val: highRisk, icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', color: 'text-red-600' },
          { label: 'Phish Detected', val: phishCount, icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', color: 'text-indigo-600' },
          { label: 'Log Anomalies', val: logCount, icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', color: 'text-emerald-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex items-start space-x-4">
            <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-tight">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Section */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">Threat Detection Trends</h3>
            <div className="flex items-center space-x-2 text-xs font-medium text-gray-500">
              <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span><span>Avg</span></span>
              <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-red-500"></span><span>Peaks</span></span>
            </div>
          </div>
          <div className="p-6">
            <div className="h-[240px] flex items-end justify-between space-x-2 relative group">
              {mockTrend.map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center group/bar">
                  <div className="relative w-full h-full flex flex-col justify-end">
                    <div 
                      className="bg-blue-100 group-hover/bar:bg-blue-200 transition-all rounded-t-sm border-t border-blue-300" 
                      style={{ height: `${v}%` }}
                    >
                      <div className="opacity-0 group-hover/bar:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap z-20 transition">
                        Value: {v}
                      </div>
                    </div>
                  </div>
                  <span className="mt-3 text-[10px] font-semibold text-gray-400 uppercase">{days[i]}</span>
                </div>
              ))}
              {/* Grid Lines */}
              <div className="absolute inset-x-0 top-0 h-full flex flex-col justify-between pointer-events-none opacity-20">
                {[...Array(5)].map((_, i) => <div key={i} className="w-full border-t border-gray-300"></div>)}
              </div>
            </div>
          </div>
        </div>

        {/* Health Risk Gauge */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 flex flex-col">
          <h3 className="font-semibold text-gray-800 mb-8">Organization Health</h3>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle className="text-gray-100" strokeWidth="10" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
                <circle 
                  className={highRiskPercent > 60 ? 'text-red-500' : 'text-emerald-500'} 
                  strokeWidth="10" 
                  strokeDasharray={251.2}
                  strokeDashoffset={251.2 - (251.2 * highRiskPercent) / 100}
                  strokeLinecap="round" 
                  stroke="currentColor" 
                  fill="transparent" 
                  r="40" cx="50" cy="50" 
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-gray-900">{highRiskPercent}%</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Risk Factor</span>
              </div>
            </div>
            <div className="mt-8 w-full p-4 bg-gray-50 rounded-lg border border-gray-100 text-center">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-tighter">Status Update</p>
              <p className="text-sm font-bold text-gray-800 mt-1">
                {highRiskPercent > 30 ? 'Attention Required' : 'Stable Environment'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
