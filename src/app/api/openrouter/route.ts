import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!prompt || typeof prompt !== "string") {
            return NextResponse.json({ success: false, error: "No prompt provided" }, { status: 400 });
        }

        const completion = await client.chat.completions.create({
            model: "openai/gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
        });

        const text = completion.choices?.[0]?.message?.content ?? "";

        return NextResponse.json({ success: true, text });
    } catch (err: any) {
        console.error("OpenRouter API error:", err);
        return NextResponse.json({ success: false, error: err?.message ?? "Server error" }, { status: 500 });
    }
}
