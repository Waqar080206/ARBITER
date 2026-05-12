"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { HomeHero } from "./components/hero";
import { AnalyzerForm } from "./components/analyzer-form";
import { TrustCard } from "./components/trust-card";
import { getMockAnalysis, loadingMessages } from "@/lib/trust";
import type { AnalysisResult } from "@/lib/trust";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    if (!isAnalyzing) return undefined;

    const interval = window.setInterval(() => {
      setStatusIndex((current) => (current + 1) % loadingMessages.length);
    }, 1800);
    return () => window.clearInterval(interval);
  }, [isAnalyzing]);

  const loadingText = useMemo(() => loadingMessages[statusIndex], [statusIndex]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValue.trim()) return;

    setIsAnalyzing(true);
    setAnalysis(null);

    window.setTimeout(() => {
      setAnalysis(getMockAnalysis(inputValue));
      setIsAnalyzing(false);
    }, 1200);
  };

  const handleReset = () => {
    setAnalysis(null);
    setIsAnalyzing(false);
    setStatusIndex(0);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <HomeHero />
          <div className="rounded-[28px] border border-border bg-surface-strong p-8 shadow-soft">
            <div className="space-y-5">
              <div className="rounded-full bg-surface px-4 py-2 text-xs font-semibold uppercase tracking-[0.36em] text-muted-foreground inline-block">
                Calm intelligence
              </div>
              <p className="max-w-sm text-sm leading-7 text-muted-foreground">
                A premium interface for everyday trust decisions. Simple, explainable, and intentionally calm.
              </p>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-background px-5 text-sm font-semibold text-foreground transition hover:bg-surface-strong"
              >
                View source
              </a>
            </div>
          </div>
        </header>

        <main className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <AnalyzerForm
            inputValue={inputValue}
            disabled={isAnalyzing}
            onChange={(value) => setInputValue(value)}
            onSubmit={handleSubmit}
          />
          <TrustCard
            analysis={analysis}
            isAnalyzing={isAnalyzing}
            loadingMessage={loadingText}
            onReset={handleReset}
          />
        </main>
      </div>
    </div>
  );
}
