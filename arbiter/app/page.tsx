"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Navbar } from "./components/navbar";
import { HeroSection } from "./components/hero";
import { AnalysisInput } from "./components/analyzer-form";
import { LoadingState } from "./components/loading-state";
import { TrustCard } from "./components/trust-card";
import { getMockAnalysis, loadingMessages } from "@/lib/trust";
import type { AnalysisResult } from "@/lib/trust";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [stage, setStage] = useState<"idle" | "loading" | "result">("idle");
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    if (stage !== "loading") return undefined;

    const interval = window.setInterval(() => {
      setStatusIndex((current) => (current + 1) % loadingMessages.length);
    }, 2400);

    return () => window.clearInterval(interval);
  }, [stage]);

  const loadingText = useMemo(() => loadingMessages[statusIndex], [statusIndex]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValue.trim()) return;

    setStage("loading");
    setAnalysis(null);

    window.setTimeout(() => {
      setAnalysis(getMockAnalysis(inputValue));
      setStage("result");
      setStatusIndex(0);
    }, 1300);
  };

  const handleReset = () => {
    setStage("idle");
    setAnalysis(null);
    setStatusIndex(0);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <HeroSection />
        <div className="space-y-8">
          <AnalysisInput
            inputValue={inputValue}
            disabled={stage === "loading"}
            onChange={setInputValue}
            onSubmit={handleSubmit}
          />
          {stage === "loading" ? (
            <LoadingState phrase={loadingText} />
          ) : stage === "result" ? (
            <TrustCard analysis={analysis} onReset={handleReset} />
          ) : null}
        </div>
      </main>
    </div>
  );
}
