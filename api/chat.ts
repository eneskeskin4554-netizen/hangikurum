import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const config = {
  runtime: "nodejs",
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Sadece POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is missing on server",
      });
    }

    // Body güvenli parse
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const message: string | undefined = body?.message;
    const context: string | undefined = body?.context;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "message is required",
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
    model: "gemini-pro",
    });

    const prompt = context
      ? `${context}\n\nKullanıcı: ${message}`
      : message;

    const result = await model.generateContent(prompt);
    const text = result?.response?.text?.();

    if (!text) {
      return res.status(500).json({
        error: "Gemini boş cevap döndü",
      });
    }

    // ✅ HER ZAMAN JSON
    return res.status(200).json({ text });
} catch (err: any) {
  console.error("CHAT API ERROR:", err);

  const detail = err?.message || String(err);

  // ✅ Hata mesajını direkt error'a yaz (UI'da görünsün)
  return res.status(500).json({
    error: detail,
    detail,
  });
}

}
