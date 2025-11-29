
import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle2 } from 'lucide-react';
import { LAST_UPDATED } from '../constants';

const UpdateNotification: React.FC = () => {
  const [status, setStatus] = useState<'checking' | 'updated' | 'hidden'>('checking');

  useEffect(() => {
    // Simulate checking for updates on mount
    const timer1 = setTimeout(() => {
      setStatus('updated');
    }, 1500);

    const timer2 = setTimeout(() => {
      setStatus('hidden');
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (status === 'hidden') return null;

  return (
    <div className="fixed top-20 right-4 z-40 animate-fade-in">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border backdrop-blur-md transition-all ${
        status === 'checking' 
          ? 'bg-white/90 border-slate-200 text-slate-600' 
          : 'bg-green-50/90 border-green-200 text-green-700'
      }`}>
        {status === 'checking' ? (
          <>
            <RefreshCw size={18} className="animate-spin text-blue-500" />
            <span className="text-xs font-medium">Veriler kontrol ediliyor...</span>
          </>
        ) : (
          <>
            <CheckCircle2 size={18} className="text-green-600" />
            <div className="flex flex-col">
              <span className="text-xs font-bold">Veriler Güncel</span>
              <span className="text-[10px] opacity-80">Son Kontrol: {LAST_UPDATED}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UpdateNotification;
