import { z } from "zod";

export const dashboardSchema = {
  // 1. Komponen kartu angka statistik
  renderMetricCard: z.object({
    title: z.string().describe("Judul metrik, contoh: Total Pendapatan"),
    value: z.string().describe("Nilai metrik, contoh: Rp 15.000.000"),
    description: z
      .string()
      .describe("Keterangan tambahan atau tren persentase"),
  }),

  // 2. Komponen grafik data harian/bulanan
  renderChart: z.object({
    title: z.string().describe("Judul grafik analytics"),
    data: z
      .array(
        z.object({
          name: z
            .string()
            .describe("Label sumbu X (contoh: Jan, Feb, atau Sen, Sel)"),
          value: z.number().describe("Nilai angka untuk grafik"),
        }),
      )
      .describe("Data array untuk dirender ke dalam grafik harian/bulanan"),
  }),
};
