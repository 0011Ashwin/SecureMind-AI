
import React from 'react';

export const TechnicalSpecs: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="bg-blue-600 text-white p-2 rounded-lg mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.628.288a2 2 0 01-1.643.03l-2.083-.766a2 2 0 00-1.35.13l-2.268.908a2 2 0 00-1.211 1.846v.07a2 2 0 00.586 1.414l2.36 2.36a2 2 0 001.414.586h.07a2 2 0 001.846-1.211l.908-2.268a2 2 0 00.13-1.35l-.766-2.083a2 2 0 01.03-1.643l.288-.628a6 6 0 00.517-3.86l-.477-2.387a2 2 0 00-.547-1.022L15.428 4.572a2 2 0 011.022.547l2.387.477a6 6 0 003.86-.517l.628-.288a2 2 0 011.643-.03l2.083.766a2 2 0 001.35-.13l2.268-.908a2 2 0 001.211-1.846v-.07a2 2 0 00-.586-1.414l-2.36-2.36a2 2 0 00-1.414-.586h-.07a2 2 0 00-1.846 1.211l-.908 2.268a2 2 0 00-.13 1.35l.766 2.083a2 2 0 01-.03-1.643l-.288.628a6 6 0 00-.517 3.86l.477-2.387a2 2 0 00.547 1.022L15.428 4.572z" /></svg>
            </span>
            System Architecture
          </h3>
          <p className="text-gray-600 font-medium">Built on Google's high-performance AI infrastructure to deliver secure, real-time threat detection.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
            <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Frontend Stack</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>React 19 (ES6+)</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>TypeScript Logic</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>Tailwind UI</li>
            </ul>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
            <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Reasoning Engine</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>Gemini 3 Flash (Fast)</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>Gemini 3 Pro (Deep)</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>Thinking Budget (16k)</li>
            </ul>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
            <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Data Protocol</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>JSON Schema Enforced</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>Google Search Grounding</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>Deterministic Reports</li>
            </ul>
          </div>
        </div>

        <div className="space-y-12">
          <div className="border-l-4 border-blue-600 pl-8 space-y-16">
            {[
              { title: "Input Processing", desc: "Data is captured via HTTPS and sanitized. Multi-modal inputs (text/logs) are categorized for specialized model routing." },
              { title: "Context Injection", desc: "The AI agent is injected with security analyst personas and organizational threat intelligence via system instructions." },
              { title: "Deep Reasoning", desc: "Using Gemini's Thinking capabilities, the system evaluates logical fallacies in text or abnormal spikes in access logs." },
              { title: "Structured Synthesis", desc: "Insights are mapped to a structured object, ensuring cross-system compatibility and deterministic risk scores." }
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[45px] top-0 w-8 h-8 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center font-black text-blue-600 text-xs shadow-sm">
                  {i + 1}
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed max-w-2xl">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
