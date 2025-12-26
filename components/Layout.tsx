import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* GCP Style Top Navigation */}
      <nav className="bg-[#1a73e8] text-white h-12 flex items-center justify-between px-4 sticky top-0 z-[100] shadow-sm">
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-white/10 rounded-full transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-lg tracking-tight whitespace-nowrap">SentinelMind AI</span>
          </div>
          
          <div className="h-6 w-[1px] bg-white/20 hidden sm:block"></div>
          
          <div className="hidden md:flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-3 py-1 rounded cursor-pointer transition border border-white/10">
            <span className="text-[11px] font-medium opacity-70 uppercase tracking-tighter">Project</span>
            <span className="text-xs font-bold">sentinel-prod-hajipur</span>
            <svg className="w-3 h-3 opacity-60" fill="currentColor" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden lg:flex items-center space-x-4 mr-4">
            <button className="text-sm font-medium hover:bg-white/10 px-3 py-1 rounded transition">Support</button>
            <button className="text-sm font-medium hover:bg-white/10 px-3 py-1 rounded transition">Docs</button>
          </div>
          <div className="h-8 w-8 rounded-full bg-blue-500 border border-white/30 flex items-center justify-center font-bold text-xs">
            JD
          </div>
        </div>
      </nav>

      {/* Secondary Hackathon Header */}
      <div className="bg-white border-b border-[#dadce0] px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
             <span className="text-[#3c4043] font-bold text-sm">GenAI Hackathon</span>
             <span className="text-[#ea4335] font-black text-sm">Hajipur 2025</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-widest">
            Prototype
          </span>
        </div>
        <div className="flex items-center space-x-4 text-[11px] text-[#70757a] font-medium uppercase tracking-wider">
          <span>Powered by</span>
          <img src="https://www.gstatic.com/devrel-devsite/prod/v773998f45a16568972a50787e83463991823933c1f24d9d835520a02f3a6167c/developers/images/touchicon-180.png" className="w-4 h-4 grayscale opacity-50" alt="Google" />
          <span className="font-bold">Google AI Studio</span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8 max-w-[1600px] mx-auto w-full">
        {children}
      </main>

      <footer className="bg-white border-t border-[#dadce0] px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[#70757a] text-[11px] font-medium">
          <div className="flex items-center space-x-6">
            <p>© 2025 SentinelMind AI</p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span>Gemini 3 Flash Region: global-us</span>
            </div>
          </div>
          <div className="flex items-center space-x-6 uppercase tracking-widest">
            <a href="#" className="hover:text-blue-600 transition">Terms</a>
            <a href="#" className="hover:text-blue-600 transition">Privacy</a>
            <a href="#" className="hover:text-blue-600 transition">Security Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};