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
    const saved = localStorage.getItem('sentinel_history');
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
    localStorage.setItem('sentinel_history', JSON.stringify(state.history));
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
        error: err.message || "Uplink failed. Check your API configuration." 
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

  const renderTabContent = () => {
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Input Pane */}
            <div className="bg-white border border-[#dadce0] rounded-lg shadow-sm flex flex-col min-h-[500px]">
              <div className="px-6 py-4 border-b border-[#dadce0] flex items-center justify-between">
                <h3 className="font-semibold text-[#202124]">
                  {state.activeTab === 'phishing' ? 'Phishing Analysis Core' : 'Security Log Analysis'}
                </h3>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">ONLINE</span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-xs text-[#5f6368] mb-4">
                  {state.activeTab === 'phishing' 
                    ? "Paste a suspicious email, SMS, or URL. Our AI will analyze the intent and identify risk factors." 
                    : "Paste system authentication or activity logs. We'll look for brute-force, lateral movement, or anomalies."}
                </p>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Insert raw content here..."
                  className="w-full flex-1 p-4 bg-[#f8f9fa] border border-[#dadce0] rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none font-mono text-sm leading-relaxed resize-none transition-all"
                />
                <div className="mt-6 flex items-center justify-between">
                   <button
                    onClick={() => setInput(state.activeTab === 'phishing' 
                      ? "Subject: ALERT! Account Suspended.\nPlease verify your login at http://secure-portal-auth.net/verify to restore access." 
                      : "2024-05-22 10:11:02 SSH: Invalid user login from 192.168.4.12 port 22\n2024-05-22 10:11:05 SSH: Invalid user login from 192.168.4.12 port 22\n2024-05-22 10:11:09 SSH: Successful login for root from 192.168.4.12 port 22")}
                    className="text-xs font-semibold text-blue-600 hover:underline"
                  >
                    Load Sample Case
                  </button>
                  <button
                    onClick={handleAnalyze}
                    disabled={state.isAnalyzing || !input.trim()}
                    className="gcp-btn-primary shadow-sm active:scale-95 disabled:opacity-50 flex items-center space-x-2"
                  >
                    {state.isAnalyzing && (
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    <span>{state.isAnalyzing ? 'Analyzing...' : 'Execute Analysis'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Results Pane */}
            <div className="space-y-6">
              {!state.isAnalyzing && !state.result && !state.error && (
                <div className="h-full bg-white border border-[#dadce0] rounded-lg border-dashed p-20 text-center flex flex-col items-center justify-center opacity-40">
                  <div className="p-4 bg-gray-50 rounded-full mb-4">
                     <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <h3 className="text-gray-900 font-bold mb-1 text-lg">Analysis Pending</h3>
                  <p className="text-gray-500 text-sm max-w-xs">Run a scan to see real-time AI insights and threat modeling.</p>
                </div>
              )}

              {state.error && (
                <div className="bg-red-50 border border-red-200 p-6 rounded-lg text-red-700">
                  <h4 className="font-bold flex items-center mb-2">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                    Analysis Interrupted
                  </h4>
                  <p className="text-sm">{state.error}</p>
                </div>
              )}

              {state.isAnalyzing && (
                <div className="bg-white border border-[#dadce0] rounded-lg p-12 text-center flex flex-col items-center justify-center space-y-4 shadow-sm h-full">
                  <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                  <h3 className="font-bold text-[#202124]">Processing with Gemini</h3>
                  <p className="text-xs text-[#5f6368] max-w-xs">Connecting to Google AI infrastructure for deep reasoning and context synthesis...</p>
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
      <div className="mb-10">
        <div className="flex items-center space-x-3 mb-2">
           <h1 className="text-2xl font-bold text-[#202124]">Security Command Center</h1>
           <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
           <span className="text-sm font-medium text-[#5f6368]">Cybersecurity Copilot</span>
        </div>
        <p className="text-[#5f6368] max-w-3xl text-sm leading-relaxed">
          Leverage the power of Gemini's advanced reasoning to automate threat detection, log parsing, and explainable risk modeling in real-time.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center border-b border-[#dadce0] mb-8 overflow-x-auto scrollbar-hide">
        {(['dashboard', 'phishing', 'logs', 'history', 'how_it_works'] as AnalysisType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-6 py-4 text-xs font-bold uppercase tracking-wider whitespace-nowrap border-b-2 transition-all duration-150 ${
              state.activeTab === tab
                ? 'border-[#1a73e8] text-[#1a73e8]'
                : 'border-transparent text-[#5f6368] hover:text-[#202124] hover:bg-gray-100/50'
            }`}
          >
            {tab.replace('_', ' ')}
          </button>
        ))}
      </div>

      {renderTabContent()}
    </Layout>
  );
};

export default App;