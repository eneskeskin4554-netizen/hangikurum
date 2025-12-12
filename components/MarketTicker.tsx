
import React, { useEffect, useState } from 'react';

interface TickerData {
  symbol: string;
  price: number;
  change: number;
  isCrypto: boolean;
}

// Fallback data updated to reflect approximate current 2025 market projections for robustness
const FALLBACK_DATA: TickerData[] = [
  { symbol: 'USD/TRY', price: 37.80, change: 0.15, isCrypto: false },
  { symbol: 'EUR/TRY', price: 39.50, change: -0.05, isCrypto: false },
  { symbol: 'BTC', price: 102500.00, change: 1.5, isCrypto: true },
  { symbol: 'ETH', price: 3150.00, change: -0.8, isCrypto: true },
  { symbol: 'SOL', price: 165.00, change: 2.1, isCrypto: true },
  { symbol: 'AVAX', price: 42.40, change: 1.2, isCrypto: true },
];

const MarketTicker: React.FC = () => {
  const [items, setItems] = useState<TickerData[]>([]);
  const [loading, setLoading] = useState(true);

  const formatPrice = (price: number, isCrypto: boolean) => {
    if (isCrypto && price > 1000) return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
    if (isCrypto) return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(price);
    // Fiat shows 4 digits for precision
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', minimumFractionDigits: 4 }).format(price);
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        // CryptoCompare allows fetching Multi-Price data including Fiat currencies in a single call.
        // fsyms: From Symbols (Assets)
        // tsyms: To Symbols (Currencies we want the price in)
        // We get USD/TRY and EUR/TRY by asking for USD and EUR prices in TRY.
        // We get Crypto prices in USD.
        const response = await fetch(
          'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=USD,EUR,BTC,ETH,SOL,AVAX&tsyms=TRY,USD'
        );

        if (!response.ok) throw new Error("Market data fetch failed");

        const json = await response.json();
        const raw = json.RAW;

        if (!raw) throw new Error("Invalid data format");

        const newItems: TickerData[] = [
          {
            symbol: 'USD/TRY',
            price: raw.USD.TRY.PRICE,
            change: raw.USD.TRY.CHANGEPCT24HOUR,
            isCrypto: false
          },
          {
            symbol: 'EUR/TRY',
            price: raw.EUR.TRY.PRICE,
            change: raw.EUR.TRY.CHANGEPCT24HOUR,
            isCrypto: false
          },
          {
            symbol: 'BTC',
            price: raw.BTC.USD.PRICE,
            change: raw.BTC.USD.CHANGEPCT24HOUR,
            isCrypto: true
          },
          {
            symbol: 'ETH',
            price: raw.ETH.USD.PRICE,
            change: raw.ETH.USD.CHANGEPCT24HOUR,
            isCrypto: true
          },
          {
            symbol: 'SOL',
            price: raw.SOL.USD.PRICE,
            change: raw.SOL.USD.CHANGEPCT24HOUR,
            isCrypto: true
          },
          {
            symbol: 'AVAX',
            price: raw.AVAX.USD.PRICE,
            change: raw.AVAX.USD.CHANGEPCT24HOUR,
            isCrypto: true
          }
        ];

        if (isMounted) {
          setItems(newItems);
          setLoading(false);
        }
      } catch (error) {
        console.warn("Live market data unavailable, using fallback.", error);
        if (isMounted) {
           // Always fallback to keep the ticker alive without errors
           setItems(FALLBACK_DATA);
           setLoading(false);
        }
      }
    };

    fetchData();
    
    // Poll every 15 seconds (Optimized for production to avoid rate limits on free API)
    const interval = setInterval(fetchData, 15000); 
    
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  if (loading) return <div className="h-[50px] bg-[#0a0a0a] border-b border-white/5" />;

  return (
    <div className="w-full bg-[#0a0a0a] border-b border-white/5 overflow-hidden py-3 relative z-40 h-[50px] flex items-center">
      <div className="flex animate-marquee hover:[animation-play-state:paused] w-max gap-8 md:gap-16 px-4">
        {/* Duplicate list multiple times for seamless infinite loop */}
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <div key={`${item.symbol}-${index}`} className="flex items-center gap-2 group cursor-default select-none">
            <span className="text-xs font-bold text-gray-500 group-hover:text-white transition-colors uppercase tracking-wider">
              {item.symbol}
            </span>
            <span className="text-sm font-display font-medium text-white tabular-nums">
              {formatPrice(item.price, item.isCrypto)}
            </span>
            <span className={`text-xs font-bold px-1.5 py-0.5 rounded flex items-center ${
              item.change >= 0 
                ? 'text-primary bg-primary/10' 
                : 'text-red-400 bg-red-400/10'
            }`}>
              {item.change >= 0 ? '↑' : '↓'} %{Math.abs(item.change).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      
      {/* Fade Gradients for Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
    </div>
  );
};

export default MarketTicker;
