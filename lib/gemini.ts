import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-flash";

function getModel() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: MODEL_NAME });
}

export async function generateJsonResponse<T = unknown>(prompt: string) {
  const model = getModel();
  const result = await model.generateContent(prompt);
  const text = result.response.text();

  try {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start !== -1 && end !== -1) {
      return JSON.parse(text.slice(start, end + 1)) as T;
    }
    return JSON.parse(text) as T;
  } catch {
    throw new Error("Failed to parse Gemini JSON response");
  }
}

export async function generateTextResponse(prompt: string) {
  const model = getModel();
  const result = await model.generateContent(prompt);
  return result.response.text();
}

