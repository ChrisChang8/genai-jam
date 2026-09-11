"use client";

import { useId, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/Card";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import type { SpendingPeriod, SpendingSeries } from "@/lib/mock/types";
import { formatMoney } from "@/lib/mock/format";

export interface SpendingChartProps {
  series: Record<SpendingPeriod, SpendingSeries>;
}
export const SpendingChart: React.FC<SpendingChartProps> = ({ series }) => {
  const [period, setPeriod] = useState<SpendingPeriod>("Month");
  const summaryId = useId();
  const data = series[period];
  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-semibold">Spending Overview</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            {period === "Month"
              ? "Cumulative spending compared with the previous month"
              : "Monthly spending compared with the preceding period"}
          </p>
        </div>
        <SegmentedControl
          label="Spending chart period"
          value={period}
          onChange={setPeriod}
          options={[
            { value: "Month", label: "Month" },
            { value: "3M", label: "3M" },
            { value: "6M", label: "6M" },
          ]}
        />
      </div>
      <div className="mt-7 flex flex-wrap items-center justify-between gap-3 text-xs">
        <p>{data.pace}</p>
        <div className="flex gap-4">
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-3 bg-black" />
            {data.currentLabel}
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <span className="w-3 border-t border-dashed border-gray-400" />
            {data.previousLabel}
          </span>
        </div>
      </div>
      <div
        className="mt-5 h-[230px] w-full min-w-0 md:h-[270px]"
        role="img"
        aria-label="Spending comparison chart"
        aria-describedby={summaryId}
      >
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <LineChart
            data={data.points}
            margin={{ top: 12, right: 16, bottom: 0, left: 8 }}
          >
            <CartesianGrid vertical={false} stroke="#f0f1f3" />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
              tick={{ fontSize: 10, fill: "#626974" }}
              tickMargin={12}
              interval="preserveStartEnd"
            />
            <YAxis hide domain={[0, "auto"]} />
            <Tooltip
              formatter={(value: number, name: string) => [
                formatMoney(value),
                name,
              ]}
              contentStyle={{
                borderRadius: 8,
                fontSize: 12,
                borderColor: "#e5e7eb",
              }}
            />
            <Line
              type="monotone"
              dataKey="previous"
              name={data.previousLabel}
              stroke="#b8c0cb"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="current"
              name={data.currentLabel}
              stroke="#000"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4 }}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="projected"
              name="Projection"
              stroke="#818b99"
              strokeDasharray="3 4"
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p
        id={summaryId}
        className="mt-4 text-[11px] leading-relaxed text-muted-foreground"
        aria-live="polite"
      >
        {data.summary}
      </p>
    </Card>
  );
};
