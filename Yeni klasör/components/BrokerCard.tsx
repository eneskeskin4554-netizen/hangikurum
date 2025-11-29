
import React from 'react';
import { Broker, InternationalBroker, CryptoExchange, FeeType } from '../types';
import { CheckCircle2, Globe, ExternalLink, PieChart, Layers, Coins } from 'lucide-react';

interface BrokerCardProps {
  broker: Broker | InternationalBroker | CryptoExchange;
  onViewDetail: (broker: Broker | InternationalBroker | CryptoExchange) => void;
  marketType: 'bist' | 'global' | 'crypto';
}

const BrokerCard: React.FC<BrokerCardProps> = ({ broker, onViewDetail, marketType }) => {
  const isGlobal = marketType === 'global';
  const isCrypto = marketType === 'crypto';
  const accountUrl = (broker as any).accountOpenUrl;
  const tags = (broker as any).tags || [];
  const Icon = broker.icon;
  const logoUrl = broker.logoUrl;

  // Helper for tag colors
  const getTagColor = (tag: string) => {
    const colors = [
      'bg-blue-50 text-blue-700 border-blue-100',
      'bg-purple-50 text-purple-700 border-purple-100', 
      'bg-emerald-50 text-emerald-700 border-emerald-100',
      'bg-orange-50 text-orange-700 border-orange-100'
    ];
    return colors[tag.length % colors.length];
  };

  return (
    <div 
      className="group bg-white rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-slate-100 p-6 mb-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
    >
      {/* Top Decoration */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className={`w-20 h-20 rounded-2xl flex-shrink-0 flex items-center justify-center bg-white border border-slate-100 shadow-sm overflow-hidden group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt={`${broker.name} Logo`} 
                className="w-full h-full object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className={`w-full h-full flex items-center justify-center ${logoUrl ? 'hidden' : ''} ${broker.logoColor} text-white font-bold transition-transform duration-500 ease-out group-hover:scale-110`}>
               {Icon ? <Icon size={36} className="opacity-90" /> : broker.name.substring(0, 2).toUpperCase()}
            </div>
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2 group-hover:text-blue-600 transition-colors cursor-pointer leading-tight" onClick={() => onViewDetail(broker)}>
              {broker.name}
              {isGlobal && <Globe size={16} className="text-blue-500" />}
            </h3>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {tags.map((tag: string, idx: number) => (
                <span key={idx} className={`text-[10px] px-2.5 py-1 rounded-lg font-bold border ${getTagColor(tag)}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Circular Score Badge */}
        <div className="flex flex-col items-center">
          <div className="relative w-11 h-11 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="text-yellow-400"
                strokeDasharray={`${(broker.mobileAppScore / 5) * 100}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-slate-800">
              {broker.mobileAppScore}
            </div>
          </div>
        </div>
      </div>
      
      {/* Modern Commission Display */}
      <div className="mb-6 bg-slate-50 rounded-2xl border border-slate-100 p-1.5">
        {isGlobal ? (
           <div className="bg-white rounded-xl p-4 shadow-sm text-center border border-slate-100/50">
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">İşlem Komisyonu</p>
             <p className="text-xl font-black text-blue-600">{(broker as any).commissionRate}</p>
           </div>
        ) : isCrypto ? (
          <div className="flex divide-x divide-slate-200">
            <div className="flex-1 p-3 flex flex-col items-center justify-center bg-white rounded-l-xl shadow-sm border-r border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-500 mb-1">Maker</span>
              <span className="text-xl font-black text-indigo-600">{(broker as any).commissionRate.maker}</span>
            </div>
            <div className="flex-1 p-3 flex flex-col items-center justify-center bg-white rounded-r-xl shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-500 mb-1">Taker</span>
              <span className="text-xl font-black text-slate-700">{(broker as any).commissionRate.taker}</span>
            </div>
          </div>
        ) : (
          <div className="flex divide-x divide-slate-200">
            <div className="flex-1 p-3 flex flex-col items-center justify-center bg-white rounded-l-xl shadow-sm border-r border-slate-100">
              <div className="flex items-center gap-1.5 mb-1">
                <PieChart size={14} className="text-blue-500" />
                <span className="text-[10px] uppercase font-bold text-slate-500">Hisse</span>
              </div>
              <div className="flex items-baseline gap-0.5">
                <span className="text-2xl font-black text-slate-900">{(broker as any).commissionRate.share}</span>
                <span className="text-[9px] text-slate-400 font-bold ml-0.5">onbinde</span>
              </div>
            </div>
            
            <div className="flex-1 p-3 flex flex-col items-center justify-center bg-white rounded-r-xl shadow-sm">
              <div className="flex items-center gap-1.5 mb-1">
                <Layers size={14} className="text-emerald-500" />
                <span className="text-[10px] uppercase font-bold text-slate-500">VİOP</span>
              </div>
              <div className="flex items-baseline gap-0.5">
                {(broker as any).commissionRate.viop === 0 ? (
                  <span className="text-lg font-bold text-slate-400">-</span>
                ) : (
                  <>
                    <span className="text-2xl font-black text-emerald-600">{(broker as any).commissionRate.viop}</span>
                    <span className="text-[9px] text-slate-400 font-bold ml-0.5">onbinde</span>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mb-5 px-1">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
             {isCrypto ? 'Çeşitlilik' : 'Bakım/Saklama'}
          </p>
          {isGlobal ? (
             <p className="text-xs font-semibold text-slate-700">{(broker as any).custodyFee}</p>
           ) : isCrypto ? (
             <div className="flex items-center gap-1.5 bg-yellow-50 px-2.5 py-1 rounded-lg border border-yellow-100">
                <Coins size={14} className="text-yellow-600" />
                <p className="text-xs font-bold text-yellow-800">{(broker as any).coinCount}+ Coin</p>
             </div>
           ) : (
             <p className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${(broker as any).accountFee === 'Ücretsiz' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-slate-50 text-slate-700 border-slate-100'}`}>
               {(broker as any).accountFee}
             </p>
           )}
      </div>

      <div className="space-y-3 mb-6 px-1">
        {broker.features.slice(0, 3).map((feature, i) => (
          <div key={i} className="flex items-center gap-3 text-xs text-slate-600 group/item">
            <CheckCircle2 size={14} className="text-blue-500 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
            <span className="font-medium">{feature}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mt-auto pt-2 border-t border-slate-50">
        <button 
          onClick={() => onViewDetail(broker)}
          className="flex-1 py-3 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 text-sm font-bold rounded-xl transition-all shadow-sm"
        >
          İncele
        </button>
        {accountUrl && (
          <a 
            href={accountUrl}
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 py-3 bg-slate-900 hover:bg-blue-600 text-white text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 group/btn shadow-lg shadow-slate-200 hover:shadow-blue-200"
          >
            Hesap Aç <ExternalLink size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
          </a>
        )}
      </div>
    </div>
  );
};

export default BrokerCard;
