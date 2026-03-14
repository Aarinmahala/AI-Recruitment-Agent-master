import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "PDF file is required under `file` field." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const pdfParse = (await import("pdf-parse")).default;
    const data = await pdfParse(buffer);

    return NextResponse.json({
      resumeText: data.text
    });
  } catch (error) {
    console.error("Error in /api/upload-resume:", error);
    return NextResponse.json(
      { error: "Failed to process resume PDF." },
      { status: 500 }
    );
  }
}

