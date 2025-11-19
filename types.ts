

export interface ContactItem {
  id: string;
  value: string;
  label: string;
}

export interface AccreditationItem {
  id: string;
  label: string;
  url: string;
}

export interface CardData {
  profilePicture: string | null;
  logo: string | null;
  name: string;
  title: string;
  company: string;
  address?: string;
  emails: ContactItem[];
  phoneNumbers: ContactItem[];
  accreditations: AccreditationItem[]; // Added accreditations
  cardBackgroundType: 'color' | 'image';
  cardBackgroundColor: string;
  cardBackgroundImage: string | null;
  themeColor: string;
  buttonColor: string;
  iconStyle: 'original' | 'custom';
  iconColor: string;
  textColor: 'light' | 'dark';
  profileAlignment: 'left' | 'center' | 'right';
  linkedin?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  whatsapp?: string;
  youtube?: string;
  tiktok?: string;
  snapchat?: string;
  telegram?: string;
  discord?: string;
  teams?: string;
  github?: string;
}
