# 🚀 AJ Studios AI Chat - Powered by AI SDK Reasoning Starter

**Next.js 15 AI Chat Interface connected to AJ Studios API with 20+ AI models including reasoning capabilities!**

## ✨ What's New

This is the original `ai-sdk-reasoning-starter` configured to work with **your AJ Studios API** at `https://api.ajstudioz.dev/api/chat`

### 🔗 **Direct API Integration**
- **Endpoint**: `https://api.ajstudioz.dev/api/chat`
- **API Key**: `aj-demo123456789abcdef` (Enterprise plan)
- **Headers**: `X-API-Key` and `Content-Type: application/json`
- **Method**: POST with JSON payload

## 🤖 Available Models (20+)

### 🆓 **GitHub Models (FREE for students)**
- `gpt-4o` - GPT-4o (GitHub) 🆓
- `gpt-4o-mini` - GPT-4o Mini (GitHub) 🆓  
- `deepseek-r1` - DeepSeek-R1 (GitHub) 🧠🆓
- `deepseek-r1-0528` - DeepSeek-R1 0528 (GitHub) 🧠🆓
- `grok-3` - Grok-3 (GitHub) 🆓
- `grok-3-mini` - Grok-3 Mini (GitHub) 🆓
- `phi-4` - Phi-4 (GitHub) 🆓
- `mistral-nemo` - Mistral Nemo (GitHub) 🆓

### ☁️ **Groq Models (24/7 Available)**
- `kimi` - Kimi K2 Instruct (Groq) ☁️
- `qwen3` - Qwen 3 32B (Groq) ☁️
- `llama-4` - Llama 4 Maverick (Groq) ☁️
- `gpt-oss` - GPT OSS 20B (Groq) ☁️
- `gpt-oss-120b` - GPT OSS 120B (Groq) ☁️

### 🖥️ **Local Ollama Models**  
- `glm-4.6` - GLM-4.6 Cloud (Ollama) 🖥️
- `qwen3-local` - Qwen 3 1.7B (Ollama) 🖥️

### 🌐 **OpenRouter Models**
- `deepseek-r1-qwen3-8b` - DeepSeek-R1 Qwen3 8B 🧠🌐
- `qwen3-coder` - Qwen 3 Coder (OpenRouter) 🌐
- `mistral-small-24b` - Mistral Small 24B 🌐
- `mistral-small-3.1-24b` - Mistral Small 3.1 24B 🌐

## 🧠 Reasoning Models

**DeepSeek-R1 models** support reasoning with `<think>` tags:
- `deepseek-r1` - Advanced reasoning (GitHub)
- `deepseek-r1-0528` - Stable reasoning model (GitHub)  
- `deepseek-r1-qwen3-8b` - Reasoning variant (OpenRouter)

## 🚀 Quick Start

### 1. **Install Dependencies**
```bash
npm install
# or
pnpm install
```

### 2. **Environment Setup**
The `.env.local` is already configured:
```env
AJ_API_BASE_URL=https://api.ajstudioz.dev/api
AJ_API_KEY=aj-demo123456789abcdef
```

### 3. **Start Development Server**
```bash
npm run dev
# or  
pnpm dev
```

### 4. **Open Browser**
Visit: **http://localhost:3000**

## 🔧 **API Integration Details**

### **cURL Example (Your Working Endpoint)**
```bash
curl -X POST "https://api.ajstudioz.dev/api/chat" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: aj-demo123456789abcdef" \
  -d '{
    "model": "kimi",
    "messages": [{"role": "user", "content": "Hello from Vercel cloud!"}],
    "stream": false
  }'
```

### **How It Works**
1. **Frontend**: Next.js chat interface (this repository)
2. **API Route**: `/app/api/chat/route.ts` - handles requests
3. **Models Config**: `/lib/models.ts` - all 20+ models configured
4. **Your API**: `https://api.ajstudioz.dev/api/chat` - processes requests

### **Model Configuration**
Each model is configured in `/lib/models.ts`:
```typescript
const ajStudiosProvider = openai({
  baseURL: "https://api.ajstudioz.dev/api", 
  apiKey: "aj-demo123456789abcdef",
});
```

## 🧠 **Reasoning Features**

### **DeepSeek-R1 Models**
- **Thinking Process**: See `<think>` tags with step-by-step reasoning
- **Complex Problems**: Math, logic, analysis
- **Model Selection**: Choose any DeepSeek-R1 variant
- **Reasoning Toggle**: Enable/disable reasoning display

### **How to Use Reasoning**
1. Select a DeepSeek-R1 model from the dropdown
2. Enable the "Reasoning" toggle (if available)
3. Ask complex questions or math problems
4. Watch the model think through the problem step-by-step

## 📱 **Interface Features**

### **Chat Controls**
- **Model Selector**: Dropdown with all 20+ models
- **Reasoning Toggle**: Show/hide thinking process
- **Streaming**: Real-time response generation
- **Message History**: Full conversation context
- **Stop Generation**: Stop responses mid-generation

### **Model Categories**
- 🆓 **FREE**: GitHub Models (student access)
- ☁️ **24/7**: Always available Groq models  
- 🖥️ **Local**: Requires Ollama installation
- 🌐 **Cloud**: OpenRouter free tier models
- 🧠 **Reasoning**: Advanced problem-solving models

## 🔍 **Testing Your Setup**

### **Test Different Models**
1. **Start with**: `gpt-4o-mini` (fast, reliable)
2. **Try reasoning**: `deepseek-r1` (with thinking)
3. **Test Groq**: `kimi` (24/7 available)
4. **Check local**: `glm-4.6` (if Ollama running)

### **Verify API Connection**
The interface automatically connects to your AJ Studios API. If there are connection issues:
1. Check `.env.local` configuration
2. Verify API key is valid
3. Ensure `https://api.ajstudioz.dev/api/chat` is accessible
4. Try different models to test availability

## 🚀 **Production Deployment**

### **Vercel (Recommended)**
```bash
npm run build
npx vercel --prod
```

### **Environment Variables for Production**
```env
AJ_API_BASE_URL=https://api.ajstudioz.dev/api
AJ_API_KEY=your-production-api-key
```

## 🎯 **Perfect For**

- 🧠 **Research**: Compare 20+ AI models
- 💬 **Chat**: Natural conversations with various models  
- 🔬 **Testing**: Evaluate model capabilities
- 🧮 **Reasoning**: Complex problem solving
- 🛠️ **Development**: Rapid AI prototyping

---

**🎉 You now have the original AI SDK Reasoning Starter connected to your AJ Studios API with 20+ models!**

This gives you the best of both worlds: **Vercel's polished reasoning interface** + **your comprehensive AJ Studios API** with access to GitHub, Groq, Ollama, and OpenRouter models.

## 🔗 **Related Projects**

- **Main AJ Studios API**: Your comprehensive multi-provider API
- **AJ Models Chat**: Separate chat interface repository 
- **GitHub Models Monitor**: Real-time usage tracking tools