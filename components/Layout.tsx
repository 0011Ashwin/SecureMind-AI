
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Google Cloud Style Top Bar */}
      <nav className="bg-[#1a73e8] text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-[1600px] mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
                <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-semibold text-lg tracking-tight">SentinelMind AI</span>
            </div>
            <div className="hidden md:flex items-center space-x-1 px-3 py-1 bg-white/10 rounded border border-white/20">
              <span className="text-xs font-medium opacity-80 uppercase tracking-wider">Project:</span>
              <span className="text-xs font-bold">hajipur-2025-v1</span>
              <svg className="w-4 h-4 opacity-60" fill="currentColor" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-4 text-sm font-medium">
              <a href="#" className="hover:bg-white/10 px-3 py-1 rounded transition">Dashboard</a>
              <a href="#" className="hover:bg-white/10 px-3 py-1 rounded transition">IAM & Admin</a>
              <a href="#" className="hover:bg-white/10 px-3 py-1 rounded transition">Security</a>
            </div>
            <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-xs border border-white/20">
              GA
            </div>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hackathon Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-4">
             <div className="flex items-center space-x-2">
                <span className="text-gray-900 font-bold">GenAI Hackathon</span>
                <span className="text-[#ea4335] font-black">Hajipur</span>
             </div>
             <div className="h-4 w-[1px] bg-gray-300"></div>
             <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded">One-Day Event</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span className="font-medium">Powered by</span>
            <span className="font-bold text-gray-700">Google AI Studio</span>
          </div>
        </div>

        <main>
          {children}
        </main>
      </div>

      <footer className="mt-20 py-10 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-gray-500 text-xs">
          <p>© 2025 SentinelMind AI • Built for Google GenAI Hackathon Hajipur</p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
             <span className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="font-medium text-emerald-700">Gemini 3 Flash Online</span>
             </span>
             <a href="#" className="hover:text-blue-600">Privacy</a>
             <a href="#" className="hover:text-blue-600">Compliance</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
