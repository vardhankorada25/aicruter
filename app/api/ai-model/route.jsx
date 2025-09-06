import { NextResponse } from "next/server";
import { QUESTIONS_PROMPT } from "@/services/constants";
import OpenAI from "openai";

export async function POST(request) {
  const { jobPosition, jobDescription, duration, type } = await request.json();
  const FINAL_PROMPT = QUESTIONS_PROMPT
      .replace("{{jobTitle}}", jobPosition)
      .replace("{{jobDescription}}", jobDescription)
      .replace("{{duration}}", duration)
      .replace("{{type}}", type);

    console.log("Final Prompt:", FINAL_PROMPT);
  try {
    // Validate input
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    if (!process.env.OPENROUTER_API_KEY) {
      console.error("OPENROUTER_API_KEY is not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    console.log("Received payload:", { jobPosition, jobDescription, duration, type });

    const completions = await openai.chat.completions.create({
      model: "tngtech/deepseek-r1t2-chimera:free", // Verify this model exists on OpenRouter
      messages: [
        {
          role: "user",
          content: FINAL_PROMPT,
        },
      ],
    });

    if (!completions.choices?.[0]?.message?.content) {
      throw new Error("Invalid response from OpenRouter API");
    }

    return NextResponse.json(completions.choices[0].message);
  } catch (e) {
    console.error("API Error:", e.message, e.stack);
    return NextResponse.json(
      { error: "Failed to generate questions", details: e.message },
      { status: 500 }
    );
  }
}