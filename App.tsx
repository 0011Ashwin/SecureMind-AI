
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
    // Try to load history from localStorage
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
        error: err.message || "Failed to analyze the content. Check uplink." 
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

  const samplePhishing = `Subject: URGENT: Your Apple Account has been locked!
Dear customer, we detected unusual activity on your iCloud. To prevent permanent lock, verify your identity here: http://bit.ly/apple-security-check-2024
If you don't act in 24 hours, your data will be deleted.`;

  const sampleLogs = `2024-05-20 14:22:01 INFO Authentication attempt for user 'admin' from IP 192.168.1.50 - FAILED
2024-05-20 14:22:03 INFO Authentication attempt for user 'admin' from IP 192.168.1.50 - FAILED
2024-05-20 14:22:11 INFO Authentication attempt for user 'admin' from IP 192.168.1.50 - SUCCESS
2024-05-20 14:22:15 WARN Unusual file access pattern detected for user 'admin'`;

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Input Section */}
            <div className="bg-black p-8 border-4 border-emerald-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
              <div className="absolute -top-4 left-6 bg-black px-4 text-emerald-500 text-[10px] font-bold pixel-font">
                INPUT_STREAM
              </div>
              <label className="block text-[10px] font-bold text-emerald-700 mb-6 uppercase tracking-widest pixel-font">
                {state.activeTab === 'phishing' ? 'DETECT_PHISH' : 'ANALYZE_LOGS'} :: PASTE_DATA_BELOW
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  state.activeTab === 'phishing'
                    ? "SYSTEM_IDLE: AWAITING_MESSAGE_INPUT..."
                    : "SYSTEM_IDLE: AWAITING_LOG_STREAM..."
                }
                className="w-full h-80 p-6 text-emerald-400 bg-emerald-950/10 border-2 border-emerald-900/50 rounded-none focus:border-emerald-500 outline-none transition-all font-mono text-lg leading-relaxed placeholder:opacity-20"
              />
              
              <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
                <button
                  onClick={() => setInput(state.activeTab === 'phishing' ? samplePhishing : sampleLogs)}
                  className="text-[10px] font-bold text-emerald-600 hover:text-white flex items-center space-x-2 pixel-font"
                >
                  <span>[ USE_MOCK_DATA ]</span>
                </button>
                <button
                  onClick={handleAnalyze}
                  disabled={state.isAnalyzing || !input.trim()}
                  className={`px-10 py-5 border-4 font-bold text-[10px] pixel-font transition-all ${
                    state.isAnalyzing || !input.trim()
                      ? 'border-emerald-900 text-emerald-900 cursor-not-allowed'
                      : 'bg-emerald-500 border-white text-black hover:bg-white hover:border-emerald-500 active:translate-y-1 active:shadow-none shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)]'
                  }`}
                >
                  {state.isAnalyzing ? 'PROC_RUNNING...' : 'EXE_ANALYSIS'}
                </button>
              </div>
            </div>

            {/* Output Section */}
            <div className="space-y-8">
              {!state.isAnalyzing && !state.result && !state.error && (
                <div className="border-4 border-dashed border-emerald-900/30 p-16 text-center bg-black/40">
                  <div className="w-20 h-20 border-2 border-emerald-900/50 flex items-center justify-center mx-auto mb-6 text-emerald-900">
                     _
                  </div>
                  <h3 className="text-emerald-900 font-bold pixel-font text-xs mb-3">STANDBY_MODE</h3>
                  <p className="text-emerald-900 text-sm font-bold uppercase tracking-widest">Awaiting command input from terminal...</p>
                </div>
              )}

              {state.error && (
                <div className="bg-red-950/20 border-4 border-red-500 p-8 text-red-500 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="font-bold mb-4 flex items-center space-x-3 pixel-font text-xs">
                    <span>ERR:</span>
                    <span>ANALYSIS_CRITICAL_FAILURE</span>
                  </h3>
                  <p className="text-lg leading-snug">{state.error}</p>
                  <button 
                    onClick={handleAnalyze}
                    className="mt-6 text-[10px] font-bold underline hover:text-white pixel-font"
                  >
                    REBOOT_ANALYSIS
                  </button>
                </div>
              )}

              {state.isAnalyzing && (
                <div className="bg-black border-4 border-emerald-500 p-16 flex flex-col items-center justify-center text-center space-y-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                   <div className="relative w-24 h-24">
                      <div className="absolute inset-0 border-4 border-emerald-900"></div>
                      <div className="absolute inset-0 border-4 border-emerald-400 border-t-transparent animate-spin"></div>
                      <div className="absolute inset-4 flex items-center justify-center">
                        <div className="w-2 h-8 bg-emerald-500 animate-bounce"></div>
                      </div>
                   </div>
                   <div>
                      <h3 className="text-xl text-white font-bold pixel-font tracking-widest">CORE_THINKING</h3>
                      <p className="text-emerald-700 text-sm font-bold mt-4 max-w-xs mx-auto leading-relaxed uppercase tracking-widest">
                        Routing data through Gemini_3 Reasoning Engine...
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
      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className="bg-emerald-500 text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 pixel-font">
            BUILD: HAJIPUR_2025
          </span>
          <span className="text-emerald-900 text-xs font-bold uppercase tracking-[2px]">SYS_MOD: SECURITY_ANALYST_CORE</span>
        </div>
        <h2 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter pixel-font">
          CYBER_<span className="text-emerald-500">COPILOT</span>
        </h2>
        <p className="text-emerald-700 max-w-2xl text-xl leading-snug font-bold">
          &gt; ADVANCED REASONING ENGINE FOR SECURITY THREATS. 
        </p>
      </header>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
        {(['dashboard', 'phishing', 'logs', 'history', 'how_it_works'] as AnalysisType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-6 py-4 border-4 transition-all duration-100 text-[10px] pixel-font whitespace-nowrap ${
              state.activeTab === tab
                ? 'bg-emerald-500 border-white text-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]'
                : 'bg-black border-emerald-900 text-emerald-900 hover:border-emerald-500 hover:text-emerald-500'
            }`}
          >
            {tab.replace('_', ' ')}
          </button>
        ))}
      </div>

      {renderContent()}
    </Layout>
  );
};

export default App;
