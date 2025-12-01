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

    console.log("API Request:", { selectedModelId, messageCount: messages.length });

    // Call your AJ Studios API directly - try non-streaming first
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
        stream: false
      }),
    });

    console.log("AJ Studios API Response:", {
      status: ajResponse.status,
      statusText: ajResponse.statusText,
      headers: Object.fromEntries(ajResponse.headers.entries())
    });

    if (!ajResponse.ok) {
      const errorText = await ajResponse.text();
      console.error("AJ Studios API Error:", errorText);
      return Response.json(
        { error: `AJ Studios API error: ${ajResponse.status} ${ajResponse.statusText}` },
        { status: ajResponse.status }
      );
    }

    const responseData = await ajResponse.json();
    console.log("AJ Studios Response Data:", responseData);

    // Convert to expected format for the chat interface
    return Response.json({
      id: Date.now().toString(),
      role: "assistant",
      content: responseData.choices?.[0]?.message?.content || responseData.content || "No response received",
    });

  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: "An error occurred with the AJ Studios API. Please try again or select a different model." },
      { status: 500 }
    );
  }
}
