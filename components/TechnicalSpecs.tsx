
import React from 'react';

export const TechnicalSpecs: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center">
          <span className="bg-indigo-600 text-white p-2 rounded-lg mr-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.628.288a2 2 0 01-1.643.03l-2.083-.766a2 2 0 00-1.35.13l-2.268.908a2 2 0 00-1.211 1.846v.07a2 2 0 00.586 1.414l2.36 2.36a2 2 0 001.414.586h.07a2 2 0 001.846-1.211l.908-2.268a2 2 0 00.13-1.35l-.766-2.083a2 2 0 01.03-1.643l.288-.628a6 6 0 00.517-3.86l-.477-2.387a2 2 0 00-.547-1.022L15.428 4.572a2 2 0 011.022.547l2.387.477a6 6 0 003.86-.517l.628-.288a2 2 0 011.643-.03l2.083.766a2 2 0 001.35-.13l2.268-.908a2 2 0 001.211-1.846v-.07a2 2 0 00-.586-1.414l-2.36-2.36a2 2 0 00-1.414-.586h-.07a2 2 0 00-1.846 1.211l-.908 2.268a2 2 0 00-.13 1.35l.766 2.083a2 2 0 01-.03-1.643l-.288.628a6 6 0 00-.517 3.86l.477-2.387a2 2 0 00.547 1.022L15.428 4.572z" />
            </svg>
          </span>
          System Architecture
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="font-bold text-indigo-600 mb-2">Frontend (React)</h4>
            <p className="text-sm text-slate-600">Built with React 19, TypeScript, and Tailwind CSS for a high-performance, accessible dashboard.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="font-bold text-indigo-600 mb-2">AI Engine (Gemini)</h4>
            <p className="text-sm text-slate-600">Uses Gemini 3 Flash for speed and Gemini 3 Pro for complex security log reasoning.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="font-bold text-indigo-600 mb-2">Deterministic Output</h4>
            <p className="text-sm text-slate-600">Enforced JSON schemas ensure the AI provides structured data, not conversational chat.</p>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-lg font-bold text-slate-800">Operational Workflow</h4>
          <ol className="relative border-l border-slate-200 ml-4 space-y-8">
            <li className="ml-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-full -left-4 ring-4 ring-white">
                <span className="text-indigo-600 font-bold">1</span>
              </span>
              <h5 className="font-bold text-slate-900">Input Capturing</h5>
              <p className="text-sm text-slate-600">User provides raw text data (SMS, Email text, or Server Logs) through the secure dashboard.</p>
            </li>
            <li className="ml-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-full -left-4 ring-4 ring-white">
                <span className="text-indigo-600 font-bold">2</span>
              </span>
              <h5 className="font-bold text-slate-900">Contextual Prompting</h5>
              <p className="text-sm text-slate-600">The input is wrapped in optimized security analyst personas with strict JSON output constraints.</p>
            </li>
            <li className="ml-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-full -left-4 ring-4 ring-white">
                <span className="text-indigo-600 font-bold">3</span>
              </span>
              <h5 className="font-bold text-slate-900">Multi-Step Reasoning</h5>
              <p className="text-sm text-slate-600">Gemini evaluates patterns against known threat vectors (phishing keywords, IP anomalies, brute force spikes).</p>
            </li>
            <li className="ml-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-full -left-4 ring-4 ring-white">
                <span className="text-indigo-600 font-bold">4</span>
              </span>
              <h5 className="font-bold text-slate-900">Explainable Extraction</h5>
              <p className="text-sm text-slate-600">The engine extracts a risk level, a non-technical explanation, and concrete mitigation steps.</p>
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
};
