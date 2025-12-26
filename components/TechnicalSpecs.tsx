import React from 'react';

export const TechnicalSpecs: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="bg-white p-10 rounded-lg border border-[#dadce0] shadow-sm">
        <header className="mb-12">
          <h2 className="text-3xl font-bold text-[#202124] mb-4">Architecture & Reasoning Protocol</h2>
          <p className="text-[#5f6368] text-lg leading-relaxed">
            SentinelMind AI utilizes a multi-stage reasoning pipeline powered by the Gemini 3 Series to ensure low latency without compromising on analytical depth.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 border border-[#dadce0] rounded-xl bg-[#f8f9fa] flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h4 className="font-bold text-[#202124] mb-2 text-sm uppercase">Gemini 3 Flash</h4>
            <p className="text-xs text-[#5f6368]">Primary agent for phishing classification and real-time user interaction.</p>
          </div>
          <div className="p-6 border border-[#dadce0] rounded-xl bg-[#f8f9fa] flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h4 className="font-bold text-[#202124] mb-2 text-sm uppercase">Thinking Budget</h4>
            <p className="text-xs text-[#5f6368]">Deep reasoning allocated (16k tokens) for complex system log correlation.</p>
          </div>
          <div className="p-6 border border-[#dadce0] rounded-xl bg-[#f8f9fa] flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
            </div>
            <h4 className="font-bold text-[#202124] mb-2 text-sm uppercase">Grounding Core</h4>
            <p className="text-xs text-[#5f6368]">Direct Google Search integration to verify domain reputations and known exploits.</p>
          </div>
        </div>

        <div className="space-y-12 bg-[#f8f9fa] p-8 rounded-lg border border-[#dadce0]">
           <h3 className="font-bold text-lg text-[#202124] flex items-center">
             <svg className="w-5 h-5 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
             Implementation Methodology
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {[
                { title: "Zero-Trust Parsing", desc: "Inputs are never trusted. We use structured JSON schemas to force deterministic AI outputs and prevent prompt injection." },
                { title: "Heuristic Correlation", desc: "The AI looks for linguistic 'urgency' and 'authority' patterns common in social engineering, mapping them to risk levels." },
                { title: "Log Sequence Logic", desc: "Gemini analyzes logs as a chronological story, identifying 'First Access' vs 'Brute Force' patterns across timeframes." },
                { title: "Transparency First", desc: "Every assessment includes an explainable rationale, designed for both technical stakeholders and non-technical users." }
              ].map((item, i) => (
                <div key={i}>
                  <h4 className="font-bold text-[#202124] text-sm mb-2">{item.title}</h4>
                  <p className="text-[#5f6368] text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[10px] font-bold text-[#70757a] uppercase tracking-[4px]">Verified Secure Architecture :: SentinelMind_v2</p>
        </div>
      </div>
    </div>
  );
};