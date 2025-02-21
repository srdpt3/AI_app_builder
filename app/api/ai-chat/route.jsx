import { chatSession } from "@/app/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt } = await req.json();

  try {
    const response = await chatSession.sendMessage(prompt);
    const resp = response.response.text();
    return NextResponse.json({ result: resp });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
