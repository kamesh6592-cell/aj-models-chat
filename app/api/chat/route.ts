import { modelID, myProvider } from "@/lib/models";
import { convertToModelMessages, smoothStream, streamText, UIMessage } from "ai";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const {
    messages,
    selectedModelId,
  }: {
    messages: Array<UIMessage>;
    selectedModelId: modelID;
  } = await request.json();

  // Dynamic system messages based on model
  const getSystemMessage = (modelId: string) => {
    if (modelId.includes("deepseek-r1")) {
      return "You are DeepSeek-R1, a reasoning model created by DeepSeek. You excel at complex reasoning and problem-solving. When solving problems, show your thinking process step by step.";
    }
    if (modelId.includes("gpt-4o")) {
      return "You are GPT-4o, OpenAI's flagship model. You are helpful, harmless, and honest. Provide accurate and detailed responses.";
    }
    if (modelId.includes("grok")) {
      return "You are Grok, xAI's conversational AI model. You have a witty personality and can engage in creative conversations while being helpful.";
    }
    if (modelId.includes("phi-4")) {
      return "You are Phi-4, Microsoft's efficient language model. You are designed to be helpful, accurate, and efficient in your responses.";
    }
    if (modelId.includes("kimi")) {
      return "You are Kimi, an advanced AI assistant. You are helpful, knowledgeable, and capable of handling complex tasks.";
    }
    if (modelId.includes("qwen")) {
      return "You are Qwen, Alibaba's large language model. You are multilingual, knowledgeable, and excel at various tasks including coding and reasoning.";
    }
    if (modelId.includes("llama")) {
      return "You are Llama, Meta's large language model. You are helpful, informative, and capable of engaging in meaningful conversations.";
    }
    if (modelId.includes("mistral")) {
      return "You are Mistral, a high-performance language model. You are efficient, accurate, and excellent at following instructions.";
    }
    return "You are a helpful AI assistant. Provide accurate, informative, and engaging responses to user queries.";
  };

  const stream = streamText({
    system: getSystemMessage(selectedModelId),
    model: myProvider.languageModel(selectedModelId),
    experimental_transform: [
      smoothStream({
        chunking: "word",
      }),
    ],
    messages: convertToModelMessages(messages),
  });

  return stream.toUIMessageStreamResponse({
    sendReasoning: true,
    onError: () => {
      return `An error occurred with the AJ Studios API. Please try again or select a different model.`;
    },
  });
}
