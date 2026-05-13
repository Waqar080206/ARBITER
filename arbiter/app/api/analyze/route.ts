import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { AnalysisResult } from "@/lib/trust";

const client = new Groq();

async function fetchUrlContent(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; Arbiter/1.0)" },
      signal: AbortSignal.timeout(8000),
    });
    const html = await res.text();
    return html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 4000);
  } catch {
    return "";
  }
}

function detectInputType(input: string): string {
  const trimmed = input.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    if (
      /twitter\.com|x\.com|instagram\.com|linkedin\.com|facebook\.com/i.test(
        trimmed
      )
    )
      return "social_profile";
    return "url";
  }
  if (trimmed.length < 300 && /[★☆⭐]|\d\s*\/\s*5|\d\s*star/i.test(trimmed))
    return "review";
  if (trimmed.startsWith("@") || /RT @|#\w+/.test(trimmed)) return "post";
  return "text";
}

const SYSTEM_PROMPT = `You are Arbiter, an AI-powered trust analysis engine. Your job is to evaluate the credibility of online content and return a structured JSON trust assessment.

You must respond with ONLY raw JSON. No markdown. No backticks. No explanation. Just the JSON object.

Always return this exact shape:
{
  "score": <integer 0-100>,
  "verdict": <"Likely Real" | "Suspicious" | "Likely Fake">,
  "tone": <"positive" | "warning" | "negative">,
  "signals": [
    { "text": "<signal description>", "variant": <"positive" | "warning" | "negative"> },
    { "text": "<signal description>", "variant": <"positive" | "warning" | "negative"> },
    { "text": "<signal description>", "variant": <"positive" | "warning" | "negative"> }
  ],
  "explanation": "<2-3 sentence plain-English summary of your reasoning>"
}

Scoring guide:
- 70-100 = Likely Real (tone: positive)
- 40-69 = Suspicious (tone: warning)
- 0-39 = Likely Fake (tone: negative)

Signal writing rules:
- Each signal is one specific, evidence-based observation
- Max 12 words per signal
- No vague filler — name the actual pattern you detected
- Mix positive and negative signals when appropriate

Be calibrated — not everything is fake. Lean toward Suspicious when genuinely uncertain rather than Likely Fake.`;

function buildContext(input: string, inputType: string, fetched?: string): string {
  switch (inputType) {
    case "url":
      if (fetched) {
        return `The user submitted a URL: ${input}\n\nFetched page content:\n${fetched}`;
      }
      return `The user submitted a URL: ${input}\nThe page could not be fetched — analyze based on the URL structure and domain alone.`;
    case "social_profile":
      return `The user submitted a social media profile URL: ${input}\nAnalyze based on the platform, username patterns, and URL structure.`;
    case "review":
      return `The user submitted a product or service review to evaluate for authenticity:\n\n${input}`;
    case "post":
      return `The user submitted a social media post to evaluate:\n\n${input}`;
    default:
      return `The user submitted the following text content to evaluate for credibility:\n\n${input}`;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { input } = await req.json();

    if (!input || typeof input !== "string" || input.trim().length < 10) {
      return NextResponse.json(
        { error: "Input too short. Please paste more content." },
        { status: 400 }
      );
    }

    const trimmed = input.trim();
    const inputType = detectInputType(trimmed);

    let fetched: string | undefined;
    if (inputType === "url") {
      fetched = await fetchUrlContent(trimmed);
    }

    const context = buildContext(trimmed, inputType, fetched);

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1024,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: context },
      ],
    });

    const raw = completion.choices[0]?.message?.content ?? "";

    // Strip markdown fences if model adds them anyway
    const cleaned = raw
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    const parsed = JSON.parse(cleaned) as Omit<AnalysisResult, "preview">;

    // Validate required fields are present
    if (
      typeof parsed.score !== "number" ||
      !parsed.verdict ||
      !parsed.tone ||
      !Array.isArray(parsed.signals) ||
      !parsed.explanation
    ) {
      throw new Error("Invalid response shape from model.");
    }

    const preview =
      trimmed.slice(0, 80).replace(/\s+$/, "") +
      (trimmed.length > 80 ? "…" : "");

    const result: AnalysisResult = { ...parsed, preview };

    return NextResponse.json(result);
  } catch (err) {
    console.error("[Arbiter] Analysis error:", err);

    if (err instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Model returned malformed response. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Analysis failed. Please try again." },
      { status: 500 }
    );
  }
}