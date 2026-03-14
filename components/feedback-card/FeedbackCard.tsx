type FeedbackProps = {
  interviewScore: number;
  weakAreas: string[];
  missingSkills: string[];
  suggestedSkills: string[];
  additionalQuestions: string[];
};

export function FeedbackCard({
  interviewScore,
  weakAreas,
  missingSkills,
  suggestedSkills,
  additionalQuestions
}: FeedbackProps) {
  return (
    <div className="glass-card grid gap-4 border border-slate-200/70 bg-white/80 p-5 text-xs dark:border-slate-700/70 dark:bg-slate-900/80 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] sm:p-6 lg:p-7">
      <div className="space-y-4">
        <div className="rounded-2xl bg-slate-900 px-4 py-3 text-slate-100 shadow-md dark:bg-slate-100 dark:text-slate-900">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300 dark:text-slate-600">
            Interview score
          </p>
          <div className="mt-2 flex items-end justify-between">
            <p className="text-3xl font-semibold tracking-tight">
              {Math.round(interviewScore)}
            </p>
            <p className="text-xs text-slate-300 dark:text-slate-600">
              Score is computed from all evaluated answers.
            </p>
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Weak areas
          </p>
          {weakAreas.length ? (
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              {weakAreas.map((area) => (
                <li key={area}>• {area}</li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-500 dark:text-slate-400">—</p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Missing skills
          </p>
          {missingSkills.length ? (
            <div className="flex flex-wrap gap-1.5">
              {missingSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 dark:text-slate-400">—</p>
          )}
        </div>

        <div>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Suggested skills to learn
          </p>
          {suggestedSkills.length ? (
            <div className="flex flex-wrap gap-1.5">
              {suggestedSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 dark:text-slate-400">—</p>
          )}
        </div>

        <div>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Additional recommended interview questions
          </p>
          {additionalQuestions.length ? (
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              {additionalQuestions.map((question) => (
                <li key={question}>• {question}</li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-500 dark:text-slate-400">—</p>
          )}
        </div>
      </div>
    </div>
  );
}

