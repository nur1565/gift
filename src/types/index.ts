export interface ShayariItem {
  id: number;
  title: string;
  lines: string[];
  emoji: string;
  theme: string;
  note?: string;
}

export interface MemoryItem {
  id: string;
  title: string;
  caption: string;
  date: string;
  location: string;
  imageUrl: string;
  rotationClass: string;
}

export interface HiddenMessageItem {
  id: string;
  envelopeTitle: string;
  icon: string;
  stampEmoji: string;
  greeting: string;
  body: string[];
  signoff: string;
}
