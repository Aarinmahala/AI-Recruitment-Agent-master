import { NextRequest, NextResponse } from "next/server";
import { generateJsonResponse } from "@/lib/gemini";

export const runtime = "nodejs";

type EvaluatedResult = {
  interviewScore: number;
  weakAreas: string[];
  missingSkills: string[];
  suggestedSkills: string[];
  additionalQuestions: string[];
};

export async function POST(req: NextRequest) {
  try {
    const { responses } = (await req.json()) as {
      responses?: { id: string; question: string; answer: string }[];
    };

    if (!responses || !responses.length) {
      return NextResponse.json(
        { error: "responses array is required." },
        { status: 400 }
      );
    }

    const qaBlock = responses
      .map(
        (r, index) => `Q${index + 1}: ${r.question}
A${index + 1}: ${r.answer}`
      )
      .join("\n\n");

    const prompt = `
Evaluate the candidate's interview answers. Provide a single aggregate interview score out of 10, identify weak areas, missing skills, suggest skills to learn, and propose a few additional recommended interview questions.

Return ONLY a JSON object with the following shape:
{
  "interviewScore": number,
  "weakAreas": string[],
  "missingSkills": string[],
  "suggestedSkills": string[],
  "additionalQuestions": string[]
}

Questions and answers:
"""${qaBlock}"""
`;

    const result = await generateJsonResponse<EvaluatedResult>(prompt);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in /api/evaluate-answers:", error);
    return NextResponse.json(
      { error: "Failed to evaluate answers." },
      { status: 500 }
    );
  }
}

