import React from 'react';
import { X, Shield, FileText, Cookie } from 'lucide-react';
import { LAST_UPDATED } from '../constants';

export type LegalDocType = 'terms' | 'privacy' | 'cookies' | null;

interface LegalModalProps {
  type: LegalDocType;
  onClose: () => void;
}

const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const getContent = () => {
    switch (type) {
      case 'terms':
        return {
          title: 'Kullanım Koşulları',
          icon: <FileText className="text-blue-500" size={24} />,
          content: (
            <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
              <p><strong>1. Giriş</strong><br />HangiKurum ("Platform"), kullanıcılarına Türkiye'de ve dünyada faaliyet gösteren aracı kurumların komisyon oranlarını, hizmetlerini ve özelliklerini karşılaştırma imkanı sunan bir bilgi platformudur. Siteye erişim sağlayan herkes bu koşulları kabul etmiş sayılır.</p>
              
              <p><strong>2. Yatırım Tavsiyesi Değildir</strong><br />Bu sitede yer alan hiçbir veri, bilgi, grafik veya analiz <strong>Yatırım Tavsiyesi</strong> niteliğinde değildir. Platform sadece halka açık verileri derleyerek karşılaştırma sunar. Yatırım kararları, kişilerin kendi risk algılarına ve mali durumlarına göre, yetkili yatırım danışmanları eşliğinde verilmelidir.</p>
              
              <p><strong>3. Veri Doğruluğu ve Sorumluluk Reddi</strong><br />Platformdaki veriler (komisyon oranları, puanlar, ücretler) kurumların resmi web siteleri, KAP bildirimleri ve genel piyasa araştırmaları sonucunda elde edilmiştir. Veriler en son <strong>{LAST_UPDATED}</strong> tarihinde güncellenmiştir. Ancak aracı kurumlar, önceden haber vermeksizin tarifelerinde değişiklik yapabilir. HangiKurum, verilerin güncelliği veya doğruluğu konusunda garanti vermez ve oluşabilecek zararlardan sorumlu tutulamaz.</p>
              
              <p><strong>4. Fikri Mülkiyet</strong><br />Site tasarımı, yazılım kodları, veritabanı yapısı ve oluşturulan özgün içerikler HangiKurum mülkiyetindedir. İzinsiz kopyalanması, başka mecralarda yayınlanması yasaktır.</p>
              
              <p><strong>5. Değişiklik Hakkı</strong><br />Platform, işbu kullanım koşullarını dilediği zaman güncelleme hakkını saklı tutar.</p>
            </div>
          )
        };
      case 'privacy':
        return {
          title: 'Gizlilik Politikası',
          icon: <Shield className="text-green-500" size={24} />,
          content: (
            <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
              <p><strong>1. Veri Toplama Yöntemleri</strong><br />HangiKurum, kullanıcılarından üyelik zorunluluğu istemez. Platformu kullanırken ad, soyad veya telefon numarası gibi kişisel verileriniz (İletişim Formu doldurmadığınız sürece) sunucularımızda saklanmaz.</p>
              
              <p><strong>2. İletişim Formu</strong><br />"İletişim" bölümünden bize e-posta gönderdiğinizde veya form doldurduğunuzda paylaştığınız e-posta adresi, yalnızca size yanıt vermek amacıyla kullanılır ve üçüncü taraflarla paylaşılmaz.</p>
              
              <p><strong>3. Yerel Depolama (LocalStorage)</strong><br />Sitedeki "Favoriler" veya "İzleme Listesi" özellikleri için tarayıcınızın Yerel Depolama (LocalStorage) alanı kullanılır. Bu veriler sadece sizin cihazınızda tutulur ve tarafımızca erişilemez.</p>
              
              <p><strong>4. Üçüncü Taraf Bağlantılar</strong><br />Sitemizden aracı kurumların resmi web sitelerine yönlendirme yapılmaktadır. Bu sitelerin gizlilik politikalarından HangiKurum sorumlu değildir.</p>
            </div>
          )
        };
      case 'cookies':
        return {
          title: 'Çerez Politikası',
          icon: <Cookie className="text-amber-500" size={24} />,
          content: (
            <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
              <p><strong>1. Çerez Nedir?</strong><br />Çerezler (Cookies), ziyaret ettiğiniz web siteleri tarafından tarayıcınız aracılığıyla cihazınıza veya ağ sunucusuna depolanan küçük metin dosyalarıdır.</p>
              
              <p><strong>2. Hangi Çerezleri Kullanıyoruz?</strong><br />
              - <strong>Zorunlu Çerezler:</strong> Sitenin düzgün çalışması için gereklidir.<br />
              - <strong>İşlevsel Çerezler:</strong> Tercihlerinizi (örn: Seçtiğiniz piyasa tipi, sıralama tercihleri) hatırlamak için kullanılır.<br />
              - <strong>Analitik Çerezler:</strong> Site trafiğini analiz etmek ve kullanıcı deneyimini iyileştirmek için anonim veriler toplayabiliriz.</p>
              
              <p><strong>3. Çerezleri Nasıl Yönetebilirsiniz?</strong><br />Tarayıcınızın ayarlar kısmından çerezleri dilediğiniz zaman silebilir veya engelleyebilirsiniz. Ancak çerezleri devre dışı bırakmak sitenin bazı fonksiyonlarının çalışmamasına neden olabilir.</p>
            </div>
          )
        };
      default:
        return null;
    }
  };

  const data = getContent();
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-slate-50 border-b border-slate-100 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100">
              {data.icon}
            </div>
            <h2 className="text-lg font-bold text-slate-900">{data.title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar">
          {data.content}
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
          >
            Anladım
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;