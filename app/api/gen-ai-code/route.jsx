import { generateAICode } from "@/app/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const response = await generateAICode.sendMessage(prompt);
    return NextResponse.json({ result: response.response.text() });
  } catch (error) {
    console.error("Error in AI code generation:", error);
    return NextResponse.json(
      { error: "Failed to generate AI code" },
      { status: 500 },
    );
  }
}
