import Link from "next/link";

const features = [
  {
    title: "Resume analysis",
    desc: "Upload your resume and extract key candidate data instantly with AI.",
    highlight: "Structured candidate profile"
  },
  {
    title: "Job description matching",
    desc: "Compare your resume against a job description and see how well you match.",
    highlight: "Match score & keyword coverage"
  },
  {
    title: "AI interview questions",
    desc: "Generate tailored interview questions based on your target role and gaps.",
    highlight: "Role-specific question sets"
  },
  {
    title: "Skill gap detection",
    desc: "Identify missing skills and get a personalized upskilling roadmap.",
    highlight: "Actionable skill insights"
  }
];

export default function HomePage() {
  return (
    <div className="space-y-10 sm:space-y-12 lg:space-y-16">
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
        <div className="space-y-6 sm:space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50/80 px-3 py-1 text-xs font-medium text-sky-700 shadow-sm backdrop-blur-md dark:border-sky-400/20 dark:bg-sky-500/10 dark:text-sky-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.35)]" />
            <span>AI powered hiring & interview prep</span>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-slate-50">
              AI Interview Preparation Assistant
            </h1>
            <p className="max-w-xl text-balance text-sm text-slate-600 sm:text-base dark:text-slate-300">
              AI powered resume screening and interview preparation platform.
              Upload your resume, match it with a job description, and practice
              AI generated interview questions tailored to your skill gaps.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Link
              href="/upload"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-slate-900/30 transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Upload Resume
            </Link>
            <Link
              href="/analysis"
              className="inline-flex items-center justify-center rounded-full border border-slate-300/80 bg-white/70 px-5 py-2.5 text-sm font-medium text-slate-800 shadow-sm backdrop-blur-md transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-white dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:border-slate-500 dark:hover:bg-slate-900"
            >
              Start Analysis
            </Link>
          </div>

          <div className="grid gap-4 text-xs text-slate-500 sm:grid-cols-3 sm:text-[11px] dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="h-7 w-7 rounded-2xl bg-emerald-100/80 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 shadow-sm dark:bg-emerald-500/15 dark:text-emerald-300" />
              <span>ATS-friendly resume insights</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-7 w-7 rounded-2xl bg-sky-100/80 text-[10px] font-semibold uppercase tracking-wide text-sky-700 shadow-sm dark:bg-sky-500/15 dark:text-sky-300" />
              <span>Role-specific interview questions</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-7 w-7 rounded-2xl bg-violet-100/80 text-[10px] font-semibold uppercase tracking-wide text-violet-700 shadow-sm dark:bg-violet-500/15 dark:text-violet-300" />
              <span>Actionable skill gap detection</span>
            </div>
          </div>
        </div>

        <div className="glass-card primary-gradient relative overflow-hidden p-[1px]">
          <div className="glass-card relative h-full bg-gradient-to-b from-white/80 to-slate-50/60 p-5 dark:from-slate-900/80 dark:to-slate-950/80">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sky-400/30 blur-3xl dark:bg-sky-500/25" />
            <div className="pointer-events-none absolute -bottom-10 -left-16 h-44 w-44 rounded-full bg-violet-500/25 blur-3xl dark:bg-violet-600/30" />

            <div className="relative space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                Preview
              </p>
              <div className="glass-card soft-scrollbar max-h-[380px] space-y-4 overflow-y-auto border border-white/30 bg-white/60 p-4 text-xs dark:border-slate-700/70 dark:bg-slate-900/70">
                <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-900 text-[11px] text-slate-100 shadow-md dark:bg-slate-100 dark:text-slate-900">
                  <div className="flex flex-1 flex-col gap-1 px-3 py-2.5">
                    <span className="text-xs font-semibold">
                      Resume vs Job Match
                    </span>
                    <span className="text-[11px] text-slate-300 dark:text-slate-600">
                      Your profile matches{" "}
                      <span className="font-semibold text-emerald-300 dark:text-emerald-600">
                        82%
                      </span>{" "}
                      of this role.
                    </span>
                  </div>
                  <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-slate-800/80 px-3 py-2 text-right text-[11px] dark:bg-slate-200">
                    <span className="text-[10px] uppercase text-slate-400 dark:text-slate-500">
                      Score
                    </span>
                    <span className="text-lg font-semibold tracking-tight">
                      82
                    </span>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="glass-card border border-slate-200/70 bg-white/80 p-3 text-[11px] dark:border-slate-700/70 dark:bg-slate-900/70">
                    <p className="mb-1.5 text-[11px] font-semibold text-slate-900 dark:text-slate-100">
                      Matched skills
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {["React", "Next.js", "TypeScript", "REST APIs"].map(
                        (s) => (
                          <span
                            key={s}
                            className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300"
                          >
                            {s}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                  <div className="glass-card border border-slate-200/70 bg-white/80 p-3 text-[11px] dark:border-slate-700/70 dark:bg-slate-900/70">
                    <p className="mb-1.5 text-[11px] font-semibold text-slate-900 dark:text-slate-100">
                      Missing skills
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {["System Design", "CI/CD", "Cloud"].map((s) => (
                        <span
                          key={s}
                          className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-700 dark:bg-amber-400/15 dark:text-amber-300"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="glass-card border border-slate-200/70 bg-white/80 p-3 text-[11px] dark:border-slate-700/70 dark:bg-slate-900/70">
                  <p className="mb-1.5 text-[11px] font-semibold text-slate-900 dark:text-slate-100">
                    Sample interview questions
                  </p>
                  <ul className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                    <li>• How would you design a scalable API gateway?</li>
                    <li>• Explain a CI/CD pipeline you have implemented.</li>
                    <li>
                      • What trade-offs do you consider when choosing cloud
                      services?
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div key={feature.title} className="glass-card p-4 sm:p-5">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              {feature.highlight}
            </p>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              {feature.title}
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              {feature.desc}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

