import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Full request body:", JSON.stringify(body, null, 2));
    
    // Handle AI SDK format - extract from the body structure
    const { messages, selectedModelId } = body;
    
    console.log("API Request:", { selectedModelId, messageCount: messages?.length || 0 });

    // Call your AJ Studios API directly - match your working cURL exactly
    const requestBody = {
      model: selectedModelId || "gpt-4o-mini",
      messages: messages?.map((msg: { role: string; content: unknown; text?: string; parts?: Array<{type: string; text: string}> }) => ({
        role: msg.role,
        content: typeof msg.content === 'string' ? msg.content : 
                (msg.parts && msg.parts[0]?.text) ||  // Extract from parts array
                (Array.isArray(msg.content) && msg.content[0]?.text) ||
                msg.text || 
                JSON.stringify(msg.content) || 
                "Hello"
      })) || [{ role: "user", content: "Hello" }],
      stream: false
    };

    console.log("Original messages:", JSON.stringify(messages, null, 2));
    console.log("Request body:", JSON.stringify(requestBody, null, 2));
    console.log("API Key:", process.env.AJ_API_KEY ? "Set" : "Not set", process.env.AJ_API_KEY?.substring(0, 10) + "...");

    const ajResponse = await fetch("https://api.ajstudioz.dev/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.AJ_API_KEY || "aj-demo123456789abcdef",
      },
      body: JSON.stringify(requestBody),
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

    // Extract content from AJ Studios API response format
    let content = "No response received";
    
    if (responseData.output && responseData.output.length > 0) {
      const messageOutput = responseData.output.find((item: { type: string }) => item.type === "message");
      if (messageOutput && messageOutput.content && messageOutput.content.length > 0) {
        // Log the content structure to understand it better
        console.log("Message content structure:", JSON.stringify(messageOutput.content, null, 2));
        
        const contentItem = messageOutput.content[0];
        if (contentItem) {
          // Try different possible content fields
          content = contentItem.text || 
                   contentItem.content || 
                   (typeof contentItem === 'string' ? contentItem : JSON.stringify(contentItem));
        }
      }
    }
    
    console.log("Final extracted content:", content);

    // Return in the streaming format expected by AI SDK useChat hook
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        // Send chunks that useChat expects
        controller.enqueue(encoder.encode(`2:${JSON.stringify(content)}\n`));
        controller.enqueue(encoder.encode(`d:{"finishReason":"stop","usage":{"promptTokens":${responseData.usage?.input_tokens || 8},"completionTokens":${responseData.usage?.output_tokens || 10}}}\n`));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
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
