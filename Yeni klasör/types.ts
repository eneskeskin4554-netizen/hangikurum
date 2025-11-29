
import React from 'react';

export enum FeeType {
  FIXED = 'Sabit',
  TIERED = 'Kademeli',
  FREE = 'Ücretsiz'
}

export interface Broker {
  id: string;
  name: string;
  logoColor: string;
  icon?: React.ElementType; // Icon component type
  logoUrl?: string;
  commissionRate: {
    share: number; // In ten thousandths (onbinde)
    viop: number;  // In ten thousandths (onbinde)
  };
  minCommission: number; // TL
  accountFee: string;
  liveData: FeeType;
  mobileAppScore: number;
  features: string[];
  description: string;
  volumeRequirement?: string;
  accountOpenUrl?: string;
  tags?: string[];
}

export interface InternationalBroker {
  id: string;
  name: string;
  logoColor: string;
  icon?: React.ElementType;
  logoUrl?: string;
  commissionRate: string; // Text string like "1.5 USD" or "Onbinde 20"
  minCommission: string; // Text like "1 USD" or "Yok"
  custodyFee: string; // Saklama ücreti
  mobileAppScore: number;
  features: string[];
  description: string;
  accountOpenUrl?: string;
  tags?: string[];
}

export interface CryptoExchange {
  id: string;
  name: string;
  logoColor: string;
  icon?: React.ElementType;
  logoUrl?: string;
  commissionRate: {
    maker: string; // e.g. "%0.10"
    taker: string; // e.g. "%0.10"
  };
  coinCount: number;
  mobileAppScore: number;
  features: string[];
  description: string;
  accountOpenUrl?: string;
  tags?: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface ComparisonMetric {
  name: string;
  commission: number;
  score: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  watchlist: string[];
}