import type { VercelRequest, VercelResponse } from "@vercel/node";

export const config = { runtime: "nodejs" };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "GEMINI_API_KEY is missing on server" });
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const message: string | undefined = body?.message;
    const context: string | undefined = body?.context;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "message is required" });
    }

    // ✅ v1 endpoint (v1beta yerine)
    const model = "gemini-2.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`;

const systemPrompt = `
Sen Hangikurum.com içindeki verilerle çalışan bir karşılaştırma asistanısın.

ZORUNLU KURALLAR:
1) Cevaplarını HER ZAMAN Türkçe ver.
2) SADECE sana "VERI_JSON" olarak verilen platform verisini kaynak al.
3) VERI_JSON içinde net bilgi yoksa: "Platform verilerimde bu bilgi yok." de ve kullanıcıdan işlem türünü/piyasayı sor.
4) Tahmin yapma, genel konuşma yapma, dış kaynak önermeyi bırak.
5) Yatırım tavsiyesi verme.

ÇIKTI FORMATI (mümkünse):
- Kısa sonuç (1-2 cümle)
- En uygun 3 seçenek (madde madde, kurum adı + ilgili ücret/komisyon + not)
- Veri notu (varsa tarih / şart / istisna)
`;

const prompt = context
  ? `VERI_JSON:\n${context}\n\nKULLANICI_SORUSU:\n${message}`
  : `KULLANICI_SORUSU:\n${message}\n\nNot: VERI_JSON gelmedi, bu durumda "Platform verilerimde bu bilgi yok." de.`;


    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      }),
    });

    const raw = await resp.text();
    let data: any = null;
    try { data = JSON.parse(raw); } catch {}

    if (!resp.ok) {
      return res.status(resp.status).json({
        error: data?.error?.message || `Gemini API error (status=${resp.status})`,
        detail: data || raw,
      });
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text).filter(Boolean).join("") ||
      "";

    if (!text) {
      return res.status(500).json({ error: "Gemini boş cevap döndü", detail: data });
    }

    return res.status(200).json({ text });
  } catch (err: any) {
    return res.status(500).json({
      error: err?.message || String(err),
      detail: err?.stack || String(err),
    });
  }
}
