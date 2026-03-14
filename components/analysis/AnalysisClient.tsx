"use client";

import { useEffect, useState } from "react";

export function AnalysisClient() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [matchedKeywords, setMatchedKeywords] = useState<string[]>([]);
  const [missingKeywords, setMissingKeywords] = useState<string[]>([]);
  const [keywordMatchPercentage, setKeywordMatchPercentage] =
    useState<number | null>(null);
  const [missingSkills, setMissingSkills] = useState<string[]>([]);

  useEffect(() => {
    const resumeText =
      typeof window !== "undefined"
        ? window.localStorage.getItem("ai-interview-resume-text")
        : null;
    const jobDescription =
      typeof window !== "undefined"
        ? window.localStorage.getItem("ai-interview-job-description")
        : null;

    if (!resumeText || !jobDescription) return;

    const runAnalysis = async () => {
      setLoading(true);
      setError(null);
      try {
        const [screenRes, keywordRes] = await Promise.all([
          fetch("/api/screen-resume", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ resumeText, jobDescription })
          }),
          fetch("/api/keyword-match", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ resumeText, jobDescription })
          })
        ]);

        if (!screenRes.ok || !keywordRes.ok) {
          throw new Error("Analysis API error");
        }

        const screenData = (await screenRes.json()) as {
          matchScore: number;
          strengths: string[];
          missingSkills: string[];
        };
        const keywordData = (await keywordRes.json()) as {
          matchedKeywords: string[];
          missingKeywords: string[];
          matchPercentage: number;
        };

        setMatchScore(screenData.matchScore);
        setMissingSkills(screenData.missingSkills ?? []);
        setMatchedKeywords(keywordData.matchedKeywords ?? []);
        setMissingKeywords(keywordData.missingKeywords ?? []);
        setKeywordMatchPercentage(keywordData.matchPercentage ?? null);

        if (typeof window !== "undefined") {
          window.localStorage.setItem(
            "ai-interview-missing-skills",
            JSON.stringify(screenData.missingSkills ?? [])
          );
          window.localStorage.setItem(
            "ai-interview-keyword-match",
            JSON.stringify(keywordData)
          );
        }
      } catch (err) {
        console.error(err);
        setError("Failed to run analysis. Please try again from Upload step.");
      } finally {
        setLoading(false);
      }
    };

    void runAnalysis();
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8">
      <section className="space-y-3 sm:space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          Step 2 · Resume vs Job Analysis
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-50">
          Analysis dashboard
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
          View your resume vs job description match score, matched skills,
          missing skills, and keyword coverage. Data is based on the resume and
          job description you provided in the Upload step.
        </p>
      </section>

      {error && (
        <p className="rounded-2xl bg-rose-500/5 px-3 py-2 text-xs text-rose-600 dark:bg-rose-500/10 dark:text-rose-300">
          {error}
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <div className="glass-card col-span-1 border border-slate-200/70 bg-white/80 p-5 text-xs dark:border-slate-700/70 dark:bg-slate-900/80">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Match score
          </p>
          <p className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            {loading ? "…" : matchScore ?? "—"}
          </p>
          <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
            AI generated score out of 100 comparing your resume to the job
            description.
          </p>
        </div>

        <div className="glass-card col-span-1 border border-slate-200/70 bg-white/80 p-5 text-xs dark:border-slate-700/70 dark:bg-slate-900/80">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Matched skills
          </p>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            These keywords appear in both your resume and the job description.
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {matchedKeywords.length ? (
              matchedKeywords.map((k) => (
                <span
                  key={k}
                  className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                >
                  {k}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {loading ? "Analyzing keywords…" : "No overlapping keywords yet."}
              </span>
            )}
          </div>
        </div>

        <div className="glass-card col-span-1 border border-slate-200/70 bg-white/80 p-5 text-xs dark:border-slate-700/70 dark:bg-slate-900/80">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Missing skills & keyword match
          </p>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Missing skills inferred by AI, plus keyword match percentage across
            your resume and the job description.
          </p>
          <div className="mt-3 space-y-2">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                Keyword match
              </span>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                {keywordMatchPercentage != null
                  ? `${keywordMatchPercentage}%`
                  : loading
                    ? "…"
                    : "—"}
              </span>
            </div>
            <div>
              <p className="mb-1 text-[11px] font-medium text-slate-600 dark:text-slate-300">
                Missing keywords
              </p>
              <div className="flex flex-wrap gap-1.5">
                {missingKeywords.length ? (
                  missingKeywords.map((k) => (
                    <span
                      key={k}
                      className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"
                    >
                      {k}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {loading
                      ? "Finding gaps…"
                      : "No missing keywords detected yet."}
                  </span>
                )}
              </div>
            </div>
            <div>
              <p className="mb-1 text-[11px] font-medium text-slate-600 dark:text-slate-300">
                Missing skills (AI)
              </p>
              <div className="flex flex-wrap gap-1.5">
                {missingSkills.length ? (
                  missingSkills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-rose-500/10 px-2 py-0.5 text-[10px] font-medium text-rose-700 dark:bg-rose-500/15 dark:text-rose-300"
                    >
                      {s}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {loading
                      ? "Evaluating skills…"
                      : "No missing skills identified yet."}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

