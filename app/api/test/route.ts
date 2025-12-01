import { NextRequest } from "next/server";

export async function GET() {
  try {
    // Test the exact cURL command that works
    const testResponse = await fetch("https://api.ajstudioz.dev/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": "aj-demo123456789abcdef",
      },
      body: JSON.stringify({
        model: "kimi",
        messages: [{"role": "user", "content": "Hello from Vercel cloud!"}],
        stream: false
      }),
    });

    const responseData = await testResponse.text();
    
    return Response.json({
      status: testResponse.status,
      statusText: testResponse.statusText,
      headers: Object.fromEntries(testResponse.headers.entries()),
      body: responseData,
      env_check: {
        AJ_API_KEY: process.env.AJ_API_KEY ? "Set" : "Not set",
        NODE_ENV: process.env.NODE_ENV
      }
    });

  } catch (error) {
    return Response.json({
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}