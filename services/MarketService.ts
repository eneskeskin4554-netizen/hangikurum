
export type MarketType = 'BIST 100' | 'USD/TRY' | 'ALTIN' | 'BITCOIN' | 'EUR/TRY' | 'ETHEREUM' | 'NASDAQ' | 'BRENT';

export interface TickerItem {
  symbol: string;
  price: number;
  change: number; // Percentage change
  type: 'index' | 'currency' | 'commodity' | 'crypto';
}

type Listener = (data: TickerItem[]) => void;

class MarketService {
  private listeners: Listener[] = [];
  private items: TickerItem[] = [];
  private intervalId: any = null;

  constructor() {
    // Initial Base Data
    this.items = [
      { symbol: 'BIST 100', price: 9254.50, change: 1.25, type: 'index' },
      { symbol: 'USD/TRY', price: 34.4520, change: 0.12, type: 'currency' },
      { symbol: 'EUR/TRY', price: 37.8540, change: -0.05, type: 'currency' },
      { symbol: 'ALTIN', price: 2950.00, change: 0.85, type: 'commodity' }, // Changed symbol name to match chart key
      { symbol: 'BITCOIN', price: 96540.00, change: 2.10, type: 'crypto' },
      { symbol: 'ETHEREUM', price: 3450.00, change: -0.45, type: 'crypto' },
      { symbol: 'NASDAQ', price: 20140.00, change: 0.90, type: 'index' },
      { symbol: 'BRENT', price: 74.40, change: -1.20, type: 'commodity' },
    ];
  }

  // Simulate WebSocket Connection
  connect() {
    if (this.intervalId) return;

    console.log("🔌 Market WebSocket Connected");
    
    // Simulate high-frequency updates (every 800ms)
    this.intervalId = setInterval(() => {
      this.updateMarketData();
      this.notifyListeners();
    }, 800);
  }

  disconnect() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log("🔌 Market WebSocket Disconnected");
    }
  }

  subscribe(listener: Listener) {
    this.listeners.push(listener);
    // Send immediate data upon subscription
    listener(this.items);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private updateMarketData() {
    this.items = this.items.map(item => {
      // Different volatility for different assets
      let volatility = 0.0001; // Low (Fiat)
      if (item.type === 'crypto') volatility = 0.0008; // High
      if (item.type === 'index') volatility = 0.0003; // Medium

      const direction = Math.random() > 0.48 ? 1 : -1; // Slight upward bias
      const movePercent = Math.random() * volatility * direction;
      
      const newPrice = item.price * (1 + movePercent);
      const newChange = item.change + (movePercent * 100);

      return {
        ...item,
        price: newPrice,
        change: newChange
      };
    });
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener([...this.items]));
  }

  // Helper to get historical data for charts
  getHistory(symbol: string): { date: string, fullDate: string, value: number }[] {
    const currentItem = this.items.find(i => i.symbol === symbol) || this.items[0];
    const points = [];
    const now = new Date();
    
    let price = currentItem.price;
    // Work backwards from current price
    for (let i = 0; i < 30; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        
        points.unshift({
            date: date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' }),
            fullDate: date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
            value: price
        });

        // Reverse simulate previous days
        const volatility = symbol === 'BITCOIN' ? 0.03 : 0.01;
        const direction = Math.random() > 0.5 ? 1 : -1;
        price = price * (1 - (Math.random() * volatility * direction));
    }
    return points;
  }
}

export const marketService = new MarketService();
