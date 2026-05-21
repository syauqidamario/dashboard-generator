"use client";

import { useState } from "react";
import {
  MetricCardView,
  ChartView,
  DynamicFormView,
} from "@/components/dashboard-views";

// Definisi spesifik untuk masing-masing komponen
type MetricCardProps = {
  title: string;
  value?: string;
  description?: string;
};

type ChartProps = {
  title: string;
  data?: { name: string; value: number }[];
};

type DynamicFormProps = {
  title: string;
  fields?: {
    name: string;
    label: string;
    type: string;
    placeholder?: string;
  }[];
  submitLabel?: string;
  themeColor?: "blue" | "emerald" | "rose" | "amber" | "violet";
};

// Gabungan struktur data yang dikirim oleh Gemini
type GenerationData = {
  uiComponent?:
    | { name: "renderMetricCard"; props: MetricCardProps }
    | { name: "renderChart"; props: ChartProps }
    | { name: "renderDynamicForm"; props: DynamicFormProps };
  explanation?: string;
};

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [generation, setGeneration] = useState<GenerationData | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setGeneration(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.body) return;

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        accumulatedText += decoder.decode(value);

        // Logika penanganan parsing JSON parsial
        try {
          const lastCurly = accumulatedText.lastIndexOf("}");
          if (lastCurly !== -1) {
            const validJsonChunk = accumulatedText.substring(0, lastCurly + 1);
            const parsed = JSON.parse(validJsonChunk);
            setGeneration(parsed);
          }
        } catch (err) {
          // Abaikan error parsing selama teks JSON streaming belum lengkap
        }
      }
    } catch (error) {
      console.error("Gagal memproses data:", error);
    } finally {
      setLoading(false);
    }
  };

  const uiComponent = generation?.uiComponent;

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-slate-50 text-slate-900">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Generative UI Dashboard
          </h1>
          <p className="text-sm text-slate-500">
            Membangun komponen visual analitik secara instan menggunakan AI.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Contoh: 'Buatkan form untuk mencatat inventaris barang masuk'..."
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white text-slate-900"
            disabled={loading}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 disabled:bg-blue-300 transition-colors min-w-[100px]"
            disabled={loading}
          >
            {loading ? "Streaming..." : "Generate"}
          </button>
        </form>

        <div className="space-y-4 pt-4 border-t border-slate-200">
          {/* Render Metric Card secara eksplisit dengan default value */}
          {uiComponent?.name === "renderMetricCard" && (
            <MetricCardView
              title={uiComponent.props.title}
              value={uiComponent.props.value || "-"}
              description={uiComponent.props.description || ""}
            />
          )}

          {/* Render Chart secara eksplisit */}
          {uiComponent?.name === "renderChart" && uiComponent.props.data && (
            <ChartView
              title={uiComponent.props.title}
              data={uiComponent.props.data}
            />
          )}

          {/* Render Form secara eksplisit dengan default value untuk submitLabel */}
          {uiComponent?.name === "renderDynamicForm" &&
            uiComponent.props.fields && (
              <DynamicFormView
                title={uiComponent.props.title}
                fields={uiComponent.props.fields}
                submitLabel={uiComponent.props.submitLabel || "Simpan Data"}
                themeColor={uiComponent.props.themeColor}
              />
            )}

          {/* Render Penjelasan */}
          {generation?.explanation && (
            <p className="text-sm text-slate-600 bg-white p-4 rounded-lg shadow-sm border border-slate-100 italic">
              {generation.explanation}
            </p>
          )}

          {/* Render State Kosong */}
          {!generation && !loading && (
            <p className="text-center text-sm text-slate-400 py-12">
              Belum ada komponen yang dibuat. Ketik sesuatu di atas!
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
