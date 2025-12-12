
export type MarketOption = 'BIST' | 'VIOP' | 'FOREIGN' | 'CRYPTO';

export interface Broker {
  id: string;
  name: string;
  description: string; // Brief description of strengths/USP
  logoUrl: string;
  type: 'Bank' | 'Brokerage' | 'CryptoExchange';
  supportedMarkets: MarketOption[]; // New field to control visibility in tabs
  
  // BIST Data
  bistCommission?: number; // percentage (e.g. 0.002 for 0.2%)
  minBistCommission?: number; // TL (Deprecated for display, kept for calc logic if needed)
  viopCommission?: number; // percentage (e.g. 0.0002 for 0.02% - onbinde 2)
  
  // Foreign Data
  foreignCommission?: number; // fixed USD usually, or percentage
  foreignMin?: number; // Minimum USD
  
  // Crypto Data
  cryptoMaker?: number; // percentage
  cryptoTaker?: number; // percentage
  
  // Common
  accountFee?: string;
  pros: string[];
  url: string;
  appScore: number; // New field: 1.0 to 5.0
}

export interface Author {
  name: string;
  avatar: string;
  role: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  imageUrl: string;
  readTime: string;
  author: Author;
}

export interface BlogPostExtended extends BlogPost {
  content: string;
}

export interface CalculationResult {
  broker: Broker;
  estimatedCost: number;
}
