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
    const model = "gemini-1.5-flash"; // istersen sonra değiştiririz
    const url = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`;

    const prompt = context ? `${context}\n\nKullanıcı: ${message}` : message;

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
