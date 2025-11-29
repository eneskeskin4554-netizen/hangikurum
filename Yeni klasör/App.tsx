
import React, { useState, useEffect } from 'react';
import { BROKERS, INTERNATIONAL_BROKERS, CRYPTO_EXCHANGES, ICONS, LAST_UPDATED } from './constants';
import BrokerTable from './components/BrokerTable';
import BrokerCard from './components/BrokerCard';
import AIAdvisor from './components/AIAdvisor';
import StatsChart from './components/StatsChart';
import BrokerDetailModal from './components/BrokerDetailModal';
import CommissionCalculator from './components/CommissionCalculator';
import ContactModal from './components/ContactModal';
import UpdateNotification from './components/UpdateNotification';
import LegalModal, { LegalDocType } from './components/LegalModal';
import { initializeChat } from './services/geminiService';
import { Broker, InternationalBroker, CryptoExchange } from './types';
import { Search, Filter, ArrowUpDown, Globe, Building2, Mail, Sparkles, TrendingUp, Bitcoin, CalendarCheck } from 'lucide-react';

type ViewState = 'home' | 'calculator';
type MarketType = 'bist' | 'global' | 'crypto';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<'commissionRate' | 'mobileAppScore'>('commissionRate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // App State
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [marketType, setMarketType] = useState<MarketType>('bist');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocType>(null);

  // Modal State
  const [selectedBroker, setSelectedBroker] = useState<Broker | InternationalBroker | CryptoExchange | null>(null);

  useEffect(() => {
    initializeChat(BROKERS);
  }, []);

  // Determine which list to show
  const activeList: (Broker | InternationalBroker | CryptoExchange)[] = 
    marketType === 'bist' ? BROKERS : 
    marketType === 'global' ? INTERNATIONAL_BROKERS : 
    CRYPTO_EXCHANGES;

  // Filter logic with Turkish Locale Support
  const filteredBrokers = activeList
    .filter(b => {
      const searchLower = searchTerm.toLocaleLowerCase('tr');
      
      const nameMatch = b.name.toLocaleLowerCase('tr').includes(searchLower);
      const featureMatch = b.features.some(f => f.toLocaleLowerCase('tr').includes(searchLower));
      const tagMatch = b.tags ? b.tags.some(t => t.toLocaleLowerCase('tr').includes(searchLower)) : false;
      
      return nameMatch || featureMatch || tagMatch;
    })
    .sort((a, b) => {
      const modifier = sortOrder === 'asc' ? 1 : -1;
      
      let valA: any;
      let valB: any;

      if (sortKey === 'commissionRate') {
         if (marketType === 'bist') {
            valA = (a as Broker).commissionRate.share;
            valB = (b as Broker).commissionRate.share;
         } else if (marketType === 'crypto') {
            // Sort by Maker fee string (simple parse)
            valA = parseFloat((a as CryptoExchange).commissionRate.maker.replace(/[^0-9.]/g, '')) || 0;
            valB = parseFloat((b as CryptoExchange).commissionRate.maker.replace(/[^0-9.]/g, '')) || 0;
         } else {
             // Crude approximation for sorting strings like "1.5 USD" vs "20 USD"
             valA = parseFloat((a as InternationalBroker).commissionRate.replace(/[^0-9.]/g, '')) || 0;
             valB = parseFloat((b as InternationalBroker).commissionRate.replace(/[^0-9.]/g, '')) || 0;
         }
      } else {
         valA = a[sortKey];
         valB = b[sortKey];
      }

      if (valA < valB) return -1 * modifier;
      if (valA > valB) return 1 * modifier;
      return 0;
    });

  const toggleSort = (key: 'commissionRate' | 'mobileAppScore') => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const renderContent = () => {
    if (currentView === 'calculator') {
      return <CommissionCalculator brokers={BROKERS} />;
    }

    return (
      <div className="animate-fade-in">
        {/* Hero Section */}
        <div className="bg-dot-pattern border-b border-slate-200/60 pt-16 pb-12 relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight animate-fade-in delay-200">
                  Hangi Kurum <br/>
                  <span className="text-gradient">Daha Avantajlı?</span>
                </h1>
                <p className="text-slate-600 text-lg mb-8 max-w-lg leading-relaxed animate-fade-in delay-300">
                  Komisyon oranları, gizli masraflar ve kullanıcı deneyimini karşılaştırın. Kurumunu seç, yatırımına değer kat.
                </p>
                
                {/* Search Bar */}
                <div className="relative max-w-md mb-8 group animate-fade-in delay-300">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-11 pr-4 py-4 border border-slate-200 rounded-2xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all shadow-lg shadow-slate-100"
                    placeholder="Kurum adı veya özellik ara (örn: halka arz)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Simple Stats Visualization */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white shadow-xl shadow-slate-200/50 hidden md:block animate-fade-in-up delay-200">
                 {marketType === 'bist' ? (
                   <>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg">Piyasa Analizi</h3>
                        <p className="text-slate-500 text-xs">En uygun hisse komisyon oranları</p>
                      </div>
                      <span className="text-xs px-2.5 py-1 bg-green-100 text-green-700 rounded-lg font-bold border border-green-200">BIST</span>
                    </div>
                    <StatsChart brokers={BROKERS} />
                   </>
                 ) : marketType === 'crypto' ? (
                   <div className="h-72 flex flex-col items-center justify-center text-center text-slate-400">
                      <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mb-6">
                        <Bitcoin size={40} className="text-yellow-500 opacity-80" />
                      </div>
                      <p className="text-lg font-bold text-slate-700">Kripto Borsaları</p>
                      <p className="text-sm max-w-xs mt-2 text-slate-500">Kripto borsalarında komisyonlar Maker (Piyasa Yapıcı) ve Taker (Piyasa Alıcı) olarak ayrılır. Hacim arttıkça oranlar düşer.</p>
                   </div>
                 ) : (
                   <div className="h-72 flex flex-col items-center justify-center text-center text-slate-400">
                      <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                        <Globe size={40} className="text-blue-500 opacity-80" />
                      </div>
                      <p className="text-lg font-bold text-slate-700">Global Piyasalar</p>
                      <p className="text-sm max-w-xs mt-2 text-slate-500">Yurtdışı piyasalarda komisyonlar genellikle işlem başına sabit ücret (USD/EUR) olarak belirlenir.</p>
                   </div>
                 )}
              </div>
            </div>
            
            {/* Tabs */}
            <div className="mt-12 flex flex-wrap gap-8 border-b border-slate-200">
              <button
                onClick={() => setMarketType('bist')}
                className={`pb-4 px-2 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
                  marketType === 'bist' 
                    ? 'border-blue-600 text-blue-600 translate-y-[1px]' 
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                }`}
              >
                <Building2 size={18} />
                Borsa İstanbul (BIST)
              </button>
              <button
                onClick={() => setMarketType('global')}
                className={`pb-4 px-2 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
                  marketType === 'global' 
                    ? 'border-blue-600 text-blue-600 translate-y-[1px]' 
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                }`}
              >
                <Globe size={18} />
                Yurtdışı Piyasalar
              </button>
              <button
                onClick={() => setMarketType('crypto')}
                className={`pb-4 px-2 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
                  marketType === 'crypto' 
                    ? 'border-yellow-500 text-yellow-600 translate-y-[1px]' 
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                }`}
              >
                <Bitcoin size={18} />
                Kripto Varlıklar
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Filters & Sorting */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
              <Filter size={16} className="text-slate-400" />
              <span>{filteredBrokers.length} kurum listeleniyor</span>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => toggleSort('commissionRate')}
                className={`px-4 py-2 text-sm rounded-xl border flex items-center gap-2 transition-all ${
                  sortKey === 'commissionRate' ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Komisyon <ArrowUpDown size={14} />
              </button>
              <button 
                onClick={() => toggleSort('mobileAppScore')}
                className={`px-4 py-2 text-sm rounded-xl border flex items-center gap-2 transition-all ${
                  sortKey === 'mobileAppScore' ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Puan <ArrowUpDown size={14} />
              </button>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block">
            <BrokerTable 
              brokers={filteredBrokers} 
              onViewDetail={setSelectedBroker}
              marketType={marketType}
            />
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden">
            {filteredBrokers.map(broker => (
              <BrokerCard 
                key={broker.id} 
                broker={broker} 
                onViewDetail={setSelectedBroker}
                marketType={marketType}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredBrokers.length === 0 && (
            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-300">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Search size={24} className="text-slate-300" />
              </div>
              <p className="text-slate-500 font-medium">Aramanızla eşleşen kurum bulunamadı.</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-4 text-blue-600 font-bold hover:underline"
              >
                Filtreleri Temizle
              </button>
            </div>
          )}
        </main>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      <UpdateNotification />
      <BrokerDetailModal 
        broker={selectedBroker} 
        onClose={() => setSelectedBroker(null)} 
      />
      
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <LegalModal 
        type={activeLegalDoc}
        onClose={() => setActiveLegalDoc(null)}
      />

      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-18 py-4">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setCurrentView('home')}>
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
                <ICONS.TrendingUp size={20} />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">Hangi<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Kurum</span></span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
                <button 
                  onClick={() => setCurrentView('home')} 
                  className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition-all ${currentView === 'home' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <span className="hidden sm:inline">Karşılaştırma</span>
                  <span className="sm:hidden">Ana Sayfa</span>
                </button>
                <button 
                  onClick={() => setCurrentView('calculator')} 
                  className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition-all ${currentView === 'calculator' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Hesapla
                </button>
                <button 
                  onClick={() => setIsContactModalOpen(true)} 
                  className="px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold text-slate-500 hover:text-slate-700 hover:bg-white/50 transition-all hidden sm:block"
                >
                  İletişim
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-grow">
        {renderContent()}
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 mt-auto border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-600 p-2 rounded-xl text-white">
                   <TrendingUp size={20} />
                </div>
                <span className="font-bold text-2xl tracking-tight text-white">Hangi<span className="text-blue-400">Kurum</span></span>
              </div>
              <p className="text-slate-400 text-sm max-w-sm leading-relaxed mb-6">
                Türkiye'nin en kapsamlı aracı kurum karşılaştırma platformu. Komisyon oranları, masraflar ve avantajları şeffaflıkla sunuyoruz.
              </p>
              <div className="flex gap-4">
                 {/* Social icons placeholder */}
                 <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                    <Globe size={16} />
                 </div>
                 <button 
                   onClick={() => setIsContactModalOpen(true)}
                   className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer"
                 >
                    <Mail size={16} />
                 </button>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-white mb-6">Platform</h3>
              <ul className="space-y-4 text-sm">
                <li><button onClick={() => setCurrentView('home')} className="hover:text-white transition-colors">Aracı Kurumlar</button></li>
                <li><button onClick={() => { setCurrentView('home'); setMarketType('global'); }} className="hover:text-white transition-colors">Yurtdışı Piyasalar</button></li>
                <li><button onClick={() => { setCurrentView('home'); setMarketType('crypto'); }} className="hover:text-white transition-colors">Kripto Varlıklar</button></li>
                <li><button onClick={() => setCurrentView('calculator')} className="hover:text-white transition-colors">Komisyon Hesapla</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-white mb-6">İletişim</h3>
              <div className="flex flex-col gap-4">
                 <button 
                   onClick={() => setIsContactModalOpen(true)}
                   className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group text-left"
                 >
                    <Mail size={18} className="group-hover:text-blue-400" />
                    <span className="text-sm">info@hangikurum.com</span>
                 </button>
                 <div className="text-xs text-slate-500 mt-4 flex items-center gap-2">
                   <CalendarCheck size={14} className="text-green-500" />
                   Son Güncelleme: {LAST_UPDATED}
                 </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} HangiKurum. Tüm hakları saklıdır.</p>
            <div className="flex gap-6">
              <button onClick={() => setActiveLegalDoc('terms')} className="hover:text-white cursor-pointer transition-colors">Kullanım Koşulları</button>
              <button onClick={() => setActiveLegalDoc('privacy')} className="hover:text-white cursor-pointer transition-colors">Gizlilik Politikası</button>
              <button onClick={() => setActiveLegalDoc('cookies')} className="hover:text-white cursor-pointer transition-colors">Çerez Politikası</button>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Chat Bot */}
      <AIAdvisor />
    </div>
  );
};

export default App;
