
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-600 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-800">
                SecureMind <span className="text-indigo-600">AI</span>
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-500">
              <span className="hover:text-indigo-600 cursor-pointer transition-colors">Documentation</span>
              <span className="hover:text-indigo-600 cursor-pointer transition-colors">Security Resources</span>
              <button className="px-4 py-2 bg-slate-800 text-white rounded-md text-sm hover:bg-slate-700 transition-colors">
                Quick Scan
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
      <footer className="py-12 border-t border-slate-200 mt-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-500">
            Powered by Gemini 3 Flash • Built for <b>GenAI hackthon Hajipur 2025</b> • SecureMind AI © 2025
          </p>
        </div>
      </footer>
    </div>
  );
};
