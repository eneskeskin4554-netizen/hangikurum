
import React, { useState } from 'react';
import { BROKERS } from '../constants';
import { Broker } from '../types';

type TabType = 'BIST' | 'VIOP' | 'FOREIGN' | 'CRYPTO';

const BrokerLogo: React.FC<{ url: string; name: string; rank: number }> = ({ url, name, rank }) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  return (
    <div className="relative group/logo">
      {/* Rank Badge - Simplified */}
      <div className={`absolute -top-3 -left-3 z-20 w-6 h-6 md:w-8 md:h-8 rounded-lg flex items-center justify-center text-[10px] md:text-xs font-bold border border-white/5 shadow-sm ${
        rank === 1 ? 'bg-[#1a1a1a] text-primary border-primary/30' : 
        'bg-[#1a1a1a] text-gray-500'
      }`}>
        #{rank}
      </div>
      
      <div className="w-14 h-14 md:w-20 md:h-20 rounded-xl bg-white p-2 md:p-3 flex items-center justify-center border border-white/5 overflow-hidden relative">
        {status === 'loading' && <div className="absolute inset-0 bg-gray-100" />}
        {status === 'error' && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 text-gray-400 font-bold text-xl">
            {name.charAt(0)}
          </div>
        )}
        <img 
          src={url} 
          alt={name} 
          loading="lazy"
          className={`w-full h-full object-contain transition-all duration-500 ${status === 'loaded' ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
        />
      </div>
    </div>
  );
};

const RateDisplay: React.FC<{ label: string; value: React.ReactNode; subtext?: string; highlighted?: boolean }> = ({ label, value, subtext, highlighted }) => (
  <div className={`flex flex-col items-start md:items-end px-2 md:px-4 py-1 md:py-2 rounded-lg transition-colors`}>
    <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-gray-600 font-bold mb-0.5 md:mb-1">{label}</span>
    <div className={`text-lg md:text-2xl font-display font-medium tracking-tight flex items-baseline gap-1 ${highlighted ? 'text-primary' : 'text-gray-200'}`}>
      {value}
    </div>
    {subtext && <span className="text-[9px] md:text-[10px] text-gray-500 font-medium mt-0.5">{subtext}</span>}
  </div>
);

// Helper to determine tag style based on content keyword
const getTagStyle = (text: string) => {
  const lower = text.toLowerCase();
  if (lower.includes('ücretsiz') || lower.includes('komisyonsuz') || lower.includes('düşük')) {
    return 'bg-green-500/10 text-green-400 border-green-500/20';
  }
  if (lower.includes('global') || lower.includes('uluslararası') || lower.includes('abd')) {
    return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
  }
  if (lower.includes('hızlı') || lower.includes('anlık')) {
    return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
  }
  if (lower.includes('mobil') || lower.includes('app')) {
    return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
  }
  return 'bg-[#1a1a1a] text-gray-500 border-white/5';
};

const BrokerTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('BIST');
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (id: string) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredBrokers = BROKERS.filter(b => b.supportedMarkets.includes(activeTab));
  const sortedBrokers = [...filteredBrokers].sort((a, b) => b.appScore - a.appScore);

  return (
    <div className="w-full space-y-8 md:space-y-10">
      {/* Modern Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 bg-[#1a1a1a] rounded-xl border border-white/5 flex-wrap justify-center w-full md:w-auto">
          {[
            { id: 'BIST', label: 'BİST' },
            { id: 'FOREIGN', label: 'Yurt Dışı' },
            { id: 'CRYPTO', label: 'Kripto' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              aria-label={`${tab.label} sekmesini aç`}
              className={`flex-1 md:flex-none px-3 md:px-6 py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                activeTab === tab.id 
                  ? 'bg-[#252525] text-white shadow-sm' 
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* List Header (Desktop) */}
      <div className="hidden md:grid grid-cols-12 gap-6 px-8 pb-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest border-b border-white/5">
        <div className="col-span-5">Kurum Bilgisi</div>
        <div className="col-span-4 text-right pr-4">Maliyet & Oranlar</div>
        <div className="col-span-3 text-right">Deneyim</div>
      </div>

      {/* List Content */}
      <div className="flex flex-col gap-3">
        {sortedBrokers.map((broker, index) => {
          const isExpanded = expandedRows[broker.id];
          const isWinner = index === 0;

          return (
            <div 
              key={broker.id}
              className={`group relative rounded-2xl transition-all duration-300 border ${
                isWinner 
                  ? 'bg-[#151515] border-primary/20' 
                  : 'bg-[#151515] border-white/5 hover:border-white/10'
              }`}
            >
              
              {/* Main Row Clickable Area */}
              <div 
                onClick={() => toggleRow(broker.id)}
                className="relative p-4 md:p-6 cursor-pointer z-10"
                role="button"
                aria-expanded={isExpanded}
              >
                <div className="flex flex-col md:grid md:grid-cols-12 md:gap-8 items-start md:items-center">
                  
                  {/* 1. Identity Section */}
                  <div className="col-span-5 flex flex-row items-center gap-4 w-full mb-4 md:mb-0">
                    <BrokerLogo url={broker.logoUrl} name={broker.name} rank={index + 1} />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 md:mb-2">
                        <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-primary transition-colors truncate">
                          {broker.name}
                        </h3>
                        {/* Mobile Score moved here */}
                        <div className="md:hidden flex items-center gap-1 bg-[#1a1a1a] px-1.5 py-0.5 rounded border border-white/5">
                            <span className="text-yellow-500 text-xs">★</span>
                            <span className="text-xs font-bold text-white">{broker.appScore}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1.5">
                        {broker.pros.slice(0, 2).map((tag, i) => (
                          <span 
                            key={i} 
                            className={`text-[9px] md:text-[10px] font-medium px-1.5 py-0.5 md:px-2 md:py-1 rounded border whitespace-nowrap ${getTagStyle(tag)}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 2. Rates Section */}
                  <div className="col-span-4 w-full border-t border-b border-white/5 py-3 md:py-0 md:border-0 md:my-0 flex flex-row justify-between md:justify-end gap-2">
                    {activeTab === 'BIST' && (
                       <>
                         <RateDisplay 
                           label="Hisse" 
                           value={
                             broker.bistCommission === 0 
                               ? 'Ücretsiz' 
                               : <>{Number((broker.bistCommission! * 10000).toFixed(2))} <span className="text-sm font-normal text-gray-500">onbinde</span></>
                           }
                           highlighted={true}
                         />
                         <RateDisplay 
                           label="VİOP" 
                           value={
                             broker.viopCommission !== undefined
                               ? <>{Number((broker.viopCommission * 10000).toFixed(2))} <span className="text-sm font-normal text-gray-500">onbinde</span></>
                               : 'Yok'
                           }
                         />
                       </>
                    )}
                    {activeTab === 'FOREIGN' && (
                       <>
                         <RateDisplay 
                           label="Min. Ücret" 
                           value={<><span className="text-lg opacity-50">$</span>{broker.foreignMin}</>}
                           highlighted={true}
                         />
                         <RateDisplay 
                           label="Komisyon" 
                           value={broker.foreignCommission! < 1 ? `%${(broker.foreignCommission! * 100).toFixed(2)}` : `$${broker.foreignCommission}`}
                         />
                       </>
                    )}
                    {activeTab === 'CRYPTO' && (
                       <>
                         <RateDisplay 
                           label="Maker" 
                           value={<><span className="text-lg opacity-50">%</span>{(broker.cryptoMaker! * 100).toFixed(2)}</>}
                           highlighted={true}
                         />
                         <RateDisplay 
                           label="Taker" 
                           value={<><span className="text-lg opacity-50">%</span>{(broker.cryptoTaker! * 100).toFixed(2)}</>}
                         />
                       </>
                    )}
                  </div>

                  {/* 3. Action Section */}
                  <div className="col-span-3 hidden md:flex flex-row md:flex-col items-center justify-between md:justify-end gap-3 w-full md:pl-6 md:border-l border-white/5">
                     <div className="flex items-center gap-2 bg-[#1a1a1a] px-3 py-1.5 rounded-lg border border-white/5">
                        <div className="flex text-yellow-500 gap-0.5">
                           {[...Array(5)].map((_, i) => (
                             <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(broker.appScore) ? 'fill-current' : 'text-gray-700 fill-current'}`} viewBox="0 0 20 20">
                               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                             </svg>
                           ))}
                        </div>
                        <span className="font-bold text-white text-sm">{broker.appScore}</span>
                     </div>
                     
                     <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-wider group-hover:text-white transition-colors">
                        Detaylar
                        <svg className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                     </div>
                  </div>

                  {/* Mobile Button Area */}
                  <div className="md:hidden w-full mt-4 flex gap-3">
                      <button 
                        aria-label="Detayları göster"
                        className="flex-1 py-3 bg-[#1a1a1a] text-white text-xs font-bold rounded-xl border border-white/10 flex items-center justify-center gap-2"
                      >
                         Detaylar
                         <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </button>
                      <a 
                        href={broker.url} 
                        target="_blank" 
                        rel="nofollow noopener noreferrer" 
                        onClick={(e) => e.stopPropagation()} 
                        className="flex-[2] py-3 bg-white text-black text-xs font-bold rounded-xl flex items-center justify-center shadow-lg shadow-white/10"
                      >
                         Hemen Başvur
                      </a>
                  </div>

                </div>
              </div>

              {/* Expansion Panel */}
              <div 
                  className={`relative overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${
                  isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                  <div className="p-4 md:p-8 pt-0">
                      <div className="bg-[#1a1a1a] rounded-xl p-4 md:p-6 border border-white/5 flex flex-col gap-6">
                        
                        {/* New Description Field */}
                        <div className="pb-4 border-b border-white/5">
                           <p className="text-gray-400 text-sm leading-relaxed">{broker.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {/* Full Pros List */}
                            <div className="space-y-3">
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Öne Çıkanlar</h4>
                                <ul className="space-y-2">
                                    {broker.pros.map((pro, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                            <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                            {pro}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Additional Fees */}
                            <div className="space-y-3">
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Ek Maliyetler</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between p-2 bg-[#202020] rounded border border-white/5">
                                        <span className="text-gray-400">Hesap İşletim</span>
                                        <span className="text-white font-medium">{broker.accountFee}</span>
                                    </div>
                                    <div className="flex justify-between p-2 bg-[#202020] rounded border border-white/5">
                                        <span className="text-gray-400">Canlı Veri</span>
                                        <span className="text-white font-medium">{broker.id === 'midas' ? 'Ücretsiz' : 'Pakete Bağlı'}</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Desktop CTA */}
                            <div className="hidden md:flex flex-col justify-end">
                                <a 
                                    href={broker.url} 
                                    target="_blank" 
                                    rel="nofollow noopener noreferrer"
                                    className="w-full py-4 bg-white hover:bg-gray-200 text-black font-bold text-base rounded-lg transition-all flex items-center justify-center gap-2"
                                >
                                    Hesap Aç
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </a>
                                <p className="text-[10px] text-center text-gray-500 mt-2">Resmi siteye yönlendirileceksiniz.</p>
                            </div>
                        </div>

                      </div>
                  </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BrokerTable;
