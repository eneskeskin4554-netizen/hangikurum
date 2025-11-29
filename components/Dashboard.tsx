
import React, { useEffect, useState } from 'react';
import { BROKERS, INTERNATIONAL_BROKERS } from '../constants';
import { Trash2, TrendingUp, TrendingDown, Activity, Shield, ArrowRight } from 'lucide-react';
import { Broker, InternationalBroker } from '../types';

interface DashboardProps {
  watchlist: string[];
  onRemoveFromWatchlist: (brokerId: string) => void;
  onNavigateToHome: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ watchlist, onRemoveFromWatchlist, onNavigateToHome }) => {
  // Combine all brokers to find watched ones
  const allBrokers = [...BROKERS, ...INTERNATIONAL_BROKERS];
  const watchedBrokers = allBrokers.filter(b => watchlist.includes(b.id));
  
  // Mock Real-time data state
  const [liveData, setLiveData] = useState<Record<string, { volume: number, change: number }>>({});

  useEffect(() => {
    // Initial data
    const initialData: any = {};
    watchedBrokers.forEach(b => {
      initialData[b.id] = {
        volume: Math.floor(Math.random() * 10000000) + 500000,
        change: (Math.random() * 4) - 2
      };
    });
    setLiveData(initialData);

    // Simulate live updates
    const interval = setInterval(() => {
      setLiveData(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(key => {
          if (next[key]) {
             next[key] = {
              volume: next[key].volume + Math.floor(Math.random() * 50000),
              change: next[key].change + (Math.random() * 0.2) - 0.1
            };
          }
        });
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [watchlist]); 

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Takip Listem</h1>
        <p className="text-slate-500">İlgilendiğiniz aracı kurumların anlık durumlarını buradan izleyebilirsiniz.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Watchlist Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Activity className="text-blue-600" size={20} />
              Canlı Takip
            </h2>
          </div>

          {watchedBrokers.length > 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-4">Kurum</th>
                      <th className="px-6 py-4 text-right">Anlık Hacim (TL)</th>
                      <th className="px-6 py-4 text-right">Günlük Değişim</th>
                      <th className="px-6 py-4 text-center">Komisyon</th>
                      <th className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {watchedBrokers.map(broker => {
                      const data = liveData[broker.id] || { volume: 0, change: 0 };
                      const isPositive = data.change >= 0;
                      // Type guard check for commission display
                      const commissionDisplay = (broker as any).commissionRate;
                      const isGlobal = (broker as InternationalBroker).custodyFee !== undefined;

                      return (
                        <tr key={broker.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs ${broker.logoColor}`}>
                                {broker.name.substring(0, 2).toUpperCase()}
                              </div>
                              <span className="font-medium text-slate-900">{broker.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right font-mono text-slate-700">
                            {data.volume.toLocaleString('tr-TR')}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className={`inline-flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                              {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                              <span className="font-bold">{Math.abs(data.change).toFixed(2)}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-600">
                              {isGlobal ? commissionDisplay : `Onbinde ${commissionDisplay}`}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button 
                              onClick={() => onRemoveFromWatchlist(broker.id)}
                              className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                              title="Listeden Çıkar"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-dashed border-slate-300 p-10 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-slate-300" size={32} />
              </div>
              <h3 className="text-slate-900 font-medium mb-1">Takip listeniz boş</h3>
              <p className="text-slate-500 text-sm mb-4">Ana sayfadan ilgilendiğiniz aracı kurumları ekleyerek anlık verilerini buradan takip edebilirsiniz.</p>
              <button 
                onClick={onNavigateToHome}
                className="inline-flex items-center gap-2 text-blue-600 font-medium hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors"
              >
                Kurumları İncele <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-green-500" />
              Piyasa Özeti
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                <span className="text-slate-600 text-sm">BIST 100</span>
                <span className="font-bold text-green-600">+1.45%</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                <span className="text-slate-600 text-sm">USD/TRY</span>
                <span className="font-bold text-slate-800">34.20</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                <span className="text-slate-600 text-sm">Altın (Gr)</span>
                <span className="font-bold text-slate-800">2.950</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 text-white shadow-lg">
            <h3 className="font-bold mb-4">Günün Öne Çıkanları</h3>
            <div className="space-y-3">
              {[
                { name: 'THYAO', val: '+2.1%' },
                { name: 'ASELS', val: '+1.8%' },
                { name: 'GARAN', val: '-0.5%' }
              ].map(stock => (
                <div key={stock.name} className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                  <span className="font-bold text-slate-200">{stock.name}</span>
                  <span className={`${stock.val.startsWith('+') ? 'text-green-400' : 'text-red-400'} text-sm font-medium`}>{stock.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
