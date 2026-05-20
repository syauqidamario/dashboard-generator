import { google } from "@ai-sdk/google";
import { streamObject } from "ai";
import { z } from "zod";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = streamObject({
    // Perbaikan Utama: Menggunakan model generasi terbaru yang didukung penuh oleh API v1beta
    model: google("gemini-2.5-flash"),
    system: `Anda adalah asisten AI analitik dashboard. 
    Tugas Anda adalah membantu pengguna memvisualisasikan data mereka.
    Pilih nama 'renderMetricCard' jika mereka menanyakan angka tunggal, data ringkas, atau skor kritikal.
    Pilih nama 'renderChart' jika mereka meminta analisis tren, grafik harian, atau performa berkala beruntun.`,
    prompt: prompt,
    schema: z.object({
      uiComponent: z.object({
        name: z.enum(["renderMetricCard", "renderChart"]),
        props: z.object({
          title: z.string().describe("Judul komponen atau grafik visual"),
          value: z
            .string()
            .optional()
            .describe(
              "Nilai angka utama (khusus untuk renderMetricCard), contoh: Rp 5.000.000 atau 450 Orang",
            ),
          description: z
            .string()
            .optional()
            .describe(
              "Keterangan tambahan tren persentase atau konklusi singkat metrik",
            ),
          data: z
            .array(
              z.object({
                name: z
                  .string()
                  .describe(
                    "Label sumbu X waktu/hari, contoh: Sen, Sel, atau Jan, Feb",
                  ),
                value: z.number().describe("Nilai metrik angka grafik batang"),
              }),
            )
            .optional()
            .describe(
              "Data array koordinat (khusus untuk komponen renderChart)",
            ),
        }),
      }),
      explanation: z
        .string()
        .describe(
          "Penjelasan naratif singkat mengenai data analitik yang sedang ditampilkan di atas",
        ),
    }),
  });

  return result.toTextStreamResponse();
}
