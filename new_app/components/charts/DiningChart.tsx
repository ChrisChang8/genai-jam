"use client";

import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import type { InsightData } from "@/lib/mock/types";

export interface DiningChartProps {
  data: InsightData["dining"];
}
export const DiningChart: React.FC<DiningChartProps> = ({ data }) => (
  <div
    className="h-36 rounded-xl border bg-background px-2 pt-3"
    role="img"
    aria-label={`Weekly dining spending: ${data.map((point) => `${point.week}: $${point.amount}`).join(", ")}`}
  >
    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
      <BarChart data={data} margin={{ top: 22, right: 4, bottom: 0, left: 4 }}>
        <XAxis
          dataKey="week"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#6b7280", fontSize: 10 }}
        />
        <YAxis hide domain={[0, 230]} />
        <Bar dataKey="amount" radius={[3, 3, 0, 0]} isAnimationActive={false}>
          {data.map((point, index) => (
            <Cell
              key={point.week}
              fill={
                index === data.length - 1
                  ? "#000"
                  : index === 2
                    ? "#d4d4d4"
                    : "#e5e5e5"
              }
            />
          ))}
          <LabelList
            dataKey="amount"
            position="top"
            formatter={(value: number) => `$${value}`}
            fontSize={10}
            fill="#525252"
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);
