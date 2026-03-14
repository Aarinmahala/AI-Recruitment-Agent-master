"use client";

import { useEffect, useState } from "react";
import { FeedbackCard } from "@/components/feedback-card/FeedbackCard";

export function FeedbackClient() {
  const [loaded, setLoaded] = useState(false);
  const [score, setScore] = useState(0);
  const [weakAreas, setWeakAreas] = useState<string[]>([]);
  const [missingSkills, setMissingSkills] = useState<string[]>([]);
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);
  const [additionalQuestions, setAdditionalQuestions] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem("ai-interview-feedback");
    if (!raw) return;

    try {
      const data = JSON.parse(raw) as {
        interviewScore: number;
        weakAreas: string[];
        missingSkills: string[];
        suggestions?: string;
        suggestedSkills?: string[];
        additionalQuestions: string[];
      };

      setScore(data.interviewScore ?? 0);
      setWeakAreas(data.weakAreas ?? []);
      setMissingSkills(data.missingSkills ?? []);

      if (Array.isArray(data.suggestedSkills)) {
        setSuggestedSkills(data.suggestedSkills);
      } else if (data.suggestions) {
        setSuggestedSkills(
          data.suggestions.split(/[.,]/).map((s) => s.trim()).filter(Boolean)
        );
      }

      setAdditionalQuestions(data.additionalQuestions ?? []);
      setLoaded(true);
    } catch (error) {
      console.error("Failed to parse interview feedback from storage:", error);
    }
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8">
      <section className="space-y-3 sm:space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          Step 4 · Interview Feedback
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-50">
          Review your AI feedback
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
          This summary is based on your latest interview practice session. You
          can re-run questions from the Interview step at any time to update
          these insights.
        </p>
      </section>

      <FeedbackCard
        interviewScore={loaded ? score : 0}
        weakAreas={loaded ? weakAreas : []}
        missingSkills={loaded ? missingSkills : []}
        suggestedSkills={loaded ? suggestedSkills : []}
        additionalQuestions={loaded ? additionalQuestions : []}
      />
    </div>
  );
}

