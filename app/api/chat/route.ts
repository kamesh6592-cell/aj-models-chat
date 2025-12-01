import { NextRequest } from "next/server";
import { modelID } from "@/lib/models";

interface ChatMessage {
  role: string;
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, selectedModelId }: { messages: ChatMessage[]; selectedModelId: modelID } = body;

    // Call your AJ Studios API directly
    const ajResponse = await fetch("https://api.ajstudioz.dev/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.AJ_API_KEY || "aj-demo123456789abcdef",
      },
      body: JSON.stringify({
        model: selectedModelId,
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content
        })),
        stream: true
      }),
    });

    if (!ajResponse.ok) {
      return Response.json(
        { error: `AJ Studios API error: ${ajResponse.status} ${ajResponse.statusText}` },
        { status: ajResponse.status }
      );
    }

    // Return the streaming response directly
    return new Response(ajResponse.body, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: "An error occurred with the AJ Studios API. Please try again or select a different model." },
      { status: 500 }
    );
  }
}
