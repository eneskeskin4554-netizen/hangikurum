
import React, { useState, useEffect } from 'react';
import { Broker } from '../types';
import { Calculator, RefreshCw, ArrowRight, Percent, Building2, Wallet, Layers, AlertCircle, ArrowDown, RotateCcw } from 'lucide-react';

interface CommissionCalculatorProps {
  brokers: Broker[];
}

const CommissionCalculator: React.FC<CommissionCalculatorProps> = ({ brokers }) => {
  const [amount, setAmount] = useState<number>(10000); // Default 10,000 TL
  const [rate, setRate] = useState<number>(15); // Default 15 onbinde
  const [minComm, setMinComm] = useState<number>(0); // Minimum commission amount
  const [selectedBrokerId, setSelectedBrokerId] = useState<string>('');
  const [transactionType, setTransactionType] = useState<'share' | 'viop'>('share');
  
  const [results, setResults] = useState({
    commission: 0,
    bsmv: 0,
    totalFee: 0,
    netBuy: 0,
    netSell: 0,
    isMinApplied: false
  });

  // Update rates when Broker or Transaction Type changes
  useEffect(() => {
    if (selectedBrokerId) {
      const broker = brokers.find(b => b.id === selectedBrokerId);
      if (broker) {
        const newRate = transactionType === 'share' ? broker.commissionRate.share : broker.commissionRate.viop;
        setRate(newRate);
        setMinComm(broker.minCommission);
      }
    }
  }, [transactionType, selectedBrokerId, brokers]);

  const handleBrokerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const brokerId = e.target.value;
    setSelectedBrokerId(brokerId);
    
    if (brokerId) {
      const broker = brokers.find(b => b.id === brokerId);
      if (broker) {
        setRate(transactionType === 'share' ? broker.commissionRate.share : broker.commissionRate.viop);
        setMinComm(broker.minCommission);
      }
    } else {
      // Reset min commission if switching to custom but keep rate for manual edit
      setMinComm(0);
    }
  };

  const handleReset = () => {
    setAmount(10000);
    setRate(15);
    setMinComm(0);
    setSelectedBrokerId('');
    setTransactionType('share');
  };

  useEffect(() => {
    // Safety check for NaN
    const safeAmount = isNaN(amount) ? 0 : amount;
    const safeRate = isNaN(rate) ? 0 : rate;
    const safeMinComm = isNaN(minComm) ? 0 : minComm;

    const rawCommission = safeAmount * (safeRate / 10000);
    
    let finalCommission = rawCommission;
    let isMinApplied = false;

    // Apply minimum commission logic
    // We assume if rate is 0 (free), min commission doesn't apply
    if (safeRate > 0 && finalCommission < safeMinComm) {
      finalCommission = safeMinComm;
      isMinApplied = true;
    }

    const bsmv = finalCommission * 0.05;
    const totalFee = finalCommission + bsmv;

    setResults({
      commission: finalCommission,
      bsmv,
      totalFee,
      netBuy: safeAmount + totalFee, // Cost to buy
      netSell: safeAmount - totalFee, // Money received after sell
      isMinApplied
    });
  }, [amount, rate, minComm]);

  // Sort brokers safely without mutating original array
  const sortedBrokers = [...brokers].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 animate-fade-in">
      <div className="flex justify-end mb-4 md:hidden">
         <button 
            onClick={handleReset}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 font-medium"
          >
            <RotateCcw size={14} /> Sıfırla
          </button>
      </div>
      
      <div className="text-center mb-10 relative">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
            <Calculator size={32} />
          </div>
          Komisyon Hesaplama Aracı
        </h1>
        <p className="text-slate-500 mt-2 max-w-2xl mx-auto">
          İşlem hacminize ve aracı kurumunuzun oranlarına göre ödeyeceğiniz net komisyonu, BSMV vergisini ve minimum komisyon farklarını hesaplayın.
        </p>
        
        <button 
          onClick={handleReset}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-sm"
        >
          <RotateCcw size={14} /> Sıfırla
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Section */}
        <div className="lg:col-span-7 bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-100 p-5 flex justify-between items-center">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              <Layers size={18} className="text-blue-500" />
              İşlem Parametreleri
            </h2>
            <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
              <button
                onClick={() => setTransactionType('share')}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${transactionType === 'share' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                Hisse
              </button>
              <button
                onClick={() => setTransactionType('viop')}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${transactionType === 'viop' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                VİOP
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Broker Selection */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Building2 size={16} />
                Aracı Kurum
              </label>
              <select
                value={selectedBrokerId}
                onChange={handleBrokerChange}
                className="block w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 hover:bg-white cursor-pointer outline-none text-slate-700 font-medium"
              >
                <option value="">-- Özel Oran Gir (Manuel) --</option>
                {sortedBrokers.map(broker => {
                   const r = transactionType === 'share' ? broker.commissionRate.share : broker.commissionRate.viop;
                   return (
                    <option key={broker.id} value={broker.id}>
                      {broker.name} — {r === 0 ? 'Komisyonsuz' : `Onbinde ${r}`}
                    </option>
                   );
                })}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Rate Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Percent size={16} />
                  Komisyon Oranı (Onbinde)
                </label>
                <div className={`relative group ${selectedBrokerId ? 'opacity-75' : ''}`}>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={rate}
                    onChange={(e) => {
                      setRate(Number(e.target.value));
                      if (selectedBrokerId) setSelectedBrokerId('');
                    }}
                    disabled={!!selectedBrokerId}
                    className="block w-full pl-4 pr-12 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all font-mono text-lg font-semibold disabled:bg-slate-50"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold bg-slate-100 px-1.5 py-0.5 rounded">
                    ‱
                  </div>
                </div>
              </div>

               {/* Min Commission Input */}
               <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <ArrowDown size={16} />
                  Min. Komisyon (TL)
                </label>
                <div className={`relative ${selectedBrokerId ? 'opacity-75' : ''}`}>
                  <input
                    type="number"
                    min="0"
                    value={minComm}
                    onChange={(e) => {
                      setMinComm(Number(e.target.value));
                      if (selectedBrokerId) setSelectedBrokerId('');
                    }}
                    disabled={!!selectedBrokerId}
                    className="block w-full pl-4 pr-12 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all font-mono text-lg font-semibold disabled:bg-slate-50"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">TL</span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 my-2"></div>

            {/* Amount Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Wallet size={18} className="text-emerald-600" />
                İşlem Tutarı
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="block w-full pl-4 pr-16 py-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono text-2xl font-bold text-slate-900 shadow-sm"
                  placeholder="0.00"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">TL</span>
              </div>
              <div className="flex gap-2 mt-2 overflow-x-auto pb-2 custom-scrollbar">
                {[1000, 5000, 10000, 50000, 100000, 500000].map(val => (
                  <button
                    key={val}
                    onClick={() => setAmount(val)}
                    className="flex-shrink-0 text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 font-medium px-3 py-1.5 rounded-lg transition-colors border border-slate-200"
                  >
                    {val.toLocaleString()} TL
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 rounded-2xl shadow-xl text-white overflow-hidden relative">
            {/* Background Decoration */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            
            <div className="p-6 relative z-10">
              <div className="text-center mb-8">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Toplam Maliyet (Komisyon + Vergi)</p>
                <div className="flex items-center justify-center gap-1">
                   <span className="text-4xl md:text-5xl font-black tracking-tighter">
                     ₺{results.totalFee.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                   </span>
                </div>
              </div>

              <div className="space-y-3 bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Saf Komisyon</span>
                  <span className="font-mono font-medium">₺{results.commission.toFixed(2)}</span>
                </div>
                
                {results.isMinApplied && (
                  <div className="flex items-center gap-2 text-xs text-amber-400 bg-amber-400/10 p-2 rounded-lg border border-amber-400/20">
                    <AlertCircle size={14} />
                    <span>Minimum komisyon ({minComm} TL) uygulandı.</span>
                  </div>
                )}
                
                {rate === 0 && selectedBrokerId && (
                  <div className="flex items-center gap-2 text-xs text-green-400 bg-green-400/10 p-2 rounded-lg border border-green-400/20">
                    <AlertCircle size={14} />
                    <span>Komisyonsuz işlem (VİOP aktif olmayabilir).</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-slate-300">BSMV (%5)</span>
                  </div>
                  <span className="font-mono font-medium text-slate-300">₺{results.bsmv.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-white/10 pt-3 flex justify-between items-center font-bold text-white">
                  <span>Toplam Kesinti</span>
                  <span>₺{results.totalFee.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Net Impact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
               <div className="flex items-center gap-2 mb-2">
                 <div className="w-2 h-2 rounded-full bg-green-500"></div>
                 <span className="text-xs font-bold text-slate-500 uppercase">Alırken Ödeyeceğin</span>
               </div>
               <p className="font-mono text-lg font-bold text-slate-800">
                 ₺{results.netBuy.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
               </p>
               <p className="text-[10px] text-slate-400 mt-1">İşlem + Maliyet</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
               <div className="flex items-center gap-2 mb-2">
                 <div className="w-2 h-2 rounded-full bg-red-500"></div>
                 <span className="text-xs font-bold text-slate-500 uppercase">Satarken Geçecek</span>
               </div>
               <p className="font-mono text-lg font-bold text-slate-800">
                 ₺{results.netSell.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
               </p>
               <p className="text-[10px] text-slate-400 mt-1">İşlem - Maliyet</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5">
              <RefreshCw size={12} />
              Hesaplamalar anlık ve tahmini verilerdir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommissionCalculator;
