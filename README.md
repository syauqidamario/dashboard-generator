# 🚀 AI-Driven Generative UI Dashboard

An experimental analytics dashboard built with **Next.js 15 (App Router)** and **Vercel AI SDK**, leveraging **Gemini 2.5 Flash** to stream structural object data and render custom, state-reactive UI components dynamically based on natural language prompts.

This repository serves as a portfolio project demonstrating cutting-edge implementation of **Structured AI Streaming (Generative UI)**, client-side dynamic content hydration, and advanced error boundaries for partial JSON data formatting.

---

## 🎯 Core Features & System Architecture

Unlike traditional AI wrappers that simply output text or plain Markdown, this application intercepts data chunks directly from the LLM stream to assemble functional React components on the fly.

1. **Structured Output Model Execution**: Uses `streamObject` to constrain model outputs strictly to validation schemas.
2. **Resilient JSON Chunk Handling**: Implements a client-side text buffer traversal algorithm to capture and parse partial object markers (`}`) mid-stream, eliminating rendering stutters.
3. **Adaptive Visual Layering**: Dynamically maps specific schema payloads into dedicated visual presentation blocks utilizing `shadcn/ui` components and responsive `recharts` layouts.

[ User Prompt ]
│
▼
┌──────────────────────┐
│ Next.js Client Page │ ◄───────┐
└──────────┬───────────┘ │
│ (Fetch POST) │ Real-time Stream Updates
▼ │ (Client-side JSON Chunk Parser)
┌──────────────────────┐ │
│ API Route Backend │ │
│ (Vercel AI SDK Core) │ │
└──────────┬───────────┘ │
│ (streamObject) │
▼ │
┌──────────────────────┐ │
│ Gemini 2.5 Flash ├─────────┘
└──────────────────────┘

---

## 🛠️ Tech Stack & Foundations

- **Framework**: Next.js 15 (App Router, Server-less Endpoint, TypeScript Architecture)
- **AI Core Framework**: Vercel AI SDK Core & `@ai-sdk/google` integration layer
- **Model Engine**: Google Gemini 2.5 Flash (Optimized for low-latency JSON schema serialization)
- **UI & Visualization**: Tailwind CSS, Radix UI primitives (`shadcn/ui`), and Recharts vector graphing

---

## 🎛️ Local Sandbox Setup

### 1. Requirements

Ensure you have **Node.js 18.x** or higher installed on your environment.

### 2. Configuration & Dependencies

Clone the repository and install the core dependencies:

```bash
git clone [https://github.com/syauqidamario/dashboard-generator.git](https://github.com/syauqidamario/dashboard-generator.git)
cd dashboard-generator
npm install
```

