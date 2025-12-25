
import React from 'react';

export const TechnicalSpecs: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="bg-black p-10 border-4 border-emerald-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
        <div className="absolute -top-4 left-6 bg-black px-4 text-emerald-500 text-[10px] font-bold pixel-font">
          SYSTEM_ARCH_v1
        </div>
        <h3 className="text-2xl font-black text-white mb-10 flex items-center pixel-font tracking-tighter">
          <span className="bg-emerald-500 text-black px-2 py-1 mr-4">SYS</span>
          OPERATIONAL_FRAMEWORK
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="p-6 bg-emerald-950/20 border-2 border-emerald-900">
            <h4 className="font-bold text-emerald-400 mb-3 pixel-font text-[10px]">#01 REACT_LAYER</h4>
            <p className="text-emerald-100/70 text-lg leading-tight">TypeScript x React 19. Hardware-accelerated UI with pixel-perfect rendering.</p>
          </div>
          <div className="p-6 bg-emerald-950/20 border-2 border-emerald-900">
            <h4 className="font-bold text-emerald-400 mb-3 pixel-font text-[10px]">#02 NEURAL_CORE</h4>
            <p className="text-emerald-100/70 text-lg leading-tight">Gemini 3 Flash/Pro hybrid pipeline for real-time security reasoning.</p>
          </div>
          <div className="p-6 bg-emerald-950/20 border-2 border-emerald-900">
            <h4 className="font-bold text-emerald-400 mb-3 pixel-font text-[10px]">#03 PROTOCOL</h4>
            <p className="text-emerald-100/70 text-lg leading-tight">Strict JSON schema validation ensures zero-hallucination deterministic reports.</p>
          </div>
        </div>

        <div className="space-y-10">
          <h4 className="text-lg font-bold text-white pixel-font tracking-widest underline decoration-emerald-500 decoration-4 underline-offset-8">DATA_PIPELINE</h4>
          <ol className="relative border-l-4 border-emerald-900 ml-6 space-y-12">
            {[
              { title: "CAPTURE", desc: "Ingesting raw buffer data (SMS/Logs/Text) via the secure interface." },
              { title: "PROMPT", desc: "Injecting data into specialized security analyst neural contexts." },
              { title: "REASON", desc: "Gemini multi-step evaluation against cyber-threat taxonomies." },
              { title: "REPORT", desc: "Structured extraction of risk levels and actionable mitigations." }
            ].map((step, i) => (
              <li key={i} className="ml-8 relative">
                <span className="absolute flex items-center justify-center w-10 h-10 bg-emerald-500 text-black font-bold -left-[54px] border-4 border-black pixel-font">
                  {i + 1}
                </span>
                <h5 className="font-bold text-emerald-400 pixel-font text-[12px]">{step.title}</h5>
                <p className="text-lg text-emerald-100/60 leading-tight mt-1">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
};
