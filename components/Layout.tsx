
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0d0d0d] font-mono text-emerald-500 selection:bg-emerald-900 selection:text-white">
      <nav className="border-b-4 border-emerald-900/30 bg-black/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-4">
              <div className="p-1 border-2 border-emerald-500 bg-emerald-500/10 shadow-[2px_2px_0px_0px_rgba(16,185,129,0.3)]">
                <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-xl md:text-2xl font-black tracking-tighter text-emerald-500 pixel-font">
                SECUREMIND <span className="text-white opacity-80">v1.0</span>
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-8 text-[10px] font-bold uppercase tracking-widest pixel-font">
              <span className="hover:text-white cursor-pointer transition-colors border-b-2 border-transparent hover:border-emerald-500">Docs</span>
              <span className="hover:text-white cursor-pointer transition-colors border-b-2 border-transparent hover:border-emerald-500">Intel</span>
              <button className="px-4 py-2 border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-black transition-all font-bold">
                SCAN_SYS
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {children}
      </main>
      <footer className="py-12 border-t-4 border-emerald-900/20 mt-12 bg-black/50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-[14px] opacity-40 uppercase tracking-[4px] font-bold">
            [ ENGINE: GEMINI_3_FLASH ] • [ EVENT: HAJIPUR_2025 ] • [ SYSTEM_STATUS: OK ]
          </p>
        </div>
      </footer>
    </div>
  );
};
