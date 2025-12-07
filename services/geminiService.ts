import { GoogleGenAI, Chat } from "@google/genai";
import { Broker, InternationalBroker, CryptoExchange } from "../types";
import { INTERNATIONAL_BROKERS, CRYPTO_EXCHANGES, LAST_UPDATED } from "../constants";

let chatSession: Chat | null = null;

const getClient = () => {
  const apikey =
    import.meta.env.VITE_GEMINI_API_KEY ||
    import.meta.env.VITE_API_KEY ||
    process.env.API_KEY;

  if (!apikey) {
    console.warn(
      "Gemini API Key bulunamadı. Yapay zeka özellikleri devre dışı kalabilir."
    );
    return null; // Return null instead of throwing to prevent app crash
  }

  return new GoogleGenAI({ apikey });
};

const formatContext = (brokers: Broker[], intBrokers: InternationalBroker[], cryptoExchanges: CryptoExchange[]): string => {
  const bistData = JSON.stringify(brokers.map(b => ({
    market: "Borsa İstanbul (BIST)",
    name: b.name,
    commissionShare: `Onbinde ${b.commissionRate.share}`,
    commissionViop: b.commissionRate.viop === 0 ? "Yok/Kapalı" : `Onbinde ${b.commissionRate.viop}`,
    appScore: b.mobileAppScore,
    features: b.features.join(", "),
    accountFee: b.accountFee,
    description: b.description
  })));

  const globalData = JSON.stringify(intBrokers.map(b => ({
    market: "Yurtdışı Piyasalar (ABD/Global)",
    name: b.name,
    commission: b.commissionRate,
    minCommission: b.minCommission,
    custodyFee: b.custodyFee,
    appScore: b.mobileAppScore,
    features: b.features.join(", "),
    description: b.description
  })));

  const cryptoData = JSON.stringify(cryptoExchanges.map(b => ({
    market: "Kripto Varlıklar (Kripto Borsaları)",
    name: b.name,
    commissionMaker: b.commissionRate.maker,
    commissionTaker: b.commissionRate.taker,
    coinCount: b.coinCount,
    appScore: b.mobileAppScore,
    features: b.features.join(", "),
    description: b.description
  })));

  return `Veriler en son ${LAST_UPDATED} tarihinde güncellendi. \n\nBIST Verileri: ${bistData}\n\nYurtdışı Verileri: ${globalData}\n\nKripto Verileri: ${cryptoData}`;
};

export const initializeChat = (brokers: Broker[]) => {
  try {
    const ai = getClient();
    if (!ai) return; // Exit if no client (no API key)

    const context = formatContext(brokers, INTERNATIONAL_BROKERS, CRYPTO_EXCHANGES);
    
    const systemInstruction = `
      Sen HangiKurum platformunun yapay zeka asistanısın. Görevin kullanıcılara aracı kurum seçimi konusunda yardımcı olmak.
      
      Veri Setin: ${context}
      
      Kuralların:
      1. Sadece sana verilen verileri kullan. Bilmediğin bir şey sorulursa "Verilerimde bu bilgi bulunmuyor, lütfen kurumun resmi sitesini kontrol edin" de.
      2. Kullanıcı "güncel mi?" diye sorarsa, verilerin ${LAST_UPDATED} itibariyle kontrol edildiğini belirt.
      3. Yatırım tavsiyesi verme. Sadece karşılaştırma ve bilgi sağla.
      4. Cevapların samimi, kısa ve Türkçe olsun.
      5. İletişim bilgisi sorulursa "info@hangikurum.com" adresini ver.
    `;

    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.5, // Lower temperature for more accurate factual responses
      },
    });
  } catch (error) {
    console.error("Failed to initialize Gemini Chat:", error);
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    return "Yapay zeka sistemi şu anda çevrimdışı (API Anahtarı eksik). Lütfen daha sonra tekrar deneyin.";
  }

  try {
    const result = await chatSession.sendMessage({ message });
    return result.text || "Üzgünüm, şu an cevap veremiyorum.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Bağlantı hatası oluştu. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.";
  }
};
