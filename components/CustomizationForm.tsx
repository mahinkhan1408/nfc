import React, { useState, useEffect } from 'react';
import type { CardData, AccreditationItem } from '../types';
import ImageUploader from './ImageUploader';
import ColorSelector from './ColorSelector';
import { BACKGROUND_COLORS, PAGE_COLORS, BUTTON_COLORS } from '../constants';

// Icons
import { LinkedinIcon } from './icons/LinkedinIcon';
import { WebsiteIcon } from './icons/WebsiteIcon';
import { FacebookIcon } from './icons/FacebookIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { EmailIcon } from './icons/EmailIcon';
import { YouTubeIcon } from './icons/YouTubeIcon';
import { TikTokIcon } from './icons/TikTokIcon';
import { SnapchatIcon } from './icons/SnapchatIcon';
import { TelegramIcon } from './icons/TelegramIcon';
import { DiscordIcon } from './icons/DiscordIcon';
import { TeamsIcon } from './icons/TeamsIcon';
import { MapPinIcon } from './icons/MapPinIcon';
import { GithubIcon } from './icons/GithubIcon';
import { AwardIcon } from './icons/AwardIcon';

interface CustomizationFormProps {
  cardData: CardData;
  setCardData: React.Dispatch<React.SetStateAction<CardData>>;
}

// Helper Icons for Generic Fields
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>;
const BuildingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="22.01"></line><line x1="15" y1="22" x2="15" y2="22.01"></line><line x1="12" y1="22" x2="12" y2="22.01"></line><line x1="12" y1="18" x2="12" y2="18.01"></line><line x1="9" y1="18" x2="9" y2="18.01"></line><line x1="15" y1="18" x2="15" y2="18.01"></line><line x1="12" y1="14" x2="12" y2="14.01"></line><line x1="9" y1="14" x2="9" y2="14.01"></line><line x1="15" y1="14" x2="15" y2="14.01"></line><line x1="12" y1="10" x2="12" y2="10.01"></line><line x1="9" y1="10" x2="9" y2="10.01"></line><line x1="15" y1="10" x2="15" y2="10.01"></line><line x1="12" y1="6" x2="12" y2="6.01"></line><line x1="9" y1="6" x2="9" y2="6.01"></line><line x1="15" y1="6" x2="15" y2="6.01"></line></svg>;
const ImageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>;

const AlignLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="17" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="17" y1="18" x2="3" y2="18"></line></svg>;
const AlignCenterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="6" x2="3" y2="6"></line><line x1="17" y1="10" x2="7" y2="10"></line><line x1="19" y1="14" x2="5" y2="14"></line><line x1="21" y1="18" x2="3" y2="18"></line></svg>;
const AlignRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="10" x2="7" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="7" y2="18"></line></svg>;


interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onRemove?: () => void;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({ label, id, className, onRemove, ...props }) => {
  return (
    <div className="relative group animate-fadeIn w-full">
      <input
        type="text"
        id={id}
        className={`peer block w-full rounded-md border border-gray-300 bg-white px-3 pb-2 pt-6 text-gray-900 shadow-sm focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:outline-none sm:text-sm ${className || ''}`}
        placeholder=" "
        {...props}
      />
      <label
        htmlFor={id}
        className="absolute left-3 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform bg-white px-1 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-indigo-600 peer-focus:font-semibold cursor-text pointer-events-none"
      >
        {label}
      </label>
      
      {/* Optional Remove Button */}
      {onRemove && (
        <button 
          onClick={(e) => { e.preventDefault(); onRemove(); }}
          className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
          title="Remove field"
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
};

const CustomizationForm: React.FC<CustomizationFormProps> = ({ cardData, setCardData }) => {
  const [activeTab, setActiveTab] = useState<'content' | 'design'>('content');
  
  // Track which fields are visibly active in the form editor (for toggleable singleton fields)
  const [activeFields, setActiveFields] = useState<Set<string>>(() => {
    const keys = new Set<string>(['name']);
    if (cardData.title) keys.add('title');
    if (cardData.company) keys.add('company');
    if (cardData.address) keys.add('address');
    if (cardData.website) keys.add('website');
    if (cardData.linkedin) keys.add('linkedin');
    if (cardData.instagram) keys.add('instagram');
    if (cardData.facebook) keys.add('facebook');
    if (cardData.twitter) keys.add('twitter');
    if (cardData.whatsapp) keys.add('whatsapp');
    if (cardData.youtube) keys.add('youtube');
    if (cardData.tiktok) keys.add('tiktok');
    if (cardData.snapchat) keys.add('snapchat');
    if (cardData.telegram) keys.add('telegram');
    if (cardData.discord) keys.add('discord');
    if (cardData.teams) keys.add('teams');
    if (cardData.github) keys.add('github');
    return keys;
  });

  // Helpers to determine if a group should be shown
  const hasMessaging = activeFields.has('whatsapp') || activeFields.has('telegram') || activeFields.has('discord') || activeFields.has('teams');
  const hasSocial = activeFields.has('linkedin') || activeFields.has('instagram') || activeFields.has('facebook') || activeFields.has('twitter') || activeFields.has('youtube') || activeFields.has('tiktok') || activeFields.has('snapchat') || activeFields.has('github');
  const hasAccreditations = cardData.accreditations.length > 0;

  // Helper to add a singleton field
  const addField = (fieldKey: string) => {
    // Special handling for array fields
    if (fieldKey === 'emails' || fieldKey === 'phoneNumbers' || fieldKey === 'accreditations') {
       if (fieldKey === 'accreditations') {
           addAccreditationItem();
       } else {
           addArrayItem(fieldKey as 'emails' | 'phoneNumbers');
       }
    } else {
      const newSet = new Set(activeFields);
      newSet.add(fieldKey);
      setActiveFields(newSet);
    }
    // Scroll to a general area if needed, though auto-layout handles most
    // document.getElementById('form-top')?.scrollIntoView({ behavior: 'smooth' }); 
  };

  // Helper to remove a singleton field
  const removeField = (fieldKey: keyof CardData) => {
    const newSet = new Set(activeFields);
    newSet.delete(fieldKey);
    setActiveFields(newSet);
    setCardData(prev => ({ ...prev, [fieldKey]: '' }));
  };

  // --- Array Field Management (Phones, Emails) ---
  const addArrayItem = (field: 'emails' | 'phoneNumbers') => {
    const defaultLabel = field === 'emails' ? 'Work' : 'Mobile';
    const newItem = { id: Math.random().toString(36).substr(2, 9), value: '', label: defaultLabel };
    setCardData(prev => ({
      ...prev,
      [field]: [...prev[field], newItem]
    }));
  };

  const updateArrayItem = (field: 'emails' | 'phoneNumbers', id: string, updates: { value?: string, label?: string }) => {
    setCardData(prev => ({
      ...prev,
      [field]: prev[field].map(item => item.id === id ? { ...item, ...updates } : item)
    }));
  };

  const removeArrayItem = (field: 'emails' | 'phoneNumbers', id: string) => {
    setCardData(prev => ({
      ...prev,
      [field]: prev[field].filter(item => item.id !== id)
    }));
  };

  // --- Accreditations Management ---
  const addAccreditationItem = () => {
    const newItem: AccreditationItem = { 
        id: Math.random().toString(36).substr(2, 9), 
        label: '', 
        url: '' 
    };
    setCardData(prev => ({
        ...prev,
        accreditations: [...prev.accreditations, newItem]
    }));
  };

  const updateAccreditationItem = (id: string, updates: Partial<AccreditationItem>) => {
      setCardData(prev => ({
          ...prev,
          accreditations: prev.accreditations.map(item => item.id === id ? { ...item, ...updates } : item)
      }));
  };

  const removeAccreditationItem = (id: string) => {
      setCardData(prev => ({
          ...prev,
          accreditations: prev.accreditations.filter(item => item.id !== id)
      }));
  };


  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData(prev => ({...prev, [name]: value }));
  };

  const handleImageUpload = (field: 'profilePicture' | 'logo' | 'cardBackgroundImage', dataUrl: string | null) => {
    setCardData(prev => ({ ...prev, [field]: dataUrl }));
  };
  
  const handleCardBackgroundTypeChange = (type: 'color' | 'image') => {
    setCardData(prev => ({ ...prev, cardBackgroundType: type }));
  };

  const handleAlignmentChange = (align: 'left' | 'center' | 'right') => {
      setCardData(prev => ({ ...prev, profileAlignment: align }));
  };

  const handleIconStyleChange = (style: 'original' | 'custom') => {
    setCardData(prev => ({ ...prev, iconStyle: style }));
  };

  // Component for the grid buttons
  const OptionButton = ({ icon, label, fieldKey, isArrayType }: { icon: React.ReactNode, label: string, fieldKey: string, isArrayType?: boolean }) => (
    <button 
      onClick={() => addField(fieldKey)}
      disabled={!isArrayType && activeFields.has(fieldKey)}
      className={`
        flex flex-col items-center justify-center gap-3 p-4 rounded-xl border transition-all duration-200
        ${(!isArrayType && activeFields.has(fieldKey))
          ? 'bg-gray-50 border-gray-100 opacity-50 cursor-not-allowed text-gray-400 grayscale' 
          : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-300 hover:shadow-md hover:text-indigo-600'}
      `}
    >
      <div className={`${(!isArrayType && activeFields.has(fieldKey)) ? 'text-gray-300' : 'text-current'}`}>
        {icon}
      </div>
      <span className="text-xs font-bold uppercase tracking-wide text-center">{label}</span>
    </button>
  );

  return (
    <div className="h-full flex flex-col">
      {/* Top Tab Navigation - Sticky. 
          Mobile: Sticks at top-16 (below app header).
          Desktop (lg): Sticks at top-0 (inside scrollable panel).
      */}
      <div className="flex border-b border-gray-200 sticky top-16 lg:top-0 bg-white z-10 px-6 pt-6">
        <button
            onClick={() => setActiveTab('content')}
            className={`pb-4 px-4 text-sm font-bold tracking-wide uppercase border-b-2 transition-colors ${activeTab === 'content' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
        >
            Content
        </button>
        <button
            onClick={() => setActiveTab('design')}
            className={`pb-4 px-4 text-sm font-bold tracking-wide uppercase border-b-2 transition-colors ${activeTab === 'design' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
        >
            Design
        </button>
      </div>

      <div className="p-6 space-y-8 pb-20" id="form-top">
        
        {/* --- CONTENT TAB --- */}
        {activeTab === 'content' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Active Fields Grouped List */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Active Content</h3>
              
              {/* Group 1: Personal Information */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                  <div className="flex items-center gap-2 mb-1 border-b border-gray-100 pb-3">
                      <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
                      <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Personal Information</h4>
                  </div>

                  {/* Name is mandatory */}
                  <FloatingLabelInput id="name" name="name" label="Full Name" value={cardData.name} onChange={handleTextChange} />

                  {activeFields.has('title') && (
                    <FloatingLabelInput id="title" name="title" label="Job Title" value={cardData.title} onChange={handleTextChange} onRemove={() => removeField('title')} />
                  )}
                  {activeFields.has('company') && (
                     <FloatingLabelInput id="company" name="company" label="Company" value={cardData.company} onChange={handleTextChange} onRemove={() => removeField('company')} />
                  )}
                  
                  {activeFields.has('address') && (
                     <FloatingLabelInput id="address" name="address" label="Address" value={cardData.address || ''} onChange={handleTextChange} onRemove={() => removeField('address')} />
                  )}

                  {/* Phones */}
                  {cardData.phoneNumbers.map((item, index) => (
                    <div key={item.id} className="flex gap-2 items-start">
                      <div className="flex-grow relative">
                         <FloatingLabelInput 
                             id={`phone-${item.id}`}
                             label={index === 0 ? "Phone Number" : `Phone Number ${index + 1}`}
                             value={item.value}
                             onChange={(e) => updateArrayItem('phoneNumbers', item.id, { value: e.target.value })}
                             onRemove={() => removeArrayItem('phoneNumbers', item.id)}
                         />
                      </div>
                      <div className="w-32 flex-shrink-0">
                         <select 
                             value={item.label}
                             onChange={(e) => updateArrayItem('phoneNumbers', item.id, { label: e.target.value })}
                             className="w-full h-[50px] rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 shadow-sm focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:outline-none"
                         >
                             <option value="">Blank</option>
                             <option value="Mobile">Mobile</option>
                             <option value="Personal">Personal</option>
                             <option value="Office">Office</option>
                             <option value="Business">Business</option>
                         </select>
                      </div>
                    </div>
                  ))}
                  
                  {/* Emails */}
                  {cardData.emails.map((item, index) => (
                    <div key={item.id} className="flex gap-2 items-start">
                      <div className="flex-grow relative">
                        <FloatingLabelInput 
                          id={`email-${item.id}`}
                          label={index === 0 ? "Email Address" : `Email Address ${index + 1}`}
                          value={item.value}
                          onChange={(e) => updateArrayItem('emails', item.id, { value: e.target.value })}
                          onRemove={() => removeArrayItem('emails', item.id)}
                        />
                      </div>
                      <div className="w-32 flex-shrink-0">
                         <select 
                             value={item.label}
                             onChange={(e) => updateArrayItem('emails', item.id, { label: e.target.value })}
                             className="w-full h-[50px] rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 shadow-sm focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:outline-none"
                         >
                             <option value="">Blank</option>
                             <option value="Work">Work</option>
                             <option value="Personal">Personal</option>
                             <option value="Office">Office</option>
                             <option value="Business">Business</option>
                         </select>
                      </div>
                    </div>
                  ))}
                  
                  {activeFields.has('website') && <FloatingLabelInput id="website" name="website" label="Website" value={cardData.website || ''} onChange={handleTextChange} onRemove={() => removeField('website')} />}
              </div>

              {/* Group 2: Messaging */}
              {hasMessaging && (
                <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                   <div className="flex items-center gap-2 mb-1 border-b border-gray-100 pb-3">
                      <div className="w-1 h-4 bg-green-500 rounded-full"></div>
                      <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Messaging</h4>
                   </div>
                   {activeFields.has('whatsapp') && <FloatingLabelInput id="whatsapp" name="whatsapp" label="WhatsApp Number" value={cardData.whatsapp || ''} onChange={handleTextChange} onRemove={() => removeField('whatsapp')} />}
                   {activeFields.has('telegram') && <FloatingLabelInput id="telegram" name="telegram" label="Telegram Username/URL" value={cardData.telegram || ''} onChange={handleTextChange} onRemove={() => removeField('telegram')} />}
                   {activeFields.has('discord') && <FloatingLabelInput id="discord" name="discord" label="Discord Server/User" value={cardData.discord || ''} onChange={handleTextChange} onRemove={() => removeField('discord')} />}
                   {activeFields.has('teams') && <FloatingLabelInput id="teams" name="teams" label="Microsoft Teams Link" value={cardData.teams || ''} onChange={handleTextChange} onRemove={() => removeField('teams')} />}
                </div>
              )}
              
              {/* Group 3: Social Profiles */}
              {hasSocial && (
                 <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                   <div className="flex items-center gap-2 mb-1 border-b border-gray-100 pb-3">
                      <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                      <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Social Profiles</h4>
                   </div>
                   {activeFields.has('linkedin') && <FloatingLabelInput id="linkedin" name="linkedin" label="LinkedIn URL" value={cardData.linkedin || ''} onChange={handleTextChange} onRemove={() => removeField('linkedin')} />}
                   {activeFields.has('instagram') && <FloatingLabelInput id="instagram" name="instagram" label="Instagram URL" value={cardData.instagram || ''} onChange={handleTextChange} onRemove={() => removeField('instagram')} />}
                   {activeFields.has('facebook') && <FloatingLabelInput id="facebook" name="facebook" label="Facebook URL" value={cardData.facebook || ''} onChange={handleTextChange} onRemove={() => removeField('facebook')} />}
                   {activeFields.has('twitter') && <FloatingLabelInput id="twitter" name="twitter" label="X / Twitter URL" value={cardData.twitter || ''} onChange={handleTextChange} onRemove={() => removeField('twitter')} />}
                   {activeFields.has('youtube') && <FloatingLabelInput id="youtube" name="youtube" label="YouTube URL" value={cardData.youtube || ''} onChange={handleTextChange} onRemove={() => removeField('youtube')} />}
                   {activeFields.has('tiktok') && <FloatingLabelInput id="tiktok" name="tiktok" label="TikTok URL" value={cardData.tiktok || ''} onChange={handleTextChange} onRemove={() => removeField('tiktok')} />}
                   {activeFields.has('snapchat') && <FloatingLabelInput id="snapchat" name="snapchat" label="Snapchat Username/URL" value={cardData.snapchat || ''} onChange={handleTextChange} onRemove={() => removeField('snapchat')} />}
                   {activeFields.has('github') && <FloatingLabelInput id="github" name="github" label="GitHub URL" value={cardData.github || ''} onChange={handleTextChange} onRemove={() => removeField('github')} />}
                 </div>
              )}
              
              {/* Group 4: Accreditations */}
              {hasAccreditations && (
                 <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                   <div className="flex items-center gap-2 mb-1 border-b border-gray-100 pb-3">
                      <div className="w-1 h-4 bg-amber-500 rounded-full"></div>
                      <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Accreditations</h4>
                   </div>
                   {cardData.accreditations.map((item, index) => (
                       <div key={item.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50/50 relative group">
                           <button 
                              onClick={() => removeAccreditationItem(item.id)}
                              className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 rounded-full"
                              title="Remove Accreditation"
                           >
                              <TrashIcon />
                           </button>
                           <h4 className="text-xs font-bold uppercase text-gray-500 mb-3">Accreditation {index + 1}</h4>
                           <div className="space-y-3">
                              <FloatingLabelInput 
                                  id={`accreditation-label-${item.id}`}
                                  label="Name / Title"
                                  value={item.label}
                                  onChange={(e) => updateAccreditationItem(item.id, { label: e.target.value })}
                              />
                              <FloatingLabelInput 
                                  id={`accreditation-url-${item.id}`}
                                  label="Link URL (Optional)"
                                  value={item.url}
                                  onChange={(e) => updateAccreditationItem(item.id, { url: e.target.value })}
                              />
                           </div>
                       </div>
                   ))}
                 </div>
              )}

            </div>
            
            <hr className="border-gray-100" />

            {/* Add Field Menu */}
            <div className="space-y-6">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Add to Card</h3>
                
                {/* Personal Grid */}
                <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase">Personal</h4>
                    <div className="grid grid-cols-3 gap-3">
                        <OptionButton fieldKey="title" label="Job Title" icon={<BriefcaseIcon />} />
                        <OptionButton fieldKey="company" label="Company" icon={<BuildingIcon />} />
                        <OptionButton fieldKey="accreditations" label="Accreditations" icon={<AwardIcon />} isArrayType={true} />
                    </div>
                </div>

                {/* General Grid */}
                <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase">General</h4>
                    <div className="grid grid-cols-3 gap-3">
                        <OptionButton fieldKey="address" label="Address" icon={<MapPinIcon />} />
                        <OptionButton fieldKey="phoneNumbers" label="Phone" icon={<PhoneIcon />} isArrayType={true} />
                        <OptionButton fieldKey="emails" label="Email" icon={<EmailIcon />} isArrayType={true} />
                        <OptionButton fieldKey="website" label="Website" icon={<WebsiteIcon />} />
                    </div>
                </div>

                {/* Social Grid */}
                <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase">Social</h4>
                    <div className="grid grid-cols-3 gap-3">
                        <OptionButton fieldKey="linkedin" label="LinkedIn" icon={<LinkedinIcon />} />
                        <OptionButton fieldKey="instagram" label="Instagram" icon={<InstagramIcon />} />
                        <OptionButton fieldKey="facebook" label="Facebook" icon={<FacebookIcon />} />
                        <OptionButton fieldKey="twitter" label="X" icon={<TwitterIcon />} />
                        <OptionButton fieldKey="youtube" label="YouTube" icon={<YouTubeIcon />} />
                        <OptionButton fieldKey="tiktok" label="TikTok" icon={<TikTokIcon />} />
                        <OptionButton fieldKey="snapchat" label="Snapchat" icon={<SnapchatIcon />} />
                        <OptionButton fieldKey="github" label="GitHub" icon={<GithubIcon />} />
                    </div>
                </div>
                
                {/* Messaging Grid */}
                 <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase">Messaging</h4>
                    <div className="grid grid-cols-3 gap-3">
                        <OptionButton fieldKey="whatsapp" label="WhatsApp" icon={<WhatsAppIcon />} />
                        <OptionButton fieldKey="telegram" label="Telegram" icon={<TelegramIcon />} />
                        <OptionButton fieldKey="discord" label="Discord" icon={<DiscordIcon />} />
                        <OptionButton fieldKey="teams" label="Teams" icon={<TeamsIcon />} />
                    </div>
                </div>

            </div>
          </div>
        )}

        {/* --- DESIGN TAB --- */}
        {activeTab === 'design' && (
          <div className="space-y-8 animate-fadeIn">
              <div className="grid grid-cols-1 gap-8">
                
                {/* Branding & Profile (New Section) */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Branding & Profile</h3>
                    
                    <div className="flex gap-4">
                      <ImageUploader
                          id="profile-picture"
                          label="Profile Photo"
                          currentImage={cardData.profilePicture}
                          onImageUpload={(data) => handleImageUpload('profilePicture', data)}
                          onRemove={() => handleImageUpload('profilePicture', null)}
                          className="w-32 h-32 aspect-square"
                      />

                      <ImageUploader
                          id="logo"
                          label="Company Logo"
                          currentImage={cardData.logo}
                          onImageUpload={(data) => handleImageUpload('logo', data)}
                          onRemove={() => handleImageUpload('logo', null)}
                          className="w-32 h-32 aspect-square"
                          variant="compact"
                      />
                    </div>
                </div>

                <hr className="border-gray-100" />
                
                {/* Header Background Control */}
                <div className="space-y-3">
                    <span className="block text-sm font-semibold text-gray-900">Header Background</span>
                    
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                        <div className="flex border-b border-gray-100">
                            <button
                                type="button"
                                onClick={() => handleCardBackgroundTypeChange('color')}
                                className={`flex-1 py-3 text-sm font-medium text-center transition-all duration-200 relative ${
                                    cardData.cardBackgroundType === 'color' 
                                    ? 'text-indigo-600 bg-indigo-50/30' 
                                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                                }`}
                            >
                                Solid Color
                                {cardData.cardBackgroundType === 'color' && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600"></span>
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() => handleCardBackgroundTypeChange('image')}
                                className={`flex-1 py-3 text-sm font-medium text-center transition-all duration-200 relative ${
                                    cardData.cardBackgroundType === 'image' 
                                    ? 'text-indigo-600 bg-indigo-50/30' 
                                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                                }`}
                            >
                                Custom Image
                                {cardData.cardBackgroundType === 'image' && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600"></span>
                                )}
                            </button>
                        </div>

                        <div className="p-5">
                            {cardData.cardBackgroundType === 'color' ? (
                                <div className="animate-fadeIn">
                                    <span className="block text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">Select Color</span>
                                    <ColorSelector
                                        colors={BACKGROUND_COLORS}
                                        selectedColor={cardData.cardBackgroundColor}
                                        onSelect={(color) => setCardData(prev => ({ ...prev, cardBackgroundColor: color }))}
                                    />
                                </div>
                            ) : (
                                <div className="animate-fadeIn">
                                    <ImageUploader
                                        id="background-image"
                                        label="Upload Image"
                                        currentImage={cardData.cardBackgroundImage}
                                        onImageUpload={(data) => handleImageUpload('cardBackgroundImage', data)}
                                        onRemove={() => handleImageUpload('cardBackgroundImage', null)}
                                        isLarge={false}
                                        className="h-40"
                                        variant="compact"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* Layout / Alignment Control */}
                <div>
                    <span className="block text-sm font-semibold text-gray-900 mb-3">Profile Layout</span>
                    <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50/50 p-1 shadow-sm">
                        <button
                            onClick={() => handleAlignmentChange('left')}
                            className={`p-2.5 rounded-md transition-all duration-200 ${cardData.profileAlignment === 'left' ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
                            aria-label="Align Left"
                        >
                            <AlignLeftIcon />
                        </button>
                        <button
                            onClick={() => handleAlignmentChange('center')}
                            className={`p-2.5 rounded-md transition-all duration-200 ${cardData.profileAlignment === 'center' ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
                            aria-label="Align Center"
                        >
                            <AlignCenterIcon />
                        </button>
                        <button
                            onClick={() => handleAlignmentChange('right')}
                            className={`p-2.5 rounded-md transition-all duration-200 ${cardData.profileAlignment === 'right' ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
                            aria-label="Align Right"
                        >
                            <AlignRightIcon />
                        </button>
                    </div>
                </div>
                
                {/* Icon Styling (New) */}
                <div className="space-y-3">
                   <span className="block text-sm font-semibold text-gray-900">Icon Colors</span>
                   <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                        <div className="flex border-b border-gray-100">
                            <button
                                type="button"
                                onClick={() => handleIconStyleChange('original')}
                                className={`flex-1 py-3 text-sm font-medium text-center transition-all duration-200 relative ${
                                    cardData.iconStyle === 'original' 
                                    ? 'text-indigo-600 bg-indigo-50/30' 
                                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                                }`}
                            >
                                Original Colors
                                {cardData.iconStyle === 'original' && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600"></span>
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() => handleIconStyleChange('custom')}
                                className={`flex-1 py-3 text-sm font-medium text-center transition-all duration-200 relative ${
                                    cardData.iconStyle === 'custom' 
                                    ? 'text-indigo-600 bg-indigo-50/30' 
                                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                                }`}
                            >
                                Custom Color
                                {cardData.iconStyle === 'custom' && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600"></span>
                                )}
                            </button>
                        </div>
                        {cardData.iconStyle === 'custom' && (
                            <div className="p-5 animate-fadeIn">
                                <ColorSelector
                                    colors={BUTTON_COLORS}
                                    selectedColor={cardData.iconColor}
                                    onSelect={(color) => setCardData(prev => ({ ...prev, iconColor: color }))}
                                />
                            </div>
                        )}
                   </div>
                </div>

                {/* Button Color */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                       <span className="text-sm font-semibold text-gray-900">Button Color</span>
                    </div>
                    <ColorSelector
                        colors={BUTTON_COLORS}
                        selectedColor={cardData.buttonColor}
                        onSelect={(color) => setCardData(prev => ({ ...prev, buttonColor: color }))}
                    />
                </div>

                {/* Page Background Color */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                       <span className="text-sm font-semibold text-gray-900">Page Background</span>
                       <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Content Area</span>
                    </div>
                    <ColorSelector
                        colors={PAGE_COLORS}
                        selectedColor={cardData.themeColor}
                        onSelect={(color) => setCardData(prev => ({ ...prev, themeColor: color }))}
                    />
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomizationForm;