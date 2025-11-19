import type { CardData } from './types';

// Soft pastel palette for Page Backgrounds (Content Sheet)
export const PAGE_COLORS: string[] = [
  '#FFFFFF', // White
  '#F9FAFB', // Cool Gray (Mist)
  '#EFF6FF', // Soft Blue
  '#F0FDF4', // Soft Green
  '#FEFCE8', // Soft Yellow
  '#FFF7ED', // Soft Orange
  '#FDF2F8', // Soft Pink
  '#FAF5FF', // Soft Purple
];

// Expanded palette for Header Backgrounds
export const BACKGROUND_COLORS: string[] = [
  '#FFFFFF', // White
  '#F3F4F6', // Light Gray
  '#111827', // Dark Navy
  '#374151', // Gray
  '#059669', // Emerald
  '#7C3AED', // Violet
  '#2563EB', // Blue
  '#E11D48', // Rose
];

// Palette for Buttons
export const BUTTON_COLORS: string[] = [
  '#111827', // Black
  '#2563EB', // Blue
  '#7C3AED', // Violet
  '#DB2777', // Pink
  '#E11D48', // Rose
  '#EA580C', // Orange
  '#059669', // Emerald
  '#4B5563', // Gray
];

export const INITIAL_CARD_DATA: CardData = {
  profilePicture: `https://picsum.photos/seed/muradtap-profile/200`,
  logo: `https://picsum.photos/seed/muradtap-logo/100`,
  name: 'Alex Smith',
  title: 'Marketing Manager',
  company: 'Muradtap',
  address: 'San Francisco, CA',
  emails: [{ id: 'default-email', value: 'alex.smith@muradtap.me', label: 'Work' }],
  phoneNumbers: [{ id: 'default-phone', value: '+1 415 555 0123', label: 'Mobile' }],
  accreditations: [], // Initialize empty
  cardBackgroundType: 'color',
  cardBackgroundColor: '#111827',
  cardBackgroundImage: null,
  themeColor: '#FFFFFF', // Default to White for the page background
  buttonColor: '#111827', // Default Button Color (Black)
  iconStyle: 'original', // Default to original brand colors
  iconColor: '#111827', // Default custom icon color
  textColor: 'light',
  profileAlignment: 'left',
  linkedin: 'https://linkedin.com/in/alexsmith',
  website: 'https://muradtap.me',
  instagram: 'https://instagram.com/muradtap',
  facebook: '',
  twitter: '',
  whatsapp: '',
  youtube: '',
  tiktok: '',
  snapchat: '',
  telegram: '',
  discord: '',
  teams: '',
  github: '',
};