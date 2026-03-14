import { NextRequest, NextResponse } from "next/server";
import { generateJsonResponse } from "@/lib/gemini";

export const runtime = "nodejs";

type QuestionsResult = {
  questions: string[];
};

export async function POST(req: NextRequest) {
  try {
    const { missingSkills } = (await req.json()) as {
      missingSkills?: string[];
    };

    if (!missingSkills || !missingSkills.length) {
      return NextResponse.json(
        { error: "missingSkills array is required." },
        { status: 400 }
      );
    }

    const prompt = `
Based on the following missing skills, generate 5 interview questions to evaluate the candidate.

Missing skills:
${missingSkills.join(", ")}

Return ONLY a JSON object with the following shape:
{
  "questions": string[]
}
`;

    const result = await generateJsonResponse<QuestionsResult>(prompt);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in /api/generate-questions:", error);
    return NextResponse.json(
      { error: "Failed to generate interview questions." },
      { status: 500 }
    );
  }
}

