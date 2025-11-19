import React from 'react';

interface HeaderProps {
  onPreview: () => void;
}

const Header: React.FC<HeaderProps> = ({ onPreview }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20 h-16">
      <div className="w-full px-6 h-full flex justify-between items-center">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
             M
           </div>
           <div className="text-xl font-bold tracking-tight text-gray-900">muradtap<span className="text-indigo-600">.</span></div>
        </div>
        <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-sm text-gray-500">Draft saved</span>
            <button 
                className="bg-gray-900 text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors text-sm flex items-center gap-2 shadow-md hover:shadow-lg transform active:scale-95 duration-200"
                onClick={onPreview}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                See Live
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;