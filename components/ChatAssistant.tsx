
import React, { useState, useRef, useEffect } from 'react';
import { BROKERS } from '../constants';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const SUGGESTIONS = [
  "En düşük komisyonlu banka hangisi?",
  "Midas vs İş Bankası farkları?",
  "Kripto için en güvenilir borsa?",
  "Amerikan borsasına nasıl yatırım yaparım?",
  "VİOP teminatları nedir?"
];

const MAX_MESSAGE_LENGTH = 500;

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Selam! 👋 Ben FinBot.\n\nSana platformumuzdaki **güncel ve doğrulanmış** verilere dayanarak yardımcı olabilirim. Aklına takılan bir kurum veya oran var mı?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, isLoading]);

  // Prevent body scroll when chat is open on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    }
  }, [isOpen]);

  const clearChat = () => {
    setMessages([{ role: 'model', text: 'Sohbet temizlendi. Temiz bir sayfa açtık! Nasıl yardımcı olabilirim?' }]);
  };

  const sanitizeInput = (text: string) => {
    // Remove invisible control characters and excessive whitespace
    return text.replace(/[\u0000-\u001F\u007F-\u009F]/g, "").trim();
  };

  const handleSend = async (overrideText?: string) => {
    const rawText = overrideText || input;
    
    // 1. Basic empty check
    if (!rawText.trim() || isLoading) return;

    // 2. Sanitize Input
    const userMessage = sanitizeInput(rawText);

    // 3. Validation
    if (userMessage.length === 0) return;
    
    if (userMessage.length > MAX_MESSAGE_LENGTH) {
        setMessages(prev => [...prev, { role: 'model', text: `⚠️ Mesajınız çok uzun. Lütfen sorunuzu ${MAX_MESSAGE_LENGTH} karakterden kısa tutunuz.` }]);
        return;
    }

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);
    
try {
  const r = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: userMessage,
      context: ""
    })
  });

  const data = await r.json();

  setMessages(prev => [
    ...prev,
    { role: "model", text: data.text || "Cevap alınamadı." }
  ]);
} catch (e) {
  setMessages(prev => [
    ...prev,
    { role: "model", text: "❌ Sunucuya bağlanılamadı." }
  ]);
} finally {
  setIsLoading(false);
}

    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => {
         const newHistory = [...prev];
         if (newHistory[newHistory.length - 1].text === '') {
             newHistory.pop();
         }
         return [...newHistory, { role: 'model', text: 'Bağlantıda küçük bir sorun oluştu. Lütfen tekrar dene. 🔌' }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderMessage = (text: string) => {
    return text.split('\n').map((line, i) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const content = trimmed.substring(2);
        return (
          <div key={i} className="flex items-start gap-2 mb-1 pl-1">
            <span className="mt-1.5 w-1.5 h-1.5 bg-primary rounded-full shrink-0"></span>
            <span className="text-gray-200">
               {parseBold(content)}
            </span>
          </div>
        );
      }
      if (!trimmed) return <div key={i} className="h-2"></div>;
      return (
        <p key={i} className="mb-1 text-gray-200">
          {parseBold(line)}
        </p>
      );
    });
  };

  const parseBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="text-primary font-bold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <>
      {/* 1. Backdrop (Mobile Only, High Z-Index) */}
      <div 
        className={`md:hidden fixed inset-0 bg-black/80 z-[150] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)} 
      />

      {/* 2. Chat Window (Independent Fixed Position, Very High Z-Index) */}
      <div 
        className={`
          fixed z-[160] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          bg-[#0a0a0a] border border-white/10 shadow-2xl flex flex-col
          
          /* Mobile Styles: Full Screen */
          inset-0 w-full h-full rounded-none md:inset-auto
          
          /* Desktop Styles: Bottom Right Box */
          md:bottom-24 md:right-6 md:w-[380px] md:h-[600px] md:rounded-[2rem] md:origin-bottom-right
          
          ${isOpen 
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 scale-90 translate-y-10 pointer-events-none'
          }
        `}
      >
        {/* Header */}
        <div className="bg-[#121212] p-4 border-b border-white/5 flex justify-between items-center shrink-0 pt-safe-top">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-green-600 flex items-center justify-center text-black shadow-lg">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            </div>
            <div>
              <h3 className="font-bold text-white text-base">FinBot</h3>
              <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Çevrimiçi</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
              <button 
                onClick={clearChat}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Temizle"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#0a0a0a]">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
              <div 
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-[#202020] text-white border border-white/10 rounded-br-none' 
                    : 'bg-transparent text-gray-200 rounded-bl-none'
                }`}
              >
                {msg.role === 'model' && idx !== 0 && (
                    <div className="text-[10px] text-primary font-bold mb-1 uppercase tracking-wider">FinBot</div>
                )}
                {renderMessage(msg.text)}
              </div>
            </div>
          ))}

          {isLoading && messages[messages.length - 1]?.role !== 'model' && (
            <div className="flex justify-start animate-fade-in-up">
               <div className="bg-transparent px-4 py-2 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-200"></div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-2" />
        </div>

        {/* Input */}
        <div className="p-4 bg-[#121212] border-t border-white/5 shrink-0 pb-safe-bottom">
          {messages.length < 3 && (
            <div className="flex gap-2 overflow-x-auto pb-3 mb-1 no-scrollbar mask-gradient">
              {SUGGESTIONS.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(sug)}
                  className="whitespace-nowrap px-3 py-1.5 bg-[#1a1a1a] hover:bg-white/10 border border-white/10 rounded-lg text-[11px] font-medium text-gray-400 transition-colors"
                >
                  {sug}
                </button>
              ))}
            </div>
          )}
          
          <div className="relative group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Merak ettiğin nedir?"
              disabled={isLoading}
              maxLength={MAX_MESSAGE_LENGTH}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-3.5 pl-4 pr-12 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
            />
            <button 
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className={`absolute right-1.5 top-1.5 bottom-1.5 w-9 rounded-lg flex items-center justify-center transition-all ${
                  input.trim() && !isLoading ? 'bg-primary text-black hover:bg-white' : 'bg-[#1a1a1a] text-gray-600'
              }`}
            >
              <svg className="w-4 h-4 transform -rotate-45 translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>
          
          <div className="mt-2 text-center md:mb-0 mb-4 flex justify-between items-center px-1">
             <p className="text-[9px] text-gray-600">
               Yatırım tavsiyesi değildir.
             </p>
             <span className={`text-[9px] ${input.length > MAX_MESSAGE_LENGTH * 0.9 ? 'text-red-500' : 'text-gray-700'}`}>
                {input.length}/{MAX_MESSAGE_LENGTH}
             </span>
          </div>
        </div>
      </div>

      {/* 3. Floating Toggle Button (Independent Fixed Position) */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 right-4 md:bottom-8 md:right-6 z-[140] w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group flex items-center justify-center ${isOpen ? 'hidden' : 'flex'}`}
      >
        <div className="absolute inset-0 rounded-full bg-primary blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
        <div className="relative w-full h-full rounded-full bg-[#121212] border border-white/10 flex items-center justify-center overflow-hidden">
             <svg className="w-7 h-7 text-primary relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
             <span className="absolute top-3.5 right-3.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary border border-black"></span>
             </span>
        </div>
      </button>
    </>
  );
};

export default ChatAssistant;
