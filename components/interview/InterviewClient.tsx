"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { InterviewQuestionCard } from "@/components/interview-card/InterviewQuestionCard";

export function InterviewClient() {
  const [questions, setQuestions] = useState<
    { id: string; question: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const missingSkillsRaw =
      typeof window !== "undefined"
        ? window.localStorage.getItem("ai-interview-missing-skills")
        : null;

    if (!missingSkillsRaw) return;

    const missingSkills = JSON.parse(missingSkillsRaw) as string[];
    if (!missingSkills.length) return;

    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/generate-questions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ missingSkills })
        });

        if (!res.ok) {
          throw new Error("Failed to generate questions.");
        }

        const data = (await res.json()) as { questions: string[] };
        const qObjects = (data.questions ?? []).map((q, index) => ({
          id: `q${index + 1}`,
          question: q
        }));

        setQuestions(qObjects);

        if (typeof window !== "undefined") {
          window.localStorage.setItem(
            "ai-interview-questions",
            JSON.stringify(qObjects)
          );
        }
      } catch (err) {
        console.error(err);
        setError(
          "Could not generate interview questions. Try re-running analysis."
        );
      } finally {
        setLoading(false);
      }
    };

    void fetchQuestions();
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8">
      <section className="space-y-3 sm:space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          Step 3 · Interview Questions
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-50">
          Practice your interview
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
          Answer AI generated questions based on your skill gaps. Questions are
          generated from the missing skills identified in the Analysis step.
        </p>
        {loading && (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Generating questions from your missing skills…
          </p>
        )}
        {error && (
          <p className="rounded-2xl bg-rose-500/5 px-3 py-2 text-xs text-rose-600 dark:bg-rose-500/10 dark:text-rose-300">
            {error}
          </p>
        )}
      </section>

      <InterviewQuestionCard
        questions={questions}
        onEvaluated={(result) => {
          if (typeof window !== "undefined") {
            window.localStorage.setItem(
              "ai-interview-feedback",
              JSON.stringify(result)
            );
          }
          router.push("/feedback");
        }}
      />
    </div>
  );
}

