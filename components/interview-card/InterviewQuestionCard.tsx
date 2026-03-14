"use client";

import { useState } from "react";

export type InterviewQuestion = {
  id: string;
  question: string;
};

type Props = {
  questions: InterviewQuestion[];
  onEvaluated?: (result: {
    interviewScore: number;
    weakAreas: string[];
    missingSkills: string[];
    suggestions: string;
  }) => void;
};

export function InterviewQuestionCard({ questions, onEvaluated }: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnswerChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const payload = questions.map((q) => ({
        id: q.id,
        question: q.question,
        answer: answers[q.id] ?? ""
      }));

      const res = await fetch("/api/evaluate-answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ responses: payload })
      });

      if (!res.ok) {
        throw new Error("Failed to evaluate answers.");
      }

      const data = await res.json();
      onEvaluated?.(data);
    } catch (err) {
      console.error(err);
      setError("Could not evaluate your answers. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!questions.length) {
    return (
      <div className="glass-card border border-dashed border-slate-300/80 bg-slate-50/80 p-5 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400">
        No interview questions yet. Generate questions from the Analysis page
        based on your skill gaps.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card space-y-5 border border-slate-200/70 bg-white/80 p-5 text-sm dark:border-slate-700/70 dark:bg-slate-900/80 sm:p-6"
    >
      <div className="space-y-1.5">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
          Interview practice
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Answer the questions below as if you are in a real interview. We&apos;ll
          send your responses to the AI for evaluation and feedback.
        </p>
      </div>

      <div className="space-y-4">
        {questions.map((q, index) => (
          <div
            key={q.id}
            className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5 text-xs shadow-sm dark:border-slate-700 dark:bg-slate-900/70"
          >
            <p className="mb-1.5 text-[11px] font-semibold text-slate-900 dark:text-slate-100">
              Q{index + 1}. {q.question}
            </p>
            <textarea
              className="soft-scrollbar mt-1 w-full rounded-2xl border border-slate-200 bg-white/90 px-3 py-2 text-xs text-slate-900 outline-none ring-0 transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-sky-500 dark:focus:ring-sky-900/40"
              rows={3}
              placeholder="Type your answer here..."
              value={answers[q.id] ?? ""}
              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
            />
          </div>
        ))}
      </div>

      {error && (
        <p className="rounded-2xl bg-rose-500/5 px-3 py-2 text-[11px] text-rose-600 dark:bg-rose-500/10 dark:text-rose-300">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-xs font-medium text-white shadow-md shadow-slate-900/30 transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
        >
          {isSubmitting ? "Evaluating answers..." : "Submit answers for review"}
        </button>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          We&apos;ll return a scored evaluation, weak areas, and suggested
          follow-up questions.
        </p>
      </div>
    </form>
  );
}

