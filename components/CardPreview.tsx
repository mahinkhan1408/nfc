import React, { useRef, useState } from 'react';
import type { CardData } from '../types';
import { AsYouType } from 'libphonenumber-js';
import { LinkedinIcon } from './icons/LinkedinIcon';
import { WebsiteIcon } from './icons/WebsiteIcon';
import { FacebookIcon } from './icons/FacebookIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { YouTubeIcon } from './icons/YouTubeIcon';
import { TikTokIcon } from './icons/TikTokIcon';
import { SnapchatIcon } from './icons/SnapchatIcon';
import { TelegramIcon } from './icons/TelegramIcon';
import { DiscordIcon } from './icons/DiscordIcon';
import { TeamsIcon } from './icons/TeamsIcon';
import { MapPinIcon } from './icons/MapPinIcon';
import { GithubIcon } from './icons/GithubIcon';
import { AwardIcon } from './icons/AwardIcon';

interface CardPreviewProps {
  cardData: CardData;
}

const BRAND_COLORS: Record<string, string> = {
  linkedin: '#0A66C2',
  instagram: '#E4405F',
  facebook: '#1877F2',
  twitter: '#000000',
  whatsapp: '#25D366',
  youtube: '#FF0000',
  tiktok: '#000000',
  snapchat: '#F59E0B', // Using a visible yellow/orange instead of pure #FFFC00 for visibility
  telegram: '#26A5E4',
  discord: '#5865F2',
  teams: '#6264A7',
  github: '#181717',
  website: '#4B5563',
  email: '#4B5563',
  phone: '#4B5563',
  address: '#4B5563',
  award: '#F59E0B' // Gold/Amber for awards
};

// Helper component for Mouse Drag Scrolling
const DragScrollContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!ref.current) return;
    setIsDown(true);
    setHasMoved(false);
    setStartX(e.pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    // Don't reset hasMoved immediately to prevent click on exit
  };

  const handleMouseUp = () => {
    setIsDown(false);
    // hasMoved remains true until next mouse down or separate reset, 
    // but mostly we just care about it during the click event phase immediately after mouseup.
    setTimeout(() => setHasMoved(false), 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast multiplier
    if (Math.abs(walk) > 5) {
        setHasMoved(true);
    }
    ref.current.scrollLeft = scrollLeft - walk;
  };

  const handleClickCapture = (e: React.MouseEvent) => {
      if (hasMoved) {
          e.preventDefault();
          e.stopPropagation();
      }
  };

  return (
    <div
      ref={ref}
      className={`cursor-grab active:cursor-grabbing ${className}`}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onClickCapture={handleClickCapture}
    >
      {children}
    </div>
  );
};

const CardPreview: React.FC<CardPreviewProps> = ({ cardData }) => {
  const [isExchangeOpen, setIsExchangeOpen] = useState(false);
  const [exchangeStatus, setExchangeStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  // The header uses the user's custom background choice
  const headerStyle: React.CSSProperties = {
    backgroundColor: cardData.cardBackgroundType === 'color' ? cardData.cardBackgroundColor : '#111827',
    backgroundImage: cardData.cardBackgroundType === 'image' && cardData.cardBackgroundImage ? `url(${cardData.cardBackgroundImage})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  // Calculate alignment class for the profile picture container
  const alignmentClass = {
      left: 'self-start',
      center: 'self-center',
      right: 'self-end'
  }[cardData.profileAlignment || 'left'];

  // Check if there are any contact details to display
  const hasContactDetails = cardData.emails.length > 0 || cardData.phoneNumbers.length > 0 || cardData.address;
  
  // Separate Messaging and Social links
  const messagingLinks = [
      { key: 'whatsapp', icon: <WhatsAppIcon />, label: 'WhatsApp', url: cardData.whatsapp ? `https://wa.me/${cardData.whatsapp.replace(/[^0-9]/g, '')}` : '' },
      { key: 'telegram', icon: <TelegramIcon />, label: 'Telegram', url: cardData.telegram ? (cardData.telegram.startsWith('http') ? cardData.telegram : `https://t.me/${cardData.telegram.replace('@', '')}`) : '' },
      { key: 'discord', icon: <DiscordIcon />, label: 'Discord', url: cardData.discord },
      { key: 'teams', icon: <TeamsIcon />, label: 'Teams', url: cardData.teams },
  ].filter(item => !!cardData[item.key as keyof CardData]); // Check against raw data availability

  const socialLinks = [
      { key: 'linkedin', icon: <LinkedinIcon />, label: 'LinkedIn', url: cardData.linkedin },
      { key: 'website', icon: <WebsiteIcon />, label: 'Website', url: cardData.website },
      { key: 'instagram', icon: <InstagramIcon />, label: 'Instagram', url: cardData.instagram },
      { key: 'facebook', icon: <FacebookIcon />, label: 'Facebook', url: cardData.facebook },
      { key: 'twitter', icon: <TwitterIcon />, label: 'X', url: cardData.twitter },
      { key: 'youtube', icon: <YouTubeIcon />, label: 'YouTube', url: cardData.youtube },
      { key: 'tiktok', icon: <TikTokIcon />, label: 'TikTok', url: cardData.tiktok },
      { key: 'snapchat', icon: <SnapchatIcon />, label: 'Snapchat', url: cardData.snapchat },
      { key: 'github', icon: <GithubIcon />, label: 'GitHub', url: cardData.github },
  ].filter(item => !!item.url);

  // Determine icon color helper
  const getIconColor = (key: string) => {
    if (cardData.iconStyle === 'custom') return cardData.iconColor;
    return BRAND_COLORS[key] || '#4B5563';
  };

  const genericIconColor = cardData.iconStyle === 'custom' ? cardData.iconColor : undefined;
  const genericIconClass = cardData.iconStyle === 'custom' ? '' : 'opacity-60';
  const awardIconColor = cardData.iconStyle === 'custom' ? cardData.iconColor : BRAND_COLORS['award'];

  // Helper for phone formatting
  const formatPhoneNumber = (value: string) => {
    if (!value) return '';
    // Try to format as International if it starts with +, otherwise generic
    return new AsYouType().input(value);
  };

  // Generate and Download vCard
  const handleSaveContact = () => {
      let vCard = `BEGIN:VCARD\nVERSION:3.0\nFN:${cardData.name}\n`;
      if (cardData.company) vCard += `ORG:${cardData.company}\n`;
      if (cardData.title) vCard += `TITLE:${cardData.title}\n`;

      cardData.phoneNumbers.forEach(p => {
        if(p.value) vCard += `TEL;TYPE=${(p.label || 'CELL').toUpperCase()}:${p.value}\n`;
      });

      cardData.emails.forEach(e => {
        if(e.value) vCard += `EMAIL;TYPE=${(e.label || 'WORK').toUpperCase()}:${e.value}\n`;
      });

      if (cardData.website) vCard += `URL:${cardData.website}\n`;
      if (cardData.linkedin) vCard += `URL:${cardData.linkedin}\n`;
      if (cardData.address) vCard += `ADR:;;${cardData.address.replace(/,/g, ';')};;;;\n`;

      vCard += `END:VCARD`;

      const blob = new Blob([vCard], { type: 'text/vcard' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${cardData.name.replace(/\s+/g, '_')}.vcf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  // Exchange Form Submit
  const handleExchangeSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setExchangeStatus('sending');
      // Simulate API call
      setTimeout(() => {
          setExchangeStatus('success');
          // Close after success
          setTimeout(() => {
              setIsExchangeOpen(false);
              setExchangeStatus('idle');
          }, 1500);
      }, 1000);
  };

  return (
    <div className="w-full select-none transform transition-transform duration-500 ease-out origin-center hover:scale-[1.01]">
      {/* CSS to hide scrollbar but allow scrolling */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Phone Frame - Dimensions 350x700 for better fit on standard laptop screens */}
      <div className="relative mx-auto border-[12px] border-gray-900 bg-gray-900 rounded-[3rem] shadow-2xl h-[700px] w-[350px] overflow-hidden ring-1 ring-white/10">
        {/* Notch/Dynamic Island */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-b-[16px] z-50 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-black absolute -top-6 blur-md opacity-60"></div>
        </div>

        {/* Status Bar Mockup */}
        <div className="absolute top-3 left-7 z-40 text-white text-[10px] font-medium tracking-wide">9:41</div>
        <div className="absolute top-3.5 right-7 z-40 flex gap-1.5">
            <div className="w-3.5 h-2 border border-white/40 rounded-[2px]"></div>
            <div className="w-0.5 h-2 bg-white/40 rounded-full"></div>
        </div>
        
        {/* Screen Content (Scrollable) */}
        <div className="h-full w-full bg-gray-50 overflow-y-auto no-scrollbar flex flex-col relative">
             
             {/* 1. Header Area (Fixed size, shrink-0 to prevent collapse) */}
             <div style={headerStyle} className="h-[200px] w-full flex-shrink-0 relative transition-all duration-500">
                {/* Gradient Overlay for text legibility if needed, or just style */}
                <div className="absolute inset-0 bg-black/10"></div>
                
                {/* Logo in top right if it exists */}
                {cardData.logo && (
                    cardData.website ? (
                      <a 
                          href={cardData.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute top-10 right-5 w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm p-2 flex items-center justify-center z-30 cursor-pointer hover:scale-110 transition-transform"
                      >
                           <img src={cardData.logo} alt="Logo" className="w-full h-full object-contain" />
                      </a>
                    ) : (
                      <div className="absolute top-10 right-5 w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm p-2 flex items-center justify-center z-30">
                           <img src={cardData.logo} alt="Logo" className="w-full h-full object-contain" />
                      </div>
                    )
                )}
             </div>

             {/* 2. Content Sheet (Sliding up, min-h to fill rest of screen, expands naturally) */}
             <div 
                style={{ backgroundColor: cardData.themeColor }}
                className="flex-grow rounded-t-[32px] -mt-10 relative z-20 flex flex-col px-6 pb-8 pt-0 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-colors duration-300 min-h-[540px]"
             >
                
                {/* Profile Picture (Floating on the seam) */}
                {/* Dynamic alignment class applied here */}
                <div className={`transform -translate-y-1/2 mb-[-60px] ${alignmentClass}`}>
                    <div className="p-1 bg-white rounded-[2.3rem] shadow-sm inline-block">
                        <img 
                            src={cardData.profilePicture || 'https://via.placeholder.com/150'} 
                            alt={cardData.name} 
                            className="w-32 h-32 rounded-[2.2rem] object-cover border border-gray-100 shadow-inner bg-gray-100"
                        />
                    </div>
                </div>

                {/* Text Info */}
                {/* Reduced top margin to tighten layout */}
                <div className="mt-2 flex flex-col items-start space-y-1 w-full">
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight leading-tight break-words w-full">
                        {cardData.name || 'Your Name'}
                    </h2>
                    {/* Increased font size from text-sm to text-base */}
                    <div className="flex flex-col text-gray-500 text-base font-medium w-full break-words">
                         <span>{cardData.title || 'Job Title'}</span>
                         {cardData.company && (
                             <span className="text-gray-400">at {cardData.company}</span>
                         )}
                    </div>

                    {/* Contact Details List */}
                    {hasContactDetails && (
                        <div className="flex flex-col space-y-3 mt-5 pt-1 w-full">
                            {cardData.address && (
                                <a 
                                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cardData.address)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group flex items-start gap-3 hover:text-indigo-600 transition-colors cursor-pointer"
                                >
                                    <div className={`flex-shrink-0 mt-0.5 ${genericIconClass}`} style={{ color: genericIconColor }}>
                                      <MapPinIcon width="16" height="16" />
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-sm text-gray-600 font-medium break-words group-hover:text-indigo-600">{cardData.address}</span>
                                    </div>
                                </a>
                            )}
                            
                            {cardData.emails.map((email) => (
                                email.value ? (
                                  <a 
                                    key={email.id}
                                    href={`mailto:${email.value}`}
                                    className="group flex items-start gap-3 hover:text-indigo-600 transition-colors cursor-pointer"
                                  >
                                    <div className={`flex-shrink-0 mt-1 ${genericIconClass}`} style={{ color: genericIconColor }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-sm text-gray-600 font-medium break-all group-hover:text-indigo-600">{email.value}</span>
                                      {email.label && (
                                          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mt-0.5">{email.label}</span>
                                      )}
                                    </div>
                                  </a>
                                ) : null
                            ))}
                            
                            {cardData.phoneNumbers.map((phone) => (
                                phone.value ? (
                                  <a 
                                    key={phone.id}
                                    href={`tel:${phone.value}`}
                                    className="group flex items-start gap-3 hover:text-indigo-600 transition-colors cursor-pointer"
                                  >
                                     <div className={`flex-shrink-0 mt-1 ${genericIconClass}`} style={{ color: genericIconColor }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                     </div>
                                     <div className="flex flex-col">
                                        <span className="text-sm text-gray-600 font-medium group-hover:text-indigo-600">{formatPhoneNumber(phone.value)}</span>
                                        {phone.label && (
                                            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mt-0.5">{phone.label}</span>
                                        )}
                                     </div>
                                  </a>
                                ) : null
                            ))}
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                    <button 
                        onClick={handleSaveContact}
                        style={{ backgroundColor: cardData.buttonColor || '#111827' }}
                        className="h-14 rounded-lg text-white font-bold text-lg shadow-lg shadow-gray-900/20 hover:opacity-90 transition-opacity flex items-center justify-center active:scale-95 duration-150"
                    >
                        Save Contact
                    </button>
                    <button 
                        onClick={() => setIsExchangeOpen(true)}
                        style={{ 
                          borderColor: cardData.buttonColor || '#111827',
                          color: cardData.buttonColor || '#111827'
                        }}
                        className="h-14 rounded-lg bg-white border font-semibold text-base hover:bg-gray-50 transition-colors flex items-center justify-center shadow-sm active:scale-95 duration-150"
                    >
                        Exchange
                    </button>
                </div>

                {/* Messaging Slider */}
                {messagingLinks.length > 0 && (
                    <div className="mt-6 w-full">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Messaging</p>
                        <DragScrollContainer className="flex overflow-x-auto gap-3 pb-4 -mx-6 px-6 no-scrollbar snap-x">
                            {messagingLinks.map((link) => (
                                <SocialIconBtn 
                                  key={link.key} 
                                  icon={link.icon} 
                                  label={link.label} 
                                  url={link.url} 
                                  color={getIconColor(link.key)}
                                />
                            ))}
                        </DragScrollContainer>
                    </div>
                )}

                {/* Social Icons Slider (Connect) */}
                {socialLinks.length > 0 && (
                    <div className={`${messagingLinks.length > 0 ? 'mt-2' : 'mt-6'} w-full`}>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Connect</p>
                    
                    <DragScrollContainer className="flex overflow-x-auto gap-3 pb-4 -mx-6 px-6 no-scrollbar snap-x">
                        {socialLinks.map((link) => (
                             <SocialIconBtn 
                                key={link.key} 
                                icon={link.icon} 
                                label={link.label} 
                                url={link.url}
                                color={getIconColor(link.key)} 
                            />
                        ))}
                    </DragScrollContainer>
                    </div>
                )}

                {/* Accreditations Section */}
                {cardData.accreditations.length > 0 && (
                   <div className="mt-2 w-full pb-8">
                       <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Accreditations</p>
                       <div className="flex flex-col gap-3">
                           {cardData.accreditations.map((item) => {
                               const Wrapper = item.url ? 'a' : 'div';
                               const props = item.url ? { href: item.url, target: '_blank', rel: 'noopener noreferrer' } : {};
                               const cursorClass = item.url ? 'cursor-pointer hover:bg-gray-50 hover:shadow-md' : '';
                               
                               return (
                                   <Wrapper 
                                      key={item.id} 
                                      {...props} 
                                      className={`flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100 shadow-sm transition-all ${cursorClass}`}
                                   >
                                       <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center flex-shrink-0" style={{ color: awardIconColor }}>
                                           <AwardIcon />
                                       </div>
                                       <span className="text-sm font-medium text-gray-800 line-clamp-2">{item.label || 'Accreditation Name'}</span>
                                   </Wrapper>
                               )
                           })}
                       </div>
                   </div>
                )}


                {/* Footer Branding */}
                <div className="mt-auto pt-4 pb-2 flex flex-col items-center opacity-60">
                    <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 bg-gray-900 rounded flex items-center justify-center text-white text-[8px] font-bold">M</div>
                        <span className="text-xs font-bold text-gray-900">muradtap</span>
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1">Create your digital card</span>
                </div>
             </div>
             
             {/* EXCHANGE CONTACT MODAL OVERLAY */}
             {isExchangeOpen && (
               <div className="absolute inset-0 z-[60] bg-black/30 backdrop-blur-sm flex items-end animate-fadeIn">
                  <div className="w-full bg-white rounded-t-[32px] p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.2)] animate-slideUp">
                      <div className="flex justify-between items-center mb-6">
                          <h3 className="text-xl font-bold text-gray-900">Share your info</h3>
                          <button 
                            onClick={() => setIsExchangeOpen(false)}
                            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                          >
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                          </button>
                      </div>

                      {exchangeStatus === 'success' ? (
                        <div className="flex flex-col items-center justify-center py-10 space-y-4">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <h4 className="text-lg font-bold text-gray-900">Sent Successfully!</h4>
                            <p className="text-center text-gray-500 text-sm">Your details have been shared with {cardData.name}.</p>
                        </div>
                      ) : (
                        <form onSubmit={handleExchangeSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 uppercase">Your Name</label>
                                <input required type="text" placeholder="John Doe" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-gray-900 placeholder-gray-400" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 uppercase">Email Address</label>
                                <input required type="email" placeholder="john@example.com" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-gray-900 placeholder-gray-400" />
                            </div>
                             <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 uppercase">Phone Number</label>
                                <input type="tel" placeholder="+1 234 567 8900" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-gray-900 placeholder-gray-400" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 uppercase">About You (Optional)</label>
                                <textarea rows={2} placeholder="Hi, I'd like to connect..." className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-gray-900 placeholder-gray-400 resize-none" />
                            </div>
                            
                            <button 
                                type="submit"
                                disabled={exchangeStatus === 'sending'}
                                style={{ backgroundColor: cardData.buttonColor || '#111827' }}
                                className="w-full h-14 mt-4 rounded-xl text-white font-bold text-lg shadow-lg shadow-gray-900/10 flex items-center justify-center hover:opacity-90 active:scale-[0.98] transition-all"
                            >
                                {exchangeStatus === 'sending' ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : 'Connect'}
                            </button>
                        </form>
                      )}
                  </div>
               </div>
             )}
        </div>
      </div>
    </div>
  );
};

const SocialIconBtn: React.FC<{ icon: React.ReactNode; label?: string; url?: string; color?: string }> = ({ icon, label, url, color }) => {
    const Wrapper = url ? 'a' : 'button';
    const props = url ? { href: url, target: '_blank', rel: 'noopener noreferrer' } : {};
    
    const iconStyle = color ? { color: color } : {};
    const textColorClass = color ? '' : 'text-gray-700 group-hover:text-indigo-600';

    return (
        <Wrapper 
            {...props}
            className="flex flex-col items-center gap-1 flex-shrink-0 group snap-start cursor-pointer"
            draggable={false} // Prevent native drag of the anchor/button
        >
            <div 
                className={`w-14 h-14 rounded-2xl bg-white flex items-center justify-center hover:bg-gray-50 hover:scale-105 transition-all duration-200 border border-gray-100 shadow-sm group-hover:shadow-md ${textColorClass}`}
                style={iconStyle}
            >
                <div className="w-6 h-6">
                    {icon}
                </div>
            </div>
            {label && <span className="text-[10px] font-medium text-gray-400 group-hover:text-gray-600">{label}</span>}
        </Wrapper>
    );
};

export default CardPreview;