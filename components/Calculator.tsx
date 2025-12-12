
import React, { useState, useMemo, useEffect } from 'react';
import { MarketOption, Broker } from '../types';
import { BROKERS } from '../constants';

const CalculatorLogo: React.FC<{ url: string; name: string; size?: 'sm' | 'md' | 'lg' | 'xl' }> = ({ url, name, size = 'md' }) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  
  const sizeClasses = {
    sm: 'w-8 h-8 p-1',
    md: 'w-10 h-10 p-2',
    lg: 'w-14 h-14 p-3',
    xl: 'w-20 h-20 p-4'
  };

  return (
    <div className={`${sizeClasses[size]} bg-white rounded-2xl flex items-center justify-center overflow-hidden relative flex-shrink-0 shadow-xl ring-1 ring-white/10`}>
      {status === 'loading' && <div className="absolute inset-0 bg-gray-50 animate-pulse" />}
      {status === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 text-gray-400 font-bold text-[10px]">
          {name.charAt(0)}
        </div>
      )}
      <img 
        src={url} 
        alt={name} 
        loading="lazy"
        className={`w-full h-full object-contain transition-all duration-500 ${
          status === 'loaded' ? 'opacity-100 scale-100' : 'opacity-0 scale-90 blur-sm'
        }`}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
      />
    </div>
  );
};

const Calculator: React.FC = () => {
  const [volume, setVolume] = useState<number>(100000);
  const [tradeCount, setTradeCount] = useState<number>(1);
  const [market, setMarket] = useState<MarketOption>('BIST');
  const [cryptoType, setCryptoType] = useState<'MAKER' | 'TAKER'>('MAKER');
  const [sliderValue, setSliderValue] = useState(50); // 0-100 scale

  const USD_RATE = 38.5; 

  // --- LOGARITHMIC SLIDER LOGIC ---
  const minVol = market === 'FOREIGN' ? 100 : 1000;
  const maxVol = market === 'FOREIGN' ? 500000 : 10000000;
  
  const minLog = Math.log(minVol);
  const maxLog = Math.log(maxVol);
  const scale = (maxLog - minLog) / 100;

  useEffect(() => {
    const newSliderVal = (Math.log(volume) - minLog) / scale;
    if (Math.abs(newSliderVal - sliderValue) > 1) {
        setSliderValue(Math.min(100, Math.max(0, newSliderVal)));
    }
  }, [volume, minLog, scale]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSliderValue(val);
    const newVol = Math.exp(minLog + scale * val);
    
    let rounded;
    if (newVol < 10000) rounded = Math.round(newVol / 100) * 100;
    else if (newVol < 100000) rounded = Math.round(newVol / 1000) * 1000;
    else rounded = Math.round(newVol / 10000) * 10000;
    
    setVolume(rounded);
  };

  const PRESETS = useMemo(() => {
      if (market === 'FOREIGN') {
          return [1000, 5000, 10000, 50000];
      }
      return [10000, 100000, 500000, 1000000];
  }, [market]);

  const FREQUENCIES = [
      { label: 'Tek Sefer', val: 1, desc: 'Anlık' },
      { label: 'Haftalık', val: 4, desc: 'Ayda 4' },
      { label: 'Günlük', val: 20, desc: 'Ayda 20' },
      { label: 'Trader', val: 100, desc: 'Ayda 100+' },
  ];

  const formatCurrency = (val: number) => {
    if (isNaN(val)) return '0,00';
    return new Intl.NumberFormat('tr-TR', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val);
  };

  const results = useMemo(() => {
    if (!BROKERS) return [];
    
    const compatibleBrokers = BROKERS.filter(b => b.supportedMarkets.includes(market));

    const calculated = compatibleBrokers.map(broker => {
      let singleCost: number | null = null; 

      if (market === 'BIST') {
        if (broker.bistCommission !== undefined) {
          let calculatedCost = volume * broker.bistCommission;
          const minComm = broker.minBistCommission || 0;
          singleCost = Math.max(calculatedCost, minComm);
        }
      } else if (market === 'VIOP') {
        if (broker.viopCommission !== undefined) {
           singleCost = volume * broker.viopCommission;
        }
      } else if (market === 'CRYPTO') {
        const rate = cryptoType === 'MAKER' ? broker.cryptoMaker : broker.cryptoTaker;
        if (rate !== undefined) singleCost = volume * rate;
      } else {
        // FOREIGN
        if (broker.foreignCommission !== undefined) {
           const volInUSD = volume; 
           let costInUSD = 0;
           if (broker.foreignCommission < 1) {
             costInUSD = volInUSD * broker.foreignCommission;
           } else {
             costInUSD = broker.foreignCommission;
           }
           if (broker.foreignMin) {
             costInUSD = Math.max(costInUSD, broker.foreignMin);
           }
           singleCost = costInUSD * USD_RATE;
        }
      }

      if (singleCost === null || isNaN(singleCost)) return null;

      const totalCost = singleCost * tradeCount;

      return { broker, cost: totalCost, singleCost };
    })
    .filter((item): item is { broker: Broker, cost: number, singleCost: number } => item !== null);

    return calculated.sort((a, b) => a.cost - b.cost);
  }, [volume, market, cryptoType, tradeCount]);

  const topResults = results.slice(0, 5);
  const winner = topResults[0];
  
  const nextBrokers = results.slice(1, 4);
  const avgNextCost = nextBrokers.length > 0 
    ? nextBrokers.reduce((acc, curr) => acc + curr.cost, 0) / nextBrokers.length 
    : winner?.cost || 0;
  
  const savings = Math.max(0, avgNextCost - (winner?.cost || 0));
  const yearlySavings = savings * 12;
  const savingsPercent = avgNextCost > 0 ? (savings / avgNextCost) * 100 : 0;

  return (
    <div className="w-full max-w-7xl mx-auto">
      
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
        
        {/* --- LEFT PANEL: CONTROLS --- */}
        <div className="lg:w-1/2 flex flex-col gap-6 lg:gap-8">
            
            {/* Market Selection Cards */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
                {[
                  { id: 'BIST', label: 'Borsa İstanbul', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
                  { id: 'FOREIGN', label: 'Yurt Dışı', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064' },
                  { id: 'CRYPTO', label: 'Kripto Para', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
                  { id: 'VIOP', label: 'VİOP', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                        setMarket(opt.id as MarketOption);
                        if (opt.id === 'FOREIGN') setVolume(2500);
                        else if (market === 'FOREIGN') setVolume(50000);
                    }}
                    className={`relative group p-4 md:p-5 rounded-3xl border transition-all duration-300 text-left overflow-hidden ${
                      market === opt.id 
                        ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
                        : 'bg-[#151515] text-gray-400 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2 md:mb-3">
                        <div className={`p-2 rounded-xl transition-colors ${
                            market === opt.id ? 'bg-black text-white' : 'bg-white/5 text-gray-400'
                        }`}>
                           <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={opt.icon} /></svg>
                        </div>
                        {market === opt.id && <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full animate-pulse"></div>}
                    </div>
                    <span className="font-display font-bold text-sm md:text-lg">{opt.label}</span>
                  </button>
                ))}
            </div>

            {/* Crypto Toggles */}
            {market === 'CRYPTO' && (
                <div className="bg-[#121212] p-1.5 rounded-2xl border border-white/5 flex relative">
                     <div className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-xl bg-[#252525] transition-all duration-300 ${cryptoType === 'MAKER' ? 'left-1.5' : 'left-[calc(50%+3px)]'}`}></div>
                     
                     <button onClick={() => setCryptoType('MAKER')} className={`flex-1 relative z-10 py-3 text-sm font-bold transition-colors ${cryptoType === 'MAKER' ? 'text-white' : 'text-gray-500'}`}>
                        Maker (Limit)
                     </button>
                     <button onClick={() => setCryptoType('TAKER')} className={`flex-1 relative z-10 py-3 text-sm font-bold transition-colors ${cryptoType === 'TAKER' ? 'text-white' : 'text-gray-500'}`}>
                        Taker (Piyasa)
                     </button>
                </div>
            )}

            {/* MAIN INPUT CARD */}
            <div className="bg-[#151515] rounded-2xl md:rounded-[2.5rem] p-6 md:p-8 border border-white/5 flex flex-col gap-6 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                 
                 {/* 1. Frequency Selector */}
                 <div className="relative z-10">
                     <label className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mb-3 block">İşlem Sıklığınız</label>
                     <div className="grid grid-cols-4 gap-2">
                         {FREQUENCIES.map((freq) => (
                             <button
                                key={freq.val}
                                onClick={() => setTradeCount(freq.val)}
                                className={`py-2 px-1 rounded-xl border transition-all flex flex-col items-center justify-center gap-1 ${
                                    tradeCount === freq.val
                                    ? 'bg-primary text-black border-primary shadow-lg scale-105'
                                    : 'bg-[#0a0a0a] text-gray-400 border-white/5 hover:border-white/20 hover:bg-white/5'
                                }`}
                             >
                                 <span className="text-[10px] md:text-xs font-bold">{freq.label}</span>
                                 <span className={`text-[8px] md:text-[9px] ${tradeCount === freq.val ? 'text-black/70' : 'text-gray-600'}`}>{freq.desc}</span>
                             </button>
                         ))}
                     </div>
                 </div>

                 <div className="h-px bg-white/5 w-full relative z-10"></div>

                 {/* 2. Volume Input & Slider */}
                 <div className="relative z-10 flex flex-col items-center">
                    <label className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mb-2">İşlem Başına Hacim</label>
                    
                    <div className="flex items-center justify-center gap-2 w-full mb-4">
                        <span className="text-3xl md:text-5xl text-gray-600 font-display font-light select-none">
                            {market === 'FOREIGN' ? '$' : '₺'}
                        </span>
                        <input
                        type="text"
                        inputMode="decimal"
                        aria-label="İşlem Hacmi Miktarı"
                        value={volume === 0 ? '' : volume.toLocaleString('tr-TR')}
                        onChange={(e) => {
                            const rawVal = e.target.value.replace(/[^0-9]/g, ''); 
                            const val = Number(rawVal);
                            if (!isNaN(val) && val < 99999999999) setVolume(val);
                        }}
                        className="w-full bg-transparent text-center text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white placeholder-gray-700 focus:outline-none min-w-0"
                        placeholder="0"
                        />
                    </div>

                    {/* Slider */}
                    <div className="w-full max-w-[80%] mx-auto mb-6 relative flex items-center h-6">
                         <div className="absolute inset-x-0 h-1.5 bg-[#252525] rounded-full overflow-hidden">
                             <div className="h-full bg-primary/30" style={{ width: `${sliderValue}%` }}></div>
                         </div>
                         <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={sliderValue}
                            aria-label="Hacim Ayarı" 
                            onChange={handleSliderChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                         />
                         <div 
                            className="w-5 h-5 bg-primary rounded-full shadow-[0_0_10px_rgba(212,252,121,0.5)] absolute top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-75 flex items-center justify-center"
                            style={{ left: `calc(${sliderValue}% - 10px)` }}
                         >
                            <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                         </div>
                    </div>

                    {/* Presets */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {PRESETS.map((amt) => (
                            <button
                            key={amt}
                            onClick={() => setVolume(amt)}
                            className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all ${
                                volume === amt 
                                ? 'bg-white/10 text-white border-white/20' 
                                : 'bg-transparent text-gray-500 border-transparent hover:text-white'
                            }`}
                            >
                            {amt >= 1000000 ? `${amt / 1000000}m` : amt >= 1000 ? `${amt / 1000}k` : amt}
                            </button>
                        ))}
                    </div>
                 </div>
            </div>
        </div>

        {/* --- RIGHT PANEL: RESULTS --- */}
        <div className="lg:w-1/2 mt-4 lg:mt-0">
           <div className="bg-[#121212] border border-white/10 rounded-2xl md:rounded-[2.5rem] p-5 md:p-10 h-full flex flex-col relative overflow-hidden">
               
               {/* Header */}
               <div className="flex justify-between items-center mb-6 md:mb-8">
                  <div>
                    <h3 className="text-white font-bold text-xl md:text-2xl font-display">Maliyet Analizi</h3>
                    <p className="text-gray-500 text-xs md:text-sm mt-1">
                        {tradeCount > 1 ? `Aylık ${tradeCount} işlem baz alınarak hesaplandı` : 'Tek işlem baz alınarak hesaplandı'}
                    </p>
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-full flex items-center justify-center text-gray-600">
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  </div>
               </div>

               {/* Winner Card */}
               {winner && (
                   <div className="relative z-10 bg-gradient-to-br from-[#202020] to-black rounded-3xl p-6 md:p-8 border border-primary/20 shadow-2xl mb-6 group overflow-hidden">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-primary/20 transition-colors"></div>
                       
                       <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 relative z-10 text-center sm:text-left">
                           <CalculatorLogo url={winner.broker.logoUrl} name={winner.broker.name} size="xl" />
                           <div className="flex-1">
                               <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-3 mb-1 justify-center sm:justify-start">
                                  <h2 className="text-2xl md:text-3xl font-display font-bold text-white">{winner.broker.name}</h2>
                                  <span className="bg-primary text-black text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">Lider</span>
                               </div>
                               <p className="text-gray-400 text-xs md:text-sm">
                                  Piyasa ortalamasından <span className="text-primary font-bold">%{(savingsPercent).toFixed(0)}</span> daha uygun.
                               </p>
                           </div>
                       </div>

                       <div className="mt-6 md:mt-8 pt-6 border-t border-white/10">
                           <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4 mb-4">
                               <div className="text-center sm:text-left">
                                   <p className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">
                                       {tradeCount > 1 ? 'Aylık Toplam Maliyet' : 'İşlem Maliyeti'}
                                   </p>
                                   <p className="text-3xl md:text-4xl font-display font-bold text-white tabular-nums">
                                       {formatCurrency(winner.cost)} <span className="text-lg md:text-xl text-gray-500">₺</span>
                                   </p>
                               </div>
                               
                               {savings > 0 && (
                                   <div className="text-right">
                                       <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-1">Cebinizde Kalan</span>
                                       <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-lg">
                                           <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                           <span className="text-green-400 font-bold text-xs md:text-sm">
                                               {formatCurrency(savings)} ₺
                                           </span>
                                       </div>
                                   </div>
                               )}
                           </div>
                           
                           {/* Savings Visual Bar */}
                           {savings > 0 && (
                               <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden flex relative mt-2">
                                   {/* Winner Portion */}
                                   <div className="h-full bg-primary" style={{ width: `${100 - savingsPercent}%` }}></div>
                                   {/* Savings Portion */}
                                   <div className="h-full bg-green-500/50" style={{ width: `${savingsPercent}%` }}></div>
                                   
                                   <div className="absolute inset-0 flex items-center justify-between px-2 text-[8px] font-bold text-black mix-blend-overlay pointer-events-none">
                                      <span>ÖDENEN</span>
                                      <span>TASARRUF</span>
                                   </div>
                               </div>
                           )}
                           
                           {tradeCount > 1 && savings > 0 && (
                               <p className="text-center text-[10px] text-gray-500 mt-3 font-medium">
                                   Yılda toplam <span className="text-white">~{formatCurrency(yearlySavings)} ₺</span> tasarruf edebilirsiniz.
                               </p>
                           )}
                       </div>
                   </div>
               )}

               {/* Ranking List */}
               <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-2 max-h-[400px]">
                   {topResults.slice(1).map((item, idx) => (
                       <div key={item.broker.id} className="flex items-center justify-between p-3 md:p-4 rounded-xl md:rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 group">
                           <div className="flex items-center gap-3 md:gap-4">
                               <span className="text-gray-700 font-display font-bold text-xs md:text-sm w-4">{idx + 2}</span>
                               <CalculatorLogo url={item.broker.logoUrl} name={item.broker.name} size="sm" />
                               <span className="text-gray-300 font-medium text-sm md:text-base">{item.broker.name}</span>
                           </div>
                           <div className="text-right">
                               <span className="text-white font-bold tabular-nums block text-sm md:text-base">
                                   {formatCurrency(item.cost)} ₺
                               </span>
                               <span className="text-[10px] text-red-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                   +{formatCurrency(item.cost - (winner?.cost || 0))} fark
                               </span>
                           </div>
                       </div>
                   ))}
               </div>

           </div>
        </div>

      </div>
    </div>
  );
};

export default Calculator;
