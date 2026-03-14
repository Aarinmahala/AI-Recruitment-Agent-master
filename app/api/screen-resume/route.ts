import { NextRequest, NextResponse } from "next/server";
import { generateJsonResponse } from "@/lib/gemini";

export const runtime = "nodejs";

type ScreeningResult = {
  matchScore: number;
  strengths: string[];
  missingSkills: string[];
};

export async function POST(req: NextRequest) {
  try {
    const { resumeText, jobDescription } = (await req.json()) as {
      resumeText?: string;
      jobDescription?: string;
    };

    if (!resumeText || !jobDescription) {
      return NextResponse.json(
        { error: "resumeText and jobDescription are required." },
        { status: 400 }
      );
    }

    const prompt = `
Compare this resume with the job description and provide a match score out of 100. Identify strengths and missing skills.

Return ONLY a JSON object with the following shape:
{
  "matchScore": number,
  "strengths": string[],
  "missingSkills": string[]
}

Resume:
"""${resumeText}"""

Job Description:
"""${jobDescription}"""
`;

    const result = await generateJsonResponse<ScreeningResult>(prompt);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in /api/screen-resume:", error);
    return NextResponse.json(
      { error: "Failed to screen resume." },
      { status: 500 }
    );
  }
}

