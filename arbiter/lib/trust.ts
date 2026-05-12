export type AnalysisResult = {
  score: number;
  verdict: "Likely Real" | "Suspicious" | "Likely Fake";
  signals: string[];
  explanation: string;
};

export const loadingMessages = [
  "Analyzing source credibility...",
  "Detecting behavioral patterns...",
  "Evaluating trust indicators...",
];

const signalPools = {
  real: [
    "Source attribution is consistent and credible.",
    "Author activity appears organic and steady.",
    "Language is specific, balanced, and evidence-based.",
    "No obvious manipulation patterns were detected.",
    "Content aligns with known trusted sources.",
  ],
  suspicious: [
    "Source attribution is incomplete or unclear.",
    "Some signals suggest possible amplification.",
    "Language uses persuasive wording rather than neutral facts.",
    "Account or source history is limited.",
    "The claim lacks strong verification details.",
  ],
  fake: [
    "Activity appears unusually clustered or automated.",
    "No verified source attribution detected.",
    "Emotional exaggeration is present in the language.",
    "The author or source shows low authenticity indicators.",
    "The narrative structure matches common misleading patterns.",
  ],
};

const getSeed = (input: string) =>
  input
    .trim()
    .toLowerCase()
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);

const selectSignals = (pool: string[], seed: number) =>
  pool
    .map((signal, index) => ({ signal, order: (seed + index) % pool.length }))
    .sort((a, b) => a.order - b.order)
    .slice(0, 3)
    .map((item) => item.signal);

export function getMockAnalysis(input: string): AnalysisResult {
  const seed = getSeed(input);
  const bucket = seed % 3;

  if (bucket === 0) {
    return {
      score: 82,
      verdict: "Likely Real",
      signals: selectSignals(signalPools.real, seed),
      explanation:
        "The content displays credible language, clear attribution, and patterns consistent with genuine sources. It still benefits from direct verification, but the indicators are positive.",
    };
  }

  if (bucket === 1) {
    return {
      score: 56,
      verdict: "Suspicious",
      signals: selectSignals(signalPools.suspicious, seed),
      explanation:
        "Several signals suggest this content should be reviewed carefully. Some attribution details are missing and the language leans toward persuasion rather than evidence.",
    };
  }

  return {
    score: 28,
    verdict: "Likely Fake",
    signals: selectSignals(signalPools.fake, seed),
    explanation:
      "The content shows multiple signs of low authenticity, including weak source signals and emotional wording. Treat it cautiously and seek stronger verification.",
  };
}

export function getVerdictClasses(verdict: string) {
  if (verdict === "Likely Real") {
    return "bg-trust-green/15 text-trust-green";
  }

  if (verdict === "Suspicious") {
    return "bg-trust-amber/15 text-trust-amber";
  }

  return "bg-trust-red/15 text-trust-red";
}
