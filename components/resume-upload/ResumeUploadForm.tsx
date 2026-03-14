"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type CandidateInfo = {
  name?: string;
  email?: string;
  skills?: string[];
  education?: string;
  experience?: string;
};

type Props = {
  onAnalysisReady?: (candidate: CandidateInfo) => void;
};

export function ResumeUploadForm({ onAnalysisReady }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [candidate, setCandidate] = useState<CandidateInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (selected && selected.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      setFile(null);
      return;
    }
    setError(null);
    setFile(selected ?? null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      setError("Please upload your resume PDF.");
      return;
    }
    if (!jobDescription.trim()) {
      setError("Please paste the job description.");
      return;
    }
    setError(null);
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("jobDescription", jobDescription);

      const uploadRes = await fetch("/api/upload-resume", {
        method: "POST",
        body: formData
      });

      if (!uploadRes.ok) {
        throw new Error("Failed to upload resume.");
      }

      const { resumeText } = await uploadRes.json();

      const extractRes = await fetch("/api/extract-candidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText })
      });

      if (!extractRes.ok) {
        throw new Error("Failed to extract candidate information.");
      }

      const data = (await extractRes.json()) as { candidate: CandidateInfo };
      setCandidate(data.candidate);
      onAnalysisReady?.(data.candidate);

      // Persist data locally for subsequent steps
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          "ai-interview-resume-text",
          resumeText || ""
        );
        window.localStorage.setItem(
          "ai-interview-job-description",
          jobDescription
        );
        window.localStorage.setItem(
          "ai-interview-candidate",
          JSON.stringify(data.candidate)
        );
      }

      // Move user to analysis dashboard
      router.push("/analysis");
    } catch (err) {
      console.error(err);
      setError(
        "Something went wrong while processing your resume. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="glass-card grid gap-6 border border-slate-200/70 bg-white/80 p-5 text-sm dark:border-slate-700/70 dark:bg-slate-900/80 sm:p-6 lg:p-7"
      >
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Resume (PDF)
          </label>
          <div className="flex flex-col items-start gap-3 rounded-2xl border border-dashed border-slate-300/80 bg-slate-50/80 px-4 py-4 text-xs text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium text-slate-700 dark:text-slate-200">
                Drag & drop your resume
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                PDF files only. We&apos;ll parse your details using AI.
              </p>
            </div>
            <label className="inline-flex cursor-pointer items-center justify-center rounded-full bg-slate-900 px-4 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200">
              <span>Browse file</span>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
          {file && (
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              Selected: <span className="font-medium">{file.name}</span>
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Job description
          </label>
          <textarea
            className="soft-scrollbar min-h-[160px] w-full rounded-2xl border border-slate-200 bg-white/70 px-3.5 py-2.5 text-xs text-slate-800 shadow-sm outline-none ring-0 transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-sky-500 dark:focus:ring-sky-900/40"
            placeholder="Paste the role description, responsibilities, and required skills for the job you are targeting."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            We&apos;ll compare your resume against this job description to
            compute match scores and skill gaps.
          </p>
        </div>

        {error && (
          <p className="rounded-2xl bg-rose-500/5 px-3 py-2 text-[11px] text-rose-600 dark:bg-rose-500/10 dark:text-rose-300">
            {error}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="submit"
            disabled={isUploading}
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-xs font-medium text-white shadow-md shadow-slate-900/30 transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
          >
            {isUploading ? "Analyzing..." : "Upload & Extract Candidate Info"}
          </button>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Your data is processed securely and not persisted by default, except
            when you explicitly export results.
          </p>
        </div>
      </form>

      {candidate && (
        <div className="glass-card border border-slate-200/70 bg-white/80 p-5 text-xs dark:border-slate-700/70 dark:bg-slate-900/80 sm:p-6">
          <h2 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-50">
            Extracted candidate information
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Name
              </p>
              <p className="mt-1 text-xs text-slate-800 dark:text-slate-100">
                {candidate.name || "—"}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Email
              </p>
              <p className="mt-1 text-xs text-slate-800 dark:text-slate-100">
                {candidate.email || "—"}
              </p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Skills
              </p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {candidate.skills?.length ? (
                  candidate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-sky-500/10 px-2 py-0.5 text-[10px] font-medium text-sky-700 dark:bg-sky-500/15 dark:text-sky-300"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    —
                  </span>
                )}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Education
              </p>
              <p className="mt-1 text-xs text-slate-800 dark:text-slate-100">
                {candidate.education || "—"}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Experience
              </p>
              <p className="mt-1 text-xs text-slate-800 dark:text-slate-100">
                {candidate.experience || "—"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

