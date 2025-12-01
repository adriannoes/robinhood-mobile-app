"use client"

import { Line, LineChart, ResponsiveContainer, YAxis } from "recharts"

interface MiniChartProps {
  data: number[]
  positive: boolean
}

export function MiniChart({ data, positive }: MiniChartProps) {
  const chartData = data.map((value, index) => ({ index, value }))
  const minValue = Math.min(...data)
  const maxValue = Math.max(...data)
  const padding = (maxValue - minValue) * 0.1

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <YAxis domain={[minValue - padding, maxValue + padding]} hide />
        <Line
          type="monotone"
          dataKey="value"
          stroke={positive ? "oklch(0.72 0.19 145)" : "oklch(0.65 0.2 25)"}
          strokeWidth={1.5}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
