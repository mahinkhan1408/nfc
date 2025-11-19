import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CardPreview from './components/CardPreview';
import CustomizationForm from './components/CustomizationForm';
import { INITIAL_CARD_DATA } from './constants';
import type { CardData } from './types';

const App: React.FC = () => {
  const [isPreview, setIsPreview] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize state from localStorage if available, else use default
  const [cardData, setCardData] = useState<CardData>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('muradtap_card_data');
        if (saved) {
          return JSON.parse(saved);
        }
      } catch (e) {
        console.warn('Failed to load card data from storage', e);
      }
    }
    return INITIAL_CARD_DATA;
  });

  // Check for preview mode on mount (optional fallback for direct links)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('preview') === 'true') {
      setIsPreview(true);
    }
    setIsLoaded(true);
  }, []);

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('muradtap_card_data', JSON.stringify(cardData));
      } catch (e) {
        console.warn('Failed to save card data to storage', e);
      }
    }
  }, [cardData, isLoaded]);

  const handleTogglePreview = (showPreview: boolean) => {
    setIsPreview(showPreview);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render pure preview mode (The "See Live" View)
  if (isPreview) {
    return (
      <div className="min-h-screen w-full bg-gray-900 flex flex-col items-center justify-center p-4 sm:p-8 animate-fadeIn">
        <div className="transform scale-[0.85] sm:scale-100 transition-transform duration-300">
           <CardPreview cardData={cardData} />
        </div>
        <div className="mt-8 text-center animate-slideUp">
           <button 
             onClick={() => handleTogglePreview(false)}
             className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-full text-white text-sm font-bold transition-all cursor-pointer shadow-lg hover:scale-105"
           >
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/></svg>
             Back to Editor
           </button>
        </div>
      </div>
    );
  }

  // Render Editor Mode
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-gray-900 lg:h-screen lg:overflow-hidden">
      <Header onPreview={() => handleTogglePreview(true)} />
      <main className="flex-grow flex flex-col lg:flex-row lg:h-[calc(100vh-64px)] h-auto">
        {/* Left Panel - Live Preview */}
        <div className="w-full lg:w-1/2 relative overflow-hidden flex items-center justify-center p-8 lg:p-8 bg-[#0B1121] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1e293b] via-[#0f172a] to-[#020617] shrink-0">
          {/* Subtle texture/noise */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay"></div>
          
          <div className="relative z-10 w-full flex flex-col items-center justify-center py-6 lg:py-0">
             {/* Label for mobile context */}
            <div className="mb-6 text-center lg:hidden">
              <h2 className="text-white/90 text-xs font-bold uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/5">Live Preview</h2>
            </div>
            {/* Responsive scaling wrapper */}
            <div className="transform scale-[0.70] sm:scale-[0.80] md:scale-[0.90] xl:scale-100 transition-transform duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] origin-top lg:origin-center">
                <CardPreview cardData={cardData} />
            </div>
          </div>
        </div>

        {/* Right Panel - Customization Form */}
        <div className="w-full lg:w-1/2 bg-white lg:h-full lg:overflow-y-auto h-auto border-l border-gray-100">
          <div className="max-w-2xl mx-auto p-6 lg:p-10">
            <CustomizationForm cardData={cardData} setCardData={setCardData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;