import type { VercelRequest, VercelResponse } from "@vercel/node";

export const config = { runtime: "nodejs" };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "GEMINI_API_KEY missing" });

    // v1 list models
    const url = `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`;

    const r = await fetch(url);
    const raw = await r.text();

    let data: any = null;
    try { data = JSON.parse(raw); } catch {}

    if (!r.ok) {
      return res.status(r.status).json({
        error: data?.error?.message || `ListModels failed (status=${r.status})`,
        detail: data || raw,
      });
    }

    // Sadece isimleri sade gösterelim
    const names =
      (data?.models || []).map((m: any) => ({
        name: m?.name,
        supportedGenerationMethods: m?.supportedGenerationMethods,
      })) || [];

    return res.status(200).json({ names });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || String(e) });
  }
}
