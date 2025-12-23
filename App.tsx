
import React, { useState, useCallback } from 'react';
import { Layout } from './components/Layout';
import { AnalysisResult } from './components/AnalysisResult';
import { geminiService } from './services/geminiService';
import { AppState, AnalysisType } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    isAnalyzing: false,
    result: null,
    error: null,
    activeTab: 'phishing',
  });

  const [input, setInput] = useState('');

  const handleAnalyze = async () => {
    if (!input.trim()) return;

    setState(prev => ({ ...prev, isAnalyzing: true, error: null, result: null }));

    try {
      let analysisResult;
      if (state.activeTab === 'phishing') {
        analysisResult = await geminiService.analyzePhishing(input);
      } else {
        analysisResult = await geminiService.analyzeLogs(input);
      }
      setState(prev => ({ ...prev, result: analysisResult, isAnalyzing: false }));
    } catch (err: any) {
      setState(prev => ({ 
        ...prev, 
        isAnalyzing: false, 
        error: err.message || "Failed to analyze the content. Please check your connection and try again." 
      }));
    }
  };

  const handleTabChange = (tab: AnalysisType) => {
    setState(prev => ({ ...prev, activeTab: tab, result: null, error: null }));
    setInput('');
  };

  const samplePhishing = `Subject: URGENT: Your Apple Account has been locked!
Dear customer, we detected unusual activity on your iCloud. To prevent permanent lock, verify your identity here: http://bit.ly/apple-security-check-2024
If you don't act in 24 hours, your data will be deleted.`;

  const sampleLogs = `2024-05-20 14:22:01 INFO Authentication attempt for user 'admin' from IP 192.168.1.50 - FAILED
2024-05-20 14:22:03 INFO Authentication attempt for user 'admin' from IP 192.168.1.50 - FAILED
2024-05-20 14:22:05 INFO Authentication attempt for user 'admin' from IP 192.168.1.50 - FAILED
2024-05-20 14:22:08 INFO Authentication attempt for user 'admin' from IP 192.168.1.50 - FAILED
2024-05-20 14:22:11 INFO Authentication attempt for user 'admin' from IP 192.168.1.50 - SUCCESS
2024-05-20 14:22:15 WARN Unusual file access pattern detected for user 'admin'`;

  return (
    <Layout>
      <header className="mb-12">
        <div className="flex items-center space-x-3 mb-3">
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
            Hajipur 2025 Edition
          </span>
          <span className="text-slate-400 text-xs font-medium">GenAI Hackathon Official MVP</span>
        </div>
        <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">
          Cybersecurity <span className="text-indigo-600 italic">Copilot</span>
        </h2>
        <p className="text-slate-600 max-w-2xl text-lg leading-relaxed">
          The ultimate security analyzer built for <b>GenAI hackthon Hajipur 2025</b>. 
          Analyze suspicious inputs with the power of Gemini 3.
        </p>
      </header>

      {/* Tabs */}
      <div className="flex space-x-1 bg-slate-200 p-1 rounded-xl mb-8 w-fit shadow-inner">
        <button
          onClick={() => handleTabChange('phishing')}
          className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${
            state.activeTab === 'phishing'
              ? 'bg-white text-indigo-600 shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300/50'
          }`}
        >
          Phishing & Scam
        </button>
        <button
          onClick={() => handleTabChange('logs')}
          className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${
            state.activeTab === 'logs'
              ? 'bg-white text-indigo-600 shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300/50'
          }`}
        >
          Log Analyzer
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Input Section */}
        <div className="bg-white p-6 rounded-xl shadow-xl border border-slate-100 ring-1 ring-slate-200/50">
          <label className="block text-sm font-bold text-slate-700 mb-4">
            Paste your {state.activeTab === 'phishing' ? 'message/email/URL' : 'security logs'} below
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              state.activeTab === 'phishing'
                ? "Paste the text of the suspicious email or message here..."
                : "Paste raw logs here for anomaly detection..."
            }
            className="w-full h-72 p-4 text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-mono text-sm leading-relaxed"
          />
          
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => setInput(state.activeTab === 'phishing' ? samplePhishing : sampleLogs)}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center space-x-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Use Sample Data</span>
            </button>
            <button
              onClick={handleAnalyze}
              disabled={state.isAnalyzing || !input.trim()}
              className={`px-8 py-3 rounded-lg font-bold text-white transition-all flex items-center space-x-2 ${
                state.isAnalyzing || !input.trim()
                  ? 'bg-slate-400 cursor-not-allowed opacity-50'
                  : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 active:scale-95'
              }`}
            >
              {state.isAnalyzing ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Start Scan</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          {!state.isAnalyzing && !state.result && !state.error && (
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-12 text-center bg-white/50">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-slate-900 font-bold mb-1">No scan results yet</h3>
              <p className="text-slate-500 text-sm">Enter content on the left to start analysis for the Hajipur hackathon demo</p>
            </div>
          )}

          {state.error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700 shadow-sm animate-shake">
              <h3 className="font-bold mb-2 flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Analysis Failed</span>
              </h3>
              <p className="text-sm opacity-90">{state.error}</p>
              <button 
                onClick={handleAnalyze}
                className="mt-4 text-xs font-bold uppercase tracking-wider underline hover:no-underline"
              >
                Try Again
              </button>
            </div>
          )}

          {state.isAnalyzing && (
            <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-12 flex flex-col items-center justify-center text-center space-y-6">
               <div className="relative w-24 h-24">
                  <div className="absolute inset-0 border-4 border-indigo-50 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
                  <div className="absolute inset-4 bg-indigo-50 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-indigo-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
               </div>
               <div>
                  <h3 className="text-xl text-slate-900 font-black">AI Reasoning Engine Engaged</h3>
                  <p className="text-slate-500 text-sm max-w-xs mt-2 mx-auto leading-relaxed">
                    Gemini 3 is currently executing advanced multi-step reasoning for the <b>Hajipur Hackathon</b> evaluation...
                  </p>
               </div>
               <div className="flex space-x-2">
                 <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce delay-75"></div>
                 <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce delay-150"></div>
                 <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce delay-300"></div>
               </div>
            </div>
          )}

          {state.result && (
            <AnalysisResult type={state.activeTab} data={state.result} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default App;
