import { generateAICode } from "@/app/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const response = await generateAICode.sendMessage(prompt);
    const aiResponse = response.response.text();
    return NextResponse.json(JSON.parse(aiResponse));
  } catch (error) {
    console.error("Error in AI code generation:", error);
    return NextResponse.json(
      { error: "Failed to generate AI code" },
      { status: 500 },
    );
  }
}
