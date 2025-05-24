"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const STATUS_COLORS: Record<string, string> = {
  Applied: "#3B82F6",
  Interview: "#FACC15",
  Offer: "#10B981",
  Rejected: "#EF4444",
  Archived: "#6B7280",
};

export function StatsPieChart({
  data,
}: {
  data: { title: string; value: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          dataKey="value"
          nameKey="title"
          isAnimationActive
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
        >
          {data.map((data) => (
            <Cell
              key={data.title}
              fill={STATUS_COLORS[data.title] || "#8884d8"}
            />
          ))}
        </Pie>
        <Tooltip
  formatter={(value: number, name: string) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const percent = ((value / total) * 100).toFixed(1);
    return [`${value} (${percent}%)`, name];
  }}
  labelFormatter={() => ""}
/>
        <Legend formatter={(value: string) => value} />
      </PieChart>
    </ResponsiveContainer>
  );
}