
import { Broker, BlogPostExtended } from './types';

// Use unavatar.io as the primary reliable source.
const getLogo = (domain: string) => `https://unavatar.io/${domain}`;

export const BROKERS: Broker[] = [
  // --- YENİ NESİL / MODERN ---
  {
    id: 'midas',
    name: 'Midas',
    description: 'Amerikan borsalarının kapısını aralayın. Canlı veriye ücret ödemeden, parça hisse özelliğiyle bütçenize göre yatırım yapın.',
    logoUrl: getLogo('getmidas.com'),
    type: 'Brokerage',
    supportedMarkets: ['BIST', 'FOREIGN'],
    bistCommission: 0, // 0 Komisyon
    viopCommission: undefined,
    minBistCommission: 3.90,
    foreignCommission: 1.5, // Fixed $1.5
    foreignMin: 1.5,
    accountFee: 'Ücretsiz',
    pros: ['Ücretsiz Canlı Veri', 'Parça Hisse Alımı', 'Sabit 1.5$ ABD Komisyonu'],
    url: 'https://www.getmidas.com',
    appScore: 4.9
  },
  // --- BANKALAR ---
  {
    id: 'isyatirim',
    name: 'İş Yatırım',
    description: 'Türkiye\'nin lider aracı kurumu. TradeMaster terminali ve sektörün en kapsamlı araştırma raporlarıyla profesyonellerin tercihi.',
    logoUrl: getLogo('isbank.com.tr'),
    type: 'Bank',
    supportedMarkets: ['BIST', 'VIOP', 'FOREIGN'],
    bistCommission: 0.002, // Onbinde 20
    viopCommission: 0.0005,
    minBistCommission: 1,
    foreignCommission: 0.0025,
    foreignMin: 25,
    accountFee: 'MKK Ücretleri',
    pros: ['TradeMaster Terminali', 'Derinlikli Analiz Raporları', 'Pazar Lideri Güveni'],
    url: 'https://www.isyatirim.com.tr',
    appScore: 4.5
  },
  {
    id: 'garanti',
    name: 'Garanti BBVA Yatırım',
    description: 'Bankacılık ve yatırımı tek çatı altında birleştirin. e-Trader uygulaması ile piyasaları cebinizden anlık takip edin.',
    logoUrl: getLogo('garantibbva.com.tr'),
    type: 'Bank',
    supportedMarkets: ['BIST', 'VIOP', 'FOREIGN'],
    bistCommission: 0.0019,
    viopCommission: 0.00045,
    minBistCommission: 0,
    foreignCommission: 0.0025,
    foreignMin: 25,
    accountFee: 'Saklama Ücreti',
    pros: ['Entegre Bankacılık', 'Ödüllü Mobil Deneyim', 'Hızlı Emir İletimi'],
    url: 'https://www.garantibbvayatirim.com.tr',
    appScore: 4.6
  },
  {
    id: 'yapikredi',
    name: 'Yapı Kredi Yatırım',
    description: 'Yatırım Dünyam platformu ile kişiye özel model portföyler ve akıllı önerilerle birikimlerinizi yönlendirin.',
    logoUrl: getLogo('yapikredi.com.tr'),
    type: 'Bank',
    supportedMarkets: ['BIST', 'VIOP', 'FOREIGN'],
    bistCommission: 0.002,
    viopCommission: 0.0005,
    minBistCommission: 0,
    foreignCommission: 0.0025,
    foreignMin: 25,
    accountFee: 'MKK + Saklama',
    pros: ['Akıllı Model Portföy', 'TradeBox Algo', 'Kişiselleştirilmiş Öneri'],
    url: 'https://www.ykyatirim.com.tr',
    appScore: 4.4
  },
  {
    id: 'akbank',
    name: 'Ak Yatırım',
    description: 'TradeAll ile sınırları kaldırın. Tek platform üzerinden hem Borsa İstanbul hem de dünya piyasalarında işlem yapın.',
    logoUrl: getLogo('akbank.com'),
    type: 'Bank',
    supportedMarkets: ['BIST', 'VIOP', 'FOREIGN'],
    bistCommission: 0.002,
    viopCommission: 0.0005,
    minBistCommission: 0,
    foreignCommission: 0.0025,
    foreignMin: 25,
    accountFee: 'MKK Ücreti',
    pros: ['Uluslararası Erişim', 'TradeAll Platformu', 'Varant Uzmanlığı'],
    url: 'https://www.akyatirim.com.tr',
    appScore: 4.3
  },
  {
    id: 'ziraat',
    name: 'Ziraat Yatırım',
    description: 'Türkiye\'nin en yaygın şube ağı ve kamu bankası güvencesi. ZBorsa ile her yerden kolay ve güvenli erişim.',
    logoUrl: getLogo('ziraatbank.com.tr'),
    type: 'Bank',
    supportedMarkets: ['BIST', 'VIOP'], 
    bistCommission: 0.002,
    viopCommission: 0.0005,
    minBistCommission: 0,
    foreignCommission: 0.0025,
    foreignMin: 25,
    accountFee: 'MKK',
    pros: ['Kamu Güvencesi', 'En Geniş Şube Ağı', 'Halka Arz Erişimi'],
    url: 'https://www.ziraatyatirim.com.tr',
    appScore: 4.2
  },
  {
    id: 'vakif',
    name: 'Vakıf Yatırım',
    description: 'TradeOnline ile karmaşık finansal verileri sadeleştirin. Uygun kredi faiz oranları ile portföyünüzü büyütün.',
    logoUrl: getLogo('vakifbank.com.tr'),
    type: 'Bank',
    supportedMarkets: ['BIST', 'VIOP'], 
    bistCommission: 0.002,
    viopCommission: 0.0005,
    minBistCommission: 0,
    foreignCommission: 0.0025,
    foreignMin: 25,
    accountFee: 'MKK',
    pros: ['TradeOnline Web/Mobil', 'Avantajlı Kredi Oranı', 'Kamu Gücü'],
    url: 'https://www.vakifyatirim.com.tr',
    appScore: 4.1
  },
  {
    id: 'halk',
    name: 'Halk Yatırım',
    description: 'Halk Trader uygulamasının kullanıcı dostu arayüzü ile piyasayı anlık takip edin, fırsatları kaçırmayın.',
    logoUrl: getLogo('halkbank.com.tr'),
    type: 'Bank',
    supportedMarkets: ['BIST', 'VIOP'], 
    bistCommission: 0.002,
    viopCommission: 0.0005,
    minBistCommission: 0,
    foreignCommission: 0.0025,
    foreignMin: 25,
    accountFee: 'MKK',
    pros: ['Halk Trader App', 'Kolay Arayüz', 'Yatırım Danışmanlığı'],
    url: 'https://www.halkyatirim.com.tr',
    appScore: 4.0
  },
  {
    id: 'deniz',
    name: 'Deniz Yatırım',
    description: 'Algolab ile kod bilmenize gerek yok! Kendi algoritmik işlem stratejilerinizi oluşturun ve robotlara işlem yaptırın.',
    logoUrl: getLogo('denizbank.com'),
    type: 'Bank',
    supportedMarkets: ['BIST', 'VIOP'],
    bistCommission: 0.0015,
    viopCommission: 0.0004,
    minBistCommission: 0,
    foreignCommission: 0.002,
    foreignMin: 20,
    accountFee: 'MKK',
    pros: ['Algolab İle Kodsuz Algo', 'Robo Danışman', 'DenizTrader'],
    url: 'https://www.denizyatirim.com',
    appScore: 4.5
  },
  {
    id: 'qnb',
    name: 'QNB Finansinvest',
    description: 'Global bankacılık vizyonu, yerel piyasa tecrübesi. Modern teknoloji altyapısı ve rekabetçi komisyon oranları.',
    logoUrl: getLogo('qnbfinansbank.com'),
    type: 'Bank',
    supportedMarkets: ['BIST', 'VIOP', 'FOREIGN'],
    bistCommission: 0.0015,
    viopCommission: 0.0004,
    minBistCommission: 0,
    foreignCommission: 0.002,
    foreignMin: 20,
    accountFee: 'Yok',
    pros: ['Düşük Komisyon', 'Modern Altyapı', 'Global Partner Ağı'],
    url: 'https://www.qnbfi.com',
    appScore: 4.7
  },
  {
    id: 'teb',
    name: 'TEB Yatırım',
    description: 'BNP Paribas ortaklığının gücüyle global araştırma raporlarına erişin. Prime müşterilere özel ayrıcalıklar.',
    logoUrl: getLogo('teb.com.tr'),
    type: 'Bank',
    supportedMarkets: ['BIST', 'VIOP'],
    bistCommission: 0.002,
    viopCommission: 0.0005,
    minBistCommission: 0,
    foreignCommission: 0.0025,
    foreignMin: 25,
    accountFee: 'MKK',
    pros: ['BNP Paribas Ortaklığı', 'Global Araştırma', 'Prime Hizmetler'],
    url: 'https://www.tebyatirim.com.tr',
    appScore: 4.3
  },
  {
    id: 'burgan',
    name: 'Burgan Yatırım',
    description: 'Butik hizmet anlayışı. Size özel atanan yatırım uzmanıyla portföyünüzü profesyonelce yönetin.',
    logoUrl: getLogo('burgan.com.tr'),
    type: 'Bank',
    supportedMarkets: ['BIST', 'VIOP', 'FOREIGN'],
    bistCommission: 0.0015,
    viopCommission: 0.0004,
    minBistCommission: 0,
    foreignCommission: 0.002,
    foreignMin: 20,
    accountFee: 'MKK',
    pros: ['Kişisel Yatırım Uzmanı', 'Butik Hizmet', 'TradeMaster'],
    url: 'https://www.burganyatirim.com.tr',
    appScore: 4.4
  },
  
  // --- ARACI KURUMLAR ---
  {
    id: 'osmanli',
    name: 'Osmanlı Yatırım',
    description: 'Aktif traderların tercihi. Hacminize göre ücretsiz Matriks/Foreks veri terminali ve gelişmiş emir tipleri.',
    logoUrl: getLogo('osmanlimenkul.com.tr'),
    type: 'Brokerage',
    supportedMarkets: ['BIST', 'VIOP', 'FOREIGN'],
    bistCommission: 0.000375, // Onbinde 3.75
    viopCommission: 0.00015,
    minBistCommission: 0,
    foreignCommission: 0.002,
    foreignMin: 2, // $2
    accountFee: 'Yok',
    pros: ['Ücretsiz Veri Terminali', 'Gelişmiş Emir Tipleri', 'Aktif Trader İndirimi'],
    url: 'https://www.osmanlimenkul.com.tr',
    appScore: 4.8
  },
  {
    id: 'phillip',
    name: 'Phillip Capital',
    description: 'Singapur merkezli finans devi. MetaTrader 5 desteği ile VİOP ve FX işlemlerinde global standart.',
    logoUrl: 'https://unavatar.io/twitter/PhillipCapital',
    type: 'Brokerage',
    supportedMarkets: ['BIST', 'VIOP', 'FOREIGN'],
    bistCommission: 0.0004,
    viopCommission: 0.0002,
    minBistCommission: 0,
    foreignCommission: 0.002,
    foreignMin: 10,
    accountFee: 'Yok',
    pros: ['MetaTrader 5 Desteği', 'Global Likidite', 'Profesyonel Türev İşlemler'],
    url: 'https://www.phillipcapital.com.tr',
    appScore: 4.6
  },
  {
    id: 'info',
    name: 'İnfo Yatırım',
    description: 'Dakikalar içinde görüntülü görüşmeyle hesap açın. Geniş irtibat ofisi ağı ve güçlü FX altyapısı.',
    logoUrl: 'https://unavatar.io/twitter/infoyatirim',
    type: 'Brokerage',
    supportedMarkets: ['BIST', 'VIOP', 'FOREIGN'],
    bistCommission: 0.0004,
    viopCommission: 0.0002,
    minBistCommission: 0,
    foreignCommission: 0.002,
    foreignMin: 15,
    accountFee: 'MKK',
    pros: ['Hızlı Hesap Açılışı', 'Geniş Ofis Ağı', 'Güçlü FX Altyapısı'],
    url: 'https://www.infoyatirim.com.tr',
    appScore: 4.5
  },
  {
    id: 'gedik',
    name: 'Gedik Yatırım',
    description: 'Halka arz piyasasının lideri. Gedik Trader ile hızlı işlem ve köklü piyasa tecrübesi.',
    logoUrl: getLogo('gedik.com'),
    type: 'Brokerage',
    supportedMarkets: ['BIST', 'VIOP', 'FOREIGN'],
    bistCommission: 0.0009,
    viopCommission: 0.0003,
    minBistCommission: 0,
    foreignCommission: 0.0025,
    foreignMin: 25,
    accountFee: 'MKK',
    pros: ['Halka Arz Lideri', 'Gedik Trader', 'Köklü Deneyim'],
    url: 'https://www.gedik.com',
    appScore: 4.4
  },
  {
    id: 'tacirler',
    name: 'Tacirler Yatırım',
    description: 'Yüksek hacimli işlemler ve büyük portföyler için özel bankacılık tadında hizmet ve derinlikli piyasa analizi.',
    logoUrl: getLogo('tacirler.com.tr'),
    type: 'Brokerage',
    supportedMarkets: ['BIST', 'VIOP'],
    bistCommission: 0.0005,
    viopCommission: 0.0003,
    minBistCommission: 0,
    foreignCommission: 0.0025,
    foreignMin: 25,
    accountFee: 'MKK',
    pros: ['Özel Portföy Yönetimi', 'Yüksek Likidite', 'Deneyimli Kadro'],
    url: 'https://www.tacirler.com.tr',
    appScore: 4.3
  },
  {
    id: 'a1capital',
    name: 'A1 Capital',
    description: '"Hisset" uygulaması ile piyasa nabzını tutun. Düşük masraflar ve teknoloji odaklı hızlı emir iletimi.',
    logoUrl: getLogo('a1capital.com.tr'),
    type: 'Brokerage',
    supportedMarkets: ['BIST', 'VIOP'],
    bistCommission: 0.0005,
    viopCommission: 0.0002,
    minBistCommission: 0,
    foreignCommission: 0.0025,
    foreignMin: 25,
    accountFee: 'Yok',
    pros: ['Hisset Uygulaması', 'Düşük Masraf', 'Hızlı Teknoloji'],
    url: 'https://www.a1capital.com.tr',
    appScore: 4.2
  },
  {
    id: 'global',
    name: 'Global Menkul',
    description: 'Türkiye\'nin en büyük bağımsız aracı kurumu. Global vizyon ve kurumsal finansman tecrübesi.',
    logoUrl: getLogo('global.com.tr'),
    type: 'Brokerage',
    supportedMarkets: ['BIST', 'VIOP'],
    bistCommission: 0.001,
    viopCommission: 0.0003,
    minBistCommission: 0,
    foreignCommission: 0.0025,
    foreignMin: 25,
    accountFee: 'MKK',
    pros: ['Bağımsız Lider', 'Kurumsal Finansman', 'Stratejik Analiz'],
    url: 'https://www.global.com.tr',
    appScore: 4.1
  },
  {
    id: 'trive',
    name: 'Trive Yatırım',
    description: 'Ezber bozan hizmet: Komisyonsuz kredi imkanı! Yeni nesil, modern ve süper hızlı işlem platformu.',
    logoUrl: getLogo('trive.com.tr'),
    type: 'Brokerage',
    supportedMarkets: ['BIST', 'VIOP', 'FOREIGN'],
    bistCommission: 0.0004,
    viopCommission: 0.0001,
    minBistCommission: 0,
    foreignCommission: 0.002,
    foreignMin: 15,
    accountFee: 'Ücretsiz',
    pros: ['Komisyonsuz Kredi', 'Yeni Nesil Arayüz', 'Süper Hızlı Emir'],
    url: 'https://www.trive.com.tr',
    appScore: 4.7
  },
  {
    id: 'integral',
    name: 'İntegral Yatırım',
    description: 'Forex piyasasının öncüsü. Yatırımcı eğitimleri ve analiz portalı ile bilinçli yatırımın adresi.',
    logoUrl: getLogo('integralyatirim.com.tr'),
    type: 'Brokerage',
    supportedMarkets: ['BIST', 'VIOP'],
    bistCommission: 0.0005,
    viopCommission: 0.0003,
    minBistCommission: 0,
    foreignCommission: 0.0025,
    foreignMin: 25,
    accountFee: 'MKK',
    pros: ['Forex Lideri', 'Kapsamlı Eğitimler', 'Analiz Portalı'],
    url: 'https://www.integralyatirim.com.tr',
    appScore: 4.3
  },
  {
    id: 'oyak',
    name: 'Oyak Yatırım',
    description: 'OYAK Grubu\'nun sarsılmaz gücü. Kurumsal yapısı ve güvenilirliği ile uzun vadeli yatırımcılar için güvenli liman.',
    logoUrl: getLogo('oyakyatirim.com.tr'),
    type: 'Brokerage',
    supportedMarkets: ['BIST', 'VIOP'],
    bistCommission: 0.0015,
    viopCommission: 0.0004,
    minBistCommission: 0,
    foreignCommission: 0.0025,
    foreignMin: 25,
    accountFee: 'MKK',
    pros: ['OYAK Grubu Güvencesi', 'Kurumsal Yapı', 'Güvenilir Liman'],
    url: 'https://www.oyakyatirim.com.tr',
    appScore: 4.4
  },
  {
    id: 'yatirimfinansman',
    name: 'Yatırım Finansman',
    description: 'Türkiye\'nin ilk aracı kurumu. Tarihten gelen tecrübe ve güçlü sermaye yapısı ile güven veriyor.',
    logoUrl: getLogo('yf.com.tr'),
    type: 'Brokerage',
    supportedMarkets: ['BIST', 'VIOP'],
    bistCommission: 0.0015,
    viopCommission: 0.0004,
    minBistCommission: 0,
    foreignCommission: 0.0025,
    foreignMin: 25,
    accountFee: 'MKK',
    pros: ['Türkiye’nin İlk Aracı Kurumu', 'Güçlü Sermaye', 'Köklü Tecrübe'],
    url: 'https://www.yf.com.tr',
    appScore: 4.5
  },

  // --- KRİPTO BORSALARI ---
  {
    id: 'binance_tr',
    name: 'Binance TR',
    description: 'Dünyanın en büyük borsası Binance\'in gücüyle, Türkiye\'de bankalarla entegre, hızlı ve güvenli kripto işlemleri.',
    logoUrl: getLogo('binance.com'), 
    type: 'CryptoExchange',
    supportedMarkets: ['CRYPTO'],
    cryptoMaker: 0.001, // 0.1%
    cryptoTaker: 0.001, // 0.1%
    accountFee: 'Ücretsiz',
    pros: ['Global Likidite Gücü', 'SAFU Fonu Güvencesi', '7/24 Türk Lirası Çekim'],
    url: 'https://www.trbinance.com',
    appScore: 4.9
  },
  {
    id: 'btcturk',
    name: 'BtcTurk | Pro',
    description: 'Türkiye\'nin ilk Bitcoin borsası. 7/24 canlı destek ve kesintisiz altyapı ile yerli yatırımcının güven noktası.',
    logoUrl: getLogo('btcturk.com'),
    type: 'CryptoExchange',
    supportedMarkets: ['CRYPTO'],
    cryptoMaker: 0.0005, // 0.05%
    cryptoTaker: 0.0009, // 0.09%
    accountFee: 'Ücretsiz',
    pros: ['Türkiye\'nin İlk Borsası', '7/24 Canlı Destek', 'Hızlı Banka Transferi'],
    url: 'https://pro.btcturk.com',
    appScore: 4.7
  },
  {
    id: 'paribu',
    name: 'Paribu',
    description: 'En çok kullanıcısı olan yerli platform. Taraftar tokenları (Fan Token) ve kolay arayüzü ile kitlelerin tercihi.',
    logoUrl: getLogo('paribu.com'),
    type: 'CryptoExchange',
    supportedMarkets: ['CRYPTO'],
    cryptoMaker: 0.0025, // 0.25%
    cryptoTaker: 0.0035, // 0.35%
    accountFee: 'Ücretsiz',
    pros: ['En Çok Kullanılan Yerli', 'Fan Token Çeşitliliği', 'Kolay Mobil Arayüz'],
    url: 'https://www.paribu.com',
    appScore: 4.5
  },
  {
    id: 'gateio',
    name: 'Gate.io TR',
    description: 'Yeni çıkan coinleri (Gem) ilk burada bulun. Startup projeleri ve en geniş kripto para çeşitliliği.',
    logoUrl: getLogo('gate.io'),
    type: 'CryptoExchange',
    supportedMarkets: ['CRYPTO'],
    cryptoMaker: 0.001,
    cryptoTaker: 0.001,
    accountFee: 'Ücretsiz',
    pros: ['1700+ Coin Çeşitliliği', 'Startup / Ön Satışlar', 'Erken Erişim Fırsatları'],
    url: 'https://www.gate.com.tr',
    appScore: 4.6
  },
  {
    id: 'okx_tr',
    name: 'OKX TR',
    description: 'Web3 dünyasına açılan kapı. Profesyonel traderlar için gelişmiş grafik araçları ve Web3 cüzdan entegrasyonu.',
    logoUrl: getLogo('okx.com'),
    type: 'CryptoExchange',
    supportedMarkets: ['CRYPTO'],
    cryptoMaker: 0.0008,
    cryptoTaker: 0.001,
    accountFee: 'Ücretsiz',
    pros: ['Web3 Cüzdan Entegrasyonu', 'Rezerv Kanıtı (PoR)', 'Gelişmiş Grafik Araçları'],
    url: 'https://tr.okx.com',
    appScore: 4.8
  }
];

export const BLOG_POSTS: BlogPostExtended[] = [
  {
    id: 1,
    title: "Borsa İstanbul'da Yeni Dönem: 2025 İçin Sektörel Rotasyon Başladı",
    excerpt: "Enflasyonla mücadelede sona yaklaşılırken, BIST 100'de kartlar yeniden dağıtılıyor. Faiz indirim döngüsü öncesi hangi sektörler radarda?",
    category: "Borsa & Hisse",
    date: "14 Ekim 2025",
    imageUrl: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&q=80&w=1200",
    readTime: "9 dk",
    author: {
      name: "Ahmet Yılmaz",
      role: "Kıdemli Analist",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100"
    },
    content: `2025'in son çeyreğine girerken Borsa İstanbul'da (BIST 100) beklenen "Büyük Rotasyon"un etkileri netleşmeye başladı. Merkez Bankası'nın sıkı para politikasının sonuçları ve yıl sonu enflasyon hedeflerine yaklaşılmasıyla, yatırımcıların risk algısı tamamen değişiyor.

### Neden Rotasyon?
2025 başlarında "Defansif" kalan yatırımcılar, şimdi yıl sonu rallisine hazırlık olarak "Büyüme" odaklı hisselere geçiş yapıyor. Yüksek faiz nedeniyle baskılanan sanayi şirketleri, faiz indirim döngüsünün başlamasıyla yeniden potansiyel vadediyor.

### 1. Sanayi Devlerinin Dönüşü
Geçtiğimiz yıl finansman maliyetleri altında ezilen sanayi devleri için 2025 sonu, bir toparlanma dönemi olacak.
*   **İhracat Odaklı Şirketler:** Global piyasalardaki toparlanma ve Euro/Dolar paritesindeki denge, özellikle Avrupa'ya ihracat yapan otomotiv ve beyaz eşya sektörlerini destekleyecek.
*   **Enerji Maliyetleri:** Enerji fiyatlarındaki stabilizasyon, kar marjlarını olumlu etkilemeye başladı.

### 2. Teknoloji ve Yazılım: Hala Ucuz Mu?
Global teknoloji rallisine (Nasdaq) kıyasla BIST Teknoloji endeksi (XTEK) hala iskontolu işlem görüyor. Yapay zeka yatırımlarını artıran ve gelirlerinin büyük kısmını döviz bazlı elde eden yazılım şirketleri, 2026 portföylerinin vazgeçilmezi olmaya aday.

### 3. Bankacılık: Kar Realizasyonu Zamanı Mı?
Yılın tartışmasız lideri olan bankacılık sektörü, yabancı girişinin devam etmesiyle gücünü koruyor. Ancak analistler, bankalardan elde edilen karların bir kısmının sanayi ve perakende sektörüne kaydırılmasını (Rebalancing) öneriyor.

> **Analist Notu:** "Endeks Mühendisliği" döneminden, "Hisse Seçiciliği" (Stock Picking) dönemine geçtik. Artık endeksin nereye gittiği değil, hangi şirketin hikayesi olduğu önemli.

### 2025 Yıl Sonu Stratejisi
*   **Nakit Kral Değil, Prens:** Faizler düşmeye başladığında mevduat cazibesini yitirecek. Bu yüzden portföylerde hisse senedi ağırlığı %40'tan %60'a çıkarılmalı.
*   **Altın:** Jeopolitik risklere karşı %20'lik bir altın/gümüş pozisyonu, portföyün sigortası olmaya devam etmeli.
*   **Sabır:** Volatilite 2025'in son günlerinde de bizimle olacak. Panik satışlar yerine, temel analizi sağlam şirketlerde düşüşleri alım fırsatı olarak değerlendirenler kazanacak.`
  },
  {
    id: 2,
    title: "Kripto Paralarda 'Mega Boğa' Döngüsü: 2025 Yıl Sonu Beklentileri",
    excerpt: "Bitcoin ETF'lerinden sonra sıra Ethereum'da mı? Halving sonrası arz şoku fiyatlara nasıl yansıyacak? Altcoin sepeti yaparken dikkat etmeniz gereken RWA ve AI trendleri.",
    category: "Kripto Para",
    date: "12 Ekim 2025",
    imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=1200",
    readTime: "8 dk",
    author: {
      name: "Selin Demir",
      role: "Kripto Araştırmacısı",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
    },
    content: `Kripto para piyasaları, "kurumsal kabul" (institutional adoption) evresini tamamlayarak yeni bir olgunluk seviyesine ulaştı. 2025'in son ayları, spekülatif hareketlerden ziyade, gerçek kullanım alanlarının (utility) fiyatlandığı bir dönem olacak.

### Bitcoin: Arz Şoku Etkisi
2024 Halving'inin etkisi, tarihsel döngülere göre olaydan 6-12 ay sonra hissedilmeye başlanır. Bu da 2025'in son çeyreğini işaret ediyor.
*   **ETF Etkisi:** BlackRock ve Fidelity gibi devlerin günlük Bitcoin alımları, madencilerin günlük üretiminden katbekat fazla. Bu arz-talep dengesizliği, fiyatı yukarı iten en temel matematiksel gerçektir.
*   **Hedef:** Birçok analist, Bitcoin'in bu döngüde 100.000$ - 150.000$ bandını test etmesini bekliyor. Ancak kar realizasyonları için kademeli satış stratejisi uygulanmalı.

### RWA (Gerçek Dünya Varlıkları): Trilyon Dolarlık Pazar
2025'in en büyük hikayesi "Tokenizasyon" oldu. Gayrimenkul, devlet tahvilleri, hatta sanat eserlerinin blokzincir üzerine taşınması, RWA projelerini öne çıkarıyor.
*   **Öne Çıkanlar:** Chainlink (LINK), Maker (MKR) ve Ondo Finance gibi projeler, geleneksel finans ile DeFi arasındaki köprüyü kuruyor. Bu coinler, sadece spekülasyon değil, gerçek bir nakit akışı ve değer önerisi sunuyor.

### Yapay Zeka (AI) Coinleri
OpenAI ve NVIDIA'nın yükselişi, kripto tarafında da karşılık buluyor. Ancak burada "Hype" ile "Teknoloji"yi ayırt etmek lazım.
*   **Render (RNDR) ve Fetch.ai (FET):** Merkeziyetsiz GPU gücü sağlayan veya otonom ajanlar geliştiren bu projeler, AI devriminin altyapı sağlayıcıları olarak portföylerde yer bulabilir.

### Altcoin Sezonu Stratejisi
Bitcoin dominasyonunun %55-60 seviyelerinde doygunluğa ulaşması ve ardından düşüşe geçmesi, sermayenin Ethereum ve diğer altcoinlere akışını başlatacaktır.

> **Pro Tip:** Altcoin alırken projenin "Tokenomics" yapısını inceleyin. Eğer kilit açılımları (Unlock) çok fazlaysa, fiyat baskı altında kalabilir. Dolaşımdaki arzı %80 ve üzeri olan coinleri tercih edin.

**Uyarı:** Memecoin (PEPE, DOGE vb.) yatırımları, portföyün %5'ini geçmemelidir. Bu varlıklar piyango bileti gibidir; tamamen kaybetmeyi göze alabileceğiniz parayla işlem yapılmalıdır.`
  },
  {
    id: 3,
    title: "Temettü Emekliliği Rehberi: 2026 Stratejisi",
    excerpt: "Sadece hisse fiyatına odaklanmayın. Düzenli nakit akışı ile finansal özgürlüğe ulaşmanın matematiği ve önümüzdeki yılın temettü şampiyonu adayları.",
    category: "Temettü",
    date: "08 Ekim 2025",
    imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=1200",
    readTime: "11 dk",
    author: {
      name: "Mehmet Öz",
      role: "Finansal Danışman",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100"
    },
    content: `Temettü emekliliği bir hayal değil, disiplinli bir matematiksel süreçtir. "Bileşik Getiri" (Compound Interest), dünyanın 8. harikası olarak bilinir ve bu stratejinin kalbidir. Peki 2026'ya hazırlanırken bu sistemi nasıl kurmalısınız?

### Temettü Tuzağına (Dividend Trap) Düşmeyin
Sadece "%10 temettü verimi var" diye bir hisse alınmaz. Eğer şirket kar etmediği halde, varlıklarını satarak veya borçlanarak temettü ödüyorsa, bu sürdürülebilir değildir ve hisse fiyatı uzun vadede erir.

**İyi Bir Temettü Şirketinin Özellikleri:**
1.  **Temettü Büyümesi:** Şirket her yıl dağıttığı temettü miktarını enflasyonun üzerinde artırıyor mu?
2.  **Dağıtma Oranı (Payout Ratio):** Net karın %50-70'ini dağıtması sağlıklıdır. %100'ün üzerindeki oranlar tehlike sinyalidir.
3.  **Nakit Akışı:** Şirket temettüyü borçla mı yoksa operasyonel nakit akışıyla mı ödüyor?

### Temettü Yeniden Yatırım Planı (DRIP)
Gelen temettüleri harcamak yerine, aynı hisseye tekrar yatırdığınızda "kar topu etkisi" başlar.
*   **Örnek Senaryo:** Elinizde 1000 lot EREGL var. Hisse başı 5 TL temettü aldınız (Toplam 5000 TL). Bu parayla o günkü fiyattan 100 lot daha alırsınız. Seneye 1100 lot üzerinden temettü alırsınız. 10 yılın sonunda, cebinizden para çıkmadan lot sayınızın 3-4 katına çıktığını göreceksiniz.

### 2026'nın Güçlü Adayları
*   **Enerjisa (ENJSA):** Regüle piyasada, öngörülebilir nakit akışı ve yüksek temettü verimiyle defansif bir kale.
*   **Tüpraş (TUPRS):** Rafineri marjlarındaki dalgalanmalara rağmen, güçlü nakit pozisyonuyla yatırımcısını üzmeyen bir dev.
*   **Tofaş (TOASO):** Stellantis birleşmesi ve yeni model beklentileriyle hem büyüme hem temettü hikayesi barındırıyor.

### Strateji: "Büyüyen Temettü" (Dividend Growth)
Sadece yüksek verim veren değil, karını sürekli büyüten şirketlere odaklanın (Örn: Bim, Migros). Bu şirketlerin temettü verimi düşük (%2-3) gibi görünse de, hisse fiyatı artışı ve temettü miktarındaki yıllık büyüme, toplam getiride (Total Return) diğerlerini geride bırakır.`
  },
  {
    id: 4,
    title: "Yurtdışı Borsalarında Vergi Kabusu Yaşamayın: Yıl Sonu Rehberi",
    excerpt: "ABD borsalarından (Midas, Interactive Brokers vb.) kazanç elde edenler için vergi rehberi. Beyan sınırı, çifte vergilendirme ve istisnalar.",
    category: "Vergi & Mevzuat",
    date: "01 Ekim 2025",
    imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200",
    readTime: "7 dk",
    author: {
      name: "Canan Hukuk",
      role: "Vergi Uzmanı",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100"
    },
    content: `Teknolojinin gelişmesiyle Apple, Tesla, NVIDIA gibi devlere ortak olmak tek tuşla mümkün. Ancak "Vergi" konusu, yatırımcıların en çok ihmal ettiği ve sonrasında en çok baş ağrıtan konudur. Yıl sonu yaklaşırken işlemlerinizi gözden geçirmekte fayda var.

Unutmayın: **Vergilendirme beyan usulüdür ve sorumluluk tamamen size aittir.**

### 1. Alım-Satım Kazancı (Değer Artış Kazancı)
Yurt dışı hisse senedi satışından elde edilen kar, **Gelir Vergisi**ne tabidir. Borsa İstanbul'daki gibi "%0 Stopaj" avantajı burada yoktur.
*   **İstisna Yok:** 1 Dolar bile kar etseniz, beyan etmek zorundasınız.
*   **Hesaplama:** Alış ve satış tarihleri arasındaki TCMB döviz alış kurları esas alınır. Eğer dolar bazında zarar etseniz bile, kur çok arttığı için TL bazında kar etmiş görünebilirsiniz ve vergi ödemeniz gerekebilir.
*   **Enflasyon Düzeltmesi (Yİ-ÜFE):** Eğer hisseyi elinizde tuttuğunuz sürede Yİ-ÜFE (Yurt İçi Üretici Fiyat Endeksi) %10'dan fazla arttıysa, maliyetinizi bu oranda artırarak karınızı (ve verginizi) düşürebilirsiniz. Bu, enflasyonist ortamda yatırımcıyı koruyan en kritik haktır.

### 2. Temettü Gelirleri
ABD, yabancı yatırımcılardan temettü ödemesi sırasında %20-30 oranında stopaj (Withholding Tax) keser.
*   **Çifte Vergilendirmeyi Önleme Anlaşması:** ABD'de ödediğiniz bu vergiyi, Türkiye'de hesaplanan vergiden mahsup edebilirsiniz (düşebilirsiniz).
*   **Beyan Sınırı:** Yıllık gelirler için belirlenen sınır (örneğin 150.000 TL, her yıl değişir) aşılmadığı sürece temettü geliri için beyanname vermenize gerek yoktur. Sınır aşılırsa tamamı beyan edilir.

### 3. Eurobond Kazançları
Eurobond faiz gelirleri (Kupon ödemeleri) de beyana tabidir. Anapara kur farkı kazancı vergiden muaftır (Eğer vadesine kadar beklerseniz). Vadesinden önce satarsanız, kur farkı da vergilendirilir.

> **Önemli Uyarı:** Vergi cezaları, elde edilen karı silebilir. Eğer yıllık işlem hacminiz veya karınız kayda değer seviyedeyse, mutlaka bir Serbest Muhasebeci Mali Müşavir (SMMM) ile çalışın. "Devlet görmez" demeyin, otomatik bilgi paylaşımı anlaşmaları sayesinde mali idareler verilerinize erişebilir.`
  },
  {
    id: 5,
    title: "Halka Arz (IPO) Piyasasında Oyunun Kuralları Değişti",
    excerpt: "Eskisi gibi her halka arz 'Tavan Tavan' gitmiyor. SPK'nın yeni tedbirleri, kurumsal yatırımcı kısıtlamaları ve seçici yatırım stratejisi.",
    category: "Halka Arz",
    date: "28 Eylül 2025",
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=1200",
    readTime: "6 dk",
    author: {
      name: "Ahmet Yılmaz",
      role: "Kıdemli Analist",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100"
    },
    content: `2023 ve 2024'te "Halka arza gir, harçlığını çıkar" dönemi yaşandı. Ancak 2025 genelinde bu furya şekil değiştirdi. Artık izahname okumayan, şirketin ne iş yaptığını bilmeyen yatırımcı için kayıp riski masada.

### Yeni SPK Düzenlemeleri Neyi Amaçlıyor?
*   **Fiyat İstikrarı:** Halka arz sonrası hisse fiyatının ani çöküşlerini engellemek için fiyat istikrarı fonu zorunluluğu sıkılaştırıldı.
*   **Sektörel Filtre:** GYO ve Enerji şirketlerine yönelik onay süreçleri zorlaştırıldı. Artık sadece "projesi olan" değil, "nakit akışı olan" şirketlere öncelik veriliyor.
*   **Fon Kullanım Raporu:** Şirketin halka arz gelirini "borç kapatmak" için mi yoksa "yeni yatırım" için mi kullanacağı en kritik filtre haline geldi. Borç kapatmak için gelen şirketlerden uzak durun.

### Eşit Dağıtımın Sonu Mu?
Milyonlarca katılımcı nedeniyle kişi başına 200-300 TL'lik hisse düşmesi, büyük yatırımcıyı ve fonları piyasadan uzaklaştırdı. SPK'nın kurumsal yatırımcıya daha fazla pay ayırması (Oransal Dağıtım'a dönüş sinyalleri), tahtaların daha dengeli hareket etmesini sağlayacak.

### Halka Arz Kontrol Listesi (Checklist)
Bir halka arza katılmadan önce şu 3 soruya "Evet" demelisiniz:
1.  **Döviz Geliri Var Mı?** Şirket ihracat yapıyor mu? İç pazardaki daralmadan etkilenir mi?
2.  **Sektöründe Lider Mi?** Rekabet avantajı var mı, yoksa sıradan bir oyuncu mu?
3.  **İskonto Oranı Makul Mü?** Halka arz fiyatı, benzer şirketlere (çarpan analizi) göre en az %20 iskontolu mu?

Unutmayın: Halka arz bir "kısa gün karı" değil, "şirkete ortak olma" sürecidir. Uzun vadeli düşünmeyen yatırımcı, ilk tavan bozumunda panikleyip zarar edebilir.`
  },
  {
    id: 6,
    title: "Teknoloji Fonları ve Yapay Zeka: Trendin Neresindeyiz?",
    excerpt: "Sadece NVIDIA değil. Siber güvenlik, bulut bilişim ve yazılım devleri. Yabancı teknoloji fonları (AFT, YAY, AFA) ile bu devrime nasıl ortak olursunuz?",
    category: "Teknoloji",
    date: "25 Eylül 2025",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200",
    readTime: "9 dk",
    author: {
      name: "Deniz Tekin",
      role: "Teknoloji Yazarı",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
    },
    content: `Yapay Zeka (AI), internetin icadından sonraki en büyük verimlilik sıçramasını yaratıyor. Ancak yatırımcılar genellikle sadece donanım üreticilerine (NVIDIA, AMD) odaklanıyor. Oysa asıl değer, bu donanımları kullanarak iş modellerini dönüştüren yazılım şirketlerinde yatıyor.

### 2. Dalga: Yazılım ve Uygulama
İlk dalgada çipler satıldı. Şimdi sıra, bu çipleri kullanarak ürün geliştirenlerde.
*   **Microsoft ve Google:** Bulut (Cloud) altyapılarını AI ile entegre ederek her sektörden şirkete "AI as a Service" satıyorlar. Bu, sürdürülebilir ve yüksek kar marjlı bir gelir modeli.
*   **Siber Güvenlik:** AI, siber saldırıları daha sofistike hale getirdi. Buna karşılık, AI destekli savunma sistemleri geliştiren (Palo Alto, CrowdStrike) şirketlere olan talep patlama yaşıyor. Güvenlik, "olsa iyi olur" değil, "zorunlu" bir harcamadır.

### Türkiye'den Nasıl Yatırım Yapılır? (TEFAS Fonları)
Tek tek hisse seçmek risklidir ve vergi beyanı gerektirir. Ancak TEFAS'taki "Yabancı Teknoloji Fon Sepetleri" bu işi sizin için yapar.
*   **Ak Portföy Yeni Teknolojiler (AFT):** Dünyanın en büyük 20 teknoloji şirketine eşit ağırlıklı yatırım yapar.
*   **Yapı Kredi Yabancı Teknoloji (YAY):** Daha geniş bir yelpazede, yarı iletkenlerden e-ticaret devlerine kadar çeşitlendirilmiş bir portföy sunar.
*   **Vergi Avantajı:** Bu fonların kazançları %10 stopaja tabidir (Mevzuat değişebilir, kontrol edin). Beyanname verme derdi yoktur, vergi kaynağında kesilir ve net getiri cebinize girer.

### Balon Riski Var Mı?
Nasdaq endeksi tarihi zirvelerinde olabilir. Ancak Dot-com krizinden farklı olarak, bugünkü teknoloji devleri devasa "Nakit Akışı" üretiyor. Yani fiyatlar sadece beklentiye değil, gerçek karlılığa dayanıyor. Yine de, portföyünüzün tamamını değil, risk algınıza göre %20-30'unu bu alana ayırmak sağlıklıdır.`
  },
  {
    id: 7,
    title: "Portföy Savaşları: Altın vs Borsa vs Faiz",
    excerpt: "2025'te güvenli liman mı, büyüme mi? Jeopolitik riskler ve faiz indirim döngüsünde en doğru varlık dağılımı (Asset Allocation) nasıl olmalı?",
    category: "Emtia",
    date: "20 Eylül 2025",
    imageUrl: "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80&w=1200",
    readTime: "5 dk",
    author: {
      name: "Mehmet Öz",
      role: "Finansal Danışman",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100"
    },
    content: `Yatırım dünyasının en büyük hatası "Takım tutar gibi yatırım aracı tutmaktır". Sadece altıncı veya sadece borsacı olmak, fırsat maliyeti yaratır. 2025 yıl sonu konjonktürü, "Sepet" yapmayı zorunlu kılıyor.

### Altın: Neden Portföyde Olmalı?
*   **Jeopolitik Sigorta:** Orta Doğu ve Doğu Avrupa'daki gerilimler, altının "güvenli liman" özelliğini canlı tutuyor.
*   **Faiz İndirimleri:** FED ve diğer merkez bankalarının faiz indirimine gitmesi, faiz getirisi olmayan altının (ve gümüşün) cazibesini artırır. Dolar endeksi zayıfladığında, Ons Altın güçlenir.

### Borsa: Enflasyon Üzeri Getiri
Altın paranızın değerini korur, Borsa ise paranızı büyütür. İyi yönetilen şirketler, enflasyonu fiyatlarına yansıtır ve reel büyüme sağlar. Uzun vadede (5+ yıl) borsanın getirisi her zaman emtiaları geçmiştir.

### İdeal Portföy Dağılımı (2025 Son Çeyrek Önerisi)
Risk profilinize göre değişmekle birlikte, "Dengeli" bir yatırımcı için model portföy:
*   **%40 Hisse Senedi (BIST & Yabancı):** Büyüme motoru.
*   **%30 Altın/Emtia:** Kriz sigortası.
*   **%20 Eurobond/Döviz:** Kur koruması ve düzenli nakit akışı.
*   **%10 Nakit/Para Piyasası Fonu:** Borsadaki ani düşüşlerde "dipten alım" fırsatı için kurşun.

Unutmayın: "Nakit kraldır" sözü, kriz anlarında geçerlidir. Her zaman bir miktar nakit (veya hemen nakde dönebilen fon) bulundurmak, psikolojik rahatlık sağlar.`
  },
  {
    id: 8,
    title: "Robo-Danışmanlık: Duyguları İşin İçinden Çıkarın",
    excerpt: "Yatırım kararlarında en büyük düşmanınız kendi psikolojinizdir. FOMO ve panik satışını engelleyen algoritmik sistemler ve robo-danışmanlık hizmetleri.",
    category: "Fintech",
    date: "18 Eylül 2025",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    readTime: "7 dk",
    author: {
      name: "Selin Demir",
      role: "Kripto Araştırmacısı",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
    },
    content: `Borsa yükselirken tepeden alıp, düşerken korkup dipten satmak... Bu klasik yatırımcı davranışının temel sebebi "Duygular"dır. Robo-danışmanlar ve algoritmik işlemler, tam da bu sorunu çözmek için var.

### Robo-Danışman Nasıl Çalışır?
Türkiye'de İş Bankası, Garanti, Akbank ve Midas gibi kurumların sunduğu bu hizmet, size bir anket uygular. Risk toleransınızı (Kayıplara ne kadar dayanabilirsiniz?) ve vade hedefinizi ölçer.
*   **Otomatik Varlık Dağılımı:** Sonuca göre paranızı Hisse, Altın, Tahvil fonları arasında en optimum şekilde böler.
*   **Rebalancing (Yeniden Dengeleme):** Örneğin hisse senetleri çok yükselip portföydeki ağırlığı arttığında, sistem otomatik olarak bir miktar hisse satıp altın alır. Böylece "pahalıyı sat, ucuzu al" prensibini duygusuzca uygular.

### Algoritmik İşlemler (Algo-Trading)
Bu bir üst seviyedir. Matriks, İdeal Data gibi platformlar üzerinde veya Python ile kendi stratejilerinizi kodlayabilirsiniz.
*   **Avantajı:** Hız. Bir insan saniyeler içinde karar verene kadar, botlar milisaniyeler içinde binlerce emri piyasaya iletebilir.
*   **Disiplin:** Stratejiniz "RSI 30'un altına inince al" diyorsa, bot haber akışına bakmaksızın alır. Korkmaz, heyecanlanmaz.

### Gelecek Yapay Zekada
Geleneksel robo-danışmanlar statik kurallara (Modern Portföy Teorisi) dayanır. Yeni nesil "AI Danışmanlar" ise piyasadaki milyonlarca veri noktasını (haberler, sosyal medya, bilanço verileri) analiz edip anlık strateji üretebiliyor. 2025, bu teknolojinin bireysel yatırımcıya indiği yıl oldu.`
  },
  // --- NEW BLOG POSTS ---
  {
    id: 9,
    title: "Sürdürülebilirlik (ESG) Puanı Neden Önemli?",
    excerpt: "Geleceğin şirketleri sadece kar edenler değil, dünyayı kirletmeyenler olacak. ESG puanı yüksek şirketlerin borsa performansı ve fonların ilgisi.",
    category: "Sürdürülebilirlik",
    date: "15 Eylül 2025",
    imageUrl: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&q=80&w=1200",
    readTime: "6 dk",
    author: {
      name: "Zeynep Yeşil",
      role: "ESG Analisti",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100"
    },
    content: `Yatırım dünyasında "Para kazanmak için her yol mübahtır" devri kapandı. Artık fonlar, çevreye zarar veren, çocuk işçi çalıştıran veya yönetim kurulunda şeffaf olmayan şirketlere yatırım yapmıyor. Buna "ESG Kriterleri" (Environmental, Social, Governance) deniyor.

### Neden ESG'ye Yatırım Yapmalı?
Bu bir "sosyal sorumluluk" projesi değil, tamamen "finansal bir karar"dır.
1.  **Ucuz Kredi:** Uluslararası bankalar, ESG skoru yüksek şirketlere daha düşük faizli "Yeşil Tahvil" veya kredi veriyor. Bu da şirketin kar marjını artırıyor.
2.  **Yabancı Fon Girişi:** BlackRock gibi trilyon dolarlık fonlar, portföylerine alacakları şirketlerde ESG filtresi uyguluyor. BIST Sürdürülebilirlik Endeksi'ne giren şirketlerin yabancı takas oranlarının arttığı görülüyor.
3.  **Risk Yönetimi:** Çevreyi kirleten bir şirketin gelecekte yüklü tazminatlar veya karbon vergileriyle karşılaşma riski yüksektir. ESG uyumlu şirketler bu riski minimize eder.

### BIST'te Öne Çıkanlar
Sadece bir etiket değil, iş modelini dönüştüren şirketlere bakın.
*   **Enerji:** Fosil yakıttan yenilenebilir enerjiye (Rüzgar, Güneş) agresif geçiş yapanlar.
*   **Sanayi:** Su ayak izini azaltan, geri dönüşüm (döngüsel ekonomi) yatırımı yapanlar.
Geleceğin "Unicorn"ları, dünyayı tüketerek değil, onararak büyüyen şirketler arasından çıkacak.`
  },
  {
    id: 10,
    title: "Teknik Analiz 101: Çizgilerin Dili",
    excerpt: "Destek, direnç, trend ve indikatörler. Grafikler geleceği söyler mi? Yeni başlayanlar için teknik analizin temelleri ve en sık yapılan hatalar.",
    category: "Eğitim",
    date: "12 Eylül 2025",
    imageUrl: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=1200",
    readTime: "12 dk",
    author: {
      name: "Ahmet Yılmaz",
      role: "Kıdemli Analist",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100"
    },
    content: `Temel analiz "Ne almalı?" sorusuna, teknik analiz ise "Ne zaman almalı?" sorusuna cevap verir. Fiyatlar geçmişte bıraktığı izleri takip etme eğilimindedir. İşte teknik analizin alfabesi:

### 1. Trend Dostunuzdur (Trend is Your Friend)
Fiyatlar rastgele hareket etmez, bir yönü vardır.
*   **Yükselen Trend:** Diplerin sürekli daha yukarıda oluştuğu durumdur. Asla trendin tersine işlem açmayın (Düşen bıçak tutulmaz).
*   **Destek ve Direnç:** Fiyatın düşerken zorlandığı yer "Destek" (Alıcıların geldiği yer), yükselirken takıldığı yer "Direnç"tir (Satıcıların geldiği yer). Bu bölgeler psikolojiktir.

### 2. İndikatörler: Yardımcı Araçlar
*   **RSI (Göreceli Güç Endeksi):** 30'un altı "aşırı satım" (ucuz), 70'in üzeri "aşırı alım" (pahalı) bölgesidir. Ancak güçlü trendlerde RSI günlerce 70 üzerinde kalabilir, tek başına sat sinyali değildir.
*   **Hareketli Ortalamalar (MA):** Fiyatın ortalama yönünü gösterir. 50 günlük ortalamanın 200 günlüğü yukarı kesmesi "Golden Cross" (Altın Kesişim) olarak bilinir ve uzun vadeli boğa piyasası sinyalidir.

### 3. Mum Formasyonları
Grafikteki yeşil ve kırmızı çubuklar, o günkü savaşın hikayesini anlatır.
*   **Doji:** Açılış ve kapanışın aynı olduğu, kararsızlığı gösteren mumdur. Genellikle bir dönüş habercisidir.
*   **Hammer (Çekiç):** Düşüş trendinin dibinde görülen, uzun alt fitilli mumdur. Alıcıların güçlendiğini gösterir.

### En Büyük Hata
Teknik analizi bir "Kahinlik" aracı sanmak. Teknik analiz sadece "olasılıkları" gösterir. %100 çalışacak bir formasyon yoktur. Bu yüzden her zaman **Stop-Loss** (Zarar Kes) seviyeniz önceden belli olmalıdır.`
  },
  {
    id: 11,
    title: "Siber Güvenlik Hisseleri: Dijital Çağın Savunma Sanayisi",
    excerpt: "Her veri ihlali haberi, siber güvenlik şirketlerinin cirosunu artırıyor. Bu sektör neden 'zorunlu büyüme' döngüsünde? Öne çıkan global oyuncular.",
    category: "Teknoloji",
    date: "10 Eylül 2025",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200",
    readTime: "8 dk",
    author: {
      name: "Deniz Tekin",
      role: "Teknoloji Yazarı",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
    },
    content: `Eskiden savaşlar cephede yapılırdı, şimdi sunucularda yapılıyor. Fidye yazılımları (Ransomware), devlet destekli siber saldırılar ve veri sızıntıları, şirketler için milyarlarca dolarlık risk oluşturuyor. Bu yüzden şirketler ekonomik krizde bile "Güvenlik Bütçesi"nden kesinti yapamıyor.

### Neden Yatırım Yapılmalı?
*   **Tekrarlayan Gelirler (SaaS):** Siber güvenlik şirketleri ürünlerini bir kere satmaz, abonelik modeliyle satar. Bu da öngörülebilir ve sürekli artan bir nakit akışı sağlar.
*   **Regülasyon Baskısı:** Devletler (KVKK, GDPR vb.) şirketleri verileri korumaya zorluyor. Uymayanlara dev cezalar kesiliyor. Bu durum, güvenlik yazılımı alımını zorunlu kılıyor.

### Öne Çıkan Şirketler (Nasdaq)
1.  **Palo Alto Networks (PANW):** Donanım ve yazılımı birleştiren, sektörün en büyük ve en köklü oyuncusu.
2.  **CrowdStrike (CRWD):** "Uç Nokta Koruması" (Endpoint Security) alanında lider. Bulut tabanlı yapısı ve yapay zeka desteğiyle rakiplerinden ayrışıyor.
3.  **Fortinet (FTNT):** Özellikle KOBİ pazarında güçlü, maliyet odaklı çözümleriyle yüksek pazar payına sahip.

Bu hisseler genellikle yüksek F/K oranlarıyla (pahalı) işlem görür çünkü büyüme beklentileri çok yüksektir. Düzeltme dönemlerinde (Dip fırsatlarında) portföye eklenmesi gereken uzun vadeli varlıklardır.`
  },
  {
    id: 12,
    title: "Davranışsal Finans: Beynimiz Bize Karşı",
    excerpt: "Kayıptan kaçınma, sürü psikolojisi ve doğrulama yanlılığı. Beynimizin finansal kararlarda bize oynadığı oyunları ve bunlardan kurtulma yollarını keşfedin.",
    category: "Psikoloji",
    date: "08 Eylül 2025",
    imageUrl: "https://images.unsplash.com/photo-1506513080260-e75118ca3baa?auto=format&fit=crop&q=80&w=1200",
    readTime: "10 dk",
    author: {
      name: "Dr. Ayşe Can",
      role: "Psikolog",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100"
    },
    content: `Klasik ekonomi teorisi, insanın "Rasyonel" (Mantıklı) olduğunu varsayar. Ancak gerçek hayatta yatırımcılar korkar, açgözlü davranır ve mantıksız kararlar alır. İşte en sık düştüğümüz tuzaklar:

### 1. Kayıptan Kaçınma (Loss Aversion)
Psikolojik araştırmalar, 100 TL kaybetmenin acısının, 100 TL kazanmanın mutluluğundan 2 kat daha fazla olduğunu gösteriyor.
*   **Sonuç:** Yatırımcı, zarardaki hisseyi "nasılsa çıkar" diye yıllarca tutarken (kol kesemez), kardaki hisseyi "kar cebe yakışır" diyip erkenden satar. Oysa tam tersini yapmalı: "Zararı kes, karı sür."

### 2. Sürü Psikolojisi (Herding)
"Herkes alıyorsa bir bildikleri vardır." Bu düşünce, balonların (Bubble) oluşmasının ana sebebidir.
*   **Çözüm:** Warren Buffett'ın dediği gibi: "Herkes korkarken cesur ol, herkes cesurken kork." Kalabalığın tersine hareket edebilmek (Contrarian), borsada servet yapmanın anahtarıdır.

### 3. Doğrulama Yanlılığı (Confirmation Bias)
Bir hisseyi aldıktan sonra sadece o hisse hakkındaki olumlu haberleri okumak, olumsuz verileri görmezden gelmek.
*   **Çözüm:** Yatırım tezini çürütecek verileri özellikle arayın. "Neden bu hisseyi satmalıyım?" sorusunu kendinize sorun.

### Nasıl Disiplinli Olunur?
*   **Yatırım Günlüğü:** Neden aldığınızı, hedef fiyatınızı ve stop noktanızı yazın.
*   **Otomatik Emirler:** Duyguları devre dışı bırakmak için zincir emirler veya stop-loss emirleri kullanın.
*   **Ekrandan Uzaklaşın:** Fiyatı sürekli izlemek stresi artırır ve hatalı işlem yaptırır.`
  },
  {
    id: 13,
    title: "Eurobond: Dolar Bazında Sabit Getiri İmkanı",
    excerpt: "Döviz tutmak istiyor ama enflasyona karşı erimesinden korkuyorsanız Eurobond tam size göre. Kupon faizi, vergi avantajı ve riskler.",
    category: "Tahvil & Bono",
    date: "05 Eylül 2025",
    imageUrl: "https://images.unsplash.com/photo-1526304640152-d4619684e484?auto=format&fit=crop&q=80&w=1200",
    readTime: "6 dk",
    author: {
      name: "Canan Hukuk",
      role: "Vergi Uzmanı",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100"
    },
    content: `Yastık altındaki döviziniz size hiçbir şey kazandırmaz, aksine ABD enflasyonu (%3-4) kadar her yıl erir. Eurobondlar ise hem anaparanızı döviz olarak korur hem de üzerine faiz verir.

### Eurobond Nedir?
Devletlerin veya şirketlerin yurtdışından döviz (genellikle USD veya EUR) borçlanmak için çıkardığı tahvillerdir.
*   **Getiri:** Türkiye Hazinesi'nin Eurobondları şu an yıllık %6-8 arasında dolar faizi veriyor. Bu, dünyadaki birçok yatırımdan daha yüksek bir getiridir.
*   **Kupon:** Genellikle 6 ayda bir faiz ödemesi (kupon) hesabınıza döviz olarak yatar. Vade sonunda da anaparanızı aynen geri alırsınız.

### Risk Nedir? (CDS Primi)
Bir ülkenin iflas etme (borcunu ödeyememe) riski CDS primi ile ölçülür. CDS yükselirse Eurobond fiyatı düşer, CDS düşerse fiyat artar.
*   **Vadeyi Beklerseniz:** Fiyat dalgalanmaları sizi ilgilendirmez. Vade sonunda paranızı ve faizinizi alırsınız.
*   **Erken Satış:** Eğer vadesinden önce nakde dönmek isterseniz, o günkü piyasa fiyatından satarsınız. Zarar etme ihtimaliniz vardır.

### Vergi Detayı
Eurobond faiz gelirleri beyana tabidir (Sınırı aşarsa). Ancak değer artış kazancı (Alım-satım karı) için istisna yoktur. Bu yüzden Eurobond, genellikle "Al ve Vadeye Kadar Tut" stratejisiyle yönetilen, uzun vadeli ve yüksek tutarlı portföylerin (High Net Worth Individuals) vazgeçilmezidir.`
  },
  {
    id: 14,
    title: "Gayrimenkul Yatırım Fonları (GYF): Emlak Baronu Olmak İçin Milyonlara Gerek Yok",
    excerpt: "Konut fiyatları ulaşılmaz mı oldu? Küçük birikimlerle AVM'lere, otellere veya projelere ortak olmanın modern yolu: GYF'ler.",
    category: "Gayrimenkul",
    date: "03 Eylül 2025",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    readTime: "5 dk",
    author: {
      name: "Mehmet Öz",
      role: "Finansal Danışman",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100"
    },
    content: `Türkiye'de geleneksel yatırım "Ev alıp kiraya vermek"tir. Ancak kredi faizlerinin yüksekliği ve konut fiyatlarındaki balon, bu hayali zorlaştırdı. Üstelik kiracıyla uğraşmak, tadilat masrafları, vergi beyanı gibi dertler de cabası. Çözüm: Gayrimenkul Yatırım Fonları.

### GYF Nedir?
Profesyoneller tarafından yönetilen, içinde ofis binaları, AVM'ler veya konut projeleri bulunan bir havuza ortak olmaktır.
*   **Erişilebilirlik:** Bir daire parasına gerek yok. Hisse senedi alır gibi, fon payı alarak gayrimenkul getirisine ortak olabilirsiniz.
*   **Profesyonel Yönetim:** Kiracıyı bulmak, sözleşme yapmak, binayı yönetmek fon yöneticisinin işidir. Siz sadece değer artışından ve kira gelirinden (temettü benzeri ödemeler) payınızı alırsınız.

### Vergi Avantajı (Stopaj)
Bireysel yatırımcılar için GYF kazançlarındaki stopaj oranı %10'dur (Mevzuat değişebilir). Fiziksel gayrimenkuldeki gibi alım-satım harcı (%4), emlak vergisi, kira gelir beyannamesi gibi prosedürler yoktur. Net getiri elinize geçer.

### Likidite
Evinizi satmak aylar sürebilir. Ancak GYF paylarınızı (Fonun izahnamesindeki kurallara göre, genellikle belirli periyotlarda) nakde çevirmek çok daha kolaydır.
Gayrimenkulü portföyünde "Çeşitlendirme" aracı olarak kullanmak isteyenler için GYF'ler, modern finansın sunduğu en pratik çözümdür.`
  },
  {
    id: 15,
    title: "Girişim Sermayesi (Venture Capital): Bir Sonraki Unicorn'u Yakalamak",
    excerpt: "Start-up ekosistemine yatırım yapmak artık sadece zenginlerin oyunu değil. Kitle fonlaması ve GSYF'ler ile geleceğin teknolojilerine bugünden ortak olun.",
    category: "Fintech",
    date: "01 Eylül 2025",
    imageUrl: "https://images.unsplash.com/photo-1559136555-930d72f1d300?auto=format&fit=crop&q=80&w=1200",
    readTime: "7 dk",
    author: {
      name: "Deniz Tekin",
      role: "Teknoloji Yazarı",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
    },
    content: `Getir, Trendyol, Insider... Bu şirketler kurulduğunda onlara yatırım yapanlar, paralarını 100'e, 1000'e katladı. Girişim Sermayesi (VC), finans dünyasının "En Yüksek Risk, En Yüksek Getiri" alanıdır.

### Risk Matematiği
VC yatırımı, bir istatistik oyunudur. Yatırım yaptığınız 10 start-up'tan:
*   5 tanesi batar (Paranız sıfırlanır).
*   3 tanesi yerinde sayar (Paranızı geri alırsınız).
*   2 tanesi çok başarılı olur (20x-50x yapar).
İşte o 2 başarılı şirket, diğer 8'inin zararını kapatır ve size servet kazandırır.

### Bireysel Yatırımcı Nasıl Girebilir?
Eskiden sadece "Melek Yatırımcı" (Angel Investor) lisansı olanlar girebilirdi. Artık iki yol var:
1.  **Kitle Fonlama Platformları (Crowdfunding):** SPK lisanslı platformlar (Fonbulucu, Efonla vb.) üzerinden, projesini beğendiğiniz bir girişime 100 TL ile bile ortak olabilirsiniz. Paylarınız MKK'da saklanır.
2.  **Girişim Sermayesi Yatırım Fonları (GSYF):** Profesyonel fon yöneticilerinin seçtiği girişimlerden oluşan bir sepete yatırım yaparsınız. TEFAS üzerinden alınıp satılabilen veya nitelikli yatırımcılara sunulan versiyonları vardır.

### Strateji
Portföyünüzün "Kaybetmeyi göze alabileceğiniz" küçük bir kısmını (%5-10) bu alana ayırmak, geleceğin teknolojilerine bilet almaktır. Unutmayın, bu yatırımlar uzun vadelidir (5-7 yıl). Parayı yatırıp unutmanız gerekir.`
  }
];

export const LEGAL_TEXT = {
  privacy: `
    GİZLİLİK POLİTİKASI ve KVKK AYDINLATMA METNİ
    
    1. VERİ SORUMLUSU
    HangiKurum.com ("Şirket") olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("Kanun") uyarınca "Veri Sorumlusu" sıfatıyla, kişisel verilerinizi aşağıda açıklanan amaçlar kapsamında; hukuka ve dürüstlük kurallarına uygun bir şekilde işleyebilecek, kaydedebilecek, saklayabilecek, sınıflandırabilecek, güncelleyebilecek ve mevzuatın izin verdiği hallerde üçüncü kişilere açıklayabilecek veya devredebilecektir.
    
    2. KİŞİSEL VERİLERİN İŞLENME AMACI
    Toplanan kişisel verileriniz (IP adresi, cihaz bilgileri, çerez kayıtları ve bizimle iletişime geçmeniz halinde ad-soyad, e-posta adresi);
    - Web sitesi üzerinden sunulan hizmetlerin (komisyon hesaplama, karşılaştırma vb.) düzgün çalışmasını sağlamak,
    - Hukuki yükümlülüklerimizi yerine getirmek (5651 sayılı Kanun kapsamındaki log kayıtları vb.),
    - Kullanıcı deneyimini iyileştirmek ve anonim istatistikler oluşturmak,
    - Bilgi güvenliği süreçlerini yürütmek,
    amaçlarıyla işlenmektedir.
    
    3. KİŞİSEL VERİ TOPLAMA YÖNTEMİ VE HUKUKİ SEBEBİ
    Kişisel verileriniz, web sitemizi ziyaret etmeniz sırasında elektronik ortamda çerezler (cookies) aracılığıyla ve varsa iletişim formlarını doldurmanız suretiyle toplanmaktadır. Bu veriler, KVKK Madde 5/2 kapsamında "Kanunlarda açıkça öngörülmesi" ve "Veri sorumlusunun meşru menfaatleri için veri işlenmesinin zorunlu olması" hukuki sebeplerine dayalı olarak işlenmektedir.
    
    4. KİŞİSEL VERİLERİN AKTARILMASI
    Kişisel verileriniz, yasal düzenlemelerin öngördüğü kapsamda yetkili kamu kurum ve kuruluşlarına (örn. Mahkemeler, Savcılıklar, BTK) ve teknik altyapı hizmeti aldığımız yurt içi veya yurt dışı sunucu hizmet sağlayıcılarına aktarılabilir.
    
    5. İLGİLİ KİŞİNİN HAKLARI (KVKK Madde 11)
    Kanun'un 11. maddesi uyarınca veri sahipleri; kişisel verilerinin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını öğrenme, yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme, eksik veya yanlış işlenmişse düzeltilmesini isteme, kanunda öngörülen şartlar çerçevesinde silinmesini isteme haklarına sahiptir.
    
    Başvurularınızı info@hangikurum.com adresine iletebilirsiniz.
  `,
  
  terms: `
    KULLANIM KOŞULLARI VE YASAL UYARI
    
    1. TARAFLAR VE AMAÇ
    İşbu Kullanım Koşulları, HangiKurum.com web sitesini ziyaret eden kullanıcılar ile site yönetimi arasındaki ilişkiyi düzenler. Siteyi kullanarak bu koşulları peşinen kabul etmiş sayılırsınız.
    
    2. HİZMETİN KAPSAMI (SADECE BİLGİ AMAÇLIDIR)
    HangiKurum.com, aracı kurumlar ve bankaların komisyon oranlarını, hizmetlerini ve özelliklerini karşılaştırma amacı güden bir bilgilendirme platformudur.
    
    *** ÖNEMLİ UYARI: YATIRIM TAVSİYESİ DEĞİLDİR ***
    Sitemizde yer alan hiçbir içerik, veri, grafik, analiz veya yorum; Sermaye Piyasası Kurulu (SPK) mevzuatı kapsamında "Yatırım Danışmanlığı" niteliğinde değildir. Yatırım danışmanlığı hizmeti; aracı kurumlar, portföy yönetim şirketleri, mevduat kabul etmeyen bankalar ile müşteri arasında imzalanacak yatırım danışmanlığı sözleşmesi çerçevesinde sunulmaktadır. Sitemizde yer alan bilgilere dayanarak alacağınız yatırım kararlarının sonuçlarından HangiKurum.com sorumlu tutulamaz.
    
    3. VERİ DOĞRULUĞU VE SORUMLULUK REDDİ
    Sitemizde yer alan veriler, ilgili kurumların kamuya açık kaynaklarından, resmi web sitelerinden ve KAP (Kamuyu Aydınlatma Platformu) duyurularından derlenmiştir. HangiKurum.com, bu verilerin güncelliği ve doğruluğu konusunda azami özen gösterse de, kurumların anlık kampanya değişikliklerini yansıtmayabilir. Kullanıcılar, işlem yapmadan önce ilgili kurumun resmi kanallarından güncel oranları teyit etmekle yükümlüdür. Oluşabilecek maddi/manevi zararlardan site yönetimi sorumlu değildir.
    
    4. FİKRİ MÜLKİYET
    Sitenin tasarımı, yazılımı, veritabanı ve içeriğinde yer alan metinlerin tüm fikri mülkiyet hakları HangiKurum.com'a aittir. İzinsiz kopyalanamaz, çoğaltılamaz.
  `,
  
  cookies: `
    ÇEREZ (COOKIE) POLİTİKASI
    
    HangiKurum.com olarak, web sitemizden en verimli şekilde faydalanabilmeniz ve kullanıcı deneyiminizi geliştirebilmek için Çerezler kullanıyoruz.
    
    1. ÇEREZ NEDİR?
    Çerezler, ziyaret ettiğiniz web siteleri tarafından tarayıcınız aracılığıyla cihazınıza veya ağ sunucusuna depolanan küçük metin dosyalarıdır.
    
    2. KULLANILAN ÇEREZ TÜRLERİ VE AMAÇLARI
    
    A. Zorunlu Çerezler:
    Web sitesinin doğru biçimde çalışması için zorunludur. Örneğin, site içerisindeki güvenli alanlara erişim, hesaplama araçlarının fonksiyonlarını yerine getirmesi gibi özellikler bu çerezler sayesinde çalışır. Bu çerezler pazarlama amacıyla kullanılmaz.
    
    B. İşlevsel Çerezler:
    Kullanıcı tercihlerinin (dil seçimi, tema ayarları vb.) hatırlanmasını sağlayarak daha kişiselleştirilmiş bir deneyim sunar.
    
    C. Analitik (Performans) Çerezler:
    Google Analytics vb. araçlar kullanılarak; sitemizi kaç kişinin ziyaret ettiği, hangi sayfaların daha çok ilgi gördüğü, kullanıcıların sitede ne kadar süre geçirdiği gibi anonim istatistiksel verilerin toplanmasını sağlar. Bu veriler sitemizi geliştirmemize yardımcı olur.
    
    3. ÇEREZLERİN YÖNETİMİ
    Tarayıcınızın ayarlarını değiştirerek çerezlere ilişkin tercihlerinizi kişiselleştirme imkanına sahipsiniz. Çerezleri devre dışı bırakmanız durumunda web sitemizin bazı özelliklerinin (örn. hesaplama aracı geçmişi) düzgün çalışmayabileceğini hatırlatırız.
    
    - Google Chrome: Ayarlar > Gizlilik ve Güvenlik > Çerezler
    - Mozilla Firefox: Seçenekler > Gizlilik ve Güvenlik > Çerezler
    - Safari: Tercihler > Gizlilik > Çerezleri Engelle
  `
};
