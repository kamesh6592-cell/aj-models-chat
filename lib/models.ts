import { createOpenAI } from "@ai-sdk/openai";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";

// AJ Studios API provider configuration
const ajStudiosProvider = createOpenAI({
  baseURL: process.env.AJ_API_BASE_URL || "https://api.ajstudioz.dev/api",
  apiKey: process.env.AJ_API_KEY || "aj-demo123456789abcdef",
});

// Custom provider with AJ Studios models:
export const myProvider = customProvider({
  languageModels: {
    // GitHub Models (FREE)
    "gpt-4o": ajStudiosProvider("gpt-4o"),
    "gpt-4o-mini": ajStudiosProvider("gpt-4o-mini"),
    "deepseek-r1": wrapLanguageModel({
      middleware: extractReasoningMiddleware({
        tagName: "think",
      }),
      model: ajStudiosProvider("deepseek-r1"),
    }),
    "deepseek-r1-0528": wrapLanguageModel({
      middleware: extractReasoningMiddleware({
        tagName: "think",
      }),
      model: ajStudiosProvider("deepseek-r1-0528"),
    }),
    "grok-3": ajStudiosProvider("grok-3"),
    "grok-3-mini": ajStudiosProvider("grok-3-mini"),
    "phi-4": ajStudiosProvider("phi-4"),
    "mistral-nemo": ajStudiosProvider("mistral-nemo"),
    
    // Groq Models (24/7)
    "kimi": ajStudiosProvider("kimi"),
    "qwen3": ajStudiosProvider("qwen3"),
    "llama-4": ajStudiosProvider("llama-4"),
    "gpt-oss": ajStudiosProvider("gpt-oss"),
    "gpt-oss-120b": ajStudiosProvider("gpt-oss-120b"),
    
    // Local Ollama Models
    "glm-4.6": ajStudiosProvider("glm-4.6"),
    "qwen3-local": ajStudiosProvider("qwen3-local"),
    
    // OpenRouter Models
    "deepseek-r1-qwen3-8b": wrapLanguageModel({
      middleware: extractReasoningMiddleware({
        tagName: "think",
      }),
      model: ajStudiosProvider("deepseek-r1-qwen3-8b"),
    }),
    "qwen3-coder": ajStudiosProvider("qwen3-coder"),
    "mistral-small-24b": ajStudiosProvider("mistral-small-24b"),
    "mistral-small-3.1-24b": ajStudiosProvider("mistral-small-3.1-24b"),
  },
});

export type modelID = Parameters<(typeof myProvider)["languageModel"]>["0"];

export const models: Record<modelID, string> = {
  // GitHub Models (FREE for students)
  "gpt-4o": "GPT-4o (GitHub) 🆓",
  "gpt-4o-mini": "GPT-4o Mini (GitHub) 🆓",
  "deepseek-r1": "DeepSeek-R1 (GitHub) 🧠🆓",
  "deepseek-r1-0528": "DeepSeek-R1 0528 (GitHub) 🧠🆓",
  "grok-3": "Grok-3 (GitHub) 🆓",
  "grok-3-mini": "Grok-3 Mini (GitHub) 🆓",
  "phi-4": "Phi-4 (GitHub) 🆓",
  "mistral-nemo": "Mistral Nemo (GitHub) 🆓",
  
  // Groq Models (24/7 Available)
  "kimi": "Kimi K2 Instruct (Groq) ☁️",
  "qwen3": "Qwen 3 32B (Groq) ☁️",
  "llama-4": "Llama 4 Maverick (Groq) ☁️",
  "gpt-oss": "GPT OSS 20B (Groq) ☁️",
  "gpt-oss-120b": "GPT OSS 120B (Groq) ☁️",
  
  // Local Ollama Models
  "glm-4.6": "GLM-4.6 Cloud (Ollama) 🖥️",
  "qwen3-local": "Qwen 3 1.7B (Ollama) 🖥️",
  
  // OpenRouter Models
  "deepseek-r1-qwen3-8b": "DeepSeek-R1 Qwen3 8B 🧠🌐",
  "qwen3-coder": "Qwen 3 Coder (OpenRouter) 🌐",
  "mistral-small-24b": "Mistral Small 24B 🌐",
  "mistral-small-3.1-24b": "Mistral Small 3.1 24B 🌐",
};
