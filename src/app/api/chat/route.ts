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
    // ... (kode atasnya tetap sama)
    schema: z.object({
      uiComponent: z.object({
        name: z.enum(["renderMetricCard", "renderChart", "renderDynamicForm"]), // <-- Tambah opsi baru
        props: z.object({
          // ... (properti title, value, description, data biarkan sama seperti sebelumnya)
          title: z.string().describe("Judul komponen, grafik, atau formulir"),
          value: z.string().optional(),
          description: z.string().optional(),
          data: z.array(z.any()).optional(),

          // ---> TAMBAHKAN BLOK INI UNTUK FORM <---
          fields: z
            .array(
              z.object({
                name: z
                  .string()
                  .describe("Nama variabel field (tanpa spasi, camelCase)"),
                label: z
                  .string()
                  .describe("Label teks yang akan dibaca pengguna"),
                type: z
                  .enum(["text", "number", "email", "date"])
                  .describe("Tipe input HTML standar"),
                placeholder: z
                  .string()
                  .optional()
                  .describe("Teks bantuan di dalam kolom input"),
              }),
            )
            .optional()
            .describe(
              "Array berisi daftar kolom input yang dibutuhkan (khusus untuk renderDynamicForm)",
            ),
          submitLabel: z
            .string()
            .optional()
            .describe("Teks pada tombol submit form (contoh: Simpan Data)"),
        }),
      }),
      explanation: z
        .string()
        .describe("Penjelasan naratif singkat mengenai komponen yang dibuat"),
    }),
  });

  return result.toTextStreamResponse();
}
