
import React, { useState } from 'react';
import { Broker, InternationalBroker, CryptoExchange } from '../types';
import { INTERNATIONAL_BROKERS, CRYPTO_EXCHANGES } from '../constants';
import { Calculator, ArrowRight, Wallet, Activity, Globe, TrendingUp, CheckCircle2, Crown, Sparkles, RefreshCcw, DollarSign, Bitcoin } from 'lucide-react';

interface CommissionCalculatorProps {
  brokers: Broker[];
}

type VolumeOption = 10000 | 50000 | 100000 | 250000 | 1000000;
type FrequencyOption = 'low' | 'medium' | 'high'; // low: ~2 trades, med: ~10, high: ~50
type MarketOption = 'share' | 'viop' | 'global' | 'crypto';

interface CalculationResult {
  broker: Broker | InternationalBroker | CryptoExchange;
  annualCost: number;
  isBest: boolean;
  reason: string;
}

const CommissionCalculator: React.FC<CommissionCalculatorProps> = ({ brokers }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [volume, setVolume] = useState<VolumeOption>(50000);
  const [frequency, setFrequency] = useState<FrequencyOption>('medium');
  const [market, setMarket] = useState<MarketOption>('share');
  const [recommendations, setRecommendations] = useState<CalculationResult[]>([]);

  // Constants for calculation
  const TRADE_COUNTS = { low: 2, medium: 10, high: 50 };

  const calculate = () => {
    const monthlyTradeCount = TRADE_COUNTS[frequency];
    const tradeSize = volume / monthlyTradeCount;
    
    let results: CalculationResult[] = [];

    if (market === 'share' || market === 'viop') {
      results = brokers.map(broker => {
        const rate = market === 'share' ? broker.commissionRate.share : broker.commissionRate.viop;
        const minComm = broker.minCommission;
        
        // Calculate per trade cost
        let costPerTrade = (tradeSize * rate) / 10000;
        
        // Apply min commission logic (if rate is > 0)
        if (rate > 0 && costPerTrade < minComm) {
          costPerTrade = minComm;
        }

        // Add BSMV (5%)
        costPerTrade = costPerTrade * 1.05;

        const annualCost = costPerTrade * monthlyTradeCount * 12;

        let reason = "Standart oran";
        if (rate === 0) reason = "Komisyonsuz işlem avantajı";
        else if (costPerTrade === minComm) reason = "Minimum komisyon uygulandı";
        else if (rate < 10) reason = "Düşük komisyon oranı";

        return {
          broker,
          annualCost,
          isBest: false,
          reason
        };
      });
    } else if (market === 'global') {
      results = INTERNATIONAL_BROKERS.map(broker => {
        // Simple parser for estimation. Real logic would be complex due to string formats.
        // Assuming average 1.5 USD per trade for Midas, 15 USD for banks etc.
        let costPerTradeUSD = 0;
        const commStr = broker.commissionRate.toLowerCase();
        
        if (commStr.includes('1.5 usd')) costPerTradeUSD = 1.5;
        else if (commStr.includes('1 usd')) costPerTradeUSD = 1;
        else if (commStr.includes('15 usd')) costPerTradeUSD = 15;
        else if (commStr.includes('20 usd')) costPerTradeUSD = 20;
        else if (commStr.includes('25 usd')) costPerTradeUSD = 25;
        else costPerTradeUSD = 10; // Default fallback

        // Min commission check
        const minCommStr = broker.minCommission.toLowerCase().replace(/[^0-9.]/g, '');
        const minComm = parseFloat(minCommStr) || 0;
        if (costPerTradeUSD < minComm) costPerTradeUSD = minComm;

        // Convert to TL (approx 34)
        const annualCost = costPerTradeUSD * 34 * monthlyTradeCount * 12;

        return {
          broker,
          annualCost,
          isBest: false,
          reason: costPerTradeUSD < 5 ? "Sabit düşük ücret avantajı" : "Profesyonel platform"
        };
      });
    } else if (market === 'crypto') {
      results = CRYPTO_EXCHANGES.map(broker => {
        // Parse "%0.10" -> 0.001
        const rateStr = broker.commissionRate.maker.replace('%', '');
        const rate = parseFloat(rateStr) / 100; 
        
        const annualCost = (volume * rate) * 12; // Volume is monthly total here

        return {
          broker,
          annualCost,
          isBest: false,
          reason: "Rekabetçi maker oranı"
        };
      });
    }

    // Sort by cost (lowest first)
    results.sort((a, b) => a.annualCost - b.annualCost);

    // Mark top 3
    const top3 = results.slice(0, 3).map((r, idx) => ({
      ...r,
      isBest: idx === 0,
      reason: idx === 0 ? "🏆 En Düşük Maliyetli Seçenek" : r.reason
    }));

    setRecommendations(top3);
    setStep(4);
  };

  const reset = () => {
    setStep(1);
    setVolume(50000);
    setFrequency('medium');
    setMarket('share');
  };

  // Helper UI components
  const OptionButton = ({ selected, onClick, label, subLabel, icon: Icon }: any) => (
    <button
      onClick={onClick}
      className={`relative w-full p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-4 group ${
        selected 
          ? 'border-blue-600 bg-blue-50/50 shadow-md ring-1 ring-blue-600' 
          : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50'
      }`}
    >
      <div className={`p-3 rounded-full ${selected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600'}`}>
        <Icon size={24} />
      </div>
      <div>
        <div className={`font-bold text-lg ${selected ? 'text-blue-900' : 'text-slate-700'}`}>{label}</div>
        {subLabel && <div className="text-xs text-slate-500 font-medium mt-0.5">{subLabel}</div>}
      </div>
      {selected && <div className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600"><CheckCircle2 size={24} /></div>}
    </button>
  );

  const StepIndicator = () => (
    <div className="flex justify-center mb-8 gap-2">
      {[1, 2, 3].map(i => (
        <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${step >= i ? 'w-8 bg-blue-600' : 'w-4 bg-slate-200'}`} />
      ))}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 animate-fade-in min-h-[600px]">
      
      {step < 4 && (
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
             Akıllı Komisyon Analizi
          </h1>
          <p className="text-slate-600 text-lg">Size en uygun aracı kurumu bulmak için 3 basit soru.</p>
        </div>
      )}

      {step < 4 && <StepIndicator />}

      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-10 relative overflow-hidden">
        {/* Step 1: Volume */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
              Aylık Ortalama İşlem Hacminiz?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[10000, 50000, 100000, 250000, 1000000].map(val => (
                <OptionButton
                  key={val}
                  selected={volume === val}
                  onClick={() => setVolume(val as VolumeOption)}
                  label={`${val.toLocaleString()} TL`}
                  subLabel="Aylık Toplam Hacim"
                  icon={Wallet}
                />
              ))}
            </div>
            <div className="flex justify-end mt-8">
              <button 
                onClick={() => setStep(2)}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 flex items-center gap-2 transition-transform active:scale-95"
              >
                Devam Et <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Frequency */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
              Ne Sıklıkla İşlem Yapıyorsunuz?
            </h2>
            <div className="space-y-4">
              <OptionButton
                selected={frequency === 'low'}
                onClick={() => setFrequency('low')}
                label="Az (Nadir)"
                subLabel="Ayda 1-5 işlem. Genelde alıp beklerim."
                icon={Activity}
              />
              <OptionButton
                selected={frequency === 'medium'}
                onClick={() => setFrequency('medium')}
                label="Orta (Düzenli)"
                subLabel="Ayda 5-20 işlem. Fırsatları değerlendiririm."
                icon={TrendingUp}
              />
              <OptionButton
                selected={frequency === 'high'}
                onClick={() => setFrequency('high')}
                label="Çok (Aktif Trader)"
                subLabel="Ayda 50+ işlem. Günlük al-sat yaparım."
                icon={Sparkles}
              />
            </div>
            <div className="flex justify-between mt-8">
               <button onClick={() => setStep(1)} className="text-slate-500 font-bold hover:text-slate-800 px-4">Geri</button>
               <button 
                onClick={() => setStep(3)}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 flex items-center gap-2 transition-transform active:scale-95"
              >
                Devam Et <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Market */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
              Hangi Piyasada İşlem Yapacaksınız?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <OptionButton
                selected={market === 'share'}
                onClick={() => setMarket('share')}
                label="Hisse Senedi (BIST)"
                subLabel="Borsa İstanbul pay piyasası"
                icon={TrendingUp}
              />
              <OptionButton
                selected={market === 'viop'}
                onClick={() => setMarket('viop')}
                label="VİOP (Vadeli İşlemler)"
                subLabel="Kaldıraçlı işlemler ve endeks kontratları"
                icon={Activity}
              />
              <OptionButton
                selected={market === 'global'}
                onClick={() => setMarket('global')}
                label="Yurtdışı Piyasalar"
                subLabel="ABD borsaları, Nasdaq, NYSE"
                icon={Globe}
              />
              <OptionButton
                selected={market === 'crypto'}
                onClick={() => setMarket('crypto')}
                label="Kripto Varlıklar"
                subLabel="Bitcoin, Ethereum ve Altcoinler"
                icon={Bitcoin}
              />
            </div>
            <div className="flex justify-between mt-8">
               <button onClick={() => setStep(2)} className="text-slate-500 font-bold hover:text-slate-800 px-4">Geri</button>
               <button 
                onClick={calculate}
                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg shadow-green-200 flex items-center gap-2 transition-transform active:scale-95"
              >
                Sonuçları Göster <Calculator size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Results */}
        {step === 4 && (
          <div className="animate-fade-in">
             <div className="text-center mb-8">
                <div className="inline-flex p-3 bg-green-100 text-green-700 rounded-full mb-4">
                  <Crown size={32} />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900">Senin İçin En Uygun Kurumlar</h2>
                <p className="text-slate-500 mt-2">
                  <span className="font-bold text-slate-800">{volume.toLocaleString()} TL</span> hacim ve 
                  <span className="font-bold text-slate-800"> {frequency === 'low' ? 'Az' : frequency === 'medium' ? 'Orta' : 'Yüksek'}</span> işlem sıklığına göre analiz edildi.
                </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end mb-8">
                {/* 2nd Place */}
                {recommendations[1] && (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 relative order-2 md:order-1 hover:-translate-y-1 transition-transform">
                     <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-200 text-slate-600 text-xs font-bold px-3 py-1 rounded-full uppercase">
                        2. Seçenek
                     </div>
                     <div className="flex justify-center mb-4">
                        {recommendations[1].broker.logoUrl && (
                          <img src={recommendations[1].broker.logoUrl} className="h-12 w-auto object-contain" alt="" />
                        )}
                     </div>
                     <h3 className="text-lg font-bold text-center text-slate-800 mb-2">{recommendations[1].broker.name}</h3>
                     <p className="text-center text-slate-500 text-xs mb-4">{recommendations[1].reason}</p>
                     <div className="bg-slate-50 rounded-xl p-3 text-center">
                        <p className="text-xs text-slate-400 font-bold uppercase">Yıllık Maliyet</p>
                        <p className="text-xl font-bold text-slate-700">₺{recommendations[1].annualCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                     </div>
                  </div>
                )}

                {/* 1st Place */}
                {recommendations[0] && (
                  <div className="bg-white rounded-2xl border-2 border-blue-500 shadow-xl shadow-blue-100 p-6 relative order-1 md:order-2 z-10 scale-105">
                     <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-sm font-bold px-4 py-1.5 rounded-full uppercase flex items-center gap-2 shadow-md">
                        <Crown size={14} /> En İyi Seçim
                     </div>
                     <div className="flex justify-center mb-4 mt-2">
                        {recommendations[0].broker.logoUrl && (
                          <img src={recommendations[0].broker.logoUrl} className="h-16 w-auto object-contain" alt="" />
                        )}
                     </div>
                     <h3 className="text-xl font-extrabold text-center text-slate-900 mb-2">{recommendations[0].broker.name}</h3>
                     <p className="text-center text-green-600 text-xs font-bold mb-6 bg-green-50 py-1 px-2 rounded-lg inline-block mx-auto w-full">
                       {recommendations[0].reason}
                     </p>
                     <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                        <p className="text-xs text-blue-400 font-bold uppercase mb-1">Yıllık Tahmini Maliyet</p>
                        <p className="text-3xl font-black text-blue-700">₺{recommendations[0].annualCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                     </div>
                  </div>
                )}

                {/* 3rd Place */}
                {recommendations[2] && (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 relative order-3 hover:-translate-y-1 transition-transform">
                     <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
                        3. Seçenek
                     </div>
                     <div className="flex justify-center mb-4">
                        {recommendations[2].broker.logoUrl && (
                          <img src={recommendations[2].broker.logoUrl} className="h-12 w-auto object-contain" alt="" />
                        )}
                     </div>
                     <h3 className="text-lg font-bold text-center text-slate-800 mb-2">{recommendations[2].broker.name}</h3>
                     <p className="text-center text-slate-500 text-xs mb-4">{recommendations[2].reason}</p>
                     <div className="bg-slate-50 rounded-xl p-3 text-center">
                        <p className="text-xs text-slate-400 font-bold uppercase">Yıllık Maliyet</p>
                        <p className="text-xl font-bold text-slate-700">₺{recommendations[2].annualCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                     </div>
                  </div>
                )}
             </div>

             <div className="flex justify-center">
                <button 
                  onClick={reset}
                  className="flex items-center gap-2 px-6 py-3 text-slate-500 font-bold hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                >
                   <RefreshCcw size={18} /> Yeni Hesaplama Yap
                </button>
             </div>
          </div>
        )}

      </div>
      
      {step < 4 && (
        <div className="text-center mt-6 text-slate-400 text-sm flex items-center justify-center gap-2">
          <Calculator size={14} />
          <span>Hesaplamalar güncel komisyon oranları ve BSMV vergisi dahil edilerek yapılır.</span>
        </div>
      )}
    </div>
  );
};

export default CommissionCalculator;
