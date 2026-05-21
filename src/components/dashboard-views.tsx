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

// Komponen 1: Metric Card View
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
    <Card className="w-full max-w-sm border-l-4 border-l-blue-500 shadow-md bg-white">
      <CardHeader className="pb-2">
        <CardDescription className="text-sm font-medium uppercase tracking-wider text-slate-500">
          {title}
        </CardDescription>
        <CardTitle className="text-3xl font-bold tracking-tight text-slate-900">
          {value}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-slate-400">{description}</p>
      </CardContent>
    </Card>
  );
}

// Komponen 2: Chart View
export function ChartView({
  title,
  data,
}: {
  title: string;
  data: { name: string; value: number }[];
}) {
  return (
    <Card className="w-full shadow-md bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">
          {title}
        </CardTitle>
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

// Komponen 3: Dynamic Form View (Baru)
export function DynamicFormView({
  title,
  fields,
  submitLabel = "Submit",
}: {
  title: string;
  fields: { name: string; label: string; type: string; placeholder?: string }[];
  submitLabel?: string;
}) {
  return (
    <Card className="w-full max-w-lg shadow-md bg-white border-t-4 border-t-emerald-500">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-slate-900">
          {title}
        </CardTitle>
        <CardDescription className="text-sm">
          Silakan isi data pada form di bawah ini.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Data berhasil disimulasikan!");
          }}
        >
          {fields?.map((field, index) => (
            <div key={index} className="flex flex-col space-y-1.5">
              <label
                htmlFor={field.name}
                className="text-sm font-medium text-slate-700"
              >
                {field.label}
              </label>
              <input
                id={field.name}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full mt-4 px-4 py-2 bg-emerald-600 text-white font-medium rounded-md shadow hover:bg-emerald-700 transition-colors"
          >
            {submitLabel}
          </button>
        </form>
      </CardContent>
    </Card>
  );
}
