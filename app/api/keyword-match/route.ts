import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const STOP_WORDS = new Set([
  "the",
  "and",
  "or",
  "a",
  "an",
  "for",
  "to",
  "in",
  "of",
  "on",
  "with",
  "by",
  "as",
  "is",
  "are",
  "be",
  "this",
  "that",
  "will",
  "you",
  "your"
]);

function extractKeywords(text: string): string[] {
  return Array.from(
    new Set(
      text
        .toLowerCase()
        .split(/[^a-z0-9+#.]+/i)
        .filter(
          (token) =>
            token &&
            token.length > 2 &&
            !STOP_WORDS.has(token) &&
            !/^\d+$/.test(token)
        )
    )
  );
}

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

    const jobKeywords = extractKeywords(jobDescription);
    const resumeKeywords = new Set(extractKeywords(resumeText));

    const matchedKeywords = jobKeywords.filter((k) => resumeKeywords.has(k));
    const missingKeywords = jobKeywords.filter((k) => !resumeKeywords.has(k));

    const matchPercentage =
      jobKeywords.length === 0
        ? 0
        : Math.round((matchedKeywords.length / jobKeywords.length) * 100);

    return NextResponse.json({
      matchedKeywords,
      missingKeywords,
      matchPercentage
    });
  } catch (error) {
    console.error("Error in /api/keyword-match:", error);
    return NextResponse.json(
      { error: "Failed to compute keyword match." },
      { status: 500 }
    );
  }
}

