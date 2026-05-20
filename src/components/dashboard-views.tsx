"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

// 1. Komponen Kartu Statistik (Metric Card)
export function MetricCardView({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <Card className="w-full max-w-sm border-l-4 border-l-blue-500 shadow-md">
      <CardHeader className="pb-2">
        <CardDescription className="text-sm font-medium uppercase tracking-wider">
          {title}
        </CardDescription>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {value}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

// 2. Komponen Grafik Batang (Bar Chart)
export function ChartView({
  title,
  data,
}: {
  title: string;
  data: { name: string; value: number }[];
}) {
  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <XAxis
              dataKey="name"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              stroke="#888888"
            />
            <YAxis
              fontSize={12}
              tickLine={false}
              axisLine={false}
              stroke="#888888"
            />
            <Tooltip
              contentStyle={{
                background: "#fff",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
              }}
              cursor={{ fill: "#f1f5f9", opacity: 0.4 }}
            />
            <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
