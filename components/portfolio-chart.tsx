"use client"

import { useMemo } from "react"
import { Area, AreaChart, ResponsiveContainer, YAxis } from "recharts"

interface PortfolioChartProps {
  timeRange: string
}

const generateChartData = (timeRange: string) => {
  const baseValue = 24500
  const points =
    timeRange === "1D" ? 78 : timeRange === "1W" ? 7 : timeRange === "1M" ? 30 : timeRange === "3M" ? 90 : 365

  return Array.from({ length: points }, (_, i) => {
    const volatility = timeRange === "1D" ? 50 : timeRange === "1W" ? 200 : 500
    const trend = (i / points) * 400
    const noise = (Math.random() - 0.3) * volatility
    return {
      time: i,
      value: baseValue + trend + noise + Math.sin(i / 5) * 100,
    }
  })
}

export function PortfolioChart({ timeRange }: PortfolioChartProps) {
  const data = useMemo(() => generateChartData(timeRange), [timeRange])

  const minValue = Math.min(...data.map((d) => d.value))
  const maxValue = Math.max(...data.map((d) => d.value))
  const padding = (maxValue - minValue) * 0.1

  return (
    <div className="px-4 h-48">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.72 0.19 145)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="oklch(0.72 0.19 145)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <YAxis domain={[minValue - padding, maxValue + padding]} hide />
          <Area
            type="monotone"
            dataKey="value"
            stroke="oklch(0.72 0.19 145)"
            strokeWidth={2}
            fill="url(#colorValue)"
            dot={false}
            activeDot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
