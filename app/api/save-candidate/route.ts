import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

type SavePayload = {
  name: string;
  email: string;
  skills: string[];
  matchScore: number;
  missingSkills: string[];
  interviewQuestions: string[];
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SavePayload;

    const assetsDir = path.join(process.cwd(), "assets");
    const csvPath = path.join(assetsDir, "candidate_data.csv");

    await fs.mkdir(assetsDir, { recursive: true });

    const { Parser } = await import("json2csv");
    const fields = [
      "Name",
      "Email",
      "Skills",
      "MatchScore",
      "MissingSkills",
      "InterviewQuestions"
    ];

    const row = {
      Name: body.name,
      Email: body.email,
      Skills: body.skills.join("; "),
      MatchScore: body.matchScore,
      MissingSkills: body.missingSkills.join("; "),
      InterviewQuestions: body.interviewQuestions.join(" | ")
    };

    let headerExists = false;
    try {
      const stats = await fs.stat(csvPath);
      headerExists = stats.size > 0;
    } catch {
      headerExists = false;
    }

    const parser = new Parser({
      fields,
      header: !headerExists
    });

    const csv = parser.parse(row);
    await fs.appendFile(csvPath, (headerExists ? "\n" : "") + csv, "utf8");

    console.log("Saved candidate row:", row);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in /api/save-candidate:", error);
    return NextResponse.json(
      { error: "Failed to save candidate to CSV." },
      { status: 500 }
    );
  }
}

