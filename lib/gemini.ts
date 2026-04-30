import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_CANDIDATES = [
  "gemini-flash-latest",
  "gemini-2.0-flash",
  "gemini-2.0-flash-001",
  "gemini-2.5-flash"
];

function getClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }
  return new GoogleGenerativeAI(apiKey);
}

async function generateWithFallback(prompt: string) {
  const client = getClient();
  let lastError: unknown;

  for (const modelName of MODEL_CANDIDATES) {
    try {
      const model = client.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error("No Gemini model succeeded");
}

export async function generateJsonResponse<T = unknown>(prompt: string) {
  const text = await generateWithFallback(prompt);

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
  return generateWithFallback(prompt);
}

