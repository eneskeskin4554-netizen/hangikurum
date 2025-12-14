
import React, { useState, useMemo, useEffect } from 'react';
import { MarketOption, Broker } from '../types';
import { BROKERS } from '../constants';

// --- TYPES & STEPS ---
type Step = 'MARKET' | 'AMOUNT' | 'PREFERENCE' | 'RESULT';
type FilterType = 'ALL' | 'BANK' | 'BROKER';
type CryptoOrderType = 'MAKER' | 'TAKER';

const Calculator: React.FC = () => {
  // --- STATE ---
  const [step, setStep] = useState<Step>('MARKET');
  const [market, setMarket] = useState<MarketOption | null>(null);
  const [amount, setAmount] = useState<number>(50000);
  const [institutionFilter, setInstitutionFilter] = useState<FilterType>('ALL');
  const [cryptoType, setCryptoType] = useState<CryptoOrderType>('MAKER');
  const [isAnimating, setIsAnimating] = useState(false);

  const USD_RATE = 38.5;

  // --- TRANSITION HELPER ---
  const goToStep = (nextStep: Step) => {
    setIsAnimating(true);
    setTimeout(() => {
      setStep(nextStep);
      setIsAnimating(false);
      // Auto scroll to top of calculator on step change
      const element = document.getElementById('calculator-container');
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({top: y, behavior: 'smooth'});
      }
    }, 300);
  };

  const resetCalculator = () => {
    setMarket(null);
    setAmount(50000);
    setInstitutionFilter('ALL');
    setCryptoType('MAKER');
    goToStep('MARKET');
  };

  // --- CALCULATION LOGIC (Only runs in RESULT step) ---
  const results = useMemo(() => {
    if (!market || !BROKERS) return [];

    let filtered = BROKERS.filter(b => b.supportedMarkets.includes(market));

    // Filter Logic
    if (market === 'BIST') {
        if (institutionFilter === 'BANK') filtered = filtered.filter(b => b.type === 'Bank');
        if (institutionFilter === 'BROKER') filtered = filtered.filter(b => b.type === 'Brokerage');
    }

    const calculated = filtered.map(broker => {
      let cost = 0;
      let rateDisplay = '';
      let note = '';

      if (market === 'BIST') {
        if (broker.bistCommission !== undefined) {
          const rawCost = amount * broker.bistCommission;
          const minComm = broker.minBistCommission || 0;
          cost = Math.max(rawCost, minComm);
          rateDisplay = broker.bistCommission === 0 ? 'Ücretsiz' : `Onbinde ${(broker.bistCommission * 10000).toFixed(1)}`;
          if (cost === minComm && minComm > 0 && rawCost < minComm) note = `Min. ${minComm}₺`;
        }
      } else if (market === 'VIOP') {
        if (broker.viopCommission !== undefined) {
          cost = amount * broker.viopCommission;
          rateDisplay = `Onbinde ${(broker.viopCommission * 10000).toFixed(1)}`;
        }
      } else if (market === 'CRYPTO') {
        const rate = cryptoType === 'MAKER' ? broker.cryptoMaker : broker.cryptoTaker;
        if (rate !== undefined) {
          cost = amount * rate;
          rateDisplay = `%${(rate * 100).toFixed(2)}`;
        }
      } else {
        // FOREIGN
        if (broker.foreignCommission !== undefined) {
          let costInUSD = 0;
          if (broker.foreignCommission < 1) costInUSD = amount * broker.foreignCommission;
          else costInUSD = broker.foreignCommission;
          
          if (broker.foreignMin) costInUSD = Math.max(costInUSD, broker.foreignMin);
          
          cost = costInUSD * USD_RATE;
          rateDisplay = broker.foreignCommission < 1 ? `%${(broker.foreignCommission * 100).toFixed(2)}` : `$${broker.foreignCommission}`;
        }
      }

      return { broker, cost, rateDisplay, note };
    }).filter(item => item.cost >= 0);

    return calculated.sort((a, b) => a.cost - b.cost);
  }, [market, amount, institutionFilter, cryptoType]);

  // --- PRESETS ---
  const PRESETS = useMemo(() => {
    if (market === 'FOREIGN') return [500, 1000, 5000, 10000, 25000];
    return [10000, 50000, 100000, 500000, 1000000];
  }, [market]);

  // --- RENDER STEPS ---

  // STEP 1: MARKET SELECTION
  const renderMarketStep = () => (
    <div className="space-y-6 md:space-y-8">
      <div className="text-center space-y-2">
        <span className="text-primary font-bold text-[10px] md:text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">Adım 1/3</span>
        <h2 className="text-2xl md:text-4xl font-display font-bold text-white px-4 leading-tight">İşlem Yapacağın Piyasa?</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-3 md:gap-4 px-2">
        {[
          { id: 'BIST', label: 'Borsa İstanbul', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
          { id: 'FOREIGN', label: 'Yurt Dışı (ABD)', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064' },
          { id: 'CRYPTO', label: 'Kripto Para', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
          { id: 'VIOP', label: 'VİOP', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
        ].map((opt) => (
          <button
            key={opt.id}
            onClick={() => {
              setMarket(opt.id as MarketOption);
              if (opt.id === 'FOREIGN') setAmount(1000);
              else setAmount(50000);
              goToStep('AMOUNT');
            }}
            className="group relative p-4 md:p-8 h-32 md:h-auto rounded-2xl md:rounded-3xl bg-[#151515] border border-white/5 hover:border-primary/50 active:scale-95 hover:bg-[#1a1a1a] transition-all duration-200 flex flex-col items-center justify-center gap-3 md:gap-4 text-center shadow-lg"
          >
            <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors">
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={opt.icon} /></svg>
            </div>
            <span className="font-bold text-white text-sm md:text-lg leading-tight">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  // STEP 2: AMOUNT INPUT
  const renderAmountStep = () => (
    <div className="space-y-6 md:space-y-8">
      <div className="text-center space-y-2">
        <button onClick={() => goToStep('MARKET')} className="text-gray-500 hover:text-white text-xs mb-4 flex items-center justify-center gap-1 transition-colors mx-auto py-2">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Piyasayı Değiştir
        </button>
        <span className="text-primary font-bold text-[10px] md:text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">Adım 2/3</span>
        <h2 className="text-2xl md:text-4xl font-display font-bold text-white">İşlem Hacmin?</h2>
      </div>

      <div className="bg-[#151515] p-6 md:p-8 rounded-3xl border border-white/5 flex flex-col items-center shadow-2xl relative overflow-hidden">
         {/* Background Glow */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary/5 rounded-full blur-[60px] pointer-events-none"></div>

         <div className="relative z-10 w-full flex flex-col items-center">
             <label className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Tutar Giriniz</label>
             <div className="flex items-center justify-center gap-2 mb-8 w-full">
                 <span className="text-3xl md:text-4xl text-gray-600 font-display">{market === 'FOREIGN' ? '$' : '₺'}</span>
                 <input 
                    type="text"
                    inputMode="decimal"
                    value={amount.toLocaleString('tr-TR')}
                    onChange={(e) => {
                        const val = Number(e.target.value.replace(/[^0-9]/g, ''));
                        if (val < 10000000000) setAmount(val);
                    }}
                    className="bg-transparent text-5xl md:text-7xl font-display font-bold text-white text-center w-full focus:outline-none placeholder-gray-800"
                    placeholder="0"
                    autoFocus
                 />
             </div>

             {/* Horizontal Scrollable Presets */}
             <div className="w-full overflow-x-auto no-scrollbar pb-2 mb-8 -mx-6 px-6 md:mx-0 md:px-0">
                <div className="flex justify-start md:justify-center gap-2 min-w-max">
                    {PRESETS.map(preset => (
                        <button
                            key={preset}
                            onClick={() => setAmount(preset)}
                            className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white hover:text-black hover:border-white transition-all text-sm font-bold text-gray-400 active:scale-95"
                        >
                            {market === 'FOREIGN' ? '$' : ''}{new Intl.NumberFormat('tr-TR', { notation: "compact", compactDisplay: "short" }).format(preset)}
                        </button>
                    ))}
                </div>
             </div>

             <button
                onClick={() => {
                    if (market === 'BIST' || market === 'CRYPTO') goToStep('PREFERENCE');
                    else goToStep('RESULT');
                }}
                className="w-full py-4 bg-primary text-black font-bold text-lg rounded-2xl hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/10 active:scale-95 duration-200"
             >
                Devam Et
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
             </button>
         </div>
      </div>
    </div>
  );

  // STEP 3: PREFERENCES (Conditional)
  const renderPreferenceStep = () => (
    <div className="space-y-6 md:space-y-8">
      <div className="text-center space-y-2">
        <button onClick={() => goToStep('AMOUNT')} className="text-gray-500 hover:text-white text-xs mb-4 flex items-center justify-center gap-1 transition-colors mx-auto py-2">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Tutarı Düzenle
        </button>
        <span className="text-primary font-bold text-[10px] md:text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">Son Adım</span>
        <h2 className="text-2xl md:text-4xl font-display font-bold text-white px-4 leading-tight">
            {market === 'BIST' ? 'Tercih Ettiğin Kurum?' : 'Emir Tipi Nedir?'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 px-2">
         {market === 'BIST' && (
             <>
                <button 
                    onClick={() => { setInstitutionFilter('ALL'); goToStep('RESULT'); }}
                    className="p-5 md:p-6 rounded-2xl bg-[#151515] border border-white/5 hover:border-primary active:scale-[0.98] hover:bg-[#1a1a1a] text-left transition-all group shadow-lg"
                >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-full flex items-center justify-center text-gray-400 mb-3 md:mb-4 group-hover:text-primary group-hover:bg-primary/10">
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">Farketmez</h3>
                    <p className="text-xs md:text-sm text-gray-500 leading-relaxed">Tüm banka ve aracı kurumları karşılaştır.</p>
                </button>
                <button 
                    onClick={() => { setInstitutionFilter('BANK'); goToStep('RESULT'); }}
                    className="p-5 md:p-6 rounded-2xl bg-[#151515] border border-white/5 hover:border-primary active:scale-[0.98] hover:bg-[#1a1a1a] text-left transition-all group shadow-lg"
                >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-full flex items-center justify-center text-gray-400 mb-3 md:mb-4 group-hover:text-primary group-hover:bg-primary/10">
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">Bankalar</h3>
                    <p className="text-xs md:text-sm text-gray-500 leading-relaxed">Güven ve entegre bankacılık deneyimi.</p>
                </button>
                <button 
                    onClick={() => { setInstitutionFilter('BROKER'); goToStep('RESULT'); }}
                    className="p-5 md:p-6 rounded-2xl bg-[#151515] border border-white/5 hover:border-primary active:scale-[0.98] hover:bg-[#1a1a1a] text-left transition-all group shadow-lg"
                >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-full flex items-center justify-center text-gray-400 mb-3 md:mb-4 group-hover:text-primary group-hover:bg-primary/10">
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">Aracı Kurumlar</h3>
                    <p className="text-xs md:text-sm text-gray-500 leading-relaxed">Daha düşük komisyon ve profesyonel ekranlar.</p>
                </button>
             </>
         )}

         {market === 'CRYPTO' && (
             <>
                <button 
                    onClick={() => { setCryptoType('MAKER'); goToStep('RESULT'); }}
                    className="p-5 md:p-6 rounded-2xl bg-[#151515] border border-white/5 hover:border-primary active:scale-[0.98] hover:bg-[#1a1a1a] text-left transition-all group md:col-span-1.5 shadow-lg"
                >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-full flex items-center justify-center text-gray-400 mb-3 md:mb-4 group-hover:text-primary group-hover:bg-primary/10">
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">Maker (Limit)</h3>
                    <p className="text-xs md:text-sm text-gray-500 leading-relaxed">Emri tahtaya yazıp bekleyenler (Daha ucuz).</p>
                </button>
                <button 
                    onClick={() => { setCryptoType('TAKER'); goToStep('RESULT'); }}
                    className="p-5 md:p-6 rounded-2xl bg-[#151515] border border-white/5 hover:border-primary active:scale-[0.98] hover:bg-[#1a1a1a] text-left transition-all group md:col-span-1.5 shadow-lg"
                >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-full flex items-center justify-center text-gray-400 mb-3 md:mb-4 group-hover:text-primary group-hover:bg-primary/10">
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">Taker (Piyasa)</h3>
                    <p className="text-xs md:text-sm text-gray-500 leading-relaxed">Anlık fiyattan hemen alanlar.</p>
                </button>
             </>
         )}
      </div>
    </div>
  );

  // STEP 4: RESULTS
  const renderResults = () => {
    const winner = results[0];
    const totalBrokers = results.length;

    return (
        <div className="space-y-4 md:space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center bg-[#151515] p-4 rounded-2xl border border-white/5 gap-3 md:gap-0">
                <div className="text-center md:text-left">
                    <p className="text-gray-400 text-[10px] md:text-xs uppercase font-bold tracking-wider mb-1">Senaryo</p>
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                        <span className="text-white font-bold text-sm md:text-base">{market === 'BIST' ? 'Borsa İstanbul' : market === 'CRYPTO' ? 'Kripto' : market === 'VIOP' ? 'VİOP' : 'Yurt Dışı'}</span>
                        <span className="text-gray-600">•</span>
                        <span className="text-white font-bold text-sm md:text-base">{market === 'FOREIGN' ? '$' : '₺'}{amount.toLocaleString('tr-TR')}</span>
                    </div>
                </div>
                <button 
                    onClick={resetCalculator}
                    className="w-full md:w-auto px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-colors active:scale-95"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    Başa Dön
                </button>
            </div>

            {/* Winner Card - Mobile Optimized (Center aligned vertical stack for mobile) */}
            {winner && (
                <div className="bg-gradient-to-b from-[#1a1a1a] to-[#121212] md:bg-gradient-to-r md:from-primary/20 md:to-green-900/20 p-6 md:p-8 rounded-[2rem] border border-primary/30 relative overflow-hidden shadow-2xl">
                    {/* Glow Effects */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full pointer-events-none"></div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 md:gap-6">
                         {/* Winner Badge Mobile */}
                         <div className="md:hidden w-full flex justify-center mb-2">
                             <span className="bg-primary text-black text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-primary/20 animate-pulse">
                                 En Hesaplı Seçenek
                             </span>
                         </div>

                         {/* Logo */}
                         <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-2xl p-3 flex items-center justify-center shadow-xl ring-4 ring-white/5">
                            <img src={winner.broker.logoUrl} className="w-full h-full object-contain" alt={winner.broker.name} />
                         </div>

                         {/* Info */}
                         <div className="flex-1 text-center md:text-left space-y-2 md:space-y-0">
                             <div className="flex flex-col md:flex-row items-center md:justify-start gap-2 mb-1">
                                <h3 className="text-2xl md:text-3xl font-bold text-white">{winner.broker.name}</h3>
                                <span className="hidden md:inline-block bg-primary text-black text-[10px] font-black px-2 py-0.5 rounded uppercase">Kazanan</span>
                             </div>
                             <p className="text-gray-400 text-xs md:text-sm max-w-[250px] md:max-w-none mx-auto">{winner.broker.description}</p>
                         </div>

                         {/* Price */}
                         <div className="text-center md:text-right w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t border-white/10 md:border-0">
                             <p className="text-[10px] md:text-xs text-primary font-bold uppercase tracking-widest mb-1">Tahmini Komisyon</p>
                             <p className="text-5xl md:text-4xl font-display font-bold text-white tracking-tighter">
                                {new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2 }).format(winner.cost)}<span className="text-2xl md:text-xl text-gray-500 ml-1">₺</span>
                             </p>
                             <div className="inline-flex items-center gap-1 bg-white/5 px-2 py-1 rounded mt-2">
                                <span className="text-[10px] text-gray-400">{winner.rateDisplay}</span>
                             </div>
                         </div>
                    </div>
                </div>
            )}

            {/* Results List - Compact Mobile View */}
            <div className="bg-[#121212] border border-white/5 rounded-3xl overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                    <h4 className="text-gray-400 text-[10px] md:text-sm font-bold uppercase tracking-widest">Diğer Alternatifler ({totalBrokers - 1})</h4>
                </div>
                {results.slice(1).map((item, index) => (
                    <div key={item.broker.id} className="flex items-center justify-between p-4 md:p-6 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                        <div className="flex items-center gap-3 md:gap-4">
                            <span className="text-gray-600 font-bold w-4 text-xs md:text-sm text-center">{index + 2}</span>
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-lg p-1.5 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                                <img src={item.broker.logoUrl} className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm md:text-base">{item.broker.name}</p>
                                <p className="md:hidden text-[10px] text-gray-500">{item.rateDisplay}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-white font-bold text-base md:text-lg tabular-nums">
                                {new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2 }).format(item.cost)} ₺
                            </p>
                            <p className="text-[10px] md:text-xs text-red-400">+{new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 }).format(item.cost - winner.cost)} ₺</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
  };

  return (
    <div id="calculator-container" className="w-full max-w-xl md:max-w-3xl mx-auto px-0 md:px-0">
      <div 
        className={`transition-all duration-300 transform ${
            isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        {step === 'MARKET' && renderMarketStep()}
        {step === 'AMOUNT' && renderAmountStep()}
        {step === 'PREFERENCE' && renderPreferenceStep()}
        {step === 'RESULT' && renderResults()}
      </div>
      
      {/* Progress Dots */}
      {step !== 'RESULT' && (
         <div className="flex justify-center gap-2 mt-8 md:mt-12">
            {['MARKET', 'AMOUNT', 'PREFERENCE'].map((s, i) => (
                <div 
                    key={s} 
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                        (s === step) ? 'w-8 bg-primary' : 
                        (['MARKET', 'AMOUNT', 'PREFERENCE'].indexOf(step) > i) ? 'w-2 bg-primary/30' : 'w-2 bg-white/10'
                    }`}
                />
            ))}
         </div>
      )}
    </div>
  );
};

export default Calculator;

