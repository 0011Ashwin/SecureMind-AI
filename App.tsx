
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { AnalysisResult } from './components/AnalysisResult';
import { TechnicalSpecs } from './components/TechnicalSpecs';
import { Dashboard } from './components/Dashboard';
import { HistoryView } from './components/HistoryView';
import { geminiService } from './services/geminiService';
import { AppState, AnalysisType, HistoryItem } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('securemind_history');
    return {
      isAnalyzing: false,
      result: null,
      error: null,
      activeTab: 'dashboard',
      history: saved ? JSON.parse(saved) : [],
    };
  });

  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('securemind_history', JSON.stringify(state.history));
  }, [state.history]);

  const handleAnalyze = async () => {
    if (!input.trim()) return;

    setState(prev => ({ ...prev, isAnalyzing: true, error: null, result: null }));

    try {
      let analysisResult;
      if (state.activeTab === 'phishing') {
        analysisResult = await geminiService.analyzePhishing(input);
      } else if (state.activeTab === 'logs') {
        analysisResult = await geminiService.analyzeLogs(input);
      }

      if (analysisResult) {
        const newItem: HistoryItem = {
          id: Date.now().toString(),
          timestamp: new Date().toLocaleString(),
          type: state.activeTab === 'phishing' ? 'phishing' : 'logs',
          input: input,
          result: analysisResult
        };

        setState(prev => ({ 
          ...prev, 
          result: analysisResult || null, 
          isAnalyzing: false,
          history: [...prev.history, newItem]
        }));
      } else {
        setState(prev => ({ ...prev, isAnalyzing: false }));
      }
    } catch (err: any) {
      setState(prev => ({ 
        ...prev, 
        isAnalyzing: false, 
        error: err.message || "Failed to establish secure connection with AI core." 
      }));
    }
  };

  const handleTabChange = (tab: AnalysisType) => {
    setState(prev => ({ ...prev, activeTab: tab, result: null, error: null }));
    setInput('');
  };

  const handleSelectHistory = (item: HistoryItem) => {
    setState(prev => ({ 
      ...prev, 
      activeTab: item.type,
      result: item.result,
    }));
    setInput(item.input);
  };

  const samplePhishing = `From: support@secure-paypal-access.com
Subject: URGENT: Your account access is restricted
Dear valued member, 
We have detected suspicious activity. Please visit the secure link below to verify your identity or your account will be closed permanently: 
https://verification-paypal-portal.com/auth/login?token=293849
Thank you, PayPal Security Team.`;

  const sampleLogs = `2024-05-21 08:31:12 Connection: from 185.22.14.88:44321
2024-05-21 08:31:13 SSH: Failed password for root from 185.22.14.88 port 44321 ssh2
2024-05-21 08:31:15 SSH: Failed password for root from 185.22.14.88 port 44321 ssh2
2024-05-21 08:31:18 SSH: Failed password for admin from 185.22.14.88 port 44321 ssh2
2024-05-21 08:31:21 SSH: Failed password for user1 from 185.22.14.88 port 44321 ssh2`;

  const renderContent = () => {
    switch (state.activeTab) {
      case 'dashboard':
        return <Dashboard history={state.history} />;
      case 'history':
        return <HistoryView history={state.history} onSelect={handleSelectHistory} />;
      case 'how_it_works':
        return <TechnicalSpecs />;
      case 'phishing':
      case 'logs':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">
                  {state.activeTab === 'phishing' ? 'Analyze Threat' : 'Log Investigation'}
                </h3>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Input Analysis</span>
              </div>
              
              <div className="space-y-4">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    state.activeTab === 'phishing'
                      ? "Paste suspicious email, SMS, or URL here..."
                      : "Paste server access logs, auth logs, or activity logs here..."
                  }
                  className="w-full h-80 p-5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm font-medium text-gray-800 leading-relaxed resize-none"
                />
                
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <button
                    onClick={() => setInput(state.activeTab === 'phishing' ? samplePhishing : sampleLogs)}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-2 p-2 rounded hover:bg-blue-50 transition"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    <span>Insert Demo Data</span>
                  </button>
                  <button
                    onClick={handleAnalyze}
                    disabled={state.isAnalyzing || !input.trim()}
                    className={`px-8 py-3 rounded-lg font-bold text-sm shadow-md transition-all ${
                      state.isAnalyzing || !input.trim()
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                        : 'bg-[#1a73e8] text-white hover:bg-blue-700 active:scale-95'
                    }`}
                  >
                    {state.isAnalyzing ? 'Analyzing with Gemini...' : 'Run Analysis Core'}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {!state.isAnalyzing && !state.result && !state.error && (
                <div className="bg-white rounded-lg border border-gray-200 p-20 text-center flex flex-col items-center shadow-sm opacity-60">
                  <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-300 mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </div>
                  <h3 className="text-gray-900 font-bold mb-2">Ready for Analysis</h3>
                  <p className="text-gray-500 text-sm">Provide input in the terminal to generate a security assessment report.</p>
                </div>
              )}

              {state.error && (
                <div className="bg-white border-l-4 border-red-500 p-6 shadow-sm rounded-lg">
                  <div className="flex items-center space-x-3 text-red-600 mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <h3 className="font-bold uppercase tracking-widest text-xs">Analysis Failure</h3>
                  </div>
                  <p className="text-gray-700 text-sm font-medium">{state.error}</p>
                </div>
              )}

              {state.isAnalyzing && (
                <div className="bg-white rounded-lg border border-gray-200 p-20 flex flex-col items-center justify-center text-center space-y-6 shadow-sm">
                   <div className="relative w-16 h-16">
                      <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                   </div>
                   <div>
                      <h3 className="text-lg text-gray-900 font-bold">Processing Stream</h3>
                      <p className="text-gray-500 text-sm mt-1 max-w-xs mx-auto">
                        Generating explainable risk assessment using Gemini Advanced Reasoning Core...
                      </p>
                   </div>
                </div>
              )}

              {state.result && (
                <AnalysisResult type={state.activeTab as any} data={state.result} />
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <header className="mb-10">
        <div className="flex items-center space-x-3 mb-2">
           <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">Unified AI Copilot</span>
           <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
           <span className="text-sm font-bold text-gray-400">Enterprise Security</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-none mb-4">
           Cybersecurity Command Center
        </h2>
        <p className="text-gray-600 max-w-2xl text-lg font-medium leading-relaxed">
          Analyze phishing threats and system log anomalies with Google Gemini's reasoning engine. Built for transparency and explainable risk mitigation.
        </p>
      </header>

      {/* Google Style Tabs */}
      <div className="flex items-center space-x-1 border-b border-gray-200 mb-10 overflow-x-auto scrollbar-hide">
        {(['dashboard', 'phishing', 'logs', 'history', 'how_it_works'] as AnalysisType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-6 py-4 text-sm font-bold uppercase tracking-wider transition-all relative ${
              state.activeTab === tab
                ? 'text-[#1a73e8]'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
            }`}
          >
            {tab.replace('_', ' ')}
            {state.activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a73e8]"></div>
            )}
          </button>
        ))}
      </div>

      {renderContent()}
    </Layout>
  );
};

export default App;
