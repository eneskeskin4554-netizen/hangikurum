
import React from 'react';
import { Broker, InternationalBroker, CryptoExchange, FeeType } from '../types';
import { X, Globe, Star, CheckCircle2, ExternalLink, ShieldCheck, Zap, Wallet, Building2, PieChart, Layers, ArrowLeftRight, Coins, AlertCircle } from 'lucide-react';
import { LAST_UPDATED } from '../constants';

interface BrokerDetailModalProps {
  broker: Broker | InternationalBroker | CryptoExchange | null;
  onClose: () => void;
}

const BrokerDetailModal: React.FC<BrokerDetailModalProps> = ({ broker, onClose }) => {
  if (!broker) return null;

  const isGlobal = (b: any): b is InternationalBroker => b.custodyFee !== undefined;
  const isCrypto = (b: any): b is CryptoExchange => b.coinCount !== undefined;

  const isGlobalBroker = isGlobal(broker);
  const isCryptoBroker = isCrypto(broker);
  const Icon = broker.icon;
  const logoUrl = broker.logoUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-8 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div className="flex items-center gap-6">
            <div className={`w-32 h-32 rounded-3xl flex-shrink-0 flex items-center justify-center bg-white border border-slate-100 shadow-lg overflow-hidden`}>
              {logoUrl ? (
                <img 
                  src={logoUrl} 
                  alt={`${broker.name} Logo`} 
                  className="w-full h-full object-contain p-3"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div className={`w-full h-full flex items-center justify-center ${logoUrl ? 'hidden' : ''} ${broker.logoColor} text-white font-bold text-xl`}>
                {Icon ? <Icon size={64} className="opacity-90" /> : broker.name.substring(0, 2).toUpperCase()}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3 tracking-tight">
                {broker.name}
                {isGlobalBroker && <Globe size={24} className="text-blue-500" />}
                {isCryptoBroker && <ArrowLeftRight size={24} className="text-yellow-500" />}
              </h2>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1.5 bg-yellow-50 px-2 py-0.5 rounded-lg border border-yellow-100 text-yellow-700 font-bold">
                  <Star size={16} className="fill-yellow-500 text-yellow-500" />
                  <span>{broker.mobileAppScore}</span>
                </div>
                <span className="text-slate-300">|</span>
                <span className="text-slate-500 text-sm font-medium">Kullanıcı Puanı</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors bg-white border border-slate-100 shadow-sm"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="p-8 overflow-y-auto custom-scrollbar bg-white">
          <div className="mb-10">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Kurum Hakkında</h3>
            <p className="text-slate-600 leading-relaxed text-base">
              {broker.description}
            </p>
          </div>

          <div className="mb-10">
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
               <Wallet size={16} className="text-blue-500" />
               Komisyon Yapısı
             </h3>
             {isGlobalBroker ? (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-100 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                    <p className="text-sm text-blue-600 font-bold mb-2 uppercase tracking-wide">İşlem Komisyonu</p>
                    <p className="text-4xl font-black text-slate-900 tracking-tight">{(broker as any).commissionRate}</p>
                    <p className="text-sm text-slate-500 mt-2 font-medium">İşlem başına veya oransal ücretlendirme</p>
                </div>
             ) : isCryptoBroker ? (
                <div className="grid grid-cols-2 gap-6">
                   <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 flex flex-col items-center text-center">
                      <div className="bg-white p-2.5 rounded-xl shadow-sm mb-4 text-indigo-500">
                         <span className="font-extrabold text-xs uppercase tracking-wider">Maker</span>
                      </div>
                      <span className="text-4xl font-black text-slate-800 tracking-tight">{(broker as any).commissionRate.maker}</span>
                      <span className="text-xs font-bold text-slate-400 mt-2 uppercase">Piyasa Yapıcı</span>
                   </div>
                   <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 flex flex-col items-center text-center">
                      <div className="bg-white p-2.5 rounded-xl shadow-sm mb-4 text-slate-500">
                         <span className="font-extrabold text-xs uppercase tracking-wider">Taker</span>
                      </div>
                      <span className="text-4xl font-black text-slate-700 tracking-tight">{(broker as any).commissionRate.taker}</span>
                      <span className="text-xs font-bold text-slate-400 mt-2 uppercase">Piyasa Alıcı</span>
                   </div>
                </div>
             ) : (
                <div className="grid grid-cols-2 gap-6">
                   <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex flex-col items-center text-center relative overflow-hidden">
                      <div className="bg-white p-3 rounded-2xl shadow-sm mb-4 text-blue-500">
                         <PieChart size={24} />
                      </div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Hisse Senedi</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-4xl font-black text-slate-800 tracking-tight">{(broker as any).commissionRate.share}</span>
                        <span className="text-sm font-bold text-slate-500">onbinde</span>
                      </div>
                   </div>
                   <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 flex flex-col items-center text-center relative overflow-hidden">
                      <div className="bg-white p-3 rounded-2xl shadow-sm mb-4 text-emerald-500">
                         <Layers size={24} />
                      </div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">VİOP</span>
                      <div className="flex items-baseline gap-1.5">
                         {(broker as any).commissionRate.viop === 0 ? (
                            <span className="text-4xl font-bold text-slate-400">-</span>
                         ) : (
                           <>
                             <span className="text-4xl font-black text-slate-800 tracking-tight">{(broker as any).commissionRate.viop}</span>
                             <span className="text-sm font-bold text-slate-500">onbinde</span>
                           </>
                         )}
                      </div>
                   </div>
                </div>
             )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex flex-col justify-center">
              <div className="flex items-center gap-2.5 text-slate-500 font-bold text-xs uppercase tracking-wide mb-3">
                <Building2 size={16} />
                {isCryptoBroker ? 'Çeşitlilik' : 'Bakım/Saklama'}
              </div>
              <p className="text-xl font-bold text-slate-900 flex items-center gap-2">
                {isGlobalBroker ? (broker as InternationalBroker).custodyFee : 
                 isCryptoBroker ? (
                    <>
                      <Coins size={22} className="text-yellow-500" />
                      {(broker as CryptoExchange).coinCount}+ Kripto Para
                    </>
                 ) : (broker as Broker).accountFee}
              </p>
            </div>

            {!isCryptoBroker && (
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex flex-col justify-center">
                <div className="flex items-center gap-2.5 text-slate-500 font-bold text-xs uppercase tracking-wide mb-3">
                  <Zap size={16} />
                  {isGlobalBroker ? 'Min. Komisyon' : 'Canlı Veri'}
                </div>
                <p className="text-xl font-bold text-slate-900">
                  {isGlobalBroker ? (broker as InternationalBroker).minCommission : (
                    <span className={(broker as Broker).liveData === FeeType.FREE ? 'text-green-600' : ''}>
                      {(broker as Broker).liveData}
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm mb-8">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
              <ShieldCheck size={16} />
              Öne Çıkan Özellikler
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {broker.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3.5 p-3.5 bg-slate-50 rounded-xl border border-slate-100/50">
                  <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                  <span className="text-sm text-slate-700 font-bold">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-3 p-5 bg-amber-50 rounded-2xl text-amber-900 text-xs border border-amber-100/50 leading-relaxed">
             <AlertCircle size={18} className="flex-shrink-0 mt-0.5 text-amber-600" />
             <p>
               <strong>Yasal Uyarı:</strong> Burada yer alan veriler {LAST_UPDATED} tarihinde kontrol edilmiştir. Aracı kurumlar kampanya ve oranları haber vermeksizin değiştirme hakkına sahiptir. Kesin bilgi için lütfen "Hesap Aç" butonu ile kurumun resmi sitesini ziyaret ediniz.
             </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-4">
          <button 
            onClick={onClose}
            className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-200 rounded-xl transition-colors"
          >
            Kapat
          </button>
          {broker.accountOpenUrl && (
            <a 
              href={broker.accountOpenUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-blue-600 transition-colors flex items-center gap-2 shadow-xl shadow-slate-200 hover:shadow-blue-200 hover:-translate-y-0.5 transform duration-200"
            >
              Hesap Aç
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrokerDetailModal;
