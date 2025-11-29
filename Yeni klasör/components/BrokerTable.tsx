
import React from 'react';
import { Broker, InternationalBroker, CryptoExchange, FeeType } from '../types';
import { Info, ExternalLink, ArrowRight, ChevronRight, PieChart, Layers, ArrowLeftRight, Coins } from 'lucide-react';

interface BrokerTableProps {
  brokers: (Broker | InternationalBroker | CryptoExchange)[];
  onViewDetail: (broker: Broker | InternationalBroker | CryptoExchange) => void;
  marketType: 'bist' | 'global' | 'crypto';
}

const BrokerTable: React.FC<BrokerTableProps> = ({ brokers, onViewDetail, marketType }) => {
  const getCommissionHeader = () => {
    switch(marketType) {
      case 'bist': return 'Komisyon (Hisse / VİOP)';
      case 'global': return 'Komisyon';
      case 'crypto': return 'Komisyon (Maker / Taker)';
    }
  };

  const getThirdColumnHeader = () => {
     switch(marketType) {
      case 'bist': return 'Bakım/Saklama';
      case 'global': return 'Saklama Ücreti';
      case 'crypto': return 'Coin Sayısı';
    }
  };

  const getFourthColumnHeader = () => {
    switch(marketType) {
      case 'bist': return 'Canlı Veri';
      case 'global': return 'Min. Komisyon';
      case 'crypto': return 'Piyasa'; // Placeholder, maybe features or volume? let's stick to empty or status
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm bg-white">
      <table className="w-full text-left text-sm text-slate-600">
        <thead className="bg-slate-50/80 text-xs uppercase text-slate-400 font-bold border-b border-slate-200">
          <tr>
            <th className="px-6 py-5">Kurum & Özellikler</th>
            <th className="px-6 py-5 text-center w-56">
              {getCommissionHeader()}
            </th>
            <th className="px-6 py-5 text-center">
              {getThirdColumnHeader()}
            </th>
            {marketType !== 'crypto' && (
              <th className="px-6 py-5 text-center">
                 {getFourthColumnHeader()}
              </th>
            )}
            <th className="px-6 py-5 text-center">Puan</th>
            <th className="px-6 py-5"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {brokers.map((broker) => {
            const isGlobal = marketType === 'global';
            const isCrypto = marketType === 'crypto';
            const accountUrl = (broker as any).accountOpenUrl;
            const tags = (broker as any).tags || [];
            const Icon = broker.icon;
            const logoUrl = broker.logoUrl;
            
            return (
              <tr key={broker.id} className="hover:bg-blue-50/30 transition-colors group cursor-pointer" onClick={() => onViewDetail(broker)}>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-5">
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
                        {Icon ? <Icon size={32} className="opacity-90" /> : broker.name.substring(0, 2).toUpperCase()}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-lg">{broker.name}</span>
                        {accountUrl && (
                          <a 
                            href={accountUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-slate-300 hover:text-blue-600 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {tags.slice(0, 2).map((tag: string, idx: number) => (
                          <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200 font-bold">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-center">
                    {isGlobal ? (
                      <span className="inline-block px-3 py-1.5 rounded-lg text-sm font-bold bg-purple-50 text-purple-700 border border-purple-100">
                        {(broker as any).commissionRate}
                      </span>
                    ) : isCrypto ? (
                       <div className="flex flex-col gap-1.5 items-center">
                         <div className="flex items-center justify-between gap-3 w-full max-w-[140px] bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100/50">
                           <div className="flex items-center gap-1.5">
                              <span className="text-[10px] uppercase text-slate-500 font-bold">Maker</span>
                           </div>
                           <span className="text-sm font-bold text-indigo-700">{(broker as any).commissionRate.maker}</span>
                         </div>
                         <div className="flex items-center justify-between gap-3 w-full max-w-[140px] bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/50">
                           <div className="flex items-center gap-1.5">
                              <span className="text-[10px] uppercase text-slate-500 font-bold">Taker</span>
                           </div>
                           <span className="text-sm font-bold text-slate-700">{(broker as any).commissionRate.taker}</span>
                         </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-1.5 items-center">
                         <div className="flex items-center justify-between gap-3 w-full max-w-[130px] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                           <div className="flex items-center gap-1.5">
                              <PieChart size={14} className="text-blue-500" />
                              <span className="text-[10px] uppercase text-slate-500 font-bold">Hisse</span>
                           </div>
                           <span className="text-sm font-bold text-blue-700">{(broker as any).commissionRate.share}</span>
                         </div>
                         <div className="flex items-center justify-between gap-3 w-full max-w-[130px] bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                           <div className="flex items-center gap-1.5">
                              <Layers size={14} className="text-emerald-500" />
                              <span className="text-[10px] uppercase text-slate-500 font-bold">VİOP</span>
                           </div>
                           <span className={`text-sm font-bold ${(broker as any).commissionRate.viop === 0 ? 'text-slate-400' : 'text-emerald-700'}`}>
                             {(broker as any).commissionRate.viop === 0 ? '-' : (broker as any).commissionRate.viop}
                           </span>
                         </div>
                         <span className="text-[9px] text-slate-400 font-medium">onbinde oranlar</span>
                      </div>
                    )}
                </td>
                <td className="px-6 py-5 text-center">
                  {isGlobal ? (
                    <span className="text-slate-700 font-medium bg-slate-50 px-2 py-1 rounded border border-slate-100">{(broker as any).custodyFee}</span>
                  ) : isCrypto ? (
                    <div className="inline-flex items-center gap-1.5 bg-yellow-50 px-3 py-1.5 rounded-lg border border-yellow-100 text-yellow-800">
                       <Coins size={14} className="text-yellow-600" />
                       <span className="font-bold text-sm">{(broker as any).coinCount}+ Coin</span>
                    </div>
                  ) : (
                    (broker as any).accountFee === 'Ücretsiz' ? (
                      <span className="text-green-700 font-bold bg-green-50 px-2 py-1 rounded-lg text-xs border border-green-100">Ücretsiz</span>
                    ) : (broker as any).accountFee === 'Sadece MKK' ? (
                      <span className="text-slate-600 font-medium text-xs bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">Sadece MKK</span>
                    ) : (
                      <span className="text-amber-700 font-bold text-xs bg-amber-50 px-2 py-1 rounded-lg border border-amber-100">{(broker as any).accountFee}</span>
                    )
                  )}
                </td>
                {!isCrypto && (
                  <td className="px-6 py-5 text-center">
                    {isGlobal ? (
                      <span className="text-slate-700 font-bold text-sm">{(broker as any).minCommission}</span>
                    ) : (
                      <span className={`font-bold text-sm ${
                        (broker as any).liveData === FeeType.FREE ? 'text-green-600' : 'text-slate-600'
                      }`}>
                        {(broker as any).liveData}
                      </span>
                    )}
                  </td>
                )}
                <td className="px-6 py-5 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <div className="relative w-10 h-10 flex items-center justify-center bg-slate-50 rounded-full border border-slate-100">
                       <span className="text-xs font-bold text-slate-800">{broker.mobileAppScore}</span>
                       <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="text-slate-200"
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
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-right">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewDetail(broker);
                    }}
                    className="w-9 h-9 rounded-full bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-400 transition-all flex items-center justify-center ml-auto"
                  >
                    <ChevronRight size={20} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BrokerTable;
