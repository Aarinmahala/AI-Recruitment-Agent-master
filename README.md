## AI Interview Preparation and Resume Screening System

AI-powered web app for resume screening, job description matching, interview question generation, and feedback.

### Tech stack

- **Framework**: Next.js (App Router, TypeScript)
- **Styling**: Tailwind CSS (modern glassmorphism UI, dark mode)
- **AI**: Google Gemini via `@google/generative-ai`
- **Backend**: Next.js API routes (serverless functions)
- **Storage**: CSV export using `json2csv`

### Getting started (local)

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` at the project root based on `.env.local.example`:

   ```bash
   cp .env.local.example .env.local
   ```

   Set:

   ```bash
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

   You can generate a key from Google AI Studio.

3. Run the dev server:

   ```bash
   npm run dev
   ```

4. Open the app at `http://localhost:3000`.

### Core flows

- **Upload**:
  - `/upload` lets users upload a PDF resume and paste a job description.
  - `/api/upload-resume` uses `pdf-parse` to extract resume text.
  - `/api/extract-candidate` uses Gemini to extract candidate info.
- **Analysis**:
  - `/analysis` runs `/api/screen-resume` and `/api/keyword-match` to compute:
    - Resume vs JD match score
    - Matched/missing keywords
    - Missing skills
- **Interview**:
  - `/interview` calls `/api/generate-questions` using missing skills and lets users answer.
  - `/api/evaluate-answers` scores answers and suggests improvements.
- **Feedback**:
  - `/feedback` displays interview score, weak areas, missing skills, suggested skills, and extra questions.
- **CSV export**:
  - `/api/save-candidate` appends candidate data to `assets/candidate_data.csv` using `json2csv`.

### Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (GitHub).
2. Click **Add New…** → **Project**.
3. Import your repo: **AI-Recruitment-Agent-master** (or paste `https://github.com/Aarinmahala/AI-Recruitment-Agent-master`).
4. Leave **Root Directory** as `.` (repo root).
5. In **Environment Variables**, add:
   - **Name:** `GEMINI_API_KEY`  
   - **Value:** your Gemini API key (same as in `.env.local`).
6. Click **Deploy**. Wait for the build to finish.
7. Your app will be at `https://your-project.vercel.app`.

**Note:** The “Save candidate to CSV” feature writes to the server filesystem. On Vercel that path is read-only, so saving to file will not persist; the rest of the app (upload, analysis, interview, feedback) works normally.

