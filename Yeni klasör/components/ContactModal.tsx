
import React, { useState } from 'react';
import { X, Mail, Send, CheckCircle2, Copy, MessageSquare, AlertCircle } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  
  // Form State
  const [subject, setSubject] = useState('Genel Bilgi');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('info@hangikurum.com');
      setCopied(true);
      setCopyError(false);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
      setCopyError(true);
      setTimeout(() => setCopyError(false), 3000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link
    const email = 'info@hangikurum.com';
    const emailSubject = encodeURIComponent(`HangiKurum İletişim: ${subject}`);
    const emailBody = encodeURIComponent(message);
    
    // Open default mail client
    window.location.href = `mailto:${email}?subject=${emailSubject}&body=${emailBody}`;
    
    // Optional: Close modal after a short delay
    setTimeout(() => {
      onClose();
      setMessage(''); // Reset form
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
             <h2 className="text-xl font-bold flex items-center gap-2">
               <MessageSquare className="text-blue-400" size={24} />
               Bize Ulaşın
             </h2>
             <p className="text-slate-400 text-sm mt-1">Görüş, öneri ve iş birlikleri için.</p>
          </div>
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors z-20"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {/* Email Display Card */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex items-center justify-between group">
             <div className="flex items-center gap-3">
               <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                 <Mail size={20} />
               </div>
               <div>
                 <p className="text-xs text-blue-600 font-bold uppercase tracking-wide">E-Posta Adresimiz</p>
                 <p className="text-slate-900 font-medium select-all">info@hangikurum.com</p>
               </div>
             </div>
             <button 
               onClick={handleCopy}
               className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all relative"
               title={copyError ? "Kopyalanamadı" : "Kopyala"}
             >
               {copied ? (
                 <CheckCircle2 size={18} className="text-green-500" />
               ) : copyError ? (
                 <AlertCircle size={18} className="text-red-500" />
               ) : (
                 <Copy size={18} />
               )}
             </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Konu</label>
              <select 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-600 bg-white"
              >
                <option value="Genel Bilgi">Genel Bilgi</option>
                <option value="Reklam & İş Birliği">Reklam & İş Birliği</option>
                <option value="Hata Bildirimi">Hata Bildirimi</option>
                <option value="Diğer">Diğer</option>
              </select>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Mesajınız</label>
              <textarea 
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 placeholder-slate-400 resize-none"
                placeholder="Size nasıl yardımcı olabiliriz?"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-slate-900 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-slate-200"
            >
              Mesaj Gönder <Send size={16} />
            </button>
            <p className="text-xs text-center text-slate-400 mt-2">
              (E-posta uygulamanızı otomatik olarak açar)
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
