import { NextRequest, NextResponse } from "next/server";
import { generateJsonResponse } from "@/lib/gemini";

export const runtime = "nodejs";

type Candidate = {
  name?: string;
  email?: string;
  skills?: string[];
  education?: string;
  experience?: string;
};

export async function POST(req: NextRequest) {
  try {
    const { resumeText } = (await req.json()) as { resumeText?: string };

    if (!resumeText) {
      return NextResponse.json(
        { error: "resumeText is required." },
        { status: 400 }
      );
    }

    const prompt = `
Analyze this resume and extract candidate information including name, email, skills, education and experience.
Return a JSON object with the following shape:
{
  "name": string,
  "email": string,
  "skills": string[],
  "education": string,
  "experience": string
}

Resume:
"""${resumeText}"""
`;

    const candidate = await generateJsonResponse<Candidate>(prompt);

    return NextResponse.json({ candidate });
  } catch (error) {
    console.error("Error in /api/extract-candidate:", error);
    return NextResponse.json(
      { error: "Failed to extract candidate information." },
      { status: 500 }
    );
  }
}

