import { ResumeUploadForm } from "@/components/resume-upload/ResumeUploadForm";

export const metadata = {
  title: "Upload Resume | AI Interview Preparation Assistant"
};

export default function UploadPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <section className="space-y-3 sm:space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          Step 1 · Resume & Job Description
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-50">
          Upload your resume and target role
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
          Upload your resume PDF and paste the job description. We&apos;ll
          extract your profile details and prepare them for analysis against the
          role.
        </p>
      </section>

      <ResumeUploadForm />
    </div>
  );
}

