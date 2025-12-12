
import React, { useState, useEffect } from 'react';
import BrokerTable from './components/BrokerTable';
import Calculator from './components/Calculator';
import BlogSection from './components/BlogSection';
import ChatAssistant from './components/ChatAssistant';
import MarketTicker from './components/MarketTicker';
import { LEGAL_TEXT } from './constants';

type ViewState = 'HOME' | 'BLOG' | 'CALCULATOR';

// --- UI COMPONENTS ---

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group border border-white/5 bg-[#121212] rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-5 md:p-6 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className={`font-display font-medium text-base md:text-lg transition-colors pr-4 ${isOpen ? 'text-primary' : 'text-gray-200 group-hover:text-white'}`}>
          {question}
        </span>
        <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-primary text-black rotate-180' : 'bg-white/5 text-gray-500 group-hover:bg-white/10'}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </span>
      </button>
      <div className={`transition-[max-height,opacity] duration-500 ease-in-out ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="px-5 pb-5 md:px-6 md:pb-6 text-sm md:text-base text-gray-400 leading-relaxed font-light border-t border-white/5 pt-4">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="group relative bg-[#121212] border border-white/5 rounded-3xl p-6 md:p-8 hover:-translate-y-1 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative z-10">
      <div className="w-12 h-12 md:w-14 md:h-14 bg-[#1a1a1a] rounded-2xl flex items-center justify-center text-primary mb-5 md:mb-6 border border-white/5 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-black/50">
        {icon}
      </div>
      <h3 className="text-white font-bold text-lg md:text-xl mb-2 md:mb-3 font-display">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </div>
  </div>
);

// --- MODERN SIMPLE CONTACT (ONLY EMAIL) ---
const ContactForm: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = "info@hangikurum.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-6 md:p-8 text-center bg-[#0a0a0a] rounded-[2.5rem] relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/5 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 w-full max-w-lg">
            {/* Icon */}
            <div className="flex justify-center mb-6 md:mb-8">
                <div className="relative group">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                    <div className="relative w-20 h-20 md:w-24 md:h-24 bg-[#121212] border border-white/10 rounded-full flex items-center justify-center text-primary shadow-2xl group-hover:scale-105 transition-transform duration-500">
                        <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                </div>
            </div>

            <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Bize Ulaşın</h3>
            <p className="text-gray-400 leading-relaxed mb-8 md:mb-10 font-light text-base md:text-lg">
                Görüşleriniz, önerileriniz veya iş birliği teklifleriniz için bize doğrudan e-posta gönderebilirsiniz.
            </p>

            {/* Email Card */}
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-green-600/50 rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
                
                <button 
                    onClick={handleCopy}
                    className="relative w-full bg-[#151515] hover:bg-[#1a1a1a] border border-white/10 rounded-2xl p-5 md:p-6 flex items-center justify-between transition-all duration-300 group-hover:border-primary/30"
                >
                    <div className="flex items-center gap-4 md:gap-5">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors">
                            <span className="text-lg md:text-xl font-display font-bold">@</span>
                        </div>
                        <div className="text-left">
                            <p className="text-[10px] uppercase text-gray-500 font-bold tracking-widest mb-0.5">E-Posta Adresi</p>
                            <p className="text-lg md:text-2xl text-white font-medium font-display tracking-tight break-all">{email}</p>
                        </div>
                    </div>

                    <div className={`p-2 rounded-lg transition-colors ${copied ? 'text-green-400 bg-green-400/10' : 'text-gray-500 bg-white/5 group-hover:text-white'}`}>
                        {copied ? (
                            <svg className="w-5 h-5 md:w-6 md:h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        ) : (
                            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                        )}
                    </div>
                </button>
                
                <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-bold text-primary transition-all duration-300 ${copied ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                    Adres kopyalandı!
                </div>
            </div>
            
            <div className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-white/5">
                <p className="text-xs text-gray-600">
                    Genellikle <span className="text-gray-400 font-bold">24 saat</span> içinde dönüş yapıyoruz.
                </p>
            </div>
        </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'cookies' | 'contact' | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeModal = () => setActiveModal(null);

  const navigateTo = (view: ViewState) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#0a0a0a] text-gray-100 pb-28 md:pb-0 overflow-x-hidden relative selection:bg-primary selection:text-black">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[150px] opacity-40 animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[150px] opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* Navbar & Ticker */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${isScrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-white/5 py-0' : 'bg-transparent border-transparent py-2'}`}>
        
        {/* Market Ticker */}
        <div className={`transition-all duration-500 overflow-hidden ${isScrolled ? 'h-0 opacity-0' : 'h-[50px] opacity-100'}`}>
           <MarketTicker />
        </div>

        <nav className="py-3 md:py-4">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              
              {/* Logo */}
              <div className="flex items-center cursor-pointer gap-2 md:gap-3 group" onClick={() => navigateTo('HOME')} role="button" aria-label="Ana Sayfaya Git">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-tr from-[#202020] to-[#101010] border border-white/10 rounded-xl flex items-center justify-center font-display font-bold text-lg md:text-xl text-white shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(212,252,121,0.2)] group-hover:border-primary/30 transition-all duration-300">
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">H</span>
                </div>
                <span className="font-display font-bold text-lg md:text-xl tracking-tight text-white group-hover:text-gray-200 transition-colors">
                  Hangi<span className="text-gray-500 group-hover:text-primary transition-colors">Kurum</span>
                </span>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-1 bg-white/5 p-1.5 rounded-full border border-white/5 backdrop-blur-md">
                {[
                  { id: 'HOME', label: 'Ana Sayfa' },
                  { id: 'CALCULATOR', label: 'Komisyon Hesapla' },
                  { id: 'BLOG', label: 'Blog & Analiz' }
                ].map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => navigateTo(item.id as ViewState)}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 relative ${
                      currentView === item.id 
                        ? 'text-black bg-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Contact Button */}
              <div className="hidden md:flex items-center">
                 <button 
                  onClick={() => setActiveModal('contact')} 
                  className="px-6 py-2.5 rounded-xl text-sm font-bold border border-white/10 bg-[#151515] hover:bg-primary hover:text-black hover:border-primary text-white transition-all duration-300 shadow-lg"
                >
                   Bize Ulaşın
                 </button>
              </div>
              
              {/* Mobile Contact Icon */}
               <div className="md:hidden flex items-center">
                 <button 
                  onClick={() => setActiveModal('contact')} 
                  aria-label="İletişim Formunu Aç"
                  className="p-2 rounded-xl text-gray-400 border border-white/10 bg-[#151515]"
                >
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                 </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-[120]">
        <div className="bg-[#121212]/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="flex justify-around items-center h-16">
            <button 
              onClick={() => navigateTo('HOME')} 
              aria-label="Ana Sayfa"
              className={`flex-1 h-full flex flex-col items-center justify-center gap-1 transition-all active:scale-95 ${currentView === 'HOME' ? 'text-primary bg-white/5' : 'text-gray-500'}`}
            >
              <svg className="w-6 h-6" fill={currentView === 'HOME' ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              <span className="text-[10px] font-bold">Ana Sayfa</span>
            </button>
            
            <div className="w-px h-8 bg-white/5"></div>

            <button 
              onClick={() => navigateTo('CALCULATOR')} 
              aria-label="Komisyon Hesaplama"
              className={`flex-1 h-full flex flex-col items-center justify-center gap-1 transition-all active:scale-95 ${currentView === 'CALCULATOR' ? 'text-primary bg-white/5' : 'text-gray-500'}`}
            >
              <svg className="w-6 h-6" fill={currentView === 'CALCULATOR' ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              <span className="text-[10px] font-bold">Hesapla</span>
            </button>

            <div className="w-px h-8 bg-white/5"></div>

            <button 
              onClick={() => navigateTo('BLOG')} 
              aria-label="Blog ve Analizler"
              className={`flex-1 h-full flex flex-col items-center justify-center gap-1 transition-all active:scale-95 ${currentView === 'BLOG' ? 'text-primary bg-white/5' : 'text-gray-500'}`}
            >
              <svg className="w-6 h-6" fill={currentView === 'BLOG' ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
              <span className="text-[10px] font-bold">Blog</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow relative z-10 pt-28 md:pt-48 pb-10 md:pb-20">
        <div key={currentView} className="animate-fade-in-up">
          {currentView === 'HOME' && (
            <>
              {/* Hero Section */}
              <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mb-20 md:mb-48 relative">
                 <div className="flex flex-col items-center text-center relative z-10">
                    
                    <div className="inline-flex items-center gap-3 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs font-bold text-gray-300 mb-8 md:mb-10 backdrop-blur-md shadow-lg animate-fade-in-up">
                       <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                       </span>
                       SPK LİSANSLI ARACI KURUM VERİLERİ
                    </div>

                    <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-8xl leading-[1.05] md:leading-[0.95] tracking-tight mb-6 md:mb-8 text-white max-w-5xl">
                       Hangi kurum <br />
                       <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-700">sana daha uygun?</span>
                    </h1>

                    <p className="text-base md:text-xl text-gray-400 max-w-2xl mb-10 md:mb-12 font-light leading-relaxed px-2">
                       Komisyon oranlarını, işlem maliyetlerini ve öne çıkan özellikleri karşılaştırarak ihtiyacına en uygun kurumu kolayca belirle.
                    </p>

                    <div className="flex flex-col items-center gap-6 w-full relative z-10 px-4">
                       <button 
                          onClick={() => navigateTo('CALCULATOR')}
                          className="group relative w-full sm:w-auto px-10 py-5 bg-white text-black rounded-2xl font-bold text-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_50px_rgba(255,255,255,0.3)] hover:shadow-[0_0_80px_rgba(255,255,255,0.5)]"
                       >
                          {/* Pulsing effect */}
                          <span className="absolute inset-0 rounded-2xl bg-white opacity-20 animate-pulse"></span>
                          <span className="relative">Hemen Maliyetini Hesapla</span>
                          <svg className="w-6 h-6 relative transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                       </button>

                       <button 
                          onClick={() => document.getElementById('compare')?.scrollIntoView({ behavior: 'smooth' })}
                          className="text-gray-400 text-sm font-medium hover:text-white transition-colors flex items-center gap-2 border-b border-transparent hover:border-gray-500 pb-0.5"
                       >
                          veya tüm kurumları incele
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                       </button>
                    </div>

                    {/* NEW BADGES */}
                    <div className="mt-12 flex flex-wrap justify-center gap-4 md:gap-6 animate-fade-in-up animation-delay-500">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                           <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                           <span className="text-[11px] md:text-xs font-bold text-gray-300 tracking-wide uppercase">Bağımsız Karşılaştırma</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                           <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                           <span className="text-[11px] md:text-xs font-bold text-gray-300 tracking-wide uppercase">Güncel ve Şeffaf Veriler</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                           <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                           <span className="text-[11px] md:text-xs font-bold text-gray-300 tracking-wide uppercase">Yatırım Tavsiyesi Değildir</span>
                        </div>
                    </div>

                 </div>
              </div>

              {/* Features / Trust Section */}
              <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mb-24 md:mb-40">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <FeatureCard 
                      icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                      title="%100 Tarafsız Veri"
                      desc="Sponsorlu içeriklerden tamamen arındırılmış, sadece resmi verilerle hazırlanan objektif karşılaştırmalar."
                    />
                    <FeatureCard 
                      icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                      title="Canlı Takip"
                      desc="Kurumların kampanya ve oran değişikliklerini anlık olarak algılayan sistemimizle her zaman en güncel veriye ulaşın."
                    />
                    <FeatureCard 
                      icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
                      title="Gizlilik Odaklı"
                      desc="Hesaplama yaparken kişisel verilerinizi istemiyoruz. Kayıt yok, telefon numarası yok. Tamamen anonim."
                    />
                 </div>
              </div>

              {/* Table Section */}
              <div id="compare" className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mb-24 md:mb-40">
                 <div className="mb-10 md:mb-16 md:text-center">
                    <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-3 md:mb-4 block">Analiz & Karşılaştırma</span>
                    <h2 className="font-display text-3xl md:text-6xl font-bold text-white mb-4 md:mb-6">Piyasanın En İyileri</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg font-light">
                      Sizin için en uygun kurumu bulmak hiç bu kadar kolay olmamıştı. Tüm detaylar tek ekranda.
                    </p>
                 </div>
                 
                 <BrokerTable />
              </div>

              {/* FAQ Section */}
              <div className="max-w-4xl mx-auto px-4 md:px-6 mb-24 md:mb-40">
                  <div className="text-center mb-10 md:mb-16">
                     <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">Aklınıza Takılanlar</h2>
                     <p className="text-gray-400 font-light text-base md:text-lg">Yatırım dünyasına giriş yaparken sıkça sorulan sorular.</p>
                  </div>
                  <div className="space-y-3 md:space-y-4">
                     <FAQItem 
                        question="Aracı kurum seçerken nelere dikkat etmeliyim?"
                        answer="En önemli kriterler komisyon oranları, platformun hızı ve kararlılığı (donma olmaması), müşteri hizmetlerine erişim kolaylığı ve varsa hesap işletim/saklama ücretleridir. Ayrıca kurumun SPK lisanslı olması zorunludur."
                     />
                     <FAQItem 
                        question="Banka mı yoksa aracı kurum mu daha avantajlı?"
                        answer="Bankalar güven ve kolay para transferi sağlarken, aracı kurumlar genellikle çok daha düşük komisyon oranları ve daha profesyonel işlem platformları (Matriks, Foreks vb.) sunar. Sık işlem yapanlar için aracı kurumlar, uzun vadeli yatırımcılar için bankalar tercih edilebilir."
                     />
                     <FAQItem 
                        question="Yabancı borsalardan (Nasdaq, NYSE) nasıl hisse alırım?"
                        answer="Midas, Phillip Capital, Osmanlı Yatırım gibi aracı kurumlar veya bankaların yatırım hesapları üzerinden döviz bakiyesi oluşturarak ABD borsalarından kolayca hisse senedi ve ETF alabilirsiniz."
                     />
                     <FAQItem 
                        question="Sitenizdeki veriler güncel mi?"
                        answer="Evet, verilerimiz kurumların resmi web siteleri ve KAP duyuruları takip edilerek düzenli olarak güncellenmektedir."
                     />
                  </div>
              </div>

              {/* Blog Teaser - Modernized */}
              <div className="py-16 md:py-24 relative overflow-hidden bg-[#121212] border-y border-white/5">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">
                   <div className="max-w-2xl text-center md:text-left">
                     <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Akademi</span>
                     <h2 className="font-display text-3xl md:text-6xl font-bold text-white mb-6 md:mb-8">Finansal Okuryazarlık</h2>
                     <p className="text-gray-400 text-lg md:text-xl mb-8 md:mb-10 leading-relaxed font-light">
                        Piyasa trendleri, vergi mevzuatları ve yatırım stratejileri hakkında derinlemesine analizler ve uzman görüşleri.
                     </p>
                     <button 
                       onClick={() => navigateTo('BLOG')}
                       className="px-8 py-3 md:px-10 md:py-4 rounded-2xl bg-white text-black hover:bg-gray-200 transition-all duration-300 font-bold text-base shadow-xl shadow-white/5"
                     >
                       Makaleleri İncele
                     </button>
                   </div>
                   
                   {/* Abstract Visual */}
                   <div className="hidden md:block relative w-[450px] h-[350px]">
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#1a1a1a] to-[#222] rounded-[2.5rem] border border-white/5 transform rotate-3 transition-transform duration-700 hover:rotate-0 shadow-2xl"></div>
                      <div className="absolute inset-0 bg-[#151515] rounded-[2.5rem] border border-white/5 transform -rotate-3 transition-transform duration-700 hover:rotate-0 flex items-center justify-center overflow-hidden">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/20 rounded-full blur-3xl"></div>
                          <div className="relative z-10 text-center">
                              <div className="text-5xl mb-4">📚</div>
                              <p className="text-white font-display font-bold text-2xl">15+</p>
                              <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Uzman Makalesi</p>
                          </div>
                      </div>
                   </div>
                </div>
              </div>
            </>
          )}

          {currentView === 'CALCULATOR' && (
             <div className="max-w-5xl mx-auto px-4 md:px-6 mb-20 animate-fade-in-up">
                <div className="text-center mb-10 md:mb-16">
                   <h2 className="font-display text-3xl md:text-6xl font-bold text-white mb-4 md:mb-6">Ne Kadar Ödeyeceksiniz?</h2>
                   <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-light">İşlem hacminize göre gerçek maliyetlerinizi hesaplayın, gizli ücretleri görün.</p>
                </div>
                <Calculator />
             </div>
          )}

          {currentView === 'BLOG' && (
             <div className="max-w-7xl mx-auto px-4 md:px-6 mb-20 animate-fade-in-up">
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="font-display text-3xl md:text-6xl font-bold text-white mb-4 md:mb-6">Finans Kütüphanesi</h2>
                    <p className="text-gray-400 text-base md:text-lg font-light">Uzman analizleri ve güncel piyasa raporları.</p>
                </div>
                <BlogSection />
             </div>
          )}
        </div>
      </main>

      {/* Modern Footer */}
      <footer className="border-t border-white/5 bg-[#050505] pt-16 md:pt-24 pb-12 relative z-10">
         <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
               
               {/* Brand Column */}
               <div className="lg:col-span-1 space-y-6 md:space-y-8">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-[#151515] border border-white/10 rounded-xl flex items-center justify-center font-bold text-white font-display text-xl">H</div>
                     <span className="font-bold text-xl text-white tracking-tight">HangiKurum</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">
                     Türkiyenin en kapsamlı ve tarafsız aracı kurum karşılaştırma platformu. Yatırımlarınızda şeffaflık için buradayız.
                  </p>
               </div>

               {/* Links */}
               <div>
                  <h4 className="font-bold text-white mb-6 md:mb-8">Platform</h4>
                  <ul className="space-y-4 text-sm text-gray-500">
                     <li><button onClick={() => navigateTo('HOME')} className="hover:text-primary transition-colors">Karşılaştır</button></li>
                     <li><button onClick={() => navigateTo('CALCULATOR')} className="hover:text-primary transition-colors">Hesaplama Aracı</button></li>
                     <li><button onClick={() => navigateTo('BLOG')} className="hover:text-primary transition-colors">Blog</button></li>
                  </ul>
               </div>

               <div>
                  <h4 className="font-bold text-white mb-6 md:mb-8">Kurumsal</h4>
                  <ul className="space-y-4 text-sm text-gray-500">
                     <li><button onClick={() => setActiveModal('privacy')} className="hover:text-primary transition-colors">Gizlilik Politikası</button></li>
                     <li><button onClick={() => setActiveModal('terms')} className="hover:text-primary transition-colors">Kullanım Koşulları</button></li>
                     <li><button onClick={() => setActiveModal('cookies')} className="hover:text-primary transition-colors">Çerez Politikası</button></li>
                  </ul>
               </div>

               <div>
                  <h4 className="font-bold text-white mb-6 md:mb-8">İletişim</h4>
                  <button 
                    onClick={() => setActiveModal('contact')}
                    className="group flex items-center gap-4 bg-[#151515] p-4 rounded-2xl border border-white/5 hover:border-white/20 hover:bg-[#1a1a1a] transition-all w-full text-left"
                  >
                     <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                     </div>
                     <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Bize Yazın</p>
                        <p className="text-white text-sm font-medium">info@hangikurum.com</p>
                     </div>
                  </button>
               </div>

            </div>

            <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
               <span className="text-xs text-gray-600 font-medium text-center md:text-left">&copy; 2025 HangiKurum Inc. Tüm hakları saklıdır.</span>
            </div>
         </div>
      </footer>

      {/* Chat Assistant */}
      <ChatAssistant />

      {/* Modal Overlay - Improved */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-xl animate-fade-in">
          <div 
            className={`bg-[#121212] border border-white/10 rounded-[2.5rem] w-full flex flex-col shadow-2xl overflow-hidden relative transition-all duration-300 ${
              activeModal === 'contact' ? 'max-w-2xl' : 'max-w-2xl max-h-[85vh]'
            }`}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 md:p-8 border-b border-white/5 bg-[#151515] relative z-20">
              <h3 className="text-xl md:text-2xl font-bold text-white font-display">
                {activeModal === 'privacy' ? 'Gizlilik Politikası' : 
                 activeModal === 'terms' ? 'Kullanım Koşulları' : 
                 activeModal === 'cookies' ? 'Çerez Politikası' : 'İletişim'}
              </h3>
              <button 
                onClick={closeModal} 
                aria-label="Kapat"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            
            {/* Modal Content */}
            <div className={`overflow-y-auto custom-scrollbar relative z-10 ${activeModal === 'contact' ? 'h-full bg-[#121212]' : 'p-6 md:p-10'}`}>
              {activeModal === 'contact' ? (
                <ContactForm />
              ) : (
                <div className="text-sm md:text-base text-gray-400 whitespace-pre-line leading-loose font-light">
                  {activeModal === 'privacy' ? LEGAL_TEXT.privacy : 
                   activeModal === 'terms' ? LEGAL_TEXT.terms : LEGAL_TEXT.cookies}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
